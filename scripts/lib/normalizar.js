'use strict';

// Forma para COMPARAR títulos: sin tildes, minúsculas, puntuación como espacio, espacios colapsados.
// Nunca se usa para modificar los títulos guardados.
function normalizar(texto) {
  return String(texto)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// "M:SS", "MM:SS" o "H:MM:SS" -> segundos; cualquier otra cosa -> null.
function duracionASegundos(duracion) {
  if (typeof duracion !== 'string') return null;
  const m = /^(?:(\d+):)?(\d{1,2}):(\d{2})$/.exec(duracion.trim());
  if (!m) return null;
  const horas = m[1] === undefined ? 0 : Number(m[1]);
  const minutos = Number(m[2]);
  const segundos = Number(m[3]);
  if (segundos > 59) return null;
  if (m[1] !== undefined && minutos > 59) return null;
  return horas * 3600 + minutos * 60 + segundos;
}

module.exports = { normalizar, duracionASegundos };
