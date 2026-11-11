/*
  Vista combinada del catálogo de charlas: charlas generadas + charlas nuevas, con las correcciones a mano aplicadas.

  Uso en la página:  AAC_aplicarCorrecciones(AAC_CHARLAS, AAC_CORRECCIONES, AAC_CHARLAS_NUEVAS)
  No modifica sus argumentos. Si una corrección está mal escrita (charla inexistente, campo desconocido,
  tipo equivocado) la ignora sin romper la página; el validador (node scripts/validar-datos.js) la informa.

  Funciona como <script> común (define solo window.AAC_aplicarCorrecciones, se puede pegar en línea en
  Elementor) y con require() en Node (tests y validador). Sin módulos ES.
*/
(function (global) {
  'use strict';

  var CAMPOS_TEXTO = ['titulo', 'disertante', 'tema'];

  function clonar(x) {
    return JSON.parse(JSON.stringify(x));
  }
  function esObjeto(x) {
    return typeof x === 'object' && x !== null && !Array.isArray(x);
  }
  function esTextoNoVacio(x) {
    return typeof x === 'string' && x.trim() !== '';
  }
  function esPlaceholder(x) {
    return typeof x === 'string' && /^\s*\[.*\]\s*$/.test(x);
  }
  function quitarMarca(charla, marca) {
    if (Array.isArray(charla.revisar)) {
      charla.revisar = charla.revisar.filter(function (m) { return m !== marca; });
    }
  }

  function aplicarUna(charla, corr) {
    var i;
    for (i = 0; i < CAMPOS_TEXTO.length; i++) {
      var campo = CAMPOS_TEXTO[i];
      if (esTextoNoVacio(corr[campo])) {
        charla[campo] = corr[campo];
        if ((campo === 'titulo' || campo === 'disertante') && !esPlaceholder(corr[campo])) quitarMarca(charla, campo);
      }
    }
    if (typeof corr.anio === 'number' && Number.isInteger(corr.anio)) charla.anio = corr.anio;
    if (typeof corr.destacada === 'boolean') charla.destacada = corr.destacada;
    if (Array.isArray(corr.confirmados)) {
      for (i = 0; i < corr.confirmados.length; i++) {
        if (typeof corr.confirmados[i] === 'string') quitarMarca(charla, corr.confirmados[i]);
      }
    }
    if (esObjeto(corr.partes) && Array.isArray(charla.partes)) {
      Object.keys(corr.partes).forEach(function (clave) {
        var n = Number(clave);
        var cambio = corr.partes[clave];
        var parte = Number.isInteger(n) ? charla.partes[n - 1] : undefined;
        if (!esObjeto(parte) || !esObjeto(cambio)) return;
        if (cambio.url === null || typeof cambio.url === 'string') parte.url = cambio.url;
      });
    }
  }

  function aplicarCorrecciones(generadas, correcciones, nuevas) {
    var lista = (Array.isArray(generadas) ? clonar(generadas) : []).concat(Array.isArray(nuevas) ? clonar(nuevas) : []);
    if (!esObjeto(correcciones)) return lista;
    Object.keys(correcciones).forEach(function (id) {
      var corr = correcciones[id];
      if (!esObjeto(corr)) return;
      for (var i = 0; i < lista.length; i++) {
        if (esObjeto(lista[i]) && lista[i].id === id) {
          aplicarUna(lista[i], corr);
          return;
        }
      }
    });
    return lista;
  }

  if (typeof module === 'object' && module.exports) module.exports = { aplicarCorrecciones: aplicarCorrecciones };
  else global.AAC_aplicarCorrecciones = aplicarCorrecciones;
})(typeof window !== 'undefined' ? window : this);
