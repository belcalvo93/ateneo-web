# Design system — Ateneo Amigos de la Ciencia

Mode: system-only
Revision: 2
Approval: approved (2026-11-17, by user) — revisión 2; la revisión 1 fue aprobada el 2026-11-06

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
