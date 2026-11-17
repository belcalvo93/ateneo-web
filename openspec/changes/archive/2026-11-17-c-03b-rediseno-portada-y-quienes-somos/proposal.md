# Proposal

## Why

La portada de C-03 cumple lo funcional, pero la revisión de diseño del 16/11/2026 mostró que no sirve bien a los dos públicos que el Ateneo quiere alcanzar: los adultos mayores que ya participan (necesitan pocos clics y nada escondido) y los jóvenes que llegan desde WhatsApp o Instagram con el celular (hoy ven tres líneas de menú y dos pantallas de hero antes de la próxima charla, y no encuentran cómo seguir al Ateneo). Además, «Quiénes somos» y «Proponer una charla» son dos paneles largos que alargan la portada, y la cabecera y el pie están copiados en cada página justo antes de sumar una tercera.

## What Changes

- **Página nueva `quienes-somos.html`**: bajada institucional, historia en una línea de tiempo de 4 hitos, 4 valores, cómo funcionamos, galería (oculta hasta tener fotos con consentimiento) y «Proponer una charla» con la Declaración de Principios desplegable.
- **Portada más corta**: «Quiénes somos» y «Proponer una charla» salen de la portada y dejan en su lugar una presentación del Ateneo en el encabezado (qué es, desde cuándo, horario y botón «Conocé al Ateneo») y, al final, una invitación de una línea a «Proponer una charla».
- **Próxima charla primero**: la tarjeta queda inmediatamente después de la presentación del encabezado, en celular y en escritorio; las cifras pasan a una franja compacta debajo.
- **Franja «Seguinos»** con un botón grande con nombre por cada red de la lista configurable.
- **Una sola tarjeta de charla en todo el sitio**: «Las más vistas» usa la misma tarjeta con miniatura que «Últimas charlas», y la miniatura muestra la duración.
- **Botones de la próxima charla con texto claro**: «Agendar en mi calendario» y «Entrar por Zoom».
- **Contacto más claro** en el pie: «Escribinos» con el correo y la dirección con un enlace «Cómo llegar» a Google Maps.
- **Menú de 4 ítems**: Inicio · Videoteca · Quiénes somos · Contacto. **BREAKING** para enlaces internos: «Próxima charla» y «Proponer una charla» dejan de estar en el menú, y las anclas `#quienes-somos` y `#proponer` de la portada pasan a la página nueva.
- **Menú hamburguesa accesible en celular**, con el texto «Menú» (adelantado desde C-05).
- **Cabecera, menú y pie compartidos** desde un solo archivo JS para las tres páginas.
- **Gancho opcional por tema**: campo nuevo `gancho` en `data/temas.js`, vacío por ahora; solo se muestra si tiene texto. No se escribe ninguno en este change.
- **Dirección y enlace del mapa** en `data/sitio.js`.
- **Documentación**: mapa del sitio del PRD, KB y `CHANGES.md` (C-03b y lo que cambia para C-04 y C-05).

Fuera de este change: contenido de la videoteca, lectura de `?tema=` y `?charla=` (C-04); auditoría de accesibilidad y contraste (C-05); empaquetado para Elementor (C-06); fotos reales de la galería; textos de los ganchos por tema; vista previa al compartir (depende de WordPress).

## Capabilities

### New Capabilities
- `quienes-somos`: contenido y comportamiento de la página institucional (historia, valores, cómo funcionamos, galería y proponer una charla).
- `navegacion-compartida`: cabecera, menú principal (con menú desplegable accesible en pantallas chicas) y pie comunes a todas las páginas, definidos en un solo lugar.

### Modified Capabilities
- `portada`: cambia el orden y el contenido de las secciones; se van «Quiénes somos», la galería y «Proponer una charla»; se suman el resumen del Ateneo, la franja «Seguinos», la duración en la miniatura y la misma tarjeta para las más vistas; cambian los textos de los botones de la próxima charla.
- `estructura-del-sitio`: el sitio pasa a tener tres páginas y la estructura común (barra, cabecera, menú, pie) deja de estar escrita en cada una.
- `catalogo-charlas`: los temas admiten un campo opcional `gancho`.
- `configuracion-sitio`: la configuración suma `direccion` y `mapa_url`.
- `validacion-datos`: el validador comprueba `gancho`, `direccion` y `mapa_url`.

## Impact

- **Páginas**: `index.html` (reestructurada), `videoteca.html` (solo cabecera y pie), `quienes-somos.html` (nueva).
- **JS**: archivo nuevo para la cabecera, el menú y el pie compartidos (absorbe `js/pie.js`); archivo nuevo con el render de la tarjeta de charla, que usará también C-04; `js/portada-logica.js` y `js/portada.js` (duración, gancho, franja de redes, resumen).
- **CSS**: estilos nuevos bajo `.aac-web`, solo con tokens existentes (menú desplegable, franja de redes, línea de tiempo, valores, cifras compactas).
- **Datos**: `data/temas.js` (campo `gancho`), `data/sitio.js` (`direccion`, `mapa_url`), validador y guía `data/LEEME.md`.
- **Design system**: se agregan a `components.html` los componentes nuevos; no cambian los tokens, así que la revisión sigue siendo la 1.
- **Tests**: nuevos con TDD para la lógica (duración, gancho, ítem activo del menú, enlace del mapa) y la validación.
- **C-04**: recibe hechos la cabecera, el menú, el pie y la tarjeta de charla. **C-05**: queda como auditoría (el menú hamburguesa sale de su alcance).
- **Dependencias**: ninguna nueva.
