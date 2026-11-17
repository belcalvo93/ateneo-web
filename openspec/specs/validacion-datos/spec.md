# validacion-datos Specification

## Purpose

Permite comprobar con un solo comando, sin instalar nada, que los archivos de datos del sitio están bien escritos y son coherentes, y saber qué falta completar antes de publicar.

## Requirements

### Requirement: Validador ejecutable sin dependencias
El repo SHALL incluir un validador que se ejecuta con `node scripts/validar-datos.js` (Node 22 o superior, sin `npm install`), lee los archivos de `data/` sin abrir un navegador (`correcciones.js` y `charlas-nuevas.js` se toman vacíos si faltan), arma la vista combinada con la misma función que usa el sitio (`js/aplicar-correcciones.js`), la valida e informa errores y avisos en español indicando archivo, charla (`id`) y campo.

#### Scenario: Datos correctos
- **WHEN** se corre el validador sobre datos sin errores ni pendientes
- **THEN** informa que todo está bien y termina con código 0

#### Scenario: Archivo con error de sintaxis
- **WHEN** a `data/charlas.js` le falta una coma o una llave
- **THEN** el validador informa en qué archivo está el problema y termina con código 1

#### Scenario: Archivo que no define su variable
- **WHEN** `data/temas.js` se ejecuta pero no define `window.AAC_TEMAS`
- **THEN** el validador lo informa como error y termina con código 1

### Requirement: Errores de esquema
El validador SHALL tratar como error (código 1): campos obligatorios faltantes o de tipo incorrecto, `id` de charla o de tema duplicados, `tema` inexistente, charla sin partes, `duracion` con formato inválido, `url` no nula que no sea un enlace de video de YouTube, `vistas` no entero ni nulo, `destacada` presente que no sea booleano, `anio` fuera de 2017–año actual, y en la próxima charla `fecha`/`hora` inválidas.

#### Scenario: Tema inexistente
- **WHEN** una charla tiene `tema: "quimica"` y no existe ese tema
- **THEN** el validador informa el `id` de la charla y el tema desconocido y termina con código 1

#### Scenario: Id duplicado
- **WHEN** dos charlas tienen `id: "c010"`
- **THEN** el validador informa el duplicado y termina con código 1

#### Scenario: Duración mal escrita
- **WHEN** una parte tiene `duracion: "1h10"`
- **THEN** el validador informa la charla, el número de parte y el campo `duracion`

#### Scenario: Destacada mal escrita
- **WHEN** una charla tiene `destacada: "si"`
- **THEN** el validador informa la charla y el campo `destacada` como error

#### Scenario: URL que no es de YouTube
- **WHEN** una parte tiene `url: "https://ejemplo.com/video"`
- **THEN** el validador lo informa como error

### Requirement: Coherencia de temas
El validador SHALL comprobar que los `id` de tema son únicos, que cada tema tiene `nombre` y `etiqueta` no vacíos, que `gancho`, si está, es `null` o un texto no vacío, y avisar si algún tema queda sin charlas.

#### Scenario: Tema vacío
- **WHEN** un tema no tiene ninguna charla asignada
- **THEN** el validador muestra un aviso con el nombre del tema, sin cortar con error

#### Scenario: Gancho ausente o nulo
- **WHEN** un tema no tiene `gancho` o lo tiene en `null`
- **THEN** el validador no informa error ni aviso por ese campo, ni siquiera en modo estricto

#### Scenario: Gancho mal escrito
- **WHEN** un tema tiene `gancho: ""` o `gancho: 5`
- **THEN** el validador informa el tema y el campo `gancho` como error

### Requirement: Avisos de pendientes
El validador SHALL mostrar un aviso, sin cortar con error, por cada placeholder entre corchetes, cada entrada de `revisar` y cada `url` en `null`, y un resumen con la cantidad de cada tipo.

#### Scenario: Catálogo recién derivado
- **WHEN** se corre el validador sobre el catálogo derivado del borrador sin URLs cruzadas
- **THEN** termina con código 0 y el resumen informa 310 partes sin `url` y la cantidad de charlas con `revisar`

### Requirement: Modo estricto para publicar
Con la opción `--estricto`, el validador SHALL terminar con código 1 si queda cualquier aviso de pendientes (placeholder, `revisar` o `url` nula), además de los errores de esquema.

#### Scenario: Pendientes en modo estricto
- **WHEN** se corre `node scripts/validar-datos.js --estricto` y queda una charla con `[Disertante]`
- **THEN** el validador lista ese pendiente y termina con código 1

#### Scenario: Todo completo en modo estricto
- **WHEN** se corre en modo estricto sobre datos sin errores ni pendientes
- **THEN** termina con código 0

### Requirement: Validación de correcciones
El validador SHALL tratar como error en `data/correcciones.js`: una clave que no sea id de charla generada o nueva, un campo desconocido, un valor de tipo incorrecto, un `tema` inexistente, `confirmados` con marcas desconocidas, y en `partes` un número de parte inexistente, un campo distinto de `url` o una `url` que no sea `null` ni un video de YouTube. Los avisos de pendientes SHALL calcularse sobre la vista combinada.

#### Scenario: Corrección a una charla que no existe
- **WHEN** `data/correcciones.js` tiene una entrada `c999`
- **THEN** el validador informa en `data/correcciones.js` que la charla `c999` no existe y termina con código 1

#### Scenario: Campo desconocido
- **WHEN** una corrección trae `titlo: "…"`
- **THEN** el validador informa la charla y el campo `titlo` como desconocido y termina con código 1

#### Scenario: Tema inválido en una corrección
- **WHEN** una corrección trae `tema: "quimica"`
- **THEN** el validador informa en `data/correcciones.js` la charla y el tema desconocido y termina con código 1

#### Scenario: Parte inexistente
- **WHEN** una corrección fija `partes: { 3: { url: … } }` en una charla de dos partes
- **THEN** el validador informa la charla y la parte 3 como inexistente

#### Scenario: Pendiente resuelto por corrección
- **WHEN** una charla generada tiene `disertante: "[Disertante]"` y una corrección completa el disertante
- **THEN** el validador ya no muestra ese pendiente ni la marca `disertante` de `revisar`

### Requirement: Validación de la configuración del sitio
El validador SHALL leer `data/sitio.js` y tratar como error: que no defina `window.AAC_SITIO`, un campo faltante o desconocido, `correo` que no sea una dirección de correo, `canal_youtube` que no sea un enlace `https://`, `conferencias` o `direccion` vacíos, `mapa_url` que no sea `null` ni un enlace `https://`, una red sin `nombre`, una `url` de red que no sea `null`, un placeholder ni un enlace `https://`, y una foto sin `archivo` o sin `alt`.

#### Scenario: Configuración correcta
- **WHEN** se corre el validador con la configuración en su estado inicial
- **THEN** no informa errores en `data/sitio.js`

#### Scenario: Red con enlace mal escrito
- **WHEN** una red tiene `url: "instagram.com/ateneo"` sin `https://`
- **THEN** el validador informa en `data/sitio.js` la red y el campo `url` y termina con código 1

#### Scenario: Foto sin texto alternativo
- **WHEN** una foto tiene `alt` vacío
- **THEN** el validador informa en `data/sitio.js` la foto y el campo `alt` como error

#### Scenario: Campo desconocido
- **WHEN** la configuración trae `redez: […]`
- **THEN** el validador informa el campo `redez` como desconocido y termina con código 1

#### Scenario: Mapa mal escrito
- **WHEN** `mapa_url` es «maps.google.com/…» sin `https://`
- **THEN** el validador informa en `data/sitio.js` el campo `mapa_url` como error

### Requirement: Avisos de redes pendientes
El validador SHALL mostrar un aviso, sin cortar con error, por cada red cuya `url` sea `null` o un placeholder, e incluirlos en el resumen. Como la página oculta esas redes, esos avisos MUST NOT hacer fallar el modo `--estricto`.

#### Scenario: Instagram sin enlace
- **WHEN** Instagram tiene un placeholder como `url`
- **THEN** el validador muestra un aviso con el nombre de la red y termina con código 0

#### Scenario: Red pendiente en modo estricto
- **WHEN** se corre con `--estricto`, sin otros pendientes, y una red sigue con placeholder
- **THEN** el validador muestra el aviso de esa red y termina con código 0

### Requirement: Validación del enlace para agendar
El validador SHALL aceptar `calendar_url` en la próxima charla como `null` o como un enlace que empieza con `https://`, y tratar cualquier otro valor como error. `calendar_url` y `zoom_url` en `null` MUST NOT generar avisos de pendientes, ni siquiera en modo estricto.

#### Scenario: Enlace válido
- **WHEN** `calendar_url` es un enlace `https://`
- **THEN** el validador lo acepta

#### Scenario: Valor inválido
- **WHEN** `calendar_url` es un número o un texto sin `https://`
- **THEN** el validador informa un error en `calendar_url` y termina con código 1

#### Scenario: Sin enlaces en modo estricto
- **WHEN** se corre con `--estricto`, sin otros pendientes, y `zoom_url` y `calendar_url` son `null`
- **THEN** el validador termina con código 0
