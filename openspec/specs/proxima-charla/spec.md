# proxima-charla Specification

## Purpose

Define el archivo editable con los datos de la próxima charla del Ateneo, separado del catálogo, con formatos simples para que alguien que no programa lo actualice cada semana sin inventar valores.

## Requirements

### Requirement: Archivo de próxima charla
`data/proxima-charla.js` SHALL definir `window.AAC_PROXIMA_CHARLA` con los campos de RF-04: `titulo`, `disertante`, `descripcion` (1–2 líneas), `fecha`, `hora`, `lugar`, `modalidad`, `zoom_url` y `correo_inscripcion`, cada uno con un comentario breve que diga qué escribir.

#### Scenario: Campos completos
- **WHEN** se lee `window.AAC_PROXIMA_CHARLA`
- **THEN** tiene los nueve campos y ningún otro

#### Scenario: Comentarios para quien edita
- **WHEN** alguien abre `data/proxima-charla.js` en un editor de texto
- **THEN** cada campo tiene al lado un comentario con un ejemplo del formato esperado

### Requirement: Formatos de fecha y hora editables
`fecha` SHALL escribirse como `DD/MM/AAAA` y `hora` como `HH:MM` en formato de 24 horas, o quedar en placeholder (`[fecha]`, `[hora]`).

#### Scenario: Fecha válida
- **WHEN** `fecha` es «14/11/2026» y `hora` es «18:00»
- **THEN** el validador la acepta

#### Scenario: Fecha inexistente
- **WHEN** `fecha` es «31/02/2026»
- **THEN** el validador informa un error en `fecha`

### Requirement: Sin datos inventados en la próxima charla
Los valores no confirmados MUST quedar como placeholder entre corchetes; solo se precargan valores documentados en la knowledge base: `lugar` (Salón de Actos UTN FRM, Rodríguez 273), `hora` habitual 18:00, `modalidad` (presencial y por Zoom) y `correo_inscripcion` (ateneoac.mo@gmail.com). `zoom_url` queda en `null` hasta que el Ateneo lo confirme.

#### Scenario: Estado inicial
- **WHEN** se crea el archivo en este change
- **THEN** `titulo`, `disertante`, `descripcion` y `fecha` son placeholders entre corchetes y `zoom_url` es `null`

#### Scenario: Placeholder visible para el validador
- **WHEN** se corre el validador con la próxima charla en su estado inicial
- **THEN** informa un aviso por cada placeholder sin cortar con error
