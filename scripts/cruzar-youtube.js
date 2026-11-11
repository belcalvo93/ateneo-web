#!/usr/bin/env node
'use strict';

// VISTA PREVIA del cruce con YouTube: hace el mismo cálculo que scripts/derivar-datos.js y escribe solo
// scripts/salida/reporte-cruce.md (no toca data/charlas.js). Sirve para ver qué quedaría dudoso antes de regenerar.
// No usa la red ni necesita yt-dlp: solo lee scripts/salida/canal.jsonl.
//
//   node scripts/cruzar-youtube.js
//   node scripts/cruzar-youtube.js --salida RUTA     (otra carpeta con canal.jsonl; ahí escribe el reporte)
//   node scripts/cruzar-youtube.js --carpeta RUTA    (otra carpeta de datos)

const fs = require('node:fs');
const path = require('node:path');
const { cargarArchivoDeDatos } = require('./lib/cargar-datos.js');
const { leerCanal } = require('./lib/cruce.js');
const { regenerar, generarReporteDudosos } = require('./lib/regenerar.js');

const args = process.argv.slice(2);
const valorDe = (opcion, porDefecto) => {
  const i = args.indexOf(opcion);
  return i >= 0 && args[i + 1] ? path.resolve(args[i + 1]) : porDefecto;
};
const carpeta = valorDe('--carpeta', path.join(__dirname, '..', 'data'));
const salida = valorDe('--salida', path.join(__dirname, 'salida'));
const rutaCanal = path.join(salida, 'canal.jsonl');
const clon = (x) => JSON.parse(JSON.stringify(x));
const opcional = (nombre, variable, vacio) => {
  const ruta = path.join(carpeta, nombre);
  return fs.existsSync(ruta) ? clon(cargarArchivoDeDatos(ruta, variable)) : vacio;
};

if (!fs.existsSync(rutaCanal)) {
  console.error('No encuentro ' + rutaCanal);
  console.error('Primero obtené la lista del canal con yt-dlp; el comando está en scripts/LEEME.md.');
  process.exit(1);
}

try {
  const borrador = JSON.parse(fs.readFileSync(path.join(carpeta, 'charlas-borrador.json'), 'utf8'));
  const temas = clon(cargarArchivoDeDatos(path.join(carpeta, 'temas.js'), 'AAC_TEMAS'));
  const previas = opcional('charlas.js', 'AAC_CHARLAS', null);
  const { videos, invalidas } = leerCanal(fs.readFileSync(rutaCanal, 'utf8'));
  const r = regenerar({ borrador, temas, videos, previas, correcciones: opcional('correcciones.js', 'AAC_CORRECCIONES', {}), nuevas: opcional('charlas-nuevas.js', 'AAC_CHARLAS_NUEVAS', []) });
  const totalPartes = r.charlas.reduce((n, c) => n + c.partes.length, 0);

  fs.writeFileSync(path.join(salida, 'reporte-cruce.md'), generarReporteDudosos(r, { totalPartes, totalVideos: videos.length, invalidas }));

  console.log('Videos del canal leídos: ' + videos.length + (invalidas.length ? ' (' + invalidas.length + ' líneas inválidas)' : ''));
  console.log('Partes con enlace:       ' + r.resumen.asignadas + ' de ' + totalPartes);
  console.log('Partes sin enlace:       ' + r.dudosos.length);
  console.log('Videos nuevos o sin charla: ' + r.videosNuevos.length);
  console.log('Escribí reporte-cruce.md en ' + salida + ' (data/charlas.js no se tocó; para actualizarlo: node scripts/derivar-datos.js)');
} catch (error) {
  console.error('No se pudo hacer el cruce: ' + error.message);
  process.exit(1);
}
