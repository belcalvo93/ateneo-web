# Spec Delta

## ADDED Requirements

### Requirement: Validación de la configuración del sitio
El validador SHALL leer `data/sitio.js` y tratar como error: que no defina `window.AAC_SITIO`, un campo faltante o desconocido, `correo` que no sea una dirección de correo, `canal_youtube` que no sea un enlace `https://`, `conferencias` vacío, una red sin `nombre`, una `url` de red que no sea `null`, un placeholder ni un enlace `https://`, y una foto sin `archivo` o sin `alt`.

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

### Requirement: Avisos de redes pendientes
El validador SHALL mostrar un aviso, sin cortar con error, por cada red cuya `url` sea `null` o un placeholder, e incluirlos en el resumen. Como la página oculta esas redes, esos avisos MUST NOT hacer fallar el modo `--estricto`.

#### Scenario: Instagram sin enlace
- **WHEN** Instagram tiene un placeholder como `url`
- **THEN** el validador muestra un aviso con el nombre de la red y termina con código 0

#### Scenario: Red pendiente en modo estricto
- **WHEN** se corre con `--estricto`, sin otros pendientes, y una red sigue con placeholder
- **THEN** el validador muestra el aviso de esa red y termina con código 0

### Requirement: Validación del enlace para agendar
El validador SHALL aceptar `calendar_url` en la próxima charla como `null` o como un enlace que empieza con `https://`, y tratar cualquier otro valor como error. `calendar_url` y `zoom_url` en `null` MUST NOT generar avisos de pendientes, ni siquiera en modo estricto.

#### Scenario: Enlace válido
- **WHEN** `calendar_url` es un enlace `https://`
- **THEN** el validador lo acepta

#### Scenario: Valor inválido
- **WHEN** `calendar_url` es un número o un texto sin `https://`
- **THEN** el validador informa un error en `calendar_url` y termina con código 1

#### Scenario: Sin enlaces en modo estricto
- **WHEN** se corre con `--estricto`, sin otros pendientes, y `zoom_url` y `calendar_url` son `null`
- **THEN** el validador termina con código 0
