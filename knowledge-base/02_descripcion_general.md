# Descripción General

## Stack tecnológico

| Capa | Tecnología | Notas |
|---|---|---|
| Marcado | HTML5 puro | Sin frameworks |
| Estilos | CSS puro con variables (`:root`) | Identidad visual del PRD (ver `08`) |
| Lógica | JavaScript puro (ES modules NO: debe pegarse en un widget) | Sin bundler ni build |
| Datos | Archivo editable por no programadores (`charlas.json` + datos de próxima charla) | Separado del diseño |
| Tests | `node:test` (Node nativo) | Solo para buscador y filtro, sin dependencias |
| Tipografías | Google Fonts: Dosis, Open Sans, Baskervville | Las mismas de frm.utn.edu.ar |
| Hosting | WordPress + Elementor Pro 4.2 de la FRM (widget HTML) | Alternativa: Google Sites → Insertar → Código. A confirmar el 10/11 |
| Costo | Cero | RNF |

## Arquitectura general

Sitio estático del lado del cliente. No hay backend.

```
Archivos de datos (JSON)  ──►  JS puro (render + buscador/filtro)  ──►  DOM
        ▲                                                              ▲
 editados por el Ateneo                                   estilos.css (variables)
```

Desarrollo en local (este repo) → entrega pegando el código en el widget HTML de Elementor. Consecuencia: el código final debe funcionar **sin servidor propio** y tolerar vivir dentro de una página WordPress (ver `09` DD-02, DD-03 y riesgos en `10`).

## Páginas / estructura

- **Inicio**: hero, estadísticas (+100 conferencias desde 2017, 310 videos, viernes 18 hs), próxima charla, últimas charlas, explorar por tema, más vistas, Quiénes somos, Proponer una charla, pie con contacto/redes/dirección.
- **Videoteca**: buscador + chips de tema + grilla de fichas (una ficha por charla con sus partes).
- Menú: Inicio · Videoteca · Próxima charla · Quiénes somos · Proponer una charla · Contacto. Barra superior negra «UTN · Facultad Regional Mendoza».
- Mockups aprobados: `docs/mockups/` (inicio-escritorio, videoteca-escritorio, inicio-celular, logo-aac).

## Integraciones externas

| Servicio | Propósito | Tipo |
|---|---|---|
| YouTube (canal @ateneoamigosdelasciencias-2269) | Videos, miniaturas, playlists por tema | Enlaces / miniaturas por URL, sin API |
| Instagram, Facebook | Redes (gestionadas por otra becaria) | Enlaces (usuarios a confirmar) |
| Correo ateneoac.mo@gmail.com | Consultas, inscripción, propuestas | `mailto:` |
| Zoom | Modalidad virtual de la próxima charla | Enlace |
| Google Fonts | Tipografías | CSS remoto |
| Declaración de Principios (bit.ly/3ai4qQx) | Requisito de «Proponer una charla» | Enlace (vigencia a confirmar) |
| Logo UTN oficial (frm.utn.edu.ar/wp-content/uploads/2021/05/UTN_marca-negro-transparente2026.png) | Marca en cabecera/pie | Imagen remota |

## API REST

No aplica.
