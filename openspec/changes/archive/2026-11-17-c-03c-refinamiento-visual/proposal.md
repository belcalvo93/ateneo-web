# Proposal

## Why

Después de C-03b el sitio funciona y es accesible, pero se ve genérico: la crítica de `impeccable` del 17/11/2026 le dio 22/32 (Aceptable) con «Estética y minimalismo» en 1/4. Todo es caja con borde, sombra y raya de color; el encabezado deja vacía la mitad derecha en escritorio y la próxima charla queda fuera de la primera pantalla; hay una sola voz tipográfica (Dosis en mayúscula); las miniaturas tienen tres capas encima; la franja «Seguinos» queda suelta, y la página institucional no muestra a ninguna persona. La autora pidió una dirección «editorial universitario»: institucional, elegante y cálida, con más aire y jerarquía tipográfica y menos bordes, que sirva a los adultos mayores y atraiga a los jóvenes.

## What Changes

- **Tipografía (design system revisión 2)**: Source Serif 4 pasa a ser la fuente de títulos (encabezados, títulos de sección, años de la línea de tiempo, citas y títulos del pie) y **reemplaza a Baskervville** en todo el sitio. Dosis queda para el menú y los rótulos cortos; Open Sans, para el texto. El sitio sigue en tres familias. Menos mayúsculas espaciadas; títulos y párrafos sin palabras sueltas al final.
- **Encabezado de la portada en dos columnas** en escritorio: presentación a la izquierda y la tarjeta de la próxima charla a la derecha, como único elemento elevado de la página. En celular se apila en el mismo orden de lectura.
- **Título del encabezado**: se mantiene «Ciencia y cultura abiertas a toda la comunidad» (elección final de la autora). **Sale el rótulo** «Ateneo Amigos de la Ciencia · UTN Mendoza» (el nombre está en el logo y «UTN FRM» en la línea del horario).
- **Sale la franja «Seguinos»**. Dentro de la tarjeta de la próxima charla se suma el botón «Recibí el aviso de cada charla por WhatsApp». YouTube queda en el pie (y en la videoteca, C-04).
- **Menos cajas**: temas, valores, «Cómo funcionamos», «Proponer una charla» y la invitación final pierden borde, sombra y raya de color; las secciones se separan con espacio y filetes finos.
- **Tarjetas de charla**: sin el círculo rojo de «play»; sobre la miniatura queda solo la duración; el puesto de «Las más vistas» sale de la imagen y pasa a ser un numeral junto al título; los títulos de tarjeta se ven como enlace sin pasar el mouse.
- **Temas** en una grilla pareja de 4 columnas en escritorio (8 temas hoy, 10 pronto).
- **Quiénes somos**: línea de tiempo editorial (año grande, línea fina, sin puntos), valores como lista en dos columnas sin cajas y la **foto grupal de integrantes**, autorizada por el Ateneo, optimizada y sin metadatos.
- **Sale la barra superior negra** («UTN · Facultad Regional Mendoza / Sección de la web de la facultad»): no daba información útil y, dentro de la web de la UTN, duplica la cabecera de la facultad. **BREAKING** respecto del mockup aprobado y de las specs de estructura y navegación.
- **Logo más grande** en la cabecera.
- **Logo de la UTN en el pie** (pedido de la autora): el logo oficial de frm.utn.edu.ar, sin redibujar, en blanco sobre el negro del pie, con la línea «Una actividad de la UTN Facultad Regional Mendoza». No va en la cabecera: dentro de Elementor la web de la UTN ya muestra el suyo arriba.
- **Documentación de diseño**: design system en revisión 2 (pendiente de aprobación), `DESIGN.md` generado al cierre desde el código.

Fuera de este change: contenido de la videoteca (C-04), auditoría completa de accesibilidad (C-05), textos de los ganchos por tema, colores nuevos.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `portada`: cambian el orden de secciones (sin «Seguinos») y la presentación del encabezado (título nuevo, sin rótulo, dos columnas en escritorio); se suman el aviso por WhatsApp en la próxima charla y los títulos de tarjeta reconocibles como enlace; se quita la franja de redes.
- `estilos-base`: las variables pasan a la revisión 2 del design system; Source Serif 4 reemplaza a Baskervville; los componentes comunes ya no incluyen la barra superior y suman el botón de contorno.
- `estructura-del-sitio`: la estructura común de cada página deja de incluir la barra superior.
- `navegacion-compartida`: el marco compartido deja de dibujar la barra superior y el pie suma el logo de la UTN.
- `configuracion-sitio`: la lista de fotos deja de empezar vacía y pasa a contener la foto grupal autorizada.

## Impact

- **Depende de C-03b**: este change modifica requisitos que agrega C-03b (`navegacion-compartida`, `quienes-somos` y la versión de `portada` y `estructura-del-sitio` de C-03b), así que C-03b tiene que archivarse antes que C-03c.
- **Código**: `css/estilos.css` (la mayor parte), `index.html` (encabezado y próxima charla en una misma sección, sin «Seguinos»), `quienes-somos.html`, `js/marco.js` (sin barra superior, logo), `js/ficha.js` (miniatura, puesto, título), `js/portada.js` y `js/portada-logica.js` (aviso por WhatsApp, con TDD), `data/sitio.js` (foto), `img/ateneo-integrantes.jpg`, `img/logo-utn.png` (copia del logo oficial).
- **Design system**: `design-system/tokens.css`, `components.html`, `README.md` (revisión 2, aprobación pendiente), capturas regeneradas; `design-system/tipografias.html` se elimina al cierre.
- **Documentación**: `DESIGN.md` nuevo; PRD, KB (decisiones y arquitectura) y `CHANGES.md`; `skills-lock.json` se versiona.
- **Dependencias**: ninguna nueva (Source Serif 4 se carga desde Google Fonts, como las demás).
