## MODIFIED Requirements

### Requirement: Últimas charlas
La portada SHALL mostrar las 3 charlas más recientes de la vista combinada (generadas, nuevas, archivo cruzado y correcciones), ordenadas por año y, dentro del año, primero las nuevas sin fecha, luego las fechadas de la más nueva a la más vieja y al final las sin fecha. Cada una SHALL tener miniatura, tema, título, disertante, fecha (o año si no la tiene) y un enlace a su primera parte en YouTube.

#### Scenario: Charla agregada a mano
- **WHEN** se agrega una charla del año en curso en `data/charlas-nuevas.js`
- **THEN** aparece primera entre las últimas charlas

#### Scenario: Corrección aplicada
- **WHEN** `data/correcciones.js` corrige el título de una de las últimas charlas
- **THEN** la portada muestra el título corregido

#### Scenario: Charla sin enlace
- **WHEN** la primera parte de una charla tiene `url: null`
- **THEN** la tarjeta se muestra sin miniatura de YouTube y sin enlace roto

#### Scenario: Orden por fecha real
- **WHEN** dos charlas de 2026 tienen fechas 25/09/2026 y 09/10/2026
- **THEN** la del 09/10/2026 aparece antes

#### Scenario: Fecha visible
- **WHEN** una de las últimas charlas tiene `fecha: "09/10/2026"`
- **THEN** la tarjeta muestra «9 de octubre de 2026» en lugar del año

### Requirement: Temas con conteo
La portada SHALL listar todos los temas de `data/temas.js`, en su orden, cada uno como tarjeta enlazada a la videoteca filtrada por ese tema, con la cantidad de charlas de la vista combinada y una flecha «→» decorativa. La tarjeta SHALL tener fondo celeste suave sin bordes ni subrayado, que se oscurece al pasar el cursor, con texto en contraste AA. La cantidad de temas MUST NOT estar fija en la página.

#### Scenario: Se agrega un tema
- **WHEN** se agrega un noveno tema a `data/temas.js` y se le asignan charlas
- **THEN** la portada muestra nueve temas con sus conteos, sin cambios en el HTML ni en el código

#### Scenario: Enlace de un tema
- **WHEN** se activa la tarjeta de un tema
- **THEN** se abre `videoteca.html` con ese tema indicado en la dirección

#### Scenario: Señal de enlace sin color
- **WHEN** se ve una tarjeta de tema sin pasar el cursor
- **THEN** la flecha «→» junto a la cantidad indica que lleva a otra página, y un lector de pantalla no la anuncia

### Requirement: Enlaces opcionales de Calendar y Zoom
La tarjeta de próxima charla SHALL mostrar «Agendar en mi calendario» solo si `calendar_url` tiene un enlace, y «Entrar por Zoom» si la charla tiene `zoom_url` o, si no, si `data/sitio.js` tiene `zoom_url_semestre`, siempre `https`; el de la charla manda. El botón de Zoom MUST verse también con la charla sin anunciar. Los dos abren en una pestaña nueva y lo avisan a los lectores de pantalla.

#### Scenario: Ambos enlaces cargados
- **WHEN** `calendar_url` y `zoom_url` tienen un enlace `https://`
- **THEN** la tarjeta muestra los dos botones además de «Inscribirme por correo»

#### Scenario: El Ateneo no publica el enlace de Zoom
- **WHEN** `zoom_url` y `zoom_url_semestre` son `null` y `calendar_url` tiene un enlace
- **THEN** la tarjeta muestra «Agendar en mi calendario» y no muestra ningún botón de Zoom ni un espacio vacío en su lugar

#### Scenario: Ningún enlace cargado
- **WHEN** `calendar_url`, `zoom_url` y `zoom_url_semestre` son `null`
- **THEN** la tarjeta muestra solo «Inscribirme por correo»

#### Scenario: Zoom del semestre con la charla sin anunciar
- **WHEN** la próxima charla todavía no tiene título ni fecha y `zoom_url_semestre` tiene un enlace
- **THEN** la tarjeta dice «La próxima charla se anunciará pronto» y muestra «Entrar por Zoom» con el link del semestre

#### Scenario: Link propio de una charla
- **WHEN** la charla tiene `zoom_url` y también hay `zoom_url_semestre`
- **THEN** «Entrar por Zoom» lleva al `zoom_url` de la charla

### Requirement: Presentación del Ateneo en el encabezado
El encabezado de la portada SHALL presentar al Ateneo antes de la próxima charla: el título «Ciencia y cultura abiertas a toda la comunidad», una descripción basada en la bajada institucional (agrupación sin fines de lucro, desde 2015, charlas gratuitas y abiertas), el horario con la modalidad «por Zoom» y los botones «Ver la videoteca» y «Conocé al Ateneo». Sin rótulo encima del título; MUST NOT nombrar personas ni afirmar que el Ateneo nació en 2017.

#### Scenario: Qué es el Ateneo a primera vista
- **WHEN** alguien abre la portada sin conocer al Ateneo
- **THEN** antes de la tarjeta de próxima charla lee el título, la descripción y el horario

#### Scenario: Sin rótulo sobre el título
- **WHEN** se revisa el encabezado
- **THEN** el primer texto del encabezado es el título, sin una línea chica encima

#### Scenario: Conocer al Ateneo
- **WHEN** se activa «Conocé al Ateneo»
- **THEN** se abre `quienes-somos.html`

#### Scenario: Sin botón duplicado de próxima charla
- **WHEN** se revisan los botones del encabezado
- **THEN** son solo «Ver la videoteca» y «Conocé al Ateneo»

#### Scenario: Modalidad en el horario
- **WHEN** se lee el horario del encabezado
- **THEN** dice «Todos los viernes a las 18 hs, por Zoom» y no menciona el Salón de Actos

## REMOVED Requirements

### Requirement: Títulos de tarjeta reconocibles como enlace
**Reason**: la autora no quiere el subrayado en los títulos de tarjeta (17/11/2026).
**Migration**: lo reemplaza «Tarjetas de charla enlazadas», donde toda la tarjeta es el enlace y la miniatura sigue limpia.

## ADDED Requirements

### Requirement: Tarjetas de charla enlazadas
Cada tarjeta de charla SHALL ser en su totalidad un enlace, con el título sin subrayado. Al pasar el cursor SHALL elevarse apenas y su título pasar a azul AAC; con `prefers-reduced-motion: reduce`, MUST NOT moverse. El foco con teclado SHALL mostrar el contorno amarillo alrededor de la tarjeta. La miniatura MUST NOT tener superpuesto otro elemento que la duración.

#### Scenario: Pasar el cursor
- **WHEN** se pasa el cursor sobre una tarjeta de «Últimas charlas»
- **THEN** la tarjeta se eleva apenas y el título se ve en azul, sin subrayado

#### Scenario: Movimiento reducido
- **WHEN** el navegador informa `prefers-reduced-motion: reduce` y se pasa el cursor
- **THEN** el título cambia a azul y la tarjeta no se mueve

#### Scenario: Foco con teclado
- **WHEN** se llega a una tarjeta con Tab
- **THEN** se ve el contorno amarillo alrededor de toda la tarjeta y Enter abre la charla

#### Scenario: Miniatura limpia
- **WHEN** se ve una tarjeta de «Las más vistas»
- **THEN** sobre la miniatura solo aparece la duración, y el número de puesto está fuera de la imagen, junto al título
