# Ajustes globales y por página

## 1. Footer (`src/components/site-chrome.tsx`)
- Hiperlinkar los iconos de RRSS a las cuentas oficiales (uso defaults; si querés otras URLs, decime):
  - Instagram → `https://www.instagram.com/ninosperdidosband`
  - YouTube → `https://www.youtube.com/@ninosperdidosband`
  - TikTok → `https://www.tiktok.com/@ninosperdidosband`
- `target="_blank"` + `rel="noreferrer"`.
- Agrandar el logo del footer: `h-8` → `h-12`.

## 2. Header (`site-chrome.tsx`)
- Agrandar el logo del header: `h-10 md:h-12` → `h-14 md:h-16`.
- Justificar la nav a la derecha real: en mobile el `justify-between` ya lo hace; en desktop, cambiar el contenedor a `flex items-center` con el logo a la izquierda y `nav` con `ml-auto` para forzar la justificación a la derecha.

## 3. Página Inicio (`src/routes/index.tsx`)
- El "logo superior izquierdo" se controla desde el header (paso 2), así que ya queda más grande. No se toca el logo central del hero.

## 4. Página Banda (`src/routes/banda.tsx`)
- Quitar el hero actual con la frase "Esas canciones que conoce todo el mundo…" en `pt-32 text-center` y reemplazar la cabecera por `<PageHero title="LA BANDA" eyebrow="..." />` (mismo isotipo + tamaño de título que setlist/galería).
- Mover la cita y el bloque de texto introductorio debajo del PageHero, manteniendo el contenido.
- La sección "NIÑOS PERDIDOS" con los miembros queda igual.

## 5. Página Magia (`src/routes/magia.tsx`)
- Reemplazar el bloque hero actual (`<h1>LA MAGIA DE NUNCA JAMÁS</h1>` alineado a la izquierda) por `<PageHero title="LA MAGIA" eyebrow="Inteligencia Artificial" />` para igualar setlist/galería (con isotipo).

## 6. Reordenar miembros (`src/routes/banda.tsx`)
- Nota: la consigna dice "galería" pero los integrantes viven en /banda; aplico el cambio ahí.
- Nuevo orden:
  - Fila superior (3 cols): **Gaia, Manu, Ridru**
  - Fila inferior (2 cols, centrada): **Rick, Héctor**

## 7. Galería · YouTube (`src/routes/galeria.tsx`)
- Detectar el aftermovie heurísticamente: primer vídeo cuyo título contenga "aftermovie" (case-insensitive); fallback al vídeo más reciente si no hay match.
- Render: el aftermovie como **cabecera grande** (iframe full-width, aspect-video) con su título debajo.
- El resto de vídeos como **"Últimos vídeos"** en un **carrusel horizontal** usando el componente `Carousel` de shadcn (`@/components/ui/carousel`) con tarjetas de ~320px, snap-x y botones prev/next.

## Notas técnicas
- Uso las URLs de RRSS por defecto indicadas en el paso 1; si son otras, las cambio en un toque.
- Aftermovie identificado por título; si querés fijar uno por ID, también es fácil.
- No se tocan estilos globales ni `styles.css`.
