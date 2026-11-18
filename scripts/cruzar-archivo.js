#!/usr/bin/env node
'use strict';

// Cruza el archivo de charlas 2020–2026 del sitio viejo con el catálogo.
//
//   node scripts/cruzar-archivo.js
//
// Lee:     docs/fuentes/sitio-viejo.md, data/charlas.js, data/correcciones.js y, si existe,
//          scripts/salida/subidas.jsonl (fecha de subida de cada video, ver scripts/LEEME.md).
// Escribe: data/archivo-charlas.js (coincidencias seguras) y scripts/salida/cruce-archivo.md (reporte).

const fs = require('node:fs');
const path = require('node:path');
const { cargarArchivoDeDatos } = require('./lib/cargar-datos.js');
const { leerArchivo, cruzarArchivo, datosDelArchivo, serializarArchivo, generarReporte, leerSubidas, resolverConSubida } = require('./lib/archivo.js');

const raiz = path.join(__dirname, '..');
const fuente = path.join(raiz, 'docs', 'fuentes', 'sitio-viejo.md');
const charlas = cargarArchivoDeDatos(path.join(raiz, 'data', 'charlas.js'), 'AAC_CHARLAS');
const correcciones = cargarArchivoDeDatos(path.join(raiz, 'data', 'correcciones.js'), 'AAC_CORRECCIONES');

const { entradas, invalidas } = leerArchivo(fs.readFileSync(fuente, 'utf8'));
let resultado = cruzarArchivo(entradas, charlas);
const archivoSubidas = path.join(raiz, 'scripts', 'salida', 'subidas.jsonl');
if (fs.existsSync(archivoSubidas)) {
  resultado = resolverConSubida(resultado, charlas, leerSubidas(fs.readFileSync(archivoSubidas, 'utf8')));
  console.log(`Resueltas por fecha de subida a YouTube: ${resultado.porSubida.length}`);
}

const destino = path.join(raiz, 'data', 'archivo-charlas.js');
fs.writeFileSync(destino, serializarArchivo(datosDelArchivo(resultado.seguras, charlas)));

let reporte = generarReporte(resultado, correcciones, charlas);
if (invalidas.length) {
  reporte += '\n## Líneas que no se pudieron leer\n\n' + invalidas.map((x) => `- línea ${x.linea}: ${x.motivo}`).join('\n') + '\n';
}
const salida = path.join(raiz, 'scripts', 'salida', 'cruce-archivo.md');
fs.mkdirSync(path.dirname(salida), { recursive: true });
fs.writeFileSync(salida, reporte);

console.log(`Entradas leídas: ${entradas.length} (líneas ilegibles: ${invalidas.length})`);
console.log(`Seguras: ${resultado.seguras.length} · Dudosas: ${resultado.dudosas.length} · Sin par: ${resultado.sinPar.length} · Ignoradas: ${resultado.ignoradas.length}`);
console.log('Escrito: data/archivo-charlas.js y scripts/salida/cruce-archivo.md');
