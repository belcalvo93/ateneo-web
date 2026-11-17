# Descripción General

## Stack tecnológico

| Capa | Tecnología | Notas |
|---|---|---|
| Marcado | HTML5 puro | Sin frameworks |
| Estilos | CSS puro con variables (`:root`) | Identidad visual del PRD (ver `08`) |
| Lógica | JavaScript puro (ES modules NO: debe pegarse en un widget) | Sin bundler ni build |
| Datos | Archivos `.js` editables por no programadores en `data/` (`temas.js`, `charlas.js`, `proxima-charla.js`; cada uno asigna una global `window.AAC_*`) | Separado del diseño; admiten comentarios y se pueden pegar en línea (DD-03) |
| Tests | `node:test` (Node nativo) | Buscador y filtro, más los scripts de datos (derivación, validación, cruce con YouTube); sin dependencias |
| Tipografías | Google Fonts: Dosis, Open Sans, Baskervville | Las mismas de frm.utn.edu.ar |
| Hosting | WordPress + Elementor Pro 4.2 de la FRM (widget HTML) | Confirmado el 11/11/2026; Google Sites descartado (DD-02). Falta el alta de Belén como editora |
| Costo | Cero | RNF |

## Arquitectura general

Sitio estático del lado del cliente. No hay backend.

```
Archivos de datos (.js)    ──►  JS puro (render + buscador/filtro)  ──►  DOM
        ▲                                                              ▲
 editados por el Ateneo                                   estilos.css (variables)
```

Desarrollo en local (este repo) → entrega pegando el código en el widget HTML de Elementor. Consecuencia: el código final debe funcionar **sin servidor propio** y tolerar vivir dentro de una página WordPress (ver `09` DD-02, DD-03 y riesgos en `10`).

## Páginas / estructura

- **Inicio**: encabezado con la presentación del Ateneo (rótulo, título, descripción desde 2015 — DD-13, horario «y/o por Zoom», botones «Ver la videoteca» y «Conocé al Ateneo»), próxima charla (con enlaces opcionales para agendar y entrar por Zoom), cifras (+100 conferencias, 310 videos), «Seguinos», últimas charlas, explorar por tema, más vistas e invitación a proponer una charla.
- **Videoteca**: buscador + chips de tema + grilla de fichas (una ficha por charla con sus partes).
- **Quiénes somos** (`quienes-somos.html`): historia en 4 hitos, 4 valores, cómo funcionamos, galería (oculta hasta tener fotos con consentimiento) y «Proponer una charla» con la Declaración de Principios desplegable.
- Menú (C-03b, DD-23): Inicio · Videoteca · Quiénes somos · Contacto; en el celular se pliega detrás del botón «Menú». Barra superior negra «UTN · Facultad Regional Mendoza». Cabecera, menú y pie son iguales en las tres páginas y salen de `js/marco.js`.
- Mockups aprobados: `docs/mockups/` (inicio-escritorio, videoteca-escritorio, inicio-celular, logo-aac).

## Integraciones externas

| Servicio | Propósito | Tipo |
|---|---|---|
| YouTube (canal @ateneoamigosdelasciencias) | Videos, miniaturas, playlists por tema | Enlaces / miniaturas por URL, sin API |
| Instagram, Canal de Difusión de WhatsApp | Redes (gestionadas por Agustina, becaria de medios y redes) | Enlaces en la lista configurable (WhatsApp con enlace oficial, DD-14; Instagram todavía placeholder) |
| Google Calendar, Zoom | Agendar la próxima charla y entrar a la transmisión | Enlaces opcionales en la próxima charla (DD-15) |
| Correo ateneoac.mo@gmail.com | Consultas, inscripción, propuestas | `mailto:` |
| Zoom | Modalidad virtual de la próxima charla | Enlace |
| Google Fonts | Tipografías | CSS remoto |
| Declaración de Principios (v2.4) | Requisito de «Proponer una charla» | Texto completo en un bloque desplegable de la página; ya no se usa el `bit.ly` (DD-16) |
| Logo UTN oficial (frm.utn.edu.ar/wp-content/uploads/2021/05/UTN_marca-negro-transparente2026.png) | Marca en cabecera/pie | Imagen remota |

## API REST

No aplica.
