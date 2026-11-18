## ADDED Requirements

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
