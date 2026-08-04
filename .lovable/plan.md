# Capa de animación estilo "The Only Majed"

Objetivo: subir el nivel de presentación de toda la web con animaciones modernas inspiradas en la referencia, sin tocar contenido, textos, rutas ni funcionalidad existente. Todo es capa visual: se envuelven elementos ya presentes, no se cambian.

## Qué se va a sentir

- **Preloader de entrada** (una vez por sesión): telón oscuro con el logo de texto y una barra/contador que se retira hacia arriba revelando la página.
- **Reveal de títulos por letras/palabras**: los `h1`/`h2` de cada página aparecen escalonados desde abajo con máscara (efecto "mask reveal"), al entrar en viewport.
- **Reveal general por scroll**: secciones, tarjetas y bloques suben con fade + blur suave y stagger según su orden.
- **Cabecera reactiva**: se compacta y gana fondo translúcido al bajar, se oculta al scrollear hacia abajo y reaparece al subir. Enlaces con subrayado animado y hover de desplazamiento vertical de texto.
- **Botones magnéticos**: los CTA (Ver gira, La banda, Habla con nosotros, entradas) se inclinan/desplazan sutilmente siguiendo el cursor, con brillo interno.
- **Cursor personalizado en desktop**: punto + halo que crece sobre elementos interactivos y muestra etiqueta ("Ver", "Abrir") sobre fotos y marcos de concierto.
- **Marquee de texto**: cinta con el nombre de la banda desplazándose entre secciones (reutiliza el keyframe marquee ya existente), con inversión de dirección al scrollear.
- **Imágenes con parallax interno suave**: la imagen se mueve unos pocos px dentro de su marco al scrollear (sin dejar huecos), y zoom lento al hover en tarjetas de banda, conciertos y setlist.
- **Transiciones entre páginas**: fundido + desplazamiento corto al navegar, coherente con el preloader.
- **Barra de progreso de scroll** finísima en el borde superior con el color crema de marca.

Todo respeta `prefers-reduced-motion`: si el usuario lo tiene activado, los elementos aparecen sin movimiento.

## Detalles técnicos

- Añadir `motion` (Motion for React) como única dependencia nueva; el resto con CSS en `src/styles.css`.
- Nuevos archivos, sin modificar la lógica existente:
  - `src/components/motion/reveal.tsx` — `<Reveal>`, `<StaggerGroup>` basados en IntersectionObserver/`whileInView`.
  - `src/components/motion/split-text.tsx` — reveal por palabras/letras para títulos.
  - `src/components/motion/magnetic.tsx` — wrapper magnético para botones y enlaces.
  - `src/components/motion/custom-cursor.tsx` — cursor con halo y etiqueta (solo puntero fino).
  - `src/components/motion/page-transition.tsx` + `src/components/motion/preloader.tsx`.
  - `src/components/motion/scroll-progress.tsx`, `src/components/motion/marquee-text.tsx`.
  - `src/components/motion/parallax-image.tsx` — desplazamiento interno de imagen (mantiene `object-position` de encuadre por caras ya definido).
- Montaje: cursor, preloader, progreso y transición en `src/routes/__root.tsx`; título animado dentro de `PageHero` en `page-shell.tsx`.
- Aplicación por página envolviendo bloques existentes con `<Reveal>` en Inicio, Banda, Setlist, Galería, Gira, Magia y Contacto; marquee entre secciones en Inicio y Galería.
- Se mantiene la animación de fondo `bg-ambient` actual; se le añade sólo una reacción muy leve al scroll.
- Sin cambios en server functions, datos, Google Calendar, YouTube, formularios ni base de datos.

## Alcance descartado

- Nada de WebGL/Three.js, ni scroll suavizado global (rompe anclas y accesibilidad), ni cambios de copy, layout o paleta.
