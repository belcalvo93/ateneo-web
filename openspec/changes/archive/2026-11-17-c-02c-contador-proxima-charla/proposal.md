# Proposal

## Why

Zoom no avisa si la charla ya empezó, y quien llega a la página no sabe si tiene que entrar ahora o falta. La tarjeta de la próxima charla ya tiene la fecha, la hora y, desde C-02b, el botón «Entrar por Zoom» con el link del semestre: falta decir cuánto falta, cuándo está en vivo y cuándo terminó.

## What Changes

- **Contador en la tarjeta de la próxima charla**, calculado desde `fecha` y `hora` de `data/proxima-charla.js` (no «cualquier viernes»: en el receso no hay charla todos los viernes). Sin fecha válida no hay contador y queda «Todos los viernes a las 18 hs (hora de Argentina)».
- **Estados**: antes («Faltan N días y N horas», y en la última hora «Empieza en N minutos»), el mismo día («Hoy a las 18 hs (hora de Argentina)»), en vivo («En vivo ahora», con «Entrar por Zoom» como botón principal) durante `duracion_charla_min` (nuevo en `data/sitio.js`, 90 por defecto), y terminada («La charla de hoy terminó» y «La próxima charla se anunciará pronto») hasta que se cargue la siguiente.
- **Hora de Argentina** (UTC−3) siempre, sin importar la zona horaria de quien visita; la hora se muestra como «18 hs (hora de Argentina)».
- Sin segundos: se actualiza cada minuto. Sin `aria-live` en el contador; el paso a «En vivo ahora» se anuncia una sola vez. Nada parpadea.
- Lógica de estados con **TDD**: función pura que recibe «ahora» y la charla.

Fuera de este change: recordatorios, cuenta regresiva en otras páginas.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `portada`: contador de la próxima charla.
- `configuracion-sitio`: `duracion_charla_min`.

## Impact

- Código: `js/portada-logica.js` (`estadoProxima`), `js/portada.js`, `scripts/lib/validar.js`, `css/estilos.css`, `index.html` (texto de respaldo).
- Datos: `data/sitio.js` (`duracion_charla_min: 90`), `data/LEEME.md`.
- Depende de **C-02b** (link de Zoom del semestre y botón «Entrar por Zoom»): se archiva después de C-02b. Solo agrega requisitos, no modifica los que toca C-02b.
- Nivel de gobierno: BAJO.
