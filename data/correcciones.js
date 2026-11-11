/*
  CORRECCIONES A MANO — este archivo SÍ se edita a mano y ningún script lo escribe ni lo pisa.

  El catálogo (data/charlas.js) es un archivo GENERADO: no se toca. Todo lo que una persona corrige o confirma
  va acá, anotado por el id de la charla (c001, c002…). El sitio junta las dos cosas en el navegador, así que al
  guardar este archivo el cambio se ve sin correr ningún comando.

  Qué se puede corregir en cada charla (todos los campos son opcionales):
    titulo       "Texto"          título real de la charla
    disertante   "Texto"          nombre de quien disertó
    tema         "geologia"       id de un tema de data/temas.js
    anio         2023             año real, número sin comillas
    destacada    true             fija la charla como destacada en la portada
    confirmados  ["titulo"]       marcas de "revisar" que ya revisaste y están bien tal como están
                                  (se puede confirmar: titulo, disertante, vistas, partes)
    partes       { 2: { url: "https://www.youtube.com/watch?v=XXXXXXXXXXX" } }
                                  enlace de una parte. El número es el de «Parte N» que ve el público.
                                  Con url: null se deja la parte sin enlace.

  Si completás titulo o disertante con un texto real, la marca correspondiente de "revisar" se borra sola.
  Las charlas nuevas (que no están en el catálogo) se agregan en data/charlas-nuevas.js.
  Después de editar, comprobá que no se rompió nada:  node scripts/validar-datos.js

  Ejemplo (sacale las // para usarlo; las claves son ids reales de charlas, sin comillas):

  window.AAC_CORRECCIONES = {
    c002: { confirmados: ["titulo"] },                      // el título en mayúsculas está bien así
    c010: { titulo: "…", disertante: "…", tema: "geologia", anio: 2023, destacada: true },
    c124: { partes: { 2: { url: "https://www.youtube.com/watch?v=XXXXXXXXXXX" } } }
  };
*/
window.AAC_CORRECCIONES = {};
