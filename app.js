// Motor interactivo de vuelo global, control de diapositivas y simuladores científicos
// Dr. Sergio Ibarra-Espinosa — UTEM 2026

(function () {
  let currentSlideIdx = 0;
  let currentStopId = null;
  let layoutMode = "split"; // "split" | "slide" | "map"
  let map = null;
  let stopMarkers = {};
  let flightLines = [];
  let activeArcLine = null;
  let planeMarker = null;
  let animFrameId = null;

  const stops = window.FLIGHT_STOPS;
  const slides = window.SLIDES;

  // Helpers
  function getStopById(id) {
    return stops.find((s) => s.id === id) || stops[0];
  }

  function getStopIndex(id) {
    return stops.findIndex((s) => s.id === id);
  }

  function getSlidesForStop(stopId) {
    return slides
      .map((s, idx) => ({ slide: s, index: idx }))
      .filter((item) => item.slide.stopId === stopId);
  }

  // Format simple inline math expressions like \text{PM}_{2.5} or formulas nicely
  function formatMathText(str) {
    if (!str) return "";
    return str
      .replace(/\$\\text\{([^}]+)\}_\{([^}]+)\}\$/g, "<strong>$1<sub>$2</sub></strong>")
      .replace(/\$\\text\{([^}]+)\}\$/g, "<strong>$1</strong>")
      .replace(/\\text\{([^}]+)\}_\{([^}]+)\}/g, "$1<sub>$2</sub>")
      .replace(/\\text\{([^}]+)\}/g, "$1")
      .replace(/\$([^$]+)\$/g, (_, expr) => {
        return "<code style='color:#7dd3fc;font-family:var(--font-mono);'>" +
          expr
            .replace(/\\ge/g, "≥")
            .replace(/\\le/g, "≤")
            .replace(/\\times/g, "×")
            .replace(/\\rightarrow/g, "→")
            .replace(/\\mu/g, "μ")
            .replace(/\^\\circ/g, "°")
            .replace(/_\{([^}]+)\}/g, "<sub>$1</sub>")
            .replace(/\^\{([^}]+)\}/g, "<sup>$1</sup>")
            .replace(/_([a-zA-Z0-9]+)/g, "<sub>$1</sub>")
            .replace(/\^([a-zA-Z0-9+-]+)/g, "<sup>$1</sup>") +
          "</code>";
      });
  }

  function formatFormulaBlock(formula) {
    if (!formula) return "";
    return formula
      .replace(/\\hat\{\\mathbf\{([^}]+)\}\}/g, "<strong>$1̂</strong>")
      .replace(/\\mathbf\{([^}]+)\}/g, "<strong>$1</strong>")
      .replace(/\\text\{([^}]+)\}/g, "$1")
      .replace(/\\mathbb\{I\}/g, "𝕀")
      .replace(/\\sum_\{([^}]+)\}/g, "∑<sub>$1</sub>")
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "($1) / ($2)")
      .replace(/\\left\(/g, "(")
      .replace(/\\right\)/g, ")")
      .replace(/\\cdot/g, "·")
      .replace(/\\ge/g, "≥")
      .replace(/\\theta/g, "θ")
      .replace(/\\gamma/g, "γ")
      .replace(/\\psi/g, "ψ")
      .replace(/_\{([^}]+)\}/g, "<sub>$1</sub>")
      .replace(/\^\{([^}]+)\}/g, "<sup>$1</sup>")
      .replace(/_([a-zA-Z0-9]+)/g, "<sub>$1</sub>")
      .replace(/\^([a-zA-Z0-9T+-]+)/g, "<sup>$1</sup>");
  }

  // Generate curved geodesic points between two [lat, lng] coordinates
  function getCurvedArc(start, end, numPoints = 80) {
    const lat1 = start[0], lng1 = start[1];
    const lat2 = end[0], lng2 = end[1];
    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;
    const dist = Math.hypot(dLat, dLng);
    // Offset perpendicular for visual flight arc curvature
    const curveHeight = Math.min(dist * 0.18, 22);
    const points = [];
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const lat = lat1 + dLat * t + Math.sin(Math.PI * t) * curveHeight * 0.65;
      const lng = lng1 + dLng * t;
      points.push([lat, lng]);
    }
    return points;
  }

  // Initialize Leaflet World Map
  function initMap() {
    map = L.map("worldMap", {
      center: [-33.4627, -70.5975],
      zoom: 4,
      zoomControl: false,
      attributionControl: false
    });

    L.control.zoom({ position: "topright" }).addTo(map);

    // Dark atmospheric map tiles (CartoDB Dark Matter)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 18
    }).addTo(map);

    // Draw full background flight network between consecutive stops
    for (let i = 0; i < stops.length - 1; i++) {
      const arcPts = getCurvedArc(stops[i].coords, stops[i + 1].coords, 60);
      const line = L.polyline(arcPts, {
        color: "#38bdf8",
        weight: 2,
        opacity: 0.32,
        dashArray: "6, 8"
      }).addTo(map);
      flightLines.push(line);
    }

    // Create interactive stop markers
    stops.forEach((stop, idx) => {
      const icon = L.divIcon({
        className: "custom-stop-marker",
        html: `<div class="marker-pin" id="pin-${stop.id}" title="${stop.shortName}">${stop.number}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker(stop.coords, { icon }).addTo(map);
      marker.bindTooltip(
        `<div style="font-family:sans-serif;padding:3px 6px;">
          <strong style="color:#0284c7;">${stop.shortName}</strong><br/>
          <span>${stop.city}</span><br/>
          <small style="color:#64748b;">${stop.period}</small>
        </div>`,
        { direction: "top", offset: [0, -14] }
      );

      marker.on("click", () => {
        const stopSlides = getSlidesForStop(stop.id);
        if (stopSlides.length > 0) {
          goToSlide(stopSlides[0].index);
        }
      });

      stopMarkers[stop.id] = marker;
    });

    // Create animated airplane marker
    const planeIcon = L.divIcon({
      className: "plane-marker-icon",
      html: `<div id="planeGlyph" style="transform:rotate(0deg);">✈️</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    planeMarker = L.marker(stops[0].coords, { icon: planeIcon, zIndexOffset: 1000 }).addTo(map);
  }

  // Animate plane between two stops
  function animateFlightToStop(prevStop, nextStop) {
    if (!map) return;

    // Update marker highlight classes
    stops.forEach((s) => {
      const pin = document.getElementById(`pin-${s.id}`);
      if (pin) {
        pin.classList.toggle("active", s.id === nextStop.id);
      }
    });

    // Update Map Bottom Overlay Card
    const tagEl = document.getElementById("mapStopTag");
    const nameEl = document.getElementById("mapStopName");
    const coordsEl = document.getElementById("mapStopCoords");
    if (tagEl) tagEl.textContent = `PARADA ${nextStop.number} DE ${stops.length} · ${nextStop.period}`;
    if (nameEl) nameEl.textContent = `${nextStop.city}`;
    if (coordsEl) {
      coordsEl.textContent = `${nextStop.code} · Lat ${nextStop.coords[0].toFixed(2)}°, Lon ${nextStop.coords[1].toFixed(2)}° · Modelos: ${nextStop.models.join(", ")}`;
    }

    if (!prevStop || prevStop.id === nextStop.id) {
      map.flyTo(nextStop.coords, nextStop.zoom, { duration: 1.4 });
      planeMarker.setLatLng(nextStop.coords);
      return;
    }

    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (activeArcLine) map.removeLayer(activeArcLine);

    const arcPts = getCurvedArc(prevStop.coords, nextStop.coords, 90);
    activeArcLine = L.polyline([], {
      color: "#f59e0b",
      weight: 3.5,
      opacity: 0.95
    }).addTo(map);

    // Fit bounds or fly smoothly
    const dist = Math.hypot(
      nextStop.coords[0] - prevStop.coords[0],
      nextStop.coords[1] - prevStop.coords[1]
    );
    const flightDurationMs = dist > 20 ? 2200 : 1100;

    map.flyTo(nextStop.coords, nextStop.zoom, {
      duration: flightDurationMs / 1000,
      easeLinearity: 0.25
    });

    const startTime = performance.now();
    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / flightDurationMs, 1);
      const idx = Math.floor(progress * (arcPts.length - 1));
      const pt = arcPts[idx];
      planeMarker.setLatLng(pt);
      activeArcLine.setLatLngs(arcPts.slice(0, idx + 1));

      if (progress < 1) {
        animFrameId = requestAnimationFrame(step);
      }
    }
    animFrameId = requestAnimationFrame(step);
  }

  // Show global overview of all stops on the map
  window.showWorldOverview = function () {
    if (!map) return;
    const group = L.featureGroup(Object.values(stopMarkers));
    map.flyToBounds(group.getBounds().pad(0.18), { duration: 1.5 });
  };

  // Render Top Route Ribbon
  function renderRouteRibbon() {
    const ribbon = document.getElementById("routeRibbon");
    if (!ribbon) return;
    const activeStopIdx = getStopIndex(slides[currentSlideIdx].stopId);

    ribbon.innerHTML = stops
      .map((stop, idx) => {
        const isCurrent = stop.id === slides[currentSlideIdx].stopId;
        const isVisited = idx < activeStopIdx;
        const cls = isCurrent ? "stop-pill active" : isVisited ? "stop-pill visited" : "stop-pill";
        const connCls = idx < activeStopIdx ? "route-connector active" : "route-connector";
        const connector = idx < stops.length - 1 ? `<div class="${connCls}"></div>` : "";
        return `
          <button class="${cls}" data-stop-id="${stop.id}" title="${stop.city} (${stop.period})">
            <span class="stop-num">${stop.number}</span>
            <span>${stop.shortName.replace(/^\d+\.\s*/, "")}</span>
          </button>
          ${connector}
        `;
      })
      .join("");

    ribbon.querySelectorAll(".stop-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sid = btn.getAttribute("data-stop-id");
        const stopSlides = getSlidesForStop(sid);
        if (stopSlides.length > 0) {
          goToSlide(stopSlides[0].index);
        }
      });
    });

    // Ensure active pill is scrolled into view
    const activePill = ribbon.querySelector(".stop-pill.active");
    if (activePill) {
      activePill.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  // Render Slide Content
  function renderCurrentSlide() {
    const slide = slides[currentSlideIdx];
    const stop = getStopById(slide.stopId);
    const stopSlides = getSlidesForStop(slide.stopId);
    const container = document.getElementById("slideStage");

    // Update Telemetry Header
    document.getElementById("telCode").textContent = stop.code;
    document.getElementById("telPeriod").textContent = stop.period;
    document.getElementById("telDist").textContent = `${stop.distanceKm.toLocaleString("es-CL")} km`;

    // Update Bottom Progress & Counter
    const pct = ((currentSlideIdx + 1) / slides.length) * 100;
    document.getElementById("progressFill").style.width = `${pct}%`;
    document.getElementById("slideCounter").textContent = `Slide ${currentSlideIdx + 1} / ${slides.length} · Parada ${stop.number}/10`;

    // Update Prev / Next / Next Stop buttons
    document.getElementById("prevSlideBtn").disabled = currentSlideIdx === 0;
    document.getElementById("nextSlideBtn").disabled = currentSlideIdx === slides.length - 1;

    // Speaker notes
    document.getElementById("notesBody").innerHTML = slide.speakerNotes || "Sin notas para esta diapositiva.";

    // Sub-slide dots within current stop
    const subDotsHtml = stopSlides
      .map((item, i) => {
        const active = item.index === currentSlideIdx ? "sub-dot active" : "sub-dot";
        return `<button class="${active}" data-slide-idx="${item.index}">${i + 1}. ${item.slide.subTitlePill}</button>`;
      })
      .join("");

    const badgeLabel =
      slide.badgeType === "science"
        ? "🔬 Ciencia & Modelos"
        : slide.badgeType === "interactive"
        ? "🎛️ Laboratorio Interactivo"
        : "✈️ Trayectoria & Vida";

    // Special Render Type 1: Boarding Pass (Slide 0)
    if (slide.renderType === "boarding_pass") {
      container.innerHTML = `
        <div class="slide-inner">
          <div class="slide-top-meta">
            <div class="badge-row">
              <span class="pill-badge stop">📍 ${stop.city}</span>
              <span class="pill-badge ${slide.badgeType}">${badgeLabel}</span>
            </div>
            <div class="slide-sub-dots">${subDotsHtml}</div>
          </div>

          <h1 class="slide-headline">${slide.headline}</h1>
          <p class="slide-subtitle">${slide.subtitle}</p>

          <div class="boarding-pass">
            <div class="bp-header">
              <div class="bp-route">
                <div>
                  <div class="bp-code">UTEM · SCL</div>
                  <div class="bp-city">Campus Ñuñoa, Santiago</div>
                </div>
                <div class="bp-plane-divider">┈┈┈ ✈️ ┈┈┈</div>
                <div>
                  <div class="bp-code">MUNDO</div>
                  <div class="bp-city">CHILE · BRASIL · CHINA · FRANCIA · UK · EE.UU.</div>
                </div>
              </div>
              <button class="cta-takeoff-btn" id="startFlightBtn">
                ✈️ Despegar en el Viaje Científico
              </button>
            </div>

            <div class="bp-grid">
              <div>
                <div class="bp-field-label">Pasajero / Expositor</div>
                <div class="bp-field-val">Dr. Sergio Ibarra-Espinosa</div>
              </div>
              <div>
                <div class="bp-field-label">Profesión de Origen (UTEM)</div>
                <div class="bp-field-val">Ing. en Prevención de Riesgos y Medio Ambiente</div>
              </div>
              <div>
                <div class="bp-field-label">Posición Actual (EE.UU.)</div>
                <div class="bp-field-val">Visiting Research Scientist · CISESS UMD & NOAA ARL</div>
              </div>
              <div>
                <div class="bp-field-label">Impacto Científico Global</div>
                <div class="bp-field-val">48+ Papers · 1,665+ Citas (H=26) · >100k Descargas</div>
              </div>
            </div>
          </div>

          <div class="grid-2">
            <div class="glass-card">
              <div class="card-title">📬 Invitación Oficial a nuestra Comunidad UTEM</div>
              <p style="font-size:0.9rem;line-height:1.58;color:#cbd5e1;font-style:italic;">
                «La Dirección del Departamento de Física y el Decanato de la Facultad de Ciencias Naturales, Matemática y del Medioambiente les saluda y extiende una invitación para el <strong>martes 17 de noviembre a las 10:00 horas en la multisala de la biblioteca Ximena Sánchez S., Campus Ñuñoa</strong>.<br/><br/>
                Invitado: <strong>Dr. Sergio Ibarra E.</strong>, Ingeniero en Prevención de Riesgos y Medio Ambiente (UTEM), Investigador científico visitante en el Cooperative Institute for Satellite Earth System Studies (CISESS), Universidad de Maryland, NOAA Air Resources Laboratory, EE. UU.»
              </p>
            </div>
            <div class="glass-card">
              <div class="card-title">🗺️ Hoja de Ruta del Vuelo (Haz clic en cualquier parada arriba o en el mapa)</div>
              <ul class="science-list">
                <li><strong>1–3. Chile (2003–2013):</strong> Pregrado en <strong>UTEM</strong>, 6 años en <strong>CENMA</strong> y Magíster en la <strong>U. de Chile</strong>.</li>
                <li><strong>4. Brasil (2013–2022):</strong> Doctorado y Postdoc en <strong>USP & IPEN</strong> (creación de <code>VEIN</code>, <code>eixport</code>, <code>WRF-Chem</code>).</li>
                <li><strong>5–7. Asia y Europa (2016–2021):</strong> <strong>Academia China de Ciencias (CAS)</strong>, <strong>Francia (CEREA / MUNICH)</strong> y <strong>Reino Unido (TRL & Univ. Leeds)</strong>.</li>
                <li><strong>8–9. Estados Unidos (2022–Hoy):</strong> <strong>NOAA GML & CU Boulder</strong> (Metano) y <strong>NOAA ARL & Univ. of Maryland</strong> (Estratósfera, HYSPLIT y ML).</li>
              </ul>
            </div>
          </div>
        </div>
      `;
      bindSubDots(container);
      const startBtn = document.getElementById("startFlightBtn");
      if (startBtn) startBtn.addEventListener("click", () => goToSlide(1));
      return;
    }

    // Special Render Type 2: Full Interactive VEIN Simulator
    if (slide.renderType === "vein_simulator") {
      container.innerHTML = `
        <div class="slide-inner">
          <div class="slide-top-meta">
            <div class="badge-row">
              <span class="pill-badge stop">📍 ${stop.city}</span>
              <span class="pill-badge interactive">${badgeLabel}</span>
            </div>
            <div class="slide-sub-dots">${subDotsHtml}</div>
          </div>
          <h1 class="slide-headline">${slide.headline}</h1>
          <p class="slide-subtitle">${slide.subtitle}</p>

          <div class="sim-panel">
            <div class="sim-controls-grid">
              <div class="sim-control">
                <div class="sim-control-header">
                  <span>🚗 Velocidad Media Vial</span>
                  <span class="sim-control-val" id="veinSpeedVal">28 km/h</span>
                </div>
                <input type="range" id="veinSpeed" min="8" max="100" value="28" />
              </div>
              <div class="sim-control">
                <div class="sim-control-header">
                  <span>🌡️ Temperatura Ambiente</span>
                  <span class="sim-control-val" id="veinTempVal">26 °C</span>
                </div>
                <input type="range" id="veinTemp" min="5" max="40" value="26" />
              </div>
              <div class="sim-control">
                <div class="sim-control-header">
                  <span>🌱 % Etanol / Biocombustible</span>
                  <span class="sim-control-val" id="veinEthVal">45 %</span>
                </div>
                <input type="range" id="veinEth" min="0" max="90" value="45" />
              </div>
              <div class="sim-control">
                <div class="sim-control-header">
                  <span>🔧 Edad Media de Flota</span>
                  <span class="sim-control-val" id="veinAgeVal">11 años</span>
                </div>
                <input type="range" id="veinAge" min="1" max="28" value="11" />
              </div>
            </div>

            <div class="grid-4" id="veinLiveKpis" style="margin-bottom:14px;"></div>

            <div class="sim-canvas-wrap">
              <canvas id="veinSimCanvas" class="sim-canvas" width="960" height="250"></canvas>
            </div>
            <p style="font-size:0.78rem;color:#94a3b8;margin-top:8px;">
              💡 <strong>Física y Química en VEIN:</strong> Observa cómo bajo <strong>20 km/h</strong> (congestión) las emisiones de escape de CO y NOx se disparan no-linealmente, mientras que sobre <strong>28 °C</strong> las emisiones <strong>evaporativas de COV (Hot-Soak + Diurnal + Running Losses)</strong> crecen exponencialmente (hallazgo clave de nuestro artículo en <em>Environmental Science & Technology</em>, 2026).
            </p>
          </div>
        </div>
      `;
      bindSubDots(container);
      initVeinSimulator();
      return;
    }

    // Special Render Type 3: Stratospheric Aerosol Injection & Inversion Simulator
    if (slide.renderType === "strato_simulator") {
      container.innerHTML = `
        <div class="slide-inner">
          <div class="slide-top-meta">
            <div class="badge-row">
              <span class="pill-badge stop">📍 ${stop.city}</span>
              <span class="pill-badge interactive">${badgeLabel}</span>
            </div>
            <div class="slide-sub-dots">${subDotsHtml}</div>
          </div>
          <h1 class="slide-headline">${slide.headline}</h1>
          <p class="slide-subtitle">${slide.subtitle}</p>

          <div class="sim-panel">
            <div class="sim-controls-grid">
              <div class="sim-control">
                <div class="sim-control-header">
                  <span>🌋 Masa Inyectada (SAI / Volcán)</span>
                  <span class="sim-control-val" id="saiMassVal">100 t SO₂</span>
                </div>
                <input type="range" id="saiMass" min="10" max="1000" step="10" value="100" />
              </div>
              <div class="sim-control">
                <div class="sim-control-header">
                  <span>🎈 Altitud de Inyección</span>
                  <span class="sim-control-val" id="saiAltVal">21 km</span>
                </div>
                <input type="range" id="saiAlt" min="15" max="28" step="1" value="21" />
              </div>
              <div class="sim-control">
                <div class="sim-control-header">
                  <span>📡 Estaciones Globales B2SAP</span>
                  <span class="sim-control-val" id="saiStnVal">6 sitios</span>
                </div>
                <input type="range" id="saiStn" min="1" max="12" step="1" value="6" />
              </div>
              <div class="sim-control">
                <div class="sim-control-header">
                  <span>⚡ Partículas HYSPLIT (NUMPAR)</span>
                  <span class="sim-control-val" id="saiPartVal">20,000 / nivel</span>
                </div>
                <input type="range" id="saiPart" min="2500" max="50000" step="2500" value="20000" />
              </div>
            </div>

            <div class="grid-4" id="saiLiveKpis" style="margin-bottom:14px;"></div>

            <div class="sim-canvas-wrap">
              <canvas id="saiSimCanvas" class="sim-canvas" width="960" height="250"></canvas>
            </div>
            <p style="font-size:0.78rem;color:#94a3b8;margin-top:8px;">
              💡 <strong>Vigilancia Estratosférica (NOAA ARL / DoD ESTCP):</strong> Con un límite de detección instrumental $\\text{DL} = 10^{-7}\\text{ g/m}^3$, la probabilidad de detección ($POD$) depende del acoplamiento entre la matriz de transferencia Lagrangiana ($\\mathbf{M}_{x,y,z,t,s}$) y la densidad de sondeos de la red B2SAP.
            </p>
          </div>
        </div>
      `;
      bindSubDots(container);
      initStratoSimulator();
      return;
    }

    // Standard Slide Layout (Stats + Left Card + Right Card / Figure / Mini-Simulator)
    const statsHtml = slide.stats
      ? `<div class="grid-${slide.stats.length}">${slide.stats
          .map(
            (st) => `
          <div class="stat-card">
            <div class="stat-value ${st.color || ""}">${st.value}</div>
            <div class="stat-label">${st.label}</div>
          </div>`
          )
          .join("")}</div>`
      : "";

    const leftCardHtml = renderCardObject(slide.leftCard);
    let rightColumnHtml = "";

    if (slide.rightCard) {
      rightColumnHtml = renderCardObject(slide.rightCard);
    } else if (slide.rightFigure) {
      rightColumnHtml = renderFigureGallery(slide.rightFigure);
    } else if (slide.rightSim === "epi_sim") {
      rightColumnHtml = `
        <div class="glass-card">
          <div class="card-title">🎛️ Simulador Epidemiológico: MP2.5 e IRA / ACV en Santiago</div>
          <div class="sim-control" style="margin-bottom:10px;">
            <div class="sim-control-header">
              <span>Concentración Episodio MP2.5 (Pudahuel / RM)</span>
              <span class="sim-control-val" id="epiPmVal">85 μg/m³</span>
            </div>
            <input type="range" id="epiPm" min="15" max="180" value="85" />
          </div>
          <div class="sim-control" style="margin-bottom:12px;">
            <div class="sim-control-header">
              <span>Temperatura / Ozono Estival</span>
              <span class="sim-control-val" id="epiTempVal">29 °C</span>
            </div>
            <input type="range" id="epiTemp" min="8" max="37" value="29" />
          </div>
          <div class="sim-canvas-wrap">
            <canvas id="epiSimCanvas" class="sim-canvas" width="480" height="210"></canvas>
          </div>
          <p class="figure-caption" id="epiSimSummary"></p>
        </div>
      `;
    } else if (slide.rightSim === "canyon_sim") {
      rightColumnHtml = `
        <div class="glass-card">
          <div class="card-title">🎛️ Simulador Cañón Urbano (VEIN + MUNICH)</div>
          <div class="sim-control" style="margin-bottom:10px;">
            <div class="sim-control-header">
              <span>Geometría del Cañón: Razón Altura/Ancho (H/W)</span>
              <span class="sim-control-val" id="canyonHwVal">1.8 (Cañón Profundo)</span>
            </div>
            <input type="range" id="canyonHw" min="0.4" max="3.0" step="0.1" value="1.8" />
          </div>
          <div class="sim-control" style="margin-bottom:12px;">
            <div class="sim-control-header">
              <span>Velocidad del Viento sobre los Techos (u_0)</span>
              <span class="sim-control-val" id="canyonWindVal">2.2 m/s</span>
            </div>
            <input type="range" id="canyonWind" min="0.5" max="8.0" step="0.1" value="2.2" />
          </div>
          <div class="sim-canvas-wrap">
            <canvas id="canyonSimCanvas" class="sim-canvas" width="480" height="210"></canvas>
          </div>
          <p class="figure-caption" id="canyonSimSummary"></p>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="slide-inner">
        <div class="slide-top-meta">
          <div class="badge-row">
            <span class="pill-badge stop">📍 ${stop.city} (${stop.period})</span>
            <span class="pill-badge ${slide.badgeType}">${badgeLabel}</span>
          </div>
          <div class="slide-sub-dots">${subDotsHtml}</div>
        </div>

        <h1 class="slide-headline">${slide.headline}</h1>
        <p class="slide-subtitle">${slide.subtitle}</p>

        ${statsHtml}

        <div class="grid-2">
          ${leftCardHtml}
          ${rightColumnHtml}
        </div>
      </div>
    `;

    bindSubDots(container);
    bindFigureGallery(container);

    if (slide.rightSim === "epi_sim") initEpiSimulator();
    if (slide.rightSim === "canyon_sim") initCanyonSimulator();
  }

  function renderCardObject(card) {
    if (!card) return "";
    const formulaHtml = card.formula
      ? `<div class="formula-box">${formatFormulaBlock(card.formula)}</div>`
      : "";
    const bulletsHtml = card.bullets
      ? `<ul class="science-list">${card.bullets
          .map((b) => `<li>${formatMathText(b)}</li>`)
          .join("")}</ul>`
      : "";
    const paperHtml = card.paper
      ? `<div class="paper-box">
          <span class="paper-tag">📄 ${card.paper.tag}</span>
          ${formatMathText(card.paper.text)}
        </div>`
      : "";

    return `
      <div class="glass-card">
        <div class="card-title">${card.title}</div>
        ${formulaHtml}
        ${bulletsHtml}
        ${paperHtml}
      </div>
    `;
  }

  function renderFigureGallery(figObj) {
    const imgs = figObj.images || [];
    if (imgs.length === 0) return "";
    const tabsHtml =
      imgs.length > 1
        ? `<div class="figure-tabs">
            ${imgs
              .map(
                (img, idx) =>
                  `<button class="fig-tab-btn ${idx === 0 ? "active" : ""}" data-fig-idx="${idx}">${img.label}</button>`
              )
              .join("")}
          </div>`
        : `<div class="card-title">📊 ${imgs[0].label}</div>`;

    return `
      <div class="glass-card">
        ${tabsHtml}
        <div class="figure-frame">
          <img id="activeSlideImg" src="${imgs[0].src}" alt="${imgs[0].label}" />
          <div class="figure-caption" id="activeSlideCaption">
            🔍 <em>Haz clic en la figura para ampliar a pantalla completa:</em> ${imgs[0].caption}
          </div>
        </div>
      </div>
    `;
  }

  function bindSubDots(container) {
    container.querySelectorAll(".sub-dot").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-slide-idx"), 10);
        goToSlide(idx);
      });
    });
  }

  function bindFigureGallery(container) {
    const slide = slides[currentSlideIdx];
    if (!slide.rightFigure || !slide.rightFigure.images) return;
    const imgs = slide.rightFigure.images;
    const imgEl = document.getElementById("activeSlideImg");
    const capEl = document.getElementById("activeSlideCaption");

    container.querySelectorAll(".fig-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".fig-tab-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const i = parseInt(btn.getAttribute("data-fig-idx"), 10);
        if (imgEl && imgs[i]) {
          imgEl.src = imgs[i].src;
          imgEl.alt = imgs[i].label;
          capEl.innerHTML = `🔍 <em>Haz clic en la figura para ampliar a pantalla completa:</em> ${imgs[i].caption}`;
        }
      });
    });

    if (imgEl) {
      imgEl.addEventListener("click", () => {
        openLightbox(imgEl.src, capEl ? capEl.textContent : "");
      });
    }
  }

  // Lightbox Modal
  function openLightbox(src, caption) {
    const modal = document.getElementById("lightboxModal");
    const img = document.getElementById("lightboxImg");
    const cap = document.getElementById("lightboxCaption");
    img.src = src;
    cap.textContent = caption.replace("🔍 Haz clic en la figura para ampliar a pantalla completa:", "");
    modal.classList.add("open");
  }

  window.closeLightbox = function () {
    document.getElementById("lightboxModal").classList.remove("open");
  };

  // Navigate to a specific slide index
  window.goToSlide = function (newIdx) {
    if (newIdx < 0 || newIdx >= slides.length) return;
    const prevStop = currentStopId ? getStopById(currentStopId) : null;
    currentSlideIdx = newIdx;
    const nextStop = getStopById(slides[currentSlideIdx].stopId);

    renderRouteRibbon();
    renderCurrentSlide();

    if (!currentStopId || currentStopId !== nextStop.id) {
      currentStopId = nextStop.id;
      animateFlightToStop(prevStop, nextStop);
    }
  };

  // Jump to next Flight Stop
  window.goToNextStop = function () {
    const curStopIdx = getStopIndex(slides[currentSlideIdx].stopId);
    const nextStop = stops[(curStopIdx + 1) % stops.length];
    const nextSlides = getSlidesForStop(nextStop.id);
    if (nextSlides.length > 0) {
      goToSlide(nextSlides[0].index);
    }
  };

  // Layout mode switcher ("split" | "slide" | "map")
  window.setLayoutMode = function (mode) {
    layoutMode = mode;
    const stage = document.getElementById("stageContainer");
    stage.classList.remove("mode-slide", "mode-map");
    if (mode === "slide") stage.classList.add("mode-slide");
    if (mode === "map") stage.classList.add("mode-map");

    document.querySelectorAll(".mode-btn").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-mode") === mode);
    });

    setTimeout(() => {
      if (map) map.invalidateSize();
    }, 480);
  };

  // ==========================================================
  // INTERACTIVE SIMULATOR 1: EPIDEMIOLOGY (UTEM / CENMA)
  // ==========================================================
  function initEpiSimulator() {
    const pmInput = document.getElementById("epiPm");
    const tempInput = document.getElementById("epiTemp");
    const canvas = document.getElementById("epiSimCanvas");
    if (!pmInput || !canvas) return;
    const ctx = canvas.getContext("2d");

    function draw() {
      const pm = parseFloat(pmInput.value);
      const temp = parseFloat(tempInput.value);
      document.getElementById("epiPmVal").textContent = `${pm} μg/m³`;
      document.getElementById("epiTempVal").textContent = `${temp} °C`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Compute Relative Risk RR across Lags 0 to 6 days
      const deltaPm = Math.max(0, pm - 20);
      const o3Synergy = temp > 24 ? 1 + (temp - 24) * 0.012 : 1.0;
      const lags = [0, 1, 2, 3, 4, 5, 6];
      const weights = [0.45, 0.78, 1.0, 0.92, 0.65, 0.4, 0.25];
      const betaIRA = 0.0028; // per ug/m3
      const betaACV = 0.0021;

      const rrIRA = lags.map((_, i) => Math.exp(betaIRA * deltaPm * weights[i]) * o3Synergy);
      const rrACV = lags.map((_, i) => Math.exp(betaACV * deltaPm * weights[i]));

      // Draw grid
      const padL = 52, padR = 20, padT = 26, padB = 34;
      const w = canvas.width - padL - padR;
      const h = canvas.height - padT - padB;

      ctx.strokeStyle = "rgba(148, 163, 184, 0.18)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = padT + (h * i) / 4;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(padL + w, y);
        ctx.stroke();

        const val = (1.6 - i * 0.15).toFixed(2);
        ctx.fillStyle = "#94a3b8";
        ctx.font = "11px JetBrains Mono, monospace";
        ctx.fillText(val + "x", 8, y + 4);
      }

      // Plot IRA curve (emerald) & ACV curve (rose)
      function plotLine(data, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        data.forEach((v, i) => {
          const x = padL + (w * i) / (lags.length - 1);
          const norm = Math.min(Math.max((v - 1.0) / 0.6, 0), 1);
          const y = padT + h - norm * h;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();

        data.forEach((v, i) => {
          const x = padL + (w * i) / (lags.length - 1);
          const norm = Math.min(Math.max((v - 1.0) / 0.6, 0), 1);
          const y = padT + h - norm * h;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, 4.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      plotLine(rrIRA, "#10b981");
      plotLine(rrACV, "#f43f5e");

      // X-axis labels
      lags.forEach((l, i) => {
        const x = padL + (w * i) / (lags.length - 1);
        ctx.fillStyle = "#cbd5e1";
        ctx.font = "11px Inter, sans-serif";
        ctx.fillText(`Lag ${l}d`, x - 16, canvas.height - 10);
      });

      // Legend
      ctx.fillStyle = "#10b981";
      ctx.fillText("● IRA Respiratorias (Pudahuel)", padL + 10, 16);
      ctx.fillStyle = "#f43f5e";
      ctx.fillText("● Enf. Cerebrovascular ACV (Env. Poll. 2011)", padL + 210, 16);

      const peakIraPct = ((Math.max(...rrIRA) - 1) * 100).toFixed(1);
      const peakAcvPct = ((Math.max(...rrACV) - 1) * 100).toFixed(1);
      document.getElementById("epiSimSummary").innerHTML =
        `Con <strong>${pm} μg/m³</strong> de MP2.5 (Lag 2–3 días): incremento estimado de <strong>+${peakIraPct}%</strong> en urgencias por IRA y <strong>+${peakAcvPct}%</strong> en riesgo cerebrovascular.`;
    }

    pmInput.addEventListener("input", draw);
    tempInput.addEventListener("input", draw);
    draw();
  }

  // ==========================================================
  // INTERACTIVE SIMULATOR 2: VEIN MODEL LAB (BRAZIL USP)
  // ==========================================================
  function initVeinSimulator() {
    const speedIn = document.getElementById("veinSpeed");
    const tempIn = document.getElementById("veinTemp");
    const ethIn = document.getElementById("veinEth");
    const ageIn = document.getElementById("veinAge");
    const canvas = document.getElementById("veinSimCanvas");
    if (!speedIn || !canvas) return;
    const ctx = canvas.getContext("2d");

    function draw() {
      const v = parseFloat(speedIn.value);
      const temp = parseFloat(tempIn.value);
      const eth = parseFloat(ethIn.value) / 100;
      const age = parseFloat(ageIn.value);

      document.getElementById("veinSpeedVal").textContent = `${v} km/h`;
      document.getElementById("veinTempVal").textContent = `${temp} °C`;
      document.getElementById("veinEthVal").textContent = `${Math.round(eth * 100)} %`;
      document.getElementById("veinAgeVal").textContent = `${age} años`;

      // Realistic speed-dependent polynomial/exponential EF curves + age degradation + ethanol effect + evaporative temperature dependence
      const ageFactor = 1 + Math.pow(age / 12, 1.45) * 0.85;
      const evapTempFactor = Math.exp(0.068 * (temp - 20));

      function calcEF(spd) {
        const co = (18.5 * Math.pow(spd, -0.68) + 0.0004 * Math.pow(spd - 55, 2)) * ageFactor * (1 - 0.18 * eth);
        const nox = (1.65 * Math.pow(spd, -0.35) + 0.00018 * Math.pow(spd, 1.85)) * ageFactor * (1 - 0.12 * eth);
        const vocEvap = (0.38 * evapTempFactor * (28 / Math.max(spd, 10))) * (1 + 0.25 * eth) * ageFactor;
        const co2Fossil = (420 * Math.pow(spd, -0.28) + 0.015 * Math.pow(spd - 60, 2)) * (1 - 0.68 * eth);
        return { co, nox, vocEvap, co2Fossil };
      }

      const cur = calcEF(v);

      // Update KPI cards
      document.getElementById("veinLiveKpis").innerHTML = `
        <div class="stat-card">
          <div class="stat-value amber">${cur.co.toFixed(2)} g/km</div>
          <div class="stat-label">Factor de Emisión CO (Escape)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value sky">${cur.nox.toFixed(2)} g/km</div>
          <div class="stat-label">Factor de Emisión NOx (Precursor O₃)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value rose">${cur.vocEvap.toFixed(2)} g/km</div>
          <div class="stat-label">COV Evaporativos (Sensible a T = ${temp}°C)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value emerald">${cur.co2Fossil.toFixed(0)} g/km</div>
          <div class="stat-label">CO₂ Fósil Neto (Descuento Etanol)</div>
        </div>
      `;

      // Draw Speed vs EF curves on left half, and 24-hour diurnal emissions on right half
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const padL = 48, padT = 28, padB = 34;
      const chartW = (canvas.width - 120) / 2;
      const chartH = canvas.height - padT - padB;

      // LEFT CHART: Speed (10-100 km/h) vs Normalized Emission Factor
      ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = padT + (chartH * i) / 4;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(padL + chartW, y);
        ctx.stroke();
      }

      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.fillText("1) Curvas VEIN: Velocidad (10–100 km/h) vs. Emisión", padL, 18);

      const speeds = [];
      for (let s = 10; s <= 100; s += 3) speeds.push(s);

      function drawSpeedCurve(extractor, maxScale, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        speeds.forEach((s, idx) => {
          const val = extractor(calcEF(s));
          const x = padL + ((s - 10) / 90) * chartW;
          const y = padT + chartH - Math.min(val / maxScale, 1) * chartH;
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      }

      drawSpeedCurve((d) => d.co, 14, "#f59e0b");
      drawSpeedCurve((d) => d.nox, 4.5, "#38bdf8");
      drawSpeedCurve((d) => d.vocEvap, 4.5, "#f43f5e");

      // Current Speed Vertical Marker
      const curX = padL + ((v - 10) / 90) * chartW;
      ctx.strokeStyle = "#ffffff";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(curX, padT);
      ctx.lineTo(curX, padT + chartH);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px JetBrains Mono, monospace";
      ctx.fillText("10 km/h (Congestión)", padL, canvas.height - 10);
      ctx.fillText("100 km/h (Autopista)", padL + chartW - 125, canvas.height - 10);

      // RIGHT CHART: 24-Hour Urban Emissions Profile (Morning & Evening Rush + Afternoon Evaporative Peak)
      const rightX0 = padL + chartW + 52;
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.fillText("2) Perfil Horario Urbano (00:00 a 23:00 LT)", rightX0, 18);

      const hourlyFlow = [
        0.15, 0.10, 0.08, 0.09, 0.18, 0.45, 0.85, 1.00, 0.92, 0.72, 0.65, 0.68,
        0.74, 0.70, 0.72, 0.78, 0.88, 0.98, 0.95, 0.76, 0.55, 0.42, 0.30, 0.20
      ];
      const diurnalTemp = [
        -4, -5, -5, -6, -5, -4, -2, 0, 2, 4, 6, 8,
        9.5, 10.5, 11, 10, 8.5, 6, 4, 2, 0, -1, -2, -3
      ];

      const barW = chartW / 24 - 3;
      hourlyFlow.forEach((fl, h) => {
        const localT = temp + diurnalTemp[h] * 0.45;
        const localEvap = cur.vocEvap * Math.exp(0.05 * (localT - temp));
        const exhaustLoad = fl * (cur.nox * 0.35 + cur.co * 0.08);
        const evapLoad = fl * localEvap * 0.55;

        const x = rightX0 + h * (barW + 3);
        const hEx = Math.min((exhaustLoad / 2.8) * chartH, chartH * 0.75);
        const hEv = Math.min((evapLoad / 2.8) * chartH, chartH - hEx);

        // Exhaust bar
        ctx.fillStyle = "rgba(56, 189, 248, 0.78)";
        ctx.fillRect(x, padT + chartH - hEx, barW, hEx);

        // Evaporative VOC stacked bar
        ctx.fillStyle = "rgba(244, 63, 94, 0.85)";
        ctx.fillRect(x, padT + chartH - hEx - hEv, barW, hEv);

        if (h % 4 === 0) {
          ctx.fillStyle = "#94a3b8";
          ctx.font = "10px JetBrains Mono, monospace";
          ctx.fillText(`${h}h`, x, canvas.height - 10);
        }
      });
    }

    [speedIn, tempIn, ethIn, ageIn].forEach((el) => el.addEventListener("input", draw));
    draw();
  }

  // ==========================================================
  // INTERACTIVE SIMULATOR 3: STREET CANYON MUNICH + VEIN (FRANCE)
  // ==========================================================
  function initCanyonSimulator() {
    const hwIn = document.getElementById("canyonHw");
    const windIn = document.getElementById("canyonWind");
    const canvas = document.getElementById("canyonSimCanvas");
    if (!hwIn || !canvas) return;
    const ctx = canvas.getContext("2d");

    function draw() {
      const hw = parseFloat(hwIn.value);
      const u0 = parseFloat(windIn.value);

      const regime =
        hw < 0.7 ? "Flujo Aislado" : hw < 1.4 ? "Interferencia de Estela" : "Vórtice Skimming (Trampa)";
      document.getElementById("canyonHwVal").textContent = `H/W = ${hw.toFixed(1)} (${regime})`;
      document.getElementById("canyonWindVal").textContent = `${u0.toFixed(1)} m/s`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw buildings on left and right of street canyon
      const groundY = canvas.height - 28;
      const canyonW = Math.max(70, Math.min(180, 150 / Math.sqrt(hw)));
      const bldgH = Math.min(groundY - 32, canyonW * hw * 0.65);
      const centerX = canvas.width * 0.34;
      const leftRoad = centerX - canyonW / 2;
      const rightRoad = centerX + canyonW / 2;

      // Plume fill inside canyon
      const trapFactor = Math.min(1, (hw / u0) * 0.75);
      const grad = ctx.createLinearGradient(0, groundY, 0, groundY - bldgH);
      grad.addColorStop(0, `rgba(244, 63, 94, ${0.35 + trapFactor * 0.55})`);
      grad.addColorStop(1, `rgba(56, 189, 248, ${0.12 + trapFactor * 0.25})`);
      ctx.fillStyle = grad;
      ctx.fillRect(leftRoad, groundY - bldgH, canyonW, bldgH);

      // Left & Right Buildings
      ctx.fillStyle = "#1e293b";
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 2;
      ctx.fillRect(leftRoad - 52, groundY - bldgH, 52, bldgH);
      ctx.strokeRect(leftRoad - 52, groundY - bldgH, 52, bldgH);
      ctx.fillRect(rightRoad, groundY - bldgH, 52, bldgH);
      ctx.strokeRect(rightRoad, groundY - bldgH, 52, bldgH);

      // Vortex recirculation ellipse inside canyon
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 2.2;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.ellipse(centerX, groundY - bldgH * 0.5, canyonW * 0.34, bldgH * 0.36, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Ground street
      ctx.fillStyle = "#334155";
      ctx.fillRect(20, groundY, canvas.width - 40, 6);

      // Right side quantitative bars: Pedestrian NOx vs O3 (titration)
      const noxConc = Math.round(35 + (145 * hw) / (u0 + 0.6));
      const o3Bg = 68;
      const o3Canyon = Math.max(6, Math.round(o3Bg * Math.exp(-0.011 * noxConc)));

      const barBaseX = canvas.width * 0.66;
      const maxBarH = groundY - 45;

      // NOx Bar
      const noxH = Math.min(maxBarH, (noxConc / 260) * maxBarH);
      ctx.fillStyle = "#f43f5e";
      ctx.fillRect(barBaseX, groundY - noxH, 46, noxH);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`${noxConc}`, barBaseX + 6, groundY - noxH - 6);
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("NOx (ppb)", barBaseX - 2, groundY + 18);

      // O3 Bar
      const o3H = Math.min(maxBarH, (o3Canyon / 100) * maxBarH);
      ctx.fillStyle = "#10b981";
      ctx.fillRect(barBaseX + 74, groundY - o3H, 46, o3H);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`${o3Canyon}`, barBaseX + 84, groundY - o3H - 6);
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("O₃ (ppb)", barBaseX + 74, groundY + 18);

      document.getElementById("canyonSimSummary").innerHTML =
        `A nivel peatonal (VEIN + MUNICH): <strong>NOx = ${noxConc} ppb</strong> y <strong>O₃ = ${o3Canyon} ppb</strong> (titulación fotoquímica NO + O₃ → NO₂ dentro del vórtice urbano).`;
    }

    hwIn.addEventListener("input", draw);
    windIn.addEventListener("input", draw);
    draw();
  }

  // ==========================================================
  // INTERACTIVE SIMULATOR 4: STRATOSPHERIC AEROSOL (NOAA ARL / UMD)
  // ==========================================================
  function initStratoSimulator() {
    const massIn = document.getElementById("saiMass");
    const altIn = document.getElementById("saiAlt");
    const stnIn = document.getElementById("saiStn");
    const partIn = document.getElementById("saiPart");
    const canvas = document.getElementById("saiSimCanvas");
    if (!massIn || !canvas) return;
    const ctx = canvas.getContext("2d");

    function draw() {
      const mass = parseFloat(massIn.value); // tons
      const alt = parseFloat(altIn.value); // km
      const stn = parseInt(stnIn.value, 10);
      const numpar = parseInt(partIn.value, 10);

      document.getElementById("saiMassVal").textContent = `${mass} t SO₂`;
      document.getElementById("saiAltVal").textContent = `${alt} km`;
      document.getElementById("saiStnVal").textContent = `${stn} sitios`;
      document.getElementById("saiPartVal").textContent = `${numpar.toLocaleString("en-US")} / nivel`;

      // Compute detection probability curve over 30 days
      const zonalSpeed = 14 + (alt - 15) * 2.1; // m/s stratospheric wind
      const dlCutoff = (1e-7 / (mass * 1e6)).toExponential(1); // m^-3
      const peakPod = Math.min(0.99, 1 - Math.exp(-0.0022 * mass * Math.sqrt(stn) * (numpar / 15000)));

      document.getElementById("saiLiveKpis").innerHTML = `
        <div class="stat-card">
          <div class="stat-value emerald">${(peakPod * 100).toFixed(1)} %</div>
          <div class="stat-label">Probabilidad Máx. de Detección (POD)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value amber">${dlCutoff} m⁻³</div>
          <div class="stat-label">Umbral TCM (DL / Q_SAI)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value sky">${zonalSpeed.toFixed(0)} m/s</div>
          <div class="stat-label">Transporte Zonal Estratosférico (${alt} km)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value rose">${numpar >= 20000 ? "Convergente ✅" : "Sub-muestreado ⚠️"}</div>
          <div class="stat-label">Estado Lagrangiano (14,000 km)</div>
        </div>
      `;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const padL = 54, padR = 24, padT = 28, padB = 34;
      const w = canvas.width - padL - padR;
      const h = canvas.height - padT - padB;

      // Grid lines
      ctx.strokeStyle = "rgba(148, 163, 184, 0.18)";
      for (let i = 0; i <= 4; i++) {
        const y = padT + (h * i) / 4;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(padL + w, y);
        ctx.stroke();
        ctx.fillStyle = "#94a3b8";
        ctx.font = "11px JetBrains Mono, monospace";
        ctx.fillText(`${100 - i * 25}%`, 10, y + 4);
      }

      // Draw POD(t) over Days 1..30 for Standard Discrete vs GMM/KDE Interpolated
      const days = [];
      for (let d = 1; d <= 30; d++) days.push(d);

      function getPodAtDay(d, isGmm) {
        const transitDay = Math.max(3, 16 - (alt - 15) * 0.6);
        const spread = 5.5 + (d * 0.25);
        const pulse = Math.exp(-Math.pow(d - transitDay, 2) / (2 * spread));
        const noise = !isGmm && numpar < 15000 ? Math.sin(d * 2.7) * 0.08 : 0;
        const boost = isGmm ? 1.08 : 1.0;
        return Math.max(0, Math.min(0.99, peakPod * pulse * boost + noise));
      }

      // Plot Discrete HYSPLIT curve
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      days.forEach((d, idx) => {
        const val = getPodAtDay(d, false);
        const x = padL + ((d - 1) / 29) * w;
        const y = padT + h - val * h;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Plot GMM / KDE Continuous Surface curve
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 3;
      ctx.beginPath();
      days.forEach((d, idx) => {
        const val = getPodAtDay(d, true);
        const x = padL + ((d - 1) / 29) * w;
        const y = padT + h - val * h;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Labels
      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.fillText("━ HYSPLIT Conteo Discreto de Parcelas", padL + 10, 18);
      ctx.fillStyle = "#f59e0b";
      ctx.fillText("━ HYSPLIT + Interpolación GMM / KDE (UMD & NOAA ARL 2026)", padL + 290, 18);

      [1, 5, 10, 15, 20, 25, 30].forEach((d) => {
        const x = padL + ((d - 1) / 29) * w;
        ctx.fillStyle = "#94a3b8";
        ctx.font = "11px JetBrains Mono, monospace";
        ctx.fillText(`Día ${d}`, x - 14, canvas.height - 10);
      });
    }

    [massIn, altIn, stnIn, partIn].forEach((el) => el.addEventListener("input", draw));
    draw();
  }

  // ==========================================================
  // INITIALIZE DECK & KEYBOARD SHORTCUTS
  // ==========================================================
  window.addEventListener("DOMContentLoaded", () => {
    initMap();
    goToSlide(0);

    // Button listeners
    document.getElementById("prevSlideBtn").addEventListener("click", () => goToSlide(currentSlideIdx - 1));
    document.getElementById("nextSlideBtn").addEventListener("click", () => goToSlide(currentSlideIdx + 1));
    document.getElementById("nextStopBtn").addEventListener("click", () => goToNextStop());

    document.querySelectorAll(".mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => setLayoutMode(btn.getAttribute("data-mode")));
    });

    document.getElementById("notesToggleBtn").addEventListener("click", () => {
      document.getElementById("notesDrawer").classList.toggle("open");
    });

    document.getElementById("fullscreenBtn").addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Keyboard navigation
    window.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT") return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToSlide(currentSlideIdx + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToSlide(currentSlideIdx - 1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        goToNextStop();
      } else if (e.key === "m" || e.key === "M") {
        const nextMode = layoutMode === "split" ? "slide" : layoutMode === "slide" ? "map" : "split";
        setLayoutMode(nextMode);
      } else if (e.key === "n" || e.key === "N") {
        document.getElementById("notesDrawer").classList.toggle("open");
      } else if (e.key === "f" || e.key === "F") {
        document.getElementById("fullscreenBtn").click();
      } else if (e.key === "Escape") {
        closeLightbox();
        document.getElementById("notesDrawer").classList.remove("open");
      }
    });
  });
})();
