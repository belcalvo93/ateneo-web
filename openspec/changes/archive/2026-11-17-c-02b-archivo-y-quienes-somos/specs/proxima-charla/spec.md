## MODIFIED Requirements

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
