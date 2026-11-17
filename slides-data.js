// Datos completos de la ruta de vuelo y diapositivas científicas
// Charla: "De la UTEM para el mundo: Trayectoria de un Ingeniero en Prevención de Riesgos y Medio Ambiente"
// Dr. Sergio Ibarra-Espinosa — Martes 17 de noviembre de 2026, Campus Ñuñoa, UTEM

window.FLIGHT_STOPS = [
  {
    id: "utem",
    number: 1,
    code: "SCL / UTEM",
    shortName: "1. UTEM (Origen)",
    city: "Campus Ñuñoa, Santiago, Chile",
    period: "2003 – 2007",
    coords: [-33.4627, -70.5975],
    zoom: 12,
    distanceKm: 0,
    models: ["Estadística Ambiental", "Epidemiología IRA", "Prevención de Riesgos"],
    summary: "Ingeniería en Prevención de Riesgos y Medio Ambiente & Licenciatura en Ciencias Ambientales"
  },
  {
    id: "cenma",
    number: 2,
    code: "SCL / CENMA",
    shortName: "2. CENMA Chile",
    city: "La Reina, Santiago, Chile",
    period: "2007 – 2013",
    coords: [-33.4489, -70.5380],
    zoom: 12,
    distanceKm: 12,
    models: ["EDMS (FAA)", "CLRTAP / NEI / NPI", "Series de Tiempo Poisson"],
    summary: "6 años liderando inventarios nacionales, aeropuertos, GEI municipales y epidemiología ambiental"
  },
  {
    id: "uchile",
    number: 3,
    code: "SCL / UCHILE",
    shortName: "3. Magíster U. Chile",
    city: "Santiago, Chile",
    period: "2010 – 2011",
    coords: [-33.4442, -70.6510],
    zoom: 12,
    distanceKm: 28,
    models: ["COPERT III & IV", "Situaciones de Tráfico", "Polvo Resuspendido"],
    summary: "Magíster en Gestión y Planificación Ambiental (Beca CENMA): emisiones vehiculares en Santiago"
  },
  {
    id: "brazil",
    number: 4,
    code: "GRU / USP",
    shortName: "4. PhD & Postdoc Brasil",
    city: "IAG/USP & IPEN, São Paulo, Brasil",
    period: "2013 – 2022",
    coords: [-23.5597, -46.7319],
    zoom: 6,
    distanceKm: 2615,
    models: ["VEIN (R + Fortran)", "eixport", "WRF-Chem", "MUSICA", "PEGA"],
    summary: "Doctorado en Meteorología (Mejor Tesis 2018) y Postdocs en USP e IPEN: creación de VEIN y modelación fotoquímica"
  },
  {
    id: "china",
    number: 5,
    code: "CGQ / CAS",
    shortName: "5. Postdoc China",
    city: "Chinese Academy of Sciences, Changchun & Shanghai",
    period: "2017 – 2021 (Postdoc 2019)",
    coords: [43.8800, 125.3228],
    zoom: 4,
    distanceKm: 21150,
    models: ["VEIN China", "CMAQ v5.2", "CAMx v6.5", "CHIMERE", "WRF-Chem"],
    summary: "Postdoctorado en la Academia China de Ciencias: inventarios de alta resolución y multimodelos en el Noreste de China"
  },
  {
    id: "france",
    number: 6,
    code: "LYS / CDG",
    shortName: "6. Francia (CEREA)",
    city: "Lyon (TAP) & París (CEREA / Ponts ParisTech)",
    period: "2016 – 2021",
    coords: [48.8411, 2.5872],
    zoom: 5,
    distanceKm: 29480,
    models: ["MUNICH v1.0", "VEIN Street-Canyon", "REMI Model"],
    summary: "Simulación acoplada de cañones urbanos (VEIN + MUNICH) y modelo REMI en Lyon y París"
  },
  {
    id: "uk",
    number: 7,
    code: "LHR / LBA",
    shortName: "7. Reino Unido (TRL & Leeds)",
    city: "TRL Wokingham & University of Leeds, UK",
    period: "2016 – Presente",
    coords: [53.8067, -1.5550],
    zoom: 5,
    distanceKm: 30220,
    models: ["PEMS / Real-World EF", "respeciate", "High-Emitters I/M", "Euro VI / BEV"],
    summary: "Pasantía doctoral en TRL y 10+ años de alianza con Univ. of Leeds (Dr. Karl Ropkins)"
  },
  {
    id: "boulder",
    number: 8,
    code: "DEN / NOAA GML",
    shortName: "8. EE.UU. (CU Boulder & NOAA)",
    city: "CIRES CU Boulder & NOAA Global Monitoring Lab, CO",
    period: "2022 – 2026",
    coords: [39.9911, -105.2611],
    zoom: 4,
    distanceKm: 37690,
    models: ["HYSPLIT", "rtorf / pytorf", "ObsPack", "Inversión Bayesiana CH4"],
    summary: "Postdoctoral Associate en CIRES / NOAA GML: modelación inversa de metano (CH4) y huellas atmosféricas"
  },
  {
    id: "umd",
    number: 9,
    code: "DCA / NOAA ARL",
    shortName: "9. EE.UU. (UMD & NOAA ARL)",
    city: "CISESS Univ. of Maryland & NOAA Air Resources Lab, MD",
    period: "2026 – Presente",
    coords: [38.9719, -76.9219],
    zoom: 5,
    distanceKm: 40110,
    models: ["hysplit-strato", "wondersnap", "B2SAP", "FLAN", "XGBoost / Prithvi AI"],
    summary: "Visiting Assistant Research Scientist: aerosoles estratosféricos (SAI), HYSPLIT, GMM/KDE y Machine Learning"
  },
  {
    id: "return_utem",
    number: 10,
    code: "SCL / UTEM 2026",
    shortName: "10. De UTEM al Mundo",
    city: "Biblioteca Ximena Sánchez S., Campus Ñuñoa",
    period: "17 Noviembre 2026",
    coords: [-33.4627, -70.5975],
    zoom: 3,
    distanceKm: 48150,
    models: ["Ciencia Abierta", "+100k Descargas", "48+ Papers", "H-Index 26"],
    summary: "Reflexiones finales y hojas de ruta para las nuevas generaciones de la UTEM"
  }
];

window.SLIDES = [
  // ==========================================
  // STOP 1: UTEM (ORIGEN & PORTADA)
  // ==========================================
  {
    stopId: "utem",
    subTitlePill: "Bienvenida & Despegue",
    badgeType: "journey",
    headline: "De la UTEM para el Mundo: Trayectoria de un Ingeniero en Prevención de Riesgos y Medio Ambiente",
    subtitle: "Departamento de Física & Decanato de la Facultad de Ciencias Naturales, Matemática y del Medioambiente — Martes 17 de Noviembre de 2026 · 10:00 hrs · Campus Ñuñoa",
    speakerNotes: "Agradecer la invitación de la Dirección del Departamento de Física y del Decanato en la Multisala de la Biblioteca Ximena Sánchez. Contar que hace exactamente 23 años entré a la UTEM en 2003 sin imaginar que las herramientas aprendidas aquí me llevarían a programar modelos atmosféricos usados en Brasil, China, Europa y la NOAA en EE.UU.",
    renderType: "boarding_pass"
  },
  {
    stopId: "utem",
    subTitlePill: "Nuestra Casa (2003–2007)",
    badgeType: "journey",
    headline: "Parada 1: Donde Todo Comenzó — Campus Ñuñoa, UTEM (2003–2007)",
    subtitle: "Ingeniería en Prevención de Riesgos y Medio Ambiente & Licenciatura en Ciencias Ambientales: la base cuantitativa para entender el riesgo ambiental.",
    speakerNotes: "Mostrar la foto de titulación con mis padres. Enfatizar que un Ingeniero en Prevención de Riesgos y Medio Ambiente aprende algo único: conectar la fuente del peligro con la exposición humana y la toma de decisiones.",
    stats: [
      { value: "2003–2007", label: "Pregrado en UTEM (Ing. en Prevención de Riesgos y Medio Ambiente)", color: "sky" },
      { value: "Pudahuel", label: "Primer estudio real: MP2.5 e Infecciones Respiratorias Agudas (IRA)", color: "emerald" },
      { value: "Física + Salud", label: "El puente entre procesos atmosféricos y epidemiología ambiental", color: "amber" }
    ],
    leftCard: {
      title: "🎓 Lo que me dio la UTEM",
      bullets: [
        "<strong>Visión sistémica del riesgo:</strong> En prevención de riesgos aprendemos que un peligro sin control se transforma en daño medible sobre las personas.",
        "<strong>Base en Física, Química y Matemática:</strong> Entender cómo se dispersa un contaminante en el aire requiere conservación de masa, termodinámica y estadística.",
        "<strong>Hambre de resolver problemas reales:</strong> No quedarnos solo en cumplir la norma en papel, sino medir, programar y cuantificar qué respira la gente en comunas vulnerables.",
        "<strong>Tesis de Pregrado (2007):</strong> <em>«Efectos de la contaminación atmosférica sobre las Infecciones Respiratorias Agudas (IRA)»</em> en Santiago."
      ],
      paper: {
        tag: "Primeros Congresos Nacionales (2008)",
        text: "Ibarra S., Mera E., Da Silva L. (2008). Material Particulado MP2.5 e Infecciones Respiratorias Agudas. XVI Simposio Chileno de Física (UTFSM) & XXXI Congreso Interamericano AIDIS."
      }
    },
    rightFigure: {
      images: [
        { src: "assets/sergio_grad.jpg", label: "Titulación UTEM", caption: "Día de titulación como Ingeniero en Prevención de Riesgos y Medio Ambiente en la UTEM junto a mis padres — el punto de partida de todo el viaje." },
        { src: "assets/sergio_nyc.jpg", label: "Hoy en EE.UU.", caption: "Dr. Sergio Ibarra-Espinosa — Investigador Científico en CISESS / University of Maryland y NOAA Air Resources Laboratory." }
      ]
    }
  },
  {
    stopId: "utem",
    subTitlePill: "Ciencia en UTEM",
    badgeType: "science",
    headline: "Ciencia en la Parada 1: Contaminación Atmosférica y Salud en Pudahuel",
    subtitle: "¿Cómo demostramos estadísticamente que los episodios críticos de MP2.5 y Ozono enferman a niños y adultos mayores en Santiago?",
    speakerNotes: "Explicar la ciencia detrás de la tesis en la UTEM y los primeros trabajos con Patricia Matus, E. Mera y L. Da Silva: series de tiempo diarias en Pudahuel (2001–2005), interacción ozono-temperatura y rezagos (lags) epidemiológicos.",
    leftCard: {
      title: "🔬 De la Tesis UTEM a la Epidemiología Ambiental",
      formula: "log E[Y_t] = β_0 + β_1 · PM2.5_{t-k} + s(Temp_t, O3_t) + s(Tiempo_t) + DOW_t",
      bullets: [
        "<strong>Serie de tiempo en Pudahuel (2001–2005):</strong> Análisis de atenciones de urgencia por Infecciones Respiratorias Agudas (IRA) y neumonía en mayores de 65 años y lactantes.",
        "<strong>Efecto de rezago (Lag 1 a 5 días):</strong> Los picos de $\\text{MP}_{2.5}$ invernales en el sector poniente de Santiago disparan las consultas respiratorias entre 2 y 4 días después del episodio.",
        "<strong>Interacción Ozono–Temperatura en verano:</strong> Descubrimos efectos sinérgicos entre altas temperaturas y picos fotoquímicos de $\\text{O}_3$ sobre enfermedades respiratorias.",
        "<strong>Partículas Ultrafinas (UFP):</strong> Presentado en el 1er Congreso de Nanotecnología (UTFSM, 2009): por qué las partículas $<0.1\\ \\mu\\text{m}$ penetran directo al torrente sanguíneo."
      ],
      paper: {
        tag: "Congreso Latinoamericano de Física y Química Ambiental (2009)",
        text: "Ibarra S., Matus P., Gutiérrez L., Mera E. (2009). Efectos de contaminantes atmosféricos en enfermedades respiratorias de mayores de 65 años en Pudahuel: interacción ozono-temperatura."
      }
    },
    rightSim: "epi_sim"
  },

  // ==========================================
  // STOP 2: CENMA CHILE (2007–2013)
  // ==========================================
  {
    stopId: "cenma",
    subTitlePill: "Trabajo en CENMA (2007–2013)",
    badgeType: "journey",
    headline: "Parada 2: CENMA — Centro Nacional del Medio Ambiente (2007–2013)",
    subtitle: "Seis años en la primera línea técnica de Chile: inventarios de emisiones para Ministerios, aeropuertos y municipalidades.",
    speakerNotes: "Contar cómo después de salir de la UTEM entré al CENMA (Centro Nacional del Medio Ambiente, en La Reina). Ahí pasé de analizar el impacto en salud a preguntarme: ¿de dónde salen exactamente los contaminantes y cómo los contabiliza un país?",
    stats: [
      { value: "6 Años", label: "Investigador y Jefe de Proyectos en CENMA (2007–2013)", color: "sky" },
      { value: "4 Sistemas", label: "Evaluación mundial: CLRTAP (UE), NEI (EE.UU.), NPI (Aus), JPRTR (Japón)", color: "amber" },
      { value: "EDMS + GEI", label: "Inventarios de aeropuertos, ministerios y huella de carbono municipal", color: "emerald" }
    ],
    leftCard: {
      title: "🏭 Ingeniería Aplicada a Políticas Públicas en CENMA",
      bullets: [
        "<strong>Liderazgo de Inventarios para Ministerios:</strong> Dirección técnica de proyectos de inventarios de emisiones y reportes para el Ministerio del Medio Ambiente, Transporte y Energía.",
        "<strong>Emisiones en Aeropuertos (Modelo EDMS):</strong> Estimación detallada de emisiones de aeronaves (ciclo LTO: aterrizaje, rodaje, despegue) y equipos de apoyo en tierra.",
        "<strong>Inventarios de Gases de Efecto Invernadero (GEI):</strong> Cuantificación de huellas de carbono y emisiones de $\\text{CO}_2, \\text{CH}_4, \\text{N}_2\\text{O}$ para múltiples municipalidades y reparticiones públicas.",
        "<strong>Benchmarking Internacional:</strong> Evaluación comparativa de los sistemas de reporte de emisiones de <strong>Europa (CLRTAP/EMEP)</strong>, <strong>EE.UU. (EPA NEI)</strong>, <strong>Australia (NPI)</strong> y <strong>Japón (JPRTR)</strong>."
      ],
      paper: {
        tag: "Lección Clave en CENMA",
        text: "Descubrí que en Chile y Sudamérica usábamos planillas cerradas o factores extranjeros sin resolución horaria ni espacial. Ahí nació mi obsesión por programar modelos abiertos."
      }
    },
    rightCard: {
      title: "🧭 El Desafío Científico que Encontré en CENMA",
      bullets: [
        "<strong>¿Qué es un Inventario de Emisiones?</strong> Es la condición de borde fundamental de cualquier modelo de calidad del aire o clima: $E = \\sum (\\text{Actividad} \\times \\text{Factor de Emisión})$.",
        "<strong>El problema de la «Caja Negra»:</strong> Cuando las consultoras o agencias calculan emisiones en hojas de cálculo manuales, los resultados no son reproducibles ni auditables.",
        "<strong>Resuspensión de Polvo en Calles (2011):</strong> Estudiamos en terreno cómo la cobertura vegetal y el césped reducen el material particulado resuspendido por el tráfico en Santiago.",
        "<strong>De usuario a creador:</strong> En CENMA empecé a programar en <strong>R</strong> (¡hace 18 años!) para automatizar el procesamiento de miles de datos ambientales."
      ],
      paper: {
        tag: "VII Jornadas Chilenas de Física y Química Ambiental (2011)",
        text: "Ibarra S., Gonzáles-Barrientos J. y Salim J. (2011). Influencia del césped en la estimación de material particulado resuspendido de calles. Concepción, Chile."
      }
    }
  },
  {
    stopId: "cenma",
    subTitlePill: "Ciencia en CENMA (Papers)",
    badgeType: "science",
    headline: "Ciencia en CENMA: MP2.5, Accidentes Cerebrovasculares y Mortalidad en Sudamérica",
    subtitle: "Mientras construíamos inventarios para el Estado, publicamos nuestros primeros artículos indexados internacionales conectando contaminación y mortalidad en Santiago y Buenos Aires.",
    speakerNotes: "Destacar estos dos papers fundamentales de la etapa en Chile: Environmental Pollution (2011) sobre MP2.5 y enfermedades cerebrovasculares en Santiago, y el estudio comparativo entre Buenos Aires y Santiago (2012/2013) junto a Rosana Abrutzky, Patricia Romero-Lankao (NCAR) y Laura Dawidowski.",
    stats: [
      { value: "2011", label: "Paper en Environmental Pollution: MP2.5 y enf. cerebrovasculares en Santiago", color: "rose" },
      { value: "2 Metrópolis", label: "Estudio comparativo Santiago de Chile vs. Buenos Aires, Argentina", color: "sky" },
      { value: "CO, NOx, PM2.5", label: "Pronóstico estadístico y riesgo de mortalidad aguda", color: "emerald" }
    ],
    leftCard: {
      title: "🧠 Paper 1: MP2.5 y Enfermedades Cerebrovasculares (2011)",
      bullets: [
        "<strong>Hallazgo crítico en Santiago:</strong> Demostramos que la exposición aguda a $\\text{MP}_{2.5}$ no solo afecta a los pulmones, sino que incrementa significativamente el riesgo de hospitalización y muerte por <strong>enfermedades cerebrovasculares (ACV)</strong>.",
        "<strong>Mecanismo fisiopatológico:</strong> La inflamación sistémica, estrés oxidativo y alteración endotelial inducidos por partículas finas disparan eventos trombóticos e isquémicos.",
        "<strong>Impacto en política pública:</strong> Evidencia chilena directa para respaldar la urgencia de la norma primaria de calidad del aire para $\\text{MP}_{2.5}$."
      ],
      paper: {
        tag: "Environmental Pollution (2011)",
        text: "Santibáñez D., Ibarra S., Matus P., Seguel R. y Leiva M. (2011). Particulate matter (PM2.5) and cerebrovascular diseases in Santiago de Chile. Environmental Pollution."
      }
    },
    rightCard: {
      title: "🌎 Paper 2: Santiago vs. Buenos Aires — Mortalidad y Pronóstico (2012–2013)",
      bullets: [
        "<strong>Colaboración Sudamericana + NCAR:</strong> Junto a investigadoras de Argentina (CNEA / UBA) y EE.UU. (NCAR), comparamos el impacto del monóxido de carbono ($\\text{CO}$) y material particulado sobre la mortalidad en <strong>Buenos Aires y Santiago</strong>.",
        "<strong>Contraste topográfico y meteorológico:</strong> La cuenca encerrada de Santiago (inversión térmica por subsidencia) vs. la llanura abierta ventilada del Río de la Plata en Buenos Aires.",
        "<strong>Modelos de Pronóstico (2012):</strong> Evaluamos múltiples técnicas estadísticas para pronosticar concentraciones horarias de $\\text{CO}$ y $\\text{NO}_x$ en Buenos Aires."
      ],
      paper: {
        tag: "International Journal of Environment and Health (2013)",
        text: "Abrutzky R., Ibarra S., Matus P., Romero-Lankao P., Pereyra V. (2013). Atmospheric pollution and mortality: A comparative study between Buenos Aires and Santiago."
      }
    }
  },

  // ==========================================
  // STOP 3: MAGÍSTER UNIVERSIDAD DE CHILE (2010–2011)
  // ==========================================
  {
    stopId: "uchile",
    subTitlePill: "Magíster U. de Chile (2010–2011)",
    badgeType: "journey",
    headline: "Parada 3: Magíster en Gestión y Planificación Ambiental — Universidad de Chile",
    subtitle: "Estudiando y trabajando al mismo tiempo gracias a la Beca CENMA: cómo transformar la planificación urbana a través de mejores inventarios vehiculares.",
    speakerNotes: "Contar que mientras trabajaba en CENMA, obtuve la Beca CENMA para cursar el Magíster en Gestión y Planificación Ambiental en la Universidad de Chile (2010–2011), trabajando con Margarita Préndez y Mauricio Osses.",
    stats: [
      { value: "2010–2011", label: "Magíster en Gestión y Planificación Ambiental — U. de Chile", color: "sky" },
      { value: "Beca CENMA", label: "Financiamiento por mérito profesional mientras trabajaba en CENMA", color: "amber" },
      { value: "Santiago RM", label: "Tesis enfocada en mejorar el inventario vehicular de la capital", color: "emerald" }
    ],
    leftCard: {
      title: "🏛️ El Puente entre Planificación Urbana y Física Atmosférica",
      bullets: [
        "<strong>El dilema de Santiago:</strong> El transporte terrestre es responsable de una fracción dominante de $\\text{NO}_x, \\text{CO}, \\text{COV}$ y $\\text{MP}_{2.5}$ primario/secundario en la cuenca de Santiago.",
        "<strong>Tesis de Magíster:</strong> <em>«Identificación de mejoras en la estimación de emisiones vehiculares en Santiago, Chile»</em>.",
        "<strong>Visión interdisciplinaria:</strong> La planificación ambiental fracasa si las medidas de gestión de tránsito se evalúan con factores de emisión agregados que ignoran la congestión real calle por calle."
      ],
      paper: {
        tag: "Tesis de Magíster — Universidad de Chile (2011)",
        text: "Identification of Improvements into estimation of vehicular emissions in Santiago, Chile."
      }
    },
    rightCard: {
      title: "🛣️ Ciencia en el Magíster: COPERT III/IV y Situaciones de Tráfico",
      formula: "E_{i,j,k}(v) = \\sum_{m} N_{j,m} \\cdot L_i \\cdot EF_{j,k,m}(v_{i,h} \\text{ ó } TS_{i,h})",
      bullets: [
        "<strong>Metodologías Europeas COPERT III y IV (2011):</strong> Modelamos las emisiones en autopistas y red vial de la Región Metropolitana comparando curvas dependientes de la velocidad media.",
        "<strong>Enfoque de Situaciones de Tráfico (Traffic Situations, 2013):</strong> Junto a la Dra. Margarita Préndez, aplicamos el enfoque discreto de nivel de servicio y congestión (libre, denso, saturado, <em>stop & go</em>) en Santiago.",
        "<strong>La semilla del Doctorado:</strong> Comprendí que para simular el aire de una megaciudad necesitaba dar el siguiente paso: aprender <strong>Meteorología y Modelación Química Atmosférica (WRF-Chem)</strong>."
      ],
      paper: {
        tag: "VIII Jornadas Chilenas de Física y Química Ambiental (2013)",
        text: "Ibarra-Espinosa, S., Préndez M. (2013). Aplicación del Enfoque de Situación de Tráfico en la Estimación de Emisiones Vehiculares en Santiago."
      }
    }
  },

  // ==========================================
  // STOP 4: BRASIL — PhD & POSTDOC EN USP & IPEN (2013–2022)
  // ==========================================
  {
    stopId: "brazil",
    subTitlePill: "Doctorado en Brasil (2013–2017)",
    badgeType: "journey",
    headline: "Parada 4: El Gran Salto a Brasil — Doctorado en Meteorología en la USP",
    subtitle: "9 años en São Paulo (Beca Chile 2013–2017 en IAG/USP, Postdoc USP 2017–2021 y Postdoc IPEN 2021–2022): aprender un nuevo idioma, programar en R/Fortran y ganar el Premio a la Mejor Tesis Doctoral.",
    speakerNotes: "Relatar el desafío de llegar a São Paulo con Beca Chile al Instituto de Astronomia, Geofísica e Ciências Atmosféricas (IAG/USP) con Rita Ynoue, Maria de Fátima Andrade y Edmilson Dias de Freitas. Venía de Prevención de Riesgos y Gestión Ambiental y tuve que cursar física atmosférica dura y defender en portugués, ganando el premio a la Mejor Tesis de Doctorado en 2018.",
    stats: [
      { value: "Mejor PhD", label: "Premio Destaque Doutorado en Meteorología IAG/USP (2018)", color: "amber" },
      { value: "90,000+", label: "Descargas directas en CRAN de los paquetes VEIN (>50k) y eixport (>40k)", color: "emerald" },
      { value: "BBC / USP", label: "Portada en BBC News Brasil, Jornal da USP, UOL, Terra y Agência FAPESP", color: "sky" },
      { value: "9 Años", label: "Doctorado + 2 Postdoctorados (IAG/USP e IPEN METROCLIMA)", color: "rose" }
    ],
    leftCard: {
      title: "🇧🇷 De Estudiante Chileno a Liderar Software Científico en la USP",
      bullets: [
        "<strong>Tesis Doctoral (IAG/USP, 2013–2017):</strong> <em>«Modelación de la contaminación atmosférica en São Paulo utilizando inventarios de emisiones vehiculares bottom-up»</em>.",
        "<strong>Impacto Mediático Internacional (2018):</strong> BBC News destacó nuestro sistema capaz de medir y modelar la contaminación del aire <em>«calle por calle y hora por hora»</em> en la megaciudad de São Paulo.",
        "<strong>Vocación Docente y Extensión (USP 60+):</strong> Cursos de R para meteorología, talleres internacionales de VEIN y clases para adultos mayores en el programa <em>Terceira Idade</em> de la USP.",
        "<strong>Postdoc en IPEN (2021–2022):</strong> Proyecto <strong>METROCLIMA</strong> estimando flujos a priori y a posteriori de $\\text{CO}_2$ en la metrópoli."
      ],
      paper: {
        tag: "Prensa Internacional — BBC News Brasil & Jornal da USP (2018)",
        text: "«Sistema mede poluição do ar 'rua por rua' em São Paulo» — BBC News (12 junio 2018) & Libro publicado en Amazon: VEINBOOK (2018) + Nuevo libro en CRC Press (2027)."
      }
    },
    rightFigure: {
      images: [
        { src: "assets/vein_flow_sp.png", label: "Flujo Vehicular SP", caption: "Flujo vehicular horario [veh/h] para automóviles de pasajeros (PC) en la red vial de São Paulo procesado con VEIN (GMD, 2018)." },
        { src: "assets/vein_streets_nox.png", label: "NOx Calle por Calle", caption: "Emisiones vehiculares de NOx [g/h] a las 08:00 LT en cada arteria vial de la Región Metropolitana de São Paulo." },
        { src: "assets/vein_grids_nox.png", label: "Grilla Espacial NOx", caption: " Conservación de masa espacial: agregación vectorial a grilla regular [g/km²/h] lista para acoplar con WRF-Chem." }
      ]
    }
  },
  {
    stopId: "brazil",
    subTitlePill: "Ciencia en Brasil I: VEIN & eixport",
    badgeType: "science",
    headline: "Ciencia en Brasil I: El Ecosistema Abierto VEIN, eixport y Aceleración Fortran/OpenMP",
    subtitle: "Democratizando los inventarios de emisiones de alta resolución para que cualquier ciudad del mundo pueda modelar su aire sin pagar licencias millonarias.",
    speakerNotes: "Explicar la arquitectura matemática y computacional de VEIN (publicado en Geoscientific Model Development 2018 con Edzer Pebesma, Rita Ynoue, Maria de Fatima Andrade y Mauricio Osses) y su evolución hasta VEIN v1.8 (2026) con motores en Fortran y paralelización OpenMP.",
    leftCard: {
      title: "⚡ Arquitectura de VEIN (v0.2 a v1.8) y eixport",
      formula: "E_{l,h,p} = \\sum_{v,a} F_{l,v,h} \\cdot L_l \\cdot \\gamma_{v,a} \\cdot EF_{v,a,p}(V_{l,h}, T_h) \\cdot \\psi_{\\text{det}}(a)",
      bullets: [
        "<strong>De conteos de tráfico a WRF-Chem:</strong> Procesa flujos viales en geometrías espaciales (<code>sf</code>), distribuye composiciones vehiculares por edad/tecnología (41 años de flota), y calcula emisiones de <strong>tubo de escape (frío/caliente), evaporativas (diurnal, hot-soak, running losses) y desgaste (frenos/neumáticos)</strong>.",
        "<strong>Especiación química automática:</strong> Desagrega COV y $\\text{MP}$ en mecanismos fotoquímicos <strong>CB05, CBMZ, SAPRC99, RADM2 y RACM</strong>.",
        "<strong>Paquete <code>eixport</code> (JOSS, 2018):</strong> Acopla los inventarios directamente a <strong>WRF-Chem, CMAQ, CAMx y MUNICH</strong> en formato NetCDF.",
        "<strong>Salto a HPC con Fortran + OpenMP y VEIN v2.0 (2026):</strong> En <code>VEIN v2.0</code> integramos un marco basado en proyectos para inventarios <em>bottom-up</em> y <em>top-down</em> con núcleos en Fortran paralelizado, reduciendo el cálculo horario-semanal de ~3,000 ms a &lt;250 ms."
      ],
      paper: {
        tag: "Geoscientific Model Development (2018) & Modeling Earth Systems and Environment (2026)",
        text: "Ibarra-Espinosa et al. (2018) VEIN v0.2.2, Geosci. Model Dev., 11, 2209–2229 | Ibarra-Espinosa (2026) VEIN v2.0: a project-based framework for reproducible bottom-up and top-down vehicular emission inventories."
      }
    },
    rightFigure: {
      images: [
        { src: "assets/vein_openmp_speedup.png", label: "Benchmark Fortran OpenMP", caption: "VEIN v2.0 (2026): Tiempo de ejecución vs. tamaño de red vial y aceleración en órdenes de magnitud con Fortran y OpenMP frente a R puro." },
        { src: "assets/vein_ef_age.png", label: "Factores por Edad y Combustible", caption: "Factores de emisión en Brasil según edad de la flota (0–40 años) para Gasolina (PC_G), Etanol (PC_E) y Flex-Fuel (PC_FG, PC_FE) en 13 contaminantes." },
        { src: "assets/wrf_no12.png", label: "Entrada WRF-Chem (eixport)", caption: "Flujo de emisiones horarias E_NO exportado mediante eixport hacia las grillas del modelo meteorológico-químico WRF-Chem." }
      ]
    }
  },
  {
    stopId: "brazil",
    subTitlePill: "Laboratorio Interactivo VEIN",
    badgeType: "interactive",
    headline: "Simulador Interactivo en Vivo: Cómo Calcula VEIN las Emisiones en tu Ciudad",
    subtitle: "Mueve los deslizadores para explorar cómo la velocidad del tráfico, la temperatura ambiente, el etanol (biocombustibles) y la edad vehicular transforman la química atmosférica.",
    speakerNotes: "Invitar a los estudiantes a mirar cómo al bajar la velocidad a 12 km/h (congestión severa) se disparan el CO y el NOx, y cómo al subir la temperatura sobre 30°C explotan los compuestos orgánicos volátiles evaporativos (COV), formando más ozono troposférico.",
    renderType: "vein_simulator"
  },
  {
    stopId: "brazil",
    subTitlePill: "Ciencia en Brasil II: 100 Años, COVID-19 y PEGA",
    badgeType: "science",
    headline: "Ciencia en Brasil II: Un Siglo de Biocombustibles (1960–2100), COVID-19 y Base PEGA",
    subtitle: "Desde el impacto del aislamiento en la pandemia junto a Harvard, hasta modelar 140 años de emisiones en Brasil con NCAR (MUSICA) en Environmental Science & Technology (2026).",
    speakerNotes: "Destacar tres grandes hitos de Brasil: 1) El paper en ES&T (2026) con NCAR (Guy Brasseur, Louisa Emmons, Benjamin Gaubert) sobre 100 años de emisiones en Brasil; 2) Los papers de COVID-19 (con Francesca Dominici de Harvard y Revista Galileu / FAPESP) donde mostramos que 50% de aislamiento habría reducido a la mitad las muertes y por qué subió el Ozono durante la cuarentena; 3) El nuevo paquete PEGA (346 factores armonizados).",
    stats: [
      { value: "1960–2100", label: "Paper en ES&T (2026): Un siglo de emisiones y mezcla única de etanol/biodiésel", color: "amber" },
      { value: "-50% Muertes", label: "Estudio COVID-19 (Environ. Res. 2022 con Harvard): impacto del aislamiento", color: "rose" },
      { value: "346 FEs", label: "Nuevo paquete PEGA: armonización IPCC + EMEP/EEA + US EPA AP-42 en gramos", color: "emerald" }
    ],
    leftCard: {
      title: "🌡️ Descubrimientos Científicos Clave en Brasil",
      bullets: [
        "<strong>Un Siglo de Emisiones en Brasil (ES&T, 2026):</strong> Junto a <strong>NCAR (modelo global MUSICA)</strong> reconstruimos y proyectamos las emisiones viales de Brasil (1960–2100). Demostramos que, pese a la renovación tecnológica (PROCONVE), el calentamiento climático amplifica las <strong>emisiones evaporativas de COV</strong>, impulsando la formación secundaria de $\\text{O}_3$.",
        "<strong>La Paradoja del Ozono en el Confinamiento COVID-19:</strong> Durante el <em>lockdown</em> de 2020 en São Paulo, cayeron drásticamente el $\\text{NO}_x$ (camiones diésel) y el $\\text{CO}$, pero <strong>aumentó el Ozono ($\\text{O}_3$) urbano</strong> debido al régimen limitado por COV y menor titulación por $\\text{NO}$.",
        "<strong>Movilidad, Polución y Mortalidad COVID-19:</strong> Con la Dra. Francesca Dominici (Harvard), probamos con regresiones Binomial Negativa que un aislamiento del 50% habría evitado la mitad de las muertes en São Paulo.",
        "<strong>Proyecto PEGA (2025–2026):</strong> Unificamos 346 funciones de factores de emisión (energía, industria, solventes, agricultura y residuos) en gramos para cerrar el déficit de inventarios en Sudamérica."
      ],
      paper: {
        tag: "Environmental Science & Technology (2026) · DOI: 10.1021/acs.est.5c08400",
        text: "Ibarra-Espinosa et al. (2026). A Century of Vehicular Emissions in Brazil: Unveiling the Impacts of Unique Fuel Mix on Air Quality. Environ. Sci. Technol., 60(6), 4914–4930."
      }
    },
    rightFigure: {
      images: [
        { src: "assets/poster_pega-1.png", label: "Auditoría Nacional PEGA + VEIN", caption: "PEGA (2026): Auditoría multisectorial de Brasil frente a EDGAR 8.1 y CEDS v2024, identificando brechas críticas en COV (solventes), CH4 (ganadería/residuos) y NH3." },
        { src: "assets/cetesb_map.png", label: "Red de Ozono CETESB", caption: "Distribución espacial de la red de monitoreo de Ozono de CETESB en la Megaciudad de São Paulo y el estado." }
      ]
    }
  },

  // ==========================================
  // STOP 5: CHINA — CHINESE ACADEMY OF SCIENCES (2017–2021)
  // ==========================================
  {
    stopId: "china",
    subTitlePill: "Postdoctorado en China (CAS)",
    badgeType: "journey",
    headline: "Parada 5: China — Academia China de Ciencias (Chinese Academy of Sciences)",
    subtitle: "De Ñuñoa y São Paulo al Noreste de China y Shanghai (2017–2021): llevando el modelo VEIN al otro lado del planeta.",
    speakerNotes: "Contar la experiencia cultural y científica de ir como investigador postdoctoral al Northeast Institute of Geography and Agroecology de la Chinese Academy of Sciences (CAS) en Changchun en 2019 (tras presentar Shanghai en Japón JPGU 2017). Mostrar cómo el código abierto en R fue el idioma universal.",
    stats: [
      { value: "CAS 2019", label: "Postdoctorado en la Chinese Academy of Sciences (Changchun, China)", color: "amber" },
      { value: "Noreste China", label: "Inventario espacial y temporal de alta resolución (Heilongjiang, Jilin, Liaoning)", color: "sky" },
      { value: "4 Modelos", label: "Intercomparación CMAQ, CAMx, CHIMERE y WRF-Chem en tormentas asiáticas", color: "emerald" }
    ],
    leftCard: {
      title: "🇨🇳 ¿Cómo llega un Ingeniero de la UTEM a la Academia China de Ciencias?",
      bullets: [
        "<strong>El poder del Software Libre:</strong> En 2017 aplicamos VEIN para construir un inventario de alta resolución en <strong>Shanghai</strong> (presentado en el congreso JPGU en Chiba, Japón).",
        "<strong>Invitación a la Chinese Academy of Sciences (2019):</strong> El grupo del Dr. Xuelei Zhang y Dr. Aijun Xiu me invitó como investigador postdoctoral a Changchun para desarrollar el inventario vehicular de todo el <strong>Noreste de China</strong>.",
        "<strong>Adaptabilidad extrema:</strong> En pleno invierno del noreste chino (temperaturas bajo $-20\\ ^\\circ\\text{C}$), modelamos el efecto crítico de las <strong>partidas en frío (cold starts)</strong> sobre el exceso de emisiones de $\\text{CO}, \\text{HC}$ y $\\text{MP}_{2.5}$."
      ],
      paper: {
        tag: "Conferencias en Asia — JPGU Chiba & IGAC Takamatsu, Japón (2017–2019)",
        text: "Ibarra-Espinosa S., Zhang X., Aijun X., Freitas E. (2019). High spatial resolution vehicular emissions inventory for China using VEIN model. Japan Geoscience Union (JPGU)."
      }
    },
    rightCard: {
      title: "🌪️ Ciencia en China: Inventarios Regionales y Tormentas de Polvo (GMD 2019 & AE 2021)",
      bullets: [
        "<strong>Inventario del Noreste de China (Atmospheric Environment, 2021):</strong> Asignación espacial de alta resolución combinando anuarios estadísticos provinciales, red vial jerárquica, factores de emisión estándar China I–VI y perfiles horarios.",
        "<strong>Simulación Multimodelo en Geoscientific Model Development (2019):</strong> Evaluamos simultáneamente los 4 grandes modelos químicos del mundo — <strong>CMAQ v5.2.1, CAMx v6.50, CHIMERE v2017r4 y WRF-Chem v3.9.1</strong> — durante eventos extremos de polvo primaveral en el noreste de China.",
        "<strong>Transferencia de conocimiento:</strong> Entrenamiento de estudiantes de posgrado chinos en el uso de R, datos espaciales y acoplamiento de emisiones."
      ],
      paper: {
        tag: "Atmospheric Environment (2021) & Geoscientific Model Development (2019)",
        text: "Ibarra-Espinosa et al. (2021) Comprehensive spatial and temporal vehicular emissions for northeast China, Atmos. Environ., 244, 117952 | Ma, Zhang, ..., Ibarra-Espinosa et al. (2019) GMD, 12, 4603–4625."
      }
    }
  },

  // ==========================================
  // STOP 6: FRANCIA — LYON & PARÍS / CEREA (2016–2021)
  // ==========================================
  {
    stopId: "france",
    subTitlePill: "Francia: Lyon & París (CEREA)",
    badgeType: "science",
    headline: "Parada 6: Francia — De la Escala Regional al Interior del Cañón Urbano (MUNICH)",
    subtitle: "Lyon (Conferencia TAP 2016) y colaboración con CEREA (École des Ponts ParisTech / EDF R&D, París): ¿qué ocurre con el ozono y los óxidos de nitrógeno entre los edificios de una avenida?",
    speakerNotes: "Explicar la conexión con Francia: primero en Lyon en 2016 presentando el modelo REMI para ciudades sin datos en la conferencia Transport and Air Pollution (TAP), y luego el trabajo conjunto con Youngseob Kim (CEREA, París) y Mario Gavidia acoplando VEIN con el modelo francés de cañones urbanos MUNICH (publicado en Geoscientific Model Development, 2021).",
    leftCard: {
      title: "🇫🇷 Acoplando VEIN con el Modelo Francés MUNICH (GMD, 2021)",
      formula: "C_{\\text{calle}} = C_{\\text{fondo}} + \\frac{Q_{\\text{VEIN}}}{W \\cdot (u_{\\text{techo}} + u_0)} \\cdot f\\left(\\frac{H}{W}, \\theta_{\\text{viento}}\\right)",
      bullets: [
        "<strong>El límite de los modelos de grilla:</strong> Un modelo como WRF-Chem tiene celdas de $1\\text{ a }5\\text{ km}$, pero un peatón respira a $1.5\\text{ m}$ del tubo de escape dentro de una calle rodeada de edificios altos.",
        "<strong>VEIN + MUNICH (Model of Urban Network of Intersecting Canyons and Highways):</strong> En colaboración con <strong>CEREA (París)</strong>, creamos el puente directo entre los flujos viales de VEIN y la red de cañones urbanos de MUNICH.",
        "<strong>Química dentro del cañón:</strong> Simulamos cómo la razón Altura/Ancho ($H/W$) atrapa el $\\text{NO}_x$ y deprime el $\\text{O}_3$ a nivel de vereda por titulación rápida ($\\text{NO} + \\text{O}_3 \\rightarrow \\text{NO}_2 + \\text{O}_2$).",
        "<strong>Modelo REMI en Lyon (TAP 2016):</strong> Metodología para construir inventarios bottom-up en ciudades en desarrollo con escasez severa de conteos viales."
      ],
      paper: {
        tag: "Geoscientific Model Development (2021) & TAP Lyon (2016)",
        text: "Gavidia-Calderón, Ibarra-Espinosa, Kim, Zhang & Andrade (2021). Simulation of O3 and NOx in São Paulo street urban canyons with VEIN and MUNICH. GMD."
      }
    },
    rightSim: "canyon_sim"
  },

  // ==========================================
  // STOP 7: REINO UNIDO — TRL & UNIVERSITY OF LEEDS (2016–PRESENTE)
  // ==========================================
  {
    stopId: "uk",
    subTitlePill: "Reino Unido: TRL & Univ. of Leeds",
    badgeType: "science",
    headline: "Parada 7: Reino Unido — Pasantía en TRL y 10+ Años junto a la University of Leeds",
    subtitle: "Desde mi pasantía doctoral como Emissions Analyst en el Transport Research Laboratory (TRL, UK) hasta una década de ciencia abierta, buses eléctricos y detección de Super-Emisores con el Dr. Karl Ropkins (ITS Leeds).",
    speakerNotes: "Contar cómo durante el doctorado hice una pasantía en el Reino Unido en TRL (Transport Research Laboratory) y cómo ahí se consolidó una colaboración de más de 10 años con el Dr. Karl Ropkins (Institute for Transport Studies, University of Leeds). Mencionar el premio Atmosphere Young Investigator Award (2024/2025) y el paper de Super-Emisores (2026).",
    stats: [
      { value: "TRL UK", label: "Pasantía Doctoral como Analista de Emisiones en el Reino Unido", color: "sky" },
      { value: "10+ Años", label: "Alianza científica con Dr. Karl Ropkins (Institute for Transport Studies, Leeds)", color: "amber" },
      { value: "Premio 2025", label: "Atmosphere Young Investigator Award por contribuciones en calidad del aire", color: "emerald" }
    ],
    leftCard: {
      title: "🇬🇧 Ciencia en el Reino Unido: De Mediciones Reales a Buses Eléctricos",
      bullets: [
        "<strong>Pasantía en TRL (Transport Research Laboratory):</strong> Análisis de bases de datos de factores de emisión europeos, mediciones en ruta (PEMS) y curvas de velocidad.",
        "<strong>Capítulo de Libro en Elsevier (2020):</strong> Coautor junto a Karl Ropkins (Leeds) y Yoann Bernard (ICCT) del capítulo <em>«Vehicle Emissions Measurement and Modeling»</em> en el libro de referencia mundial <em>Traffic-Related Air Pollution</em>.",
        "<strong>Transición a Euro VI y Buses Eléctricos a Batería (Sustainability, 2023):</strong> Meta-análisis cuantificando la reducción real de material particulado al electrificar flotas de transporte público.",
        "<strong>Paquete <code>respeciate</code> (GitHub <code>atmoschem</code>):</strong> Acceso programático a miles de perfiles de especiación química de COV y PM (US EPA SPECIATE y SPECIEUROPE)."
      ],
      paper: {
        tag: "Elsevier Book Chapter (2020) & Sustainability (2023)",
        text: "Ropkins K., Ibarra-Espinosa S.A., Bernard Y. (2020) Vehicle Emissions Measurement and Modeling, Elsevier | Tivey, ..., Ibarra-Espinosa, Ropkins (2023) Sustainability, 15, 1522."
      }
    },
    rightCard: {
      title: "🚗 Super-Emisores (High Emitters) y Programas de Revisión Técnica (2026)",
      bullets: [
        "<strong>La Ley de Pareto en las calles:</strong> Analizando millones de registros de programas de Inspección y Mantenimiento vehicular (I/M) junto a colegas de Reino Unido y Ecuador (Quito), demostramos que una pequeña fracción de <strong>vehículos super-emisores (mal mantenidos o sin catalizador funcional)</strong> domina las emisiones totales de la flota.",
        "<strong>Impacto directo de reparar o retirar el 5–10% peor:</strong> Las políticas focalizadas en <em>High Emitters</em> logran reducciones de $\\text{CO}$ e hidrocarburos mucho más rápidas y costo-efectivas que esperar la renovación natural del parque.",
        "<strong>Transferencia a ciudades andinas:</strong> Aplicación operativa en Quito, Bogotá, Lima y Manizales."
      ],
      paper: {
        tag: "Atmosphere (2026) · DOI: 10.3390/atmos17010031",
        text: "Ibarra-Espinosa S., Mera Z., Ropkins K., & Mantovani Jr. J.A. (2026). Quantifying the Impact of High Emitters on Vehicle Emissions: An Analysis of Inspection and Maintenance."
      }
    }
  },

  // ==========================================
  // STOP 8: EE.UU. (ETAPA 1) — CU BOULDER & NOAA GML (2022–2026)
  // ==========================================
  {
    stopId: "boulder",
    subTitlePill: "EE.UU. Etapa 1: NOAA GML & CU Boulder (2022–2026)",
    badgeType: "journey",
    headline: "Parada 8: Estados Unidos (Etapa 1) — University of Colorado Boulder & NOAA GML",
    subtitle: "Cuatro años (2022–2026) como Postdoctoral Associate en CIRES (CU Boulder) y el Global Monitoring Laboratory de la NOAA: cambiando la mirada de «abajo hacia arriba» (Bottom-Up) a «arriba hacia abajo» (Top-Down).",
    speakerNotes: "Contar el gran giro científico en 2022 al mudarme a Boulder, Colorado, para trabajar en CIRES (University of Colorado) y el Global Monitoring Laboratory (GML) de la NOAA con Arlyn Andrews, Lei Hu, Kathryn McKain, Colm Sweeney y Brian McDonald. Hasta aquí yo estimaba lo que salía de los tubos de escape (Bottom-Up); en NOAA aprendí a medir la atmósfera desde aviones, torres y satélites e invertir la ecuación (Top-Down) para descubrir cuánto metano emite realmente un continente.",
    stats: [
      { value: "NOAA GML", label: "Global Monitoring Laboratory & CIRES — Boulder, Colorado (2022–2026)", color: "sky" },
      { value: "-2.9 Tg/año", label: "Caída detectada en emisiones de Metano (CH4) de EE.UU. durante COVID-19", color: "emerald" },
      { value: "rtorf + ObsPack", label: "Software en R/Python para procesar observaciones globales y HYSPLIT paralelo", color: "amber" }
    ],
    leftCard: {
      title: "🏔️ De Contar Autos a Escuchar la Atmósfera Global en Boulder",
      bullets: [
        "<strong>¿Por qué los inventarios oficiales fallan en el Metano ($\\text{CH}_4$)?</strong> Las fugas en pozos de petróleo y gas, gasoductos, vertederos y humedales suelen subestimarse en los inventarios <em>Bottom-Up</em>.",
        "<strong>La solución <em>Top-Down</em> (Modelación Inversa):</strong> Medimos las concentraciones reales de $\\text{CH}_4$ y $\\text{CO}_2$ en <strong>torres altas, aviones de investigación y satélites</strong> (base de datos <strong>NOAA ObsPack</strong>) y lanzamos miles de partículas hacia atrás en el tiempo con <strong>HYSPLIT</strong> para rastrear de dónde vino ese aire.",
        "<strong>Creador de <code>rtorf</code> y <code>pytorf</code>:</strong> Desarrollé paquetes de alto rendimiento para leer NOAA ObsPack, configurar HYSPLIT y calcular millones de <em>footprints</em> (huellas receptor-fuente) en supercomputadores.",
        "<strong>Alcance tricontinental desde NOAA:</strong> Generamos huellas atmosféricas de alta resolución para <strong>Norteamérica</strong> (con meteorología HRRR 3 km, NAMS y GFS), la <strong>Cuenca Amazónica (Manaus, Brasil)</strong> y <strong>Uganda (África)</strong>."
      ],
      paper: {
        tag: "Conferencias GMAC NOAA & CIRES Rendezvous (Boulder, 2023)",
        text: "Ibarra-Espinosa S., Hu L. (2023). rtorf / robspack: a fast R package to read, process and plot NOAA/GML ObsPack and generate parallel HYSPLIT footprints."
      }
    },
    rightFigure: {
      images: [
        { src: "assets/rtorf_footprint.png", label: "Cubo de Huellas rtorf", caption: "Ejemplo de cubo espacio-temporal de sensibilidad (footprint) generado con el paquete rtorf acoplado a NOAA HYSPLIT." },
        { src: "assets/sergio_liberty.jpg", label: "Vida en EE.UU.", caption: "Viviendo y haciendo ciencia en Estados Unidos desde 2022 — representando también a NOAA en congresos hispanos (HACU 2024) y mentoría Pathways to STEAM." }
      ]
    }
  },
  {
    stopId: "boulder",
    subTitlePill: "Ciencia en NOAA GML: Metano (CH4)",
    badgeType: "science",
    headline: "Ciencia en NOAA GML: ¿Qué Pasó con el Metano de EE.UU. en la Pandemia y en los Campos de Petróleo?",
    subtitle: "Inversión Bayesiana con 35 sitios de monitoreo atmosférico: descubriendo caídas nacionales de metano en 2020–2021 y un ciclo estacional inesperado en el sector Oil & Gas (ES&T, 2025).",
    speakerNotes: "Explicar la ecuación de inversión atmosférica Bayesiana (s_hat = s_a + (HQ)^T (HQH^T + R)^-1 (z - Hs_a)) y los dos grandes hallazgos publicados en Environmental Science & Technology (2025) y Environ. Sci.: Atmospheres (2026), incluyendo la charla Keynote en Brasil 2024 y presentaciones en AGU Fall Meetings (Chicago, San Francisco, Washington DC, New Orleans).",
    leftCard: {
      title: "🛰️ Inversión Atmosférica Bayesiana de Metano ($\\text{CH}_4$)",
      formula: "\\hat{\\mathbf{s}} = \\mathbf{s}_a + \\mathbf{Q}\\mathbf{H}^T \\left(\\mathbf{H}\\mathbf{Q}\\mathbf{H}^T + \\mathbf{R}\\right)^{-1} \\left(\\mathbf{z}_{\\text{ObsPack}} - \\mathbf{H}\\mathbf{s}_a\\right)",
      bullets: [
        "<strong>¿Qué mide cada término?</strong> $\\mathbf{z}_{\\text{ObsPack}}$ son las mediciones en 35 torres y aviones de NOAA; $\\mathbf{H}$ es la matriz Jacobiana de sensibilidad (<em>footprints</em> de HYSPLIT); $\\mathbf{s}_a$ es el inventario previo y $\\hat{\\mathbf{s}}$ es la emisión real corregida por la atmósfera.",
        "<strong>Hallazgo 1 — Impacto del COVID-19 en el Metano de EE.UU. (2026):</strong> Detectamos desde la atmósfera una reducción estadísticamente significativa de <strong>$-2.5\\text{ Tg CH}_4/\\text{año}$ en 2020</strong> y <strong>$-2.9\\text{ Tg CH}_4/\\text{año}$ en 2021</strong> en EE.UU., explicada por el desplome en la perforación de nuevos pozos de petróleo y gas.",
        "<strong>Hallazgo 2 — Ciclo Estacional Inesperado en Petróleo y Gas (ES&T, 2025):</strong> A diferencia de los inventarios estáticos que asumen emisiones planas todo el año, las observaciones revelan un fuerte máximo estacional ligado a la operación energética e infraestructura."
      ],
      paper: {
        tag: "Environmental Science & Technology (2025) & Environ. Sci.: Atmospheres (2026)",
        text: "Hu, Andrews, Montzka, Miller, ..., Ibarra-Espinosa et al. (2025) ES&T, 59(20), 9968–9979 | Ibarra-Espinosa, Hu, Harkins, McDonald, Miller, ..., Andrews (2026) Reduced U.S. Methane Emissions during COVID-19."
      }
    },
    rightCard: {
      title: "🤝 Mentoría e Impacto Social desde Colorado",
      bullets: [
        "<strong>Keynote Speaker Internacional (2024):</strong> Conferencista magistral (Keynote) en la <em>Air Pollution Conference Brazil & 5th CMAS South America</em> presentando los resultados de metano de NOAA.",
        "<strong>Programa <em>Pathways to STEAM</em> (CIRES / CU Boulder):</strong> Organizador de estancias científicas para estudiantes de colegios comunitarios (Citrus College, California), llevándolos a medir e investigar en los laboratorios de NOAA.",
        "<strong>Representante de NOAA en HACU (2024):</strong> Representando a la agencia federal en la <em>Hispanic Association of Colleges and Universities</em> para abrir puertas a jóvenes latinoamericanos en ciencias de la Tierra."
      ],
      paper: {
        tag: "4 AGU Fall Meetings Consecutivos (2022–2025)",
        text: "Presentaciones en Chicago (2022), San Francisco (2023), Washington D.C. (2024) y New Orleans (2025)."
      }
    }
  },

  // ==========================================
  // STOP 9: EE.UU. (ACTUALIDAD) — UMD (CISESS) & NOAA ARL (2026–PRESENTE)
  // ==========================================
  {
    stopId: "umd",
    subTitlePill: "Actualidad: UMD & NOAA ARL (2026–Hoy)",
    badgeType: "journey",
    headline: "Parada 9: Presente — University of Maryland (CISESS) & NOAA Air Resources Laboratory",
    subtitle: "Desde marzo de 2026 en College Park, Maryland (Área Metropolitana de Washington D.C.): vigilando la estratósfera del planeta, desarrollando el núcleo estadístico de HYSPLIT y aplicando Inteligencia Artificial.",
    speakerNotes: "Contar en qué estoy trabajando hoy mismo como Visiting Assistant Research Scientist en CISESS / ESSIC (University of Maryland) y NOAA Air Resources Laboratory (ARL) junto a la Dra. Alice Crawford y el programa Earth's Radiation Budget (ERB).",
    stats: [
      { value: "28 km", label: "Altitud estratosférica monitoreada con la red mundial de globos B2SAP y HYSPLIT", color: "sky" },
      { value: "20,000", label: "Partículas por nivel para convergencia trans-Pacífica (14,000 km)", color: "amber" },
      { value: "GMM + KDE", label: "Nueva interpolación estadística de parcelas Lagrangianas e inversión FLAN", color: "emerald" },
      { value: "XGBoost / AI", label: "Machine Learning transferible entre ciudades (IEEE T-ITS 2026) y Prithvi", color: "rose" }
    ],
    leftCard: {
      title: "🎈 Vigilando la Estratósfera: ¿Podemos Detectar la Geoingeniería Solar?",
      bullets: [
        "<strong>El nuevo riesgo global — Inyección Estratosférica de Aerosoles (SAI):</strong> Por mandato del Congreso de EE.UU. (programa <strong>NOAA Earth's Radiation Budget - ERB</strong>), investigamos cómo detectar inyecciones naturales (volcanes como <strong>Hunga Tonga</strong> o <strong>Raikoke</strong>) o humanas/encubiertas de aerosoles que alteran el brillo del planeta.",
        "<strong>La Red Global de Globos B2SAP:</strong> Globos instrumentados lanzados hasta ~28 km de altitud en <strong>Boulder (40°N), Hilo Hawaii (20°N), Isla Reunión (20°S), Lauder Nueva Zelanda (45°S), Utqiagvik Alaska y Antártica</strong>.",
        "<strong>Software <code>hysplit-strato</code> y Visualizador <code>wondersnap</code>:</strong> Construí el flujo operacional de transporte Lagrangiano inverso con HYSPLIT y matrices de coeficientes de transferencia (TCM) sobre 1,304 sondeos globales."
      ],
      paper: {
        tag: "GitHub NOAA ARL & AMS 2027 / GMU 2026",
        text: "Código abierto: github.com/noaa-oar-arl/hysplit-strato | Visualizador interactivo: ibarraespinosa.github.io/wondersnap | Ibarra-Espinosa & Crawford (2026, 2027)."
      }
    },
    rightFigure: {
      images: [
        { src: "assets/b2sap_global_sensitivity.png", label: "Sensibilidad Global B2SAP (N=1304)", caption: "Sensibilidad de huella acumulada (Footprint Sensitivity) de la red completa de globos estratosféricos B2SAP (N = 1,304 sondeos, 645,411 celdas) calculada con hysplit-strato." },
        { src: "assets/hysplit_hunga_tonga_pod.png", label: "Detección Erupción Hunga Tonga", caption: "Mapa acumulado 2D de Probabilidad de Detección (POD) de la red HYSPLIT para una liberación estratosférica tipo Hunga Tonga." }
      ]
    }
  },
  {
    stopId: "umd",
    subTitlePill: "Ciencia en NOAA ARL: HYSPLIT & ML",
    badgeType: "science",
    headline: "Ciencia en NOAA ARL & UMD: Convergencia Lagrangiana, Modelos de Mezcla Gaussiana y Machine Learning",
    subtitle: "Resolviendo el cuello de botella de simular millones de partículas en la atmósfera y transfiriendo modelos de Machine Learning (XGBoost) entre ciudades sin monitoreo.",
    speakerNotes: "Mostrar la comparación entre 2,500 y 100,000 partículas en HYSPLIT (y por qué estamos implementando Gaussian Mixture Models y Kernel Density Estimation con Alice Crawford, además del modelo inverso en Fortran FLAN que también corre en el supercomputador chileno Leftraru). Y mostrar el paper de 2026 en IEEE Transactions on Intelligent Transportation Systems usando XGBoost.",
    leftCard: {
      title: "🧮 De Partículas Discretas a Superficies Continuas + Machine Learning",
      formula: "\\text{POD}(x,y,z,t) = \\mathbb{I}\\left( Q_{\\text{SAI}} \\cdot \\mathbf{M}_{x,y,z,t,s} \\ge \\text{DL}_{10^{-7}\\,\\text{g/m}^3} \\right)",
      bullets: [
        "<strong>Convergencia de Partículas en HYSPLIT:</strong> Demostramos que a escalas hemisféricas (14,000 km), usar pocas partículas ($2,500$) rompe la pluma en filamentos ruidosos, mientras que $\\ge 20,000\\text{–}100,000$ logra convergencia espacial asintótica.",
        "<strong>Innovación con GMM y KDE (2026):</strong> Implementamos <em>Gaussian Mixture Models</em> y <em>Kernel Density Estimation</em> dentro de HYSPLIT para reconstruir superficies continuas de concentración con una fracción del costo computacional.",
        "<strong>Modelo Inverso <code>FLAN</code> + Supercomputador Chileno <em>Leftraru</em>:</strong> Sistema en Fortran que combina matrices de HYSPLIT con filtros de Kalman y estimación Bayesiana (para metano, humo de incendios forestales en EE.UU./Chile y volcanes).",
        "<strong>Machine Learning a Nivel de Vía (2026):</strong> Con <strong>XGBoost</strong> predecimos flujo y velocidad horaria regional a partir de datos abiertos en Brasil; demostramos cómo calibrar el sesgo de transferencia entre ciudades a &lt;5% con conteos locales."
      ],
      paper: {
        tag: "Earth Systems and Environment (2026) & CRC Press Book (2027)",
        text: "Ibarra-Espinosa S., Tiburcio I., Da Silva I., Magri J., et al. (2026). Predicting Regional Hourly Traffic and Speed at Road Level Using Machine Learning in Brazil. Earth Systems and Environment."
      }
    },
    rightFigure: {
      images: [
        { src: "assets/hysplit_so2_2500.png", label: "HYSPLIT np = 2,500 (Ruidoso)", caption: "Dispersión estratosférica global de SO2 con 2,500 partículas: fragmentación artificial en los bordes de la pluma." },
        { src: "assets/hysplit_so2_100k.png", label: "HYSPLIT np = 100,000 (Convergente)", caption: "Dispersión estratosférica global de SO2 con 100,000 partículas: campo continuo que captura vórtices subtropicales y transporte hemisférico." },
        { src: "assets/xgb_regional_grid.png", label: "XGBoost Tráfico y Velocidad (2026)", caption: "Predicción regional horaria (~3 km) de flujo (PC, LCV, MC, Camiones, Buses) y velocidad media con modelos XGBoost." }
      ]
    }
  },
  {
    stopId: "umd",
    subTitlePill: "Simulador Estratosférico & Inversión",
    badgeType: "interactive",
    headline: "Laboratorio Interactivo NOAA: Detección Estratosférica (SAI) e Inversión Top-Down",
    subtitle: "Simula una inyección de aerosoles en la estratósfera o una anomalía regional de metano y observa cómo responde la red de vigilancia atmosférica.",
    speakerNotes: "Usar este simulador para explicar de forma intuitiva a los estudiantes de física y medio ambiente cómo la masa inyectada, la altitud estratosférica (viento zonal QBO/jet polar) y el número de estaciones de globos determinan la probabilidad de detectar una intervención climática.",
    renderType: "strato_simulator"
  },

  // ==========================================
  // STOP 10: REGRESO A CASA — DE UTEM PARA EL MUNDO (2026)
  // ==========================================
  {
    stopId: "return_utem",
    subTitlePill: "De Vuelta en Casa — UTEM 2026",
    badgeType: "journey",
    headline: "Parada Final: De Campus Ñuñoa para el Mundo — ¿Qué Aprendí en estos 19 Años?",
    subtitle: "48+ artículos científicos, 1,665+ citas, H-index 26, más de 100,000 descargas de software y 7 países después: la raíz sigue siendo la Ingeniería en Prevención de Riesgos y Medio Ambiente de la UTEM.",
    speakerNotes: "Cerrar la charla hablando directamente al corazón de los estudiantes de la UTEM. Mostrar que un estudiante de universidad pública tecnológica chilena puede competir y colaborar de igual a igual en USP, la Academia China de Ciencias, Leeds, Harvard, CU Boulder, UMD y la NOAA.",
    stats: [
      { value: "1,665+", label: "Citas científicas en Google Scholar (Índice H = 26)", color: "amber" },
      { value: "48+", label: "Artículos en revistas indexadas (ES&T, GMD, IEEE, Atmos. Env., JGR)", color: "sky" },
      { value: "10+ Paquetes", label: "Software abierto en R, Python y Fortran (>100,000 descargas)", color: "emerald" },
      { value: "3 Idiomas", label: "Español, Portugués (9 años en Brasil) e Inglés (EE.UU. desde 2022)", color: "rose" }
    ],
    leftCard: {
      title: "🚀 5 Consejos Prácticos para Estudiantes de la UTEM",
      bullets: [
        "<strong>1. No existe techo de cristal para un egresado UTEM:</strong> Tu formación práctica en ingeniería, prevención y ciencias básicas es una ventaja enorme cuando la combinas con curiosidad científica.",
        "<strong>2. Aprende a programar hoy mismo (R, Python, Fortran, Linux):</strong> Un profesional ambiental que sabe programar y analizar grandes volúmenes de datos multiplica por 100 su impacto y su empleabilidad global.",
        "<strong>3. Los idiomas abren continentes:</strong> Aprender portugués me abrió Brasil (Becas Chile en la USP); aprender inglés me abrió el Reino Unido, China, Francia y la NOAA en EE.UU.",
        "<strong>4. Comparte tu código (Ciencia Abierta):</strong> Subir <code>VEIN</code> a CRAN y GitHub hizo que investigadores de Polonia, España, China, Ecuador, Perú y EE.UU. me escribieran para colaborar.",
        "<strong>5. Nunca olvides el propósito humano:</strong> Ya sea midiendo infecciones respiratorias en Pudahuel o vigilando la estratósfera en la NOAA, hacemos ciencia para proteger la vida y la salud de las personas."
      ],
      paper: {
        tag: "Puertas Abiertas para Colaborar con Estudiantes y Profesores de la UTEM",
        text: "Tesis, pasantías, cursos de modelación con VEIN / rtorf / HYSPLIT y proyectos conjuntos usando supercomputación (NLHPC Leftraru)."
      }
    },
    rightCard: {
      title: "🌐 Enlaces Directos, Código Abierto y Contacto",
      bullets: [
        "<strong>Sitio Web & Portafolio:</strong> <a href='https://ibarraespinosa.github.io/' target='_blank'>ibarraespinosa.github.io</a>",
        "<strong>Visualizador Estratosférico NOAA:</strong> <a href='https://ibarraespinosa.github.io/wondersnap' target='_blank'>ibarraespinosa.github.io/wondersnap</a>",
        "<strong>HYSPLIT-Strato (NOAA ARL):</strong> <a href='https://github.com/noaa-oar-arl/hysplit-strato' target='_blank'>github.com/noaa-oar-arl/hysplit-strato</a>",
        "<strong>Organización AtmosChem (VEIN, eixport, PEGA, respeciate):</strong> <a href='https://github.com/atmoschem' target='_blank'>github.com/atmoschem</a>",
        "<strong>Curso Abierto VEIN 2026:</strong> <a href='https://ibarraespinosa.github.io/cursovein2026/' target='_blank'>ibarraespinosa.github.io/cursovein2026</a>",
        "<strong>Google Scholar:</strong> <a href='https://scholar.google.com.br/citations?user=8ohZGHEAAAAJ' target='_blank'>Perfil de Citaciones (1,665+ citas, H=26)</a>",
        "<strong>Contacto:</strong> <code>zergioibarra@gmail.com</code> · <code>sibarrae@umd.edu</code>"
      ],
      paper: {
        tag: "¡Muchas Gracias, Comunidad UTEM! — Café Conversatorio & Preguntas",
        text: "Departamento de Física & Decanato de la Facultad de Ciencias Naturales, Matemática y del Medioambiente — Campus Ñuñoa, 17 de noviembre de 2026."
      }
    }
  }
];
