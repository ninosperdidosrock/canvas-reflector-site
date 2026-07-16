# Encuadre por caras en la galería

Regla general (a partir de ahora, para siempre)
- Cada vez que se coloque una foto en un marco (portada de concierto, tira de favoritas, lightbox, etc.), el punto de referencia del recorte será la cara del sujeto principal.
- Se guardará como memoria de proyecto para aplicarse automáticamente en el futuro sin volver a pedirlo.

Ajustes a aplicar ahora en `src/routes/galeria.tsx`
Objetivo: reencuadrar las fotos actuales cuyas caras se están cortando o quedan fuera de vista, sin tocar la lógica ni el diseño.

1. Añadir un campo opcional `focus` a los tipos `Photo` y a las portadas de `Concert` (por ejemplo `focus: "center 25%"`), que se traduce a `object-position` en la imagen. Si no se define, se mantiene `center` (comportamiento actual).

2. Pasar `style={{ objectPosition: ... }}` en:
   - `FavoritesStrip` → `<img>` de cada figura.
   - `ConcertCard` → `<img>` de portada.
   - `ConcertLightbox` → `<img>` de cada slide del carrusel.

3. Revisar visualmente cada foto en su marco actual y fijar el `focus` sólo donde la cara quede cortada o mal centrada. Marcos a revisar:
   - Tira de favoritas (aspect 288×192 / 384×256): banda-completa, gaia-directo, ridru-directo, hector-directo, manu-directo, rick-directo, gaia-manu-directo, con-publico.
   - Portadas de concierto (aspect 4/5, vertical):
     - Revi Live → banda-completa.
     - Cadillac Solitario → manu-directo.
     - Mangafest Sevilla → gaia-manu-directo.
   - Lightbox (aspect 16/10 y 16/9): mismas fotos, encuadre distinto por el ratio.

4. Comprobación con Playwright + captura de cada marco tras el cambio para verificar que las caras quedan visibles en las tres ubicaciones (tira, portada, lightbox).

Fuera de alcance
- No se añaden fotos nuevas ahora. Cuando el usuario aporte las fotos de cada álbum, se añadirán a `concerts[].photos` con su `focus` correspondiente siguiendo esta misma regla.

Memoria
- Se guarda una entrada `mem://design/photo-framing` con la regla "encuadre guiado por la cara del sujeto" y se referencia en `mem://index.md` (Core) para que se aplique en todo el proyecto de forma automática.
