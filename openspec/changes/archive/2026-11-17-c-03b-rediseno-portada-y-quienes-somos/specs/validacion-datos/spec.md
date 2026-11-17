# Spec Delta

## MODIFIED Requirements

### Requirement: Coherencia de temas
El validador SHALL comprobar que los `id` de tema son únicos, que cada tema tiene `nombre` y `etiqueta` no vacíos, que `gancho`, si está, es `null` o un texto no vacío, y avisar si algún tema queda sin charlas.

#### Scenario: Tema vacío
- **WHEN** un tema no tiene ninguna charla asignada
- **THEN** el validador muestra un aviso con el nombre del tema, sin cortar con error

#### Scenario: Gancho ausente o nulo
- **WHEN** un tema no tiene `gancho` o lo tiene en `null`
- **THEN** el validador no informa error ni aviso por ese campo, ni siquiera en modo estricto

#### Scenario: Gancho mal escrito
- **WHEN** un tema tiene `gancho: ""` o `gancho: 5`
- **THEN** el validador informa el tema y el campo `gancho` como error

### Requirement: Validación de la configuración del sitio
El validador SHALL leer `data/sitio.js` y tratar como error: que no defina `window.AAC_SITIO`, un campo faltante o desconocido, `correo` que no sea una dirección de correo, `canal_youtube` que no sea un enlace `https://`, `conferencias` o `direccion` vacíos, `mapa_url` que no sea `null` ni un enlace `https://`, una red sin `nombre`, una `url` de red que no sea `null`, un placeholder ni un enlace `https://`, y una foto sin `archivo` o sin `alt`.

#### Scenario: Configuración correcta
- **WHEN** se corre el validador con la configuración en su estado inicial
- **THEN** no informa errores en `data/sitio.js`

#### Scenario: Red con enlace mal escrito
- **WHEN** una red tiene `url: "instagram.com/ateneo"` sin `https://`
- **THEN** el validador informa en `data/sitio.js` la red y el campo `url` y termina con código 1

#### Scenario: Foto sin texto alternativo
- **WHEN** una foto tiene `alt` vacío
- **THEN** el validador informa en `data/sitio.js` la foto y el campo `alt` como error

#### Scenario: Campo desconocido
- **WHEN** la configuración trae `redez: […]`
- **THEN** el validador informa el campo `redez` como desconocido y termina con código 1

#### Scenario: Mapa mal escrito
- **WHEN** `mapa_url` es «maps.google.com/…» sin `https://`
- **THEN** el validador informa en `data/sitio.js` el campo `mapa_url` como error
