# Modelo de Datos

Los datos viven en archivos `.js` editables en `data/` (cada uno asigna una variable global: `window.AAC_TEMAS`, `window.AAC_CHARLAS`, `window.AAC_PROXIMA_CHARLA`), separados del diseño (RNF Mantenible). Se cargan con `<script src>` o se pegan en línea (DD-03). Fuente de partida: `data/charlas-borrador.json` (borrador generado a partir de los títulos del canal, se conserva sin cambios). `data/charlas.js` es un archivo **generado** por `scripts/derivar-datos.js` (borrador + foto del canal de YouTube): no se edita a mano y se regenera cuando cambia el canal. Lo que una persona corrige vive aparte, en `data/correcciones.js` (por id de charla) y `data/charlas-nuevas.js`; el navegador lo junta con `js/aplicar-correcciones.js` (ver DD-10 a DD-12). `node scripts/validar-datos.js` comprueba la vista combinada.

## Dominios

- **Catálogo de charlas** (temas, charlas, partes/videos).
- **Próxima charla** (evento único vigente).
- **Configuración del sitio** (contacto, redes, cifras de portada) — se define en C-03, cuando la consuma la portada.

## ERD

```
Tema 1 ──── N Charla 1 ──── N Video(parte)
ProximaCharla (singleton, independiente)
```

## Entidades

### Tema
- `id` (string único en minúsculas y guiones, p. ej. `agua-ambiente`; las charlas lo referencian), `nombre` (string completo), `etiqueta` (string corto, el de los chips) y `playlist_url` (string | null). Viven en `data/temas.js`. Ocho temas propuestos (validación pendiente del Ateneo):

| Tema | Charlas | Videos |
|---|---|---|
| Geología, minería y energía | 35 | 70 |
| Inteligencia artificial y tecnología | 30 | 46 |
| Agua, ambiente y sostenibilidad | 27 | 41 |
| Neurociencia, salud y psicología | 26 | 47 |
| Historia, cultura y humanidades | 19 | 25 |
| Espacio y astronomía | 17 | 29 |
| Física y matemática | 17 | 27 |
| Ingeniería, sismos e infraestructura | 15 | 25 |

Los mockups usan etiquetas cortas (Historia y cultura, Agua y ambiente, IA y tecnología, Neurociencia y salud, Ingeniería y sismos); el mapeo nombre completo ↔ etiqueta está en `etiqueta` (ver `10` IN-03). `playlist_url` queda en `null` hasta que exista la lista (RF-07). Ids: `geologia`, `ia-tecnologia`, `agua-ambiente`, `neurociencia-salud`, `historia-cultura`, `espacio-astronomia`, `fisica-matematica`, `ingenieria-sismos`.

### Archivos de datos y quién los escribe

| Archivo | Global | Contenido | Quién lo escribe |
|---|---|---|---|
| `data/charlas.js` | `AAC_CHARLAS` | Catálogo (186 charlas / 310 partes) | **Generado** (`scripts/derivar-datos.js`) |
| `data/charlas-nuevas.js` | `AAC_CHARLAS_NUEVAS` | Charlas agregadas a mano, mismo esquema que una charla; ids siguientes a `c186` | Editor |
| `data/correcciones.js` | `AAC_CORRECCIONES` | `{ cXXX: { titulo, disertante, tema, anio, destacada, confirmados, partes: { N: { url } } } }`, clave = id de charla (nunca título ni id de video) | Editor |
| `data/temas.js`, `data/proxima-charla.js` | `AAC_TEMAS`, `AAC_PROXIMA_CHARLA` | Temas y próxima charla | Editor |
| `redes` (**C-03**, aún no existe) | — | Configuración del sitio: **lista configurable de redes** `[{ nombre, url }]`; `url` con placeholder `[…]` o `null` mientras no exista la red; agregar o quitar una red no toca el HTML | Editor |

`AAC_aplicarCorrecciones(AAC_CHARLAS, AAC_CORRECCIONES, AAC_CHARLAS_NUEVAS)` devuelve la **vista combinada** que usan las páginas: una corrección que completa `titulo` o `disertante` borra su marca de `revisar`; `confirmados` borra las marcas listadas.

### Charla (`data/charlas.js`)
- `id` (string, `c001`…`c186`)
- `titulo` (string; `[Título]` si no se pudo extraer; **null en las 186 del borrador**, la derivación solo lo completa cuando separa al disertante con alta confianza)
- `disertante` (string; `[Disertante]` si no se pudo extraer; ídem)
- `tema` (string, `id` de un Tema)
- `anio` (int, 2020–2026; sale de «hace X años» al 06/11/2026, **es aproximado**: se avisa una sola vez, en la cabecera de `charlas.js` y en la guía; en el borrador se llama `anio_aprox`)
- `partes` (Parte[]; 1 a 4; en el borrador se llama `videos`; se ordenan por número de parte)
- `revisar` (string[]: nombres de campos dudosos, p. ej. `["titulo", "disertante"]`; vacía si no hay dudas)
- `destacada` (boolean, **opcional**; `true` fija la charla como destacada en la portada; la lógica de portada es de C-03)

Un texto entre corchetes nunca se muestra al público: si `titulo` es `[Título]` la página muestra el `titulo_original` de la parte 1; si `disertante` es `[Disertante]` no se muestra esa línea (requisito para C-03/C-04).

### Parte (video de una charla)
- `titulo_original` (string, título crudo de YouTube)
- `duracion` (string `M:SS`, `MM:SS` o `H:MM:SS`)
- `vistas` (entero | null; en el borrador es string, p. ej. `"5"`, `"1.2 K"`; la derivación lo convierte a número)
- `url` (string | null; **null en todo el borrador**) — se completa con la regeneración conservadora contra el canal (`scripts/derivar-datos.js`) o a mano en `data/correcciones.js` (`partes: { N: { url } }`)

El nombre visible **no se guarda**: «Charla» si hay 1 parte; «Parte N» si hay varias, según el orden (el mockup muestra «Parte 1 · 1:54:45»).

### Estadísticas del borrador (verificadas)
186 charlas, 310 videos, 104 charlas con más de un video, años 2020–2026.

### ProximaCharla (`data/proxima-charla.js`)
Campos según RF-04: `titulo`, `disertante`, `descripcion` (1–2 líneas), `fecha` (`DD/MM/AAAA`), `hora` (`HH:MM`, 24 h), `lugar`, `modalidad` (presencial + Zoom), `zoom_url` (string | null, a confirmar) y `correo_inscripcion`. Los valores no confirmados quedan como placeholder entre corchetes; solo se precargan los documentados (RN-PC-02/03).

## Seed data inicial

- Las 186 charlas del borrador, con temas ya asignados.
- Las 3 más vistas conocidas: Entrelazamiento cuántico (~12 mil), Depósitos de litio (~2 mil), Evolución geológica de Mendoza (~1,2 mil).
- Faltan por completar manualmente: `titulo` y `disertante` de la mayoría de las charlas (la derivación completa solo los de alta confianza, ≈ 30) y las `url` que el cruce con el canal no resuelva; la miniatura se deriva de la URL de YouTube.
