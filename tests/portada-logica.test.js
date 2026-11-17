'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const L = require('../js/portada-logica.js');
const { aplicarCorrecciones } = require('../js/aplicar-correcciones.js');
const { cargarArchivoDeDatos } = require('../scripts/lib/cargar-datos.js');

const YT = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

function charla(id, extra) {
  return Object.assign({
    id, titulo: 'Título ' + id, disertante: 'Disertante ' + id, tema: 'geologia', anio: 2024,
    partes: [{ duracion: '10:00', url: YT, vistas: 10, titulo_original: 'ORIGINAL ' + id }],
    revisar: []
  }, extra);
}

// ---- 2.1 regla de oro ----

test('esPlaceholder: reconoce textos entre corchetes y nada más', () => {
  assert.equal(L.esPlaceholder('[Título]'), true);
  assert.equal(L.esPlaceholder('  [enlace de Instagram] '), true);
  assert.equal(L.esPlaceholder('Litio [parte 1]'), false);
  assert.equal(L.esPlaceholder('Litio'), false);
  assert.equal(L.esPlaceholder(null), false);
});

test('textoVisible: devuelve el texto limpio o null si no se puede mostrar', () => {
  assert.equal(L.textoVisible('  Energía solar '), 'Energía solar');
  assert.equal(L.textoVisible('Dra. Ana Pérez'), 'Dra. Ana Pérez');
  assert.equal(L.textoVisible('[Disertante]'), null);
  assert.equal(L.textoVisible('   '), null);
  assert.equal(L.textoVisible(''), null);
  assert.equal(L.textoVisible(null), null);
  assert.equal(L.textoVisible(undefined), null);
  assert.equal(L.textoVisible(42), null);
});

test('enlaceSeguro: solo deja pasar enlaces http(s)', () => {
  assert.equal(L.enlaceSeguro('https://whatsapp.com/channel/abc'), 'https://whatsapp.com/channel/abc');
  assert.equal(L.enlaceSeguro(' http://ejemplo.org/a '), 'http://ejemplo.org/a');
  assert.equal(L.enlaceSeguro('javascript:alert(1)'), null);
  assert.equal(L.enlaceSeguro('JAVASCRIPT:alert(1)'), null);
  assert.equal(L.enlaceSeguro('data:text/html,x'), null);
  assert.equal(L.enlaceSeguro('instagram.com/ateneo'), null);
  assert.equal(L.enlaceSeguro('[enlace de Instagram]'), null);
  assert.equal(L.enlaceSeguro(null), null);
  assert.equal(L.enlaceSeguro(7), null);
});

// ---- 2.2 título y disertante ----

test('tituloVisible: usa el título limpio y, si es placeholder, el original de la parte 1', () => {
  assert.equal(L.tituloVisible(charla('c1')), 'Título c1');
  assert.equal(L.tituloVisible(charla('c2', { titulo: '[Título]' })), 'ORIGINAL c2');
  assert.equal(L.tituloVisible(charla('c3', { titulo: '' })), 'ORIGINAL c3');
});

test('tituloVisible: sin partes o con original inválido devuelve null sin romper', () => {
  assert.equal(L.tituloVisible(charla('c1', { titulo: '[Título]', partes: [] })), null);
  assert.equal(L.tituloVisible({ titulo: '[Título]' }), null);
  assert.equal(L.tituloVisible(charla('c2', { titulo: '[Título]', partes: [{ titulo_original: '[x]' }] })), null);
  assert.equal(L.tituloVisible(null), null);
});

test('disertanteVisible: oculta el placeholder', () => {
  assert.equal(L.disertanteVisible(charla('c1')), 'Disertante c1');
  assert.equal(L.disertanteVisible(charla('c2', { disertante: '[Disertante]' })), null);
  assert.equal(L.disertanteVisible({}), null);
});

// ---- 2.3 miniaturas ----

test('idDeVideo: extrae el id de enlaces watch y youtu.be', () => {
  assert.equal(L.idDeVideo('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  assert.equal(L.idDeVideo('https://www.youtube.com/watch?list=PL1&v=d_v55kzF01s&t=5'), 'd_v55kzF01s');
  assert.equal(L.idDeVideo('https://youtu.be/dQw4w9WgXcQ?t=5'), 'dQw4w9WgXcQ');
});

test('idDeVideo: enlaces que no son de un video devuelven null', () => {
  assert.equal(L.idDeVideo(null), null);
  assert.equal(L.idDeVideo('https://ejemplo.com/watch?v=dQw4w9WgXcQ'), null);
  assert.equal(L.idDeVideo('https://www.youtube.com/@canal'), null);
  assert.equal(L.idDeVideo('https://www.youtube.com/watch?v=corto'), null);
});

test('miniatura: arma la dirección de la imagen o devuelve null', () => {
  assert.equal(L.miniatura(YT), 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg');
  assert.equal(L.miniatura('https://youtu.be/d_v55kzF01s'), 'https://img.youtube.com/vi/d_v55kzF01s/hqdefault.jpg');
  assert.equal(L.miniatura(null), null);
  assert.equal(L.miniatura('https://ejemplo.com/x'), null);
});

// ---- 2.4 últimas charlas ----

test('ultimasCharlas: ordena por año y conserva el orden del catálogo dentro del año', () => {
  const lista = [charla('c1', { anio: 2025 }), charla('c2', { anio: 2026 }), charla('c3', { anio: 2026 }), charla('c4', { anio: 2024 })];
  assert.deepEqual(L.ultimasCharlas(lista, 3).map((c) => c.id), ['c2', 'c3', 'c1']);
  assert.deepEqual(L.ultimasCharlas(lista, 2).map((c) => c.id), ['c2', 'c3']);
});

test('ultimasCharlas: a igual año, las agregadas a mano van primero y la última agregada antes', () => {
  const lista = [charla('c1', { anio: 2026 }), charla('c2', { anio: 2026 }), charla('n1', { anio: 2026 }), charla('n2', { anio: 2026 }), charla('n3', { anio: 2025 })];
  assert.deepEqual(L.ultimasCharlas(lista, 3, ['n1', 'n2', 'n3']).map((c) => c.id), ['n2', 'n1', 'c1']);
  assert.deepEqual(L.ultimasCharlas(lista, 5, ['n1', 'n2', 'n3']).map((c) => c.id), ['n2', 'n1', 'c1', 'c2', 'n3']);
});

test('ultimasCharlas: listas cortas, vacías o inválidas, sin modificar la lista recibida', () => {
  const lista = [charla('c1', { anio: 2020 }), charla('c2', { anio: 2026 })];
  const copia = JSON.stringify(lista);
  assert.deepEqual(L.ultimasCharlas(lista, 3).map((c) => c.id), ['c2', 'c1']);
  assert.equal(JSON.stringify(lista), copia);
  assert.deepEqual(L.ultimasCharlas([], 3), []);
  assert.deepEqual(L.ultimasCharlas(null, 3), []);
  assert.deepEqual(L.ultimasCharlas([null, charla('c1')], 3).map((c) => c.id), ['c1']);
});

// ---- 2.5 más vistas ----

test('vistasDeCharla: suma las visualizaciones de todas las partes', () => {
  const c = charla('c1', { partes: [{ vistas: 1000 }, { vistas: 500 }] });
  assert.equal(L.vistasDeCharla(c), 1500);
  assert.equal(L.vistasDeCharla(charla('c2', { partes: [{ vistas: 12000 }, { vistas: 154 }, { vistas: null }] })), 12154);
});

test('vistasDeCharla: sin ninguna visualización registrada devuelve null', () => {
  assert.equal(L.vistasDeCharla(charla('c1', { partes: [{ vistas: null }] })), null);
  assert.equal(L.vistasDeCharla(charla('c2', { partes: [] })), null);
  assert.equal(L.vistasDeCharla({}), null);
  assert.equal(L.vistasDeCharla(charla('c3', { partes: [{ vistas: 0 }] })), 0);
});

test('masVistas: sin destacadas, las de más visualizaciones de mayor a menor', () => {
  const lista = [
    charla('c1', { partes: [{ vistas: 5 }] }),
    charla('c2', { partes: [{ vistas: 900 }, { vistas: 200 }] }),
    charla('c3', { partes: [{ vistas: 1000 }] }),
    charla('c4', { partes: [{ vistas: null }] }),
    charla('c5', { partes: [{ vistas: 50 }] })
  ];
  assert.deepEqual(L.masVistas(lista, 3).map((c) => c.id), ['c2', 'c3', 'c5']);
});

test('masVistas: las destacadas van primero, sin repetir, y se completa por visualizaciones', () => {
  const lista = [
    charla('c1', { partes: [{ vistas: 5 }], destacada: true }),
    charla('c2', { partes: [{ vistas: 900 }] }),
    charla('c3', { partes: [{ vistas: 1000 }] }),
    charla('c4', { partes: [{ vistas: null }], destacada: true }),
    charla('c5', { partes: [{ vistas: 50 }], destacada: false })
  ];
  assert.deepEqual(L.masVistas(lista, 3).map((c) => c.id), ['c1', 'c4', 'c3']);
  assert.deepEqual(L.masVistas(lista, 5).map((c) => c.id), ['c1', 'c4', 'c3', 'c2', 'c5']);
});

test('masVistas: listas vacías o inválidas y sin modificar la lista recibida', () => {
  assert.deepEqual(L.masVistas([], 3), []);
  assert.deepEqual(L.masVistas(undefined, 3), []);
  const lista = [charla('c1', { partes: [{ vistas: 1 }] }), charla('c2', { partes: [{ vistas: 2 }] })];
  const copia = JSON.stringify(lista);
  assert.deepEqual(L.masVistas(lista, 3).map((c) => c.id), ['c2', 'c1']);
  assert.equal(JSON.stringify(lista), copia);
});

test('formatoVistas: redondea a miles como en el mockup', () => {
  assert.equal(L.formatoVistas(12154), '12 mil visualizaciones');
  assert.equal(L.formatoVistas(1200), '1,2 mil visualizaciones');
  assert.equal(L.formatoVistas(5000), '5 mil visualizaciones');
  assert.equal(L.formatoVistas(2243), '2,2 mil visualizaciones');
  assert.equal(L.formatoVistas(9960), '10 mil visualizaciones');
});

test('formatoVistas: menos de mil, una sola y valores inválidos', () => {
  assert.equal(L.formatoVistas(850), '850 visualizaciones');
  assert.equal(L.formatoVistas(1), '1 visualización');
  assert.equal(L.formatoVistas(0), '0 visualizaciones');
  assert.equal(L.formatoVistas(null), null);
  assert.equal(L.formatoVistas(-3), null);
  assert.equal(L.formatoVistas('12'), null);
});

// ---- 2.6 temas ----

const TEMAS = [
  { id: 'geologia', nombre: 'Geología, minería y energía', etiqueta: 'Geología', playlist_url: null },
  { id: 'agua', nombre: 'Agua, ambiente y sostenibilidad', etiqueta: 'Agua y ambiente', playlist_url: null },
  { id: 'vacio', nombre: 'Tema sin charlas', etiqueta: 'Vacío', playlist_url: null }
];

test('conteoPorTema: cuenta las charlas de cada tema en el orden de los temas', () => {
  const lista = [charla('c1'), charla('c2', { tema: 'agua' }), charla('c3'), charla('c4', { tema: 'no-existe' })];
  assert.deepEqual(L.conteoPorTema(TEMAS, lista), [
    { id: 'geologia', nombre: 'Geología, minería y energía', etiqueta: 'Geología', gancho: null, cantidad: 2 },
    { id: 'agua', nombre: 'Agua, ambiente y sostenibilidad', etiqueta: 'Agua y ambiente', gancho: null, cantidad: 1 },
    { id: 'vacio', nombre: 'Tema sin charlas', etiqueta: 'Vacío', gancho: null, cantidad: 0 }
  ]);
});

test('conteoPorTema: admite cualquier cantidad de temas y entradas inválidas', () => {
  const nueve = Array.from({ length: 9 }, (_, i) => ({ id: 't' + i, nombre: 'Tema ' + i, etiqueta: 'T' + i }));
  const r = L.conteoPorTema(nueve, [charla('c1', { tema: 't8' })]);
  assert.equal(r.length, 9);
  assert.equal(r[8].cantidad, 1);
  assert.deepEqual(L.conteoPorTema(null, []), []);
  assert.deepEqual(L.conteoPorTema([null, { id: 'a', nombre: '[Tema]', etiqueta: 'A' }, { id: 'b', nombre: 'B', etiqueta: 'B' }], null).map((t) => t.id), ['b']);
});

test('textoCantidad: singular y plural', () => {
  assert.equal(L.textoCantidad(35), '35 charlas');
  assert.equal(L.textoCantidad(1), '1 charla');
  assert.equal(L.textoCantidad(0), '0 charlas');
});

test('totalVideos: cuenta las partes de todas las charlas', () => {
  assert.equal(L.totalVideos([charla('c1'), charla('c2', { partes: [{}, {}, {}] })]), 4);
  assert.equal(L.totalVideos([]), 0);
  assert.equal(L.totalVideos(null), 0);
});

// ---- 2.7 redes ----

test('redesVisibles: estado inicial muestra las redes con enlace y oculta el placeholder', () => {
  const redes = [
    { nombre: 'YouTube', url: 'https://www.youtube.com/@canal' },
    { nombre: 'Canal de WhatsApp', url: 'https://whatsapp.com/channel/abc' },
    { nombre: 'Instagram', url: '[enlace de Instagram]' }
  ];
  assert.deepEqual(L.redesVisibles(redes), [
    { nombre: 'YouTube', url: 'https://www.youtube.com/@canal' },
    { nombre: 'Canal de WhatsApp', url: 'https://whatsapp.com/channel/abc' }
  ]);
  redes[2].url = 'https://www.instagram.com/ateneo';
  assert.deepEqual(L.redesVisibles(redes).map((r) => r.nombre), ['YouTube', 'Canal de WhatsApp', 'Instagram']);
});

test('redesVisibles: descarta url nula, enlaces inseguros, redes sin nombre y listas inválidas', () => {
  assert.deepEqual(L.redesVisibles([
    { nombre: 'TikTok', url: null },
    { nombre: 'Mala', url: 'javascript:alert(1)' },
    { nombre: '[red]', url: 'https://x.com/a' },
    null,
    { nombre: 'X', url: 'https://x.com/a' }
  ]), [{ nombre: 'X', url: 'https://x.com/a' }]);
  assert.deepEqual(L.redesVisibles([]), []);
  assert.deepEqual(L.redesVisibles(undefined), []);
});

// ---- 2.8 próxima charla ----

function proxima(extra) {
  return Object.assign({
    titulo: 'Energía solar', disertante: 'Dra. Ana Pérez', descripcion: 'Paneles solares.', fecha: '13/11/2026', hora: '18:00',
    lugar: 'Salón de Actos', modalidad: 'Presencial y por Zoom', zoom_url: null, calendar_url: null, correo_inscripcion: 'contacto@ejemplo.org'
  }, extra);
}

test('proximaAnunciada: hace falta título y fecha válidos', () => {
  assert.equal(L.proximaAnunciada(proxima()), true);
  assert.equal(L.proximaAnunciada(proxima({ titulo: '[Título de la charla]' })), false);
  assert.equal(L.proximaAnunciada(proxima({ fecha: '[fecha]' })), false);
  assert.equal(L.proximaAnunciada(proxima({ fecha: '31/02/2026' })), false);
  assert.equal(L.proximaAnunciada(proxima({ disertante: '[Disertante]', descripcion: '[x]' })), true);
  assert.equal(L.proximaAnunciada(null), false);
});

test('accionesProxima: sin enlaces solo queda la inscripción por correo', () => {
  assert.deepEqual(L.accionesProxima(proxima()), [
    { tipo: 'correo', texto: 'Inscribirme por correo', url: 'mailto:contacto@ejemplo.org' }
  ]);
});

test('accionesProxima: cada enlace opcional agrega su botón, solo o junto al otro', () => {
  const cal = 'https://calendar.google.com/x';
  const zoom = 'https://zoom.us/j/1';
  assert.deepEqual(L.accionesProxima(proxima({ calendar_url: cal })).map((a) => a.tipo), ['correo', 'calendar']);
  assert.deepEqual(L.accionesProxima(proxima({ zoom_url: zoom })).map((a) => a.tipo), ['correo', 'zoom']);
  const ambos = L.accionesProxima(proxima({ calendar_url: cal, zoom_url: zoom }));
  assert.deepEqual(ambos.map((a) => [a.tipo, a.texto, a.url]), [
    ['correo', 'Inscribirme por correo', 'mailto:contacto@ejemplo.org'],
    ['calendar', 'Agendar en mi calendario', cal],
    ['zoom', 'Entrar por Zoom', zoom]
  ]);
});

test('accionesProxima: enlaces inválidos o correo sin completar no generan botón', () => {
  assert.deepEqual(L.accionesProxima(proxima({ zoom_url: 'javascript:alert(1)', calendar_url: '[enlace]' })).map((a) => a.tipo), ['correo']);
  assert.deepEqual(L.accionesProxima(proxima({ correo_inscripcion: '[correo]' })), []);
  assert.deepEqual(L.accionesProxima(proxima({ correo_inscripcion: 'no es un correo' })), []);
  assert.deepEqual(L.accionesProxima(null), []);
});

test('fechaLarga: escribe el día de la semana y el mes', () => {
  assert.equal(L.fechaLarga('13/11/2026'), 'viernes 13 de noviembre');
  assert.equal(L.fechaLarga('01/03/2027'), 'lunes 1 de marzo');
  assert.equal(L.fechaLarga('29/02/2028'), 'martes 29 de febrero');
});

test('fechaLarga: fechas inválidas o placeholders devuelven null', () => {
  assert.equal(L.fechaLarga('31/02/2026'), null);
  assert.equal(L.fechaLarga('[fecha]'), null);
  assert.equal(L.fechaLarga('14-11-2026'), null);
  assert.equal(L.fechaLarga(null), null);
});

test('horaCorta: «18:00» se lee «18 hs» y con minutos los conserva', () => {
  assert.equal(L.horaCorta('18:00'), '18 hs');
  assert.equal(L.horaCorta('09:30'), '9:30 hs');
  assert.equal(L.horaCorta('[hora]'), null);
  assert.equal(L.horaCorta('25:00'), null);
});

// ---- C-03b: duración, partes, gancho y menú ----

test('duracionDeCharla: una sola parte conserva su duración', () => {
  assert.equal(L.duracionDeCharla(charla('c1', { partes: [{ duracion: '31:40' }] })), '31:40');
  assert.equal(L.duracionDeCharla(charla('c2', { partes: [{ duracion: '1:10:57' }] })), '1:10:57');
  assert.equal(L.duracionDeCharla(charla('c3', { partes: [{ duracion: '9:05' }] })), '9:05');
});

test('duracionDeCharla: suma las partes y pasa a horas cuando corresponde', () => {
  assert.equal(L.duracionDeCharla(charla('c1', { partes: [{ duracion: '1:54:45' }, { duracion: '32:46' }] })), '2:27:31');
  assert.equal(L.duracionDeCharla(charla('c2', { partes: [{ duracion: '40:30' }, { duracion: '19:30' }, { duracion: '0:05' }] })), '1:00:05');
  assert.equal(L.duracionDeCharla(charla('c3', { partes: [{ duracion: '10:00' }, { duracion: '5:09' }] })), '15:09');
});

test('duracionDeCharla: una duración inválida o sin partes devuelve null', () => {
  assert.equal(L.duracionDeCharla(charla('c1', { partes: [{ duracion: '10:00' }, { duracion: '1h10' }] })), null);
  assert.equal(L.duracionDeCharla(charla('c2', { partes: [{ duracion: '10:75' }] })), null);
  assert.equal(L.duracionDeCharla(charla('c3', { partes: [] })), null);
  assert.equal(L.duracionDeCharla(charla('c4', { partes: [{}] })), null);
  assert.equal(L.duracionDeCharla(null), null);
});

test('duracionDeCharla: lee las duraciones igual que el validador', () => {
  const { duracionASegundos } = require('../scripts/lib/normalizar.js');
  for (const d of ['0:05', '9:05', '45:10', '59:59', '1:00:00', '1:10:57', '12:00:00', '1h10', '10:75', '1:75:00', '', 'abc', '5']) {
    const esperado = duracionASegundos(d) === null ? null : d;
    const obtenido = L.duracionDeCharla({ partes: [{ duracion: d }] });
    assert.equal(obtenido === null, esperado === null, 'difieren en ' + JSON.stringify(d));
  }
});

test('textoPartes: solo cuando la charla tiene más de una parte', () => {
  assert.equal(L.textoPartes(charla('c1', { partes: [{}, {}] })), '2 partes');
  assert.equal(L.textoPartes(charla('c2', { partes: [{}, {}, {}] })), '3 partes');
  assert.equal(L.textoPartes(charla('c3')), null);
  assert.equal(L.textoPartes(charla('c4', { partes: [] })), null);
  assert.equal(L.textoPartes(null), null);
});

test('conteoPorTema: devuelve el gancho solo si tiene texto real', () => {
  const temas = [
    { id: 'a', nombre: 'A', etiqueta: 'A', gancho: '¿De dónde sale el litio?' },
    { id: 'b', nombre: 'B', etiqueta: 'B', gancho: null },
    { id: 'c', nombre: 'C', etiqueta: 'C' },
    { id: 'd', nombre: 'D', etiqueta: 'D', gancho: '[gancho]' },
    { id: 'e', nombre: 'E', etiqueta: 'E', gancho: '   ' }
  ];
  assert.deepEqual(L.conteoPorTema(temas, []).map((t) => t.gancho), ['¿De dónde sale el litio?', null, null, null, null]);
});

test('itemsDeMenu: cuatro ítems en orden y solo el de la página abierta marcado', () => {
  const inicio = L.itemsDeMenu('inicio');
  assert.deepEqual(inicio.map((i) => i.texto), ['Inicio', 'Videoteca', 'Quiénes somos', 'Contacto']);
  assert.deepEqual(inicio.map((i) => i.url), ['index.html', 'videoteca.html', 'quienes-somos.html', '#contacto']);
  assert.deepEqual(inicio.map((i) => i.actual), [true, false, false, false]);
  assert.deepEqual(L.itemsDeMenu('videoteca').map((i) => i.actual), [false, true, false, false]);
  assert.deepEqual(L.itemsDeMenu('quienes-somos').map((i) => i.actual), [false, false, true, false]);
});

test('itemsDeMenu: una página desconocida no marca ninguno y Contacto nunca es la página actual', () => {
  assert.deepEqual(L.itemsDeMenu('otra').map((i) => i.actual), [false, false, false, false]);
  assert.deepEqual(L.itemsDeMenu(undefined).map((i) => i.actual), [false, false, false, false]);
  assert.deepEqual(L.itemsDeMenu('contacto').map((i) => i.actual), [false, false, false, false]);
});

// ---- C-03c: aviso por WhatsApp ----

test('enlaceAvisoWhatsApp: encuentra el canal de WhatsApp por el dominio, no por el nombre', () => {
  const canal = 'https://whatsapp.com/channel/0029VbDjwCbI7BeKsvprkr3t';
  assert.equal(L.enlaceAvisoWhatsApp([{ nombre: 'YouTube', url: 'https://www.youtube.com/@canal' }, { nombre: 'Canal de WhatsApp', url: canal }]), canal);
  assert.equal(L.enlaceAvisoWhatsApp([{ nombre: 'Avisos', url: canal }]), canal);
  assert.equal(L.enlaceAvisoWhatsApp([{ nombre: 'WA', url: 'https://www.whatsapp.com/channel/abc' }]), 'https://www.whatsapp.com/channel/abc');
  assert.equal(L.enlaceAvisoWhatsApp([{ nombre: 'WA', url: 'https://wa.me/5492610000000' }]), 'https://wa.me/5492610000000');
});

test('enlaceAvisoWhatsApp: sin un enlace real a WhatsApp devuelve null', () => {
  assert.equal(L.enlaceAvisoWhatsApp([{ nombre: 'Canal de WhatsApp', url: '[enlace]' }]), null);
  assert.equal(L.enlaceAvisoWhatsApp([{ nombre: 'Canal de WhatsApp', url: null }]), null);
  assert.equal(L.enlaceAvisoWhatsApp([{ nombre: 'WhatsApp', url: 'https://www.youtube.com/@canal' }]), null);
  assert.equal(L.enlaceAvisoWhatsApp([{ nombre: 'Falso', url: 'https://whatsapp.com.ejemplo.org/x' }]), null);
  assert.equal(L.enlaceAvisoWhatsApp([{ nombre: 'Malo', url: 'javascript:alert(1)//whatsapp.com' }]), null);
  assert.equal(L.enlaceAvisoWhatsApp([]), null);
  assert.equal(L.enlaceAvisoWhatsApp(undefined), null);
});

// ---- 2.9 integración con los datos reales ----

test('portada con los datos reales: nada de lo que se muestra tiene corchetes', () => {
  const raiz = path.join(__dirname, '..', 'data');
  const cargar = (archivo, variable) => JSON.parse(JSON.stringify(cargarArchivoDeDatos(path.join(raiz, archivo), variable)));
  const temas = cargar('temas.js', 'AAC_TEMAS');
  const nuevas = cargar('charlas-nuevas.js', 'AAC_CHARLAS_NUEVAS');
  const lista = aplicarCorrecciones(cargar('charlas.js', 'AAC_CHARLAS'), cargar('correcciones.js', 'AAC_CORRECCIONES'), nuevas);
  const sitio = cargar('sitio.js', 'AAC_SITIO');
  const prox = cargar('proxima-charla.js', 'AAC_PROXIMA_CHARLA');

  const ultimas = L.ultimasCharlas(lista, 3, nuevas.map((c) => c.id));
  const vistas = L.masVistas(lista, 3);
  assert.equal(ultimas.length, 3);
  assert.equal(vistas.length, 3);
  assert.equal(new Set(vistas.map((c) => c.id)).size, 3);

  const textos = [];
  for (const c of ultimas.concat(vistas)) {
    const titulo = L.tituloVisible(c);
    assert.ok(titulo, 'la charla ' + c.id + ' no tiene título visible');
    textos.push(titulo, L.disertanteVisible(c), L.formatoVistas(L.vistasDeCharla(c)), L.miniatura(c.partes[0].url), L.textoPartes(c));
    assert.match(L.duracionDeCharla(c), /^(\d+:)?\d{1,2}:\d{2}$/, 'duración de ' + c.id);
  }
  const conteo = L.conteoPorTema(temas, lista);
  assert.equal(conteo.length, temas.length);
  assert.equal(conteo.reduce((a, t) => a + t.cantidad, 0), lista.length);
  for (const t of conteo) textos.push(t.nombre, t.etiqueta, t.gancho, L.textoCantidad(t.cantidad));
  for (const i of L.itemsDeMenu('inicio')) textos.push(i.texto);
  for (const r of L.redesVisibles(sitio.redes)) textos.push(r.nombre, r.url);
  assert.equal(L.enlaceAvisoWhatsApp(sitio.redes), 'https://whatsapp.com/channel/0029VbDjwCbI7BeKsvprkr3t');
  for (const a of L.accionesProxima(prox)) textos.push(a.texto, a.url);
  for (const campo of ['titulo', 'disertante', 'descripcion', 'lugar', 'modalidad']) textos.push(L.textoVisible(prox[campo]));
  textos.push(L.fechaLarga(prox.fecha), L.horaCorta(prox.hora), L.textoVisible(sitio.conferencias));

  for (const t of textos) {
    if (t !== null) assert.doesNotMatch(String(t), /[\[\]]/, 'texto con corchetes: ' + t);
  }
  assert.equal(L.totalVideos(lista), lista.reduce((a, c) => a + c.partes.length, 0));
});
