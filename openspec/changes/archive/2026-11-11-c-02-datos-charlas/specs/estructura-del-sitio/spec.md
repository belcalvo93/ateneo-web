# Spec Delta — estructura-del-sitio

## MODIFIED Requirements

### Requirement: Estructura de carpetas del proyecto
El repo SHALL tener en la raíz las carpetas `css/`, `js/`, `data/`, `tests/` y `scripts/`, y las páginas `index.html` (Inicio) y `videoteca.html` (Videoteca), según `knowledge-base/08_arquitectura_propuesta.md`. `scripts/` contiene solo herramientas de desarrollo (derivación, validación y cruce de datos) y MUST NOT ser necesaria para publicar ni para ver el sitio.

#### Scenario: Carpetas presentes tras clonar
- **WHEN** alguien clona el repo
- **THEN** encuentra `css/estilos.css`, las carpetas `js/`, `data/`, `tests/` y `scripts/` (aunque `js/` todavía no tenga código) y las dos páginas en la raíz

#### Scenario: Publicar sin scripts
- **WHEN** se publica el sitio copiando las páginas, `css/`, `js/` y `data/`
- **THEN** el sitio funciona sin ningún archivo de `scripts/`

### Requirement: Comando de tests sin dependencias
El repo SHALL tener un `package.json` sin dependencias ni `devDependencies`, con un único script `test` que ejecute el runner nativo `node --test`.

#### Scenario: Tests sin archivos de prueba todavía
- **WHEN** se ejecuta `npm test` (o `node --test`) en la raíz con una versión LTS vigente de Node (22 o superior), antes de que existan archivos de prueba
- **THEN** el comando termina con código de salida 0 informando 0 tests

#### Scenario: Tests del proyecto en verde
- **WHEN** se ejecuta `npm test` (o `node --test`) en la raíz con una versión LTS vigente de Node (22 o superior)
- **THEN** se ejecutan los archivos `tests/*.test.js` y el comando termina con código de salida 0

#### Scenario: Sin instalación previa
- **WHEN** se clona el repo y se ejecuta `npm test` sin correr `npm install`
- **THEN** el comando funciona y no se crea `node_modules/`

#### Scenario: Sin herramientas externas
- **WHEN** se ejecuta `npm test` en una máquina sin `yt-dlp` y sin conexión a internet
- **THEN** el comando termina con código de salida 0
