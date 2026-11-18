## MODIFIED Requirements

### Requirement: Archivo de correcciones por id de charla
`data/correcciones.js` SHALL definir `window.AAC_CORRECCIONES`: un objeto cuyas claves son ids de charla (`c001`…) y cuyos valores admiten `titulo`, `disertante`, `tema`, `anio`, `fecha` (`dd/mm/aaaa`), `destacada`, `confirmados` (marcas de `revisar` ya confirmadas) y `partes` (`{ número de parte en el orden final: { url } }`, con `url` de YouTube o `null`). Las correcciones MUST NOT indexarse por título ni por id de video, y ningún script SHALL escribir este archivo.

#### Scenario: Estado inicial
- **WHEN** se crea el archivo en este change
- **THEN** `window.AAC_CORRECCIONES` es un objeto vacío y el archivo explica con comentarios y un ejemplo comentado cómo escribir una corrección

#### Scenario: Enlace resuelto a mano
- **WHEN** quien edita escribe `c124: { partes: { 2: { url: "https://www.youtube.com/watch?v=<id>" } } }`
- **THEN** en la vista combinada la parte 2 de `c124` tiene ese enlace, sin importar el título del video ni el enlace generado

#### Scenario: Fecha confirmada a mano
- **WHEN** quien edita escribe `c084: { fecha: "11/11/2022" }`
- **THEN** en la vista combinada `c084` tiene esa fecha y `anio: 2022`

### Requirement: Vista combinada en el navegador
`js/aplicar-correcciones.js` SHALL proveer una función pura `aplicarCorrecciones(generadas, correcciones, nuevas, archivo)` que devuelve las generadas, seguidas de las nuevas, con el archivo cruzado y luego las correcciones aplicados por id (lo manual gana), sin modificar sus argumentos; con `fecha`, `anio` sale de la fecha. MUST funcionar como `<script>` común y con `require()` en Node. Lo que no corresponda SHALL ignorarse sin lanzar errores.

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

#### Scenario: Archivo cruzado y corrección a la vez
- **WHEN** el archivo cruzado trae `disertante: "José María Amoretti"` para `c001` y la corrección trae `disertante: "J. M. Amoretti"`
- **THEN** la vista combinada muestra el disertante de la corrección y la fecha del archivo cruzado

#### Scenario: Sin archivo cruzado
- **WHEN** se llama sin el cuarto argumento (o `data/archivo-charlas.js` no carga)
- **THEN** el resultado es el mismo que antes de este change
