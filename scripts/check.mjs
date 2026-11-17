import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const context = vm.createContext({ window: {} });

for (const file of ['slides-data.js', 'photos-data.js', 'globe.js', 'app.js']) {
  const script = new vm.Script(read(file), { filename: file });
  if (file.endsWith('-data.js')) script.runInContext(context);
}

const { SLIDES: slides, STOPS: stops, TRIPS: trips, RESOURCES: resources } = context.window;
const uniqueIds = (items, label) => {
  assert.equal(new Set(items.map(item => item.id)).size, items.length, `${label}: identificadores repetidos`);
  for (const item of items) assert.match(item.id, /^[a-z0-9-]+$/, `${label}: identificador no válido`);
};
uniqueIds(slides, 'Diapositivas');
uniqueIds(stops, 'Etapas');
uniqueIds(trips, 'Viajes');

const localFile = (path, source) => {
  assert.ok(existsSync(resolve(root, path)), `${source}: falta ${path}`);
};
const coordinates = (point, source) => {
  assert.ok(point?.length === 2 && point.every(Number.isFinite), `${source}: coordenadas no válidas`);
  assert.ok(Math.abs(point[0]) <= 180 && Math.abs(point[1]) <= 90, `${source}: coordenadas fuera de rango`);
};
const images = (items, source) => {
  for (const image of items || []) {
    assert.ok(image.alt?.trim() && image.caption?.trim(), `${source}: imagen sin descripción o pie`);
    localFile(image.src, source);
  }
};

let previousYear = 0;
for (const slide of slides) {
  assert.ok(slide.title && slide.text, `${slide.id}: contenido incompleto`);
  assert.ok(stops.some(stop => stop.id === slide.stop), `${slide.id}: etapa desconocida`);
  coordinates(slide.location?.coordinates, slide.id);
  images(slide.images, slide.id);
  if (slide.year) {
    assert.ok(slide.year >= previousYear, `${slide.id}: fuera del orden cronológico`);
    previousYear = slide.year;
  }
}
for (const stop of stops) {
  assert.ok(slides.some(slide => slide.id === stop.slideId && slide.stop === stop.id), `${stop.id}: etapa sin entrada navegable`);
}
for (const trip of trips) {
  coordinates(trip.coordinates, trip.id);
  images(trip.images, trip.id);
  if (trip.slideId) assert.ok(slides.some(slide => slide.id === trip.slideId), `${trip.id}: diapositiva inexistente`);
}
for (const resource of resources) assert.equal(new URL(resource.href).protocol, 'https:', `${resource.title}: enlace no válido`);

for (const match of read('index.html').matchAll(/(?:src|href)="([^"]+)"/g)) {
  const path = match[1];
  if (!/^(?:#|https?:|mailto:)/.test(path)) localFile(path, 'index.html');
}
for (const match of read('assets/fonts/fonts.css').matchAll(/url\(([^)]+)\)/g)) {
  localFile(`assets/fonts/${match[1]}`, 'Fuentes');
}
for (const match of read('app.js').matchAll(/(?:src: |src=)['"](assets\/[^'"]+)['"]/g)) {
  localFile(match[1], 'app.js');
}

console.log(`Contenido validado: ${slides.length} diapositivas, ${stops.length} etapas y ${trips.length} destinos.`);
console.log('JavaScript, cronología, navegación y archivos locales: OK.');
