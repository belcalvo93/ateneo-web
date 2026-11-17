# CHANGES — Secuencia de Implementación

> Índice canónico de todos los changes del proyecto **Ateneo Amigos de la Ciencia — Web (Videoteca + Inicio)**.
> Cada change es atómico: un agente puede implementarlo en una sesión (~4-6 horas).
> **Leer este archivo antes de ejecutar cualquier `/opsx:propose`.**

> ## ✅ Roadmap validado tras la reunión del 11/11/2026
> El Ateneo validó los mockups, las secciones y la plataforma (web de la UTN FRM, WordPress + Elementor; Google Sites descartado). El 16/11/2026 Agustina confirmó las 8 categorías de la videoteca y avisó que sumará 2 más. Fuente: reunión con el Ateneo del 11/11/2026 y documentos entregados por el Ateneo, `docs/PRD.md` v1.2 y `knowledge-base/09_decisiones_y_supuestos.md` (DD-13 a DD-20).
>
> - **C-01, C-02 y C-03 están cerrados.** Sigue el rediseño de la portada y la página «Quiénes somos» (C-03b, en propuesta) y después **C-04** (`videoteca`).
> - **C-03 a C-06 ya no están sujetos a validación**: se pueden proponer respetando las dependencias.
> - **Pendientes externos que no bloquean**: los nombres de las 2 categorías nuevas (no inventarlos: `data/temas.js` sigue con 8), el enlace de Instagram (placeholder; el del Canal de Difusión de WhatsApp ya está, DD-14), y el alta de Belén como editora en la web de la FRM (afecta C-06).
> - **Privacidad**: el repo es público. El listado interno de miembros del Ateneo nunca se copia ni se commitea, ni ningún correo o teléfono personal (DD-17).

---

## Cómo usar este documento

1. Identificá el próximo change pendiente (`[ ]`) cuyas dependencias estén todas `[x]`. **Hoy: C-03c (refinamiento visual) y después C-04** (C-01 a C-03b están cerrados).
2. Leé los archivos de "Leer antes" de ese change en `knowledge-base/`.
3. Ejecutá `/opsx:propose C-NN-nombre` (y después `/opsx:apply`). La lógica de buscador/filtro (C-04) va con **Strict TDD** (`node:test`, sin dependencias).
4. Al terminar: verificá y `/opsx:archive`.
5. Marcá el checkbox del change (`[x]`) en este archivo.

Diseño: el sistema de diseño (`design-system/`, modo `system-only`, revisión 1, aprobado) y los mockups aprobados en `docs/mockups/` son el contrato visual. **No se piden mockups por change.**

### Preguntas abiertas que condicionan el roadmap

Fuente: `knowledge-base/10_preguntas_abiertas.md` e `09_decisiones_y_supuestos.md`.

Resueltas en la reunión del 11/11 y con las novedades del 16/11:

1. **Plataforma**: web de la UTN FRM (WordPress + Elementor). Google Sites descartado (DD-02).
2. **Temas**: los 8 se mantienen y se sumarán 2 (DD-05).
3. **Mantenimiento después de la beca**: varios integrantes del Ateneo, con una guía de uso simple (DD-20).

Siguen abiertas (ninguna bloquea C-03):

1. **Nombres de las 2 categorías nuevas** (los pasa Agustina). Afecta `data/temas.js`, la grilla de temas de C-03 y los chips de C-04: ambos se arman desde los datos, sin fijar la cantidad de temas.
2. **Administrador web de la FRM**: alta de Belén como editora y si se pueden hospedar archivos o se inlinea todo. Afecta C-06.
3. **Enlace de Instagram** (placeholder en la lista de redes de C-03). El del Canal de Difusión de WhatsApp ya se tiene (DD-14).
4. Menos bloqueantes: validar el logo con el nexo (DD-18), quiénes de la Mesa Organizadora o de los fundadores aparecen en «Quiénes somos», aviso semanal de quien sube las charlas al canal.

---

## Árbol de dependencias

```
C-01 base-y-estilos                     ✓ cerrado
 └── C-02 datos-charlas                 ✓ cerrado
      ├── C-03 portada                  ✓ cerrado
      │    └── C-03b rediseño portada + quiénes somos   ✓ cerrado
      │         ├── C-04 videoteca (TDD)
      │         └── C-05 responsive-a11y-carga-completa
      └── C-04 videoteca (TDD)          (usa el marco y la tarjeta de C-03b)
           └── C-05 responsive-a11y-carga-completa
                └── C-06 integracion-y-guia
```

### Paralelismo por fase

```
GATE 0: (nada)                                  ✓ hecho
  → C-01 base-y-estilos                [Agente A]

GATE 1: C-01 ✓
  → C-02 datos-charlas                 [Agente A]

--- Reunión del 11/11 hecha: C-03..C-06 validados (ver encabezado). ---

GATE 2: C-02 ✓                                  ← FORK (estamos acá)
  → C-03 portada                       [Agente A]
  → C-04 videoteca (TDD)               [Agente B]

GATE 3: C-03 ✓ + C-04 ✓
  → C-05 responsive-a11y-carga-completa  [Agente A: a11y/responsive]
  → (carga de las 186 charlas con el Ateneo en paralelo)  [Agente B — si C-02 ✓]

GATE 4: C-05 ✓
  → C-06 integracion-y-guia            [Agente A]
```

### Camino crítico (5 changes — mínimo irreducible)

`C-01 → C-02 → C-04* → C-05 → C-06`

\* C-03 es la otra rama de GATE 2; C-05 espera a ambas, así que cualquiera de las dos puede ser la última. La videoteca (C-04) es la más larga por el TDD. Tramo cerrado: **C-01 → C-02**; el resto quedó validado en la reunión del 11/11. Hito duro: guía entregada el **18/12** (revisión con el Ateneo 09/12–15/12).

### Plan óptimo con 3 agentes

Proyecto chico, pensado para una sola desarrolladora; la tabla indica qué se podría paralelizar si se suma gente.

| Paso | Agente A (Base/Portada) | Agente B (Videoteca/Datos) | Agente C (Integración) |
|------|-------------------------|----------------------------|------------------------|
| 1 | C-01 base-y-estilos | — | — |
| 2 | C-02 datos-charlas | — | — |
| 3 | C-03 portada | C-04 videoteca (TDD) | — |
| 4 | C-05 responsive + a11y | C-05 carga completa de las 186 charlas | — |
| 5 | — | — | C-06 integración y guía |

---

## FASE 1 — Fundación (cerrada)

> Los dos changes están completados y archivados.

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

## FASE 2 — Páginas (validada en la reunión del 11/11)

> C-03 y C-04 son paralelizables entre sí. Orden recomendado para una sola desarrolladora: C-03 y después C-04.

### [C-03] `portada`
- **Estado**: `[x]` completado y archivado (2026-11-16)
- **Scope**:
  - `index.html` según el mockup «Inicio» (escritorio y celular) en `docs/mockups/`.
  - Hero con propuesta y cifras (+100 conferencias, 310 videos, viernes 18 hs) — US-001.
  - **Nuevo (11/11) — «Quiénes somos»**: historia desde **agosto de 2015** (reemplaza el «desde 2017» de los mockups; DD-13), bajada institucional («Entidad autónoma sin fines de lucro…»), valores (rigor científico, clima amistoso y horizontal, acceso libre), Dpto. Ing. Electrónica y declaración De Interés para la FRM. **Galería con las 4 fotos históricas** entregadas por el Ateneo: se copian al repo optimizadas (peso y tamaño), con texto alternativo descriptivo. No nombrar personas (fundadores, Mesa Organizadora) hasta confirmarlo con el nexo — US-001.
  - Tarjeta «Próxima charla» renderizada desde datos, con botón `mailto:ateneoac.mo@gmail.com` y correo visible como texto — US-007.
  - **Nuevo (11/11) — Calendar y Zoom en la próxima charla**: dos botones opcionales, «Agendar en Google Calendar» y «Entrar por Zoom». Se agrega el campo opcional `calendar_url` a `data/proxima-charla.js` (junto al `zoom_url` que ya existe), con su validación, su test y su explicación en `data/LEEME.md`; cada botón se muestra solo si su enlace está cargado (DD-15, RN-PC-04).
  - 3 últimas charlas, 3 más vistas y grilla de temas con conteo, armada desde `temas.js` sin fijar la cantidad (hoy 8; se sumarán 2 cuando Agustina informe los nombres: no inventarlos) — US-008. «Más vistas» es **automático** por el campo `vistas`, con la opción de fijar charlas destacadas a mano con `destacada: true` (campo opcional del esquema de C-02; la lógica de portada que lo usa — destacadas primero, luego por `vistas` — es de este change).
  - Configuración del sitio (contacto, redes, cifras de portada) en datos, movida desde C-02.
  - **Requisito (D17 de C-02)**: los enlaces a **redes sociales** son una **lista configurable en los datos** (`redes: [{ nombre, url }]`): agregar o quitar una red se hace editando los datos, sin tocar el HTML. **Conjunto confirmado el 11/11 (DD-14)**: **YouTube** (URL del canal conocida), **Instagram** y **Canal de Difusión de WhatsApp**. **C-03 crea la lista** (todavía no existe en `data/`) con estos valores: YouTube `https://www.youtube.com/@ateneoamigosdelasciencias`, WhatsApp `https://whatsapp.com/channel/0029VbDjwCbI7BeKsvprkr3t` (enlace oficial, informado el 16/11) e Instagram con placeholder `[…]` o `null` hasta que Agustina pase el usuario (un placeholder nunca se muestra al público: esa red se oculta).
  - **Requisito (D13 de C-02)**: leer siempre la vista combinada `AAC_aplicarCorrecciones(AAC_CHARLAS, AAC_CORRECCIONES, AAC_CHARLAS_NUEVAS)`, nunca `AAC_CHARLAS` directo (se perderían las correcciones a mano).
  - **Requisito (decidido en C-02)**: un placeholder entre corchetes nunca es visible para el público. Si `titulo` sigue en `[Título]`, se muestra el `titulo_original` de la parte 1; si `disertante` es `[Disertante]`, esa línea no se muestra.
  - **Nuevo (11/11) — «Proponer una charla»**: requisitos (propuesta temática, resumen, CV abreviado, aceptación de la Declaración) y criterios de admisión (base científica o tecnológica; sin fines comerciales ni proselitismo político o religioso; RN-PR-03), el **texto completo de la Declaración de Principios v2.4 en un bloque desplegable** (`<details>`, transcripto del documento del Ateneo sin reescribirlo; reemplaza el enlace `bit.ly`; DD-16) y el botón «Enviar mi propuesta» — US-009.
  - Pie con redes tomadas de la lista configurable (YouTube, Instagram, Canal de Difusión de WhatsApp) — US-003.
  - **Privacidad (DD-17)**: los insumos del Ateneo (fotos, Declaración) se toman de su carpeta fuera del repo; el listado de miembros no se copia ni se usa en este change.
  - Manejo de error si falla la carga de datos: mensaje + enlace al canal de YouTube.
  - Render con `textContent`, enlaces externos con `rel="noopener noreferrer"`.
- **Dependencias**: `C-02`
- **Governance**: BAJO
- **Leer antes**:
  - `docs/PRD.md` v1.2 §Cambios de la versión 1.2, §Contexto y problema, §Requerimientos funcionales
  - `knowledge-base/01_vision_y_objetivos.md` §Historia e identidad del Ateneo
  - `knowledge-base/04_modelo_de_datos.md` §ProximaCharla, §Contenido institucional
  - `knowledge-base/06_funcionalidades.md` §Épica 1, §Épica 3
  - `knowledge-base/07_flujos_principales.md` §Flujo 1, §Flujo 2, §Flujo 3
  - `knowledge-base/05_reglas_de_negocio.md` §RN-PC, §RN-PO, §RN-PR
  - `knowledge-base/09_decisiones_y_supuestos.md` §DD-13 a §DD-18
  - `knowledge-base/10_preguntas_abiertas.md` §IN-04

### [C-03b] `rediseno-portada-y-quienes-somos`
- **Estado**: `[x]` completado y archivado (2026-11-17)
- **Scope**:
  - Rediseño para dos públicos (DD-23): encabezado de la portada que dice qué es el Ateneo, próxima charla inmediatamente debajo, cifras compactas, franja «Seguinos», más vistas con la misma tarjeta que las últimas, duración en la miniatura, invitación final a proponer una charla.
  - Página nueva `quienes-somos.html`: historia en 4 hitos, 4 valores, cómo funcionamos, galería oculta y «Proponer una charla» con la Declaración desplegable.
  - Menú de 4 ítems con botón «Menú» accesible en el celular; cabecera, menú y pie compartidos desde `js/marco.js`; tarjeta de charla en `js/ficha.js`.
  - Datos: `gancho` opcional en los temas; `direccion` y `mapa_url` («Cómo llegar») en `data/sitio.js`; validador y guía.
  - Design system: componentes nuevos en `components.html` y capturas regeneradas (revisión 1, sin tokens nuevos).
- **Dependencias**: `C-03`
- **Governance**: BAJO
- **Leer antes**:
  - `openspec/changes/c-03b-rediseno-portada-y-quienes-somos/` (proposal, design, specs)
  - `knowledge-base/09_decisiones_y_supuestos.md` §DD-23

### [C-04] `videoteca`
- **Estado**: `[ ]` pendiente — **validado el 11/11**
- **Scope**:
  - **Strict TDD** con `node:test` (sin dependencias): `js/buscador.js` con funciones puras `normalizar`, `buscar`, `filtrarPorTema`, `combinar`; tests en `tests/buscador.test.js` escritos antes del código.
  - Tests esperados: normalización de mayúsculas y tildes, búsqueda por título o disertante (RN-BU-01/02), filtro por tema, combinación búsqueda + tema, «Todos los temas» por defecto, sin resultados, mínimo 2 casos por comportamiento.
  - `videoteca.html` según el mockup «Videoteca» (`docs/mockups/`): buscador, chips de tema (etiquetas cortas), contador «Mostrando N charlas», fichas con miniatura derivada de la URL de YouTube.
  - `js/app.js`: render desde la vista combinada `AAC_aplicarCorrecciones(AAC_CHARLAS, AAC_CORRECCIONES, AAC_CHARLAS_NUEVAS)` (generado + correcciones + charlas nuevas; nunca `AAC_CHARLAS` directo); una ficha por charla; botones «Charla · duración» o «Parte N · duración» (RN-VI-05), con el nombre derivado de la cantidad de partes.
  - **Requisito (decidido en C-02)**: un placeholder entre corchetes nunca es visible para el público. Si `titulo` sigue en `[Título]`, la ficha muestra el `titulo_original` de la parte 1; si `disertante` es `[Disertante]`, esa línea no se muestra. Las partes con `url: null` no deben romper la ficha.
  - Estado vacío «No encontramos charlas…» con acción de limpiar filtros; mensaje si falla la carga de datos.
  - Búsqueda nunca insertada con `innerHTML`; enlaces con `rel="noopener noreferrer"`.
  - Enlace a playlist por tema solo si existe `playlist_url` (US-006, opcional). Agustina empezó a armar las playlists el 16/11: cargar las `playlist_url` que ya existan.
  - **Nuevo (16/11)**: los chips de tema se arman desde `temas.js`, sin fijar la cantidad: hoy son 8 y Agustina sumará 2 (no inventar los nombres; cuando los pase, se agregan a `temas.js` y se reclasifican las charlas).
  - **Opcional, antes o durante este change — cruce de disertantes (IN-07)**: completar parte de los `[Disertante]` pendientes cruzando nombres contra los títulos y descripciones de YouTube. Si se usa el listado de miembros del Ateneo como diccionario, el script lo lee desde su carpeta original **fuera del repo**; nunca se copia ni se commitea, y solo se guardan nombres que ya figuran públicamente en YouTube (DD-17).
  - **Nuevo (16/11, tras C-03)**: leer el parámetro `?tema=<id>` de la dirección (la portada ya enlaza cada tema así) y abrir la videoteca filtrada por ese tema.
  - **Nuevo (16/11, tras C-03)**: enlace a una charla concreta, `videoteca.html?charla=<id>` (por ejemplo `?charla=c084`), para compartir una charla puntual por WhatsApp o Instagram: la videoteca abre mostrando esa ficha destacada.
  - Reusar la tarjeta de charla, la cabecera, el menú y el pie compartidos que deja C-03b.
  - Fuera de scope: mostrar capítulos / marcas de tiempo de los videos (idea futura, IN-09).
- **Dependencias**: `C-02` y `C-03b` (marco compartido y tarjeta de charla)
- **Governance**: MEDIO
- **Leer antes**:
  - `knowledge-base/06_funcionalidades.md` §US-004, §US-005, §US-006
  - `knowledge-base/05_reglas_de_negocio.md` §RN-VI, §RN-BU
  - `knowledge-base/07_flujos_principales.md` §Flujo 1
  - `knowledge-base/08_arquitectura_propuesta.md` §Patrones aplicados, §Seguridad, §Testing
  - `knowledge-base/09_decisiones_y_supuestos.md` §DD-05, §DD-06, §DD-17, §SU-03
  - `knowledge-base/10_preguntas_abiertas.md` §IN-07, §IN-08

---

## FASE 3 — Calidad y contenido (validada en la reunión del 11/11)

### [C-05] `responsive-a11y-carga-completa`
- **Estado**: `[ ]` pendiente — **validado el 11/11**
- **Scope**:
  - Auditoría responsive en celular (390 px), tablet y escritorio (1440 px), mobile-first (RN-AC-02). El menú hamburguesa accesible ya lo hizo C-03b: acá solo se audita.
  - Accesibilidad RN-AC-01: base 18 px, contraste AA (revisar texto sobre `--aac-llama` y gris sobre blanco), `alt`, navegación por teclado en menú/chips/fichas, objetivos ≥ 44 px, foco visible.
  - Carga completa de las 186 charlas: `titulo` limpio (formato *Tema – Disertante (año)* o el que defina el Ateneo), `disertante` y `url` de cada uno de los 310 videos; revisión de `anio` (aproximado) y de los temas (los 8 confirmados más las 2 categorías nuevas cuando Agustina las informe; reclasificar con las playlists si conviene, IN-08).
  - **Nuevo (11/11)**: accesibilidad de lo que suma C-03: textos alternativos y peso de las fotos de la galería, bloque desplegable de la Declaración usable con teclado, botones de Calendar y Zoom con objetivo ≥ 44 px.
  - El cruce de disertantes (IN-07) respeta DD-17: el listado de miembros se lee desde fuera del repo y solo se guardan nombres ya públicos en YouTube.
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
- **Estado**: `[ ]` pendiente — **validado el 11/11**; plataforma confirmada
- **Scope**:
  - Empaquetado para la plataforma confirmada el 11/11: **widget HTML de Elementor en la web de la UTN FRM** (Google Sites descartado, DD-02). Requiere gestionar con el administrador web de la FRM el alta de Belén como editora.
  - Variante inlineada (HTML con CSS/JS/datos embebidos) si los archivos externos no se pueden hospedar (Mediateca de WP), con aislamiento CSS bajo contenedor.
  - Prueba de integración en un entorno equivalente: interferencia de estilos del tema, carga de tipografías, miniaturas de YouTube (SU-03).
  - Guía de uso para el Ateneo (entregable del 18/12), en lenguaje simple para no programadores y pensada para que **varios integrantes** (no una sola persona) carguen la próxima charla (pedido del 11/11, DD-20); probarla con miembros del Ateneo antes de la entrega. Contenido: cargar una charla, editar la próxima charla (incluidos los enlaces de Calendar y Zoom), agregar o quitar una red, validar el archivo de datos, publicar/pegar el código actualizado, qué hacer si algo falla.
  - Lista de insumos pendientes al momento de la entrega (enlace de Instagram, validación del logo con el nexo, categorías nuevas si todavía faltan).
  - Revisión de privacidad antes de publicar: ningún correo o teléfono personal en el código ni en los datos (DD-17).
- **Dependencias**: `C-05`
- **Governance**: ALTO
- **Leer antes**:
  - `knowledge-base/07_flujos_principales.md` §Flujo 4, §Flujo 5
  - `knowledge-base/09_decisiones_y_supuestos.md` §DD-01, §DD-02, §DD-17, §DD-20, §SU-01, §SU-02
  - `knowledge-base/08_arquitectura_propuesta.md` §Restricción clave
  - `knowledge-base/10_preguntas_abiertas.md` §IN-02
  - `design-system/README.md` §Integración Elementor

---

## Resumen

| ID | Change | Fase | Dependencias | Governance | Estado | Validación |
|----|--------|------|--------------|------------|--------|------------|
| C-01 | `base-y-estilos` | 1 | — | BAJO | `[x]` | Cerrado |
| C-02 | `datos-charlas` | 1 | C-01 | MEDIO | `[x]` | Cerrado |
| C-03 | `portada` | 2 | C-02 | BAJO | `[x]` | Cerrado |
| C-03b | `rediseno-portada-y-quienes-somos` | 2 | C-03 | BAJO | `[x]` | Cerrado |
| C-04 | `videoteca` | 2 | C-02, C-03b | MEDIO | `[ ]` | Validado 11/11 |
| C-05 | `responsive-a11y-carga-completa` | 3 | C-03, C-04 | MEDIO | `[ ]` | Validado 11/11 |
| C-06 | `integracion-y-guia` | 3 | C-05 | ALTO | `[ ]` | Validado 11/11 |

## Ideas / changes futuros

> No son parte del roadmap C-01 a C-06 ni están empezados. Quedan registrados para decidirlos con el Ateneo.

### [C-07] `tarjeta-en-portada-utn` (idea)
- **Estado**: no empezado — idea registrada (IN-06); no se definió en la reunión del 11/11.
- **Idea**: la portada de la UTN FRM tiene cajas de colores (Cursos, Tecnicaturas, Licenciaturas, etc.), cada una con ícono, número, nombre y una etiqueta debajo, que enlazan a cada sección. El Ateneo tendría una caja que lleve a su página.
- **Pendiente de definir**: quién la agrega en Elementor, un color que no choque con los existentes, el ícono y el número.

### Ideas sobre los datos de YouTube
- **Completar disertantes y títulos desde las descripciones de los videos** (IN-07): `python -m yt_dlp --skip-download --dump-json <video>` (por video, solo metadatos de lectura) trae la descripción; un script podría proponer `titulo`/`disertante` y dejar al Ateneo solo lo que no se pueda obtener. El listado de miembros del Ateneo puede servir de diccionario de nombres, siempre leído desde fuera del repo y sin guardar nada que no sea ya público en YouTube (DD-17).
- **Tema desde las playlists** (IN-08): Agustina empezó a armar las playlists por tema el 16/11; el script podría listar cada playlist (`yt-dlp --flat-playlist`) y asignar el tema por pertenencia (playlist → id de tema; `temas.js` ya tiene `playlist_url`).
- **«Más vistas» automático con `destacada` opcional**: ya está definido en C-03 (ver arriba); no se duplica acá.
- **Capítulos / marcas de tiempo en las fichas** (IN-09): Agustina va a agregar capítulos a los videos largos; la videoteca podría mostrarlos para ir directo a cada tema del video.

### Contexto (fuera del alcance de la web)
- **Banner y flyer**: los hace Agustina. Banner permanente de ~1 × 1 m con bolsillo para el flyer A3 semanal; el flyer lleva dos QR (Canal de Difusión de WhatsApp y agendar en Calendar con el enlace de Zoom). La web solo comparte esos dos enlaces.

---

**Próximo change**: `C-03c` (refinamiento visual). Después: `C-04` (`videoteca`, con TDD).
