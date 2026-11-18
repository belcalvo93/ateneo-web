# Tasks

Strict TDD en la lógica. Depende de C-02b (se archiva después). Sin commits hasta que la autora lo pida.

## 1. Lógica (TDD)

- [x] 1.1 `estadoProxima(ahoraMs, proxima, duracionMin)` en `js/portada-logica.js`: tests de sin fecha, faltan (días y horas, singular, sin «0 días»), hoy, pronto (redondeo hacia arriba), en vivo (inicio incluido, final excluido), terminada (mismo día y otro día), duración configurable e inválida, y visitante en otra zona horaria (solo milisegundos). Verificar: tests en verde
- [x] 1.2 Texto de «Cuándo» con «(hora de Argentina)», con y sin fecha (TDD). Verificar: tests en verde

## 2. Datos y validador

- [x] 2.1 `duracion_charla_min: 90` en `data/sitio.js` y validación (entero 15–300, opcional) con tests primero. Verificar: `node scripts/validar-datos.js` con código 0

## 3. Tarjeta

- [x] 3.1 Contador en `js/portada.js`: línea sin `aria-live`, actualización por minuto y al volver a la pestaña, redibujo al cambiar de estado, Zoom destacado en vivo, región de estado con anuncio único, tarjeta «se anunciará pronto» al terminar. Estilos con variables del design system. Texto de respaldo del HTML con la hora de Argentina. Verificar en el navegador simulando cada estado

## 5. Ajuste de la autora (17/11/2026)

- [x] 5.1 «Entrar por Zoom» solo con fecha cargada y en faltan, hoy, empieza en N minutos y en vivo; oculto terminada o sin fecha (`mostrarZoom`, TDD). Spec («Botones de Calendar y Zoom» reemplaza al requisito de C-02b), guía y KB 05

## 4. Cierre

- [x] 4.1 `data/LEEME.md` (fecha y hora necesarias para el contador; duración), KB 04/05 y `CHANGES.md`
- [x] 4.2 `npm test`, validador, `openspec validate --strict`, detector de `impeccable` en la portada a 1440×900 y 390×844
