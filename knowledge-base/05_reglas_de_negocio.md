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
- **RN-PC-01**: Muestra fecha, hora, lugar y modalidad presencial + Zoom (RF-04).
- **RN-PC-02**: Las charlas son los viernes a las 18 hs, Salón de Actos UTN FRM (Rodríguez 273), presencial y por Zoom.
- **RN-PC-03**: La inscripción y consultas son por correo a ateneoac.mo@gmail.com; no hay inscripción online (fuera de alcance).

## Dominio: Portada (RN-PO)
- **RN-PO-01**: Muestra últimas charlas y más vistas (RF-08). Criterio de «últimas» y «más vistas»: derivar de datos (año/orden y `vistas`) o curar a mano — a definir (ver `10`).
- **RN-PO-02**: Cada tema se lista con su cantidad de charlas (Mockup).

## Dominio: Proponer una charla (RN-PR)
- **RN-PR-01**: Abierta a todo público (docentes, investigadores, estudiantes avanzados, graduados, personas especializadas); no hace falta ser profesional universitario.
- **RN-PR-02**: Requisitos: resumen del tema, CV abreviado, aceptación de la Declaración de Principios del Ateneo, correo y teléfono (RF-09).

## Dominio: Contenido y mantenimiento (RN-CO)
- **RN-CO-01**: Datos (charlas, próxima charla) separados del diseño en archivo fácil de editar sin programar.
- **RN-CO-02**: Al 18/12 debe existir guía de uso con la que alguien del Ateneo cargue un evento solo.

## Dominio: Accesibilidad y marca (RN-AC)
- **RN-AC-01**: Letra base 18 px, contraste AA, textos alternativos, navegación por teclado, botones ≥ 44 px.
- **RN-AC-02**: Responsive: celular, tablet, computadora; diseño pensado primero para celular.
- **RN-AC-03**: Tipografías y pie de página coherentes con la web de la UTN FRM, con logo y colores del Ateneo.

## Excepciones globales
- **RN-GL-01**: HTML/CSS/JS puro, sin frameworks ni build, portable a widget HTML de Elementor (o Google Sites). Costo cero.
- **RN-GL-02**: Los textos marcados `[…]` en los mockups (fecha, título de próxima charla, usuarios de Instagram/Facebook) son placeholders: no inventar valores.
