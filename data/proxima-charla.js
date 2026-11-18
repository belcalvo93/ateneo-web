/*
  PRÓXIMA CHARLA — se edita cada semana.
  Reemplazá lo que está entre corchetes [así] por el dato real. Si todavía no lo sabés, dejá el corchete.
  Después de editar, comprobá con:  node scripts/validar-datos.js
*/
window.AAC_PROXIMA_CHARLA = {
  titulo: "[Título de la charla]",           // Ejemplo: "Energía solar en Mendoza"
  disertante: "[Disertante]",                // Ejemplo: "Dra. Ana Pérez"
  descripcion: "[Descripción breve, 1 o 2 líneas]", // Ejemplo: "Cómo funcionan los paneles solares y qué se instala hoy."
  fecha: "[fecha]",                          // Formato DD/MM/AAAA. Ejemplo: "14/11/2026"
  hora: "18:00",                             // Formato HH:MM, 24 horas. Ejemplo: "18:00"
  lugar: null,                               // SOLO si la charla es presencial (excepcional). Ejemplo: "Salón de Actos UTN FRM, Rodríguez 273, Ciudad de Mendoza"
  modalidad: "Por Zoom",                     // Las charlas son por Zoom. Si una es presencial: "Presencial y por Zoom"
  zoom_url: null,                            // OPCIONAL. Solo si ESTA charla tiene un link propio; con null se usa el del semestre (data/sitio.js)
  calendar_url: null,                        // OPCIONAL. Enlace para agendar la charla en Google Calendar, o null. Ejemplo: "https://..."
  correo_inscripcion: "ateneoac.mo@gmail.com" // Correo donde se anotan las personas
};
