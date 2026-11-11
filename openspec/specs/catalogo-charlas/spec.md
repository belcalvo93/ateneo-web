# catalogo-charlas Specification

## Purpose

Define el formato, el esquema y el origen de los datos del catálogo de charlas del Ateneo (temas, charlas y sus partes en YouTube), para que las páginas los lean sin depender del diseño y para que personas que no programan puedan editarlos sin inventar información.

## Requirements

### Requirement: Archivos de datos portables
Los datos del sitio SHALL vivir solo en `data/`, como archivos `.js` que asignan una variable global `AAC_*` cada uno (`temas.js`, `charlas.js`, `charlas-nuevas.js`, `correcciones.js`, `proxima-charla.js`), sin `import`/`export`, sin dependencias entre sí al cargarse y sin red, para cargarse con `<script src>` o concatenarse en un único `<script>` en línea.

#### Scenario: Página abierta con doble clic
- **WHEN** una página incluye `data/temas.js` y `data/charlas.js` con `<script src>` y se abre desde el disco (`file://`)
- **THEN** `window.AAC_TEMAS` y `window.AAC_CHARLAS` están disponibles sin errores en la consola

#### Scenario: Pegado en línea
- **WHEN** se concatena el contenido de los cinco archivos de datos y de `js/aplicar-correcciones.js`, en cualquier orden, dentro de un solo `<script>`
- **THEN** el script se ejecuta sin errores, define las cinco variables globales de datos y la función de vista combinada

#### Scenario: Sin otras globales
- **WHEN** se ejecuta cualquiera de los archivos de datos en un contexto vacío con un objeto `window`
- **THEN** solo se agrega la variable `AAC_*` que le corresponde a `window`

### Requirement: Lista única y configurable de temas
`data/temas.js` SHALL definir la lista de temas como única fuente, con `id` (único, en minúsculas y guiones), `nombre` (completo), `etiqueta` (corta, la de los mockups) y `playlist_url` (`null` mientras no exista). La lista inicial MUST contener los 8 temas provisorios del borrador.

#### Scenario: Ocho temas iniciales
- **WHEN** se lee `window.AAC_TEMAS`
- **THEN** hay 8 temas con los nombres del borrador y las etiquetas «Geología, minería y energía», «IA y tecnología», «Agua y ambiente», «Neurociencia y salud», «Historia y cultura», «Espacio y astronomía», «Física y matemática» e «Ingeniería y sismos», todos con `playlist_url` en `null`

#### Scenario: Cambio de temas tras la reunión
- **WHEN** el Ateneo renombra un tema o cambia su etiqueta
- **THEN** alcanza con editar `data/temas.js` y ninguna charla necesita cambios mientras el `id` se mantenga

### Requirement: Esquema de charla
Cada charla de `window.AAC_CHARLAS` SHALL tener `id` (único, `c001`…), `titulo`, `disertante`, `tema` (el `id` de un tema existente), `anio` (entero, aproximado), `partes` (1 o más) y `revisar` (lista de nombres de campos dudosos, vacía si no hay dudas), y opcionalmente `destacada` (booleano `true` para fijar a mano una charla como destacada en la portada; si falta se entiende `false`).

#### Scenario: Charla completa
- **WHEN** se lee cualquier charla
- **THEN** tiene `id`, `titulo`, `disertante`, `tema`, `anio`, `partes` y `revisar`

### Requirement: Esquema de parte
Cada parte de una charla SHALL tener `duracion` (`M:SS`, `MM:SS` o `H:MM:SS`), `url` (texto o `null`), `vistas` (entero o `null`) y `titulo_original`.

#### Scenario: Charla de una sola parte
- **WHEN** se lee una charla con un único video en el borrador
- **THEN** tiene `partes` con exactamente un elemento y ese elemento conserva el `titulo_original`, la `duracion` y las vistas del borrador

#### Scenario: Charla partida en varios videos
- **WHEN** se lee una charla que en el borrador tiene 3 videos
- **THEN** tiene 3 partes, sin nombre de parte guardado

#### Scenario: Charla destacada a mano
- **WHEN** quien edita escribe `destacada: true` para una charla en `data/correcciones.js`
- **THEN** la charla es destacada en la vista combinada y la derivación no genera ni pisa ese campo

### Requirement: Nombre de parte derivado
El nombre visible de cada parte MUST NOT guardarse en los datos; SHALL derivarse de la cantidad de partes: «Charla» si la charla tiene una sola parte y «Parte N» (N desde 1, según el orden) si tiene varias.

#### Scenario: Una parte
- **WHEN** una charla tiene una sola parte
- **THEN** el nombre derivado de esa parte es «Charla»

#### Scenario: Varias partes
- **WHEN** una charla tiene dos partes
- **THEN** los nombres derivados son «Parte 1» y «Parte 2»

### Requirement: Datos desconocidos como placeholder
Los datos de texto desconocidos MUST quedar como placeholder entre corchetes (`[Título]`, `[Disertante]`) y los datos numéricos o enlaces desconocidos como `null`; MUST NOT completarse con valores inventados. Todo campo de texto en placeholder SHALL figurar en `revisar` de su charla.

#### Scenario: Disertante no extraíble
- **WHEN** el título original no permite identificar al disertante con alta confianza
- **THEN** `disertante` es `[Disertante]` y `revisar` incluye `disertante`

#### Scenario: Placeholder no visible al público
- **WHEN** una charla conserva `[Título]` o `[Disertante]`
- **THEN** el requisito para las páginas (C-03/C-04) es mostrar el `titulo_original` de la parte 1 en lugar de `[Título]` y omitir la línea del disertante; ningún texto entre corchetes llega al público

#### Scenario: URL todavía sin cruzar
- **WHEN** no se encontró con certeza el video de YouTube de una parte
- **THEN** su `url` es `null`

### Requirement: Extracción de disertante solo con alta confianza
La derivación SHALL completar `disertante` automáticamente solo cuando el título original de la primera parte, sin marcas de parte y con espacios colapsados, termina en un segmento separado por guion que empieza con un título profesional (Dr, Dra, Ing, Lic, Prof, Arq, Mg y variantes con punto) seguido de un nombre; en cualquier otro caso MUST dejar `[Disertante]`.

#### Scenario: Título profesional al final
- **WHEN** el título original es «RECICLADO QUIMICO DE RESIDUOS PLASTICOS - Dra Elangeni Gilbert»
- **THEN** `disertante` es «Dra Elangeni Gilbert»

#### Scenario: Guion sin título profesional
- **WHEN** el título original es «LA PROPORCION AUREA - NATURALEZA Y MATEMÁTICA»
- **THEN** `disertante` es `[Disertante]`

#### Scenario: Nombre sin separador
- **WHEN** el título original es «TIROIDES Y ESTRÉS   SUSANA VALDEZ»
- **THEN** `disertante` es `[Disertante]` y `revisar` incluye `disertante`

### Requirement: Limpieza mínima del título
La derivación SHALL obtener `titulo` solo cuando pudo separar al disertante con alta confianza: el texto previo al segmento del disertante, con espacios colapsados y sin marcas de parte («Parte 1», «parte II», «primera parte»). MUST NOT cambiar mayúsculas ni ortografía. En otro caso `titulo` es `[Título]`.

#### Scenario: Título recuperado
- **WHEN** el título original de la primera parte es «Entrelazamiento cuántico - Dr Ernesto Gandolfo Raso - primera parte»
- **THEN** `titulo` es «Entrelazamiento cuántico»

#### Scenario: Título en mayúsculas
- **WHEN** el título recuperado está escrito todo en mayúsculas
- **THEN** se conserva tal cual y `revisar` incluye `titulo`

#### Scenario: Sin disertante identificable
- **WHEN** la derivación no pudo separar al disertante
- **THEN** `titulo` es `[Título]`, `revisar` incluye `titulo` y cada parte conserva su `titulo_original`

### Requirement: Vistas como número
La derivación SHALL convertir las vistas de texto del borrador a entero: un número simple se toma tal cual («5» → 5) y un número con sufijo «K»/«k» se multiplica por mil y se redondea («1.2 K» → 1200, «12 k» → 12000). Cualquier otro formato MUST quedar en `null` y figurar en `revisar` como `vistas`.

#### Scenario: Vistas simples
- **WHEN** las vistas del borrador son «5»
- **THEN** `vistas` es 5

#### Scenario: Vistas en miles
- **WHEN** las vistas del borrador son «1.2 K»
- **THEN** `vistas` es 1200

#### Scenario: Formato desconocido
- **WHEN** las vistas del borrador son «1,2 mil»
- **THEN** `vistas` es `null` y `revisar` incluye `vistas`

### Requirement: Derivación reproducible y sin pérdida desde el borrador
`data/charlas.js` SHALL poder regenerarse con un comando desde `data/charlas-borrador.json`, que se conserva sin cambios como origen, y es un archivo generado que no se edita a mano (ver `correcciones-manuales`). El resultado MUST preservar las 186 charlas con sus `id`, las 310 partes, sus duraciones, `titulo_original`, `anio` y la asignación de tema.

#### Scenario: Conteos preservados
- **WHEN** se ejecuta la derivación sobre el borrador actual
- **THEN** el catálogo tiene 186 charlas y 310 partes, y por tema 35 (Geología), 30 (IA), 27 (Agua), 26 (Neurociencia), 19 (Historia), 17 (Espacio), 17 (Física) y 15 (Ingeniería)

#### Scenario: Determinismo
- **WHEN** se ejecuta la derivación dos veces sobre el mismo borrador
- **THEN** los dos archivos generados son idénticos

#### Scenario: URLs ya cruzadas
- **WHEN** se ejecuta la derivación con los enlaces confirmados del cruce con YouTube
- **THEN** cada parte confirmada recibe su `url` y las demás quedan en `null`

### Requirement: Orden de las partes
En charlas de varias partes, la derivación SHALL ordenar las partes por el número de parte indicado en su `titulo_original` («Parte 2», «PARTE II», «segunda parte») cuando todas lo indican sin repetirse; si alguna no lo indica o se repite, MUST conservar el orden del borrador y agregar `partes` a `revisar`. Si la numeración tiene huecos (p. ej. solo 2 y 3), ordena igual y agrega `partes` a `revisar`.

#### Scenario: Partes en orden inverso en el borrador
- **WHEN** el borrador lista «… Parte 3», «… Parte 2», «… Parte 1» de una charla
- **THEN** las partes quedan en el orden Parte 1, Parte 2, Parte 3

#### Scenario: Orden no determinable
- **WHEN** una charla tiene dos videos y solo el segundo indica «PARTE II»
- **THEN** se conserva el orden del borrador y `revisar` incluye `partes`

### Requirement: Año aproximado documentado
`anio` SHALL ser el `anio_aprox` del borrador (derivado de «hace X años» al 06/11/2026). Su carácter aproximado MUST quedar dicho en el comentario de cabecera de `data/charlas.js` y en la guía para editores.

#### Scenario: Lectura del año
- **WHEN** quien edita abre `data/charlas.js`
- **THEN** el comentario inicial aclara que los años son aproximados y que se corrigen a mano con el Ateneo

### Requirement: Guía borrador para editores
`data/LEEME.md` SHALL explicar en español llano qué archivos se editan a mano y cuál es generado, cómo corregir una charla en `data/correcciones.js` (por id), cómo agregar una charla en `data/charlas-nuevas.js`, cómo fijar a mano el enlace de una parte, cómo editar la próxima charla, qué significan los placeholders, `revisar` y `confirmados`, y cómo correr el validador. Es un borrador; la guía final se entrega en C-06.

#### Scenario: Persona del Ateneo agrega una charla
- **WHEN** alguien sin conocimientos de programación sigue `data/LEEME.md` para agregar una charla
- **THEN** sabe qué archivo abrir, qué campos completar, qué tema usar y cómo comprobar con el validador que no rompió nada

#### Scenario: Persona del Ateneo corrige un disertante
- **WHEN** alguien sin conocimientos de programación sigue `data/LEEME.md` para corregir el disertante de una charla
- **THEN** escribe la corrección en `data/correcciones.js` con el id de la charla, sin tocar `data/charlas.js`, y la ve en el sitio sin correr ningún comando
