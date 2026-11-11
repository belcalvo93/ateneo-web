'use strict';

const { normalizar, duracionASegundos } = require('./normalizar.js');

const TOLERANCIA_SEGUNDOS = 2;
const UMBRAL_SUGERENCIA = 0.85;
const MAX_SUGERENCIAS = 3;

// ---- lectura del archivo de videos del canal (.jsonl) ----

// Una línea JSON por video: { id, title, duration?, view_count? }. Tolera BOM, líneas vacías y CRLF.
// Las líneas que no sirven no cortan el proceso: se devuelven en `invalidas`.
function leerCanal(texto) {
  const videos = [];
  const vistos = new Set();
  const invalidas = [];
  const lineas = String(texto).replace(/^﻿/, '').split(/\r?\n/);
  lineas.forEach((linea, i) => {
    if (linea.trim() === '') return;
    let obj;
    try {
      obj = JSON.parse(linea.replace(/^﻿/, ''));
    } catch (e) {
      invalidas.push({ linea: i + 1, motivo: 'no es JSON válido' });
      return;
    }
    if (typeof obj !== 'object' || obj === null || typeof obj.id !== 'string' || obj.id === '') {
      invalidas.push({ linea: i + 1, motivo: 'no tiene id' });
      return;
    }
    if (vistos.has(obj.id)) return; // yt-dlp --print-to-file agrega al final: si se corre dos veces, quedan repetidos
    vistos.add(obj.id);
    let duration = null;
    if (typeof obj.duration === 'number' && Number.isFinite(obj.duration)) duration = Math.round(obj.duration);
    else if (typeof obj.duration === 'string') duration = duracionASegundos(obj.duration);
    videos.push({
      id: obj.id,
      title: typeof obj.title === 'string' ? obj.title : '',
      duration,
      view_count: Number.isInteger(obj.view_count) ? obj.view_count : null
    });
  });
  return { videos, invalidas };
}

// ---- similitud para sugerencias (nunca para asignar) ----

function distanciaEdicion(a, b) {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}

// 1 = iguales; 0 = nada en común. Sobre textos ya normalizados.
function similitud(a, b) {
  const largo = Math.max(a.length, b.length);
  if (largo === 0) return 1;
  return 1 - distanciaEdicion(a, b) / largo;
}

// ---- cruce ----

// «parte 2» y «parte 3» se parecen mucho pero son videos distintos: no se sugieren entre sí.
function mismosNumeros(a, b) {
  const nums = (t) => (t.match(/\d+/g) || []).join(',');
  return nums(a) === nums(b);
}

const resumirVideo = (v) => ({ id: v.id, title: v.title, duration: v.duration });

// borrador: { charlas: [{ id, videos: [{ titulo_original, duracion }] }] }, videos: salida de leerCanal.
// El número de parte de los resultados es la POSICIÓN (desde 1) del video en el borrador.
function cruzar(borrador, videos) {
  const partes = [];
  for (const c of borrador.charlas) {
    c.videos.forEach((v, i) => partes.push({ charla: c.id, parte: i + 1, titulo_original: v.titulo_original, segundos: duracionASegundos(v.duracion) }));
  }
  return cruzarPartes(partes, videos);
}

// partes: [{ charla, parte, titulo_original, segundos }] (segundos puede ser null), videos: salida de leerCanal.
// Es el mismo cálculo de siempre pero sobre una lista de partes ya armada (la usa también la regeneración).
function cruzarPartes(partes, videos) {
  const indice = new Map();
  for (const v of videos) {
    const clave = normalizar(v.title);
    if (!indice.has(clave)) indice.set(clave, []);
    indice.get(clave).push(v);
  }

  // 1) cada parte decide a qué video aspira
  const reclamos = new Map(); // video.id -> partes que lo reclaman
  const estado = partes.map((p) => {
    const candidatos = indice.get(normalizar(p.titulo_original)) || [];
    if (candidatos.length === 0) return { p, tipo: 'ninguno' };
    if (candidatos.length === 1) return { p, tipo: 'reclama', video: candidatos[0] };
    const iguales = candidatos.filter(
      (v) => p.segundos !== null && v.duration !== null && Math.abs(v.duration - p.segundos) <= TOLERANCIA_SEGUNDOS
    );
    if (iguales.length === 1) return { p, tipo: 'reclama', video: iguales[0] };
    return { p, tipo: 'ambigua', candidatos };
  });
  for (const e of estado) {
    if (e.tipo !== 'reclama') continue;
    if (!reclamos.has(e.video.id)) reclamos.set(e.video.id, []);
    reclamos.get(e.video.id).push(e);
  }

  // 2) un video reclamado por dos partes no se asigna a ninguna
  for (const lista of reclamos.values()) {
    if (lista.length > 1) {
      for (const e of lista) {
        e.candidatos = [e.video];
        e.tipo = 'ambigua';
      }
    }
  }

  const asignadas = [];
  const ambiguas = [];
  const usados = new Set();
  for (const e of estado) {
    const base = { charla: e.p.charla, parte: e.p.parte, titulo_original: e.p.titulo_original };
    if (e.tipo === 'reclama') {
      usados.add(e.video.id);
      asignadas.push({ ...base, video_id: e.video.id, url: 'https://www.youtube.com/watch?v=' + e.video.id, vistas: e.video.view_count });
    } else if (e.tipo === 'ambigua') {
      ambiguas.push({ ...base, candidatos: e.candidatos.map(resumirVideo) });
    }
  }

  // 3) sin título igual: sugerencias aproximadas (solo para revisión humana) entre los videos libres
  const libres = videos.filter((v) => !usados.has(v.id));
  const sugerencias = [];
  const sinCoincidencia = [];
  for (const e of estado) {
    if (e.tipo !== 'ninguno') continue;
    const base = { charla: e.p.charla, parte: e.p.parte, titulo_original: e.p.titulo_original };
    const propio = normalizar(e.p.titulo_original);
    const cercanos = libres
      .map((v) => ({ id: v.id, title: v.title, similitud: Math.round(similitud(propio, normalizar(v.title)) * 100) / 100 }))
      .filter((c) => c.similitud >= UMBRAL_SUGERENCIA && mismosNumeros(propio, normalizar(c.title)))
      .sort((a, b) => b.similitud - a.similitud || (a.id < b.id ? -1 : 1))
      .slice(0, MAX_SUGERENCIAS);
    if (cercanos.length > 0) sugerencias.push({ ...base, candidatos: cercanos });
    else sinCoincidencia.push(base);
  }

  const sinUsar = libres.map(resumirVideo).sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return { asignadas, ambiguas, sugerencias, sinCoincidencia, sinUsar };
}

module.exports = { leerCanal, cruzar, cruzarPartes, similitud, mismosNumeros };
