# Visión y Objetivos

Fuente: `docs/PRD.md` v1.2 (16/11/2026; aprobado por la Mesa Organizadora del AAC el 05/11/2026 y actualizado con la reunión del 11/11/2026 y las novedades de Agustina del 16/11/2026) y documentos entregados por el Ateneo.

## Propósito del sistema

Crear desde cero la página web del Ateneo Amigos de la Ciencia (AAC): un sitio simple que presente al grupo con su identidad e historia, ordene sus charlas de YouTube por tema en una videoteca con buscador, difunda la próxima charla (con agendamiento y Zoom) y enlace sus redes.

Contexto: hoy todo el contenido del Ateneo vive en un canal de YouTube (310 videos, 995 suscriptores, ~186 charlas) difícil de recorrer. La página irá integrada dentro de la web de la UTN FRM (WordPress + Elementor; confirmado el 11/11, ver DD-02).

## Historia e identidad del Ateneo

Fuente: documentos fundacionales y Declaración de Principios v2.4 entregados por el Ateneo (viven fuera del repo; resumidos en `docs/PRD.md` v1.2). Resuelve IN-01.

- **Agosto de 2015**: nace como un grupo informal de amigos (ingenieros y médicos vinculados a la UTN FRM) que se reunían los miércoles por el placer de aprender e intercambiar libros sobre Teoría de la Relatividad, Mecánica Cuántica y Astronomía.
- **6 de enero de 2016**: se constituye formalmente en Mendoza con 6 fundadores (tras nombres provisorios en sus primeros borradores de 2015).
- **2016–2017**: crece hasta casi 50 integrantes, obtiene el respaldo formal de la UTN FRM (aula los viernes, luego el Salón de Actos, y difusión por FM UTN) y adopta el nombre definitivo, Ateneo Amigos de la Ciencia.
- **Hitos recientes**: superó las 100 conferencias (la n.º 100 fue en abril de 2023), sumó la transmisión por Zoom (alcance internacional) y fue declarado De Interés para la FRM por el Consejo Directivo.
- **Bajada institucional**: «Entidad autónoma sin fines de lucro dedicada a la divulgación de las Ciencias Exactas, Físicas y Naturales y cultura general».
- **Misión**: formar y mantener unido a un grupo de personas que compartan el deseo y el placer de aprender, estudiar, intercambiar y divulgar conocimientos científicos con el más alto nivel posible.
- **Visión**: ser reconocidos por la FRM-UTN y la comunidad por el aporte y la calidad de sus estudios, haciendo accesible la ciencia a toda la sociedad y generando sinergia con otras instituciones afines.
- **Valores**: rigor científico; clima amistoso y horizontal (trato por nombre de pila o sobrenombre, sin solemnidades ni jerarquías); acceso libre (sin fines de lucro: no cobra entrada ni paga honorarios).
- **Organización**: Mesa Organizadora (MO) de 7 miembros elegidos por consenso, con mandato de 3 años.
- **Funcionamiento**: una charla abierta todos los viernes a las 18 hs (con el receso del calendario académico de la UTN FRM), presencial en el Salón de Actos de la UTN FRM (Rodríguez 273, Ciudad de Mendoza) y por Zoom en simultáneo. Funciona en el Departamento de Ingeniería Electrónica, con apoyo de la Dirección de Graduadas y Graduados.

## Objetivo central

Que cualquier persona encuentre una charla del Ateneo en **menos de 3 clics**.

## Objetivos por actor

| Actor | Objetivo principal | Objetivos secundarios |
|---|---|---|
| Estudiantes y docentes UTN | Encontrar charlas por tema | Ver próximos encuentros |
| Escuelas y público general | Saber quiénes son y encontrar videos fácilmente | Saber cómo invitarlos / inscribirse |
| Integrantes del Ateneo | Mostrar su trabajo | Actualizar eventos y charlas sin depender de nadie ni saber programar |

Público pensado primero para quien llega **desde el celular**; incluye adultos mayores.

## Alcance v1

1. Presentar al Ateneo: quiénes son, historia desde 2015, valores y fotos históricas, qué hacen, cómo contactarlos (RF-01, RF-06).
2. Videoteca visual por tema con buscador y filtro (RF-02, RF-03).
3. Difundir la próxima charla, con enlaces opcionales para agendarla en Google Calendar y entrar por Zoom (RF-04).
4. Centralizar enlaces a YouTube, Instagram y el Canal de Difusión de WhatsApp, como lista configurable (RF-05).
5. Portada con últimas charlas y más vistas (RF-08); sección «Proponer una charla» con la Declaración de Principios desplegable (RF-09); playlists por tema (RF-07).
6. Que varios integrantes del Ateneo puedan actualizar la página después de la beca (guía de uso clara incluida en la entrega).

## Fuera de alcance

- Gestionar redes sociales o producir contenido (lo hace Agustina, becaria de medios y redes).
- Editar o resubir videos.
- Banner impreso y flyer semanal: son responsabilidad de Agustina (solo contexto). Banner permanente de ~1 × 1 m con bolsillo para el flyer A3 de cada semana; el flyer lleva dos QR: uno al Canal de Difusión de WhatsApp (en verde) y otro para agendar la charla en Google Calendar con el enlace de Zoom. La web usa los mismos dos enlaces (redes y próxima charla), pero no produce esas piezas.
- Inscripciones online, login o pagos (la inscripción es por correo).
- Frameworks, build, servidor propio o backend.

## Métricas / criterio de éxito (al 18/12/2026)

- Página publicada en la web de la UTN FRM.
- Todas las charlas del canal cargadas y ordenadas por tema.
- Miembros del Ateneo (más de una persona) cargan un evento solos, siguiendo la guía de uso.
- Encontrar una charla en < 3 clics.

Plazo de la beca: del 04/11/2026 al 18/12/2026, con posible extensión a febrero; se trabaja por objetivos. Autora: María Belén Calvo (becaria, TUP UTN FRM).

Contexto (no es un plan): en la reunión del 11/11 se mencionó que la beca podría renovarse si el trabajo resulta bien. No cambia el alcance ni las fechas de la versión 1.
