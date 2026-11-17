# quienes-somos Specification

## Purpose
Define la página institucional del Ateneo: quiénes son, su historia y valores, cómo funcionan y cómo proponer una charla, en un formato breve y fácil de recorrer.

## Requirements

### Requirement: Página propia de Quiénes somos
El sitio SHALL tener una página `quienes-somos.html` con, en este orden: encabezado con la bajada institucional, historia, valores, cómo funcionamos, galería y proponer una charla. La página SHALL ser alcanzable desde el menú principal y desde el botón «Conocé al Ateneo» de la portada.

#### Scenario: Llegada desde el menú
- **WHEN** se activa «Quiénes somos» en el menú de cualquier página
- **THEN** se abre `quienes-somos.html` y ese ítem queda marcado como página actual

#### Scenario: Llegada desde la portada
- **WHEN** se activa «Conocé al Ateneo» en la portada
- **THEN** se abre `quienes-somos.html`

### Requirement: Historia en una línea de tiempo
La página SHALL contar la historia del Ateneo en cuatro hitos ordenados, cada uno con su año visible y un texto corto: el nacimiento en agosto de 2015, la constitución formal en 2016, la consolidación con el respaldo de la UTN FRM y el nombre definitivo (2016–2017), y la actualidad. MUST NOT nombrar personas ni afirmar que el Ateneo nació en 2017.

#### Scenario: Orden de los hitos
- **WHEN** se lee la historia con un lector de pantalla
- **THEN** los cuatro hitos se anuncian como una lista ordenada, del más antiguo al más reciente, con el año antes del texto

#### Scenario: Sin nombres propios
- **WHEN** se revisa el texto de la historia
- **THEN** no aparece el nombre de ningún fundador ni integrante

### Requirement: Valores del Ateneo
La página SHALL presentar cuatro valores, cada uno con un título y una frase: sin fines de lucro, trato horizontal, rigor científico, y sin proselitismo ni publicidad.

#### Scenario: Cuatro valores
- **WHEN** se abre la página
- **THEN** se ven los cuatro valores con su título y su frase, sin necesidad de desplegar nada

### Requirement: Cómo funcionamos
La página SHALL indicar el día y la hora habituales de las charlas, que se hacen en el Salón de Actos de la UTN FRM y/o por Zoom y que la entrada es libre y gratuita, con un enlace a la próxima charla de la portada.

#### Scenario: Modalidad
- **WHEN** se lee «Cómo funcionamos»
- **THEN** el texto dice «en el Salón de Actos y/o por Zoom» y no afirma que todas las charlas son presenciales

#### Scenario: Enlace a la próxima charla
- **WHEN** se activa «Ver la próxima charla»
- **THEN** se abre la portada en la tarjeta de próxima charla

### Requirement: Galería de fotos preparada
La página SHALL mostrar una galería con las fotos listadas en la configuración del sitio, cada una con su texto alternativo. Si la lista está vacía, la galería MUST NOT mostrarse ni dejar un hueco ni un título suelto.

#### Scenario: Sin fotos confirmadas
- **WHEN** la lista de fotos de la configuración está vacía
- **THEN** la página no muestra la galería ni su título

#### Scenario: Fotos cargadas
- **WHEN** la configuración lista dos fotos con su texto alternativo
- **THEN** la galería muestra esas dos fotos con ese texto alternativo

### Requirement: Proponer una charla
La página SHALL tener una sección identificable por enlace directo con qué enviar para proponer una charla, qué temas se aceptan, el texto completo de la Declaración de Principios v2.4 en un bloque desplegable y un botón «Enviar mi propuesta» que abre un correo al Ateneo. MUST NOT enlazar a `bit.ly`.

#### Scenario: Enlace directo a la sección
- **WHEN** se abre `quienes-somos.html#proponer`
- **THEN** la página se muestra en la sección «Proponer una charla»

#### Scenario: Leer la Declaración
- **WHEN** se activa el bloque desplegable con el mouse o con el teclado
- **THEN** se muestra el texto completo de la Declaración de Principios sin salir de la página

#### Scenario: Enviar una propuesta
- **WHEN** se activa «Enviar mi propuesta»
- **THEN** se abre un correo dirigido al correo de contacto del Ateneo

### Requirement: Contenido útil sin datos ni JavaScript
La historia, los valores, cómo funcionamos y la sección para proponer una charla SHALL estar escritos en la página, de modo que se lean aunque los archivos de datos no carguen o el navegador no ejecute JavaScript.

#### Scenario: Datos que no cargan
- **WHEN** `data/sitio.js` no carga
- **THEN** la página muestra todo su texto y el botón «Enviar mi propuesta» sigue abriendo un correo al Ateneo

### Requirement: Accesibilidad de la página
La página SHALL cumplir las reglas de accesibilidad del proyecto: texto base de 18 px, contraste AA, un solo `h1` y encabezados en orden, todo control operable con teclado con foco visible, objetivos táctiles de 44 px o más y texto alternativo en las fotos.

#### Scenario: Recorrido con teclado
- **WHEN** se recorre la página con la tecla Tab
- **THEN** se alcanzan en orden lógico los enlaces, el bloque desplegable y los botones, con el foco visible en cada uno

#### Scenario: Sin desborde en celular
- **WHEN** se abre la página a 390 px de ancho
- **THEN** no hay desplazamiento horizontal y la línea de tiempo y los valores se leen en una sola columna
