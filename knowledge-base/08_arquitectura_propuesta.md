# Arquitectura Propuesta

## Patrones aplicados

| Patrón | Dónde | Por qué |
|---|---|---|
| Separación datos/presentación | `data/` vs HTML/CSS/JS | Edición por no programadores (RN-CO-01) |
| Funciones puras de búsqueda/filtro | módulo de lógica | Testeable con `node:test` sin DOM |
| Render declarativo desde datos | JS vanilla | Sin framework ni build |
| Variables CSS (design tokens) | `estilos.css` `:root` | Identidad visual única y mantenible |
| Progressive enhancement | HTML con contenido base | Tolerancia a fallos de JS/datos |

**Restricción clave**: el código final debe poder pegarse en un widget HTML de Elementor. Implica considerar que (a) los archivos externos (CSS/JS, incluidos los de datos) pueden no ser hospedables junto al widget: puede requerir inlinear los datos o subirlos a la Mediateca de WP; (b) los estilos de Elementor/tema pueden interferir → **aislar con un contenedor/prefijo** (ver `10`).

## Estructura de directorios propuesta

```
ateneo-web/
├── index.html            # Inicio
├── videoteca.html        # Videoteca
├── css/estilos.css       # Variables de identidad + estilos
├── js/
│   ├── aplicar-correcciones.js  # vista combinada: generado + nuevas + correcciones (script común y require)
│   ├── buscador.js       # Lógica pura: normalizar, buscar, filtrar (testeada)
│   └── app.js            # Render y eventos
├── data/
│   ├── temas.js          # window.AAC_TEMAS
│   ├── charlas.js        # window.AAC_CHARLAS — GENERADO, no se edita a mano
│   ├── charlas-nuevas.js # window.AAC_CHARLAS_NUEVAS (a mano)
│   ├── correcciones.js   # window.AAC_CORRECCIONES por id de charla (a mano)
│   ├── proxima-charla.js # window.AAC_PROXIMA_CHARLA
│   ├── charlas-borrador.json  # origen, no se edita
│   └── LEEME.md          # guía para editores (borrador)
├── scripts/              # herramientas de desarrollo (no son parte del sitio)
│   ├── derivar-datos.js, validar-datos.js, cruzar-youtube.js
│   ├── lib/              # módulos puros testeados
│   ├── salida/           # canal.jsonl, reporte-cruce.md (fuera de git)
│   └── LEEME.md
├── tests/                # node:test: buscador y filtro + scripts de datos
├── docs/                 # PRD y mockups
├── knowledge-base/
├── openspec/
└── README.md
```

## Identidad visual (del PRD)

```css
:root {
  --utn-negro:#000; --utn-blanco:#FFF; --utn-gris-azulado:#8A9BA6;
  --utn-azul-grisaceo:#7391B6; --utn-verde-graduados:#D0DFA8;
  --aac-azul:#004B95; --aac-rojo:#B90000; --aac-llama:#F5D547;
  --fuente-titulos:'Dosis',sans-serif;   /* títulos y menú, mayúsculas */
  --fuente-texto:'Open Sans',sans-serif;
  --fuente-serif:'Baskervville',serif;   /* títulos del pie */
}
```

Del mockup: hero azul AAC con etiqueta amarilla, botones rojos para la acción principal (Inscribirme), azules para secundarias, tarjetas blancas con borde superior azul/rojo, pie negro, barra superior negra.

## Accesibilidad (obligatoria)
Base 18 px, contraste AA (revisar texto sobre `--aac-llama` y gris sobre blanco), foco visible, `alt` en imágenes, navegación con teclado en menú/chips/fichas, objetivos táctiles ≥ 44 px, menú hamburguesa accesible en celular.

## Seguridad
- Autenticación/autorización: no aplica.
- Entrada del usuario: solo el buscador → nunca insertar con `innerHTML` sin escapar (usar `textContent`).
- Enlaces externos con `rel="noopener noreferrer"`.
- Secretos: ninguno; no hay claves ni API.

## Variables de entorno
No aplica.

## Testing
`node:test` únicamente para la lógica de búsqueda (normalización de tildes/mayúsculas, búsqueda por título/disertante) y filtro por tema, incluyendo combinación. Resto: verificación manual/visual contra mockups y chequeo de accesibilidad. TDD estricto en esa lógica.
