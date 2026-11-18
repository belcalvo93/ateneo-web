# Decisiones y Supuestos

## Decisiones documentadas

### DD-01 — HTML/CSS/JS puro, sin build
**Decisión**: sin frameworks, bundler ni build. **Contexto**: se pegará en un widget HTML de Elementor y debe tener costo cero. **Alternativas**: React/Vite, generador estático. **Justificación**: portabilidad y mantenibilidad por no programadores. **Trade-offs**: más código manual; sin componentes reutilizables.

### DD-02 — Plataforma: widget HTML de Elementor (WordPress de la FRM)
**Decisión**: la página va integrada/enlazada dentro de la web oficial de la UTN FRM (WordPress + Elementor Pro 4.2), pegando el código en el widget HTML. **Estado**: **confirmada en la reunión del 11/11/2026**. **Alternativa descartada**: Google Sites (solo existía un sitio viejo abandonado de 2022). **Pendiente**: gestionar con el administrador web de la FRM el alta de Belén como editora, y saber si se pueden hospedar archivos externos (ver `10`).

### DD-03 — Datos separados del diseño
**Decisión**: charlas, temas y próxima charla en archivos de datos fáciles de editar. **Resuelto en C-02**: archivos `.js` que asignan una global (`window.AAC_TEMAS`, `window.AAC_CHARLAS`, `window.AAC_PROXIMA_CHARLA`), no `.json`. **Por qué**: un `.json` hay que pedirlo con `fetch`, que los navegadores bloquean al abrir la página con doble clic (`file://`) y que exige hospedar el archivo; un `.js` carga con `<script src>` o se pega en línea dentro del widget de Elementor, admite comentarios para quien edita y tolera una coma de más. Todos los archivos de datos deben poder concatenarse en un único `<script>` (Elementor: el acceso a archivos externos sigue sin conocerse; se consulta con el administrador web de la FRM). El cuerpo de `charlas.js` es JSON válido, así que volver a `.json` es mecánico.

### DD-04 — Una ficha por charla con sus partes
**Decisión**: agrupar videos de una misma charla. **Contexto**: 310 videos ≈ 186 charlas; 104 charlas tienen más de un video.

### DD-05 — Ocho temas confirmados, más dos por definir
**Decisión**: clasificación por título en 8 temas. **Estado**: Agustina confirmó el 16/11/2026 que **las 8 categorías se mantienen** y que **sumará 2 más**. Los nombres de las 2 nuevas no se conocen: hasta que los pase, `data/temas.js` sigue con 8 y no se inventa ninguno. Cuando lleguen: se agregan a `temas.js` y se reclasifican las charlas (a mano en `correcciones.js` o por playlists, IN-08).

### DD-06 — Tests solo donde hay lógica
**Decisión**: `node:test` para buscador y filtro; sin dependencias extra. Indicado por la autora en el kickoff de la KB. **Ampliación (C-02)**: también para los módulos de `scripts/lib/` (normalización, extracción de disertante, derivación, validación, cruce con YouTube), que tienen lógica propia.

### DD-07 — Mockups aprobados son el contrato visual
El diseño final debe respetar `docs/mockups/` (inicio-escritorio, videoteca-escritorio, inicio-celular, logo-aac).

### DD-08 — Orden propuesto de changes (OpenSpec)
Propuesta de la autora: C-01 base-y-estilos, C-02 datos-charlas, C-03 portada, C-04 videoteca (TDD); el resto del mensaje se cortó. El roadmap lo formaliza `roadmap-generator`. **Actualización 16/11/2026**: tras la reunión del 11/11, C-03 a C-06 dejan de estar «sujetos a validación» (ver `CHANGES.md`).

### DD-09 — `yt-dlp` solo como herramienta de desarrollo
**Decisión (C-02)**: `yt-dlp` se usa como CLI puntual de la desarrolladora, desde `scripts/` (se invoca como `python -m yt_dlp`), solo para listar metadatos del canal público (`--flat-playlist`, sin descargar videos) y producir `scripts/salida/canal.jsonl`. No es parte del sitio, no va en `package.json` y no lo necesitan ni el sitio, ni `npm test`, ni el validador. Se documenta en `scripts/LEEME.md`.

### DD-10 — Correcciones a mano separadas del catálogo generado
**Decisión (C-02)**: `data/charlas.js` es salida generada («ARCHIVO GENERADO — no editar a mano»). Todo lo que corrige una persona vive en `data/correcciones.js`, indexado por el **id propio de la charla** (`c001`…; nunca por título ni por id de video, que Agustina cambia), y las charlas nuevas en `data/charlas-nuevas.js`. Ningún script escribe esos dos archivos. Las páginas usan la vista combinada (`js/aplicar-correcciones.js`, sin módulos ES, utilizable como `<script>` y con `require()`), así que editar no requiere correr nada. Detalle: `design.md` de C-02, D12 y D13.

### DD-11 — Regeneración conservadora del catálogo
**Decisión (C-02)**: cuando cambia el canal, `scripts/derivar-datos.js` regenera `charlas.js` sin perder trabajo: ids y agrupación de partes salen siempre del borrador; el enlace de cada parte es el manual, el que ya tenía si su video sigue en el canal, o un título único; si no, `url: null` y la parte va al reporte de dudosos. **Nunca se asigna nada ambiguo o aproximado.** `--comprobar` compara sin escribir. Detalle: `design.md` de C-02, D14 y D15.

### DD-12 — `scripts/salida/` fuera de git
**Decisión (C-02)**: la foto del canal (`canal.jsonl`) y los reportes se regeneran y cambian con cada edición del canal, así que `.gitignore` los excluye (queda `.gitkeep`). Lo que el sitio necesita (enlaces, vistas, fecha y cantidad de videos de la foto) queda en la cabecera y el cuerpo de `data/charlas.js`. Detalle: `design.md` de C-02, D16.

## Decisiones de la reunión del 11/11/2026 y novedades del 16/11/2026

Fuente: reunión con el Ateneo del 11/11/2026 y documentos entregados por el Ateneo, con las aclaraciones de la autora sobre la transcripción de la reunión.

### DD-13 — La historia se cuenta desde agosto de 2015
**Decisión**: «Quiénes somos» y las cifras de portada cuentan la historia desde **agosto de 2015** (grupo informal de amigos), no desde 2017. **Contexto**: los documentos fundacionales entregados por el Ateneo fijan el nacimiento en agosto de 2015, la constitución formal el 6 de enero de 2016 y la consolidación con el nombre definitivo entre 2016 y 2017. **Consecuencia**: el texto «desde 2017» de los mockups se reemplaza por 2015; el diseño no cambia. Resuelve IN-01. Detalle en `01` §Historia e identidad.

### DD-14 — Redes: YouTube, Instagram y Canal de Difusión de WhatsApp
**Decisión**: la lista configurable de redes (`redes: [{ nombre, url }]`, C-03) lleva YouTube, Instagram y el Canal de Difusión de WhatsApp (ya creado por Agustina; permite suscribirse sin aprobación previa). **Estado**: el enlace oficial del canal de WhatsApp es `https://whatsapp.com/channel/0029VbDjwCbI7BeKsvprkr3t` (informado el 16/11/2026); el de Instagram todavía no se tiene: va como placeholder y no se muestra al público hasta cargarlo. La lista aún no existe en `data/`: la crea C-03 con estos valores. Facebook y TikTok quedan fuera del conjunto confirmado (si más adelante se suman, es agregar un elemento a la lista).

### DD-15 — Próxima charla con «Agendar en Google Calendar» y Zoom
**Decisión**: la tarjeta «Próxima charla» ofrece dos enlaces opcionales: agendar la charla en Google Calendar y entrar por Zoom. **Modelo**: `zoom_url` (ya existe desde C-02) y un campo nuevo `calendar_url`, ambos `string | null`; cada botón se muestra solo si su enlace está cargado. **Alternativa descartada**: renombrar a `url_zoom`/`url_calendar` (obligaría a tocar datos, validador y tests de C-02 sin beneficio). Se implementa en C-03.

### DD-16 — Declaración de Principios dentro de la página
**Decisión**: «Proponer una charla» muestra los criterios de admisión y el texto completo de la Declaración de Principios (versión vigente: v2.4) en un bloque desplegable (`<details>`), y se deja de usar el enlace `bit.ly/3ai4qQx`. **Criterios de admisión**: todo tema debe tener bases científicas sólidas o desarrollos tecnológicos comprobados; no se admiten charlas sobre política partidaria, religión, cuestiones étnicas, violencia o discriminación, ni con fines comerciales o publicitarios. **Qué se envía**: propuesta temática, resumen, CV abreviado y aceptación de la Declaración, al correo institucional. El texto se transcribe del documento del Ateneo, sin reescribirlo.

### DD-17 — Privacidad: el listado de miembros no entra al repo
**Decisión**: el repositorio es público, así que el listado interno de miembros del Ateneo (Excel con nombres, correos y algunos teléfonos) **nunca se copia ni se commitea**, y ningún correo o teléfono personal se guarda en el repo. **Uso permitido**: como diccionario para cruzar disertantes (IN-07); el script lo lee desde su carpeta original fuera del repo y solo se guardan nombres que **ya figuran públicamente** en los títulos o descripciones de YouTube. No se publica como padrón.

### DD-18 — Logo: «AAC» con la llama (confirmado por archivos; validar con el nexo)
**Decisión**: se toma como oficial el logo «AAC» con la llama (azul, rojo y amarillo), que es el que ya usan el design system y los mockups. **Contexto**: en la reunión del 11/11 **no se habló del logo**; se toma como oficial porque es el que el Ateneo entregó en sus archivos (logo patrón y video institucional de 2022). **Estado**: confirmado por archivos; **falta validarlo con el nexo** de la Mesa Organizadora.

### DD-19 — Un nexo único de validación
**Decisión**: la Mesa Organizadora designó el 11/11 a 1 o 2 integrantes como canal único de validación con Belén y Agustina, para evitar mensajes cruzados. Las consultas de contenido pasan por ese nexo.

### DD-20 — Guía de uso para varios integrantes
**Decisión**: los ingenieros pidieron que actualizar la página sea muy simple y recibir una guía clara para que **varios integrantes** (no una sola persona) puedan cargar la próxima charla al terminar la beca. Condiciona C-06 y la simplicidad de `data/proxima-charla.js`.

### DD-21 — Los ids y enlaces de los videos se mantienen al editar el canal
**Hecho confirmado por Agustina el 16/11/2026**: edita desde YouTube Studio, así que los ids y enlaces de los videos **se mantienen fijos** aunque cambie títulos, descripciones, capítulos o playlists. Si alguna vez vuelve a subir un video (lo que sí cambia su id), avisa para actualizar el enlace. **Consecuencia**: el diseño de correcciones por id de charla (DD-10) y la regeneración conservadora (DD-11) se mantienen sin cambios; siguen cubriendo el caso de un video resubido.

### DD-22 — Visualizaciones por charla y orden de «últimas» (C-03)
**Decisión (16/11/2026)**: las visualizaciones de una charla son la **suma** de las de sus partes (la unidad es la charla; los valores del mockup eran ilustrativos). «Últimas charlas» se ordena por año y, a igual año, por el orden del catálogo, con las agregadas a mano primero; **cuando haya fechas reales** (sitio viejo del Ateneo, archivo de actividades por ciclo 2020–2026) se pasa a ordenar por fecha exacta. En celular las secciones van en el mismo orden que en escritorio, para que el orden visual y el de teclado coincidan. Una red sin enlace es solo un aviso del validador (no corta el modo estricto), porque la página la oculta.

### DD-23 — Rediseño para dos públicos y tres páginas (C-03b)
**Decisión (16/11/2026, aprobada por la autora tras una revisión de diseño)**: la página tiene que servir a la vez a los adultos mayores que ya participan (letra grande, pocos clics, nada escondido) y a los jóvenes que llegan desde WhatsApp o Instagram con el celular. Consecuencias:
- **Tres páginas**: Inicio, Videoteca y Quiénes somos. «Quiénes somos» y «Proponer una charla» salen de la portada.
- **Portada**: el encabezado dice qué es el Ateneo y la próxima charla queda inmediatamente debajo; se suman la franja «Seguinos» y una invitación final a proponer una charla.
- **Menú de 4 ítems** (Inicio · Videoteca · Quiénes somos · Contacto), plegado detrás de un botón con el texto «Menú» en el celular. «Proponer una charla» sale del menú y queda enlazada desde la portada y el pie.
- **Cabecera, menú y pie definidos una sola vez** (`js/marco.js`), con un respaldo mínimo escrito en cada página por si no carga JavaScript. La página actual se declara con un atributo y no por el nombre del archivo, porque dentro de Elementor ese nombre no existe.
- **Una sola tarjeta de charla** (`js/ficha.js`), con la duración total sobre la miniatura (suma de las partes).
- **Gancho opcional por tema** (`gancho` en `data/temas.js`), vacío hasta que el Ateneo o Agustina lo escriban.
- El menú hamburguesa se adelantó de C-05 a C-03b; C-05 queda como auditoría.

### DD-24 — Refinamiento visual «editorial universitario» (C-03c, design system rev. 2)
**Decisión (17/11/2026, de la autora, tras la crítica de `impeccable`)**:
- **Tipografía**: Source Serif 4 reemplaza a Baskervville como fuente de títulos; Dosis queda para el menú y los rótulos cortos; Open Sans para el texto. Tres familias. Se eligió entre Source Serif 4, Atkinson Hyperlegible Next y Baskervville, vistas lado a lado con textos reales: legibilidad para adultos mayores (altura de x amplia, I/l/1 distintas) y tono editorial.
- **Jerarquía por espacio y tipografía, no por cajas**: sin bordes, sombras ni rayas de color en temas, valores y paneles; la próxima charla es el único elemento elevado.
- **Portada**: encabezado en dos columnas con la próxima charla al lado; título «Ciencia y cultura abiertas a toda la comunidad», sin rótulo encima; sale la franja «Seguinos» y el canal de WhatsApp se ofrece dentro de la tarjeta de la próxima charla.
- **Sale la barra superior**: dentro de la web de la UTN duplica la cabecera de la facultad. El **logo oficial de la UTN** va en el pie, en blanco por CSS (el archivo no se modifica), con «Una actividad de la UTN Facultad Regional Mendoza».
- **Foto grupal** en Quiénes somos, autorizada por el Ateneo, achicada, sin metadatos y con las caras de dos personas del fondo desenfocadas.

### DD-25 — Respuestas de la Mesa Organizadora (17/11/2026, C-02b)
**Decisión (de la Mesa Organizadora, por Eduardo Serdoch)**:
- **Modalidad**: las charlas son por Zoom; presencial solo por excepción. Los textos dicen «por Zoom»; `lugar` de la próxima charla pasa a ser opcional (`null` salvo charla presencial). La dirección del pie es la sede del Ateneo.
- **Zoom**: link recurrente, uno por semestre, público. Vive en `data/sitio.js` (`zoom_url_semestre`); `zoom_url` de `proxima-charla.js` lo reemplaza solo para una charla con link propio. El botón «Entrar por Zoom» se ve también antes de anunciar la charla.
- **Mesa Organizadora** (no «Operativa»): 6 integrantes que quieren aparecer, con nombre y apellido, en orden alfabético, sin cargos ni fotos.
- **Disertantes sin títulos** (Dr., Ing., Lic.): salvo una eminencia que el Ateneo indique, cargada a mano en `data/correcciones.js`. La derivación del catálogo los quita (`quitarTitulos`).
- **Radio**: lista `entrevistas_radio` y sección «En la radio» que aparece solo con entrevistas.
- **Fotos**: la del Salón de Actos no se usa; `foto_principal` en `null` hasta tener una actual. La de los siete integrantes (2019) queda, pendiente de confirmar.
- **Pendientes**: Declaración reescrita (el texto actual queda hasta entonces, sin PDF) y validación del logo.

## Supuestos inferidos

### SU-01 — La sección se crea con cuentas de la facultad
**Origen**: PRD. **Riesgo si es falso**: no hay forma de publicar. **Estado**: la integración en la web de la FRM se confirmó el 11/11; falta el alta de Belén como editora (contacto del administrador web pendiente).

### SU-02 — El Ateneo aporta textos, logo e información de eventos
**Origen**: PRD. **Riesgo**: placeholders sin completar. **Estado**: ya entregaron la Declaración de Principios, documentos históricos, el logo y 4 fotos (quedan fuera del repo hasta usarlos en C-03). Faltan: usuario de Instagram y datos de cada próxima charla.

### SU-03 — Las miniaturas pueden derivarse de la URL de YouTube
**Origen**: inferencia (mockups muestran «Miniatura de YouTube»). **Riesgo**: dependencia de formato de URL externo/hotlinking. **Validar**: probar `img.youtube.com/vi/<id>/hqdefault.jpg` en el entorno WP.

### SU-04 — La mayoría de los visitantes llega desde el celular
**Origen**: PRD (mobile-first). **Validar**: analítica posterior si existe.

### SU-05 — Los años del borrador (`anio_aprox`, `anio` en `charlas.js`) son aproximados
**Origen**: borrador («hace X años» al 06/11/2026). **Riesgo**: años incorrectos en fichas. **Validar**: revisión con el Ateneo.
