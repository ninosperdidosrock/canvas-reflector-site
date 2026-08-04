# Fotos completas al abrir el carrusel de conciertos

## Qué cambia

Las miniaturas (tira de favoritas y portadas de los marcos de concierto) siguen recortadas y encuadradas a las caras, como ahora. Lo que cambia es el visor: al pinchar un concierto, cada foto del carrusel se verá **entera**, sin recorte, respetando su proporción original (horizontal o vertical).

## Cómo se verá

- El marco del carrusel mantiene una altura estable (aprox. 70% de la altura de la ventana) para que no salte al pasar de una foto a otra.
- La foto se ajusta dentro de ese marco sin cortar nada; el espacio sobrante queda con el fondo oscuro de la ventana.
- Como fondo del marco se usa la misma imagen desenfocada y oscurecida, para que las fotos verticales no dejen bandas negras planas.

## Detalle técnico

En `src/routes/galeria.tsx`, dentro de `ConcertLightbox`:
- Sustituir el `aspect-[16/10] md:aspect-[16/9]` + `object-cover` del `<figure>` por un contenedor de altura fija (`h-[60vh] md:h-[70vh]`) con la imagen en `object-contain` y sin `objectPosition`.
- Añadir una capa de fondo con la misma `src` en `object-cover blur-2xl scale-110 opacity-30` detrás de la imagen principal.
- No se toca `FOCUS`, ni `FavoritesStrip`, ni `ConcertCard`: el encuadre por caras sigue aplicándose solo a las miniaturas.
