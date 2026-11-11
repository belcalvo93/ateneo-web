/*
  CHARLAS NUEVAS — se editan a mano. Acá van las charlas que NO están en el catálogo generado (data/charlas.js).

  Cada charla tiene el mismo formato que en data/charlas.js. Usá ids que sigan al último del catálogo
  (c187, c188…); no pueden repetirse. Ejemplo (sacale los comentarios para usarlo; separá las charlas con comas):

  window.AAC_CHARLAS_NUEVAS = [
    {
      "id": "c187",
      "titulo": "Título de la charla",
      "disertante": "Dra Ana Pérez",
      "tema": "geologia",
      "anio": 2026,
      "partes": [
        { "duracion": "1:02:30", "url": "https://www.youtube.com/watch?v=XXXXXXXXXXX", "vistas": null, "titulo_original": "Título de la charla - Dra Ana Pérez" }
      ],
      "revisar": []
    }
  ];

  Después de editar, comprobá que no se rompió nada:  node scripts/validar-datos.js
*/
window.AAC_CHARLAS_NUEVAS = [];
