# Ateneo Amigos de la Ciencia — Web

Sección del Ateneo Amigos de la Ciencia (AAC) dentro de la web de la UTN Facultad Regional Mendoza. Es un sitio estático en HTML, CSS y JavaScript puro, pensado para pegarse en un widget HTML de Elementor (WordPress). No usa frameworks, librerías ni paso de build.

## Estructura

```
index.html          Inicio
videoteca.html      Videoteca
css/estilos.css     Hoja de estilos del sitio (tokens + componentes, todo bajo .aac-web)
js/                 Lógica del sitio: aplicar-correcciones.js (vista combinada de los datos) y, desde C-04, buscador y filtros
data/               Temas, charlas, correcciones a mano y próxima charla en archivos .js, editables sin programar (guía: data/LEEME.md)
scripts/            Herramientas de desarrollo: regenerar el catálogo desde el canal de YouTube y validar los datos (no son parte del sitio)
tests/              Tests con node:test (solo donde hay lógica)
design-system/      Sistema de diseño aprobado (tokens, componentes, logo)
knowledge-base/     Base de conocimiento del proyecto
docs/               PRD y mockups
openspec/           Changes y specs (flujo OpenSpec)
CHANGES.md          Roadmap de changes
```

## Abrir en local

La forma más simple: doble clic sobre `index.html` o `videoteca.html`.

Si preferís un servidor local, cualquier servidor estático sirve, por ejemplo:

```
python -m http.server 8000
```

y abrí `http://localhost:8000/`. No hace falta instalar nada en el proyecto. Las tipografías se cargan desde Google Fonts, así que sin conexión se ve con las fuentes de respaldo.

## Tests

Requiere Node 22 o superior. No hace falta `npm install`: no hay dependencias.

```
npm test
```

(equivale a `node --test`). Corre los tests de `tests/` (lógica de la portada, validador y scripts de datos).

## Páginas

- `index.html` (Inicio): qué es el Ateneo, la próxima charla, redes, últimas charlas, temas, más vistas e invitación a proponer una charla.
- `videoteca.html` (Videoteca): en construcción (C-04).
- `quienes-somos.html` (Quiénes somos): historia, valores, cómo funcionamos, galería y «Proponer una charla» con la Declaración de Principios.

El contenido fijo está escrito en el HTML; lo que sale de los datos lo arma el navegador:

- `js/portada-logica.js`: las reglas (qué se muestra, en qué orden y qué se oculta, duración, menú). Son funciones puras, probadas en `tests/portada-logica.test.js`.
- `js/marco.js`: cabecera con el menú (plegado detrás de «Menú» en el celular) y pie con el logo de la UTN, iguales en las tres páginas. Cada página dice cuál es con `data-aac-pagina` y trae escrito un respaldo mínimo por si no carga JavaScript.
- `js/ficha.js`: la tarjeta de charla, la misma en todo el sitio.
- `img/`: la foto grupal autorizada (sin metadatos) y una copia sin cambios del logo oficial de la UTN.

El diseño está documentado en [DESIGN.md](DESIGN.md) y en el [design system](design-system/README.md) (revisión 2). `tests/tokens.test.js` comprueba que `css/estilos.css` tenga las mismas variables que `design-system/tokens.css`.
- `js/portada.js` y `js/quienes-somos.js`: dibujan cada página.

Regla de oro: un dato sin completar (entre corchetes, como `[Título]`) nunca se muestra al público. Una charla sin título limpio usa el título original del video; un disertante, una red o un botón sin dato simplemente no aparecen.

## Datos

Las charlas, los temas, la próxima charla y los datos generales del sitio (`data/sitio.js`: contacto, dirección y mapa, redes y fotos) viven en `data/` como archivos `.js` (guía para editores: [data/LEEME.md](data/LEEME.md)). `data/charlas.js` es un catálogo **generado** (no se edita a mano: lo regenera `node scripts/derivar-datos.js` cuando cambia el canal de YouTube); lo que una persona corrige va en `data/correcciones.js` (por id de charla) y las charlas nuevas en `data/charlas-nuevas.js`, que ningún script pisa. El navegador junta todo con `js/aplicar-correcciones.js`, así que editar esos dos archivos no requiere correr nada. Para comprobar que están bien escritos y ver qué falta completar:

```
node scripts/validar-datos.js
```

Con `--estricto` también falla si queda cualquier pendiente (placeholders, `revisar` o enlaces sin cargar); es la comprobación previa a publicar. Los scripts de `scripts/` son solo herramientas de desarrollo; cómo usarlos está en [scripts/LEEME.md](scripts/LEEME.md).

## Reglas clave

- Todos los estilos van bajo el prefijo `.aac-web`, para no afectar la página anfitriona.
- Colores, fuentes y espaciados salen de las variables de `design-system/tokens.css` (copiadas en `css/estilos.css`); no se escriben valores sueltos.
- Sin frameworks, librerías ni build. El único tooling es `node:test`; `yt-dlp` se admite solo como CLI puntual de desarrollo en `scripts/`.
- Los datos viven en `data/`, nunca mezclados con el diseño.
- Letra base de 18 px, contraste AA, navegación con teclado, foco visible y objetivos de al menos 44 px.

## Más información

- [Sistema de diseño](design-system/README.md)
- [Base de conocimiento](knowledge-base/)
- [Roadmap de changes](CHANGES.md)
