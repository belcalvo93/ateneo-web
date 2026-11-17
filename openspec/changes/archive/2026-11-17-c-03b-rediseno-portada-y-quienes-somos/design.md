# Design

## Context

Ver `proposal.md` para la motivación. Estado actual (C-03, commit `d627e0c`):

- `index.html` tiene todas las secciones en una sola página; «Quiénes somos» y «Proponer una charla» son dos paneles con el texto escrito en el HTML, incluida la Declaración de Principios en un `<details>`.
- La barra superior, la cabecera con el menú de 6 ítems y el pie están copiados en `index.html` y `videoteca.html`. `js/pie.js` solo completa las redes y el correo.
- `js/portada-logica.js` (funciones puras, 33 tests) y `js/portada.js` (render con `createElement` + `textContent`). La tarjeta de charla se arma dentro de `portada.js`; «Las más vistas» usa otra tarjeta, sin miniatura.
- En celular el menú ocupa tres líneas y la próxima charla empieza después de casi dos pantallas.
- Restricciones que no cambian: HTML/CSS/JS puro sin build ni módulos ES, todo bajo `.aac-web`, solo tokens del design system rev. 1, datos en `data/`, `textContent`, accesibilidad (18 px, AA, teclado, 44 px), tests con `node:test` donde hay lógica (TDD), pegable en un widget HTML de Elementor.

## Goals / Non-Goals

**Goals:**
- Una sola definición de cabecera, menú y pie, y una sola tarjeta de charla, antes de construir la videoteca.
- Que la próxima charla sea lo primero útil que se ve al llegar desde un enlace compartido.
- Menú usable en celular sin esconder la navegación a quien no tiene JavaScript.
- Cambiar la estructura sin tocar la lógica ya probada más que para sumarle funciones.

**Non-Goals:**
- Tokens, colores o tipografías nuevos; animaciones más allá de las transiciones ya definidas.
- Textos de ganchos, fotos reales, nombres de personas.
- Contenido de la videoteca y lectura de parámetros de la dirección (C-04).
- Auditoría de contraste y de accesibilidad completa (C-05).

## Decisions

### D1 — Marco compartido en `js/marco.js`
Un archivo nuevo dibuja la barra superior, la cabecera con el logo, el menú y el pie en tres contenedores que cada página deja marcados (`data-aac="barra"`, `data-aac="cabecera"`, `data-aac="pie"`). La lista del menú (`[{ texto, href, pagina }]`) y las direcciones de las páginas viven solo ahí. Absorbe lo que hoy hace `js/pie.js`, que se elimina.
**Por qué**: tres páginas con la misma cabecera copiada se desincronizan; con C-04 serían tres copias que mantener. **Alternativas descartadas**: seguir copiando el HTML (lo que se quiere evitar); un paso de build o `fetch` de un parcial (prohibido el build; `fetch` no funciona con `file://`).
**Beneficio para C-06**: las direcciones de las páginas dentro de WordPress se cambian en un solo lugar.

### D2 — Respaldo sin JavaScript dentro de los contenedores
Cada página lleva escrito, dentro del contenedor de la cabecera, un `nav` mínimo con los tres enlaces de página, y dentro del pie el correo de contacto. `marco.js` reemplaza ese contenido al cargar. Es duplicación, pero mínima (cuatro líneas por página) y solo de respaldo: la fuente de verdad es `marco.js`.
**Por qué**: sin respaldo, una falla de JS deja la página sin navegación, y el público incluye navegadores viejos.

### D3 — Página actual calculada, no escrita
Cada página declara cuál es con un atributo en su contenedor raíz (`data-aac-pagina="inicio" | "videoteca" | "quienes-somos"`); una función pura decide qué ítem lleva `aria-current="page"`.
**Por qué un atributo y no la dirección**: dentro de Elementor el nombre del archivo no existe (las páginas tendrán la dirección que defina WordPress). **Alternativa descartada**: comparar `location.pathname`.

### D4 — Menú desplegable (disclosure), no un diálogo
Por debajo de 720 px el menú se colapsa detrás de un `<button>` con el texto visible «Menú», `aria-expanded` y `aria-controls`. Al abrir, la lista se muestra en el flujo del documento (empuja el contenido, no lo tapa). Cierra con el mismo botón, con Escape (devuelve el foco al botón) y al elegir un ítem. Cerrado, la lista queda con `hidden`, fuera del recorrido de teclado. A partir de 720 px el botón no existe y la lista se ve siempre.
El estado colapsado lo activa el propio JS (una clase en la cabecera): sin JS el menú se ve entero.
**Por qué disclosure**: es el patrón más simple y robusto para cuatro enlaces; un panel superpuesto obliga a atrapar el foco y a bloquear el desplazamiento. **Por qué con texto**: un ícono solo no es evidente para el público mayor.

### D5 — Tarjeta de charla en `js/ficha.js`
El render de la tarjeta sale de `portada.js` a un archivo propio que expone una sola función (`AAC_ficha(charla, opciones)`), con opciones para el puesto («más vistas») y la línea de visualizaciones. La usan «Últimas» y «Las más vistas» ahora, y la videoteca en C-04 (que le sumará los botones de partes).
Se conserva el patrón actual: un solo enlace por tarjeta (el título), extendido a toda la tarjeta.

### D6 — Duración: total de la charla
Función pura nueva `duracionDeCharla(charla)`: suma las duraciones de todas las partes y devuelve el texto (`M:SS` o `H:MM:SS`), o `null` si alguna no se puede leer. Se muestra como etiqueta sobre la miniatura; con más de una parte, la línea de datos agrega «N partes».
**Por qué el total**: la unidad del sitio es la charla (mismo criterio que las visualizaciones). **Alternativa descartada**: la duración de la primera parte, que hace parecer corta una charla de dos horas.
Se reutiliza la lectura de duración que ya valida el proyecto, sin duplicar el formato aceptado.

### D7 — Orden de la portada y cifras compactas
Orden único para todos los tamaños: encabezado → próxima charla (montada sobre el borde del encabezado, como hoy) → cifras en una franja de una línea → «Seguinos» → últimas → temas → más vistas → invitación a proponer una charla.
**Ajuste de la autora (16/11/2026)**: el encabezado presenta al Ateneo antes de la próxima charla, con el rótulo «Ateneo Amigos de la Ciencia · UTN Mendoza», el título, una descripción breve (texto dado por la autora, basado en la bajada institucional), el horario con «y/o por Zoom» y los botones «Ver la videoteca» y «Conocé al Ateneo». El botón «Próxima charla» se quita: la tarjeta queda inmediatamente debajo. En celular el encabezado usa menos relleno.
**Bloque final**: el «resumen del Ateneo» que se había propuesto al final se **quita**, porque con la presentación en el encabezado repetiría lo mismo dos veces en una página corta. En su lugar queda solo una invitación de una línea con el enlace «Proponer una charla», que es lo único que el encabezado no cubre y que tiene que seguir visible desde la portada.
**Cifras**: quedan dos (conferencias y videos); «Viernes 18 hs» sale de las cifras porque el horario ya está escrito en el encabezado.
Las cifras pasan de una lista grande dentro del hero a tres datos en línea (se acomodan en dos líneas si no entran), con el mismo marcado `dl`.

### D8 — Franja «Seguinos»
Usa `redesVisibles` (ya existe y está probada). Cada red es un botón `btn-contorno` con el nombre como texto. Sin íconos de marca: no hay un set aprobado en el design system y el nombre solo es más claro. Si la lista queda vacía, la sección entera se oculta.

### D9 — Página Quiénes somos: contenido fijo en el HTML
Todo el texto va escrito en `quienes-somos.html` (historia, valores, cómo funcionamos, proponer). Por datos solo salen la galería (`AAC_SITIO.fotos`) y el correo. La Declaración se mueve tal cual desde `index.html`, sin tocar su texto.
- Historia: lista ordenada (`<ol>`) de cuatro hitos, con el año como elemento destacado y un párrafo. En celular, una columna con una línea vertical a la izquierda; en escritorio, igual (no se pasa a horizontal: cuatro textos no entran bien y cambia el orden de lectura).
- Valores: cuatro tarjetas en grilla fluida (1, 2 o 4 columnas).
- Los textos salen del PRD v1.2 y de la Declaración; no se agregan datos.
- El render de la galería se mueve de `portada.js` a un archivo chico propio de la página.

### D10 — Gancho de tema
Campo opcional `gancho` en cada tema (`null` por defecto). `conteoPorTema` lo devuelve ya filtrado por `textoVisible`, así un placeholder tampoco se muestra. El validador lo acepta ausente, `null` o texto no vacío.

### D11 — Dirección y mapa en la configuración
`direccion` y `mapa_url` en `data/sitio.js`. El enlace inicial es una búsqueda de Google Maps por texto (`https://www.google.com/maps/search/?api=1&query=…` con la dirección), que no depende de un identificador de lugar. El pie muestra «Cómo llegar» solo si `enlaceSeguro(mapa_url)` devuelve un enlace.

### D12 — Textos de los botones de la próxima charla
Cambia solo el texto que devuelve `accionesProxima` («Agendar en mi calendario»); se actualizan sus tests. «Entrar por Zoom» e «Inscribirme por correo» quedan igual.

### D13 — Design system
Los componentes nuevos (menú desplegable, franja de redes, línea de tiempo, tarjeta de valor, cifras compactas, etiqueta de duración) se agregan a `design-system/components.html`. No se tocan los tokens, así que la revisión sigue siendo la 1; se anota la ampliación en su README.

## UI Mockups

- Design system revision: 1 (aprobado; modo `system-only`).
- Decision: no (project policy) — 16/11/2026.
- Referencia: análisis de diseño aprobado por la autora el 16/11/2026 y mockups de `docs/mockups/`. Diferencias con los mockups, todas aprobadas: menú de 4 ítems con botón «Menú» en celular; próxima charla antes de las cifras; cifras compactas; franja «Seguinos»; más vistas con miniatura; duración en la miniatura; «Quiénes somos» y «Proponer una charla» en página propia.

## Risks / Trade-offs

- [Cabecera y pie dependen de JavaScript] → Respaldo mínimo en el HTML (D2); la navegación sigue disponible.
- [Parpadeo al cargar: se ve el respaldo y después el marco definitivo] → `marco.js` se carga antes que el resto y el respaldo ocupa la misma zona; se verifica que no haya salto de contenido visible.
- [Enlaces viejos a `index.html#quienes-somos` o `#proponer`] → El sitio todavía no está publicado, así que no hay enlaces externos; los internos se actualizan en este change.
- [La página nueva duplica en la portada parte del texto institucional] → El resumen de portada se limita a la bajada y dos frases; el detalle vive solo en la página nueva.
- [Suma de duraciones con datos mal cargados] → `duracionDeCharla` devuelve `null` y la tarjeta se muestra sin duración; el validador ya marca las duraciones inválidas.
- [C-04 hereda `ficha.js` y `marco.js`] → Es el objetivo; se dejan con una interfaz chica y documentada en el encabezado de cada archivo.
- [Más archivos JS para pegar en Elementor] → Todos son IIFE sin dependencias entre páginas más allá del orden de carga; C-06 los concatena.

## Open Questions

Ninguna cambia las specs ni las tareas:

- Textos de los ganchos por tema (los escribe el Ateneo o Agustina).
- Fotos de la galería y su consentimiento.
- Si el Ateneo quiere volver a poner «Proponer una charla» en el menú más adelante (es agregar un ítem en `marco.js`).
