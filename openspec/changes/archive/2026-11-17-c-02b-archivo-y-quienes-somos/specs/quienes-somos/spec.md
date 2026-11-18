## ADDED Requirements

### Requirement: Video de presentación
La página SHALL tener, antes de la historia, una sección con el video de presentación del Ateneo (`video_presentacion` de `data/sitio.js`, un video de YouTube) como miniatura enlazada, y la cita del origen de «ateneo» (el templo de Palas Atenea) destacada con la fuente de títulos. Mientras `video_presentacion` sea `null`, la sección MUST NOT verse. No se usan el párrafo final lírico ni las imágenes de stock del video.

#### Scenario: Sin video
- **WHEN** `video_presentacion` es `null`
- **THEN** la página no muestra la sección ni la cita, y empieza por la historia

#### Scenario: Con video
- **WHEN** `video_presentacion` es un enlace de YouTube
- **THEN** la sección muestra la cita, la miniatura del video y el enlace «Ver el video de presentación en YouTube»

#### Scenario: Cita destacada accesible
- **WHEN** un lector de pantalla recorre la sección
- **THEN** la cita del origen de «ateneo» se anuncia como cita y su texto es el mismo que se ve

### Requirement: Mesa Organizadora ocultable
La página SHALL mostrar, si `mesa_organizadora.mostrar` es `true`, una sección con el nombre del órgano tomado de `data/sitio.js` y sus integrantes en orden alfabético por apellido (sin distinguir tildes), sin fotos ni cargos, con los nombres insertados como texto. Si es `false` o falta el dato, la sección MUST NOT verse ni quedar en el árbol de accesibilidad.

#### Scenario: Orden alfabético
- **WHEN** la sección se muestra
- **THEN** se ven los 6 integrantes de la Mesa Organizadora, el primero «Adolfo Anunziata» y el último «Luis P. Tittarelli»

#### Scenario: Orden por apellido
- **WHEN** se ordena la lista
- **THEN** queda Anunziata, Blanco, Pía, Salassa, Serdoch y Tittarelli

#### Scenario: Sección oculta
- **WHEN** `mesa_organizadora.mostrar` es `false`
- **THEN** la página no muestra la sección y no queda un título vacío

### Requirement: Sumate al Ateneo
La página SHALL tener un bloque «Sumate al Ateneo» que diga que ser miembro es gratis, no implica obligaciones y se puede cancelar cuando se quiera, con un botón «Sumate al Ateneo» al `formulario_inscripcion` de `data/sitio.js`, con `rel="noopener noreferrer"`. Si la URL falta o no es segura, el botón MUST NOT mostrarse.

#### Scenario: Ir al formulario
- **WHEN** se activa «Sumate al Ateneo» con el mouse o el teclado
- **THEN** se abre el formulario de inscripción vigente

#### Scenario: Sin URL
- **WHEN** `formulario_inscripcion` falta en `data/sitio.js`
- **THEN** el texto del bloque se lee y no hay botón roto

### Requirement: Foto principal junto al título
El encabezado de la página SHALL mostrar junto al título la foto `foto_principal` de `data/sitio.js`, con su texto alternativo, solo si es un archivo del propio sitio. Sin foto, el encabezado MUST verse completo sin hueco.

#### Scenario: Con foto
- **WHEN** `foto_principal` apunta a una foto del sitio
- **THEN** en escritorio la foto se ve a la derecha del título y en celular debajo, con su texto alternativo

#### Scenario: Sin foto principal
- **WHEN** `foto_principal` es `null`
- **THEN** el encabezado muestra solo el título y la bajada

### Requirement: En la radio
La página SHALL tener una sección «En la radio» con las entrevistas de `entrevistas_radio` de `data/sitio.js` (título como enlace `https` con `rel="noopener noreferrer"` y fecha si la hay), solo si la lista tiene al menos una entrevista válida. Con la lista vacía, la sección MUST NOT verse.

#### Scenario: Sin entrevistas
- **WHEN** `entrevistas_radio` es `[]`
- **THEN** la página no muestra la sección «En la radio»

#### Scenario: Con una entrevista
- **WHEN** `entrevistas_radio` tiene `{ titulo, url, fecha: "10/11/2026" }`
- **THEN** la sección muestra el título como enlace y «10 de noviembre de 2026»

## MODIFIED Requirements

### Requirement: Cómo funcionamos
La página SHALL indicar el día y la hora habituales de las charlas, que se hacen por Zoom (presencial solo por excepción) y que la entrada es libre y gratuita, con un enlace a la próxima charla de la portada.

#### Scenario: Modalidad
- **WHEN** se lee «Cómo funcionamos»
- **THEN** el texto dice que las charlas son por Zoom y no las ubica en el Salón de Actos

#### Scenario: Enlace a la próxima charla
- **WHEN** se activa «Ver la próxima charla»
- **THEN** se abre la portada en la tarjeta de próxima charla


### Requirement: Proponer una charla
La página SHALL tener una sección identificable por enlace directo con qué enviar para proponer una charla, qué temas se aceptan, el texto completo de la Declaración de Principios v2.4 en un bloque desplegable, un botón «Descargar en PDF» cuando `declaracion_pdf` tiene valor, y un botón «Enviar mi propuesta» que abre un correo al Ateneo. MUST NOT enlazar a `bit.ly`.

#### Scenario: Enlace directo a la sección
- **WHEN** se abre `quienes-somos.html#proponer`
- **THEN** la página se muestra en la sección «Proponer una charla»

#### Scenario: Leer la Declaración
- **WHEN** se activa el bloque desplegable con el mouse o con el teclado
- **THEN** se muestra el texto completo de la Declaración de Principios sin salir de la página

#### Scenario: Enviar una propuesta
- **WHEN** se activa «Enviar mi propuesta»
- **THEN** se abre un correo dirigido al correo de contacto del Ateneo

#### Scenario: Descargar la Declaración
- **WHEN** `declaracion_pdf` tiene valor y se activa «Descargar en PDF»
- **THEN** se descarga o abre el PDF, y el texto del botón indica que es un PDF
