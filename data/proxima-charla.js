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
  lugar: "Salón de Actos UTN FRM, Rodríguez 273, Ciudad de Mendoza", // Dónde es la charla presencial
  modalidad: "Presencial y/o por Zoom",      // Ejemplos: "Presencial y por Zoom", "Solo por Zoom"
  zoom_url: null,                            // OPCIONAL. Enlace de Zoom entre comillas, o null (sin comillas) si no se publica. Ejemplo: "https://..."
  calendar_url: null,                        // OPCIONAL. Enlace para agendar la charla en Google Calendar, o null. Ejemplo: "https://..."
  correo_inscripcion: "ateneoac.mo@gmail.com" // Correo donde se anotan las personas
};
