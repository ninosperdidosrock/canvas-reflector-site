## Símbolos de franquicia en la página Setlist

Añadir una grilla decorativa con un símbolo minimalista en blanco y negro por cada película del setlist actual, en el mismo estilo gráfico que la imagen adjunta (silueta sólida negra sobre fondo transparente, trazo simple tipo "tatuaje/sticker Disney").

### Películas a representar (9 únicas)

Rey León, Frozen, Mulán, Blancanieves, Toy Story, Aladdín, La Sirenita, Hércules, Tarzán.

(`Mulán` aparece duplicada en el array; se usa un único símbolo. `…y mucho más` no lleva símbolo: se representa con un signo de interrogación en el mismo estilo o se omite — propongo incluirlo como "?" para cerrar la grilla en 10 casillas.)

### Generación de símbolos

Cada símbolo se genera con `imagegen--generate_image` (modelo `premium.gemini`, `transparent_background: true`, 1024×1024, fondo blanco en el prompt para que el quitafondos funcione bien). Prompt base común para coherencia:

> "Minimalist black silhouette icon, thick bold solid black shape, flat, no outline details, no text, no gradients, sticker/tattoo style similar to Disney franchise emblems, centered, on a solid white background — [motivo específico]"

Motivos por película (referencias icónicas, no logotipos comerciales para evitar bloqueos de copyright):

- Rey León → silueta de la huella/cara estilizada de un cachorro de león
- Frozen → copo de nieve geométrico simétrico
- Mulán → silueta de dragón oriental enroscado
- Blancanieves → silueta de manzana con un mordisco y una hoja
- Toy Story → estrella de sheriff de 5 puntas con círculo interior
- Aladdín → silueta de lámpara mágica de aceite con voluta de humo
- La Sirenita → silueta de cola de sirena con escamas
- Hércules → rayo estilizado dentro de un círculo
- Tarzán → silueta de hoja de selva tipo monstera
- (Opcional) "…y mucho más" → signo de interrogación grueso dentro de círculo

Cada PNG resultante se sube como asset CDN:

```
lovable-assets create --file src/assets/setlist-icons/<slug>.png \
  --filename <slug>.png > src/assets/setlist-icons/<slug>.png.asset.json
rm src/assets/setlist-icons/<slug>.png
```

### Cambios en `src/routes/setlist.tsx`

1. Importar los 9–10 `.asset.json` de `@/assets/setlist-icons/*`.
2. Mantener el setlist y el cartel "Se busca" tal cual están.
3. Añadir una nueva `<section>` debajo del grid actual, dentro del mismo `container-page`:
   - Eyebrow pequeño en `text-primary` uppercase tracking ancho: "UNIVERSOS QUE PISAMOS".
   - Título `font-display italic` mediano: "LOS SÍMBOLOS".
   - Grilla `grid grid-cols-3 sm:grid-cols-5 gap-6` con cada símbolo dentro de un cuadrado con sutil borde `border border-border/40` y fondo `bg-surface/40`, padding generoso, hover con leve glow cream (`shadow-[0_0_30px_oklch(0.9_0.05_80/0.25)]` en `transition`), y debajo el nombre de la película en `font-display italic` minúsculas pequeñas centradas.
   - Los iconos se renderizan con un filtro CSS `filter invert brightness-0 [filter:invert(94%)_sepia(20%)_saturate(400%)_hue-rotate(0deg)]` o más simple: aplicar `filter: invert(1)` para virar el negro original a blanco/cream sobre el fondo teal de la página, manteniendo coherencia con el resto del diseño.

No se toca el setlist, el cartel, el fondo, ni ningún otro archivo.

### Detalles técnicos

- Carpeta nueva: `src/assets/setlist-icons/`.
- 9–10 llamadas a `imagegen--generate_image` en paralelo.
- 9–10 llamadas a `lovable-assets create` (una por icono).
- Una sola edición en `src/routes/setlist.tsx` para añadir imports + sección de grilla.

¿Procedemos así, incluyendo la casilla "?" para "…y mucho más", o la dejamos fuera?
