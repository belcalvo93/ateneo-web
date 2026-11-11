'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { derivar } = require('../scripts/lib/derivar.js');

const muestra = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'borrador-muestra.json'), 'utf8'));
const TEMAS = [
  { id: 'agua-ambiente', nombre: 'Agua, ambiente y sostenibilidad' },
  { id: 'fisica-matematica', nombre: 'Física y matemática' },
  { id: 'ia-tecnologia', nombre: 'Inteligencia artificial y tecnología' },
  { id: 'espacio-astronomia', nombre: 'Espacio y astronomía' }
];
const sinTemaMalo = { ...muestra, charlas: muestra.charlas.slice(0, 4) };
const por = (charlas, id) => charlas.find((c) => c.id === id);

test('derivar: un tema que no existe es un error y nombra la charla', () => {
  assert.throws(() => derivar(muestra, TEMAS), /m005.*Química inexistente/);
});

test('derivar: mapea el nombre del tema a su id', () => {
  const r = derivar(sinTemaMalo, TEMAS);
  assert.equal(por(r, 'm001').tema, 'agua-ambiente');
  assert.equal(por(r, 'm004').tema, 'espacio-astronomia');
});

test('derivar: renombra anio_aprox -> anio y videos -> partes, sin campos viejos ni nombre de parte', () => {
  const r = derivar(sinTemaMalo, TEMAS);
  const c = por(r, 'm002');
  assert.equal(c.anio, 2023);
  assert.equal(por(r, 'm001').anio, 2026);
  assert.equal('anio_aprox' in c, false);
  assert.equal('videos' in c, false);
  assert.equal(c.partes.length, 3);
  for (const p of c.partes) {
    assert.deepEqual(Object.keys(p), ['duracion', 'url', 'vistas', 'titulo_original']);
  }
  assert.deepEqual(Object.keys(c), ['id', 'titulo', 'disertante', 'tema', 'anio', 'partes', 'revisar']);
});

test('derivar: charla de una parte conserva título original, duración y vistas', () => {
  const c = por(derivar(sinTemaMalo, TEMAS), 'm001');
  assert.deepEqual(c.partes, [
    { duracion: '31:40', url: null, vistas: 15, titulo_original: 'RECICLADO QUIMICO DE RESIDUOS PLASTICOS - Dra Elangeni Gilbert' }
  ]);
  assert.equal(c.disertante, 'Dra Elangeni Gilbert');
  assert.equal(c.titulo, 'RECICLADO QUIMICO DE RESIDUOS PLASTICOS');
  assert.deepEqual(c.revisar, ['titulo']);
});

test('derivar: reordena partes en orden inverso y parsea vistas K', () => {
  const c = por(derivar(sinTemaMalo, TEMAS), 'm002');
  assert.deepEqual(c.partes.map((p) => p.duracion), ['1:02:03', '50:00', '45:10']);
  assert.deepEqual(c.partes.map((p) => p.vistas), [1000, 12000, 1200]);
  assert.equal(c.disertante, 'Dra Ana Luna');
  assert.equal(c.titulo, 'Mitos del cielo');
  assert.deepEqual(c.revisar, []);
});

test('derivar: sin disertante identificable -> placeholders y revisar; vistas desconocidas y partes sin número', () => {
  const r = derivar(sinTemaMalo, TEMAS);
  const c = por(r, 'm003');
  assert.equal(c.titulo, '[Título]');
  assert.equal(c.disertante, '[Disertante]');
  assert.deepEqual(c.partes.map((p) => p.duracion), ['20:00', '21:00']);
  assert.deepEqual(c.partes.map((p) => p.vistas), [null, 7]);
  assert.deepEqual(c.revisar, ['titulo', 'disertante', 'vistas', 'partes']);
  assert.deepEqual(por(r, 'm004').revisar, ['titulo', 'disertante']);
});

test('derivar: conserva ids y cantidad de charlas y partes', () => {
  const r = derivar(sinTemaMalo, TEMAS);
  assert.deepEqual(r.map((c) => c.id), ['m001', 'm002', 'm003', 'm004']);
  assert.equal(r.reduce((n, c) => n + c.partes.length, 0), 7);
});

test('derivar: no modifica el borrador de entrada', () => {
  const copia = JSON.stringify(sinTemaMalo);
  derivar(sinTemaMalo, TEMAS);
  assert.equal(JSON.stringify(sinTemaMalo), copia);
});

test('derivar: con enlaces confirmados completa url y vistas solo de esas partes (clave = posición en el borrador)', () => {
  const enlaces = {
    m001: { 1: { url: 'https://www.youtube.com/watch?v=AAAAAAAAAAA', vistas: 99 } },
    // m002: el video 1 del borrador es el de "parte 3"; en el resultado queda al final
    m002: { 1: { url: 'https://www.youtube.com/watch?v=BBBBBBBBBBB', vistas: 4321 } }
  };
  const r = derivar(sinTemaMalo, TEMAS, enlaces);
  assert.equal(por(r, 'm001').partes[0].url, 'https://www.youtube.com/watch?v=AAAAAAAAAAA');
  assert.equal(por(r, 'm001').partes[0].vistas, 99);
  const m2 = por(r, 'm002').partes;
  assert.deepEqual(m2.map((p) => p.url), [null, null, 'https://www.youtube.com/watch?v=BBBBBBBBBBB']);
  assert.equal(m2[2].vistas, 4321);
  assert.equal(m2[0].vistas, 1000);
  assert.equal(por(r, 'm004').partes[0].url, null);
});

test('derivar: una vista conocida del canal quita el aviso de vistas', () => {
  const enlaces = { m003: { 1: { url: 'https://www.youtube.com/watch?v=CCCCCCCCCCC', vistas: 10 } } };
  const c = por(derivar(sinTemaMalo, TEMAS, enlaces), 'm003');
  assert.deepEqual(c.partes.map((p) => p.vistas), [10, 7]);
  assert.deepEqual(c.revisar, ['titulo', 'disertante', 'partes']);
});
