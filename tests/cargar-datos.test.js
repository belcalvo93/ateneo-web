'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { cargarArchivoDeDatos } = require('../scripts/lib/cargar-datos.js');

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aac-cargar-'));
test.after(() => fs.rmSync(dir, { recursive: true, force: true }));

function archivo(nombre, contenido) {
  const ruta = path.join(dir, nombre);
  fs.writeFileSync(ruta, contenido);
  return ruta;
}

test('cargar: archivo válido devuelve el valor de su variable', () => {
  const ruta = archivo('temas.js', '// comentario\nwindow.AAC_TEMAS = [{ id: "a", }, { id: "b" },];\n');
  const valor = cargarArchivoDeDatos(ruta, 'AAC_TEMAS');
  assert.deepEqual(JSON.parse(JSON.stringify(valor)), [{ id: 'a' }, { id: 'b' }]);
});

test('cargar: acepta un objeto (próxima charla)', () => {
  const ruta = archivo('proxima.js', 'window.AAC_PROXIMA_CHARLA = { hora: "18:00", zoom_url: null };');
  const valor = cargarArchivoDeDatos(ruta, 'AAC_PROXIMA_CHARLA');
  assert.equal(valor.hora, '18:00');
  assert.equal(valor.zoom_url, null);
});

test('cargar: error de sintaxis informa el archivo', () => {
  const ruta = archivo('roto.js', 'window.AAC_CHARLAS = [ { id: "c1" } { id: "c2" } ];');
  assert.throws(() => cargarArchivoDeDatos(ruta, 'AAC_CHARLAS'), (e) => {
    assert.match(e.message, /roto\.js/);
    assert.match(e.message, /sintaxis/i);
    return true;
  });
});

test('cargar: archivo que no define su variable es un error', () => {
  const ruta = archivo('vacio.js', '// nada\n');
  assert.throws(() => cargarArchivoDeDatos(ruta, 'AAC_TEMAS'), /vacio\.js.*AAC_TEMAS/);
  const otra = archivo('otra.js', 'window.AAC_OTRA = [];');
  assert.throws(() => cargarArchivoDeDatos(otra, 'AAC_TEMAS'), /otra\.js.*AAC_TEMAS/);
});

test('cargar: archivo que define globales de más es un error', () => {
  const ruta = archivo('de-mas.js', 'window.AAC_TEMAS = []; window.OTRA_COSA = 1;');
  assert.throws(() => cargarArchivoDeDatos(ruta, 'AAC_TEMAS'), /de-mas\.js.*OTRA_COSA/);
});

test('cargar: archivo inexistente informa el archivo', () => {
  const ruta = path.join(dir, 'no-existe.js');
  assert.throws(() => cargarArchivoDeDatos(ruta, 'AAC_TEMAS'), /no-existe\.js/);
});

test('cargar: el archivo no tiene acceso a require ni a process', () => {
  const ruta = archivo('malo.js', 'window.AAC_TEMAS = typeof require + typeof process;');
  const valor = cargarArchivoDeDatos(ruta, 'AAC_TEMAS');
  assert.equal(valor, 'undefinedundefined');
});
