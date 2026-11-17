# Tasks

Referencias: crítica de `impeccable` del 17/11/2026 y decisiones de la autora en `design.md`. Strict TDD donde hay lógica. Antes de cada edición de interfaz, aplicar el piso de calidad de `impeccable` (el hook revisa cada edición).

## 0. Prerrequisito

- [x] 0.1 Confirmar que C-03b está archivado (`openspec list --json` no lo lista como activo y existen `openspec/specs/navegacion-compartida` y `openspec/specs/quienes-somos`). Verificar: `openspec validate c-03c-refinamiento-visual --strict` sin avisos de «Archive would refuse»

## 1. Línea base y activos

- [x] 1.1 Correr `npm test` y `node scripts/validar-datos.js` y anotar la línea base (211 tests en verde, código 0); si algo falla, parar e informar
- [x] 1.2 Aplicar a `img/ateneo-integrantes.jpg` el tratamiento elegido por la autora (Open Questions), regenerándolo desde el original de `img-local/` a 1600 px de ancho como máximo y sin metadatos. Verificar: Pillow informa 0 campos EXIF, ancho ≤ 1600 y peso razonable (< 400 KB)
- [x] 1.3 Copiar el logo oficial de la UTN desde `https://frm.utn.edu.ar/wp-content/uploads/2021/05/UTN_marca-negro-transparente2026.png` a `img/logo-utn.png`, sin modificarlo. Verificar: el archivo es idéntico al publicado (mismo tamaño en bytes, 316×83)
- [x] 1.4 Cargar la foto en `data/sitio.js` (`fotos`) con un texto alternativo que describa la escena sin nombrar personas, y documentar en `data/LEEME.md` que toda foto nueva necesita la autorización del Ateneo. Verificar: el validador la acepta y no hay otros avisos nuevos

## 2. Lógica (TDD)

- [x] 2.1 `enlaceAvisoWhatsApp(redes)` en `js/portada-logica.js`: tests primero (canal de `whatsapp.com`, `wa.me`, placeholder → `null`, otra red → `null`, enlace inseguro → `null`, lista vacía o ausente, renombrar la red no cambia el resultado). Verificar: tests en verde
- [x] 2.2 Ampliar la prueba de integración con los datos reales: el aviso por WhatsApp devuelve el enlace oficial. Verificar: `npm test` en verde

## 3. Design system revisión 2

- [x] 3.1 Actualizar `design-system/tokens.css` (D1): `--fuente-titulos` con Source Serif 4, `--fuente-rotulos` con Dosis, sin `--fuente-serif`, escala de títulos y `--filete`. Copiar el bloque a `css/estilos.css` y reemplazar los usos de rótulos y menú por `--fuente-rotulos`. Verificar: la paridad de variables entre los dos archivos se cumple y ninguna regla usa Baskervville
- [x] 3.2 Cambiar la carga de fuentes a una sola petición con Source Serif 4, Dosis y Open Sans y solo los pesos usados (D2). Verificar: en el navegador cargan exactamente esas tres familias

## 4. Marco compartido

- [x] 4.1 `js/marco.js` y las tres páginas: quitar la barra superior y su contenedor de respaldo; logo del Ateneo a 72/56 px (D9). Verificar: lo primero visible es la cabecera y el logo es un enlace al inicio
- [x] 4.2 Pie con títulos en Source Serif y franja inferior con el logo de la UTN en blanco (filtro CSS) y «Una actividad de la UTN Facultad Regional Mendoza», con el `alt` pedido. Verificar: se ve blanco y nítido a 1440 y 390 px, y el lector de pantalla anuncia el texto alternativo

## 5. Portada

- [x] 5.1 Encabezado: título «Ciencia y cultura abiertas a toda la comunidad», sin rótulo, y la tarjeta de la próxima charla dentro de la misma sección en dos columnas desde 1024 px (D3). Verificar: a 1440×900 las dos columnas se ven sin desplazarse; a 390×844 la tarjeta empieza dentro de las dos primeras pantallas y el orden de teclado es presentación → tarjeta
- [x] 5.2 Botón «Recibí el aviso de cada charla por WhatsApp» en la tarjeta (D4), también con la charla sin anunciar. Verificar: abre el canal oficial en pestaña nueva; con la red en placeholder (prueba temporal) no aparece
- [x] 5.3 Quitar la franja «Seguinos» y dejar las cifras en una línea discreta. Verificar: no queda ninguna sección «Seguinos» y las redes siguen en el pie
- [x] 5.4 Tarjeta de charla en `js/ficha.js` (D6): sin círculo de «play», solo duración sobre la miniatura, puesto como numeral junto al título, título siempre subrayado, tema sin mayúsculas. Verificar: en «Las más vistas» nada tapa la imagen salvo la duración, y los títulos se ven como enlace sin mouse
- [x] 5.5 Temas en grilla de 4 columnas desde 1024 px, sin caja ni raya (D7). Verificar: con 8 temas quedan 4 + 4 a 1440 px y con 10 (prueba temporal) 4 + 4 + 2
- [x] 5.6 Invitación final sin caja. Verificar: el detector no marca «raya de acento» en la portada

## 6. Quiénes somos

- [x] 6.1 Línea de tiempo editorial y valores en dos columnas sin cajas (D8). Verificar: sigue siendo una lista ordenada, sin puntos ni riel, y los valores pasan a una columna en celular
- [x] 6.2 Foto grupal como figura ancha después de la historia, con su texto alternativo. Verificar: se ve a 1440 y 390 px sin deformarse y con `loading="lazy"`
- [x] 6.3 «Cómo funcionamos» y «Proponer una charla» sin paneles; la Declaración desplegable sin caja anidada. Verificar: el detector no marca «caja dentro de caja» ni «raya de acento»

## 7. Tipografía y detalle

- [x] 7.1 Aplicar la escala y los roles de D1 y D10 en las tres páginas: títulos en Source Serif 4, menú y rótulos en Dosis, mayúscula espaciada solo en el menú y la etiqueta «Próxima charla», `text-wrap: balance` y `pretty`. Verificar: el detector no marca títulos desbalanceados ni palabras sueltas sin explicación
- [x] 7.2 Revisar estados (hover, foco, activo) de los enlaces y botones nuevos con los tokens del design system. Verificar: foco visible en todos y contraste AA medido en los textos nuevos (en especial texto sobre azul)

## 8. Design system y documentación

- [x] 8.1 Actualizar `design-system/components.html` (D11): quitar barra superior, rayas, rótulo sobre título y «Seguinos»; sumar encabezado con próxima charla, tarjeta nueva, temas, línea de tiempo, valores y pie con logo UTN. Verificar: el detector no marca componentes prohibidos en `components.html`
- [x] 8.2 `design-system/README.md` a `Revision: 2`, `Approval: pending`, con lo que cambió y por qué (Source Serif 4 en lugar de Baskervville); regenerar las capturas de `previews/`. Verificar: las capturas muestran la revisión 2
- [x] 8.3 Eliminar `design-system/tipografias.html` (D12). Verificar: ningún archivo lo enlaza
- [x] 8.4 Actualizar `docs/PRD.md` (identidad visual: tipografías), KB 08 (tokens y estructura de `img/`), KB 09 (decisión de tipografía, barra superior y logo UTN), `CHANGES.md` (C-03c) y `README.md`. Verificar: ninguna referencia vigente a Baskervville como fuente del sitio
- [x] 8.5 Generar `DESIGN.md` con `impeccable document` desde el código final. Verificar: describe Source Serif 4, Dosis y Open Sans con sus roles y no menciona componentes eliminados

## 9. Verificación de integración

- [x] 9.1 `npm test` y `node scripts/validar-datos.js`. Verificar: todo en verde y código 0
- [x] 9.2 Detector de `impeccable` sobre las tres páginas renderizadas a 1440×900 y 390×844. Verificar: sin «raya de acento», «rótulo sobre título» ni «caja dentro de caja»; cualquier otro hallazgo explicado
- [x] 9.3 Revisión con la skill `web-design-guidelines` sobre `index.html`, `quienes-somos.html`, `css/estilos.css` y `js/`. Verificar: hallazgos corregidos o explicados
- [x] 9.4 Recorrido con teclado, consola y red a 375 y 1440 px en las tres páginas. Verificar: foco visible, orden lógico, objetivos de 44 px, sin errores ni desborde
- [x] 9.5 Revisión de privacidad del diff: ningún correo o teléfono personal, foto sin metadatos, ningún nombre de persona nuevo. Verificar: el único correo es el institucional

## Workflow follow-up

- Revisión de la autora en el navegador y aprobación del design system revisión 2.
- Archivar (`/opsx:archive c-03c-refinamiento-visual`) y marcar C-03c en `CHANGES.md`.
- Commit solo cuando la autora lo pida (Conventional Commits en español, sin co-autoría), incluyendo `skills-lock.json`, `PRODUCT.md`, `DESIGN.md` y `.impeccable/config.json`.
