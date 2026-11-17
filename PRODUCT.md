# Product

<!-- impeccable:product-schema 1 -->

> Resumen para herramientas de diseño. Generado el 17/11/2026 a partir de `docs/PRD.md` v1.2, `knowledge-base/` y `design-system/`, sin datos nuevos. Ante cualquier diferencia, mandan la knowledge base y el PRD.

## Platform

web

## Users

- **Público actual del Ateneo**: en su mayoría adultos mayores (integrantes y asistentes habituales). Necesitan letra grande, alto contraste, pocos clics, botones claros y nada escondido.
- **Jóvenes que el Ateneo quiere sumar**: estudiantes de la UTN y de escuelas. Navegan desde el celular, llegan desde WhatsApp o Instagram y esperan algo actual y rápido.
- **Docentes, escuelas y público general** interesados en ciencia.
- **Integrantes del Ateneo que mantienen el sitio**: varias personas sin conocimientos de programación cargan la próxima charla siguiendo una guía de uso (KB 09, DD-20).

## Product Purpose

Página web del Ateneo Amigos de la Ciencia (AAC), integrada en la web de la UTN Facultad Regional Mendoza. Presenta al grupo con su identidad e historia, ordena sus charlas de YouTube por tema en una videoteca con buscador, difunde la próxima charla y enlaza sus redes.

Objetivo central: que cualquier persona encuentre una charla en menos de 3 clics. Criterio de éxito al 18/12/2026: página publicada en la web de la UTN FRM, todas las charlas del canal cargadas y ordenadas por tema, y miembros del Ateneo cargando un evento solos con la guía de uso.

## Positioning

Entidad autónoma sin fines de lucro dedicada a la divulgación de las Ciencias Exactas, Físicas y Naturales y cultura general. Nació en agosto de 2015 como un grupo de amigos (ingenieros y médicos vinculados a la UTN Mendoza) y se sostiene en una charla abierta y gratuita cada viernes a las 18 hs. Trato horizontal, sin solemnidades; rigor científico; sin proselitismo ni publicidad. Más de 100 conferencias; declarado De Interés para la FRM.

## Operating Context

- Una charla cada viernes a las 18 hs (con el receso del calendario académico), en el Salón de Actos de la UTN FRM (Rodríguez 273, Ciudad de Mendoza) y/o por Zoom. Desde la pandemia la mayoría son solo por Zoom; el texto «y/o por Zoom» es provisorio (KB 10).
- Inscripción, consultas y propuestas de charla por correo: ateneoac.mo@gmail.com.
- Difusión semanal por un Canal de Difusión de WhatsApp y por YouTube; Instagram está pendiente. Banner y flyer impresos los hace otra becaria y quedan fuera de la web.
- Las charlas grabadas viven en el canal de YouTube (310 videos ≈ 186 charlas, muchas en varias partes).

## Capabilities and Constraints

- Tres páginas: Inicio, Videoteca y Quiénes somos. Menú: Inicio · Videoteca · Quiénes somos · Contacto.
- HTML, CSS y JavaScript puro, sin frameworks ni paso de build; se entrega pegado en un widget HTML de Elementor (WordPress de la UTN FRM). Todo estilo vive bajo el contenedor `.aac-web` para no afectar la página anfitriona.
- Los datos viven en `data/*.js`, separados del diseño, editables por personas que no programan.
- Un dato sin completar (entre corchetes) nunca se muestra al público.
- Costo cero. Sin login, pagos ni formularios con base de datos.
- Pendientes de decisión: textos de los ganchos por tema, dos categorías nuevas de la videoteca, enlace de Instagram, si las charlas vuelven a ser presenciales (KB 10).

## Brand Commitments

- Nombre: Ateneo Amigos de la Ciencia (AAC). Bajada institucional fija: «Entidad autónoma sin fines de lucro dedicada a la divulgación de las Ciencias Exactas, Físicas y Naturales y cultura general».
- Logo: «AAC» con la llama, en `design-system/assets/logo.png` (confirmado por los archivos del Ateneo; falta validarlo con el nexo).
- Colores y fuentes del design system aprobado (`design-system/tokens.css`): colores de la UTN FRM y del logo del Ateneo (azul `#004B95`, rojo `#B90000`, llama `#F5D547`); tipografías Source Serif 4 (títulos), Dosis (menú y rótulos, como la web de la UTN) y Open Sans (texto, como la web de la UTN), desde la revisión 2. Máximo tres familias en el sitio.
- Tono: institucional, cálido, sin solemnidades. No se inventan datos (fechas, disertantes, títulos, URLs).

## Evidence on Hand

- Catálogo de 186 charlas con enlaces y visualizaciones reales (`data/charlas.js`); títulos y disertantes limpios solo en parte (el resto se corrige en `data/correcciones.js`).
- Declaración de Principios v2.4, transcripta en Quiénes somos.
- Una foto grupal de integrantes del Ateneo, autorizada por el Ateneo para la web (KB 10).
- Mockups aprobados en `docs/mockups/`.
- No hay testimonios, cifras de asistencia ni otras fotos autorizadas: no se fabrican.

## Product Principles

- La próxima charla es lo primero que se encuentra.
- Nada escondido: texto en todos los botones y enlaces, sin gestos ni contenido que se mueva solo.
- Datos separados del diseño, para que el Ateneo lo mantenga solo.
- Nunca mostrar un dato incompleto ni inventado.
- Convivir con la web de la UTN sin romperla.

## Accessibility & Inclusion

Letra base de 18 px, contraste AA, navegación completa con teclado y foco visible, objetivos táctiles de 44 px o más, textos alternativos descriptivos y movimiento reducido respetado. Pensado primero para el celular.
