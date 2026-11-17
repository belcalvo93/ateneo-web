# Tasks

Referencia: análisis de diseño aprobado el 16/11/2026 (ver `design.md` §UI Mockups) y design system rev. 1. Strict TDD donde hay lógica: test primero (RED), mínimo código (GREEN), segundo caso (TRIANGULATE), refactor.

## 1. Red de seguridad y datos

- [x] 1.1 Correr `npm test` y `node scripts/validar-datos.js` y anotar la línea base (198 tests en verde, código 0); si algo falla, parar e informar
- [x] 1.2 (TDD) Validación de `gancho` en los temas: tests primero (ausente, `null`, texto válido, vacío, número; sin aviso en `--estricto`); después `scripts/lib/validar.js`. Verificar: tests nuevos y existentes en verde
- [x] 1.3 (TDD) Validación de `direccion` y `mapa_url` en la configuración: tests primero (estado inicial válido, `mapa_url` en `null`, sin `https://`, `direccion` vacía, campo faltante); después el validador. Verificar: tests en verde
- [x] 1.4 Agregar `gancho: null` a los 8 temas de `data/temas.js` (con su explicación en el comentario) y `direccion` y `mapa_url` a `data/sitio.js`. Verificar: `node scripts/validar-datos.js` termina con código 0 y no se escribió ningún gancho
- [x] 1.5 Documentar en `data/LEEME.md` el campo `gancho` y los campos `direccion` y `mapa_url`. Verificar: una persona puede cargar un gancho siguiendo solo esa guía

## 2. Lógica (TDD, `js/portada-logica.js` + `tests/portada-logica.test.js`)

- [x] 2.1 `duracionDeCharla`: tests primero (una parte; dos partes que pasan de una hora; tres partes; una duración inválida → `null`; sin partes → `null`). Verificar: tests en verde
- [x] 2.2 `textoPartes` («2 partes», «3 partes»; una sola parte → `null`). Verificar: tests en verde
- [x] 2.3 `conteoPorTema` devuelve el gancho visible: tests primero (sin campo, `null`, texto, placeholder entre corchetes → `null`). Verificar: tests en verde y los tests anteriores de temas adaptados
- [x] 2.4 `itemsDeMenu(pagina)`: tests primero (cuatro ítems en orden; el de la página abierta marcado y ningún otro; página desconocida → ninguno marcado; «Contacto» apunta al pie). Verificar: tests en verde
- [x] 2.5 Texto «Agendar en mi calendario» en `accionesProxima`: actualizar primero los tests existentes y después el código. Verificar: tests en verde
- [x] 2.6 Ampliar la prueba de integración con los datos reales para cubrir duración, partes y gancho sin corchetes. Verificar: `npm test` en verde

## 3. Marco compartido (`js/marco.js`)

- [x] 3.1 Crear `js/marco.js` con la barra superior, la cabecera con el logo, el menú de 4 ítems y el pie («Escribinos», redes, dirección con «Cómo llegar», enlace a «Proponer una charla»), todo con `createElement` + `textContent`; eliminar `js/pie.js`. Verificar: las redes sin enlace no aparecen, «Cómo llegar» abre el mapa en una pestaña nueva y desaparece si `mapa_url` es `null`
- [x] 3.2 Menú desplegable por debajo de 720 px: botón «Menú» con `aria-expanded` y `aria-controls`, lista con `hidden` cuando está cerrado, cierre con Escape devolviendo el foco. Verificar a mano a 390 px: abrir y cerrar con toque y con teclado, Tab no entra al menú cerrado; a 1440 px no hay botón
- [x] 3.3 Dejar en `index.html` y `videoteca.html` los contenedores del marco con su respaldo mínimo (enlaces a las tres páginas y correo) y el atributo de página. Verificar: con JavaScript desactivado se puede navegar y ver el correo; con JavaScript, el ítem de la página actual tiene `aria-current="page"` y ningún otro

## 4. Tarjeta de charla (`js/ficha.js`)

- [x] 4.1 Mover el render de la tarjeta de `js/portada.js` a `js/ficha.js`, con duración sobre la miniatura y «N partes» en la línea de datos. Verificar: «Últimas charlas» se ve igual que antes más la duración, sin corchetes
- [x] 4.2 «Las más vistas» con la misma tarjeta, más el número de puesto y las visualizaciones. Verificar: las tres tarjetas tienen miniatura y el orden coincide con `masVistas`

## 5. Portada (`index.html`, `js/portada.js`)

- [x] 5.1 Reordenar la portada: encabezado con la presentación del Ateneo (rótulo «Ateneo Amigos de la Ciencia · UTN Mendoza», título, descripción y horario dados por la autora, botones «Ver la videoteca» y «Conocé al Ateneo»; sin botón «Próxima charla»), próxima charla, cifras en una línea, franja «Seguinos», últimas, temas, más vistas e invitación a proponer una charla; quitar los paneles de «Quiénes somos» y «Proponer una charla». Verificar: mismo orden a 390 px y a 1440 px, y la tarjeta de próxima charla empieza dentro de las dos primeras pantallas a 390×844, sin otra sección en el medio
- [x] 5.2 Franja «Seguinos» desde la lista de redes. Verificar: muestra «YouTube» y «Canal de WhatsApp» como botones de 44 px o más; con todas las redes en `null` (prueba temporal) la franja no aparece
- [x] 5.3 Invitación final de una línea con el enlace «Proponer una charla» (sin repetir la presentación del encabezado). Verificar: «Conocé al Ateneo» abre `quienes-somos.html` y «Proponer una charla» abre `quienes-somos.html#proponer`
- [x] 5.4 Gancho en las tarjetas de tema. Verificar: hoy no se ve ningún gancho ni hueco; con un gancho de prueba temporal aparece entre el nombre y el conteo (y revertir la prueba)

## 6. Página Quiénes somos (`quienes-somos.html`)

- [x] 6.1 Crear la página con encabezado y bajada, línea de tiempo de 4 hitos, 4 valores y «Cómo funcionamos» (con la modalidad «en el Salón de Actos y/o por Zoom»), con textos del PRD v1.2 y sin nombrar personas. Verificar: un solo `h1`, encabezados en orden, los hitos son una lista ordenada y la página no dice «2017» como origen
- [x] 6.2 Mover «Proponer una charla» y la Declaración de Principios desde `index.html`, sin cambiar el texto, con el ancla `#proponer`. Verificar: el bloque abre con mouse y teclado, el texto es idéntico al de C-03 y no hay enlaces a `bit.ly`
- [x] 6.3 Galería desde `AAC_SITIO.fotos` en un archivo propio de la página. Verificar: vacía no muestra título ni hueco; con una imagen de prueba temporal aparece con su `alt` (y revertir la prueba)
- [x] 6.4 Revisar que no queden enlaces internos a `index.html#quienes-somos` ni `#proponer`. Verificar: una búsqueda en el repo no encuentra ninguno fuera de los changes archivados

## 7. Estilos y design system

- [x] 7.1 Estilos del menú desplegable, el encabezado compacto, las cifras en línea, la franja de redes y la etiqueta de duración, bajo `.aac-web` y solo con tokens. Verificar: capturas a 390×844 y 1440×900 sin desborde y con todos los objetivos de 44 px o más
- [x] 7.2 Estilos de la línea de tiempo, las tarjetas de valor y la página Quiénes somos. Verificar: capturas a 390×844 y 1440×900; una columna en celular
- [x] 7.3 Agregar los componentes nuevos a `design-system/components.html` y anotar la ampliación en su README. Verificar: la revisión sigue siendo la 1 y no hay colores, fuentes ni espaciados escritos a mano en las reglas nuevas

## 8. Documentación

- [x] 8.1 Actualizar el mapa del sitio y los requerimientos afectados en `docs/PRD.md`. Verificar: el PRD describe tres páginas y el menú de 4 ítems
- [x] 8.2 Actualizar `knowledge-base/` (02 descripción y navegación, 04 modelo de datos, 06 funcionalidades, 07 flujos, 08 arquitectura, 09 decisiones). Verificar: ninguna página de la KB describe «Quiénes somos» como sección de la portada
- [x] 8.3 Agregar C-03b a `CHANGES.md` y ajustar C-04 (reusa marco y tarjeta; lee `?tema=` y `?charla=`) y C-05 (queda como auditoría, sin el menú hamburguesa). Verificar: el árbol de dependencias y la tabla resumen incluyen C-03b
- [x] 8.4 Actualizar `README.md` con la página nueva y los archivos `js/marco.js` y `js/ficha.js`. Verificar: las instrucciones funcionan tal como están escritas

## 9. Verificación de integración

- [x] 9.1 Correr `npm test` y `node scripts/validar-datos.js`. Verificar: todos los tests en verde y el validador con código 0
- [x] 9.2 Recorrer las tres páginas con teclado y revisar consola y red a 390×844 y 1440×900. Verificar: foco visible, orden lógico, sin errores de consola
- [x] 9.3 Buscar corchetes en el texto visible de las tres páginas, `innerHTML` en `js/` y enlaces externos sin `rel="noopener noreferrer"`. Verificar: cero en los tres casos
- [x] 9.4 Revisión de privacidad del diff. Verificar: ningún correo o teléfono personal, ninguna foto, ningún nombre de persona en la página nueva
- [x] 9.5 Regenerar las capturas de `design-system/previews/` (390×844 y 1440×900) para que reflejen el botón contorno, el menú nuevo y los demás componentes agregados. Verificar: las capturas nuevas muestran esos componentes y el README del design system deja de decir que son anteriores

## Workflow follow-up

- Verificar el change contra specs, diseño y capturas.
- Archivar (`/opsx:archive c-03b-rediseno-portada-y-quienes-somos`) y marcar C-03b en `CHANGES.md`.
- Commit solo cuando Belén lo pida (Conventional Commits en español, sin co-autoría).
