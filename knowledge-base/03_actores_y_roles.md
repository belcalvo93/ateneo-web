# Actores y Roles

## Actores del sistema

| Actor | Descripción | Cómo interactúa |
|---|---|---|
| Visitante (estudiante/docente UTN, escuelas, público general) | Llega sobre todo desde el celular; incluye adultos mayores | Navega, busca y filtra charlas, abre YouTube, escribe por correo |
| Integrante del Ateneo (editor de contenido) | Mesa Organizadora y colaboradores, sin conocimientos de programación. El 11/11 pidieron que **varios integrantes** (no una sola persona) puedan cargar la próxima charla | Edita el archivo de datos (charlas, próxima charla) siguiendo la guía de uso |
| Mesa Organizadora (MO) | 7 miembros elegidos por consenso, mandato de 3 años. Aprobó el proyecto el 05/11/2026 y validó los mockups el 11/11/2026 | Valida contenidos y decisiones |
| Nexo de la Mesa Organizadora | 1 o 2 integrantes designados el 11/11/2026 | **Canal único de validación** con Belén y Agustina, para evitar mensajes cruzados |
| Quien graba las charlas | Integrante del Ateneo que graba por Zoom, edita silencios y sube el video a YouTube | Cada video nuevo requiere actualizar el catálogo; **el aviso semanal está por definir** |
| Becaria / desarrolladora | María Belén Calvo | Construye el sitio, carga datos, entrega guía e integración en Elementor |
| Administración web FRM | Quien administra WordPress/Elementor de la facultad | Da de alta a Belén como editora (o pega el código en el widget HTML) — **falta el contacto: pregunta abierta** |
| Agustina — becaria de medios y redes | Reorganiza y edita los videos del canal de YouTube del Ateneo: títulos, capítulos, orden, playlists por tema (empezó a armarlas el 16/11/2026); edita desde YouTube Studio, así que los ids y enlaces de los videos se mantienen (confirmado el 16/11/2026, DD-21); solo si vuelve a subir un video cambia su id, y en ese caso avisa; crea Instagram y administra el Canal de Difusión de WhatsApp (ya creado). Define las categorías de la videoteca: confirmó las 8 actuales y sumará 2 | Sus cambios en el canal obligan a regenerar los enlaces del catálogo (`scripts/derivar-datos.js`); aporta los nombres de las 2 categorías nuevas, el usuario de Instagram y el enlace del canal de WhatsApp |
| SAE – Becas (UTN FRM) | Coordinación administrativa de la beca | No interactúa con el sistema |

## Matriz de permisos (RBAC)

No hay autenticación ni roles en el sistema. La «autorización» es operativa:

| Rol | Contenido (datos) | Diseño/código | Publicación en WP |
|---|---|---|---|
| Visitante | Solo lectura | — | — |
| Editor del Ateneo | Editar `correcciones.js`, `charlas-nuevas.js` y `proxima-charla.js` (`charlas.js` es generado) | — | Depende de la admin FRM (ver IN-02) |
| Agustina (becaria de medios) | Solo lectura; sus cambios en YouTube se reflejan regenerando `charlas.js` | — | — |
| Desarrolladora | Total | Total | Vía admin FRM |
| Admin FRM | — | — | Total |

## Privacidad de datos personales

El repositorio es **público**. El listado interno de miembros del Ateneo (archivo de Excel entregado por los ingenieros) **nunca se copia ni se commitea**, y ningún correo o teléfono personal entra al repo. Si se usa para cruzar disertantes (IN-07), el script lo lee desde su carpeta original fuera del repo y solo se guardan nombres que ya figuran públicamente en los títulos o descripciones de YouTube (DD-17). El único correo publicado es el institucional de contacto.

## Rutas públicas

Todo es público. Páginas: Inicio, Videoteca (y anclas: próxima charla, quiénes somos, proponer una charla, contacto). Nota: al ser una sección embebida en la web de la FRM, las URLs finales las define la FRM.
