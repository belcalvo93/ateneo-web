# estilos-base Specification

## Purpose

Define la hoja de estilos compartida del sitio del Ateneo: traduce el sistema de diseño aprobado a estilos reales, aislados bajo `.aac-web` para que el contenido conviva con la página anfitriona (Elementor) sin afectarla, y con una base accesible común a todas las páginas.

## Requirements

### Requirement: Tokens de diseño disponibles para las páginas
La hoja de estilos del sitio SHALL exponer, con los mismos nombres y valores, todas las variables definidas en `design-system/tokens.css` (rev. 2): color, tipografía, escala tipográfica, espaciado, ancho de contenido, radios, sombras, objetivo mínimo, foco y transición.

#### Scenario: Paridad con el design system
- **WHEN** se compara cada variable declarada en `design-system/tokens.css` con las declaradas por la hoja de estilos del sitio
- **THEN** cada variable existe con el mismo nombre y el mismo valor, sin variables de marca faltantes ni con valores distintos

#### Scenario: Componentes sin valores sueltos
- **WHEN** se revisan las reglas de componentes de la hoja de estilos
- **THEN** los colores, fuentes y espaciados se toman de variables y no aparecen valores hexadecimales, nombres de fuente ni medidas de espaciado escritos directamente en esas reglas

### Requirement: Aislamiento bajo el contenedor `.aac-web`
Todas las reglas que dan estilo a elementos SHALL aplicarse solo dentro de un elemento con la clase `.aac-web`; la hoja de estilos MUST NOT dar estilo a `html`, `body`, ni a selectores universales o de elemento fuera de ese contenedor.

#### Scenario: Página anfitriona intacta
- **WHEN** la hoja de estilos se carga en una página que tiene contenido fuera de `.aac-web`
- **THEN** ese contenido externo conserva su tipografía, colores, márgenes, foco y animaciones originales

#### Scenario: Contenido del Ateneo con estilo
- **WHEN** el contenido del sitio está envuelto en un elemento con la clase `.aac-web`
- **THEN** recibe la tipografía, colores y espaciados del design system

### Requirement: Letra base de 18 px
El texto corrido dentro de `.aac-web` SHALL mostrarse a 18 px (1.125rem con la raíz del navegador por defecto) en Open Sans, con interlineado 1.6; los metadatos MUST NOT bajar de 16 px.

#### Scenario: Tamaño de texto por defecto
- **WHEN** se inspecciona un párrafo dentro de `.aac-web` con la configuración por defecto del navegador
- **THEN** su tamaño calculado es 18 px y su familia es Open Sans

### Requirement: Foco visible
Todo elemento interactivo dentro de `.aac-web` SHALL mostrar al recibir foco por teclado un anillo amarillo (`--aac-llama`, 3 px) con contorno negro, distinguible sobre fondos claros y oscuros.

#### Scenario: Navegación con Tab
- **WHEN** la persona usuaria recorre con Tab los enlaces de la navegación, los botones y los enlaces del pie
- **THEN** cada elemento enfocado muestra el anillo de foco visible

#### Scenario: Foco sobre el pie negro
- **WHEN** un enlace del pie (fondo negro) recibe foco por teclado
- **THEN** el anillo amarillo se distingue claramente del fondo

### Requirement: Objetivos interactivos de al menos 44 px
Los enlaces de navegación, botones y enlaces del pie dentro de `.aac-web` SHALL tener un alto mínimo de 44 px.

#### Scenario: Alto de botones y enlaces de menú
- **WHEN** se mide el alto renderizado de un botón o un enlace de la navegación principal
- **THEN** es mayor o igual a 44 px

### Requirement: Movimiento reducido
Cuando el sistema operativo pide reducir el movimiento, las transiciones y animaciones dentro de `.aac-web` SHALL desactivarse, sin afectar las animaciones de la página anfitriona.

#### Scenario: Preferencia de movimiento reducido activa
- **WHEN** el navegador informa `prefers-reduced-motion: reduce`
- **THEN** los botones y enlaces dentro de `.aac-web` cambian de estado sin transición y el contenido fuera de `.aac-web` no se ve alterado

### Requirement: Componentes comunes con el aspecto aprobado
La hoja de estilos SHALL proveer estilos para la navegación principal (con indicador de página actual), los botones rojo, azul, blanco, de borde y de contorno, y el pie negro, con el aspecto de `design-system/components.html` (revisión 2).

#### Scenario: Página actual en la navegación
- **WHEN** un enlace de la navegación está marcado como página actual (`aria-current="page"`)
- **THEN** se muestra en azul AAC con subrayado rojo

#### Scenario: Botón de acción principal
- **WHEN** se muestra un botón de acción principal (por ejemplo, «Inscribirme por correo»)
- **THEN** es rojo AAC con texto blanco, y al pasar el mouse se oscurece con el mismo tono que en `components.html`

#### Scenario: Comparación visual con el design system
- **WHEN** se abre una página del sitio junto a `design-system/components.html` a 390×844 y a 1440×900
- **THEN** la navegación, los botones y el pie coinciden en colores, tipografías, tamaños y espaciados

### Requirement: Tipografías del sitio
El sitio SHALL cargar tres familias y ninguna otra: Source Serif 4 (títulos de página y de sección, títulos de tarjeta, años de la línea de tiempo, citas y títulos del pie), Dosis (menú y rótulos cortos) y Open Sans (texto). Si una fuente no carga, el texto MUST seguir legible con la familia genérica de respaldo.

#### Scenario: Títulos con Source Serif 4
- **WHEN** se muestra un encabezado `h1`, `h2` o `h3` dentro de `.aac-web`
- **THEN** usa la familia Source Serif 4

#### Scenario: Menú con Dosis
- **WHEN** se muestra un enlace del menú principal
- **THEN** usa la familia Dosis

#### Scenario: Sin Baskervville
- **WHEN** se revisan las fuentes que carga cualquier página del sitio
- **THEN** son solo Source Serif 4, Dosis y Open Sans

#### Scenario: Fuentes no disponibles
- **WHEN** Google Fonts no responde
- **THEN** el texto se muestra con `serif` o `sans-serif` según corresponda y la página sigue siendo usable

### Requirement: Líneas de texto balanceadas
Los títulos SHALL repartir sus palabras en líneas parejas y los párrafos MUST NOT terminar con una palabra sola en la última línea cuando el navegador lo permite, sin cortes manuales que se rompan en otros anchos.

#### Scenario: Título de dos líneas
- **WHEN** un título ocupa dos líneas
- **THEN** las dos líneas tienen un largo parecido

#### Scenario: Navegador sin soporte
- **WHEN** el navegador no soporta el balanceo de líneas
- **THEN** el texto se muestra con el corte habitual, sin errores ni texto superpuesto

### Requirement: Tinte celeste para superficies enlazables
`design-system/tokens.css` y `css/estilos.css` SHALL definir `--aac-celeste` (tinte muy claro de `--aac-azul`) y `--aac-celeste-hover` (algo más oscuro) para el fondo de las tarjetas de temas, y el texto que se apoya en ellos MUST cumplir contraste AA. El design system SHALL pasar a la revisión 3, pendiente de aprobación.

#### Scenario: Contraste sobre celeste
- **WHEN** se mide el texto de una tarjeta de tema sobre `--aac-celeste` y sobre `--aac-celeste-hover`
- **THEN** la relación de contraste es de al menos 4,5:1 en ambos casos

#### Scenario: Paridad de tokens
- **WHEN** se corre `npm test`
- **THEN** los tokens nuevos están en los dos archivos con los mismos valores
