'use strict';

// Cruce del archivo de charlas 2020–2026 del sitio viejo (docs/fuentes/sitio-viejo.md) con el catálogo.
// Funciones puras: no leen ni escriben archivos (eso lo hace scripts/cruzar-archivo.js).

const { normalizar } = require('./normalizar.js');

// ---- umbrales (ver design.md de C-02b, D3) ----
const UMBRAL_TITULO = 0.6;          // proporción mínima de palabras del título en común
const UMBRAL_TITULO_SOLO = 0.9;     // si la entrada no tiene disertante
const UMBRAL_DISERTANTE = 0.5;
const UMBRAL_DUDOSA = 0.6;          // puntaje total mínimo para proponer un candidato
const MARGEN = 0.3;                 // ventaja mínima sobre el segundo candidato
const DIFERENCIA_ANIO = 1;          // el año del catálogo es aproximado
const PESO_DISERTANTE = 0.5;
const MAX_CANDIDATOS = 3;

// ---- lectura ----

const MESES = { ene: 1, feb: 2, mar: 3, abr: 4, may: 5, jun: 6, jul: 7, ago: 8, sep: 9, set: 9, oct: 10, nov: 11, dic: 12 };

// "3 de abri de 2020" -> "03/04/2020"; null si no se entiende o la fecha no existe.
function fechaDesdeTexto(texto) {
  const m = /^(\d{1,2})\s+(?:de\s+)?([a-z]+)\s+(?:de\s+)?(\d{4})$/.exec(normalizar(texto || ''));
  if (!m) return null;
  const mes = MESES[m[2].slice(0, 3)];
  const dia = Number(m[1]);
  const anio = Number(m[3]);
  if (!mes) return null;
  const d = new Date(Date.UTC(anio, mes - 1, dia));
  if (d.getUTCMonth() !== mes - 1 || d.getUTCDate() !== dia) return null;
  const dos = (n) => String(n).padStart(2, '0');
  return `${dos(dia)}/${dos(mes)}/${anio}`;
}

const SEPARADOR = ' — ';
const SIN_DISERTANTE = /^\(sin disertante indicado\)$/i;

// Lee las líneas "- <fecha> — <título> — <disertante>" de la sección «Archivo de charlas»
// (o de todo el texto si no tiene esa sección). Nunca lanza errores.
function leerArchivo(texto) {
  const entradas = [];
  const invalidas = [];
  const lineas = String(texto).replace(/^﻿/, '').split(/\r?\n/);
  const conSeccion = lineas.some((l) => /^##\s+Archivo de charlas/i.test(l));
  let dentro = !conSeccion;
  lineas.forEach((linea, i) => {
    if (/^##\s/.test(linea)) {
      if (conSeccion) dentro = /^##\s+Archivo de charlas/i.test(linea);
      return;
    }
    if (!dentro || !linea.startsWith('- ')) return;
    const cuerpo = linea.slice(2);
    const primero = cuerpo.indexOf(SEPARADOR);
    const ultimo = cuerpo.lastIndexOf(SEPARADOR);
    if (primero === -1 || ultimo === primero) return;
    const textoFecha = cuerpo.slice(0, primero).trim();
    const titulo = cuerpo.slice(primero + SEPARADOR.length, ultimo).trim();
    const disertante = cuerpo.slice(ultimo + SEPARADOR.length).trim();
    const fecha = fechaDesdeTexto(textoFecha);
    if (!fecha) {
      invalidas.push({ linea: i + 1, motivo: `fecha ilegible: ${textoFecha}` });
      return;
    }
    entradas.push({ linea: i + 1, fecha, titulo, disertante: SIN_DISERTANTE.test(disertante) || disertante === '' ? null : disertante });
  });
  return { entradas, invalidas };
}

// Proyecciones de videos de otras personas: no son charlas del canal.
function esProyeccion(entrada) {
  return typeof entrada.disertante === 'string' && /^(video|extracto)\s+de\b/i.test(entrada.disertante.trim());
}

// ---- palabras ----

const VACIAS = new Set(('de la el los las y en del a un una al por para con que se su sus o e lo como sobre mas desde ' +
  'hacia entre parte primera segunda tercera ii iii iv preguntas comentarios debate dr dra ing lic arq mg prof sr sra aac')
  .split(' '));

function palabras(texto) {
  return normalizar(texto || '').split(' ').filter((w) => w.length > 2 && !VACIAS.has(w) && !/^\d+$/.test(w));
}

function sinS(w) {
  return w.endsWith('s') ? w.slice(0, -1) : w;
}

// Dos palabras coinciden si son iguales (salvo la "s" final) o comparten un comienzo largo
// («geofisica»/«geofisico»), pero no si solo comparten unas letras («electroquimica»/«electricos»).
function coinciden(a, b) {
  if (sinS(a) === sinS(b)) return true;
  const corta = Math.min(a.length, b.length);
  if (corta < 5) return false;
  let i = 0;
  while (i < corta && a[i] === b[i]) i++;
  return i >= Math.min(7, corta - 1);
}

// Proporción de palabras de `a` que tienen pareja en `b`.
function proporcion(a, b) {
  if (a.length === 0) return 0;
  return a.filter((x) => b.some((y) => coinciden(x, y))).length / a.length;
}

function personas(disertante) {
  return String(disertante).split(/,|;|\s+y\s+/).map((p) => palabras(p)).filter((p) => p.length > 0);
}

function anioDeFecha(fecha) {
  return Number(fecha.slice(6));
}

function esPlaceholder(x) {
  return typeof x === 'string' && /^\s*\[.*\]\s*$/.test(x);
}

function textosDeCharla(charla) {
  const textos = (charla.partes || []).map((p) => p.titulo_original || '');
  if (!esPlaceholder(charla.titulo)) textos.push(charla.titulo);
  return textos;
}

// { titulo, disertante } entre 0 y 1.
function puntaje(entrada, charla) {
  const textos = textosDeCharla(charla);
  const todo = palabras([textos.join(' '), esPlaceholder(charla.disertante) ? '' : charla.disertante].join(' '));
  const delDisertante = entrada.disertante ? palabras(entrada.disertante) : [];
  const delTitulo = palabras(entrada.titulo);
  let titulo = proporcion(delTitulo, todo);
  // Al revés: un título de YouTube corto contenido en el del archivo (sin contar el nombre del disertante).
  textos.forEach((t) => {
    const propias = palabras(t).filter((w) => !delDisertante.some((d) => coinciden(w, d)));
    if (propias.length > 0) titulo = Math.max(titulo, proporcion(propias, delTitulo));
  });
  let disertante = 0;
  // Por persona; si coincide el apellido (última palabra) cuenta al menos como la mitad
  // («José María Amoretti» frente a «J. M. AMORETTI»).
  if (entrada.disertante) {
    personas(entrada.disertante).forEach((p) => {
      const apellido = p[p.length - 1];
      const porApellido = todo.some((w) => coinciden(apellido, w)) ? UMBRAL_DISERTANTE : 0;
      disertante = Math.max(disertante, proporcion(p, todo), porApellido);
    });
  }
  return { titulo, disertante };
}

// ---- cruce ----

function redondear(x) {
  return Math.round(x * 100) / 100;
}

function cruzarArchivo(entradas, charlas) {
  const ignoradas = [];
  const sinPar = [];
  const dudosas = [];
  const candidatasSeguras = [];
  entradas.forEach((entrada) => {
    if (esProyeccion(entrada)) { ignoradas.push(entrada); return; }
    const anio = anioDeFecha(entrada.fecha);
    const ranking = charlas.map((charla) => {
      const p = puntaje(entrada, charla);
      const total = p.titulo + PESO_DISERTANTE * p.disertante;
      return { charla, titulo: p.titulo, disertante: p.disertante, total };
    }).sort((x, y) => y.total - x.total || (x.charla.id < y.charla.id ? -1 : 1));
    const [mejor, segundo] = ranking;
    if (!mejor || mejor.total < UMBRAL_DUDOSA) { sinPar.push(entrada); return; }
    const anioOk = typeof mejor.charla.anio === 'number' && Math.abs(mejor.charla.anio - anio) <= DIFERENCIA_ANIO;
    const coincide = entrada.disertante
      ? mejor.titulo >= UMBRAL_TITULO && mejor.disertante >= UMBRAL_DISERTANTE
      : mejor.titulo >= UMBRAL_TITULO_SOLO;
    const margen = !segundo || mejor.total - segundo.total >= MARGEN;
    const candidatos = ranking.filter((r) => r.total >= UMBRAL_DUDOSA).slice(0, MAX_CANDIDATOS).map((r) => ({
      id: r.charla.id,
      anio: r.charla.anio,
      titulo_original: (r.charla.partes || []).map((p) => p.titulo_original).join(' || '),
      puntaje: redondear(r.total)
    }));
    if (anioOk && coincide && margen) candidatasSeguras.push({ id: mejor.charla.id, entrada, candidatos });
    else dudosas.push({ entrada, candidatos });
  });
  // Una charla, una entrada: si otra entrada (segura, o dudosa con esa charla como candidata de año
  // compatible) también puede ser esa charla, la segura queda dudosa.
  const cuenta = {};
  candidatasSeguras.forEach((s) => { cuenta[s.id] = (cuenta[s.id] || 0) + 1; });
  dudosas.forEach((d) => {
    const anio = anioDeFecha(d.entrada.fecha);
    d.candidatos.forEach((c) => {
      if (typeof c.anio === 'number' && Math.abs(c.anio - anio) <= DIFERENCIA_ANIO) cuenta[c.id] = (cuenta[c.id] || 0) + 1;
    });
  });
  const seguras = [];
  candidatasSeguras.forEach((s) => {
    if (cuenta[s.id] === 1) seguras.push({ id: s.id, entrada: s.entrada });
    else dudosas.push({ entrada: s.entrada, candidatos: s.candidatos, motivo: `otra entrada también apunta a ${s.id}` });
  });
  dudosas.sort((a, b) => a.entrada.linea - b.entrada.linea);
  return { seguras, dudosas, sinPar, ignoradas };
}

// Lo que se guarda en data/archivo-charlas.js: fecha siempre, disertante si el archivo lo indica
// y título solo si el catálogo todavía tiene un placeholder. Claves ordenadas.
function datosDelArchivo(seguras, charlas) {
  const porId = {};
  charlas.forEach((c) => { porId[c.id] = c; });
  const datos = {};
  seguras.slice().sort((a, b) => (a.id < b.id ? -1 : 1)).forEach(({ id, entrada }) => {
    const charla = porId[id];
    if (!charla) return;
    const dato = { fecha: entrada.fecha };
    if (entrada.disertante) dato.disertante = entrada.disertante;
    if (esPlaceholder(charla.titulo)) dato.titulo = entrada.titulo;
    datos[id] = dato;
  });
  return datos;
}

// ---- fecha de subida a YouTube (resolver dudosas) ----

const VENTANA_ANTES_DIAS = 1;   // un video puede figurar subido el día anterior por la zona horaria
const VENTANA_DESPUES_DIAS = 30; // las charlas se suben en las semanas siguientes
const UMBRAL_TITULO_SUBIDA = 0.25;

// Líneas JSON { id, upload_date: "AAAAMMDD" } (yt-dlp) -> { id: "AAAAMMDD" }. Ignora inválidas, "NA" y repetidas.
function leerSubidas(texto) {
  const subidas = {};
  String(texto).replace(/^\uFEFF/, '').split(/\r?\n/).forEach((linea) => {
    if (linea.trim() === '') return;
    let obj;
    try { obj = JSON.parse(linea); } catch (e) { return; }
    if (!obj || typeof obj.id !== 'string' || !/^\d{8}$/.test(String(obj.upload_date))) return;
    if (!(obj.id in subidas)) subidas[obj.id] = String(obj.upload_date);
  });
  return subidas;
}

function idDeUrl(url) {
  const m = /(?:v=|youtu\.be\/)([\w-]{11})/.exec(String(url || ''));
  return m ? m[1] : null;
}

// Fecha de subida más temprana entre las partes de la charla, como "AAAAMMDD", o null.
function subidaDeCharla(charla, subidas) {
  const fechas = (charla.partes || []).map((p) => subidas[idDeUrl(p.url)]).filter(Boolean).sort();
  return fechas.length ? fechas[0] : null;
}

function diasEntre(aaaammddA, ddmmaaaaB) {
  const a = Date.UTC(+aaaammddA.slice(0, 4), +aaaammddA.slice(4, 6) - 1, +aaaammddA.slice(6, 8));
  const b = Date.UTC(+ddmmaaaaB.slice(6), +ddmmaaaaB.slice(3, 5) - 1, +ddmmaaaaB.slice(0, 2));
  return Math.round((a - b) / 86400000);
}

// Resuelve dudosas y sin par con la fecha de subida: si UNA sola charla (no asignada) se subió entre el día
// anterior y los 30 días siguientes a la fecha del archivo y coincide en parte del título o en el disertante,
// pasa a segura. Si dos entradas resuelven la misma charla, ninguna se resuelve.
function resolverConSubida(resultado, charlas, subidas) {
  const usadas = new Set(resultado.seguras.map((s) => s.id));
  const propuestas = [];
  const proponer = (entrada, origen) => {
    const candidatas = charlas.filter((c) => {
      if (usadas.has(c.id)) return false;
      const subida = subidaDeCharla(c, subidas || {});
      if (subida === null) return false;
      const dias = diasEntre(subida, entrada.fecha);
      if (dias < -VENTANA_ANTES_DIAS || dias > VENTANA_DESPUES_DIAS) return false;
      const p = puntaje(entrada, c);
      return p.titulo >= UMBRAL_TITULO_SUBIDA || p.disertante >= UMBRAL_DISERTANTE;
    });
    if (candidatas.length === 1) propuestas.push({ id: candidatas[0].id, entrada, origen, subida: subidaDeCharla(candidatas[0], subidas) });
  };
  resultado.dudosas.forEach((d) => proponer(d.entrada, d));
  resultado.sinPar.forEach((e) => proponer(e, e));
  const cuenta = {};
  propuestas.forEach((x) => { cuenta[x.id] = (cuenta[x.id] || 0) + 1; });
  const resueltas = propuestas.filter((x) => cuenta[x.id] === 1);
  const resueltasSet = new Set(resueltas.map((x) => x.origen));
  const aTexto = (f) => f.slice(6, 8) + '/' + f.slice(4, 6) + '/' + f.slice(0, 4);
  return {
    seguras: resultado.seguras.concat(resueltas.map((x) => ({ id: x.id, entrada: x.entrada }))),
    dudosas: resultado.dudosas.filter((d) => !resueltasSet.has(d)),
    sinPar: resultado.sinPar.filter((e) => !resueltasSet.has(e)),
    ignoradas: resultado.ignoradas,
    porSubida: resueltas.map((x) => ({ id: x.id, entrada: x.entrada, subida: aTexto(x.subida) }))
  };
}

// ---- salida ----

const CABECERA = `/*
  ARCHIVO GENERADO — no editar a mano. Lo escribe scripts/cruzar-archivo.js a partir del archivo de charlas
  2020–2026 del sitio viejo del Ateneo (docs/fuentes/sitio-viejo.md); si se vuelve a correr, se pisa.

  Tiene solo las coincidencias SEGURAS entre ese archivo y el catálogo (data/charlas.js), por id de charla:
    fecha       "dd/mm/aaaa"  fecha exacta de la charla
    disertante  "Texto"       tal como figura en el archivo, sin títulos (Dr., Ing.)
    titulo      "Texto"       solo si el catálogo todavía decía [Título]

  DÓNDE SE CORRIGE: en data/correcciones.js (lo que está ahí manda sobre este archivo).
  Las coincidencias dudosas quedan en scripts/salida/cruce-archivo.md para revisarlas a mano.
  Para volver a generarlo:  node scripts/cruzar-archivo.js   (ver scripts/LEEME.md)
*/
`;

function serializarArchivo(datos) {
  return CABECERA + 'window.AAC_ARCHIVO_CHARLAS = ' + JSON.stringify(datos, null, 2) + ';\n';
}

function lineaDeEntrada(e) {
  return `${e.fecha} — ${e.titulo} — ${e.disertante || '(sin disertante indicado)'}`;
}

// Reporte en Markdown para la autora (scripts/salida/cruce-archivo.md, no versionado).
function generarReporte(resultado, correcciones, charlas) {
  const { seguras, dudosas, sinPar, ignoradas } = resultado;
  const corr = correcciones || {};
  const porId = {};
  (charlas || []).forEach((c) => { porId[c.id] = c; });
  const l = [];
  l.push('# Cruce del archivo de charlas 2020–2026 con el catálogo', '');
  const porSubida = resultado.porSubida || [];
  l.push(`- Seguras: ${seguras.length} (guardadas en data/archivo-charlas.js; ${porSubida.length} resueltas por la fecha de subida a YouTube)`);
  l.push(`- Dudosas: ${dudosas.length} (abajo, para decidir)`);
  l.push(`- Sin par en el canal: ${sinPar.length}`);
  l.push(`- Proyecciones ignoradas: ${ignoradas.length}`, '');

  const conflictos = [];
  seguras.forEach(({ id, entrada }) => {
    const c = corr[id];
    if (!c) return;
    if (c.disertante && entrada.disertante && c.disertante !== entrada.disertante) {
      conflictos.push(`- ${id}: correcciones.js dice disertante «${c.disertante}»; el archivo, «${entrada.disertante}».`);
    }
    if (c.titulo && c.titulo !== entrada.titulo) {
      conflictos.push(`- ${id}: correcciones.js dice título «${c.titulo}»; el archivo, «${entrada.titulo}».`);
    }
  });
  l.push('## Diferencias con data/correcciones.js', '');
  l.push(conflictos.length ? 'Manda data/correcciones.js; cambialo ahí si preferís lo del archivo.' : 'Ninguna.', '');
  conflictos.forEach((x) => l.push(x));
  if (conflictos.length) l.push('');

  if (porSubida.length) {
    l.push('## Resueltas por la fecha de subida a YouTube', '');
    l.push('Una sola charla candidata se subió entre el día anterior y los 30 días siguientes a la fecha del archivo y coincide en el título o en el disertante. Ya están en data/archivo-charlas.js; si alguna está mal, corregila en data/correcciones.js.', '');
    porSubida.forEach((x) => l.push(`- ${x.id} ← ${lineaDeEntrada(x.entrada)} (subida el ${x.subida})`));
    l.push('');
  }
  l.push('## Dudosas', '');
  l.push('Para confirmar una, copiá su línea de ejemplo en data/correcciones.js con el id correcto.', '');
  let anio = null;
  dudosas.forEach(({ entrada, candidatos, motivo }) => {
    const a = entrada.fecha.slice(6);
    if (a !== anio) { anio = a; l.push(`### ${a}`, ''); }
    l.push(`- **${lineaDeEntrada(entrada)}** (línea ${entrada.linea})${motivo ? ` — ${motivo}` : ''}`);
    candidatos.forEach((c) => l.push(`  - ${c.id} (año aprox. ${c.anio}, puntaje ${c.puntaje}): ${c.titulo_original}`));
    const ej = candidatos[0] ? candidatos[0].id : 'cNNN';
    const campos = [`fecha: "${entrada.fecha}"`];
    if (entrada.disertante) campos.push(`disertante: ${JSON.stringify(entrada.disertante)}`);
    if (porId[ej] && esPlaceholder(porId[ej].titulo)) campos.push(`titulo: ${JSON.stringify(entrada.titulo)}`);
    l.push(`  - Ejemplo: \`${ej}: { ${campos.join(', ')} },\``);
  });
  l.push('', '## Sin par en el canal', '');
  sinPar.forEach((e) => l.push(`- ${lineaDeEntrada(e)} (línea ${e.linea})`));
  l.push('', '## Proyecciones ignoradas', '');
  ignoradas.forEach((e) => l.push(`- ${lineaDeEntrada(e)} (línea ${e.linea})`));
  l.push('');
  return l.join('\n');
}

module.exports = {
  leerArchivo, fechaDesdeTexto, esProyeccion, palabras, coinciden, puntaje, cruzarArchivo, datosDelArchivo,
  serializarArchivo, generarReporte, leerSubidas, resolverConSubida
};
