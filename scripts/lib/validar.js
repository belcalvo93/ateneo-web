'use strict';

const { duracionASegundos } = require('./normalizar.js');
const { aplicarCorrecciones } = require('../../js/aplicar-correcciones.js');

const ARCHIVO_TEMAS = 'data/temas.js';
const ARCHIVO_CHARLAS = 'data/charlas.js';
const ARCHIVO_PROXIMA = 'data/proxima-charla.js';
const ARCHIVO_NUEVAS = 'data/charlas-nuevas.js';
const ARCHIVO_CORRECCIONES = 'data/correcciones.js';
const ARCHIVO_SITIO = 'data/sitio.js';

const CAMPOS_TEMA = ['id', 'nombre', 'etiqueta', 'playlist_url'];
const CAMPOS_CHARLA = ['id', 'titulo', 'disertante', 'tema', 'anio', 'partes', 'revisar', 'destacada'];
const CAMPOS_CORRECCION = ['titulo', 'disertante', 'tema', 'anio', 'destacada', 'confirmados', 'partes'];
const MARCAS_REVISAR = ['titulo', 'disertante', 'vistas', 'partes'];
const CAMPOS_PARTE = ['duracion', 'url', 'vistas', 'titulo_original'];
const CAMPOS_PROXIMA = ['titulo', 'disertante', 'descripcion', 'fecha', 'hora', 'lugar', 'modalidad', 'zoom_url', 'calendar_url', 'correo_inscripcion'];
// Enlaces opcionales de la próxima charla: null es un estado válido y permanente, no un pendiente.
const ENLACES_PROXIMA = ['zoom_url', 'calendar_url'];
const CAMPOS_SITIO = ['correo', 'canal_youtube', 'conferencias', 'redes', 'fotos'];
const CAMPOS_RED = ['nombre', 'url'];
const CAMPOS_FOTO = ['archivo', 'alt'];

const RE_ID_TEMA = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RE_PLACEHOLDER = /^\s*\[.*\]\s*$/;
const RE_YOUTUBE = /^https:\/\/(?:www\.)?(?:youtube\.com\/watch\?(?:[^#]*&)?v=[\w-]{11}(?:[&#].*)?|youtu\.be\/[\w-]{11}(?:[?#].*)?)$/;
const RE_FECHA = /^(\d{2})\/(\d{2})\/(\d{4})$/;
const RE_HORA = /^([01]\d|2[0-3]):([0-5]\d)$/;
const RE_HTTPS = /^https:\/\/\S+$/;
const RE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esObjeto = (x) => typeof x === 'object' && x !== null && !Array.isArray(x);
const esTextoNoVacio = (x) => typeof x === 'string' && x.trim() !== '';
const esPlaceholder = (x) => typeof x === 'string' && RE_PLACEHOLDER.test(x);

function fechaValida(texto) {
  const m = RE_FECHA.exec(texto);
  if (!m) return false;
  const [d, mes, a] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const f = new Date(Date.UTC(a, mes - 1, d));
  return f.getUTCFullYear() === a && f.getUTCMonth() === mes - 1 && f.getUTCDate() === d;
}

// validar({ temas, charlas, proxima, sitio }, { estricto, anioActual }) -> { errores, avisos, resumen, fallo }
// `sitio` es opcional: si no se pasa, la configuración del sitio no se valida.
// Cada error/aviso: { archivo, charla, parte, campo, mensaje } (+ tipo en los avisos).
function validar(datos, opciones) {
  const opt = opciones || {};
  const anioActual = opt.anioActual || new Date().getFullYear();
  const errores = [];
  const avisos = [];

  const error = (archivo, charla, parte, campo, mensaje) => errores.push({ archivo, charla, parte, campo, mensaje });
  const aviso = (tipo, archivo, charla, parte, campo, mensaje) => avisos.push({ tipo, archivo, charla, parte, campo, mensaje });

  // ---- temas ----
  const idsTema = new Set();
  const temas = Array.isArray(datos.temas) ? datos.temas : null;
  if (!temas) error(ARCHIVO_TEMAS, null, null, 'AAC_TEMAS', 'tiene que ser una lista de temas');
  (temas || []).forEach((t, i) => {
    const ref = esObjeto(t) && typeof t.id === 'string' ? t.id : '#' + (i + 1);
    if (!esObjeto(t)) return error(ARCHIVO_TEMAS, ref, null, 'tema', 'cada tema tiene que ser un objeto');
    for (const k of Object.keys(t)) {
      if (!CAMPOS_TEMA.includes(k)) error(ARCHIVO_TEMAS, ref, null, k, 'campo desconocido');
    }
    if (typeof t.id !== 'string' || !RE_ID_TEMA.test(t.id)) {
      error(ARCHIVO_TEMAS, ref, null, 'id', 'el id tiene que ser texto en minúsculas y guiones (por ejemplo "agua-ambiente")');
    } else if (idsTema.has(t.id)) {
      error(ARCHIVO_TEMAS, ref, null, 'id', 'id de tema repetido: ' + t.id);
    } else {
      idsTema.add(t.id);
    }
    if (!esTextoNoVacio(t.nombre)) error(ARCHIVO_TEMAS, ref, null, 'nombre', 'falta el nombre del tema');
    if (!esTextoNoVacio(t.etiqueta)) error(ARCHIVO_TEMAS, ref, null, 'etiqueta', 'falta la etiqueta (texto corto) del tema');
    if (t.playlist_url !== null && typeof t.playlist_url !== 'string') {
      error(ARCHIVO_TEMAS, ref, null, 'playlist_url', 'tiene que ser un enlace entre comillas o null');
    }
  });

  // ---- charlas (esquema): el generado, las nuevas y las correcciones se validan por separado ----
  const generadas = Array.isArray(datos.charlas) ? datos.charlas : null;
  if (!generadas) error(ARCHIVO_CHARLAS, null, null, 'AAC_CHARLAS', 'tiene que ser una lista de charlas');
  const hayNuevas = datos.nuevas !== undefined;
  const nuevas = Array.isArray(datos.nuevas) ? datos.nuevas : [];
  if (hayNuevas && !Array.isArray(datos.nuevas)) error(ARCHIVO_NUEVAS, null, null, 'AAC_CHARLAS_NUEVAS', 'tiene que ser una lista de charlas (puede estar vacía: [])');
  const idsCharla = new Set();
  const partesPorCharla = new Map(); // para validar los números de parte de las correcciones

  const validarLista = (lista, archivo) => {
    lista.forEach((c, i) => {
      const ref = esObjeto(c) && esTextoNoVacio(c.id) ? c.id : '#' + (i + 1);
      const err = (parte, campo, msg) => error(archivo, ref, parte, campo, msg);
      if (!esObjeto(c)) return err(null, 'charla', 'cada charla tiene que ser un objeto');

      for (const k of Object.keys(c)) {
        if (!CAMPOS_CHARLA.includes(k)) err(null, k, 'campo desconocido (¿error de tipeo?)');
      }
      if (!esTextoNoVacio(c.id)) err(null, 'id', 'falta el id');
      else if (idsCharla.has(c.id)) err(null, 'id', 'id de charla repetido: ' + c.id);
      else idsCharla.add(c.id);

      for (const campo of ['titulo', 'disertante']) {
        if (!esTextoNoVacio(c[campo])) err(null, campo, 'falta o no es texto (si no se sabe, dejá un placeholder como [' + (campo === 'titulo' ? 'Título' : 'Disertante') + '])');
      }

      if (typeof c.tema !== 'string') err(null, 'tema', 'falta el tema');
      else if (!idsTema.has(c.tema)) err(null, 'tema', 'el tema "' + c.tema + '" no existe en data/temas.js');

      if (!Number.isInteger(c.anio)) err(null, 'anio', 'tiene que ser un número entero (por ejemplo 2024)');
      else if (c.anio < 2017 || c.anio > anioActual) err(null, 'anio', 'el año ' + c.anio + ' está fuera de 2017–' + anioActual);

      if ('destacada' in c && typeof c.destacada !== 'boolean') err(null, 'destacada', 'tiene que ser true o false (sin comillas)');

      if (!Array.isArray(c.revisar) || c.revisar.some((x) => typeof x !== 'string')) {
        err(null, 'revisar', 'tiene que ser una lista de nombres de campos entre comillas (puede estar vacía)');
      }

      if (!Array.isArray(c.partes) || c.partes.length === 0) {
        err(null, 'partes', 'la charla necesita al menos una parte');
        return;
      }
      if (esTextoNoVacio(c.id)) partesPorCharla.set(c.id, c.partes.length);
      c.partes.forEach((p, j) => {
        const n = j + 1;
        if (!esObjeto(p)) return err(n, 'parte', 'cada parte tiene que ser un objeto');
        for (const k of Object.keys(p)) {
          if (!CAMPOS_PARTE.includes(k)) err(n, k, 'campo desconocido (¿error de tipeo?)');
        }
        if (duracionASegundos(p.duracion) === null) {
          err(n, 'duracion', 'duración inválida (' + JSON.stringify(p.duracion) + '); usá M:SS, MM:SS o H:MM:SS, por ejemplo "45:10" o "1:10:57"');
        }
        if (p.url !== null && (typeof p.url !== 'string' || !RE_YOUTUBE.test(p.url))) {
          err(n, 'url', 'no es un enlace de video de YouTube (https://www.youtube.com/watch?v=… o https://youtu.be/…)');
        }
        if (p.vistas !== null && !(Number.isInteger(p.vistas) && p.vistas >= 0)) {
          err(n, 'vistas', 'tiene que ser un número entero (sin comillas) o null');
        }
        if (!esTextoNoVacio(p.titulo_original)) err(n, 'titulo_original', 'falta el título original');
      });
    });
  };
  validarLista(generadas || [], ARCHIVO_CHARLAS);
  validarLista(nuevas, ARCHIVO_NUEVAS);

  // ---- correcciones ----
  const corr = datos.correcciones;
  const errC = (charla, parte, campo, msg) => error(ARCHIVO_CORRECCIONES, charla, parte, campo, msg);
  if (corr !== undefined && !esObjeto(corr)) {
    errC(null, null, 'AAC_CORRECCIONES', 'tiene que ser un objeto con una entrada por charla (puede estar vacío: {})');
  } else if (esObjeto(corr)) {
    for (const id of Object.keys(corr)) {
      const c = corr[id];
      if (!idsCharla.has(id)) {
        errC(id, null, 'charla', 'la charla ' + id + ' no existe (ni en data/charlas.js ni en data/charlas-nuevas.js)');
        continue;
      }
      if (!esObjeto(c)) {
        errC(id, null, 'charla', 'cada corrección tiene que ser un objeto con los campos a corregir');
        continue;
      }
      for (const k of Object.keys(c)) {
        const e = (msg) => errC(id, null, k, msg);
        if (!CAMPOS_CORRECCION.includes(k)) e('campo desconocido (¿error de tipeo? campos válidos: ' + CAMPOS_CORRECCION.join(', ') + ')');
        else if (k === 'titulo' || k === 'disertante') {
          if (!esTextoNoVacio(c[k])) e('tiene que ser texto entre comillas');
        } else if (k === 'tema') {
          if (typeof c.tema !== 'string') e('tiene que ser el id de un tema entre comillas');
          else if (!idsTema.has(c.tema)) e('el tema "' + c.tema + '" no existe en data/temas.js');
        } else if (k === 'anio') {
          if (!Number.isInteger(c.anio)) e('tiene que ser un número entero (por ejemplo 2024)');
          else if (c.anio < 2017 || c.anio > anioActual) e('el año ' + c.anio + ' está fuera de 2017–' + anioActual);
        } else if (k === 'destacada') {
          if (typeof c.destacada !== 'boolean') e('tiene que ser true o false (sin comillas)');
        } else if (k === 'confirmados') {
          if (!Array.isArray(c.confirmados) || c.confirmados.some((m) => !MARCAS_REVISAR.includes(m))) {
            e('tiene que ser una lista con nombres entre comillas de: ' + MARCAS_REVISAR.join(', '));
          }
        } else if (k === 'partes') {
          if (!esObjeto(c.partes)) {
            e('tiene que ser un objeto { número de parte: { url: … } }');
            continue;
          }
          for (const clave of Object.keys(c.partes)) {
            const n = Number(clave);
            const cantidad = partesPorCharla.get(id) || 0;
            if (!Number.isInteger(n) || n < 1 || n > cantidad) {
              errC(id, Number.isInteger(n) ? n : clave, 'partes', 'la parte ' + clave + ' no existe (la charla tiene ' + cantidad + ')');
              continue;
            }
            const cambio = c.partes[clave];
            if (!esObjeto(cambio)) {
              errC(id, n, 'partes', 'tiene que ser un objeto { url: … }');
              continue;
            }
            for (const campo of Object.keys(cambio)) {
              if (campo !== 'url') errC(id, n, campo, 'campo desconocido (solo se puede corregir url)');
            }
            if (!('url' in cambio)) errC(id, n, 'url', 'falta la url (o null para dejar la parte sin enlace)');
            else if (cambio.url !== null && (typeof cambio.url !== 'string' || !RE_YOUTUBE.test(cambio.url))) {
              errC(id, n, 'url', 'no es un enlace de video de YouTube ni null');
            }
          }
        }
      }
    }
  }

  // ---- vista combinada: pendientes y resumen ----
  const resumen = { charlas: 0, partes: 0, placeholders: 0, charlasConRevisar: 0, entradasRevisar: 0, partesSinUrl: 0, temasVacios: 0, redesPendientes: 0 };
  const usoPorTema = new Map();
  const combinada = aplicarCorrecciones(generadas || [], esObjeto(corr) ? corr : {}, nuevas);
  combinada.forEach((c, i) => {
    resumen.charlas += 1;
    if (!esObjeto(c)) return;
    const ref = esTextoNoVacio(c.id) ? c.id : '#' + (i + 1);
    const archivo = i < (generadas || []).length ? ARCHIVO_CHARLAS : ARCHIVO_NUEVAS;
    for (const campo of ['titulo', 'disertante']) {
      if (esTextoNoVacio(c[campo]) && esPlaceholder(c[campo])) {
        resumen.placeholders += 1;
        aviso('placeholder', archivo, ref, null, campo, 'falta completar ' + campo + ' (' + c[campo].trim() + ')');
      }
    }
    if (typeof c.tema === 'string' && idsTema.has(c.tema)) usoPorTema.set(c.tema, (usoPorTema.get(c.tema) || 0) + 1);
    if (Array.isArray(c.revisar) && c.revisar.every((x) => typeof x === 'string')) {
      if (c.revisar.length > 0) resumen.charlasConRevisar += 1;
      for (const campo of c.revisar) {
        resumen.entradasRevisar += 1;
        aviso('revisar', archivo, ref, null, campo, 'hay que revisar ' + campo);
      }
    }
    if (!Array.isArray(c.partes)) return;
    c.partes.forEach((p, j) => {
      if (!esObjeto(p)) return;
      resumen.partes += 1;
      if (p.url === null) {
        resumen.partesSinUrl += 1;
        aviso('url-nula', archivo, ref, j + 1, 'url', 'todavía no tiene enlace de YouTube');
      }
    });
  });

  for (const t of temas || []) {
    if (esObjeto(t) && idsTema.has(t.id) && !usoPorTema.get(t.id)) {
      resumen.temasVacios += 1;
      aviso('tema-vacio', ARCHIVO_TEMAS, t.id, null, 'tema', 'el tema "' + (t.nombre || t.id) + '" no tiene charlas');
    }
  }

  // ---- próxima charla ----
  const p = datos.proxima;
  const errP = (campo, msg) => error(ARCHIVO_PROXIMA, null, null, campo, msg);
  if (!esObjeto(p)) {
    errP('AAC_PROXIMA_CHARLA', 'tiene que ser un objeto con los datos de la próxima charla');
  } else {
    for (const k of Object.keys(p)) {
      if (!CAMPOS_PROXIMA.includes(k)) errP(k, 'campo desconocido');
    }
    for (const k of CAMPOS_PROXIMA) {
      if (!(k in p)) errP(k, 'falta el campo');
    }
    for (const k of CAMPOS_PROXIMA) {
      if (!(k in p) || ENLACES_PROXIMA.includes(k)) continue;
      if (!esTextoNoVacio(p[k])) errP(k, 'tiene que ser texto entre comillas');
      else if (esPlaceholder(p[k])) {
        resumen.placeholders += 1;
        aviso('placeholder', ARCHIVO_PROXIMA, null, null, k, 'falta completar ' + k + ' (' + p[k].trim() + ')');
      } else if (k === 'fecha' && !fechaValida(p.fecha)) {
        errP('fecha', 'fecha inválida (' + JSON.stringify(p.fecha) + '); usá DD/MM/AAAA, por ejemplo "14/11/2026"');
      } else if (k === 'hora' && !RE_HORA.test(p.hora)) {
        errP('hora', 'hora inválida (' + JSON.stringify(p.hora) + '); usá HH:MM en 24 horas, por ejemplo "18:00"');
      }
    }
    for (const k of ENLACES_PROXIMA) {
      if (k in p && p[k] !== null && !(typeof p[k] === 'string' && RE_HTTPS.test(p[k]))) {
        errP(k, 'tiene que ser un enlace que empiece con https:// o null');
      }
    }
  }

  // ---- configuración del sitio ----
  const s = datos.sitio;
  const errS = (ref, campo, msg) => error(ARCHIVO_SITIO, ref, null, campo, msg);
  if (s !== undefined && !esObjeto(s)) {
    errS(null, 'AAC_SITIO', 'tiene que ser un objeto con la configuración del sitio');
  } else if (esObjeto(s)) {
    for (const k of Object.keys(s)) {
      if (!CAMPOS_SITIO.includes(k)) errS(null, k, 'campo desconocido (¿error de tipeo? campos válidos: ' + CAMPOS_SITIO.join(', ') + ')');
    }
    for (const k of CAMPOS_SITIO) {
      if (!(k in s)) errS(null, k, 'falta el campo');
    }
    if ('correo' in s && !(typeof s.correo === 'string' && RE_CORREO.test(s.correo))) {
      errS(null, 'correo', 'tiene que ser una dirección de correo entre comillas');
    }
    if ('canal_youtube' in s && !(typeof s.canal_youtube === 'string' && RE_HTTPS.test(s.canal_youtube))) {
      errS(null, 'canal_youtube', 'tiene que ser un enlace que empiece con https://');
    }
    if ('conferencias' in s && !esTextoNoVacio(s.conferencias)) {
      errS(null, 'conferencias', 'tiene que ser texto entre comillas (por ejemplo "+100")');
    }
    if ('redes' in s) {
      if (!Array.isArray(s.redes)) errS(null, 'redes', 'tiene que ser una lista de redes (puede estar vacía: [])');
      else s.redes.forEach((r, i) => {
        const ref = esObjeto(r) && esTextoNoVacio(r.nombre) ? r.nombre : 'red #' + (i + 1);
        if (!esObjeto(r)) return errS(ref, 'redes', 'cada red tiene que ser { nombre: "…", url: "…" }');
        for (const k of Object.keys(r)) {
          if (!CAMPOS_RED.includes(k)) errS(ref, k, 'campo desconocido (una red solo tiene nombre y url)');
        }
        if (!esTextoNoVacio(r.nombre)) errS(ref, 'nombre', 'falta el nombre de la red');
        if (!('url' in r)) errS(ref, 'url', 'falta la url de ' + ref + ' (o null si todavía no existe)');
        else if (r.url === null || esPlaceholder(r.url)) {
          resumen.redesPendientes += 1;
          aviso('red-pendiente', ARCHIVO_SITIO, ref, null, 'url', 'la red ' + ref + ' todavía no tiene enlace (no se muestra en la página)');
        } else if (!(typeof r.url === 'string' && RE_HTTPS.test(r.url))) {
          errS(ref, 'url', 'el enlace de ' + ref + ' tiene que empezar con https:// (o ser null)');
        }
      });
    }
    if ('fotos' in s) {
      if (!Array.isArray(s.fotos)) errS(null, 'fotos', 'tiene que ser una lista de fotos (puede estar vacía: [])');
      else s.fotos.forEach((f, i) => {
        const ref = 'foto #' + (i + 1);
        if (!esObjeto(f)) return errS(ref, 'fotos', 'cada foto tiene que ser { archivo: "…", alt: "…" }');
        for (const k of Object.keys(f)) {
          if (!CAMPOS_FOTO.includes(k)) errS(ref, k, 'campo desconocido (una foto solo tiene archivo y alt)');
        }
        if (!esTextoNoVacio(f.archivo)) errS(ref, 'archivo', 'falta la ruta de la imagen');
        if (!esTextoNoVacio(f.alt)) errS(ref, 'alt', 'falta el texto alternativo que describe la foto');
      });
    }
  }

  const hayPendientes = avisos.some((a) => a.tipo === 'placeholder' || a.tipo === 'revisar' || a.tipo === 'url-nula');
  const fallo = errores.length > 0 || (Boolean(opt.estricto) && hayPendientes);
  return { errores, avisos, resumen, fallo };
}

module.exports = { validar };
