# Decisiones y Supuestos

## Decisiones documentadas

### DD-01 — HTML/CSS/JS puro, sin build
**Decisión**: sin frameworks, bundler ni build. **Contexto**: se pegará en un widget HTML de Elementor y debe tener costo cero. **Alternativas**: React/Vite, generador estático. **Justificación**: portabilidad y mantenibilidad por no programadores. **Trade-offs**: más código manual; sin componentes reutilizables.

### DD-02 — Plataforma: widget HTML de Elementor (WordPress de la FRM)
**Decisión**: apuntar a Elementor; alternativa Google Sites (Insertar → Código). **Contexto**: la página será una sección de la web de la FRM (Elementor Pro 4.2). **Estado**: a confirmar en la reunión del 10/11.

### DD-03 — Datos separados del diseño
**Decisión**: charlas y próxima charla en archivo de datos fácil de editar. **Justificación**: el Ateneo debe actualizar sin programar (objetivo 5). **Pendiente**: formato final (JSON vs. bloque JS) según cómo se aloje en Elementor (ver `10`).

### DD-04 — Una ficha por charla con sus partes
**Decisión**: agrupar videos de una misma charla. **Contexto**: 310 videos ≈ 186 charlas; 104 charlas tienen más de un video.

### DD-05 — Ocho temas propuestos
**Decisión**: clasificación por título (propuesta), no validada por el Ateneo.

### DD-06 — Tests solo donde hay lógica
**Decisión**: `node:test` para buscador y filtro; sin dependencias extra. Indicado por la autora en el kickoff de la KB.

### DD-07 — Mockups aprobados son el contrato visual
El diseño final debe respetar `docs/mockups/` (inicio-escritorio, videoteca-escritorio, inicio-celular, logo-aac).

### DD-08 — Orden propuesto de changes (OpenSpec)
Propuesta de la autora: C-01 base-y-estilos, C-02 datos-charlas, C-03 portada, C-04 videoteca (TDD); el resto del mensaje se cortó. El roadmap lo formaliza `roadmap-generator`.

## Supuestos inferidos

### SU-01 — La sección se crea con cuentas de la facultad
**Origen**: PRD. **Riesgo si es falso**: no hay forma de publicar. **Validar**: reunión 10/11.

### SU-02 — El Ateneo aporta textos, logo e información de eventos
**Origen**: PRD. **Riesgo**: placeholders sin completar. **Validar**: pedir lista de insumos.

### SU-03 — Las miniaturas pueden derivarse de la URL de YouTube
**Origen**: inferencia (mockups muestran «Miniatura de YouTube»). **Riesgo**: dependencia de formato de URL externo/hotlinking. **Validar**: probar `img.youtube.com/vi/<id>/hqdefault.jpg` en el entorno WP.

### SU-04 — La mayoría de los visitantes llega desde el celular
**Origen**: PRD (mobile-first). **Validar**: analítica posterior si existe.

### SU-05 — Los años del borrador (`anio_aprox`) son aproximados
**Origen**: borrador («hace X años» al 06/11/2026). **Riesgo**: años incorrectos en fichas. **Validar**: revisión con el Ateneo.
