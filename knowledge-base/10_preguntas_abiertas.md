# Preguntas Abiertas

Actualizado el 17/11/2026 con las respuestas de la Mesa Organizadora (Eduardo Serdoch). Antes, el 16/11/2026, con los acuerdos de la reunión del 11/11/2026 y las novedades de Agustina del 16/11/2026 (fuente: reunión con el Ateneo del 11/11/2026 y documentos entregados por el Ateneo; resumen en `docs/PRD.md` v1.2). Las preguntas cerradas se conservan abajo, con su resolución, para no perder el historial.

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
2. **Fotos de la Mesa Organizadora**: la sección con los nombres ya está publicada (6 integrantes, sin fotos ni cargos, confirmado el 17/11/2026); sumar fotos sigue siendo una idea.

Condiciones: cada persona que aparezca con su nombre tiene que autorizarlo, y las fotos siguen las reglas de DD-17 (sin metadatos; personas ajenas desenfocadas). Cuidar el valor de **trato horizontal**: nadie se presenta como «principal» (mismo tamaño, mismo formato y orden alfabético). No implementado.

## Preguntas abiertas (priorizadas)

| Prioridad | Pregunta | Bloquea | Decisor |
|---|---|---|---|
| Alta | ¿Quién es el administrador web de la FRM y cómo se da de alta a Belén como editora? ¿Los archivos de datos/CSS/JS pueden hospedarse (Mediateca) o se inlinea todo en el widget? | Formato final de entrega (C-06) | Nexo / FRM |
| Media | **Vista previa al compartir (para el administrador web de la FRM)**: cuando se comparte el enlace de la página por WhatsApp o Instagram, ¿se puede definir el título, la descripción y la imagen de la vista previa dentro de WordPress (por página)? Desde el widget HTML no se controla | Llegada desde redes (C-06) | Administrador web FRM |
| Alta | ¿Cuáles son las **2 categorías nuevas** de la videoteca? (No inventar nombres: `temas.js` sigue con 8 hasta entonces) | `data/temas.js`, chips de C-04, grilla de temas de C-03 | Agustina |
| Alta | Completar `titulo`, `disertante` y `url` de las 186 charlas (310 videos) | Videoteca completa (C-05) | Dev + Ateneo |
| Media | Enlace del perfil de **Instagram** (placeholder en la lista de redes) | Redes de C-03 | Agustina |
| Media | **Logo (para el nexo)**: validar que el logo «AAC» con la llama es el oficial (DD-18: confirmado solo por archivos). El 17/11/2026 la Mesa Organizadora respondió que lo están consultando: queda pendiente | Marca | Nexo / Mesa |
| Media | **Declaración de Principios nueva (Mesa Organizadora)**: el 17/11/2026 avisaron que la van a **reescribir**. Hasta que llegue, la página mantiene el texto actual (v2.4) y no se ofrece PDF (`declaracion_pdf: null`). Cuando llegue: reemplazar el texto del desplegable de «Proponer una charla» y cargar el PDF. Referencia: el PDF de julio de 2020 (`docs/fuentes/`) difiere de la v2.4 en contenido (persona gramatical, objetivo c «fiable»/«falible», cláusula de «la Moral…», reserva de la MO y conformación de la Mesa de 2020) | Quiénes somos | Mesa Organizadora |
| Media | **Foto actual del Ateneo (Mesa Organizadora)**: la foto grupal del Salón de Actos no se usa (es vieja; se borró de `img-local/`). Van a mandar una foto actualizada para la foto principal de Quiénes somos (`foto_principal`, hoy `null`). La de los siete integrantes (2019, en la galería) queda por ahora, **pendiente de confirmar** si sigue | Quiénes somos | Mesa Organizadora |
| Media | **Charlas dudosas del cruce con el archivo 2020–2026**: revisar `scripts/salida/cruce-archivo.md` (se regenera con `node scripts/cruzar-archivo.js`) y confirmar en `data/correcciones.js` la fecha, el disertante y el título de cada una | Datos (C-02b) | Autora |
| Media | **Más fotos en Quiénes somos (IN-10, para el nexo)**: ¿quieren una galería de momentos de charlas y encuentros, fotos de la Mesa Organizadora (hoy solo nombres), o ambas? Cada persona nombrada tiene que autorizarlo; siempre en grilla fija y sin destacar a nadie | Quiénes somos | Nexo |
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
| ¿Las charlas vuelven a ser presenciales? (modalidad) | **Por Zoom**; presencial solo en casos excepcionales. Los textos dicen «por Zoom»; el lugar (Salón de Actos) se muestra solo si una charla es presencial (`lugar` opcional en `proxima-charla.js`). La dirección del pie queda como sede del Ateneo (DD-25) | 17/11/2026 |
| ¿El enlace de Zoom es fijo? ¿Puede ser público? | Es **recurrente, uno por semestre**, y puede ser público (lo autorizó Eduardo). Va en `data/sitio.js` como `zoom_url_semestre`; una charla con link propio lo carga en `zoom_url` de `proxima-charla.js`. El botón «Entrar por Zoom» se ve también antes de anunciar la charla (DD-25) | 17/11/2026 |
| ¿Mesa Operativa u Organizadora? ¿Aparecen los nombres? | Se llama **Mesa Organizadora**, son **6** y quieren aparecer: Adolfo Anunziata, Luis Blanco, Raúl Pía, Alberto Salassa, Eduardo Serdoch y Luis P. Tittarelli (orden alfabético, sin cargos ni fotos; `mostrar: true`) (DD-25) | 17/11/2026 |
| ¿Es correcta la historia de Quiénes somos? | Sí: inicio en agosto de 2015, constitución en enero de 2016 con seis fundadores y crecimiento hasta casi 50 integrantes | 17/11/2026 |
| ¿Se usan los títulos (Dr., Ing.) de los disertantes? | No, salvo para una eminencia cuando el Ateneo lo indique; ese caso se carga a mano en `data/correcciones.js`. El catálogo y el archivo cruzado guardan los nombres sin títulos (DD-25) | 17/11/2026 |
| ¿Hay entrevistas o apariciones en radio? | Sí: graban entrevistas y pasan el link. Lista `entrevistas_radio` en `data/sitio.js` (vacía por ahora) y sección «En la radio» en Quiénes somos, que aparece solo si hay entrevistas | 17/11/2026 |
| ¿Elementor o Google Sites? | Web de la UTN FRM (WordPress + Elementor). Google Sites descartado (DD-02) | 11/11/2026 |
| ¿Se validan los 8 temas propuestos? | Sí: se mantienen los 8 y se sumarán 2 (DD-05) | 16/11/2026 |
| ¿Desde qué año se cuenta la historia? | Agosto de 2015 (DD-13) | 11/11/2026 |
| ¿Acceso al canal para armar playlists por tema (RF-07)? | Las arma Agustina; ya empezó | 16/11/2026 |
| ¿Hay fotos de las charlas? | Sí: 4 fotos históricas entregadas por el Ateneo | 11/11/2026 |
| ¿Se puede publicar la foto grupal de integrantes? | Sí: el Ateneo la entregó para la web, así que su consentimiento queda resuelto. Se publica optimizada y sin metadatos (el original tenía ubicación GPS) como `img/ateneo-integrantes.jpg`, en Quiénes somos (C-03c). Cualquier otra foto sigue necesitando autorización | 17/11/2026 |
| ¿Podemos usar el logo actual? | «AAC» con la llama, confirmado por los archivos entregados; la validación con el nexo sigue abierta (ver preguntas abiertas, DD-18) | 16/11/2026 |
| ¿Sigue vigente la Declaración de Principios (`bit.ly/3ai4qQx`)? | Vigente la v2.4; se muestra desplegable en la página y se deja de usar el `bit.ly` (DD-16). El 17/11/2026 avisaron que la van a reescribir (ver preguntas abiertas) | 11/11/2026 |
| ¿Conjunto final de redes? | YouTube, Instagram y Canal de Difusión de WhatsApp (DD-14) | 11/11/2026 |
| ¿Cambian los ids o enlaces de los videos cuando Agustina edita el canal? | No: edita desde YouTube Studio y los ids se mantienen; si resube un video, avisa (DD-21) | 16/11/2026 |
| ¿Enlace del Canal de Difusión de WhatsApp? | `https://whatsapp.com/channel/0029VbDjwCbI7BeKsvprkr3t` (DD-14) | 16/11/2026 |
| ¿Hay enlace de Zoom en la próxima charla? | Sí, junto con el de agendar en Google Calendar; ambos opcionales (DD-15). Desde el 17/11/2026 el habitual es el del semestre (DD-25) | 11/11/2026 |
| ¿«Más vistas»: automático o curado? | Automático por `vistas`, con `destacada: true` opcional (decidido en C-02). El orden exacto de «últimas» se define en C-03 | 11/11/2026 |
| ¿Quién mantiene la página después de la beca? | Varios integrantes del Ateneo, con una guía de uso simple (DD-20) | 11/11/2026 |
| Tercera parte del roadmap de la autora (mensaje cortado) | Formalizado en `CHANGES.md` (C-05 y C-06) | 06/11/2026 |

## Contexto (no son preguntas ni planes)

- **Banner y flyer**: los hace Agustina y no son parte del alcance de la web. Banner permanente de ~1 × 1 m con bolsillo para el flyer A3 semanal; el flyer lleva dos QR (Canal de Difusión de WhatsApp, en verde, y agendar en Calendar con el enlace de Zoom).
- **Renovación de la beca**: en la reunión del 11/11 se dijo que podría renovarse si el trabajo resulta bien. Es contexto, no un plan: el alcance y las fechas de la versión 1 no cambian.

[DISCOVERY] Todos los campos de `kb.discovery` se infirieron con confianza razonable del PRD; `scale` = `public_multi_user` (público abierto, sin cuentas).
