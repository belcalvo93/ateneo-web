# Tasks

Referencias: `design.md` (D1–D7 y Open Questions resueltas por la autora). Strict TDD donde hay lógica. Antes de cada edición de interfaz, aplicar el piso de calidad de `impeccable`. Sin commits hasta que la autora lo pida.

## 0. Prerrequisitos

- [x] 0.1 Anotar las respuestas de la autora a las Open Questions 1 y 2 en `design.md`. Verificar: ninguna Open Question queda sin decisión, salvo la del nexo
- [x] 0.2 Línea base: `npm test` (216 tests) y `node scripts/validar-datos.js` en verde; si algo falla, parar e informar

## A. Datos reales de las charlas

### A1. Lectura del archivo (TDD)

- [x] A1.1 `leerArchivo(texto)` en `scripts/lib/archivo.js`: tests primero con líneas reales (fecha normal, «abri», «noviiembre», sin «de» antes del año, «(sin disertante indicado)», varios disertantes, línea ilegible). Verificar: tests en verde
- [x] A1.2 `esProyeccion(entrada)`: tests con «Video de Richard P. Feynman», «Extracto de la conferencia de…» y un disertante común. Verificar: tests en verde

### A2. Cruce (TDD)

- [x] A2.1 `palabras(texto)` y `puntaje(entrada, charla)`: tests con título más largo en el archivo (Pinceladas Sanmartinianas), título más largo en YouTube (Neurociencia Educacional - Antonio Alvarez), disertante con título honorífico en el video y plural/singular. Verificar: tests en verde
- [x] A2.2 `cruzarArchivo(entradas, charlas)`: tests de segura, dudosa por mismo disertante (Alicia Seltzer), dudosa por año lejano, dudosa por coincidencia de una sola palabra («Electroquímica»), dos entradas para la misma charla (c029), sin par y proyección ignorada. Verificar: tests en verde
- [x] A2.3 Prueba de integración con `docs/fuentes/sitio-viejo.md` y el catálogo real: ninguna charla recibe dos fechas, todas las seguras tienen año compatible y las 5 proyecciones quedan ignoradas. Verificar: `npm test` en verde

### A3. Script, archivo generado y reporte

- [x] A3.1 `scripts/cruzar-archivo.js`: escribe `data/archivo-charlas.js` (encabezado de archivo generado, claves ordenadas, `titulo` solo sobre placeholders) y `scripts/salida/cruce-archivo.md` (totales, dudosas con candidatos y título original, sin par, ignoradas, variantes de nombres y diferencias con `correcciones.js`). Verificar: correr dos veces da archivos idénticos
- [x] A3.2 Documentar el script en `scripts/LEEME.md` y el archivo nuevo en `data/LEEME.md` (qué es, que no se edita, dónde se corrige). Verificar: el comando del LEEME funciona tal cual

### A4. Vista combinada, validador y correcciones (TDD)

- [x] A4.1 `aplicarCorrecciones(generadas, correcciones, nuevas, archivo)`: tests de prioridad (archivo < correcciones), `anio` desde `fecha`, sin cuarto argumento igual que antes y argumentos sin modificar. Verificar: tests en verde
- [x] A4.2 Validador: `fecha` en correcciones (formato, fecha imposible, año contradictorio, fecha futura como aviso) y `data/archivo-charlas.js` (id inexistente, campo desconocido, archivo ausente). Verificar: tests en verde y `node scripts/validar-datos.js` con código 0
- [x] A4.3 Revisar las 5 correcciones de C-03 contra el archivo (D2): quitar lo que repite el archivo y pasar los disertantes al nombre del archivo. Verificar: el validador no informa errores y la portada muestra los mismos títulos

### A5. Orden y fecha en la portada (TDD)

- [x] A5.1 `textoFecha("09/10/2026")` → «9 de octubre de 2026» en `js/portada-logica.js`: tests con fecha válida, inválida y ausente. Verificar: tests en verde
- [x] A5.2 `ultimasCharlas` con el orden de D5: tests con fechas del mismo año, nueva sin fecha, charla sin fecha y años distintos; los tests actuales siguen en verde. Verificar: tests en verde
- [x] A5.3 La tarjeta (`js/ficha.js`) muestra la fecha cuando existe y el año si no; cargar `data/archivo-charlas.js` en las páginas que usan el catálogo, antes de `aplicar-correcciones.js`. Verificar en el navegador: las 3 últimas charlas salen por fecha real y con la fecha visible

### A6. Punto de control

- [x] A6.1 Correr el cruce, mostrar a la autora los totales y el reporte `scripts/salida/cruce-archivo.md`, y esperar su revisión. Las dudosas que confirme se cargan en `data/correcciones.js`. Verificar: el validador sigue en código 0

## B. Contenido de Quiénes somos

- [x] B1 `data/sitio.js`: `formulario_inscripcion`, `mesa_operativa` (`mostrar: false`, `nombre`, 10 integrantes con nombre y apellido) y `declaracion_pdf` según la decisión de la autora; validador ampliado (URL `https`, campos de integrantes, sin campos de contacto). Tests primero. Verificar: tests en verde y validador en código 0
- [x] B2 `integrantesOrdenados(lista)` (TDD): orden por apellido sin distinguir tildes, apellido compuesto (Pérez Raffaelli), lista vacía o ausente. Verificar: tests en verde
- [x] B3 Sección «Ateneo · Amigos · Ciencia» en `quienes-somos.html` antes de la historia, con la cita del origen de «ateneo» (`blockquote` + fuente de títulos) y el dato de alcance (D6). Verificar: se lee sin JavaScript y el texto no usa el párrafo lírico del video
- [x] B4 Sección de la Mesa (oculta por defecto) y bloque «Sumate al Ateneo» en `js/quienes-somos.js` con `textContent` y `enlaceSeguro`. Verificar en el navegador: con `mostrar: false` no hay sección; con `true` (prueba temporal) aparecen los 10 nombres en orden; el botón abre el formulario vigente
- [x] B5 Botón «Descargar en PDF» en «Proponer una charla» según `declaracion_pdf` (hoy `null`, opción b: no se copia ningún PDF). Verificar: con `null` no hay botón; con un valor de prueba temporal, el texto indica PDF y tamaño
- [x] B6 Estilos en `css/estilos.css` bajo `.aac-web`, solo con variables del design system (sin colores ni medidas sueltas). Verificar: paridad de tokens en verde y el detector de `impeccable` limpio en Quiénes somos a 1440×900 y 390×844
- [x] B8 Foto principal de «Quiénes somos» desde `data/sitio.js` (`foto_principal`), pedido de la autora durante el apply: la foto grupal del Salón de Actos como prueba local (`img-local/`, no se versiona). Verificar: con la foto se ve junto al título; antes de commitear, `foto_principal` pasa a `null` o a una imagen optimizada de `img/`
- [x] B7 Agregar a `knowledge-base/10_preguntas_abiertas.md` la pregunta para el nexo: «¿Se llama Mesa Operativa u Organizadora? ¿Confirman que aparezcan los nombres?», con el dato de que el PDF de 2020 lista otra conformación, y (si la autora elige la opción b) el pedido del PDF de la v2.4. Verificar: la tabla de KB 10 queda bien formada

## D. Tarjetas sin subrayado (design system revisión 3)

- [x] D1 Tokens `--aac-celeste` y `--aac-celeste-hover` en `design-system/tokens.css` y `css/estilos.css`, con contraste AA medido para el texto de las tarjetas de temas. Verificar: paridad de tokens en verde y contraste ≥ 4,5:1 en ambos fondos
- [x] D2 Tarjetas de temas: fondo celeste sin bordes ni rayas ni subrayado, hover más oscuro, flecha «→» decorativa junto a la cantidad. Verificar en el navegador: aspecto, hover y foco amarillo
- [x] D3 Tarjetas de charla: toda la tarjeta enlace, título sin subrayado, elevación leve y título azul al pasar el cursor, sin movimiento con `prefers-reduced-motion`. Verificar en el navegador con teclado y con movimiento reducido emulado
- [x] D4 `design-system/` en revisión 3 (`README.md` con `Approval: pending`, `components.html` con las tarjetas nuevas) y `DESIGN.md` actualizado. Verificar: detector de `impeccable` limpio en portada y Quiénes somos a 1440×900 y 390×844

## E. Botón «Volver arriba» (pedido de la autora durante el apply, 17/11/2026)

- [x] E1 `debeMostrarVolverArriba(desplazado, altoPantalla)` en `js/portada-logica.js` (TDD): arriba, justo una pantalla, más de una pantalla, valores inválidos. Verificar: tests en verde
- [x] E2 Enlace `.volver-arriba` a `#inicio` en las tres páginas (respaldo en el HTML, `id="inicio"` en el contenedor `.aac-web`) y comportamiento en `js/marco.js`: visible tras una pantalla, desplazamiento suave solo sin movimiento reducido, foco a «Saltar al contenido». Nombre accesible «Subir: volver al inicio de la página» (incluye el texto visible, WCAG 2.5.3). Estilos con variables del design system, ≥ 44 px, sin tapar el pie en celular. Verificar en el navegador con teclado, con movimiento reducido emulado y a 390 px
- [x] E3 Detector de `impeccable` limpio en las tres páginas a 1440×900 y 390×844

## F. Respuestas de la Mesa Organizadora (Eduardo Serdoch, 17/11/2026)

- [x] F1 Zoom del semestre: `zoom_url_semestre` en `data/sitio.js` (link recurrente público), `zoom_url` de la charla lo reemplaza; botón «Entrar por Zoom» también con la charla sin anunciar (TDD de `accionesProxima` y del validador). Guía de uso en `data/LEEME.md`
- [x] F2 Modalidad «por Zoom» en portada, Quiénes somos, textos de respaldo, `components.html`, PRD, PRODUCT y KB; `lugar` opcional (`null`) en la próxima charla
- [x] F3 `entrevistas_radio` (vacía) y sección «En la radio», visible solo con entrevistas (TDD de `entrevistasVisibles` y del validador)
- [x] F4 Mesa Organizadora: renombre del campo (`mesa_organizadora`) y de los textos, 6 integrantes, `mostrar: true`
- [x] F5 Declaración: texto actual sin cambios y PDF en `null` hasta la versión reescrita (KB 10)
- [x] F6 `foto_principal: null`; foto del Salón de Actos borrada de `img-local/`
- [x] F7 Disertantes sin títulos: `quitarTitulos` en la derivación (TDD) y `data/charlas.js` regenerado (30 disertantes, solo esa línea); regla en KB 05 y DD-25
- [x] F8 KB 10 (preguntas cerradas: modalidad, Zoom, Mesa, historia, títulos, radio; abiertas: logo, Declaración nueva, foto actual) y KB 09 (DD-25)

## G. Fecha de subida, c003/c109 y video de presentación (pedido de la autora, 17/11/2026)

- [x] G1 `leerSubidas` y `resolverConSubida` (TDD): una dudosa o sin par se resuelve si una sola charla candidata se subió entre el día anterior y los 30 días siguientes y coincide en título o disertante; 1:1. `scripts/cruzar-archivo.js` usa `scripts/salida/subidas.jsonl` si existe (obtenido con `yt-dlp`, ver `scripts/LEEME.md`). Resultado: 21 resueltas; quedan 57 dudosas y 20 sin par para revisar con el reporte
- [x] G2 c003 confirmada (09/10/2026, disertantes del archivo, en `data/correcciones.js`) y c109 verificada por fecha de subida (28/05/2022 para la charla del 06/05/2022)
- [x] G3 «Ateneo · Amigos · Ciencia» y el alcance internacional reemplazados por la sección del video de presentación (`video_presentacion`, oculta con `null`), con la cita de Palas Atenea (TDD de `videoDePresentacion` y del validador)
- [x] G4 Design system revisión 3 aprobada por la autora (17/11/2026)

## C. Cierre

Notas del apply: el cruce real dio 91 seguras, 76 dudosas, 22 sin par y 5 proyecciones ignoradas (194 entradas). La regla «una charla, una entrada» se amplió durante el apply: una segura también pasa a dudosa si otra entrada dudosa tiene esa charla como candidata de año compatible (caso Alicia Seltzer 2020). Las correcciones de C-03 de c001 y c181 quedaron solo con el título; el disertante sale del archivo.


- [x] C1 Actualizar `knowledge-base/04_modelo_de_datos.md` (campo `fecha`, archivo cruzado, prioridades), `05_reglas_de_negocio.md` (orden por fecha, Mesa ocultable) y `CHANGES.md` (C-02b). Verificar: AGENTS.md y CLAUDE.md siguen idénticos
- [x] C2 Verificación final: `npm test`, `node scripts/validar-datos.js`, `openspec validate c-02b-archivo-y-quienes-somos --strict`, captura de portada y Quiénes somos a 390×844 y 1440×900 y revisión con teclado de los botones nuevos. Verificar: todo en verde y capturas revisadas
