# Funcionalidades

Épicas e historias derivadas de RF-01 a RF-09 del PRD. No se agregan requisitos nuevos.

## Épica 1: Presentación y contacto
### US-001 — Conocer al Ateneo (RF-01, Alta)
**Como** visitante **quiero** saber quiénes son y qué hacen **para** decidir si me interesa participar.
- [ ] Sección «Quiénes somos» (nacido en 2017, Dpto. Ing. Electrónica, apoyo de Graduadas y Graduados, De Interés para la FRM)
- [ ] Hero con propuesta y cifras (+100 conferencias, 310 videos, viernes 18 hs)
**Reglas**: RN-PC-02

### US-002 — Contactar e inscribirme por correo (RF-06, Alta)
**Como** visitante **quiero** escribir al Ateneo **para** consultar o inscribirme.
- [ ] `mailto:ateneoac.mo@gmail.com` visible en cabecera de sección, botón de inscripción y pie
**Reglas**: RN-PC-03

### US-003 — Enlaces a redes (RF-05, Alta)
**Como** visitante **quiero** llegar a YouTube, Instagram y Facebook **para** seguir al Ateneo.
- [ ] Enlaces visibles en el pie (usuarios de Instagram/Facebook a confirmar)

## Épica 2: Videoteca
### US-004 — Explorar charlas por tema (RF-02, Alta)
**Como** visitante **quiero** ver fichas de charlas **para** elegir qué mirar.
- [ ] Ficha: miniatura, tema, título, disertante, año, botones por parte con duración
- [ ] Una ficha por charla aunque tenga varias partes
**Reglas**: RN-VI-01…06

### US-005 — Buscar y filtrar (RF-03, Alta)
**Como** visitante **quiero** buscar por título/disertante y filtrar por tema **para** encontrar una charla en menos de 3 clics.
- [ ] Búsqueda sin distinguir mayúsculas ni tildes
- [ ] Filtro por tema combinable; «Todos los temas» por defecto
- [ ] Contador «Mostrando N charlas»
**Reglas**: RN-BU-01…03 — **requiere TDD (node:test)**

### US-006 — Playlists por tema (RF-07, Media)
**Como** visitante **quiero** abrir la playlist de un tema en YouTube.
- [ ] Enlace por tema (depende de acceso al canal para crear playlists)

## Épica 3: Portada y difusión
### US-007 — Próxima charla (RF-04, Alta)
**Como** visitante **quiero** ver fecha, hora, lugar y modalidad de la próxima charla **para** asistir.
- [ ] Tarjeta con título, disertante, descripción, cuándo, dónde, botón «Inscribirme por correo»
- [ ] Se edita desde el archivo de datos
**Reglas**: RN-PC-01…03

### US-008 — Últimas charlas y más vistas (RF-08, Media)
- [ ] 3 últimas charlas, 3 más vistas, grilla de 8 temas con conteo
**Reglas**: RN-PO-01, RN-PO-02

### US-009 — Proponer una charla (RF-09, Media)
- [ ] Requisitos listados, enlace a la Declaración de Principios, botón «Enviar mi propuesta» (por correo)
**Reglas**: RN-PR-01, RN-PR-02

## Épica 4: Mantenimiento
### US-010 — Cargar contenido sin programar
**Como** integrante del Ateneo **quiero** editar un archivo de datos y seguir una guía **para** publicar una charla o evento sin ayuda.
- [ ] Archivo de datos simple y validado/documentado
- [ ] Guía de uso entregada el 18/12
**Reglas**: RN-CO-01, RN-CO-02

## Transversal: Accesibilidad y portabilidad
- [ ] Cumple RN-AC-01…03 y RN-GL-01 en todas las páginas
