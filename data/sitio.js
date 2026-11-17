/*
  DATOS GENERALES DEL SITIO — contacto, redes y fotos. Se edita muy de vez en cuando.
  Reemplazá lo que está entre comillas. Si todavía no tenés un enlace, dejá el corchete [así] o null:
  una red sin enlace NO se muestra en la página.
  Después de editar, comprobá con:  node scripts/validar-datos.js
*/
window.AAC_SITIO = {
  correo: "ateneoac.mo@gmail.com",           // Correo de contacto del Ateneo (consultas, inscripción y propuestas)
  canal_youtube: "https://www.youtube.com/@ateneoamigosdelasciencias", // Enlace al canal de YouTube
  conferencias: "+100",                      // Cantidad de conferencias que se muestra en la portada. Ejemplo: "+100"

  // REDES: una línea por red, en el orden en que se ven en el pie de la página.
  // Para agregar una red, copiá una línea y cambiá el nombre y el enlace. Para quitarla, borrá su línea.
  redes: [
    { nombre: "YouTube", url: "https://www.youtube.com/@ateneoamigosdelasciencias" },
    { nombre: "Canal de WhatsApp", url: "https://whatsapp.com/channel/0029VbDjwCbI7BeKsvprkr3t" },
    { nombre: "Instagram", url: "[enlace de Instagram]" }   // Reemplazar por el enlace real. Ejemplo: "https://www.instagram.com/usuario"
  ],

  // FOTOS de «Quiénes somos». Vacío = la galería no se muestra.
  // Solo fotos con permiso de quienes aparecen. Ejemplo:
  //   { archivo: "img/charla-2019.jpg", alt: "Disertante exponiendo en el Salón de Actos de la UTN FRM" }
  fotos: []
};
