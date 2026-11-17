/*
  Pie de página compartido por Inicio y Videoteca: redes y correo de contacto desde data/sitio.js.

  Las redes salen de la lista AAC_SITIO.redes: una red sin enlace (null o [corchetes]) no se muestra.
  Si los datos no cargan, queda lo que ya está escrito en el HTML (el canal de YouTube y el correo).
  Necesita js/portada-logica.js cargado antes. Sin módulos ES.
*/
(function () {
  'use strict';

  function iniciar() {
    var logica = window.AAC_portada;
    var sitio = window.AAC_SITIO;
    if (!logica || typeof sitio !== 'object' || sitio === null) return;

    // Redes
    var redes = logica.redesVisibles(sitio.redes);
    var contenedores = document.querySelectorAll('.aac-web [data-aac="redes"]');
    for (var i = 0; i < contenedores.length; i++) {
      if (redes.length === 0) continue; // se conserva el respaldo del HTML
      var ul = contenedores[i];
      while (ul.firstChild) ul.removeChild(ul.firstChild);
      for (var j = 0; j < redes.length; j++) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = redes[j].url;
        a.rel = 'noopener noreferrer';
        a.textContent = redes[j].nombre;
        li.appendChild(a);
        ul.appendChild(li);
      }
    }

    // Correo de contacto (texto visible + mailto)
    var correo = logica.correoVisible(sitio.correo);
    if (correo === null) return;
    var enlaces = document.querySelectorAll('.aac-web [data-aac="correo"]');
    for (var k = 0; k < enlaces.length; k++) {
      enlaces[k].href = 'mailto:' + correo;
      enlaces[k].textContent = correo;
    }
    var propuesta = document.querySelector('.aac-web [data-aac="correo-propuesta"]');
    if (propuesta) propuesta.href = 'mailto:' + correo + '?subject=' + encodeURIComponent('Propuesta de charla');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
