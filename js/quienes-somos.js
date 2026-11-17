/*
  Página «Quiénes somos»: lo único que sale de los datos es la galería de fotos (data/sitio.js → fotos).
  El resto de la página (historia, valores, cómo funcionamos, proponer una charla) está escrito en el HTML.

  - Con la lista de fotos vacía, la galería y su título no se muestran.
  - Solo se aceptan rutas dentro del sitio (por ejemplo "img/charla-2019.jpg") y fotos con texto alternativo.

  Necesita cargados antes: data/sitio.js y js/portada-logica.js. Sin módulos ES.
*/
(function () {
  'use strict';

  function iniciar() {
    var L = window.AAC_portada;
    var sitio = window.AAC_SITIO;
    var contenedor = document.querySelector('.aac-web [data-aac="galeria"]');
    if (!L || !contenedor) return;
    var seccion = contenedor.closest('section');
    var fotos = typeof sitio === 'object' && sitio !== null && Array.isArray(sitio.fotos) ? sitio.fotos : [];

    while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
    fotos.forEach(function (foto) {
      if (typeof foto !== 'object' || foto === null) return;
      var archivo = L.textoVisible(foto.archivo);
      var alt = L.textoVisible(foto.alt);
      // Nada de enlaces externos ni esquemas raros: solo archivos del propio sitio.
      if (archivo === null || alt === null || /^[a-z][a-z0-9+.-]*:|^\/\//i.test(archivo)) return;
      var img = document.createElement('img');
      img.src = archivo;
      img.alt = alt;
      img.loading = 'lazy';
      contenedor.appendChild(img);
    });
    if (seccion) seccion.hidden = contenedor.children.length === 0;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
