# Spec Delta — correcciones-manuales

## Purpose

Separa lo que corrigen o agregan las personas de lo que genera la máquina, para que regenerar el catálogo (cuando cambia el canal de YouTube) nunca pierda trabajo manual y para que quien edita vea sus cambios en el sitio sin correr ningún comando.

## ADDED Requirements

### Requirement: Archivo de correcciones por id de charla
`data/correcciones.js` SHALL definir `window.AAC_CORRECCIONES`: un objeto cuyas claves son ids de charla (`c001`…) y cuyos valores admiten `titulo`, `disertante`, `tema`, `anio`, `destacada`, `confirmados` (marcas de `revisar` ya confirmadas) y `partes` (`{ número de parte en el orden final: { url } }`, con `url` de YouTube o `null`). Las correcciones MUST NOT indexarse por título ni por id de video, y ningún script SHALL escribir este archivo.

#### Scenario: Estado inicial
- **WHEN** se crea el archivo en este change
- **THEN** `window.AAC_CORRECCIONES` es un objeto vacío y el archivo explica con comentarios y un ejemplo comentado cómo escribir una corrección

#### Scenario: Enlace resuelto a mano
- **WHEN** quien edita escribe `c124: { partes: { 2: { url: "https://www.youtube.com/watch?v=<id>" } } }`
- **THEN** en la vista combinada la parte 2 de `c124` tiene ese enlace, sin importar el título del video ni el enlace generado

### Requirement: Catálogo generado
`data/charlas.js` SHALL ser salida generada por `scripts/derivar-datos.js`, con un comentario de cabecera que diga «ARCHIVO GENERADO», que no se edita a mano, la fecha de la foto del canal y la cantidad de videos de esa foto, y dónde van las correcciones y las charlas nuevas.

#### Scenario: Cabecera del generado
- **WHEN** se regenera `data/charlas.js` con una foto del canal de 310 videos tomada el 06/11/2026
- **THEN** la cabecera dice que es un archivo generado, menciona `data/correcciones.js` y `data/charlas-nuevas.js` e informa «06/11/2026» y «310 videos»

### Requirement: Charlas nuevas a mano
`data/charlas-nuevas.js` SHALL definir `window.AAC_CHARLAS_NUEVAS` como una lista de charlas con el mismo esquema que las de `data/charlas.js`, editada a mano, para agregar charlas que no están en el catálogo generado. Sus ids MUST NOT repetir ids del catálogo generado.

#### Scenario: Charla nueva
- **WHEN** quien edita agrega una charla `c187` completa a `data/charlas-nuevas.js`
- **THEN** la vista combinada tiene 187 charlas y `c187` aparece al final

#### Scenario: Id repetido
- **WHEN** una charla nueva usa el id `c010`, que ya existe en el generado
- **THEN** el validador informa el id repetido como error en `data/charlas-nuevas.js`

### Requirement: Vista combinada en el navegador
`js/aplicar-correcciones.js` SHALL proveer una función pura `aplicarCorrecciones(generadas, correcciones, nuevas)` que devuelve las generadas, seguidas de las nuevas, con las correcciones aplicadas por id, sin modificar sus argumentos. MUST funcionar como `<script>` común (solo define `window.AAC_aplicarCorrecciones`) y con `require()` en Node, sin `import`/`export`. Lo que no corresponda (id, campo o parte inexistente) SHALL ignorarse sin lanzar errores.

#### Scenario: Sin correcciones
- **WHEN** se aplica con correcciones vacías y sin charlas nuevas
- **THEN** el resultado es igual al catálogo generado y el generado no cambia

#### Scenario: Corrección de campos
- **WHEN** una corrección de `c010` trae `titulo`, `disertante`, `tema`, `anio` y `destacada`
- **THEN** la charla `c010` de la vista combinada tiene esos valores y el resto de sus campos (partes, `titulo_original`) sigue igual

#### Scenario: Cargado como script
- **WHEN** se ejecuta el archivo en un contexto con solo un objeto `window`
- **THEN** define `window.AAC_aplicarCorrecciones` y ninguna otra variable

#### Scenario: Corrección mal escrita en el navegador
- **WHEN** una corrección apunta a `c999` (inexistente) o trae un campo `titlo`
- **THEN** la función no lanza errores y la vista combinada no incluye ese dato

### Requirement: Las correcciones limpian `revisar`
En la vista combinada, una corrección que completa `titulo` o `disertante` con texto que no sea un placeholder entre corchetes SHALL quitar esa marca de `revisar`; cada valor de `confirmados` SHALL quitar la marca del mismo nombre. Un placeholder entre corchetes no quita la marca.

#### Scenario: Disertante completado
- **WHEN** `c001` tiene `revisar: ["titulo", "disertante"]` y la corrección trae `disertante: "Prof. Juan Pérez"`
- **THEN** en la vista combinada `revisar` es `["titulo"]`

#### Scenario: Título en mayúsculas confirmado
- **WHEN** `c002` tiene `revisar: ["titulo"]` y la corrección trae `confirmados: ["titulo"]`
- **THEN** en la vista combinada `revisar` es `[]` y el título no cambia

### Requirement: Regenerar no pierde correcciones
La regeneración de `data/charlas.js` SHALL leer `data/correcciones.js` y `data/charlas-nuevas.js` solo para reservar los videos que usan y para el reporte, y MUST NOT escribirlos ni copiar en el generado títulos, disertantes, temas, años o `destacada` corregidos.

#### Scenario: Corrección que sobrevive
- **WHEN** hay una corrección de `titulo` para `c001` y se regenera `data/charlas.js`
- **THEN** `data/correcciones.js` queda byte a byte igual y la vista combinada sigue mostrando el título corregido
