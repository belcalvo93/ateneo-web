## ADDED Requirements

### Requirement: Tinte celeste para superficies enlazables
`design-system/tokens.css` y `css/estilos.css` SHALL definir `--aac-celeste` (tinte muy claro de `--aac-azul`) y `--aac-celeste-hover` (algo más oscuro) para el fondo de las tarjetas de temas, y el texto que se apoya en ellos MUST cumplir contraste AA. El design system SHALL pasar a la revisión 3, pendiente de aprobación.

#### Scenario: Contraste sobre celeste
- **WHEN** se mide el texto de una tarjeta de tema sobre `--aac-celeste` y sobre `--aac-celeste-hover`
- **THEN** la relación de contraste es de al menos 4,5:1 en ambos casos

#### Scenario: Paridad de tokens
- **WHEN** se corre `npm test`
- **THEN** los tokens nuevos están en los dos archivos con los mismos valores
