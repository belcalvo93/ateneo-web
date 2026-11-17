'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const raiz = path.join(__dirname, '..');
const leer = (archivo) => fs.readFileSync(path.join(raiz, archivo), 'utf8');

// Variables declaradas en el primer bloque `:root` (o `:root, .aac-web`) de una hoja.
function variables(css) {
  const m = /:root[^{]*\{([\s\S]*?)\n\}/.exec(css);
  assert.ok(m, 'no se encontró el bloque :root');
  const vars = {};
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let v;
  while ((v = re.exec(m[1].replace(/\/\*[\s\S]*?\*\//g, '')))) vars[v[1]] = v[2].trim().replace(/\s+/g, ' ');
  return vars;
}

test('estilos.css expone todas las variables de tokens.css con el mismo valor', () => {
  const tokens = variables(leer('design-system/tokens.css'));
  const sitio = variables(leer('css/estilos.css'));
  assert.ok(Object.keys(tokens).length > 30);
  for (const [nombre, valor] of Object.entries(tokens)) {
    assert.equal(sitio[nombre], valor, 'variable ' + nombre);
  }
});

test('tipografía de la revisión 2: tres familias y sin Baskervville', () => {
  const tokens = variables(leer('design-system/tokens.css'));
  assert.match(tokens['--fuente-titulos'], /^'Source Serif 4'/);
  assert.match(tokens['--fuente-rotulos'], /^'Dosis'/);
  assert.match(tokens['--fuente-texto'], /^'Open Sans'/);
  assert.equal(tokens['--fuente-serif'], undefined);
  for (const archivo of ['design-system/tokens.css', 'css/estilos.css', 'index.html', 'quienes-somos.html', 'videoteca.html']) {
    const codigo = leer(archivo).replace(/\/\*[\s\S]*?\*\//g, '').replace(/<!--[\s\S]*?-->/g, '');
    assert.doesNotMatch(codigo, /Baskervville/, archivo);
  }
});

test('la hoja del sitio carga solo Source Serif 4, Dosis y Open Sans', () => {
  const css = leer('css/estilos.css');
  const imp = /@import url\('([^']+)'\)/.exec(css);
  assert.ok(imp, 'falta el @import de Google Fonts');
  const familias = [...imp[1].matchAll(/family=([^:&]+)/g)].map((x) => decodeURIComponent(x[1].replace(/\+/g, ' '))).sort();
  assert.deepEqual(familias, ['Dosis', 'Open Sans', 'Source Serif 4']);
});
