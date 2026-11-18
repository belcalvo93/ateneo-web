# Design

## Context

La tarjeta de la próxima charla (`js/portada.js`, `dibujarProxima`) ya muestra «La próxima charla se anunciará pronto» mientras falta el título o la fecha, y el botón «Entrar por Zoom» con el link del semestre (C-02b). Las fechas son `DD/MM/AAAA` y la hora `HH:MM` en 24 h.

## Decisions

### D1. Change aparte, no dentro de C-02b
C-02b ya está implementado y esperando la revisión de la autora (y la carga de las dudosas del cruce). El contador es una función nueva, con su propia lógica y tests, que solo **agrega** requisitos: aparte se revisa, se prueba y se cierra sin demorar C-02b. Depende de C-02b (Zoom del semestre), así que se archiva después.

### D2. Función pura `estadoProxima(ahoraMs, proxima, duracionMin)`
Devuelve `{ tipo, texto, inicioMs }`, con `tipo`:
- `sin-fecha`: `fecha` u `hora` inválidas o placeholder.
- `faltan`: otro día. «Faltan N días y N horas» (singular y plural; sin «0 días»: «Faltan 22 horas»; sin «y 0 horas»: «Faltan 3 días»).
- `hoy`: mismo día en Argentina y falta más de una hora. «Hoy a las 18 hs (hora de Argentina)».
- `pronto`: falta una hora o menos. «Empieza en N minutos» (minutos redondeados hacia arriba: nunca «0 minutos»).
- `en-vivo`: desde el inicio hasta `inicio + duración` (sin incluir el final). «En vivo ahora».
- `terminada`: después. «La charla de hoy terminó» si es el mismo día en Argentina; si no, «La última charla ya terminó».

Recibe «ahora» como milisegundos: los tests no dependen del reloj ni de la zona horaria de la máquina.

### D3. Hora de Argentina sin depender del navegador
Argentina es UTC−3 sin horario de verano: inicio = `Date.UTC(año, mes−1, día, hora + 3, minuto)`. El «mismo día» se compara con la fecha de `ahora − 3 h` en UTC. No se usa `Intl` con zona horaria (no hace falta y evita diferencias entre navegadores).

### D4. Duración configurable
`duracion_charla_min` en `data/sitio.js` (entero de 15 a 300; 90 por defecto si falta o es inválido). El validador informa un valor fuera de rango.

### D5. En la tarjeta
- Una línea `.contador` debajo del título (texto, sin `aria-live`). Se recalcula cada minuto, alineado al cambio de minuto; si cambia el tipo de estado, se redibuja la tarjeta.
- `en-vivo`: rótulo «En vivo ahora» con un punto rojo fijo (no parpadea) y «Entrar por Zoom» pasa a ser el primer botón, rojo; «Inscribirme por correo» pasa a botón de contorno. Una región `role="status"` oculta, vacía al cargar, recibe una vez «La charla está en vivo ahora» solo cuando el estado cambia a en vivo con la página abierta.
- `terminada`: la tarjeta vuelve a «La próxima charla se anunciará pronto», con la línea «La charla de hoy terminó.» arriba.
- «Cuándo»: «viernes 13 de noviembre, 18 hs (hora de Argentina)»; sin fecha, «Todos los viernes a las 18 hs (hora de Argentina)».
- Sin JavaScript: la tarjeta escrita en el HTML muestra el día y la hora fijos («Todos los viernes a las 18 hs (hora de Argentina)»).

## Risks / Trade-offs

- **Reloj del visitante desfasado** → el contador puede correrse unos minutos; es aceptable (no es crítico) y el botón de Zoom siempre está.
- **Cambio de horario en Argentina** (hoy no existe) → se cambiaría una constante.
- **Pestaña en segundo plano** → los navegadores frenan los temporizadores; al volver (`visibilitychange`) se recalcula enseguida.

## UI Mockups

- Design system revision: 3
- Decision: no (project policy) — 17/11/2026
