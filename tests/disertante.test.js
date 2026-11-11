'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const {
  quitarMarcaParte,
  numeroDeParte,
  extraerDisertanteYTitulo,
  ordenarPartes
} = require('../scripts/lib/disertante.js');

// ---- 3.1 marcas de parte ----

test('numeroDeParte: formas numéricas, romanas y ordinales', () => {
  assert.equal(numeroDeParte('Foo Parte 1'), 1);
  assert.equal(numeroDeParte('Foo PARTE II'), 2);
  assert.equal(numeroDeParte('Foo primera parte'), 1);
  assert.equal(numeroDeParte('Foo - SEGUNDA PARTE'), 2);
  assert.equal(numeroDeParte('Foo Parte 3 DEBATE'), 3);
  assert.equal(numeroDeParte('Foo parte1'), 1);
  assert.equal(numeroDeParte('Foo 2da parte'), 2);
  assert.equal(numeroDeParte('Foo 3° parte - Preguntas'), 3);
  assert.equal(numeroDeParte('Foo   2a. PARTE'), 2);
});

test('numeroDeParte: sin marca devuelve null', () => {
  assert.equal(numeroDeParte('Bio-nanotecnología : por qué y para qué'), null);
  assert.equal(numeroDeParte('Depósitos de la parte alta del río'), null);
  assert.equal(numeroDeParte('DEBATE Situación mundial'), null);
});

test('quitarMarcaParte: quita marcas finales y colapsa espacios', () => {
  assert.equal(quitarMarcaParte('Foo  bar Parte 1'), 'Foo bar');
  assert.equal(quitarMarcaParte('Foo bar PARTE II'), 'Foo bar');
  assert.equal(quitarMarcaParte('Foo bar - primera parte'), 'Foo bar');
  assert.equal(quitarMarcaParte('Foo bar - Segunda parte'), 'Foo bar');
  assert.equal(quitarMarcaParte('Foo bar Parte 3   DEBATE'), 'Foo bar');
  assert.equal(quitarMarcaParte('VACA MUERTA: ROBERTO BARRIOS PARTE 2 (INTERCAMBIO)'), 'VACA MUERTA: ROBERTO BARRIOS');
  assert.equal(quitarMarcaParte('VACA MUERTA : ROBERTO BARRIOS, PARTE 1'), 'VACA MUERTA : ROBERTO BARRIOS');
});

test('quitarMarcaParte: sin marca solo colapsa espacios', () => {
  assert.equal(quitarMarcaParte('TIROIDES Y ESTRÉS   SUSANA VALDEZ'), 'TIROIDES Y ESTRÉS SUSANA VALDEZ');
  assert.equal(quitarMarcaParte('Bio-nanotecnología : por qué y para qué'), 'Bio-nanotecnología : por qué y para qué');
});

// ---- 3.2 disertante y título (categoría A) ----

test('extraer: título profesional al final -> disertante y título', () => {
  assert.deepEqual(
    extraerDisertanteYTitulo('RECICLADO QUIMICO DE RESIDUOS PLASTICOS - Dra Elangeni Gilbert'),
    { titulo: 'RECICLADO QUIMICO DE RESIDUOS PLASTICOS', disertante: 'Dra Elangeni Gilbert', revisar: ['titulo'] }
  );
  assert.deepEqual(
    extraerDisertanteYTitulo('Entrelazamiento cuántico - Dr Ernesto Gandolfo Raso - primera parte'),
    { titulo: 'Entrelazamiento cuántico', disertante: 'Dr Ernesto Gandolfo Raso', revisar: [] }
  );
  assert.deepEqual(
    extraerDisertanteYTitulo('Respuestas para el riesgo sísmico en Mendoza -  Dr Ing Miguel Tornello'),
    { titulo: 'Respuestas para el riesgo sísmico en Mendoza', disertante: 'Dr Ing Miguel Tornello', revisar: [] }
  );
  const r = extraerDisertanteYTitulo('RADIACIONES NO IONIZANTES - ING. JOSÉ BALACCO');
  assert.equal(r.disertante, 'ING. JOSÉ BALACCO');
  assert.equal(r.titulo, 'RADIACIONES NO IONIZANTES');
});

test('extraer: título todo en mayúsculas se conserva y se marca para revisar', () => {
  const r = extraerDisertanteYTitulo('EL ROL DEL FÍSICO - Lic Ana Pérez');
  assert.equal(r.titulo, 'EL ROL DEL FÍSICO');
  assert.deepEqual(r.revisar, ['titulo']);
  const r2 = extraerDisertanteYTitulo('El rol del físico - Lic Ana Pérez');
  assert.deepEqual(r2.revisar, []);
});

const NEGATIVOS = [
  'LA PROPORCION AUREA - NATURALEZA Y MATEMÁTICA',
  'TIROIDES Y ESTRÉS   SUSANA VALDEZ',
  'Meteorología Charla con Dr Federico Norte Parte 3',
  'Depósitos de Litio por Pabla Tognoli - Parte 1',
  'VACA MUERTA : ROBERTO BARRIOS, PARTE 1',
  'Charlas - Prof Matemática',
  'Tema X - Dr Juan Pérez y Dra Ana Gómez',
  'Mesa Redonda Agua - capitulo I - Ing. Alejandro Drovandi'
];
for (const t of NEGATIVOS) {
  test(`extraer: sin alta confianza -> placeholders (${t})`, () => {
    assert.deepEqual(extraerDisertanteYTitulo(t), {
      titulo: '[Título]',
      disertante: '[Disertante]',
      revisar: ['titulo', 'disertante']
    });
  });
}

// ---- 3.3 orden de partes ----

const p = (...titulos) => titulos.map((t, i) => ({ titulo_original: t, idx: i }));
const idxs = (r) => r.partes.map((x) => x.idx);

test('ordenarPartes: orden inverso 3,2,1 -> 1,2,3 sin revisar', () => {
  const r = ordenarPartes(p('X Parte 3', 'X Parte 2', 'X Parte 1'));
  assert.deepEqual(idxs(r), [2, 1, 0]);
  assert.equal(r.revisar, false);
});

test('ordenarPartes: 2,3,1 -> 1,2,3', () => {
  const r = ordenarPartes(p('X PARTE 2', 'X PARTE 3 debate', 'X parte 1'));
  assert.deepEqual(idxs(r), [2, 0, 1]);
  assert.equal(r.revisar, false);
});

test('ordenarPartes: ya ordenadas quedan igual', () => {
  const r = ordenarPartes(p('X primera parte', 'X segunda parte'));
  assert.deepEqual(idxs(r), [0, 1]);
  assert.equal(r.revisar, false);
});

test('ordenarPartes: alguna sin número -> orden original y revisar', () => {
  const r = ordenarPartes(p('X DEBATE', 'X parte 1'));
  assert.deepEqual(idxs(r), [0, 1]);
  assert.equal(r.revisar, true);
  const r2 = ordenarPartes(p('X', 'X'));
  assert.deepEqual(idxs(r2), [0, 1]);
  assert.equal(r2.revisar, true);
});

test('ordenarPartes: números repetidos -> orden original y revisar', () => {
  const r = ordenarPartes(p('X parte 2', 'X parte 1', 'X parte 2'));
  assert.deepEqual(idxs(r), [0, 1, 2]);
  assert.equal(r.revisar, true);
});

test('ordenarPartes: huecos 3,2 -> 2,3 pero con revisar', () => {
  const r = ordenarPartes(p('Back Parte 3', 'Back Parte 2'));
  assert.deepEqual(idxs(r), [1, 0]);
  assert.equal(r.revisar, true);
  const r2 = ordenarPartes(p('Y parte 2', 'Y parte 4'));
  assert.deepEqual(idxs(r2), [0, 1]);
  assert.equal(r2.revisar, true);
});

test('ordenarPartes: una sola parte no necesita revisión', () => {
  const r = ordenarPartes(p('Solo una charla'));
  assert.deepEqual(idxs(r), [0]);
  assert.equal(r.revisar, false);
});
