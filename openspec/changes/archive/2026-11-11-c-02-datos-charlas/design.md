# Design — C-02 `datos-charlas`

## Context

Motivación y alcance: ver `proposal.md`. Requisitos: ver `specs/`.

Estado observado del repo (06/11/2026):

- `data/charlas-borrador.json`: `{ _nota, temas[8], charlas[186] }`. Cada charla: `id`, `tema` (nombre largo), `titulo: null`, `disertante: null`, `anio_aprox` (2020–2026), `videos[]` (`titulo_original`, `duracion`, `vistas`, `url: null`). 310 videos en total. Formatos de `vistas` presentes: `"5"`, `"15"`, `"1 K"`, `"1.2 K"`, `"12 k"` (minúscula). Duraciones: `M:SS`, `MM:SS`, `H:MM:SS`. Conteos por tema: 35/30/27/26/19/17/17/15 (coinciden con la KB).
- Los títulos originales son muy heterogéneos: todo en mayúsculas, dobles espacios, marcas de parte variadas («Parte 1», «PARTE II», «primera parte», «Parte 3 DEBATE», «II» suelto), disertante con o sin separador («- Dra X», «X:», «por X», nada).
- `js/` y `tests/` vacíos; `package.json` sin dependencias con `"test": "node --test"`; no existe `scripts/`. Sin `"type": "module"` → los `.js` de Node son CommonJS.
- El mockup de Videoteca usa las 8 etiquetas cortas y ya muestra `[Disertante]` como placeholder en una ficha, lo que confirma la convención de corchetes.
- `yt-dlp` está instalado en esta máquina (2026.10.26, se invoca como `python -m yt_dlp`), además de Node 24 y Python 3.14.

Restricciones: HTML/CSS/JS puro sin build ni dependencias; el código y los datos deben poder pegarse en un widget HTML de Elementor (plataforma a confirmar el 10/11); nunca inventar datos.

## Goals / Non-Goals

**Goals:**
- Datos cargables igual desde `file://`, desde un servidor o pegados en línea, sin cambiar los archivos.
- Toda transformación del borrador es reproducible por comando y testeada con `node:test` sin red ni herramientas externas.
- Que lo dudoso quede siempre visible (placeholder / `revisar` / reporte) y nunca «arreglado» en silencio.

**Non-Goals:**
- Renderizar datos en las páginas, decidir cómo se muestra un `[Título]` (C-03/C-04).
- Completar a mano títulos, disertantes y URLs que el cruce no resuelva (C-05).
- Configuración del sitio (contacto, redes, cifras de portada): se define cuando la consuma la portada (C-03).
- Instalar `yt-dlp` o automatizar su ejecución.

## Decisions

### D1 — Datos como archivos `.js` con variables globales, no JSON + `fetch`

**Decisión**: cada archivo de `data/` es un script que asigna una sola global:

```js
// data/temas.js
window.AAC_TEMAS = [ /* … */ ];
```

**Explicación en palabras simples**: un archivo `.json` hay que «pedirlo» desde la página con `fetch`, y los navegadores bloquean ese pedido cuando la página se abre con doble clic desde la computadora (`file://`); además, dentro de un widget de Elementor no sabemos si vamos a poder subir ese archivo a algún lado. Un archivo `.js` en cambio se carga con una etiqueta `<script>` común —que sí funciona con doble clic— y, si no se puede alojar, se copia y se pega su contenido dentro del widget. Para quien edita, se ve casi igual que un JSON, pero admite comentarios (`// así se escribe la fecha`) y no se rompe por dejar una coma de más al final de una lista.

**Alternativas**: (a) JSON + `fetch`: falla en `file://` (CORS en Chromium) y depende de hospedar el archivo; (b) JSON dentro de `<script type="application/json">`: no admite comentarios y obliga a editar el HTML; (c) un solo archivo de datos: mezcla lo que se edita cada semana (próxima charla) con lo que casi no cambia (catálogo) y agranda el riesgo de romper todo con un error.

**Detalles**:
- Sin `import`/`export`, sin `const`/`let` de nivel superior (se usa `window.X = …`) para poder concatenar los tres archivos en un solo `<script>` sin choques de nombres.
- El código de las páginas (C-03/C-04) leerá `window.AAC_*`; el orden de carga entre los tres archivos de datos es indiferente.
- `data/charlas.js` generado escribe el arreglo con `JSON.stringify(…, null, 2)`: es JS válido y además el cuerpo es JSON válido, así que si la plataforma final exigiera `.json` la vuelta atrás es mecánica.
- Cambia la redacción de KB 02/04/08/09, `CLAUDE.md`/`AGENTS.md` (tabla de stack: «Archivos JSON»), `README.md` y la entrada C-02 de `CHANGES.md`: hay tareas explícitas para eso.

### D2 — Esquema (nombres en español)

```js
// data/temas.js
window.AAC_TEMAS = [
  { id: "geologia", nombre: "Geología, minería y energía", etiqueta: "Geología, minería y energía", playlist_url: null },
  { id: "ia-tecnologia", nombre: "Inteligencia artificial y tecnología", etiqueta: "IA y tecnología", playlist_url: null },
  // agua-ambiente, neurociencia-salud, historia-cultura, espacio-astronomia, fisica-matematica, ingenieria-sismos
];

// data/charlas.js (fragmento)
window.AAC_CHARLAS = [
  {
    "id": "c002",
    "titulo": "RECICLADO QUIMICO DE RESIDUOS PLASTICOS",
    "disertante": "Dra Elangeni Gilbert",
    "tema": "agua-ambiente",
    "anio": 2026,
    "partes": [
      { "duracion": "31:40", "url": null, "vistas": 15,
        "titulo_original": "RECICLADO QUIMICO DE RESIDUOS PLASTICOS - Dra Elangeni Gilbert" }
    ],
    "revisar": ["titulo"]
  }
];

// data/proxima-charla.js
window.AAC_PROXIMA_CHARLA = {
  titulo: "[Título de la charla]",
  disertante: "[Disertante]",
  descripcion: "[Descripción breve, 1 o 2 líneas]",
  fecha: "[fecha]",              // DD/MM/AAAA, por ejemplo "14/11/2026"
  hora: "18:00",                 // HH:MM, 24 horas (habitual: viernes 18 hs)
  lugar: "Salón de Actos UTN FRM, Rodríguez 273, Ciudad de Mendoza",
  modalidad: "Presencial y por Zoom",
  zoom_url: null,                // pegar el enlace cuando el Ateneo lo confirme
  correo_inscripcion: "ateneoac.mo@gmail.com",
};
```

- **Ids de tema** cortos en kebab-case derivados de la etiqueta; el orden del arreglo es el de los chips del mockup. Renombrar un tema = editar `nombre`/`etiqueta`, no tocar charlas.
- **`anio`** reemplaza a `anio_aprox`. Convención: es siempre aproximado (SU-05) y se dice en el comentario de cabecera de `charlas.js` y en `LEEME.md`; **no** se marca en `revisar` de cada charla (serían 186 avisos idénticos y el modo estricto nunca pasaría por un dato que el Ateneo quizás nunca corrija).
- **`partes`** reemplaza a `videos`. El nombre visible («Charla» / «Parte N», RN-VI-05) **se deriva** de la cantidad y el orden: guardarlo duplicaría información que se puede desincronizar al agregar o quitar una parte, y quien edita tendría un campo más para equivocarse.
- **`titulo_original`** se conserva por parte (trazabilidad, cruce con YouTube y respaldo de visualización).
- **`vistas`** entero o `null`; es una foto aproximada que sirve para «más vistas» (C-03).
- **Miniatura**: no se guarda; se deriva del id del video (`https://i.ytimg.com/vi/<id>/hqdefault.jpg`) en C-04.
- **`revisar`**: lista de nombres de campo de la charla (`titulo`, `disertante`, `vistas`, `partes`). Se quita a mano la entrada al confirmar el dato.
- **Fecha `DD/MM/AAAA`** y **hora `HH:MM`**: es como se escribe en Argentina; el código (C-03) la convierte. `AAAA-MM-DD` sería más «técnico» pero propenso a errores para no programadores.
- **Valores precargados en la próxima charla**: solo los documentados en la KB (RN-PC-02, RN-PC-03). Todo lo demás, placeholder.

### D3 — Derivación del borrador (`scripts/derivar-datos.js`)

Pipeline puro (`scripts/lib/derivar.js`) + CLI que escribe el archivo:

1. Mapear `tema` (nombre largo) → `id` usando `data/temas.js`; si un nombre no existe, error (no se adivina).
2. `anio_aprox` → `anio`; `videos` → `partes`, `vistas` parseadas (D4).
3. **Orden de partes**: medido sobre el borrador, de las 104 charlas con varias partes, 43 vienen en orden ascendente, **28 en orden inverso** (p. ej. c124 «4,3,2,1», c157 «2,3,1»; el borrador heredó el orden «más nuevo primero» del canal) y 33 tienen al menos un video sin número de parte. Como el nombre «Parte N» se deriva del orden (D2), se reordena por el número extraído del título (`Parte 2`, `PARTE II`, `segunda parte`) solo si todas las partes lo tienen y no se repite; si no, se conserva el orden y se marca `revisar: "partes"` (≈ 33 charlas). Si la numeración tiene huecos, como c179 («3,2», sin parte 1), se ordena (2, 3) pero también se marca `revisar: "partes"`, porque se mostraría «Parte 1, Parte 2».
4. Disertante y título según D5, sobre el `titulo_original` de la **primera** parte ya ordenada.
5. Si existe `scripts/salida/enlaces-confirmados.json` (salida del cruce, D6), completar `url` y reemplazar `vistas` por el `view_count` real del canal en las partes confirmadas.
6. Serializar con cabecera de comentarios (origen, fecha de generación omitida para que la salida sea determinística, aclaración de año aproximado, cómo validar).

Salvaguarda: el CLI no sobrescribe un `data/charlas.js` existente salvo con `--forzar`, porque a partir de C-05 ese archivo se edita a mano y pasa a ser la fuente de verdad. **Reemplazado por D12/D14**: `charlas.js` pasa a ser siempre generado y lo manual vive en otros archivos; el paso 5 ya no lee `enlaces-confirmados.json` sino que el cruce se hace dentro de la regeneración.

### D4 — Parseo de vistas

`^\d+$` → entero; `^(\d+(?:\.\d+)?)\s*[kK]$` → `Math.round(n * 1000)`; cualquier otra cosa → `null` + `revisar: "vistas"`. No se interpreta «mil», comas decimales ni «M»: no aparecen en el borrador y adivinarlas arriesga errores de 1000×.

### D5 — Disertante y título: solo categoría A

Medición sobre las 186 charlas (exploración previa): A) separador + título profesional al final ≈ 30 (16 %); B) marcador ambiguo (`- X`, `X:`, `por X`) = 59; C) sin marcador = 97.

Algoritmo (`scripts/lib/disertante.js`):
1. Colapsar espacios y quitar al final marcas de parte: `[-–,]? (parte|pte) (\d+|[IVX]+)`, `(primera|segunda|tercera|cuarta) parte`, con un posible sufijo `(debate|intercambio)` o entre paréntesis.
2. Buscar el **último** separador ` - ` o ` – ` y probar el segmento derecho contra `^(Dr|Dra|Ing|Lic|Prof|Profa|Arq|Mg|Mgter|Bioq|Geól)\.?( (Dr|Ing)\.?)? <nombre>$`, sin distinguir mayúsculas, donde `<nombre>` son 1 a 5 palabras con letras, puntos o iniciales, sin dígitos y sin « y »/« con » (dos disertantes o texto → no es A).
3. Si coincide: `disertante` = ese segmento tal cual; `titulo` = el segmento izquierdo (sin separadores colgantes). Si el título resultante no tiene minúsculas (todo mayúsculas), se conserva igual y se agrega `revisar: "titulo"`.
4. Si no coincide: `titulo: "[Título]"`, `disertante: "[Disertante]"`, ambos en `revisar`.

No se cambian mayúsculas ni se corrige ortografía (destruiría siglas como IA, UTN, HALO, CHI). Casos negativos obligatorios en tests: «LA PROPORCION AUREA - NATURALEZA Y MATEMÁTICA» (guion sin título profesional), «TIROIDES Y ESTRÉS   SUSANA VALDEZ» (sin separador), «Sistema inmune Alicia - Dra Alicia Seltzer» es A pero «Meteorología Charla con Dr Federico Norte» no (sin separador).

### D6 — Cruce con YouTube

**Obtención (paso manual, fuera de `npm test`)**, documentado en `scripts/LEEME.md`:

```sh
python -m yt_dlp --flat-playlist --print-to-file "%(.{id,title,duration,view_count})j" scripts/salida/canal.jsonl "https://www.youtube.com/@ateneoamigosdelasciencias-2269/videos"
```

Se usa `--print-to-file` y no `> archivo` porque en PowerShell 5 la redirección escribe UTF-16 y rompería tildes; igual el lector tolera BOM y líneas vacías.

**Cruce (`scripts/lib/cruce.js`, puro)**:
1. `normalizar(t)`: NFD → quitar diacríticos → minúsculas → puntuación a espacio → colapsar y recortar.
2. Índice `tituloNormalizado → [videos]`.
3. Por cada parte (en orden `c001…c186`, parte 1…n): candidatos = índice[normalizar(titulo_original)].
   - 1 candidato libre → asignar.
   - >1 → filtrar por `|duracion_parte − duration| ≤ 2 s`; si queda exactamente 1 → asignar; si no → **ambigua**.
   - 0 → calcular sugerencias aproximadas (similitud de palabras / distancia de edición sobre el normalizado, umbral alto) solo para el reporte → **sin coincidencia**.
4. Un video asignado no vuelve a usarse. Para que el resultado no dependa del orden, primero se asignan las coincidencias de candidato único y después las desempatadas por duración; si dos partes reclaman el mismo video, ambas pasan a ambiguas.
5. Salidas: `scripts/salida/enlaces-confirmados.json` (`{ "c002": { "1": { url, vistas } } }`) y `scripts/salida/reporte-cruce.md` (resumen + detalle: asignadas, ambiguas con candidatos, sugerencias, sin coincidencia, videos del canal sin usar).

**Límites**: solo encuentra títulos idénticos tras normalizar; si el Ateneo renombró videos en YouTube después de armado el borrador, o hay errores de tipeo distintos («Intelilgencia»), quedan como sugerencias para revisión humana. Videos privados/no listados no aparecen en `--flat-playlist`. Con `--flat-playlist`, `duration`/`view_count` pueden faltar: sin duración no hay desempate y el caso queda ambiguo. La URL se arma como `https://www.youtube.com/watch?v=<id>`.

Se invoca como `python -m yt_dlp` (no `yt-dlp`) para no depender del PATH.

**Encuadre de `yt-dlp` frente a la regla «único tooling permitido es `node:test`»**: esa regla protege al sitio (sin dependencias, sin build) y al flujo de tests. `yt-dlp` se usa como herramienta CLI puntual de la desarrolladora para *producir datos*: no se agrega a `package.json`, no la necesitan el sitio, ni `npm test`, ni el validador; su salida (`canal.jsonl`, reporte y enlaces confirmados) se versiona como dato (**reemplazado por D16**: `scripts/salida/` queda fuera de git), y `scripts/LEEME.md` documenta cómo reproducirla. Solo se hace un listado de metadatos de un canal público (`--flat-playlist`), sin descargar ningún video. Si la llamada falla (red, bloqueo), el change cierra con las `url` en `null` y el cruce queda listo para correr después (o se completan a mano en C-05). La regla de `CLAUDE.md`/`AGENTS.md` se aclara en ese sentido (yt-dlp solo como CLI puntual de desarrollo en `scripts/`; decisión aprobada).

### D7 — Validador

`scripts/lib/cargar-datos.js` lee cada archivo con `fs` y lo ejecuta con `vm.runInNewContext(codigo, { window: {} })` con timeout corto; verifica que defina solo su `AAC_*`. `scripts/lib/validar.js` es una función pura `validar({ temas, charlas, proxima }, { estricto }) → { errores[], avisos[] }`; el CLI `scripts/validar-datos.js` imprime en español (`data/charlas.js · c010 · parte 2 · duracion: …`) y decide el código de salida. Reglas: ver `specs/validacion-datos`. URLs aceptadas: `https://www.youtube.com/watch?v=<11 chars>` y `https://youtu.be/<11 chars>` (con parámetros extra opcionales), para tolerar lo que pegue quien edite.

### D8 — Tests y organización

- Módulos puros CommonJS en `scripts/lib/` (`normalizar.js`, `vistas.js`, `disertante.js`, `derivar.js`, `cruce.js`, `validar.js`, `cargar-datos.js`, `serializar.js`); los CLI en `scripts/` solo leen/escriben archivos y llaman a esos módulos.
- Tests en `tests/<modulo>.test.js` (patrón por defecto de `node --test`), fixtures en `tests/fixtures/` con nombres que no coincidan con los patrones de test (`canal-muestra.jsonl`, `borrador-muestra.json`).
- Prueba de integración: deriva desde el borrador real en memoria y comprueba 186/310 y los conteos por tema; carga los `data/*.js` versionados y comprueba que pasan el validador en modo normal.
- Strict TDD en `tasks.md` para todos los módulos con lógica.

### D9 — Un placeholder nunca se muestra al público (requisito para C-03/C-04)

**Decisión (aprobada)**: si `titulo` sigue en `[Título]`, la página pública muestra el `titulo_original` de la parte 1 en lugar del placeholder; si `disertante` es `[Disertante]`, esa línea no se muestra. Un texto entre corchetes jamás debe ser visible para el público. Este change **no** construye UI: solo deja registrado el requisito, que se anota en las entradas C-03 y C-04 de `CHANGES.md`. (Los mockups ya muestran `[Disertante]` como ejemplo de ficha en construcción; el requisito prevalece sobre el mockup.)

### D10 — Elementor: datos pensados para pegarse en línea

**Decisión/supuesto (aprobado)**: no se sabe si en Elementor se podrá subir un `.js` externo (se consulta en la reunión del 10/11). Todo se diseña para que funcione **pegado en línea**: los tres archivos de `data/` son concatenables en un único `<script>` (D1). Cargarlos como `.js` externos es una optimización posterior (C-06).

### D11 — «Más vistas» automático con destacadas a mano

**Decisión (aprobada)**: «más vistas» sale automáticamente del campo `vistas`, con la posibilidad de fijar charlas destacadas a mano. Se agrega a la charla el campo **opcional** `destacada: true` (booleano; si falta, es `false`; el derivador no lo escribe). El validador exige que, si está, sea booleano. La lógica de portada que lo usa (destacadas primero, luego por `vistas`) es de C-03. Se documenta en `data/LEEME.md`. **Ajuste (D12)**: como `charlas.js` pasa a ser generado, `destacada` se escribe en `data/correcciones.js`; el esquema de la vista combinada no cambia.

---

> **Ampliación (06/11/2026, tras la revisión de la usuaria).** Agustina, becaria de medios, va a reorganizar el canal (títulos, orden, playlists por tema) y a volver a subir videos editados, lo que cambia su id de YouTube. Los datos actuales no son definitivos y el cruce se va a repetir. Las decisiones D12–D17 hacen que regenerar sea seguro. Estado observado: el cruce real asignó las 310 partes (0 ambiguas, 0 sugerencias, 0 sin coincidencia); ningún enlace de `scripts/salida/` fue confirmado a mano.

### D12 — Correcciones a mano separadas y por id de charla; `charlas.js` generado

**Decisión**: todo lo que una persona corrige vive en `data/correcciones.js`, separado de lo que genera la máquina:

```js
// data/correcciones.js (editado a mano)
window.AAC_CORRECCIONES = {
  c002: { confirmados: ["titulo"] },                       // el título en mayúsculas está bien así
  c010: { titulo: "…", disertante: "…", tema: "geologia", anio: 2023, destacada: true },
  c124: { partes: { 2: { url: "https://www.youtube.com/watch?v=…" } } } // enlace resuelto a mano
};
```

- **Clave = id propio de la charla** (`c001`…), que es estable porque sale del borrador. Nunca el título (Agustina los va a cambiar) ni el id del video (cambia al volver a subirlo).
- **Campos permitidos**: `titulo`, `disertante`, `tema` (id de `temas.js`), `anio`, `destacada`, `confirmados` (lista de marcas de `revisar` que una persona confirmó: `titulo`, `disertante`, `vistas`, `partes`) y `partes` (objeto `{ número de parte: { url } }`, número = el de la vista final, el mismo «Parte N» que ve el público; `url` puede ser `null` para anular un enlace automático equivocado). Cualquier otro campo es un error del validador.
- **`data/charlas.js` es salida generada**: cabecera «ARCHIVO GENERADO — no editar a mano», con la fecha de la foto del canal y la cantidad de videos. Ningún script escribe `correcciones.js`; la regeneración solo lo **lee**.
- **`revisar` en la vista combinada**: si la corrección completa `titulo`/`disertante` con texto real (no entre corchetes), se quita esa marca; `confirmados` quita las marcas listadas.

**Alternativas**: (a) seguir editando `charlas.js` y fusionar al regenerar: obliga a leer-y-reescribir datos manuales, frágil y contrario al pedido; (b) indexar por título o id de video: se rompen justamente con los cambios de Agustina; (c) un JSON de correcciones que aplique un script de Node: quien edita no vería su cambio en el sitio sin correr Node.

### D13 — Vista combinada en el navegador y charlas nuevas

**Decisión**: `js/aplicar-correcciones.js` define una función pura `aplicarCorrecciones(generadas, correcciones, nuevas)` → catálogo final (`generadas` + `nuevas` al final, luego las correcciones por id). No modifica sus argumentos y es tolerante: una corrección mal escrita no rompe la página (la ignora; el validador la informa). Patrón sin módulos ES para poder pegarlo en línea en Elementor:

```js
(function (global) {
  function aplicarCorrecciones(generadas, correcciones, nuevas) { /* … */ }
  if (typeof module === 'object' && module.exports) module.exports = { aplicarCorrecciones };
  else global.AAC_aplicarCorrecciones = aplicarCorrecciones;
})(typeof window !== 'undefined' ? window : this);
```

- **El mismo archivo** lo usan las páginas (C-03/C-04: `AAC_aplicarCorrecciones(AAC_CHARLAS, AAC_CORRECCIONES, AAC_CHARLAS_NUEVAS)` en lugar de leer `AAC_CHARLAS` directo), el validador y los tests (`require`). Así lo que se valida es exactamente lo que se publica.
- **Charlas nuevas**: `data/charlas-nuevas.js` (`window.AAC_CHARLAS_NUEVAS = []`) con el mismo esquema que una charla, editado a mano. Hace falta porque agregar charlas es frecuente (hay charlas casi todos los viernes) y `charlas.js` ya no se edita. Ids siguientes al último (`c187`…); un id repetido es error. Las correcciones también pueden apuntar a una charla nueva.
- Archivos de datos: pasan a ser cinco (`temas`, `charlas`, `charlas-nuevas`, `correcciones`, `proxima-charla`), todos concatenables en un `<script>` junto con `js/aplicar-correcciones.js`; el orden de carga entre ellos sigue siendo indiferente.

### D14 — Regeneración conservadora (`scripts/derivar-datos.js` + `scripts/lib/regenerar.js`)

Pipeline puro `regenerar({ borrador, temas, videos, previas, correcciones, nuevas })`:

1. **Estructura** = `derivar(borrador, temas)`: ids, agrupación de partes, orden, `titulo_original`, `duracion`, `anio`, tema y extracción de título/disertante salen siempre del borrador, **nunca del canal**. Una parte se identifica por (id de charla, número de parte en el orden final).
2. **Enlace de cada parte**, en orden de prioridad:
   1. **Manual** (`correcciones.cXXX.partes[n].url`): gana siempre en la vista combinada. Si su video está en la foto, ese video queda reservado (no se asigna a otra parte) y el generado lleva esa URL y sus vistas; si no está (p. ej. un video no listado, que `--flat-playlist` no muestra), se respeta igual y se lista en el reporte para revisar.
   2. **Anterior**: la URL de esa parte en el `data/charlas.js` actual (solo si el `titulo_original` de esa posición coincide, para no arrastrar enlaces a otra parte) **y** su video sigue en la foto del canal. El id del video es la identidad más fuerte: se conserva aunque Agustina le haya cambiado el título (se informa «título cambiado»).
   3. **Título único** entre los videos todavía libres (el cruce de D6, sin cambios: normalización, desempate por duración, nada ambiguo).
   4. Si nada de lo anterior: `url: null` y la parte va a **dudosos** (con el motivo: el video anterior ya no está, ambigua, sugerencia aproximada o sin coincidencia).
   Los videos usados por `charlas-nuevas.js` también se reservan.
3. **Vistas**: las del canal para toda parte con video en la foto; si no, las del borrador.
4. **Salida**: `data/charlas.js` (generado, cabecera con fecha de la foto = fecha de modificación de `canal.jsonl` y cantidad de videos) y `scripts/salida/reporte-cruce.md`.

Refinamiento sobre el pedido: «conservar el enlace anterior solo si sigue en la foto» se evalúa **antes** que el título (no solo cuando el título falla), porque el id es más confiable que un título que se está editando; el resultado coincide con el pedido en todos los casos de un solo candidato y es más conservador cuando un video re-subido convive con el original.

- **CLI**: `node scripts/derivar-datos.js` regenera (requiere `scripts/salida/canal.jsonl`); `--comprobar` regenera en memoria y compara con el `charlas.js` actual sin escribir nada (código 1 si difiere); `--carpeta` y `--salida` permiten trabajar sobre copias. Si el `charlas.js` existente no tiene la marca «ARCHIVO GENERADO» (versión vieja editada a mano), no lo pisa salvo `--forzar`. `scripts/cruzar-youtube.js` queda como **vista previa**: mismo cálculo, solo escribe el reporte.
- **Regresión**: con las entradas actuales (borrador + foto del canal actual, sin correcciones) la regeneración reproduce el `charlas.js` actual: mismos ids, 186 charlas / 310 partes, mismas URLs y vistas (igualdad semántica, ignorando la cabecera). Se prueba en `npm test` con una foto sintetizada desde el `charlas.js` versionado (los archivos de `scripts/salida/` no están en git) y con `--comprobar` sobre la foto real.
- `scripts/salida/enlaces-confirmados.json` queda obsoleto (los enlaces ya están en `charlas.js`); `aEnlaces`/`generarReporte` de `cruce.js` se retiran.

### D15 — Reporte de dudosos

`scripts/salida/reporte-cruce.md`, en español llano, con: resumen; **partes sin enlace** por motivo (video anterior que ya no está en el canal, ambiguas con candidatos, sugerencias aproximadas, sin coincidencia), cada una con `cXXX · parte N · «título original»` y el bloque para fijarla a mano en `correcciones.js`; **enlaces manuales que no aparecen en la foto**; **videos nuevos o sin charla** (del canal, no usados por ninguna parte ni charla nueva); enlaces conservados con **título cambiado** en el canal; asignadas por título; líneas inválidas. Nada de lo sugerido se asigna solo.

### D16 — `scripts/salida/` fuera de git

**Decisión**: `.gitignore` ignora `scripts/salida/*` salvo `scripts/salida/.gitkeep`. **Por qué**: `canal.jsonl` y `reporte-cruce.md` cambian cada vez que cambia el canal (Agustina lo está editando), generan diffs ruidosos de cientos de líneas y cualquiera con `yt-dlp` los vuelve a generar; lo que importa de la foto ya queda versionado en `data/charlas.js` (URLs, vistas, fecha y cantidad de videos en la cabecera), que funciona sin `yt-dlp` ni red. **Revisión de entradas no regenerables**: ninguna. `enlaces-confirmados.json` era derivable de `canal.jsonl` + borrador y ahora es obsoleto; no hay enlaces confirmados a mano en `salida/` (los 310 son automáticos). Cualquier enlace a mano va desde ahora en `data/correcciones.js`, que sí se versiona. Como `scripts/salida/` nunca se commiteó, no hace falta `git rm`. El mismo `.gitignore` suma `node_modules/`, `.playwright-mcp/`, `.atl/` y `.claude/settings.local.json`.

### D17 — Redes sociales configurables (registro para C-03)

**Decisión (solo registro)**: los enlaces a redes del Ateneo serán una **lista configurable en los datos** (`redes: [{ nombre, url }]`, `url` en `null` o placeholder mientras no exista), para agregar o quitar una red sin tocar el HTML. Agustina crea Instagram y además TikTok o Facebook (sin decidir). Se implementa en C-03 junto con la configuración del sitio; C-02 no crea ese archivo. Queda anotado en `CHANGES.md` (C-03) y en la KB 04.

### D18 — Detalles de implementación de D12–D14 (decididos al implementar)

- **Manual `url: null`**: una corrección `partes: { N: { url: null } }` deja la parte sin enlace también en el generado y **no** se busca ningún enlace automático para ella (es una decisión humana: «este enlace automático estaba mal»); no figura como dudosa. El video automático que tenía queda libre y, si ninguna otra parte lo usa, aparece en «videos nuevos o sin charla».
- **Manual inválido**: una `url` manual de la que no se puede sacar un id de video se ignora en la regeneración (el validador la informa como error).
- **Validación por partes**: el validador comprueba el esquema del catálogo generado (`data/charlas.js`) y de las charlas nuevas (`data/charlas-nuevas.js`) por separado, para atribuir cada error a su archivo, y las correcciones aparte; los **pendientes y el resumen** se calculan sobre la vista combinada, con el mismo `js/aplicar-correcciones.js` que usa el sitio. `charlas-nuevas.js` y `correcciones.js` se toman vacíos si faltan.
- **Cabecera**: `serializar(charlas, { fechaFoto, totalVideos })`; la fecha de la foto es la fecha de modificación de `canal.jsonl` (hora local). Sin `info`, la cabecera omite esa línea (los tests de `serializar` lo usan así).
- **Retiros**: `aEnlaces` y `generarReporte` de `cruce.js` se eliminaron junto con sus tests; `cruzar` se partió en `cruzar(borrador, videos)` + `cruzarPartes(partes, videos)` (el mismo cálculo, reutilizado por la regeneración). El parámetro opcional `enlaces` de `derivar()` se conserva por sus tests aunque el CLI ya no lo use. `scripts/salida/enlaces-confirmados.json` (obsoleto, ignorado por git) se borró.
- **`--carpeta` / `--salida`**: `--carpeta` es la carpeta de datos (borrador, `temas.js`, `charlas.js`, `correcciones.js`, `charlas-nuevas.js`); `--salida`, la de `canal.jsonl` y el reporte.
- **Primera migración**: el `charlas.js` previo a la ampliación no tenía la marca «ARCHIVO GENERADO», por lo que se regeneró una vez con `--forzar`; antes se verificó con `--comprobar` (0 diferencias) y después se comparó contra una copia del archivo anterior (0 diferencias).

## Ideas futuras (no implementadas)

- **Tema desde la playlist**: si Agustina arma una playlist por tema, el script podría listar cada playlist con `yt-dlp --flat-playlist` y asignar el tema por pertenencia (playlist → id de tema; `temas.js.playlist_url` ya tiene el lugar). Hoy el tema sale del borrador.
- **Títulos y disertantes desde las descripciones**: `python -m yt_dlp --skip-download --dump-json <video>` (solo metadatos, sin descargar) trae la descripción de cada video; un script podría proponer `titulo`/`disertante` (como sugerencias o en `correcciones.js` revisadas) y dejar al Ateneo solo lo que no se pueda obtener. Registrado en KB 10 y `CHANGES.md`.
- **Tarjeta del Ateneo en la portada de la UTN FRM** (cajas de colores con ícono, número, nombre y etiqueta): idea de change futuro C-07 `tarjeta-en-portada-utn`, sujeta a validación tras el 10/11.
- **Reordenar partes por corrección** (p. ej. `orden: [2, 1, 3]`): hoy una charla con orden dudoso solo se puede confirmar (`confirmados: ["partes"]`); si aparece un orden equivocado se resuelve en C-05.

## Risks / Trade-offs

- [Elementor: no verificado si un `<script src>` externo funciona o si hay que pegar todo en línea] → los archivos son concatenables por diseño (D1); se verifica en C-06 (pregunta e).
- [Cruce parcial con YouTube: muchas partes pueden quedar sin URL] → reporte detallado + sugerencias; el resto se completa a mano en C-05. El sitio debe tolerar `url: null` (C-04).
- [Temas provisorios hasta el 10/11] → lista única en `temas.js` con ids estables; reasignar charlas es editar `tema`. Si los temas cambian mucho, se re-deriva antes de cualquier edición manual.
- [Re-derivar pisa ediciones manuales] → `--forzar` obligatorio para sobrescribir; `LEEME.md` lo advierte. **Ampliación**: resuelto de raíz con D12 (lo manual vive en `correcciones.js` y `charlas-nuevas.js`, que ningún script escribe).
- [Una corrección apunta a una charla que dejó de existir o tiene un campo mal escrito] → el validador lo informa como error; en el navegador se ignora sin romper la página.
- [Un video re-subido con otro título deja la parte sin enlace] → la parte queda en `null` y en el reporte de dudosos con sugerencias; se resuelve fijando el enlace en `correcciones.js` (por id de charla y número de parte).
- [Un enlace manual a un video no listado no aparece en la foto] → se respeta y se lista en el reporte para revisarlo, no se descarta.
- [Las páginas leen `AAC_CHARLAS` directo y se saltean las correcciones] → requisito explícito para C-03/C-04 en `CHANGES.md`: usar siempre `AAC_aplicarCorrecciones`.
- [`npm test` dependería de archivos ignorados] → la regresión de `npm test` usa una foto sintetizada desde `data/charlas.js`; la comprobación con la foto real es `derivar-datos.js --comprobar`.
- [Solo ~16 % de disertantes automáticos; muchos `[Título]`] → es el precio de no inventar. Respaldo de visualización con `titulo_original` a decidir en C-03/C-04.
- [Falsos positivos de categoría A (p. ej. «- Ing Carlos Sisso» bien, pero un subtítulo que empiece con «Prof»)] → tests con negativos reales; revisión humana posterior.
- [`vistas` es una foto: se desactualiza] → aceptado; «más vistas» es aproximado (pregunta f).
- [`yt-dlp` tensiona la regla de tooling] → encuadre de D6; no entra en `package.json` ni en `npm test`.
- [Archivo `charlas.js` de ~3–4 k líneas difícil de navegar para no programadores] → cabecera con instrucciones, una charla por bloque, búsqueda por `id`; la guía final (C-06) puede proponer otra herramienta de edición.

## Migration Plan

1. Crear `temas.js` y `proxima-charla.js`; implementar módulos con TDD; derivar `charlas.js` (URLs en `null`).
2. (Contingente) Correr `yt-dlp` y el cruce; re-derivar con `--forzar` incorporando enlaces confirmados.
3. Actualizar documentación (KB, `CLAUDE.md` = `AGENTS.md`, `README.md`, `CHANGES.md`).
4. (Ampliación) Crear `correcciones.js` y `charlas-nuevas.js` vacíos, `js/aplicar-correcciones.js` y `regenerar.js` con TDD; regenerar `charlas.js` con la nueva cabecera y comprobar con `--comprobar` que el contenido no cambió; `.gitignore`.
5. Rollback: `data/charlas-borrador.json` no se toca; borrar los archivos nuevos vuelve al estado previo. Si la plataforma exigiera `.json`, el cuerpo de `charlas.js` ya es JSON válido.

## Open Questions

Resueltas con la usuaria antes de implementar:

- **(a)** `.js` en lugar de `.json` y actualización de redacción en KB, `CLAUDE.md`/`AGENTS.md`, `README.md`, `CHANGES.md`: aprobado (D1).
- **(b)** `yt-dlp` como herramienta solo de desarrollo, ya instalado, invocado como `python -m yt_dlp`: aprobado (D6).
- **(c)** Título en `[Título]` en la página pública: D9.
- **(d)** Renombres `anio_aprox` → `anio`, `videos` → `partes`; el año aproximado se avisa una sola vez (cabecera de `charlas.js` y guía): aprobado (D2).
- **(e)** Acceso a Elementor desconocido: D10.
- **(f)** «Más vistas» automático con `destacada` opcional: D11.

Abiertas tras la ampliación (registradas en KB 10):

- **(g)** ¿Cómo se coordinan los cambios de Agustina en el canal con la actualización de datos (quién vuelve a correr el cruce y cuándo)?
- **(h)** Conjunto final de redes: Instagram + TikTok o Facebook (D17).
- **(i)** Tarjeta en la portada de la UTN FRM: quién la agrega en Elementor, color que no choque con las existentes, ícono y número.
