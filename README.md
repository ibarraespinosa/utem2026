# De la UTEM para el mundo

Presentación de **Dr. Sergio Ibarra-Espinosa**, Ingeniero en Prevención de Riesgos y Medio Ambiente de la UTEM y Visiting Assistant Research Scientist en CISESS, University of Maryland, con NOAA Air Resources Laboratory.

**[Abrir la presentación](https://ibarraespinosa.github.io/utem2026/)**

Charla y conversatorio del 17 de noviembre de 2026, a las 10:00 h, en la Multisala de la Biblioteca Ximena Sánchez S., Campus Ñuñoa, Santiago. Invitación del Departamento de Física y del Decanato de la Facultad de Ciencias Naturales, Matemática y del Medioambiente de la UTEM.

## El recorrido

La historia parte con los recuerdos familiares y la formación en la UTEM. Sigue por CENMA y la Universidad de Chile, el doctorado en São Paulo, los congresos y viajes, y el trabajo con NOAA en Boulder y Maryland. Cierra con el regreso a la UTEM y una próxima etapa personal.

El globo acompaña los cambios de lugar. **El recorrido** permite buscar por ciudad, país, año o tema, y alternar entre las etapas de la historia y el archivo de viajes. Las fotografías personales y las figuras científicas se pueden ampliar; las galerías tienen controles propios.

## Abrir en tu computador

Abre `index.html` directamente o ejecuta desde la carpeta del proyecto:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Visita <http://localhost:8000>. La presentación usa HTML, CSS y JavaScript, con fotografías, fuentes y cartografía locales. Para usarla sin conexión, descarga o clona el repositorio completo. Los enlaces a cursos y publicaciones abren sitios externos.

## Controles

| Tecla o acción | Función |
| --- | --- |
| `→`, `Espacio`, `Av Pág` | Siguiente diapositiva |
| `←`, `Re Pág` | Diapositiva anterior |
| `↓` / `↑` | Siguiente / anterior etapa |
| `Inicio` / `Fin` | Primera / última diapositiva |
| `F` | Entrar o salir de pantalla completa |
| `G` | Alternar fotografía y globo, cuando está disponible |
| `M` | Abrir el recorrido |
| `N` | Mostrar u ocultar las notas del expositor |
| `?` | Abrir la ayuda |
| `Esc` | Cerrar el visor, una ventana o las notas |
| Clic en una imagen | Ampliarla; `←` y `→` recorren su galería |
| Arrastrar el globo | Girarlo; sus puntos abren el archivo de viajes |
| Deslizar sobre el texto en el teléfono | Anterior / siguiente diapositiva |

En el archivo, las flechas recorren destinos. **Volver al relato** recupera la diapositiva desde la que se abrió el archivo. Las notas se muestran en la misma pantalla que la presentación.

La ayuda permite reducir las animaciones. Al abrir por primera vez se respeta la preferencia del sistema; una elección manual se guarda en el navegador.

## Editar el contenido

- `slides-data.js`: textos, notas, recursos, cronología y archivo de viajes.
- `photos-data.js`: fotografías personales y recuerdos añadidos a la cronología.
- `app.js`: navegación, búsquedas, galerías, notas y controles.
- `globe.js`: cartografía, rotación y transiciones entre lugares.
- `styles.css`: diseño adaptable para computador y teléfono.
- `assets/`: imágenes, logos, fuentes y bibliotecas locales. Véase [Créditos](assets/CREDITS.md).

Cada diapositiva tiene un `id` estable. Los títulos admiten `<br>` y `<em>`; los demás textos se muestran como texto plano. Las coordenadas se escriben como `[longitud, latitud]`. Una galería se define así:

```js
images: [{
  src: 'assets/photos/mi-foto.webp',
  alt: 'Descripción de lo que muestra la fotografía.',
  caption: 'Lugar o contexto · Archivo personal',
  fit: 'contain',
  kind: 'photo',
}]
```

Los enlaces a diapositivas usan su identificador, por ejemplo `#vein`. El archivo tiene enlaces independientes, como `#archivo-tacna`. Los botones Atrás y Adelante del navegador también funcionan.

## Verificar y publicar

Con Node.js 18 o posterior, valida los archivos y las referencias de contenido:

```bash
node scripts/check.mjs
```

GitHub Pages publica la raíz de la rama `main`. El archivo `.nojekyll` permite servir directamente los archivos estáticos. Para actualizar la página, guarda los cambios en un commit y envíalos a `main`:

```bash
git push origin main
```
