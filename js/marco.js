/*
  Marco compartido de todas las páginas: cabecera con el menú y pie (sin barra superior desde C-03c:
  dentro de la web de la UTN FRM la cabecera de la facultad ya cumple ese papel).
  Se define UNA sola vez acá; cada página solo deja tres contenedores marcados:
    <header data-aac="cabecera">…</header>   <footer data-aac="pie">…</footer>
  y dice qué página es en su contenedor raíz:  <div class="aac-web" data-aac-pagina="inicio">

  - El menú (ítems y direcciones) sale de AAC_portada.itemsDeMenu(), en js/portada-logica.js.
  - En pantallas angostas el menú se pliega detrás del botón «Menú»; sin JavaScript se ve entero.
  - El pie toma el correo, las redes, la dirección y el mapa de data/sitio.js. Una red sin enlace no se muestra.
  - Lo que cada página trae escrito dentro de los contenedores es solo el respaldo por si esto no carga.
  - Botón «↑ Subir» (enlace a #inicio, el contenedor .aac-web): aparece después de bajar más de una pantalla,
    sube con desplazamiento suave solo si no se pidió reducir el movimiento y deja el foco en «Saltar al contenido».
    Sin JavaScript es un enlace común; si la página no lo trae escrito, se crea acá.

  Necesita cargados antes: js/portada-logica.js (y data/sitio.js para el pie). Sin módulos ES.
*/
(function () {
  'use strict';

  var LOGO = 'design-system/assets/logo.png';
  var LOGO_UTN = 'img/logo-utn.png'; // copia sin cambios del logo oficial de frm.utn.edu.ar; el blanco sale por CSS
  var ANCHO_MENU_PLEGADO = '(max-width: 719.98px)';
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
  function buscar(raiz, nombre) {
    return raiz.querySelector('[data-aac="' + nombre + '"]');
  }
  function externo(texto, url, pestaniaNueva) {
    var a = crear('a', '', texto);
    a.href = url;
    a.rel = 'noopener noreferrer';
    if (pestaniaNueva) {
      a.target = '_blank';
      a.appendChild(crear('span', 'solo-lectores', ' (se abre en una pestaña nueva)'));
    }
    return a;
  }

  // ---- cabecera y menú ----

  function dibujarCabecera(nodo, pagina) {
    vaciar(nodo);
    nodo.className = 'nav';
    var wrap = crear('div', 'wrap');

    var marca = crear('a', 'nav-marca');
    marca.href = 'index.html';
    var logo = document.createElement('img');
    logo.src = LOGO;
    logo.alt = 'Ateneo Amigos de la Ciencia: ir al inicio';
    logo.width = 148; // proporción del archivo (900×438); el alto lo fija la hoja
    logo.height = 72;
    marca.appendChild(logo);
    wrap.appendChild(marca);

    var boton = crear('button', 'menu-boton');
    boton.type = 'button';
    boton.appendChild(crear('span', 'menu-icono'));
    boton.appendChild(crear('span', '', 'Menú'));
    boton.setAttribute('aria-controls', 'aac-menu');
    boton.setAttribute('aria-expanded', 'false');
    wrap.appendChild(boton);

    var nav = crear('nav');
    nav.setAttribute('aria-label', 'Principal');
    var ul = crear('ul');
    ul.id = 'aac-menu';
    L.itemsDeMenu(pagina).forEach(function (item) {
      var li = crear('li');
      var a = crear('a', '', item.texto);
      a.href = item.url;
      if (item.actual) a.setAttribute('aria-current', 'page');
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);
    wrap.appendChild(nav);
    nodo.appendChild(wrap);

    plegarMenu(boton, ul);
  }

  // Menú desplegable (disclosure): cerrado, la lista queda con `hidden` y fuera del recorrido de teclado.
  function plegarMenu(boton, lista) {
    var abierto = false;
    var consulta = window.matchMedia ? window.matchMedia(ANCHO_MENU_PLEGADO) : null;

    function aplicar() {
      var plegable = Boolean(consulta && consulta.matches);
      boton.hidden = !plegable;
      lista.hidden = plegable && !abierto;
      boton.setAttribute('aria-expanded', plegable && abierto ? 'true' : 'false');
    }
    function cerrar(devolverFoco) {
      if (!abierto) return;
      abierto = false;
      aplicar();
      if (devolverFoco) boton.focus();
    }

    boton.addEventListener('click', function () {
      abierto = !abierto;
      aplicar();
    });
    lista.addEventListener('click', function (evento) {
      if (evento.target && evento.target.closest && evento.target.closest('a')) cerrar(false);
    });
    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && abierto && !boton.hidden) cerrar(true);
    });
    if (consulta) {
      if (consulta.addEventListener) consulta.addEventListener('change', aplicar);
      else if (consulta.addListener) consulta.addListener(aplicar);
    }
    aplicar();
  }

  // ---- pie ----

  function columna(titulo) {
    var div = crear('div');
    div.appendChild(crear('h2', '', titulo));
    return div;
  }

  function dibujarPie(nodo, sitio) {
    var correo = L.correoVisible(sitio.correo);
    var redes = L.redesVisibles(sitio.redes);
    var direccion = L.textoVisible(sitio.direccion);
    var mapa = L.enlaceSeguro(sitio.mapa_url);

    vaciar(nodo);
    var wrap = crear('div', 'wrap');

    var contacto = columna('Escribinos');
    if (correo) {
      var pCorreo = crear('p');
      var aCorreo = crear('a', 'pie-correo', correo);
      aCorreo.href = 'mailto:' + correo;
      pCorreo.appendChild(aCorreo);
      contacto.appendChild(pCorreo);
      contacto.appendChild(crear('p', '', 'Consultas e inscripción a las charlas'));
    }
    var pProponer = crear('p');
    var aProponer = crear('a', '', 'Proponer una charla');
    aProponer.href = 'quienes-somos.html#proponer';
    pProponer.appendChild(aProponer);
    contacto.appendChild(pProponer);
    wrap.appendChild(contacto);

    if (redes.length > 0) {
      var seguinos = columna('Seguinos');
      var ul = crear('ul', 'redes');
      redes.forEach(function (red) {
        var li = crear('li');
        li.appendChild(externo(red.nombre, red.url, false));
        ul.appendChild(li);
      });
      seguinos.appendChild(ul);
      wrap.appendChild(seguinos);
    }

    if (direccion || mapa) {
      var donde = columna('Dónde estamos');
      if (direccion) donde.appendChild(crear('p', '', direccion));
      if (mapa) {
        var pMapa = crear('p');
        pMapa.appendChild(externo('Cómo llegar', mapa, true));
        donde.appendChild(pMapa);
      }
      wrap.appendChild(donde);
    }

    // Una actividad de la UTN FRM: logo oficial, sin redibujar, en blanco por CSS
    var utn = crear('div', 'pie-utn');
    var logoUtn = document.createElement('img');
    logoUtn.src = LOGO_UTN;
    logoUtn.alt = 'Universidad Tecnológica Nacional – Facultad Regional Mendoza';
    logoUtn.width = 158;
    logoUtn.height = 41;
    logoUtn.loading = 'lazy';
    utn.appendChild(logoUtn);
    utn.appendChild(crear('p', '', 'Una actividad de la UTN Facultad Regional Mendoza'));
    wrap.appendChild(utn);
    nodo.appendChild(wrap);
  }

  // Enlaces al canal de YouTube en el cuerpo de la página (data-aac="canal"): toman la dirección de data/sitio.js.
  function sincronizarCanal(raiz, sitio) {
    var canal = L.enlaceSeguro(sitio.canal_youtube);
    if (canal === null) return;
    var enlaces = raiz.querySelectorAll('main [data-aac="canal"]');
    for (var i = 0; i < enlaces.length; i++) enlaces[i].href = canal;
  }

  // Correo de contacto en el cuerpo de la página (texto visible + mailto).
  function sincronizarCorreo(raiz, sitio) {
    var correo = L.correoVisible(sitio.correo);
    if (correo === null) return;
    var enlaces = raiz.querySelectorAll('main [data-aac="correo"]');
    for (var i = 0; i < enlaces.length; i++) {
      enlaces[i].href = 'mailto:' + correo;
      enlaces[i].textContent = correo;
    }
    var propuesta = buscar(raiz, 'correo-propuesta');
    if (propuesta) propuesta.href = 'mailto:' + correo + '?subject=' + encodeURIComponent('Propuesta de charla');
  }

  // ---- volver arriba ----

  function volverArriba(raiz) {
    var enlace = buscar(raiz, 'volver-arriba');
    if (!enlace) {
      enlace = crear('a', 'volver-arriba');
      enlace.href = '#inicio';
      enlace.setAttribute('data-aac', 'volver-arriba');
      enlace.setAttribute('aria-label', 'Subir: volver al inicio de la página');
      var flecha = crear('span', '', '↑');
      flecha.setAttribute('aria-hidden', 'true');
      enlace.appendChild(flecha);
      enlace.appendChild(document.createTextNode(' Subir'));
      raiz.appendChild(enlace);
    }
    var saltar = raiz.querySelector('.saltar');
    var movimiento = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: no-preference)') : null;

    // Cuánto se bajó desde el principio de la sección del Ateneo (dentro de Elementor no es el tope de la página).
    function actualizar() {
      var desplazado = -raiz.getBoundingClientRect().top;
      enlace.hidden = !L.debeMostrarVolverArriba(desplazado, window.innerHeight);
    }
    var pendiente = false;
    window.addEventListener('scroll', function () {
      if (pendiente) return;
      pendiente = true;
      window.requestAnimationFrame(function () { pendiente = false; actualizar(); });
    }, { passive: true });
    window.addEventListener('resize', actualizar);
    actualizar();

    enlace.addEventListener('click', function (evento) {
      evento.preventDefault();
      var suave = movimiento !== null && movimiento.matches;
      var destino = raiz.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: Math.max(0, destino), behavior: suave ? 'smooth' : 'auto' });
      var foco = saltar || raiz.querySelector('main');
      if (foco) {
        if (!saltar) foco.setAttribute('tabindex', '-1');
        foco.focus({ preventScroll: true });
      }
    });
  }

  // ---- arranque ----

  function iniciar() {
    L = window.AAC_portada;
    var raiz = document.querySelector('.aac-web');
    if (!L || !raiz) return; // sin la lógica queda el respaldo escrito en el HTML
    var pagina = raiz.getAttribute('data-aac-pagina');
    var sitio = window.AAC_SITIO;

    var cabecera = buscar(raiz, 'cabecera');
    if (cabecera) dibujarCabecera(cabecera, pagina);
    volverArriba(raiz);

    if (typeof sitio === 'object' && sitio !== null) {
      var pie = buscar(raiz, 'pie');
      if (pie) dibujarPie(pie, sitio);
      sincronizarCorreo(raiz, sitio);
      sincronizarCanal(raiz, sitio);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
