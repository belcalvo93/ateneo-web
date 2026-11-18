# Reglas de Negocio

Códigos `RN-{DOMINIO}-{NN}`. Todas derivadas de `docs/PRD.md`; las marcadas **(Mockup)** se infieren de los mockups aprobados.

## Dominio: Videoteca (RN-VI)
- **RN-VI-01**: Una charla es **una sola ficha** aunque esté partida en 2–4 videos (partes, debate). — PRD «Observaciones».
- **RN-VI-02**: Cada ficha muestra miniatura, título, disertante, año y enlaces a cada parte en YouTube (RF-02).
- **RN-VI-03**: Título con formato común propuesto *Tema – Disertante (año)* (los del canal no tienen formato).
- **RN-VI-04**: Cada charla pertenece a exactamente un tema de los 8 propuestos (validación del Ateneo pendiente).
- **RN-VI-05 (Mockup)**: Si la charla tiene un solo video el botón dice «Charla · duración»; si tiene varios, «Parte N · duración».
- **RN-VI-06 (Mockup)**: La videoteca informa «Mostrando N charlas» con el resultado del filtro/búsqueda.

## Dominio: Búsqueda y filtro (RN-BU)
- **RN-BU-01**: La búsqueda es por título **o** disertante (RF-03).
- **RN-BU-02**: La búsqueda no distingue mayúsculas ni tildes (RF-03).
- **RN-BU-03**: El filtro por tema se combina con la búsqueda; «Todos los temas» es el estado por defecto (Mockup).

## Dominio: Próxima charla (RN-PC)
- **RN-PC-01**: Muestra fecha, hora y modalidad (por Zoom); el lugar, solo si la charla es presencial (RF-04). El botón «Entrar por Zoom» usa el `zoom_url` de la charla o, si no tiene, el `zoom_url_semestre` de `data/sitio.js`, y se muestra también mientras la charla no está anunciada.
- **RN-PC-02**: Las charlas son los viernes a las 18 hs por Zoom; presencial solo en casos excepcionales, en el Salón de Actos UTN FRM (Rodríguez 273). Confirmado por la Mesa Organizadora el 17/11/2026. La dirección del pie es la sede del Ateneo.
- **RN-PC-03**: La inscripción y consultas son por correo a ateneoac.mo@gmail.com; no hay inscripción online (fuera de alcance).
- **RN-PC-04**: Los enlaces para agendar en Google Calendar y para entrar por Zoom son opcionales: cada botón se muestra solo si su enlace está cargado (DD-15).

## Dominio: Portada (RN-PO)
- **RN-PO-01**: Muestra últimas charlas y más vistas (RF-08). Criterio: «más vistas» es automático por `vistas`, con la opción de fijar charlas a mano con `destacada: true` (destacadas primero); «últimas» se ordena por año y, dentro del año (C-02b): primero las agregadas a mano sin fecha, luego las que tienen fecha real de la más nueva a la más vieja y al final las demás en el orden del catálogo; la tarjeta muestra la fecha exacta («9 de octubre de 2026») o, si no la hay, el año.
- **RN-PO-02**: Cada tema se lista con su cantidad de charlas (Mockup).

## Dominio: Proponer una charla (RN-PR)
- **RN-PR-01**: Abierta a todo público (docentes, investigadores, estudiantes avanzados, graduados, personas especializadas); no hace falta ser profesional universitario.
- **RN-PR-02**: Requisitos: propuesta temática, resumen del tema, CV abreviado, aceptación de la Declaración de Principios del Ateneo, correo y teléfono (RF-09).
- **RN-PR-03**: Criterios de admisión (Declaración de Principios v2.4, DD-16): todo tema debe tener bases científicas sólidas o desarrollos tecnológicos comprobados; no se admiten charlas sobre política partidaria, religión, cuestiones étnicas, violencia o discriminación, ni con fines comerciales o publicitarios.
- **RN-PR-04**: El texto completo de la Declaración de Principios se lee en la propia página, en un bloque desplegable; no se enlaza a `bit.ly`.

## Dominio: Contenido y mantenimiento (RN-CO)
- **RN-CO-01**: Datos (charlas, próxima charla) separados del diseño en archivo fácil de editar sin programar.
- **RN-CO-03** (C-02b): La fecha exacta y el disertante de las charlas salen del archivo 2020–2026 del sitio viejo solo cuando la coincidencia es segura; las dudosas las confirma una persona en `data/correcciones.js`. Los disertantes se escriben sin títulos (Dr., Dra., Ing., Lic. y similares), tanto los del archivo como los derivados del canal; solo si el Ateneo lo indica para una eminencia, el título se carga a mano en `data/correcciones.js` (DD-25).
- **RN-CO-04** (C-02b): La sección de la Mesa Organizadora se muestra con `mesa_organizadora.mostrar: true` en `data/sitio.js` (hoy activada, 6 integrantes confirmados el 17/11/2026), con nombre y apellido en orden alfabético, sin fotos, cargos ni datos de contacto.
- **RN-CO-05** (C-02b): La sección «En la radio» de Quiénes somos aparece solo si `entrevistas_radio` tiene al menos una entrevista con título y enlace `https`.
- **RN-CO-02**: Al 18/12 debe existir guía de uso con la que alguien del Ateneo cargue un evento solo.

## Dominio: Accesibilidad y marca (RN-AC)
- **RN-AC-01**: Letra base 18 px, contraste AA, textos alternativos, navegación por teclado, botones ≥ 44 px.
- **RN-AC-02**: Responsive: celular, tablet, computadora; diseño pensado primero para celular.
- **RN-AC-03**: Tipografías y pie de página coherentes con la web de la UTN FRM, con logo y colores del Ateneo.

## Excepciones globales
- **RN-GL-01**: HTML/CSS/JS puro, sin frameworks ni build, portable a widget HTML de Elementor. Costo cero.
- **RN-GL-02**: Los textos marcados `[…]` en los mockups (fecha, título de próxima charla, enlace de Instagram) son placeholders: no inventar valores. Tampoco se inventan los nombres de las 2 categorías nuevas de la videoteca (DD-05).
- **RN-GL-03**: Privacidad (DD-17): el repo es público; el listado interno de miembros del Ateneo nunca se copia ni se commitea, y no se guarda ningún correo ni teléfono personal. Solo se guardan nombres de disertantes que ya figuran públicamente en YouTube.
