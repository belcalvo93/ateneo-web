'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { validar } = require('../scripts/lib/validar.js');

const OPC = { anioActual: 2026 };
const YT = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

function datosValidos() {
  return {
    temas: [
      { id: 'geologia', nombre: 'Geología, minería y energía', etiqueta: 'Geología', playlist_url: null },
      { id: 'ia-tecnologia', nombre: 'Inteligencia artificial', etiqueta: 'IA', playlist_url: 'https://www.youtube.com/playlist?list=PLabc' }
    ],
    charlas: [
      {
        id: 'c001', titulo: 'Litio', disertante: 'Dra Ana Luna', tema: 'geologia', anio: 2024,
        partes: [{ duracion: '1:10:57', url: YT, vistas: 5, titulo_original: 'Litio - Dra Ana Luna' }],
        revisar: []
      },
      {
        id: 'c002', titulo: 'Redes', disertante: 'Dr Juan Paz', tema: 'ia-tecnologia', anio: 2017,
        partes: [
          { duracion: '31:40', url: 'https://youtu.be/dQw4w9WgXcQ?t=5', vistas: null, titulo_original: 'Redes - Dr Juan Paz parte 1' },
          { duracion: '9:05', url: null, vistas: 0, titulo_original: 'Redes - Dr Juan Paz parte 2' }
        ],
        revisar: [], destacada: true
      }
    ],
    proxima: {
      titulo: 'Energía solar', disertante: 'Dra Ana Luna', descripcion: 'Paneles solares.', fecha: '14/11/2026', hora: '18:00',
      lugar: 'Salón de Actos', modalidad: 'Presencial y por Zoom', zoom_url: null, correo_inscripcion: 'a@b.com'
    }
  };
}

const errores = (d, o = {}) => validar(d, { ...OPC, ...o }).errores;
const campos = (lista) => lista.map((e) => [e.charla, e.parte, e.campo]);

test('validar: datos correctos no dan errores ni avisos de placeholder ni de revisar', () => {
  const r = validar(datosValidos(), OPC);
  assert.deepEqual(r.errores, []);
  assert.deepEqual(r.avisos.filter((a) => a.tipo !== 'url-nula'), []);
  assert.equal(r.fallo, false);
});

// ---- errores de esquema ----

test('validar: tema inexistente informa charla y tema', () => {
  const d = datosValidos();
  d.charlas[0].tema = 'quimica';
  const e = errores(d);
  assert.equal(e.length, 1);
  assert.deepEqual(campos(e), [['c001', null, 'tema']]);
  assert.match(e[0].mensaje, /quimica/);
  assert.equal(e[0].archivo, 'data/charlas.js');
});

test('validar: id de charla duplicado', () => {
  const d = datosValidos();
  d.charlas[1].id = 'c001';
  assert.deepEqual(campos(errores(d)), [['c001', null, 'id']]);
});

test('validar: id de tema duplicado y tema sin etiqueta', () => {
  const d = datosValidos();
  d.temas[1].id = 'geologia';
  d.temas[0].etiqueta = '  ';
  const e = errores(d);
  assert.ok(e.some((x) => x.archivo === 'data/temas.js' && x.campo === 'id'));
  assert.ok(e.some((x) => x.archivo === 'data/temas.js' && x.campo === 'etiqueta'));
});

test('validar: campo faltante y tipo incorrecto', () => {
  const d = datosValidos();
  delete d.charlas[0].disertante;
  d.charlas[1].anio = '2020';
  const e = errores(d);
  assert.deepEqual(campos(e).sort(), [['c001', null, 'disertante'], ['c002', null, 'anio']].sort());
});

test('validar: charla sin partes', () => {
  const d = datosValidos();
  d.charlas[0].partes = [];
  assert.deepEqual(campos(errores(d)), [['c001', null, 'partes']]);
});

test('validar: duración mal escrita informa charla, parte y campo', () => {
  const d = datosValidos();
  d.charlas[1].partes[1].duracion = '1h10';
  assert.deepEqual(campos(errores(d)), [['c002', 2, 'duracion']]);
  d.charlas[1].partes[1].duracion = '12:75';
  assert.deepEqual(campos(errores(d)), [['c002', 2, 'duracion']]);
});

test('validar: url que no es de YouTube; acepta watch y youtu.be', () => {
  const d = datosValidos();
  d.charlas[0].partes[0].url = 'https://ejemplo.com/video';
  assert.deepEqual(campos(errores(d)), [['c001', 1, 'url']]);
  d.charlas[0].partes[0].url = 'https://www.youtube.com/watch?v=short';
  assert.deepEqual(campos(errores(d)), [['c001', 1, 'url']]);
  d.charlas[0].partes[0].url = 'https://youtu.be/dQw4w9WgXcQ';
  assert.deepEqual(errores(d), []);
});

test('validar: vistas no entera ni nula', () => {
  const d = datosValidos();
  d.charlas[0].partes[0].vistas = '5';
  assert.deepEqual(campos(errores(d)), [['c001', 1, 'vistas']]);
  d.charlas[0].partes[0].vistas = 1.5;
  assert.deepEqual(campos(errores(d)), [['c001', 1, 'vistas']]);
  d.charlas[0].partes[0].vistas = -3;
  assert.deepEqual(campos(errores(d)), [['c001', 1, 'vistas']]);
});

test('validar: año fuera de 2017 hasta el año actual', () => {
  const d = datosValidos();
  d.charlas[0].anio = 2016;
  assert.deepEqual(campos(errores(d)), [['c001', null, 'anio']]);
  d.charlas[0].anio = 2027;
  assert.deepEqual(campos(errores(d)), [['c001', null, 'anio']]);
  d.charlas[0].anio = 2026;
  assert.deepEqual(errores(d), []);
});

test('validar: destacada debe ser booleano si está', () => {
  const d = datosValidos();
  d.charlas[0].destacada = 'si';
  assert.deepEqual(campos(errores(d)), [['c001', null, 'destacada']]);
  d.charlas[0].destacada = false;
  assert.deepEqual(errores(d), []);
});

test('validar: campo desconocido en la charla o en la parte (errores de tipeo)', () => {
  const d = datosValidos();
  d.charlas[0].disertane = 'x';
  d.charlas[0].partes[0].link = 'x';
  assert.deepEqual(campos(errores(d)).sort(), [['c001', 1, 'link'], ['c001', null, 'disertane']].sort());
});

test('validar: próxima charla con fecha u hora inválidas', () => {
  const d = datosValidos();
  d.proxima.fecha = '31/02/2026';
  assert.deepEqual(campos(errores(d)), [[null, null, 'fecha']]);
  d.proxima.fecha = '14-11-2026';
  assert.deepEqual(campos(errores(d)), [[null, null, 'fecha']]);
  d.proxima.fecha = '29/02/2028';
  d.proxima.hora = '25:00';
  assert.deepEqual(campos(errores(d)), [[null, null, 'hora']]);
  d.proxima.hora = '9:30';
  assert.deepEqual(campos(errores(d)), [[null, null, 'hora']]);
  d.proxima.hora = '08:30';
  assert.deepEqual(errores(d), []);
});

test('validar: próxima charla con campos de menos o de más', () => {
  const d = datosValidos();
  delete d.proxima.lugar;
  d.proxima.extra = 1;
  const e = errores(d);
  assert.deepEqual(e.map((x) => x.campo).sort(), ['extra', 'lugar']);
  assert.ok(e.every((x) => x.archivo === 'data/proxima-charla.js'));
});

// ---- avisos ----

test('validar: placeholders de la charla y de la próxima charla son avisos, no errores', () => {
  const d = datosValidos();
  d.charlas[0].titulo = '[Título]';
  d.charlas[0].disertante = '[Disertante]';
  d.proxima.fecha = '[fecha]';
  d.proxima.titulo = '[Título de la charla]';
  const r = validar(d, OPC);
  assert.deepEqual(r.errores, []);
  const ph = r.avisos.filter((a) => a.tipo === 'placeholder');
  assert.deepEqual(ph.map((a) => [a.archivo, a.charla, a.campo]).sort(), [
    ['data/charlas.js', 'c001', 'disertante'],
    ['data/charlas.js', 'c001', 'titulo'],
    ['data/proxima-charla.js', null, 'fecha'],
    ['data/proxima-charla.js', null, 'titulo']
  ].sort());
  assert.equal(r.fallo, false);
});

test('validar: revisar y url nula son avisos; el resumen cuenta cada tipo', () => {
  const d = datosValidos();
  d.charlas[1].revisar = ['vistas', 'partes'];
  const r = validar(d, OPC);
  assert.deepEqual(r.avisos.filter((a) => a.tipo === 'revisar').map((a) => [a.charla, a.campo]), [['c002', 'vistas'], ['c002', 'partes']]);
  assert.deepEqual(r.avisos.filter((a) => a.tipo === 'url-nula').map((a) => [a.charla, a.parte]), [['c002', 2]]);
  assert.deepEqual(r.resumen, { charlas: 2, partes: 3, placeholders: 0, charlasConRevisar: 1, entradasRevisar: 2, partesSinUrl: 1, temasVacios: 0 });
});

test('validar: tema sin charlas es un aviso informativo con el nombre del tema', () => {
  const d = datosValidos();
  d.temas.push({ id: 'agua', nombre: 'Agua y ambiente', etiqueta: 'Agua', playlist_url: null });
  const r = validar(d, OPC);
  assert.deepEqual(r.errores, []);
  const a = r.avisos.find((x) => x.tipo === 'tema-vacio');
  assert.match(a.mensaje, /Agua y ambiente/);
  assert.equal(r.resumen.temasVacios, 1);
});

// ---- modo estricto ----

test('validar: modo estricto falla con pendientes pero no por temas vacíos', () => {
  const d = datosValidos();
  d.charlas[1].partes[1].url = YT;
  assert.equal(validar(d, { ...OPC, estricto: true }).fallo, false);

  d.temas.push({ id: 'agua', nombre: 'Agua y ambiente', etiqueta: 'Agua', playlist_url: null });
  assert.equal(validar(d, { ...OPC, estricto: true }).fallo, false);

  d.charlas[0].disertante = '[Disertante]';
  assert.equal(validar(d, { ...OPC, estricto: true }).fallo, true);
  assert.equal(validar(d, OPC).fallo, false);

  const e = datosValidos();
  e.charlas[1].partes[1].url = YT;
  e.charlas[0].revisar = ['titulo'];
  assert.equal(validar(e, { ...OPC, estricto: true }).fallo, true);

  const f = datosValidos(); // queda una url nula
  assert.equal(validar(f, { ...OPC, estricto: true }).fallo, true);
});

test('validar: un error siempre da fallo, con o sin modo estricto', () => {
  const d = datosValidos();
  d.charlas[0].tema = 'x';
  assert.equal(validar(d, OPC).fallo, true);
  assert.equal(validar(d, { ...OPC, estricto: true }).fallo, true);
});
