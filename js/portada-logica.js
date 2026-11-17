/*
  Lógica de la portada (Inicio): funciones puras, sin tocar la página.

  Acá vive la REGLA DE ORO del sitio: un dato entre corchetes ([Título], [fecha]…) nunca llega al público.
  Todo texto de datos pasa por textoVisible() y todo enlace por enlaceSeguro() antes de mostrarse.

  Funciona como <script> común (define solo window.AAC_portada, se puede pegar en línea en Elementor)
  y con require() en Node (tests). Sin módulos ES.
*/
(function (global) {
  'use strict';

  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var RE_PLACEHOLDER = /^\s*\[.*\]\s*$/;
  var RE_HTTP = /^https?:\/\/\S+$/i;
  var RE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var RE_FECHA = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  var RE_HORA = /^([01]\d|2[0-3]):([0-5]\d)$/;
  var RE_ID_VIDEO = /^[\w-]{11}$/;
  var RE_DURACION = /^(?:(\d+):)?(\d{1,2}):(\d{2})$/;

  // Menú principal: se define solo acá. `pagina` es el valor de data-aac-pagina de cada página.
  var MENU = [
    { texto: 'Inicio', url: 'index.html', pagina: 'inicio' },
    { texto: 'Videoteca', url: 'videoteca.html', pagina: 'videoteca' },
    { texto: 'Quiénes somos', url: 'quienes-somos.html', pagina: 'quienes-somos' },
    { texto: 'Contacto', url: '#contacto', pagina: null }
  ];

  function esObjeto(x) {
    return typeof x === 'object' && x !== null && !Array.isArray(x);
  }
  function lista(x) {
    return Array.isArray(x) ? x.filter(esObjeto) : [];
  }

  // ---- regla de oro ----

  function esPlaceholder(x) {
    return typeof x === 'string' && RE_PLACEHOLDER.test(x);
  }

  // El texto listo para mostrar, o null si falta, está vacío o es un placeholder.
  function textoVisible(x) {
    if (typeof x !== 'string' || esPlaceholder(x)) return null;
    var limpio = x.trim();
    return limpio === '' ? null : limpio;
  }

  // El enlace si empieza con http:// o https://; cualquier otra cosa (javascript:, placeholder, null) es null.
  function enlaceSeguro(url) {
    var limpio = textoVisible(url);
    return limpio !== null && RE_HTTP.test(limpio) ? limpio : null;
  }

  // ---- charlas ----

  function primeraParte(charla) {
    return esObjeto(charla) && Array.isArray(charla.partes) && esObjeto(charla.partes[0]) ? charla.partes[0] : null;
  }

  function tituloVisible(charla) {
    if (!esObjeto(charla)) return null;
    var parte = primeraParte(charla);
    return textoVisible(charla.titulo) || (parte ? textoVisible(parte.titulo_original) : null);
  }

  function disertanteVisible(charla) {
    return esObjeto(charla) ? textoVisible(charla.disertante) : null;
  }

  function idDeVideo(url) {
    var limpio = enlaceSeguro(url);
    if (limpio === null) return null;
    var m = /^https?:\/\/(?:www\.|m\.)?youtube\.com\/watch\?(?:[^#]*&)?v=([^&#]+)/i.exec(limpio) || /^https?:\/\/youtu\.be\/([^?#/]+)/i.exec(limpio);
    return m && RE_ID_VIDEO.test(m[1]) ? m[1] : null;
  }

  function miniatura(url) {
    var id = idDeVideo(url);
    return id === null ? null : 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';
  }

  // Orden estable: a igual clave se conserva la posición original.
  function ordenar(items, comparar) {
    return items
      .map(function (valor, i) { return { valor: valor, i: i }; })
      .sort(function (a, b) { return comparar(a.valor, b.valor) || a.i - b.i; })
      .map(function (x) { return x.valor; });
  }

  // Las n charlas más recientes. Las charlas no tienen fecha, solo año: a igual año van primero las
  // agregadas a mano (idsNuevas, la última agregada antes) y después las del catálogo en su orden,
  // que ya es de más nueva a más vieja. Cuando haya fechas reales, se ordena por fecha acá.
  function ultimasCharlas(charlas, n, idsNuevas) {
    var nuevas = Array.isArray(idsNuevas) ? idsNuevas : [];
    var anio = function (c) { return typeof c.anio === 'number' ? c.anio : 0; };
    var puesto = function (c) { return nuevas.indexOf(c.id); }; // -1 = del catálogo
    return ordenar(lista(charlas), function (a, b) {
      if (anio(a) !== anio(b)) return anio(b) - anio(a);
      return puesto(b) - puesto(a);
    }).slice(0, n);
  }

  // Visualizaciones de la charla: la suma de las de todas sus partes (la unidad es la charla).
  // null si ninguna parte tiene el dato.
  function vistasDeCharla(charla) {
    if (!esObjeto(charla) || !Array.isArray(charla.partes)) return null;
    var total = null;
    charla.partes.forEach(function (p) {
      if (esObjeto(p) && typeof p.vistas === 'number' && p.vistas >= 0) total = (total || 0) + p.vistas;
    });
    return total;
  }

  // Las n charlas de «Las más vistas»: primero las marcadas destacada: true, después por visualizaciones.
  function masVistas(charlas, n) {
    var porVistas = function (a, b) { return (vistasDeCharla(b) || 0) - (vistasDeCharla(a) || 0); };
    var todas = lista(charlas);
    var destacadas = ordenar(todas.filter(function (c) { return c.destacada === true; }), porVistas);
    var resto = ordenar(todas.filter(function (c) { return c.destacada !== true; }), porVistas);
    return destacadas.concat(resto).slice(0, n);
  }

  function formatoVistas(n) {
    if (typeof n !== 'number' || !isFinite(n) || n < 0) return null;
    if (n < 1000) return n + (n === 1 ? ' visualización' : ' visualizaciones');
    var miles = n < 9950 ? Math.round(n / 100) / 10 : Math.round(n / 1000);
    return String(miles).replace('.', ',') + ' mil visualizaciones';
  }

  // Misma lectura que el validador (scripts/lib/normalizar.js): M:SS, MM:SS o H:MM:SS.
  function segundosDe(duracion) {
    var m = typeof duracion === 'string' ? RE_DURACION.exec(duracion.trim()) : null;
    if (!m) return null;
    var horas = m[1] === undefined ? 0 : Number(m[1]);
    var minutos = Number(m[2]);
    var segundos = Number(m[3]);
    if (segundos > 59 || (m[1] !== undefined && minutos > 59)) return null;
    return horas * 3600 + minutos * 60 + segundos;
  }

  function dosCifras(n) {
    return n < 10 ? '0' + n : String(n);
  }

  // Duración total de la charla (suma de sus partes) como "M:SS" o "H:MM:SS".
  // null si no tiene partes o si alguna duración no se puede leer.
  function duracionDeCharla(charla) {
    if (!esObjeto(charla) || !Array.isArray(charla.partes) || charla.partes.length === 0) return null;
    var total = 0;
    for (var i = 0; i < charla.partes.length; i++) {
      var s = esObjeto(charla.partes[i]) ? segundosDe(charla.partes[i].duracion) : null;
      if (s === null) return null;
      total += s;
    }
    var horas = Math.floor(total / 3600);
    var minutos = Math.floor((total % 3600) / 60);
    var segundos = total % 60;
    return horas > 0 ? horas + ':' + dosCifras(minutos) + ':' + dosCifras(segundos) : minutos + ':' + dosCifras(segundos);
  }

  // "2 partes", "3 partes"…; null si la charla es de una sola parte.
  function textoPartes(charla) {
    var n = esObjeto(charla) && Array.isArray(charla.partes) ? charla.partes.length : 0;
    return n > 1 ? n + ' partes' : null;
  }

  // ---- menú ----

  // Los ítems del menú principal, con el de la página abierta marcado (y ningún otro).
  function itemsDeMenu(pagina) {
    return MENU.map(function (item) {
      return { texto: item.texto, url: item.url, actual: item.pagina !== null && item.pagina === pagina };
    });
  }

  // ---- temas ----

  function conteoPorTema(temas, charlas) {
    var cantidades = {};
    lista(charlas).forEach(function (c) {
      if (typeof c.tema === 'string') cantidades[c.tema] = (cantidades[c.tema] || 0) + 1;
    });
    var salida = [];
    lista(temas).forEach(function (t) {
      var nombre = textoVisible(t.nombre);
      if (typeof t.id !== 'string' || nombre === null) return;
      salida.push({ id: t.id, nombre: nombre, etiqueta: textoVisible(t.etiqueta) || nombre, gancho: textoVisible(t.gancho), cantidad: cantidades[t.id] || 0 });
    });
    return salida;
  }

  function textoCantidad(n) {
    return n + (n === 1 ? ' charla' : ' charlas');
  }

  function totalVideos(charlas) {
    return lista(charlas).reduce(function (total, c) {
      return total + (Array.isArray(c.partes) ? c.partes.length : 0);
    }, 0);
  }

  // ---- redes ----

  // Las redes que se pueden mostrar: con nombre y con enlace real. Una red sin enlace se oculta.
  function redesVisibles(redes) {
    var salida = [];
    lista(redes).forEach(function (r) {
      var nombre = textoVisible(r.nombre);
      var url = enlaceSeguro(r.url);
      if (nombre !== null && url !== null) salida.push({ nombre: nombre, url: url });
    });
    return salida;
  }

  // ---- próxima charla ----

  function partesDeFecha(texto) {
    var m = typeof texto === 'string' ? RE_FECHA.exec(texto.trim()) : null;
    if (!m) return null;
    var d = Number(m[1]), mes = Number(m[2]), a = Number(m[3]);
    var f = new Date(Date.UTC(a, mes - 1, d));
    return f.getUTCFullYear() === a && f.getUTCMonth() === mes - 1 && f.getUTCDate() === d ? f : null;
  }

  // "13/11/2026" -> "viernes 13 de noviembre"; null si la fecha no es válida.
  function fechaLarga(texto) {
    var f = partesDeFecha(texto);
    return f === null ? null : DIAS[f.getUTCDay()] + ' ' + f.getUTCDate() + ' de ' + MESES[f.getUTCMonth()];
  }

  // "18:00" -> "18 hs"; "09:30" -> "9:30 hs"; null si la hora no es válida.
  function horaCorta(texto) {
    var m = typeof texto === 'string' ? RE_HORA.exec(texto.trim()) : null;
    if (!m) return null;
    return Number(m[1]) + (m[2] === '00' ? '' : ':' + m[2]) + ' hs';
  }

  // La charla está anunciada cuando ya tiene título y fecha reales.
  function proximaAnunciada(proxima) {
    return esObjeto(proxima) && textoVisible(proxima.titulo) !== null && fechaLarga(proxima.fecha) !== null;
  }

  function correoVisible(x) {
    var limpio = textoVisible(x);
    return limpio !== null && RE_CORREO.test(limpio) ? limpio : null;
  }

  // Los botones de la tarjeta, en orden. Calendar y Zoom son opcionales: sin enlace no hay botón.
  function accionesProxima(proxima) {
    if (!esObjeto(proxima)) return [];
    var acciones = [];
    var correo = correoVisible(proxima.correo_inscripcion);
    if (correo !== null) acciones.push({ tipo: 'correo', texto: 'Inscribirme por correo', url: 'mailto:' + correo });
    var calendar = enlaceSeguro(proxima.calendar_url);
    if (calendar !== null) acciones.push({ tipo: 'calendar', texto: 'Agendar en mi calendario', url: calendar });
    var zoom = enlaceSeguro(proxima.zoom_url);
    if (zoom !== null) acciones.push({ tipo: 'zoom', texto: 'Entrar por Zoom', url: zoom });
    return acciones;
  }

  var api = {
    esPlaceholder: esPlaceholder,
    textoVisible: textoVisible,
    enlaceSeguro: enlaceSeguro,
    correoVisible: correoVisible,
    tituloVisible: tituloVisible,
    disertanteVisible: disertanteVisible,
    idDeVideo: idDeVideo,
    miniatura: miniatura,
    ultimasCharlas: ultimasCharlas,
    vistasDeCharla: vistasDeCharla,
    masVistas: masVistas,
    formatoVistas: formatoVistas,
    conteoPorTema: conteoPorTema,
    textoCantidad: textoCantidad,
    totalVideos: totalVideos,
    redesVisibles: redesVisibles,
    fechaLarga: fechaLarga,
    horaCorta: horaCorta,
    proximaAnunciada: proximaAnunciada,
    accionesProxima: accionesProxima,
    duracionDeCharla: duracionDeCharla,
    textoPartes: textoPartes,
    itemsDeMenu: itemsDeMenu
  };

  if (typeof module === 'object' && module.exports) module.exports = api;
  else global.AAC_portada = api;
})(typeof window !== 'undefined' ? window : this);
