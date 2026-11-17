# Spec Delta

## MODIFIED Requirements

### Requirement: Estructura de carpetas del proyecto
El repo SHALL tener en la raíz las carpetas `css/`, `js/`, `data/`, `tests/` y `scripts/`, y las páginas `index.html` (Inicio), `videoteca.html` (Videoteca) y `quienes-somos.html` (Quiénes somos), según `knowledge-base/08_arquitectura_propuesta.md`. `scripts/` contiene solo herramientas de desarrollo (derivación, validación y cruce de datos) y MUST NOT ser necesaria para publicar ni para ver el sitio.

#### Scenario: Carpetas presentes tras clonar
- **WHEN** alguien clona el repo
- **THEN** encuentra `css/estilos.css`, las carpetas `js/`, `data/`, `tests/` y `scripts/` y las tres páginas en la raíz

#### Scenario: Publicar sin scripts
- **WHEN** se publica el sitio copiando las páginas, `css/`, `js/` y `data/`
- **THEN** el sitio funciona sin ningún archivo de `scripts/`

### Requirement: Páginas esqueleto válidas
`index.html`, `videoteca.html` y `quienes-somos.html` SHALL ser documentos HTML5 válidos en español (`lang="es"`), con `charset` UTF-8, `viewport`, título descriptivo, la hoja de estilos del sitio y todo su contenido visible dentro de un único contenedor `.aac-web`.

#### Scenario: Abrir una página directamente desde el disco
- **WHEN** se abre cualquiera de las tres páginas con doble clic (protocolo `file://`)
- **THEN** la página se muestra con los estilos del sitio y la consola del navegador no muestra errores

#### Scenario: Validación HTML
- **WHEN** se pasa cada página por un validador HTML
- **THEN** no hay errores de marcado

### Requirement: Estructura semántica común
Cada página SHALL mostrar la barra superior, un encabezado con el logo (con texto alternativo) y la navegación principal etiquetada, un `main` con su título `h1`, y el pie con el correo de contacto del Ateneo; la página actual MUST estar marcada en la navegación con `aria-current="page"`. La barra, el encabezado, la navegación y el pie provienen de la definición compartida del sitio.

#### Scenario: Página actual en Inicio
- **WHEN** se abre `index.html`
- **THEN** el enlace «Inicio» de la navegación tiene `aria-current="page"` y ningún otro enlace lo tiene

#### Scenario: Página actual en Videoteca
- **WHEN** se abre `videoteca.html`
- **THEN** el enlace «Videoteca» tiene `aria-current="page"` y ningún otro enlace lo tiene

#### Scenario: Página actual en Quiénes somos
- **WHEN** se abre `quienes-somos.html`
- **THEN** el enlace «Quiénes somos» tiene `aria-current="page"` y ningún otro enlace lo tiene

#### Scenario: Navegación entre páginas
- **WHEN** se activa en el menú el enlace a otra página desde cualquiera de las tres
- **THEN** se abre esa página
