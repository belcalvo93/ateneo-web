---
name: Ateneo Amigos de la Ciencia
description: Sección de la web de la UTN FRM con la videoteca, la próxima charla y la historia del Ateneo.
colors:
  azul-ateneo: "#004B95"
  azul-ateneo-hover: "#003A73"
  rojo-ateneo: "#B90000"
  rojo-ateneo-hover: "#8F0000"
  llama: "#F5D547"
  negro-utn: "#000000"
  blanco: "#FFFFFF"
  papel-frio: "#F1F3F8"
  celeste-suave: "#EAF0F8"
  celeste-tema: "#DCE8F7"
  celeste-tema-hover: "#C7DAF1"
  noche-azul: "#0D2B50"
  tinta: "#1A1F26"
  tinta-suave: "#4A5560"
  niebla-sobre-negro: "#D5DAE1"
  filete: "#D9DEE6"
  filete-sobre-negro: "#3A3F47"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.5rem, 5.2vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.75rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  numeral:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2rem, 3.5vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1
  body:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  meta:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Dosis, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    letterSpacing: "0.04em"
rounded:
  sm: "8px"
  md: "12px"
  pill: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "24px"
  "6": "32px"
  "7": "48px"
  "8": "64px"
components:
  button-primary:
    backgroundColor: "{colors.rojo-ateneo}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.sm}"
    padding: "8px 24px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.rojo-ateneo-hover}"
  button-section:
    backgroundColor: "{colors.azul-ateneo}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.sm}"
    padding: "8px 24px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.azul-ateneo}"
    rounded: "{rounded.sm}"
    padding: "8px 24px"
    height: "44px"
  button-on-blue:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.azul-ateneo}"
    rounded: "{rounded.sm}"
    padding: "8px 24px"
    height: "44px"
  next-talk-card:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.md}"
    padding: "32px"
  duration-tag:
    backgroundColor: "{colors.negro-utn}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.sm}"
    padding: "0 8px"
---

# Design System: Ateneo Amigos de la Ciencia

> Generado el 17/11/2026 con `impeccable document` desde el código (design system revisión 2, change C-03c; actualizado a mano a la revisión 3, change C-02b). La fuente normativa de los valores es `design-system/tokens.css`; la referencia visual, `design-system/components.html`.

## Overview

**Creative North Star: "Editorial universitario"**

Un grupo de amigos que desde 2015 se junta los viernes a aprender, presentado con la voz de una publicación universitaria: institucional, elegante y cálida. La jerarquía la dan la tipografía y el espacio, no las cajas. Los títulos en una serif contemporánea dan el tono editorial; el texto, en la sans de la web de la UTN, se lee cómodo a 18 px. El sitio convive dentro de la web de la UTN Facultad Regional Mendoza y no compite con ella.

Sirve a dos públicos a la vez: los adultos mayores que ya participan (letra grande, contraste alto, pocos clics, nada escondido) y los jóvenes que llegan desde WhatsApp o Instagram con el celular. Lo moderno no viene de efectos sino de aire, orden y una sola cosa importante por pantalla: la próxima charla.

Rechazos confirmados por la autora: todo en cajas con borde y sombra, rayas de color arriba de las tarjetas, rótulos chicos encima de los títulos, franjas sueltas que parecen agregadas, verse «para viejos» o «para chicos».

**Key Characteristics:**
- Tres familias: Source Serif 4 (títulos), Dosis (menú y rótulos), Open Sans (texto).
- Sin cajas: espacio y filetes de 1 px separan los contenidos.
- Un solo elemento elevado por página: la tarjeta de la próxima charla.
- Azul del Ateneo como superficie del encabezado; rojo solo para la acción principal y los puestos.
- Todo objetivo táctil de 44 px o más, foco amarillo visible, contraste AA o mejor.

## Colors

Paleta institucional: el azul y el rojo del logo del Ateneo, el amarillo de su llama y el negro de la UTN, sobre blanco.

### Primary
- **Azul Ateneo** (#004B95): fondo del encabezado de cada página, enlaces, años de la línea de tiempo, cifras, nombre de los temas y botón de sección. Blanco sobre azul 8,6:1.

### Secondary
- **Rojo Ateneo** (#B90000): solo la acción principal («Inscribirme por correo»), el numeral de puesto de «Las más vistas» y el indicador de página actual del menú. Rojo sobre blanco 6,9:1.

### Tertiary
- **Llama** (#F5D547): la etiqueta «Próxima charla», la línea del horario sobre el azul (5,9:1), el anillo de foco y la selección de texto.

### Neutral
- **Blanco** (#FFFFFF): fondo general y tarjeta de la próxima charla.
- **Papel frío** (#F1F3F8): banda suave de temas y valores; es el único segundo fondo.
- **Tinta** (#1A1F26): texto (16:1 sobre blanco).
- **Tinta suave** (#4A5560): metadatos y notas (7,5:1 sobre blanco; 6,9:1 sobre papel frío).
- **Filete** (#D9DEE6): líneas de 1 px que separan filas, temas, hitos y valores.
- **Negro UTN** (#000000): fondo del pie y de la etiqueta de duración.
- **Niebla sobre negro** (#D5DAE1) y **Filete sobre negro** (#3A3F47): texto secundario y línea divisoria dentro del pie.
- **Noche azul** (#0D2B50): miniatura de charla sin imagen.

### Named Rules
**La regla del rojo escaso.** El rojo marca una sola acción por bloque (la inscripción) y el puesto de las más vistas. No se usa para decorar.

## Typography

**Display Font:** Source Serif 4 (con Georgia, serif)
**Body Font:** Open Sans (con sans-serif)
**Label Font:** Dosis (con sans-serif)

**Character:** una serif contemporánea de altura de x amplia y formas claras (I, l y 1 distintas) para lo que se lee como titular, contra la sans humanista de la UTN para todo lo que se lee de corrido. Dosis aparece solo donde conecta con la web de la facultad: el menú.

### Hierarchy
- **Display** (700, clamp(2.5rem, 5.2vw, 4rem), 1.12): título de la portada, blanco sobre azul.
- **Headline** (600, clamp(1.75rem, 3vw, 2.25rem), 1.12): títulos de página y de sección.
- **Title** (600, 1.375rem, 1.12): títulos de tarjeta, de hito y de valor; títulos del pie.
- **Numeral** (700, clamp(2rem, 3.5vw, 2.5rem), 1): años de la línea de tiempo, cifras y puestos.
- **Body** (400, 1.125rem, 1.6): texto, con un ancho de lectura de hasta 65 caracteres.
- **Meta** (400, 1rem, 1.6): disertante, año, partes, visualizaciones.
- **Label** (600, 1rem, 0.04em, mayúsculas solo en el menú): menú y tema de cada tarjeta.

### Named Rules
**La regla de la mayúscula contada.** Mayúscula espaciada solo en el menú y en la etiqueta «Próxima charla». Todo lo demás, en minúscula: se lee mejor.
**La regla de las líneas parejas.** Títulos con `text-wrap: balance` y párrafos con `text-wrap: pretty`: nada de palabras sueltas al final.

## Layout

Contenedor de 1200 px con 16 px de margen lateral. Las secciones se separan con `clamp(3rem, 7vw, 5rem)` de espacio vertical; más aire arriba de un título que abajo. Mobile-first, con el mismo orden de lectura en todos los tamaños.

- **Encabezado de la portada:** una columna en el celular; desde 1024 px, dos columnas (presentación 1.1fr, próxima charla 0.9fr) con 64 px de separación.
- **Tarjetas de charla:** grilla automática de columnas de 260 px como mínimo, con 48 px entre filas y 32 px entre columnas.
- **Temas:** 2 columnas, 4 desde 1024 px (8 temas hoy, 10 pronto).
- **Línea de tiempo:** año arriba en el celular; desde 720 px, columna de año de 11rem y texto al lado.
- **Valores:** una columna, dos desde 720 px.
- **Menú:** plegado detrás de «Menú» por debajo de 720 px.

## Elevation & Depth

El sistema es plano. La profundidad se marca con espacio, filetes de 1 px y un segundo fondo suave, nunca con sombras de tarjeta.

### Shadow Vocabulary
- **Elevada** (`box-shadow: 0 2px 4px rgba(0,0,0,.08), 0 18px 40px rgba(0,0,0,.22)`): solo la tarjeta de la próxima charla, sobre el azul del encabezado.
- **Suave** (`box-shadow: 0 6px 18px rgba(0,0,0,.12)`, rev. 3): solo mientras el cursor está sobre una tarjeta de charla, junto con una subida de 2 px; nunca en reposo.

### Named Rules
**La regla de lo único elevado.** Por página hay como mucho un elemento con sombra: el que la persona vino a buscar.

## Shapes

Radio de 12 px para miniaturas, fotos y la tarjeta de la próxima charla; 8 px para botones y etiquetas. Los bloques de texto no tienen caja ni radio. Las divisiones son filetes horizontales de 1 px; no hay rayas de color gruesas.

## Components

### Buttons
- **Shape:** 8 px de radio, 44 px de alto como mínimo, texto en Open Sans 700 de 16 px, centrado y con lugar para dos líneas.
- **Primary (rojo):** la acción principal de un bloque, «Inscribirme por correo». Hover: rojo oscuro (#8F0000).
- **Sección (azul):** la acción de una sección, «Proponer una charla», «Enviar mi propuesta».
- **Contorno:** blanco con borde y texto azul, para acciones secundarias sobre fondo claro (agendar, Zoom, aviso por WhatsApp, ver la videoteca).
- **Sobre azul:** blanco con texto azul y «borde» (transparente con borde blanco) en el encabezado.
- **Focus:** anillo amarillo de 3 px con contorno negro de 2 px, separado 2 px.

### Cards / Containers
- **Tarjeta de charla:** sin caja. Miniatura de 16:9 con 12 px de radio y la duración total en una etiqueta negra abajo a la derecha como único elemento encima; debajo, tema en Dosis azul, título en Source Serif sin subrayado y metadatos (disertante · fecha exacta, o el año si no se conoce). Toda la tarjeta es el enlace: el formato de tarjeta con miniatura dice que se abre; al pasar el cursor sube 2 px y el título pasa a azul (sin movimiento con `prefers-reduced-motion`). En «Las más vistas», el puesto es un numeral rojo junto al título, fuera de la imagen.
- **Próxima charla (componente distintivo):** blanco, 12 px de radio, 32 px de relleno, sombra elevada. Etiqueta amarilla «Próxima charla», título, datos separados por un filete, botón rojo de inscripción, botones de contorno opcionales (calendario, Zoom) y el aviso por WhatsApp a todo el ancho. Si la charla no está anunciada, dice «La próxima charla se anunciará pronto».

### Navigation
- **Cabecera:** blanca con un filete abajo, logo del Ateneo de 72 px de alto (56 px en el celular), menú de cuatro ítems en Dosis 600 mayúscula. Página actual en azul con subrayado rojo de 3 px.
- **Celular:** botón «Menú» con texto e ícono, 44 px; la lista se despliega empujando el contenido, un ítem por línea, y cierra con Escape.
- **Pie:** negro, títulos en Source Serif, enlaces blancos (amarillo al pasar el mouse) y una franja final con el logo oficial de la UTN en blanco y «Una actividad de la UTN Facultad Regional Mendoza».

### Temas
Cada tema es un bloque de enlace con fondo celeste suave (`--aac-celeste`) y 12 px de radio, sin bordes ni subrayado: nombre en Source Serif, gancho opcional y cantidad de charlas con una flecha «→» decorativa. Al pasar el mouse el fondo se oscurece (`--aac-celeste-hover`) y el nombre pasa a azul.

### Línea de tiempo y valores
Año grande en Source Serif azul, título del hito y texto, separados por filetes; sin puntos ni riel. Los valores siguen el mismo patrón: título y frase, en dos columnas.

## Do's and Don'ts

### Do:
- **Do** separar contenidos con espacio y filetes de 1 px (`--filete`).
- **Do** usar Source Serif 4 para todo título y Open Sans para todo texto corrido.
- **Do** mantener 44 px como alto mínimo de cualquier enlace o botón, incluso los que están dentro de un texto.
- **Do** dejar la próxima charla como lo primero útil de la portada y como único elemento con sombra.
- **Do** hacer reconocibles los enlaces sin depender solo del color: subrayado en el texto corrido; formato de tarjeta (miniatura o fondo celeste) y flecha «→» en las tarjetas.
- **Do** tomar colores, fuentes y espaciados solo de las variables de `design-system/tokens.css`.

### Don't:
- **Don't** usar cajas con borde y sombra para temas, valores o bloques de texto.
- **Don't** poner rayas de color gruesas arriba o al costado de un bloque.
- **Don't** poner un rótulo chico encima de un título.
- **Don't** superponer nada a una miniatura salvo la duración.
- **Don't** agregar una cuarta familia tipográfica ni volver a Baskervville.
- **Don't** redibujar el logo de la UTN: se usa el archivo oficial y el blanco se logra con CSS.
- **Don't** mostrar un dato incompleto entre corchetes al público.
