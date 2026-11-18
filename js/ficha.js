/*
  Tarjeta de charla: la misma en todo el sitio (portada y, en C-04, videoteca).

  Uso:  var tarjeta = AAC_ficha(charla, opciones);   // devuelve un <article> o null si no hay título que mostrar
  Opciones (todas opcionales):
    etiquetasDeTema   { idDeTema: "Etiqueta" }  para mostrar el tema arriba del título
    puesto            número de puesto (1, 2, 3…) que se muestra junto al título, fuera de la imagen («Las más vistas»)
    conVistas         true para agregar la línea de visualizaciones

  - Un solo enlace por tarjeta (el título), extendido a toda la tarjeta.
  - La miniatura muestra la duración total de la charla; si tiene varias partes, la tarjeta dice cuántas.
  - Un dato sin completar ([Título], [Disertante]…) nunca se muestra: sale de js/portada-logica.js.
  - Todo texto se inserta con textContent.

  Necesita cargado antes: js/portada-logica.js. Sin módulos ES.
*/
(function (global) {
  'use strict';

  function crear(etiqueta, clase, texto) {
    var nodo = document.createElement(etiqueta);
    if (clase) nodo.className = clase;
    if (texto !== undefined && texto !== null) nodo.textContent = texto;
    return nodo;
  }
  function unir(partes, separador) {
    return partes.filter(function (x) { return x !== null && x !== undefined && x !== ''; }).join(separador);
  }

  function ficha(charla, opciones) {
    var L = global.AAC_portada;
    var opt = opciones || {};
    if (!L) return null;
    var titulo = L.tituloVisible(charla);
    if (titulo === null) return null;
    var parte = Array.isArray(charla.partes) ? charla.partes[0] : null;
    var url = parte ? L.enlaceSeguro(parte.url) : null;

    var tarjeta = crear('article', 'ficha');

    var miniatura = crear('div', 'miniatura');
    var imagen = url ? L.miniatura(url) : null;
    if (imagen) {
      var img = document.createElement('img');
      img.src = imagen;
      img.alt = ''; // decorativa: el título está al lado
      img.loading = 'lazy';
      img.width = 480;
      img.height = 360;
      miniatura.appendChild(img);
    }
    var duracion = L.duracionDeCharla(charla);
    if (duracion) {
      var etiqueta = crear('span', 'duracion');
      etiqueta.appendChild(crear('span', 'solo-lectores', 'Duración: '));
      etiqueta.appendChild(document.createTextNode(duracion));
      miniatura.appendChild(etiqueta);
    }
    tarjeta.appendChild(miniatura);

    var cuerpo = crear('div', 'cuerpo');
    var tema = opt.etiquetasDeTema ? opt.etiquetasDeTema[charla.tema] : null;
    if (tema) cuerpo.appendChild(crear('span', 'tema', tema));
    var h3 = crear('h3');
    if (url) {
      var a = crear('a', 'enlace-tarjeta', titulo);
      a.href = url;
      a.rel = 'noopener noreferrer';
      h3.appendChild(a);
    } else {
      h3.textContent = titulo;
    }
    if (typeof opt.puesto === 'number') {
      // Puesto fuera de la imagen, como numeral junto al título; el orden ya lo da la lista numerada.
      var filaTitulo = crear('div', 'ficha-titulo');
      var puesto = crear('span', 'puesto', String(opt.puesto));
      puesto.setAttribute('aria-hidden', 'true');
      filaTitulo.appendChild(puesto);
      filaTitulo.appendChild(h3);
      cuerpo.appendChild(filaTitulo);
    } else {
      cuerpo.appendChild(h3);
    }
    var meta = unir([
      L.disertanteVisible(charla),
      L.fechaDeCharla(charla),
      L.textoPartes(charla)
    ], ' · ');
    if (meta) cuerpo.appendChild(crear('p', 'meta', meta));
    if (opt.conVistas) {
      var vistas = L.formatoVistas(L.vistasDeCharla(charla));
      if (vistas) cuerpo.appendChild(crear('p', 'meta', vistas));
    }
    tarjeta.appendChild(cuerpo);
    return tarjeta;
  }

  global.AAC_ficha = ficha;
})(window);
