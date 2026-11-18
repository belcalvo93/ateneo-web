# portada Specification

## Purpose
Define qué muestra la página de Inicio del Ateneo y cómo se comporta cuando los datos están completos, incompletos o no cargan, para que el público nunca vea datos a medio completar.

## Requirements

### Requirement: Secciones de la portada
`index.html` SHALL mostrar, en este orden y dentro del contenedor `.aac-web`: encabezado con la presentación del Ateneo y la tarjeta de la próxima charla, cifras, últimas charlas, temas, más vistas e invitación a proponer una charla. El orden de lectura y de teclado MUST ser el mismo en celular y en escritorio. La próxima charla SHALL ser alcanzable por enlace directo (`index.html#proxima-charla`).

#### Scenario: Navegación por anclas
- **WHEN** se activa «Contacto» en el menú principal
- **THEN** la página se desplaza al pie con los datos de contacto

#### Scenario: Próxima charla sin desplazarse de más
- **WHEN** se abre la portada en un celular de 390×844 px
- **THEN** el comienzo de la tarjeta de próxima charla queda dentro de las dos primeras pantallas, sin ninguna otra sección entre la presentación y la tarjeta

#### Scenario: Enlace directo a la próxima charla
- **WHEN** se abre `index.html#proxima-charla`
- **THEN** la página se muestra en la tarjeta de próxima charla

#### Scenario: Acceso a la videoteca
- **WHEN** se activa «Ver la videoteca» en el encabezado o «Ver todas en la videoteca» en últimas charlas
- **THEN** se abre `videoteca.html`

#### Scenario: Sin franja de redes
- **WHEN** se recorre la portada
- **THEN** no hay una sección «Seguinos»; las redes están en el pie y el aviso por WhatsApp en la tarjeta de la próxima charla

### Requirement: Ningún placeholder visible para el público
La portada MUST NOT mostrar ningún texto de datos que sea un placeholder entre corchetes (`[…]`), ni usarlo como destino de un enlace. Un dato sin completar SHALL reemplazarse por su alternativa documentada u ocultarse.

#### Scenario: Charla sin título limpio
- **WHEN** una charla tiene `titulo: "[Título]"`
- **THEN** su tarjeta muestra el título original de su primera parte

#### Scenario: Charla sin disertante
- **WHEN** una charla tiene `disertante: "[Disertante]"`
- **THEN** su tarjeta no muestra la línea del disertante

#### Scenario: Revisión de toda la página
- **WHEN** se carga la portada con los datos en su estado inicial
- **THEN** el texto visible de la página no contiene ningún corchete proveniente de los datos

### Requirement: Tarjeta de próxima charla
La portada SHALL mostrar la próxima charla con los datos de `data/proxima-charla.js`: título, disertante, descripción, cuándo, dónde y modalidad, el correo de inscripción como texto visible y un botón «Inscribirme por correo» que abre un correo a esa dirección.

#### Scenario: Próxima charla completa
- **WHEN** todos los campos de la próxima charla están completos
- **THEN** la tarjeta muestra título, disertante, descripción, fecha con día de la semana, hora, lugar y modalidad

#### Scenario: Próxima charla sin anunciar
- **WHEN** `titulo` o `fecha` siguen en placeholder
- **THEN** la tarjeta muestra un mensaje de que la próxima charla se anunciará pronto, junto con el horario y lugar habituales y el botón de inscripción, sin corchetes

#### Scenario: Dato secundario sin completar
- **WHEN** el título y la fecha están completos pero `descripcion` sigue en placeholder
- **THEN** la tarjeta se muestra sin la descripción

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

### Requirement: Charlas más vistas
La portada SHALL mostrar 3 charlas en «Las más vistas», numeradas, con la misma tarjeta con miniatura que «Últimas charlas»: primero las marcadas `destacada: true` y luego las de más visualizaciones, sin repetir ninguna. Las visualizaciones de una charla SHALL ser la suma de las de todas sus partes. Cada una muestra título, disertante y cantidad de visualizaciones.

#### Scenario: Charla en varias partes
- **WHEN** una charla tiene dos partes con 1.000 y 500 visualizaciones
- **THEN** cuenta 1.500 visualizaciones para el orden y para el texto que se muestra

#### Scenario: Sin destacadas
- **WHEN** ninguna charla tiene `destacada: true`
- **THEN** se muestran las 3 charlas con más visualizaciones, de mayor a menor

#### Scenario: Una charla destacada a mano
- **WHEN** una corrección marca una charla con `destacada: true`
- **THEN** esa charla ocupa el primer lugar y los otros dos se completan por visualizaciones

#### Scenario: Charla sin visualizaciones registradas
- **WHEN** una charla destacada no tiene visualizaciones registradas
- **THEN** se muestra sin la línea de visualizaciones

#### Scenario: Misma tarjeta que las últimas
- **WHEN** se comparan una tarjeta de «Últimas charlas» y una de «Las más vistas»
- **THEN** las dos tienen miniatura, título y disertante con el mismo aspecto, y la de más vistas suma su número de puesto y sus visualizaciones

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

### Requirement: Fallo en la carga de datos
Si los datos del catálogo, de la próxima charla o de la configuración no están disponibles, la portada SHALL mostrar un mensaje claro con un enlace al canal de YouTube en lugar de las secciones que dependen de esos datos, y MUST seguir mostrando el contenido fijo y el correo de contacto.

#### Scenario: Falta el catálogo
- **WHEN** `data/charlas.js` no carga
- **THEN** las secciones de charlas muestran el mensaje con el enlace al canal y el resto de la página se ve normal

### Requirement: Contenido seguro
Todo texto proveniente de los datos SHALL insertarse como texto y nunca interpretarse como HTML; todo enlace externo SHALL llevar `rel="noopener noreferrer"`; un enlace de los datos que no empiece con `https://` o `http://` MUST NOT usarse.

#### Scenario: Marcado dentro de un dato
- **WHEN** el título de una charla contiene `<b>` o `<script>`
- **THEN** la portada lo muestra como texto literal

#### Scenario: Enlace con otro esquema
- **WHEN** una red tiene como enlace `javascript:alert(1)`
- **THEN** esa red no se muestra

### Requirement: Accesibilidad de la portada
La portada SHALL cumplir las reglas de accesibilidad del proyecto: texto base de 18 px, contraste AA, un solo `h1` y encabezados en orden, todo control alcanzable y operable con teclado con foco visible, objetivos táctiles de 44 px o más, y texto alternativo en las imágenes con contenido.

#### Scenario: Recorrido con teclado
- **WHEN** se recorre la portada con la tecla Tab
- **THEN** se alcanzan en orden lógico todos los enlaces, botones y el bloque desplegable, con el foco visible en cada uno

#### Scenario: Tamaño de los objetivos
- **WHEN** se miden los botones y enlaces de la portada en un celular de 390 px de ancho
- **THEN** cada uno mide al menos 44 px de alto

#### Scenario: Mismo orden en celular y escritorio
- **WHEN** se compara la portada a 390 px y a 1440 px de ancho
- **THEN** las secciones aparecen en el mismo orden, que es también el orden de lectura y de teclado

#### Scenario: Sin desborde en celular
- **WHEN** se abre la portada a 390 px de ancho
- **THEN** no hay desplazamiento horizontal

### Requirement: Duración en la miniatura
Cada tarjeta de charla SHALL mostrar sobre la miniatura la duración de la charla. Si la charla tiene varias partes, la duración SHALL ser la suma de todas y la tarjeta SHALL indicar cuántas partes son. Si no se puede calcular, la tarjeta se muestra sin duración.

#### Scenario: Charla de una parte
- **WHEN** una charla tiene una sola parte de 31:40
- **THEN** su miniatura muestra «31:40»

#### Scenario: Charla en varias partes
- **WHEN** una charla tiene dos partes de 1:54:45 y 32:46
- **THEN** su miniatura muestra «2:27:31» y la tarjeta indica «2 partes»

#### Scenario: Duración inválida
- **WHEN** una parte tiene una duración mal escrita
- **THEN** la tarjeta se muestra sin duración y sin texto roto

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

### Requirement: Encabezado y próxima charla en la misma fila
En pantallas anchas, la presentación del Ateneo y la tarjeta de la próxima charla SHALL compartir la primera fila, una al lado de la otra; en pantallas angostas se apilan en ese mismo orden.

#### Scenario: Dos columnas en escritorio
- **WHEN** se abre la portada a 1440×900
- **THEN** la presentación ocupa la columna izquierda y la tarjeta de la próxima charla la derecha, ambas visibles sin desplazarse

#### Scenario: Apiladas en el celular
- **WHEN** se abre la portada a 390 px de ancho
- **THEN** la presentación va primero y la tarjeta de la próxima charla inmediatamente debajo

### Requirement: Invitación a proponer una charla en la portada
La portada SHALL cerrar con una invitación breve, de una o dos líneas, con un enlace visible «Proponer una charla» que abre esa sección de la página Quiénes somos. MUST NOT repetir la presentación del Ateneo que ya está en el encabezado.

#### Scenario: Proponer una charla desde la portada
- **WHEN** se activa «Proponer una charla» en la portada
- **THEN** se abre `quienes-somos.html` en la sección para proponer una charla

### Requirement: Gancho de tema opcional
Cada tarjeta de tema SHALL mostrar el gancho del tema debajo de su nombre solo si el tema tiene un gancho con texto. Un tema sin gancho se muestra como hasta ahora, sin hueco.

#### Scenario: Temas sin gancho
- **WHEN** ningún tema tiene gancho cargado
- **THEN** las tarjetas de tema muestran solo el nombre y la cantidad de charlas

#### Scenario: Tema con gancho
- **WHEN** se carga un gancho en un tema
- **THEN** la tarjeta de ese tema muestra ese texto entre el nombre y la cantidad de charlas

### Requirement: Aviso por WhatsApp en la próxima charla
La tarjeta de la próxima charla SHALL ofrecer un botón «Recibí el aviso de cada charla por WhatsApp» que abre el Canal de Difusión de WhatsApp de la lista configurable de redes, en una pestaña nueva y avisándolo a los lectores de pantalla. Si la lista no tiene un enlace real a un canal de WhatsApp, el botón MUST NOT mostrarse ni dejar un hueco. El botón aparece tanto con la charla anunciada como sin anunciar.

#### Scenario: Estado inicial
- **WHEN** la lista de redes tiene el Canal de WhatsApp con su enlace oficial
- **THEN** la tarjeta muestra «Recibí el aviso de cada charla por WhatsApp» y al activarlo se abre ese canal

#### Scenario: Sin canal de WhatsApp
- **WHEN** la lista de redes no tiene ningún enlace a WhatsApp, o lo tiene como placeholder
- **THEN** la tarjeta no muestra ese botón

#### Scenario: Charla sin anunciar
- **WHEN** la próxima charla todavía no tiene título ni fecha
- **THEN** la tarjeta muestra «La próxima charla se anunciará pronto» y también el botón del aviso por WhatsApp

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

### Requirement: Contador hasta la próxima charla
La tarjeta de la próxima charla SHALL mostrar, calculado con `fecha` y `hora` de `data/proxima-charla.js` en hora de Argentina (UTC−3) sin importar la zona horaria del visitante: «Faltan N días y N horas», «Hoy a las 18 hs (hora de Argentina)», «Empieza en N minutos», «En vivo ahora» o «La charla de hoy terminó». Sin fecha válida MUST NOT haber contador. Se actualiza cada minuto, sin segundos.

#### Scenario: Faltan días
- **WHEN** son las 15:00 del martes 10/11/2026 en Argentina y la charla es el 13/11/2026 a las 18:00
- **THEN** la tarjeta dice «Faltan 3 días y 3 horas»

#### Scenario: El mismo día
- **WHEN** son las 10:00 del 13/11/2026 en Argentina y la charla es ese día a las 18:00
- **THEN** la tarjeta dice «Hoy a las 18 hs (hora de Argentina)»

#### Scenario: Última hora
- **WHEN** faltan 45 minutos para el inicio
- **THEN** la tarjeta dice «Empieza en 45 minutos»

#### Scenario: Visitante en otra zona horaria
- **WHEN** alguien abre la página desde Madrid a las 22:30 de su hora, que son las 18:30 en Argentina del día de la charla
- **THEN** la tarjeta dice «En vivo ahora»

#### Scenario: Sin fecha
- **WHEN** `fecha` sigue en `[fecha]`
- **THEN** no hay contador y «Cuándo» dice «Todos los viernes a las 18 hs (hora de Argentina)»

### Requirement: Charla en vivo y terminada
Desde la hora de inicio y durante `duracion_charla_min` minutos la tarjeta SHALL decir «En vivo ahora» y mostrar «Entrar por Zoom» como botón principal. Después SHALL decir «La charla de hoy terminó» y «La próxima charla se anunciará pronto» hasta que se cargue la siguiente.

#### Scenario: En vivo
- **WHEN** son las 18:30 en Argentina del día de la charla de las 18:00 con duración 90
- **THEN** la tarjeta dice «En vivo ahora» y el primer botón es «Entrar por Zoom», destacado

#### Scenario: Terminada
- **WHEN** son las 19:30 en Argentina del día de la charla de las 18:00 con duración 90
- **THEN** la tarjeta dice «La charla de hoy terminó» y «La próxima charla se anunciará pronto»

### Requirement: Contador accesible
El contador MUST NOT estar en una región `aria-live` (no se anuncia cada minuto); el paso a «En vivo ahora» con la página abierta SHALL anunciarse una sola vez por una región de estado. Nada del contador parpadea, el texto cumple contraste AA y, sin JavaScript, la tarjeta muestra el día y la hora fijos.

#### Scenario: Anuncio único
- **WHEN** la página está abierta y la charla pasa de «Empieza en 1 minuto» a en vivo
- **THEN** un lector de pantalla anuncia una vez «La charla está en vivo ahora» y no anuncia los cambios de minuto

#### Scenario: Sin JavaScript
- **WHEN** el navegador no ejecuta JavaScript
- **THEN** la tarjeta dice «Todos los viernes a las 18 hs (hora de Argentina)»

### Requirement: Botones de Calendar y Zoom
La tarjeta de próxima charla SHALL mostrar «Agendar en mi calendario» solo si `calendar_url` tiene un enlace, y «Entrar por Zoom» solo si la charla tiene fecha y hora cargadas y el contador está en «faltan», «hoy», «empieza en N minutos» o «en vivo», con el `zoom_url` de la charla o, si no, el `zoom_url_semestre`, siempre `https`. Terminada o sin fecha, el botón MUST NOT verse: el link del semestre es fijo. Los dos abren en una pestaña nueva y lo avisan a los lectores de pantalla.

#### Scenario: Ambos enlaces cargados
- **WHEN** la charla tiene fecha, faltan días y `calendar_url` y `zoom_url` tienen un enlace `https://`
- **THEN** la tarjeta muestra los dos botones además de «Inscribirme por correo»

#### Scenario: Sin fecha cargada
- **WHEN** la próxima charla todavía no tiene fecha y `zoom_url_semestre` tiene un enlace
- **THEN** la tarjeta dice «La próxima charla se anunciará pronto» y no muestra «Entrar por Zoom»

#### Scenario: Charla terminada
- **WHEN** la charla de hoy ya terminó
- **THEN** la tarjeta no muestra «Entrar por Zoom», para que nadie entre a una sala vacía

#### Scenario: Ningún enlace cargado
- **WHEN** `calendar_url`, `zoom_url` y `zoom_url_semestre` son `null`
- **THEN** la tarjeta muestra solo «Inscribirme por correo»

#### Scenario: Link propio de una charla
- **WHEN** la charla tiene fecha, tiene `zoom_url` y también hay `zoom_url_semestre`
- **THEN** «Entrar por Zoom» lleva al `zoom_url` de la charla
