'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizar, duracionASegundos } = require('../scripts/lib/normalizar.js');

test('normalizar: mayúsculas, espacios y puntos no cambian la forma normalizada', () => {
  assert.equal(
    normalizar('PINCELADAS  SANMARTINIANAS J.  M.  AMORETTI'),
    normalizar('Pinceladas sanmartinianas J. M. Amoretti')
  );
  assert.equal(normalizar('PINCELADAS  SANMARTINIANAS J.  M.  AMORETTI'), 'pinceladas sanmartinianas j m amoretti');
});

test('normalizar: quita tildes y reemplaza puntuación por espacios', () => {
  assert.equal(normalizar('Meteorología: ¿qué pasó? - Dr. Núñez'), 'meteorologia que paso dr nunez');
  assert.equal(normalizar('  Ñandú,  físico  '), 'nandu fisico');
});

test('normalizar: palabras distintas siguen siendo distintas', () => {
  assert.notEqual(normalizar('Intelilgencia artificial'), normalizar('Inteligencia artificial'));
  assert.notEqual(normalizar('IMTELECTUAL'), normalizar('INTELECTUAL'));
});

test('duracionASegundos: M:SS, MM:SS y H:MM:SS', () => {
  assert.equal(duracionASegundos('3:05'), 185);
  assert.equal(duracionASegundos('31:40'), 1900);
  assert.equal(duracionASegundos('1:10:57'), 4257);
});

test('duracionASegundos: formatos inválidos devuelven null', () => {
  assert.equal(duracionASegundos('1h10'), null);
  assert.equal(duracionASegundos('12:75'), null);
  assert.equal(duracionASegundos(''), null);
  assert.equal(duracionASegundos(null), null);
  assert.equal(duracionASegundos('1:2:03:04'), null);
});
