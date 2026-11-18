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
    direccion: 'Rodríguez 273, Ciudad de Mendoza',
    mapa_url: 'https://www.google.com/maps/search/?api=1&query=Rodr%C3%ADguez+273',
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

// ---- dirección y mapa (C-03b) ----

test('validar: mapa_url en null es válido y no deja avisos', () => {
  const d = datosValidos();
  d.sitio.mapa_url = null;
  const r = validar(d, { ...OPC, estricto: true });
  assert.deepEqual(r.errores, []);
  assert.deepEqual(r.avisos, []);
});

test('validar: mapa_url sin https o que no es texto es un error', () => {
  for (const malo of ['maps.google.com/x', 'http://maps.google.com/x', 7, '', '[mapa]']) {
    const d = datosValidos();
    d.sitio.mapa_url = malo;
    assert.deepEqual(delSitio(validar(d, OPC)).map((x) => x.campo), ['mapa_url'], JSON.stringify(malo));
  }
});

test('validar: direccion vacía o faltante, y mapa_url faltante', () => {
  const d = datosValidos();
  d.sitio.direccion = '  ';
  assert.deepEqual(delSitio(validar(d, OPC)).map((x) => x.campo), ['direccion']);
  const d2 = datosValidos();
  delete d2.sitio.direccion;
  delete d2.sitio.mapa_url;
  assert.deepEqual(delSitio(validar(d2, OPC)).map((x) => x.campo).sort(), ['direccion', 'mapa_url']);
});

// ---- gancho de tema (C-03b) ----

test('validar: gancho ausente, null o con texto es válido y no deja avisos en modo estricto', () => {
  for (const gancho of [undefined, null, '¿De dónde sale el litio?']) {
    const d = datosValidos();
    if (gancho !== undefined) d.temas[0].gancho = gancho;
    const r = validar(d, { ...OPC, estricto: true });
    assert.deepEqual(r.errores, [], JSON.stringify(gancho));
    assert.deepEqual(r.avisos, []);
  }
});

test('validar: gancho vacío o que no es texto es un error en ese tema', () => {
  for (const malo of ['', '   ', 5, [], true]) {
    const d = datosValidos();
    d.temas[0].gancho = malo;
    const e = validar(d, OPC).errores;
    assert.equal(e.length, 1, JSON.stringify(malo));
    assert.equal(e[0].archivo, 'data/temas.js');
    assert.equal(e[0].charla, 'geologia');
    assert.equal(e[0].campo, 'gancho');
  }
});

// ---- C-02b: inscripción, Mesa Organizadora, Declaración en PDF y foto principal ----

const mesa = (extra) => ({
  mostrar: false,
  nombre: 'Mesa Organizadora',
  integrantes: [{ nombre: 'Adolfo', apellido: 'Anunziata' }, { nombre: 'Luis', apellido: 'Blanco' }],
  ...extra
});

test('validar: campos nuevos del sitio válidos', () => {
  const d = datosValidos();
  Object.assign(d.sitio, {
    formulario_inscripcion: 'https://docs.google.com/forms/d/e/abc/viewform',
    mesa_organizadora: mesa(),
    declaracion_pdf: null,
    foto_principal: { archivo: 'img/salon.jpg', alt: 'Grupo en el Salón de Actos' }
  });
  assert.deepEqual(delSitio(validar(d, OPC)), []);
});

test('validar: los campos nuevos del sitio son opcionales', () => {
  assert.deepEqual(delSitio(validar(datosValidos(), OPC)), []);
});

test('validar: formulario de inscripción sin https es error y el placeholder es aviso', () => {
  const d = datosValidos();
  d.sitio.formulario_inscripcion = 'http://forms.gle/x';
  assert.equal(delSitio(validar(d, OPC))[0].campo, 'formulario_inscripcion');
  d.sitio.formulario_inscripcion = '[enlace del formulario]';
  const r = validar(d, OPC);
  assert.deepEqual(delSitio(r), []);
  assert.ok(r.avisos.some((a) => a.campo === 'formulario_inscripcion'));
});

test('validar: Mesa Organizadora con campos de contacto, sin apellido o con mostrar mal escrito', () => {
  const d = datosValidos();
  d.sitio.mesa_organizadora = mesa({ mostrar: 'no', integrantes: [{ nombre: 'Ana', apellido: 'Paz', correo: 'a@b.com' }, { nombre: 'Juan' }] });
  const campos = delSitio(validar(d, OPC)).map((e) => e.campo).sort();
  assert.deepEqual(campos, ['apellido', 'correo', 'mostrar']);
});

test('validar: Mesa Organizadora sin nombre del órgano o con integrantes que no son lista', () => {
  const d = datosValidos();
  d.sitio.mesa_organizadora = { mostrar: true, nombre: '', integrantes: 'Ana Paz', cargo: 'x' };
  const campos = delSitio(validar(d, OPC)).map((e) => e.campo).sort();
  assert.deepEqual(campos, ['cargo', 'integrantes', 'nombre']);
});

test('validar: declaracion_pdf y foto_principal mal escritos', () => {
  const d = datosValidos();
  d.sitio.declaracion_pdf = 42;
  d.sitio.foto_principal = { archivo: 'img/x.jpg' };
  const campos = delSitio(validar(d, OPC)).map((e) => e.campo).sort();
  assert.deepEqual(campos, ['alt', 'declaracion_pdf']);
});

// ---- Zoom del semestre y lugar opcional (Ateneo, 17/11/2026) ----

test('validar: zoom_url_semestre https o null es válido; sin https es error', () => {
  const d = datosValidos();
  d.sitio.zoom_url_semestre = 'https://utn.zoom.us/j/88394809866?pwd=abc';
  assert.deepEqual(delSitio(validar(d, OPC)), []);
  d.sitio.zoom_url_semestre = null;
  assert.deepEqual(delSitio(validar(d, OPC)), []);
  d.sitio.zoom_url_semestre = 'utn.zoom.us/j/1';
  assert.equal(delSitio(validar(d, OPC))[0].campo, 'zoom_url_semestre');
});

test('validar: lugar de la próxima charla en null (charla por Zoom) es válido y no es pendiente', () => {
  const d = datosValidos();
  d.proxima.lugar = null;
  const r = validar(d, { ...OPC, estricto: true });
  assert.deepEqual(r.errores, []);
  assert.equal(r.fallo, false);
  d.proxima.lugar = 42;
  assert.equal(deProxima(validar(d, OPC))[0].campo, 'lugar');
});

test('validar: entrevistas de radio válidas, vacías o mal escritas', () => {
  const d = datosValidos();
  d.sitio.entrevistas_radio = [];
  assert.deepEqual(delSitio(validar(d, OPC)), []);
  d.sitio.entrevistas_radio = [{ titulo: 'Entrevista en Radio Nacional', url: 'https://ejemplo.org/audio', fecha: '10/11/2026' }];
  assert.deepEqual(delSitio(validar(d, OPC)), []);
  d.sitio.entrevistas_radio = [{ titulo: '', url: 'http://x', fecha: '31/02/2026', otro: 1 }];
  const campos = delSitio(validar(d, OPC)).map((e) => e.campo).sort();
  assert.deepEqual(campos, ['fecha', 'otro', 'titulo', 'url']);
});

test('validar: video_presentacion null o un video de YouTube; otra cosa es error', () => {
  const d = datosValidos();
  d.sitio.video_presentacion = null;
  assert.deepEqual(delSitio(validar(d, OPC)), []);
  d.sitio.video_presentacion = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  assert.deepEqual(delSitio(validar(d, OPC)), []);
  for (const malo of ['https://vimeo.com/1', 'video', 3]) {
    d.sitio.video_presentacion = malo;
    assert.equal(delSitio(validar(d, OPC))[0].campo, 'video_presentacion', JSON.stringify(malo));
  }
});
