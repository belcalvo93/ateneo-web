/*
  TEMAS DEL ATENEO — lista única de temas del sitio.
  PROVISORIO hasta la reunión del 10/11: los temas pueden cambiar.

  Cómo editar:
  - "id": identificador interno (minúsculas y guiones). NO lo cambies si ya hay charlas que lo usan.
  - "nombre": nombre completo del tema.
  - "etiqueta": texto corto que se ve en los botones de filtro.
  - "playlist_url": enlace a la lista de reproducción del tema en YouTube; null mientras no exista.
  El orden de esta lista es el orden de los botones de filtro.
*/
window.AAC_TEMAS = [
  { id: "geologia", nombre: "Geología, minería y energía", etiqueta: "Geología, minería y energía", playlist_url: null },
  { id: "ia-tecnologia", nombre: "Inteligencia artificial y tecnología", etiqueta: "IA y tecnología", playlist_url: null },
  { id: "agua-ambiente", nombre: "Agua, ambiente y sostenibilidad", etiqueta: "Agua y ambiente", playlist_url: null },
  { id: "neurociencia-salud", nombre: "Neurociencia, salud y psicología", etiqueta: "Neurociencia y salud", playlist_url: null },
  { id: "historia-cultura", nombre: "Historia, cultura y humanidades", etiqueta: "Historia y cultura", playlist_url: null },
  { id: "espacio-astronomia", nombre: "Espacio y astronomía", etiqueta: "Espacio y astronomía", playlist_url: null },
  { id: "fisica-matematica", nombre: "Física y matemática", etiqueta: "Física y matemática", playlist_url: null },
  { id: "ingenieria-sismos", nombre: "Ingeniería, sismos e infraestructura", etiqueta: "Ingeniería y sismos", playlist_url: null }
];
