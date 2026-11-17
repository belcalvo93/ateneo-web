# Design

## Context

Ver `proposal.md` para la motivación. Estado actual relevante:

- `index.html` es un esqueleto (barra superior, navegación, `main` con un `h1` y un placeholder, pie con redes escritas a mano). `css/estilos.css` tiene los tokens del design system rev. 1 y los componentes comunes (nav, botones, pie), todo bajo `.aac-web`.
- Los datos de C-02 ya existen: `AAC_TEMAS` (8 temas), `AAC_CHARLAS` (186 charlas generadas, en orden de más nueva a más vieja: `c001` es de 2026), `AAC_CHARLAS_NUEVAS` (vacío), `AAC_CORRECCIONES` y `AAC_PROXIMA_CHARLA`. `js/aplicar-correcciones.js` arma la vista combinada y funciona como `<script>` y con `require()`.
- Las 186 charlas tienen enlace en su primera parte; la mayoría sigue con `[Título]` y `[Disertante]`.
- Restricciones: HTML/CSS/JS puro sin build ni módulos ES (se pega en un widget HTML de Elementor), debe abrir con doble clic (`file://`), datos solo en `data/`, `textContent` en lugar de `innerHTML`, accesibilidad obligatoria, tests con `node:test` solo donde hay lógica, con TDD.
- Los mockups aprobados son el contrato visual, pero son anteriores a la reunión del 11/11: no tienen los botones de Calendar/Zoom, ni WhatsApp, ni el bloque de la Declaración, ni la galería, y dicen «desde 2017».

## Goals / Non-Goals

**Goals:**
- Que toda la lógica de la portada sea funciones puras probadas con `node:test`, separadas del código que toca el DOM.
- Que la regla «ningún placeholder al público» viva en un solo lugar.
- Que el mismo código funcione con archivos separados (local) y concatenado en un solo `<script>` (Elementor, C-06).
- Que lo nuevo respecto de los mockups se resuelva solo con componentes y tokens ya aprobados.

**Non-Goals:**
- Menú hamburguesa, ajuste fino responsive y auditoría de contraste: C-05. Acá la portada se arma mobile-first con grillas fluidas y no debe desbordar a 390 px, pero el menú sigue siendo el de C-01 (se acomoda en varias líneas).
- Contenido de `videoteca.html` y lectura del parámetro `?tema=`: C-04.
- Empaquetado para Elementor: C-06.
- Copiar fotos al repo: pendiente del consentimiento.
- Completar títulos y disertantes del catálogo: C-05.

## Decisions

### D1 — Dos archivos de JS: lógica pura y render
`js/portada-logica.js` expone funciones puras (sin DOM) con el mismo patrón que `aplicar-correcciones.js` (IIFE; `module.exports` en Node, una sola global `AAC_portada` en el navegador). `js/portada.js` lee las globales de datos, llama a la lógica y construye el DOM con `createElement` + `textContent`.
**Por qué**: la lógica se prueba con `node:test` sin navegador ni dependencias; el render queda fino y se verifica a mano. **Alternativa descartada**: un solo archivo con todo (no se puede probar sin simular el DOM) o una librería de DOM para tests (prohibido sumar dependencias).

Funciones de la lógica (nombres orientativos): `esPlaceholder`, `textoVisible` (devuelve el texto o `null`), `tituloVisible(charla)`, `disertanteVisible(charla)`, `enlaceSeguro(url)`, `idDeVideo(url)`, `miniatura(url)`, `ultimasCharlas(lista, n)`, `masVistas(lista, n)`, `vistasDeCharla(charla)`, `formatoVistas(n)`, `conteoPorTema(temas, lista)`, `redesVisibles(redes)`, `accionesProxima(proxima)`, `proximaAnunciada(proxima)`, `fechaLarga("DD/MM/AAAA")`.

### D2 — La regla de oro en un solo lugar
Todo texto de datos pasa por `textoVisible` y todo enlace de datos por `enlaceSeguro` antes de llegar al DOM. `textoVisible` devuelve `null` para vacío, no-texto o placeholder entre corchetes; el render omite el elemento cuando recibe `null`. `enlaceSeguro` solo acepta `http://` o `https://`.
**Por qué**: una sola función que probar y ninguna sección puede «olvidarse» de filtrar. Además cubre el caso de un `javascript:` en los datos.

### D3 — Configuración del sitio en `data/sitio.js`
Archivo nuevo, `window.AAC_SITIO = { correo, canal_youtube, conferencias, redes, fotos }`, con comentarios para quien edita, igual que `proxima-charla.js`.
- `redes`: `[{ nombre, url }]`. Iniciales: YouTube (canal), WhatsApp (`https://whatsapp.com/channel/0029VbDjwCbI7BeKsvprkr3t`), Instagram (`"[enlace de Instagram]"`).
- `fotos`: `[]`. Cuando haya consentimiento: `{ archivo: "img/…jpg", alt: "…" }`.
- `conferencias`: `"+100"` (dato institucional, no se puede calcular: el canal no tiene todas las conferencias).
- La cifra de **videos** no va en la configuración: se calcula contando las partes de la vista combinada, así no queda vieja.

**Alternativa descartada**: meter redes dentro de `proxima-charla.js` (mezcla lo que cambia cada semana con lo que casi no cambia) o dejarlas en el HTML (contradice D17 de C-02).

### D4 — `calendar_url` junto a `zoom_url`
Se agrega `calendar_url: null` a `data/proxima-charla.js`, a `CAMPOS_PROXIMA` del validador y a la guía. Mismo patrón y misma validación que `zoom_url` (`null` o `https://`), sin aviso de pendiente cuando es `null`.
`accionesProxima` devuelve la lista de botones a mostrar, siempre con «Inscribirme por correo» y, según los datos, «Agendar en Calendar» y «Entrar por Zoom». El render recorre esa lista: sin enlace no hay botón ni hueco.

### D5 — «Próxima charla» cuando todavía no se anunció
Si `titulo` o `fecha` no son visibles (`proximaAnunciada` es falso), la tarjeta muestra un texto fijo («La próxima charla se anunciará pronto») con el horario y lugar habituales (que sí están en los datos) y el botón de inscripción. Los datos secundarios sin completar (disertante, descripción) simplemente se omiten.
**Por qué**: es el estado real de hoy y el de cada receso; mostrar la tarjeta del mockup con corchetes rompe la regla de oro, y ocultar la sección deja un ancla muerta en el menú.

### D6 — «Últimas charlas»: orden
`ultimasCharlas` ordena por `anio` descendente; a igual año, primero las de `charlas-nuevas.js` (la última agregada primero) y después las generadas en su orden de catálogo (que ya es de más nueva a más vieja).
**Por qué**: las charlas no tienen fecha, solo año aproximado; el orden del catálogo es la mejor señal disponible y las agregadas a mano son por definición posteriores a la foto del canal.
**A futuro**: cuando haya fechas reales (sitio viejo del Ateneo, archivo de actividades por ciclo 2020–2026) se ordena por fecha exacta. Es un cambio acotado a `ultimasCharlas` y a un campo de fecha en los datos; no es parte de este change.

### D7 — «Más vistas»: destacadas primero, después por visualizaciones
`masVistas` toma primero las charlas con `destacada: true` (en orden de visualizaciones entre ellas) y completa hasta 3 con el resto, de mayor a menor. Las visualizaciones de una charla son la **suma de las de sus partes** (decisión de la autora, 16/11/2026).
**Por qué la suma**: la unidad del sitio es la charla, no el video. Los valores del mockup (12 mil, 2 mil, 1,2 mil) eran ilustrativos: con la suma el podio real es Entrelazamiento cuántico, Depósitos de litio y Teledetección y Geología Espectral. **Alternativa descartada**: la parte más vista. `formatoVistas` redondea como el mockup («12 mil», «1,2 mil»).

### D8 — Miniaturas derivadas del enlace
`miniatura(url)` arma `https://img.youtube.com/vi/<id>/hqdefault.jpg` a partir del enlace de la primera parte (SU-03). Sin enlace o con un id que no se puede extraer, la tarjeta usa el bloque oscuro del design system (`--superficie-media`) sin imagen. Las imágenes llevan `loading="lazy"`, `alt=""` (decorativas: el título está al lado) y dimensiones fijas para no mover el contenido al cargar.

### D9 — Temas: enlace con parámetro
Cada tarjeta de tema enlaza a `videoteca.html?tema=<id>`. C-04 leerá ese parámetro; hasta entonces el enlace abre la videoteca sin filtrar, que no rompe nada.
**Alternativa descartada**: `#tema-<id>` (un ancla no existe como elemento y complica el filtro en C-04).

### D10 — Contenido fijo en el HTML, datos por JS
Va escrito en `index.html` (sirve aunque falle el JS): hero, textos de «Quiénes somos», requisitos y criterios de «Proponer una charla», texto de la Declaración dentro de `<details>`, dirección y correo de contacto. Se renderiza por JS: cifra de videos, próxima charla, últimas, temas, más vistas, galería y redes.
El correo fijo del pie y el `mailto:` de los botones salen del HTML como respaldo y el JS los sincroniza con `AAC_SITIO.correo`.

### D11 — Declaración de Principios en `<details>` nativo
El texto se transcribe del documento v2.4 del Ateneo (fuera del repo), sin reescribirlo, como HTML semántico (títulos y listas) dentro de `<details><summary>`. `<details>` es accesible por teclado sin JS. El `summary` se estiliza como botón de 44 px con foco visible.
**Revisión de privacidad al transcribir**: si el documento incluye nombres de personas, correos o teléfonos, esas líneas no se publican y se consulta al nexo.

### D12 — Fallo de carga
`portada.js` comprueba que existan las globales que necesita cada sección. Si falta alguna, esa sección muestra un aviso con enlace al canal de YouTube (`role="status"`), y el resto sigue. El caso sin JavaScript se cubre con contenido de respaldo escrito en el HTML de cada contenedor (horario y lugar habituales, correo y enlace al canal), que el render reemplaza al cargar; se prefirió a un `<noscript>` porque el mismo respaldo sirve también cuando un archivo de datos no carga.

### D13 — Pie compartido con la videoteca
El render de redes va en un archivo propio y chico (`js/pie.js`) que usan las dos páginas, para que `videoteca.html` no quede con redes escritas a mano. No se toca nada más de la videoteca.

### D14 — Estilos
Clases nuevas en `css/estilos.css`, todas bajo `.aac-web`, solo con tokens existentes: hero, cifras, tarjeta de próxima charla, grilla de tarjetas, tarjeta de tema, lista numerada, panel, galería, `details`. Grillas con `repeat(auto-fit, minmax(...))` para que 8, 9 o 10 temas se acomoden solos. Si hiciera falta un valor que no está en los tokens, se resuelve con un token existente; no se agregan tokens (subiría la revisión del design system).

## UI Mockups

- Design system revision: 1 (aprobado; modo `system-only`).
- Decision: no (project policy) — 16/11/2026.
- Referencia visual: `docs/mockups/inicio-escritorio.png` e `inicio-celular.png`.
- Diferencias con los mockups, todas acordadas el 11/11 o pedidas por la autora: «desde 2015» en lugar de 2017; botones opcionales de Calendar y Zoom en la próxima charla; en celular, mismo orden de secciones que en escritorio; WhatsApp en lugar de Facebook e Instagram oculto mientras no tenga enlace; bloque desplegable con la Declaración; espacio de galería (hoy vacío); «Quiénes somos» más larga, con historia y valores.

## Risks / Trade-offs

- [La mayoría de las charlas se verá con el título crudo de YouTube, en mayúsculas y sin disertante] → Es el comportamiento acordado en C-02; mejora sola a medida que se completa `correcciones.js` (C-05). Las tres «últimas» y las tres «más vistas» se pueden corregir a mano antes de mostrar la portada al Ateneo.
- [«Últimas» depende del orden del catálogo, no de fechas reales] → Aceptado y documentado en D6; si el Ateneo quiere otra, se agrega en `charlas-nuevas.js` o se ajusta el año.
- [Miniaturas servidas por YouTube: pueden fallar en el entorno de la FRM] → Bloque oscuro de respaldo con dimensiones fijas; se prueba en C-06 (SU-03).
- [El texto de la Declaración puede cambiar de versión] → Queda en un solo bloque del HTML con la versión indicada; la guía de C-06 explica cómo reemplazarlo.
- [Una red sin enlace queda como aviso para siempre si nadie la completa] → Aceptado (decisión de la autora, 16/11/2026): es solo un aviso, no corta `--estricto`, porque la página la oculta y no hay nada roto a la vista.
- [Menú de C-01 en celular ocupa varias líneas hasta C-05] → Aceptado; no desborda.
- [El mockup de celular pone los temas antes que las últimas charlas] → No se sigue: en celular se usa el **mismo orden que en escritorio** (decisión de la autora, 16/11/2026), para que el orden visual y el de teclado coincidan. No se usa `order` de CSS.

## Open Questions

Ninguna cambia las specs ni las tareas; se pueden contestar durante la implementación o después:

- ¿El Ateneo quiere publicar el enlace de Zoom en la web o solo el de Calendar? (La tarjeta funciona en los dos casos.)
- ¿Qué fotos van en la galería y con qué texto alternativo? (Pendiente del consentimiento.)
- ¿Se nombra a los fundadores o a la Mesa Organizadora en «Quiénes somos»? (Hoy no.)
- Enlace de Instagram.
- Asunto sugerido de los correos de inscripción y de propuesta (hoy: uno genérico, sin datos inventados).
