// Fotografías elegidas por Sergio en la conversación y recuperadas de su archivo.
// Las fechas corresponden a los originales cuando se ha podido comprobarlas.
(() => {
  const photo = (number, alt, caption, extra = {}) => ({
    src: `assets/photos/shared-${String(number).padStart(2, '0')}.webp`,
    alt, caption, fit: 'contain', kind: 'photo', ...extra,
  });
  const find = id => window.SLIDES.find(slide => slide.id === id);
  const setPhotos = (id, images) => { const slide = find(id); if (slide) slide.images = images; };
  const after = (id, slide) => {
    if (find(slide.id)) return;
    const index = window.SLIDES.findIndex(item => item.id === id);
    if (index !== -1) window.SLIDES.splice(index + 1, 0, slide);
  };
  const location = (label, country, coordinates) => ({ label, country, coordinates });

  setPhotos('congresos-chile', [photo(22, 'Sergio junto a colegas en un encuentro académico en Arica.', 'Con colegas en Arica · Archivo personal')]);

  after('inicio', {
    id: 'mis-papas', institutionStage: 'familia', year: null, period: 'Antes del viaje', eyebrow: 'EN MEMORIA DE MIS PAPÁS',
    title: 'Mi historia empieza<br><em>con ellos.</em>',
    text: 'Antes de hablar de universidades y congresos, quiero recordar a mi papá y a mi mamá.',
    location: location('Santiago', 'Chile', [-70.65, -33.45]), visual: 'family',
    images: [photo(25, 'Sergio de niño, de la mano de su papá.', 'Con mi papá · Q.E.P.D.'), photo(26, 'Sergio de niño junto a su mamá.', 'Con mi mamá · Q.E.P.D.')],
    notes: 'Un momento para recordar a tus papás, sin apuro. Cuenta lo que quieras compartir de ellos. Las imágenes son de la infancia; no se asigna el año de digitalización como fecha del recuerdo.',
  });
  after('mis-papas', {
    id: 'persa-teniente-cruz', institutionStage: 'familia', year: null, period: 'Mi familia · Santiago', eyebrow: 'OTRA PARTE DE MI HISTORIA',
    title: 'También vengo<br>del <em>Persa.</em>',
    text: 'Con mis hermanas, trabajando en el Persa Teniente Cruz. También esto forma parte de mi historia.',
    location: location('Santiago', 'Chile', [-70.65, -33.45]),
    images: [photo(23, 'Sergio con sus hermanas trabajando en el Persa Teniente Cruz.', 'Trabajando con mis hermanas · Persa Teniente Cruz · Archivo familiar')],
    notes: 'Contexto aportado por Sergio. Cuenta qué hacían en el Persa, qué significaba ese trabajo y cómo lo conectas con tu recorrido. Esta es una introducción familiar, antes de comenzar la cronología académica.',
  });

  setPhotos('doctorado', [
    photo(21, 'Placa de la oficina 326 del Departamento de Ciências Atmosféricas de la USP, con el nombre de Sergio como doctorando.', 'Mi nombre en la oficina 326 · IAG/USP · Septiembre de 2013'),
    { src: 'assets/photos/saopaulo.webp', alt: 'Vista de São Paulo.', caption: 'São Paulo · Fotografía de contexto', credit: 'Agent010 · CC BY-SA 4.0', creditUrl: 'https://commons.wikimedia.org/wiki/File:Marginal_Pinheiros_e_Jockey_Club.jpg' },
  ]);
  setPhotos('reino-unido', [photo(20, 'Sergio en el Transport Research Laboratory, frente al identificador de TRL.', 'Transport Research Laboratory · Reino Unido · Mayo de 2016')]);
  after('reino-unido', {
    id: 'londres-2016', institutionStage: 'viaje', year: 2016, period: '22 de mayo de 2016', eyebrow: 'RECUERDOS DEL REINO UNIDO',
    title: 'Una bicicleta<br>en <em>Londres.</em>',
    text: 'La pasantía también dejó tiempo para conocer una ciudad nueva. Un recuerdo frente al Palacio de Buckingham.',
    location: location('Londres', 'Reino Unido', [-.1411, 51.5014]),
    images: [photo(19, 'Sergio con una bicicleta frente al Palacio de Buckingham.', 'Londres · Buckingham Palace · Mayo de 2016')],
    notes: 'La fotografía original está fechada el 22 de mayo de 2016 y geolocalizada frente a Buckingham Palace. Cuenta una anécdota de la vida fuera del laboratorio durante la pasantía.',
  });
  after('lyon', {
    id: 'paris-2016', institutionStage: 'viaje', year: 2016, period: '28–29 de mayo de 2016', eyebrow: 'DESPUÉS DEL CONGRESO DE LYON',
    title: 'Una parada<br>en <em>París.</em>',
    text: 'La Torre Eiffel, el Louvre y los recuerdos que también forman parte de un viaje científico.',
    location: location('París', 'Francia', [2.337, 48.8604]),
    images: [photo(17, 'Sergio en el patio del Museo del Louvre, con la pirámide al fondo.', 'Museo del Louvre · París · 29 de mayo de 2016'), photo(18, 'Sergio frente a la Torre Eiffel.', 'Torre Eiffel · París · 28 de mayo de 2016')],
    notes: 'Fechas y ubicaciones comprobadas en los originales de Shotwell. Este es un recuerdo de viaje después de TAP en Lyon, sin atribuir una estancia de investigación en París.',
  });
  after('paris-2016', {
    id: 'madrid-2016', institutionStage: 'viaje', year: 2016, period: '30 de mayo de 2016', eyebrow: 'ESPAÑA · UN RECUERDO DEL VIAJE',
    title: 'Y también<br><em>Madrid.</em>', text: 'Una fotografía en la Puerta del Sol, junto a la estatua ecuestre de Carlos III.',
    location: location('Madrid', 'España', [-3.7035, 40.4169]),
    images: [photo(16, 'Sergio junto a la estatua ecuestre de Carlos III en la Puerta del Sol de Madrid.', 'Puerta del Sol · Madrid · Mayo de 2016')],
    notes: 'El monumento y su inscripción corresponden a Carlos III en la Puerta del Sol, Madrid. El original está fechado el 30 de mayo de 2016. Esta fotografía se había recordado inicialmente como del Reino Unido.',
  });
  after('madrid-2016', {
    id: 'amazonia-2016', institutionStage: 'viaje', year: 2016, period: 'Diciembre de 2016', eyebrow: 'BRASIL · FUERA DEL LABORATORIO',
    title: 'Conocer<br>la <em>Amazonía.</em>', text: 'El río, el bosque y una parte de Brasil que también quedó en el álbum.',
    location: location('Amazonía', 'Brasil', [-60, -3.12]),
    images: [photo(14, 'Sergio durante un paseo en barco en la Amazonía.', 'Un recuerdo del río Amazonas · Diciembre de 2016'), photo(15, 'Sergio en el bosque amazónico, sosteniendo un perezoso.', 'Un recuerdo del bosque amazónico · Archivo personal')],
    notes: 'La fotografía del río está fechada el 1 de diciembre de 2016. Sergio identifica ambas imágenes como recuerdos de la Amazonía. El punto del mapa es una referencia regional; confirma el lugar preciso si quieres detallarlo.',
  });
  setPhotos('chiba', [photo(12, 'Sergio junto a una exhibición de indumentaria tradicional japonesa.', 'Japón · Mayo de 2017'), photo(11, 'El ala de un avión y las nubes vistas desde una ventanilla.', 'Desde la ventanilla · Junio de 2017')]);
  after('chiba', {
    id: 'fuji-2017', institutionStage: 'viaje', year: 2017, period: 'Mayo de 2017', eyebrow: 'JAPÓN · DESPUÉS DE JpGU',
    title: 'Al pie del<br><em>monte Fuji.</em>', text: 'Un recuerdo de Japón después del congreso en Chiba. Los viajes también se quedan en estas imágenes.',
    location: location('Monte Fuji', 'Japón', [138.7274, 35.3606]),
    images: [photo(13, 'Sergio con el monte Fuji nevado al fondo.', 'Monte Fuji · Japón · Mayo de 2017')],
    notes: 'El original de esta secuencia está fechado el 29 de mayo de 2017, después de JpGU 2017. Cuenta cómo fue conocer el monte Fuji.',
  });
  setPhotos('takamatsu', [
    photo(9, 'Sergio junto a colegas durante el viaje a Takamatsu.', 'Con colegas en Takamatsu · Japón · Septiembre de 2018'),
    photo(10, 'Sergio y un compañero frente a un santuario japonés.', 'Excursión a Kotohira, durante el viaje a Takamatsu · Septiembre de 2018'),
  ]);
  setPhotos('boulder', [
    photo(31, 'Sergio frente al letrero de CIRES en el campus nevado de la University of Colorado Boulder.', 'CIRES · University of Colorado Boulder · Archivo personal'),
    photo(32, 'Sergio con compañeros de NOAA Global Monitoring Laboratory en una celebración del equipo.', 'Con el equipo de NOAA GML · Archivo personal'),
  ]);
  setPhotos('maryland', [photo(33, 'Sergio frente al letrero de bienvenida de la University of Maryland.', 'University of Maryland · College Park · Archivo personal')]);
  setPhotos('compartir', [photo(28, 'Sergio con colegas en un stand de divulgación de NOAA.', 'Representando a NOAA · Divulgación y encuentros con estudiantes')]);
  setPhotos('huellas', [photo(29, 'Sergio presentando un póster de NOAA y CIRES sobre transporte atmosférico en Uganda.', 'Un estudio sobre Uganda · HYSPLIT · NOAA / CIRES'), ...find('huellas').images]);
  setPhotos('san-francisco', [photo(30, 'Sergio junto a su póster sobre impactos de COVID-19 en las emisiones de metano de Estados Unidos, en AGU 2023.', 'Metano y COVID-19 · AGU 2023 · San Francisco')]);
  after('takamatsu', {
    id: 'tuneles-2018', institutionStage: 'brasil', year: 2018, period: 'Noviembre de 2018', eyebrow: 'SÃO PAULO · TRABAJO EN TERRENO',
    title: 'La ciencia también<br>se hace <em>en terreno.</em>',
    text: 'Midiendo contaminación del aire en túneles de São Paulo. Detrás de los modelos también hay observaciones y trabajo en equipo.',
    location: location('São Paulo', 'Brasil', [-46.63, -23.55]),
    images: [photo(8, 'Sergio y un colega durante mediciones de contaminación en un túnel con tráfico en São Paulo.', 'Mediciones en túneles · São Paulo · 9 de noviembre de 2018')],
    notes: 'Fotografía y contexto aportados por Sergio; fecha comprobada en el original. El CV incluye el artículo de 2021 sobre factores de emisión y mediciones en túneles de São Paulo. Explica qué medían y cómo se organizaba una campaña.',
  });
  after('tuneles-2018', {
    id: 'amistades-usp', institutionStage: 'brasil', year: 2018, period: 'Diciembre de 2018', eyebrow: 'LAS PERSONAS EN EL CAMINO',
    title: 'Colegas.<br>Y también <em>amigos.</em>',
    text: 'En la USP, la investigación también fue amistad. Con Edmilson Dias de Freitas, Angel Vara-Vela y compañeros de distintas partes de Latinoamérica.',
    location: location('São Paulo', 'Brasil', [-46.733, -23.5595]),
    images: [photo(5, 'Sergio con el profesor Edmilson Dias de Freitas, de la Universidade de São Paulo.', 'Con mi amigo, el profesor Edmilson Dias de Freitas · USP · Diciembre de 2018'), photo(7, 'Sergio con su colega peruano Angel Vara-Vela en la USP.', 'Con Angel Vara-Vela · USP · Diciembre de 2018'), photo(6, 'Sergio con un amigo peruano en la USP, usando una polera con una red neuronal.', 'Un amigo, la USP y una polera de redes neuronales · Diciembre de 2018')],
    notes: 'Nombres y relaciones indicados por Sergio. Fechas de las fotos: 7 y 21 de diciembre de 2018. Cuenta lo que significan estas personas en tu historia y muestra el detalle de la red neuronal en la polera.',
  });
  after('chiba-2019', {
    id: 'beijing-2019', institutionStage: 'viaje', year: 2019, period: '19 de julio de 2019', eyebrow: 'CHINA · RECUERDOS DEL VIAJE',
    title: 'Caminar<br>por <em>Beijing.</em>', text: 'Wangfujing, el Templo del Cielo y los recuerdos del final de una estancia en China.',
    location: location('Beijing', 'China', [116.4064, 39.8819]),
    images: [photo(2, 'Sergio frente a la entrada de la calle de comidas Wangfujing en Beijing.', 'Wangfujing · Beijing · Julio de 2019'), photo(4, 'Sergio frente al Salón de Oración por las Buenas Cosechas del Templo del Cielo.', 'Templo del Cielo · Beijing · Julio de 2019'), photo(3, 'Sergio en el recinto del Templo del Cielo en Beijing.', 'Templo del Cielo · Beijing · Julio de 2019')],
    notes: 'Los originales están fechados el 19 de julio de 2019. La geolocalización de las fotos del templo corresponde al Templo del Cielo, que es distinto de la Ciudad Prohibida. Cuenta una escena de tu vida en China.',
  });
  after('viaje-minas-gerais', {
    id: 'escuela-aerosoles-2019', institutionStage: 'brasil', year: 2019, period: '22 julio – 2 agosto de 2019', eyebrow: 'SÃO PAULO · ESCUELA DE CIENCIA AVANZADA',
    title: 'El aire, visto<br><em>de cerca.</em>',
    text: 'São Paulo School of Advanced Science on Atmospheric Aerosols: propiedades, mediciones, modelación y efectos sobre el clima y la salud.',
    details: [{ label: '27 de julio', text: 'Actividades prácticas en la terraza del Museu de Arte Contemporânea de la USP.' }],
    location: location('São Paulo', 'Brasil', [-46.6507, -23.5895]),
    images: [photo(1, 'Sergio y compañeros de la escuela de aerosoles en la terraza del MAC-USP, con São Paulo al fondo.', 'Escuela de aerosoles · Terraza del MAC-USP · 27 de julio de 2019')],
    link: { label: 'La escuela de aerosoles', href: 'https://sites.google.com/view/spsas-aerosols/spsas' },
    notes: 'Evento confirmado por el sitio oficial y Jornal da USP. El original de la fotografía está fechado el 27 de julio de 2019. Esta escuela es diferente de la escuela de cambio climático de julio de 2017 que también aparece en el CV.',
  });

  after('tu-camino', {
    id: 'la-proxima-etapa', type: 'personal', institutionStage: 'regreso', year: 2027,
    period: '5 de febrero de 2027', eyebrow: 'LO QUE VIENE',
    title: 'La próxima etapa,<br><em>juntos.</em>',
    text: 'Mi novia también es científica. El 5 de febrero de 2027 nos casamos.',
    location: location('Santiago', 'Chile', [-70.65, -33.45]),
    atlasLabel: 'CIENCIA Y VIDA COMPARTIDA', hideGlobe: true,
    images: [{ src: 'assets/photos/fiancee.webp', alt: 'Mi novia junto a un póster de su investigación sobre impresión 3D y biorrobótica.', caption: 'Mi novia, presentando su investigación · Archivo personal', fit: 'contain', kind: 'photo' }],
    notes: 'Un cierre personal: tu novia también es científica y se casan el 5 de febrero de 2027. La fotografía y la fecha fueron compartidas por Sergio. El lugar de la boda no se indica.',
  });

  // Make the additional travel memories selectable on the globe and in the archive.
  for (const id of ['londres-2016', 'paris-2016', 'madrid-2016', 'amazonia-2016', 'fuji-2017', 'beijing-2019', 'escuela-aerosoles-2019']) {
    const slide = find(id);
    const place = slide.location;
    window.TRIPS.push({ id, city: place.label, country: place.country,
      region: ['Francia', 'España', 'Reino Unido'].includes(place.country) ? 'Europa' : ['Japón', 'China'].includes(place.country) ? 'Asia' : 'Brasil',
      year: slide.year, period: slide.period, coordinates: place.coordinates, event: slide.text, slideId: id });
  }
  // Sort again after adding the personal memories, keeping undated trips at the end.
  const tripYear = trip => trip.year || Number(trip.period.match(/20\d{2}/)?.[0] || 9999);
  window.TRIPS.sort((a, b) => tripYear(a) - tripYear(b));
  window.rebuildItinerary();
})();
