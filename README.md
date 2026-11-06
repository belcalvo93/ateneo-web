# Ateneo Amigos de la Ciencia — Web

Sección del Ateneo Amigos de la Ciencia (AAC) dentro de la web de la UTN Facultad Regional Mendoza. Es un sitio estático en HTML, CSS y JavaScript puro, pensado para pegarse en un widget HTML de Elementor (WordPress). No usa frameworks, librerías ni paso de build.

## Estructura

```
index.html          Inicio
videoteca.html      Videoteca
css/estilos.css     Hoja de estilos del sitio (tokens + componentes, todo bajo .aac-web)
js/                 Lógica del sitio (buscador y filtros, desde C-04)
data/               Charlas y próxima charla en JSON, editables sin programar
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

(equivale a `node --test`). Mientras no haya archivos de prueba informa 0 tests y termina con código 0.

## Reglas clave

- Todos los estilos van bajo el prefijo `.aac-web`, para no afectar la página anfitriona.
- Colores, fuentes y espaciados salen de las variables de `design-system/tokens.css` (copiadas en `css/estilos.css`); no se escriben valores sueltos.
- Sin frameworks, librerías ni build. El único tooling es `node:test`.
- Los datos viven en `data/`, nunca mezclados con el diseño.
- Letra base de 18 px, contraste AA, navegación con teclado, foco visible y objetivos de al menos 44 px.

## Más información

- [Sistema de diseño](design-system/README.md)
- [Base de conocimiento](knowledge-base/)
- [Roadmap de changes](CHANGES.md)
