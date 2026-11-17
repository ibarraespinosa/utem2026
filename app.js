(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const slides = window.SLIDES;
  const stops = window.STOPS;
  const trips = window.TRIPS;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const plain = value => String(value ?? '').replace(/<br\s*\/?\s*>/gi, ' ').replace(/<[^>]*>/g, '');
  const titleHTML = value => escape(value).replace(/&lt;br\s*\/?&gt;/gi, '<br>').replace(/&lt;(\/?em)&gt;/gi, '<$1>');
  const searchable = value => plain(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}" /></svg>`;
  const number = value => String(value).padStart(2, '0');
  const institutions = {
    usp: { src: 'assets/logos/usp.png', name: 'Universidade de São Paulo', className: 'wide-logo dark-logo' },
    uchile: { src: 'assets/logos/uchile.svg', name: 'Universidad de Chile', className: 'dark-logo' },
    colorado: { src: 'assets/logos/colorado.svg', name: 'University of Colorado Boulder', className: 'dark-logo' },
    umd: { src: 'assets/logos/umd.svg', name: 'University of Maryland', className: 'wide-logo' },
    noaa: { src: 'assets/logos/noaa.webp', name: 'National Oceanic and Atmospheric Administration', className: 'noaa-logo' },
    cas: { src: 'assets/logos/cas.png', name: 'Chinese Academy of Sciences', className: 'wide-logo' },
  };
  let currentIndex = 0;
  let currentTrip = null;
  let currentImage = 0;
  let previousLocation = null;
  let travelTimer;
  let toastTimer;
  let globe;
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotion = motionPreference.matches;
  let savedMotion = null;
  let currentFilter = 'Todos';
  let routeView = 'story';
  let routeQuery = '';
  let lightboxImages = [];
  let lightboxIndex = 0;
  let notesReturnFocus;

  // Storage is optional, including when the presentation is opened as a local file.
  try {
    const value = localStorage.getItem('utem-reduced-motion');
    if (value === 'true' || value === 'false') savedMotion = value === 'true';
    reducedMotion = savedMotion ?? reducedMotion;
  } catch { /* Private browsing can disable storage. */ }
  document.body.classList.toggle('reduce-motion', reducedMotion);
  $('motionToggle').checked = reducedMotion;

  const stopFor = slide => stops.find(stop => stop.id === slide.stop) || stops[0];
  const locationFor = slide => slide.location || stopFor(slide);
  const chapterSlides = stop => slides.map((slide, index) => ({ slide, index })).filter(item => item.slide.stop === stop && item.slide.type !== 'cover');
  const indexForStop = id => slides.findIndex(slide => slide.id === stops.find(stop => stop.id === id)?.slideId);
  const imageCaption = image => `${escape(image.caption)}${image.credit && image.creditUrl ? ` · <a href="${escape(image.creditUrl)}" target="_blank" rel="noopener">${escape(image.credit)}</a>` : ''}`;

  function tripSlide(trip) {
    const linked = slides.find(slide => slide.id === trip.slideId);
    const nearby = stops.find(stop => stop.coordinates.every((value, i) => value === trip.coordinates[i]) && stop.id !== stops[0].id);
    return {
      id: `archivo-${trip.id}`,
      stop: linked?.stop || nearby?.id,
      eyebrow: 'CUADERNO DE VIAJES', period: trip.period,
      title: `<em>${trip.city}.</em>`, text: trip.event,
      location: { coordinates: trip.coordinates, label: trip.city, country: trip.country },
      details: trip.topics?.map((text, index) => ({ label: index ? 'También' : 'La investigación', text })),
      visual: 'globe', atlasTitle: trip.city, atlasSubtitle: `${trip.country} · ${trip.period}`,
      images: trip.images || linked?.images,
      approximate: trip.approximate,
      notes: linked?.notes || `Una parada del archivo de viajes. ${trip.event} Cuenta un recuerdo del encuentro o de las personas que te acompañaron.`,
    };
  }

  function activeSlide() { return currentTrip ? tripSlide(currentTrip) : slides[currentIndex]; }

  function writeHash(hash, replace = false) {
    if (location.hash === `#${hash}`) return;
    try { history[replace ? 'replaceState' : 'pushState'](null, '', `#${hash}`); }
    catch { location.hash = hash; }
  }

  function goToSlide(index, { updateHash = true, animate = true } = {}) {
    if (!Number.isInteger(index) || index < 0 || index >= slides.length) return;
    currentIndex = index;
    currentTrip = null;
    currentImage = 0;
    if (updateHash) writeHash(slides[index].id);
    renderNavigation(animate);
  }

  function showTrip(id, { updateHash = true, animate = true } = {}) {
    const trip = trips.find(item => item.id === id);
    if (!trip) return;
    currentTrip = trip;
    currentImage = 0;
    if (updateHash) writeHash(`archivo-${trip.id}`);
    renderNavigation(animate);
  }

  function renderNavigation(animate) {
    const focused = document.activeElement;
    const fromDialog = Boolean(focused?.closest('dialog'));
    closeDialogs();
    render(animate);
    if (fromDialog || !focused?.isConnected) $('story').focus({ preventScroll: true });
  }

  function step(direction) {
    if (currentTrip) {
      const index = trips.indexOf(currentTrip) + direction;
      if (index >= 0 && index < trips.length) showTrip(trips[index].id);
    } else goToSlide(currentIndex + direction);
  }

  function stepChapter(direction) {
    if (currentTrip) { step(direction); return; }
    const stopIndex = stops.findIndex(stop => stop.id === activeSlide().stop);
    const next = stops[stopIndex + direction];
    if (next) goToSlide(indexForStop(next.id));
  }

  function renderStory(slide) {
    let content = `
      <div class="slide-meta"><span class="meta-line"></span><span>${escape(slide.eyebrow)}</span>${slide.period ? `<span class="period">${escape(slide.period)}</span>` : ''}</div>
      <h1 class="slide-title" id="slideTitle">${titleHTML(slide.title)}</h1>
      <p class="slide-description">${escape(slide.text)}</p>`;

    if (slide.type === 'cover') {
      content += `
        <div class="cover-author"><img src="assets/photos/profile.jpg" alt="" width="45" height="45"><div><strong>Dr. Sergio Ibarra-Espinosa</strong><p>CISESS · University of Maryland<br>NOAA Air Resources Laboratory</p></div></div>
        <div class="cover-actions"><button class="primary-button" data-slide="1">Comenzar el viaje ${icon('arrow')}</button><div class="cover-event"><strong>17 noviembre 2026</strong>Campus Ñuñoa · Santiago</div></div>`;
    } else {
      if (slide.details?.length) content += `<ul class="slide-details">${slide.details.map(detail => `<li><span class="detail-label">${escape(detail.label)}</span><span class="detail-text">${escape(detail.text)}</span></li>`).join('')}</ul>`;
      if (slide.takeaway) content += `<p class="takeaway">${escape(slide.takeaway)}</p>`;
      if (slide.link) content += `<a class="story-link" href="${escape(slide.link.href)}" target="_blank" rel="noopener">${escape(slide.link.label)} ${icon('diagonal')}</a>`;
      if (slide.type === 'personal') content += `<div class="ending-actions"><button class="primary-button" data-dialog="resourcesDialog">Recursos y contacto ${icon('diagonal')}</button><button class="text-button" data-slide="0">Volver al inicio ${icon('arrow')}</button></div>`;
      const logoIds = slide.logos || (slide.id === 'magister' ? ['uchile'] : ({ brasil: ['usp'], boulder: ['colorado', 'noaa'], maryland: ['umd', 'noaa'], china: ['cas'] })[slide.institutionStage] || []);
      if (logoIds.length) content += `<div class="institution-logos" aria-label="Instituciones de esta etapa">${logoIds.map(id => institutions[id]).filter(Boolean).map(logo => `<img src="${logo.src}" alt="${logo.name}" class="${logo.className || ''}">`).join('')}</div>`;
      const pages = chapterSlides(slide.stop);
      if (currentTrip) {
        content += `<div class="chapter-pages archive-actions"><button class="text-button" data-return-story>Volver al relato ${icon('arrow')}</button><button class="text-button" data-dialog="routeDialog" data-route-view="archive">Ver todos los viajes</button></div>`;
      } else if (pages.length > 1) {
        content += `<nav class="chapter-pages" aria-label="Diapositivas de esta etapa">${pages.map(item => `<button class="chapter-page" data-slide="${item.index}" aria-label="${escape(plain(item.slide.title))}" aria-current="${item.index === currentIndex}"></button>`).join('')}<span class="chapter-page-label">${pages.findIndex(item => item.index === currentIndex) + 1} / ${pages.length}</span></nav>`;
      }
    }
    $('story').innerHTML = `<div class="story-inner story-enter">${content}</div>`;
    $('story').scrollTop = 0;
  }

  function renderMedia(slide) {
    const images = slide.images || [];
    const image = images[currentImage];
    $('visual').dataset.media = slide.visual === 'family' ? 'family' : image ? 'photo' : slide.visual || 'globe';
    $('visual').classList.toggle('has-atlas-title', !image && slide.visual === 'globe');
    $('globeToggle').hidden = !globe || Boolean(slide.hideGlobe) || (!image && !['notebook', 'closing'].includes(slide.visual));
    if (slide.visual === 'family') {
      $('mediaLayer').innerHTML = `<div class="family-album"><span class="eyebrow">ARCHIVO FAMILIAR</span><div class="family-photos">${images.map((item, i) => `<figure class="family-photo family-photo-${i}"><button data-open-image="${i}" aria-label="Ampliar: ${escape(item.alt)}"><img src="${escape(item.src)}" alt="${escape(item.alt)}"></button><figcaption>${escape(item.caption)}</figcaption></figure>`).join('')}</div><p class="family-dedication">En memoria de mis papás.</p></div>`;
      $('visualCaption').textContent = 'Los recuerdos que acompañan este camino · Archivo familiar';
      return;
    }
    if (image) {
      const science = image.fit === 'contain' && !['photo', 'logo'].includes(image.kind);
      const kind = image.kind === 'logo' ? ' is-logo' : science ? ' is-figure' : image.treatment === 'archive' ? ' is-archive' : image.fit === 'contain' ? ' is-full-photo' : '';
      const label = image.kind === 'logo' ? 'SOFTWARE ABIERTO' : science ? 'DESDE LA INVESTIGACIÓN' : image.treatment === 'archive' ? 'ARCHIVO PERSONAL / UTEM' : '';
      $('mediaLayer').innerHTML = `
        <figure class="photo-frame${kind}">
          <button class="photo-button" id="photoButton" aria-label="Ampliar imagen: ${escape(image.alt)}"><img id="slideImage" src="${escape(image.src)}" alt="${escape(image.alt)}" style="object-position:${escape(image.position || '50% 50%')}" decoding="async"></button>
          ${label ? `<span class="photo-label">${label}</span>` : ''}
          <span class="zoom-cue">${icon('expand')}</span>
        </figure>
        ${images.length > 1 ? `<div class="gallery-controls" role="group" aria-label="Imágenes de esta diapositiva">${images.map((item, i) => `<button class="gallery-button" data-image="${i}" aria-label="Ver imagen ${i + 1}: ${escape(item.caption)}" aria-pressed="${i === currentImage}">${number(i + 1)}</button>`).join('')}</div>` : ''}`;
      $('visualCaption').innerHTML = imageCaption(image);
      const img = $('slideImage');
      img.addEventListener('error', () => {
        if (!img.isConnected) return;
        img.closest('figure').innerHTML = `<div class="image-fallback" role="status">${icon('photo')}<h3>La imagen no pudo cargar.</h3><p>${escape(image.caption)}</p><button class="text-button" data-retry-image>Intentar de nuevo ${icon('arrow')}</button></div>`;
      }, { once: true });
      $('photoButton').addEventListener('click', () => openImage(image));
    } else if (slide.visual === 'notebook') {
      const book = slide.notebook;
      $('mediaLayer').innerHTML = `<div class="notebook"><span class="notebook-number" aria-hidden="true">${escape(book.number)}</span><div class="notebook-content"><span class="eyebrow">NOTAS DEL CAMINO</span><h3>${escape(book.title)}</h3><ul>${book.items.map(item => `<li>${escape(item)}</li>`).join('')}</ul></div></div>`;
      $('visualCaption').textContent = 'Una etapa de la trayectoria · Formación, preguntas y oportunidades.';
    } else if (slide.visual === 'closing') {
      $('mediaLayer').innerHTML = `<div class="closing-card"><span class="eyebrow">DE LA UTEM PARA EL MUNDO</span><h3>Sigamos<br><em>en contacto.</em></h3><div class="closing-contact"><a class="qr-link" href="https://ibarraespinosa.github.io/" target="_blank" rel="noopener" aria-label="Visitar el sitio personal de Sergio"><img src="assets/qr.png" alt="Código QR para visitar el sitio y contactar a Sergio Ibarra-Espinosa" width="128" height="128"></a><div><p>Escanea el código.<br>Encontrémonos en la próxima pregunta.</p><a href="mailto:zergioibarra@gmail.com">zergioibarra@gmail.com</a></div></div><button class="primary-button" data-dialog="resourcesDialog">Cursos, código y contacto ${icon('diagonal')}</button></div>`;
      $('visualCaption').textContent = 'Gracias a la comunidad UTEM y a quienes hicieron posible este encuentro.';
    } else if (slide.visual === 'globe') {
      $('mediaLayer').innerHTML = `<div class="atlas-title"><strong>${escape(slide.atlasTitle || locationFor(slide).label)}</strong><span>${escape(slide.atlasSubtitle || '')}</span></div>`;
      $('visualCaption').textContent = slide.approximate ? 'Ubicación de referencia regional · El punto del mapa es aproximado.' : 'Cada punto del mapa abre una historia. Explora los demás viajes en «El recorrido».';
    } else {
      $('mediaLayer').innerHTML = '';
      $('visualCaption').textContent = 'Un recorrido por los lugares, las preguntas y las personas que hacen una trayectoria.';
    }
  }

  function render(animate = true) {
    clearTimeout(travelTimer);
    const slide = activeSlide();
    const place = locationFor(slide);
    const cover = slide.type === 'cover';
    const changedPlace = previousLocation && previousLocation.coordinates.some((value, i) => value !== place.coordinates[i]);
    const traveling = globe && animate && changedPlace && !cover && !slide.hideGlobe && !reducedMotion;
    $('stage').classList.toggle('is-cover', cover);
    $('visual').classList.toggle('is-cover-visual', cover);
    $('visual').classList.remove('show-globe', 'is-traveling');
    $('globeToggle').setAttribute('aria-label', 'Ver globo');
    $('globeToggle').setAttribute('aria-pressed', 'false');
    $('globeToggle').innerHTML = icon('globe');
    $('globeNote').hidden = !cover;
    $('atlasLabel').textContent = slide.atlasLabel || (cover ? 'UN VIAJE QUE EMPEZÓ EN SANTIAGO' : `${place.label} / ${place.country || ''}`.toUpperCase());
    const [lon, lat] = place.coordinates;
    $('globeOrigin').innerHTML = `<span class="location-dot"></span><span>${escape(place.label)}<small>${Math.abs(lat).toFixed(2)}° ${lat < 0 ? 'S' : 'N'} / ${Math.abs(lon).toFixed(2)}° ${lon < 0 ? 'O' : 'E'}</small></span>`;
    renderStory(slide);
    renderMedia(slide);
    $('mediaLayer').inert = Boolean(traveling);
    if (traveling) {
      $('visual').classList.add('is-traveling');
      $('travelDestination').textContent = `${previousLocation.label} → ${place.label}`;
      travelTimer = setTimeout(() => {
        $('visual').classList.remove('is-traveling');
        $('mediaLayer').inert = false;
        syncGlobeVisibility();
      }, 1500);
    }
    if (slide.hideGlobe) globe?.stop();
    else globe?.setPlace(place, { cover, animate: Boolean(traveling), reduced: reducedMotion });
    syncGlobeVisibility();
    previousLocation = place;

    const index = currentTrip ? trips.indexOf(currentTrip) : currentIndex;
    const total = currentTrip ? trips.length : slides.length;
    $('slideNumber').textContent = number(index + 1);
    $('slideTotal').textContent = number(total);
    $('slideCounter').setAttribute('aria-label', `${currentTrip ? 'Viaje' : 'Diapositiva'} ${index + 1} de ${total}`);
    $('previousButton').disabled = index === 0;
    $('nextButton').disabled = index === total - 1;
    $('previousButton').setAttribute('aria-label', currentTrip ? 'Viaje anterior' : 'Diapositiva anterior');
    $('nextButton').setAttribute('aria-label', currentTrip ? 'Viaje siguiente' : 'Diapositiva siguiente');
    $('progressFill').style.width = `${(index + 1) / total * 100}%`;
    $('notesHeading').textContent = plain(slide.title);
    $('notesContent').textContent = slide.notes || 'Cuenta un recuerdo de esta etapa.';
    $('footerContext').innerHTML = currentTrip ? `ÁLBUM DE VIAJES <span class="detail-divider">/</span><span class="footer-secondary">${escape(place.country)}</span>` : `${cover ? 'SERGIO IBARRA-ESPINOSA' : escape(slide.year || 'MIS RAÍCES') + ' · ' + (slide.hideGlobe ? 'LO QUE VIENE' : escape(place.label).toUpperCase())} <span class="detail-divider">/</span><span class="footer-secondary">${cover ? 'CHARLA · CONVERSATORIO' : 'DE LA UTEM PARA EL MUNDO'}</span>`;
    $('slideAnnouncement').textContent = `${currentTrip ? 'Viaje' : 'Diapositiva'} ${index + 1} de ${total}. ${plain(slide.title)}${slide.hideGlobe ? '' : ` ${place.label}.`}`;
    document.title = cover ? 'De la UTEM para el mundo · Sergio Ibarra-Espinosa' : `${plain(slide.title)} · De la UTEM para el mundo`;
    const activeStop = stops.findIndex(stop => stop.id === slide.stop);
    document.querySelectorAll('[data-stop]').forEach(button => {
      const index = stops.findIndex(stop => stop.id === button.dataset.stop);
      button.classList.toggle('visited', index < activeStop);
      if (index === activeStop) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    const activeButton = $('routeTrack').querySelector('[aria-current="step"]');
    if (activeButton) {
      const track = $('routeTrack');
      const left = activeButton.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      track.scrollTo({ left: Math.max(0, left - track.clientWidth / 2 + activeButton.offsetWidth / 2), behavior: reducedMotion ? 'instant' : 'smooth' });
    }
    if (matchMedia('(max-width: 760px)').matches) window.scrollTo({ top: 0, behavior: 'instant' });
    // Decode the next slide's photo in advance; the current story never waits for it.
    const nextTrip = currentTrip && trips[trips.indexOf(currentTrip) + 1];
    const nextPhoto = (currentTrip ? nextTrip && tripSlide(nextTrip) : slides[currentIndex + 1])?.images?.[0];
    if (nextPhoto) { const image = new Image(); image.src = nextPhoto.src; }
  }

  function buildNavigation() {
    $('routeTrack').innerHTML = stops.map(stop => `<button class="route-stop" data-stop="${stop.id}" title="${escape(stop.name)} · ${escape(stop.period)}"><span class="stop-number">${escape(stop.year || '—')}</span><span class="stop-name">${escape(stop.name)}</span></button>`).join('');
    $('resourceList').innerHTML = window.RESOURCES.map(resource => `<a class="resource-link" href="${escape(resource.href)}" target="_blank" rel="noopener"><span>${escape(resource.tag)}</span><div><h3>${escape(resource.title)}</h3><p>${escape(resource.description)}</p></div>${icon('diagonal')}</a>`).join('');
    const filters = ['Todos', ...new Set(trips.map(trip => trip.region))];
    $('tripFilters').innerHTML = filters.map(filter => `<button class="trip-filter" data-filter="${escape(filter)}" aria-pressed="${filter === currentFilter}">${escape(filter)}</button>`).join('');
    renderRoutes();
  }

  function renderRoutes() {
    const query = searchable(routeQuery.trim());
    const matches = value => searchable(value).includes(query);
    const matchingStops = stops.filter(stop => matches([stop.name, stop.country, stop.period, ...slides.filter(slide => slide.stop === stop.id).flatMap(slide => [slide.title, slide.text, slide.year, slide.period])].join(' ')));
    const matchingTrips = trips.filter(trip => (currentFilter === 'Todos' || trip.region === currentFilter) && matches([trip.city, trip.country, trip.period, trip.event, ...(trip.topics || [])].join(' ')));
    $('routeGrid').innerHTML = matchingStops.map(stop => `<button class="route-card" data-stop="${stop.id}"${activeSlide().stop === stop.id ? ' aria-current="step"' : ''}><span class="route-card-number">${number(stops.indexOf(stop) + 1)}</span><span><span class="route-card-title">${escape(stop.name)}</span><small>${escape(stop.period)}</small><span class="route-card-description">${escape(stop.description)}</span></span>${icon('diagonal')}</button>`).join('');
    $('tripList').innerHTML = matchingTrips.map(trip => `<button class="trip-row" data-trip="${trip.id}"${currentTrip?.id === trip.id ? ' aria-current="true"' : ''}><span>${escape(trip.period)}</span><span><strong>${escape(trip.city)} <small>${escape(trip.country)}</small></strong><small>${escape(trip.event)}</small></span>${icon('diagonal')}</button>`).join('');
    $('tripFilters').querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', button.dataset.filter === currentFilter));
    const count = routeView === 'story' ? matchingStops.length : matchingTrips.length;
    const total = routeView === 'story' ? stops.length : trips.length;
    $('routeResults').textContent = `${count} de ${total} ${routeView === 'story' ? 'etapas' : 'destinos'}${routeQuery.trim() ? ` · «${routeQuery.trim()}»` : ''}`;
    $('routeEmpty').hidden = count > 0;
  }

  function setRouteView(view) {
    if (!['story', 'archive'].includes(view)) return;
    routeView = view;
    $('routeStoryPanel').hidden = view !== 'story';
    $('routeArchivePanel').hidden = view !== 'archive';
    document.querySelectorAll('.route-view').forEach(button => button.setAttribute('aria-pressed', button.dataset.routeView === view));
    renderRoutes();
  }

  function closeDialogs() { document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close()); }

  function openDialog(id, { view } = {}) {
    closeDialogs();
    const dialog = $(id);
    if (!dialog) return;
    if (id === 'routeDialog') setRouteView(view || routeView);
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('dialog-open');
    globe?.stop();
  }

  function openImage(image) {
    lightboxImages = activeSlide().images || [image];
    lightboxIndex = Math.max(0, lightboxImages.indexOf(image));
    renderLightbox();
    openDialog('lightbox');
  }

  function renderLightbox() {
    const image = lightboxImages[lightboxIndex];
    if (!image) return;
    $('lightboxImage').hidden = false;
    $('lightboxImage').src = image.src;
    $('lightboxImage').alt = image.alt;
    $('lightboxCaption').innerHTML = imageCaption(image);
    $('lightboxControls').hidden = lightboxImages.length < 2;
    $('lightboxCounter').textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
    $('lightboxPrevious').disabled = lightboxIndex === 0;
    $('lightboxNext').disabled = lightboxIndex === lightboxImages.length - 1;
  }

  function stepImage(direction) {
    const next = lightboxIndex + direction;
    if (next < 0 || next >= lightboxImages.length) return;
    lightboxIndex = next;
    renderLightbox();
  }

  function toggleNotes() {
    const opening = $('notesPanel').hidden;
    if (opening) notesReturnFocus = document.activeElement;
    const hadFocus = $('notesPanel').contains(document.activeElement);
    $('notesPanel').hidden = !opening;
    $('notesButton').setAttribute('aria-expanded', opening);
    if (opening) $('closeNotes').focus({ preventScroll: true });
    else if (hadFocus) (notesReturnFocus?.isConnected ? notesReturnFocus : $('notesButton')).focus({ preventScroll: true });
  }

  function syncGlobeVisibility() {
    const slide = activeSlide();
    const hasMedia = slide.images?.length || ['family', 'notebook', 'closing'].includes(slide.visual);
    const showing = $('visual').classList.contains('show-globe');
    const traveling = $('visual').classList.contains('is-traveling');
    const visible = !slide.hideGlobe && (!hasMedia || showing || traveling);
    $('globeWrap').setAttribute('aria-hidden', !visible);
    $('globeWrap').inert = !visible;
    $('mediaLayer').inert = showing || traveling;
    $('globeCanvas').setAttribute('aria-label', `Globo con la ruta de Sergio, centrado en ${locationFor(slide).label}. Arrastra para girarlo o abre «El recorrido» para elegir una parada.`);
  }

  function toggleGlobe() {
    if ($('globeToggle').hidden) return;
    clearTimeout(travelTimer);
    $('visual').classList.remove('is-traveling');
    const showing = $('visual').classList.toggle('show-globe');
    $('globeToggle').setAttribute('aria-label', showing ? 'Ver imagen' : 'Ver globo');
    $('globeToggle').setAttribute('aria-pressed', showing);
    $('globeToggle').innerHTML = icon(showing ? 'photo' : 'globe');
    syncGlobeVisibility();
    globe?.draw();
  }

  function applyMotionPreference(enabled) {
    reducedMotion = enabled;
    document.body.classList.toggle('reduce-motion', reducedMotion);
    $('motionToggle').checked = reducedMotion;
    clearTimeout(travelTimer);
    $('visual').classList.remove('is-traveling');
    syncGlobeVisibility();
    if (!activeSlide().hideGlobe) globe?.setPlace(locationFor(activeSlide()), { cover: activeSlide().type === 'cover', animate: false, reduced: reducedMotion });
    if (document.querySelector('dialog[open]')) globe?.stop();
  }

  function notify(message) {
    clearTimeout(toastTimer);
    $('toast').textContent = message;
    $('toast').hidden = false;
    toastTimer = setTimeout(() => { $('toast').hidden = true; }, 4200);
  }

  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else notify('Usa la opción de pantalla completa de tu navegador.');
    } catch { notify('Puedes activar la pantalla completa desde el menú del navegador.'); }
  }

  function readHash({ initial = false } = {}) {
    let hash;
    try { hash = decodeURIComponent(location.hash.slice(1)); } catch { hash = 'inicio'; }
    if (hash === 'story' && !initial) { $('story').focus(); return; }
    // Main slide IDs take precedence over legacy viaje-* archive links.
    const index = slides.findIndex(slide => slide.id === hash);
    if (index >= 0) {
      if (index === currentIndex && !currentTrip && !initial) return;
      goToSlide(index, { updateHash: false, animate: !initial });
      return;
    }
    const archiveId = hash.match(/^(?:archivo-|viaje-)(.+)$/)?.[1];
    if (archiveId && trips.some(trip => trip.id === archiveId)) {
      if (currentTrip?.id !== archiveId || initial) showTrip(archiveId, { updateHash: false, animate: !initial });
      return;
    }
    goToSlide(0, { updateHash: false, animate: !initial });
    if (hash === 'story') $('story').focus();
  }

  document.addEventListener('click', event => {
    const target = event.target.closest('button, a');
    if (!target) return;
    if (target.classList.contains('skip-link')) { event.preventDefault(); $('story').focus(); }
    else if (target.dataset.slide !== undefined) goToSlide(Number(target.dataset.slide));
    else if (target.dataset.stop) goToSlide(indexForStop(target.dataset.stop));
    else if (target.dataset.trip) showTrip(target.dataset.trip);
    else if (target.dataset.dialog) openDialog(target.dataset.dialog, { view: target.dataset.routeView });
    else if (target.dataset.routeView) setRouteView(target.dataset.routeView);
    else if (target.hasAttribute('data-close')) target.closest('dialog')?.close();
    else if (target.hasAttribute('data-return-story')) goToSlide(currentIndex);
    else if (target.hasAttribute('data-retry-image')) { renderMedia(activeSlide()); $('photoButton')?.focus({ preventScroll: true }); }
    else if (target.hasAttribute('data-reset-route')) {
      routeQuery = '';
      currentFilter = 'Todos';
      $('routeSearch').value = '';
      renderRoutes();
      $('routeSearch').focus({ preventScroll: true });
    }
    else if (target.dataset.image !== undefined) {
      currentImage = Number(target.dataset.image);
      renderMedia(activeSlide());
      $('mediaLayer').querySelector(`[data-image="${currentImage}"]`)?.focus({ preventScroll: true });
    } else if (target.dataset.openImage !== undefined) {
      const image = activeSlide().images?.[Number(target.dataset.openImage)];
      if (image) openImage(image);
    } else if (target.dataset.filter) {
      currentFilter = target.dataset.filter;
      renderRoutes();
    }
  });

  $('previousButton').addEventListener('click', () => step(-1));
  $('nextButton').addEventListener('click', () => step(1));
  $('presentButton').addEventListener('click', fullscreen);
  $('notesButton').addEventListener('click', toggleNotes);
  $('closeNotes').addEventListener('click', toggleNotes);
  $('globeToggle').addEventListener('click', toggleGlobe);
  $('routeSearch').addEventListener('input', event => { routeQuery = event.target.value; renderRoutes(); });
  $('lightboxPrevious').addEventListener('click', () => stepImage(-1));
  $('lightboxNext').addEventListener('click', () => stepImage(1));
  $('lightboxImage').addEventListener('error', () => {
    $('lightboxImage').hidden = true;
    $('lightboxCaption').textContent = 'No se pudo cargar esta imagen. Puedes cerrar el visor y volver a intentarlo.';
  });
  $('motionToggle').addEventListener('change', event => {
    savedMotion = event.target.checked;
    try { localStorage.setItem('utem-reduced-motion', String(savedMotion)); } catch { /* Optional preference. */ }
    applyMotionPreference(savedMotion);
  });
  motionPreference.addEventListener('change', event => { if (savedMotion === null) applyMotionPreference(event.matches); });
  document.addEventListener('fullscreenchange', () => {
    const enabled = Boolean(document.fullscreenElement);
    $('presentButton').querySelector('span').textContent = enabled ? 'Salir' : 'Presentar';
    $('presentButton').setAttribute('title', enabled ? 'Salir de pantalla completa (F)' : 'Pantalla completa (F)');
    $('presentButton').setAttribute('aria-label', enabled ? 'Salir de pantalla completa' : 'Presentar en pantalla completa');
  });

  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => {
      const open = Boolean(document.querySelector('dialog[open]'));
      document.body.classList.toggle('dialog-open', open);
      if (!open && !activeSlide().hideGlobe) globe?.start();
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });

  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    if ($('lightbox').open && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
      stepImage(event.key === 'ArrowRight' ? 1 : -1);
      return;
    }
    if (document.querySelector('dialog[open]')) return;
    if (event.key === 'Escape') {
      if (!$('notesPanel').hidden) toggleNotes();
      return;
    }
    if ((event.key === ' ' || event.key === 'Enter') && event.target.closest('button, a, summary')) return;
    const key = event.key.toLowerCase();
    const actions = {
      arrowright: () => step(1), pagedown: () => step(1), ' ': () => step(1),
      arrowleft: () => step(-1), pageup: () => step(-1),
      arrowdown: () => stepChapter(1), arrowup: () => stepChapter(-1),
      home: () => goToSlide(0), end: () => goToSlide(slides.length - 1),
      f: fullscreen, n: toggleNotes, g: toggleGlobe, m: () => openDialog('routeDialog'),
      '?': () => openDialog('helpDialog'),
    };
    if (actions[key]) { event.preventDefault(); actions[key](); }
  });

  let touch;
  $('story').addEventListener('touchstart', event => {
    touch = null;
    if (event.touches.length !== 1 || event.target.closest('a, button, input, textarea, select')) return;
    touch = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  $('story').addEventListener('touchend', event => {
    if (!touch) return;
    const dx = event.changedTouches[0].clientX - touch.x;
    const dy = event.changedTouches[0].clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.8) step(dx < 0 ? 1 : -1);
  }, { passive: true });
  $('story').addEventListener('touchcancel', () => { touch = null; }, { passive: true });

  window.addEventListener('hashchange', () => readHash());
  window.addEventListener('popstate', () => readHash());
  buildNavigation();
  if (window.d3?.geoOrthographic && window.JourneyGlobe) {
    try { globe = new JourneyGlobe($('globeCanvas'), trips, id => showTrip(id)); }
    catch { /* The story and route remain usable when canvas is unavailable. */ }
  }
  if (!globe) {
    $('globeCanvas').hidden = true;
    $('globeWrap').insertAdjacentHTML('afterbegin', '<div class="image-fallback"><h3>Un mundo de caminos.</h3><p>Abre «El recorrido» para elegir un destino.</p></div>');
  }
  readHash({ initial: true });
  document.fonts?.ready.then(() => globe?.draw());
  window.presentation = { goToSlide, showTrip, getCurrent: () => ({ index: currentIndex, trip: currentTrip?.id || null, id: activeSlide().id }) };
})();
