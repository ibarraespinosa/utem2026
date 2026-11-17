/* Offline orthographic atlas. Natural Earth geometry, rendered with d3-geo. */
(() => {
  'use strict';
  const TAU = Math.PI * 2;
  const radians = Math.PI / 180;
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  class JourneyGlobe {
    constructor(canvas, places, onSelect) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      if (!this.context) throw new Error('Canvas 2D is unavailable.');
      this.places = places;
      this.onSelect = onSelect;
      this.rotation = [42, -8, -8];
      this.projection = d3.geoOrthographic().clipAngle(90).precision(.6);
      this.path = d3.geoPath(this.projection, this.context);
      this.land = window.WORLD_TOPOLOGY && window.topojson
        ? topojson.feature(WORLD_TOPOLOGY, WORLD_TOPOLOGY.objects.land) : null;
      this.grid = d3.geoGraticule().step([20, 20])();
      this.cover = true;
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.frame = null;
      this.flight = null;
      this.active = null;
      this.hitTargets = [];
      this.lastTime = 0;
      this.route = window.SLIDES.filter(slide => !slide.hideGlobe).map(slide => slide.location.coordinates)
        .filter((point, i, points) => !i || point.some((value, j) => value !== points[i - 1][j]));
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(canvas);
      this.bindPointer();
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) this.stop();
        else this.start();
      });
      this.resize();
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;
      if (!this.width || !this.height) return;
      this.dpr = Math.min(devicePixelRatio || 1, 2);
      this.canvas.width = Math.round(this.width * this.dpr);
      this.canvas.height = Math.round(this.height * this.dpr);
      this.context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.radius = Math.min(this.width * .42, this.height * .405);
      this.cx = this.width * .51;
      this.cy = this.height * .47;
      this.projection.translate([this.cx, this.cy]).scale(this.radius);
      this.draw();
    }

    setPlace(place, { cover = false, animate = true, reduced = false } = {}) {
      const previous = this.active;
      this.active = place;
      this.cover = cover;
      this.reduced = reduced;
      this.flight = null;
      const target = cover ? [42, -8, -8] : [-place.coordinates[0], -place.coordinates[1] + 8, 0];
      while (target[0] - this.rotation[0] > 180) target[0] -= 360;
      while (target[0] - this.rotation[0] < -180) target[0] += 360;
      if (animate && !reduced) {
        this.flight = {
          started: performance.now(), duration: 1350, from: [...this.rotation], to: target,
          interpolate: d3.geoInterpolate(previous?.coordinates || place.coordinates, place.coordinates),
          progress: 0,
        };
      } else {
        this.rotation = target;
      }
      this.draw();
      this.start();
    }

    stop() {
      if (this.frame !== null) cancelAnimationFrame(this.frame);
      this.frame = null;
    }

    start() {
      this.stop();
      if (document.hidden || document.querySelector('dialog[open]') || this.reduced || (!this.cover && !this.flight)) return;
      this.lastTime = performance.now();
      const tick = now => {
        this.frame = null;
        const delta = Math.min(now - this.lastTime, 60);
        this.lastTime = now;
        if (this.flight) {
          const t = Math.min((now - this.flight.started) / this.flight.duration, 1);
          const e = ease(t);
          this.rotation = this.flight.from.map((value, i) => value + (this.flight.to[i] - value) * e);
          this.flight.progress = e;
          if (t === 1) this.flight = null;
        } else if (this.cover && !this.drag) {
          this.rotation[0] += delta * .0012;
        }
        this.draw();
        if (this.flight || (this.cover && !this.reduced)) this.frame = requestAnimationFrame(tick);
      };
      this.frame = requestAnimationFrame(tick);
    }

    visible(coordinates) {
      return d3.geoDistance(coordinates, [-this.rotation[0], -this.rotation[1]]) < Math.PI / 2 - .025;
    }

    geometry(object, fill, stroke, width = 1) {
      const ctx = this.context;
      ctx.beginPath();
      this.path(object);
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); }
    }

    draw() {
      if (!this.width || !this.height || !this.context) return;
      const ctx = this.context;
      const { cx, cy, radius: r, width: w, height: h } = this;
      ctx.clearRect(0, 0, w, h);
      this.projection.rotate(this.rotation);

      // Fine registration rings echo a printed atlas.
      ctx.beginPath();
      ctx.arc(cx, cy, r + 14, 0, TAU);
      ctx.strokeStyle = '#c8cebd';
      ctx.lineWidth = .65;
      ctx.stroke();
      for (let i = 0; i < 72; i++) {
        const angle = i / 72 * TAU;
        const length = i % 6 === 0 ? 5 : 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * (r + 14), cy + Math.sin(angle) * (r + 14));
        ctx.lineTo(cx + Math.cos(angle) * (r + 14 + length), cy + Math.sin(angle) * (r + 14 + length));
        ctx.stroke();
      }

      const ocean = ctx.createRadialGradient(cx - r * .45, cy - r * .6, 0, cx, cy, r * 1.2);
      ocean.addColorStop(0, '#edf0e2');
      ocean.addColorStop(.65, '#e0e5d4');
      ocean.addColorStop(1, '#cbd4bf');
      this.geometry({ type: 'Sphere' }, ocean, '#b9c4ac', .8);
      if (this.land) this.geometry(this.land, '#8fA181', '#788d6f', .45);
      this.geometry(this.grid, null, '#6e80662b', .65);

      // Flight connections are geographic great-circle arcs, clipped at the horizon.
      ctx.setLineDash([3, 5]);
      for (let i = 1; i < this.route.length; i++) {
        this.geometry({ type: 'LineString', coordinates: [this.route[i - 1], this.route[i]] }, null, '#9b57367a', 1);
      }
      ctx.setLineDash([]);
      if (this.flight) {
        const points = Array.from({ length: 65 }, (_, i) => this.flight.interpolate(this.flight.progress * i / 64));
        this.geometry({ type: 'LineString', coordinates: points }, null, '#ad4a2d', 2);
        const last = points[points.length - 1];
        if (this.visible(last)) {
          const [x, y] = this.projection(last);
          ctx.beginPath(); ctx.arc(x, y, 4, 0, TAU); ctx.fillStyle = '#ad4a2d'; ctx.fill();
          ctx.beginPath(); ctx.arc(x, y, 8, 0, TAU); ctx.strokeStyle = '#ad4a2d66'; ctx.stroke();
        }
      }

      const shade = ctx.createRadialGradient(cx - r * .4, cy - r * .4, r * .3, cx, cy, r);
      shade.addColorStop(0, '#183c2500');
      shade.addColorStop(.8, '#183c2500');
      shade.addColorStop(1, '#183c2520');
      this.geometry({ type: 'Sphere' }, shade);

      this.hitTargets = [];
      const seen = new Set();
      for (const place of this.places) {
        const key = place.coordinates.join(',');
        if (seen.has(key) || !this.visible(place.coordinates)) continue;
        seen.add(key);
        const [x, y] = this.projection(place.coordinates);
        const selected = this.active && d3.geoDistance(place.coordinates, this.active.coordinates) < .005;
        ctx.beginPath(); ctx.arc(x, y, selected ? 4.5 : 2.4, 0, TAU);
        ctx.fillStyle = selected ? '#ad4a2d' : '#5a4b32'; ctx.fill();
        ctx.strokeStyle = '#f4f2e9'; ctx.lineWidth = 1.1; ctx.stroke();
        if (selected) {
          ctx.beginPath(); ctx.arc(x, y, 8.5, 0, TAU); ctx.strokeStyle = '#ad4a2d70'; ctx.stroke();
        }
        this.hitTargets.push({ x, y, place });
      }

      const labels = this.cover
        ? this.places.filter(p => ['santiago', 'saopaulo', 'boulder', 'lyon', 'chiba'].includes(p.id))
        : this.active ? [this.active] : [];
      ctx.font = '10px "DM Sans", sans-serif';
      for (const place of labels) {
        if (!this.visible(place.coordinates)) continue;
        const [x, y] = this.projection(place.coordinates);
        const text = place.label || place.city;
        const tw = ctx.measureText(text).width;
        const alignLeft = x + tw + 22 < w;
        const tx = alignLeft ? x + 11 : x - tw - 11;
        ctx.fillStyle = '#f4f2e9ef';
        ctx.fillRect(tx - 4, y - 9, tw + 8, 18);
        ctx.fillStyle = '#324333';
        ctx.fillText(text, tx, y + 3.5);
      }

      // A second, tilted orbital line gives the atlas a little depth.
      ctx.save();
      ctx.translate(cx, cy); ctx.rotate(-25 * radians);
      ctx.beginPath(); ctx.ellipse(0, 0, r * 1.12, r * .34, 0, .1, Math.PI - .1);
      ctx.strokeStyle = '#ad4a2d46'; ctx.lineWidth = .8; ctx.stroke(); ctx.restore();
    }

    bindPointer() {
      const canvas = this.canvas;
      const targetAt = event => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const radius = event.pointerType === 'touch' ? 22 : 12;
        return this.hitTargets.map(target => ({ target, distance: Math.hypot(target.x - x, target.y - y) }))
          .filter(item => item.distance < radius).sort((a, b) => a.distance - b.distance)[0]?.target;
      };
      canvas.addEventListener('pointerdown', event => {
        if (event.button !== 0 || this.drag || !event.isPrimary) return;
        this.drag = { id: event.pointerId, x: event.clientX, y: event.clientY, rotation: [...this.rotation], moved: false };
        this.flight = null;
        this.stop();
        canvas.setPointerCapture(event.pointerId);
        canvas.style.cursor = '';
        canvas.classList.add('is-dragging');
      });
      canvas.addEventListener('pointermove', event => {
        if (!this.drag) {
          const target = targetAt(event);
          canvas.style.cursor = target ? 'pointer' : '';
          canvas.title = target ? `${target.place.city} · ${target.place.period}` : 'Arrastra para girar el globo';
          return;
        }
        if (event.pointerId !== this.drag.id) return;
        const dx = event.clientX - this.drag.x;
        const dy = event.clientY - this.drag.y;
        if (Math.hypot(dx, dy) > 5) this.drag.moved = true;
        this.rotation[0] = this.drag.rotation[0] + dx * .35;
        this.rotation[1] = Math.max(-80, Math.min(80, this.drag.rotation[1] - dy * .3));
        this.draw();
      });
      const finish = event => {
        if (!this.drag || event.pointerId !== this.drag.id) return;
        if (!this.drag.moved && event.type === 'pointerup') {
          const target = targetAt(event);
          if (target) this.onSelect(target.place.id);
        }
        this.drag = null;
        canvas.classList.remove('is-dragging');
        if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
        this.start();
      };
      canvas.addEventListener('pointerup', finish);
      canvas.addEventListener('pointercancel', finish);
      canvas.addEventListener('lostpointercapture', finish);
    }
  }
  window.JourneyGlobe = JourneyGlobe;
})();
