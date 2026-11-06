# Tasks

> Sin TDD en este change: no hay lógica (Strict TDD aplica solo al buscador/filtro de C-04, ver `design.md` D9). Cada tarea se verifica por inspección o por comando, como indica su descripción. Contrato visual: `design-system/components.html` y `docs/mockups/` (`inicio-escritorio.png`, `videoteca-escritorio.png`, `inicio-celular.png`).

## 1. Estructura y tooling

- [x] 1.1 Crear `css/`, `js/.gitkeep` y `tests/.gitkeep` (sin tocar `data/`) y verificar con `ls` que existen `css/`, `js/`, `data/` y `tests/` en la raíz
- [x] 1.2 Crear `package.json` según `design.md` D8 (solo `name`, `private`, `description`, `scripts.test = "node --test"`, sin dependencias) y verificar que `npm test` sin `npm install` sale con código 0, informa «tests 0» y no crea `node_modules/`

## 2. Hoja de estilos `css/estilos.css`

- [x] 2.1 Escribir la cabecera (comentario «Tokens: design-system rev. 1» + nota de sincronía) y el `@import` de Google Fonts copiado de `tokens.css` como primera regla (D6); verificar en DevTools > Red que cargan Dosis, Open Sans y Baskervville
- [x] 2.2 Copiar el bloque de variables de `design-system/tokens.css` bajo `:root, .aac-web` (D1) y verificar la paridad con un comando de una línea (`grep -o -- '--[a-z0-9-]*: *[^;]*' ` sobre ambos archivos y `diff`) sin diferencias en las variables de `tokens.css`
- [x] 2.3 Agregar el bloque separado «Derivados de componentes (components.html rev. 1)» con `--aac-rojo-hover`, `--aac-azul-hover`, `--blanco-translucido`, `--texto-boton` (D4) y verificar que cada valor coincide exactamente con el literal de `components.html`
- [x] 2.4 Agregar la base de `.aac-web` (D2): `box-sizing`, fuente/tamaño/interlineado/color/fondo desde tokens, `min-height: 100dvh`, `h1–h3` en Dosis con sus tamaños, enlaces en `--aac-azul`, `.wrap` con `--ancho-contenido`; verificar en DevTools que un párrafo dentro de `.aac-web` mide 18 px en Open Sans y un `h1` usa Dosis
- [x] 2.5 Agregar foco visible (`.aac-web :focus-visible` con `--foco`, `--foco-contorno`, `outline-offset`) y el bloque `prefers-reduced-motion` acotado (D3); verificar recorriendo con Tab (anillo amarillo con contorno negro, también sobre el pie negro) y emulando `prefers-reduced-motion: reduce` en DevTools (botones sin transición)
- [x] 2.6 Agregar barra superior (`.topbar`, con `--texto-chico` según D5), navegación (`.nav`, logo 56 px, enlaces con alto `--objetivo-minimo`, `aria-current="page"` en azul con subrayado rojo), botones (`.btn`, `.btn-rojo`, `.btn-azul`, `.btn-blanco`, `.btn-borde`, `.fila`) y pie (`.pie`, títulos en Baskervville, enlaces blancos con alto mínimo `--objetivo-minimo`), todo bajo `.aac-web` y con tokens; verificar con `grep` que fuera de los bloques de variables no hay literales hex, `rgb(`, nombres de fuente ni `!important` (salvo movimiento reducido), y que ninguna regla empieza por `html`, `body`, `*` o un selector de elemento sin `.aac-web`

## 3. Páginas esqueleto

- [x] 3.1 Crear `index.html` según `design.md` D7 (doctype, `lang="es"`, charset, viewport, título, `preconnect`, `<style>body{margin:0}</style>` comentado como solo-local, `css/estilos.css`, contenedor `.aac-web` con barra superior, `header.nav` con logo `design-system/assets/logo.png` y `alt`, `nav aria-label="Principal"` con «Inicio» `aria-current="page"`, `main` con `h1` del mockup, placeholder `[Contenido pendiente: C-03]`, botón azul «Ver la videoteca» → `videoteca.html`, y `footer.pie id="contacto"` con correo `mailto:`, dirección, YouTube con `rel="noopener noreferrer"` y placeholders de Instagram/Facebook); verificar abriéndola por `file://` sin errores de consola y comparándola con `docs/mockups/inicio-escritorio.png` (barra, nav, pie)
- [x] 3.2 Crear `videoteca.html` con la misma estructura, título «Videoteca — Ateneo Amigos de la Ciencia», «Videoteca» con `aria-current="page"`, `h1` «Videoteca», placeholder `[Contenido pendiente: C-04]` y botón «Volver al inicio»; verificar por `file://` sin errores de consola, que la navegación Inicio ↔ Videoteca funciona en ambos sentidos y que solo un enlace por página tiene `aria-current`
- [x] 3.3 Validar ambas páginas con un validador HTML (p. ej. validator.w3.org/nu, subiendo el archivo) y verificar cero errores; revisar el texto de ambas y confirmar que no hay fechas, disertantes, títulos, URLs ni usuarios inventados (solo datos de la KB/PRD o `[…]`)

## 4. README

- [x] 4.1 Escribir `README.md` en la raíz: qué es (sección del Ateneo Amigos de la Ciencia en la web de la UTN FRM), estructura de carpetas (KB 08), cómo abrir en local (doble clic sobre el HTML, o un servidor estático cualquiera, p. ej. `python -m http.server`, sin agregar dependencias al proyecto), cómo correr los tests (`npm test` / `node --test`, Node 22+), reglas clave (prefijo `.aac-web`, tokens, sin build) y enlaces a `design-system/`, `knowledge-base/` y `CHANGES.md`; verificar siguiendo el README desde cero que las páginas abren y `npm test` sale con código 0

## 5. Verificación integral

- [x] 5.1 Comparar ambas páginas con `design-system/components.html` a 390×844 y 1440×900 (barra superior, nav, botón, pie): colores, tipografías, tamaños y espaciados iguales salvo el desvío documentado D5; guardar capturas en `openspec/changes/c-01-base-y-estilos/verify/` si hay navegador automatizado (si no, registrar `Visual verify: manual`) y anotar el resultado en `design.md` §UI Mockups
- [x] 5.2 Probar el aislamiento con una página temporal en el scratchpad (fuera del repo) que cargue `css/estilos.css` y tenga contenido fuera de `.aac-web` (párrafo, `h1`, enlace, botón con transición): verificar que conserva los estilos por defecto del navegador, su foco y su transición aun con movimiento reducido emulado
- [x] 5.3 Medir en DevTools el alto de enlaces de nav, botones y enlaces del pie (≥ 44 px) y re-ejecutar `npm test` (código 0); confirmar con la autora el desvío D5 (barra superior a 16 px)

## Workflow follow-up

- Marcar `[x]` C-01 en `CHANGES.md` y archivar con `/opsx:archive c-01-base-y-estilos` tras la revisión de la autora.
- No commitear sin pedido explícito (regla dura del proyecto).
