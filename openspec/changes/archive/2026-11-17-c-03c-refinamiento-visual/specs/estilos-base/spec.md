# Spec Delta

## MODIFIED Requirements

### Requirement: Tokens de diseño disponibles para las páginas
La hoja de estilos del sitio SHALL exponer, con los mismos nombres y valores, todas las variables definidas en `design-system/tokens.css` (rev. 2): color, tipografía, escala tipográfica, espaciado, ancho de contenido, radios, sombras, objetivo mínimo, foco y transición.

#### Scenario: Paridad con el design system
- **WHEN** se compara cada variable declarada en `design-system/tokens.css` con las declaradas por la hoja de estilos del sitio
- **THEN** cada variable existe con el mismo nombre y el mismo valor, sin variables de marca faltantes ni con valores distintos

#### Scenario: Componentes sin valores sueltos
- **WHEN** se revisan las reglas de componentes de la hoja de estilos
- **THEN** los colores, fuentes y espaciados se toman de variables y no aparecen valores hexadecimales, nombres de fuente ni medidas de espaciado escritos directamente en esas reglas

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

## ADDED Requirements

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

## REMOVED Requirements

### Requirement: Tipografías de marca
**Reason**: Baskervville deja el sitio (revisión 2 del design system, elegida por la autora el 17/11/2026): Source Serif 4 se lee mejor en el celular y distingue mejor I, l y 1, y los títulos dejan de ir en Dosis.
**Migration**: Se rige por «Tipografías del sitio»: Source Serif 4 para títulos, Dosis para el menú y los rótulos cortos, Open Sans para el texto.
