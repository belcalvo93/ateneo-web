# Scripts de datos

Herramientas **de desarrollo** para preparar y controlar los datos de `data/`. El sitio no las necesita: para publicar alcanza con copiar las páginas, `css/`, `js/` y `data/`.

Hace falta Node 22 o superior. No hay que instalar nada (`npm install` no es necesario).

| Script | Qué hace |
|--------|----------|
| `node scripts/validar-datos.js` | Revisa los archivos de `data/` (`temas.js`, `charlas.js`, `charlas-nuevas.js`, `correcciones.js`, `proxima-charla.js`) **ya combinados**, como los ve el sitio: errores (cortan, código 1) y avisos de lo que falta completar. Con `--estricto` también falla si queda cualquier pendiente (para publicar). Con `--carpeta RUTA` valida otra carpeta, por ejemplo una copia. |
| `node scripts/derivar-datos.js` | **Regenera `data/charlas.js`** (archivo generado) desde `data/charlas-borrador.json` y la foto del canal (`scripts/salida/canal.jsonl`), de forma conservadora (ver abajo). También escribe `scripts/salida/reporte-cruce.md`. |
| `node scripts/derivar-datos.js --comprobar` | Regenera **en memoria**, compara con el `data/charlas.js` actual y lista las diferencias. No escribe nada; termina con código 1 si hay diferencias. |
| `node scripts/cruzar-youtube.js` | **Vista previa**: hace el mismo cálculo y escribe solo el reporte `scripts/salida/reporte-cruce.md`, sin tocar `data/charlas.js`. No usa internet. |

Los tests (`npm test`) cubren estos módulos y no usan internet ni `yt-dlp`.

## Qué es de quién (importante)

- `data/charlas.js` es un archivo **generado**: no se edita a mano; se pisa cada vez que se regenera.
- Todo lo que corrige una persona vive en `data/correcciones.js` (por **id de charla**, `c001`…) y en `data/charlas-nuevas.js`. **Ningún script escribe esos archivos**: la regeneración solo los lee (para saber qué videos ya están usados). Cómo se escriben: `data/LEEME.md`.

## Obtener la foto del canal (opcional)

`yt-dlp` es una herramienta externa que se usa **desde la línea de comandos para obtener datos**. No forma parte del sitio, no está en `package.json` y nada de lo demás la necesita. Solo lista los datos públicos del canal (`--flat-playlist`); **no descarga ningún video**.

Se ejecuta como módulo de Python, así no depende de que esté en el `PATH`:

```sh
python -m yt_dlp --flat-playlist --print-to-file "%(.{id,title,duration,view_count})j" scripts/salida/canal.jsonl "https://www.youtube.com/@ateneoamigosdelasciencias-2269/videos"
```

- Se usa `--print-to-file` (y no `> archivo`) porque en PowerShell 5 la redirección guarda el archivo en UTF-16 y rompe las tildes.
- `--print-to-file` **agrega al final** del archivo: si ya existe `scripts/salida/canal.jsonl`, borralo antes de volver a correrlo (el cruce igual ignora ids repetidos).
- Con `--flat-playlist`, la duración o las vistas de algún video podrían faltar; sin duración no hay desempate y el caso queda como ambiguo en el reporte.
- Los videos privados o no listados no aparecen.

## Cuando el canal cambia: cómo regenerar

Agustina (o quien edite el canal) puede cambiar títulos, orden y playlists, o volver a subir videos editados (el video nuevo tiene **otro id**). Cada vez que eso pase:

1. Borrar `scripts/salida/canal.jsonl` y volver a obtenerlo con el comando de arriba.
2. `node scripts/derivar-datos.js --comprobar` → muestra qué cambiaría, sin escribir nada.
3. `node scripts/derivar-datos.js` → regenera `data/charlas.js` y el reporte.
4. Leer `scripts/salida/reporte-cruce.md` (los dudosos) y resolverlos a mano en `data/correcciones.js`.
5. `node scripts/validar-datos.js` → comprueba que todo esté bien y muestra lo pendiente.

La primera vez, si `data/charlas.js` es una versión vieja sin la marca «ARCHIVO GENERADO», el script no lo pisa: hay que correr `node scripts/derivar-datos.js --forzar` una vez (las ediciones que se hubieran hecho a mano en ese archivo hay que pasarlas antes a `data/correcciones.js`).

### Cómo decide cada enlace (regeneración conservadora)

La estructura (ids de charla, qué partes tiene cada una, el orden, el año, el tema) sale **siempre del borrador**, nunca del canal. Para el enlace de cada parte, en este orden:

1. **Manual**: el que está en `data/correcciones.js` gana siempre. Ese video queda reservado: no se le asigna a otra parte.
2. **El que ya tenía**: si en el `data/charlas.js` actual la parte tenía un video y ese video **sigue en el canal**, se conserva aunque Agustina le haya cambiado el título (se informa como «título cambiado») y se actualizan las vistas.
3. **Título único**: un video libre cuyo título coincide **exactamente** (sin mirar mayúsculas, tildes ni puntuación); si hay varios iguales, solo si uno coincide en duración (±2 s).
4. **Si no**, la parte queda con `url: null` y aparece en el reporte de dudosos. **Nunca se asigna nada ambiguo ni aproximado**: los títulos parecidos solo se sugieren.

## El reporte de dudosos (`scripts/salida/reporte-cruce.md`)

Se escribe cada vez que se regenera. Secciones:

- **Partes sin enlace**: con el motivo (el video anterior ya no está en el canal; hay varios candidatos; hay uno parecido; ninguno coincide), los candidatos y el renglón listo para pegar en `data/correcciones.js` si el video correcto es el sugerido.
- **Enlaces manuales que no aparecen en la foto**: se respetan, pero conviene revisarlos (video no listado o borrado).
- **Videos nuevos o sin charla**: videos del canal que ninguna parte usa. Si es una charla nueva, se agrega en `data/charlas-nuevas.js`.
- **Enlaces conservados con título cambiado**, **asignadas por título** y **líneas inválidas** del archivo del canal.

## `scripts/salida/` no se sube a git

Todo lo que hay en `scripts/salida/` (la foto `canal.jsonl` y el reporte) se vuelve a generar y cambia cada vez que cambia el canal, así que `.gitignore` lo deja afuera (solo queda `.gitkeep` para que exista la carpeta). Lo que el sitio necesita de la foto queda guardado en `data/charlas.js`: los enlaces, las vistas, y en su cabecera la fecha de la foto y la cantidad de videos. Para volver a tener la carpeta completa en otra computadora, se obtiene `canal.jsonl` con el comando de arriba y se corre `node scripts/derivar-datos.js --comprobar` para verificar.
