# PRD – Web del Ateneo Amigos de la Ciencia

Autora: María Belén Calvo (becaria, Tecnicatura Universitaria en Programación, UTN FRM)
Versión: 1.1 · 06/11/2026 · Propuesta aprobada por la Mesa Organizadora del AAC el 05/11/2026

## Resumen

Crear desde cero la página web del Ateneo Amigos de la Ciencia (AAC): un sitio simple que presente al grupo, ordene sus charlas de YouTube por tema en una videoteca con buscador, difunda la próxima charla y enlace sus redes. Plazo de la beca: hasta el 18/12/2026, con posible extensión a febrero.

## Contexto y problema

El Ateneo no tiene página web: todo su contenido vive en un canal de YouTube difícil de recorrer.

- Nació en 2017 por iniciativa de ingenieros en Electrónica de la UTN Mendoza. Funciona en el Departamento de Ingeniería Electrónica, con apoyo de la Dirección de Graduadas y Graduados.
- Organiza una charla abierta todos los viernes a las 18 hs, presencial (Salón de Actos UTN FRM, Rodríguez 273) y por Zoom. Superó las 100 conferencias y fue declarado De Interés para la FRM.
- Está abierto a todo público y tiene una convocatoria para proponer charlas (resumen, CV abreviado y aceptación de su Declaración de Principios).
- Consultas e inscripciones por correo: ateneoac.mo@gmail.com
- Su información está dispersa en noticias sueltas de la web de la UTN y en YouTube.
- Otra becaria se encarga de crear y gestionar Instagram y Facebook.
- La página será una sección dentro de la web de la UTN FRM.

## Inventario del canal de YouTube

Canal: https://www.youtube.com/@ateneoamigosdelasciencias-2269 — 310 videos, 995 suscriptores, ~186 charlas (la mayoría partida en 2 a 4 videos: parte 1, parte 2, debate).

| Tema propuesto | Charlas | Videos |
| --- | --- | --- |
| Geología, minería y energía | 35 | 70 |
| Inteligencia artificial y tecnología | 30 | 46 |
| Agua, ambiente y sostenibilidad | 27 | 41 |
| Neurociencia, salud y psicología | 26 | 47 |
| Historia, cultura y humanidades | 19 | 25 |
| Espacio y astronomía | 17 | 29 |
| Física y matemática | 17 | 27 |
| Ingeniería, sismos e infraestructura | 15 | 25 |

La clasificación es una propuesta hecha a partir de los títulos; la valida el Ateneo. Borrador de datos: `data/charlas-borrador.json`.

Observaciones: no hay playlists por tema; una charla aparece en varios videos sueltos (la videoteca debe mostrarla como una sola ficha con sus partes); los títulos no tienen formato común (se propone *Tema – Disertante (año)*). Las más vistas: Entrelazamiento cuántico (12 mil), Depósitos de litio (2 mil), Evolución geológica de Mendoza (1,2 mil).

## Objetivos

La versión 1 tiene que lograr que cualquier persona encuentre una charla del Ateneo en menos de 3 clics.

Criterio de éxito al 18/12: la página está publicada, tiene cargadas y ordenadas por tema todas las charlas del canal, y alguien del Ateneo carga un evento solo siguiendo la guía de uso.

1. Presentar al Ateneo: quiénes son, qué hacen y cómo contactarlos.
2. Ordenar las charlas de YouTube por tema en una videoteca visual con buscador.
3. Difundir la próxima charla.
4. Centralizar los enlaces a YouTube, Instagram y Facebook.
5. Que el Ateneo pueda actualizar la página después de la beca sin saber programar.

Fuera del alcance de la versión 1: gestionar redes o producir contenido; editar o resubir videos; inscripciones online, login o pagos.

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

Los mockups aprobados (Inicio escritorio, Videoteca, Inicio celular) están en `docs/mockups/`.

## Requerimientos funcionales

| ID | Requerimiento | Prioridad |
| --- | --- | --- |
| RF-01 | Presentación del Ateneo: quiénes son y qué hacen | Alta |
| RF-02 | Videoteca: charlas por tema, una ficha por charla con miniatura, título, disertante, año y enlaces a sus partes en YouTube | Alta |
| RF-03 | Buscar charlas por título o disertante (sin distinguir mayúsculas ni tildes) y filtrarlas por tema | Alta |
| RF-04 | Próxima charla con fecha, hora, lugar y modalidad (presencial y Zoom) | Alta |
| RF-05 | Enlaces visibles a YouTube, Instagram y Facebook | Alta |
| RF-06 | Contacto e inscripción por correo (ateneoac.mo@gmail.com) | Alta |
| RF-07 | Enlazar las playlists de YouTube de cada tema | Media |
| RF-08 | Portada con últimas charlas y más vistas | Media |
| RF-09 | Sección «Proponer una charla» con requisitos y enlace a la Declaración de Principios | Media |

## Requerimientos no funcionales

- **Responsive**: celular, tablet y computadora.
- **Accesible**: letra base 18 px, contraste AA, textos alternativos, navegación con teclado, botones de 44 px o más.
- **Mantenible**: los datos (charlas, próxima charla) están separados del diseño, en un archivo de datos fácil de editar.
- **Portable**: HTML, CSS y JavaScript puro, sin frameworks ni build, para poder pegarse en un bloque HTML de Elementor o en un bloque de código de Google Sites.
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

Logo UTN oficial: https://frm.utn.edu.ar/wp-content/uploads/2021/05/UTN_marca-negro-transparente2026.png

## Plataforma

La web de la facultad está hecha en WordPress + Elementor (Pro 4.2). Elementor tiene un widget «HTML» que acepta HTML, CSS y JavaScript propio, por lo que el desarrollo se hace en local (este repo) y se integra pegando el código en ese widget. Alternativa si se decide Google Sites: bloque «Insertar → Código». A confirmar en la reunión del 10/11.

Supuestos: la sección se crea con cuentas de la facultad; el Ateneo aporta textos, logo e información de eventos.
Dependencias: acceso de edición (o alguien que pegue el código) en la web de la FRM; acceso al canal de YouTube para playlists; enlaces de Instagram y Facebook de la otra becaria.

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

- ¿Quién administra la web de la FRM y cómo se integra la sección (acceso a Elementor o envío del código)?
- ¿Podemos usar el logo actual? ¿Hay versión en alta calidad y fotos de las charlas?
- ¿Se validan los 8 temas propuestos?
- ¿Acceso de edición al canal de YouTube para armar playlists?
- ¿Quién del Ateneo carga los eventos y charlas nuevas después de la beca?
- ¿Desde qué año se cuenta la historia (2015 o 2017)?
- ¿Sigue vigente el enlace a la Declaración de Principios (bit.ly/3ai4qQx)?
- ¿Quiénes integran la Mesa Organizadora y quieren aparecer en la página?
