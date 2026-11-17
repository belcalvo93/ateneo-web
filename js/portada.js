/*
  Portada (Inicio): arma en la página lo que sale de los datos de data/.
  - Próxima charla, últimas charlas, temas, más vistas, cifra de videos y galería de fotos.
  - Toda la lógica (qué mostrar, en qué orden, qué ocultar) está en js/portada-logica.js; acá solo se dibuja.
  - Los textos se insertan siempre con textContent; nunca se interpreta HTML de los datos.
  - Si un archivo de datos no cargó, esa sección muestra un aviso con el enlace al canal de YouTube.

  Necesita cargados antes: los archivos de data/, js/aplicar-correcciones.js y js/portada-logica.js. Sin módulos ES.
*/
(function () {
  'use strict';

  var CANAL_RESPALDO = 'https://www.youtube.com/@ateneoamigosdelasciencias';
  var CUANTAS = 3;
  var L;

  function crear(etiqueta, clase, texto) {
    var nodo = document.createElement(etiqueta);
    if (clase) nodo.className = clase;
    if (texto !== undefined && texto !== null) nodo.textContent = texto;
    return nodo;
  }
  function vaciar(nodo) {
    while (nodo.firstChild) nodo.removeChild(nodo.firstChild);
  }
  function buscar(nombre) {
    return document.querySelector('.aac-web [data-aac="' + nombre + '"]');
  }
  function enlaceExterno(clase, texto, url, pestaniaNueva) {
    var a = crear('a', clase, texto);
    a.href = url;
    a.rel = 'noopener noreferrer';
    if (pestaniaNueva) a.target = '_blank';
    return a;
  }
  function unir(partes, separador) {
    return partes.filter(function (x) { return x !== null && x !== undefined && x !== ''; }).join(separador);
  }

  function canal() {
    var sitio = window.AAC_SITIO;
    return (L && sitio && L.enlaceSeguro(sitio.canal_youtube)) || CANAL_RESPALDO;
  }

  function aviso(contenedor, mensaje) {
    vaciar(contenedor);
    var p = crear('p', 'aviso', mensaje + ' ');
    p.setAttribute('role', 'status');
    p.appendChild(enlaceExterno('', 'Ver el canal de YouTube', canal(), false));
    contenedor.appendChild(p);
  }

  // ---- próxima charla ----

  function dato(nombre, contenido) {
    var p = crear('p');
    p.appendChild(crear('strong', '', nombre + ':'));
    p.appendChild(document.createTextNode(' '));
    if (typeof contenido === 'string') p.appendChild(document.createTextNode(contenido));
    else p.appendChild(contenido);
    return p;
  }

  function dibujarProxima(contenedor, proxima) {
    var anunciada = L.proximaAnunciada(proxima);
    var hora = L.horaCorta(proxima.hora);
    var lugar = L.textoVisible(proxima.lugar);
    var modalidad = L.textoVisible(proxima.modalidad);
    var correo = L.correoVisible(proxima.correo_inscripcion);
    vaciar(contenedor);

    var info = crear('div');
    info.appendChild(crear('span', 'etiqueta', 'Próxima charla'));
    var titulo = crear('h2', '', anunciada ? L.textoVisible(proxima.titulo) : 'La próxima charla se anunciará pronto');
    titulo.id = 'titulo-proxima';
    info.appendChild(titulo);
    if (anunciada) {
      var disertante = L.textoVisible(proxima.disertante);
      var descripcion = L.textoVisible(proxima.descripcion);
      var linea = unir([disertante ? 'A cargo de ' + disertante : null, descripcion], ' · ');
      if (linea) info.appendChild(crear('p', 'meta', linea));
    } else {
      info.appendChild(crear('p', 'meta', 'Las charlas son abiertas a todo público, con entrada libre y gratuita.'));
    }
    contenedor.appendChild(info);

    var datos = crear('div', 'datos');
    var cuando = anunciada
      ? unir([L.fechaLarga(proxima.fecha), hora], ', ')
      : 'los viernes' + (hora ? ' a las ' + hora : '');
    datos.appendChild(dato('Cuándo', cuando));
    var donde = unir([lugar, modalidad], ' · ');
    if (donde) datos.appendChild(dato('Dónde', donde));
    if (correo) {
      var a = crear('a', '', correo);
      a.href = 'mailto:' + correo;
      datos.appendChild(dato('Inscripción', a));
    }

    // Botones: el de correo siempre; Calendar y Zoom solo si su enlace está cargado.
    var acciones = L.accionesProxima(proxima);
    if (acciones.length > 0) {
      var fila = crear('div', 'fila');
      acciones.forEach(function (accion) {
        if (accion.tipo === 'correo') {
          var boton = crear('a', 'btn btn-rojo', accion.texto);
          boton.href = accion.url;
          fila.appendChild(boton);
        } else {
          var externo = enlaceExterno('btn btn-contorno', accion.texto, accion.url, true);
          externo.appendChild(crear('span', 'solo-lectores', ' (se abre en una pestaña nueva)'));
          fila.appendChild(externo);
        }
      });
      datos.appendChild(fila);
    }
    contenedor.appendChild(datos);
  }

  // ---- últimas charlas ----

  function fichaDeCharla(charla, etiquetasDeTema) {
    var titulo = L.tituloVisible(charla);
    if (titulo === null) return null;
    var parte = Array.isArray(charla.partes) ? charla.partes[0] : null;
    var url = parte ? L.enlaceSeguro(parte.url) : null;

    var ficha = crear('article', 'ficha');
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
    if (url) miniatura.appendChild(crear('span', 'play'));
    ficha.appendChild(miniatura);

    var cuerpo = crear('div', 'cuerpo');
    var tema = etiquetasDeTema[charla.tema];
    if (tema) cuerpo.appendChild(crear('span', 'tema', tema));
    var h3 = crear('h3');
    if (url) h3.appendChild(enlaceExterno('enlace-tarjeta', titulo, url, false));
    else h3.textContent = titulo;
    cuerpo.appendChild(h3);
    var meta = unir([L.disertanteVisible(charla), typeof charla.anio === 'number' ? String(charla.anio) : null], ' · ');
    if (meta) cuerpo.appendChild(crear('p', 'meta', meta));
    ficha.appendChild(cuerpo);
    return ficha;
  }

  function dibujarUltimas(contenedor, charlas, temas, idsNuevas) {
    var etiquetas = {};
    L.conteoPorTema(temas, []).forEach(function (t) { etiquetas[t.id] = t.etiqueta; });
    vaciar(contenedor);
    L.ultimasCharlas(charlas, CUANTAS, idsNuevas).forEach(function (charla) {
      var ficha = fichaDeCharla(charla, etiquetas);
      if (ficha) contenedor.appendChild(ficha);
    });
  }

  // ---- temas ----

  function dibujarTemas(contenedor, temas, charlas) {
    vaciar(contenedor);
    L.conteoPorTema(temas, charlas).forEach(function (tema) {
      var a = crear('a', 'tema-card', tema.nombre);
      a.href = 'videoteca.html?tema=' + encodeURIComponent(tema.id);
      a.appendChild(crear('small', '', L.textoCantidad(tema.cantidad)));
      contenedor.appendChild(a);
    });
  }

  // ---- más vistas ----

  function dibujarMasVistas(lista, charlas) {
    vaciar(lista);
    L.masVistas(charlas, CUANTAS).forEach(function (charla) {
      var titulo = L.tituloVisible(charla);
      if (titulo === null) return;
      var parte = Array.isArray(charla.partes) ? charla.partes[0] : null;
      var url = parte ? L.enlaceSeguro(parte.url) : null;
      var li = crear('li');
      var h3 = crear('h3');
      if (url) h3.appendChild(enlaceExterno('enlace-tarjeta', titulo, url, false));
      else h3.textContent = titulo;
      li.appendChild(h3);
      var disertante = L.disertanteVisible(charla);
      if (disertante) li.appendChild(crear('p', 'meta', disertante));
      var vistas = L.formatoVistas(L.vistasDeCharla(charla));
      if (vistas) li.appendChild(crear('p', 'meta', vistas));
      lista.appendChild(li);
    });
  }

  // ---- galería ----

  function dibujarGaleria(contenedor, fotos) {
    vaciar(contenedor);
    (Array.isArray(fotos) ? fotos : []).forEach(function (foto) {
      if (typeof foto !== 'object' || foto === null) return;
      var archivo = L.textoVisible(foto.archivo);
      var alt = L.textoVisible(foto.alt);
      // Solo rutas dentro del sitio (img/…): nada de enlaces externos ni esquemas raros.
      if (archivo === null || alt === null || /^[a-z][a-z0-9+.-]*:|^\/\//i.test(archivo)) return;
      var img = document.createElement('img');
      img.src = archivo;
      img.alt = alt;
      img.loading = 'lazy';
      contenedor.appendChild(img);
    });
    contenedor.hidden = contenedor.children.length === 0;
  }

  // ---- arranque ----

  function iniciar() {
    L = window.AAC_portada;
    var combinar = window.AAC_aplicarCorrecciones;
    var hayCatalogo = L && typeof combinar === 'function' && Array.isArray(window.AAC_CHARLAS) && Array.isArray(window.AAC_TEMAS);
    var ultimas = buscar('ultimas');
    var temasNodo = buscar('temas');
    var masVistas = buscar('mas-vistas');
    var proximaNodo = buscar('proxima');
    var sitio = window.AAC_SITIO;

    if (!L) return; // sin la lógica no se toca nada: queda el contenido fijo del HTML

    if (hayCatalogo) {
      var nuevas = Array.isArray(window.AAC_CHARLAS_NUEVAS) ? window.AAC_CHARLAS_NUEVAS : [];
      var charlas = combinar(window.AAC_CHARLAS, window.AAC_CORRECCIONES, nuevas);
      var idsNuevas = nuevas.map(function (c) { return c && c.id; });
      if (ultimas) dibujarUltimas(ultimas, charlas, window.AAC_TEMAS, idsNuevas);
      if (temasNodo) dibujarTemas(temasNodo, window.AAC_TEMAS, charlas);
      if (masVistas) {
        dibujarMasVistas(masVistas, charlas);
        var seccion = masVistas.closest('section');
        if (seccion) seccion.hidden = masVistas.children.length === 0;
      }
      var videos = buscar('videos');
      var total = L.totalVideos(charlas);
      if (videos && total > 0) videos.textContent = String(total);
    } else {
      if (ultimas) aviso(ultimas, 'No pudimos cargar las charlas en este momento.');
      if (temasNodo) aviso(temasNodo, 'No pudimos cargar los temas en este momento.');
    }

    // Si no cargó la próxima charla, queda la tarjeta fija del HTML (horario y lugar habituales).
    if (proximaNodo && typeof window.AAC_PROXIMA_CHARLA === 'object' && window.AAC_PROXIMA_CHARLA !== null) {
      dibujarProxima(proximaNodo, window.AAC_PROXIMA_CHARLA);
    }

    if (typeof sitio === 'object' && sitio !== null) {
      var conferencias = buscar('conferencias');
      var cifra = L.textoVisible(sitio.conferencias);
      if (conferencias && cifra) conferencias.textContent = cifra;
      var galeria = buscar('galeria');
      if (galeria) dibujarGaleria(galeria, sitio.fotos);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
