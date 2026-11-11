'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { validar } = require('../scripts/lib/validar.js');

const OPC = { anioActual: 2026 };
const YT = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const YT2 = 'https://www.youtube.com/watch?v=eeeeeeeeeee';

function datos() {
  return {
    temas: [
      { id: 'geologia', nombre: 'Geología', etiqueta: 'Geología', playlist_url: null },
      { id: 'ia-tecnologia', nombre: 'IA', etiqueta: 'IA', playlist_url: null }
    ],
    charlas: [
      { id: 'c001', titulo: '[Título]', disertante: '[Disertante]', tema: 'geologia', anio: 2024,
        partes: [{ duracion: '10:00', url: YT, vistas: 5, titulo_original: 'a' }], revisar: ['titulo', 'disertante'] },
      { id: 'c002', titulo: 'Redes', disertante: 'Dr Juan Paz', tema: 'ia-tecnologia', anio: 2020,
        partes: [{ duracion: '10:00', url: YT, vistas: 5, titulo_original: 'b' }, { duracion: '9:05', url: null, vistas: 0, titulo_original: 'c' }], revisar: [] }
    ],
    correcciones: {},
    nuevas: [],
    proxima: { titulo: 'T', disertante: 'D', descripcion: 'x', fecha: '14/11/2026', hora: '18:00', lugar: 'L', modalidad: 'M', zoom_url: null, correo_inscripcion: 'a@b.com' }
  };
}
const nueva = (extra) => ({ id: 'c003', titulo: 'Nueva', disertante: 'Dr Ana', tema: 'geologia', anio: 2026,
  partes: [{ duracion: '5:00', url: YT2, vistas: null, titulo_original: 'n' }], revisar: [], ...extra });
const err = (d) => validar(d, OPC).errores;
const enArchivo = (lista, archivo) => lista.filter((e) => e.archivo === archivo);

test('sin correcciones ni nuevas ni claves: se comporta como antes', () => {
  const d = datos();
  delete d.correcciones;
  delete d.nuevas;
  const r = validar(d, OPC);
  assert.deepEqual(r.errores, []);
  assert.equal(r.resumen.charlas, 2);
});

test('correcciones válidas dan cero errores y resuelven pendientes en la vista combinada', () => {
  const d = datos();
  d.correcciones = { c001: { titulo: 'Litio', disertante: 'Dra Ana Luna', tema: 'ia-tecnologia', anio: 2023, destacada: true }, c002: { partes: { 2: { url: YT2 } }, confirmados: ['vistas'] } };
  const r = validar(d, OPC);
  assert.deepEqual(r.errores, []);
  assert.equal(r.avisos.filter((a) => a.tipo === 'placeholder').length, 0);
  assert.equal(r.avisos.filter((a) => a.tipo === 'revisar').length, 0);
  assert.equal(r.resumen.partesSinUrl, 0);
  assert.equal(r.resumen.charlasConRevisar, 0);
});

test('completar solo el disertante deja solo el pendiente del título', () => {
  const d = datos();
  d.correcciones = { c001: { disertante: 'Prof. Juan Pérez' } };
  const r = validar(d, OPC);
  assert.deepEqual(r.avisos.filter((a) => a.tipo === 'placeholder').map((a) => a.campo), ['titulo']);
  assert.deepEqual(r.avisos.filter((a) => a.tipo === 'revisar').map((a) => a.campo), ['titulo']);
});

test('corrección a charla inexistente: error en data/correcciones.js con la charla', () => {
  const d = datos();
  d.correcciones = { c999: { titulo: 'x' } };
  const e = enArchivo(err(d), 'data/correcciones.js');
  assert.equal(e.length, 1);
  assert.equal(e[0].charla, 'c999');
  assert.match(e[0].mensaje, /no existe/);
  assert.equal(validar(d, OPC).fallo, true);
});

test('corrección a una charla nueva es válida', () => {
  const d = datos();
  d.nuevas = [nueva()];
  d.correcciones = { c003: { titulo: 'Corregida' } };
  assert.deepEqual(err(d), []);
});

test('campo desconocido en una corrección: informa charla y campo', () => {
  const d = datos();
  d.correcciones = { c001: { titlo: 'x' }, c002: { cualquiera: 1 } };
  const e = enArchivo(err(d), 'data/correcciones.js');
  assert.deepEqual(e.map((x) => [x.charla, x.campo]), [['c001', 'titlo'], ['c002', 'cualquiera']]);
  assert.match(e[0].mensaje, /desconocido/);
});

test('tema inválido en una corrección', () => {
  const d = datos();
  d.correcciones = { c001: { tema: 'quimica' } };
  const e = enArchivo(err(d), 'data/correcciones.js');
  assert.deepEqual(e.map((x) => [x.charla, x.campo]), [['c001', 'tema']]);
  assert.match(e[0].mensaje, /quimica/);
});

test('tipos incorrectos en una corrección', () => {
  const casos = [
    [{ titulo: '' }, 'titulo'], [{ disertante: 3 }, 'disertante'], [{ anio: '2023' }, 'anio'], [{ anio: 1990 }, 'anio'],
    [{ destacada: 'si' }, 'destacada'], [{ confirmados: 'titulo' }, 'confirmados'], [{ confirmados: ['otra'] }, 'confirmados']
  ];
  for (const [corr, campo] of casos) {
    const d = datos();
    d.correcciones = { c001: corr };
    const e = enArchivo(err(d), 'data/correcciones.js');
    assert.deepEqual(e.map((x) => x.campo), [campo], JSON.stringify(corr));
  }
});

test('partes: número inexistente, campo distinto de url y url que no es de YouTube', () => {
  const d = datos();
  d.correcciones = { c002: { partes: { 3: { url: YT } } } };
  let e = enArchivo(err(d), 'data/correcciones.js');
  assert.deepEqual(e.map((x) => [x.charla, x.parte, x.campo]), [['c002', 3, 'partes']]);
  assert.match(e[0].mensaje, /no existe/);

  d.correcciones = { c002: { partes: { 1: { enlace: YT }, 2: { url: 'https://ejemplo.com/v' } } } };
  e = enArchivo(err(d), 'data/correcciones.js');
  assert.deepEqual(e.map((x) => [x.parte, x.campo]), [[1, 'enlace'], [1, 'url'], [2, 'url']]);

  d.correcciones = { c002: { partes: { 1: { url: null }, 2: { url: YT2 } } } };
  assert.deepEqual(err(d), []);
});

test('correcciones que no es un objeto o entrada que no es un objeto', () => {
  const d = datos();
  d.correcciones = [];
  assert.equal(enArchivo(err(d), 'data/correcciones.js').length, 1);
  d.correcciones = { c001: 'texto' };
  assert.equal(enArchivo(err(d), 'data/correcciones.js').length, 1);
});

test('charla nueva con id repetido del generado: error en data/charlas-nuevas.js', () => {
  const d = datos();
  d.nuevas = [nueva({ id: 'c002' })];
  const e = enArchivo(err(d), 'data/charlas-nuevas.js');
  assert.equal(e.length, 1);
  assert.equal(e[0].charla, 'c002');
  assert.match(e[0].mensaje, /repetido/);
});

test('charla nueva con otros errores se atribuye a data/charlas-nuevas.js y cuenta en el resumen', () => {
  const d = datos();
  d.nuevas = [nueva({ tema: 'quimica' }), nueva({ id: 'c004', partes: [{ duracion: '1h10', url: null, vistas: null, titulo_original: 'x' }] })];
  const r = validar(d, OPC);
  assert.deepEqual(enArchivo(r.errores, 'data/charlas-nuevas.js').map((e) => [e.charla, e.campo]), [['c003', 'tema'], ['c004', 'duracion']]);
  assert.equal(enArchivo(r.errores, 'data/charlas.js').length, 0);
  assert.equal(r.resumen.charlas, 4);
});

test('nuevas que no es una lista', () => {
  const d = datos();
  d.nuevas = {};
  assert.equal(enArchivo(err(d), 'data/charlas-nuevas.js').length, 1);
});

test('un pendiente de una charla nueva se atribuye a charlas-nuevas.js', () => {
  const d = datos();
  d.nuevas = [nueva({ disertante: '[Disertante]' })];
  const a = validar(d, OPC).avisos.find((x) => x.tipo === 'placeholder' && x.charla === 'c003');
  assert.equal(a.archivo, 'data/charlas-nuevas.js');
});
