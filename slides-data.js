// Contenido editable. Títulos: <br> y <em>. Los demás campos son texto.
// Coordenadas: [longitud, latitud]. Las ubicaciones sin ciudad en el CV son aproximadas.
// Para añadir una foto, usa images: [{ src: 'assets/mi-foto.jpg', alt: '...', caption: '...' }].
// Datos: Sergio_CV_2026_11.md y viajes confirmados por Sergio (Tacna y financiamiento a Japón).
window.TALK = { name: "Sergio Ibarra-Espinosa", date: "17 de noviembre de 2026", location: "Campus Ñuñoa · UTEM", email: "zergioibarra@gmail.com" };

window.STOPS = [
  { id: "utem", name: "UTEM", period: "2003—2007", coordinates: [-70.65, -33.45], description: "La formación y las primeras preguntas.", label: "Santiago", country: "Chile" },
  { id: "chile", name: "Chile", period: "2007—2013", coordinates: [-70.65, -33.45], description: "CENMA, magíster y los primeros congresos.", label: "Santiago", country: "Chile" },
  { id: "brasil", name: "Brasil", period: "2013—2022", coordinates: [-46.63, -23.55], description: "Doctorado, postdoctorados y ciencia abierta.", label: "São Paulo", country: "Brasil" },
  { id: "europa", name: "Europa", period: "Pasantía y congresos", coordinates: [-0.78, 51.37], description: "Reino Unido, Lyon y Viena.", label: "Reino Unido", country: "Reino Unido" },
  { id: "japon", name: "Japón", period: "2017—2019", coordinates: [140.1, 35.61], description: "Chiba, Takamatsu y becas de viaje.", label: "Chiba", country: "Japón" },
  { id: "china", name: "China", period: "2019", coordinates: [105, 36], description: "Academia China de Ciencias.", label: "China", country: "China" },
  { id: "america", name: "América", period: "Encuentros en la región", coordinates: [-58.38, -34.6], description: "Buenos Aires, Lima, Tacna y más encuentros.", label: "Buenos Aires", country: "Argentina" },
  { id: "boulder", name: "Boulder", period: "2022—2026", coordinates: [-105.27, 40.01], description: "CIRES, CU Boulder y NOAA GML.", label: "Boulder", country: "Estados Unidos" },
  { id: "eeuu", name: "EE. UU.", period: "2022—2025", coordinates: [-87.63, 41.88], description: "Los congresos también hacen camino.", label: "Chicago", country: "Estados Unidos" },
  { id: "maryland", name: "Maryland", period: "Desde 2026", coordinates: [-76.94, 38.99], description: "CISESS, University of Maryland y NOAA ARL.", label: "Maryland", country: "Estados Unidos" },
  { id: "regreso", name: "Volver", period: "UTEM · 2026", coordinates: [-70.65, -33.45], description: "Compartir el camino y pensar en lo que viene.", label: "Santiago", country: "Chile" },
];

const graduation = { src: "assets/sergio_grad.jpg", alt: "Sergio en su fotografía de titulación de la UTEM, acompañado de su familia.", caption: "Titulación en la UTEM · Archivo personal", treatment: "archive" };
const santiago = { src: "assets/photos/santiago.webp", alt: "Santiago de Chile y la cordillera de los Andes en invierno.", caption: "Santiago · Fotografía de contexto", credit: "Victor San Martin · CC BY-SA 2.0", creditUrl: "https://commons.wikimedia.org/wiki/File:Santiago_en_invierno.jpg" };
const saopaulo = { src: "assets/photos/saopaulo.webp", alt: "Vista de São Paulo y el río Pinheiros.", caption: "São Paulo · Fotografía de contexto", credit: "Agent010 · CC BY-SA 4.0", creditUrl: "https://commons.wikimedia.org/wiki/File:Marginal_Pinheiros_e_Jockey_Club.jpg" };
const japan = { src: "assets/photos/japan.webp", alt: "Una calle tradicional de Japón con una pagoda al fondo.", caption: "Japón · Fotografía de contexto", credit: "Unsplash", creditUrl: "https://unsplash.com/license" };

window.SLIDES = [
  {
    id: "inicio", stop: "utem", type: "cover", eyebrow: "CHARLA + CONVERSATORIO · UTEM 2026",
    title: "De la UTEM<br>para el <em>mundo.</em>", text: "Trayectoria de un Ingeniero en Prevención de Riesgos y Medio Ambiente.",
    notes: "Agradece la invitación del Departamento de Física y del Decanato. El recorrido cuenta cómo una formación en la UTEM se conectó con la ciencia atmosférica y con personas de distintos lugares. Puedes empezar preguntando quién ha pensado en investigar o estudiar fuera de Chile.",
  },
  {
    id: "origen", stop: "utem", eyebrow: "EL PUNTO DE PARTIDA", period: "2003—2007", title: "Todo empezó<br><em>aquí.</em>",
    text: "Ingeniería en Prevención de Riesgos y Medio Ambiente en la Universidad Tecnológica Metropolitana.",
    details: [{ label: "La formación", text: "Ingeniería y Licenciatura en Ciencias Ambientales." }, { label: "La primera tesis", text: "Contaminación atmosférica e infecciones respiratorias agudas." }],
    takeaway: "Un problema cercano puede ser el comienzo de una trayectoria científica.", images: [graduation],
    notes: "Detente en esta foto. Cuenta un recuerdo real de la UTEM: cómo elegiste la carrera, quién te ayudó o qué profesor te acercó a la investigación. Esa parte de tu historia vale más aquí que una lista de logros.",
  },
  {
    id: "aire-y-salud", stop: "utem", eyebrow: "LA PREGUNTA QUE SIGUIÓ VIAJANDO", period: "Santiago, Chile", title: "El aire que<br><em>respiramos.</em>",
    text: "Estudiar la relación entre contaminación y salud fue una de mis primeras formas de hacer ciencia.",
    details: [{ label: "Pudahuel", text: "Estudios sobre contaminación y enfermedades respiratorias." }, { label: "Desde 2008", text: "Presentaciones sobre material particulado y salud en congresos en Chile." }],
    takeaway: "La ciencia también empieza con preguntas sobre el lugar donde vivimos.", images: [santiago],
    notes: "Explica la tesis con una pregunta sencilla: ¿qué ocurre con las consultas respiratorias cuando cambia la contaminación? Cuenta cómo trabajaste con los datos. Conecta el problema con la experiencia cotidiana de los estudiantes.",
  },
  {
    id: "cenma", stop: "chile", eyebrow: "APRENDER TRABAJANDO", period: "2007—2013", title: "De la pregunta<br><em>al trabajo real.</em>",
    text: "Seis años en el Centro Nacional del Medio Ambiente, desarrollando inventarios de emisiones y proyectos para instituciones públicas.",
    details: [{ label: "Inventarios", text: "Estimar cuánto emiten el transporte, los aeropuertos y otras actividades." }, { label: "Investigación", text: "Artículos sobre contaminación y salud en Santiago y Buenos Aires." }],
    images: [santiago], notes: "Cuenta cómo llegaste a CENMA. Explica un inventario como una contabilidad de emisiones. Menciona los primeros artículos de 2011 y 2013. Foto sugerida: equipo de CENMA o una salida a terreno.",
  },
  {
    id: "magister", stop: "chile", eyebrow: "TRABAJAR Y SEGUIR ESTUDIANDO", period: "2010—2011", title: "Una pregunta<br>lleva a <em>otra.</em>",
    text: "Magíster en Gestión y Planificación Ambiental en la Universidad de Chile, con una beca de CENMA.",
    details: [{ label: "La tesis", text: "Cómo mejorar la estimación de emisiones vehiculares en Santiago." }, { label: "El apoyo", text: "Una beca para continuar la formación mientras trabajaba." }],
    visual: "notebook", notebook: { number: "2010", title: "Seguir estudiando", items: ["Universidad de Chile", "Beca de CENMA", "Emisiones del transporte"] },
    notes: "Habla de algo concreto: cómo se financió el magíster y cómo fue compatibilizarlo con el trabajo. Cuenta qué te ayudó a decidir postular a un doctorado.",
  },
  {
    id: "congresos-chile", stop: "chile", eyebrow: "LOS PRIMEROS ENCUENTROS", period: "2008—2013", title: "Salir a contar<br><em>lo que haces.</em>",
    text: "Los primeros congresos también hicieron camino: Valparaíso, Arica, Concepción y Punta de Tralca.",
    location: { label: "Arica", country: "Chile", coordinates: [-70.31, -18.48] },
    details: [{ label: "Arica · 2009", text: "Congreso Latinoamericano de Física y Química Ambiental." }, { label: "Valparaíso", text: "Física y nanotecnología en la UTFSM, 2008 y 2009." }, { label: "2011 / 2013", text: "Jornadas de Física y Química Ambiental en Concepción y Punta de Tralca." }],
    visual: "globe", atlasTitle: "Arica", atlasSubtitle: "Chile · 2009", notes: "Cuenta cómo fue presentar tu trabajo por primera vez. En El recorrido están las ciudades individuales con sus eventos. Puedes añadir fotos de cada congreso en el archivo de viajes.",
  },
  {
    id: "doctorado", stop: "brasil", eyebrow: "CRUZAR LA CORDILLERA", period: "2013—2017", title: "Una nueva ciudad.<br>Un <em>doctorado.</em>",
    text: "Doctorado en Meteorología en la Universidade de São Paulo, con una beca del programa Becas Chile.",
    details: [{ label: "La investigación", text: "Modelación del aire de São Paulo con inventarios de emisiones vehiculares." }, { label: "2018", text: "Reconocimiento Destaque Doutorado en Meteorología, IAG/USP." }],
    images: [saopaulo], notes: "Cuenta cómo elegiste la USP y cómo postulaste a Becas Chile. ¿Qué fue difícil al comienzo? ¿Cómo fue estudiar y defender en portugués? Foto sugerida: llegada a Brasil, campus o defensa.",
  },
  {
    id: "vein", stop: "brasil", eyebrow: "UNA HERRAMIENTA QUE PUEDE VIAJAR", period: "Ciencia abierta", title: "Crear algo.<br><em>Compartirlo.</em>",
    text: "Durante el doctorado desarrollé VEIN, un paquete de R para estimar emisiones del transporte. Con eixport, esos datos llegan a los modelos atmosféricos.",
    details: [{ label: "VEIN", text: "Del tráfico a un inventario de emisiones, calle por calle." }, { label: "Código abierto", text: "Herramientas que otros pueden usar, estudiar y mejorar." }],
    link: { label: "Conocer VEIN", href: "https://atmoschem.github.io/vein/" },
    images: [
      { src: "assets/logos/vein_logo.png", alt: "Logotipo de VEIN: un mapa circular de emisiones en tonos violetas y amarillos.", caption: "VEIN · Vehicular Emissions Inventories", fit: "contain", kind: "logo", credit: "Proyecto VEIN", creditUrl: "https://github.com/atmoschem/vein" },
      { src: "assets/vein_streets_nox.png", alt: "Mapa de emisiones vehiculares de NOx en las calles de São Paulo.", caption: "VEIN · Emisiones de NOx en São Paulo, 08:00 h", fit: "contain" },
      { src: "assets/vein_flow_sp.png", alt: "Mapa del flujo vehicular de São Paulo.", caption: "VEIN · Flujo vehicular en São Paulo", fit: "contain" },
      { src: "assets/vein_grids_nox.png", alt: "Emisiones de NOx distribuidas en una grilla.", caption: "De las calles a una grilla de emisiones", fit: "contain" },
    ],
    notes: "Amplía las figuras con un clic. Explica por qué sirve saber dónde y cuándo se emite. El CV registra más de 50.000 descargas directas de VEIN y 40.000 de eixport. VEIN se publicó en GMD y eixport en JOSS en 2018.",
  },
  {
    id: "brasil-investigacion", stop: "brasil", eyebrow: "LA ETAPA BRASILEÑA", period: "2017—2022", title: "Aprender.<br>Y también <em>enseñar.</em>",
    text: "Después del doctorado vinieron la investigación postdoctoral, nuevas colaboraciones y cursos para compartir las herramientas.",
    details: [{ label: "2017—2021", text: "Postdoctorado en la USP: emisiones, políticas ambientales y calidad del aire." }, { label: "2021—2022", text: "IPEN y METROCLIMA: estudiar los flujos de CO₂." }, { label: "Docencia", text: "Cursos de R y VEIN, divulgación y actividades para personas mayores." }],
    images: [saopaulo], notes: "La etapa brasileña incluye las estancias en otros países. Cuenta una colaboración o una clase que recuerdes. En El recorrido también están Natal, Santa Maria, Belo Horizonte y los congresos de São Paulo.",
  },
  {
    id: "reino-unido", stop: "europa", eyebrow: "APRENDER CON OTROS", period: "Durante el doctorado", title: "La ciencia se hace<br><em>con personas.</em>",
    text: "Una pasantía como analista de emisiones en el Transport Research Laboratory, Reino Unido.",
    details: [{ label: "TRL", text: "Experiencia internacional en análisis de emisiones." }, { label: "Leeds", text: "Colaboraciones con Karl Ropkins en medición y modelación de emisiones." }],
    takeaway: "Una estancia puede abrir una colaboración que sigue muchos años.", visual: "globe", atlasTitle: "Reino Unido", atlasSubtitle: "Transport Research Laboratory · Pasantía doctoral",
    notes: "Cuenta cómo surgió la pasantía y qué aprendiste. El CV no especifica su año exacto. El punto del globo corresponde a la zona de TRL. Leeds es una colaboración; una visita allí no está fechada en el CV. Foto sugerida: TRL o el viaje.",
  },
  {
    id: "lyon", stop: "europa", eyebrow: "FRANCIA", period: "Mayo de 2016", title: "Una idea llega<br>a <em>Lyon.</em>",
    location: { label: "Lyon", country: "Francia", coordinates: [4.84, 45.76] },
    text: "21st International Transport and Air Pollution Conference: presentar el modelo REMI para ciudades con pocos datos.",
    details: [{ label: "La pregunta", text: "¿Cómo construir inventarios de emisiones cuando falta información?" }, { label: "El encuentro", text: "Compartir métodos y recibir preguntas de otros investigadores." }],
    visual: "globe", atlasTitle: "Lyon", atlasSubtitle: "Transport and Air Pollution · 2016",
    notes: "Cuenta una anécdota real de Francia y cómo llegaste al congreso. El CV confirma Lyon, del 24 al 26 de mayo de 2016. No se asume una estancia en París. Foto sugerida: presentación, ciudad o colegas.",
  },
  {
    id: "viena", stop: "europa", eyebrow: "AUSTRIA", period: "Abril de 2018", title: "Presentar.<br>Escuchar. <em>Conectar.</em>",
    location: { label: "Viena", country: "Austria", coordinates: [16.37, 48.21] },
    text: "En la Asamblea General de la European Geosciences Union, trabajos sobre VEIN, tráfico, GPS y herramientas abiertas de emisiones.",
    details: [{ label: "EGU · Viena", text: "Presentaciones del 8 al 13 de abril de 2018." }, { label: "Financiamiento", text: "Apoyo de viaje del IAG/USP, registrado en el CV." }],
    takeaway: "Vale la pena buscar los apoyos para participar.", visual: "globe", atlasTitle: "Viena", atlasSubtitle: "European Geosciences Union · 2018",
    notes: "Explica cómo se solicita un apoyo de viaje. ¿Qué había que enviar? ¿Con cuánta anticipación? Ese detalle práctico puede ser muy útil para los estudiantes.",
  },
  {
    id: "chiba", stop: "japon", eyebrow: "JAPÓN · MÁS DE UNA VEZ", period: "2017 y 2019", title: "Sí, <em>Japón.</em><br>Con apoyo de viaje.",
    text: "Participar en la Japan Geoscience Union en Chiba, presentar investigación y conocer otro lado del mundo.",
    details: [{ label: "JpGU · 2017", text: "Aplicación de VEIN en Shanghái. Beca de viaje de la organización." }, { label: "JpGU · 2019", text: "Inventarios vehiculares de alta resolución para China." }],
    takeaway: "Hay oportunidades que empiezan con una postulación.", images: [japan],
    notes: "Este es un buen momento para contar que has viajado a Japón varias veces con financiamiento, como confirmaste para esta charla. El CV identifica expresamente la beca JpGU 2017. Cuenta cómo postulaste y qué cubría. La foto es de contexto, no de Chiba: reemplázala por tus propias fotos de Japón.",
  },
  {
    id: "takamatsu", stop: "japon", eyebrow: "OTRO ENCUENTRO EN JAPÓN", period: "2018", title: "Japón,<br><em>otra vez.</em>",
    location: { label: "Takamatsu", country: "Japón", coordinates: [134.05, 34.34] },
    text: "En Takamatsu, el simposio iCACGP y la conferencia IGAC: hacia un inventario vehicular global.",
    details: [{ label: "La investigación", text: "Presentar avances de inventarios de emisiones con herramientas abiertas." }, { label: "El apoyo", text: "Beca de viaje de la organización para iCACGP / IGAC 2018." }],
    images: [japan], notes: "Cuenta qué recuerdas de Takamatsu y qué diferencias encontraste respecto a Chiba. Es una segunda beca de viaje a Japón que sí aparece en el CV. Añade varias imágenes a images para tener una pequeña galería con tus recuerdos.",
  },
  {
    id: "china", stop: "china", eyebrow: "AL OTRO LADO DEL MUNDO", period: "Enero—julio de 2019", title: "El mismo código.<br><em>Otro continente.</em>",
    text: "Postdoctorado en la Academia China de Ciencias, desarrollando inventarios de emisiones vehiculares con VEIN.",
    details: [{ label: "El trabajo", text: "Adaptar la herramienta a otros datos y otro territorio." }, { label: "Una publicación", text: "Inventario espacial y temporal del noreste de China, Atmospheric Environment (2021)." }],
    takeaway: "Lo que construyes puede ser útil mucho más lejos de lo que imaginas.", visual: "globe", atlasTitle: "China", atlasSubtitle: "Chinese Academy of Sciences · 2019",
    notes: "Cuenta una escena de la vida en China: el idioma, una comida o el primer día en el laboratorio. El mapa usa un punto de referencia del país porque el CV no indica la ciudad del postdoctorado. Foto sugerida: equipo o viaje. La estancia fue en 2019; el artículo se publicó en 2021.",
  },
  {
    id: "buenos-aires", stop: "america", eyebrow: "ARGENTINA", period: "2012", title: "La ciencia también<br>conecta <em>vecinos.</em>",
    text: "En Buenos Aires, presentar trabajo sobre el pronóstico de CO y NOx con distintas técnicas estadísticas.",
    details: [{ label: "2012", text: "Ciencia y Tecnología Ambiental: un enfoque integrador." }, { label: "2013", text: "Artículo comparando contaminación y mortalidad en Buenos Aires y Santiago." }],
    visual: "globe", atlasTitle: "Buenos Aires", atlasSubtitle: "Argentina · Ciencia y Tecnología Ambiental",
    notes: "Este bloque reúne encuentros en América Latina, aunque sus fechas se superponen con otras etapas. Cuenta cómo nació la colaboración con Argentina. Foto sugerida: Buenos Aires o el equipo del encuentro.",
  },
  {
    id: "lima", stop: "america", eyebrow: "PERÚ", period: "2021 / 2023", title: "Compartir VEIN<br>en <em>Lima.</em>",
    location: { label: "Lima", country: "Perú", coordinates: [-77.04, -12.05] },
    text: "Charlas invitadas por la Universidad Nacional Tecnológica de Lima Sur, junto a Odón Sánchez.",
    details: [{ label: "La herramienta", text: "Inventarios de emisiones vehiculares con VEIN." }, { label: "Junio de 2023", text: "Presentación disponible en video y materiales abiertos." }],
    link: { label: "Ver los materiales", href: "https://ibarraespinosa.github.io/2023PERU/" },
    visual: "globe", atlasTitle: "Lima", atlasSubtitle: "Universidad Nacional Tecnológica de Lima Sur",
    notes: "Cuenta el viaje a Perú y a las personas que conociste. El CV lista charlas en 2021 y 2023; confirma oralmente cuáles fueron presenciales si quieres dar ese detalle. Foto sugerida: universidad, charla o colegas.",
  },
  {
    id: "tacna", stop: "america", eyebrow: "PERÚ · OTRO DESTINO", title: "También<br><em>Tacna.</em>",
    location: { label: "Tacna", country: "Perú", coordinates: [-70.25, -18.01] },
    text: "Otro de los lugares que forman parte de este recorrido por la región.",
    takeaway: "Cada encuentro tiene una historia que no cabe en un currículum.",
    visual: "globe", atlasTitle: "Tacna", atlasSubtitle: "Perú · Un recuerdo del camino",
    notes: "Viaje confirmado por Sergio en la conversación. Completa aquí el año, la institución y el nombre del encuentro. Cuenta una anécdota real de Tacna. Foto sugerida: viaje, ciudad o congreso. Los datos no aparecen en el CV, así que no se ha inventado una fecha.",
  },
  {
    id: "boulder", stop: "boulder", eyebrow: "UNA NUEVA ESCALA", period: "2022—2026", title: "De las ciudades<br><em>al continente.</em>",
    text: "Postdoctoral Associate en CIRES, University of Colorado Boulder, y NOAA Global Monitoring Laboratory.",
    details: [{ label: "El problema", text: "Estudiar las emisiones de metano en Norteamérica con observaciones atmosféricas." }, { label: "Las herramientas", text: "Transporte atmosférico, HYSPLIT y el paquete rtorf." }],
    visual: "globe", atlasTitle: "Boulder", atlasSubtitle: "Colorado · CIRES / CU Boulder · NOAA GML",
    notes: "Cuenta cómo surgió la oportunidad en Boulder y el cambio de Brasil a Estados Unidos en 2022. Foto sugerida: NOAA, el equipo, las Flatirons o la vida en Colorado.",
  },
  {
    id: "huellas", stop: "boulder", eyebrow: "SEGUIR LA HUELLA DEL AIRE", period: "NOAA GML · CIRES", title: "¿De dónde viene<br><em>ese aire?</em>",
    text: "Los modelos de transporte conectan una medición con las regiones por las que pasó el aire. Así podemos estudiar las fuentes de gases de efecto invernadero.",
    details: [{ label: "rtorf", text: "Procesar observaciones de NOAA y configurar cálculos con HYSPLIT." }, { label: "Aplicaciones", text: "Huellas atmosféricas para Norteamérica, Uganda y la Amazonía." }],
    images: [{ src: "assets/rtorf_footprint.png", alt: "Visualización científica de huellas atmosféricas producidas con rtorf.", caption: "rtorf · Huellas atmosféricas", fit: "contain" }],
    notes: "Explica la huella como seguir el recorrido del aire hacia atrás. Uganda y Manaus son dominios de modelación; no se presentan como viajes. El estudio de metano durante la pandemia figura como en revisión en el CV de noviembre de 2026.",
  },
  {
    id: "compartir", stop: "boulder", eyebrow: "ACERCAR LA CIENCIA", title: "Hacer espacio<br><em>para otros.</em>",
    text: "Parte del trabajo también es acercar la investigación a estudiantes y a públicos que no suelen entrar a un laboratorio.",
    details: [{ label: "Pathways to STEAM", text: "Actividades para estudiantes de Citrus College, con visitas a NOAA y CU Boulder." }, { label: "HACU · 2024", text: "Representación de NOAA en la Hispanic Association of Colleges and Universities." }],
    images: [{ src: "assets/sergio_liberty.jpg", alt: "Sergio en Nueva York, con la Estatua de la Libertad al fondo.", caption: "Un recuerdo de Nueva York · Archivo personal", position: "50% 40%" }],
    notes: "La fotografía es de Nueva York, no de mentoría. Puedes sustituirla por una foto de Pathways to STEAM. Cuenta qué preguntaban los estudiantes y cómo te reconoces en sus dudas.",
  },
  {
    id: "chicago", stop: "eeuu", eyebrow: "ESTADOS UNIDOS · CONGRESOS", period: "AGU 2022", title: "Una investigación,<br><em>muchas ciudades.</em>",
    text: "Chicago fue la primera de una serie de reuniones de AGU para compartir trabajos sobre metano y modelación atmosférica.",
    details: [{ label: "Chicago · 2022", text: "Metano durante la pandemia y modelación de Sudamérica con MUSICA." }, { label: "San Francisco · 2023", text: "Metano y emisiones del transporte en Brasil." }],
    visual: "globe", atlasTitle: "Chicago", atlasSubtitle: "AGU Fall Meeting · 2022", notes: "En El recorrido están las fichas individuales de cada ciudad. Cuenta cómo es un congreso de AGU: la escala, los pósteres, los encuentros. Foto sugerida: tu póster o una foto de Chicago.",
  },
  {
    id: "san-francisco", stop: "eeuu", eyebrow: "ESTADOS UNIDOS · CONGRESOS", period: "AGU 2023", title: "El camino sigue<br>en <em>San Francisco.</em>",
    location: { label: "San Francisco", country: "Estados Unidos", coordinates: [-122.42, 37.77] },
    text: "Presentar resultados sobre metano y sobre la historia de las emisiones vehiculares de Brasil.",
    takeaway: "Volver a un congreso también es volver a encontrarse con una comunidad.",
    visual: "globe", atlasTitle: "San Francisco", atlasSubtitle: "AGU Fall Meeting · 2023", notes: "Cuenta un encuentro o una conversación de AGU 2023. Foto sugerida: congreso, póster o ciudad.",
  },
  {
    id: "washington", stop: "eeuu", eyebrow: "ESTADOS UNIDOS · CONGRESOS", period: "AGU 2024", title: "Más preguntas<br>en <em>Washington.</em>",
    location: { label: "Washington, D. C.", country: "Estados Unidos", coordinates: [-77.04, 38.91] },
    text: "Modelación global de contaminación con mayor resolución en Sudamérica y el estudio de metano durante la pandemia.",
    visual: "globe", atlasTitle: "Washington, D. C.", atlasSubtitle: "AGU Fall Meeting · 2024", notes: "Foto sugerida: AGU 2024. Puedes conectar esta parada con el traslado posterior a Maryland en 2026.",
  },
  {
    id: "new-orleans", stop: "eeuu", eyebrow: "ESTADOS UNIDOS · CONGRESOS", period: "AGU 2025", title: "Y después,<br><em>Nueva Orleans.</em>",
    location: { label: "Nueva Orleans", country: "Estados Unidos", coordinates: [-90.07, 29.95] },
    text: "Compartir los trabajos sobre un siglo de emisiones vehiculares en Brasil y la reducción de emisiones de metano en Estados Unidos durante la pandemia.",
    visual: "globe", atlasTitle: "Nueva Orleans", atlasSubtitle: "AGU Fall Meeting · 2025", notes: "Cuenta una escena del viaje o del congreso. Los dos trabajos están registrados en el CV como presentaciones en AGU 2025. Foto sugerida: póster o ciudad.",
  },
  {
    id: "maryland", stop: "maryland", eyebrow: "EL PRESENTE", period: "Desde marzo de 2026", title: "Seguir haciendo<br><em>preguntas.</em>",
    text: "Visiting Assistant Research Scientist en CISESS, University of Maryland, trabajando con NOAA Air Resources Laboratory.",
    details: [{ label: "Hoy", text: "Estudiar cuándo y dónde se pueden detectar inyecciones de aerosoles en la estratósfera." }, { label: "Código abierto", text: "Desarrollo y mantenimiento de hysplit-strato y wondersnap." }],
    visual: "globe", atlasTitle: "Maryland", atlasSubtitle: "CISESS / University of Maryland · NOAA ARL",
    notes: "Aclara la afiliación actual y la fecha de inicio: marzo de 2026. Cuenta qué te interesa del problema actual. En el archivo de viajes está Fairfax, donde presentaste este trabajo en junio de 2026. Foto sugerida: laboratorio o equipo.",
  },
  {
    id: "estratosfera", stop: "maryland", eyebrow: "UNA PREGUNTA A ESCALA GLOBAL", period: "Investigación en curso", title: "De las calles a<br><em>la estratósfera.</em>",
    text: "Modelos, observaciones y software para estudiar el transporte de aerosoles y las posibilidades de detectarlos en la atmósfera.",
    details: [{ label: "La continuidad", text: "De dónde viene una emisión, adónde viaja y cómo observarla." }, { label: "La herramienta", text: "HYSPLIT y flujos de trabajo abiertos para explorar estas preguntas." }],
    link: { label: "Explorar wondersnap", href: "https://ibarraespinosa.github.io/wondersnap/" },
    images: [{ src: "assets/b2sap_global_sensitivity.png", alt: "Mapa global de sensibilidad de una red de observaciones estratosféricas.", caption: "Investigación actual · Sensibilidad de la red de observación", fit: "contain" }, { src: "assets/hysplit_so2_100k.png", alt: "Simulación de transporte atmosférico de dióxido de azufre con HYSPLIT.", caption: "HYSPLIT · Un ejemplo de transporte atmosférico", fit: "contain" }],
    notes: "Explica detectabilidad: que algo se emita no significa que una red lo observe. La conexión con la UTEM es la pregunta por los riesgos ambientales y cómo estudiarlos. Presenta las figuras como parte del trabajo actual.",
  },
  {
    id: "volver", stop: "regreso", eyebrow: "VOLVER A COMPARTIRLO", period: "UTEM · 2026", title: "El punto de partida<br>también es <em>futuro.</em>",
    text: "Esta trayectoria empezó en la misma universidad en la que ustedes estudian. Hoy vuelvo para conversar sobre las posibilidades que se abren desde aquí.",
    takeaway: "¿Qué te gustaría investigar, aunque todavía no sepas cómo empezar?",
    images: [{ src: "assets/sergio_nyc.jpg", alt: "Sergio Ibarra-Espinosa con Nueva York al fondo.", caption: "Sergio Ibarra-Espinosa · Archivo personal", position: "60% 45%" }, graduation],
    notes: "Vuelve a la foto de titulación con la galería si quieres cerrar el círculo. Cuenta una dificultad real y una ayuda concreta que recibiste. El propósito es que los estudiantes puedan verse en el camino.",
  },
  {
    id: "tu-camino", stop: "regreso", type: "closing", eyebrow: "EL SIGUIENTE PASO PUEDE SER PEQUEÑO", title: "¿Por dónde<br>empiezas <em>tú?</em>",
    text: "Elige una pregunta que te importe y empieza a acercarte a ella.",
    details: [{ label: "Haz algo concreto", text: "Analiza datos. Aprende R o Python con un problema real." }, { label: "Busca compañía", text: "Habla con un profesor, escribe a un grupo, pregunta por becas." }, { label: "Comparte", text: "Un proyecto pequeño y abierto puede iniciar una conversación." }],
    visual: "closing", notes: "Deja espacio para preguntas. Invita a abrir Recursos para encontrar el curso de VEIN, el código y tu contacto. ¿Qué les gustaría intentar este semestre? Agradece a quienes te acompañaron y a quienes hicieron posible la invitación.",
  },
];

// Archivo de ciudades: cada ficha abre su propia diapositiva y mueve el globo.
// `slideId` enlaza con una diapositiva principal; sin él, se genera una ficha de viaje.
window.TRIPS = [
  { id: "santiago", city: "Santiago", country: "Chile", region: "Chile", period: "2003—2026", coordinates: [-70.65, -33.45], event: "UTEM, CENMA, Universidad de Chile, AIDIS 2008, congreso de meteorología 2015, GEIA y regreso a la UTEM en 2026.", slideId: "cenma" },
  { id: "valparaiso", city: "Valparaíso", country: "Chile", region: "Chile", period: "2008 / 2009", coordinates: [-71.62, -33.05], event: "XVI Simposio Chileno de Física (2008) y Primer Congreso de Nanotecnología (2009), UTFSM.", topics: ["Material particulado e infecciones respiratorias", "Partículas ultrafinas y sus efectos en la salud"] },
  { id: "arica", city: "Arica", country: "Chile", region: "Chile", period: "2009", coordinates: [-70.31, -18.48], event: "V Congreso Latinoamericano de Física y Química Ambiental.", topics: ["Contaminación y mortalidad en Santiago y Buenos Aires", "Enfermedades respiratorias en Pudahuel"] },
  { id: "concepcion", city: "Concepción", country: "Chile", region: "Chile", period: "2011", coordinates: [-73.05, -36.83], event: "VII Jornadas Chilenas de Física y Química Ambiental, Universidad Católica de la Santísima Concepción.", topics: ["Emisiones de carreteras con COPERT III y IV", "Material particulado resuspendido de calles"] },
  { id: "punta-tralca", city: "Punta de Tralca", country: "Chile", region: "Chile", period: "2013", coordinates: [-71.68, -33.43], event: "VIII Jornadas Chilenas de Física y Química Ambiental.", topics: ["Situaciones de tráfico y emisiones vehiculares en Santiago"] },
  { id: "buenos-aires", city: "Buenos Aires", country: "Argentina", region: "Latinoamérica", period: "2012", coordinates: [-58.38, -34.6], event: "Ciencia y Tecnología Ambiental: un enfoque integrador.", slideId: "buenos-aires" },
  { id: "lima", city: "Lima", country: "Perú", region: "Latinoamérica", period: "2021 / 2023", coordinates: [-77.04, -12.05], event: "Charlas invitadas sobre VEIN, Universidad Nacional Tecnológica de Lima Sur.", slideId: "lima" },
  { id: "tacna", city: "Tacna", country: "Perú", region: "Latinoamérica", period: "Recuerdo de viaje", coordinates: [-70.25, -18.01], event: "Viaje a Tacna, confirmado por Sergio. Una historia para compartir.", slideId: "tacna" },
  { id: "saopaulo", city: "São Paulo", country: "Brasil", region: "Brasil", period: "2013—2026", coordinates: [-46.63, -23.55], event: "USP, IPEN, IAG Science Day 2016–2021, taller GPU 2018, SIMEA 2020 y Air Pollution Conference Brazil / CMAS 2024.", slideId: "brasil-investigacion" },
  { id: "natal", city: "Natal", country: "Brasil", region: "Brasil", period: "2014", coordinates: [-35.21, -5.79], event: "13th IGAC Science Conference y 13th iCACGP Symposium.", topics: ["Inventario de emisiones con conteos de tráfico en São Paulo"] },
  { id: "santa-maria", city: "Santa Maria", country: "Brasil", region: "Brasil", period: "2015", coordinates: [-53.81, -29.69], event: "IX Workshop Brasileiro de Micrometeorologia.", topics: ["Simulación de contaminación de alta resolución para Porto Alegre"] },
  { id: "belo-horizonte", city: "Belo Horizonte", country: "Brasil", region: "Brasil", period: "2017", coordinates: [-43.94, -19.92], event: "Curso «O modelo VEIN», Universidade Federal de Minas Gerais, GPAMA.", topics: ["Enseñar a construir inventarios de emisiones con VEIN"] },
  { id: "minas-gerais", city: "Minas Gerais", country: "Brasil", region: "Brasil", period: "2019", coordinates: [-44, -19.5], event: "CMAS Conference, julio de 2019. El CV indica el estado; la ciudad queda por confirmar.", topics: ["Emisiones vehiculares de Brasil entre 2007 y 2017", "Modelación de emisiones en São Paulo"], approximate: true },
  { id: "trl", city: "Reino Unido · TRL", country: "Reino Unido", region: "Europa", period: "Durante el doctorado", coordinates: [-0.78, 51.37], event: "Pasantía doctoral como analista de emisiones en el Transport Research Laboratory.", slideId: "reino-unido" },
  { id: "lyon", city: "Lyon", country: "Francia", region: "Europa", period: "2016", coordinates: [4.84, 45.76], event: "21st International Transport and Air Pollution Conference.", slideId: "lyon" },
  { id: "viena", city: "Viena", country: "Austria", region: "Europa", period: "2018", coordinates: [16.37, 48.21], event: "European Geosciences Union General Assembly. Beca de viaje IAG/USP.", slideId: "viena" },
  { id: "chiba", city: "Chiba", country: "Japón", region: "Asia", period: "2017 / 2019", coordinates: [140.1, 35.61], event: "Japan Geoscience Union. Beca de viaje de la organización en 2017.", slideId: "chiba" },
  { id: "takamatsu", city: "Takamatsu", country: "Japón", region: "Asia", period: "2018", coordinates: [134.05, 34.34], event: "14th iCACGP Symposium / 15th IGAC Science Conference. Apoyo de viaje de la organización.", slideId: "takamatsu" },
  { id: "china", city: "China · Academia de Ciencias", country: "China", region: "Asia", period: "2019", coordinates: [105, 36], event: "Postdoctorado en la Academia China de Ciencias, de enero a julio de 2019.", slideId: "china", approximate: true },
  { id: "boulder", city: "Boulder", country: "Estados Unidos", region: "EE. UU.", period: "2022—2026", coordinates: [-105.27, 40.01], event: "CIRES / NOAA GML. CIRES Rendezvous y Global Monitoring Annual Conference en 2023.", slideId: "boulder" },
  { id: "denver", city: "Denver", country: "Estados Unidos", region: "EE. UU.", period: "2022", coordinates: [-104.99, 39.74], event: "Reunión AMS, registrada en el CV de 2022.", topics: ["Cuantificación del impacto de COVID-19 en emisiones de metano de Estados Unidos"] },
  { id: "chicago", city: "Chicago", country: "Estados Unidos", region: "EE. UU.", period: "2022", coordinates: [-87.63, 41.88], event: "AGU Fall Meeting: metano y simulaciones de calidad del aire en Sudamérica.", slideId: "chicago" },
  { id: "san-francisco", city: "San Francisco", country: "Estados Unidos", region: "EE. UU.", period: "2023", coordinates: [-122.42, 37.77], event: "AGU Fall Meeting: metano y emisiones vehiculares de Brasil.", slideId: "san-francisco" },
  { id: "washington", city: "Washington, D. C.", country: "Estados Unidos", region: "EE. UU.", period: "2024", coordinates: [-77.04, 38.91], event: "AGU Fall Meeting: modelación global de contaminación y metano.", slideId: "washington" },
  { id: "new-orleans", city: "Nueva Orleans", country: "Estados Unidos", region: "EE. UU.", period: "2025", coordinates: [-90.07, 29.95], event: "AGU Fall Meeting: un siglo de emisiones en Brasil y metano en Estados Unidos.", slideId: "new-orleans" },
  { id: "fort-collins", city: "Fort Collins", country: "Estados Unidos", region: "EE. UU.", period: "2025", coordinates: [-105.08, 40.57], event: "Foundation Models for the Atmosphere Workshop, Colorado State University, 18–21 de agosto.", topics: ["Formación en modelos fundacionales para la atmósfera"] },
  { id: "fairfax", city: "Fairfax", country: "Estados Unidos", region: "EE. UU.", period: "2026", coordinates: [-77.31, 38.85], event: "30th Annual George Mason University Conference on Atmospheric Transport and Dispersion Modeling, 10–11 de junio.", topics: ["Evaluación de una red global de sondeos para detectar aerosoles estratosféricos"] },
  { id: "maryland", city: "College Park · Maryland", country: "Estados Unidos", region: "EE. UU.", period: "Desde 2026", coordinates: [-76.94, 38.99], event: "CISESS / University of Maryland y NOAA Air Resources Laboratory.", slideId: "maryland" },
  { id: "new-york", city: "Nueva York", country: "Estados Unidos", region: "EE. UU.", period: "Archivo personal", coordinates: [-74.01, 40.71], event: "Un recuerdo de viaje, fuera del laboratorio.", images: [{ src: "assets/sergio_nyc.jpg", alt: "Sergio en Nueva York.", caption: "Nueva York · Archivo personal" }, { src: "assets/sergio_liberty.jpg", alt: "Sergio junto a la Estatua de la Libertad.", caption: "Liberty Island · Archivo personal" }] },
];

// Chronological itinerary. Months are shown only when supported by the CV.
// Repeated cities are separate visits, rather than a single country chapter.
const originalStops = window.STOPS;
const mainSlides = window.SLIDES;
const itinerary = [
  ['inicio', 2003], ['origen', 2003], ['aire-y-salud', 2007], ['cenma', 2007],
  ['aidis-2008', 2008, { from: 'aire-y-salud', stop: 'chile', eyebrow: 'LOS PRIMEROS CONGRESOS', period: 'Octubre de 2008', title: 'La primera ciencia<br>sale a <em>conversar.</em>', text: 'XXXI Congreso Interamericano de Ingeniería Sanitaria y Ambiental, en Santiago.', details: [{ label: 'El trabajo', text: 'Contaminación atmosférica y enfermedades respiratorias en Pudahuel, 2001–2005.' }], takeaway: null }],
  ['viaje-valparaiso', 2008, { period: 'Noviembre de 2008', text: 'XVI Simposio Chileno de Física, Universidad Técnica Federico Santa María, Valparaíso.', details: [{ label: 'La investigación', text: 'Material particulado PM2.5 e infecciones respiratorias agudas.' }] }],
  ['valparaiso-2009', 2009, { from: 'viaje-valparaiso', period: 'Mayo de 2009', title: 'Volver a<br><em>Valparaíso.</em>', text: 'Primer Congreso de Nanotecnología, Universidad Técnica Federico Santa María.', details: [{ label: 'La pregunta', text: 'Partículas ultrafinas y sus efectos en la salud: oportunidades y desafíos.' }] }],
  ['congresos-chile', 2009, { period: 'Octubre de 2009', title: 'La investigación<br>llega a <em>Arica.</em>', text: 'V Congreso Latinoamericano de Física y Química Ambiental.', details: [{ label: 'Santiago y Buenos Aires', text: 'Monóxido de carbono y mortalidad en ambas ciudades.' }, { label: 'Pudahuel', text: 'Contaminantes atmosféricos y enfermedades respiratorias en mayores de 65 años.' }] }],
  ['magister', 2010], ['viaje-concepcion', 2011, { period: 'Julio de 2011' }],
  ['buenos-aires', 2012], ['viaje-punta-tralca', 2013],
  ['doctorado', 2013, { period: 'Septiembre de 2013 · São Paulo', details: [{ label: 'Becas Chile', text: 'Financiamiento para cursar el doctorado en Meteorología.' }, { label: 'La investigación', text: 'Modelar el aire de São Paulo con inventarios de emisiones vehiculares.' }] }],
  ['viaje-natal', 2014, { period: 'Septiembre de 2014' }], ['viaje-santa-maria', 2015],
  ['santiago-2015', 2015, { from: 'aire-y-salud', stop: 'chile', eyebrow: 'UN CONGRESO DE VUELTA EN CHILE', period: '2015', title: 'Una vuelta<br>por <em>Santiago.</em>', text: '11th International Conference on Southern Hemisphere Meteorology and Oceanography.', details: [{ label: 'El trabajo', text: 'Inventarios vehiculares y simulación atmosférica para 58 centros urbanos de Sudamérica.' }, { label: 'El apoyo', text: 'Beca de viaje de la organización del congreso.' }], takeaway: null }],
  ['reino-unido', 2016, { period: '2016 · Pasantía doctoral', notes: 'El CV sitúa la pasantía durante el doctorado. Las fotografías geolocalizadas del archivo personal sitúan el viaje al Reino Unido en mayo de 2016. Cuenta cómo surgió la oportunidad y qué aprendiste en TRL.' }],
  ['lyon', 2016, { period: '24–26 de mayo de 2016' }],
  ['chiba', 2017, { period: '20–25 de mayo de 2017', details: [{ label: 'JpGU · Chiba', text: 'Inventario de emisiones de alta resolución para Shanghái con VEIN.' }, { label: 'Beca de viaje', text: 'Financiamiento de la organización de JpGU, registrado en el CV.' }] }],
  ['vein', 2017, { period: 'Doctorado · 2013—2017' }],
  ['viaje-belo-horizonte', 2017, { period: '27 nov. – 1 dic. de 2017' }],
  ['viena', 2018, { period: '8–13 de abril de 2018' }],
  ['usp-2018', 2018, { from: 'brasil-investigacion', period: 'São Paulo · 2018', title: 'Investigar.<br>Compartir. <em>Enseñar.</em>', text: 'Un año de publicaciones, cursos y encuentros desde la USP.', details: [{ label: 'Destaque Doutorado', text: 'Reconocimiento en Meteorología, IAG/USP, por el doctorado concluido en 2017.' }, { label: 'VEIN y eixport', text: 'Publicaciones en GMD y JOSS, y presentaciones sobre herramientas abiertas.' }, { label: 'Docencia', text: 'Curso de R para meteorología en agosto de 2018.' }] }],
  ['takamatsu', 2018],
  ['china', 2019, { period: 'Enero—julio de 2019' }],
  ['chiba-2019', 2019, { from: 'chiba', period: '26–30 de mayo de 2019', title: 'De regreso<br>a <em>Chiba.</em>', text: 'Otra participación en la Japan Geoscience Union, durante la etapa de investigación en China.', details: [{ label: 'El trabajo', text: 'Inventarios de emisiones vehiculares de alta resolución para China con VEIN.' }], takeaway: 'Una colaboración sigue creciendo con cada encuentro.', visual: 'globe', atlasTitle: 'Chiba', images: [], notes: 'Esta es la visita a JpGU de 2019, separada de la de 2017. Cuenta lo que cambió entre ambos viajes. El CV no detalla el financiamiento de esta visita; completa ese recuerdo con tu experiencia.' }],
  ['viaje-minas-gerais', 2019, { period: 'Julio de 2019' }],
  ['brasil-investigacion', 2019, { period: '2019—2022 · De regreso en Brasil', title: 'Volver a Brasil.<br><em>Seguir investigando.</em>' }],
  ['lima', 2021, { period: '2021 · Charla invitada', details: [{ label: 'UNTELS', text: 'Invitación de Odón Sánchez para compartir el modelo VEIN.' }], notes: 'El CV incluye la charla UNTELS de 2021. Confirma si fue presencial o remota al contarla; el mapa señala la institución anfitriona. La presentación de 2023 aparece más adelante en su lugar cronológico.' }],
  ['viaje-denver', 2022], ['boulder', 2022], ['huellas', 2022], ['chicago', 2022, { details: [{ label: 'AGU · Chicago', text: 'Metano durante la pandemia y modelación de Sudamérica con MUSICA.' }] }],
  ['boulder-2023', 2023, { from: 'huellas', eyebrow: 'CONGRESOS EN BOULDER', period: 'Mayo de 2023', title: 'Compartir desde<br><em>Boulder.</em>', text: 'Presentar herramientas para leer observaciones de NOAA y trabajar con huellas atmosféricas.', details: [{ label: '16 de mayo', text: 'CIRES 18th Annual Rendezvous.' }, { label: '23 de mayo', text: '51st Global Monitoring Annual Conference, NOAA GML.' }] }],
  ['lima-2023', 2023, { from: 'lima', period: '27 de junio de 2023', title: 'Una nueva charla<br>para <em>Lima.</em>', text: 'Modelo de inventario de emisiones vehiculares: VEIN en la Universidad Nacional Tecnológica de Lima Sur.', details: [{ label: '2023', text: 'Charla invitada por Odón Sánchez, con materiales y video disponibles.' }], notes: 'La presentación del 27 de junio de 2023 está fechada en el CV. Cuenta los detalles del encuentro y confirma cuáles de las participaciones fueron presenciales.' }],
  ['san-francisco', 2023],
  ['saopaulo-2024', 2024, { from: 'brasil-investigacion', eyebrow: 'CHARLA MAGISTRAL EN BRASIL', period: 'Junio de 2024', title: 'Volver a<br><em>São Paulo.</em>', text: 'Keynote en Air Pollution Conference Brazil y 5th CMAS South America.', details: [{ label: 'Metano', text: 'Impactos de la pandemia en las emisiones de metano de Estados Unidos.' }, { label: 'Transporte', text: 'Emisiones vehiculares de Brasil y sus efectos en la calidad del aire.' }], notes: 'Cuenta qué significó regresar a Brasil como conferencista invitado. Foto sugerida: la charla, el congreso o colegas de São Paulo.' }],
  ['compartir', 2024, { period: 'HACU · Noviembre de 2024' }], ['washington', 2024],
  ['viaje-fort-collins', 2025, { period: '18–21 de agosto de 2025' }], ['new-orleans', 2025],
  ['maryland', 2026], ['viaje-fairfax', 2026, { period: '10–11 de junio de 2026' }], ['estratosfera', 2026],
  ['volver', 2026], ['tu-camino', 2026],
];
const builtSlides = new Map();
window.SLIDES = itinerary.map(([id, year, changes = {}]) => {
  let source = mainSlides.find(slide => slide.id === (changes.from || id)) || builtSlides.get(changes.from);
  if (!source) {
    const trip = window.TRIPS.find(item => `viaje-${item.id}` === id);
    trip.slideId = id;
    source = {
      id, stop: 'archivo', eyebrow: 'UN ENCUENTRO EN EL CAMINO', period: trip.period,
      title: `<em>${trip.city}.</em>`, text: trip.event,
      location: { label: trip.city, country: trip.country, coordinates: trip.coordinates },
      details: trip.topics?.map((text, i) => ({ label: i ? 'También' : 'La investigación', text })),
      visual: 'globe', atlasTitle: trip.city, atlasSubtitle: `${trip.country} · ${trip.period}`,
      images: trip.images,
      approximate: trip.approximate,
      notes: `Cuenta una anécdota de esta parada. ${trip.event} Explica qué presentaste y qué aprendiste del encuentro.`,
    };
  }
  const slide = { ...source, ...changes, id, year };
  if (slide.visual === 'globe') slide.atlasSubtitle = `${slide.location?.country || originalStops.find(stop => stop.id === slide.stop)?.country || ''} · ${slide.period || year}`;
  builtSlides.set(id, slide);
  return slide;
});
window.rebuildItinerary = function () {
  const cityStops = [];
  let previousCityKey;
  window.SLIDES.forEach(slide => {
    const stage = slide.institutionStage || slide.stop;
    const original = originalStops.find(stop => stop.id === stage);
    const place = slide.location || original;
    slide.institutionStage = stage;
    slide.location = { label: place.label, country: place.country, coordinates: place.coordinates };
    const special = slide.type === 'cover' ? 'inicio' : slide.type === 'personal' ? 'personal' : ['utem', 'regreso', 'familia'].includes(stage) ? stage : null;
    const key = special || `${place.country}:${place.label}`;
    let city = previousCityKey === key ? cityStops[cityStops.length - 1] : null;
    if (!city) {
      const names = { inicio: 'Inicio', utem: 'UTEM', regreso: 'Volver', familia: 'Mis raíces', personal: 'Lo que viene' };
      city = { id: `etapa-${slide.id}`, slideId: slide.id, name: names[special] || place.label,
        label: place.label, country: place.country, coordinates: place.coordinates,
        year: slide.year, period: slide.period || (slide.year ? String(slide.year) : 'Antes del viaje'), description: special === 'inicio' ? 'De la UTEM para el mundo.' : special === 'utem' ? 'El punto de partida.' : slide.text };
      cityStops.push(city);
    }
    slide.stop = city.id;
    previousCityKey = key;
  });
  window.STOPS = cityStops;
};
window.rebuildItinerary();
// Arica has a main slide which also introduces the early Chilean conferences.
window.TRIPS.find(trip => trip.id === 'arica').slideId = 'congresos-chile';
// Undated travel memories remain accessible without assigning invented dates.
delete window.TRIPS.find(trip => trip.id === 'tacna').slideId;
delete window.TRIPS.find(trip => trip.id === 'new-york').slideId;
window.TRIPS.sort((a, b) => Number(a.period.match(/20\d{2}/)?.[0] || 9999) - Number(b.period.match(/20\d{2}/)?.[0] || 9999));

window.RESOURCES = [
  { tag: "APRENDER", title: "Curso abierto de VEIN", description: "Materiales del curso 2026 para empezar con emisiones y R.", href: "https://ibarraespinosa.github.io/cursovein2026/" },
  { tag: "EXPLORAR", title: "VEIN y ciencia abierta", description: "Documentación y herramientas para inventarios vehiculares.", href: "https://atmoschem.github.io/vein/" },
  { tag: "VER EL CÓDIGO", title: "HYSPLIT-Strato", description: "El proyecto de transporte estratosférico en NOAA ARL.", href: "https://github.com/noaa-oar-arl/hysplit-strato" },
  { tag: "INVESTIGACIÓN", title: "Publicaciones", description: "Artículos y trabajos en Google Scholar.", href: "https://scholar.google.com/citations?user=8ohZGHEAAAAJ" },
  { tag: "CONECTAR", title: "Mi sitio personal", description: "Investigación, proyectos y trayectoria.", href: "https://ibarraespinosa.github.io/" },
];
