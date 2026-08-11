# Arreglos de visualización en móvil

## 1. Palabras cortadas y bordes blancos al mover la página

Los títulos grandes (`CONTACTO`, `SETLIST`, `GIRA`, `GALERÍA`) usan un tamaño fijo muy grande que en pantallas de ~400 px es más ancho que la pantalla. Eso hace dos cosas a la vez: corta la palabra y crea desplazamiento horizontal (los "bordes blancos" que aparecen al arrastrar).

- Los títulos de cabecera pasan a un tamaño fluido (`clamp`) que se adapta al ancho real de la pantalla, sin llegar nunca a desbordar.
- Se bloquea el desplazamiento horizontal en toda la web (`overflow-x: hidden` + `max-width: 100%` en html/body) para que ya no se pueda arrastrar la página de lado.
- Repaso de bloques anchos (marquesinas, tira de fotos, carruseles de vídeo) para confirmar que ninguno se sale del contenedor.

## 2. Títulos pequeños en móvil

Los `h2` internos (`LOS SÍMBOLOS`, `CONCIERTOS`, `ÚLTIMOS VÍDEOS`, `BAUTISMO…`, etc.) se ven pequeños en móvil porque el escalón móvil está en 3xl/4xl. Se sube el tamaño base en móvil y se unifica la escala en todas las páginas (cabecera y secciones), manteniendo el mismo look en escritorio.

## 3. Símbolo de La Sirenita

El icono actual parece un brote/hoja. Se genera un icono nuevo con el mismo estilo de tatuaje blanco de los demás (silueta de cola de sirena saliendo del agua) y se sustituye solo ese archivo.

## 4. Fondos pixelados

Los fondos están en ~1376x768 px. En un móvil con pantalla de alta densidad y formato vertical, la imagen se recorta y amplía mucho, de ahí el pixelado.

- Se generan versiones en alta resolución de los fondos (aprox. 1920 px de lado mayor) manteniendo la misma composición y arte.
- Se sustituyen los archivos actuales por las versiones nuevas (subidas al CDN de assets, no al repositorio).
- Se reduce ligeramente el zoom de la animación ambiental en móvil para no ampliar aún más la imagen.

Nota: la mejora se hace regenerando/ampliando la imagen; si prefieres subir tú los originales en alta resolución, el resultado será mejor todavía y solo habría que reemplazar los archivos.

## 5. Bandas negras y título cortado en la galería

- El visor de fotos de conciertos muestra la foto entera sobre fondo desenfocado; en móvil vertical aún quedan franjas. Se ajusta la altura del marco al alto disponible del móvil y se refuerza el fondo desenfocado para que no queden bandas planas.
- El título de la sección se corrige con el mismo cambio de tamaño fluido del punto 1.

## Detalle técnico

- `src/styles.css`: `html, body { overflow-x: hidden; max-width: 100% }`, nueva utilidad de título fluido (`clamp(2.6rem, 12vw, 6rem)` cabecera / `clamp(1.9rem, 7.5vw, 3rem)` secciones), ajuste de `bg-ambient` con media query móvil (menos escala).
- `src/components/page-shell.tsx`: `PageHero` usa la clase de título fluido en lugar de `text-6xl md:text-8xl`.
- Rutas `banda`, `setlist`, `galeria`, `gira`, `magia`, `contacto`: `h2` con la clase de sección fluida.
- `src/assets/setlist-icons/sirenita.png.asset.json`: nuevo icono de cola de sirena.
- `src/assets/bg-*.png`: sustitución por versiones de mayor resolución.
- `src/routes/galeria.tsx` (`ConcertLightbox`): altura del marco con `min(80svh, …)` y capa de fondo desenfocada a pantalla completa.
