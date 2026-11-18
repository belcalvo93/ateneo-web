## ADDED Requirements

### Requirement: Botón para volver arriba
Las tres páginas SHALL tener un enlace «↑ Subir» a `#inicio`, dibujado por `js/marco.js` y escrito en el HTML como respaldo, fijo abajo a la derecha, de al menos 44 px, con un nombre accesible que empiece por «Subir». Con JavaScript MUST verse solo tras bajar más de una pantalla; al usarlo SHALL subir (suave solo con `prefers-reduced-motion: no-preference`) y llevar el foco a «Saltar al contenido».

#### Scenario: Arriba de todo
- **WHEN** la página está arriba de todo o se bajó menos de una pantalla
- **THEN** el botón no se ve ni se alcanza con Tab

#### Scenario: Después de bajar
- **WHEN** se bajó más de una pantalla
- **THEN** el botón aparece abajo a la derecha con el texto «↑ Subir»

#### Scenario: Con teclado
- **WHEN** se activa el botón con Enter
- **THEN** la página vuelve al principio y el foco queda en «Saltar al contenido», visible

#### Scenario: Movimiento reducido
- **WHEN** el navegador informa `prefers-reduced-motion: reduce` y se activa el botón
- **THEN** la página salta al principio sin desplazamiento animado

#### Scenario: Sin JavaScript
- **WHEN** el navegador no ejecuta JavaScript
- **THEN** el botón es un enlace común a `#inicio` que lleva al principio de la sección del Ateneo

#### Scenario: Al final de la página en el celular
- **WHEN** se llega al final de la página en una pantalla de 390 px
- **THEN** el botón no tapa ningún texto ni enlace del pie
