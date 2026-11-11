'use strict';

// "5" -> 5, "1.2 K" -> 1200, "12 k" -> 12000. Cualquier otro formato -> null (no se adivina).
function parsearVistas(texto) {
  if (typeof texto !== 'string') return null;
  const t = texto.trim();
  if (/^\d+$/.test(t)) return Number(t);
  const m = /^(\d+(?:\.\d+)?)\s*[kK]$/.exec(t);
  if (m) return Math.round(Number(m[1]) * 1000);
  return null;
}

module.exports = { parsearVistas };
