# Spec Delta

## MODIFIED Requirements

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

### Requirement: Presentación del Ateneo en el encabezado
El encabezado de la portada SHALL decir qué es el Ateneo antes de la próxima charla, con: el título «Ciencia y cultura abiertas a toda la comunidad», una descripción breve basada en la bajada institucional (agrupación sin fines de lucro, desde 2015, charlas gratuitas y abiertas), el horario habitual con la modalidad «en el Salón de Actos de la UTN FRM y/o por Zoom», y los botones «Ver la videoteca» y «Conocé al Ateneo». En pantallas anchas la presentación y la tarjeta de la próxima charla SHALL compartir la primera fila, una al lado de la otra. MUST NOT haber un rótulo encima del título, nombrar personas ni afirmar que el Ateneo nació en 2017.

#### Scenario: Qué es el Ateneo a primera vista
- **WHEN** alguien abre la portada sin conocer al Ateneo
- **THEN** antes de la tarjeta de próxima charla lee el título, la descripción y el horario

#### Scenario: Sin rótulo sobre el título
- **WHEN** se revisa el encabezado
- **THEN** el primer texto del encabezado es el título, sin una línea chica encima

#### Scenario: Dos columnas en escritorio
- **WHEN** se abre la portada a 1440×900
- **THEN** la presentación ocupa la columna izquierda y la tarjeta de la próxima charla la derecha, ambas visibles sin desplazarse

#### Scenario: Conocer al Ateneo
- **WHEN** se activa «Conocé al Ateneo»
- **THEN** se abre `quienes-somos.html`

#### Scenario: Sin botón duplicado de próxima charla
- **WHEN** se revisan los botones del encabezado
- **THEN** son solo «Ver la videoteca» y «Conocé al Ateneo»

## ADDED Requirements

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

## REMOVED Requirements

### Requirement: Franja de redes
**Reason**: La franja «Seguinos» quedaba suelta entre las cifras y las charlas; seguir al Ateneo tiene sentido donde está la intención, en la tarjeta de la próxima charla.
**Migration**: El canal de WhatsApp se ofrece con «Aviso por WhatsApp en la próxima charla»; todas las redes siguen en el pie («Pie con contacto, redes y cómo llegar» de `navegacion-compartida`).
