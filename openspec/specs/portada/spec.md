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

### Requirement: Enlaces opcionales de Calendar y Zoom
La tarjeta de próxima charla SHALL mostrar un botón «Agendar en mi calendario» solo si `calendar_url` tiene un enlace, y un botón «Entrar por Zoom» solo si `zoom_url` tiene un enlace. La tarjeta MUST funcionar con ambos, con uno solo o con ninguno. Los dos abren en una pestaña nueva y lo avisan a los lectores de pantalla.

#### Scenario: Ambos enlaces cargados
- **WHEN** `calendar_url` y `zoom_url` tienen un enlace `https://`
- **THEN** la tarjeta muestra los dos botones además de «Inscribirme por correo»

#### Scenario: El Ateneo no publica el enlace de Zoom
- **WHEN** `zoom_url` es `null` y `calendar_url` tiene un enlace
- **THEN** la tarjeta muestra «Agendar en mi calendario» y no muestra ningún botón de Zoom ni un espacio vacío en su lugar

#### Scenario: Ningún enlace cargado
- **WHEN** `calendar_url` y `zoom_url` son `null`
- **THEN** la tarjeta muestra solo «Inscribirme por correo»

### Requirement: Últimas charlas
La portada SHALL mostrar las 3 charlas más recientes de la vista combinada del catálogo (generadas, nuevas y correcciones), cada una con miniatura, tema, título, disertante, año y un enlace a su primera parte en YouTube.

#### Scenario: Charla agregada a mano
- **WHEN** se agrega una charla del año en curso en `data/charlas-nuevas.js`
- **THEN** aparece primera entre las últimas charlas

#### Scenario: Corrección aplicada
- **WHEN** `data/correcciones.js` corrige el título de una de las últimas charlas
- **THEN** la portada muestra el título corregido

#### Scenario: Charla sin enlace
- **WHEN** la primera parte de una charla tiene `url: null`
- **THEN** la tarjeta se muestra sin miniatura de YouTube y sin enlace roto

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
La portada SHALL listar todos los temas de `data/temas.js`, en su orden, cada uno con la cantidad de charlas que tiene en la vista combinada y un enlace a la videoteca filtrada por ese tema. La cantidad de temas MUST NOT estar fija en la página.

#### Scenario: Se agrega un tema
- **WHEN** se agrega un noveno tema a `data/temas.js` y se le asignan charlas
- **THEN** la portada muestra nueve temas con sus conteos, sin cambios en el HTML ni en el código

#### Scenario: Enlace de un tema
- **WHEN** se activa la tarjeta de un tema
- **THEN** se abre `videoteca.html` con ese tema indicado en la dirección

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
El encabezado de la portada SHALL presentar al Ateneo antes de la próxima charla: el título «Ciencia y cultura abiertas a toda la comunidad», una descripción basada en la bajada institucional (agrupación sin fines de lucro, desde 2015, charlas gratuitas y abiertas), el horario con la modalidad «en el Salón de Actos de la UTN FRM y/o por Zoom» y los botones «Ver la videoteca» y «Conocé al Ateneo». Sin rótulo encima del título; MUST NOT nombrar personas ni afirmar que el Ateneo nació en 2017.

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

### Requirement: Títulos de tarjeta reconocibles como enlace
El título de cada tarjeta de charla SHALL verse como enlace sin necesidad de pasar el mouse (por ejemplo, subrayado), y la miniatura MUST NOT tener superpuesto otro elemento que la duración de la charla.

#### Scenario: En el celular
- **WHEN** se ve una tarjeta de charla en una pantalla táctil, sin mouse
- **THEN** su título se distingue como enlace

#### Scenario: Miniatura limpia
- **WHEN** se ve una tarjeta de «Las más vistas»
- **THEN** sobre la miniatura solo aparece la duración, y el número de puesto está fuera de la imagen, junto al título
