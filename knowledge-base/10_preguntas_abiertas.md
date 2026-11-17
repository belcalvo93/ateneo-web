# Preguntas Abiertas

Actualizado el 16/11/2026 con los acuerdos de la reunión del 11/11/2026 y las novedades de Agustina del 16/11/2026 (fuente: reunión con el Ateneo del 11/11/2026 y documentos entregados por el Ateneo; resumen en `docs/PRD.md` v1.2). Las preguntas cerradas se conservan abajo, con su resolución, para no perder el historial.

## Inconsistencias detectadas

### IN-01 — Año de origen del Ateneo — ✅ RESUELTA (11/11)
**Era**: el PRD decía «nació en 2017» y a la vez preguntaba «¿2015 o 2017?»; los mockups usan «desde 2017».
**Resolución**: la historia se cuenta desde **agosto de 2015**; 2016–2017 es la etapa de consolidación y del nombre definitivo (DD-13). El texto «desde 2017» de los mockups se reemplaza en C-03.

### IN-02 — Plataforma de publicación — ✅ RESUELTA (11/11), con un pendiente
**Era**: Elementor como principal y Google Sites como alternativa.
**Resolución**: integrada en la web de la UTN FRM (WordPress + Elementor); Google Sites descartado (DD-02).
**Sigue pendiente**: el contacto del administrador web de la FRM, el alta de Belén como editora y saber si se pueden hospedar archivos (Mediateca) o se inlinea todo. Se mantiene el criterio de diseñar los archivos para poder inlinearse, con el prefijo de aislamiento `.aac-web`.

### IN-03 — Nombres de temas completos vs. etiquetas de mockup — ✅ RESUELTA (C-02)
Se guardan ambos (`nombre` y `etiqueta`) en `data/temas.js`.

### IN-04 — Datos de próxima charla y redes son placeholders — ABIERTA
Los mockups usan `[fecha]`, `[Título…]`, `[usuario a confirmar]`. El conjunto de redes ya está definido (DD-14), y el enlace del Canal de Difusión de WhatsApp ya se tiene; **falta el de Instagram**: queda como placeholder en la lista configurable y no se muestra al público. Los datos de cada próxima charla (incluidos los enlaces de Calendar y Zoom, DD-15) se cargan semana a semana.

### IN-05 — Alcance de «nombres» en mockups — ABIERTA
El mockup de Videoteca muestra 12 charlas reales con títulos/disertantes limpios (p. ej. Entrelazamiento cuántico — Dr. Ernesto Gandolfo Raso, 2023); el borrador tiene `titulo`/`disertante` en `null` para las 186. Hay que cargarlas (ver IN-07).

### IN-06 — Caja del Ateneo en la portada de la UTN FRM (idea)
La portada de la UTN FRM tiene cajas de colores (Cursos, Tecnicaturas, Licenciaturas, etc.), cada una con ícono, número, nombre y una etiqueta debajo, que enlazan a cada sección; el Ateneo tendría una que apunte a su página (idea de change C-07 `tarjeta-en-portada-utn`, en `CHANGES.md`).
**Pendiente**: quién la agrega en Elementor, un color que no choque con los existentes, el ícono y el número. No se definió el 11/11; sigue como idea.

### IN-07 — Completar disertantes y títulos (idea, con insumo nuevo)
Dos fuentes posibles, combinables:
1. **Descripciones de los videos**: `python -m yt_dlp --skip-download --dump-json <video>` (solo metadatos, lectura) y un script que proponga `titulo`/`disertante`.
2. **Listado interno de miembros del Ateneo** (entregado por los ingenieros): sirve como diccionario de nombres para reconocer disertantes en los títulos y descripciones de YouTube.

**Regla de privacidad (DD-17)**: el repo es público. El listado **no se copia ni se commitea**; el script lo lee desde su carpeta original fuera del repo y solo se guardan nombres que **ya figuran públicamente** en los títulos o descripciones de YouTube. Nunca correos ni teléfonos.
Reduciría la carga manual (hoy solo ~16 % de disertantes se extraen automáticamente). No implementado; conviene hacerlo antes o durante C-04/C-05.

### IN-08 — Tema a partir de las playlists (idea, ahora viable)
Agustina empezó a armar las playlists por tema el 16/11/2026. El script podría listar cada playlist (`yt-dlp --flat-playlist`) y asignar el tema por pertenencia (playlist → id de tema; `temas.js` ya tiene `playlist_url`). Hoy el tema sale del borrador. No implementado; conviene esperar a que las playlists estén completas y a que se conozcan las 2 categorías nuevas.

### IN-09 — Capítulos / marcas de tiempo en la videoteca (idea futura)
Agustina va a agregar capítulos (marcas de tiempo) a los videos largos. La videoteca podría mostrarlos en la ficha de cada charla para ir directo a cada tema del video (enlace a YouTube con el tiempo de inicio). No implementado y fuera del scope de C-04; depende de que los capítulos existan en el canal y de poder leerlos con `yt-dlp` (metadatos por video).

### IN-10 — Más fotos en Quiénes somos (idea, para consultar con el nexo)
Sumar más fotos a Quiénes somos, siempre en una **grilla fija** (no carrusel: el contenido que se mueve solo o se esconde detrás de flechas es difícil para adultos mayores). Opciones a consultar, que pueden combinarse:
1. **Galería de momentos** de charlas y encuentros.
2. **Sección «Mesa Organizadora»** con foto, nombre y rol de sus 7 integrantes.

Condiciones: cada persona que aparezca con su nombre tiene que autorizarlo, y las fotos siguen las reglas de DD-17 (sin metadatos; personas ajenas desenfocadas). Cuidar el valor de **trato horizontal**: nadie se presenta como «principal» (mismo tamaño, mismo formato y orden alfabético). No implementado.

## Preguntas abiertas (priorizadas)

| Prioridad | Pregunta | Bloquea | Decisor |
|---|---|---|---|
| Alta | ¿Quién es el administrador web de la FRM y cómo se da de alta a Belén como editora? ¿Los archivos de datos/CSS/JS pueden hospedarse (Mediateca) o se inlinea todo en el widget? | Formato final de entrega (C-06) | Nexo / FRM |
| Media | **Vista previa al compartir (para el administrador web de la FRM)**: cuando se comparte el enlace de la página por WhatsApp o Instagram, ¿se puede definir el título, la descripción y la imagen de la vista previa dentro de WordPress (por página)? Desde el widget HTML no se controla | Llegada desde redes (C-06) | Administrador web FRM |
| Alta | ¿Cuáles son las **2 categorías nuevas** de la videoteca? (No inventar nombres: `temas.js` sigue con 8 hasta entonces) | `data/temas.js`, chips de C-04, grilla de temas de C-03 | Agustina |
| Alta | Completar `titulo`, `disertante` y `url` de las 186 charlas (310 videos) | Videoteca completa (C-05) | Dev + Ateneo |
| Media | **Modalidad (para Eduardo / nexo)**: ¿las charlas van a volver a ser presenciales en algún momento, o van a seguir siempre por Zoom? Desde la pandemia la mayoría son solo por Zoom, así que los textos del sitio dicen «en el Salón de Actos y/o por Zoom» de forma provisoria. Según la respuesta se ajusta el texto, y el campo `lugar` de la próxima charla podría pasar a ser opcional | Textos de portada y Quiénes somos; esquema de la próxima charla | Eduardo / nexo |
| Media | **Zoom (para Eduardo, Mesa Organizadora)**: ¿el enlace de Zoom de los viernes es fijo (reunión recurrente) o cambia en cada charla? Si es fijo, se podría mover a `data/sitio.js` como valor por defecto para no cargarlo cada semana. ¿Están de acuerdo con que el enlace de Zoom sea público en la web? Mientras tanto `zoom_url` queda en `proxima-charla.js` y el botón solo aparece si está cargado; el diseño no cambia hasta tener la respuesta | Próxima charla (C-03) y guía de uso (C-06) | Eduardo / Mesa |
| Media | Enlace del perfil de **Instagram** (placeholder en la lista de redes) | Redes de C-03 | Agustina |
| Media | Validar con el nexo que el logo «AAC» con la llama es el oficial (DD-18: confirmado solo por archivos) | Marca | Nexo |
| Media | ¿Quiénes integran la Mesa Organizadora y quieren aparecer? ¿Se nombra a los fundadores en «Quiénes somos»? | Quiénes somos (C-03) | Nexo / Mesa |
| Media | **Más fotos en Quiénes somos (IN-10, para el nexo)**: ¿quieren una galería de momentos de charlas y encuentros, una sección «Mesa Organizadora» con foto, nombre y rol de sus 7 integrantes, o ambas? Cada persona nombrada tiene que autorizarlo; siempre en grilla fija y sin destacar a nadie | Quiénes somos | Nexo |
| Media | ¿Se suman otras fotos a la galería? Cada foto nueva necesita la autorización del Ateneo antes de publicarse (la foto grupal ya está autorizada, ver preguntas cerradas) | Galería de Quiénes somos | Nexo |
| Media | ¿Cómo y cuándo avisa quien graba las charlas que subió un video nuevo? ¿Quién vuelve a correr el cruce (`derivar-datos.js`) tras los cambios de Agustina en el canal? | Enlaces del catálogo al día | Dev / Agustina / Ateneo |
| Media | ¿Quiénes del Ateneo cargarán la próxima charla después de la beca? (Ya se sabe que serán varios, DD-20; faltan los nombres para probar la guía con ellos) | Guía de uso (C-06) | Nexo / Mesa |
| Media | Caja del Ateneo en la portada de la UTN FRM: ¿quién la agrega en Elementor, qué color, ícono y número? (IN-06) | C-07 (idea) | Ateneo / FRM |
| Baja | Completar disertantes y títulos con `yt-dlp` y el cruce de nombres (IN-07) | Menos carga manual (C-05) | Dev |
| Baja | Tema desde las playlists de Agustina (IN-08) | Asignación de tema | Dev / Agustina |
| Baja | Capítulos / marcas de tiempo en las fichas (IN-09) | Idea futura | Dev / Agustina |
| Baja | Formato de asunto del correo de inscripción | Próxima charla | Ateneo |

## Preguntas cerradas

| Pregunta | Resolución | Fecha |
|---|---|---|
| ¿Elementor o Google Sites? | Web de la UTN FRM (WordPress + Elementor). Google Sites descartado (DD-02) | 11/11/2026 |
| ¿Se validan los 8 temas propuestos? | Sí: se mantienen los 8 y se sumarán 2 (DD-05) | 16/11/2026 |
| ¿Desde qué año se cuenta la historia? | Agosto de 2015 (DD-13) | 11/11/2026 |
| ¿Acceso al canal para armar playlists por tema (RF-07)? | Las arma Agustina; ya empezó | 16/11/2026 |
| ¿Hay fotos de las charlas? | Sí: 4 fotos históricas entregadas por el Ateneo | 11/11/2026 |
| ¿Se puede publicar la foto grupal de integrantes? | Sí: el Ateneo la entregó para la web, así que su consentimiento queda resuelto. Se publica optimizada y sin metadatos (el original tenía ubicación GPS) como `img/ateneo-integrantes.jpg`, en Quiénes somos (C-03c). Cualquier otra foto sigue necesitando autorización | 17/11/2026 |
| ¿Podemos usar el logo actual? | «AAC» con la llama, confirmado por los archivos entregados; falta validarlo con el nexo (DD-18) | 16/11/2026 |
| ¿Sigue vigente la Declaración de Principios (`bit.ly/3ai4qQx`)? | Vigente la v2.4; se muestra desplegable en la página y se deja de usar el `bit.ly` (DD-16) | 11/11/2026 |
| ¿Conjunto final de redes? | YouTube, Instagram y Canal de Difusión de WhatsApp (DD-14) | 11/11/2026 |
| ¿Cambian los ids o enlaces de los videos cuando Agustina edita el canal? | No: edita desde YouTube Studio y los ids se mantienen; si resube un video, avisa (DD-21) | 16/11/2026 |
| ¿Enlace del Canal de Difusión de WhatsApp? | `https://whatsapp.com/channel/0029VbDjwCbI7BeKsvprkr3t` (DD-14) | 16/11/2026 |
| ¿Hay enlace de Zoom en la próxima charla? | Sí, junto con el de agendar en Google Calendar; ambos opcionales (DD-15) | 11/11/2026 |
| ¿«Más vistas»: automático o curado? | Automático por `vistas`, con `destacada: true` opcional (decidido en C-02). El orden exacto de «últimas» se define en C-03 | 11/11/2026 |
| ¿Quién mantiene la página después de la beca? | Varios integrantes del Ateneo, con una guía de uso simple (DD-20) | 11/11/2026 |
| Tercera parte del roadmap de la autora (mensaje cortado) | Formalizado en `CHANGES.md` (C-05 y C-06) | 06/11/2026 |

## Contexto (no son preguntas ni planes)

- **Banner y flyer**: los hace Agustina y no son parte del alcance de la web. Banner permanente de ~1 × 1 m con bolsillo para el flyer A3 semanal; el flyer lleva dos QR (Canal de Difusión de WhatsApp, en verde, y agendar en Calendar con el enlace de Zoom).
- **Renovación de la beca**: en la reunión del 11/11 se dijo que podría renovarse si el trabajo resulta bien. Es contexto, no un plan: el alcance y las fechas de la versión 1 no cambian.

[DISCOVERY] Todos los campos de `kb.discovery` se infirieron con confianza razonable del PRD; `scale` = `public_multi_user` (público abierto, sin cuentas).
