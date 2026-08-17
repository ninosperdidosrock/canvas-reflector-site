# Arreglar el corte de la última letra en los títulos

## Problema

En los títulos de página (LA BANDA, SETLIST, GALERÍA, MAGIA, CONTACTO) la última letra aparece cortada por la derecha.

Causa: cada palabra del título se envuelve en un contenedor con recorte (`overflow-hidden`) para la animación de entrada. La tipografía Hertical Serif Texture, además en cursiva, se sale ligeramente de su caja por la derecha, así que el recorte se come el borde del último glifo.

## Solución

En el componente de texto animado (`src/components/motion/split-text.tsx`):

- Añadir un pequeño colchón horizontal a la caja de cada palabra (`pr-[0.12em]` con `-mr-[0.12em]` para no alterar el espaciado visual entre palabras), de modo que el glifo en cursiva quepa dentro del recorte.
- Mantener el recorte vertical necesario para la animación (el desplazamiento sigue siendo vertical), sin recortar por los lados.

Como la cabecera de página (`PageHero`) usa este mismo componente, el arreglo aplica a todas las páginas a la vez, y también a los títulos de sección que lo utilizan.

## Verificación

Revisar en el navegador las páginas Banda, Setlist, Galería, Magia y Contacto (escritorio y móvil) y comprobar con capturas que la última letra se ve completa y que la animación de entrada sigue igual.
