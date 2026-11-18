# Proposal

## Why

El catálogo de charlas (`data/charlas.js`) sale del canal de YouTube: de 186 charlas, 156 todavía tienen `[Título]` y `[Disertante]`, y el año es aproximado («hace X años»). Por eso «Últimas charlas» no puede ordenarse por fecha real y muchas tarjetas no muestran quién habló. El sitio viejo del Ateneo tiene el **archivo de charlas 2020–2026** con fecha exacta, título y disertante de cada encuentro (`docs/fuentes/sitio-viejo.md`), y es la fuente oficial que faltaba.

El mismo sitio viejo, el video institucional «Quiénes somos» y la Declaración de Principios firmada en 2020 traen contenido que la página Quiénes somos todavía no tiene: qué significa el nombre del Ateneo, su alcance internacional, quiénes integran la Mesa Organizadora y cómo hacerse miembro.

## What Changes

**Bloque A — Datos reales de las charlas**

- **Cruce del archivo con el catálogo**: un script nuevo lee el archivo 2020–2026 y lo cruza con el catálogo por título normalizado (tolera tildes, mayúsculas, errores de tipeo y títulos más largos o más cortos), apoyándose en el disertante y en el año aproximado. Las coincidencias **seguras** se guardan en un archivo de datos generado; las **dudosas** van a un reporte para que la autora decida. Las proyecciones de videos de otras personas (Feynman, Penrose, la entrevista a Yupanqui, el extracto de Colamedici) se ignoran.
- **Fecha exacta** por charla (`fecha`, `dd/mm/aaaa`): el año sale de la fecha cuando está.
- **Disertantes tal como figuran en el archivo**, sin agregar títulos (Dr., Ing., Lic.). Donde el archivo no indica disertante (mesas redondas), no se completa.
- **Título del archivo** solo donde el catálogo todavía dice `[Título]`; nunca pisa un título que ya existe.
- **«Últimas charlas» por fecha real**, y la tarjeta muestra la fecha («11 de noviembre de 2022») en lugar del año cuando la conoce.
- `data/correcciones.js` admite `fecha` para confirmar a mano las dudosas; lo manual siempre gana sobre lo cruzado.
- Lógica del cruce y del orden con **TDD** (`node:test`).

**Bloque B — Contenido de Quiénes somos**

> Cambio durante el apply (17/11/2026): «Ateneo · Amigos · Ciencia» y el alcance internacional se reemplazaron por la sección del video de presentación (oculta mientras `video_presentacion` sea `null`), con la cita de Palas Atenea.

- Sección **«Ateneo · Amigos · Ciencia»** con el sentido de cada palabra (texto del sitio viejo, editado), y el origen de «ateneo» (templo de Palas Atenea) como **cita destacada** con la fuente de títulos.
- **Alcance**: «Hoy recibimos disertantes y participantes de México, Estados Unidos y Europa» (dato del video).
- **Mesa Organizadora**: los 10 nombres en orden alfabético por apellido, sin fotos ni cargos. Los nombres y un interruptor para **ocultar la sección** viven en `data/sitio.js` hasta que el nexo confirme el nombre del órgano y que aparezcan los nombres (pregunta nueva en KB 10).
- **«Sumate al Ateneo»**: texto breve (gratis, sin obligación, se puede cancelar cuando quieras) y botón al formulario de inscripción vigente, cuya URL vive en `data/sitio.js`.
- **Declaración de Principios**: botón «Descargar en PDF» junto al texto desplegable, con la URL del PDF en `data/sitio.js`. La comparación del texto publicado (v2.4) con el PDF de julio de 2020 queda en `design.md`; qué versión se ofrece la decide la autora.
- No se usan el párrafo final lírico del video ni sus imágenes de stock.

**Bloque D — Tarjetas sin subrayado (design system revisión 3)**

- **Temas**: sin subrayado ni bordes, fondo celeste muy suave (token nuevo) que se oscurece al pasar el cursor, y flecha «→» junto a la cantidad de charlas.
- **Charlas** (portada y videoteca): toda la tarjeta es el enlace, título sin subrayado; al pasar el cursor se eleva apenas y el título pasa a azul. **BREAKING** respecto de C-03c («títulos de tarjeta subrayados»).
- Contraste AA, foco amarillo visible, 44 px y `prefers-reduced-motion` respetado.

Fuera de este change: la videoteca (C-04), las fotos de la Mesa (IN-10), la foto grupal del Salón de Actos (falta el original), los nombres de las 2 categorías nuevas.

## Capabilities

### New Capabilities

- `archivo-charlas`: cruce del archivo de charlas 2020–2026 del sitio viejo con el catálogo, archivo de datos generado con fecha, título y disertante, y reporte de dudosos.

### Modified Capabilities

- `correcciones-manuales`: campo `fecha` en las correcciones y combinación del archivo cruzado en la vista combinada (catálogo < archivo < correcciones).
- `validacion-datos`: validación de fechas y del archivo cruzado.
- `portada`: «Últimas charlas» ordenadas por fecha real y con la fecha visible; tarjetas de temas y de charlas sin subrayado.
- `estilos-base`: design system revisión 3 (tinte celeste y tarjetas enlazables).
- `quienes-somos`: secciones «Ateneo · Amigos · Ciencia», alcance, Mesa Organizadora, «Sumate al Ateneo» y descarga de la Declaración en PDF.
- `configuracion-sitio`: formulario de inscripción, Mesa Organizadora ocultable y PDF de la Declaración en `data/sitio.js`.

## Impact

- Código: `scripts/lib/archivo.js` (nuevo), `scripts/cruzar-archivo.js` (nuevo), `js/aplicar-correcciones.js`, `js/portada-logica.js`, `js/ficha.js`, `js/quienes-somos.js`, `scripts/lib/validar.js`, `quienes-somos.html`, `css/estilos.css`.
- Datos: `data/archivo-charlas.js` (nuevo, generado), `data/correcciones.js` (campo `fecha`; las 5 correcciones de C-03 se alinean con el archivo), `data/sitio.js`, `data/LEEME.md`, `scripts/LEEME.md`.
- Design system: `design-system/tokens.css`, `components.html`, `README.md` (revisión 3) y `DESIGN.md`.
- Tests: nuevos para el cruce, la fecha, el orden y la Mesa; los 216 actuales siguen en verde.
- Docs: `knowledge-base/04`, `05`, `10`, `CHANGES.md`. Nivel de gobierno: **MEDIUM** (pipeline de datos) con un punto de control: la autora revisa el reporte de dudosos antes de cargarlos.
- Sin dependencias nuevas ni paso de build. Todo bajo `.aac-web`.
