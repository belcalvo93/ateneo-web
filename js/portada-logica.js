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

  // "dd/mm/aaaa" -> "aaaammdd" para comparar fechas como texto; null si no es una fecha válida.
  function claveDeFecha(texto) {
    return partesDeFecha(texto) === null ? null : texto.slice(6) + texto.slice(3, 5) + texto.slice(0, 2);
  }

  // Las n charlas más recientes, por año. Dentro del año: primero las agregadas a mano sin fecha
  // (idsNuevas, la última agregada antes), después las que tienen fecha real de la más nueva a la más
  // vieja, y al final las del catálogo sin fecha, en su orden (ya va de más nueva a más vieja).
  function ultimasCharlas(charlas, n, idsNuevas) {
    var nuevas = Array.isArray(idsNuevas) ? idsNuevas : [];
    var anio = function (c) { return typeof c.anio === 'number' ? c.anio : 0; };
    var puesto = function (c) { return nuevas.indexOf(c.id); }; // -1 = del catálogo
    var grupo = function (c) {
      if (claveDeFecha(c.fecha) !== null) return 1;
      return puesto(c) >= 0 ? 0 : 2;
    };
    return ordenar(lista(charlas), function (a, b) {
      if (anio(a) !== anio(b)) return anio(b) - anio(a);
      if (grupo(a) !== grupo(b)) return grupo(a) - grupo(b);
      if (grupo(a) === 0) return puesto(b) - puesto(a);
      if (grupo(a) === 1) return claveDeFecha(a.fecha) < claveDeFecha(b.fecha) ? 1 : claveDeFecha(a.fecha) > claveDeFecha(b.fecha) ? -1 : 0;
      return 0;
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

  // Enlace al Canal de Difusión de WhatsApp para el botón «Recibí el aviso…». Se reconoce por el dominio
  // (whatsapp.com o wa.me), no por el nombre de la red, para que renombrarla no rompa el botón.
  function enlaceAvisoWhatsApp(redes) {
    var visibles = redesVisibles(redes);
    for (var i = 0; i < visibles.length; i++) {
      var m = /^https?:\/\/([^\/?#]+)/i.exec(visibles[i].url);
      var host = m ? m[1].toLowerCase() : '';
      if (host === 'whatsapp.com' || host === 'www.whatsapp.com' || host === 'wa.me') return visibles[i].url;
    }
    return null;
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

  // ---- contador de la próxima charla (C-02c) ----
  // Todo en hora de Argentina (UTC-3, sin horario de verano), sin importar la zona horaria del visitante.

  var HORA_ARGENTINA = 3 * 3600 * 1000; // UTC-3
  var DURACION_POR_DEFECTO = 90;

  function plural(n, uno, varios) {
    return n + ' ' + (n === 1 ? uno : varios);
  }

  // Inicio de la charla en milisegundos (UTC); null si la fecha o la hora no son válidas.
  function inicioDeCharla(proxima) {
    if (!esObjeto(proxima)) return null;
    var f = partesDeFecha(proxima.fecha);
    var h = typeof proxima.hora === 'string' ? RE_HORA.exec(proxima.hora.trim()) : null;
    if (f === null || !h) return null;
    return f.getTime() + (Number(h[1]) * 60 + Number(h[2])) * 60000 + HORA_ARGENTINA;
  }

  // Día en Argentina de un instante, como número comparable.
  function diaArgentino(ms) {
    return Math.floor((ms - HORA_ARGENTINA) / 86400000);
  }

  // Estado del contador: { tipo, texto, inicioMs }.
  // tipo: 'sin-fecha' | 'faltan' | 'hoy' | 'pronto' | 'en-vivo' | 'terminada'.
  function estadoProxima(ahoraMs, proxima, duracionMin) {
    var inicio = inicioDeCharla(proxima);
    if (inicio === null || typeof ahoraMs !== 'number' || !isFinite(ahoraMs)) return { tipo: 'sin-fecha', texto: null, inicioMs: null };
    var duracion = typeof duracionMin === 'number' && isFinite(duracionMin) && duracionMin > 0 ? duracionMin : DURACION_POR_DEFECTO;
    var falta = inicio - ahoraMs;
    var mismoDia = diaArgentino(ahoraMs) === diaArgentino(inicio);
    var r = function (tipo, texto) { return { tipo: tipo, texto: texto, inicioMs: inicio }; };
    if (falta <= 0) {
      if (-falta < duracion * 60000) return r('en-vivo', 'En vivo ahora');
      return r('terminada', mismoDia ? 'La charla de hoy terminó' : 'La última charla ya terminó');
    }
    if (falta <= 3600000) return r('pronto', 'Empieza en ' + plural(Math.ceil(falta / 60000), 'minuto', 'minutos'));
    if (mismoDia) return r('hoy', 'Hoy a las ' + horaCorta(proxima.hora) + ' (hora de Argentina)');
    var horas = Math.floor(falta / 3600000);
    var dias = Math.floor(horas / 24);
    horas = horas % 24;
    var partes = [];
    if (dias > 0) partes.push(plural(dias, 'día', 'días'));
    if (horas > 0) partes.push(plural(horas, 'hora', 'horas'));
    return r('faltan', 'Faltan ' + partes.join(' y '));
  }

  // «Entrar por Zoom» solo con una charla con fecha cargada, antes o durante la charla: terminada o sin fecha
  // se oculta, para que nadie entre a una sala vacía (el link del semestre es fijo).
  function mostrarZoom(tipo) {
    return tipo === 'faltan' || tipo === 'hoy' || tipo === 'pronto' || tipo === 'en-vivo';
  }

  // Texto de «Cuándo»: con fecha, «viernes 13 de noviembre, 18 hs (hora de Argentina)»; sin fecha, el horario habitual.
  function textoCuando(proxima) {
    var hora = esObjeto(proxima) ? horaCorta(proxima.hora) : null;
    var fecha = esObjeto(proxima) ? fechaLarga(proxima.fecha) : null;
    if (fecha !== null) return fecha + (hora ? ', ' + hora : '') + ' (hora de Argentina)';
    return 'Todos los viernes' + (hora ? ' a las ' + hora : '') + ' (hora de Argentina)';
  }

  // Botón «Volver arriba»: se muestra solo después de bajar más de una pantalla.
  function debeMostrarVolverArriba(desplazado, altoPantalla) {
    return typeof desplazado === 'number' && typeof altoPantalla === 'number' &&
      isFinite(desplazado) && altoPantalla > 0 && desplazado > altoPantalla;
  }

  // Entrevistas de radio para «Quiénes somos»: solo las que tienen título real y enlace https.
  function entrevistasVisibles(lista) {
    if (!Array.isArray(lista)) return [];
    return lista
      .filter(function (x) { return esObjeto(x) && textoVisible(x.titulo) !== null && enlaceHttps(x.url) !== null; })
      .map(function (x) { return { titulo: textoVisible(x.titulo), url: enlaceHttps(x.url), fecha: textoFecha(x.fecha) }; });
  }

  // Video de presentación de «Quiénes somos»: solo un video de YouTube -> { url, miniatura }; si no, null.
  function videoDePresentacion(url) {
    var seguro = enlaceHttps(url);
    var imagen = seguro === null ? null : miniatura(seguro);
    return imagen === null ? null : { url: seguro, miniatura: imagen };
  }

  // Integrantes de la Mesa Organizadora ({ nombre, apellido }) -> "Nombre Apellido", en orden alfabético por
  // apellido y luego por nombre, sin distinguir tildes ni mayúsculas. Descarta los incompletos.
  function integrantesOrdenados(lista) {
    if (!Array.isArray(lista)) return [];
    var comparar = function (a, b) { return a.localeCompare(b, 'es', { sensitivity: 'base' }); };
    return lista
      .filter(function (x) { return esObjeto(x) && textoVisible(x.nombre) !== null && textoVisible(x.apellido) !== null; })
      .map(function (x) { return { nombre: textoVisible(x.nombre), apellido: textoVisible(x.apellido) }; })
      .sort(function (a, b) { return comparar(a.apellido, b.apellido) || comparar(a.nombre, b.nombre); })
      .map(function (x) { return x.nombre + ' ' + x.apellido; });
  }

  // "09/10/2026" -> "9 de octubre de 2026"; null si la fecha no es válida.
  function textoFecha(texto) {
    var f = partesDeFecha(texto);
    return f === null ? null : f.getUTCDate() + ' de ' + MESES[f.getUTCMonth()] + ' de ' + f.getUTCFullYear();
  }

  // Lo que muestra la tarjeta: la fecha exacta si la tiene; si no, el año; si no, null.
  function fechaDeCharla(charla) {
    if (!esObjeto(charla)) return null;
    var fecha = textoFecha(charla.fecha);
    if (fecha !== null) return fecha;
    return typeof charla.anio === 'number' ? String(charla.anio) : null;
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

  // Enlace seguro que además es https (Zoom, entrevistas).
  function enlaceHttps(x) {
    var url = enlaceSeguro(x);
    return url !== null && /^https:\/\//i.test(url) ? url : null;
  }

  function correoVisible(x) {
    var limpio = textoVisible(x);
    return limpio !== null && RE_CORREO.test(limpio) ? limpio : null;
  }

  // Los botones de la tarjeta, en orden. Calendar y Zoom son opcionales: sin enlace no hay botón.
  // Zoom: el link propio de la charla (proxima.zoom_url) o, si no tiene, el del semestre (sitio.zoom_url_semestre),
  // también mientras la charla no está anunciada. Solo enlaces https.
  function accionesProxima(proxima, sitio) {
    if (!esObjeto(proxima)) return [];
    var acciones = [];
    var correo = correoVisible(proxima.correo_inscripcion);
    if (correo !== null) acciones.push({ tipo: 'correo', texto: 'Inscribirme por correo', url: 'mailto:' + correo });
    var calendar = enlaceSeguro(proxima.calendar_url);
    if (calendar !== null) acciones.push({ tipo: 'calendar', texto: 'Agendar en mi calendario', url: calendar });
    var zoom = enlaceHttps(proxima.zoom_url) || (esObjeto(sitio) ? enlaceHttps(sitio.zoom_url_semestre) : null);
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
    enlaceAvisoWhatsApp: enlaceAvisoWhatsApp,
    fechaLarga: fechaLarga,
    textoFecha: textoFecha,
    debeMostrarVolverArriba: debeMostrarVolverArriba,
    estadoProxima: estadoProxima,
    textoCuando: textoCuando,
    mostrarZoom: mostrarZoom,
    entrevistasVisibles: entrevistasVisibles,
    videoDePresentacion: videoDePresentacion,
    integrantesOrdenados: integrantesOrdenados,
    fechaDeCharla: fechaDeCharla,
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
