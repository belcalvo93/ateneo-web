# Design

## Context

Ver `proposal.md` (Why) y la crítica de `impeccable` del 17/11/2026 (`.impeccable/critique/`, fuera de git). Estado de partida: C-03b implementado y sin archivar (portada reordenada, Quiénes somos, `js/marco.js`, `js/ficha.js`), design system revisión 1, `PRODUCT.md` nuevo, hook de `impeccable` activo.

Decisiones de la autora que este change toma como fijas (17/11/2026):
- Fuente de títulos: **Source Serif 4**, reemplaza a Baskervville. Tres familias en total: Source Serif 4, Dosis (menú y rótulos), Open Sans (texto).
- Título del encabezado: **«Ciencia y cultura abiertas a toda la comunidad»** (la autora eligió primero «Los viernes a las 18, la ciencia se comparte» y el 17/11/2026 volvió al título anterior), sin rótulo encima. El ritual de los viernes queda en la línea del horario.
- Foto grupal autorizada; recortada a los siete integrantes (ver Open Questions).
- Logo oficial de la UTN en el pie, en blanco; nada de logo UTN en la cabecera; sale la barra superior.
- Alcance (a): las 7 propuestas de la autora más los P1 y P2 de la crítica.

Restricciones que no cambian: colores del design system, 18 px, AA, teclado, 44 px, HTML/CSS/JS puro bajo `.aac-web`, sin animaciones llamativas, pegable en Elementor.

## Goals / Non-Goals

**Goals:**
- Una sola cosa elevada por página: la tarjeta de la próxima charla en la portada.
- Jerarquía por tipografía y espacio, no por cajas.
- Dos voces tipográficas claras: serif para lo que se lee como titular, sans para lo que se usa (menú, rótulos, texto).
- Que el cambio sea sobre todo CSS y marcado, sin tocar la lógica ya probada más que para el aviso por WhatsApp.

**Non-Goals:**
- Colores nuevos, ilustraciones, íconos de marca de redes, animaciones de entrada.
- Contenido de la videoteca (C-04) y auditoría completa de accesibilidad (C-05).
- Reescribir textos institucionales, salvo el título del encabezado elegido por la autora.

## Decisions

### D1 — Variables de la revisión 2
`tokens.css` (revisión 2) redefine los roles tipográficos en vez de sumar familias:
- `--fuente-titulos: 'Source Serif 4', Georgia, serif` (antes Dosis).
- `--fuente-rotulos: 'Dosis', sans-serif` (nuevo nombre para lo que queda en Dosis: menú, rótulos, botones de menú).
- `--fuente-texto: 'Open Sans', sans-serif` (sin cambios).
- Se elimina `--fuente-serif` (Baskervville).
Todo uso actual de `--fuente-titulos` que en realidad es un rótulo o el menú pasa a `--fuente-rotulos`. Se suman los valores que hoy están sueltos y son de diseño: escala de títulos con saltos claros (encabezado ~3.25–4rem fluido, h2 ~2.25rem, h3 ~1.375rem, numerales y años ~2.5rem), interlineado de títulos y una variable para el filete fino (`--filete: 1px solid var(--borde)`).
**Alternativa descartada**: mantener `--fuente-serif` y cambiarle el valor a Source Serif 4: dejaría dos variables con roles superpuestos.

### D2 — Carga de Source Serif 4
Una sola petición a Google Fonts con las tres familias y solo los pesos usados (Source Serif 4 eje óptico 8..60, pesos 600 y 700; Dosis 600; Open Sans 400, 600 y 700), `display=swap`, y respaldos `Georgia, serif` / `sans-serif`.

### D3 — Encabezado con la próxima charla al lado
La tarjeta de la próxima charla se mueve dentro de la sección del encabezado, después de la presentación en el orden del documento. A partir de 1024 px, una grilla de dos columnas (presentación ~55 %, tarjeta ~45 %) alineadas arriba; por debajo, una sola columna en el mismo orden. El ancla `#proxima-charla` queda en la tarjeta. La tarjeta es el único elemento con sombra de la página. Las cifras pasan a una línea discreta debajo del encabezado.
**Alternativa descartada**: dejar la tarjeta superpuesta al borde del encabezado (como hoy): es lo que deja vacía la mitad derecha.

### D4 — Aviso por WhatsApp
Función pura nueva `enlaceAvisoWhatsApp(redes)`: devuelve el primer enlace seguro de la lista cuyo dominio sea `whatsapp.com` (canales) o `wa.me`; si no hay, `null`. Se reconoce por el dominio y no por el nombre de la red, para que renombrar la red no rompa el botón. En la tarjeta, el botón va después de «Inscribirme por correo» y de los enlaces opcionales, como botón de contorno a todo el ancho de la columna, con «(se abre en una pestaña nueva)» para lectores de pantalla. TDD.

### D5 — Menos cajas
- Se quitan borde, sombra y raya de color de: tarjetas de tema, valores, «Cómo funcionamos», «Proponer una charla», invitación final.
- Separación por espacio vertical (más arriba de un título que abajo) y filetes de 1 px entre filas de listas.
- Como mucho dos fondos de sección: el claro de la página y uno suave para el bloque de temas.
- Se elimina la caja anidada: la Declaración desplegable queda como un bloque con filete arriba, sin fondo propio.
- Cambio de radio coherente: las imágenes conservan radio chico; los bloques de texto no tienen radio porque no tienen caja.

### D6 — Tarjeta de charla
- Sin borde ni sombra: miniatura con radio chico arriba y texto debajo, en la misma columna.
- Sin círculo de «play»: toda la tarjeta es el enlace (el título se extiende).
- Sobre la miniatura solo la etiqueta de duración.
- Puesto de «Las más vistas»: numeral en Source Serif, en la línea del título, fuera de la imagen; el orden sigue dado por la lista numerada.
- Título subrayado siempre (`text-decoration` con grosor y separación del design system), en Source Serif; al pasar el mouse cambia a azul.
- El tema pasa de mayúscula espaciada a texto normal en Dosis, en azul.

### D7 — Temas
Grilla de 4 columnas desde 1024 px, 2 en celular y tablet; cada tema es nombre en Source Serif + conteo, separados por filetes, sin caja. El gancho (si existe) entre ambos.

### D8 — Quiénes somos
- **Línea de tiempo**: cada hito es una fila con el año a la izquierda (Source Serif ~2.5rem, azul) y el texto a la derecha, separadas por un filete fino; en celular el año va arriba. Sin puntos ni riel grueso. Sigue siendo `<ol>`.
- **Valores**: lista en dos columnas (una en celular), título en Source Serif + frase, con filete arriba de cada uno; sin cajas ni rayas.
- **Foto**: la galería existente muestra la foto. Con una sola foto se presenta como una figura ancha (`figure` + `figcaption` corto con el año) ubicada después de la historia; con más fotos, grilla. El mecanismo sigue siendo `AAC_SITIO.fotos`.
- «Cómo funcionamos» y «Proponer una charla» sin panel: título, texto a ancho de lectura y botones.

### D9 — Cabecera y pie
- Sale la barra superior: `marco.js` deja de dibujarla y las páginas quitan su contenedor.
- Logo del Ateneo a 72 px de alto en escritorio y 56 px en celular.
- Pie: los títulos de columna pasan a Source Serif. Se suma una franja inferior con el logo de la UTN y «Una actividad de la UTN Facultad Regional Mendoza».
- **Logo de la UTN**: copia del archivo oficial (`img/logo-utn.png`, 316×83, negro sobre transparente). La versión blanca se resuelve con `filter: brightness(0) invert(1)`: como el original es un solo color plano, el resultado es blanco exacto sin redibujar. Se muestra a 158 px de ancho para que se vea nítido en pantallas de alta densidad (el archivo tiene el doble).
- `alt="Universidad Tecnológica Nacional – Facultad Regional Mendoza"`.

### D10 — Mayúsculas y líneas
- Mayúscula espaciada solo en el menú (relación con la web de la UTN) y en la etiqueta «Próxima charla». El resto de los rótulos, en minúscula.
- `text-wrap: balance` en títulos y `text-wrap: pretty` en párrafos, en toda la hoja.

### D11 — Design system revisión 2
`tokens.css` y `components.html` se actualizan; `README.md` pasa a `Revision: 2` y `Approval: pending` hasta que la autora apruebe en el navegador; se regeneran las capturas. Se quitan de `components.html` los componentes que ya no existen (barra superior, rayas de color, rótulo sobre el título, «Seguinos»).

### D12 — `tipografias.html` y `DESIGN.md`
`design-system/tipografias.html` se **elimina al cierre**: era una herramienta para decidir, carga dos fuentes que el sitio ya no usa y, si queda en el design system, invita a confundir cuál es la vigente. La decisión y su motivo quedan escritos en `DESIGN.md`, en el README del design system (revisión 2) y en KB 09. `DESIGN.md` se genera al final con `impeccable document`, desde el código ya cambiado.

### D13 — Verificación
Además de los tests y el validador: detector de `impeccable` sobre las tres páginas renderizadas (escritorio y celular), revisión con `web-design-guidelines` y recorrido con teclado. Las alertas de «rótulo sobre título» y «raya de acento» tienen que desaparecer.

## UI Mockups

- Design system revision: 2 (pendiente de aprobación; reemplaza a la 1 en tipografía y componentes).
- Decision: no (project policy) — 17/11/2026.
- Referencias: la crítica de `impeccable` del 17/11/2026, la muestra de tipografías revisada por la autora y sus decisiones escritas. Diferencias con los mockups originales de `docs/mockups/`: sin barra superior, encabezado en dos columnas, títulos en Source Serif 4, sin franja «Seguinos», sin cajas en temas y valores, miniaturas sin «play».

## Risks / Trade-offs

- [Sin cajas, las tarjetas de tema pueden perder su área táctil evidente] → Cada tema sigue siendo un enlace de bloque completo de 44 px o más, con subrayado del nombre y cambio de fondo al pasar el mouse o enfocar.
- [Quitar la barra superior aleja el diseño local del mockup aprobado] → Es la decisión de la autora; la UTN queda presente en el pie con su logo y en la línea del horario.
- [`filter` sobre el logo de la UTN depende del navegador] → Todos los navegadores actuales lo soportan; sin soporte se vería negro sobre negro: el `alt` sigue presente y el texto «Una actividad de la UTN Facultad Regional Mendoza» está al lado.
- [Source Serif 4 suma peso de descarga] → Se cargan solo dos pesos y se quita Baskervville.
- [Las specs de este change modifican requisitos que agrega C-03b] → C-03b se archiva antes; el validador lo marca como aviso informativo hasta entonces.

## Open Questions

- **Foto grupal**: no se puede recortar sin cortar a un integrante (las dos personas del fondo están detrás de la cabeza y el hombro del primero de la izquierda). La autora decide entre desenfocar solo esas dos caras, recortar perdiendo parte del primer integrante, o publicarla como está. No cambia specs ni tareas: solo el tratamiento del archivo en la tarea correspondiente.
