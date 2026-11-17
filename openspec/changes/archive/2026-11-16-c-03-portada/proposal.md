# Proposal

## Why

`index.html` hoy es un esqueleto con «[Contenido pendiente: C-03]»: el Ateneo todavía no tiene una portada que lo presente, difunda la próxima charla y lleve a la videoteca. La reunión del 11/11/2026 validó los mockups y sumó contenido que los mockups no tenían (agendar en Calendar, entrar por Zoom, Canal de Difusión de WhatsApp, historia desde 2015, Declaración de Principios en la propia página), así que ya se puede construir la portada completa sobre los datos de C-02.

## What Changes

- **Portada completa** en `index.html`, según el mockup «Inicio» (escritorio y celular) y el design system rev. 1: hero con cifras, próxima charla, últimas charlas, temas con conteo, más vistas, quiénes somos, proponer una charla y pie.
- **Próxima charla** renderizada desde `data/proxima-charla.js`, con «Inscribirme por correo» y dos botones opcionales: «Agendar en Calendar» y «Entrar por Zoom». Cada uno aparece solo si su enlace está cargado; la tarjeta funciona igual sin ninguno de los dos.
- **Campo nuevo `calendar_url`** en la próxima charla (opcional, `null` por defecto), junto al `zoom_url` existente.
- **Configuración del sitio en datos** (archivo nuevo en `data/`): correo de contacto, cifra de conferencias, **lista configurable de redes** y lista de fotos de la galería. Valores iniciales: YouTube y Canal de Difusión de WhatsApp con sus enlaces reales; Instagram con placeholder (no se muestra).
- **Últimas charlas y más vistas** calculadas desde la vista combinada del catálogo; «más vistas» es automático, con las charlas marcadas `destacada: true` primero.
- **Temas con conteo** armados desde `data/temas.js`, sin fijar la cantidad (hoy 8; admite los 2 que sume Agustina sin tocar código).
- **Quiénes somos** con la historia desde agosto de 2015, la bajada institucional y los valores (PRD v1.2). La **galería queda preparada pero vacía**: no se copian fotos al repo hasta tener el consentimiento; cuando se carguen en la configuración, aparece sola.
- **Proponer una charla** con requisitos, criterios de admisión y el texto completo de la Declaración de Principios v2.4 en un bloque desplegable (`<details>`); ya no se enlaza a `bit.ly`.
- **Regla de oro**: ningún placeholder entre corchetes llega al público (título → título original del video; disertante, red o dato de la próxima charla sin completar → se oculta).
- **Mensaje de error** con enlace al canal de YouTube si los datos no cargan.
- **Validador** ampliado para la configuración del sitio y `calendar_url`.
- El pie deja de tener redes escritas a mano en el HTML (se quita «Facebook · [página a confirmar]»).

Fuera de este change: menú hamburguesa y ajuste fino responsive/contraste (C-05), `videoteca.html` y su buscador (C-04), versión pegable en Elementor (C-06), fotos reales de la galería (pendiente de consentimiento), nombres de personas en «Quiénes somos» (pendiente del nexo).

## Capabilities

### New Capabilities
- `portada`: qué muestra la página de Inicio y cómo se comporta con datos completos, incompletos o ausentes (secciones, próxima charla, últimas, más vistas, temas, quiénes somos, proponer una charla, redes, regla de no mostrar placeholders, error de carga).
- `configuracion-sitio`: archivo de datos editable con el contacto, las cifras de portada, la lista de redes y la lista de fotos de la galería.

### Modified Capabilities
- `proxima-charla`: el archivo suma el campo opcional `calendar_url` (pasa de nueve a diez campos) y su estado inicial lo deja en `null`.
- `validacion-datos`: el validador también comprueba la configuración del sitio y el formato de `calendar_url`.

## Impact

- **Código**: `index.html` (contenido completo), `css/estilos.css` (estilos de las secciones, bajo `.aac-web`, solo con tokens), `js/` (lógica pura de portada + render), `data/` (archivo nuevo de configuración; `proxima-charla.js` suma un campo; `temas.js` solo actualiza su comentario «provisorio»), `scripts/validar-datos.js` y `scripts/lib/validar.js`, `tests/` (tests nuevos con TDD para la lógica de portada y la validación), `data/LEEME.md` y `README.md`.
- **`videoteca.html`**: solo cambia el pie, para que sus redes salgan de la misma configuración (sin tocar su contenido, que es de C-04).
- **Contrato con C-04**: las tarjetas de tema enlazan a `videoteca.html?tema=<id>`; C-04 deberá leer ese parámetro.
- **Insumo externo**: el texto de la Declaración de Principios v2.4 se transcribe desde el documento del Ateneo, que vive fuera del repo. El listado de miembros no se usa en este change.
- **Dependencias**: ninguna nueva. Sin frameworks ni build.
