# configuracion-sitio Specification

## Purpose
Define el archivo editable con los datos generales del sitio (contacto, cifras de portada, redes y fotos), para que agregar o quitar una red o una foto no requiera tocar el HTML.

## Requirements

### Requirement: Archivo de configuración del sitio
`data/sitio.js` SHALL definir `window.AAC_SITIO` con: `correo` (correo de contacto), `canal_youtube` (enlace al canal), `conferencias` (texto de la cifra de portada), `direccion` (dónde funciona el Ateneo), `mapa_url` (enlace al mapa de esa dirección, o `null`), `redes` (lista) y `fotos` (lista), cada uno con un comentario breve que diga qué escribir. El archivo MUST poder cargarse con `<script src>` o pegarse en línea junto a los demás archivos de datos.

#### Scenario: Campos presentes
- **WHEN** se lee `window.AAC_SITIO`
- **THEN** tiene los siete campos y ningún otro

#### Scenario: Comentarios para quien edita
- **WHEN** alguien abre `data/sitio.js` en un editor de texto
- **THEN** cada campo tiene al lado un comentario con un ejemplo de qué escribir

### Requirement: Lista configurable de redes
`redes` SHALL ser una lista de elementos `{ nombre, url }`, donde `url` es un enlace `https://`, `null` o un placeholder entre corchetes. Agregar, quitar o reordenar una red MUST hacerse solo editando esta lista.

#### Scenario: Agregar una red
- **WHEN** se agrega `{ nombre: "Facebook", url: "https://…" }` a la lista
- **THEN** el sitio muestra esa red sin cambios en el HTML

#### Scenario: Quitar una red
- **WHEN** se borra un elemento de la lista
- **THEN** el sitio deja de mostrar esa red

### Requirement: Valores iniciales de las redes
En su estado inicial, `redes` SHALL contener, en este orden: YouTube con el enlace del canal del Ateneo, el Canal de Difusión de WhatsApp con su enlace oficial (`https://whatsapp.com/channel/0029VbDjwCbI7BeKsvprkr3t`) e Instagram con un placeholder entre corchetes. MUST NOT incluir enlaces ni usuarios inventados.

#### Scenario: Estado inicial
- **WHEN** se crea el archivo en este change
- **THEN** YouTube y WhatsApp tienen su enlace real e Instagram tiene un placeholder

### Requirement: Lista de fotos de la galería
`fotos` SHALL ser una lista de elementos `{ archivo, alt }`, con la ruta de la imagen dentro del sitio y su texto alternativo descriptivo. Solo se agregan fotos que el Ateneo autorizó para la web, optimizadas para la web y sin metadatos de ubicación. En su estado inicial contiene la foto grupal de integrantes, autorizada por el Ateneo.

#### Scenario: Estado inicial
- **WHEN** se lee `fotos` después de este change
- **THEN** tiene un solo elemento: `img/ateneo-integrantes.jpg` con un texto alternativo que describe la escena sin nombrar personas

#### Scenario: Foto sin metadatos
- **WHEN** se inspecciona `img/ateneo-integrantes.jpg`
- **THEN** no tiene metadatos EXIF (ni ubicación ni datos de la cámara) y mide como máximo 1600 px de ancho

#### Scenario: Foto nueva sin autorización
- **WHEN** alguien quiere sumar otra foto a la lista
- **THEN** la guía de edición indica que primero hace falta la autorización del Ateneo

### Requirement: Sin datos personales en la configuración
La configuración del sitio MUST NOT contener correos ni teléfonos personales; el único correo es el institucional de contacto del Ateneo.

#### Scenario: Revisión del archivo
- **WHEN** se revisa `data/sitio.js`
- **THEN** el único correo que aparece es `ateneoac.mo@gmail.com` y no hay números de teléfono

### Requirement: Dirección y mapa
En su estado inicial, `direccion` SHALL ser la dirección documentada de la UTN FRM (Rodríguez 273, Ciudad de Mendoza) y `mapa_url` un enlace `https://` de búsqueda de esa dirección en Google Maps. `mapa_url` en `null` MUST ser un estado válido.

#### Scenario: Estado inicial
- **WHEN** se crea el campo en este change
- **THEN** `direccion` menciona «Rodríguez 273» y `mapa_url` abre Google Maps con esa dirección

#### Scenario: Sin mapa
- **WHEN** `mapa_url` es `null`
- **THEN** el validador no informa error ni aviso por ese campo

### Requirement: Formulario de inscripción
`data/sitio.js` SHALL tener `formulario_inscripcion` con la URL `https` del formulario de Google vigente para hacerse miembro. El validador SHALL tratar como error una URL que no sea `https` y como aviso un placeholder.

#### Scenario: URL vigente
- **WHEN** se carga `data/sitio.js`
- **THEN** `formulario_inscripcion` apunta al formulario de `docs.google.com` informado por la autora el 17/11/2026, no al `forms.gle` del sitio viejo

### Requirement: Mesa Organizadora en la configuración
`data/sitio.js` SHALL tener `mesa_organizadora` con `mostrar` (booleano), `nombre` (del órgano) e `integrantes` (lista de `{ nombre, apellido }`), sin cargos, fotos, correos ni teléfonos. Con `mostrar: false` la sección no se muestra.

#### Scenario: Valor inicial
- **WHEN** se crea `mesa_organizadora` en este change
- **THEN** tiene `nombre: "Mesa Organizadora"`, los 6 integrantes confirmados por el Ateneo el 17/11/2026 y `mostrar: true`

#### Scenario: Integrante con dato de más
- **WHEN** un integrante trae un campo `correo`
- **THEN** el validador lo informa como campo desconocido y termina con código 1

### Requirement: PDF de la Declaración
`data/sitio.js` SHALL tener `declaracion_pdf` con la ruta o URL del PDF de la Declaración de Principios que se ofrece para descargar, o `null` si no se ofrece ninguno.

#### Scenario: Sin PDF
- **WHEN** `declaracion_pdf` es `null`
- **THEN** la página no muestra el botón de descarga

### Requirement: Foto principal de Quiénes somos
`data/sitio.js` SHALL admitir `foto_principal` (`{ archivo, alt }` o `null`). Queda en `null` hasta que el Ateneo mande una foto actual: la foto grupal del Salón de Actos no se usa (es vieja).

#### Scenario: Foto sin texto alternativo
- **WHEN** `foto_principal` trae `archivo` pero no `alt`
- **THEN** el validador informa el `alt` faltante y termina con código 1

### Requirement: Zoom del semestre
`data/sitio.js` SHALL tener `zoom_url_semestre` con el link recurrente de Zoom del semestre (público, autorizado por el Ateneo) o `null`. El validador MUST tratar como error un valor que no empiece con `https://`.

#### Scenario: Link cargado
- **WHEN** `zoom_url_semestre` es `https://utn.zoom.us/j/…`
- **THEN** el validador lo acepta sin error ni aviso

#### Scenario: Link sin https
- **WHEN** `zoom_url_semestre` es `utn.zoom.us/j/…`
- **THEN** el validador informa el campo y termina con código 1

### Requirement: Entrevistas de radio
`data/sitio.js` SHALL tener `entrevistas_radio`, una lista (inicialmente vacía) de `{ titulo, url, fecha }` con `url` `https` y `fecha` opcional en `DD/MM/AAAA`. Cualquier otro campo MUST ser un error del validador.

#### Scenario: Entrevista mal escrita
- **WHEN** una entrevista trae `url: "http://…"` y un campo `otro`
- **THEN** el validador informa los dos campos y termina con código 1

### Requirement: Video de presentación
`data/sitio.js` SHALL tener `video_presentacion`: el enlace de YouTube del video institucional del Ateneo, o `null` mientras no esté publicado. El validador MUST tratar como error cualquier otro valor.

#### Scenario: Enlace que no es de YouTube
- **WHEN** `video_presentacion` es `https://vimeo.com/1`
- **THEN** el validador informa el campo y termina con código 1
