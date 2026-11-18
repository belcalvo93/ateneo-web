'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const {
  leerArchivo, fechaDesdeTexto, esProyeccion, coinciden, puntaje, cruzarArchivo, datosDelArchivo
} = require('../scripts/lib/archivo.js');

// ---- lectura ----

test('fechaDesdeTexto: fecha normal, mes mal escrito y sin «de» antes del año', () => {
  assert.equal(fechaDesdeTexto('5 de marzo de 2020'), '05/03/2020');
  assert.equal(fechaDesdeTexto('3 de abri de 2020'), '03/04/2020');
  assert.equal(fechaDesdeTexto('14 de noviiembre de 2025'), '14/11/2025');
  assert.equal(fechaDesdeTexto('11 de noviembre 2022'), '11/11/2022');
  assert.equal(fechaDesdeTexto('8 julio de 2022'), '08/07/2022');
  assert.equal(fechaDesdeTexto('4 de septiembre 2020'), '04/09/2020');
});

test('fechaDesdeTexto: devuelve null si la fecha no existe o no se entiende', () => {
  assert.equal(fechaDesdeTexto('31 de febrero de 2023'), null);
  assert.equal(fechaDesdeTexto('5 de marzzo'), null);
  assert.equal(fechaDesdeTexto('5 de xyz de 2020'), null);
  assert.equal(fechaDesdeTexto(''), null);
});

const TEXTO = [
  '# Texto',
  '- a- Propender a un mejoramiento humano',
  '## Archivo de charlas',
  '### Ciclo 2020',
  '- 3 de abri de 2020 — Uranio en Argentina — Guillermo Pensado',
  '- 14 de octubre 2022 — Mesa redonda: El agua en Mendoza. Fuentes y usos — (sin disertante indicado)',
  '- 4 de noviembre 2022 — QUBIC — Beatriz Garcia, Alexis Mancilla, Facundo Lazarte',
  '- 40 de mayo de 2021 — Algo — Alguien',
  '## Otra sección',
  '- 1 de mayo de 2020 — No es del archivo — Nadie'
].join('\n');

test('leerArchivo: lee fecha, título y disertante solo dentro del archivo de charlas', () => {
  const { entradas, invalidas } = leerArchivo(TEXTO);
  assert.equal(entradas.length, 3);
  assert.deepEqual(entradas[0], { linea: 5, fecha: '03/04/2020', titulo: 'Uranio en Argentina', disertante: 'Guillermo Pensado' });
  assert.equal(entradas[1].disertante, null);
  assert.equal(entradas[1].titulo, 'Mesa redonda: El agua en Mendoza. Fuentes y usos');
  assert.equal(entradas[2].disertante, 'Beatriz Garcia, Alexis Mancilla, Facundo Lazarte');
  assert.deepEqual(invalidas, [{ linea: 8, motivo: 'fecha ilegible: 40 de mayo de 2021' }]);
});

test('leerArchivo: tolera CRLF y BOM', () => {
  const { entradas } = leerArchivo('﻿## Archivo de charlas\r\n- 5 de marzo de 2020 — Uno — Ana Pérez\r\n');
  assert.deepEqual(entradas, [{ linea: 2, fecha: '05/03/2020', titulo: 'Uno', disertante: 'Ana Pérez' }]);
});

test('esProyeccion: videos y extractos de otras personas', () => {
  assert.equal(esProyeccion({ disertante: 'Video de Richard P. Feynman' }), true);
  assert.equal(esProyeccion({ disertante: 'Extracto de la conferencia de Andrea Colamedici' }), true);
  assert.equal(esProyeccion({ disertante: 'Video de una entrevista con A. Yupanqui' }), true);
  assert.equal(esProyeccion({ disertante: 'Eduardo Serdoch' }), false);
  assert.equal(esProyeccion({ disertante: null }), false);
});

// ---- comparación de palabras ----

test('coinciden: plural, género y raíz larga; no palabras que solo comparten el comienzo', () => {
  assert.equal(coinciden('neurociencia', 'neurociencias'), true);
  assert.equal(coinciden('geofisica', 'geofisico'), true);
  assert.equal(coinciden('sismico', 'sismica'), true);
  assert.equal(coinciden('electroquimica', 'electricos'), false);
  assert.equal(coinciden('mineria', 'minerales'), false);
});

const parte = (titulo_original) => ({ titulo_original, url: null, duracion: '10:00', vistas: 1 });
const charla = (id, anio, titulos, extra) => Object.assign(
  { id, titulo: '[Título]', disertante: '[Disertante]', tema: 'x', anio, partes: titulos.map(parte), revisar: [] }, extra || {});

test('puntaje: título más largo en el archivo', () => {
  const p = puntaje(
    { fecha: '25/09/2026', titulo: 'Pinceladas Sanmartinianas. La ingeniería de lo imposible', disertante: 'José María Amoretti' },
    charla('c001', 2026, ['PINCELADAS  SANMARTINIANAS J.  M.  AMORETTI']));
  assert.equal(p.titulo, 1);
  assert.ok(p.disertante >= 0.5);
});

test('puntaje: título más largo en YouTube y disertante con título honorífico', () => {
  const p = puntaje(
    { fecha: '29/06/2023', titulo: 'Sistema inmune', disertante: 'Alicia Seltzer' },
    charla('c092', 2022, ['Sistema inmune - Dra Alicia Seltzer - primera parte']));
  assert.equal(p.titulo, 1);
  assert.equal(p.disertante, 1);
});

test('puntaje: varios disertantes cuentan si coincide uno', () => {
  const p = puntaje(
    { fecha: '04/11/2022', titulo: 'QUBIC: Un proyecto de cosmología observacional', disertante: 'Beatriz Garcia, Alexis Mancilla, Facundo Lazarte' },
    charla('c088', 2022, ['Proyecto QUBIC - Dra Beatriz García y equipo']));
  assert.equal(p.disertante, 1);
});

// ---- cruce ----

const CATALOGO = [
  charla('c001', 2026, ['PINCELADAS  SANMARTINIANAS J.  M.  AMORETTI']),
  charla('c032', 2024, ['NEURONAS: La última frontera de las Neurociencias - Dra Alicia Seltzer']),
  charla('c051', 2024, ['De máquinas a vapora los trenes eléctricos - Arq Graciela Moretti - Parte 1']),
  charla('c071', 2023, ['Sinapsis Nerviosa - Dra Alicia Seltzer']),
  charla('c092', 2022, ['Sistema inmune - Dra Alicia Seltzer - primera parte'], { titulo: 'Sistema inmune', disertante: 'Dra Alicia Seltzer' })
];
const entrada = (fecha, titulo, disertante) => ({ linea: 1, fecha, titulo, disertante });

test('cruzarArchivo: coincidencia segura', () => {
  const r = cruzarArchivo([entrada('08/07/2022', 'Sistema inmune', 'Alicia Seltzer')], CATALOGO);
  assert.equal(r.seguras.length, 1);
  assert.equal(r.seguras[0].id, 'c092');
});

test('cruzarArchivo: año aproximado lejano va a dudosas', () => {
  const r = cruzarArchivo([entrada('17/04/2020', 'Neurociencia', 'Alicia Seltzer')], CATALOGO);
  assert.equal(r.seguras.length, 0);
  assert.equal(r.dudosas.length, 1);
  assert.equal(r.dudosas[0].candidatos[0].id, 'c032');
});

test('cruzarArchivo: una palabra parecida y otro disertante no es coincidencia', () => {
  const r = cruzarArchivo([entrada('10/07/2020', 'Electroquímica', 'Raúl Pía')], CATALOGO);
  assert.equal(r.seguras.length, 0);
  assert.equal(r.dudosas.length, 0);
  assert.equal(r.sinPar.length, 1);
});

test('cruzarArchivo: mismo disertante y título que no distingue va a dudosas con candidatas', () => {
  const r = cruzarArchivo([entrada('17/07/2023', 'El Sistema Nervioso y la Neurociencia', 'Alicia Seltzer')], CATALOGO);
  assert.equal(r.seguras.length, 0);
  assert.equal(r.dudosas.length, 1);
  assert.ok(r.dudosas[0].candidatos.length >= 2);
  assert.ok(r.dudosas[0].candidatos.length <= 3);
});

test('cruzarArchivo: dos entradas seguras para la misma charla van las dos a dudosas', () => {
  const r = cruzarArchivo([
    entrada('08/07/2022', 'Sistema inmune', 'Alicia Seltzer'),
    entrada('15/07/2022', 'Sistema inmune (segunda parte)', 'Alicia Seltzer')
  ], CATALOGO);
  assert.equal(r.seguras.length, 0);
  assert.equal(r.dudosas.length, 2);
});

test('cruzarArchivo: si una dudosa tiene a la misma charla como candidata de año compatible, la segura también pasa a dudosa', () => {
  const r = cruzarArchivo([
    entrada('17/07/2023', 'Sinapsis nerviosa', 'Alicia Seltzer'),
    entrada('24/07/2023', 'Neurociencia y sinapsis', 'Alicia Seltzer') // dudosa entre c071 y c032
  ], CATALOGO);
  assert.equal(r.seguras.length, 0);
  assert.equal(r.dudosas.length, 2);
  assert.ok(r.dudosas.some((d) => /c071/.test(d.motivo || '')));
});

test('cruzarArchivo: proyecciones ignoradas y entradas sin disertante', () => {
  const r = cruzarArchivo([
    entrada('27/03/2026', 'La velocidad de la luz no es una velocidad', 'Video de Richard P. Feynman'),
    entrada('25/09/2026', 'Pinceladas Sanmartinianas', null)
  ], CATALOGO);
  assert.equal(r.ignoradas.length, 1);
  assert.equal(r.seguras.length, 1);
  assert.equal(r.seguras[0].id, 'c001');
});

test('serializarArchivo: archivo generado determinístico que solo define AAC_ARCHIVO_CHARLAS', () => {
  const { serializarArchivo } = require('../scripts/lib/archivo.js');
  const vm = require('node:vm');
  const datos = { c001: { fecha: '25/09/2026', disertante: 'José María Amoretti' } };
  const texto = serializarArchivo(datos);
  assert.equal(texto, serializarArchivo(JSON.parse(JSON.stringify(datos))));
  assert.match(texto, /ARCHIVO GENERADO/);
  const window = {};
  vm.runInNewContext(texto, { window });
  assert.deepEqual(Object.keys(window), ['AAC_ARCHIVO_CHARLAS']);
  assert.deepEqual(JSON.parse(JSON.stringify(window.AAC_ARCHIVO_CHARLAS)), datos); // objeto de otro contexto
});

test('generarReporte: totales, dudosas con candidatos, sin par, ignoradas y conflicto con correcciones', () => {
  const { generarReporte } = require('../scripts/lib/archivo.js');
  const resultado = {
    seguras: [{ id: 'c001', entrada: entrada('25/09/2026', 'Pinceladas', 'José María Amoretti') }],
    dudosas: [{ entrada: entrada('17/04/2020', 'Neurociencia', 'Alicia Seltzer'), candidatos: [{ id: 'c032', anio: 2024, titulo_original: 'NEURONAS', puntaje: 1.5 }] }],
    sinPar: [entrada('10/07/2020', 'Electroquímica', 'Raúl Pía')],
    ignoradas: [entrada('27/03/2026', 'La luz', 'Video de Richard P. Feynman')]
  };
  const md = generarReporte(resultado, { c001: { disertante: 'J. M. Amoretti' } }, []);
  assert.match(md, /Seguras: 1/);
  assert.match(md, /Dudosas: 1/);
  assert.match(md, /c032/);
  assert.match(md, /Electroquímica/);
  assert.match(md, /Feynman/);
  assert.match(md, /J\. M\. Amoretti/);
  assert.match(md, /fecha: "17\/04\/2020"/); // cómo confirmarla en correcciones.js
});

test('datosDelArchivo: fecha, disertante del archivo y título solo sobre placeholder', () => {
  const seguras = [
    { id: 'c001', entrada: entrada('25/09/2026', 'Pinceladas Sanmartinianas. La ingeniería de lo imposible', 'José María Amoretti') },
    { id: 'c092', entrada: entrada('08/07/2022', 'Sistema inmune', 'Alicia Seltzer') },
    { id: 'c051', entrada: entrada('14/10/2022', 'Mesa redonda', null) }
  ];
  const d = datosDelArchivo(seguras, CATALOGO);
  assert.deepEqual(Object.keys(d), ['c001', 'c051', 'c092']);
  assert.deepEqual(d.c001, { fecha: '25/09/2026', disertante: 'José María Amoretti', titulo: 'Pinceladas Sanmartinianas. La ingeniería de lo imposible' });
  assert.deepEqual(d.c092, { fecha: '08/07/2022', disertante: 'Alicia Seltzer' });
  assert.deepEqual(d.c051, { fecha: '14/10/2022', titulo: 'Mesa redonda' });
});

// ---- integración con los datos reales ----

test('integración: el archivo del sitio viejo contra el catálogo real', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const { cargarArchivoDeDatos } = require('../scripts/lib/cargar-datos.js');
  const raiz = path.join(__dirname, '..');
  const charlas = cargarArchivoDeDatos(path.join(raiz, 'data', 'charlas.js'), 'AAC_CHARLAS');
  const { entradas, invalidas } = leerArchivo(fs.readFileSync(path.join(raiz, 'docs', 'fuentes', 'sitio-viejo.md'), 'utf8'));
  assert.equal(invalidas.length, 0);
  const r = cruzarArchivo(entradas, charlas);
  assert.equal(r.ignoradas.length, 5);
  assert.equal(r.seguras.length + r.dudosas.length + r.sinPar.length + r.ignoradas.length, entradas.length);
  const ids = r.seguras.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length, 'ninguna charla recibe dos fechas');
  const porId = Object.fromEntries(charlas.map((c) => [c.id, c]));
  r.seguras.forEach((s) => assert.ok(Math.abs(porId[s.id].anio - Number(s.entrada.fecha.slice(6))) <= 1, s.id));
  // El archivo generado tiene todo el cruce por título (y puede tener además las resueltas por fecha de
  // subida, que dependen de scripts/salida/subidas.jsonl, no versionado).
  const generado = JSON.parse(JSON.stringify(cargarArchivoDeDatos(path.join(raiz, 'data', 'archivo-charlas.js'), 'AAC_ARCHIVO_CHARLAS')));
  const base = datosDelArchivo(r.seguras, charlas);
  for (const id of Object.keys(base)) assert.deepEqual(generado[id], base[id], id);
  const fechas = Object.values(generado).map((d) => d.fecha);
  assert.ok(fechas.every((f) => /^\d{2}\/\d{2}\/\d{4}$/.test(f)));
});

// ---- Fecha de subida a YouTube para resolver dudosas (C-02b) ----

const { leerSubidas, resolverConSubida } = require('../scripts/lib/archivo.js');
const yt = (id) => 'https://www.youtube.com/watch?v=' + id;
const conUrl = (c, id) => Object.assign({}, c, { partes: c.partes.map((p) => Object.assign({}, p, { url: yt(id) })) });

test('leerSubidas: id -> AAAAMMDD; ignora líneas inválidas, NA y repetidas', () => {
  const texto = [
    '{"id": "aaaaaaaaaaa", "upload_date": "20221111"}',
    '{"id": "bbbbbbbbbbb", "upload_date": "NA"}',
    'no es json',
    '{"id": "aaaaaaaaaaa", "upload_date": "20221112"}',
    ''
  ].join('\n');
  assert.deepEqual(leerSubidas(texto), { aaaaaaaaaaa: '20221111' });
});

const CAT_SUBIDA = [
  conUrl(charla('c084', 2023, ['Entrelazamiento cuántico - Dr Ernesto Gandolfo Raso - primera parte']), 'aaaaaaaaaaa'),
  conUrl(charla('c166', 2021, ['Neurociencia   Alicia Seltzer   DEBATE']), 'bbbbbbbbbbb'),
  conUrl(charla('c032', 2024, ['NEURONAS: La última frontera de las Neurociencias - Dra Alicia Seltzer']), 'ccccccccccc'),
  conUrl(charla('c109', 2022, ['El Futuro de las Redes III: 4G, 5G,...y 6G ... - Ing Roberto Lauro - primera parte']), 'ddddddddddd')
];
const SUBIDAS = { aaaaaaaaaaa: '20221118', bbbbbbbbbbb: '20200801', ccccccccccc: '20240501', ddddddddddd: '20220510' };

test('resolverConSubida: una dudosa con una sola candidata subida en la ventana pasa a segura', () => {
  const dudosa = { entrada: entrada('11/11/2022', 'Entrelazamiento cuántico', 'Ernesto Gandolfo'), candidatos: [{ id: 'c084' }], motivo: 'otra entrada también apunta a c084' };
  const r = resolverConSubida({ seguras: [], dudosas: [dudosa], sinPar: [], ignoradas: [] }, CAT_SUBIDA, SUBIDAS);
  assert.deepEqual(r.seguras.map((s) => s.id), ['c084']);
  assert.equal(r.porSubida.length, 1);
  assert.equal(r.porSubida[0].subida, '18/11/2022');
  assert.equal(r.dudosas.length, 0);
});

test('resolverConSubida: una sin par que coincide por disertante y subida en la ventana se resuelve', () => {
  const sinPar = entrada('06/05/2022', 'Comunicaciones telefónicas móviles, popularmente llamadas 5G', 'Roberto Lauro');
  const r = resolverConSubida({ seguras: [], dudosas: [], sinPar: [sinPar], ignoradas: [] }, CAT_SUBIDA, SUBIDAS);
  assert.deepEqual(r.seguras.map((s) => s.id), ['c109']);
  assert.equal(r.sinPar.length, 0);
});

test('resolverConSubida: subida fuera de la ventana o sin relación de título ni disertante no resuelve', () => {
  const lejos = entrada('17/04/2020', 'Neurociencia', 'Alicia Seltzer'); // c166 se subió en agosto: más de 30 días
  const sinRelacion = entrada('10/11/2022', 'Mesa de agua', 'Juan Nadie'); // c084 se subió dentro de la ventana, pero no coincide en nada
  const r = resolverConSubida({ seguras: [], dudosas: [{ entrada: lejos, candidatos: [] }], sinPar: [sinRelacion], ignoradas: [] }, CAT_SUBIDA, SUBIDAS);
  assert.equal(r.seguras.length, 0);
  assert.equal(r.dudosas.length, 1);
  assert.equal(r.sinPar.length, 1);
});

test('resolverConSubida: no reasigna una charla ya segura y, si dos entradas resuelven la misma, ninguna se resuelve', () => {
  const a = entrada('11/11/2022', 'Entrelazamiento cuántico', 'Ernesto Gandolfo');
  const b = entrada('12/11/2022', 'Entrelazamiento cuántico II', 'Ernesto Gandolfo');
  const r1 = resolverConSubida({ seguras: [{ id: 'c084', entrada: a }], dudosas: [{ entrada: b, candidatos: [] }], sinPar: [], ignoradas: [] }, CAT_SUBIDA, SUBIDAS);
  assert.equal(r1.seguras.length, 1);
  assert.equal(r1.dudosas.length, 1);
  const r2 = resolverConSubida({ seguras: [], dudosas: [{ entrada: a, candidatos: [] }, { entrada: b, candidatos: [] }], sinPar: [], ignoradas: [] }, CAT_SUBIDA, SUBIDAS);
  assert.equal(r2.seguras.length, 0);
  assert.equal(r2.dudosas.length, 2);
});

test('resolverConSubida: sin datos de subida devuelve el mismo resultado', () => {
  const res = { seguras: [], dudosas: [{ entrada: entrada('11/11/2022', 'Entrelazamiento cuántico', 'Ernesto Gandolfo'), candidatos: [] }], sinPar: [], ignoradas: [] };
  const r = resolverConSubida(res, CAT_SUBIDA, {});
  assert.equal(r.seguras.length, 0);
  assert.equal(r.dudosas.length, 1);
  assert.deepEqual(r.porSubida, []);
});
