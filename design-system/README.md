# Design system — Ateneo Amigos de la Ciencia

Mode: system-only
Revision: 1
Approval: approved (2026-11-06, by user)

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
| `components.html` | Referencia de componentes y estados (nav, hero, botones, ficha de charla, buscador/chips, próxima charla, tema, pie) |
| `assets/logo.png` | Logo AAC (copia de `docs/mockups/logo-aac.png`) |
| `previews/` | Capturas 390×844 y 1440×900 |

## Reglas clave
Base 18 px · contraste AA · objetivos ≥ 44 px · foco visible · nombres de tema completos en datos, etiquetas cortas en chips/fichas.

## Decisiones abiertas (TBD)
- Logo en SVG/alta calidad (hoy PNG; vive en `assets/logo.png`, reemplazar ese archivo mantiene las rutas).
- Fotos de las charlas.
- Usuarios de Instagram y Facebook para el pie.

## Cómo reemplazar
- Nombre: editar `BRAND_NAME` en `brand.js`.
- Logo: reemplazar `assets/logo.png` (mismo nombre).
- Colores/tipografías: solo en `tokens.css`; al cambiar uno, subir `Revision:` y volver a pedir aprobación.

## Integración Elementor
Al pegar en el widget HTML, copiar el contenido de `tokens.css` dentro de un `<style>` y aislar los estilos bajo un contenedor (ver `knowledge-base/08`).
