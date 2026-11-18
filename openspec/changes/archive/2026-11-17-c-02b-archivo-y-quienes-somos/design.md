# Design

## Context

> **Cambio durante el apply (17/11/2026, pedido de la autora):** la sección «Ateneo · Amigos · Ciencia» y la línea del alcance internacional se reemplazaron por la sección del **video de presentación** (oculta mientras `video_presentacion` sea `null`), que conserva la cita de Palas Atenea. Lo que sigue en D6 sobre esa sección queda como historia de la decisión.

- El catálogo generado tiene 186 charlas; 156 conservan `[Título]`/`[Disertante]`, pero sus `partes[].titulo_original` (títulos de YouTube) traen el texto real, muchas veces con el disertante adentro («Neurociencia Educacional - Antonio Alvarez 1° parte»).
- `anio` es aproximado (sale de «hace X años» al 06/11/2026), así que puede errar en ±1.
- El archivo del sitio viejo (`docs/fuentes/sitio-viejo.md`) tiene 194 entradas 2020–2026. Hay 5 proyecciones de videos ajenos, mesas redondas sin disertante y errores de tipeo en fechas y nombres.
- Medición previa (script descartable, 17/11/2026) con palabras normalizadas sobre títulos originales: ~87 entradas con un candidato claro, ~79 con candidato discutible y ~28 sin par. Ejemplos de trampas: «Neurociencia» (2020, Alicia Seltzer) apunta a una charla de Seltzer de 2024; «Electroquímica» (Raúl Pía) coincide en una sola palabra con otra charla; «c029» recibe dos entradas distintas. De ahí salen las reglas de seguridad de abajo.

## Goals / Non-Goals

**Goals**: fecha exacta y disertante del archivo en todas las charlas que se puedan cruzar con seguridad; reporte claro para decidir el resto; orden real de «Últimas charlas»; contenido institucional nuevo en Quiénes somos.

**Non-Goals**: completar a mano las dudosas (lo hace la autora con el reporte); agregar charlas que no están en el canal; cambiar los temas; la videoteca (C-04).

## Decisions

### D1. Un solo change con dos bloques
Los ítems de Quiénes somos (bloque B) y el cruce (bloque A) no comparten archivos, pero salen de las mismas fuentes y se revisan juntos. Se hacen en un solo change con tareas separadas por bloque: el bloque A primero (tiene el punto de control del reporte) y el B no depende de él. *Alternativa descartada*: un C-03d aparte, que duplicaba propuesta, verificación y archivo para un bloque de contenido chico.

### D2. Dónde van los resultados: archivo generado nuevo
- `data/correcciones.js` es **solo manual** («ningún script lo escribe»); no se toca desde el script.
- Se crea `data/archivo-charlas.js` (**generado** por `scripts/cruzar-archivo.js`), `window.AAC_ARCHIVO_CHARLAS = { c084: { fecha, disertante, titulo? } }`.
- Prioridad en la vista combinada: **catálogo < archivo cruzado < correcciones**. Lo que la autora confirme del reporte va a `correcciones.js` (`fecha`, `disertante`, `titulo`).
- Las 5 correcciones de C-03 (c001, c002, c003, c181, c182) se revisan contra el archivo: donde la corrección solo repetía lo que ahora trae el archivo, se quita el campo de `correcciones.js` para que mande el archivo; donde difiere (p. ej. «J. M. Amoretti» → «José María Amoretti»), se pasa al nombre del archivo, como pidió la autora.
- *Alternativa descartada*: que el script escriba en `correcciones.js`. Rompe la regla de que lo manual nunca se pisa.

### D3. Algoritmo del cruce (funciones puras, TDD)
`scripts/lib/archivo.js`:
- `leerArchivo(texto)` → `{ entradas: [{ linea, fecha, titulo, disertante|null }], invalidas: [{ linea, motivo }] }`. Meses por sus 3 primeras letras («abri» → abr, «noviiembre» → nov), «de» opcional.
- `esProyeccion(entrada)`: disertante que empieza con «Video de» / «Extracto de».
- `palabras(texto)`: `normalizar` + sin palabras vacías («de», «la», «parte», «dr», «ing», «lic»…), sin números sueltos ni palabras de ≤ 2 letras, recortadas a 5 letras (raíz simple: «neurociencia»/«neurociencias», «geofísica»/«geofisico»).
- `puntaje(entrada, charla)` → `{ titulo, disertante }`: proporción de palabras del título de la entrada presentes en el texto de la charla (título + títulos originales), tomando la mejor contra la proporción inversa (cubre títulos más cortos en un lado u otro); igual para el disertante.
- `cruzarArchivo(entradas, charlas)` → `{ seguras, dudosas, sinPar, ignoradas }`.
- **Segura** si: título ≥ 0,6 **y** disertante ≥ 0,5 (o entrada sin disertante y título ≥ 0,9), `|año − anio| ≤ 1`, margen ≥ 0,3 sobre el segundo candidato y la charla no la reclama otra entrada segura. **Dudosa** si el mejor candidato suma ≥ 0,6 sin cumplir lo anterior (hasta 3 candidatos). **Sin par** el resto. Los umbrales son constantes con nombre; los tests fijan los casos de borde reales (los de Context).
- Una charla en varias partes es una sola charla: todas las partes comparten fecha.

### D4. Qué se guarda
- `fecha` siempre (es lo que el catálogo no tiene).
- `disertante` exacto del archivo (sin títulos), salvo entradas sin disertante. Variantes de un mismo nombre en el archivo («Chambouleyron» / «Chambouleryron») se guardan tal cual y el reporte las señala para que la autora decida.
- `titulo` del archivo **solo** si el catálogo dice `[Título]`; nunca pisa uno existente. Así 156 tarjetas dejan de depender de un placeholder.

### D5. Fecha y orden
- `fecha` en `dd/mm/aaaa`, como `proxima_charla.fecha`, para que la edite cualquier persona.
- En la vista combinada, si hay `fecha`, `anio` sale de ella.
- `ultimasCharlas`: año desc; dentro del año, nuevas sin fecha primero (se agregan a mano y son las más nuevas), luego fechadas por fecha desc, luego sin fecha en el orden del catálogo.
- Función pura nueva `textoFecha("09/10/2026")` → «9 de octubre de 2026»; la tarjeta la usa en lugar del año cuando existe.

### D6. Quiénes somos: orden y contenido
Orden de la página: encabezado → **Ateneo · Amigos · Ciencia** → Nuestra historia → El Ateneo en fotos → Nuestros valores → Cómo funcionamos → **Mesa Operativa** (si se muestra) → **Sumate al Ateneo** → Proponer una charla.

- **Ateneo · Amigos · Ciencia**: tres columnas en escritorio, una debajo de otra en celular, sin cajas (filetes, como valores). Texto editado del sitio viejo, en registro del sitio:
  - *Ateneo* — cita destacada (`<blockquote>` + `<cite>`, `--fuente-titulos`, tamaño de cita existente): «La palabra griega ateneo designaba el templo de Palas Atenea, donde se reunían poetas, filósofos y oradores para leer y compartir sus obras.» Debajo: hoy nombra al lugar donde se reúnen personas interesadas en el conocimiento científico, cultural o literario.
  - *Amigos* — las charlas se dan en un ambiente de respeto y amistad, entre personas con intereses comunes.
  - *Ciencia* — empezó entre profesionales de las ciencias «duras» en la UTN FRM; hoy abarca también literatura, historia y filosofía, para acercar a la comunidad conocimiento confiable y desmentir mitos y pseudociencia.
  - Cierre: «Hoy recibimos disertantes y participantes de México, Estados Unidos y Europa.»
- **Mesa Operativa**: lista simple en dos columnas (una en celular), `ul` con nombres como `textContent`, ordenada con `localeCompare(…, 'es', { sensitivity: 'base' })` por apellido y luego nombre (función pura `integrantesOrdenados`, TDD). El `<section>` arranca con `hidden` y solo se muestra si `mostrar === true` y hay al menos un integrante.
- **Sumate al Ateneo**: bloque corto con el texto «Ser miembro es gratis, no implica ninguna obligación y podés darte de baja cuando quieras.» y el botón primario. Valida la URL con `enlaceSeguro` (ya existe). Sin JavaScript o sin URL, se lee el texto y no hay botón.
- **Descargar en PDF**: botón secundario junto a «Enviar mi propuesta»; texto «Descargar la Declaración (PDF, 600 KB)». El PDF publicable se copia a `archivos/` (en Elementor se sube a la biblioteca de medios de WordPress y se cambia la URL en `data/sitio.js`).

### D7. Declaración: texto publicado (v2.4) vs. PDF de julio de 2020
El texto de la página es la v2.4 (docx entregado en C-03). Diferencias con el PDF firmado en julio de 2020:

| Parte | PDF julio 2020 | Página (v2.4) |
|---|---|---|
| Fundación | Tercera persona: «se reunían», «quien asignó un aula», «facilitando los medios audiovisuales»; «-ingenieros y médicos-» entre guiones; «aulas de la FRM UTN» | Primera persona: «nos reuníamos», «quien nos asignó», «facilitándonos medios audiovisuales» |
| Nombre | «se hizo necesario algún tipo de ordenamiento y el grupo pasó a llamarse…»; «Y aunque entre los participantes…» | redacción distinta |
| Visión y Misión | Visión primero («El AAC pretende…») | Misión primero |
| Objetivo c | «verificable y **fiable**» | «verificable y **falible**» (igual que el sitio viejo) |
| Objetivo d | «Fomentar la divulgación científica de los rubros mencionados…, dentro de la sociedad» | «divulgación científica y cultural» |
| Objetivo f / g | f es un ítem aparte; g dice «proceso científico» | f unido; g dice «desarrollo científico» |
| Ambiente interno | «intercambio de ideas y propuestas»; «cuando se logra sinergia» | «si logran sinergia» |
| Actividades | «Sus tareas son», «el AAC produce sus actividades», «como pueden ser, por ejemplo», «divulgar informes o trabajos técnicos» | redacción revisada |
| Particularidad de importancia | Solo ideologías políticas, religiosas, étnicas, violencia o discriminación | Agrega «y otros que atenten contra la Moral, la ley y buenas costumbres, como tampoco aquellos que carezcan de bases científicas o tecnológicas debidamente probadas» y el párrafo «En resguardo de lo expresado, la MO se reserva…» (ambos también en el sitio viejo) |
| Frecuencia | «es semanal, o según lo establezca la MO» | «será semanal, según lo establezca la MO de acuerdo con las posibilidades…» |
| Cierre | «Conformación de la actual Mesa Organizadora»: 7 personas con cargo y título (Coordinador General Mg. Ing. Raúl Pía; Relaciones Institucionales Ing. Luis P. Tittarelli; Coordinación Ing. Eduardo S. Serdoch; Vocales Lic. Adolfo Anunziata, Lic. Guillermo Pensado, Ing. Luis Blanco, Ing. Víctor Savone); «En Mendoza, Julio de 2020»; correo institucional en el encabezado | Sin la conformación de la Mesa |

Conclusión: la v2.4 es posterior y coincide con el sitio viejo; el PDF es una versión anterior, distinta en contenido (no solo en estilo). Ofrecer ese PDF junto al texto v2.4 mostraría dos versiones distintas como si fueran la misma. Ver Open Questions.

## Risks / Trade-offs

- **Falsos positivos del cruce** → umbrales conservadores, 1:1 obligatorio, guarda de año y revisión del reporte por la autora; los tests fijan los casos de borde reales. Preferimos más dudosas que una fecha equivocada.
- **Volumen de dudosas (~80)** → el reporte las agrupa por año y muestra el título original de YouTube al lado para decidir rápido; confirmar una es copiar una línea a `correcciones.js`.
- **Mesa con nombres no confirmados** → `mostrar: false` por defecto; los nombres ya son públicos en el sitio viejo, pero el nexo decide.
- **PDF en Elementor** → depende de cómo se alojen archivos en la web de la FRM (pregunta abierta de KB 10); por eso la URL vive en `data/sitio.js`.

## Migration Plan

Cambios aditivos: sin `data/archivo-charlas.js` el sitio se comporta como hoy. Orden de los `<script>`: `archivo-charlas.js` antes de `aplicar-correcciones.js`. Rollback: borrar el archivo generado.

### D8. Tarjetas sin subrayado (bloque D, design system revisión 3)
Pedido de la autora (17/11/2026): el subrayado de los títulos de tarjeta no le gusta. Se suma a este change (no a uno aparte) porque toca la misma portada que se revisa en el navegador y cabe en pocas reglas de CSS.
- **Temas**: sin subrayado, sin bordes ni rayas; fondo `--aac-celeste` (token nuevo, tinte muy claro de `--aac-azul`) y `--aac-celeste-hover` (un poco más oscuro) al pasar el cursor; flecha «→» junto a la cantidad (`aria-hidden`, el enlace ya dice adónde va).
- **Charlas** (portada y, en C-04, videoteca): toda la tarjeta es el enlace; título sin subrayado; al pasar el cursor la tarjeta sube 2 px con `--sombra-elevada` y el título pasa a azul. El formato de tarjeta (miniatura + título) comunica que es clickeable, no solo el color.
- Accesibilidad: texto sobre celeste con contraste AA (se mide), foco visible con el contorno amarillo existente en toda la tarjeta, ≥ 44 px, y sin elevación ni transición con `prefers-reduced-motion: reduce`.
- `design-system/` pasa a **revisión 3** con `Approval: pending` hasta que la autora la apruebe.

## Open Questions (resueltas por la autora, 17/11/2026)

1. **PDF de la Declaración**: opción **(b)**. `declaracion_pdf: null` y sin botón hasta tener el PDF de la v2.4; en KB 10 queda el pedido al nexo y la diferencia con el PDF de 2020. No se copia ningún PDF a `archivos/` en este change.
2. **Títulos desde el archivo**: **sí**, solo donde el catálogo dice `[Título]`, sin pisar títulos existentes.
3. **Nexo** (KB 10, sigue abierta): ¿«Mesa Operativa» u «Organizadora»?; ¿confirman que aparezcan los 10 nombres? El PDF de 2020 lista otra conformación (7, con cargos). Mientras tanto, `mostrar: false`.

## UI Mockups

- Design system revision: 3 (aprobada por la autora el 17/11/2026; ver D8)
- Decision: no (project policy) — 17/11/2026
- Mockups: — (modo `system-only`; las secciones nuevas reutilizan patrones aprobados: filetes de valores, cita con `--fuente-titulos`, botones primario y secundario)
- Approval: —
- Preview: se capturará Quiénes somos a 390×844 y 1440×900 al verificar
- Visual verify: pendiente
