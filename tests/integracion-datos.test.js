'use strict';
// Integración: borrador real -> derivación en memoria -> validador, y los data/*.js versionados.
// No usa red ni yt-dlp ni node_modules.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { cargarArchivoDeDatos } = require('../scripts/lib/cargar-datos.js');
const { derivar } = require('../scripts/lib/derivar.js');
const { validar } = require('../scripts/lib/validar.js');

const raiz = path.join(__dirname, '..');
const borrador = JSON.parse(fs.readFileSync(path.join(raiz, 'data', 'charlas-borrador.json'), 'utf8'));
const clon = (x) => JSON.parse(JSON.stringify(x)); // los datos vienen de otro contexto de vm
const temas = clon(cargarArchivoDeDatos(path.join(raiz, 'data', 'temas.js'), 'AAC_TEMAS'));
const proxima = clon(cargarArchivoDeDatos(path.join(raiz, 'data', 'proxima-charla.js'), 'AAC_PROXIMA_CHARLA'));
const versionadas = clon(cargarArchivoDeDatos(path.join(raiz, 'data', 'charlas.js'), 'AAC_CHARLAS'));

const PORTEMA = { geologia: 35, 'ia-tecnologia': 30, 'agua-ambiente': 27, 'neurociencia-salud': 26, 'historia-cultura': 19, 'espacio-astronomia': 17, 'fisica-matematica': 17, 'ingenieria-sismos': 15 };

function conteoPorTema(charlas) {
  const n = {};
  for (const c of charlas) n[c.tema] = (n[c.tema] || 0) + 1;
  return n;
}
const titulosOriginales = (charlas) => charlas.flatMap((c) => c.partes.map((p) => p.titulo_original)).sort();
const duraciones = (charlas) => charlas.flatMap((c) => c.partes.map((p) => c.id + '|' + p.titulo_original + '|' + p.duracion)).sort();

test('derivación real: 186 charlas, 310 partes y conteos por tema', () => {
  const charlas = derivar(borrador, temas);
  assert.equal(charlas.length, 186);
  assert.equal(charlas.reduce((n, c) => n + c.partes.length, 0), 310);
  assert.deepEqual(conteoPorTema(charlas), PORTEMA);
  assert.deepEqual(charlas.map((c) => c.id), borrador.charlas.map((c) => c.id));
});

test('derivación real: no se pierde ningún título original, duración ni año', () => {
  const charlas = derivar(borrador, temas);
  const origen = borrador.charlas.flatMap((c) => c.videos.map((v) => c.id + '|' + v.titulo_original + '|' + v.duracion)).sort();
  assert.deepEqual(duraciones(charlas), origen);
  assert.deepEqual(charlas.map((c) => c.anio), borrador.charlas.map((c) => c.anio_aprox));
});

test('derivación real sin cruce: pasa el validador sin errores y las 310 partes quedan sin url', () => {
  const charlas = derivar(borrador, temas);
  const r = validar({ temas, charlas, proxima });
  assert.deepEqual(r.errores, []);
  assert.equal(r.resumen.partesSinUrl, 310);
  assert.equal(r.fallo, false);
  assert.ok(r.resumen.charlasConRevisar > 0);
});

test('derivación real: los disertantes automáticos son pocos y todos empiezan con título profesional', () => {
  const charlas = derivar(borrador, temas);
  const auto = charlas.filter((c) => c.disertante !== '[Disertante]');
  assert.ok(auto.length >= 25 && auto.length <= 40, 'charlas con disertante automático: ' + auto.length);
  for (const c of auto) assert.match(c.disertante, /^(?:dr|dra|ing|lic|prof|profa|arq|mg|mgter|bioq|geol|geól)\b/i);
});

test('data/*.js versionados: mismas charlas y partes que el borrador y pasan el validador normal', () => {
  assert.equal(versionadas.length, 186);
  assert.equal(versionadas.reduce((n, c) => n + c.partes.length, 0), 310);
  assert.deepEqual(conteoPorTema(versionadas), PORTEMA);
  assert.deepEqual(titulosOriginales(versionadas), borrador.charlas.flatMap((c) => c.videos.map((v) => v.titulo_original)).sort());
  const r = validar({ temas, charlas: versionadas, proxima });
  assert.deepEqual(r.errores, []);
  assert.equal(r.fallo, false);
});

test('data/temas.js: 8 temas con ids únicos y nombres iguales a los del borrador', () => {
  assert.equal(temas.length, 8);
  assert.equal(new Set(temas.map((t) => t.id)).size, 8);
  assert.deepEqual(temas.map((t) => t.nombre).sort(), [...borrador.temas].sort());
});

test('data/correcciones.js y data/charlas-nuevas.js: cargan vacíos, y la vista combinada es el catálogo generado', () => {
  const { aplicarCorrecciones } = require('../js/aplicar-correcciones.js');
  const correcciones = clon(cargarArchivoDeDatos(path.join(raiz, 'data', 'correcciones.js'), 'AAC_CORRECCIONES'));
  const nuevas = clon(cargarArchivoDeDatos(path.join(raiz, 'data', 'charlas-nuevas.js'), 'AAC_CHARLAS_NUEVAS'));
  assert.deepEqual(correcciones, {});
  assert.deepEqual(nuevas, []);
  assert.deepEqual(aplicarCorrecciones(versionadas, correcciones, nuevas), versionadas);
  const r = validar({ temas, charlas: versionadas, correcciones, nuevas, proxima });
  assert.deepEqual(r.errores, []);
  assert.equal(r.resumen.charlas, 186);
});

test('data/charlas.js generado: tiene la marca ARCHIVO GENERADO con fecha y cantidad de videos de la foto', () => {
  const texto = fs.readFileSync(path.join(raiz, 'data', 'charlas.js'), 'utf8');
  assert.match(texto, /ARCHIVO GENERADO/);
  assert.match(texto, /\d{2}\/\d{2}\/\d{4} \(\d+ videos\)/);
  assert.equal((texto.match(/AÑO APROXIMADO/g) || []).length, 1);
});
