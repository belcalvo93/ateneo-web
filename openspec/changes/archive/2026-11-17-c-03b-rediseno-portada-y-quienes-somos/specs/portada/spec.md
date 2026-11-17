# Spec Delta

## MODIFIED Requirements

### Requirement: Secciones de la portada
`index.html` SHALL mostrar, en este orden y dentro del contenedor `.aac-web`: encabezado con la presentación del Ateneo, próxima charla, cifras, franja «Seguinos», últimas charlas, temas, más vistas e invitación a proponer una charla. El orden MUST ser el mismo en celular y en escritorio. La próxima charla SHALL ser alcanzable por enlace directo (`index.html#proxima-charla`).

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

## ADDED Requirements

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

### Requirement: Franja de redes
La portada SHALL mostrar, después de la próxima charla, una franja «Seguinos» con un botón por cada red de la lista configurable que tenga un enlace real, cada uno con el nombre de la red como texto visible y de al menos 44 px. Si ninguna red tiene enlace, la franja MUST NOT mostrarse.

#### Scenario: Estado inicial
- **WHEN** la lista tiene YouTube y WhatsApp con enlace e Instagram con placeholder
- **THEN** la franja muestra dos botones, «YouTube» y «Canal de WhatsApp», y no menciona Instagram

#### Scenario: Sin redes
- **WHEN** ninguna red de la lista tiene un enlace real
- **THEN** la portada no muestra la franja ni su título

### Requirement: Presentación del Ateneo en el encabezado
El encabezado de la portada SHALL decir qué es el Ateneo antes de la próxima charla, con: el rótulo «Ateneo Amigos de la Ciencia · UTN Mendoza», el título, una descripción breve basada en la bajada institucional (agrupación sin fines de lucro, desde 2015, charlas gratuitas y abiertas), el horario habitual con la modalidad «en el Salón de Actos de la UTN FRM y/o por Zoom», y los botones «Ver la videoteca» y «Conocé al Ateneo». MUST NOT nombrar personas ni afirmar que el Ateneo nació en 2017.

#### Scenario: Qué es el Ateneo a primera vista
- **WHEN** alguien abre la portada sin conocer al Ateneo
- **THEN** antes de la tarjeta de próxima charla lee el rótulo, el título, la descripción y el horario

#### Scenario: Conocer al Ateneo
- **WHEN** se activa «Conocé al Ateneo»
- **THEN** se abre `quienes-somos.html`

#### Scenario: Sin botón duplicado de próxima charla
- **WHEN** se revisan los botones del encabezado
- **THEN** son solo «Ver la videoteca» y «Conocé al Ateneo»

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

## REMOVED Requirements

### Requirement: Quiénes somos
**Reason**: La sección completa pasa a la página propia `quienes-somos.html`; en la portada queda el resumen.
**Migration**: El contenido se rige por la capacidad `quienes-somos` (historia y valores) y por «Presentación del Ateneo en el encabezado». El ancla `index.html#quienes-somos` deja de existir: los enlaces apuntan a `quienes-somos.html`.

### Requirement: Galería de fotos preparada
**Reason**: La galería pasa a la página Quiénes somos.
**Migration**: Se rige por «Galería de fotos preparada» de la capacidad `quienes-somos`. La lista de fotos de la configuración no cambia.

### Requirement: Proponer una charla
**Reason**: La sección pasa a la página Quiénes somos.
**Migration**: Se rige por «Proponer una charla» de la capacidad `quienes-somos`. El ancla `index.html#proponer` pasa a ser `quienes-somos.html#proponer`.

### Requirement: Redes desde la lista configurable
**Reason**: El pie pasa a ser compartido por todas las páginas.
**Migration**: Se rige por «Pie con contacto, redes y cómo llegar» de la capacidad `navegacion-compartida` y por «Franja de redes» de esta capacidad.
