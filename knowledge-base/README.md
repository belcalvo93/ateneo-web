# Web del Ateneo Amigos de la Ciencia — Base de Conocimiento

Generada a partir de `docs/PRD.md`, `docs/mockups/` y `data/charlas-borrador.json`.

## Índice de Archivos

| Archivo | Contenido |
|---|---|
| [01_vision_y_objetivos.md](01_vision_y_objetivos.md) | Propósito, objetivos, alcance y fuera de alcance |
| [02_descripcion_general.md](02_descripcion_general.md) | Stack, arquitectura cliente, integraciones |
| [03_actores_y_roles.md](03_actores_y_roles.md) | Actores y permisos operativos |
| [04_modelo_de_datos.md](04_modelo_de_datos.md) | Temas, charlas, videos, próxima charla, estadísticas del borrador |
| [05_reglas_de_negocio.md](05_reglas_de_negocio.md) | Reglas RN-* (videoteca, búsqueda, portada, accesibilidad) |
| [06_funcionalidades.md](06_funcionalidades.md) | Épicas y historias US-001…010 (RF-01…09) |
| [07_flujos_principales.md](07_flujos_principales.md) | Flujos de usuario y de mantenimiento |
| [08_arquitectura_propuesta.md](08_arquitectura_propuesta.md) | Estructura de carpetas, tokens visuales, accesibilidad, tests |
| [09_decisiones_y_supuestos.md](09_decisiones_y_supuestos.md) | DD-* y SU-* |
| [10_preguntas_abiertas.md](10_preguntas_abiertas.md) | Inconsistencias y preguntas priorizadas |

## Quick Start para Desarrolladores

1. Dominio → [01](01_vision_y_objetivos.md), [03](03_actores_y_roles.md)
2. Datos → [04](04_modelo_de_datos.md)
3. Reglas → [05](05_reglas_de_negocio.md)
4. Arquitectura → [02](02_descripcion_general.md), [08](08_arquitectura_propuesta.md)
5. Implementar → [07](07_flujos_principales.md), [06](06_funcionalidades.md)
6. Antes de codificar → [10](10_preguntas_abiertas.md)

## Resumen Ejecutivo

Sitio estático (HTML/CSS/JS puro) para el Ateneo: Inicio con próxima charla y Videoteca con buscador y filtro por tema sobre ~186 charlas (310 videos de YouTube). Datos editables por no programadores, accesible (18 px, AA, 44 px), pensado primero para celular y portable a un widget HTML de Elementor de la FRM. Fecha de entrega: 18/12/2026.
