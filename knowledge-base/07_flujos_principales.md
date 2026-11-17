# Flujos Principales

## Flujo 1: Encontrar una charla (objetivo < 3 clics)
**Disparador**: visitante llega a la página (probablemente desde el celular).
**Actor**: Visitante.
1. Portada carga los archivos de datos (`data/*.js`) y renderiza hero, próxima charla, últimas, temas, más vistas.
2. Visitante toca «Ver la videoteca» o un tema (clic 1).
3. Videoteca muestra todas las fichas (o filtradas si vino de un tema).
4. Visitante escribe en el buscador o elige un chip de tema (clic 2).
5. JS filtra normalizando mayúsculas/tildes y actualiza «Mostrando N charlas».
6. Visitante toca «Parte 1 · duración» → abre YouTube (clic 3).
**Errores**: sin resultados → mensaje claro «No encontramos charlas…» y opción de limpiar filtros. Falla la carga de los datos → mensaje y enlace al canal de YouTube.

## Flujo 2: Inscribirse a la próxima charla
**Disparador**: visitante ve la tarjeta «Próxima charla».
1. Lee cuándo/dónde/modalidad.
2. Toca «Inscribirme por correo» → abre cliente de correo con `mailto:ateneoac.mo@gmail.com` (asunto sugerido).
3. Si están cargados, toca «Agendar en Google Calendar» para guardar la charla en su calendario o «Entrar por Zoom» para seguirla en línea (DD-15); los dos abren en una pestaña nueva.
**Errores**: sin cliente de correo → el correo también está visible como texto. Sin enlace de Calendar o de Zoom → ese botón no se muestra.

## Flujo 3: Proponer una charla
1. Visitante lee requisitos (propuesta temática, resumen, CV abreviado, aceptación de la Declaración de Principios, correo y teléfono) y los criterios de admisión (RN-PR-03).
2. Despliega el texto completo de la Declaración de Principios en la propia página (bloque `<details>`; ya no se usa el `bit.ly`, DD-16).
3. Toca «Enviar mi propuesta» → `mailto:` al Ateneo.

## Flujo 4: Cargar una charla/evento nuevo (Ateneo)
**Actor**: Integrante del Ateneo.
1. Abre el archivo de datos.
2. Para evento: edita los campos de `proxima charla`. Para charla publicada: agrega una entrada con tema, título, disertante, año y URL(s) de cada parte.
3. Guarda/pega el archivo actualizado donde corresponda (según plataforma final: ver `10`).
4. Recarga la página y verifica.
**Errores**: Archivo de datos mal escrito → la página debe mostrar un aviso legible; la guía documenta cómo validar.

## Flujo 5: Entrega e integración (desarrolladora → FRM)
1. Desarrollo en local en este repo.
2. Revisión con el Ateneo (09/12–15/12).
3. 18/12: se pega el código en el widget HTML de Elementor de la web de la UTN FRM (con el alta de Belén como editora, o se envía a la admin FRM) + guía de uso probada con miembros del Ateneo.
