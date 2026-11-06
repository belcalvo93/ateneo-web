# Modelo de Datos

Los datos viven en archivos JSON editables, separados del diseño (RNF Mantenible). Fuente de partida: `data/charlas-borrador.json` (borrador generado a partir de los títulos del canal).

## Dominios

- **Catálogo de charlas** (temas, charlas, partes/videos).
- **Próxima charla** (evento único vigente).
- **Configuración del sitio** (contacto, redes, cifras de portada) — a definir en C-02.

## ERD

```
Tema 1 ──── N Charla 1 ──── N Video(parte)
ProximaCharla (singleton, independiente)
```

## Entidades

### Tema
- `nombre` (string, único). Ocho temas propuestos (validación pendiente del Ateneo):

| Tema | Charlas | Videos |
|---|---|---|
| Geología, minería y energía | 35 | 70 |
| Inteligencia artificial y tecnología | 30 | 46 |
| Agua, ambiente y sostenibilidad | 27 | 41 |
| Neurociencia, salud y psicología | 26 | 47 |
| Historia, cultura y humanidades | 19 | 25 |
| Espacio y astronomía | 17 | 29 |
| Física y matemática | 17 | 27 |
| Ingeniería, sismos e infraestructura | 15 | 25 |

Los mockups usan etiquetas cortas (Historia y cultura, Agua y ambiente, IA y tecnología, Neurociencia y salud, Ingeniería y sismos). Hace falta un mapeo nombre completo ↔ etiqueta corta (ver `10` IN-03). Posible campo `playlist_url` por tema (RF-07).

### Charla (borrador actual)
- `id` (string, `c001`…`c186`)
- `tema` (string, ref. a Tema)
- `titulo` (string | **null en las 186**) — se propone formato *Tema – Disertante (año)*; el mockup muestra título limpio + «Disertante · año».
- `disertante` (string | **null en las 186**)
- `anio_aprox` (int, 2020–2026; sale de «hace X años» al 06/11/2026, es aproximado)
- `videos` (Video[]; 1 a 4 partes)

### Video (parte de una charla)
- `titulo_original` (string, título crudo de YouTube)
- `duracion` (string `H:MM:SS` o `MM:SS`)
- `vistas` (string en el borrador, p. ej. `"5"`; el PRD cita «12 mil», «1,2 mil»; conviene normalizar a número)
- `url` (string | **null en todos**) — falta completar

Etiqueta de botón en la ficha: «Charla» si hay 1 video; «Parte N» si hay varios (el mockup muestra «Parte 1 · 1:54:45»).

### Estadísticas del borrador (verificadas)
186 charlas, 310 videos, 104 charlas con más de un video, años 2020–2026.

### ProximaCharla (a diseñar en C-02)
Campos mínimos según RF-04: título, disertante, descripción breve (1–2 líneas), fecha, hora, lugar, modalidad (presencial + Zoom), enlace Zoom (a confirmar), correo de inscripción.

## Seed data inicial

- Las 186 charlas del borrador, con temas ya asignados.
- Las 3 más vistas conocidas: Entrelazamiento cuántico (~12 mil), Depósitos de litio (~2 mil), Evolución geológica de Mendoza (~1,2 mil).
- Faltan por completar manualmente: `titulo`, `disertante`, `url` de cada video, miniatura (derivable de la URL de YouTube).
