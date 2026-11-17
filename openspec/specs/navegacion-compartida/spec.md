# navegacion-compartida Specification

## Purpose
Define la cabecera, el menú principal y el pie que comparten todas las páginas del sitio, para que se mantengan en un solo lugar y se usen igual de bien con mouse, teclado, lector de pantalla y celular.

## Requirements

### Requirement: Cabecera y pie definidos en un solo lugar
La cabecera con el logo, el menú principal y el pie SHALL estar definidos una sola vez y mostrarse iguales en todas las páginas del sitio. Agregar, quitar o renombrar un ítem del menú MUST requerir un cambio en un solo archivo. El sitio no dibuja una barra superior propia.

#### Scenario: Mismo menú en todas las páginas
- **WHEN** se abren Inicio, Videoteca y Quiénes somos
- **THEN** las tres muestran la misma cabecera, el mismo menú y el mismo pie

#### Scenario: Cambio en un solo lugar
- **WHEN** se renombra un ítem del menú en su definición
- **THEN** el cambio se ve en las tres páginas sin editar ninguna de ellas

#### Scenario: Logo visible
- **WHEN** se abre cualquier página a 1440 px de ancho
- **THEN** el logo de la cabecera se ve más grande que el texto del menú y es un enlace al inicio

### Requirement: Menú principal de cuatro ítems
El menú principal SHALL tener exactamente estos ítems, en este orden: Inicio, Videoteca, Quiénes somos y Contacto. «Contacto» lleva al pie de la página en la que se está. El ítem de la página abierta MUST estar marcado como página actual, y ningún otro.

#### Scenario: Página actual
- **WHEN** se abre `quienes-somos.html`
- **THEN** «Quiénes somos» está marcado como página actual y los otros tres ítems no

#### Scenario: Contacto
- **WHEN** se activa «Contacto» en cualquier página
- **THEN** la vista se desplaza al pie de esa misma página

### Requirement: Menú desplegable en pantallas chicas
En pantallas angostas el menú SHALL colapsarse detrás de un botón con el texto visible «Menú». El botón MUST indicar a los lectores de pantalla si el menú está abierto o cerrado, operarse con teclado y medir al menos 44 px. En pantallas anchas el menú se muestra completo y el botón no aparece.

#### Scenario: Abrir y cerrar con un toque
- **WHEN** en un celular se toca «Menú»
- **THEN** se muestran los cuatro ítems, uno por línea, y el botón pasa a indicar que el menú está abierto

#### Scenario: Cerrar con Escape
- **WHEN** el menú está abierto y se presiona Escape
- **THEN** el menú se cierra y el foco vuelve al botón «Menú»

#### Scenario: Menú cerrado fuera del recorrido
- **WHEN** el menú está cerrado y se recorre la página con Tab
- **THEN** el foco pasa por el botón «Menú» y no entra a los ítems ocultos

#### Scenario: Pantalla ancha
- **WHEN** se abre la página a 1440 px de ancho
- **THEN** los cuatro ítems se ven en una línea y no hay botón «Menú»

### Requirement: Navegación disponible sin JavaScript
Cada página SHALL incluir, escritos en su HTML, los enlaces a Inicio, Videoteca y Quiénes somos y el correo de contacto, de modo que se pueda navegar y escribir al Ateneo aunque el navegador no ejecute JavaScript.

#### Scenario: Sin JavaScript
- **WHEN** se abre cualquier página con JavaScript desactivado
- **THEN** se ven los enlaces a las tres páginas, todos visibles sin tener que abrir ningún menú, y el correo de contacto

### Requirement: Pie con contacto, redes y cómo llegar
El pie SHALL mostrar: «Escribinos» con el correo de contacto, las redes de la lista configurable que tengan un enlace real, la dirección con un enlace «Cómo llegar» que abre el mapa, y un enlace a «Proponer una charla». Una red cuyo enlace sea `null` o un placeholder MUST NOT mostrarse.

#### Scenario: Estado inicial de las redes
- **WHEN** la lista tiene YouTube y WhatsApp con enlace e Instagram con placeholder
- **THEN** el pie muestra YouTube y WhatsApp y no menciona Instagram

#### Scenario: Cómo llegar
- **WHEN** se activa «Cómo llegar»
- **THEN** se abre en una pestaña nueva el mapa con la dirección de la UTN FRM

#### Scenario: Sin enlace de mapa
- **WHEN** la configuración no tiene un enlace de mapa válido
- **THEN** el pie muestra la dirección como texto, sin el enlace «Cómo llegar»

#### Scenario: Proponer una charla desde el pie
- **WHEN** se activa «Proponer una charla» en el pie de cualquier página
- **THEN** se abre `quienes-somos.html` en la sección para proponer una charla

### Requirement: Logo de la UTN en el pie
El pie de todas las páginas SHALL mostrar el logo oficial de la UTN Facultad Regional Mendoza, sin redibujar, en blanco sobre el fondo negro, junto a la línea «Una actividad de la UTN Facultad Regional Mendoza», con el texto alternativo «Universidad Tecnológica Nacional – Facultad Regional Mendoza». El logo de la UTN MUST NOT aparecer en la cabecera.

#### Scenario: Pie de cualquier página
- **WHEN** se abre Inicio, Videoteca o Quiénes somos
- **THEN** el pie muestra el logo de la UTN en blanco y la línea «Una actividad de la UTN Facultad Regional Mendoza»

#### Scenario: Lector de pantalla
- **WHEN** un lector de pantalla llega al logo de la UTN
- **THEN** anuncia «Universidad Tecnológica Nacional – Facultad Regional Mendoza»

#### Scenario: Cabecera sin logo de la UTN
- **WHEN** se revisa la cabecera de cualquier página
- **THEN** solo muestra el logo del Ateneo, porque dentro de la web de la UTN la facultad ya muestra el suyo arriba
