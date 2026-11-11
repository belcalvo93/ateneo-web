# Spec Delta — enlaces-youtube

## Purpose

Completa de forma reproducible los enlaces de YouTube de las partes del catálogo cruzándolos con la lista de videos del canal del Ateneo, sin asignar nunca un enlace dudoso y dejando un reporte de lo que falta revisar a mano.

## ADDED Requirements

### Requirement: Cruce a partir de un archivo guardado
El cruce SHALL leer la lista de videos del canal desde un archivo local (una línea JSON por video con al menos `id` y `title`, y `duration`/`view_count` si existen) guardado en `scripts/salida/`, y MUST funcionar sin red y sin tener `yt-dlp` instalado.

#### Scenario: Cruce sin red
- **WHEN** se corre el cruce con un archivo de videos de ejemplo y sin conexión
- **THEN** produce el resultado del cruce y el reporte sin intentar conectarse

#### Scenario: Líneas inválidas
- **WHEN** el archivo de videos tiene una línea que no es JSON válido o no tiene `id`
- **THEN** esa línea se informa en el reporte y el resto se procesa igual

### Requirement: Normalización de títulos
Para comparar, los títulos SHALL normalizarse quitando tildes y diacríticos, pasando a minúsculas, reemplazando la puntuación por espacios y colapsando espacios. La normalización solo se usa para comparar; MUST NOT modificar los títulos guardados.

#### Scenario: Diferencias de formato
- **WHEN** se comparan «PINCELADAS  SANMARTINIANAS J.  M.  AMORETTI» y «Pinceladas sanmartinianas J. M. Amoretti»
- **THEN** sus formas normalizadas son iguales

#### Scenario: Palabras distintas
- **WHEN** se comparan «Intelilgencia artificial» e «Inteligencia artificial»
- **THEN** sus formas normalizadas son distintas

### Requirement: Asignación solo con coincidencia única
Una parte SHALL recibir un enlace solo si exactamente un video del canal tiene el mismo título normalizado que su `titulo_original`, o si hay varios y exactamente uno coincide también en duración (tolerancia de ±2 segundos). Cada video MUST asignarse a lo sumo a una parte.

#### Scenario: Coincidencia única
- **WHEN** un solo video del canal coincide en título normalizado con la parte
- **THEN** la parte recibe `https://www.youtube.com/watch?v=<id>` de ese video

#### Scenario: Desempate por duración
- **WHEN** dos videos coinciden en título normalizado y solo uno tiene la misma duración que la parte
- **THEN** la parte recibe el enlace de ese video

#### Scenario: Empate sin resolver
- **WHEN** dos videos coinciden en título y duración con la parte
- **THEN** la parte queda con `url` en `null` y el caso figura en el reporte como ambiguo con ambos candidatos

### Requirement: Nada aproximado se asigna solo
Las coincidencias aproximadas (títulos parecidos pero no iguales tras normalizar) MUST NOT asignarse automáticamente; SHALL listarse en el reporte como sugerencias para revisión humana.

#### Scenario: Título con un error de tipeo
- **WHEN** la parte tiene «IMTELECTUAL» y el video del canal dice «INTELECTUAL»
- **THEN** la parte queda con `url` en `null` y el reporte sugiere ese video como candidato

### Requirement: Reporte del cruce
Cada ejecución SHALL escribir un reporte legible de dudosos en `scripts/salida/` con la cantidad y el detalle de: partes sin enlace por motivo (video anterior que ya no está en el canal, ambiguas con sus candidatos, sugerencias aproximadas, sin coincidencia), enlaces manuales que no aparecen en la foto del canal, «videos nuevos o sin charla» (videos del canal que no usa ninguna parte ni charla nueva), enlaces conservados cuyo título cambió en el canal y partes asignadas.

#### Scenario: Partes sin coincidencia
- **WHEN** una parte no coincide con ningún video
- **THEN** el reporte la lista con su charla (`id`), número de parte y `titulo_original`, y su `url` sigue en `null`

#### Scenario: Video nuevo del canal
- **WHEN** la foto del canal tiene un video que no corresponde a ninguna parte ni charla nueva
- **THEN** el reporte lo lista en «videos nuevos o sin charla» y no se asigna a ninguna parte

### Requirement: Obtención reproducible de la lista del canal
El repo SHALL documentar el comando exacto de `yt-dlp` (`--flat-playlist` sobre la pestaña de videos del canal del Ateneo) que genera el archivo de entrada del cruce. `yt-dlp` es una herramienta externa opcional de la desarrolladora: MUST NOT figurar en `package.json` ni ser necesaria para usar el sitio, correr los tests o validar los datos.

#### Scenario: Sin yt-dlp instalado
- **WHEN** `yt-dlp` no está instalado
- **THEN** `npm test`, la derivación como función pura y el validador funcionan igual, y el sitio usa el `data/charlas.js` versionado; regenerar ese archivo requiere una foto del canal (`canal.jsonl`), que solo se obtiene con `yt-dlp`

#### Scenario: Reproducir el cruce
- **WHEN** alguien con `yt-dlp` instalado sigue los pasos documentados
- **THEN** obtiene el archivo de entrada, corre el cruce y regenera `data/charlas.js` con los enlaces confirmados

### Requirement: Estructura estable al regenerar
Al regenerar `data/charlas.js`, los ids de charla, la agrupación de partes, su orden, `titulo_original`, `duracion`, `anio`, `tema`, `titulo` y `disertante` SHALL salir del borrador (`data/charlas-borrador.json`) y MUST NOT cambiar por cambios en el canal (títulos, orden, videos nuevos o borrados). Una parte se identifica por id de charla y número de parte en el orden final.

#### Scenario: El canal cambia de títulos y orden
- **WHEN** la foto del canal tiene los mismos videos con otros títulos y en otro orden
- **THEN** el catálogo regenerado tiene las mismas charlas, con los mismos ids, partes y orden

### Requirement: Regeneración conservadora de enlaces
Cada parte SHALL recibir su enlace en este orden: (1) el fijado a mano en `data/correcciones.js`; (2) el que tenía en el `data/charlas.js` actual, si su video sigue en la foto del canal y el `titulo_original` de esa posición no cambió; (3) un video libre con título único según el cruce; (4) si no, `url` en `null` y la parte va al reporte de dudosos. Un video MUST usarse a lo sumo una vez (incluidos los de enlaces manuales y charlas nuevas) y lo ambiguo o aproximado MUST NOT asignarse.

#### Scenario: Título cambiado en el canal
- **WHEN** una parte tenía el video `X` y en la nueva foto `X` sigue, con otro título
- **THEN** la parte conserva el enlace a `X`, toma sus vistas actuales y el reporte lo lista como título cambiado

#### Scenario: Video vuelto a subir
- **WHEN** una parte tenía el video `X`, `X` ya no está en la foto y hay un video nuevo `Y` con un título parecido pero no igual
- **THEN** la parte queda con `url` en `null`, el reporte la lista como «el video anterior ya no está» con `Y` como sugerencia, e `Y` figura entre los videos nuevos o sin charla

#### Scenario: Enlace manual
- **WHEN** `data/correcciones.js` fija para `c010` parte 1 el video `Z`, que está en la foto
- **THEN** `Z` no se asigna a ninguna otra parte aunque coincida en título, y el generado lleva el enlace a `Z` en esa parte

#### Scenario: Enlace manual null
- **WHEN** `data/correcciones.js` fija `url: null` para una parte que por título coincidiría con un video
- **THEN** la parte queda con `url` en `null` en el generado, no se le busca enlace automático y no figura entre los dudosos

#### Scenario: Enlace manual fuera de la foto
- **WHEN** el enlace manual apunta a un video que no está en la foto (por ejemplo, no listado)
- **THEN** la vista combinada lo respeta y el reporte lo lista para revisar

### Requirement: Regresión sobre las entradas actuales
Regenerar con las entradas actuales (borrador, temas y la foto del canal con la que se generó el `data/charlas.js` vigente, sin correcciones ni charlas nuevas) SHALL reproducir el contenido de `data/charlas.js`: mismos ids, 186 charlas, 310 partes y mismas URLs y vistas, ignorando solo la cabecera generada. `node scripts/derivar-datos.js --comprobar` SHALL hacer esa comparación sin escribir archivos y terminar con código 1 si hay diferencias.

#### Scenario: Regenerar sin cambios en el canal
- **WHEN** se regenera desde el borrador con una foto del canal igual a la usada para el `data/charlas.js` actual
- **THEN** el catálogo resultante es semánticamente igual al actual

#### Scenario: Comprobar sin escribir
- **WHEN** se corre `node scripts/derivar-datos.js --comprobar` y la foto del canal cambió
- **THEN** el comando lista las diferencias, no modifica `data/charlas.js` y termina con código 1

### Requirement: Protección del catálogo
`scripts/derivar-datos.js` MUST NOT sobrescribir un `data/charlas.js` existente que no tenga la marca de archivo generado, salvo con `--forzar`, y MUST NOT escribir ningún archivo de `data/` salvo `charlas.js`.

#### Scenario: Catálogo viejo editado a mano
- **WHEN** `data/charlas.js` existe sin la marca «ARCHIVO GENERADO» y se corre la regeneración sin `--forzar`
- **THEN** el comando no escribe nada y termina con código 1 explicando por qué

### Requirement: Salidas regenerables fuera de git
Los archivos de `scripts/salida/` (foto del canal, reportes) SHALL quedar fuera del control de versiones mediante `.gitignore`, salvo `scripts/salida/.gitkeep`. Lo que el sitio necesita de la foto MUST quedar en `data/charlas.js` (enlaces, vistas, fecha y cantidad de videos).

#### Scenario: Foto nueva del canal
- **WHEN** se vuelve a obtener `scripts/salida/canal.jsonl` y se regenera el reporte
- **THEN** `git status` no muestra cambios en `scripts/salida/`
