# estructura-del-sitio Specification

## Purpose

Define la estructura de archivos del proyecto, las páginas esqueleto del sitio y cómo se abre y se prueba localmente sin instalar dependencias ni usar un paso de build.

## Requirements

### Requirement: Estructura de carpetas del proyecto
El repo SHALL tener en la raíz las carpetas `css/`, `js/`, `data/` y `tests/`, y las páginas `index.html` (Inicio) y `videoteca.html` (Videoteca), según `knowledge-base/08_arquitectura_propuesta.md`.

#### Scenario: Carpetas presentes tras clonar
- **WHEN** alguien clona el repo
- **THEN** encuentra `css/estilos.css`, las carpetas `js/`, `data/` y `tests/` (aunque `js/` y `tests/` todavía no tengan código) y las dos páginas en la raíz

### Requirement: Páginas esqueleto válidas
`index.html` y `videoteca.html` SHALL ser documentos HTML5 válidos en español (`lang="es"`), con `charset` UTF-8, `viewport`, título descriptivo, la hoja de estilos del sitio y todo su contenido visible dentro de un único contenedor `.aac-web`.

#### Scenario: Abrir una página directamente desde el disco
- **WHEN** se abre `index.html` o `videoteca.html` con doble clic (protocolo `file://`)
- **THEN** la página se muestra con los estilos del sitio y la consola del navegador no muestra errores

#### Scenario: Validación HTML
- **WHEN** se pasa cada página por un validador HTML
- **THEN** no hay errores de marcado

### Requirement: Estructura semántica común
Cada página esqueleto SHALL incluir la barra superior, un encabezado con el logo (con texto alternativo) y la navegación principal etiquetada, un `main` con su título `h1`, y el pie con el correo de contacto del Ateneo; la página actual MUST estar marcada en la navegación con `aria-current="page"`.

#### Scenario: Página actual en Inicio
- **WHEN** se abre `index.html`
- **THEN** el enlace «Inicio» de la navegación tiene `aria-current="page"` y ningún otro enlace lo tiene

#### Scenario: Página actual en Videoteca
- **WHEN** se abre `videoteca.html`
- **THEN** el enlace «Videoteca» tiene `aria-current="page"` y ningún otro enlace lo tiene

#### Scenario: Navegación entre páginas
- **WHEN** se activa el enlace «Videoteca» desde Inicio o «Inicio» desde Videoteca
- **THEN** se abre la otra página

### Requirement: Sin datos inventados en los esqueletos
Las páginas esqueleto MUST NOT contener fechas, disertantes, títulos de charlas, URLs ni usuarios de redes inventados; el contenido pendiente SHALL quedar como placeholder marcado entre corchetes (`[…]`).

#### Scenario: Revisión de contenido
- **WHEN** se revisa el texto de las páginas esqueleto
- **THEN** solo aparecen datos documentados en la knowledge base (por ejemplo, el correo `ateneoac.mo@gmail.com` y la dirección de la FRM) o placeholders entre corchetes

### Requirement: Comando de tests sin dependencias
El repo SHALL tener un `package.json` sin dependencias ni `devDependencies`, con un único script `test` que ejecute el runner nativo `node --test`.

#### Scenario: Tests sin archivos de prueba todavía
- **WHEN** se ejecuta `npm test` (o `node --test`) en la raíz con una versión LTS vigente de Node (22 o superior), antes de que existan archivos de prueba
- **THEN** el comando termina con código de salida 0 informando 0 tests

#### Scenario: Sin instalación previa
- **WHEN** se clona el repo y se ejecuta `npm test` sin correr `npm install`
- **THEN** el comando funciona y no se crea `node_modules/`

### Requirement: README del repo
El repo SHALL tener un `README.md` en la raíz que explique qué es el proyecto, la estructura de carpetas, cómo abrir las páginas en local y cómo correr los tests con `node --test`.

#### Scenario: Persona nueva en el proyecto
- **WHEN** alguien sin contexto lee el `README.md`
- **THEN** puede abrir las páginas en su navegador y correr los tests siguiendo solo esas instrucciones
