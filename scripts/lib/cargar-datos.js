'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Ejecuta un archivo de data/ en un contexto vacío con solo `window` y devuelve window[nombreVariable].
// Falla (con el nombre del archivo) si no se puede leer, tiene un error de sintaxis, no define su
// variable o define alguna otra global. No hay red ni acceso a require/process dentro del contexto.
function cargarArchivoDeDatos(ruta, nombreVariable) {
  const archivo = path.basename(ruta);
  let codigo;
  try {
    codigo = fs.readFileSync(ruta, 'utf8');
  } catch (e) {
    throw new Error(archivo + ': no se pudo leer el archivo (' + e.message + ')');
  }

  const window = {};
  try {
    vm.runInNewContext(codigo, { window }, { filename: archivo, timeout: 2000 });
  } catch (e) {
    const tipo = e instanceof SyntaxError || (e && e.name === 'SyntaxError') ? 'error de sintaxis' : 'error al ejecutarlo';
    throw new Error(archivo + ': ' + tipo + ' — ' + e.message);
  }

  if (!(nombreVariable in window)) {
    throw new Error(archivo + ': no define window.' + nombreVariable);
  }
  const demas = Object.keys(window).filter((k) => k !== nombreVariable);
  if (demas.length > 0) {
    throw new Error(archivo + ': define variables de más (' + demas.map((k) => 'window.' + k).join(', ') + ')');
  }
  return window[nombreVariable];
}

module.exports = { cargarArchivoDeDatos };
