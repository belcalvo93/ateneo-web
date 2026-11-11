'use strict';

const ROMANOS = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9, x: 10 };
const ORDINALES = { primera: 1, segunda: 2, tercera: 3, cuarta: 4, quinta: 5 };

// Marcas de parte reconocidas (cada una captura el número en el grupo 1).
const RE_PARTE_NUM = /\b(?:parte|pte|cap[ií]tulo)\s*(\d+|[ivx]+)\b/i; // "Parte 1", "PARTE II", "parte1"
const RE_NUM_PARTE = /\b(\d+)\s*(?:°|º|a|ra|da|er|to)?\.?\s*parte\b/i; // "2da parte", "3° parte", "2a. PARTE"
const RE_ORD_PARTE = /\b(primera|segunda|tercera|cuarta|quinta)\s+parte\b/i; // "primera parte"

function colapsar(texto) {
  return String(texto).replace(/\s+/g, ' ').trim();
}

function aNumero(token) {
  if (/^\d+$/.test(token)) return Number(token);
  return ROMANOS[token.toLowerCase()] || null;
}

// Número de parte indicado en el título, o null si no hay marca reconocible.
function numeroDeParte(titulo) {
  const t = colapsar(titulo);
  let m = RE_PARTE_NUM.exec(t);
  if (m) {
    const n = aNumero(m[1]);
    if (n !== null) return n;
  }
  m = RE_NUM_PARTE.exec(t);
  if (m) return Number(m[1]);
  m = RE_ORD_PARTE.exec(t);
  if (m) return ORDINALES[m[1].toLowerCase()];
  return null;
}

// Marca de parte al FINAL, con cola opcional («y debate», «(INTERCAMBIO)», «P&R», «preguntas y comentarios»).
const MARCA = /(?:parte|pte)\s*(?:\d+|[ivx]+)(?:\s+de\s+\d+)?|(?:primera|segunda|tercera|cuarta|quinta)\s+parte|\d+\s*(?:°|º|a|ra|da|er|to)?\.?\s*parte/;
const COLA = /(?:\s*[-–,:]?\s*\(?\s*(?:y\s+)?(?:debate|intercambio|p&r|preguntas(?:\s+y\s+\w+)*)\s*\)?)?/;
const RE_MARCA_FINAL = new RegExp(/(?:\s*[-–,:]\s*|\s+)/.source + '(?:' + MARCA.source + ')' + COLA.source + /\s*$/.source, 'i');

// Quita la marca de parte final (y su cola) y colapsa espacios. Sin marca: solo colapsa.
function quitarMarcaParte(titulo) {
  let t = colapsar(titulo);
  const anterior = t;
  t = t.replace(RE_MARCA_FINAL, '').trim();
  return t === '' ? anterior : t;
}

const TITULOS_PROF = /(?:dr|dra|ing|lic|prof|profa|arq|mg|mgter|bioq|geol|geól)/;
const PALABRA = /[\p{L}][\p{L}.'’]*/;
const RE_DISERTANTE = new RegExp(
  '^(?:' + TITULOS_PROF.source + /\.?\s+/.source + '){1,2}' + PALABRA.source + '(?:' + /\s+/.source + PALABRA.source + '){1,4}$',
  'iu'
);

function esDisertante(segmento) {
  if (!RE_DISERTANTE.test(segmento)) return false;
  // Dos disertantes o texto corrido: no es de alta confianza.
  return !/\s(?:y|e|con)\s/i.test(segmento);
}

const NO_ENCONTRADO = () => ({ titulo: '[Título]', disertante: '[Disertante]', revisar: ['titulo', 'disertante'] });

// Categoría A: «Título - Dr/Dra/Ing/... Nombre Apellido» al final. Cualquier otro caso: placeholders.
function extraerDisertanteYTitulo(tituloOriginal) {
  const t = quitarMarcaParte(tituloOriginal);
  const m = /^(.*\S)\s+[-–]\s+([^-–]+)$/.exec(t);
  if (!m) return NO_ENCONTRADO();
  const izquierda = m[1].replace(/[\s\-–,:]+$/, '').trim();
  const derecha = m[2].trim();
  if (izquierda === '' || !esDisertante(derecha)) return NO_ENCONTRADO();
  // Si a la izquierda queda una marca de parte/capítulo, el título no es confiable.
  if (numeroDeParte(izquierda) !== null) return NO_ENCONTRADO();
  const revisar = /[a-záéíóúñ]/.test(izquierda) ? [] : ['titulo'];
  return { titulo: izquierda, disertante: derecha, revisar };
}

// Ordena por número de parte. { partes, revisar } — revisar=true si el orden no es confiable.
function ordenarPartes(partes) {
  if (partes.length <= 1) return { partes: partes.slice(), revisar: false };
  const numeros = partes.map((p) => numeroDeParte(p.titulo_original));
  if (numeros.some((n) => n === null) || new Set(numeros).size !== numeros.length) {
    return { partes: partes.slice(), revisar: true };
  }
  const orden = partes.map((p, i) => ({ p, n: numeros[i] })).sort((a, b) => a.n - b.n);
  const sinHuecos = orden.every((x, i) => x.n === i + 1);
  return { partes: orden.map((x) => x.p), revisar: !sinHuecos };
}

module.exports = { quitarMarcaParte, numeroDeParte, extraerDisertanteYTitulo, ordenarPartes };
