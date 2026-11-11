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
**Errores**: sin cliente de correo → el correo también está visible como texto.

## Flujo 3: Proponer una charla
1. Visitante lee requisitos (resumen, CV abreviado, Declaración de Principios, correo y teléfono).
2. Abre la Declaración de Principios (bit.ly/3ai4qQx).
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
3. 18/12: se pega el código en el widget HTML de Elementor (o se envía a la admin FRM) + guía de uso.
