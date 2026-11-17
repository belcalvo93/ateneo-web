# Funcionalidades

Épicas e historias derivadas de RF-01 a RF-09 del PRD (v1.2). Los criterios marcados «11/11» salen de los acuerdos de la reunión del 11/11/2026 (ver `09` DD-13 a DD-20).

## Épica 1: Presentación y contacto
### US-001 — Conocer al Ateneo (RF-01, Alta)
**Como** visitante **quiero** saber quiénes son y qué hacen **para** decidir si me interesa participar.
- [ ] Página propia «Quiénes somos» (C-03b): historia desde agosto de 2015 (DD-13), bajada institucional, valores (rigor científico, clima amistoso y horizontal, acceso libre), Dpto. Ing. Electrónica, apoyo de Graduadas y Graduados, De Interés para la FRM — 11/11
- [ ] Galería en la página Quiénes somos, oculta hasta tener fotos con consentimiento; cada foto con texto alternativo descriptivo — 11/11
- [ ] Encabezado de la portada que dice qué es el Ateneo (desde 2015, gratis y abierto, horario) con «Conocé al Ateneo», y cifras compactas (+100 conferencias, 310 videos) — C-03b
**Reglas**: RN-PC-02

### US-002 — Contactar e inscribirme por correo (RF-06, Alta)
**Como** visitante **quiero** escribir al Ateneo **para** consultar o inscribirme.
- [ ] `mailto:ateneoac.mo@gmail.com` visible en cabecera de sección, botón de inscripción y pie
**Reglas**: RN-PC-03

### US-003 — Enlaces a redes (RF-05, Alta)
**Como** visitante **quiero** llegar a YouTube, Instagram y el Canal de Difusión de WhatsApp **para** seguir al Ateneo.
- [ ] Enlaces visibles en el pie y en la franja «Seguinos» de la portada (botones con el nombre de la red), tomados de la lista configurable de redes (DD-14) — 11/11 y C-03b
- [ ] WhatsApp usa el enlace oficial del canal (DD-14); Instagram queda como placeholder hasta tener el enlace; una red sin enlace no se muestra al público

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
- [ ] Enlace por tema, solo si el tema tiene `playlist_url` (Agustina empezó a armar las playlists el 16/11/2026)

## Épica 3: Portada y difusión
### US-007 — Próxima charla (RF-04, Alta)
**Como** visitante **quiero** ver fecha, hora, lugar y modalidad de la próxima charla **para** asistir.
- [ ] Tarjeta con título, disertante, descripción, cuándo, dónde, botón «Inscribirme por correo»
- [ ] La tarjeta queda inmediatamente después del encabezado de la portada (C-03b)
- [ ] Botones opcionales «Agendar en mi calendario» y «Entrar por Zoom»: cada uno se muestra solo si su enlace está cargado (`calendar_url`, `zoom_url`; DD-15) — 11/11
- [ ] Se edita desde el archivo de datos
**Reglas**: RN-PC-01…03

### US-008 — Últimas charlas y más vistas (RF-08, Media)
- [ ] 3 últimas charlas y 3 más vistas con la misma tarjeta (miniatura con la duración total; C-03b), grilla de temas con conteo y gancho opcional (hoy 8; se sumarán 2 cuando Agustina informe los nombres: la grilla se arma desde `temas.js`, sin fijar la cantidad)
**Reglas**: RN-PO-01, RN-PO-02

### US-009 — Proponer una charla (RF-09, Media)
- [ ] Sección de la página Quiénes somos (`quienes-somos.html#proponer`), enlazada desde la portada y el pie (C-03b)
- [ ] Requisitos y criterios de admisión listados (base científica o tecnológica; sin fines comerciales ni proselitismo político o religioso) — 11/11
- [ ] Texto completo de la Declaración de Principios v2.4 en un bloque desplegable (`<details>`), sin enlace a `bit.ly` (DD-16) — 11/11
- [ ] Botón «Enviar mi propuesta» (por correo)
**Reglas**: RN-PR-01 a RN-PR-04

## Épica 4: Mantenimiento
### US-010 — Cargar contenido sin programar
**Como** integrante del Ateneo **quiero** editar un archivo de datos y seguir una guía **para** publicar una charla o evento sin ayuda.
- [ ] Archivo de datos simple y validado/documentado
- [ ] Guía de uso entregada el 18/12, pensada para que varios integrantes (no una sola persona) carguen la próxima charla (DD-20) — 11/11
**Reglas**: RN-CO-01, RN-CO-02

## Transversal: Accesibilidad y portabilidad
- [ ] Cumple RN-AC-01…03 y RN-GL-01 en todas las páginas
