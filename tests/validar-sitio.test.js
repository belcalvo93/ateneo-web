'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { validar } = require('../scripts/lib/validar.js');

const OPC = { anioActual: 2026 };
const YT = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const ARCHIVO_SITIO = 'data/sitio.js';
const ARCHIVO_PROXIMA = 'data/proxima-charla.js';

function sitioValido() {
  return {
    correo: 'contacto@ejemplo.org',
    canal_youtube: 'https://www.youtube.com/@canal',
    conferencias: '+100',
    redes: [
      { nombre: 'YouTube', url: 'https://www.youtube.com/@canal' },
      { nombre: 'WhatsApp', url: 'https://whatsapp.com/channel/abc' }
    ],
    fotos: []
  };
}

function datosValidos() {
  return {
    temas: [{ id: 'geologia', nombre: 'Geología', etiqueta: 'Geología', playlist_url: null }],
    charlas: [{
      id: 'c001', titulo: 'Litio', disertante: 'Dra Ana Luna', tema: 'geologia', anio: 2024,
      partes: [{ duracion: '1:10:57', url: YT, vistas: 5, titulo_original: 'Litio - Dra Ana Luna' }],
      revisar: []
    }],
    proxima: {
      titulo: 'Energía solar', disertante: 'Dra Ana Luna', descripcion: 'Paneles solares.', fecha: '14/11/2026', hora: '18:00',
      lugar: 'Salón de Actos', modalidad: 'Presencial y por Zoom', zoom_url: null, calendar_url: null, correo_inscripcion: 'a@b.com'
    },
    sitio: sitioValido()
  };
}

const delSitio = (r) => r.errores.filter((e) => e.archivo === ARCHIVO_SITIO);
const deProxima = (r) => r.errores.filter((e) => e.archivo === ARCHIVO_PROXIMA);

// ---- calendar_url ----

test('validar: calendar_url y zoom_url en null son válidos y no dejan avisos, ni en modo estricto', () => {
  const r = validar(datosValidos(), { ...OPC, estricto: true });
  assert.deepEqual(r.errores, []);
  assert.deepEqual(r.avisos, []);
  assert.equal(r.fallo, false);
});

test('validar: calendar_url acepta un enlace https, solo o junto con zoom_url', () => {
  const d = datosValidos();
  d.proxima.calendar_url = 'https://calendar.google.com/calendar/event?eid=abc';
  assert.deepEqual(validar(d, OPC).errores, []);
  d.proxima.zoom_url = 'https://zoom.us/j/123';
  assert.deepEqual(validar(d, OPC).errores, []);
});

test('validar: calendar_url sin https o que no es texto es un error en ese campo', () => {
  for (const malo of ['calendar.google.com/x', 'http://calendar.google.com/x', 123, '', '[enlace]']) {
    const d = datosValidos();
    d.proxima.calendar_url = malo;
    const e = deProxima(validar(d, OPC));
    assert.equal(e.length, 1, JSON.stringify(malo));
    assert.equal(e[0].campo, 'calendar_url');
  }
});

test('validar: zoom_url exige https igual que calendar_url', () => {
  for (const malo of ['zoom.us/j/123', 'http://zoom.us/j/123', 123, '', '[enlace]']) {
    const d = datosValidos();
    d.proxima.zoom_url = malo;
    const e = deProxima(validar(d, OPC));
    assert.equal(e.length, 1, JSON.stringify(malo));
    assert.equal(e[0].campo, 'zoom_url');
  }
  const ok = datosValidos();
  ok.proxima.zoom_url = 'https://us02web.zoom.us/j/123?pwd=abc';
  assert.deepEqual(validar(ok, OPC).errores, []);
});

test('validar: falta calendar_url en la próxima charla', () => {
  const d = datosValidos();
  delete d.proxima.calendar_url;
  const e = deProxima(validar(d, OPC));
  assert.deepEqual(e.map((x) => x.campo), ['calendar_url']);
});

// ---- configuración del sitio ----

test('validar: sin sitio (no se pasó) no se valida la configuración', () => {
  const d = datosValidos();
  delete d.sitio;
  assert.deepEqual(validar(d, OPC).errores, []);
});

test('validar: la configuración tiene que ser un objeto', () => {
  const d = datosValidos();
  d.sitio = [];
  const e = delSitio(validar(d, OPC));
  assert.equal(e.length, 1);
  assert.equal(e[0].campo, 'AAC_SITIO');
});

test('validar: campo faltante y campo desconocido en la configuración', () => {
  const d = datosValidos();
  delete d.sitio.conferencias;
  d.sitio.redez = [];
  const e = delSitio(validar(d, OPC));
  assert.deepEqual(e.map((x) => x.campo).sort(), ['conferencias', 'redez']);
  assert.match(e.find((x) => x.campo === 'redez').mensaje, /desconocido/);
});

test('validar: correo, canal_youtube y conferencias mal escritos', () => {
  const d = datosValidos();
  d.sitio.correo = 'contacto.ejemplo.org';
  d.sitio.canal_youtube = 'youtube.com/@canal';
  d.sitio.conferencias = '  ';
  assert.deepEqual(delSitio(validar(d, OPC)).map((x) => x.campo).sort(), ['canal_youtube', 'conferencias', 'correo']);
  const ok = datosValidos();
  ok.sitio.correo = 'otro.nombre@dominio.com.ar';
  assert.deepEqual(delSitio(validar(ok, OPC)), []);
});

test('validar: redes tiene que ser una lista de { nombre, url }', () => {
  const d = datosValidos();
  d.sitio.redes = 'YouTube';
  assert.deepEqual(delSitio(validar(d, OPC)).map((x) => x.campo), ['redes']);

  const d2 = datosValidos();
  d2.sitio.redes = [{ nombre: '', url: 'https://x.com/a' }, { nombre: 'Instagram', url: 'instagram.com/ateneo' }, { nombre: 'X', url: 'https://x.com/a', color: 'rojo' }];
  const e = delSitio(validar(d2, OPC));
  assert.deepEqual(e.map((x) => x.campo).sort(), ['color', 'nombre', 'url']);
  assert.match(e.find((x) => x.campo === 'url').mensaje, /Instagram/);
});

test('validar: una red sin url es un error distinto de una red con url en null', () => {
  const d = datosValidos();
  d.sitio.redes = [{ nombre: 'Instagram' }];
  assert.deepEqual(delSitio(validar(d, OPC)).map((x) => x.campo), ['url']);
});

test('validar: red con url en null o con placeholder es un aviso con el nombre de la red', () => {
  const d = datosValidos();
  d.sitio.redes.push({ nombre: 'Instagram', url: '[enlace de Instagram]' }, { nombre: 'TikTok', url: null });
  const r = validar(d, OPC);
  assert.deepEqual(r.errores, []);
  const avisos = r.avisos.filter((a) => a.tipo === 'red-pendiente');
  assert.equal(avisos.length, 2);
  assert.ok(avisos.every((a) => a.archivo === ARCHIVO_SITIO));
  assert.match(avisos[0].mensaje, /Instagram/);
  assert.match(avisos[1].mensaje, /TikTok/);
  assert.equal(r.resumen.redesPendientes, 2);
  assert.equal(r.fallo, false);
});

test('validar: una red pendiente no hace fallar el modo estricto, pero un placeholder de charla sí', () => {
  const d = datosValidos();
  d.sitio.redes.push({ nombre: 'Instagram', url: '[enlace de Instagram]' });
  assert.equal(validar(d, { ...OPC, estricto: true }).fallo, false);
  d.charlas[0].disertante = '[Disertante]';
  assert.equal(validar(d, { ...OPC, estricto: true }).fallo, true);
});

test('validar: fotos tiene que ser una lista de { archivo, alt } con los dos textos', () => {
  const d = datosValidos();
  d.sitio.fotos = [{ archivo: 'img/a.jpg', alt: 'Charla en el Salón de Actos' }];
  assert.deepEqual(delSitio(validar(d, OPC)), []);

  d.sitio.fotos = [{ archivo: 'img/a.jpg', alt: '' }, { archivo: '', alt: 'Foto' }, { archivo: 'img/c.jpg', alt: 'Foto', pie: 'x' }];
  const e = delSitio(validar(d, OPC));
  assert.deepEqual(e.map((x) => x.campo).sort(), ['alt', 'archivo', 'pie']);

  d.sitio.fotos = {};
  assert.deepEqual(delSitio(validar(d, OPC)).map((x) => x.campo), ['fotos']);
});
