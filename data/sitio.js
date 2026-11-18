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
  direccion: "UTN · Facultad Regional Mendoza · Rodríguez 273, Ciudad de Mendoza", // Dónde funciona el Ateneo (se ve al pie)
  mapa_url: "https://www.google.com/maps/search/?api=1&query=Rodr%C3%ADguez+273%2C+Ciudad+de+Mendoza", // Enlace «Cómo llegar». Con null (sin comillas) no se muestra

  // REDES: una línea por red, en el orden en que se ven en el pie de la página.
  // Para agregar una red, copiá una línea y cambiá el nombre y el enlace. Para quitarla, borrá su línea.
  redes: [
    { nombre: "YouTube", url: "https://www.youtube.com/@ateneoamigosdelasciencias" },
    { nombre: "Canal de WhatsApp", url: "https://whatsapp.com/channel/0029VbDjwCbI7BeKsvprkr3t" },
    { nombre: "Instagram", url: "[enlace de Instagram]" }   // Reemplazar por el enlace real. Ejemplo: "https://www.instagram.com/usuario"
  ],

  // FOTOS de «Quiénes somos». Vacío = la galería no se muestra.
  // Solo fotos que el Ateneo autorizó para la web, achicadas y sin metadatos. Ejemplo:
  //   { archivo: "img/charla-2019.jpg", alt: "Disertante exponiendo en el Salón de Actos de la UTN FRM" }
  fotos: [
    // Autorizada por el Ateneo (17/11/2026). Las caras de dos personas del fondo están desenfocadas.
    { archivo: "img/ateneo-integrantes.jpg", alt: "Siete integrantes del Ateneo Amigos de la Ciencia, abrazados y sonrientes, durante un encuentro del grupo en 2019." }
  ],

  // VIDEO DE PRESENTACIÓN de «Quiénes somos» (el video institucional del Ateneo), enlace de YouTube entre comillas.
  // Con null (sin comillas) la sección del video no se muestra. Ejemplo: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
  video_presentacion: null,

  // FOTO PRINCIPAL de «Quiénes somos» (al lado del título). Con null (sin comillas) no se muestra.
  // El Ateneo va a mandar una foto actual (17/11/2026). Ejemplo: { archivo: "img/ateneo-2026.jpg", alt: "…" }
  foto_principal: null,

  // ZOOM del semestre: el link es recurrente y cambia una vez por semestre (Eduardo autorizó que sea público).
  // Se muestra el botón «Entrar por Zoom» en la próxima charla, también antes de que esté anunciada.
  // Si una charla puntual tiene un link propio, se carga zoom_url en data/proxima-charla.js y manda ese.
  zoom_url_semestre: "https://utn.zoom.us/j/88394809866?pwd=GavNQgGKD6gPBTqR5sDoxWMXP6S1Vh.1",

  // DURACIÓN de una charla, en minutos: el tiempo que la tarjeta de la próxima charla dice «En vivo ahora»
  // (desde la hora de inicio). Número entero entre 15 y 300, sin comillas.
  duracion_charla_min: 90,

  // FORMULARIO para hacerse miembro (botón «Sumate al Ateneo» en «Quiénes somos»). Con null no se muestra el botón.
  formulario_inscripcion: "https://docs.google.com/forms/d/e/1FAIpQLSc1mJHPDX0IZ7EGemwlh3mX4J7Xj3QHYpgxd9cv1wj4PL7hKQ/viewform",

  // MESA ORGANIZADORA: se muestra en «Quiénes somos» con mostrar: true. Solo nombre y apellido
  // (sin cargos, fotos ni datos de contacto); la página las ordena sola por apellido.
  // Confirmado por Eduardo Serdoch (17/11/2026): se llama Mesa Organizadora, son 6 y quieren aparecer.
  mesa_organizadora: {
    mostrar: true,
    nombre: "Mesa Organizadora",
    integrantes: [
      { nombre: "Raúl", apellido: "Pía" },
      { nombre: "Luis P.", apellido: "Tittarelli" },
      { nombre: "Adolfo", apellido: "Anunziata" },
      { nombre: "Alberto", apellido: "Salassa" },
      { nombre: "Luis", apellido: "Blanco" },
      { nombre: "Eduardo", apellido: "Serdoch" }
    ]
  },

  // EN LA RADIO: entrevistas grabadas al Ateneo. Vacía = la sección no se muestra en «Quiénes somos».
  // Una línea por entrevista. Ejemplo: { titulo: "Entrevista en Radio …", url: "https://…", fecha: "10/11/2026" }
  // (la fecha es opcional: con null o sin el campo no se muestra).
  entrevistas_radio: [],

  // DECLARACIÓN DE PRINCIPIOS en PDF (botón «Descargar en PDF»). null = no se muestra el botón.
  // El Ateneo la va a reescribir (17/11/2026): cuando llegue la nueva, se cambia el texto de la página y se carga
  // acá la ruta o, en Elementor, la URL del PDF subido.
  declaracion_pdf: null
};
