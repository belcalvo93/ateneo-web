# Proposal

## Why

El repo hoy solo tiene documentación (`docs/`, `knowledge-base/`, `design-system/`, `data/charlas-borrador.json`): no existe todavía `css/`, `js/` ni ninguna página. Antes de construir la portada (C-03) y la videoteca (C-04) hace falta una base común que traduzca el sistema de diseño aprobado (rev. 1, modo `system-only`) a una hoja de estilos real, aislada para convivir con Elementor, y una estructura de proyecto que cualquiera pueda abrir y probar sin instalar nada. C-01 no depende de la reunión del 10/11, por eso es el punto de arranque del roadmap.

## What Changes

- Estructura de carpetas según KB 08: `css/`, `js/`, `data/` (ya existe), `tests/`, y dos páginas esqueleto válidas en la raíz: `index.html` (Inicio) y `videoteca.html` (Videoteca).
- `css/estilos.css`: réplica de las variables de `design-system/tokens.css` (color, tipografía, espaciado, radios, sombras, foco, movimiento) + `prefers-reduced-motion`, todo acotado al contenedor `.aac-web`.
- Base accesible bajo `.aac-web`: letra base 18 px, foco visible (anillo amarillo con contorno negro), objetivos interactivos ≥ 44 px.
- Carga de tipografías Dosis, Open Sans y Baskervville (Google Fonts, las mismas de la FRM).
- Estilos base de los componentes compartidos por ambas páginas, tomados de `design-system/components.html`: barra superior, navegación principal, botones (rojo, azul, blanco, borde) y pie.
- `README.md` del repo: qué es, estructura, cómo abrirlo en local y cómo correr los tests (`node --test`).
- `package.json` mínimo, sin dependencias, con un único script `test` (`node --test`).

Fuera de alcance: contenido real de las páginas (hero, próxima charla, fichas, buscador, chips → C-03/C-04), datos (`data/charlas.json`, próxima charla → C-02), menú hamburguesa y ajuste responsive fino (C-05), empaquetado/inlineado para Elementor (C-06), lógica JS y tests unitarios (C-04).

## Capabilities

### New Capabilities
- `estilos-base`: hoja de estilos compartida del sitio — tokens de diseño, aislamiento bajo `.aac-web`, tipografías, base accesible (18 px, foco, 44 px, movimiento reducido) y estilos de componentes comunes (barra superior, nav, botones, pie).
- `estructura-del-sitio`: estructura de archivos del proyecto, páginas esqueleto, README y comando de tests sin dependencias.

### Modified Capabilities
<!-- Ninguna: no hay specs previas en openspec/specs/. -->

## Impact

- Archivos nuevos: `css/estilos.css`, `index.html`, `videoteca.html`, `README.md`, `package.json`, carpetas `js/` y `tests/` (vacías salvo un `.gitkeep`).
- Sin dependencias, sin build, sin cambios en `design-system/` (se lee como fuente; `tokens.css` no se modifica ni cambia su `Revision:`).
- C-02, C-03 y C-04 se apoyan en estas clases y variables; C-06 reutiliza el aislamiento `.aac-web` al pegar en Elementor.
- Governance: BAJO.
