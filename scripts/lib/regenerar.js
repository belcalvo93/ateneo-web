'use strict';

// Regeneración conservadora del catálogo (D14 de openspec/changes/c-02-datos-charlas/design.md).
// Función pura: no lee ni escribe archivos. Nunca asigna un enlace dudoso y nunca toca las correcciones a mano.

const { derivar } = require('./derivar.js');
const { normalizar, duracionASegundos } = require('./normalizar.js');
const { cruzarPartes } = require('./cruce.js');

const ORDEN_REVISAR = ['titulo', 'disertante', 'vistas', 'partes'];
const RE_ID_VIDEO = /(?:youtube\.com\/watch\?(?:[^#]*&)?v=|youtu\.be\/)([\w-]{11})/;

const esObjeto = (x) => typeof x === 'object' && x !== null && !Array.isArray(x);
const urlDe = (id) => 'https://www.youtube.com/watch?v=' + id;

// Id de video de un enlace de YouTube (watch?v=… o youtu.be/…); null si no es un enlace de video.
function idDeVideo(url) {
  if (typeof url !== 'string') return null;
  const m = RE_ID_VIDEO.exec(url);
  return m ? m[1] : null;
}

const resumirVideo = (v) => ({ id: v.id, title: v.title, duration: v.duration });

// entrada: { borrador, temas, videos (de leerCanal), previas (AAC_CHARLAS actual o null), correcciones, nuevas }
// salida: { charlas, asignadas, dudosos, manualesFueraDeFoto, videosNuevos, tituloCambiado, resumen }
function regenerar(entrada) {
  const { borrador, temas, videos, previas } = entrada;
  const correcciones = esObjeto(entrada.correcciones) ? entrada.correcciones : {};
  const nuevas = Array.isArray(entrada.nuevas) ? entrada.nuevas : [];

  // 1) la estructura sale siempre del borrador, nunca del canal
  const charlas = derivar(borrador, temas);
  const videoPorId = new Map(videos.map((v) => [v.id, v]));
  const usados = new Set(); // videos ya reservados o asignados: se usan a lo sumo una vez

  // Los videos de charlas nuevas y de enlaces manuales se reservan antes de asignar nada.
  for (const c of nuevas) {
    for (const p of esObjeto(c) && Array.isArray(c.partes) ? c.partes : []) {
      const id = esObjeto(p) ? idDeVideo(p.url) : null;
      if (id) usados.add(id);
    }
  }
  const manualDe = (charla, n) => {
    const corr = correcciones[charla];
    const cambio = esObjeto(corr) && esObjeto(corr.partes) ? corr.partes[n] : undefined;
    if (!esObjeto(cambio) || !('url' in cambio)) return undefined;
    if (cambio.url === null) return { url: null };
    return idDeVideo(cambio.url) ? { url: cambio.url, id: idDeVideo(cambio.url) } : undefined;
  };
  for (const corr of Object.values(correcciones)) {
    for (const cambio of esObjeto(corr) && esObjeto(corr.partes) ? Object.values(corr.partes) : []) {
      const id = esObjeto(cambio) ? idDeVideo(cambio.url) : null;
      if (id) usados.add(id);
    }
  }

  const asignadas = [];
  const tituloCambiado = [];
  const manualesFueraDeFoto = [];
  const orden = new Map(); // "charla|parte" -> posición, para ordenar los dudosos
  const pendientes = [];
  const previaPorId = new Map((Array.isArray(previas) ? previas : []).filter(esObjeto).map((c) => [c.id, c]));

  const poner = (charla, n, parte, video, url, origen) => {
    parte.url = url;
    if (video && Number.isInteger(video.view_count)) parte.vistas = video.view_count;
    asignadas.push({ charla, parte: n, url, origen });
  };

  // 2) enlaces manuales (ganan siempre) y enlaces anteriores cuyo video sigue en el canal
  const decididas = new Set();
  let posicion = 0;
  for (const c of charlas) {
    c.partes.forEach((p, i) => {
      const n = i + 1;
      orden.set(c.id + '|' + n, posicion++);
      const manual = manualDe(c.id, n);
      if (!manual) return;
      decididas.add(c.id + '|' + n);
      if (manual.url === null) return; // «sin enlace» decidido a mano: no se busca automáticamente
      const video = videoPorId.get(manual.id) || null;
      poner(c.id, n, p, video, manual.url, 'manual');
      if (!video) manualesFueraDeFoto.push({ charla: c.id, parte: n, url: manual.url });
    });
  }
  for (const c of charlas) {
    c.partes.forEach((p, i) => {
      const n = i + 1;
      if (decididas.has(c.id + '|' + n)) return;
      const previa = previaPorId.get(c.id);
      const anterior = previa && Array.isArray(previa.partes) ? previa.partes[i] : undefined;
      const mismaPosicion = esObjeto(anterior) && anterior.titulo_original === p.titulo_original;
      const idAnterior = mismaPosicion ? idDeVideo(anterior.url) : null;
      const video = idAnterior ? videoPorId.get(idAnterior) : undefined;
      if (video && !usados.has(video.id)) {
        usados.add(video.id);
        poner(c.id, n, p, video, urlDe(video.id), 'anterior');
        if (normalizar(video.title) !== normalizar(p.titulo_original)) {
          tituloCambiado.push({ charla: c.id, parte: n, video_id: video.id, titulo_original: p.titulo_original, titulo_canal: video.title });
        }
        return;
      }
      pendientes.push({
        charla: c.id, parte: n, titulo_original: p.titulo_original, segundos: duracionASegundos(p.duracion),
        urlAusente: idAnterior && !videoPorId.has(idAnterior) ? anterior.url : null
      });
    });
  }

  // 3) cruce por título único entre los videos que quedan libres (nada ambiguo ni aproximado se asigna)
  const libres = videos.filter((v) => !usados.has(v.id));
  const cruce = cruzarPartes(pendientes, libres);
  const parteDe = (a) => charlas.find((c) => c.id === a.charla).partes[a.parte - 1];
  for (const a of cruce.asignadas) {
    poner(a.charla, a.parte, parteDe(a), videoPorId.get(a.video_id), a.url, 'titulo');
  }

  // 4) dudosos: partes que quedan con url null por no haber certeza
  const ausentePorParte = new Map(pendientes.map((x) => [x.charla + '|' + x.parte, x.urlAusente]));
  const dudosos = [];
  const sumar = (lista, motivo) => {
    for (const x of lista) {
      const urlAnterior = ausentePorParte.get(x.charla + '|' + x.parte) || null;
      dudosos.push({
        charla: x.charla, parte: x.parte, titulo_original: x.titulo_original,
        motivo: urlAnterior ? 'anterior-ausente' : motivo, candidatos: x.candidatos || [], url_anterior: urlAnterior
      });
    }
  };
  sumar(cruce.ambiguas, 'ambigua');
  sumar(cruce.sugerencias, 'sugerencia');
  sumar(cruce.sinCoincidencia, 'sin-coincidencia');
  dudosos.sort((a, b) => orden.get(a.charla + '|' + a.parte) - orden.get(b.charla + '|' + b.parte));

  // 5) la marca «vistas» de revisar depende de si quedó alguna parte sin número
  for (const c of charlas) {
    const marcas = new Set(c.revisar.filter((m) => m !== 'vistas'));
    if (c.partes.some((p) => p.vistas === null)) marcas.add('vistas');
    c.revisar = ORDEN_REVISAR.filter((m) => marcas.has(m));
  }

  asignadas.sort((a, b) => orden.get(a.charla + '|' + a.parte) - orden.get(b.charla + '|' + b.parte));
  return {
    charlas,
    asignadas,
    dudosos,
    manualesFueraDeFoto,
    videosNuevos: cruce.sinUsar,
    tituloCambiado,
    resumen: {
      asignadas: asignadas.length,
      porTitulo: asignadas.filter((a) => a.origen === 'titulo').length,
      conservadas: asignadas.filter((a) => a.origen === 'anterior').length,
      manuales: asignadas.filter((a) => a.origen === 'manual').length,
      dudosas: dudosos.length,
      videosNuevos: cruce.sinUsar.length
    }
  };
}

// ---- comparación semántica de dos catálogos (ignora la cabecera: compara solo los datos) ----

const CAMPOS_CHARLA = ['titulo', 'disertante', 'tema', 'anio', 'destacada', 'revisar'];
const CAMPOS_PARTE = ['duracion', 'url', 'vistas', 'titulo_original'];
const mostrar = (x) => (x === undefined ? '(no está)' : JSON.stringify(x));

// compararCatalogos(actual, regenerado) -> lista de diferencias en español (vacía si son iguales)
function compararCatalogos(actual, regenerado) {
  const dif = [];
  const A = new Map(actual.map((c) => [c.id, c]));
  const B = new Map(regenerado.map((c) => [c.id, c]));
  for (const id of A.keys()) if (!B.has(id)) dif.push(id + ': falta en lo regenerado');
  for (const id of B.keys()) if (!A.has(id)) dif.push(id + ': sobra en lo regenerado');
  for (const [id, a] of A) {
    const b = B.get(id);
    if (!b) continue;
    for (const k of CAMPOS_CHARLA) {
      if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) dif.push(id + ' · ' + k + ': era ' + mostrar(a[k]) + ', ahora ' + mostrar(b[k]));
    }
    const n = Math.max(a.partes.length, b.partes.length);
    for (let i = 0; i < n; i++) {
      const pa = a.partes[i];
      const pb = b.partes[i];
      if (!pa || !pb) {
        dif.push(id + ' · parte ' + (i + 1) + ': ' + (pa ? 'falta en lo regenerado' : 'sobra en lo regenerado'));
        continue;
      }
      for (const k of CAMPOS_PARTE) {
        if (JSON.stringify(pa[k]) !== JSON.stringify(pb[k])) dif.push(id + ' · parte ' + (i + 1) + ' · ' + k + ': era ' + mostrar(pa[k]) + ', ahora ' + mostrar(pb[k]));
      }
    }
  }
  const ordenA = actual.map((c) => c.id).join(',');
  const ordenB = regenerado.filter((c) => A.has(c.id)).map((c) => c.id).join(',');
  if (dif.length === 0 && ordenA !== ordenB) dif.push('las charlas están en otro orden');
  return dif;
}

// ---- reporte de dudosos (scripts/salida/reporte-cruce.md) ----

const MOTIVOS = {
  'anterior-ausente': (d) => 'el video anterior ya no está en el canal (' + d.url_anterior + ')',
  ambigua: () => 'hay más de un video con ese título y no se puede elegir cuál es',
  sugerencia: () => 'ningún video tiene ese título exacto; hay títulos parecidos (no se asignó nada)',
  'sin-coincidencia': () => 'ningún video del canal coincide'
};

function generarReporteDudosos(r, info) {
  const L = [];
  const seccion = (titulo, items, lineas) => {
    L.push('## ' + titulo + ' (' + items.length + ')', '');
    if (items.length === 0) L.push('(ninguna)');
    for (const it of items) L.push(...lineas(it));
    L.push('');
  };
  const ref = (x) => x.charla + ' · parte ' + x.parte + ' · «' + x.titulo_original + '»';
  const cand = (c) => '  - ' + c.id + ' · «' + c.title + '»' + (c.duration != null ? ' · ' + c.duration + ' s' : '') + (c.similitud != null ? ' · similitud ' + c.similitud : '');

  L.push('# Reporte de dudosos del cruce con YouTube', '');
  L.push('Lo que sigue es lo que la regeneración NO pudo resolver con certeza. Nada de lo sugerido se asignó solo.', '');
  L.push('## Resumen', '');
  L.push('- Partes del catálogo: ' + info.totalPartes);
  L.push('- Videos del canal leídos: ' + info.totalVideos);
  L.push('- Partes con enlace: ' + r.resumen.asignadas + ' (por título: ' + r.resumen.porTitulo + ', conservadas del catálogo anterior: ' + r.resumen.conservadas + ', fijadas a mano: ' + r.resumen.manuales + ')');
  L.push('- Partes sin enlace: ' + r.dudosos.length);
  L.push('- Enlaces manuales que no aparecen en la foto: ' + r.manualesFueraDeFoto.length);
  L.push('- Videos nuevos o sin charla: ' + r.videosNuevos.length);
  L.push('- Enlaces conservados con título cambiado: ' + r.tituloCambiado.length);
  L.push('- Líneas inválidas en el archivo del canal: ' + info.invalidas.length, '');

  seccion('Partes sin enlace', r.dudosos, (d) => {
    const lineas = ['- ' + ref(d), '  - motivo: ' + MOTIVOS[d.motivo](d)];
    if (d.candidatos.length > 0) lineas.push('  - videos candidatos (revisar a mano):', ...d.candidatos.map((c) => '  ' + cand(c)));
    const url = d.candidatos.length > 0 ? urlDe(d.candidatos[0].id) : '[pegar el enlace]';
    lineas.push('  - si el video correcto es el primero (o el que corresponda), fijalo en data/correcciones.js:', '', '        ' + d.charla + ': { partes: { ' + d.parte + ': { url: "' + url + '" } } },', '');
    return lineas;
  });
  seccion('Enlaces manuales que no aparecen en la foto', r.manualesFueraDeFoto, (m) => ['- ' + m.charla + ' · parte ' + m.parte + ' → ' + m.url + ' (se respeta; puede ser un video no listado o ya borrado: revisalo)']);
  seccion('Videos nuevos o sin charla', r.videosNuevos, (v) => ['- ' + v.id + ' · «' + v.title + '»' + (v.duration != null ? ' · ' + v.duration + ' s' : '')]);
  seccion('Enlaces conservados con título cambiado', r.tituloCambiado, (t) => ['- ' + t.charla + ' · parte ' + t.parte + ' → ' + t.video_id + ': en el catálogo «' + t.titulo_original + '», ahora en el canal «' + t.titulo_canal + '»']);
  seccion('Asignadas por título', r.asignadas.filter((a) => a.origen === 'titulo'), (a) => ['- ' + a.charla + ' · parte ' + a.parte + ' → ' + a.url]);
  seccion('Líneas inválidas', info.invalidas, (i) => ['- línea ' + i.linea + ': ' + i.motivo]);
  return L.join('\n').replace(/\n+$/, '\n');
}

module.exports = { regenerar, idDeVideo, compararCatalogos, generarReporteDudosos };
