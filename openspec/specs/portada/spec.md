# portada Specification

## Purpose
Define qué muestra la página de Inicio del Ateneo y cómo se comporta cuando los datos están completos, incompletos o no cargan, para que el público nunca vea datos a medio completar.

## Requirements

### Requirement: Secciones de la portada
`index.html` SHALL mostrar, en este orden y dentro del contenedor `.aac-web`: hero con cifras, próxima charla, últimas charlas, temas, más vistas, quiénes somos, proponer una charla y pie con contacto, redes y dirección. Las secciones «Próxima charla», «Quiénes somos», «Proponer una charla» y «Contacto» SHALL ser alcanzables desde el menú principal.

#### Scenario: Navegación por anclas
- **WHEN** se activa «Quiénes somos» en el menú principal
- **THEN** la página se desplaza a esa sección

#### Scenario: Acceso a la videoteca
- **WHEN** se activa «Ver la videoteca» en el hero o «Ver todas en la videoteca» en últimas charlas
- **THEN** se abre `videoteca.html`

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
La tarjeta de próxima charla SHALL mostrar un botón «Agendar en Calendar» solo si `calendar_url` tiene un enlace, y un botón «Entrar por Zoom» solo si `zoom_url` tiene un enlace. La tarjeta MUST funcionar con ambos, con uno solo o con ninguno. Los dos abren en una pestaña nueva.

#### Scenario: Ambos enlaces cargados
- **WHEN** `calendar_url` y `zoom_url` tienen un enlace `https://`
- **THEN** la tarjeta muestra los dos botones además de «Inscribirme por correo»

#### Scenario: El Ateneo no publica el enlace de Zoom
- **WHEN** `zoom_url` es `null` y `calendar_url` tiene un enlace
- **THEN** la tarjeta muestra «Agendar en Calendar» y no muestra ningún botón de Zoom ni un espacio vacío en su lugar

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
La portada SHALL mostrar 3 charlas en «Las más vistas», numeradas: primero las marcadas `destacada: true` y luego las de más visualizaciones, sin repetir ninguna. Las visualizaciones de una charla SHALL ser la suma de las de todas sus partes. Cada una muestra título, disertante y cantidad de visualizaciones.

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

### Requirement: Temas con conteo
La portada SHALL listar todos los temas de `data/temas.js`, en su orden, cada uno con la cantidad de charlas que tiene en la vista combinada y un enlace a la videoteca filtrada por ese tema. La cantidad de temas MUST NOT estar fija en la página.

#### Scenario: Se agrega un tema
- **WHEN** se agrega un noveno tema a `data/temas.js` y se le asignan charlas
- **THEN** la portada muestra nueve temas con sus conteos, sin cambios en el HTML ni en el código

#### Scenario: Enlace de un tema
- **WHEN** se activa la tarjeta de un tema
- **THEN** se abre `videoteca.html` con ese tema indicado en la dirección

### Requirement: Quiénes somos
La sección «Quiénes somos» SHALL presentar la historia del Ateneo desde agosto de 2015, su bajada institucional y sus valores (rigor científico, clima amistoso y horizontal, acceso libre), según el PRD v1.2. MUST NOT nombrar personas ni afirmar que el Ateneo nació en 2017.

#### Scenario: Año de origen
- **WHEN** se lee la portada completa
- **THEN** la historia y las cifras cuentan desde 2015

### Requirement: Galería de fotos preparada
«Quiénes somos» SHALL mostrar una galería con las fotos listadas en la configuración del sitio, cada una con su texto alternativo. Si la lista está vacía, la galería MUST NOT mostrarse ni dejar un hueco.

#### Scenario: Sin fotos confirmadas
- **WHEN** la lista de fotos de la configuración está vacía
- **THEN** «Quiénes somos» se muestra completa y sin galería

#### Scenario: Fotos cargadas
- **WHEN** la configuración lista dos fotos con su texto alternativo
- **THEN** la galería muestra esas dos fotos con ese texto alternativo

### Requirement: Proponer una charla
La sección SHALL listar los requisitos para proponer una charla y los criterios de admisión de la Declaración de Principios, ofrecer el texto completo de la Declaración v2.4 en un bloque desplegable de la propia página y un botón «Enviar mi propuesta» que abre un correo al Ateneo. MUST NOT enlazar a `bit.ly`.

#### Scenario: Leer la Declaración
- **WHEN** se activa el bloque desplegable con el mouse o con el teclado
- **THEN** se muestra el texto completo de la Declaración de Principios sin salir de la página

#### Scenario: Enviar una propuesta
- **WHEN** se activa «Enviar mi propuesta»
- **THEN** se abre un correo dirigido al correo de contacto del Ateneo

### Requirement: Redes desde la lista configurable
El pie SHALL mostrar un enlace por cada red de la lista de la configuración del sitio que tenga un enlace real, en el orden de la lista. Una red cuyo enlace sea `null` o un placeholder MUST NOT mostrarse.

#### Scenario: Estado inicial
- **WHEN** la lista tiene YouTube y WhatsApp con enlace e Instagram con placeholder
- **THEN** el pie muestra YouTube y WhatsApp y no menciona Instagram

#### Scenario: Se completa una red
- **WHEN** se reemplaza el placeholder de Instagram por su enlace
- **THEN** el pie muestra Instagram sin cambios en el HTML

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
