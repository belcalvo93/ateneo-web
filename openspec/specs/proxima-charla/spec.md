# proxima-charla Specification

## Purpose

Define el archivo editable con los datos de la próxima charla del Ateneo, separado del catálogo, con formatos simples para que alguien que no programa lo actualice cada semana sin inventar valores.

## Requirements

### Requirement: Archivo de próxima charla
`data/proxima-charla.js` SHALL definir `window.AAC_PROXIMA_CHARLA` con los campos de RF-04: `titulo`, `disertante`, `descripcion` (1–2 líneas), `fecha`, `hora`, `lugar`, `modalidad`, `zoom_url`, `calendar_url` y `correo_inscripcion`, cada uno con un comentario breve que diga qué escribir.

#### Scenario: Campos completos
- **WHEN** se lee `window.AAC_PROXIMA_CHARLA`
- **THEN** tiene los diez campos y ningún otro

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
Los valores no confirmados MUST quedar como placeholder entre corchetes; solo se precargan valores documentados en la knowledge base: `hora` habitual 18:00, `modalidad` «Por Zoom» (las charlas son por Zoom; presencial solo por excepción), `lugar` en `null` (se completa solo si una charla es presencial) y `correo_inscripcion` (ateneoac.mo@gmail.com). `zoom_url` y `calendar_url` quedan en `null`: el Zoom habitual es el del semestre de `data/sitio.js`.

#### Scenario: Estado inicial
- **WHEN** se actualiza el archivo en este change
- **THEN** `titulo`, `disertante`, `descripcion` y `fecha` son placeholders entre corchetes, `lugar`, `zoom_url` y `calendar_url` son `null` y `modalidad` es «Por Zoom»

#### Scenario: Placeholder visible para el validador
- **WHEN** se corre el validador con la próxima charla en su estado inicial
- **THEN** informa un aviso por cada placeholder sin cortar con error

#### Scenario: Charla presencial excepcional
- **WHEN** una charla es presencial y se completa `lugar` con el Salón de Actos
- **THEN** la tarjeta muestra el lugar junto a la modalidad; con `lugar: null` muestra solo «Por Zoom»

### Requirement: Enlaces opcionales de la próxima charla
`zoom_url` y `calendar_url` SHALL ser opcionales e independientes entre sí: cada uno es `null` o un enlace que empieza con `https://`. Dejar cualquiera de los dos en `null` MUST ser un estado válido y permanente, no un pendiente.

#### Scenario: Solo el enlace para agendar
- **WHEN** `calendar_url` tiene un enlace y `zoom_url` es `null`
- **THEN** el validador no informa error ni aviso por esos dos campos

#### Scenario: Enlace mal escrito
- **WHEN** `calendar_url` es «calendar.google.com/…» sin `https://`
- **THEN** el validador informa un error en `calendar_url`
