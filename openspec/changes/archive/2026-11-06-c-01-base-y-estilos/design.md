# Design

## Context

Motivación y alcance: ver `proposal.md`. Requisitos: `specs/estilos-base/spec.md` y `specs/estructura-del-sitio/spec.md`.

Estado observado del repo (06/11/2026):

- No existen `css/`, `js/`, `tests/`, `index.html`, `videoteca.html`, `README.md` ni `package.json`. Sí existen `data/charlas-borrador.json`, `docs/` (PRD + mockups), `knowledge-base/` y `design-system/` (rev. 1, aprobado, modo `system-only`).
- `design-system/tokens.css` declara las variables en `:root` y trae dos cosas que **no se pueden copiar tal cual** a un sitio que se pega en Elementor:
  1. `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; … } }` → el selector universal apagaría las animaciones de toda la página anfitriona.
  2. `components.html` define estilos sobre `body`, `h1–h3`, `a`, `:focus-visible`, `footer`, `input[type=search]` sin prefijo → afectarían al tema de WordPress.
- `components.html` usa algunos valores literales que no están en `tokens.css`: `#fff` (equivale a `--utn-blanco`), hovers `#8f0000` (rojo), `#003a73` (azul), `rgba(255,255,255,.14)` (botón de borde), `#d6e3f4` (parte), `#c9d6e8` (texto de miniatura), y tamaños `.8rem`, `.95rem`, `.85rem`, `1.25rem`, `1.1rem`.
- Node disponible en la máquina de la autora: v24.19.0. Verificado: `node --test` sin archivos de prueba termina con código 0 («tests 0»); en cambio `node --test tests/` falla si no hay archivos que coincidan.
- Política de diseño `system-only`: no se generan mockups para este change. **Decision: no (project policy).** El contrato visual son `design-system/components.html` y `docs/mockups/` (inicio-escritorio, videoteca-escritorio, inicio-celular).

## Goals / Non-Goals

**Goals:**
- Una sola hoja `css/estilos.css` que C-03 y C-04 reutilicen sin redefinir tokens ni componentes comunes.
- Aislamiento real: cero efectos sobre la página anfitriona aun cargando la hoja completa.
- Que `design-system/tokens.css` siga siendo la fuente de verdad y que la paridad sea fácil de comprobar a mano.

**Non-Goals:**
- Estilos de hero, próxima charla, fichas, buscador, chips, tarjetas de tema, «Proponer una charla» (llegan con C-03/C-04, también desde `components.html`).
- Menú hamburguesa y breakpoints finos (C-05). En C-01 la nav solo hace `flex-wrap`, como en `components.html`.
- Inlineado para el widget de Elementor (C-06).
- Tests unitarios: no hay lógica en este change (ver «Verificación»).

## Decisions

### D1 — Variables declaradas en `:root, .aac-web`, copiadas de `tokens.css`
`css/estilos.css` replica el bloque de variables de `tokens.css` (mismos nombres y valores, mismo orden y comentarios de sección) bajo el selector `:root, .aac-web`.
- *Por qué `:root`*: lo pide CHANGES/KB 08 y permite usar los tokens en cualquier punto del documento propio.
- *Por qué también `.aac-web`*: si el tema de WordPress declara una variable homónima (`--texto`, `--borde`, `--esp-4` son nombres genéricos), la declaración en el contenedor gana por herencia para nuestro contenido.
- *Alternativa descartada*: `@import url('../design-system/tokens.css')` → arrastra la regla universal de movimiento reducido (rompe el aislamiento) y agrega un archivo más que hospedar en Elementor. *Alternativa descartada*: renombrar todas las variables con prefijo `--aac-` → rompe la paridad de nombres con el design system aprobado.
- Regla de sincronía: `tokens.css` es la fuente; si cambia, se sube su `Revision:` y se re-copia el bloque. Se deja un comentario en la cabecera de `estilos.css` con «Tokens: design-system rev. 1».

### D2 — Todo selector de elemento bajo `.aac-web`
Cada regla empieza por `.aac-web` (`.aac-web h1`, `.aac-web a`, `.aac-web :focus-visible`, `.aac-web .btn`…). El contenedor carga la base: `font: var(--texto-base)/var(--interlineado) var(--fuente-texto)`, `color: var(--texto)`, `background: var(--superficie-pagina)`, y `.aac-web, .aac-web *, .aac-web *::before, .aac-web *::after { box-sizing: border-box }`. Nada sobre `html`/`body` en `estilos.css`. En local, cada página esqueleto hace de «página anfitriona»: lleva en su `<head>` un único `<style>body{margin:0}</style>` (marcado con un comentario «solo para la vista local; no se pega en Elementor»), y el contenedor `.aac-web` ocupa la página (`min-height: 100dvh`). Así lo que se pega en Elementor (`estilos.css` + el contenido de `.aac-web`) es exactamente lo que se prueba en local.
- *Alternativa descartada*: un reset global tipo normalize → incompatible con el widget.
- Clases de componentes: se mantienen los nombres de `components.html` (`.topbar`, `.nav`, `.wrap`, `.btn`, `.btn-rojo`…) siempre bajo `.aac-web`, para que copiar de la referencia sea directo. El pie usa la clase `.pie` en vez del selector de elemento `footer` (evita depender de cuántos `footer` haya).

### D3 — Movimiento reducido acotado
```css
@media (prefers-reduced-motion: reduce) {
  :root, .aac-web { --transicion: 0ms; }
  .aac-web *, .aac-web *::before, .aac-web *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
```
Misma intención que `tokens.css`, sin tocar la página anfitriona.

### D4 — Valores literales de `components.html` como «derivados de componentes»
Para cumplir «NUNCA hardcodear colores/espaciados» sin inventar valores, `estilos.css` agrega, después del bloque copiado y claramente separado, un bloque **«Derivados de componentes (de `components.html`, rev. 1)»** con solo los que usa C-01:
`--aac-rojo-hover: #8F0000; --aac-azul-hover: #003A73; --blanco-translucido: rgba(255,255,255,.14); --texto-boton: 1rem;`. `#fff` se reemplaza por `var(--utn-blanco)`. Los demás literales (`#d6e3f4`, `#c9d6e8`, `.85rem`, `.95rem`…) se agregan en C-03/C-04 cuando se usen sus componentes.
- No son valores nuevos: ya están aprobados dentro de `components.html` rev. 1, por eso **no se modifica `tokens.css` ni se sube su revisión**. Se anota en la cabecera que, en la próxima revisión del design system, convendría promoverlos a `tokens.css`.
- *Alternativa descartada*: `color-mix()` para derivar los hovers → genera tonos levemente distintos a los aprobados.
- Las medidas de componentes que no son espaciado de diseño (altura del logo 56 px, grosor de borde 2–3 px) se dejan como en `components.html`.

### D5 — Barra superior a 16 px (desvío menor a confirmar)
`components.html` usa `.8rem` (12,8 px) en la barra superior. Eso choca con la regla del proyecto (texto ≥ 16 px; KB 08 §Accesibilidad, RN-AC-01). Se usa `var(--texto-chico)` (16 px) manteniendo Dosis, mayúsculas y `letter-spacing`. En celular la segunda frase de la barra puede pasar a otra línea (ya hace `flex-wrap`). **Supuesto**: la autora acepta este desvío; si prefiere el tamaño del mockup, es un cambio de una variable.

### D6 — Tipografías vía `@import` al inicio de `estilos.css`
Se copia la misma URL de Google Fonts de `tokens.css` (Baskervville 400/600, Dosis 400–700, Open Sans 400/600/700, `display=swap`) como primera línea de `estilos.css`. Cada familia en los tokens ya tiene respaldo genérico (`sans-serif`/`serif`).
- *Por qué `@import` y no `<link>` en el HTML*: el CSS que se pegue en el widget (C-06) arrastra la carga de fuentes solo; un `<link>` habría que acordarse de copiarlo aparte. Costo: una cadena de petición más; aceptable para este sitio. Las páginas esqueleto agregan `<link rel="preconnect">` a `fonts.googleapis.com` y `fonts.gstatic.com` para mitigar.

### D7 — Páginas esqueleto: estructura común, contenido pendiente
`index.html` y `videoteca.html` comparten: `<!doctype html>`, `lang="es"`, `meta charset`, `meta viewport`, `<title>` («Inicio — Ateneo Amigos de la Ciencia», «Videoteca — Ateneo Amigos de la Ciencia»), `<link rel="stylesheet" href="css/estilos.css">`, y dentro de `<div class="aac-web">`:
- barra superior (`UTN · Facultad Regional Mendoza` / `Sección de la web de la facultad`, como en `components.html`);
- `header.nav` con logo `design-system/assets/logo.png` (`alt="Logo del Ateneo Amigos de la Ciencia (AAC)"`) y `nav aria-label="Principal"` con los 6 enlaces del mockup. Enlaces: Inicio → `index.html`, Videoteca → `videoteca.html`; Próxima charla, Quiénes somos, Proponer una charla → anclas de `index.html` (`#proxima-charla`, `#quienes-somos`, `#proponer`) que C-03 creará; Contacto → `#contacto` (el pie). `aria-current="page"` en la página actual;
- `main` con un `h1` («Ciencia y cultura abiertas a toda la comunidad» en Inicio, tomado del mockup; «Videoteca» en Videoteca) y un párrafo placeholder `[Contenido pendiente: C-03]` / `[Contenido pendiente: C-04]`. Para verificar los botones con un caso real, Inicio incluye un único botón azul «Ver la videoteca» (enlace a `videoteca.html`) y Videoteca uno «Volver al inicio»; las demás variantes (rojo, blanco, borde) se verifican contra `components.html`.
- `footer.pie id="contacto"`: título «Contacto» (Baskervville), `ateneoac.mo@gmail.com` como `mailto:`, dirección «UTN · Facultad Regional Mendoza · Rodríguez 273, Ciudad de Mendoza». Redes: «YouTube · @ateneoamigosdelasciencias» enlazando a `https://www.youtube.com/@ateneoamigosdelasciencias-2269` (documentada en `docs/PRD.md` y KB 02) con `target` por defecto y `rel="noopener noreferrer"`; «Instagram · [usuario a confirmar]», «Facebook · [página a confirmar]» como texto (sin enlace inventado).
- El logo se referencia desde `design-system/assets/` (ruta única y estable; reemplazar el archivo actualiza el sitio). No se copia a otra carpeta.
- Sin JS en este change: no se incluye `brand.js` (el nombre aparece en `alt` y `<title>`; si se quiere el binding `[data-brand-name]`, lo decide C-03).

### D8 — `package.json` y tests
```json
{ "name": "ateneo-web", "private": true, "description": "…", "scripts": { "test": "node --test" } }
```
Sin `dependencies`, sin `devDependencies`, sin `type`, sin `engines` obligatorio (se documenta Node 22+ en el README). `node --test` sin argumento: descubre `**/*.test.js` (incluye `tests/`), y con cero archivos sale con código 0, lo que evita que `npm test` falle hasta C-04. `tests/` y `js/` se versionan con un `.gitkeep`.

### D9 — Verificación sin TDD
Strict TDD aplica solo a la lógica de búsqueda/filtro (C-04, CHANGES y KB 08 §Testing). Este change no tiene lógica, así que no lleva tests unitarios ni se escriben tests triviales para «cumplir». La verificación es por inspección, guiada por los escenarios de los specs:
1. `npm test` → código 0, «tests 0», sin `node_modules/`.
2. Abrir ambas páginas por `file://` y en un servidor local; consola sin errores ni requests fallidos (salvo fuentes sin red).
3. Comparar a 390×844 y 1440×900 contra `design-system/components.html` y los mockups (barra superior, nav, botón, pie). Capturas en `openspec/changes/c-01-base-y-estilos/verify/` si hay navegador automatizado.
4. Paridad de tokens: listar las variables de `tokens.css` y de `estilos.css` y compararlas (comando de una línea con `grep`/`node -e`, sin agregar scripts al repo).
5. Aislamiento: página de prueba temporal (fuera del repo, en el scratchpad) con contenido fuera de `.aac-web` → no cambia.
6. Teclado: Tab por nav, botón y pie → foco visible; alto ≥ 44 px medido en DevTools.
7. `prefers-reduced-motion` emulado → sin transición en botones.
8. `grep` de literales hex/fuentes en reglas de componentes (fuera de los bloques de variables) → ninguno.

### Decisiones tomadas durante la implementación (aceptadas por la autora el 2026-11-06)

Estas decisiones no estaban en la propuesta original; se tomaron al aplicar el change y la autora las aceptó tras revisar `index.html` y `videoteca.html` en el navegador.

### D10 — Títulos del pie como `h2` con el tamaño visual de `h3`
`components.html` usa `h3` en el pie, pero en las páginas el pie viene justo después de un `h1`: el validador W3C marcaba un salto de nivel de encabezado. El pie usa `h2` y el CSS (`.aac-web .pie h2`) le da el tamaño de `--texto-h3` en Baskervville, así que visualmente no cambia.
- *Alternativa descartada*: dejar `h3` y aceptar el aviso del validador → peor estructura para lectores de pantalla (criterio de accesibilidad del proyecto).

### D11 — Pie en grilla de tres columnas
`.aac-web .pie .wrap` es una grilla `repeat(auto-fit, minmax(240px, 1fr))` con `gap: var(--esp-5)`: en escritorio muestra Contacto, Seguinos y Dónde estamos en columnas, como el mockup de Inicio; en celular colapsa a una columna sin media query. `components.html` solo mostraba un pie de una columna.

### D12 — Padding vertical en `main.wrap`
`.aac-web main.wrap` tiene `padding-top` y `padding-bottom` de `var(--esp-6)` para separar el contenido de la barra de navegación y del pie. `components.html` lo resolvía con el padding de cada `section.demo`, que las páginas reales no tienen.

### D13 — Retroalimentación `:active` en botones
`.aac-web .btn:active { transform: scale(.98); }` y `transform` se suma a la `transition` del botón (usa `var(--transicion)`, que vale 0 con `prefers-reduced-motion`). Sigue la regla de `emil-design-eng` (botones con feedback al presionar, solo `transform`/`opacity`) y no usa valores nuevos fuera de los tokens.

## Risks / Trade-offs

- [Colisión de nombres de variables con el tema de WordPress] → D1 las redeclara en `.aac-web`; el riesgo inverso (nuestras variables en `:root` pisando las del tema) se revisa en la prueba de integración de C-06, donde se puede quitar `:root` del selector si molesta.
- [Desincronización entre `tokens.css` y `estilos.css`] → comentario de revisión en la cabecera + chequeo de paridad en la verificación de cada change que toque estilos.
- [Especificidad del tema de Elementor mayor que `.aac-web X`] → aceptado en C-01; se mide en C-06 (posible aumento a `.aac-web.aac-web` o similar). No se usa `!important` salvo en movimiento reducido.
- [`@import` de fuentes retrasa el primer render] → `display=swap` + `preconnect` en el HTML.
- [Barra superior a 16 px se ve distinta al mockup] → D5, desvío documentado y reversible.
- [Ruta del logo `design-system/assets/logo.png` no existirá tal cual en Elementor] → se resuelve en C-06 (Mediateca); en local funciona.

## UI Mockups

- Design system revision: 1
- Decision: no (project policy) — 2026-11-06
- Mockups: no se crean; contrato visual en `design-system/components.html` y `docs/mockups/`
- Visual verify: passed (2026-11-06) — Playwright sobre servidor local a 390x844 y 1440x900; valores calculados de barra superior, nav, botón azul y pie coinciden con components.html salvo D5 (barra superior 16 px en vez de 12,8 px, aprobado por la autora) y alto 44 px de enlaces del pie (requisito de accesibilidad). Capturas no guardadas en el repo.

## Migration Plan

No aplica: no hay nada desplegado. Reversión = borrar los archivos nuevos.

## Open Questions

- ~~Confirmar con la autora el desvío D5 (barra superior 16 px)~~ → confirmado por la autora el 2026-11-06.
