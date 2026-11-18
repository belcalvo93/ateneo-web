/*
  Página «Quiénes somos». Lo que sale de los datos (data/sitio.js):
  - foto_principal           → la foto junto al título (sin foto, no se muestra).
  - fotos                    → la galería (vacía, no se muestra).
  - mesa_organizadora           → la sección de la Mesa, solo con mostrar: true; nombres ordenados por apellido.
  - formulario_inscripcion   → el botón «Sumate al Ateneo» (sin enlace seguro, no se muestra).
  - declaracion_pdf          → el botón «Descargar en PDF» (null, no se muestra).
  - entrevistas_radio        → la sección «En la radio» (vacía, no se muestra).
  - video_presentacion       → la sección del video de presentación con la cita de Palas Atenea (null, no se muestra).
  El resto (el nombre, historia, valores, cómo funcionamos, proponer una charla) está escrito en el HTML.

  Todo texto se inserta con textContent; las imágenes solo pueden ser archivos del propio sitio.
  Necesita cargados antes: data/sitio.js y js/portada-logica.js. Sin módulos ES.
*/
(function () {
  'use strict';

  var L;

  function buscar(nombre) {
    return document.querySelector('.aac-web [data-aac="' + nombre + '"]');
  }
  function vaciar(nodo) {
    while (nodo.firstChild) nodo.removeChild(nodo.firstChild);
  }
  function esObjeto(x) {
    return typeof x === 'object' && x !== null && !Array.isArray(x);
  }
  // Solo archivos del propio sitio: nada de enlaces externos ni esquemas raros.
  function rutaLocal(x) {
    var limpio = L.textoVisible(x);
    return limpio !== null && !/^[a-z][a-z0-9+.-]*:|^\/\//i.test(limpio) ? limpio : null;
  }
  function imagen(foto, perezosa) {
    if (!esObjeto(foto)) return null;
    var archivo = rutaLocal(foto.archivo);
    var alt = L.textoVisible(foto.alt);
    if (archivo === null || alt === null) return null;
    var img = document.createElement('img');
    img.src = archivo;
    img.alt = alt;
    if (perezosa) img.loading = 'lazy';
    return img;
  }
  function boton(clase, href, texto) {
    var a = document.createElement('a');
    a.className = 'btn ' + clase;
    a.href = href;
    a.textContent = texto;
    return a;
  }

  function fotoPrincipal(sitio) {
    var figura = buscar('foto-principal');
    if (!figura) return;
    vaciar(figura);
    var img = imagen(sitio.foto_principal, false);
    if (img) figura.appendChild(img);
    figura.hidden = img === null;
  }

  function galeria(sitio) {
    var contenedor = buscar('galeria');
    if (!contenedor) return;
    var seccion = contenedor.closest('section');
    vaciar(contenedor);
    (Array.isArray(sitio.fotos) ? sitio.fotos : []).forEach(function (foto) {
      var img = imagen(foto, true);
      if (img) contenedor.appendChild(img);
    });
    if (seccion) seccion.hidden = contenedor.children.length === 0;
  }

  function mesa(sitio) {
    var seccion = buscar('mesa');
    var lista = buscar('mesa-integrantes');
    if (!seccion || !lista) return;
    var m = sitio.mesa_organizadora;
    var nombres = esObjeto(m) && m.mostrar === true ? L.integrantesOrdenados(m.integrantes) : [];
    var nombreOrgano = esObjeto(m) ? L.textoVisible(m.nombre) : null;
    vaciar(lista);
    if (nombres.length === 0 || nombreOrgano === null) {
      seccion.hidden = true;
      return;
    }
    buscar('mesa-nombre').textContent = nombreOrgano;
    buscar('mesa-intro').textContent = 'La ' + nombreOrgano + ' está integrada por:';
    nombres.forEach(function (n) {
      var li = document.createElement('li');
      li.textContent = n;
      lista.appendChild(li);
    });
    seccion.hidden = false;
  }

  function sumate(sitio) {
    var fila = buscar('sumate');
    if (!fila) return;
    vaciar(fila);
    var url = L.enlaceSeguro(sitio.formulario_inscripcion);
    if (url !== null) {
      var a = boton('btn-rojo', url, 'Sumate al Ateneo');
      a.rel = 'noopener noreferrer';
      fila.appendChild(a);
    }
    fila.hidden = url === null;
  }

  function declaracionPdf(sitio) {
    var fila = buscar('acciones-propuesta');
    if (!fila) return;
    var viejo = buscar('declaracion-pdf');
    if (viejo) viejo.remove();
    var pdf = sitio.declaracion_pdf;
    var url = rutaLocal(pdf) || L.enlaceSeguro(pdf);
    if (url === null) return;
    var a = boton('btn-contorno', url, 'Descargar la Declaración (PDF)');
    a.setAttribute('data-aac', 'declaracion-pdf');
    if (/^https:/i.test(url)) a.rel = 'noopener noreferrer';
    fila.appendChild(a);
  }

  function video(sitio) {
    var seccion = buscar('video');
    var enlace = buscar('video-enlace');
    var marco = buscar('video-miniatura');
    if (!seccion || !enlace || !marco) return;
    vaciar(marco);
    var v = L.videoDePresentacion(sitio.video_presentacion);
    if (v === null) {
      seccion.hidden = true;
      return;
    }
    enlace.href = v.url;
    var img = document.createElement('img');
    img.src = v.miniatura;
    img.alt = ''; // decorativa: el enlace dice «Ver el video de presentación en YouTube»
    img.width = 480;
    img.height = 360;
    img.loading = 'lazy';
    marco.appendChild(img);
    seccion.hidden = false;
  }

  function radio(sitio) {
    var seccion = buscar('radio');
    var lista = buscar('radio-lista');
    if (!seccion || !lista) return;
    vaciar(lista);
    L.entrevistasVisibles(sitio.entrevistas_radio).forEach(function (e) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = e.url;
      a.rel = 'noopener noreferrer';
      a.textContent = e.titulo;
      li.appendChild(a);
      if (e.fecha) li.appendChild(document.createTextNode(' · ' + e.fecha));
      lista.appendChild(li);
    });
    seccion.hidden = lista.children.length === 0;
  }

  function iniciar() {
    L = window.AAC_portada;
    var sitio = window.AAC_SITIO;
    if (!L || !esObjeto(sitio)) return;
    fotoPrincipal(sitio);
    galeria(sitio);
    mesa(sitio);
    video(sitio);
    radio(sitio);
    sumate(sitio);
    declaracionPdf(sitio);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
