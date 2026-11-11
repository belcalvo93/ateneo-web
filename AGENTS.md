# Ateneo Amigos de la Ciencia — Web — Instrucciones para Agentes

> Este archivo (y su copia `CLAUDE.md`) es lo PRIMERO que todo agente lee al entrar al repo.
> Generado a partir de `knowledge-base/` y `CHANGES.md`. No editar a mano sin re-sincronizar ambos archivos.

---

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|------------|---------|
| Marcado | HTML5 puro | — |
| Estilos | CSS puro con variables (`:root`) | — |
| Lógica | JavaScript puro (sin ES modules en el código a pegar en el widget) | — |
| Datos | Archivos JS de datos en `data/*.js`, editables por no programadores salvo `charlas.js`, que es **generado** por `scripts/derivar-datos.js` (`window.AAC_TEMAS`, `AAC_CHARLAS`, `AAC_CHARLAS_NUEVAS`, `AAC_CORRECCIONES` y `AAC_PROXIMA_CHARLA`; las correcciones a mano van en `correcciones.js`/`charlas-nuevas.js`, que se combinan en el navegador con `js/aplicar-correcciones.js`; concatenables en un solo `<script>`) | — |
| Tests | `node:test` (buscador, filtro y scripts de datos de `scripts/lib/`; sin dependencias) | Node nativo |
| Tipografías | Google Fonts: Dosis, Open Sans, Baskervville | — |
| Entrega | Widget HTML de Elementor (WordPress FRM); alternativa Google Sites | a confirmar 10/11 |

Detalle completo: [knowledge-base/02_descripcion_general.md](knowledge-base/02_descripcion_general.md)

Sistema de diseño aprobado (modo `system-only`, rev. 1): [design-system/README.md](design-system/README.md). Los mockups de `docs/mockups/` son el contrato visual.

---

## Base de Conocimiento

La fuente de verdad del dominio vive en `knowledge-base/`. **Leé el archivo relevante ANTES de implementar.**

| Archivo | Cuándo leerlo |
|---------|---------------|
| [01_vision_y_objetivos.md](knowledge-base/01_vision_y_objetivos.md) | Entender propósito y alcance |
| [03_actores_y_roles.md](knowledge-base/03_actores_y_roles.md) | Quién usa y quién edita el contenido |
| [04_modelo_de_datos.md](knowledge-base/04_modelo_de_datos.md) | Temas, charlas, videos, próxima charla |
| [05_reglas_de_negocio.md](knowledge-base/05_reglas_de_negocio.md) | Reglas codificadas (RN-XX) |
| [06_funcionalidades.md](knowledge-base/06_funcionalidades.md) | Historias de usuario por épica |
| [07_flujos_principales.md](knowledge-base/07_flujos_principales.md) | Flujos de usuario y de mantenimiento |
| [08_arquitectura_propuesta.md](knowledge-base/08_arquitectura_propuesta.md) | Estructura, tokens, accesibilidad, tests |
| [09_decisiones_y_supuestos.md](knowledge-base/09_decisiones_y_supuestos.md) | DD-XX / SU-XX |
| [10_preguntas_abiertas.md](knowledge-base/10_preguntas_abiertas.md) | ⚠️ Inconsistencias a resolver ANTES de codear |

> ⚠️ Resolver las preguntas de prioridad **Alta** de `10_preguntas_abiertas.md` (plataforma de integración, hosting de archivos, validación de los 8 temas, carga de títulos/disertantes/URLs) antes de depender de ellas. Hoy solo C-01 y C-02 son seguros.

---

## Skills Disponibles

| Agente | Rol | Skills que carga |
|--------|-----|------------------|
| **Frontend** | HTML/CSS/JS puro, estilos y UI | `frontend-design`, `emil-design-eng`, `design-taste-frontend-v1` (solo reglas agnósticas de framework) |
| **Revisión UI/a11y** | Auditoría de accesibilidad y UX | `web-design-guidelines` |
| **Diseño** | Identidad visual / design system | `design-system` |
| **Orquestación** | SDD / OPSX / docs | `kb-creator`, `roadmap-generator`, `agent-instruction`, `active-orchestrator`, `skill-creator` |
| **Investigación** | Discovery y skills | `discovery-research`, `web-scraper`, `find-skill` |

Cargá la skill correspondiente al contexto ANTES de escribir código.

> Los compact rules de cada skill los resuelve el orquestador desde `.atl/skill-registry.md` (generado por `skill-registry`; no versionado — no está en el repo). Esta tabla solo mapea skill→rol.

---

## Roadmap de Changes

El plan completo está en [CHANGES.md](CHANGES.md). Resumen:

- **Total**: 6 changes en 3 fases (Fundación, Páginas, Calidad y contenido).
- **Camino crítico** (5): `C-01 → C-02 → C-04 → C-05 → C-06` (C-03 es la otra rama tras C-02).
- **Primer change**: `C-01` (`base-y-estilos`), luego `C-02` (`datos-charlas`).
- ⚠️ **Roadmap provisorio**: C-03 a C-06 quedan **sujetos a validación** tras la reunión con el Ateneo del 10/11/2026 (temas, secciones, plataforma Elementor o Google Sites). Empezar solo por C-01 y C-02.

**Antes de cualquier `/opsx:propose`**: leé [CHANGES.md](CHANGES.md), identificá las dependencias del change y los archivos de "Leer antes".

---

## Reglas Duras (específicas del proyecto)

> Reglas globales ya definidas en `~/.claude/CLAUDE.md` (orquestador, governance, TDD, engram): el proyecto las hereda. Acá viven solo las reglas **específicas de este proyecto** + las universales que el global no cubra (commit/build).

**Portabilidad y stack**
- NUNCA usar frameworks, librerías ni paso de build → HTML/CSS/JS puro; el único tooling permitido es `node:test`, sin dependencias. Excepción acotada: `yt-dlp` se permite solo como CLI puntual de desarrollo bajo `scripts/` (se invoca como `python -m yt_dlp`; documentado en `scripts/LEEME.md`), nunca como parte del sitio ni en `package.json`.
- NUNCA mezclar datos con diseño → charlas y próxima charla viven solo en `data/`.
- NUNCA estilos globales que afecten la página anfitriona (Elementor) → todo bajo el prefijo `.aac-web`.

**Diseño y accesibilidad**
- NUNCA hardcodear colores, fuentes ni espaciados → usar las variables de `design-system/tokens.css` / `css/estilos.css`.
- NUNCA entregar UI sin letra base 18 px, contraste AA, navegación con teclado, foco visible y objetivos ≥ 44 px.
- NUNCA insertar texto de datos o del buscador con `innerHTML` → usar `textContent`; enlaces externos con `rel="noopener noreferrer"`.

**Contenido y roadmap**
- NUNCA inventar datos (fechas, disertantes, títulos, URLs, usuarios de redes) → dejar placeholders `[…]` o preguntar.
- NUNCA hacer `/opsx:propose` de C-03 a C-06 antes de la validación posterior a la reunión del 10/11 → empezar por C-01 y C-02.
- Tests `node:test` solo donde hay lógica (buscador: sin distinguir mayúsculas/tildes; filtro por tema), con TDD.

**Git (universales que el global no cubre)**
- NUNCA commitear ni buildear sin que el usuario lo pida → proponer y esperar.
- Commits en formato Conventional Commits, SIN co-autoría de IA.
- Commits y mensajes en español → el tipo del Conventional Commit va en inglés (`feat:`, `fix:`, `docs:`), la descripción en español.

---

## Flujo de Trabajo

```
1. Leer la KB relevante (knowledge-base/)        → entender el dominio
2. Identificar el change en CHANGES.md           → respetar dependencias y validaciones
3. /opsx:propose C-NN-nombre                     → proposal + design + specs + tasks
4. Implementar las tasks (cargando skills)       → respetando las reglas duras
5. /opsx:archive C-NN-nombre + marcar [x]        → cerrar el change
```

Aplicar TODAS las reglas duras en cada paso. Ante conflicto entre la KB y este archivo, las reglas duras prevalecen.
