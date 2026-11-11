'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { serializar } = require('../scripts/lib/serializar.js');

const CHARLAS = [
  {
    id: 'c001', titulo: '[Título]', disertante: '[Disertante]', tema: 'geologia', anio: 2026,
    partes: [{ duracion: '1:10:57', url: null, vistas: 5, titulo_original: 'Título con "comillas" y tildes: ñandú' }],
    revisar: ['titulo', 'disertante']
  },
  {
    id: 'c002', titulo: 'Otra', disertante: 'Dra Ana Luna', tema: 'ia-tecnologia', anio: 2020,
    partes: [{ duracion: '3:05', url: 'https://www.youtube.com/watch?v=AAAAAAAAAAA', vistas: null, titulo_original: 'Otra - Dra Ana Luna' }],
    revisar: ['vistas']
  }
];

test('serializar: genera window.AAC_CHARLAS cuyo arreglo es JSON válido y se ejecuta como script', () => {
  const salida = serializar(CHARLAS);
  const w = {};
  vm.runInNewContext(salida, { window: w });
  assert.deepEqual(Object.keys(w), ['AAC_CHARLAS']);
  assert.deepEqual(JSON.parse(JSON.stringify(w.AAC_CHARLAS)), CHARLAS); // JSON: el arreglo viene de otro contexto de vm
  const cuerpo = salida.slice(salida.indexOf('window.AAC_CHARLAS = ') + 'window.AAC_CHARLAS = '.length, salida.lastIndexOf(';'));
  assert.deepEqual(JSON.parse(cuerpo), CHARLAS);
});

test('serializar: es determinístico (dos corridas idénticas, sin fecha)', () => {
  assert.equal(serializar(CHARLAS), serializar(JSON.parse(JSON.stringify(CHARLAS))));
  assert.doesNotMatch(serializar(CHARLAS), /20\d\d-\d\d-\d\d|\d{2}\/\d{2}\/\d{4} \d/);
});

test('serializar: la cabecera avisa que el año es aproximado y cómo validar', () => {
  const salida = serializar(CHARLAS);
  const cabecera = salida.slice(0, salida.indexOf('window.AAC_CHARLAS'));
  assert.match(cabecera, /^\/\*/);
  assert.match(cabecera, /aproximad/i);
  assert.match(cabecera, /node scripts\/validar-datos\.js/);
  assert.match(cabecera, /data\/charlas-borrador\.json/);
  assert.match(cabecera, /destacada/);
});

test('serializar: arreglo vacío también es válido', () => {
  const w = {};
  vm.runInNewContext(serializar([]), { window: w });
  assert.deepEqual(JSON.parse(JSON.stringify(w.AAC_CHARLAS)), []);
});

test('serializar: la cabecera dice GENERADO, no editar a mano, y manda a las correcciones y charlas nuevas', () => {
  const salida = serializar(CHARLAS, { fechaFoto: '06/11/2026', totalVideos: 310 });
  const cabecera = salida.slice(0, salida.indexOf('window.AAC_CHARLAS'));
  assert.match(cabecera, /ARCHIVO GENERADO/);
  assert.match(cabecera, /no (lo )?edit/i);
  assert.match(cabecera, /data\/correcciones\.js/);
  assert.match(cabecera, /data\/charlas-nuevas\.js/);
  assert.doesNotMatch(cabecera, /se edita A MANO/i);
});

test('serializar: informa fecha de la foto del canal y cantidad de videos, y el cuerpo no cambia', () => {
  const a = serializar(CHARLAS, { fechaFoto: '06/11/2026', totalVideos: 310 });
  assert.match(a, /06\/11\/2026/);
  assert.match(a, /310 videos/);
  const b = serializar(CHARLAS, { fechaFoto: '15/12/2026', totalVideos: 12 });
  assert.match(b, /15\/12\/2026/);
  assert.match(b, /12 videos/);
  assert.doesNotMatch(b, /310 videos/);
  const cuerpo = (t) => t.slice(t.indexOf('window.AAC_CHARLAS'));
  assert.equal(cuerpo(a), cuerpo(b));
});

test('serializar: el aviso de año aproximado aparece una sola vez', () => {
  const salida = serializar(CHARLAS, { fechaFoto: '06/11/2026', totalVideos: 310 });
  assert.equal((salida.match(/AÑO APROXIMADO/g) || []).length, 1);
});
