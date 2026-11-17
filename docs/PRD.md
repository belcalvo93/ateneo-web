# PRD – Web del Ateneo Amigos de la Ciencia

Autora: María Belén Calvo (becaria, Tecnicatura Universitaria en Programación, UTN FRM)
Versión: 1.2 · 16/11/2026 · Propuesta aprobada por la Mesa Organizadora del AAC el 05/11/2026; actualizada con los acuerdos de la reunión del 11/11/2026 y las novedades de Agustina del 16/11/2026

## Cambios de la versión 1.2

- La segunda reunión con el Ateneo fue el **11/11/2026** (no el 10/11). Se validaron los mockups y la integración en la web de la UTN FRM.
- **Plataforma definitiva**: WordPress + Elementor de la UTN FRM. Se descarta Google Sites.
- **Historia**: el Ateneo nace en **agosto de 2015** (no en 2017); 2016–2017 es la etapa de consolidación y del nombre definitivo.
- **Redes**: YouTube, Instagram y Canal de Difusión de WhatsApp (Facebook queda fuera del conjunto confirmado).
- **Próxima charla**: suma enlaces opcionales para agendar en Google Calendar y para entrar por Zoom.
- **Temas**: se mantienen los 8 y Agustina sumará 2 más (nombres pendientes). Ya empezó a armar las playlists por tema.
- **«Quiénes somos»** con historia, valores y fotos históricas; **«Proponer una charla»** con la Declaración de Principios desplegable en la propia página (reemplaza el `bit.ly`).
- **Logo**: se toma como oficial el «AAC» con la llama, porque es el que el Ateneo entregó en sus archivos (confirmado por archivos; falta validarlo con el nexo de la Mesa Organizadora).
- Fuera del alcance de la web (contexto): el banner permanente y el flyer semanal con QR son responsabilidad de Agustina.

## Resumen

Crear desde cero la página web del Ateneo Amigos de la Ciencia (AAC): un sitio simple que presente al grupo con su identidad e historia, ordene sus charlas de YouTube por tema en una videoteca con buscador, difunda la próxima charla (con agendamiento y Zoom) y enlace sus redes. Plazo de la beca: hasta el 18/12/2026, con posible extensión a febrero.

## Contexto y problema

El Ateneo no tiene página web activa: todo su contenido vive en un canal de YouTube difícil de recorrer.

- Nació en **agosto de 2015** como un grupo informal de amigos (ingenieros y médicos vinculados a la UTN FRM) que se reunían los miércoles por el placer de aprender e intercambiar libros sobre Teoría de la Relatividad, Mecánica Cuántica y Astronomía. Se constituyó formalmente el 6 de enero de 2016 con 6 fundadores, y entre 2016 y 2017 creció (llegó a casi 50 integrantes), obtuvo el respaldo de la UTN FRM y adoptó su nombre definitivo: Ateneo Amigos de la Ciencia.
- Bajada institucional: «Entidad autónoma sin fines de lucro dedicada a la divulgación de las Ciencias Exactas, Físicas y Naturales y cultura general».
- Valores (Declaración de Principios v2.4): rigor científico, clima amistoso y horizontal (trato por nombre de pila, sin jerarquías), acceso libre y gratuito. No cobra entrada ni paga honorarios.
- Funciona en el Departamento de Ingeniería Electrónica, con apoyo de la Dirección de Graduadas y Graduados. Lo guía una Mesa Organizadora de 7 miembros elegidos por consenso.
- Organiza una charla abierta todos los viernes a las 18 hs (con el receso del calendario académico), presencial (Salón de Actos UTN FRM, Rodríguez 273, Ciudad de Mendoza) y por Zoom. Superó las 100 conferencias (la n.º 100 fue en abril de 2023) y fue declarado De Interés para la FRM por el Consejo Directivo.
- Está abierto a todo público y tiene una convocatoria para proponer charlas (propuesta temática, resumen, CV abreviado y aceptación de su Declaración de Principios). Los temas deben tener base científica o tecnológica comprobada; no se admiten charlas con fines comerciales ni sobre política partidaria o religión.
- Consultas, inscripciones y propuestas por correo: ateneoac.mo@gmail.com
- Su información estaba dispersa en noticias sueltas de la web de la UTN, documentos internos y YouTube.
- Agustina, becaria de medios y redes, reorganiza el canal de YouTube (títulos, capítulos, playlists por tema), crea Instagram y administra el Canal de Difusión de WhatsApp.
- La página irá integrada dentro de la web de la UTN FRM (confirmado el 11/11).

## Inventario del canal de YouTube

Canal: https://www.youtube.com/@ateneoamigosdelasciencias — 310 videos, 995 suscriptores, ~186 charlas (la mayoría partida en 2 a 4 videos: parte 1, parte 2, debate).

| Tema | Charlas | Videos |
| --- | --- | --- |
| Geología, minería y energía | 35 | 70 |
| Inteligencia artificial y tecnología | 30 | 46 |
| Agua, ambiente y sostenibilidad | 27 | 41 |
| Neurociencia, salud y psicología | 26 | 47 |
| Historia, cultura y humanidades | 19 | 25 |
| Espacio y astronomía | 17 | 29 |
| Física y matemática | 17 | 27 |
| Ingeniería, sismos e infraestructura | 15 | 25 |

La clasificación se hizo a partir de los títulos. El 16/11 Agustina confirmó que **estas 8 categorías se mantienen** y que **sumará 2 más** (nombres pendientes: no se agregan hasta que los informe). Borrador de datos: `data/charlas-borrador.json`.

Observaciones: Agustina empezó a armar las playlists por tema en el canal (16/11); una charla aparece en varios videos sueltos (la videoteca debe mostrarla como una sola ficha con sus partes); los títulos no tienen formato común (se propone *Tema – Disertante (año)*). Las más vistas: Entrelazamiento cuántico (12 mil), Depósitos de litio (2 mil), Evolución geológica de Mendoza (1,2 mil).

## Objetivos

La versión 1 tiene que lograr que cualquier persona encuentre una charla del Ateneo en menos de 3 clics.

Criterio de éxito al 18/12: la página está publicada en la web de la UTN FRM, tiene cargadas y ordenadas por tema todas las charlas del canal, y miembros del Ateneo (más de una persona) cargan un evento solos siguiendo la guía de uso.

1. Presentar al Ateneo: quiénes son, su historia y valores, qué hacen y cómo contactarlos.
2. Ordenar las charlas de YouTube por tema en una videoteca visual con buscador.
3. Difundir la próxima charla, con enlaces para agendarla en Google Calendar y entrar por Zoom.
4. Centralizar los enlaces a YouTube, Instagram y el Canal de Difusión de WhatsApp.
5. Que varios integrantes del Ateneo puedan actualizar la página después de la beca sin saber programar.

Fuera del alcance de la versión 1: gestionar redes o producir contenido; editar o resubir videos; inscripciones online, login o pagos; el banner impreso y el flyer semanal (los hace Agustina: banner permanente de ~1 × 1 m con bolsillo para el flyer A3 de cada semana, y flyer con dos QR, uno al Canal de Difusión de WhatsApp y otro para agendar en Calendar con el enlace de Zoom).

## Público

Pensado primero para quien llega desde el celular. Incluye público adulto mayor.

| Quién | Qué busca |
| --- | --- |
| Estudiantes y docentes de la UTN | Charlas por tema, próximos encuentros |
| Escuelas y público general | Quiénes son, videos fáciles de encontrar, cómo invitarlos |
| Integrantes del Ateneo | Mostrar su trabajo y actualizar eventos sin depender de nadie |

## Estructura del sitio

- **Inicio**: presentación, próxima charla, últimas charlas, temas, más vistas, quiénes somos, proponer una charla, contacto.
- **Videoteca**: buscador + filtro por tema; cada charla es una ficha con sus partes (enlaces a YouTube).
- Secciones dentro de Inicio: Quiénes somos, Proponer una charla, Contacto y redes.

Los mockups aprobados (Inicio escritorio, Videoteca, Inicio celular) están en `docs/mockups/`; el Ateneo los validó en la reunión del 11/11.

## Requerimientos funcionales

| ID | Requerimiento | Prioridad |
| --- | --- | --- |
| RF-01 | Presentación del Ateneo: quiénes son, historia (desde agosto de 2015), bajada institucional, valores de la Declaración de Principios y galería de fotos históricas | Alta |
| RF-02 | Videoteca: charlas por tema, una ficha por charla con miniatura, título, disertante, año y enlaces a sus partes en YouTube | Alta |
| RF-03 | Buscar charlas por título o disertante (sin distinguir mayúsculas ni tildes) y filtrarlas por tema (8 temas confirmados + 2 a definir por Agustina) | Alta |
| RF-04 | Próxima charla con fecha, hora, lugar y modalidad (presencial y Zoom), con enlaces opcionales para agendar en Google Calendar y entrar por Zoom | Alta |
| RF-05 | Enlaces visibles a las redes, como lista configurable en los datos: YouTube, Instagram y Canal de Difusión de WhatsApp | Alta |
| RF-06 | Contacto e inscripción por correo (ateneoac.mo@gmail.com) | Alta |
| RF-07 | Enlazar las playlists de YouTube de cada tema (en construcción por Agustina) | Media |
| RF-08 | Portada con últimas charlas y más vistas (automático por vistas, con opción de fijar destacadas a mano) | Media |
| RF-09 | Sección «Proponer una charla» con los criterios de admisión y el texto completo de la Declaración de Principios (v2.4) en un bloque desplegable de la propia página (reemplaza el enlace `bit.ly`) | Media |

## Requerimientos no funcionales

- **Responsive**: celular, tablet y computadora.
- **Accesible**: letra base 18 px, contraste AA, textos alternativos, navegación con teclado, botones de 44 px o más.
- **Mantenible**: los datos (charlas, próxima charla) están separados del diseño, en un archivo de datos fácil de editar.
- **Portable**: HTML, CSS y JavaScript puro, sin frameworks ni build, para poder pegarse en un widget «HTML» de Elementor.
- **Coherente con la UTN**: tipografías y pie de página de la web de la facultad, con logo y colores del Ateneo.
- **Costo cero**.

## Identidad visual

```css
:root {
  /* UTN FRM */
  --utn-negro: #000000;
  --utn-blanco: #FFFFFF;
  --utn-gris-azulado: #8A9BA6;
  --utn-azul-grisaceo: #7391B6;
  --utn-verde-graduados: #D0DFA8;
  /* Ateneo (logo) */
  --aac-azul: #004B95;
  --aac-rojo: #B90000;
  --aac-llama: #F5D547;
  /* Tipografías (Google Fonts, las mismas que usa frm.utn.edu.ar) */
  --fuente-titulos: 'Dosis', sans-serif;      /* títulos y menú, mayúsculas */
  --fuente-texto: 'Open Sans', sans-serif;    /* texto */
  --fuente-serif: 'Baskervville', serif;      /* títulos del pie */
}
```

Logo del Ateneo: «AAC» con la llama, en azul, rojo y amarillo. Se toma como oficial porque es el que el Ateneo entregó en sus archivos (logo patrón y video institucional de 2022); en la reunión del 11/11 no se trató, así que queda **confirmado por archivos, a validar con el nexo**.

Logo UTN oficial: https://frm.utn.edu.ar/wp-content/uploads/2021/05/UTN_marca-negro-transparente2026.png

## Plataforma

La web de la facultad está hecha en WordPress + Elementor (Pro 4.2). Elementor tiene un widget «HTML» que acepta HTML, CSS y JavaScript propio, por lo que el desarrollo se hace en local (este repo) y se integra pegando el código en ese widget. **Confirmado en la reunión del 11/11**: la página va integrada en la web oficial de la UTN FRM; se descarta Google Sites (solo existía un sitio abandonado de 2022).

Supuestos: la sección se crea con cuentas de la facultad; el Ateneo aporta textos, logo e información de eventos (ya entregó la Declaración de Principios, el logo y fotos históricas).
Dependencias: alta de Belén como editora en la web de la FRM (pendiente de gestionar con el administrador web); nombres de las 2 categorías nuevas y usuario de Instagram (los pasa Agustina). El enlace del Canal de Difusión de WhatsApp ya se tiene: https://whatsapp.com/channel/0029VbDjwCbI7BeKsvprkr3t

Privacidad: el repositorio es público. El listado interno de miembros del Ateneo no se copia al repositorio ni se publica; no se guardan correos ni teléfonos personales.

## Planificación

| Semana | Objetivo |
| --- | --- |
| 04/11 – 10/11 | Relevamiento, accesos, base del repo y estilos |
| 11/11 – 17/11 | Datos de charlas y portada |
| 18/11 – 01/12 | Videoteca con buscador y filtros (con tests) |
| 02/12 – 08/12 | Responsive, accesibilidad, carga completa de charlas |
| 09/12 – 15/12 | Revisión con el Ateneo y ajustes |
| 18/12 | Entrega: integración en Elementor + guía de uso |

## Preguntas abiertas

Resueltas (reunión del 11/11 y novedades del 16/11):

- Plataforma: integrada en la web de la UTN FRM (WordPress + Elementor); Google Sites descartado.
- Fotos: hay 4 fotos históricas para «Quiénes somos».
- Temas: los 8 se mantienen; se suman 2 (nombres pendientes).
- Playlists: las arma Agustina en el canal.
- Historia: se cuenta desde agosto de 2015.
- Declaración de Principios: vigente la v2.4; se lee en la propia página y se deja de usar `bit.ly/3ai4qQx`.
- Mantenimiento: varios integrantes del Ateneo cargarán la próxima charla con una guía de uso simple.

Siguen abiertas:

- Validar con el nexo que el logo «AAC» con la llama es el oficial (hoy confirmado solo por los archivos entregados).
- ¿Quién es el administrador web de la FRM y cómo se da de alta a Belén como editora?
- ¿Cuáles son las 2 categorías nuevas de la videoteca?
- Usuario de Instagram.
- ¿Quiénes integran la Mesa Organizadora y quieren aparecer en la página? ¿Se nombra a los fundadores?
- ¿Cómo avisa quien graba las charlas cuando sube una nueva al canal?
