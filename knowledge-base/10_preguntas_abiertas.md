# Preguntas Abiertas

## Inconsistencias detectadas

### IN-01 — Año de origen del Ateneo
**PRD dice**: «nació en 2017» (Contexto) y a la vez pregunta «¿desde qué año se cuenta la historia (2015 o 2017)?». Los mockups usan «desde 2017».
**Impacto**: texto de Quiénes somos y cifra «+100 conferencias desde 2017».
**Resolución propuesta**: usar 2017 hasta que el Ateneo confirme.

### IN-02 — Plataforma de publicación
**PRD dice**: Elementor (WordPress FRM) como principal y Google Sites como alternativa; «a confirmar el 10/11». Además pregunta quién administra la web y cómo se integra.
**Impacto**: define dónde viven los archivos de datos/CSS/JS y si hay acceso a la Mediateca.
**Resolución propuesta**: diseñar los archivos para poder inlinearse, con prefijo/contenedor de aislamiento CSS.

### IN-03 — Nombres de temas completos vs. etiquetas de mockup
**PRD/borrador**: nombres largos (p. ej. «Agua, ambiente y sostenibilidad»). **Mockups**: etiquetas cortas («Agua y ambiente»).
**Resolución propuesta**: guardar ambos (`nombre` y `etiqueta`) en el esquema de temas.

### IN-04 — Datos de próxima charla y redes son placeholders
Los mockups usan `[fecha]`, `[Título…]`, `[usuario a confirmar]`. No hay datos reales aún.

### IN-05 — Alcance de «nombres» en mockups
El mockup de Videoteca muestra 12 charlas reales con títulos/disertantes limpios (p. ej. Entrelazamiento cuántico — Dr. Ernesto Gandolfo Raso, 2023); el borrador tiene `titulo`/`disertante` en `null` para las 186. Hay que cargarlas.

### IN-06 — Caja del Ateneo en la portada de la UTN FRM (idea)
La portada de la UTN FRM tiene cajas de colores (Cursos, Tecnicaturas, Licenciaturas, etc.), cada una con ícono, número, nombre y una etiqueta debajo, que enlazan a cada sección; el Ateneo tendría una que apunte a su página (idea de change C-07 `tarjeta-en-portada-utn`, en `CHANGES.md`).
**Pendiente**: quién la agrega en Elementor, un color que no choque con los existentes, el ícono y el número. Sujeto a la reunión con el Ateneo.

### IN-07 — Completar disertantes y títulos desde las descripciones de los videos (idea)
Las descripciones de YouTube podrían traer título y disertante: `python -m yt_dlp --skip-download --dump-json <video>` (solo metadatos, lectura) y un script que proponga los datos, dejando al Ateneo solo lo que no se pueda obtener. Reduciría la carga manual de las 186 charlas (hoy solo ~16 % de disertantes se extraen automáticamente). No implementado.

### IN-08 — Tema a partir de las playlists (idea)
Si Agustina arma una playlist por tema, el script podría listar cada playlist (`yt-dlp --flat-playlist`) y asignar el tema por pertenencia (playlist → id de tema; `temas.js` ya tiene `playlist_url`). Hoy el tema sale del borrador. No implementado.

## Preguntas abiertas (priorizadas)

| Prioridad | Pregunta | Bloquea | Decisor |
|---|---|---|---|
| Alta | ¿Quién administra la web de la FRM y cómo se integra la sección (Elementor o envío de código)? | Formato final de entrega (C-01/C-02) | Mesa / FRM |
| Alta | ¿Los archivos de datos/CSS/JS pueden hospedarse (Mediateca) o se inlinea todo en el widget? | Estructura de datos y entrega | FRM / Dev |
| Alta | ¿Se validan los 8 temas propuestos? | C-02 datos | Ateneo |
| Alta | Completar `titulo`, `disertante` y `url` de las 186 charlas (310 videos) | Videoteca completa | Dev + Ateneo |
| Media | ¿Acceso de edición al canal de YouTube para armar playlists por tema (RF-07)? | US-006 | Ateneo |
| Media | ¿Podemos usar el logo actual? ¿Hay versión en alta calidad y fotos de las charlas? | Marca / fichas | Ateneo |
| Media | ¿Quién del Ateneo carga eventos y charlas después de la beca? | Guía de uso (US-010) | Mesa |
| Media | ¿Cómo se definen «últimas charlas» y «más vistas» en portada: automático o curado? | C-03 | Dev / Ateneo |
| Media | ¿Sigue vigente la Declaración de Principios (bit.ly/3ai4qQx)? | US-009 | Ateneo |
| Media | ¿Quiénes integran la Mesa Organizadora y quieren aparecer? | Quiénes somos | Mesa |
| Media | ¿Cómo se coordinan los cambios de Agustina en el canal (títulos, orden, videos vueltos a subir) con la actualización de datos: quién vuelve a correr el cruce (`derivar-datos.js`) y cuándo? | Enlaces del catálogo al día | Dev / Agustina / Ateneo |
| Media | Caja del Ateneo en la portada de la UTN FRM: ¿quién la agrega en Elementor, qué color, ícono y número? (IN-06) | C-07 (idea) | Ateneo / FRM |
| Media | Conjunto final de redes sociales: Instagram + ¿TikTok o Facebook? (lista configurable, C-03) | Pie de página (C-03) | Agustina / Ateneo |
| Baja | Completar disertantes y títulos desde las descripciones de los videos con `yt-dlp` (IN-07) | Menos carga manual (C-05) | Dev |
| Baja | Tema desde las playlists por tema que arme Agustina (IN-08) | Asignación de tema | Dev / Agustina |
| Baja | Usuarios de Instagram y Facebook (otra becaria) | Pie de página | Otra becaria |
| Baja | Enlace de Zoom y formato de asunto del correo de inscripción | Próxima charla | Ateneo |
| Baja | Tercera parte del roadmap del autor (mensaje cortado después de C-04) | Roadmap | Autora |

[DISCOVERY] Todos los campos de `kb.discovery` se infirieron con confianza razonable del PRD; `scale` = `public_multi_user` (público abierto, sin cuentas).
