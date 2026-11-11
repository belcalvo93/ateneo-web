# CHANGES — Secuencia de Implementación

> Índice canónico de todos los changes del proyecto **Ateneo Amigos de la Ciencia — Web (Videoteca + Inicio)**.
> Cada change es atómico: un agente puede implementarlo en una sesión (~4-6 horas).
> **Leer este archivo antes de ejecutar cualquier `/opsx:propose`.**

> ## ⚠️ ROADMAP PROVISIONAL — C-03 a C-06 SUJETOS A VALIDACIÓN
> Este roadmap se revisa después de la **reunión con el Ateneo del 11/11/2026**, donde pueden pedir cambios en los temas de la videoteca, las secciones y la plataforma (Elementor o Google Sites).
>
> - **Punto de partida (camino crítico, inicio): C-01 y C-02.** No dependen de ninguna de esas decisiones, así que se arrancan ya.
> - **C-03, C-04, C-05 y C-06 están SUJETOS A VALIDACIÓN** tras la reunión: su scope, orden o incluso su existencia pueden cambiar. No hacer `/opsx:propose` de ninguno hasta confirmar.
> - Si cambian los temas o las secciones, se retoca el scope de C-02 (esquema de temas) y de C-03/C-04. Si cambia la plataforma, se rehace sobre todo C-06.

---

## Cómo usar este documento

1. Identificá el próximo change pendiente (`[ ]`) cuyas dependencias estén todas `[x]`. **Hoy: solo C-01 y C-02.**
2. Leé los archivos de "Leer antes" de ese change en `knowledge-base/`.
3. Ejecutá `/opsx:propose C-NN-nombre` (y después `/opsx:apply`). La lógica de buscador/filtro (C-04) va con **Strict TDD** (`node:test`, sin dependencias).
4. Al terminar: verificá y `/opsx:archive`.
5. Marcá el checkbox del change (`[x]`) en este archivo.

Diseño: el sistema de diseño (`design-system/`, modo `system-only`, revisión 1, aprobado) y los mockups aprobados en `docs/mockups/` son el contrato visual. **No se piden mockups por change.**

### Preguntas abiertas que condicionan el roadmap

Fuente: `knowledge-base/10_preguntas_abiertas.md` e `09_decisiones_y_supuestos.md`. Se resuelven en la reunión del 11/11.

1. **Plataforma final de integración: ¿Elementor (WordPress FRM) o Google Sites?** Define dónde viven datos/CSS/JS, si se inlinea todo y cómo es la guía de uso. Afecta C-06 (y el formato de entrega de C-02/C-05). Ver DD-02, IN-02.
2. **Validación de los 8 temas propuestos** (y de las etiquetas cortas). Afecta el esquema de temas de C-02 y la clasificación de las 186 charlas en C-05. Ver DD-05, IN-03.
3. **¿Quién mantiene la página después de la beca?** Define el nivel de simplicidad de la edición de datos (C-02) y el público de la guía de uso (C-06). Ver US-010, RN-CO-02.

Otras abiertas, menos bloqueantes: criterio de «últimas»/«más vistas» (curado vs. automático, afecta C-03), playlists por tema (US-006, requiere acceso al canal), logo en alta calidad, usuarios de Instagram/Facebook, enlace de Zoom.

---

## Árbol de dependencias

```
C-01 base-y-estilos                     ← ARRANQUE (no depende de la reunión)
 └── C-02 datos-charlas                 ← ARRANQUE (no depende de la reunión)
      ├── C-03 portada                  ⚠ sujeto a validación (11/11)
      │    └── C-05 responsive-a11y-carga-completa   ⚠
      └── C-04 videoteca (TDD)          ⚠ sujeto a validación (11/11)
           └── C-05 responsive-a11y-carga-completa   ⚠
                └── C-06 integracion-y-guia          ⚠
```

### Paralelismo por fase

```
GATE 0: (nada)                                  ← ARRANQUE
  → C-01 base-y-estilos                [Agente A]

GATE 1: C-01 ✓
  → C-02 datos-charlas                 [Agente A]

--- Acá se hace la reunión del 11/11. Revisar C-03..C-06 antes de seguir. ---

GATE 2: C-02 ✓                                  ← FORK (⚠ sujeto a validación)
  → C-03 portada                       [Agente A]
  → C-04 videoteca (TDD)               [Agente B]

GATE 3: C-03 ✓ + C-04 ✓                         (⚠ sujeto a validación)
  → C-05 responsive-a11y-carga-completa  [Agente A: a11y/responsive]
  → (carga de las 186 charlas con el Ateneo en paralelo)  [Agente B — si C-02 ✓]

GATE 4: C-05 ✓                                  (⚠ sujeto a validación)
  → C-06 integracion-y-guia            [Agente A]
```

### Camino crítico (5 changes — mínimo irreducible)

`C-01 → C-02 → C-04* → C-05 → C-06`

\* C-03 es la otra rama de GATE 2; C-05 espera a ambas, así que cualquiera de las dos puede ser la última. La videoteca (C-04) es la más larga por el TDD. Tramo confirmado hoy: **C-01 → C-02**; el resto depende de la reunión del 11/11. Hito duro: guía entregada el **18/12** (revisión con el Ateneo 09/12–15/12).

### Plan óptimo con 3 agentes

Proyecto chico, pensado para una sola desarrolladora; la tabla indica qué se podría paralelizar si se suma gente.

| Paso | Agente A (Base/Portada) | Agente B (Videoteca/Datos) | Agente C (Integración) |
|------|-------------------------|----------------------------|------------------------|
| 1 | C-01 base-y-estilos | — | — |
| 2 | C-02 datos-charlas | — | — |
| 3 ⚠ | C-03 portada | C-04 videoteca (TDD) | — |
| 4 ⚠ | C-05 responsive + a11y | C-05 carga completa de las 186 charlas | — |
| 5 ⚠ | — | — | C-06 integración y guía |

---

## FASE 1 — Fundación (ARRANQUE, no depende de la reunión)

> Estos dos changes se pueden empezar ya. Son el punto de partida del roadmap.

### [C-01] `base-y-estilos`
- **Estado**: `[x]` completado y archivado (2026-11-06)
- **Scope**:
  - Estructura de carpetas según KB 08: `css/`, `js/`, `data/`, `tests/`, `index.html` y `videoteca.html` como esqueletos vacíos pero válidos.
  - `README.md` del repo: qué es, estructura, cómo abrirlo en local, cómo correr los tests (`node --test`).
  - `css/estilos.css` con las variables de `design-system/tokens.css` en `:root` (color, tipografía, espaciado, radios, sombras, foco, movimiento + `prefers-reduced-motion`), base 18 px, objetivos ≥ 44 px, foco visible.
  - Contenedor/prefijo de aislamiento CSS (p. ej. `.aac-web`) para convivir con los estilos de Elementor/tema (IN-02).
  - Carga de tipografías (Dosis, Open Sans, Baskervville) y estilos base de componentes comunes (nav, botones, pie) tomados de `design-system/components.html`.
  - `package.json` mínimo sin dependencias, solo con el script `test`.
  - Verificación: abrir los esqueletos en el navegador y comparar tokens contra `design-system/components.html`.
- **Dependencias**: ninguna
- **Governance**: BAJO
- **Leer antes**:
  - `knowledge-base/08_arquitectura_propuesta.md` §Estructura de directorios, §Identidad visual, §Accesibilidad
  - `knowledge-base/09_decisiones_y_supuestos.md` §DD-01, §DD-07
  - `design-system/README.md` y `design-system/tokens.css`

### [C-02] `datos-charlas`
- **Estado**: `[x]` completado y archivado (2026-11-11)
- **Scope**:
  - Datos como archivos **`.js`** en `data/` (no `.json`; decisión DD-03): `data/temas.js` (`window.AAC_TEMAS`: `id`, `nombre`, `etiqueta` corta, `playlist_url` opcional), `data/charlas.js` (`window.AAC_CHARLAS`, **archivo generado, no se edita a mano**: `Charla` con `id`, `titulo`, `disertante`, `tema`, `anio`, `partes[]`, `revisar[]` y `destacada` opcional; `Parte` con `titulo_original`, `duracion`, `vistas` normalizado a número, `url`) `data/correcciones.js` (`window.AAC_CORRECCIONES`: correcciones a mano por id de charla), `data/charlas-nuevas.js` (`window.AAC_CHARLAS_NUEVAS`) y `data/proxima-charla.js` (`window.AAC_PROXIMA_CHARLA`). `js/aplicar-correcciones.js` junta generado + nuevas + correcciones en el navegador (`AAC_aplicarCorrecciones`). Concatenables en un solo `<script>` para pegar en Elementor (acceso a archivos externos desconocido).
  - Derivar las 186 charlas / 310 partes desde `data/charlas-borrador.json` (se conserva sin cambios) con `scripts/derivar-datos.js`, sin perder datos; `anio_aprox` → `anio`, `videos` → `partes` (ordenadas por número de parte); `titulo`/`disertante` solo cuando se extraen con alta confianza, el resto como `[Título]`/`[Disertante]` + `revisar` (se completan en C-05).
  - Cruce de `url` y `vistas` con el canal de YouTube a partir de un `canal.jsonl` obtenido con `python -m yt_dlp --flat-playlist` (CLI puntual de desarrollo, ver DD-09; no va en `package.json`). **Regeneración conservadora** (`scripts/derivar-datos.js`, con `--comprobar`): ids y partes salen siempre del borrador; el enlace de cada parte es el manual, el que ya tenía si su video sigue en el canal, o un título único; nada ambiguo se asigna. Reporte de dudosos en `scripts/salida/reporte-cruce.md` (carpeta fuera de git). Ver DD-10 a DD-12.
  - Esquema de `ProximaCharla`: título, disertante, descripción breve, fecha (`DD/MM/AAAA`), hora (`HH:MM`), lugar, modalidad, enlace Zoom, correo de inscripción. Sin inventar valores: placeholders marcados (RN-GL-02).
  - Validador (`node scripts/validar-datos.js`, sin dependencias, con `--estricto` para publicar): valida la vista combinada; errores de esquema, ids duplicados, temas inexistentes, correcciones a charlas inexistentes o con campos desconocidos, avisos de pendientes.
  - Documentación para editores no programadores (`data/LEEME.md`, borrador de la guía; la versión final va en C-06) y `scripts/LEEME.md`.
  - Tests `node:test` (TDD) sobre los módulos de `scripts/lib/`.
  - La configuración del sitio (contacto, redes, cifras de portada) **se mueve a C-03**, que es quien la consume.
- **Dependencias**: `C-01`
- **Governance**: MEDIO
- **Leer antes**:
  - `knowledge-base/04_modelo_de_datos.md` §Entidades, §ProximaCharla, §Seed data inicial
  - `knowledge-base/05_reglas_de_negocio.md` §RN-VI, §RN-CO
  - `knowledge-base/09_decisiones_y_supuestos.md` §DD-03, §DD-04, §DD-05, §SU-05
  - `knowledge-base/10_preguntas_abiertas.md` §IN-02, §IN-03, §IN-05

---

## FASE 2 — Páginas (⚠ SUJETA A VALIDACIÓN tras la reunión del 11/11)

> C-03 y C-04 son paralelizables entre sí. No arrancar hasta revisar este roadmap con lo que se decida con el Ateneo (secciones, temas, plataforma).

### [C-03] `portada`
- **Estado**: `[ ]` pendiente — ⚠ **sujeto a validación (11/11)**
- **Scope**:
  - `index.html` según el mockup «Inicio» (escritorio y celular) en `docs/mockups/`.
  - Hero con propuesta y cifras (+100 conferencias, 310 videos, viernes 18 hs); sección «Quiénes somos» (2017, Dpto. Ing. Electrónica) — US-001.
  - Tarjeta «Próxima charla» renderizada desde datos, con botón `mailto:ateneoac.mo@gmail.com` y correo visible como texto — US-007.
  - 3 últimas charlas, 3 más vistas y grilla de 8 temas con conteo — US-008. «Más vistas» es **automático** por el campo `vistas`, con la opción de fijar charlas destacadas a mano con `destacada: true` (campo opcional del esquema de C-02; la lógica de portada que lo usa — destacadas primero, luego por `vistas` — es de este change).
  - Configuración del sitio (contacto, redes, cifras de portada) en datos, movida desde C-02.
  - **Requisito (D17 de C-02)**: los enlaces a **redes sociales** son una **lista configurable en los datos** (`redes: [{ nombre, url }]`): agregar o quitar una red se hace editando los datos, sin tocar el HTML. Agustina creará Instagram y además TikTok o Facebook (sin decidir); mientras no exista el usuario, `url` con placeholder `[…]` o `null` (un placeholder nunca se muestra al público).
  - **Requisito (D13 de C-02)**: leer siempre la vista combinada `AAC_aplicarCorrecciones(AAC_CHARLAS, AAC_CORRECCIONES, AAC_CHARLAS_NUEVAS)`, nunca `AAC_CHARLAS` directo (se perderían las correcciones a mano).
  - **Requisito (decidido en C-02)**: un placeholder entre corchetes nunca es visible para el público. Si `titulo` sigue en `[Título]`, se muestra el `titulo_original` de la parte 1; si `disertante` es `[Disertante]`, esa línea no se muestra.
  - Sección «Proponer una charla» (requisitos + Declaración de Principios + «Enviar mi propuesta») — US-009.
  - Pie con redes (YouTube, Instagram, Facebook; usuarios pendientes como placeholder) — US-003.
  - Manejo de error si falla la carga de datos: mensaje + enlace al canal de YouTube.
  - Render con `textContent`, enlaces externos con `rel="noopener noreferrer"`.
- **Dependencias**: `C-02`
- **Governance**: BAJO
- **Leer antes**:
  - `knowledge-base/06_funcionalidades.md` §Épica 1, §Épica 3
  - `knowledge-base/07_flujos_principales.md` §Flujo 1, §Flujo 2, §Flujo 3
  - `knowledge-base/05_reglas_de_negocio.md` §RN-PC, §RN-PO, §RN-PR
  - `knowledge-base/10_preguntas_abiertas.md` §IN-01, §IN-04

### [C-04] `videoteca`
- **Estado**: `[ ]` pendiente — ⚠ **sujeto a validación (11/11)**
- **Scope**:
  - **Strict TDD** con `node:test` (sin dependencias): `js/buscador.js` con funciones puras `normalizar`, `buscar`, `filtrarPorTema`, `combinar`; tests en `tests/buscador.test.js` escritos antes del código.
  - Tests esperados: normalización de mayúsculas y tildes, búsqueda por título o disertante (RN-BU-01/02), filtro por tema, combinación búsqueda + tema, «Todos los temas» por defecto, sin resultados, mínimo 2 casos por comportamiento.
  - `videoteca.html` según el mockup «Videoteca» (`docs/mockups/`): buscador, chips de tema (etiquetas cortas), contador «Mostrando N charlas», fichas con miniatura derivada de la URL de YouTube.
  - `js/app.js`: render desde la vista combinada `AAC_aplicarCorrecciones(AAC_CHARLAS, AAC_CORRECCIONES, AAC_CHARLAS_NUEVAS)` (generado + correcciones + charlas nuevas; nunca `AAC_CHARLAS` directo); una ficha por charla; botones «Charla · duración» o «Parte N · duración» (RN-VI-05), con el nombre derivado de la cantidad de partes.
  - **Requisito (decidido en C-02)**: un placeholder entre corchetes nunca es visible para el público. Si `titulo` sigue en `[Título]`, la ficha muestra el `titulo_original` de la parte 1; si `disertante` es `[Disertante]`, esa línea no se muestra. Las partes con `url: null` no deben romper la ficha.
  - Estado vacío «No encontramos charlas…» con acción de limpiar filtros; mensaje si falla la carga de datos.
  - Búsqueda nunca insertada con `innerHTML`; enlaces con `rel="noopener noreferrer"`.
  - Enlace a playlist por tema solo si existe `playlist_url` (US-006, opcional).
- **Dependencias**: `C-02` (y estilos de `C-01`)
- **Governance**: MEDIO
- **Leer antes**:
  - `knowledge-base/06_funcionalidades.md` §US-004, §US-005, §US-006
  - `knowledge-base/05_reglas_de_negocio.md` §RN-VI, §RN-BU
  - `knowledge-base/07_flujos_principales.md` §Flujo 1
  - `knowledge-base/08_arquitectura_propuesta.md` §Patrones aplicados, §Seguridad, §Testing
  - `knowledge-base/09_decisiones_y_supuestos.md` §DD-06, §SU-03

---

## FASE 3 — Calidad y contenido (⚠ SUJETA A VALIDACIÓN tras la reunión del 11/11)

### [C-05] `responsive-a11y-carga-completa`
- **Estado**: `[ ]` pendiente — ⚠ **sujeto a validación (11/11)**
- **Scope**:
  - Responsive en celular (390 px), tablet y escritorio (1440 px), mobile-first (RN-AC-02); menú hamburguesa accesible.
  - Accesibilidad RN-AC-01: base 18 px, contraste AA (revisar texto sobre `--aac-llama` y gris sobre blanco), `alt`, navegación por teclado en menú/chips/fichas, objetivos ≥ 44 px, foco visible.
  - Carga completa de las 186 charlas: `titulo` limpio (formato *Tema – Disertante (año)* o el que defina el Ateneo), `disertante` y `url` de cada uno de los 310 videos; revisión de `anio` (aproximado) y de los 8 temas con el Ateneo.
  - Validador de datos (C-02) ejecutado en modo estricto (`node scripts/validar-datos.js --estricto`) sobre el catálogo completo: sin placeholders, sin `revisar` y sin `url` en `null`.
  - Verificación manual contra mockups en 390×844 y 1440×900, sin errores de consola ni requests fallidos.
  - Tests: re-ejecutar `node --test` y el validador de datos.
- **Dependencias**: `C-03, C-04`
- **Governance**: MEDIO
- **Leer antes**:
  - `knowledge-base/05_reglas_de_negocio.md` §RN-AC
  - `knowledge-base/08_arquitectura_propuesta.md` §Accesibilidad
  - `knowledge-base/04_modelo_de_datos.md` §Seed data inicial
  - `knowledge-base/10_preguntas_abiertas.md` §IN-05 y tabla de preguntas abiertas
  - `design-system/README.md` §Reglas clave

### [C-06] `integracion-y-guia`
- **Estado**: `[ ]` pendiente — ⚠ **sujeto a validación (11/11)**; depende de la plataforma elegida
- **Scope**:
  - Empaquetado para la plataforma confirmada: **Elementor (widget HTML)** o **Google Sites (Insertar → Código)**.
  - Variante inlineada (HTML con CSS/JS/datos embebidos) si los archivos externos no se pueden hospedar (Mediateca de WP), con aislamiento CSS bajo contenedor.
  - Prueba de integración en un entorno equivalente: interferencia de estilos del tema, carga de tipografías, miniaturas de YouTube (SU-03).
  - Guía de uso para el Ateneo (entregable del 18/12), en lenguaje simple para no programadores: cargar una charla, editar la próxima charla, validar el archivo de datos, publicar/pegar el código actualizado, qué hacer si algo falla.
  - Lista de insumos pendientes del Ateneo (logo en alta calidad, usuarios de redes, enlace de Zoom).
  - Adaptación de la guía a quien mantenga la página después de la beca (pregunta abierta 3).
- **Dependencias**: `C-05`
- **Governance**: ALTO
- **Leer antes**:
  - `knowledge-base/07_flujos_principales.md` §Flujo 4, §Flujo 5
  - `knowledge-base/09_decisiones_y_supuestos.md` §DD-01, §DD-02, §SU-01, §SU-02
  - `knowledge-base/08_arquitectura_propuesta.md` §Restricción clave
  - `knowledge-base/10_preguntas_abiertas.md` §IN-02
  - `design-system/README.md` §Integración Elementor

---

## Resumen

| ID | Change | Fase | Dependencias | Governance | Estado | Validación |
|----|--------|------|--------------|------------|--------|------------|
| C-01 | `base-y-estilos` | 1 | — | BAJO | `[x]` | Firme (arrancar ya) |
| C-02 | `datos-charlas` | 1 | C-01 | MEDIO | `[x]` | Firme (arrancar ya) |
| C-03 | `portada` | 2 | C-02 | BAJO | `[ ]` | ⚠ Tras reunión 11/11 |
| C-04 | `videoteca` | 2 | C-02 | MEDIO | `[ ]` | ⚠ Tras reunión 11/11 |
| C-05 | `responsive-a11y-carga-completa` | 3 | C-03, C-04 | MEDIO | `[ ]` | ⚠ Tras reunión 11/11 |
| C-06 | `integracion-y-guia` | 3 | C-05 | ALTO | `[ ]` | ⚠ Tras reunión 11/11 |

## Ideas / changes futuros

> No son parte del roadmap C-01 a C-06 ni están empezados. Quedan registrados para decidirlos con el Ateneo.

### [C-07] `tarjeta-en-portada-utn` (idea)
- **Estado**: no empezado — sujeto a la reunión con el Ateneo.
- **Idea**: la portada de la UTN FRM tiene cajas de colores (Cursos, Tecnicaturas, Licenciaturas, etc.), cada una con ícono, número, nombre y una etiqueta debajo, que enlazan a cada sección. El Ateneo tendría una caja que lleve a su página.
- **Pendiente de definir**: quién la agrega en Elementor, un color que no choque con los existentes, el ícono y el número.

### Ideas sobre los datos de YouTube
- **Completar disertantes y títulos desde las descripciones de los videos**: `python -m yt_dlp --skip-download --dump-json <video>` (por video, solo metadatos de lectura) trae la descripción; un script podría proponer `titulo`/`disertante` y dejar al Ateneo solo lo que no se pueda obtener.
- **Tema desde las playlists**: si Agustina arma playlists por tema, el script podría listar cada playlist (`yt-dlp --flat-playlist`) y asignar el tema por pertenencia (playlist → id de tema; `temas.js` ya tiene `playlist_url`).
- **«Más vistas» automático con `destacada` opcional**: ya está definido en C-03 (ver arriba); no se duplica acá.

---

**Primer change recomendado**: `C-01` (`base-y-estilos`). Siguiente: `C-02` (`datos-charlas`). Después, parar y revisar el roadmap con lo que salga de la reunión del 11/11.

Para arrancar: `/opsx:propose C-01-base-y-estilos` (nombre OpenSpec en kebab-case: `base-y-estilos`).
