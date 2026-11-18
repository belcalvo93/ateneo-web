# Cómo editar los datos del sitio (guía borrador)

> Esta es una guía borrador. La guía final, pensada para quien mantenga el sitio, se entrega en C-06.

Todo lo que cambia en el sitio (charlas, próxima charla, temas, redes) vive en esta carpeta, en archivos de texto que se abren con cualquier editor (el Bloc de notas sirve; mejor si es uno que muestre colores, como VS Code). No hace falta saber programar, pero sí respetar la forma en que están escritos: comillas, comas y llaves.

## Qué archivo es cada cosa

| Archivo | Qué tiene | ¿Se edita a mano? |
|---------|-----------|-------------------|
| `proxima-charla.js` | Los datos de la próxima charla (título, disertante, fecha, hora…) | **Sí**, cada semana |
| `correcciones.js` | Tus correcciones a las charlas ya cargadas: título, disertante, tema, año, enlaces, «destacada»… | **Sí**: es el lugar para corregir |
| `charlas-nuevas.js` | Las charlas que se agregan de ahora en más | **Sí**: es el lugar para agregar |
| `sitio.js` | Los datos generales: correo de contacto, redes, link de Zoom del semestre, video de presentación, fotos de «Quiénes somos», formulario «Sumate al Ateneo», Mesa Organizadora (con `mostrar: true/false`), entrevistas de radio y PDF de la Declaración | Muy de vez en cuando |
| `temas.js` | Los temas (Geología, IA, etc.) y sus nombres cortos | Casi nunca; son 8 temas confirmados y se sumarán 2 cuando Agustina informe los nombres |
| `charlas.js` | El catálogo de las 186 charlas (con sus videos de YouTube) | **No**: lo genera un script y se pisa cada vez que se regenera |
| `archivo-charlas.js` | Fecha exacta, disertante y título de las charlas que coinciden con seguridad con el archivo 2020–2026 del sitio viejo | **No**: lo genera `scripts/cruzar-archivo.js`; lo que escribas en `correcciones.js` manda sobre él |
| `charlas-borrador.json` | El borrador original del que salió el catálogo | **Nunca**: es solo el origen |

Cada archivo empieza con un comentario (el texto entre `/*` y `*/`, o después de `//`) que explica cómo se escribe. Lo que está en un comentario no afecta al sitio.

**Para qué sirve esta separación:** cuando el canal de YouTube cambia (títulos nuevos, videos vueltos a subir), alguien regenera `charlas.js`. Como tus correcciones están en otro archivo, **no se pierden**. El sitio junta los dos archivos en el navegador (`js/aplicar-correcciones.js`), así que al guardar `correcciones.js` o `charlas-nuevas.js` el cambio se ve **sin correr ningún comando ni instalar nada** (Node solo hace falta si querés usar el validador, más abajo).

## Editar la próxima charla

Abrí `proxima-charla.js` y reemplazá los valores entre comillas. Ejemplo:

```js
window.AAC_PROXIMA_CHARLA = {
  titulo: "Energía solar en Mendoza",
  disertante: "Dra. Ana Pérez",
  descripcion: "Cómo funcionan los paneles solares y qué se instala hoy.",
  fecha: "14/11/2026",
  hora: "18:00",
  lugar: null,
  modalidad: "Por Zoom",
  zoom_url: null,
  calendar_url: "https://…",
  correo_inscripcion: "ateneoac.mo@gmail.com"
};
```

- **modalidad**: las charlas son por Zoom, así que normalmente queda `"Por Zoom"`. Si una charla puntual es presencial: `"Presencial y por Zoom"` o `"Presencial"`.
- **lugar**: solo si la charla es presencial (es excepcional). Ejemplo: `"Salón de Actos UTN FRM, Rodríguez 273, Ciudad de Mendoza"`. Si es por Zoom, dejá `null` (sin comillas): la tarjeta no muestra ningún lugar.
- **fecha**: siempre `DD/MM/AAAA` (día, mes, año de cuatro cifras). Ejemplo: `"14/11/2026"`.
- **hora**: siempre `HH:MM` en 24 horas. Ejemplo: `"18:00"`.
- **zoom_url** (opcional): **solo si esta charla tiene un link de Zoom propio**. Normalmente queda en `null` y la tarjeta usa el link del semestre (ver «El link de Zoom del semestre», más abajo).
- **calendar_url** (opcional): el enlace para agendar la charla en Google Calendar. Si está cargado, la página muestra el botón «Agendar en Calendar»; con `null` no aparece.
- Los dos enlaces tienen que empezar con `https://`.
- Mientras el título o la fecha sigan con corchetes, la página muestra «La próxima charla se anunciará pronto» con el horario de siempre y el botón «Entrar por Zoom» del semestre.
- Si todavía no sabés un dato, dejalo con corchetes, por ejemplo `"[fecha]"`. No inventes datos.

### El link de Zoom del semestre

El Ateneo usa un link de Zoom recurrente que **cambia una vez por semestre**. Está en `data/sitio.js`, en `zoom_url_semestre`, y la tarjeta de la próxima charla muestra el botón «Entrar por Zoom» con ese link, también mientras la charla todavía no está anunciada.

- **Cuando empieza un semestre nuevo**: reemplazá el link en `zoom_url_semestre` (entre comillas, empezando con `https://`).
- **Si una charla puntual tiene un link propio**: cargalo en `zoom_url` de `data/proxima-charla.js`; para esa charla manda ese. Cuando pasa la charla, volvé a dejar `zoom_url: null`.
- **Si no hay link**: `zoom_url_semestre: null` y la tarjeta no muestra el botón.

## Redes y datos generales del sitio

Abrí `sitio.js`. Las redes son una lista, una línea por red, en el orden en que se ven al pie de la página:

```js
redes: [
  { nombre: "YouTube", url: "https://www.youtube.com/@…" },
  { nombre: "Canal de WhatsApp", url: "https://whatsapp.com/channel/…" },
  { nombre: "Instagram", url: "[enlace de Instagram]" }
],
```

- **Agregar una red**: copiá una línea, cambiá el nombre y el enlace, y fijate que todas las líneas menos la última terminen en coma.
- **Quitar una red**: borrá su línea.
- **Red que todavía no existe**: dejá el enlace con corchetes o `null`. Esa red **no se muestra** en la página; el validador solo te lo recuerda con un aviso.
- El enlace tiene que empezar con `https://`.

En el mismo archivo están la **dirección** (`direccion`, se ve al pie de todas las páginas) y el enlace **«Cómo llegar»** (`mapa_url`, un enlace de Google Maps que empiece con `https://`; con `null` el enlace no se muestra).

Las **fotos** de «Quiénes somos» también son una lista. Mientras esté vacía (`fotos: []`), la galería no se ve. Para sumar una foto, guardá la imagen en la carpeta `img/` y agregá una línea con su archivo y una descripción de lo que se ve (la leen quienes usan lector de pantalla):

```js
fotos: [
  { archivo: "img/charla-2019.jpg", alt: "Disertante exponiendo en el Salón de Actos de la UTN FRM" }
]
```

**Antes de sumar una foto hace falta la autorización del Ateneo.** Achicala a 1600 px de ancho como máximo y sacale los metadatos (pueden incluir la ubicación donde se sacó). Si aparecen personas que no son del Ateneo, hay que desenfocarlas. No escribas en este archivo correos ni teléfonos personales.

## Ganchos de los temas (opcional)

Cada tema de `temas.js` puede tener un **gancho**: una frase corta y curiosa que se muestra debajo del nombre del tema, pensada para invitar a mirarlo (por ejemplo, una pregunta). Es opcional:

```js
{ id: "geologia", nombre: "Geología, minería y energía", etiqueta: "Geología, minería y energía", playlist_url: null, gancho: null },
```

- Para cargar uno, reemplazá `null` por la frase entre comillas.
- Con `null` (sin comillas) no se muestra nada; no es un pendiente.
- Que sea corto: una línea.

## Corregir una charla que ya está en el catálogo

Abrí `correcciones.js`. Cada corrección se escribe con el **id de la charla** (`c010`), que es lo que no cambia aunque cambie el título en YouTube. Ejemplo (las claves son ids reales; no repitas un id: si ya tiene una entrada, agregale campos adentro):

```js
window.AAC_CORRECCIONES = {
  c002: { confirmados: ["titulo"] },
  c010: { titulo: "Energía solar en Mendoza", disertante: "Dra. Ana Pérez", tema: "geologia", anio: 2023, destacada: true },
  c124: { partes: { 2: { url: "https://www.youtube.com/watch?v=XXXXXXXXXXX" } } }
};
```

Separá cada charla de la siguiente con una coma (la última no lleva coma). Qué se puede escribir:

- **titulo**, **disertante**: el dato real, entre comillas. Al completarlos con un texto real (no entre corchetes), la marca correspondiente de `revisar` se borra sola.
- **tema**: uno de los ids de `temas.js` (más abajo).
- **anio**: un número de cuatro cifras, sin comillas.
- **fecha**: la fecha exacta, entre comillas y con el formato `"DD/MM/AAAA"` (por ejemplo `"11/11/2022"`). Con fecha no hace falta `anio`: sale de la fecha. La portada ordena «Últimas charlas» por esta fecha y la muestra en la tarjeta.
- **destacada**: `true` fija la charla como destacada en la portada. Las «más vistas» se arman solas a partir de las vistas.
- **confirmados**: lista de marcas de `revisar` que ya revisaste y están bien como están (`titulo`, `disertante`, `vistas`, `partes`). Sirve, por ejemplo, para un título que está todo en mayúsculas y es correcto.
- **partes**: el enlace de una parte. El número es el de «Parte N» que ve el público (`1`, `2`…). Con `url: null` la parte queda sin enlace (para anular uno automático equivocado).

Cualquier otro nombre de campo es un error (el validador lo avisa). Una corrección mal escrita no rompe el sitio: simplemente se ignora hasta que la arregles.

## Agregar una charla nueva

1. Abrí `charlas-nuevas.js`: adentro hay una lista `[ ]` vacía y un ejemplo en el comentario.
2. Pegá un bloque como este **dentro** de los corchetes (separando una charla de otra con coma) y completalo:

```json
  {
    "id": "c187",
    "titulo": "Título de la charla",
    "disertante": "Dra Ana Pérez",
    "tema": "geologia",
    "anio": 2026,
    "partes": [
      {
        "duracion": "1:02:30",
        "url": "https://www.youtube.com/watch?v=XXXXXXXXXXX",
        "vistas": null,
        "titulo_original": "Título de la charla - Dra Ana Pérez"
      }
    ],
    "revisar": []
  }
```

- **id**: el siguiente número libre (`c187`, `c188`…). No puede repetirse con ninguna otra charla.
- **tema**: uno de estos ids: `geologia`, `ia-tecnologia`, `agua-ambiente`, `neurociencia-salud`, `historia-cultura`, `espacio-astronomia`, `fisica-matematica`, `ingenieria-sismos` (la lista completa está en `temas.js`).
- **anio**: un número de cuatro cifras, sin comillas.
- **partes**: una por cada video de YouTube. Si la charla está partida en varios videos, copiá el bloque `{ … }` de la parte tantas veces como haga falta, **en orden** (Parte 1, Parte 2…) y separadas por comas. Los nombres «Charla» o «Parte N» se arman solos; no se escriben.
- **duracion**: `M:SS`, `MM:SS` o `H:MM:SS` (por ejemplo `"45:10"` o `"1:02:30"`).
- **url**: el enlace del video de YouTube entre comillas, o `null` (sin comillas) si todavía no lo tenés.
- **vistas**: un número sin comillas, o `null` si no lo sabés.
- **titulo_original**: el título tal como figura en YouTube.
- **destacada** (opcional): `"destacada": true,` fija la charla como destacada.

3. Guardá el archivo y corré el validador (más abajo).

## Qué significan `[…]`, `null` y `revisar`

- **`[Título]`, `[Disertante]`** (texto entre corchetes): es un dato que falta completar. Se completa en `correcciones.js`. En el sitio público nunca se va a ver un texto entre corchetes: se muestra el título original del video, y la línea del disertante se omite.
- **`null`** (sin comillas): «todavía no se sabe». Se usa en enlaces y en vistas. Cuando lo tengas, se completa en `correcciones.js` (enlaces) o se actualiza solo al regenerar (vistas).
- **`revisar`**: lista de campos de esa charla que conviene confirmar, por ejemplo `["titulo", "disertante"]`. Se limpia solo cuando completás ese dato en `correcciones.js`, o escribiendo `confirmados: ["titulo"]` si ya está bien.
- **Año aproximado**: el campo `anio` salió de «hace X años» al 06/11/2026, así que es aproximado en todas las charlas. Se corrige en `correcciones.js` cuando el Ateneo confirme la fecha real.

## Comprobar que no se rompió nada

Con Node 22 o superior instalado, desde la carpeta del proyecto:

```sh
node scripts/validar-datos.js
```

El validador junta el catálogo, las charlas nuevas y las correcciones igual que el sitio y revisa el resultado.

- Si dice `Resultado: OK`, los archivos están bien escritos. Puede listar **pendientes** (datos que faltan), pero no son errores.
- Si aparece `ERRORES`, cada línea dice el archivo, la charla (`c010`), la parte y el campo que hay que corregir. Los errores más comunes son una coma que falta entre dos charlas, un tema mal escrito, una duración como `"1h10"` (tiene que ser `"1:10:00"`), una fecha como `"31/02/2026"`, o una corrección que apunta a una charla que no existe o con un campo mal escrito (`titlo`).
- Antes de publicar el sitio, `node scripts/validar-datos.js --estricto` tiene que terminar bien: ahí cualquier pendiente cuenta como fallo.

Si el canal de YouTube cambió y hay que actualizar los enlaces y las vistas, eso lo hace `node scripts/derivar-datos.js` (guía en `scripts/LEEME.md`); no hace falta tocar `charlas.js` a mano.
