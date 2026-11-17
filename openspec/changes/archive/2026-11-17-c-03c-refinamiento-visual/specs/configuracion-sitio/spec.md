# Spec Delta

## MODIFIED Requirements

### Requirement: Lista de fotos de la galería
`fotos` SHALL ser una lista de elementos `{ archivo, alt }`, con la ruta de la imagen dentro del sitio y su texto alternativo descriptivo. Solo se agregan fotos que el Ateneo autorizó para la web, optimizadas para la web y sin metadatos de ubicación. En su estado inicial contiene la foto grupal de integrantes, autorizada por el Ateneo.

#### Scenario: Estado inicial
- **WHEN** se lee `fotos` después de este change
- **THEN** tiene un solo elemento: `img/ateneo-integrantes.jpg` con un texto alternativo que describe la escena sin nombrar personas

#### Scenario: Foto sin metadatos
- **WHEN** se inspecciona `img/ateneo-integrantes.jpg`
- **THEN** no tiene metadatos EXIF (ni ubicación ni datos de la cámara) y mide como máximo 1600 px de ancho

#### Scenario: Foto nueva sin autorización
- **WHEN** alguien quiere sumar otra foto a la lista
- **THEN** la guía de edición indica que primero hace falta la autorización del Ateneo
