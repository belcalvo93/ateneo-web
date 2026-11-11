'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { leerCanal, cruzar, similitud } = require('../scripts/lib/cruce.js');

const fix = (n) => path.join(__dirname, 'fixtures', n);
const borradorMuestra = JSON.parse(fs.readFileSync(fix('borrador-muestra.json'), 'utf8'));
const canalTexto = fs.readFileSync(fix('canal-muestra.jsonl'), 'utf8');
const URL_ = (id) => 'https://www.youtube.com/watch?v=' + id;

// Borrador mínimo para casos puntuales: una charla por título.
const borrador = (...partes) => ({
  charlas: partes.map(([titulo, duracion], i) => ({ id: 'x' + (i + 1), videos: [{ titulo_original: titulo, duracion: duracion || '10:00' }] }))
});
const video = (id, title, duration, view_count) => ({ id, title, duration: duration === undefined ? null : duration, view_count: view_count === undefined ? null : view_count });

// ---- lectura tolerante ----

test('leerCanal: tolera BOM, líneas vacías, JSON inválido y líneas sin id', () => {
  const { videos, invalidas } = leerCanal(canalTexto);
  assert.deepEqual(videos.map((v) => v.id), ['AAAAAAAAAAA', 'DDDDDDDDDDD', 'EEEEEEEEEEE', 'FFFFFFFFFFF', 'GGGGGGGGGGG', 'HHHHHHHHHHH', 'JJJJJJJJJJJ']);
  assert.equal(invalidas.length, 2);
  assert.deepEqual(invalidas.map((i) => i.linea), [2, 3]);
  assert.match(invalidas[0].motivo, /JSON/);
  assert.match(invalidas[1].motivo, /id/);
});

test('leerCanal: duración numérica o "M:SS"; sin duración queda null; CRLF no molesta', () => {
  const { videos } = leerCanal('{"id":"a","title":"t","duration":61.0}\r\n{"id":"b","title":"t","duration":"1:01"}\r\n{"id":"c","title":"t"}\r\n');
  assert.deepEqual(videos.map((v) => v.duration), [61, 61, null]);
  assert.deepEqual(videos.map((v) => v.view_count), [null, null, null]);
});

test('leerCanal: si el archivo quedó con videos repetidos (yt-dlp agrega al final) se queda con el primero de cada id', () => {
  const linea = (id, vistas) => JSON.stringify({ id, title: 'Charla', duration: 60, view_count: vistas });
  const { videos, invalidas } = leerCanal([linea('a', 1), linea('b', 2), linea('a', 9)].join('\n'));
  assert.deepEqual(videos.map((v) => [v.id, v.view_count]), [['a', 1], ['b', 2]]);
  assert.equal(invalidas.length, 0);
});

// ---- similitud ----

test('similitud: 1 si son iguales, alta con un error de tipeo y baja con textos distintos', () => {
  assert.equal(similitud('imtelectual', 'imtelectual'), 1);
  assert.ok(similitud('la mente imtelectual', 'la mente intelectual') > 0.9);
  assert.ok(similitud('geologia del litio', 'astronomia moderna') < 0.5);
});

// ---- asignación ----

test('cruzar: coincidencia única tras normalizar asigna la url de ese video', () => {
  const r = cruzar(borrador(['PINCELADAS  SANMARTINIANAS J.  M.  AMORETTI']), [video('V1', 'Pinceladas sanmartinianas J. M. Amoretti')]);
  assert.deepEqual(r.asignadas, [{ charla: 'x1', parte: 1, titulo_original: 'PINCELADAS  SANMARTINIANAS J.  M.  AMORETTI', video_id: 'V1', url: URL_('V1'), vistas: null }]);
  assert.deepEqual(r.ambiguas, []);
});

test('cruzar: desempate por duración dentro de ±2 segundos', () => {
  const vids = [video('V1', 'Charla repetida', 600), video('V2', 'Charla repetida', 1200)];
  const r = cruzar(borrador(['Charla repetida', '20:01']), vids);
  assert.equal(r.asignadas[0].video_id, 'V2');
  const r2 = cruzar(borrador(['Charla repetida', '10:00']), vids);
  assert.equal(r2.asignadas[0].video_id, 'V1');
});

test('cruzar: empate sin resolver queda ambigua con ambos candidatos y sin asignar', () => {
  const vids = [video('V1', 'Charla repetida', 600), video('V2', 'Charla repetida', 601)];
  const r = cruzar(borrador(['Charla repetida', '10:00']), vids);
  assert.deepEqual(r.asignadas, []);
  assert.equal(r.ambiguas.length, 1);
  assert.deepEqual(r.ambiguas[0].candidatos.map((c) => c.id).sort(), ['V1', 'V2']);
});

test('cruzar: varios candidatos y ninguno con la duración -> ambigua; sin duración del canal no hay desempate', () => {
  const r = cruzar(borrador(['Charla repetida', '30:00']), [video('V1', 'Charla repetida', 600), video('V2', 'Charla repetida', 1200)]);
  assert.equal(r.ambiguas.length, 1);
  const r2 = cruzar(borrador(['Charla repetida', '10:00']), [video('V1', 'Charla repetida'), video('V2', 'Charla repetida')]);
  assert.equal(r2.ambiguas.length, 1);
});

test('cruzar: error de tipeo no se asigna; se sugiere el video parecido', () => {
  const r = cruzar(borrador(['La mente IMTELECTUAL']), [video('V1', 'La mente INTELECTUAL'), video('V2', 'Otra charla totalmente distinta')]);
  assert.deepEqual(r.asignadas, []);
  assert.equal(r.sugerencias.length, 1);
  assert.equal(r.sugerencias[0].candidatos[0].id, 'V1');
  assert.equal(r.sugerencias[0].candidatos.some((c) => c.id === 'V2'), false);
  assert.deepEqual(r.sinCoincidencia, []);
});

test('cruzar: no sugiere un video que solo difiere en el número de parte', () => {
  const r = cruzar(borrador(['Energía - Parte 2']), [video('V1', 'Energía - Parte 3'), video('V2', 'Energía - Parte 2 .')]);
  assert.deepEqual(r.sugerencias, []);
  assert.deepEqual(r.asignadas.map((a) => a.video_id), ['V2']);
  const r2 = cruzar(borrador(['Energía - Parte 2']), [video('V1', 'Energía - Parte 3')]);
  assert.deepEqual(r2.sugerencias, []);
  assert.equal(r2.sinCoincidencia.length, 1);
});

test('cruzar: sin ningún video parecido queda sin coincidencia', () => {
  const r = cruzar(borrador(['Geología del litio en Mendoza']), [video('V1', 'Receta de empanadas mendocinas')]);
  assert.deepEqual(r.asignadas, []);
  assert.deepEqual(r.sugerencias, []);
  assert.deepEqual(r.sinCoincidencia.map((x) => [x.charla, x.parte]), [['x1', 1]]);
});

test('cruzar: un video no se asigna a dos partes (ambas pasan a ambiguas)', () => {
  const r = cruzar(borrador(['Misma charla'], ['misma charla!']), [video('V1', 'Misma charla')]);
  assert.deepEqual(r.asignadas, []);
  assert.equal(r.ambiguas.length, 2);
});

test('cruzar: dos partes con el mismo título se reparten dos videos por duración', () => {
  const r = cruzar(borrador(['Dos veces', '10:00'], ['Dos veces', '20:00']), [video('V1', 'Dos veces', 600), video('V2', 'Dos veces', 1200)]);
  assert.deepEqual(r.asignadas.map((a) => [a.charla, a.video_id]), [['x1', 'V1'], ['x2', 'V2']]);
});

test('cruzar: el resultado no depende del orden de los videos', () => {
  const vids = [video('V1', 'Charla repetida', 600), video('V2', 'Charla repetida', 1200), video('V3', 'Otra'), video('V4', 'Más')];
  const b = borrador(['Charla repetida', '20:00'], ['Otra'], ['Charla repetida', '10:00']);
  const normal = JSON.stringify(cruzar(b, vids));
  const invertido = JSON.stringify(cruzar(b, [...vids].reverse()));
  assert.equal(invertido, normal);
});

test('cruzar: lista los videos del canal sin usar', () => {
  const r = cruzar(borrador(['Una']), [video('V1', 'Una'), video('V2', 'Sobrante')]);
  assert.deepEqual(r.sinUsar.map((v) => v.id), ['V2']);
});

test('cruzar: el borrador no se modifica', () => {
  const copia = JSON.stringify(borradorMuestra);
  cruzar(borradorMuestra, leerCanal(canalTexto).videos);
  assert.equal(JSON.stringify(borradorMuestra), copia);
});

// ---- fixture completo ----

test('cruzar: muestra completa (borrador-muestra + canal-muestra)', () => {
  const { videos } = leerCanal(canalTexto);
  const r = cruzar(borradorMuestra, videos);
  assert.deepEqual(r.asignadas.map((a) => [a.charla, a.parte, a.video_id, a.vistas]), [
    ['m001', 1, 'AAAAAAAAAAA', 321],
    ['m003', 1, 'DDDDDDDDDDD', 11],
    ['m003', 2, 'EEEEEEEEEEE', null]
  ]);
  assert.deepEqual(r.ambiguas.map((a) => [a.charla, a.parte, a.candidatos.map((c) => c.id)]), [['m002', 1, ['GGGGGGGGGGG', 'HHHHHHHHHHH']]]);
  assert.deepEqual(r.sugerencias.map((s) => [s.charla, s.parte, s.candidatos[0].id]), [['m004', 1, 'FFFFFFFFFFF']]);
  assert.deepEqual(r.sinCoincidencia.map((s) => [s.charla, s.parte]), [['m002', 2], ['m002', 3], ['m005', 1]]);
  assert.deepEqual(r.sinUsar.map((v) => v.id), ['FFFFFFFFFFF', 'GGGGGGGGGGG', 'HHHHHHHHHHH', 'JJJJJJJJJJJ']);
});

