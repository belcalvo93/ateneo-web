# Spec Delta

## MODIFIED Requirements

### Requirement: Archivo de configuración del sitio
`data/sitio.js` SHALL definir `window.AAC_SITIO` con: `correo` (correo de contacto), `canal_youtube` (enlace al canal), `conferencias` (texto de la cifra de portada), `direccion` (dónde funciona el Ateneo), `mapa_url` (enlace al mapa de esa dirección, o `null`), `redes` (lista) y `fotos` (lista), cada uno con un comentario breve que diga qué escribir. El archivo MUST poder cargarse con `<script src>` o pegarse en línea junto a los demás archivos de datos.

#### Scenario: Campos presentes
- **WHEN** se lee `window.AAC_SITIO`
- **THEN** tiene los siete campos y ningún otro

#### Scenario: Comentarios para quien edita
- **WHEN** alguien abre `data/sitio.js` en un editor de texto
- **THEN** cada campo tiene al lado un comentario con un ejemplo de qué escribir

## ADDED Requirements

### Requirement: Dirección y mapa
En su estado inicial, `direccion` SHALL ser la dirección documentada de la UTN FRM (Rodríguez 273, Ciudad de Mendoza) y `mapa_url` un enlace `https://` de búsqueda de esa dirección en Google Maps. `mapa_url` en `null` MUST ser un estado válido.

#### Scenario: Estado inicial
- **WHEN** se crea el campo en este change
- **THEN** `direccion` menciona «Rodríguez 273» y `mapa_url` abre Google Maps con esa dirección

#### Scenario: Sin mapa
- **WHEN** `mapa_url` es `null`
- **THEN** el validador no informa error ni aviso por ese campo
