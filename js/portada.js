/*
  Portada (Inicio): arma en la página lo que sale de los datos de data/.
  - Próxima charla (con el aviso por WhatsApp), cifras, últimas charlas, temas y más vistas.
  - Toda la lógica (qué mostrar, en qué orden, qué ocultar) está en js/portada-logica.js; acá solo se dibuja.
  - La tarjeta de charla es la de js/ficha.js, la misma para «Últimas» y «Las más vistas».
  - Los textos se insertan siempre con textContent; nunca se interpreta HTML de los datos.
  - Si un archivo de datos no cargó, esa sección muestra un aviso con el enlace al canal de YouTube.

  Necesita cargados antes: los archivos de data/, js/aplicar-correcciones.js, js/portada-logica.js y js/ficha.js.
  Sin módulos ES.
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
    if (pestaniaNueva) {
      a.target = '_blank';
      a.appendChild(crear('span', 'solo-lectores', ' (se abre en una pestaña nueva)'));
    }
    return a;
  }
  function unir(partes, separador) {
    return partes.filter(function (x) { return x !== null && x !== undefined && x !== ''; }).join(separador);
  }
  function seccionDe(nodo) {
    return nodo && nodo.closest ? nodo.closest('section') : null;
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

  // estado: el del contador (L.estadoProxima). Terminada la charla, la tarjeta vuelve a «se anunciará pronto»
  // hasta que se cargue la siguiente; en vivo, «Entrar por Zoom» pasa a ser el botón principal.
  function dibujarProxima(contenedor, proxima, sitio, estado) {
    var redes = typeof sitio === 'object' && sitio !== null ? sitio.redes : undefined;
    var tipo = estado ? estado.tipo : 'sin-fecha';
    var anunciada = L.proximaAnunciada(proxima) && tipo !== 'terminada';
    var lugar = L.textoVisible(proxima.lugar);
    var modalidad = L.textoVisible(proxima.modalidad);
    var correo = L.correoVisible(proxima.correo_inscripcion);
    vaciar(contenedor);

    var info = crear('div');
    info.appendChild(crear('span', 'etiqueta', 'Próxima charla'));
    var titulo = crear('h2', '', anunciada ? L.textoVisible(proxima.titulo) : 'La próxima charla se anunciará pronto');
    titulo.id = 'titulo-proxima';
    if (tipo === 'terminada') info.appendChild(crear('p', 'contador contador-terminada', estado.texto + '.'));
    info.appendChild(titulo);
    // Contador: texto común, sin aria-live (no se anuncia cada minuto). El paso a «En vivo» lo anuncia la región de estado.
    if (tipo !== 'sin-fecha' && tipo !== 'terminada') {
      var contador = crear('p', 'contador' + (tipo === 'en-vivo' ? ' en-vivo' : ''), estado.texto);
      contador.setAttribute('data-aac', 'contador');
      info.appendChild(contador);
    }
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
    datos.appendChild(dato('Cuándo', L.textoCuando(anunciada ? proxima : { hora: proxima.hora })));
    var donde = unir([lugar, modalidad], ' · ');
    if (donde) datos.appendChild(dato('Dónde', donde));
    if (correo) {
      var a = crear('a', '', correo);
      a.href = 'mailto:' + correo;
      datos.appendChild(dato('Inscripción', a));
    }

    // Botones: el de correo siempre; calendario y Zoom solo si su enlace está cargado.
    var acciones = L.accionesProxima(proxima, sitio);
    var enVivo = tipo === 'en-vivo';
    if (!L.mostrarZoom(tipo)) acciones = acciones.filter(function (x) { return x.tipo !== 'zoom'; });
    if (enVivo) {
      // En vivo: Zoom primero y como botón principal.
      acciones = acciones.filter(function (x) { return x.tipo === 'zoom'; })
        .concat(acciones.filter(function (x) { return x.tipo !== 'zoom'; }));
    }
    if (acciones.length > 0) {
      var fila = crear('div', 'fila');
      acciones.forEach(function (accion) {
        var principal = enVivo ? accion.tipo === 'zoom' : accion.tipo === 'correo';
        var clase = 'btn ' + (principal ? 'btn-rojo' : 'btn-contorno');
        if (accion.tipo === 'correo') {
          var boton = crear('a', clase, accion.texto);
          boton.href = accion.url;
          fila.appendChild(boton);
        } else {
          fila.appendChild(enlaceExterno(clase, accion.texto, accion.url, true));
        }
      });
      datos.appendChild(fila);
    }

    // Aviso por WhatsApp: se muestra también con la charla sin anunciar; sin canal, no hay botón.
    var whatsapp = L.enlaceAvisoWhatsApp(redes);
    if (whatsapp) datos.appendChild(enlaceExterno('btn btn-contorno aviso-whatsapp', 'Recibí el aviso de cada charla por WhatsApp', whatsapp, true));
    contenedor.appendChild(datos);
  }

  // ---- contador (C-02c) ----

  // Recalcula cada minuto (alineado al cambio de minuto) y al volver a la pestaña. Si cambia el estado,
  // redibuja la tarjeta; si no, solo cambia el texto del contador. El paso a «En vivo» se anuncia una vez.
  function iniciarContador(contenedor, proxima, sitio) {
    var duracion = typeof sitio === 'object' && sitio !== null ? sitio.duracion_charla_min : undefined;
    var region = crear('p', 'solo-lectores');
    region.setAttribute('role', 'status');
    contenedor.parentNode.insertBefore(region, contenedor.nextSibling);
    var anterior = null;

    function ciclo() {
      var estado = L.estadoProxima(Date.now(), proxima, duracion);
      if (anterior === null || estado.tipo !== anterior) {
        dibujarProxima(contenedor, proxima, sitio, estado);
        if (anterior !== null && estado.tipo === 'en-vivo') region.textContent = 'La charla está en vivo ahora';
        anterior = estado.tipo;
      } else {
        var nodo = contenedor.querySelector('[data-aac="contador"]');
        if (nodo && nodo.textContent !== estado.texto) nodo.textContent = estado.texto;
      }
      return estado;
    }

    var temporizador = null;
    function programar() {
      clearTimeout(temporizador);
      var estado = ciclo();
      if (estado.tipo === 'sin-fecha') return; // sin fecha no hay nada que actualizar
      temporizador = setTimeout(programar, 60000 - (Date.now() % 60000) + 50);
    }
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) programar();
    });
    programar();
  }

  // ---- charlas ----

  function etiquetasDeTema(temas) {
    var etiquetas = {};
    L.conteoPorTema(temas, []).forEach(function (t) { etiquetas[t.id] = t.etiqueta; });
    return etiquetas;
  }

  function dibujarUltimas(contenedor, charlas, etiquetas, idsNuevas) {
    vaciar(contenedor);
    L.ultimasCharlas(charlas, CUANTAS, idsNuevas).forEach(function (charla) {
      var tarjeta = window.AAC_ficha(charla, { etiquetasDeTema: etiquetas });
      if (tarjeta) contenedor.appendChild(tarjeta);
    });
  }

  function dibujarMasVistas(lista, charlas, etiquetas) {
    vaciar(lista);
    L.masVistas(charlas, CUANTAS).forEach(function (charla, i) {
      var tarjeta = window.AAC_ficha(charla, { etiquetasDeTema: etiquetas, puesto: i + 1, conVistas: true });
      if (!tarjeta) return;
      var li = crear('li');
      li.appendChild(tarjeta);
      lista.appendChild(li);
    });
    var seccion = seccionDe(lista);
    if (seccion) seccion.hidden = lista.children.length === 0;
  }

  // ---- temas ----

  function dibujarTemas(contenedor, temas, charlas) {
    vaciar(contenedor);
    L.conteoPorTema(temas, charlas).forEach(function (tema) {
      var a = crear('a', 'tema-card');
      a.href = 'videoteca.html?tema=' + encodeURIComponent(tema.id);
      a.appendChild(crear('span', 'tema-nombre', tema.nombre));
      if (tema.gancho) a.appendChild(crear('span', 'tema-gancho', tema.gancho));
      var cantidad = crear('small', '', L.textoCantidad(tema.cantidad));
      var flecha = crear('span', 'tema-flecha', '→'); // decorativa: el enlace ya dice adónde va
      flecha.setAttribute('aria-hidden', 'true');
      cantidad.appendChild(flecha);
      a.appendChild(cantidad);
      contenedor.appendChild(a);
    });
  }

  // ---- arranque ----

  function iniciar() {
    L = window.AAC_portada;
    if (!L) return; // sin la lógica no se toca nada: queda el contenido fijo del HTML

    var combinar = window.AAC_aplicarCorrecciones;
    var hayCatalogo = typeof combinar === 'function' && typeof window.AAC_ficha === 'function' &&
      Array.isArray(window.AAC_CHARLAS) && Array.isArray(window.AAC_TEMAS);
    var ultimas = buscar('ultimas');
    var temasNodo = buscar('temas');
    var masVistas = buscar('mas-vistas');
    var proximaNodo = buscar('proxima');
    var sitio = window.AAC_SITIO;

    if (hayCatalogo) {
      var nuevas = Array.isArray(window.AAC_CHARLAS_NUEVAS) ? window.AAC_CHARLAS_NUEVAS : [];
      var charlas = combinar(window.AAC_CHARLAS, window.AAC_CORRECCIONES, nuevas, window.AAC_ARCHIVO_CHARLAS);
      var idsNuevas = nuevas.map(function (c) { return c && c.id; });
      var etiquetas = etiquetasDeTema(window.AAC_TEMAS);
      if (ultimas) dibujarUltimas(ultimas, charlas, etiquetas, idsNuevas);
      if (temasNodo) dibujarTemas(temasNodo, window.AAC_TEMAS, charlas);
      if (masVistas) dibujarMasVistas(masVistas, charlas, etiquetas);
      var videos = buscar('videos');
      var total = L.totalVideos(charlas);
      if (videos && total > 0) videos.textContent = String(total);
    } else {
      if (ultimas) aviso(ultimas, 'No pudimos cargar las charlas en este momento.');
      if (temasNodo) aviso(temasNodo, 'No pudimos cargar los temas en este momento.');
    }

    // Si no cargó la próxima charla, queda la tarjeta fija del HTML (horario habitual).
    if (proximaNodo && typeof window.AAC_PROXIMA_CHARLA === 'object' && window.AAC_PROXIMA_CHARLA !== null) {
      iniciarContador(proximaNodo, window.AAC_PROXIMA_CHARLA, sitio);
    }

    if (typeof sitio === 'object' && sitio !== null) {
      var conferencias = buscar('conferencias');
      var cifra = L.textoVisible(sitio.conferencias);
      if (conferencias && cifra) conferencias.textContent = cifra;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
