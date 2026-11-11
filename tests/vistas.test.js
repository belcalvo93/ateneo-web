'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { parsearVistas } = require('../scripts/lib/vistas.js');

test('vistas: número simple se toma tal cual', () => {
  assert.equal(parsearVistas('5'), 5);
  assert.equal(parsearVistas('15'), 15);
  assert.equal(parsearVistas('0'), 0);
});

test('vistas: sufijo K/k multiplica por mil y redondea', () => {
  assert.equal(parsearVistas('1.2 K'), 1200);
  assert.equal(parsearVistas('12 k'), 12000);
  assert.equal(parsearVistas('1 K'), 1000);
  assert.equal(parsearVistas('2.35 K'), 2350);
});

test('vistas: formatos desconocidos devuelven null', () => {
  assert.equal(parsearVistas('1,2 mil'), null);
  assert.equal(parsearVistas(''), null);
  assert.equal(parsearVistas(null), null);
  assert.equal(parsearVistas('3 M'), null);
  assert.equal(parsearVistas('1,2 K'), null);
});
