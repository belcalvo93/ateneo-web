'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { regenerar, idDeVideo, compararCatalogos, generarReporteDudosos } = require('../scripts/lib/regenerar.js');

const URL_ = (id) => 'https://www.youtube.com/watch?v=' + id;
const TEMAS = [{ id: 'geologia', nombre: 'Geología' }, { id: 'ia-tecnologia', nombre: 'IA' }];
const BORRADOR = {
  charlas: [
    { id: 'c001', tema: 'Geología', anio_aprox: 2024, videos: [{ titulo_original: 'Litio - Dra Ana Luna', duracion: '10:00', vistas: '5', url: null }] },
    {
      id: 'c002', tema: 'IA', anio_aprox: 2022,
      videos: [
        { titulo_original: 'Redes - Dr Juan Paz - parte 2', duracion: '20:00', vistas: '7', url: null },
        { titulo_original: 'Redes - Dr Juan Paz - parte 1', duracion: '30:00', vistas: '9', url: null }
      ]
    },
    { id: 'c003', tema: 'Geología', anio_aprox: 2020, videos: [{ titulo_original: 'Viaje a Marte Osvaldo Peinado', duracion: '58:59', vistas: '1 K', url: null }] }
  ]
};
const v = (id, title, duration, view_count) => ({ id, title, duration, view_count });
// Foto del canal "completa": un video con el título exacto de cada parte.
const CANAL = () => [
  v('LLLLLLLLLLL', 'Litio - Dra Ana Luna', 600, 50),
  v('RRRRRRRRRR1', 'Redes - Dr Juan Paz - parte 1', 1800, 90),
  v('RRRRRRRRRR2', 'Redes - Dr Juan Paz - parte 2', 1200, 70),
  v('MMMMMMMMMMM', 'Viaje a Marte Osvaldo Peinado', 3539, 1500)
];
const entrada = (extra) => ({ borrador: BORRADOR, temas: TEMAS, videos: CANAL(), previas: null, correcciones: {}, nuevas: [], ...extra });
const clon = (x) => JSON.parse(JSON.stringify(x));
const urls = (r, id) => r.charlas.find((c) => c.id === id).partes.map((p) => p.url);
const dudosoDe = (r, charla, parte) => r.dudosos.find((d) => d.charla === charla && d.parte === parte);

// ---- idDeVideo ----

test('idDeVideo: saca el id de los dos formatos de enlace y devuelve null si no es un video', () => {
  assert.equal(idDeVideo(URL_('dQw4w9WgXcQ')), 'dQw4w9WgXcQ');
  assert.equal(idDeVideo('https://youtu.be/dQw4w9WgXcQ?t=5'), 'dQw4w9WgXcQ');
  assert.equal(idDeVideo('https://www.youtube.com/watch?feature=share&v=abcdefghijk&t=3'), 'abcdefghijk');
  assert.equal(idDeVideo(null), null);
  assert.equal(idDeVideo('https://ejemplo.com/video'), null);
});

// ---- estructura ----

test('la estructura sale del borrador: ids, partes, orden y datos propios, sin depender del canal', () => {
  const normal = regenerar(entrada());
  const raro = regenerar(entrada({ videos: [v('ZZZZZZZZZZZ', 'Otro título totalmente distinto', 100, 1), v('YYYYYYYYYYY', 'Más cosas', 50, 2)] }));
  const forma = (r) => r.charlas.map((c) => ({ ...c, partes: c.partes.map(({ duracion, titulo_original }) => ({ duracion, titulo_original })) }));
  const sinEnlaces = (r) => forma(r).map(({ id, tema, anio, partes }) => ({ id, tema, anio, partes }));
  assert.deepEqual(sinEnlaces(normal), sinEnlaces(raro));
  assert.deepEqual(normal.charlas.map((c) => c.id), ['c001', 'c002', 'c003']);
  // c002 venía en orden inverso en el borrador: la parte 1 es la que dice "parte 1"
  assert.deepEqual(normal.charlas[1].partes.map((p) => p.titulo_original), ['Redes - Dr Juan Paz - parte 1', 'Redes - Dr Juan Paz - parte 2']);
});

// ---- cruce por título (paso 3) ----

test('título único: asigna el enlace y toma las vistas actuales del canal, sin marca revisar vistas', () => {
  const r = regenerar(entrada());
  assert.deepEqual(urls(r, 'c001'), [URL_('LLLLLLLLLLL')]);
  assert.deepEqual(urls(r, 'c002'), [URL_('RRRRRRRRRR1'), URL_('RRRRRRRRRR2')]);
  assert.equal(r.charlas[0].partes[0].vistas, 50);
  assert.deepEqual(r.charlas[2].partes.map((p) => p.vistas), [1500]);
  assert.equal(r.charlas[2].revisar.includes('vistas'), false);
  assert.equal(r.dudosos.length, 0);
  assert.equal(r.videosNuevos.length, 0);
  assert.equal(r.resumen.asignadas, 4);
});

test('sin foto del canal para esa parte: url null, vistas del borrador y parte en dudosos', () => {
  const r = regenerar(entrada({ videos: CANAL().filter((x) => x.id !== 'MMMMMMMMMMM') }));
  assert.deepEqual(urls(r, 'c003'), [null]);
  assert.equal(r.charlas[2].partes[0].vistas, 1000);
  assert.deepEqual(dudosoDe(r, 'c003', 1), { charla: 'c003', parte: 1, titulo_original: 'Viaje a Marte Osvaldo Peinado', motivo: 'sin-coincidencia', candidatos: [], url_anterior: null });
  assert.deepEqual(urls(r, 'c001'), [URL_('LLLLLLLLLLL')]);
});

test('ambigua: dos videos con el mismo título y duración no se asignan y quedan con sus candidatos', () => {
  const r = regenerar(entrada({ videos: [...CANAL(), v('LLLLLLLLLL2', 'Litio - Dra Ana Luna', 600, 3)] }));
  assert.deepEqual(urls(r, 'c001'), [null]);
  const d = dudosoDe(r, 'c001', 1);
  assert.equal(d.motivo, 'ambigua');
  assert.deepEqual(d.candidatos.map((c) => c.id).sort(), ['LLLLLLLLLL2', 'LLLLLLLLLLL']);
  assert.equal(r.videosNuevos.length, 2); // ninguno de los dos se usó
});

test('aproximado: un título con un error de tipeo se sugiere pero NUNCA se asigna', () => {
  const videos = CANAL().map((x) => (x.id === 'LLLLLLLLLLL' ? { ...x, title: 'Litio - Dra Ana Lunna' } : x));
  const r = regenerar(entrada({ videos }));
  assert.deepEqual(urls(r, 'c001'), [null]);
  const d = dudosoDe(r, 'c001', 1);
  assert.equal(d.motivo, 'sugerencia');
  assert.deepEqual(d.candidatos.map((c) => c.id), ['LLLLLLLLLLL']);
  assert.ok(r.videosNuevos.some((x) => x.id === 'LLLLLLLLLLL'));
});

// ---- conservar el enlace anterior (paso 2) ----

const previasDe = (r) => clon(r.charlas);

test('título cambiado en el canal: conserva el enlace anterior, toma vistas actuales y lo informa', () => {
  const previas = previasDe(regenerar(entrada()));
  const videos = CANAL().map((x) => (x.id === 'LLLLLLLLLLL' ? { ...x, title: 'Litio: una introducción', view_count: 99 } : x));
  const r = regenerar(entrada({ videos, previas }));
  assert.deepEqual(urls(r, 'c001'), [URL_('LLLLLLLLLLL')]);
  assert.equal(r.charlas[0].partes[0].vistas, 99);
  assert.deepEqual(r.tituloCambiado, [{ charla: 'c001', parte: 1, video_id: 'LLLLLLLLLLL', titulo_original: 'Litio - Dra Ana Luna', titulo_canal: 'Litio: una introducción' }]);
  assert.equal(r.dudosos.length, 0);
  assert.equal(r.videosNuevos.length, 0);
});

test('otro caso de título cambiado: partes de otra charla y mismas garantías', () => {
  const previas = previasDe(regenerar(entrada()));
  const videos = CANAL().map((x) => (x.id === 'RRRRRRRRRR2' ? { ...x, title: 'Redes (segunda parte, editada)' } : x));
  const r = regenerar(entrada({ videos, previas }));
  assert.deepEqual(urls(r, 'c002'), [URL_('RRRRRRRRRR1'), URL_('RRRRRRRRRR2')]);
  assert.deepEqual(r.tituloCambiado.map((t) => [t.charla, t.parte]), [['c002', 2]]);
});

test('video vuelto a subir: el anterior ya no está, la parte queda null en dudosos con la sugerencia y el nuevo figura como nuevo', () => {
  const previas = previasDe(regenerar(entrada()));
  const videos = CANAL().filter((x) => x.id !== 'LLLLLLLLLLL').concat(v('NNNNNNNNNNN', 'Litio - Dra Ana Lunna', 600, 4));
  const r = regenerar(entrada({ videos, previas }));
  assert.deepEqual(urls(r, 'c001'), [null]);
  const d = dudosoDe(r, 'c001', 1);
  assert.equal(d.motivo, 'anterior-ausente');
  assert.equal(d.url_anterior, URL_('LLLLLLLLLLL'));
  assert.deepEqual(d.candidatos.map((c) => c.id), ['NNNNNNNNNNN']);
  assert.deepEqual(r.videosNuevos.map((x) => x.id), ['NNNNNNNNNNN']);
});

test('el enlace anterior no se arrastra si cambió el título original de esa posición', () => {
  const previas = previasDe(regenerar(entrada()));
  previas[0].partes[0].titulo_original = 'Otro título viejo'; // esa posición era otra cosa
  const videos = CANAL().filter((x) => x.id !== 'LLLLLLLLLLL');
  const r = regenerar(entrada({ videos, previas }));
  assert.deepEqual(urls(r, 'c001'), [null]);
  assert.equal(dudosoDe(r, 'c001', 1).motivo, 'sin-coincidencia');
});

test('un enlace anterior cuyo video sigue en el canal gana sobre un video nuevo con el título exacto', () => {
  const previas = previasDe(regenerar(entrada()));
  const videos = CANAL().map((x) => (x.id === 'LLLLLLLLLLL' ? { ...x, title: 'Litio, versión larga' } : x)).concat(v('NNNNNNNNNNN', 'Litio - Dra Ana Luna', 600, 4));
  const r = regenerar(entrada({ videos, previas }));
  assert.deepEqual(urls(r, 'c001'), [URL_('LLLLLLLLLLL')]);
  assert.deepEqual(r.videosNuevos.map((x) => x.id), ['NNNNNNNNNNN']);
});

// ---- enlaces manuales (paso 1) ----

test('enlace manual en la foto: reserva el video, no se asigna a otra parte y el generado lleva su URL y vistas', () => {
  // c003 reclama el título "Viaje a Marte…", pero el video MMMMMMMMMMM se fija a mano en c001 parte 1
  const correcciones = { c001: { partes: { 1: { url: URL_('MMMMMMMMMMM') } } } };
  const r = regenerar(entrada({ correcciones }));
  assert.deepEqual(urls(r, 'c001'), [URL_('MMMMMMMMMMM')]);
  assert.equal(r.charlas[0].partes[0].vistas, 1500);
  assert.deepEqual(urls(r, 'c003'), [null]);
  assert.equal(dudosoDe(r, 'c003', 1).motivo, 'sin-coincidencia');
  assert.equal(r.manualesFueraDeFoto.length, 0);
  // el video automático de c001 (LLLLLLLLLLL) queda sin charla: ahora es "nuevo"
  assert.deepEqual(r.videosNuevos.map((x) => x.id), ['LLLLLLLLLLL']);
});

test('enlace manual a la parte 2 por número final, no por título ni posición del borrador', () => {
  const correcciones = { c002: { partes: { 2: { url: URL_('LLLLLLLLLLL') } } } };
  const r = regenerar(entrada({ correcciones }));
  assert.deepEqual(urls(r, 'c002'), [URL_('RRRRRRRRRR1'), URL_('LLLLLLLLLLL')]);
  assert.deepEqual(urls(r, 'c001'), [null]);
});

test('enlace manual fuera de la foto (video no listado): se respeta en el generado y se lista para revisar', () => {
  const correcciones = { c003: { partes: { 1: { url: URL_('PRIVADO0001') } } } };
  const r = regenerar(entrada({ correcciones }));
  assert.deepEqual(urls(r, 'c003'), [URL_('PRIVADO0001')]);
  assert.equal(r.charlas[2].partes[0].vistas, 1000); // sin foto: vistas del borrador
  assert.deepEqual(r.manualesFueraDeFoto, [{ charla: 'c003', parte: 1, url: URL_('PRIVADO0001') }]);
  assert.ok(r.videosNuevos.some((x) => x.id === 'MMMMMMMMMMM'));
});

test('manual null: la parte queda sin enlace aunque haya coincidencia por título, y no figura como dudosa', () => {
  const r = regenerar(entrada({ correcciones: { c001: { partes: { 1: { url: null } } } } }));
  assert.deepEqual(urls(r, 'c001'), [null]);
  assert.equal(dudosoDe(r, 'c001', 1), undefined);
  assert.deepEqual(r.videosNuevos.map((x) => x.id), ['LLLLLLLLLLL']);
});

// ---- charlas nuevas, correcciones que no se copian, pureza ----

test('los videos de charlas nuevas se reservan: no se asignan y no figuran como nuevos', () => {
  const nuevas = [{ id: 'c187', partes: [{ url: URL_('LLLLLLLLLLL') }] }];
  const r = regenerar(entrada({ nuevas }));
  assert.deepEqual(urls(r, 'c001'), [null]);
  assert.equal(r.videosNuevos.length, 0);
});

test('videos del canal sin ninguna parte ni charla nueva se listan como nuevos o sin charla', () => {
  const r = regenerar(entrada({ videos: [...CANAL(), v('EXTRAAAAAAA', 'Charla de este viernes', 3000, 2)] }));
  assert.deepEqual(r.videosNuevos, [{ id: 'EXTRAAAAAAA', title: 'Charla de este viernes', duration: 3000 }]);
});

test('las correcciones de campos NO se copian al generado y los argumentos no se modifican', () => {
  const correcciones = { c001: { titulo: 'Título corregido', disertante: 'Prof. Corregido', tema: 'ia-tecnologia', anio: 2019, destacada: true, confirmados: ['titulo'] } };
  const e = entrada({ correcciones });
  const antes = clon(e);
  const con = regenerar(e);
  const sin = regenerar(entrada());
  assert.deepEqual(con.charlas, sin.charlas);
  assert.equal(JSON.stringify(con.charlas).includes('Corregido'), false);
  assert.deepEqual(clon(e), antes);
});

test('regenerar es estable: regenerar con el resultado anterior como previas da el mismo catálogo', () => {
  const primero = regenerar(entrada());
  const segundo = regenerar(entrada({ previas: clon(primero.charlas) }));
  assert.deepEqual(segundo.charlas, primero.charlas);
  assert.deepEqual(segundo.tituloCambiado, []);
});

// ---- comparación semántica ----

test('compararCatalogos: iguales no da diferencias; distintos informa charla, parte y campo', () => {
  const a = regenerar(entrada()).charlas;
  assert.deepEqual(compararCatalogos(a, clon(a)), []);
  const b = clon(a);
  b[1].partes[1].url = null;
  b[0].anio = 1999;
  const dif = compararCatalogos(a, b);
  assert.equal(dif.length, 2);
  assert.match(dif.join('\n'), /c001.*anio/);
  assert.match(dif.join('\n'), /c002.*parte 2.*url/);
  assert.match(compararCatalogos(a, a.slice(1)).join('\n'), /c001.*falta/);
  assert.match(compararCatalogos(a.slice(1), a).join('\n'), /c001.*sobra/);
});

// ---- reporte ----

test('reporte de dudosos: secciones, bloque para correcciones.js y nada asignado a ciegas', () => {
  const previas = previasDe(regenerar(entrada()));
  const videos = CANAL()
    .filter((x) => x.id !== 'LLLLLLLLLLL' && x.id !== 'MMMMMMMMMMM')
    .map((x) => (x.id === 'RRRRRRRRRR2' ? { ...x, title: 'Redes parte dos, editada' } : x))
    .concat(v('NNNNNNNNNNN', 'Litio - Dra Ana Lunna', 600, 4), v('EXTRAAAAAAA', 'Charla de este viernes', 3000, 2));
  const correcciones = { c003: { partes: { 1: { url: URL_('PRIVADO0001') } } } };
  const r = regenerar(entrada({ videos, previas, correcciones }));
  const md = generarReporteDudosos(r, { totalPartes: 4, totalVideos: videos.length, invalidas: [{ linea: 7, motivo: 'no es JSON válido' }] });
  assert.match(md, /^# Reporte de dudosos/);
  assert.match(md, /Partes sin enlace \(1\)/);
  assert.match(md, /c001 · parte 1 · «Litio - Dra Ana Luna»/);
  assert.match(md, /el video anterior ya no está/i);
  assert.match(md, /NNNNNNNNNNN/);
  assert.match(md, /c001: \{ partes: \{ 1: \{ url: "https:\/\/www\.youtube\.com\/watch\?v=NNNNNNNNNNN" \} \} \}/);
  assert.match(md, /Enlaces manuales que no aparecen en la foto \(1\)/);
  assert.match(md, /PRIVADO0001/);
  assert.match(md, /Videos nuevos o sin charla \(2\)/);
  assert.match(md, /EXTRAAAAAAA/);
  assert.match(md, /Enlaces conservados con título cambiado \(1\)/);
  assert.match(md, /Redes parte dos, editada/);
  assert.match(md, /Líneas inválidas.*\(1\)/s);
  assert.match(md, /línea 7/);
});

test('reporte de dudosos: sin dudosos lo dice y cada sección vacía muestra (ninguna)', () => {
  const r = regenerar(entrada());
  const md = generarReporteDudosos(r, { totalPartes: 4, totalVideos: 4, invalidas: [] });
  assert.match(md, /Partes sin enlace \(0\)/);
  assert.match(md, /\(ninguna\)/);
  assert.match(md, /Asignadas por título \(4\)/);
});
