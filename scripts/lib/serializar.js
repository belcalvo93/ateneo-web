'use strict';

// info (opcional): { fechaFoto: 'DD/MM/AAAA', totalVideos: N } — la foto del canal usada para los enlaces.
function cabecera(info) {
  const foto = info
    ? '  Foto del canal de YouTube usada para los enlaces y las vistas: ' + info.fechaFoto + ' (' + info.totalVideos + ' videos).\n'
    : '';
  return `/*
  ARCHIVO GENERADO — no editar a mano. Lo escribe scripts/derivar-datos.js a partir de data/charlas-borrador.json
  y de la lista de videos del canal; la próxima vez que se regenere, cualquier cambio hecho acá se pierde.
${foto}
  DÓNDE SE CORRIGE:
  - data/correcciones.js  → títulos, disertantes, temas, años, "destacada", enlaces de una parte y marcas de "revisar" confirmadas.
  - data/charlas-nuevas.js → charlas que no están en este catálogo.
  Las páginas juntan los tres archivos en el navegador (js/aplicar-correcciones.js); estos dos sí se editan a mano.

  AÑO APROXIMADO: el campo "anio" sale de «hace X años» al 06/11/2026, así que es aproximado.
  Se corrige en data/correcciones.js cuando el Ateneo confirme la fecha real.

  Cada charla tiene: id, titulo, disertante, tema (id de data/temas.js), anio, partes y revisar.
  - Lo que está entre corchetes, como [Título] o [Disertante], es un dato que falta completar.
  - "revisar" lista los campos dudosos hasta que se confirmen o corrijan en data/correcciones.js.
  - "url" en null = esa parte todavía no tiene enlace de YouTube.
  - "destacada": true (opcional, solo en data/correcciones.js) fija la charla como destacada en la portada.

  Para actualizar este archivo cuando cambie el canal:  node scripts/derivar-datos.js  (ver scripts/LEEME.md)
  Para comprobar que no se rompió nada:  node scripts/validar-datos.js
  Guía completa: data/LEEME.md
*/
`;
}

// Texto completo de data/charlas.js. Determinístico: misma entrada, mismos bytes.
function serializar(charlas, info) {
  return cabecera(info) + 'window.AAC_CHARLAS = ' + JSON.stringify(charlas, null, 2) + ';\n';
}

module.exports = { serializar };
