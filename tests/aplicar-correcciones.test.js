'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { aplicarCorrecciones } = require('../js/aplicar-correcciones.js');

const URL_A = 'https://www.youtube.com/watch?v=AAAAAAAAAAA';
const URL_B = 'https://www.youtube.com/watch?v=BBBBBBBBBBB';
const URL_C = 'https://www.youtube.com/watch?v=CCCCCCCCCCC';

const parte = (url, titulo) => ({ duracion: '10:00', url, vistas: 5, titulo_original: titulo || 'orig' });
const generadas = () => [
  { id: 'c001', titulo: '[Título]', disertante: '[Disertante]', tema: 'geologia', anio: 2024, partes: [parte(URL_A, 'uno')], revisar: ['titulo', 'disertante', 'vistas'] },
  { id: 'c002', titulo: 'TODO EN MAYUSCULAS', disertante: 'Dra Ana Luna', tema: 'ia-tecnologia', anio: 2020, partes: [parte(URL_B, 'a'), parte(null, 'b')], revisar: ['titulo', 'partes'] }
];
const clon = (x) => JSON.parse(JSON.stringify(x));
const por = (lista, id) => lista.find((c) => c.id === id);

test('sin correcciones ni nuevas: igual al generado y sin modificarlo', () => {
  const g = generadas();
  const copia = clon(g);
  const r = aplicarCorrecciones(g, {}, []);
  assert.deepEqual(r, copia);
  assert.deepEqual(g, copia);
  assert.notEqual(r[0], g[0]); // objetos nuevos
});

test('tolera correcciones y nuevas ausentes', () => {
  assert.deepEqual(aplicarCorrecciones(generadas()), generadas());
  assert.deepEqual(aplicarCorrecciones(generadas(), null, null), generadas());
});

test('corrige titulo, disertante, tema, anio y destacada sin tocar partes ni titulo_original', () => {
  const r = aplicarCorrecciones(generadas(), {
    c001: { titulo: 'Energía solar', disertante: 'Prof. Juan Pérez', tema: 'agua-ambiente', anio: 2023, destacada: true }
  }, []);
  const c = por(r, 'c001');
  assert.equal(c.titulo, 'Energía solar');
  assert.equal(c.disertante, 'Prof. Juan Pérez');
  assert.equal(c.tema, 'agua-ambiente');
  assert.equal(c.anio, 2023);
  assert.equal(c.destacada, true);
  assert.deepEqual(c.partes, generadas()[0].partes);
  assert.deepEqual(por(r, 'c002'), generadas()[1]); // las demás no cambian
});

test('otra charla, otros valores: destacada false y solo el campo corregido cambia', () => {
  const r = aplicarCorrecciones(generadas(), { c002: { destacada: false, anio: 2021 } }, []);
  const c = por(r, 'c002');
  assert.equal(c.destacada, false);
  assert.equal(c.anio, 2021);
  assert.equal(c.titulo, 'TODO EN MAYUSCULAS');
});

test('completar disertante con texto real quita esa marca de revisar', () => {
  const r = aplicarCorrecciones(generadas(), { c001: { disertante: 'Prof. Juan Pérez' } }, []);
  assert.deepEqual(por(r, 'c001').revisar, ['titulo', 'vistas']);
});

test('completar titulo con texto real quita su marca; un placeholder entre corchetes no la quita', () => {
  const a = aplicarCorrecciones(generadas(), { c001: { titulo: 'Un título' } }, []);
  assert.deepEqual(por(a, 'c001').revisar, ['disertante', 'vistas']);
  const b = aplicarCorrecciones(generadas(), { c001: { titulo: '[Otro placeholder]', disertante: '  [Disertante]  ' } }, []);
  assert.deepEqual(por(b, 'c001').revisar, ['titulo', 'disertante', 'vistas']);
});

test('confirmados quita las marcas listadas y deja el título como está', () => {
  const r = aplicarCorrecciones(generadas(), { c002: { confirmados: ['titulo'] } }, []);
  assert.deepEqual(por(r, 'c002').revisar, ['partes']);
  assert.equal(por(r, 'c002').titulo, 'TODO EN MAYUSCULAS');
  const r2 = aplicarCorrecciones(generadas(), { c002: { confirmados: ['titulo', 'partes'] } }, []);
  assert.deepEqual(por(r2, 'c002').revisar, []);
});

test('enlace manual por id de charla y número de parte (también null para anular)', () => {
  const r = aplicarCorrecciones(generadas(), { c002: { partes: { 2: { url: URL_C }, 1: { url: null } } } }, []);
  assert.deepEqual(por(r, 'c002').partes.map((p) => p.url), [null, URL_C]);
  assert.equal(por(r, 'c002').partes[1].vistas, 5);
  assert.equal(por(r, 'c002').partes[1].titulo_original, 'b');
  const r2 = aplicarCorrecciones(generadas(), { c001: { partes: { 1: { url: URL_B } } } }, []);
  assert.deepEqual(por(r2, 'c001').partes.map((p) => p.url), [URL_B]);
});

test('charlas nuevas van al final y también reciben correcciones', () => {
  const nueva = { id: 'c187', titulo: 'Nueva', disertante: 'Dr Ana', tema: 'geologia', anio: 2026, partes: [parte(URL_C)], revisar: [] };
  const r = aplicarCorrecciones(generadas(), { c187: { titulo: 'Nueva corregida' } }, [nueva]);
  assert.deepEqual(r.map((c) => c.id), ['c001', 'c002', 'c187']);
  assert.equal(por(r, 'c187').titulo, 'Nueva corregida');
  assert.equal(nueva.titulo, 'Nueva');
  const dos = aplicarCorrecciones(generadas(), {}, [nueva, { ...nueva, id: 'c188' }]);
  assert.deepEqual(dos.map((c) => c.id), ['c001', 'c002', 'c187', 'c188']);
});

test('correcciones mal escritas se ignoran sin lanzar errores', () => {
  const malas = {
    c999: { titulo: 'No existe' },
    c001: { titlo: 'error de tipeo', anio: '2023', destacada: 'si', partes: { 7: { url: URL_A }, x: { url: URL_A }, 1: { enlace: URL_A } }, confirmados: 'titulo' },
    c002: 'texto'
  };
  const r = aplicarCorrecciones(generadas(), malas, []);
  assert.deepEqual(r, generadas());
  assert.equal(JSON.stringify(r).includes('No existe'), false);
});

test('se carga como <script> común: define solo window.AAC_aplicarCorrecciones', () => {
  const codigo = fs.readFileSync(path.join(__dirname, '..', 'js', 'aplicar-correcciones.js'), 'utf8');
  const contexto = { window: {} };
  vm.runInNewContext(codigo, contexto);
  assert.deepEqual(Object.keys(contexto.window), ['AAC_aplicarCorrecciones']);
  assert.deepEqual(Object.keys(contexto), ['window']);
  const r = contexto.window.AAC_aplicarCorrecciones(generadas(), { c001: { titulo: 'X' } }, []);
  assert.equal(r[0].titulo, 'X');
  assert.doesNotMatch(codigo, /^\s*(import|export)\s/m);
});
