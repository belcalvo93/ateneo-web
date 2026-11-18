# archivo-charlas Specification

## Purpose
Completa la fecha exacta, el disertante y, donde falta, el título de las charlas del catálogo cruzándolas con el archivo de charlas 2020–2026 del sitio viejo del Ateneo, solo cuando la coincidencia es segura, y deja el resto en un reporte para revisar a mano.

## Requirements

### Requirement: Lectura del archivo de charlas
`scripts/lib/archivo.js` SHALL leer las líneas `- <fecha> — <título> — <disertante>` de `docs/fuentes/sitio-viejo.md` y devolver cada charla con fecha en `dd/mm/aaaa`, título y disertante, tolerando meses mal escritos («abri», «noviiembre») y el «de» faltante. «(sin disertante indicado)» SHALL leerse como sin disertante. Las líneas que no se puedan leer MUST informarse sin cortar el proceso.

#### Scenario: Fecha con errores de tipeo
- **WHEN** la línea es `- 3 de abri de 2020 — Uranio en Argentina — Guillermo Pensado`
- **THEN** se lee la fecha `03/04/2020`, el título «Uranio en Argentina» y el disertante «Guillermo Pensado»

#### Scenario: Fecha sin «de» antes del año
- **WHEN** la línea es `- 11 de noviembre 2022 — Entrelazamiento cuántico — Ernesto Gandolfo`
- **THEN** se lee la fecha `11/11/2022`

#### Scenario: Mesa redonda sin disertante
- **WHEN** el disertante es «(sin disertante indicado)»
- **THEN** la charla se lee sin disertante

#### Scenario: Línea ilegible
- **WHEN** una línea tiene una fecha que no se puede interpretar
- **THEN** esa línea aparece en la lista de líneas inválidas con su número y el resto se lee igual

### Requirement: Proyecciones de videos ignoradas
El cruce SHALL ignorar las entradas del archivo que son proyecciones de videos de otras personas, reconocidas porque el disertante empieza con «Video de» o «Extracto de», y MUST listarlas aparte en el reporte como ignoradas.

#### Scenario: Video de Feynman
- **WHEN** el disertante es «Video de Richard P. Feynman»
- **THEN** la entrada no se cruza y figura en el reporte como ignorada

### Requirement: Cruce por título normalizado
El cruce SHALL comparar cada entrada con cada charla del catálogo usando el título y los títulos originales de YouTube de sus partes, normalizados (sin tildes, mayúsculas ni puntuación, sin palabras vacías ni números de parte), y el disertante. Una entrada MUST asignarse solo a una charla cuyo año aproximado difiera a lo sumo en 1 del año de la fecha.

#### Scenario: Título más largo en el archivo
- **WHEN** el archivo dice «Pinceladas Sanmartinianas. La ingeniería de lo imposible» y el video se titula «PINCELADAS SANMARTINIANAS J. M. AMORETTI»
- **THEN** la entrada coincide con esa charla

#### Scenario: Año aproximado lejano
- **WHEN** una entrada de 2020 coincide en título con una charla del catálogo de 2024
- **THEN** no se asigna como segura

### Requirement: Coincidencias seguras y dudosas
Una coincidencia SHALL ser segura solo si el título y el disertante coinciden por encima de los umbrales, el año es compatible, su puntaje supera con margen al segundo candidato y ninguna otra entrada apunta a la misma charla. Todo lo demás MUST ir al reporte como dudoso, con hasta 3 candidatos, o como sin par.

#### Scenario: Mismo disertante, varias charlas
- **WHEN** dos charlas del catálogo son de Alicia Seltzer y el título de la entrada no las distingue
- **THEN** la entrada va al reporte como dudosa con las dos candidatas

#### Scenario: Dos entradas para la misma charla
- **WHEN** dos entradas del archivo resultan seguras para la misma charla
- **THEN** ninguna se guarda y las dos van al reporte como dudosas

#### Scenario: Charla que no está en el canal
- **WHEN** ninguna charla del catálogo alcanza el umbral mínimo
- **THEN** la entrada figura en el reporte como sin par

### Requirement: Archivo de datos generado
`scripts/cruzar-archivo.js` SHALL escribir `data/archivo-charlas.js`, que define `window.AAC_ARCHIVO_CHARLAS` indexado por id de charla con `fecha` y, cuando correspondan, `disertante` y `titulo`, y un encabezado que avisa que es generado y dónde se corrige. El `titulo` MUST incluirse solo si el del catálogo es un placeholder. Correr el script dos veces con las mismas entradas MUST dar el mismo archivo.

#### Scenario: Disertante sin títulos honoríficos
- **WHEN** el archivo dice «Ernesto Gandolfo» y el video «Dr Ernesto Gandolfo Raso»
- **THEN** `data/archivo-charlas.js` guarda `disertante: "Ernesto Gandolfo"`

#### Scenario: Título existente
- **WHEN** la charla ya tiene un título real en el catálogo
- **THEN** la entrada guarda fecha y disertante pero no `titulo`

#### Scenario: Determinismo
- **WHEN** se corre el script dos veces sin cambios
- **THEN** `data/archivo-charlas.js` queda idéntico

### Requirement: Reporte de dudosos
El script SHALL escribir `scripts/salida/cruce-archivo.md` (no versionado) con los totales y, por cada entrada dudosa, la línea del archivo, sus candidatos con id, título original y puntaje, y cómo confirmarla en `data/correcciones.js`; además las entradas sin par, las ignoradas y las diferencias entre lo cruzado y lo que ya dice `data/correcciones.js`.

#### Scenario: Conflicto con una corrección manual
- **WHEN** `data/correcciones.js` dice `disertante: "J. M. Amoretti"` y el archivo «José María Amoretti»
- **THEN** el reporte lista la diferencia y la corrección manual sigue mandando

### Requirement: Sin datos personales en el cruce
El cruce MUST usar solo `docs/fuentes/sitio-viejo.md` y el catálogo, y MUST NOT leer el listado de miembros del Ateneo ni guardar correos o teléfonos.

#### Scenario: Fuentes del cruce
- **WHEN** se corre `node scripts/cruzar-archivo.js`
- **THEN** solo se leen `docs/fuentes/sitio-viejo.md`, `data/charlas.js` y `data/correcciones.js`
