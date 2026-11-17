# Spec Delta

## MODIFIED Requirements

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

## ADDED Requirements

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

