'use strict';
// Regresión y supervivencia de correcciones con los datos reales del repo (sin red, sin yt-dlp,
// sin depender de scripts/salida/, que está fuera de git: la foto del canal se sintetiza desde data/charlas.js).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { cargarArchivoDeDatos } = require('../scripts/lib/cargar-datos.js');
const { duracionASegundos } = require('../scripts/lib/normalizar.js');
const { regenerar, compararCatalogos, idDeVideo } = require('../scripts/lib/regenerar.js');
const { aplicarCorrecciones } = require('../js/aplicar-correcciones.js');

const raiz = path.join(__dirname, '..');
const clon = (x) => JSON.parse(JSON.stringify(x));
const borrador = JSON.parse(fs.readFileSync(path.join(raiz, 'data', 'charlas-borrador.json'), 'utf8'));
const temas = clon(cargarArchivoDeDatos(path.join(raiz, 'data', 'temas.js'), 'AAC_TEMAS'));
const versionadas = clon(cargarArchivoDeDatos(path.join(raiz, 'data', 'charlas.js'), 'AAC_CHARLAS'));

// Un video del canal por cada parte del catálogo versionado: mismo título, duración, vistas e id.
const fotoSintetica = () =>
  versionadas.flatMap((c) =>
    c.partes.map((p) => ({ id: idDeVideo(p.url), title: p.titulo_original, duration: duracionASegundos(p.duracion), view_count: p.vistas }))
  );
const contar = (charlas) => [charlas.length, charlas.reduce((n, c) => n + c.partes.length, 0)];

test('regresión: regenerar con las entradas actuales reproduce el catálogo versionado (186 / 310, mismas URLs y vistas)', () => {
  const r = regenerar({ borrador, temas, videos: fotoSintetica(), previas: null, correcciones: {}, nuevas: [] });
  assert.deepEqual(contar(r.charlas), [186, 310]);
  assert.deepEqual(compararCatalogos(versionadas, r.charlas), []);
  assert.deepEqual(r.charlas.map((c) => c.id), versionadas.map((c) => c.id));
  assert.equal(r.dudosos.length, 0);
  assert.equal(r.videosNuevos.length, 0);
});

test('regresión: igual partiendo del catálogo versionado como previas (se conserva todo)', () => {
  const r = regenerar({ borrador, temas, videos: fotoSintetica(), previas: clon(versionadas), correcciones: {}, nuevas: [] });
  assert.deepEqual(compararCatalogos(versionadas, r.charlas), []);
  assert.equal(r.resumen.conservadas, 310);
  assert.equal(r.tituloCambiado.length, 0);
});

test('regresión negativa: si cambia un enlace del canal, la comparación lo detecta', () => {
  const videos = fotoSintetica().filter((v, i) => i !== 0);
  const r = regenerar({ borrador, temas, videos, previas: null, correcciones: {}, nuevas: [] });
  const dif = compararCatalogos(versionadas, r.charlas);
  assert.equal(dif.length > 0, true);
  assert.match(dif.join('\n'), /url/);
});

test('una corrección sobrevive a la regeneración: el generado no cambia y la vista combinada la muestra', () => {
  const correcciones = { c001: { titulo: 'Título corregido a mano', disertante: 'Prof. Prueba', confirmados: ['partes'] } };
  const con = regenerar({ borrador, temas, videos: fotoSintetica(), previas: clon(versionadas), correcciones: clon(correcciones), nuevas: [] });
  const sin = regenerar({ borrador, temas, videos: fotoSintetica(), previas: clon(versionadas), correcciones: {}, nuevas: [] });
  assert.deepEqual(con.charlas, sin.charlas);
  const vista = aplicarCorrecciones(con.charlas, correcciones, []);
  const c001 = vista.find((c) => c.id === 'c001');
  assert.equal(c001.titulo, 'Título corregido a mano');
  assert.equal(c001.disertante, 'Prof. Prueba');
  assert.equal(c001.revisar.includes('disertante'), false);
  assert.equal(vista.find((c) => c.id === 'c002').titulo, con.charlas.find((c) => c.id === 'c002').titulo);
});

// ---- el CLI sobre una copia (nunca sobre data/ real) ----

function armarCopia() {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'aac-regen-'));
  const datos = path.join(base, 'data');
  const salida = path.join(base, 'salida');
  fs.mkdirSync(datos);
  fs.mkdirSync(salida);
  for (const f of ['charlas-borrador.json', 'temas.js']) fs.copyFileSync(path.join(raiz, 'data', f), path.join(datos, f));
  // versión vieja, editada a mano: sin la marca de archivo generado
  fs.writeFileSync(path.join(datos, 'charlas.js'), '/* catálogo viejo editado a mano */\nwindow.AAC_CHARLAS = ' + JSON.stringify(versionadas, null, 2) + ';\n');
  fs.writeFileSync(path.join(datos, 'charlas-nuevas.js'), 'window.AAC_CHARLAS_NUEVAS = [];\n');
  fs.writeFileSync(
    path.join(datos, 'correcciones.js'),
    '// correcciones de prueba, escritas a mano\nwindow.AAC_CORRECCIONES = { c001: { titulo: "Título a mano", confirmados: ["partes"] } };\n'
  );
  const canal = path.join(salida, 'canal.jsonl');
  fs.writeFileSync(canal, fotoSintetica().map((v) => JSON.stringify(v)).join('\n') + '\n');
  const fecha = new Date(2026, 10, 6, 12, 0, 0);
  fs.utimesSync(canal, fecha, fecha);
  return { base, datos, salida, canal };
}
const correr = (args) => spawnSync(process.execPath, [path.join(raiz, 'scripts', 'derivar-datos.js'), ...args], { encoding: 'utf8' });

test('CLI: --comprobar no escribe nada y da código 0 si está al día; 1 y lista diferencias si el canal cambió', () => {
  const { base, datos, salida, canal } = armarCopia();
  try {
    const antes = fs.readFileSync(path.join(datos, 'charlas.js'), 'utf8');
    const ok = correr(['--comprobar', '--carpeta', datos, '--salida', salida]);
    assert.equal(ok.status, 0, ok.stdout + ok.stderr);
    assert.match(ok.stdout, /al día/);

    const lineas = fs.readFileSync(canal, 'utf8').trim().split('\n');
    fs.writeFileSync(canal, lineas.slice(1).join('\n') + '\n'); // desaparece un video
    const malo = correr(['--comprobar', '--carpeta', datos, '--salida', salida]);
    assert.equal(malo.status, 1);
    assert.match(malo.stdout, /diferencias/);
    assert.match(malo.stdout, /url/);
    assert.equal(fs.readFileSync(path.join(datos, 'charlas.js'), 'utf8'), antes);
    assert.equal(fs.existsSync(path.join(salida, 'reporte-cruce.md')), false);
  } finally {
    fs.rmSync(base, { recursive: true, force: true });
  }
});

test('CLI: el catálogo viejo sin marca no se pisa sin --forzar; con --forzar se genera con cabecera, y correcciones.js queda byte a byte igual', () => {
  const { base, datos, salida } = armarCopia();
  try {
    const correcciones = fs.readFileSync(path.join(datos, 'correcciones.js'));
    const nuevas = fs.readFileSync(path.join(datos, 'charlas-nuevas.js'));
    const sinMarca = fs.readFileSync(path.join(datos, 'charlas.js'), 'utf8');
    assert.doesNotMatch(sinMarca, /ARCHIVO GENERADO/);

    const negado = correr(['--carpeta', datos, '--salida', salida]);
    assert.equal(negado.status, 1);
    assert.match(negado.stderr, /ARCHIVO GENERADO/);
    assert.equal(fs.readFileSync(path.join(datos, 'charlas.js'), 'utf8'), sinMarca);

    const hecho = correr(['--forzar', '--carpeta', datos, '--salida', salida]);
    assert.equal(hecho.status, 0, hecho.stdout + hecho.stderr);
    const generado = fs.readFileSync(path.join(datos, 'charlas.js'), 'utf8');
    assert.match(generado, /ARCHIVO GENERADO/);
    assert.match(generado, /06\/11\/2026/);
    assert.match(generado, /310 videos/);
    assert.doesNotMatch(generado, /Título a mano/);
    assert.ok(fs.readFileSync(path.join(datos, 'correcciones.js')).equals(correcciones));
    assert.ok(fs.readFileSync(path.join(datos, 'charlas-nuevas.js')).equals(nuevas));
    assert.match(fs.readFileSync(path.join(salida, 'reporte-cruce.md'), 'utf8'), /^# Reporte de dudosos/);

    // ya generado: se puede regenerar sin --forzar, y no cambia nada
    const otra = correr(['--carpeta', datos, '--salida', salida]);
    assert.equal(otra.status, 0, otra.stdout + otra.stderr);
    assert.equal(fs.readFileSync(path.join(datos, 'charlas.js'), 'utf8'), generado);
    assert.equal(correr(['--comprobar', '--carpeta', datos, '--salida', salida]).status, 0);
  } finally {
    fs.rmSync(base, { recursive: true, force: true });
  }
});

test('CLI: una corrección que fija un enlace a mano se respeta al regenerar con un canal que cambió', () => {
  const { base, datos, salida, canal } = armarCopia();
  try {
    const parte1 = versionadas.find((c) => c.id === 'c001').partes[0];
    const idViejo = idDeVideo(parte1.url);
    // El video de c001 se borra del canal y Agustina sube otro (sin título coincidente); se fija a mano.
    const lineas = fs.readFileSync(canal, 'utf8').trim().split('\n').filter((l) => !l.includes(idViejo));
    lineas.push(JSON.stringify({ id: 'SUBIDONUEVO', title: 'Video re-editado sin relación de título', duration: 100, view_count: 8 }));
    fs.writeFileSync(canal, lineas.join('\n') + '\n');
    const manual = 'https://www.youtube.com/watch?v=SUBIDONUEVO';
    fs.writeFileSync(path.join(datos, 'correcciones.js'), 'window.AAC_CORRECCIONES = { c001: { partes: { 1: { url: "' + manual + '" } } } };\n');
    const antes = fs.readFileSync(path.join(datos, 'correcciones.js'));

    const r = correr(['--forzar', '--carpeta', datos, '--salida', salida]);
    assert.equal(r.status, 0, r.stdout + r.stderr);
    const generado = clon(cargarArchivoDeDatos(path.join(datos, 'charlas.js'), 'AAC_CHARLAS'));
    assert.equal(generado.find((c) => c.id === 'c001').partes[0].url, manual);
    assert.equal(generado.find((c) => c.id === 'c001').partes[0].vistas, 8);
    assert.equal(generado.length, 186);
    assert.ok(fs.readFileSync(path.join(datos, 'correcciones.js')).equals(antes));
    assert.doesNotMatch(fs.readFileSync(path.join(salida, 'reporte-cruce.md'), 'utf8'), /SUBIDONUEVO/); // quedó usado por la corrección
  } finally {
    fs.rmSync(base, { recursive: true, force: true });
  }
});
