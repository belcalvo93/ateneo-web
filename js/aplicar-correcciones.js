/*
  Vista combinada del catálogo de charlas: charlas generadas + charlas nuevas, con las correcciones a mano aplicadas.

  Uso en la página:  AAC_aplicarCorrecciones(AAC_CHARLAS, AAC_CORRECCIONES, AAC_CHARLAS_NUEVAS, AAC_ARCHIVO_CHARLAS)
  Prioridad: catálogo generado < archivo cruzado del sitio viejo < correcciones a mano. Con "fecha", el año sale de ella.
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

  // "dd/mm/aaaa" de una fecha que existe en el calendario -> año; si no, null.
  function anioDeFecha(fecha) {
    if (typeof fecha !== 'string') return null;
    var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(fecha);
    if (!m) return null;
    var dia = Number(m[1]);
    var mes = Number(m[2]);
    var anio = Number(m[3]);
    var d = new Date(Date.UTC(anio, mes - 1, dia));
    if (d.getUTCFullYear() !== anio || d.getUTCMonth() !== mes - 1 || d.getUTCDate() !== dia) return null;
    return anio;
  }

  function aplicarFecha(charla, fecha) {
    var anio = anioDeFecha(fecha);
    if (anio === null) return;
    charla.fecha = fecha;
    charla.anio = anio;
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
    aplicarFecha(charla, corr.fecha); // si hay fecha, el año sale de ella
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

  // Del archivo cruzado (data/archivo-charlas.js) solo se toman fecha, disertante y titulo.
  function delArchivo(dato) {
    var r = {};
    if (esTextoNoVacio(dato.disertante)) r.disertante = dato.disertante;
    if (esTextoNoVacio(dato.titulo)) r.titulo = dato.titulo;
    if (typeof dato.fecha === 'string') r.fecha = dato.fecha;
    return r;
  }

  function aplicarPorId(lista, cambios, transformar) {
    if (!esObjeto(cambios)) return;
    Object.keys(cambios).forEach(function (id) {
      var cambio = cambios[id];
      if (!esObjeto(cambio)) return;
      for (var i = 0; i < lista.length; i++) {
        if (esObjeto(lista[i]) && lista[i].id === id) {
          aplicarUna(lista[i], transformar ? transformar(cambio) : cambio);
          return;
        }
      }
    });
  }

  // Prioridad: catálogo generado < archivo cruzado < correcciones a mano.
  function aplicarCorrecciones(generadas, correcciones, nuevas, archivo) {
    var lista = (Array.isArray(generadas) ? clonar(generadas) : []).concat(Array.isArray(nuevas) ? clonar(nuevas) : []);
    aplicarPorId(lista, archivo, delArchivo);
    aplicarPorId(lista, correcciones);
    return lista;
  }

  if (typeof module === 'object' && module.exports) module.exports = { aplicarCorrecciones: aplicarCorrecciones };
  else global.AAC_aplicarCorrecciones = aplicarCorrecciones;
})(typeof window !== 'undefined' ? window : this);
