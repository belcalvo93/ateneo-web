#!/usr/bin/env node
'use strict';

// Regenera data/charlas.js (ARCHIVO GENERADO) a partir de data/charlas-borrador.json y de la foto del canal
// de YouTube (scripts/salida/canal.jsonl), de forma conservadora: no asigna nada dudoso y no toca nunca
// data/correcciones.js ni data/charlas-nuevas.js (solo los lee). También escribe scripts/salida/reporte-cruce.md.
//
//   node scripts/derivar-datos.js               regenera data/charlas.js y el reporte
//   node scripts/derivar-datos.js --comprobar   regenera en memoria y compara con data/charlas.js; no escribe nada
//   node scripts/derivar-datos.js --forzar      también pisa un data/charlas.js viejo que no tiene la marca «ARCHIVO GENERADO»
//   --carpeta RUTA   usa otra carpeta de datos (por ejemplo una copia de data/)
//   --salida RUTA    usa otra carpeta de salida (con canal.jsonl; ahí escribe el reporte)

const fs = require('node:fs');
const path = require('node:path');
const { cargarArchivoDeDatos } = require('./lib/cargar-datos.js');
const { leerCanal } = require('./lib/cruce.js');
const { regenerar, compararCatalogos, generarReporteDudosos } = require('./lib/regenerar.js');
const { serializar } = require('./lib/serializar.js');

const args = process.argv.slice(2);
const valorDe = (opcion, porDefecto) => {
  const i = args.indexOf(opcion);
  return i >= 0 && args[i + 1] ? path.resolve(args[i + 1]) : porDefecto;
};
const carpeta = valorDe('--carpeta', path.join(__dirname, '..', 'data'));
const salida = valorDe('--salida', path.join(__dirname, 'salida'));
const comprobar = args.includes('--comprobar');
const forzar = args.includes('--forzar');

const rutaCharlas = path.join(carpeta, 'charlas.js');
const rutaCanal = path.join(salida, 'canal.jsonl');
const opcional = (nombre, variable, vacio) => {
  const ruta = path.join(carpeta, nombre);
  return fs.existsSync(ruta) ? cargarArchivoDeDatos(ruta, variable) : vacio;
};
const clon = (x) => JSON.parse(JSON.stringify(x)); // los datos vienen de otro contexto de vm
const dosCifras = (n) => String(n).padStart(2, '0');
const fechaLocal = (f) => dosCifras(f.getDate()) + '/' + dosCifras(f.getMonth() + 1) + '/' + f.getFullYear();

if (!fs.existsSync(rutaCanal)) {
  console.error('No encuentro ' + rutaCanal);
  console.error('Primero obtené la lista del canal con yt-dlp; el comando está en scripts/LEEME.md.');
  process.exit(1);
}

const textoActual = fs.existsSync(rutaCharlas) ? fs.readFileSync(rutaCharlas, 'utf8') : null;
const esGenerado = textoActual !== null && /ARCHIVO GENERADO/.test(textoActual);
if (!comprobar && textoActual !== null && !esGenerado && !forzar) {
  console.error('data/charlas.js existe pero no tiene la marca «ARCHIVO GENERADO»: puede ser una versión vieja editada a mano.');
  console.error('No se sobrescribe. Si querés reemplazarlo igual (las ediciones a mano se pasan a data/correcciones.js), corré:');
  console.error('  node scripts/derivar-datos.js --forzar');
  process.exit(1);
}

try {
  const borrador = JSON.parse(fs.readFileSync(path.join(carpeta, 'charlas-borrador.json'), 'utf8'));
  const temas = clon(cargarArchivoDeDatos(path.join(carpeta, 'temas.js'), 'AAC_TEMAS'));
  const previas = textoActual !== null ? clon(cargarArchivoDeDatos(rutaCharlas, 'AAC_CHARLAS')) : null;
  const correcciones = clon(opcional('correcciones.js', 'AAC_CORRECCIONES', {}));
  const nuevas = clon(opcional('charlas-nuevas.js', 'AAC_CHARLAS_NUEVAS', []));
  const { videos, invalidas } = leerCanal(fs.readFileSync(rutaCanal, 'utf8'));
  const fechaFoto = fechaLocal(fs.statSync(rutaCanal).mtime);

  const r = regenerar({ borrador, temas, videos, previas, correcciones, nuevas });
  const totalPartes = r.charlas.reduce((n, c) => n + c.partes.length, 0);

  console.log('Foto del canal: ' + videos.length + ' videos' + (invalidas.length ? ' (' + invalidas.length + ' líneas inválidas)' : '') + ', del ' + fechaFoto);
  console.log('Charlas: ' + r.charlas.length + ' · partes: ' + totalPartes);
  console.log('Partes con enlace: ' + r.resumen.asignadas + ' (por título ' + r.resumen.porTitulo + ', conservadas ' + r.resumen.conservadas + ', manuales ' + r.resumen.manuales + ')');
  console.log('Partes sin enlace (dudosas): ' + r.dudosos.length);
  console.log('Videos nuevos o sin charla: ' + r.videosNuevos.length);
  console.log('Enlaces conservados con título cambiado: ' + r.tituloCambiado.length);
  console.log('Enlaces manuales fuera de la foto: ' + r.manualesFueraDeFoto.length);

  if (comprobar) {
    if (previas === null) {
      console.log('\nNo hay data/charlas.js para comparar.');
      process.exit(1);
    }
    const dif = compararCatalogos(previas, r.charlas);
    if (dif.length === 0) {
      console.log('\nComprobación: data/charlas.js ya está al día con la foto del canal (no se escribió nada).');
      process.exit(0);
    }
    console.log('\nComprobación: hay ' + dif.length + ' diferencias entre data/charlas.js y lo que saldría de regenerar (no se escribió nada):');
    for (const d of dif.slice(0, 50)) console.log('  - ' + d);
    if (dif.length > 50) console.log('  … y ' + (dif.length - 50) + ' más');
    process.exit(1);
  }

  fs.writeFileSync(rutaCharlas, serializar(r.charlas, { fechaFoto, totalVideos: videos.length }));
  fs.writeFileSync(path.join(salida, 'reporte-cruce.md'), generarReporteDudosos(r, { totalPartes, totalVideos: videos.length, invalidas }));
  console.log('\nListo: escribí data/charlas.js y ' + path.join(path.basename(salida), 'reporte-cruce.md') + '. data/correcciones.js y data/charlas-nuevas.js no se tocan.');
  if (r.dudosos.length > 0 || r.videosNuevos.length > 0) console.log('Hay cosas para revisar: mirá scripts/salida/reporte-cruce.md');
} catch (error) {
  console.error('No se pudo regenerar data/charlas.js: ' + error.message);
  process.exit(1);
}
