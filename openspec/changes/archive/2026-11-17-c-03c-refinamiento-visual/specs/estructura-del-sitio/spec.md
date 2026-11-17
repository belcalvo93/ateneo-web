# Spec Delta

## MODIFIED Requirements

### Requirement: Estructura semántica común
Cada página SHALL mostrar un encabezado con el logo (con texto alternativo) y la navegación principal etiquetada, un `main` con su título `h1`, y el pie con el correo de contacto del Ateneo; la página actual MUST estar marcada en la navegación con `aria-current="page"`. El encabezado, la navegación y el pie provienen de la definición compartida del sitio. Las páginas no tienen barra superior propia: dentro de la web de la UTN FRM la cabecera de la facultad cumple ese papel.

#### Scenario: Página actual en Inicio
- **WHEN** se abre `index.html`
- **THEN** el enlace «Inicio» de la navegación tiene `aria-current="page"` y ningún otro enlace lo tiene

#### Scenario: Página actual en Videoteca
- **WHEN** se abre `videoteca.html`
- **THEN** el enlace «Videoteca» tiene `aria-current="page"` y ningún otro enlace lo tiene

#### Scenario: Página actual en Quiénes somos
- **WHEN** se abre `quienes-somos.html`
- **THEN** el enlace «Quiénes somos» tiene `aria-current="page"` y ningún otro enlace lo tiene

#### Scenario: Navegación entre páginas
- **WHEN** se activa en el menú el enlace a otra página desde cualquiera de las tres
- **THEN** se abre esa página

#### Scenario: Sin barra superior
- **WHEN** se abre cualquiera de las tres páginas
- **THEN** lo primero que se ve es la cabecera con el logo y el menú
