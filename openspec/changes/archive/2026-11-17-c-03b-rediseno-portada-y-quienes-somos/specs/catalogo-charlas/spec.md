# Spec Delta

## ADDED Requirements

### Requirement: Gancho opcional por tema
Cada tema de `data/temas.js` SHALL admitir un campo opcional `gancho`: una frase corta que invita a explorar el tema, o `null` si no tiene. En este change todos los temas quedan con `gancho: null`; MUST NOT escribirse ganchos inventados.

#### Scenario: Estado inicial
- **WHEN** se lee `data/temas.js` después de este change
- **THEN** los 8 temas tienen `gancho: null` y el comentario del archivo explica para qué sirve el campo

#### Scenario: Tema sin el campo
- **WHEN** un tema no tiene el campo `gancho`
- **THEN** se trata igual que si fuera `null`
