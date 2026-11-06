# Spec Delta

## Purpose

Define la hoja de estilos compartida del sitio del Ateneo: traduce el sistema de diseño aprobado a estilos reales, aislados bajo `.aac-web` para que el contenido conviva con la página anfitriona (Elementor) sin afectarla, y con una base accesible común a todas las páginas.

## ADDED Requirements

### Requirement: Tokens de diseño disponibles para las páginas
La hoja de estilos del sitio SHALL exponer, con los mismos nombres y valores, todas las variables definidas en `design-system/tokens.css` (rev. 1): color, tipografía, escala tipográfica, espaciado, ancho de contenido, radios, sombras, objetivo mínimo, foco y transición.

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

### Requirement: Tipografías de marca
El sitio SHALL cargar Dosis (títulos y menú), Open Sans (texto) y Baskervville (títulos del pie); si una fuente no carga, el texto MUST seguir legible con la familia genérica de respaldo.

#### Scenario: Títulos con Dosis
- **WHEN** se muestra un encabezado `h1`, `h2` o `h3` dentro de `.aac-web`
- **THEN** usa la familia Dosis

#### Scenario: Fuentes no disponibles
- **WHEN** Google Fonts no responde
- **THEN** el texto se muestra con `sans-serif` o `serif` según corresponda y la página sigue siendo usable

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
La hoja de estilos SHALL proveer estilos para la barra superior negra, la navegación principal (con indicador de página actual), los botones rojo, azul, blanco y de borde, y el pie negro, con el aspecto de `design-system/components.html` y de los mockups de `docs/mockups/`.

#### Scenario: Página actual en la navegación
- **WHEN** un enlace de la navegación está marcado como página actual (`aria-current="page"`)
- **THEN** se muestra en azul AAC con subrayado rojo, como en el mockup

#### Scenario: Botón de acción principal
- **WHEN** se muestra un botón de acción principal (por ejemplo, «Inscribirme por correo»)
- **THEN** es rojo AAC con texto blanco, y al pasar el mouse se oscurece con el mismo tono que en `components.html`

#### Scenario: Comparación visual con el design system
- **WHEN** se abre una página esqueleto junto a `design-system/components.html` a 390×844 y a 1440×900
- **THEN** la barra superior, la navegación, los botones y el pie coinciden en colores, tipografías, tamaños y espaciados
