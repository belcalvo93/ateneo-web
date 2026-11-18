## ADDED Requirements

### Requirement: Validación de fechas de charlas
El validador SHALL tratar como error una `fecha` que no sea `dd/mm/aaaa` o no exista en el calendario, y en una misma corrección un `anio` distinto del año de su `fecha`. Una fecha futura en una charla ya publicada SHALL ser un aviso.

#### Scenario: Fecha imposible
- **WHEN** una corrección trae `fecha: "31/02/2023"`
- **THEN** el validador informa la charla y la fecha inválida y termina con código 1

#### Scenario: Año contradictorio
- **WHEN** una corrección trae `fecha: "11/11/2022"` y `anio: 2023`
- **THEN** el validador informa la contradicción y termina con código 1

### Requirement: Validación del archivo cruzado
El validador SHALL cargar `data/archivo-charlas.js` cuando exista y tratar como error una clave que no sea id de charla generada, un campo distinto de `fecha`, `disertante` y `titulo`, o un valor de tipo incorrecto. Si el archivo no existe, MUST seguir sin error.

#### Scenario: Id inexistente en el archivo cruzado
- **WHEN** `data/archivo-charlas.js` tiene una entrada `c999`
- **THEN** el validador informa en `data/archivo-charlas.js` que la charla `c999` no existe y termina con código 1

#### Scenario: Archivo cruzado ausente
- **WHEN** `data/archivo-charlas.js` no existe
- **THEN** el validador no informa error por eso
