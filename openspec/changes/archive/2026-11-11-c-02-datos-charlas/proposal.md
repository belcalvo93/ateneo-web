# Proposal — C-02 `datos-charlas`

## Why

Las páginas (Portada y Videoteca, C-03/C-04) necesitan un catálogo de charlas y un archivo de «próxima charla» con un esquema estable, separados del diseño y editables por gente del Ateneo que no programa (RN-CO-01, DD-03). Hoy solo existe `data/charlas-borrador.json`: 186 charlas / 310 videos con `titulo`, `disertante` y `url` en `null`, `vistas` como texto («1.2 K», «12 k», «5») y los temas como nombres largos. Es el segundo change del camino crítico y no depende de la reunión del 10/11, así que se hace ahora dejando todo lo provisorio (temas, plataforma) en un solo lugar fácil de cambiar.

## What Changes

- **Formato de datos**: archivos `.js` en `data/` que asignan variables globales (`window.AAC_TEMAS`, `window.AAC_CHARLAS`, `window.AAC_PROXIMA_CHARLA`) en lugar de JSON + `fetch`. Funcionan abriendo la página con doble clic (`file://`) y se pueden pegar tal cual dentro de un único `<script>` en el widget de Elementor. Admiten comentarios para guiar a quien edita.
- **`data/temas.js`**: lista única y configurable de los 8 temas provisorios (`id`, `nombre`, `etiqueta` corta del mockup, `playlist_url: null`).
- **`data/charlas.js`**: catálogo final generado desde el borrador sin pérdida de datos (186 charlas, 310 partes, conteos por tema 35/30/27/26/19/17/17/15). Esquema en español: `id`, `titulo`, `disertante`, `tema` (id), `anio`, `partes[]` (`duracion`, `url`, `vistas` numérico o `null`, `titulo_original`) y `revisar[]` para datos dudosos. Disertante solo cuando se extrae con alta confianza del título; si no, placeholder `[Disertante]`. Lo mismo para el título (`[Título]`).
- **`data/proxima-charla.js`**: archivo editable aparte con placeholders `[…]` para todo valor desconocido.
- **`scripts/derivar-datos.js`**: genera `data/charlas.js` desde `data/charlas-borrador.json` (reproducible). El borrador se conserva como origen trazable.
- **`scripts/validar-datos.js`**: validador Node sin dependencias (modo normal con avisos y modo `--estricto` para antes de publicar).
- **Cruce con YouTube**: módulo puro que cruza la salida guardada de `yt-dlp --flat-playlist` con el borrador por `titulo_original` normalizado (desempate por duración, nunca asigna lo ambiguo) + reporte de pendientes. Correr `yt-dlp` de verdad es un paso **opcional y contingente** a que la usuaria lo instale; el change se puede cerrar con todas las `url` en `null`.
- **Tests `node:test`** (Strict TDD) para normalización/cruce, extracción de disertante, parseo de vistas, validador y una prueba de integración sobre los datos generados.
- **Borrador de guía para editores** (`data/LEEME.md`) en español llano; la versión final es C-06.
- **Actualización de documentación**: la KB (02, 04, 08, 09), `CLAUDE.md`/`AGENTS.md` (idénticos), `README.md` y la entrada C-02 de `CHANGES.md` dicen «JSON»; pasan a describir los archivos `.js`. Se renombran campos de la KB (`anio_aprox` → `anio`, `videos` → `partes`). **BREAKING** (solo documental): el nombre `data/charlas.json` previsto en la KB/roadmap pasa a ser `data/charlas.js`.

### Ampliación tras la revisión de la usuaria (06/11/2026)

Agustina (becaria de medios) va a reorganizar el canal de YouTube: cambiar títulos y orden, armar playlists por tema y **volver a subir videos editados** (lo que cambia su id). Los datos actuales no son definitivos y el cruce se va a volver a correr. Para que regenerar no destruya trabajo manual ni asigne enlaces a ciegas:

- **Correcciones a mano separadas** en `data/correcciones.js` (`window.AAC_CORRECCIONES`), indexadas por el **id propio de la charla** (`c001`…), nunca por título ni por id de video: `titulo`, `disertante`, `tema`, `anio`, `destacada`, `confirmados` (marcas de `revisar` ya confirmadas) y `partes` (enlace fijado a mano por número de parte). **`data/charlas.js` pasa a ser salida GENERADA** (cabecera «archivo generado, no editar», con fecha de la foto del canal y cantidad de videos).
- **Charlas nuevas a mano** en `data/charlas-nuevas.js` (`window.AAC_CHARLAS_NUEVAS`, mismo esquema que una charla): como `charlas.js` ya no se edita, agregar una charla nueva necesita su propio archivo manual.
- **Vista combinada en el navegador**: `js/aplicar-correcciones.js` (función pura, sin módulos ES; funciona como `<script>` que define una global y con `require()` en los tests) arma el catálogo final = generado + nuevas + correcciones. Quien edita ve su corrección en el sitio sin correr Node. El validador y los tests validan esa vista combinada; las correcciones a ids inexistentes, campos desconocidos o temas inválidos son errores.
- **Regeneración conservadora** (`scripts/derivar-datos.js`): la estructura (ids, agrupación y orden de partes) sale siempre del borrador; los enlaces se resuelven en este orden: enlace manual → enlace anterior cuyo video sigue en la foto del canal → título único → si no, `url: null` y la parte va al **reporte de dudosos**. Videos del canal sin charla se listan como «videos nuevos o sin charla»; lo ambiguo o aproximado son solo sugerencias. `--comprobar` verifica sin escribir que la regeneración reproduce el `charlas.js` actual (regresión: mismos ids, 186/310, mismas URLs y vistas).
- **`scripts/salida/` fuera del control de versiones** (salvo `.gitkeep`): son salidas regenerables y volátiles; la fuente de verdad versionada es `data/`. Se crea/extiende `.gitignore`.
- **Solo registro (sin implementar)**: redes sociales como lista configurable en datos (C-03); tarjeta del Ateneo en la portada de la UTN FRM (idea C-07, sujeta a validación); completar títulos/disertantes desde las descripciones de los videos con `yt-dlp`; tema desde la playlist del canal; nuevo actor (Agustina) y preguntas abiertas en la KB.

La ampliación entra en C-02: reutiliza la derivación, el cruce y el validador existentes (no los reemplaza) y no toca HTML/CSS.

Fuera de alcance: cualquier cambio de UI/HTML/CSS; cómo se muestra una charla cuyo título sigue en placeholder (C-03/C-04); datos de configuración del sitio (contacto, redes, cifras de portada), que se definen junto con la portada (C-03); carga manual de títulos/disertantes/URLs faltantes (C-05); nuevas dependencias en `package.json`.

## Capabilities

### New Capabilities
- `catalogo-charlas`: formato y esquema de los datos del sitio (temas y charlas con sus partes), reglas de placeholders y `revisar`, derivación reproducible desde el borrador y guía borrador para editores.
- `proxima-charla`: esquema del archivo editable de la próxima charla y sus formatos de fecha/hora.
- `validacion-datos`: validador de los archivos de datos (errores de esquema, avisos de pendientes, modo estricto).
- `enlaces-youtube`: cruce reproducible de los videos del canal con las partes del catálogo para completar `url` sin asignar nada dudoso; regeneración conservadora frente a cambios del canal y reporte de dudosos.
- `correcciones-manuales`: correcciones a mano por id de charla y charlas nuevas en archivos separados del generado, aplicadas en el navegador sobre el catálogo generado.

### Modified Capabilities
- `estructura-del-sitio`: la estructura de carpetas incorpora `scripts/` (herramientas de desarrollo, no parte del sitio publicado) y el comando de tests pasa a ejecutar pruebas reales y debe seguir terminando en 0.

## Impact

- **Archivos nuevos**: `data/temas.js`, `data/charlas.js`, `data/proxima-charla.js`, `data/LEEME.md`, `scripts/derivar-datos.js`, `scripts/validar-datos.js`, `scripts/cruzar-youtube.js` (+ módulos puros en `scripts/lib/`), `scripts/salida/` (salida de yt-dlp y reportes), `tests/*.test.js` y fixtures.
- **Archivos documentales modificados**: `knowledge-base/02, 04, 08, 09`, `CLAUDE.md`, `AGENTS.md`, `README.md`, `CHANGES.md`.
- **Ampliación**: nuevos `data/correcciones.js`, `data/charlas-nuevas.js`, `js/aplicar-correcciones.js`, `scripts/lib/regenerar.js`, `.gitignore` (extendido) y sus tests; `data/charlas.js` se regenera con la cabecera de archivo generado; cambian los CLI de `scripts/` y las guías (`data/LEEME.md`, `scripts/LEEME.md`, `README.md`), `CHANGES.md` y la KB (03, 04, 09, 10).
- **Sin cambios**: `index.html`, `videoteca.html`, `css/`, `package.json` (sigue sin dependencias). `js/` solo suma `aplicar-correcciones.js` (lógica de datos, sin UI).
- **Herramienta externa**: `yt-dlp` como CLI puntual de la desarrolladora (no dependencia del sitio ni de `package.json`). Tensiona la regla «único tooling permitido es `node:test`»; se encuadra en `design.md`.
- **Consumidores futuros**: C-03 (portada, «más vistas» desde `vistas`) y C-04 (videoteca, filtro por `tema` id, miniatura derivada del id del video).
