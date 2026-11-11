'use strict';

const { parsearVistas } = require('./vistas.js');
const { ordenarPartes, extraerDisertanteYTitulo } = require('./disertante.js');

const ORDEN_REVISAR = ['titulo', 'disertante', 'vistas', 'partes'];

// Deriva el catálogo (esquema de data/charlas.js) desde el borrador. No modifica sus argumentos.
//   borrador: contenido de data/charlas-borrador.json
//   temas:    window.AAC_TEMAS (se usa id + nombre)
//   enlaces:  opcional, { "c002": { "1": { url, vistas } } } — la clave es la POSICIÓN (desde 1)
//             del video en el borrador, antes de reordenar las partes.
function derivar(borrador, temas, enlaces) {
  const idPorNombre = new Map(temas.map((t) => [t.nombre, t.id]));
  const confirmados = enlaces || {};

  return borrador.charlas.map((c) => {
    const tema = idPorNombre.get(c.tema);
    if (tema === undefined) {
      throw new Error('Charla ' + c.id + ': el tema "' + c.tema + '" no existe en data/temas.js');
    }

    const delCanal = confirmados[c.id] || {};
    const partesBase = c.videos.map((v, i) => {
      const conf = delCanal[i + 1];
      const vistasCanal = conf && Number.isInteger(conf.vistas) ? conf.vistas : null;
      return {
        titulo_original: v.titulo_original,
        parte: {
          duracion: v.duracion,
          url: conf && typeof conf.url === 'string' ? conf.url : null,
          vistas: vistasCanal !== null ? vistasCanal : parsearVistas(v.vistas),
          titulo_original: v.titulo_original
        }
      };
    });

    const orden = ordenarPartes(partesBase);
    const partes = orden.partes.map((p) => p.parte);

    const extraido = extraerDisertanteYTitulo(partes[0].titulo_original);
    const marcas = new Set(extraido.revisar);
    if (partes.some((p) => p.vistas === null)) marcas.add('vistas');
    if (orden.revisar) marcas.add('partes');

    return {
      id: c.id,
      titulo: extraido.titulo,
      disertante: extraido.disertante,
      tema,
      anio: c.anio_aprox,
      partes,
      revisar: ORDEN_REVISAR.filter((k) => marcas.has(k))
    };
  });
}

module.exports = { derivar };
