# Tasks

Referencia visual: `docs/mockups/inicio-escritorio.png` e `inicio-celular.png` + design system rev. 1 (ver `design.md` §UI Mockups para las diferencias acordadas). Todo con Strict TDD donde hay lógica: test primero (RED), mínimo código (GREEN), segundo caso (TRIANGULATE), refactor.

## 1. Red de seguridad y datos

- [x] 1.1 Correr `npm test` y `node scripts/validar-datos.js` antes de tocar nada y anotar la línea base (cantidad de tests en verde, código de salida del validador); si algo falla, parar e informar
- [x] 1.2 (TDD) Agregar `calendar_url` a la validación de la próxima charla: tests primero en `tests/validar.test.js` (enlace `https://` válido, `null` válido sin aviso, valor inválido = error, sin aviso en `--estricto`); después `scripts/lib/validar.js`. Verificar: los tests nuevos pasan y los existentes siguen en verde
- [x] 1.3 Agregar `calendar_url: null` con su comentario a `data/proxima-charla.js` y actualizar el comentario «provisorio» de `data/temas.js`. Verificar: `node scripts/validar-datos.js` termina con código 0 y `AAC_PROXIMA_CHARLA` tiene diez campos
- [x] 1.4 (TDD) Validación de la configuración del sitio: tests primero (configuración correcta, campo faltante, campo desconocido, correo inválido, red sin nombre, `url` de red mal escrita, foto sin `alt`, aviso por red pendiente, red pendiente no corta `--estricto`); después `scripts/lib/validar.js` y la carga de `data/sitio.js` en `scripts/validar-datos.js`. Verificar: tests en verde
- [x] 1.5 Crear `data/sitio.js` (`window.AAC_SITIO`) con `correo`, `canal_youtube`, `conferencias`, `redes` (YouTube y WhatsApp con enlace real, Instagram con placeholder) y `fotos: []`, con comentarios para quien edita. Verificar: el validador lo acepta con un solo aviso (Instagram) y el archivo no contiene teléfonos ni otro correo que el institucional
- [x] 1.6 Documentar en `data/LEEME.md` el archivo `sitio.js` (agregar o quitar una red, cargar fotos) y el campo `calendar_url`. Verificar: una persona puede agregar una red siguiendo solo esa guía

## 2. Lógica de la portada (TDD, `js/portada-logica.js` + `tests/portada-logica.test.js`)

- [x] 2.1 `esPlaceholder`, `textoVisible` y `enlaceSeguro`: tests primero (texto normal, `[…]`, vacío, no-texto; `https://`, `http://`, `javascript:`, `null`, placeholder). Verificar: tests en verde, mínimo 2 casos por comportamiento
- [x] 2.2 `tituloVisible` y `disertanteVisible`: tests primero (título limpio; `[Título]` → título original de la parte 1; `[Disertante]` → `null`; charla sin partes no rompe). Verificar: tests en verde
- [x] 2.3 `idDeVideo` y `miniatura`: tests primero (`watch?v=`, `youtu.be/`, enlace `null`, enlace que no es de YouTube). Verificar: tests en verde
- [x] 2.4 `ultimasCharlas`: tests primero (orden por año; a igual año, nuevas antes que generadas y catálogo en su orden; menos de 3 charlas; lista vacía; no modifica la lista recibida). Verificar: tests en verde
- [x] 2.5 `vistasDeCharla`, `masVistas` y `formatoVistas`: tests primero (suma de las partes; sin destacadas; una destacada primero; destacada sin vistas; sin repetidos; `vistas: null`; «12 mil», «1,2 mil», menos de mil). Verificar: tests en verde
- [x] 2.6 `conteoPorTema`: tests primero (conteo por tema en el orden de `temas`; tema sin charlas = 0; nueve temas; charla con tema inexistente no rompe). Verificar: tests en verde
- [x] 2.7 `redesVisibles`: tests primero (estado inicial → YouTube y WhatsApp; Instagram completado aparece; `url: null`; enlace inseguro; lista vacía o ausente). Verificar: tests en verde
- [x] 2.8 `accionesProxima`, `proximaAnunciada` y `fechaLarga`: tests primero (ambos enlaces; solo Calendar; solo Zoom; ninguno; título o fecha en placeholder → no anunciada; «14/11/2026» → «viernes 14 de noviembre»; fecha inválida → `null`). Verificar: tests en verde
- [x] 2.9 Prueba de integración con los datos reales: la vista combinada de `data/` pasa por todas las funciones sin que ningún texto resultante contenga corchetes, y «más vistas» devuelve 3 charlas distintas. Verificar: `npm test` en verde

## 3. Estructura y contenido fijo de `index.html`

- [x] 3.1 Reemplazar el `main` del esqueleto por las secciones en orden (hero con cifras, próxima charla, últimas, temas, más vistas, quiénes somos, proponer, pie), con `id` para las anclas del menú, un solo `h1` y encabezados en orden. Verificar: cada enlace del menú lleva a su sección
- [x] 3.2 Escribir «Quiénes somos» con la historia desde agosto de 2015, la bajada institucional y los valores, tomados del PRD v1.2, sin nombrar personas; dejar el contenedor de la galería vacío y oculto. Verificar: la página no dice «2017» como origen y no hay fotos en el repo
- [x] 3.3 Escribir «Proponer una charla»: requisitos, criterios de admisión y botón «Enviar mi propuesta» (`mailto:` al correo de contacto). Verificar: el botón abre el cliente de correo con el destinatario correcto y no queda ningún enlace a `bit.ly`
- [x] 3.4 Transcribir el texto completo de la Declaración de Principios v2.4 desde el documento del Ateneo (carpeta fuera del repo) dentro de `<details>`, como HTML semántico y sin reescribirlo; omitir y consultar cualquier línea con nombres, correos o teléfonos de personas. Verificar: el bloque abre y cierra con mouse y con teclado, y el texto coincide con el documento
- [x] 3.5 Agregar `<noscript>` y los contenedores de aviso de error, y cargar los scripts en orden (datos, `aplicar-correcciones.js`, `portada-logica.js`, `pie.js`, `portada.js`) sin módulos ES. Verificar: la página abre con doble clic (`file://`) sin errores en la consola

## 4. Render (`js/portada.js`, `js/pie.js`)

- [x] 4.1 `js/pie.js`: redes desde `AAC_SITIO.redes` con `redesVisibles`, `textContent` y `rel="noopener noreferrer"`; usarlo en `index.html` y `videoteca.html` y quitar las redes escritas a mano. Verificar: el pie de las dos páginas muestra YouTube y WhatsApp, no menciona Instagram ni Facebook, y completar Instagram en los datos lo hace aparecer
- [x] 4.2 Próxima charla: tarjeta desde `AAC_PROXIMA_CHARLA`, estado «se anunciará pronto», correo visible y botones según `accionesProxima`. Verificar a mano los cuatro casos (ambos enlaces, solo Calendar, solo Zoom, ninguno) y el estado sin anunciar: nunca aparece un corchete ni un botón vacío
- [x] 4.3 Últimas charlas: 3 tarjetas con miniatura (o bloque de respaldo), tema, título, disertante, año y enlace a YouTube. Verificar: muestran las charlas esperadas, sin corchetes, y una corrección de título en `correcciones.js` se refleja al recargar
- [x] 4.4 Temas con conteo y enlace `videoteca.html?tema=<id>`, y cifra de videos calculada. Verificar: los conteos coinciden con el validador (35, 30, 27, 26, 19, 17, 17, 15) y agregar un tema de prueba en los datos suma una tarjeta
- [x] 4.5 Las más vistas: lista numerada con título, disertante y visualizaciones. Verificar: sin destacadas muestra las 3 de más vistas; marcar `destacada: true` en una corrección de prueba la pone primera (y revertir la prueba)
- [x] 4.6 Galería desde `AAC_SITIO.fotos`. Verificar: con la lista vacía no se ve ni deja hueco; con una imagen de prueba temporal (no una foto del Ateneo) aparece con su `alt` (y revertir la prueba)
- [x] 4.7 Fallo de carga: aviso con enlace al canal en las secciones sin datos. Verificar: comentando temporalmente la carga de `data/charlas.js` se ve el aviso y el resto de la página sigue normal

## 5. Estilos (`css/estilos.css`)

- [x] 5.1 Estilos de hero, cifras y tarjeta de próxima charla según el mockup, solo con tokens y bajo `.aac-web`. Verificar: comparación visual con `inicio-escritorio.png` a 1440×900
- [x] 5.2 Estilos de tarjetas de charla, grilla de temas, lista de más vistas, paneles, galería y `details` (summary de 44 px con foco visible). Verificar: comparación visual con el mockup y la grilla de temas se acomoda con 8, 9 y 10 tarjetas
- [x] 5.3 Comportamiento mobile-first a 390 px según `inicio-celular.png` (una columna, botones a todo el ancho, temas en dos columnas), con el mismo orden de secciones que en escritorio y sin `order` de CSS. Verificar: a 390×844 no hay desplazamiento horizontal y todos los botones y enlaces miden 44 px o más
- [x] 5.4 Revisar que no haya colores, fuentes ni espaciados escritos a mano ni selectores fuera de `.aac-web`. Verificar: una búsqueda de `#` hexadecimales y de selectores sin prefijo en las reglas nuevas no encuentra nada fuera del bloque de tokens

## 6. Verificación de integración

- [x] 6.1 Correr `npm test` y `node scripts/validar-datos.js`. Verificar: todos los tests en verde (línea base + nuevos) y el validador con código 0
- [x] 6.2 Recorrer la portada solo con teclado y revisar la consola y la red a 390×844 y 1440×900. Verificar: foco visible en todo, orden lógico, sin errores de consola ni pedidos fallidos (salvo miniaturas sin conexión)
- [x] 6.3 Buscar corchetes en el texto visible de la página con los datos actuales y revisar que todo enlace externo tenga `rel="noopener noreferrer"` y que no haya `innerHTML` en `js/`. Verificar: cero corchetes de datos, cero `innerHTML`
- [x] 6.4 Revisión de privacidad del diff: ningún correo o teléfono personal, ninguna foto, ningún archivo del listado de miembros. Verificar: el único correo en el diff es el institucional
- [x] 6.5 Actualizar `README.md` (archivos nuevos y cómo ver la portada). Verificar: las instrucciones funcionan tal como están escritas

## Workflow follow-up

- Verificar el change (`openspec-verify`) contra specs, diseño y mockups.
- Archivar (`/opsx:archive c-03-portada`) y marcar `[x]` C-03 en `CHANGES.md`.
- Commit solo cuando Belén lo pida (Conventional Commits en español, sin co-autoría).
