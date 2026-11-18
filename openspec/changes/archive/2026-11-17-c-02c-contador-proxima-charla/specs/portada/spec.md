## ADDED Requirements

### Requirement: Contador hasta la próxima charla
La tarjeta de la próxima charla SHALL mostrar, calculado con `fecha` y `hora` de `data/proxima-charla.js` en hora de Argentina (UTC−3) sin importar la zona horaria del visitante: «Faltan N días y N horas», «Hoy a las 18 hs (hora de Argentina)», «Empieza en N minutos», «En vivo ahora» o «La charla de hoy terminó». Sin fecha válida MUST NOT haber contador. Se actualiza cada minuto, sin segundos.

#### Scenario: Faltan días
- **WHEN** son las 15:00 del martes 10/11/2026 en Argentina y la charla es el 13/11/2026 a las 18:00
- **THEN** la tarjeta dice «Faltan 3 días y 3 horas»

#### Scenario: El mismo día
- **WHEN** son las 10:00 del 13/11/2026 en Argentina y la charla es ese día a las 18:00
- **THEN** la tarjeta dice «Hoy a las 18 hs (hora de Argentina)»

#### Scenario: Última hora
- **WHEN** faltan 45 minutos para el inicio
- **THEN** la tarjeta dice «Empieza en 45 minutos»

#### Scenario: Visitante en otra zona horaria
- **WHEN** alguien abre la página desde Madrid a las 22:30 de su hora, que son las 18:30 en Argentina del día de la charla
- **THEN** la tarjeta dice «En vivo ahora»

#### Scenario: Sin fecha
- **WHEN** `fecha` sigue en `[fecha]`
- **THEN** no hay contador y «Cuándo» dice «Todos los viernes a las 18 hs (hora de Argentina)»

### Requirement: Charla en vivo y terminada
Desde la hora de inicio y durante `duracion_charla_min` minutos la tarjeta SHALL decir «En vivo ahora» y mostrar «Entrar por Zoom» como botón principal. Después SHALL decir «La charla de hoy terminó» y «La próxima charla se anunciará pronto» hasta que se cargue la siguiente.

#### Scenario: En vivo
- **WHEN** son las 18:30 en Argentina del día de la charla de las 18:00 con duración 90
- **THEN** la tarjeta dice «En vivo ahora» y el primer botón es «Entrar por Zoom», destacado

#### Scenario: Terminada
- **WHEN** son las 19:30 en Argentina del día de la charla de las 18:00 con duración 90
- **THEN** la tarjeta dice «La charla de hoy terminó» y «La próxima charla se anunciará pronto»

### Requirement: Contador accesible
El contador MUST NOT estar en una región `aria-live` (no se anuncia cada minuto); el paso a «En vivo ahora» con la página abierta SHALL anunciarse una sola vez por una región de estado. Nada del contador parpadea, el texto cumple contraste AA y, sin JavaScript, la tarjeta muestra el día y la hora fijos.

#### Scenario: Anuncio único
- **WHEN** la página está abierta y la charla pasa de «Empieza en 1 minuto» a en vivo
- **THEN** un lector de pantalla anuncia una vez «La charla está en vivo ahora» y no anuncia los cambios de minuto

#### Scenario: Sin JavaScript
- **WHEN** el navegador no ejecuta JavaScript
- **THEN** la tarjeta dice «Todos los viernes a las 18 hs (hora de Argentina)»

### Requirement: Botones de Calendar y Zoom
La tarjeta de próxima charla SHALL mostrar «Agendar en mi calendario» solo si `calendar_url` tiene un enlace, y «Entrar por Zoom» solo si la charla tiene fecha y hora cargadas y el contador está en «faltan», «hoy», «empieza en N minutos» o «en vivo», con el `zoom_url` de la charla o, si no, el `zoom_url_semestre`, siempre `https`. Terminada o sin fecha, el botón MUST NOT verse: el link del semestre es fijo. Los dos abren en una pestaña nueva y lo avisan a los lectores de pantalla.

#### Scenario: Ambos enlaces cargados
- **WHEN** la charla tiene fecha, faltan días y `calendar_url` y `zoom_url` tienen un enlace `https://`
- **THEN** la tarjeta muestra los dos botones además de «Inscribirme por correo»

#### Scenario: Sin fecha cargada
- **WHEN** la próxima charla todavía no tiene fecha y `zoom_url_semestre` tiene un enlace
- **THEN** la tarjeta dice «La próxima charla se anunciará pronto» y no muestra «Entrar por Zoom»

#### Scenario: Charla terminada
- **WHEN** la charla de hoy ya terminó
- **THEN** la tarjeta no muestra «Entrar por Zoom», para que nadie entre a una sala vacía

#### Scenario: Ningún enlace cargado
- **WHEN** `calendar_url`, `zoom_url` y `zoom_url_semestre` son `null`
- **THEN** la tarjeta muestra solo «Inscribirme por correo»

#### Scenario: Link propio de una charla
- **WHEN** la charla tiene fecha, tiene `zoom_url` y también hay `zoom_url_semestre`
- **THEN** «Entrar por Zoom» lleva al `zoom_url` de la charla

## REMOVED Requirements

### Requirement: Enlaces opcionales de Calendar y Zoom
**Reason**: el botón de Zoom ya no se muestra con la charla sin fecha ni terminada (pedido de la autora, 17/11/2026: el link del semestre es fijo y llevaría a una sala vacía).
**Migration**: lo reemplaza «Botones de Calendar y Zoom».
