#!/usr/bin/env node
'use strict';

// Comprueba que los archivos de data/ están bien escritos y muestra qué falta completar.
//
//   node scripts/validar-datos.js                 (errores = código 1; pendientes = solo avisos)
//   node scripts/validar-datos.js --estricto      (además falla si queda cualquier pendiente: para publicar)
//   node scripts/validar-datos.js --carpeta RUTA  (valida otra carpeta con los archivos de datos, por ejemplo una copia)

const fs = require('node:fs');
const path = require('node:path');
const { cargarArchivoDeDatos } = require('./lib/cargar-datos.js');
const { validar } = require('./lib/validar.js');

const args = process.argv.slice(2);
const estricto = args.includes('--estricto');
const iCarpeta = args.indexOf('--carpeta');
const carpeta = iCarpeta >= 0 && args[iCarpeta + 1] ? path.resolve(args[iCarpeta + 1]) : path.join(__dirname, '..', 'data');

function lugar(x) {
  const partes = [x.archivo];
  if (x.charla) partes.push(x.charla);
  if (x.parte) partes.push('parte ' + x.parte);
  partes.push(x.campo);
  return partes.join(' · ');
}

// ---- cargar los archivos de datos ----
const archivos = [
  ['temas.js', 'AAC_TEMAS', 'temas'],
  ['charlas.js', 'AAC_CHARLAS', 'charlas'],
  ['proxima-charla.js', 'AAC_PROXIMA_CHARLA', 'proxima'],
  // opcionales: si faltan, se toman vacíos
  ['charlas-nuevas.js', 'AAC_CHARLAS_NUEVAS', 'nuevas', []],
  ['correcciones.js', 'AAC_CORRECCIONES', 'correcciones', {}]
];
const datos = {};
const fallosDeCarga = [];
for (const [nombre, variable, clave, vacio] of archivos) {
  if (vacio !== undefined && !fs.existsSync(path.join(carpeta, nombre))) {
    datos[clave] = vacio;
    continue;
  }
  try {
    datos[clave] = cargarArchivoDeDatos(path.join(carpeta, nombre), variable);
  } catch (e) {
    fallosDeCarga.push(e.message);
  }
}
if (fallosDeCarga.length > 0) {
  console.log('ERRORES al leer los archivos de datos:');
  for (const m of fallosDeCarga) console.log('  ✗ ' + m);
  console.log('\nNo se pudo seguir. Corregí el archivo y volvé a correr el validador.');
  process.exit(1);
}

const r = validar(datos, { estricto });

// ---- errores ----
if (r.errores.length > 0) {
  console.log('ERRORES (' + r.errores.length + '):');
  for (const e of r.errores) console.log('  ✗ ' + lugar(e) + ': ' + e.mensaje);
  console.log('');
}

// ---- pendientes, agrupados por charla para que no sean cientos de líneas ----
const pendientes = r.avisos.filter((a) => a.tipo !== 'tema-vacio');
const grupos = new Map();
for (const a of pendientes) {
  const clave = a.archivo + ' · ' + (a.charla || '(general)');
  if (!grupos.has(clave)) grupos.set(clave, { placeholders: [], revisar: [], sinUrl: [] });
  const g = grupos.get(clave);
  if (a.tipo === 'placeholder') g.placeholders.push(a.campo);
  else if (a.tipo === 'revisar') g.revisar.push(a.campo);
  else g.sinUrl.push(a.parte);
}
if (grupos.size > 0) {
  console.log((estricto ? 'PENDIENTES (el modo estricto los cuenta como fallo)' : 'AVISOS (no cortan, pero falta completar)') + ':');
  for (const [clave, g] of grupos) {
    const detalle = [];
    if (g.placeholders.length) detalle.push('sin completar: ' + g.placeholders.join(', '));
    if (g.revisar.length) detalle.push('revisar: ' + g.revisar.join(', '));
    if (g.sinUrl.length) detalle.push('sin enlace en parte ' + g.sinUrl.join(', '));
    console.log('  ! ' + clave + ' — ' + detalle.join(' | '));
  }
  console.log('');
}
for (const a of r.avisos.filter((x) => x.tipo === 'tema-vacio')) {
  console.log('  ! ' + a.archivo + ' · ' + a.mensaje);
}

// ---- resumen ----
const s = r.resumen;
console.log('RESUMEN: ' + s.charlas + ' charlas, ' + s.partes + ' partes.');
console.log('  - Textos sin completar ([…]): ' + s.placeholders);
console.log('  - Charlas con "revisar": ' + s.charlasConRevisar + ' (' + s.entradasRevisar + ' campos a revisar)');
console.log('  - Partes sin url: ' + s.partesSinUrl);
console.log('  - Temas sin charlas: ' + s.temasVacios);
console.log('  - Errores: ' + r.errores.length);

if (r.errores.length === 0 && grupos.size === 0 && s.temasVacios === 0) {
  console.log('\nTodo bien: no hay errores ni pendientes.');
}
if (r.fallo) {
  console.log('\nResultado: FALLO' + (r.errores.length === 0 && estricto ? ' (modo estricto: quedan pendientes)' : ''));
  process.exit(1);
}
console.log('\nResultado: OK' + (grupos.size > 0 ? ' (con pendientes por completar)' : ''));
