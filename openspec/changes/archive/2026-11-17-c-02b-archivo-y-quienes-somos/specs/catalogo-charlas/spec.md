## MODIFIED Requirements

### Requirement: Extracción de disertante solo con alta confianza
La derivación SHALL completar `disertante` automáticamente solo cuando el título original de la primera parte, sin marcas de parte y con espacios colapsados, termina en un segmento separado por guion que empieza con un título profesional (Dr, Dra, Ing, Lic, Prof, Arq, Mg y variantes con punto) seguido de un nombre; en cualquier otro caso MUST dejar `[Disertante]`. El disertante se guarda sin esos títulos (pedido del Ateneo, 17/11/2026).

#### Scenario: Título profesional al final
- **WHEN** el título original es «RECICLADO QUIMICO DE RESIDUOS PLASTICOS - Dra Elangeni Gilbert»
- **THEN** `disertante` es «Elangeni Gilbert»

#### Scenario: Guion sin título profesional
- **WHEN** el título original es «LA PROPORCION AUREA - NATURALEZA Y MATEMÁTICA»
- **THEN** `disertante` es `[Disertante]`

#### Scenario: Nombre sin separador
- **WHEN** el título original es «TIROIDES Y ESTRÉS   SUSANA VALDEZ»
- **THEN** `disertante` es `[Disertante]` y `revisar` incluye `disertante`

#### Scenario: Dos títulos seguidos
- **WHEN** el título original termina en «- Dr Ing Miguel Tornello»
- **THEN** `disertante` es «Miguel Tornello»

## ADDED Requirements

### Requirement: Disertantes sin títulos honoríficos
Los disertantes que se muestran MUST NOT llevar títulos (Dr., Dra., Ing., Lic. y similares), ni los derivados del canal ni los del archivo del sitio viejo. Solo si el Ateneo lo indica para una eminencia, el título se carga a mano en `data/correcciones.js`, que manda sobre el catálogo.

#### Scenario: Catálogo regenerado
- **WHEN** se regenera `data/charlas.js`
- **THEN** ningún disertante empieza con un título profesional

#### Scenario: Excepción indicada por el Ateneo
- **WHEN** `data/correcciones.js` trae `disertante: "Dr. Nombre Apellido"` para una charla
- **THEN** la vista combinada muestra ese disertante tal cual
