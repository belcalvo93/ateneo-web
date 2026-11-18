# Design system — Ateneo Amigos de la Ciencia

Mode: system-only
Revision: 3
Approval: approved (2026-11-17, by user) — revisión 3 (change C-02b); la revisión 2 fue aprobada el 2026-11-17 y la 1 el 2026-11-06

Decisión de política (06/11/2026, por la usuaria): sistema de diseño definido ahora; los cambios visuales posteriores se implementan **sin pedir mockups por cambio**. Los mockups aprobados en `docs/mockups/` son el contrato visual de partida.

## Fuentes
- `docs/PRD.md` — Identidad visual (colores UTN/Ateneo, tipografías), requisitos de accesibilidad.
- `docs/mockups/` — Inicio escritorio, Videoteca escritorio, Inicio celular, logo.

## Contenido
| Archivo | Para qué |
|---|---|
| `tokens.css` | Variables de color, tipografía, espaciado, radios, sombras, foco y movimiento (con `prefers-reduced-motion`) |
| `brand.md` | Nombre, logo, tono y reglas de uso |
| `brand.js` | Constante del nombre; enlaza `[data-brand-name]` |
| `components.html` | Referencia de componentes y estados (nav, menú en celular, hero, botones, ficha de charla con duración y puesto, buscador/chips, próxima charla, cifras, franja de redes, tema, línea de tiempo, valores, pie) |

## Revisión 3 (17/11/2026, change C-02b) — aprobada el 17/11/2026

Pedido de la autora: sin subrayado en los títulos de las tarjetas.

- **Tarjetas de temas**: sin filete ni subrayado; fondo `--aac-celeste` (#DCE8F7, tinte de `--aac-azul`) que pasa a `--aac-celeste-hover` (#C7DAF1) al pasar el cursor, con radio de 12 px; flecha «→» decorativa (`aria-hidden`) junto a la cantidad de charlas. Contraste medido: texto 11,6:1, texto suave 5,3:1 y azul 6,0:1 sobre el tono más oscuro.
- **Tarjetas de charla**: toda la tarjeta es el enlace, título sin subrayado; al pasar el cursor sube 2 px, la miniatura toma `--sombra-suave` y el título pasa a azul. Con `prefers-reduced-motion: reduce` solo cambia el color. El foco con teclado sigue siendo el contorno amarillo alrededor de toda la tarjeta.
- **Tokens nuevos**: `--aac-celeste`, `--aac-celeste-hover`, `--sombra-suave` (sombra leve y momentánea, solo en el hover de la tarjeta de charla; la próxima charla sigue siendo el único elemento elevado en reposo).
- **Botón «↑ Subir»** (compartido, `js/marco.js`): píldora azul con texto blanco (8,6:1) y borde blanco de 2 px para que se recorte sobre el blanco de la página y sobre el negro del pie; 44 px de alto, fijo abajo a la derecha, aparece tras bajar más de una pantalla. El pie suma espacio abajo para que nunca tape su último renglón.
- **Cita**: Source Serif 4 cursiva 600 (se carga ese único estilo de cursiva) para la cita destacada de «Quiénes somos».

## Revisión 2 (17/11/2026, change C-03c)

Refinamiento visual pedido por la autora tras la crítica de `impeccable`: dirección «editorial universitario», institucional, elegante y cálida, con jerarquía por tipografía y espacio en lugar de cajas.

- **Tipografía**: **Source Serif 4** reemplaza a Baskervville y pasa a ser la fuente de títulos (encabezados, títulos de sección y de tarjeta, años, numerales y títulos del pie). **Dosis** queda solo para el menú y la etiqueta «Próxima charla» (`--fuente-rotulos`). **Open Sans** sigue para el texto. Tres familias en total. Se eligió Source Serif 4 entre tres opciones mostradas lado a lado (Source Serif 4, Atkinson Hyperlegible Next y Baskervville): tiene altura de x amplia, distingue bien I, l y 1, se lee mejor que Baskervville en el celular y da el tono editorial sin verse antigua.
- **Sin cajas**: temas, valores, paneles e invitación pierden borde, sombra y raya de color; se separan con espacio y filetes de 1 px (`--filete`). La tarjeta de la próxima charla es el único elemento elevado (`--sombra-elevada`, neutra).
- **Encabezado de la portada** en dos columnas con la próxima charla al lado; sin rótulo encima del título.
- **Tarjeta de charla**: sin círculo de «play»; solo la duración sobre la miniatura; el puesto como numeral fuera de la imagen; título siempre subrayado.
- **Cabecera y pie**: sin barra superior; logo del Ateneo más grande; logo oficial de la UTN en blanco en el pie (el archivo original sin cambios, blanco por CSS).
- **Tokens nuevos**: `--fuente-rotulos`, escala de títulos (`--texto-display`, `--texto-numeral`, `--interlineado-titulos`), `--ancho-lectura`, `--espaciado-seccion`, `--filete`, `--sombra-elevada`, colores de estado y de pie. Se eliminan `--fuente-serif` y `--sombra-tarjeta`.
- **`components.html`** ahora usa la hoja real del sitio (`../css/estilos.css`), así la referencia no se desincroniza de las páginas.

Historia: la revisión 1 sumó, sin cambiar tokens, el botón de contorno (16/11/2026) y los componentes de C-03b.
| `assets/logo.png` | Logo AAC (copia de `docs/mockups/logo-aac.png`) |
| `previews/` | Capturas 390×844 y 1440×900 |

## Reglas clave
Base 18 px · contraste AA · objetivos ≥ 44 px · foco visible · nombres de tema completos en datos, etiquetas cortas en chips/fichas.

## Decisiones abiertas (TBD)
- Logo en SVG/alta calidad (hoy PNG; vive en `assets/logo.png`, reemplazar ese archivo mantiene las rutas).
- Fotos de las charlas: hay una foto grupal autorizada (`img/ateneo-integrantes.jpg`); toda foto nueva necesita la autorización del Ateneo.
- Enlace de Instagram para el pie (el del Canal de Difusión de WhatsApp ya está; ver `knowledge-base/09` DD-14).

## Cómo reemplazar
- Nombre: editar `BRAND_NAME` en `brand.js`.
- Logo: reemplazar `assets/logo.png` (mismo nombre).
- Colores/tipografías: solo en `tokens.css` (y copiar el bloque a `css/estilos.css`; `tests/tokens.test.js` comprueba que coincidan); al cambiar uno, subir `Revision:` y volver a pedir aprobación.

## Integración Elementor
Al pegar en el widget HTML, copiar el contenido de `tokens.css` dentro de un `<style>` y aislar los estilos bajo un contenedor (ver `knowledge-base/08`).
