# Actores y Roles

## Actores del sistema

| Actor | Descripción | Cómo interactúa |
|---|---|---|
| Visitante (estudiante/docente UTN, escuelas, público general) | Llega sobre todo desde el celular; incluye adultos mayores | Navega, busca y filtra charlas, abre YouTube, escribe por correo |
| Integrante del Ateneo (editor de contenido) | Mesa Organizadora y colaboradores, sin conocimientos de programación | Edita el archivo de datos (charlas, próxima charla) siguiendo la guía de uso |
| Becaria / desarrolladora | María Belén Calvo | Construye el sitio, carga datos, entrega guía e integración en Elementor |
| Administración web FRM | Quien administra WordPress/Elementor de la facultad | Pega el código en el widget HTML (o da acceso) — **quién es: pregunta abierta** |
| Otra becaria (redes) | Gestiona Instagram y Facebook | Aporta los enlaces de esas redes |

## Matriz de permisos (RBAC)

No hay autenticación ni roles en el sistema. La «autorización» es operativa:

| Rol | Contenido (datos) | Diseño/código | Publicación en WP |
|---|---|---|---|
| Visitante | Solo lectura | — | — |
| Editor del Ateneo | Editar archivo de datos | — | Depende de la admin FRM (ver IN-02) |
| Desarrolladora | Total | Total | Vía admin FRM |
| Admin FRM | — | — | Total |

## Rutas públicas

Todo es público. Páginas: Inicio, Videoteca (y anclas: próxima charla, quiénes somos, proponer una charla, contacto). Nota: al ser una sección embebida en la web de la FRM, las URLs finales las define la FRM.
