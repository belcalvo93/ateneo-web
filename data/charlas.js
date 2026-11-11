/*
  ARCHIVO GENERADO — no editar a mano. Lo escribe scripts/derivar-datos.js a partir de data/charlas-borrador.json
  y de la lista de videos del canal; la próxima vez que se regenere, cualquier cambio hecho acá se pierde.
  Foto del canal de YouTube usada para los enlaces y las vistas: 06/11/2026 (310 videos).

  DÓNDE SE CORRIGE:
  - data/correcciones.js  → títulos, disertantes, temas, años, "destacada", enlaces de una parte y marcas de "revisar" confirmadas.
  - data/charlas-nuevas.js → charlas que no están en este catálogo.
  Las páginas juntan los tres archivos en el navegador (js/aplicar-correcciones.js); estos dos sí se editan a mano.

  AÑO APROXIMADO: el campo "anio" sale de «hace X años» al 06/11/2026, así que es aproximado.
  Se corrige en data/correcciones.js cuando el Ateneo confirme la fecha real.

  Cada charla tiene: id, titulo, disertante, tema (id de data/temas.js), anio, partes y revisar.
  - Lo que está entre corchetes, como [Título] o [Disertante], es un dato que falta completar.
  - "revisar" lista los campos dudosos hasta que se confirmen o corrijan en data/correcciones.js.
  - "url" en null = esa parte todavía no tiene enlace de YouTube.
  - "destacada": true (opcional, solo en data/correcciones.js) fija la charla como destacada en la portada.

  Para actualizar este archivo cuando cambie el canal:  node scripts/derivar-datos.js  (ver scripts/LEEME.md)
  Para comprobar que no se rompió nada:  node scripts/validar-datos.js
  Guía completa: data/LEEME.md
*/
window.AAC_CHARLAS = [
  {
    "id": "c001",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2026,
    "partes": [
      {
        "duracion": "1:10:57",
        "url": "https://www.youtube.com/watch?v=d_v55kzF01s",
        "vistas": 7,
        "titulo_original": "PINCELADAS  SANMARTINIANAS J.  M.  AMORETTI"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c002",
    "titulo": "RECICLADO QUIMICO DE RESIDUOS PLASTICOS",
    "disertante": "Dra Elangeni Gilbert",
    "tema": "agua-ambiente",
    "anio": 2026,
    "partes": [
      {
        "duracion": "31:40",
        "url": "https://www.youtube.com/watch?v=b2JqRwRXsZQ",
        "vistas": 15,
        "titulo_original": "RECICLADO QUIMICO DE RESIDUOS PLASTICOS - Dra Elangeni Gilbert"
      }
    ],
    "revisar": [
      "titulo"
    ]
  },
  {
    "id": "c003",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2026,
    "partes": [
      {
        "duracion": "1:30:17",
        "url": "https://www.youtube.com/watch?v=x84NX9WT9Fs",
        "vistas": 34,
        "titulo_original": "LA IH junto a la IA, Mesa Redonda"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c004",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2026,
    "partes": [
      {
        "duracion": "40:01",
        "url": "https://www.youtube.com/watch?v=onvEp1mFQH8",
        "vistas": 56,
        "titulo_original": "LA RAPIDEZ DEL TIEMPO"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c005",
    "titulo": "Módulo Habitacional y de Logística (HALO) - CHI",
    "disertante": "Ing Carlos Sisso",
    "tema": "espacio-astronomia",
    "anio": 2026,
    "partes": [
      {
        "duracion": "1:33:57",
        "url": "https://www.youtube.com/watch?v=R8fQ-mkctA8",
        "vistas": 24,
        "titulo_original": "Módulo Habitacional y de Logística (HALO) - CHI - Ing Carlos Sisso"
      }
    ],
    "revisar": []
  },
  {
    "id": "c006",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2026,
    "partes": [
      {
        "duracion": "1:09:06",
        "url": "https://www.youtube.com/watch?v=bwSAi1RjgDo",
        "vistas": 74,
        "titulo_original": "ENCUENTRO ENTRE NEURONA DE SILICIO Y LA NEURONA DE  CARBONO"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c007",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2026,
    "partes": [
      {
        "duracion": "54:43",
        "url": "https://www.youtube.com/watch?v=m70l9r2roB8",
        "vistas": 213,
        "titulo_original": "LA PROPORCION AUREA - NATURALEZA Y MATEMÁTICA"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c008",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2026,
    "partes": [
      {
        "duracion": "1:23:11",
        "url": "https://www.youtube.com/watch?v=PCASevNbMJI",
        "vistas": 83,
        "titulo_original": "BORGES LA FILOSOFÍA Y EL POEMA IMTELECTUAL"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c009",
    "titulo": "Ciencia y Tecnología para la Defensa en Argentina",
    "disertante": "Dr Pablo Bolcatto",
    "tema": "ia-tecnologia",
    "anio": 2026,
    "partes": [
      {
        "duracion": "58:48",
        "url": "https://www.youtube.com/watch?v=vKk7NEHRwqk",
        "vistas": 146,
        "titulo_original": "Ciencia y Tecnología para la Defensa en Argentina - Dr Pablo Bolcatto"
      }
    ],
    "revisar": []
  },
  {
    "id": "c010",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ingenieria-sismos",
    "anio": 2026,
    "partes": [
      {
        "duracion": "1:17:51",
        "url": "https://www.youtube.com/watch?v=W0nhRPIEn1w",
        "vistas": 45,
        "titulo_original": "ROTONDAS COMO EJE PRINCIPAL DE INTERSECCIÓN A NIVEL EN  MENDOZA Ing DANIEL NAVARRO"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c011",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2025,
    "partes": [
      {
        "duracion": "1:08:02",
        "url": "https://www.youtube.com/watch?v=OICWgKLIwbw",
        "vistas": 13,
        "titulo_original": "Envases desechados de agroquímicos  Ing Eduardo Vidal"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c012",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2025,
    "partes": [
      {
        "duracion": "1:03:15",
        "url": "https://www.youtube.com/watch?v=Fw5v_Z3fE7I",
        "vistas": 21,
        "titulo_original": "ENERGÍAS LIMPIAS por ALBERTO PATRIGNANI"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c013",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2025,
    "partes": [
      {
        "duracion": "40:02",
        "url": "https://www.youtube.com/watch?v=LVwABZeZwlM",
        "vistas": 20,
        "titulo_original": "El estudio de impacto ambiental como herramienta de gestión, una mirada"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c014",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2025,
    "partes": [
      {
        "duracion": "1:04:40",
        "url": "https://www.youtube.com/watch?v=-D5M-P2r3eE",
        "vistas": 32,
        "titulo_original": "ARQUITECTURA PATRIMONIAL DE MENDOZA"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c015",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2025,
    "partes": [
      {
        "duracion": "1:32:11",
        "url": "https://www.youtube.com/watch?v=D_N2cpQ_HdE",
        "vistas": 101,
        "titulo_original": "MINERÍA ACTUAL Y FUTURA GUILLERMO PENSADO"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c016",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2025,
    "partes": [
      {
        "duracion": "36:49",
        "url": "https://www.youtube.com/watch?v=WEIBBpXcOGo",
        "vistas": 193,
        "titulo_original": "RECORDANDO LA OBRA DE VÍCTOR DELHEZ"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c017",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2025,
    "partes": [
      {
        "duracion": "1:03:24",
        "url": "https://www.youtube.com/watch?v=UeoikI9QPto",
        "vistas": 1000,
        "titulo_original": "HIPÓTESIS  DE  RIEMANN"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c018",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2025,
    "partes": [
      {
        "duracion": "1:01:55",
        "url": "https://www.youtube.com/watch?v=DA8hioJ4-1U",
        "vistas": 44,
        "titulo_original": "MECÁNICA Y ÓPTICA   ACTUALIDAD"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c019",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2025,
    "partes": [
      {
        "duracion": "1:59:42",
        "url": "https://www.youtube.com/watch?v=h0bblqYJyd0",
        "vistas": 109,
        "titulo_original": "DIOS, ENTRE BORGES Y EL PAPA FRANCISCO"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c020",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2025,
    "partes": [
      {
        "duracion": "1:14:19",
        "url": "https://www.youtube.com/watch?v=4C1ckYl-xSk",
        "vistas": 26,
        "titulo_original": "Regresiones y Correlaciones Espurias en Economía Dr Hugo Balacco"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c021",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2025,
    "partes": [
      {
        "duracion": "39:03",
        "url": "https://www.youtube.com/watch?v=CNpg9WpLhQo",
        "vistas": 22,
        "titulo_original": "DE LAS  PSEUDOCIENCIAS"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c022",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2025,
    "partes": [
      {
        "duracion": "21:53",
        "url": "https://www.youtube.com/watch?v=cx7CR0Vq0ZQ",
        "vistas": 27,
        "titulo_original": "TIERRAS RARAS, SU RELEVANCIA"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c023",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2025,
    "partes": [
      {
        "duracion": "46:56",
        "url": "https://www.youtube.com/watch?v=M3n6OFJHxKk",
        "vistas": 17,
        "titulo_original": "LOS DOMINICOS Y LAS GUERRAS POR LA INDEPENDENCIA"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c024",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2025,
    "partes": [
      {
        "duracion": "1:08:18",
        "url": "https://www.youtube.com/watch?v=2VbPGNLs2Gc",
        "vistas": 11,
        "titulo_original": "COACHING ONTOLÓGICO"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c025",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2025,
    "partes": [
      {
        "duracion": "1:22:05",
        "url": "https://www.youtube.com/watch?v=D69u3CBg1NE",
        "vistas": 31,
        "titulo_original": "LA IA DESCIFRÓ EL CÓDIGO GENÉTICO Y ACCEDIERON AL PREMIO NOBEL"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c026",
    "titulo": "Etica en las Geociencias y controles en la Minería",
    "disertante": "Dra Marita Ahumada",
    "tema": "geologia",
    "anio": 2025,
    "partes": [
      {
        "duracion": "1:03:11",
        "url": "https://www.youtube.com/watch?v=K0bk3R-Dok0",
        "vistas": 41,
        "titulo_original": "Etica en las Geociencias y controles en la Minería - Dra Marita Ahumada"
      }
    ],
    "revisar": []
  },
  {
    "id": "c027",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "espacio-astronomia",
    "anio": 2025,
    "partes": [
      {
        "duracion": "53:26",
        "url": "https://www.youtube.com/watch?v=oNtbphqqjTg",
        "vistas": 27,
        "titulo_original": "CONVERSANDO CON O.  PEINADO SOBRE VIAJES ESPACIALES, Parte I"
      },
      {
        "duracion": "23:22",
        "url": "https://www.youtube.com/watch?v=DNtxv0qUh2k",
        "vistas": 52,
        "titulo_original": "CONVERSANDO CON O.  PEINADO SOBRE VIAJES ESPACIALES II"
      }
    ],
    "revisar": [
      "titulo",
      "disertante",
      "partes"
    ]
  },
  {
    "id": "c028",
    "titulo": "La Evolucion del uso de los metales y el desarrollo Humano",
    "disertante": "Ing Pablo Rolando",
    "tema": "geologia",
    "anio": 2025,
    "partes": [
      {
        "duracion": "57:55",
        "url": "https://www.youtube.com/watch?v=7ydGS3eNWNg",
        "vistas": 157,
        "titulo_original": "La Evolucion del uso de los metales y el desarrollo Humano - Ing Pablo Rolando"
      }
    ],
    "revisar": []
  },
  {
    "id": "c029",
    "titulo": "Panorámica del mundo psíquico III: Relaciones transaccionales",
    "disertante": "Dr Raul Rivarola",
    "tema": "neurociencia-salud",
    "anio": 2024,
    "partes": [
      {
        "duracion": "1:30:49",
        "url": "https://www.youtube.com/watch?v=Fx-qlPOLwzA",
        "vistas": 39,
        "titulo_original": "Panorámica del mundo psíquico III: Relaciones transaccionales - Dr Raul Rivarola"
      }
    ],
    "revisar": []
  },
  {
    "id": "c030",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2024,
    "partes": [
      {
        "duracion": "51:34",
        "url": "https://www.youtube.com/watch?v=6mxOkKuAAg8",
        "vistas": 88,
        "titulo_original": "VACA MUERTA : ROBERTO BARRIOS, PARTE 1"
      },
      {
        "duracion": "12:02",
        "url": "https://www.youtube.com/watch?v=4C9C_E49L_0",
        "vistas": 35,
        "titulo_original": "VACA MUERTA: ROBERTO BARRIOS PARTE 2 (INTERCAMBIO)"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c031",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2024,
    "partes": [
      {
        "duracion": "43:59",
        "url": "https://www.youtube.com/watch?v=6W_oF56WfJ0",
        "vistas": 76,
        "titulo_original": "Bernardo Parizek: Permisos Ambientales en Minería Metalífera"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c032",
    "titulo": "NEURONAS: La última frontera de las Neurociencias",
    "disertante": "Dra Alicia Seltzer",
    "tema": "neurociencia-salud",
    "anio": 2024,
    "partes": [
      {
        "duracion": "1:12:47",
        "url": "https://www.youtube.com/watch?v=GqCoYwlxSa0",
        "vistas": 59,
        "titulo_original": "NEURONAS: La última frontera de las Neurociencias - Dra Alicia Seltzer"
      }
    ],
    "revisar": []
  },
  {
    "id": "c033",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2024,
    "partes": [
      {
        "duracion": "1:17:09",
        "url": "https://www.youtube.com/watch?v=O_CiFU43Q1Y",
        "vistas": 69,
        "titulo_original": "ECONOMÍA PARA NO ECONOMISTAS"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c034",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2024,
    "partes": [
      {
        "duracion": "47:13",
        "url": "https://www.youtube.com/watch?v=v0ODazRPdb8",
        "vistas": 62,
        "titulo_original": "ELIANA CONCI:   EUTROFIZACIÓN REGIONAL, IMPACTO DE LOS NUTRIENTES EN CUERPOS DE AGUA Y SUELOS"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c035",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ingenieria-sismos",
    "anio": 2024,
    "partes": [
      {
        "duracion": "49:44",
        "url": "https://www.youtube.com/watch?v=JtOtPDcO0d8",
        "vistas": 45,
        "titulo_original": "Cuando sopla el viento ¿se pueden pueden evitar daños en las construcciones? Ing Gustavo C Balbastro"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c036",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2024,
    "partes": [
      {
        "duracion": "1:09:02",
        "url": "https://www.youtube.com/watch?v=9Lss4FKmME0",
        "vistas": 78,
        "titulo_original": "BORGES ANTE EL ESPEJO DE LA PATRIA"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c037",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2024,
    "partes": [
      {
        "duracion": "56:17",
        "url": "https://www.youtube.com/watch?v=CflHgoWL0Cs",
        "vistas": 38,
        "titulo_original": "A.DALMASSO: Investigación aplicada en el uso de la flora nativa y dificultades en su transferencia"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c038",
    "titulo": "Panorama del Psiquismo II - Los estados del Yo",
    "disertante": "Dr Raul Rivarola",
    "tema": "neurociencia-salud",
    "anio": 2024,
    "partes": [
      {
        "duracion": "1:08:06",
        "url": "https://www.youtube.com/watch?v=l0QwWUwH_XA",
        "vistas": 93,
        "titulo_original": "Panorama del Psiquismo II - Los estados del Yo - Dr Raul Rivarola"
      }
    ],
    "revisar": []
  },
  {
    "id": "c039",
    "titulo": "Introducción a las redes neuronales con aprendizaje profundo",
    "disertante": "Dr Diego Milone",
    "tema": "ia-tecnologia",
    "anio": 2024,
    "partes": [
      {
        "duracion": "1:14:52",
        "url": "https://www.youtube.com/watch?v=ybz4qERiQ7E",
        "vistas": 109,
        "titulo_original": "Introducción a las redes neuronales con aprendizaje profundo - Dr Diego Milone"
      }
    ],
    "revisar": []
  },
  {
    "id": "c040",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2024,
    "partes": [
      {
        "duracion": "1:04:59",
        "url": "https://www.youtube.com/watch?v=YBW2v0kdlG8",
        "vistas": 67,
        "titulo_original": "RESEÑA ARQUEOLÓGICA E HISTORIA COLONIAL DE MENDOZA"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c041",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "espacio-astronomia",
    "anio": 2024,
    "partes": [
      {
        "duracion": "26:10",
        "url": "https://www.youtube.com/watch?v=nr7_r1Fj_QQ",
        "vistas": 79,
        "titulo_original": "Misiones actuales y futuras a la luna; Osvaldo Peinado."
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c042",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2024,
    "partes": [
      {
        "duracion": "1:02:35",
        "url": "https://www.youtube.com/watch?v=fVpEoXlE5P0",
        "vistas": 33,
        "titulo_original": "La etnobotánica  Su relación con la fitomedicina en ambientes urbanos  Dr. E. Martínez Carretero"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c043",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2024,
    "partes": [
      {
        "duracion": "52:20",
        "url": "https://www.youtube.com/watch?v=_EuZF9cKS1M",
        "vistas": 40,
        "titulo_original": "IMPACTO CERO: El desafío de producir y consumir alimentos sin pérdidas ni desperdicios"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c044",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2024,
    "partes": [
      {
        "duracion": "24:57",
        "url": "https://www.youtube.com/watch?v=PXsL_pLR89Y",
        "vistas": 12,
        "titulo_original": "LA IA NOS TRAERÁ MAYOR FELICIDAD ???"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c045",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2024,
    "partes": [
      {
        "duracion": "57:41",
        "url": "https://www.youtube.com/watch?v=CZxM5IqTImM",
        "vistas": 55,
        "titulo_original": "TIROIDES Y ESTRÉS   SUSANA VALDEZ"
      },
      {
        "duracion": "8:19",
        "url": "https://www.youtube.com/watch?v=_aXxGOgGl2E",
        "vistas": 14,
        "titulo_original": "TIROIDES Y ESTRÉS SUSANA VALDEZ PARTE II"
      }
    ],
    "revisar": [
      "titulo",
      "disertante",
      "partes"
    ]
  },
  {
    "id": "c046",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ingenieria-sismos",
    "anio": 2024,
    "partes": [
      {
        "duracion": "40:21",
        "url": "https://www.youtube.com/watch?v=-dz-2DwRAlM",
        "vistas": 218,
        "titulo_original": "AMPLIFICACIÓN DEL MOVIMIENTO SÍSMICO   EMILCE  GIOLO"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c047",
    "titulo": "Panorama del psiquismo I - Niveles de conciencia",
    "disertante": "Dr Raul E. Rivarola",
    "tema": "neurociencia-salud",
    "anio": 2024,
    "partes": [
      {
        "duracion": "44:48",
        "url": "https://www.youtube.com/watch?v=19L-Ykqs8_w",
        "vistas": 107,
        "titulo_original": "Panorama del psiquismo I - Niveles de conciencia - Dr Raul E. Rivarola - primera parte"
      }
    ],
    "revisar": []
  },
  {
    "id": "c048",
    "titulo": "Panorámica del psiquismo I - Niveles de conciencia",
    "disertante": "Dr Raul E. Rivarola",
    "tema": "neurociencia-salud",
    "anio": 2024,
    "partes": [
      {
        "duracion": "42:24",
        "url": "https://www.youtube.com/watch?v=0bZ-Uj8QDbM",
        "vistas": 60,
        "titulo_original": "Panorámica del psiquismo I - Niveles de conciencia - Dr Raul E. Rivarola - Parte 2"
      }
    ],
    "revisar": []
  },
  {
    "id": "c049",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2024,
    "partes": [
      {
        "duracion": "1:02:48",
        "url": "https://www.youtube.com/watch?v=ilCT97g-t5U",
        "vistas": 273,
        "titulo_original": "PLAN PILARES  MENDOZA   GUILLERMO  PENSADO PARTE 1"
      },
      {
        "duracion": "44:28",
        "url": "https://www.youtube.com/watch?v=kX-RQjILVa4",
        "vistas": 71,
        "titulo_original": "PLAN PILARES  MENDOZA   GUILLERMO  PENSADO PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c050",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2024,
    "partes": [
      {
        "duracion": "1:08:04",
        "url": "https://www.youtube.com/watch?v=X4myFHFLmM0",
        "vistas": 43,
        "titulo_original": "Concurso internacional de robótica en Singapur - SUBCAMPEONES alumnos de escuela Tomas A Edison."
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c051",
    "titulo": "De máquinas a vapora los trenes eléctricos",
    "disertante": "Arq Graciela Moretti",
    "tema": "ingenieria-sismos",
    "anio": 2024,
    "partes": [
      {
        "duracion": "1:03:11",
        "url": "https://www.youtube.com/watch?v=gi7E3yL3IAM",
        "vistas": 70,
        "titulo_original": "De máquinas a vapora los trenes eléctricos - Arq Graciela Moretti - Parte 1"
      }
    ],
    "revisar": []
  },
  {
    "id": "c052",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ingenieria-sismos",
    "anio": 2024,
    "partes": [
      {
        "duracion": "30:09",
        "url": "https://www.youtube.com/watch?v=pOcfsR3-uHk",
        "vistas": 37,
        "titulo_original": "De máquinas a vapor a los trenes eléctricos Arq Graciela Moretti - Parte 2 - Preguntas y comentarios"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c053",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2024,
    "partes": [
      {
        "duracion": "1:10:56",
        "url": "https://www.youtube.com/watch?v=ecDP62p1d40",
        "vistas": 292,
        "titulo_original": "APROVECHAMIENTO INTEGRAL DEL RÍO MENDOZA: EMBALSE POTRERILLOS PARTE 1"
      },
      {
        "duracion": "30:51",
        "url": "https://www.youtube.com/watch?v=mD_E0TFCGUM",
        "vistas": 49,
        "titulo_original": "APROVECHAMIENTO INTEGRAL DEL RÍO MENDOZA: PROYECTO POTRERILLOS PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c054",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2024,
    "partes": [
      {
        "duracion": "1:06:44",
        "url": "https://www.youtube.com/watch?v=OqsplaL6QCU",
        "vistas": 73,
        "titulo_original": "LA CUARTA REVOLUCIÓN INDUSTRIAL Y LA NANOTECNOLOGÍA PARTE 1"
      },
      {
        "duracion": "17:05",
        "url": "https://www.youtube.com/watch?v=sgcdwlB0wwE",
        "vistas": 22,
        "titulo_original": "LA CUARTA REVOLUCIÓN INDUSTRIAL Y LA NANOTECNOLOGÍA PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c055",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2024,
    "partes": [
      {
        "duracion": "44:08",
        "url": "https://www.youtube.com/watch?v=LaPBGdipZGg",
        "vistas": 54,
        "titulo_original": "CUATRO PROBLEMAS DE LA HISTORIA ECONÓMICA DE MENDOZA"
      },
      {
        "duracion": "57:13",
        "url": "https://www.youtube.com/watch?v=33tPc2xR7Js",
        "vistas": 54,
        "titulo_original": "CUATRO PROBLEMAS DE LA HISTORIA ECONÓMICA DE MENDOZA"
      }
    ],
    "revisar": [
      "titulo",
      "disertante",
      "partes"
    ]
  },
  {
    "id": "c056",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2024,
    "partes": [
      {
        "duracion": "57:45",
        "url": "https://www.youtube.com/watch?v=Ctaz70pnhyw",
        "vistas": 42,
        "titulo_original": "ERRORES NUÉRICOS Y ALGUNOS DESASTRES OCASIONADOS POR ELLOS, PARTE 1"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c057",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2024,
    "partes": [
      {
        "duracion": "31:14",
        "url": "https://www.youtube.com/watch?v=IYeEYtY9eCs",
        "vistas": 102,
        "titulo_original": "ERRORES NUMÉRICOS Y ALGNOS DESASTRES OCASIONADOS POR ELLOS, parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c058",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2024,
    "partes": [
      {
        "duracion": "59:16",
        "url": "https://www.youtube.com/watch?v=MLr-wITCPdc",
        "vistas": 73,
        "titulo_original": "Adolfo Anunziata - Intelilgencia Artificial: Oportunidades, Amenazas, Etica y Derecho - Parte 1"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c059",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2024,
    "partes": [
      {
        "duracion": "43:13",
        "url": "https://www.youtube.com/watch?v=Nsm8LfM0fg0",
        "vistas": 61,
        "titulo_original": "Adolfo Anunziata - Inteligencia Artificial : Oportunidades, Amenazas, Ética y Derecho -   PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c060",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2024,
    "partes": [
      {
        "duracion": "1:01:22",
        "url": "https://www.youtube.com/watch?v=_hsiyODK2gQ",
        "vistas": 13,
        "titulo_original": "ROL DE LAS MUJERES EN MINERÍA PARTE 1"
      },
      {
        "duracion": "40:08",
        "url": "https://www.youtube.com/watch?v=BC9gEQAvIzw",
        "vistas": 17,
        "titulo_original": "ROL DE LAS MUJERES EN MINERÍA PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c061",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2023,
    "partes": [
      {
        "duracion": "1:27:10",
        "url": "https://www.youtube.com/watch?v=VZ5fGG2egUo",
        "vistas": 91,
        "titulo_original": "MECANISMOS DE DEFENSA, JUAN SAMAT"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c062",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2023,
    "partes": [
      {
        "duracion": "27:17",
        "url": "https://www.youtube.com/watch?v=L5bASPths7c",
        "vistas": 32,
        "titulo_original": "MECANISMOS DE DEFENSA"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c063",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2023,
    "partes": [
      {
        "duracion": "1:33:01",
        "url": "https://www.youtube.com/watch?v=VA3B0jDUvMM",
        "vistas": 24,
        "titulo_original": "GENERACIÓN FOTOVOLTAICA PARTE 1"
      },
      {
        "duracion": "38:06",
        "url": "https://www.youtube.com/watch?v=7atb64LKH-c",
        "vistas": 5,
        "titulo_original": "GENERACIÓN FOTOVOLTAICA PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c064",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2023,
    "partes": [
      {
        "duracion": "1:05:40",
        "url": "https://www.youtube.com/watch?v=9mpMBoC2CRM",
        "vistas": 56,
        "titulo_original": "ORDEN Y CAOS E. SERDOCH,   PARTE 2:   VIDEOS"
      },
      {
        "duracion": "22:55",
        "url": "https://www.youtube.com/watch?v=bg7AwdXwtF8",
        "vistas": 17,
        "titulo_original": "ORDEN Y CAOS E. SERDOCH   PARTE 3: DEBATE"
      }
    ],
    "revisar": [
      "titulo",
      "disertante",
      "partes"
    ]
  },
  {
    "id": "c065",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2023,
    "partes": [
      {
        "duracion": "59:27",
        "url": "https://www.youtube.com/watch?v=pIHY3SnZs5A",
        "vistas": 50,
        "titulo_original": "ORDEN Y CAOS, Eduardo S. SERDOCH,   PARTE 1"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c066",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ingenieria-sismos",
    "anio": 2023,
    "partes": [
      {
        "duracion": "59:42",
        "url": "https://www.youtube.com/watch?v=Wzx-NCn456A",
        "vistas": 374,
        "titulo_original": "La gestión integral del riesgo en Argentina. Avances en la reducción del riesgo sísmico. Parte 1."
      },
      {
        "duracion": "39:02",
        "url": "https://www.youtube.com/watch?v=aPWlKEh9fyw",
        "vistas": 21,
        "titulo_original": "La gestión integral del riesgo en Argentina. Avances en ... Parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c067",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2023,
    "partes": [
      {
        "duracion": "50:11",
        "url": "https://www.youtube.com/watch?v=69IIt_vADhs",
        "vistas": 15,
        "titulo_original": "Mendoza sostenible Reverdecer la ciudad. La idea de la gran manzana. Parte1"
      },
      {
        "duracion": "46:33",
        "url": "https://www.youtube.com/watch?v=a1gFZCGaNM4",
        "vistas": 8,
        "titulo_original": "Mendoza sostenible Reverdecer la ciudad. La idea de la gran manzana Parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c068",
    "titulo": "PROYECTOS ESPACIALES DE LA UNION EUROPEA",
    "disertante": "Ing Osvaldo Peinado",
    "tema": "espacio-astronomia",
    "anio": 2023,
    "partes": [
      {
        "duracion": "46:11",
        "url": "https://www.youtube.com/watch?v=ikzLgL7POx4",
        "vistas": 25,
        "titulo_original": "PROYECTOS ESPACIALES DE LA UNION EUROPEA - Ing Osvaldo Peinado -  Primera parte"
      },
      {
        "duracion": "1:05:27",
        "url": "https://www.youtube.com/watch?v=RAvtXdJX3sY",
        "vistas": 21,
        "titulo_original": "PROYECTOS ESPACIALES DE LA UNION EUROPEA - Ing Osvaldo Peinado - Segunda parte"
      }
    ],
    "revisar": [
      "titulo"
    ]
  },
  {
    "id": "c069",
    "titulo": "Historia y futuro del Agua Subterránea, el gigante oculto",
    "disertante": "Ing Armando Llop",
    "tema": "agua-ambiente",
    "anio": 2023,
    "partes": [
      {
        "duracion": "58:40",
        "url": "https://www.youtube.com/watch?v=VNW-h0Mb1Jw",
        "vistas": 66,
        "titulo_original": "Historia y futuro del Agua Subterránea, el gigante oculto - Ing Armando Llop"
      }
    ],
    "revisar": []
  },
  {
    "id": "c070",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2023,
    "partes": [
      {
        "duracion": "1:14:17",
        "url": "https://www.youtube.com/watch?v=FHUrj8WyLag",
        "vistas": 152,
        "titulo_original": "DATACIÓN DE MINERALES PARTE 1"
      },
      {
        "duracion": "18:23",
        "url": "https://www.youtube.com/watch?v=gxgHgcbWJ7o",
        "vistas": 36,
        "titulo_original": "DATACIÓN DE MINERALES PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c071",
    "titulo": "Sinapsis Nerviosa",
    "disertante": "Dra Alicia Seltzer",
    "tema": "neurociencia-salud",
    "anio": 2023,
    "partes": [
      {
        "duracion": "1:30:14",
        "url": "https://www.youtube.com/watch?v=JrrNT75sQTQ",
        "vistas": 52,
        "titulo_original": "Sinapsis Nerviosa - Dra Alicia Seltzer - parte 1"
      },
      {
        "duracion": "36:27",
        "url": "https://www.youtube.com/watch?v=OqiR4HhcYog",
        "vistas": 27,
        "titulo_original": "Sinapsis Nerviosa - Dra Alicia Seltzer - parte 2 - Preguntas y comentarios"
      }
    ],
    "revisar": []
  },
  {
    "id": "c072",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2023,
    "partes": [
      {
        "duracion": "1:26:22",
        "url": "https://www.youtube.com/watch?v=UgqcI1s6CKc",
        "vistas": 114,
        "titulo_original": "LA CRIPTOGRAFÍA CUÁNTICA  PARTE  1"
      },
      {
        "duracion": "30:48",
        "url": "https://www.youtube.com/watch?v=EXMz8C40KW8",
        "vistas": 14,
        "titulo_original": "LA CRIPTOGRAFÍA CUÁNTICA  PARTE  2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c073",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2023,
    "partes": [
      {
        "duracion": "1:02:29",
        "url": "https://www.youtube.com/watch?v=tsh3kOxC9Xs",
        "vistas": 97,
        "titulo_original": "RADIACIONES NO IONIZANTES   ING. JOSÉ  BALACCO   PARTE 1"
      },
      {
        "duracion": "18:29",
        "url": "https://www.youtube.com/watch?v=t5xUxXfTBB8",
        "vistas": 32,
        "titulo_original": "RADIACIONES NO IONIZANTES   ING JOSÉ  BALACCO   PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c074",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2023,
    "partes": [
      {
        "duracion": "46:43",
        "url": "https://www.youtube.com/watch?v=4Qy9gfVc7gs",
        "vistas": 66,
        "titulo_original": "ELABORACIÓN DE VINOS TINTOS DE CALIDAD SUPERIOR   PARTE 1"
      },
      {
        "duracion": "17:19",
        "url": "https://www.youtube.com/watch?v=ercRhd2tYkk",
        "vistas": 15,
        "titulo_original": "ELABORACIÓN DE VINOS TINTOS DE CALIDAD SUPERIOR PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c075",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2023,
    "partes": [
      {
        "duracion": "35:57",
        "url": "https://www.youtube.com/watch?v=J_5aay52gKw",
        "vistas": 59,
        "titulo_original": "herramientas de IA para investigación en bioingeniería -Ciro Edgardo Romero - Ignacio Bosch-parte 1"
      },
      {
        "duracion": "47:07",
        "url": "https://www.youtube.com/watch?v=o5mRHlgWiZ8",
        "vistas": 32,
        "titulo_original": "Herramientas de IA para investigación en bioingeniería-Ciro Edgardo Romero - Ignacio Bosch - 2 parte"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c076",
    "titulo": "Respuestas para el riesgo sísmico en Mendoza",
    "disertante": "Dr Ing Miguel Tornello",
    "tema": "ingenieria-sismos",
    "anio": 2023,
    "partes": [
      {
        "duracion": "56:02",
        "url": "https://www.youtube.com/watch?v=DjYGIFSKJ4M",
        "vistas": 58,
        "titulo_original": "Respuestas para el riesgo sísmico en Mendoza -  Dr Ing Miguel Tornello - Primera parte"
      },
      {
        "duracion": "40:47",
        "url": "https://www.youtube.com/watch?v=45YwzZ8YHYQ",
        "vistas": 19,
        "titulo_original": "Respuestas para el riesgo sísmico en Mendoza -  Dr Ing Miguel Tornello - Segunda parte"
      }
    ],
    "revisar": []
  },
  {
    "id": "c077",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2023,
    "partes": [
      {
        "duracion": "46:33",
        "url": "https://www.youtube.com/watch?v=9gp7MJbVdr8",
        "vistas": 297,
        "titulo_original": "Minerales Críticos y Estratégicos   Guillermo Pensado PARTE 1"
      },
      {
        "duracion": "28:55",
        "url": "https://www.youtube.com/watch?v=Czal_NUCEg8",
        "vistas": 74,
        "titulo_original": "Minerales Críticos y Estratégicos , Guillermo Pensado: PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c078",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2023,
    "partes": [
      {
        "duracion": "1:23:30",
        "url": "https://www.youtube.com/watch?v=aKHmSboPZpk",
        "vistas": 15,
        "titulo_original": "SEGURIDAD INDUSTRIAL   A  PÉREZ RAFFAELLI PARTE 1"
      },
      {
        "duracion": "30:56",
        "url": "https://www.youtube.com/watch?v=6xGSw8fKfSE",
        "vistas": 15,
        "titulo_original": "SEGURIDAD INDUSTRIAL   A  PÉREZ RAFFAELLI PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c079",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2023,
    "partes": [
      {
        "duracion": "37:17",
        "url": "https://www.youtube.com/watch?v=ycTYVcE_Gfo",
        "vistas": 100,
        "titulo_original": "INTELIGENCIA  ARTIFICIAL  NICOLÁS  BUSTOS,  PARTE 1"
      },
      {
        "duracion": "24:24",
        "url": "https://www.youtube.com/watch?v=4JG5tTKf_RE",
        "vistas": 49,
        "titulo_original": "INTELIGENCIA  ARTIFICIAL  NICOLÁS  BUSTOS, PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c080",
    "titulo": "Agua y Recursos naturales",
    "disertante": "Ing Alejandro Drovandi",
    "tema": "agua-ambiente",
    "anio": 2023,
    "partes": [
      {
        "duracion": "57:46",
        "url": "https://www.youtube.com/watch?v=uENlo4ECGUM",
        "vistas": 17,
        "titulo_original": "Agua y Recursos naturales - Ing Alejandro Drovandi"
      }
    ],
    "revisar": []
  },
  {
    "id": "c081",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2023,
    "partes": [
      {
        "duracion": "1:00:51",
        "url": "https://www.youtube.com/watch?v=bk5JEcgfpfo",
        "vistas": 71,
        "titulo_original": "Bio-nanotecnología : por qué y para qué"
      },
      {
        "duracion": "19:55",
        "url": "https://www.youtube.com/watch?v=nfNk-k2EGz4",
        "vistas": 42,
        "titulo_original": "Bio-nanotecnología : por qué y para qué"
      }
    ],
    "revisar": [
      "titulo",
      "disertante",
      "partes"
    ]
  },
  {
    "id": "c082",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2023,
    "partes": [
      {
        "duracion": "56:29",
        "url": "https://www.youtube.com/watch?v=4pbMcjM_3ls",
        "vistas": 99,
        "titulo_original": "INTELIGENCIA  ARTIFICIAL     A  SALASSA PARTE 1"
      },
      {
        "duracion": "37:37",
        "url": "https://www.youtube.com/watch?v=BG247ZnV1aE",
        "vistas": 33,
        "titulo_original": "INTELIGENCIA  ARTIFICIAL     A  SALASSA PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c083",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2023,
    "partes": [
      {
        "duracion": "51:14",
        "url": "https://www.youtube.com/watch?v=g1qR7Jji93E",
        "vistas": 71,
        "titulo_original": "ANTONIO ÁLVAREZ  ABRIL  ATENCIÓN MEMORIA Y NEUROTECNOLOGÍA  PARTE 1"
      },
      {
        "duracion": "57:57",
        "url": "https://www.youtube.com/watch?v=UrVegCSYVSc",
        "vistas": 51,
        "titulo_original": "ANTONIO ÁLVAREZ  ABRIL  ATENCIÓN, MEMORIA Y NEUROTECNOLOGÍA  PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c084",
    "titulo": "Entrelazamiento cuántico",
    "disertante": "Dr Ernesto Gandolfo Raso",
    "tema": "fisica-matematica",
    "anio": 2023,
    "partes": [
      {
        "duracion": "1:54:45",
        "url": "https://www.youtube.com/watch?v=muKFc4X_Fi8",
        "vistas": 12000,
        "titulo_original": "Entrelazamiento cuántico - Dr Ernesto Gandolfo Raso - primera parte"
      },
      {
        "duracion": "32:46",
        "url": "https://www.youtube.com/watch?v=y4hzI-vPwUE",
        "vistas": 154,
        "titulo_original": "Entrelazamiento  cuántico - Dr Ernesto Gandolfo Raso -  SEGUNDA PARTE"
      }
    ],
    "revisar": []
  },
  {
    "id": "c085",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2023,
    "partes": [
      {
        "duracion": "56:18",
        "url": "https://www.youtube.com/watch?v=8EHWx0oqC38",
        "vistas": 48,
        "titulo_original": "Mesa Redonda Agua en MEXICO primera parte - Ing Agustin Puig Valades"
      },
      {
        "duracion": "1:20:06",
        "url": "https://www.youtube.com/watch?v=d7Lcw1PIrNk",
        "vistas": 24,
        "titulo_original": "Mesa Redonda Agua en MEXICO segunda parte - Ing. Raul Morales Escalante"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c086",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2023,
    "partes": [
      {
        "duracion": "1:14:05",
        "url": "https://www.youtube.com/watch?v=-gfbLVdto2E",
        "vistas": 128,
        "titulo_original": "Astrología, el falso determinismo - Prof Jorge Coghlan - primera parte - Los signos del Zodíaco"
      },
      {
        "duracion": "47:13",
        "url": "https://www.youtube.com/watch?v=6GpNaQN7nyM",
        "vistas": 36,
        "titulo_original": "Astrología, el falso determinismo - Prof Jorge Coghlan - segunda parte - Preguntas y comentarios"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c087",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "espacio-astronomia",
    "anio": 2023,
    "partes": [
      {
        "duracion": "1:08:33",
        "url": "https://www.youtube.com/watch?v=iWDjetGAb5g",
        "vistas": 40,
        "titulo_original": "Proyecto CUBIC - Dra Beatriz García y otros - Primera parte - El Proyecto"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c088",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "espacio-astronomia",
    "anio": 2023,
    "partes": [
      {
        "duracion": "29:49",
        "url": "https://www.youtube.com/watch?v=Z63Px8__flo",
        "vistas": 51,
        "titulo_original": "Proyecto QUBIC - Dra Beatriz García y otros - segunda parte - Preguntas y comentarios"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c089",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2023,
    "partes": [
      {
        "duracion": "26:51",
        "url": "https://www.youtube.com/watch?v=LQBtpCkFNhw",
        "vistas": 27,
        "titulo_original": "Mesa Redonda Agua, fuentes y usos - Agua y ambiente - capitulo I - Ing. Alejandro  Drovandi"
      },
      {
        "duracion": "38:35",
        "url": "https://www.youtube.com/watch?v=Dl57YLumItA",
        "vistas": 40,
        "titulo_original": "Mesa Redonda Agua, Fuentes y Usos - Leyes del Agua en Mendoza - Dr Leonardo Muzzino - CAPITULO II"
      },
      {
        "duracion": "40:26",
        "url": "https://www.youtube.com/watch?v=KECEWZzIZ68",
        "vistas": 24,
        "titulo_original": "Mesa Redonda Agua, Fuentes y Uso - Amenazas aluvionales a Mendoza Capitulo III Ing Victor H. Burgos"
      },
      {
        "duracion": "34:03",
        "url": "https://www.youtube.com/watch?v=1PlT2OqCexA",
        "vistas": 20,
        "titulo_original": "Mesa Redonda Agua, Fuentes y Usos -  Administracion del Agua en Mdza Capitulo IV - Ing Juan A. Pina"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c090",
    "titulo": "Valor agregado en la minería del siglo XXI",
    "disertante": "Lic Guillermo Pensado",
    "tema": "geologia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "49:24",
        "url": "https://www.youtube.com/watch?v=uWVb6oaAUk0",
        "vistas": 131,
        "titulo_original": "Valor agregado en la minería del siglo XXI - Lic Guillermo Pensado - primera parte"
      },
      {
        "duracion": "37:42",
        "url": "https://www.youtube.com/watch?v=wfhdyfhcRZk",
        "vistas": 20,
        "titulo_original": "Valor Agregado en la Minería del Siglo XXI - Lic Guillermo Pensado - segunda parte"
      }
    ],
    "revisar": []
  },
  {
    "id": "c091",
    "titulo": "El bosque urbano de Mendoza",
    "disertante": "Ing Mabel Chambouleyron",
    "tema": "agua-ambiente",
    "anio": 2022,
    "partes": [
      {
        "duracion": "39:21",
        "url": "https://www.youtube.com/watch?v=S_41Ob3O1YQ",
        "vistas": 38,
        "titulo_original": "El bosque urbano de Mendoza - Ing Mabel Chambouleyron - Primera parte"
      },
      {
        "duracion": "43:46",
        "url": "https://www.youtube.com/watch?v=MoSI94hpvuI",
        "vistas": 27,
        "titulo_original": "El bosque urbano de Mendoza - Ing. Mabel Chambouleyron - segunda parte"
      }
    ],
    "revisar": []
  },
  {
    "id": "c092",
    "titulo": "Sistema inmune",
    "disertante": "Dra Alicia Seltzer",
    "tema": "neurociencia-salud",
    "anio": 2022,
    "partes": [
      {
        "duracion": "1:27:14",
        "url": "https://www.youtube.com/watch?v=ClYYwkmnPOQ",
        "vistas": 38,
        "titulo_original": "Sistema inmune - Dra Alicia Seltzer - primera parte"
      }
    ],
    "revisar": []
  },
  {
    "id": "c093",
    "titulo": "Sistema inmune Alicia",
    "disertante": "Dra Alicia Seltzer",
    "tema": "neurociencia-salud",
    "anio": 2022,
    "partes": [
      {
        "duracion": "22:36",
        "url": "https://www.youtube.com/watch?v=VYLjQXo5cNw",
        "vistas": 8,
        "titulo_original": "Sistema inmune Alicia - Dra Alicia Seltzer - segunda parte"
      }
    ],
    "revisar": []
  },
  {
    "id": "c094",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2022,
    "partes": [
      {
        "duracion": "1:13:46",
        "url": "https://www.youtube.com/watch?v=8HQ2DZC1b78",
        "vistas": 17,
        "titulo_original": "AAC   E Serdoch Conceptos y Construcción de Tomografías, 09/09/2022 PARTE 1"
      },
      {
        "duracion": "56:34",
        "url": "https://www.youtube.com/watch?v=52ZL0PnNhkA",
        "vistas": 21,
        "titulo_original": "AAC   E Serdoch Conceptos y Construcción de Tomografías; 09/09/2022 SEGUNDA PARTE"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c095",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ingenieria-sismos",
    "anio": 2022,
    "partes": [
      {
        "duracion": "1:47:13",
        "url": "https://www.youtube.com/watch?v=7uvh50lkDNM",
        "vistas": 295,
        "titulo_original": "Antonio Curi:  Pavimentos de adoquines de hormigón"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c096",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "44:39",
        "url": "https://www.youtube.com/watch?v=PgE6fX--5UI",
        "vistas": 16,
        "titulo_original": "VACUNACIÓN SIN AGUJAS NANOTECNOLOGÍA PARTE 1."
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c097",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "38:00",
        "url": "https://www.youtube.com/watch?v=rXR1WA8xQbM",
        "vistas": 12,
        "titulo_original": "Ana Sonzogni VACUNACIÓN SIN AGUJAS NANOTECNOLOGÍA PARTE 2   26 08 2022"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c098",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "1:10:57",
        "url": "https://www.youtube.com/watch?v=btD1fn2PQHU",
        "vistas": 61,
        "titulo_original": "PLAN  CORDILLERANO   Pérez Raffaelli Parte 1"
      },
      {
        "duracion": "47:07",
        "url": "https://www.youtube.com/watch?v=8tW96HTHNH8",
        "vistas": 32,
        "titulo_original": "PLAN  CORDILLERANO   Pérez Raffaelli PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c099",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "1:00:41",
        "url": "https://www.youtube.com/watch?v=G9fjOcpbPXY",
        "vistas": 92,
        "titulo_original": "Eduardo Bringa   Nanotecnología en laboratorio virtual Parte 1"
      },
      {
        "duracion": "17:32",
        "url": "https://www.youtube.com/watch?v=mdsibL9nLfA",
        "vistas": 28,
        "titulo_original": "Eduardo Bringa   Nanotecnología en laboratorio virtual Parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c100",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "46:35",
        "url": "https://www.youtube.com/watch?v=ExW2-b9osjU",
        "vistas": 185,
        "titulo_original": "Alejandro Caballero IMÁGENES  MULTI  E  HIPERESPECTRALES   PARTE 1"
      },
      {
        "duracion": "43:09",
        "url": "https://www.youtube.com/watch?v=FnJ1s4_llLA",
        "vistas": 39,
        "titulo_original": "Alejandro Caballero IMÁGENES  MULTI  E  HIPERESPECTRALES   PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c101",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2022,
    "partes": [
      {
        "duracion": "1:09:04",
        "url": "https://www.youtube.com/watch?v=ZonTcdzi2jY",
        "vistas": 18,
        "titulo_original": "E PULIAFITO   EMISIONES DE LA AVIACIÓN PARTE 1"
      },
      {
        "duracion": "39:08",
        "url": "https://www.youtube.com/watch?v=r5iHdmaLLDw",
        "vistas": 8,
        "titulo_original": "E PULIAFITO   EMISIONES DE LA AVIACIÓN PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c102",
    "titulo": "El universo en que vivimos",
    "disertante": "Dr Andres Piatti",
    "tema": "espacio-astronomia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "51:30",
        "url": "https://www.youtube.com/watch?v=HAv2hBKOaw0",
        "vistas": 39,
        "titulo_original": "El universo en que vivimos - Dr Andres Piatti - primera parte"
      },
      {
        "duracion": "21:19",
        "url": "https://www.youtube.com/watch?v=Gxl6g7nWTjA",
        "vistas": 11,
        "titulo_original": "El universo en que vivimos - Dr Andrés Piatti - segunda parte"
      }
    ],
    "revisar": []
  },
  {
    "id": "c103",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "espacio-astronomia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "41:21",
        "url": "https://www.youtube.com/watch?v=mVLfW9OXCSA",
        "vistas": 40,
        "titulo_original": "Osvaldo Peinado   New Space Vuelos Espaciales Privados  Parte 1"
      },
      {
        "duracion": "25:58",
        "url": "https://www.youtube.com/watch?v=O7HjorwL6rY",
        "vistas": 20,
        "titulo_original": "Osvaldo Peinado   New Space Vuelos Espaciales Privados  Parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c104",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2022,
    "partes": [
      {
        "duracion": "34:24",
        "url": "https://www.youtube.com/watch?v=1t3dPV-j3h8",
        "vistas": 187,
        "titulo_original": "Gral Gerónimo Espejo y su libro \"Paso de los Andes\" -  Alba Acevedo - primera parte"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c105",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2022,
    "partes": [
      {
        "duracion": "19:29",
        "url": "https://www.youtube.com/watch?v=fTG8H4J-pl8",
        "vistas": 63,
        "titulo_original": "General Espejo y su libro \"Paso de los Andes\" - Alba Acevedo - segunda parte"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c106",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2022,
    "partes": [
      {
        "duracion": "1:16:56",
        "url": "https://www.youtube.com/watch?v=Jn3y8cXdJ6c",
        "vistas": 135,
        "titulo_original": "Borges y el Arte de la amistad - Augusto Garrido Huergo - 1ra parte"
      },
      {
        "duracion": "30:51",
        "url": "https://www.youtube.com/watch?v=l1uVa-ZHJOA",
        "vistas": 71,
        "titulo_original": "Borges y el Arte de la Amistad  - Augusto Garrido Huergo  - 2da parte"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c107",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "53:07",
        "url": "https://www.youtube.com/watch?v=3-RnAbXYe5g",
        "vistas": 1000,
        "titulo_original": "LUIS LÓPEZ   MINERÍA DEL URANIO POR LIXIVIACIÓN IN SITU PARTE 1"
      },
      {
        "duracion": "48:54",
        "url": "https://www.youtube.com/watch?v=3YaIdAcz9fo",
        "vistas": 185,
        "titulo_original": "LUIS LÓPEZ   MINERÍA DEL URANIO POR LIXIVIACIÓN IN SITU PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c108",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "41:24",
        "url": "https://www.youtube.com/watch?v=1VblnyRp5mc",
        "vistas": 61,
        "titulo_original": "USO DE LiDAR AÉREO PARA ESTUDIO GEOMORFOLÓGICO   MARIO  PROFETA   PARTE 1"
      },
      {
        "duracion": "24:41",
        "url": "https://www.youtube.com/watch?v=JMLILiT85YI",
        "vistas": 22,
        "titulo_original": "USO DE LiDAR AÉREO PARA ESTUDIO GEOMORFOLÓGICO: MARIO  PROFETA - PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c109",
    "titulo": "El Futuro de las Redes III: 4G, 5G,...y 6G ...",
    "disertante": "Ing Roberto Lauro",
    "tema": "ia-tecnologia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "1:26:06",
        "url": "https://www.youtube.com/watch?v=6e1rjPk1jtU",
        "vistas": 11,
        "titulo_original": "El Futuro de las Redes III: 4G, 5G,...y 6G ... - Ing Roberto Lauro - primera parte"
      },
      {
        "duracion": "16:55",
        "url": "https://www.youtube.com/watch?v=QW0RFMur14U",
        "vistas": 9,
        "titulo_original": "El Futuro de las Redes III: 4G, 5G... y 6G... - Ing Roberto Lauro - segunda parte"
      }
    ],
    "revisar": []
  },
  {
    "id": "c110",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2022,
    "partes": [
      {
        "duracion": "47:12",
        "url": "https://www.youtube.com/watch?v=qg2pT9tAF8I",
        "vistas": 962,
        "titulo_original": "GABRIEL  CASTELLÁ: NUESTROS AMIGOS LOS MIEDOS PARTE 1"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c111",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2022,
    "partes": [
      {
        "duracion": "53:30",
        "url": "https://www.youtube.com/watch?v=EaXS0ktZPbk",
        "vistas": 325,
        "titulo_original": "GABRIEL  CASTELLÁ NUESTROS AMIGOS LOA MIEDOS PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c112",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2022,
    "partes": [
      {
        "duracion": "53:08",
        "url": "https://www.youtube.com/watch?v=9QWWEV18xwc",
        "vistas": 59,
        "titulo_original": "Como aprendemos - Sesgos cognitivos - Luis Roldan - parte 1"
      },
      {
        "duracion": "34:08",
        "url": "https://www.youtube.com/watch?v=eKUMsphZiyc",
        "vistas": 21,
        "titulo_original": "Como aprendemos - Sesgos cognitivos - Luis Roldan - parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c113",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2022,
    "partes": [
      {
        "duracion": "48:52",
        "url": "https://www.youtube.com/watch?v=49F5OodXI_I",
        "vistas": 113,
        "titulo_original": "GREGORIO  MEIRA DARWIN    COMENTARIOS   PARTE  1"
      },
      {
        "duracion": "42:16",
        "url": "https://www.youtube.com/watch?v=NeZAcUS97cQ",
        "vistas": 90,
        "titulo_original": "GREGORIO  MEIRA DARWIN    COMENTARIOS   PARTE  2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c114",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2022,
    "partes": [
      {
        "duracion": "1:17:43",
        "url": "https://www.youtube.com/watch?v=leTWlvVBIxM",
        "vistas": 80,
        "titulo_original": "ROTACIONES  MARIO  STORTI PARTE 1"
      },
      {
        "duracion": "11:36",
        "url": "https://www.youtube.com/watch?v=2ME9_3OQKLU",
        "vistas": 30,
        "titulo_original": "ROTACIONES,  MARIO  STORTI PARTE 2 PREGUNTAS"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c115",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "39:48",
        "url": "https://www.youtube.com/watch?v=eKUY_ll-5Gg",
        "vistas": 26,
        "titulo_original": "NORBERTO NIGRO   SOLUCIONES  PARA  LA TECNOLOGÍA;  MECÁNICA  COMPUTACIONAL  PARTE  2 DE 3"
      },
      {
        "duracion": "22:19",
        "url": "https://www.youtube.com/watch?v=bp1Uwz1pdTo",
        "vistas": 24,
        "titulo_original": "NORBERTO NIGRO SOLUCIONES PARA LA TECNOLOGÍA;  MECÁNICA COMPUTACIONAL 1 DE 3, INTRODUCCIÓN"
      }
    ],
    "revisar": [
      "titulo",
      "disertante",
      "partes"
    ]
  },
  {
    "id": "c116",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "7:28",
        "url": "https://www.youtube.com/watch?v=PWCENw4S6ms",
        "vistas": 11,
        "titulo_original": "SOLUCIONES  PARA  LA TECNOLOGÍA;  MECÁNICA  COMPUTACIONAL -  PARTE  3 DE 3  -  DEBATE"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c117",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "espacio-astronomia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "33:14",
        "url": "https://www.youtube.com/watch?v=qcnt_dQ5_Bw",
        "vistas": 143,
        "titulo_original": "Efecto Doppler y ley de Hubble - Carolina Luna - parte1"
      },
      {
        "duracion": "36:49",
        "url": "https://www.youtube.com/watch?v=Ehhr0_5AUB8",
        "vistas": 39,
        "titulo_original": "Efecto Doppler y ley de Hubble - Carolina Luna -  parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c118",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "1:13:48",
        "url": "https://www.youtube.com/watch?v=Gqg7QMqUPaE",
        "vistas": 43,
        "titulo_original": "De la prospección a la mina - Joaquin Marias - parte 1"
      },
      {
        "duracion": "32:43",
        "url": "https://www.youtube.com/watch?v=CqGtSEaDKmE",
        "vistas": 31,
        "titulo_original": "De la prospección a la mina - Joaquin Marias - parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c119",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2022,
    "partes": [
      {
        "duracion": "1:01:22",
        "url": "https://www.youtube.com/watch?v=3KIycwXCUDU",
        "vistas": 18,
        "titulo_original": "RAÚL E.  PÍA VARGAS:   ECOLOGÍA,  CAMBIO  CLIMÁTICO, Parte 1"
      },
      {
        "duracion": "51:12",
        "url": "https://www.youtube.com/watch?v=bqmCslp0eIg",
        "vistas": 9,
        "titulo_original": "RAÚL E.  PÍA VARGAS:   ECOLOGÍA   CAMBIO  CLIMÁTICO, Parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c120",
    "titulo": "Coaching",
    "disertante": "Ing German Manzur",
    "tema": "neurociencia-salud",
    "anio": 2022,
    "partes": [
      {
        "duracion": "1:28:57",
        "url": "https://www.youtube.com/watch?v=O08ePTKv4QA",
        "vistas": 90,
        "titulo_original": "Coaching - Ing German Manzur - primera parte"
      },
      {
        "duracion": "24:24",
        "url": "https://www.youtube.com/watch?v=0t-n8JRDB-Q",
        "vistas": 19,
        "titulo_original": "Coaching - Ing German Manzur - segunda parte"
      }
    ],
    "revisar": []
  },
  {
    "id": "c121",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "58:45",
        "url": "https://www.youtube.com/watch?v=wizAG8rkoJ0",
        "vistas": 1200,
        "titulo_original": "HUGO  MARENGO   EVOLUCIÓN GEOLÓGICA DE MENDOZA parte 1"
      },
      {
        "duracion": "13:55",
        "url": "https://www.youtube.com/watch?v=yGxisyBX78Y",
        "vistas": 240,
        "titulo_original": "HUGO  MARENGO   EVOLUCIÓN GEOLÓGICA DE MENDOZA parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c122",
    "titulo": "Inicios de la computación en Argentina",
    "disertante": "Ing Victorio Sonzogni",
    "tema": "ia-tecnologia",
    "anio": 2022,
    "partes": [
      {
        "duracion": "1:09:56",
        "url": "https://www.youtube.com/watch?v=xbXqVrEeols",
        "vistas": 22,
        "titulo_original": "Inicios de la computación en Argentina  - Ing Victorio Sonzogni - parte 1"
      },
      {
        "duracion": "21:07",
        "url": "https://www.youtube.com/watch?v=4gROqpW7-hM",
        "vistas": 17,
        "titulo_original": "Inicios de la computacion en Argentina - Ing Victorio Sonzogni - parte 2"
      }
    ],
    "revisar": []
  },
  {
    "id": "c123",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2022,
    "partes": [
      {
        "duracion": "54:12",
        "url": "https://www.youtube.com/watch?v=sz9VD-tCHQs",
        "vistas": 28,
        "titulo_original": "RICARDO TOLEDANO   GEORGE CANTOR Y LOS INFINITOS PARTE 1"
      },
      {
        "duracion": "43:22",
        "url": "https://www.youtube.com/watch?v=32oSMqfWm1Y",
        "vistas": 27,
        "titulo_original": "RICARDO TOLEDANO   GEORGE CANTOR Y LOS INFINITOS PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c124",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "40:09",
        "url": "https://www.youtube.com/watch?v=S-DTNwSHyqM",
        "vistas": 28,
        "titulo_original": "Energía,  Pasado Presente y futuro - parte 1 - Ing Luis Tittarelli"
      },
      {
        "duracion": "35:09",
        "url": "https://www.youtube.com/watch?v=rEc0JuanRoM",
        "vistas": 10,
        "titulo_original": "Energia Pasado Presente y futuro - Ing Luis Tittarelli - parte 2"
      },
      {
        "duracion": "17:12",
        "url": "https://www.youtube.com/watch?v=Yjq3MRJ4Zq8",
        "vistas": 10,
        "titulo_original": "Energía Pasado Presente y futuro - Ing Luis Tittarelli - parte 3"
      },
      {
        "duracion": "22:58",
        "url": "https://www.youtube.com/watch?v=-90LNf8dG3Y",
        "vistas": 27,
        "titulo_original": "Energia Pasado Presente y futuro - Ing Luis Tittarelli -  parte 4"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c125",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:12:13",
        "url": "https://www.youtube.com/watch?v=c4bMJjhIwhw",
        "vistas": 668,
        "titulo_original": "GABRIEL  CASTELLÁ   PARADOJAS EXISTENCIALES  PARTE  1"
      },
      {
        "duracion": "1:19:18",
        "url": "https://www.youtube.com/watch?v=ATriEvyJlk4",
        "vistas": 221,
        "titulo_original": "GABRIEL  CASTELLÁ   PARADOJAS EXISTENCIALES  PARTE  2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c126",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:56:14",
        "url": "https://www.youtube.com/watch?v=8uF8_uUMzfY",
        "vistas": 219,
        "titulo_original": "AUGUSTO  GARRIDO H    POÉTICA Y FILOSOFÍA  HERÁCLITO  EN  BORGES"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c127",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "espacio-astronomia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:01:27",
        "url": "https://www.youtube.com/watch?v=_QFI5P72jkc",
        "vistas": 29,
        "titulo_original": "LUCAS  PAGANINI   MISIÓN  JUNO  PARTE 1"
      },
      {
        "duracion": "54:36",
        "url": "https://www.youtube.com/watch?v=rQnMFBqZcEU",
        "vistas": 7,
        "titulo_original": "LUCAS  PAGANINI   MISIÓN  JUNO  PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c128",
    "titulo": "Meteorologia",
    "disertante": "Dr Jorge Rubén Santos",
    "tema": "agua-ambiente",
    "anio": 2021,
    "partes": [
      {
        "duracion": "57:58",
        "url": "https://www.youtube.com/watch?v=B-H0uKyXahg",
        "vistas": 57,
        "titulo_original": "Meteorologia - Dr Jorge Rubén Santos - Parte 2"
      }
    ],
    "revisar": []
  },
  {
    "id": "c129",
    "titulo": "Meteorología",
    "disertante": "Dr Ruben Santos",
    "tema": "agua-ambiente",
    "anio": 2021,
    "partes": [
      {
        "duracion": "48:35",
        "url": "https://www.youtube.com/watch?v=JktugcdMJE4",
        "vistas": 72,
        "titulo_original": "Meteorología - Dr Ruben Santos - parte 1"
      }
    ],
    "revisar": []
  },
  {
    "id": "c130",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:10:18",
        "url": "https://www.youtube.com/watch?v=tDeO5114tms",
        "vistas": 51,
        "titulo_original": "ADOLFO  ANUNZIATA  CIENCIA  TECNOLOGÍA  ÉTICA  Y DERECHO  PARTE  1"
      },
      {
        "duracion": "54:12",
        "url": "https://www.youtube.com/watch?v=_nedA4WqyQM",
        "vistas": 17,
        "titulo_original": "ADOLFO  ANUNZIATA  CIENCIA  TECNOLOGÍA  ÉTICA  Y DERECHO  PARTE  2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c131",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "espacio-astronomia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:10:19",
        "url": "https://www.youtube.com/watch?v=xTIRYtMTbEA",
        "vistas": 20,
        "titulo_original": "ONDAS GRAVITACIONALES  ROBERTO LAURO 20 08 2021 PARTE 1"
      },
      {
        "duracion": "46:43",
        "url": "https://www.youtube.com/watch?v=aQjGwFiAnpk",
        "vistas": 16,
        "titulo_original": "ONDAS GRAVITACIONALES  ROBERTO LAURO 20 08 2021 PARTE 2 Y DEBATE"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c132",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:09:52",
        "url": "https://www.youtube.com/watch?v=tdFoZOHMl5s",
        "vistas": 137,
        "titulo_original": "ORIGEN Y EXPLOTACIÓN DE HIDROCARBUROS   E    S   SERDOCH   PARTE 1"
      },
      {
        "duracion": "1:20:47",
        "url": "https://www.youtube.com/watch?v=1FDB6bD9j64",
        "vistas": 45,
        "titulo_original": "ORIGEN Y EXPLOTACIÓN DE HIDROCARBUROS   E    S   SERDOCH   2a. PARTE"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c133",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ingenieria-sismos",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:02:18",
        "url": "https://www.youtube.com/watch?v=hPra4MgbRtk",
        "vistas": 173,
        "titulo_original": "EQUILIBRIO: FUNDAMENTOS DE INGENIERÍA CIVIL   VICTORIO SONZOGNI PARTE 1"
      },
      {
        "duracion": "51:27",
        "url": "https://www.youtube.com/watch?v=vtYYc3d7S0c",
        "vistas": 48,
        "titulo_original": "EQUILIBRIO: FUNDAMENTOS DE INGENIERÍA CIVIL   VICTORIO SONZOGNI PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c134",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:23:45",
        "url": "https://www.youtube.com/watch?v=ewuye9rnRAA",
        "vistas": 120,
        "titulo_original": "Bitcoin, criptomonedas y blockchain - Mario Storti - primera parte"
      },
      {
        "duracion": "33:16",
        "url": "https://www.youtube.com/watch?v=IZZ-QjGv-2w",
        "vistas": 50,
        "titulo_original": "Bitcoin, criptomonedas y blockchain - Mario Storti - segunda parte"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c135",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:26:42",
        "url": "https://www.youtube.com/watch?v=1iqiWNMYQPY",
        "vistas": 882,
        "titulo_original": "PABLA TOGNOLI    LOS DEPÓSITOS DE SALES DE POTASIO   EVIDENCIAS DE LA MUERTE DE UN OCÉANO"
      },
      {
        "duracion": "22:35",
        "url": "https://www.youtube.com/watch?v=hY9S_JMh6Vg",
        "vistas": 125,
        "titulo_original": "PABLA TOGNOLI    LOS DEPÓSITOS DE SALES DE POTASIO        PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante",
      "partes"
    ]
  },
  {
    "id": "c136",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "51:37",
        "url": "https://www.youtube.com/watch?v=Fds2pKDn1Q4",
        "vistas": 111,
        "titulo_original": "Luis López   Los Recursos de Uranio para Generación Nucleoeléctrica en Argentina parte 1"
      },
      {
        "duracion": "42:20",
        "url": "https://www.youtube.com/watch?v=tWlN3FxHbFU",
        "vistas": 58,
        "titulo_original": "Luis López   Los Recursos de Uranio para Generación Nucleoeléctrica en Argentina   Parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c137",
    "titulo": "Bosques urbanos en ciudaddes sustentables",
    "disertante": "Ing Mabel Chambouleyron",
    "tema": "agua-ambiente",
    "anio": 2021,
    "partes": [
      {
        "duracion": "48:24",
        "url": "https://www.youtube.com/watch?v=1Mn3QherQvI",
        "vistas": 4,
        "titulo_original": "Bosques urbanos en ciudaddes sustentables - Ing Mabel Chambouleyron-   parte 2"
      }
    ],
    "revisar": []
  },
  {
    "id": "c138",
    "titulo": "Bosques urbanos en ciudades sustentables",
    "disertante": "Ing Mabel Chambouleyron",
    "tema": "agua-ambiente",
    "anio": 2021,
    "partes": [
      {
        "duracion": "52:29",
        "url": "https://www.youtube.com/watch?v=jzpQtsq02L0",
        "vistas": 31,
        "titulo_original": "Bosques urbanos en ciudades sustentables - Ing Mabel Chambouleyron -  parte 1"
      }
    ],
    "revisar": []
  },
  {
    "id": "c139",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "59:58",
        "url": "https://www.youtube.com/watch?v=jM0Frxt--tc",
        "vistas": 71,
        "titulo_original": "Supercomputadoras para ciencia y técnica - Mario Storti - parte 1"
      },
      {
        "duracion": "40:48",
        "url": "https://www.youtube.com/watch?v=x_HfeK2S1i8",
        "vistas": 25,
        "titulo_original": "Supercomputadoras para ciencia y técnica - Mario Storti - parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c140",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:35:07",
        "url": "https://www.youtube.com/watch?v=_KkpEw37kqs",
        "vistas": 102,
        "titulo_original": "Explorando un proyecto minero parte1"
      },
      {
        "duracion": "30:23",
        "url": "https://www.youtube.com/watch?v=xY6NElzXNlA",
        "vistas": 18,
        "titulo_original": "Explorando un proyecto minero parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c141",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "51:22",
        "url": "https://www.youtube.com/watch?v=R67Bszd7xdw",
        "vistas": 17,
        "titulo_original": "REALIDAD EXTENDIDA   CARLOS TOMBA  PARTE 1"
      },
      {
        "duracion": "20:27",
        "url": "https://www.youtube.com/watch?v=M1xmYrmtQH8",
        "vistas": 11,
        "titulo_original": "REALIDAD EXTENDIDA   CARLOS TOMBA  PARTE 2 intercambio"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c142",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2021,
    "partes": [
      {
        "duracion": "39:58",
        "url": "https://www.youtube.com/watch?v=eHJlPuIKdBU",
        "vistas": 28,
        "titulo_original": "Eduardo Sergio Serdoch MATEMÁTICA Y LEYENDA PARA VER MÁS CLARO   INTERCAMBIO"
      },
      {
        "duracion": "53:17",
        "url": "https://www.youtube.com/watch?v=RDrPKftmj_s",
        "vistas": 47,
        "titulo_original": "Eduardo Sergio Serdoch MATEMÁTICA Y LEYENDA PARA VER MÁS CLARO   parte 1"
      }
    ],
    "revisar": [
      "titulo",
      "disertante",
      "partes"
    ]
  },
  {
    "id": "c143",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "49:17",
        "url": "https://www.youtube.com/watch?v=ZRy9R80isj0",
        "vistas": 333,
        "titulo_original": "ALEJANDRO CABALLERO   TÉCNICAS HIPERESPECTRALES EN LA DETECCIÓN DE MINERALES"
      },
      {
        "duracion": "23:06",
        "url": "https://www.youtube.com/watch?v=oyKMy_lxvCo",
        "vistas": 75,
        "titulo_original": "ALEJANDRO CABALLERO   TÉCNICAS HIPERESPECTRALES EN LA DETECCIÓN DE MINERALES   PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante",
      "partes"
    ]
  },
  {
    "id": "c144",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2021,
    "partes": [
      {
        "duracion": "35:59",
        "url": "https://www.youtube.com/watch?v=mTquNtsoha0",
        "vistas": 154,
        "titulo_original": "Ordenamiento del Piedemonte de la cordillera de Mendoza - Elena Abraham -  PRIMERA PARTE"
      },
      {
        "duracion": "43:48",
        "url": "https://www.youtube.com/watch?v=bLT_0gDi_jo",
        "vistas": 42,
        "titulo_original": "Ordenamiento del Piedemonte de la cordillera de Mendoza - Elena Abraham -  SEGUNDA PARTE"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c145",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:49:25",
        "url": "https://www.youtube.com/watch?v=_k8RB2FbLMc",
        "vistas": 402,
        "titulo_original": "Neurobiología del dolor - Alicia Seltzer - primera parte"
      },
      {
        "duracion": "29:31",
        "url": "https://www.youtube.com/watch?v=jgzApFKVBxg",
        "vistas": 41,
        "titulo_original": "Neurobiología del dolor - Alicia Seltzer - segunda parte"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c146",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:21:17",
        "url": "https://www.youtube.com/watch?v=se7b_QnUAck",
        "vistas": 147,
        "titulo_original": "AUGUSTO R GARRIDO HUERGO:  BORGES Y EL PREMIO NOBEL   EL GALARDÓN NEGADO   EL PREMIO MERECIDO"
      },
      {
        "duracion": "1:22:39",
        "url": "https://www.youtube.com/watch?v=Mu79OUaXmT8",
        "vistas": 116,
        "titulo_original": "AUGUSTO R GARRIDO HUERGO:  BORGES Y EL PREMIO NOBEL  EL GALARDÓN NEGADO   EL PREMIO MERECIDO   INTER"
      }
    ],
    "revisar": [
      "titulo",
      "disertante",
      "partes"
    ]
  },
  {
    "id": "c147",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "espacio-astronomia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:07:59",
        "url": "https://www.youtube.com/watch?v=P2ySaehTJLc",
        "vistas": 22,
        "titulo_original": "Sensado remoto de la actividad magnetica solar - Francisco Iglesias - parte1"
      },
      {
        "duracion": "29:10",
        "url": "https://www.youtube.com/watch?v=02IiH904zCc",
        "vistas": 24,
        "titulo_original": "Sensado remoto de la actividad magnetica solar - Francisco Iglesias - parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c148",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2021,
    "partes": [
      {
        "duracion": "51:13",
        "url": "https://www.youtube.com/watch?v=Mxc4nMoR8iw",
        "vistas": 413,
        "titulo_original": "NEUROLIDERAZGO EN LAS ORGANIZACIONES LUIS ROLDÁN GONZÁLEZ   DE LAS CUEVAS   PARTE 1"
      },
      {
        "duracion": "50:51",
        "url": "https://www.youtube.com/watch?v=VvywxauWxAQ",
        "vistas": 97,
        "titulo_original": "NEUROLIDERAZGO EN LAS ORGANIZACIONES, LUIS ROLDÁN G  DE LAS CUEVAS   PARTE 2"
      },
      {
        "duracion": "25:52",
        "url": "https://www.youtube.com/watch?v=F7NjHZGxw74",
        "vistas": 16,
        "titulo_original": "NEUROLIDERAZGO EN LAS ORGANIZACIONES, LUIS ROLDÁN G.  DE LAS CUEVAS   PARTE 3   DEBATE"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c149",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "espacio-astronomia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:09:01",
        "url": "https://www.youtube.com/watch?v=QPSP4YCEHLg",
        "vistas": 38,
        "titulo_original": "Preparandonos para vivir en Marte - Gabriel Caballero - Parte 1"
      },
      {
        "duracion": "24:49",
        "url": "https://www.youtube.com/watch?v=j6hMbOysrT8",
        "vistas": 13,
        "titulo_original": "Preparandonos para vivir en Marte - Gabriel Caballero - Parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c150",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "36:46",
        "url": "https://www.youtube.com/watch?v=E49aYJlSSWs",
        "vistas": 144,
        "titulo_original": "Arqueometalurgia, Patricia S. Carrizo, Parte 1"
      },
      {
        "duracion": "53:17",
        "url": "https://www.youtube.com/watch?v=os8Wdp47ACM",
        "vistas": 63,
        "titulo_original": "Arqueometalurgia, Patricia S. Carrizo, Parte 2"
      },
      {
        "duracion": "32:39",
        "url": "https://www.youtube.com/watch?v=2dwK8yikT3M",
        "vistas": 21,
        "titulo_original": "Arqueometalurgia, Patricia S. Carrizo, Parte 3   DEBATE"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c151",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "51:08",
        "url": "https://www.youtube.com/watch?v=PmsRSpNBAQ4",
        "vistas": 16,
        "titulo_original": "DE LA CORTEZA AL NÚCLEO   DANIEL GUZMÁN   PARTE 1"
      },
      {
        "duracion": "1:24:45",
        "url": "https://www.youtube.com/watch?v=UciW7kPC8bQ",
        "vistas": 16,
        "titulo_original": "DE LA CORTEZA AL NÚCLEO   DANIEL GUZMÁN   PARTE 2 Y DEBATE"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c152",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2021,
    "partes": [
      {
        "duracion": "59:23",
        "url": "https://www.youtube.com/watch?v=iTY59USbcIw",
        "vistas": 54,
        "titulo_original": "Mitos y leyendas de la conquista de America - Noemi Bistue - parte 1"
      },
      {
        "duracion": "26:35",
        "url": "https://www.youtube.com/watch?v=NxNkniz3FVI",
        "vistas": 12,
        "titulo_original": "Mitos y leyendas de la Conquista de America - Noemi Bistue -  parte 2 - Preguntas y comentarios"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c153",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "43:39",
        "url": "https://www.youtube.com/watch?v=3idJ_lx3TdY",
        "vistas": 113,
        "titulo_original": "Teledetección y Geología Espectral   Alejandro Caballero   Parte 1"
      },
      {
        "duracion": "52:40",
        "url": "https://www.youtube.com/watch?v=hA8imENV6W0",
        "vistas": 51,
        "titulo_original": "Teledetección y Geología Espectral   Alejandro Caballero   Parte 2  y DEBATE"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c154",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2021,
    "partes": [
      {
        "duracion": "56:03",
        "url": "https://www.youtube.com/watch?v=yfkDArs8akk",
        "vistas": 28,
        "titulo_original": "Eduardo S  Serdoch   Desde Hilbert y Fourier hacia la Física Moderna   Parte 1"
      },
      {
        "duracion": "50:07",
        "url": "https://www.youtube.com/watch?v=tE-NrU8u8ms",
        "vistas": 28,
        "titulo_original": "Eduardo S  Serdoch   Desde Hilbert y Fourier hacia la Física Moderna   Parte 2"
      },
      {
        "duracion": "25:47",
        "url": "https://www.youtube.com/watch?v=f-yEpSmRxfI",
        "vistas": 21,
        "titulo_original": "Eduardo S  Serdoch   Desde Hilbert y Fourier hacia la Física Moderna   Parte 3"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c155",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ingenieria-sismos",
    "anio": 2021,
    "partes": [
      {
        "duracion": "44:39",
        "url": "https://www.youtube.com/watch?v=nBfMK2fUk8c",
        "vistas": 54,
        "titulo_original": "Construcciones sismo resistentes Dr  Ing  Carlos D  Frau Parte 1"
      },
      {
        "duracion": "42:22",
        "url": "https://www.youtube.com/watch?v=8S8zjuX9dwE",
        "vistas": 31,
        "titulo_original": "Construcciones sismo resistentes Dr  Ing  Carlos D  Frau Parte 2"
      },
      {
        "duracion": "34:59",
        "url": "https://www.youtube.com/watch?v=F9WimVZSywo",
        "vistas": 18,
        "titulo_original": "Construcciones sismo resistentes Dr  Ing  Carlos D  Frau Parte 3   DEBATE"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c156",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2021,
    "partes": [
      {
        "duracion": "50:48",
        "url": "https://www.youtube.com/watch?v=WL1Zh76sepc",
        "vistas": 14,
        "titulo_original": "La Neurociencia va a la Escuela por Adolfo Anunziata, Parte 1"
      },
      {
        "duracion": "56:28",
        "url": "https://www.youtube.com/watch?v=W_aNNWYov4o",
        "vistas": 8,
        "titulo_original": "La Neurociencia va a la Escuela por Adolfo Anunziata, Parte 2"
      },
      {
        "duracion": "25:43",
        "url": "https://www.youtube.com/watch?v=BFdppzISyfM",
        "vistas": 8,
        "titulo_original": "La Neurociencia va a la Escuela por Adolfo Anunziata, Parte 3   DEBATE"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c157",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ingenieria-sismos",
    "anio": 2021,
    "partes": [
      {
        "duracion": "57:20",
        "url": "https://www.youtube.com/watch?v=T2m2PegumWg",
        "vistas": 15,
        "titulo_original": "AAC  GUSTAVO PALAZZO, EL RIESGO SÍSMICO EN ESCUELAS SEGÚN LA PERSPECTIVA INTERNACIONAL  PARTE 1"
      },
      {
        "duracion": "50:18",
        "url": "https://www.youtube.com/watch?v=JfFYQt73_w8",
        "vistas": 11,
        "titulo_original": "AAC  GUSTAVO PALAZZO, EL RIESGO SÍSMICO EN ESCUELAS SEGÚN LA PERSPECTIVA INTERNACIONAL  PARTE  2"
      },
      {
        "duracion": "33:08",
        "url": "https://www.youtube.com/watch?v=hbuYKzisMlA",
        "vistas": 6,
        "titulo_original": "AAC  GUSTAVO PALAZZO, EL RIESGO SÍSMICO EN ESCUELAS SEGÚN LA PERSPECTIVA INTERNACIONAL  PARTE  3   D"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c158",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "espacio-astronomia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "57:45",
        "url": "https://www.youtube.com/watch?v=G24s0Gpme6g",
        "vistas": 36,
        "titulo_original": "LAS MUJERES SOSTIENEN LA MITAD DEL CIELO  MUJERES EN LA ASTRONOMÍA BEATRIZ GARCÍA PARTE 1"
      },
      {
        "duracion": "13:17",
        "url": "https://www.youtube.com/watch?v=aSY3RAnvM0w",
        "vistas": 22,
        "titulo_original": "LAS MUJERES SOSTIENEN LA MITAD DEL CIELO  MUJERES EN LA ASTRONOMÍA BEATRIZ GARCÍA PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c159",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ingenieria-sismos",
    "anio": 2021,
    "partes": [
      {
        "duracion": "55:25",
        "url": "https://www.youtube.com/watch?v=73KUjemj040",
        "vistas": 9,
        "titulo_original": "El Desafío de la Protección Sísmica y la Entropía de las Políticas de Estado  M  E  Tornello Parte 1"
      },
      {
        "duracion": "56:45",
        "url": "https://www.youtube.com/watch?v=DP6QeB6IYw0",
        "vistas": 13,
        "titulo_original": "El Desafío de la Protección Sísmica y la Entropía de las Políticas de Estado  M  E  Tornello Parte 2"
      },
      {
        "duracion": "51:19",
        "url": "https://www.youtube.com/watch?v=EL_DlOJqrJo",
        "vistas": 6,
        "titulo_original": "El Desafío de la Protección Sísmica y la Entropía de las Políticas de Estado  M  E  Tornello Parte 3"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c160",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "espacio-astronomia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "32:25",
        "url": "https://www.youtube.com/watch?v=B2tHoAZlypM",
        "vistas": 22,
        "titulo_original": "Efectos de viajes espaciales en la vida cotidiana   Osvaldo Peinado Parte 1"
      },
      {
        "duracion": "59:09",
        "url": "https://www.youtube.com/watch?v=PgqJbDnMxXE",
        "vistas": 15,
        "titulo_original": "Efectos de viajes espaciales en la vida cotidiana   Osvaldo Peinado Parte 2   debate"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c161",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "16:11",
        "url": "https://www.youtube.com/watch?v=hzO9q-BGH2Q",
        "vistas": 26,
        "titulo_original": "Fuentes Renovables de Energía Geotermia H Gaczec DEBATE"
      },
      {
        "duracion": "40:16",
        "url": "https://www.youtube.com/watch?v=FuQlKScAt5g",
        "vistas": 25,
        "titulo_original": "Fuentes Renovables de Energía Geotermia H Gaczec Parte 1"
      }
    ],
    "revisar": [
      "titulo",
      "disertante",
      "partes"
    ]
  },
  {
    "id": "c162",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2021,
    "partes": [
      {
        "duracion": "43:40",
        "url": "https://www.youtube.com/watch?v=sZ3VbCi-h3I",
        "vistas": 31,
        "titulo_original": "EL ROL DEL FÍSICO MÉDICO GUILLERMO ÁLVAREZ PARTE 1"
      },
      {
        "duracion": "43:03",
        "url": "https://www.youtube.com/watch?v=XZ92SdtG0Oo",
        "vistas": 19,
        "titulo_original": "EL ROL DEL FÍSICO MÉDICO GUILLERMO ÁLVAREZ PARTE 2"
      },
      {
        "duracion": "32:57",
        "url": "https://www.youtube.com/watch?v=iqDaQ_akn5g",
        "vistas": 13,
        "titulo_original": "EL ROL DEL FÍSICO MÉDICO GUILLERMO ÁLVAREZ PARTE 3 debate"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c163",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "59:35",
        "url": "https://www.youtube.com/watch?v=g2HCZ-v40f8",
        "vistas": 31,
        "titulo_original": "Mecánica Computacional   Victorio Sonzogni PARTE 1"
      },
      {
        "duracion": "54:32",
        "url": "https://www.youtube.com/watch?v=yLgobE7b8zE",
        "vistas": 16,
        "titulo_original": "Mecánica Computacional   Victorio Sonzogni PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c164",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ingenieria-sismos",
    "anio": 2021,
    "partes": [
      {
        "duracion": "50:49",
        "url": "https://www.youtube.com/watch?v=NVUOANLkFA0",
        "vistas": 44,
        "titulo_original": "Estructuras Sismo resistentes  Victorio Sonzogni PARTE 1"
      },
      {
        "duracion": "34:59",
        "url": "https://www.youtube.com/watch?v=EczPlcTpNCU",
        "vistas": 33,
        "titulo_original": "Estructuras Sismo resistentes  Victorio Sonzogni PARTE 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c165",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:10:43",
        "url": "https://www.youtube.com/watch?v=DoHaqHON3ZM",
        "vistas": 61,
        "titulo_original": "Parte 1 Situación mundial de los recursos de uranio  Luis López"
      },
      {
        "duracion": "59:49",
        "url": "https://www.youtube.com/watch?v=9-JLsyZ2qns",
        "vistas": 9,
        "titulo_original": "DEBATE   Situación mundial de los depósitos de uranio Luis López"
      }
    ],
    "revisar": [
      "titulo",
      "disertante",
      "partes"
    ]
  },
  {
    "id": "c166",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2021,
    "partes": [
      {
        "duracion": "18:56",
        "url": "https://www.youtube.com/watch?v=4OGqrSDbsrM",
        "vistas": 6,
        "titulo_original": "Neurociencia   Alicia Seltzer   DEBATE"
      },
      {
        "duracion": "34:50",
        "url": "https://www.youtube.com/watch?v=1t0-E3iSICs",
        "vistas": 16,
        "titulo_original": "Neurociencia Alicia Seltzer Parte 1"
      },
      {
        "duracion": "36:39",
        "url": "https://www.youtube.com/watch?v=TG85j8UPpPg",
        "vistas": 7,
        "titulo_original": "Neurociencia Alicia Seltzer Parte 2"
      },
      {
        "duracion": "26:47",
        "url": "https://www.youtube.com/watch?v=GjPJfWN8q0A",
        "vistas": 2,
        "titulo_original": "Neurociencia Alicia Seltzer Parte 3"
      }
    ],
    "revisar": [
      "titulo",
      "disertante",
      "partes"
    ]
  },
  {
    "id": "c167",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:16:01",
        "url": "https://www.youtube.com/watch?v=RajINRwEuoQ",
        "vistas": 120,
        "titulo_original": "Procesos Productivos de la Minería Metalífera - Parte 1"
      },
      {
        "duracion": "1:12:14",
        "url": "https://www.youtube.com/watch?v=_0AGzfWf79s",
        "vistas": 51,
        "titulo_original": "Procesos Productivos de la Minería Metalífera - Parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c168",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2021,
    "partes": [
      {
        "duracion": "59:01",
        "url": "https://www.youtube.com/watch?v=OLP4HCsYo-g",
        "vistas": 279,
        "titulo_original": "Juan P Cordone - Aprovechamiento integral de Potrerillos Mza AR  Parte 1"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c169",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:08:21",
        "url": "https://www.youtube.com/watch?v=lYGP_BkLzgA",
        "vistas": 53,
        "titulo_original": "Aprovechamiento integral de Potrerillos   Debate Final"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c170",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:08:21",
        "url": "https://www.youtube.com/watch?v=9uC1HL2IBQQ",
        "vistas": 158,
        "titulo_original": "Descripción del aprovechamiento integral de Potrerillos   Parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c171",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "41:29",
        "url": "https://www.youtube.com/watch?v=SqhxRMMgLtI",
        "vistas": 11,
        "titulo_original": "Trabajando para la industria   Carlos Tomba   Parte 2 Preguntas y comentarios"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c172",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ia-tecnologia",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:20:15",
        "url": "https://www.youtube.com/watch?v=yGzq2aphY9Q",
        "vistas": 17,
        "titulo_original": "Trabajando para la industdria   Carlos Tomba   Parte 1 Conferencia"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c173",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "fisica-matematica",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:12:13",
        "url": "https://www.youtube.com/watch?v=08nizMZOnT0",
        "vistas": 59,
        "titulo_original": "Estados cuanticos - Ernesto Gandolfo   Parte 1 Conferencia"
      },
      {
        "duracion": "47:05",
        "url": "https://www.youtube.com/watch?v=Q5erg2ZWOf8",
        "vistas": 24,
        "titulo_original": "Estados cuánticos - Ernesto Gandolfo - Parte 2 - Preguntas y respuestas, comentarios y debate"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c174",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ingenieria-sismos",
    "anio": 2021,
    "partes": [
      {
        "duracion": "48:00",
        "url": "https://www.youtube.com/watch?v=ndCBmoeCn_U",
        "vistas": 15,
        "titulo_original": "Covid19: análisis de riesgo y los desafíos para la ingeniería civil - 2° parte - Preguntas y debate"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c175",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "ingenieria-sismos",
    "anio": 2021,
    "partes": [
      {
        "duracion": "1:13:43",
        "url": "https://www.youtube.com/watch?v=rSkT0GBwDso",
        "vistas": 11,
        "titulo_original": "Covid19: analisis del riesgo y los desafíos para la ingeniería civil Parte I - Conferencia"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c176",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2021,
    "partes": [
      {
        "duracion": "47:13",
        "url": "https://www.youtube.com/watch?v=7HaqNPKn_S4",
        "vistas": 25,
        "titulo_original": "Neurociencia Educacional -  Antonio Alvarez 1° parte"
      },
      {
        "duracion": "24:34",
        "url": "https://www.youtube.com/watch?v=gOPWs4Pfm1c",
        "vistas": 17,
        "titulo_original": "Neurociencia educacional - Antonio Alvarez - 2° parte La Tecnología"
      },
      {
        "duracion": "1:11:26",
        "url": "https://www.youtube.com/watch?v=P9mVxJTA_iw",
        "vistas": 21,
        "titulo_original": "Neurociencia Educacional - Antonio Alvarez - 3° parte - Preguntas comentarios y debate"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c177",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2021,
    "partes": [
      {
        "duracion": "48:10",
        "url": "https://www.youtube.com/watch?v=Q7gDWRUNIQ4",
        "vistas": 49,
        "titulo_original": "Huella de Carbono  - Barbara Civit  - Primera parte - Conferencia"
      },
      {
        "duracion": "57:17",
        "url": "https://www.youtube.com/watch?v=IsY6MATT23o",
        "vistas": 40,
        "titulo_original": "Huella de Carbono  -  Barbara Civit - Segunda parte"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c178",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "historia-cultura",
    "anio": 2020,
    "partes": [
      {
        "duracion": "1:04:56",
        "url": "https://www.youtube.com/watch?v=RVuL7C8KfVM",
        "vistas": 78,
        "titulo_original": "Borges: Patria, Música, Amor y Poesía - Alicia Dúo - 1° parte: conferencia"
      },
      {
        "duracion": "47:14",
        "url": "https://www.youtube.com/watch?v=ytVaa0hX3N0",
        "vistas": 12,
        "titulo_original": "Borges: Patria,  Musica , Amor y Poesía - Alicia Dúo - 2° parte: Preguntas y debate"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c179",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "espacio-astronomia",
    "anio": 2020,
    "partes": [
      {
        "duracion": "36:40",
        "url": "https://www.youtube.com/watch?v=QKNIAiBUAbs",
        "vistas": 26,
        "titulo_original": "Back to the Moon   Parte 2 P&R"
      },
      {
        "duracion": "46:06",
        "url": "https://www.youtube.com/watch?v=bKHZuF93fp4",
        "vistas": 34,
        "titulo_original": "Back to the Moon   Parte 3 P&R"
      }
    ],
    "revisar": [
      "titulo",
      "disertante",
      "partes"
    ]
  },
  {
    "id": "c180",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "espacio-astronomia",
    "anio": 2020,
    "partes": [
      {
        "duracion": "23:32",
        "url": "https://www.youtube.com/watch?v=MqqGLjwp7bE",
        "vistas": 117,
        "titulo_original": "Back to the Moon por Osvaldo Peinado   Parte 1"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c181",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2020,
    "partes": [
      {
        "duracion": "36:10",
        "url": "https://www.youtube.com/watch?v=o5SG2e6yEKI",
        "vistas": 2000,
        "titulo_original": "Depósitos de Litio por Pabla Tognoli - Parte 1"
      },
      {
        "duracion": "37:50",
        "url": "https://www.youtube.com/watch?v=Et04RyQWkUs",
        "vistas": 1900,
        "titulo_original": "Depósitos de Litio por Pabla Tognoli Parte 2"
      },
      {
        "duracion": "29:12",
        "url": "https://www.youtube.com/watch?v=9x3w1qRhyL0",
        "vistas": 1100,
        "titulo_original": "Depósitos de Litio por Pabla Tognoli - Parte 3"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c182",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2020,
    "partes": [
      {
        "duracion": "25:30",
        "url": "https://www.youtube.com/watch?v=9e7TtHoSSvM",
        "vistas": 1100,
        "titulo_original": "Teledetección y Geología Espectral por Alejandro Caballero Parte 1"
      },
      {
        "duracion": "24:29",
        "url": "https://www.youtube.com/watch?v=KfpsK9MhcGM",
        "vistas": 628,
        "titulo_original": "Teledetección y Geología Espectral por Alejandro Caballero Parte 2"
      },
      {
        "duracion": "29:47",
        "url": "https://www.youtube.com/watch?v=stEeWKPxZiE",
        "vistas": 515,
        "titulo_original": "Teledetección y Geología Espectral por Alejandro Caballero Parte 3"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c183",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "agua-ambiente",
    "anio": 2020,
    "partes": [
      {
        "duracion": "32:32",
        "url": "https://www.youtube.com/watch?v=RJ09jkBlyk8",
        "vistas": 71,
        "titulo_original": "Meteorología: Charla con Dr Federico Norte Parte 1"
      },
      {
        "duracion": "32:47",
        "url": "https://www.youtube.com/watch?v=9zgGrnI7dG8",
        "vistas": 40,
        "titulo_original": "Meteorología Charla con Dr Federico Norte Parte 2"
      },
      {
        "duracion": "36:12",
        "url": "https://www.youtube.com/watch?v=aGBxA-uWcLA",
        "vistas": 27,
        "titulo_original": "Meteorología Charla con Dr Federico Norte Parte 3"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c184",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "neurociencia-salud",
    "anio": 2020,
    "partes": [
      {
        "duracion": "50:18",
        "url": "https://www.youtube.com/watch?v=h_zc4Vjt7iU",
        "vistas": 79,
        "titulo_original": "Neurociencia en la Educación   Luis Roldán Parte 1 de 3"
      },
      {
        "duracion": "34:38",
        "url": "https://www.youtube.com/watch?v=c9KXAs523zs",
        "vistas": 44,
        "titulo_original": "Neurociencia en la Educación   Luis Roldán Parte 2 de 3"
      },
      {
        "duracion": "22:39",
        "url": "https://www.youtube.com/watch?v=8jRX4g_qp9w",
        "vistas": 41,
        "titulo_original": "Neurociencia en la Educación   Luis Roldán Parte 3 de 3"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c185",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2020,
    "partes": [
      {
        "duracion": "30:18",
        "url": "https://www.youtube.com/watch?v=wGUHBMaXm8c",
        "vistas": 520,
        "titulo_original": "URANIO: Depósitos sedimentarios argentinos por Guillermo Pensado - Parte 1"
      },
      {
        "duracion": "16:42",
        "url": "https://www.youtube.com/watch?v=kIe3sqaBDVc",
        "vistas": 252,
        "titulo_original": "URANIO: Depósitos sedimentarios argentinos por Guillermo Pensado - Parte 2"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  },
  {
    "id": "c186",
    "titulo": "[Título]",
    "disertante": "[Disertante]",
    "tema": "geologia",
    "anio": 2020,
    "partes": [
      {
        "duracion": "30:37",
        "url": "https://www.youtube.com/watch?v=-GrbQmb3_Y0",
        "vistas": 299,
        "titulo_original": "Tectonica de Placas por Leandro Echavarria - Parte 1"
      },
      {
        "duracion": "30:26",
        "url": "https://www.youtube.com/watch?v=ns_WwCRpJy8",
        "vistas": 168,
        "titulo_original": "Tectonica de Placas por Leandro Echavarria - Parte 2"
      },
      {
        "duracion": "22:07",
        "url": "https://www.youtube.com/watch?v=ge2MzzPqoB8",
        "vistas": 173,
        "titulo_original": "Tectónica de Placas por Leandro Echavarria - Parte 3"
      }
    ],
    "revisar": [
      "titulo",
      "disertante"
    ]
  }
];
