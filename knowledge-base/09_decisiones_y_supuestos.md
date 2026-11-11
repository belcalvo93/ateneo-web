# Decisiones y Supuestos

## Decisiones documentadas

### DD-01 — HTML/CSS/JS puro, sin build
**Decisión**: sin frameworks, bundler ni build. **Contexto**: se pegará en un widget HTML de Elementor y debe tener costo cero. **Alternativas**: React/Vite, generador estático. **Justificación**: portabilidad y mantenibilidad por no programadores. **Trade-offs**: más código manual; sin componentes reutilizables.

### DD-02 — Plataforma: widget HTML de Elementor (WordPress de la FRM)
**Decisión**: apuntar a Elementor; alternativa Google Sites (Insertar → Código). **Contexto**: la página será una sección de la web de la FRM (Elementor Pro 4.2). **Estado**: a confirmar en la reunión del 10/11.

### DD-03 — Datos separados del diseño
**Decisión**: charlas, temas y próxima charla en archivos de datos fáciles de editar. **Resuelto en C-02**: archivos `.js` que asignan una global (`window.AAC_TEMAS`, `window.AAC_CHARLAS`, `window.AAC_PROXIMA_CHARLA`), no `.json`. **Por qué**: un `.json` hay que pedirlo con `fetch`, que los navegadores bloquean al abrir la página con doble clic (`file://`) y que exige hospedar el archivo; un `.js` carga con `<script src>` o se pega en línea dentro del widget de Elementor, admite comentarios para quien edita y tolera una coma de más. Todos los archivos de datos deben poder concatenarse en un único `<script>` (Elementor: el acceso a archivos externos es desconocido, se consulta el 10/11). El cuerpo de `charlas.js` es JSON válido, así que volver a `.json` es mecánico.

### DD-04 — Una ficha por charla con sus partes
**Decisión**: agrupar videos de una misma charla. **Contexto**: 310 videos ≈ 186 charlas; 104 charlas tienen más de un video.

### DD-05 — Ocho temas propuestos
**Decisión**: clasificación por título (propuesta), no validada por el Ateneo.

### DD-06 — Tests solo donde hay lógica
**Decisión**: `node:test` para buscador y filtro; sin dependencias extra. Indicado por la autora en el kickoff de la KB. **Ampliación (C-02)**: también para los módulos de `scripts/lib/` (normalización, extracción de disertante, derivación, validación, cruce con YouTube), que tienen lógica propia.

### DD-07 — Mockups aprobados son el contrato visual
El diseño final debe respetar `docs/mockups/` (inicio-escritorio, videoteca-escritorio, inicio-celular, logo-aac).

### DD-08 — Orden propuesto de changes (OpenSpec)
Propuesta de la autora: C-01 base-y-estilos, C-02 datos-charlas, C-03 portada, C-04 videoteca (TDD); el resto del mensaje se cortó. El roadmap lo formaliza `roadmap-generator`.

### DD-09 — `yt-dlp` solo como herramienta de desarrollo
**Decisión (C-02)**: `yt-dlp` se usa como CLI puntual de la desarrolladora, desde `scripts/` (se invoca como `python -m yt_dlp`), solo para listar metadatos del canal público (`--flat-playlist`, sin descargar videos) y producir `scripts/salida/canal.jsonl`. No es parte del sitio, no va en `package.json` y no lo necesitan ni el sitio, ni `npm test`, ni el validador. Se documenta en `scripts/LEEME.md`.

### DD-10 — Correcciones a mano separadas del catálogo generado
**Decisión (C-02)**: `data/charlas.js` es salida generada («ARCHIVO GENERADO — no editar a mano»). Todo lo que corrige una persona vive en `data/correcciones.js`, indexado por el **id propio de la charla** (`c001`…; nunca por título ni por id de video, que Agustina cambia), y las charlas nuevas en `data/charlas-nuevas.js`. Ningún script escribe esos dos archivos. Las páginas usan la vista combinada (`js/aplicar-correcciones.js`, sin módulos ES, utilizable como `<script>` y con `require()`), así que editar no requiere correr nada. Detalle: `design.md` de C-02, D12 y D13.

### DD-11 — Regeneración conservadora del catálogo
**Decisión (C-02)**: cuando cambia el canal, `scripts/derivar-datos.js` regenera `charlas.js` sin perder trabajo: ids y agrupación de partes salen siempre del borrador; el enlace de cada parte es el manual, el que ya tenía si su video sigue en el canal, o un título único; si no, `url: null` y la parte va al reporte de dudosos. **Nunca se asigna nada ambiguo o aproximado.** `--comprobar` compara sin escribir. Detalle: `design.md` de C-02, D14 y D15.

### DD-12 — `scripts/salida/` fuera de git
**Decisión (C-02)**: la foto del canal (`canal.jsonl`) y los reportes se regeneran y cambian con cada edición del canal, así que `.gitignore` los excluye (queda `.gitkeep`). Lo que el sitio necesita (enlaces, vistas, fecha y cantidad de videos de la foto) queda en la cabecera y el cuerpo de `data/charlas.js`. Detalle: `design.md` de C-02, D16.

## Supuestos inferidos

### SU-01 — La sección se crea con cuentas de la facultad
**Origen**: PRD. **Riesgo si es falso**: no hay forma de publicar. **Validar**: reunión 10/11.

### SU-02 — El Ateneo aporta textos, logo e información de eventos
**Origen**: PRD. **Riesgo**: placeholders sin completar. **Validar**: pedir lista de insumos.

### SU-03 — Las miniaturas pueden derivarse de la URL de YouTube
**Origen**: inferencia (mockups muestran «Miniatura de YouTube»). **Riesgo**: dependencia de formato de URL externo/hotlinking. **Validar**: probar `img.youtube.com/vi/<id>/hqdefault.jpg` en el entorno WP.

### SU-04 — La mayoría de los visitantes llega desde el celular
**Origen**: PRD (mobile-first). **Validar**: analítica posterior si existe.

### SU-05 — Los años del borrador (`anio_aprox`, `anio` en `charlas.js`) son aproximados
**Origen**: borrador («hace X años» al 06/11/2026). **Riesgo**: años incorrectos en fichas. **Validar**: revisión con el Ateneo.
