## ADDED Requirements

### Requirement: Duración de la charla
`data/sitio.js` SHALL tener `duracion_charla_min`, la duración en minutos durante la que una charla se muestra «En vivo ahora» (90 por defecto). El validador MUST tratar como error un valor que no sea un entero entre 15 y 300; si falta, la página usa 90.

#### Scenario: Valor inválido
- **WHEN** `duracion_charla_min` es `"90"` (entre comillas) o `5`
- **THEN** el validador informa el campo y termina con código 1

#### Scenario: Sin el campo
- **WHEN** `duracion_charla_min` no está
- **THEN** el validador no informa error y la página usa 90 minutos
