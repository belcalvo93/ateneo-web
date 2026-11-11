# Actores y Roles

## Actores del sistema

| Actor | Descripción | Cómo interactúa |
|---|---|---|
| Visitante (estudiante/docente UTN, escuelas, público general) | Llega sobre todo desde el celular; incluye adultos mayores | Navega, busca y filtra charlas, abre YouTube, escribe por correo |
| Integrante del Ateneo (editor de contenido) | Mesa Organizadora y colaboradores, sin conocimientos de programación | Edita el archivo de datos (charlas, próxima charla) siguiendo la guía de uso |
| Becaria / desarrolladora | María Belén Calvo | Construye el sitio, carga datos, entrega guía e integración en Elementor |
| Administración web FRM | Quien administra WordPress/Elementor de la facultad | Pega el código en el widget HTML (o da acceso) — **quién es: pregunta abierta** |
| Agustina — becaria de medios y redes | Reorganiza y edita los videos del canal de YouTube del Ateneo: títulos, orden, playlists por tema; puede volver a subir videos editados (**cambia el id del video en YouTube**); crea y gestiona las redes sociales del Ateneo (Instagram y también TikTok o Facebook, sin decidir). Es la misma persona que la «otra becaria» del PRD (confirmado el 11/11/2026) | Sus cambios en el canal obligan a regenerar los enlaces del catálogo (`scripts/derivar-datos.js`); aporta los usuarios de las redes |

## Matriz de permisos (RBAC)

No hay autenticación ni roles en el sistema. La «autorización» es operativa:

| Rol | Contenido (datos) | Diseño/código | Publicación en WP |
|---|---|---|---|
| Visitante | Solo lectura | — | — |
| Editor del Ateneo | Editar `correcciones.js`, `charlas-nuevas.js` y `proxima-charla.js` (`charlas.js` es generado) | — | Depende de la admin FRM (ver IN-02) |
| Agustina (becaria de medios) | Solo lectura; sus cambios en YouTube se reflejan regenerando `charlas.js` | — | — |
| Desarrolladora | Total | Total | Vía admin FRM |
| Admin FRM | — | — | Total |

## Rutas públicas

Todo es público. Páginas: Inicio, Videoteca (y anclas: próxima charla, quiénes somos, proponer una charla, contacto). Nota: al ser una sección embebida en la web de la FRM, las URLs finales las define la FRM.
