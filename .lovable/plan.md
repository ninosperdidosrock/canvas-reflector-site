## Galería: colocación creativa de las 8 fotos

Sustituir los 8 tiles placeholder de la sección superior de `src/routes/galeria.tsx` por una composición masonry asimétrica con las fotos reales subidas, cuidando el recorte para no cortar caras.

### Subida de imágenes (Lovable Assets)

Cada foto se sube al CDN con `lovable-assets create` desde `/mnt/user-uploads/` y se guarda un `.asset.json` en `src/assets/galeria/`:

| Archivo origen | Pointer | Orientación | Sujeto |
|---|---|---|---|
| P1420691_3.jpg | banda-completa.jpg.asset.json | horizontal | grupo entero (5) |
| DSC09818_1.jpg | con-publico.jpg.asset.json | horizontal | grupo con público |
| P1420592_1.jpg | manu-directo.jpg.asset.json | vertical | Manu (voz/guitarra) |
| DSC09473.jpg | ridru-directo.jpg.asset.json | vertical | Ridru (guitarra) |
| DSC09709_1.jpg | hector-directo.jpg.asset.json | vertical | Héctor (bajo) |
| DSC09763.jpg | gaia-directo.jpg.asset.json | vertical | Gaia (voz) |
| P1420619.jpg | rick-directo.jpg.asset.json | vertical | Rick (batería) |
| P1420679.jpg | gaia-manu-directo.jpg.asset.json | vertical | Gaia + Manu |

### Composición (grid 12 cols, desktop)

```text
+-----------------------------+--------------+
|                             |  Manu        |
|   BANDA COMPLETA (8 cols)   |  vertical    |
|   wide hero, row-span 2     |  (4 cols)    |
|                             |              |
+--------+--------+-----------+              |
| Ridru  | Héctor | Gaia      |              |
| (3)    | (3)    | (3)       |              |
+--------+--------+-----------+--------------+
| Rick (4)        | Gaia+Manu | Público (5)  |
|                 | (3)       | horizontal   |
+-----------------+-----------+--------------+
```

- Móvil: 2 columnas, hero a ancho completo arriba; resto fluyendo en masonry simple.
- Tablet: 6 columnas con el hero ocupando 6.
- Todas las imágenes con `object-cover` y `object-position` ajustado por foto (`object-top` en las verticales con cara en la mitad superior; `object-center` en las horizontales de grupo) para no cortar rostros.
- Borde sutil `border-border`, fondo `bg-card`, hover con leve `scale-[1.02]` + brillo del acento crema.
- Cada tile lleva `loading="lazy"` y `alt` descriptivo en español (SEO + accesibilidad).

### Archivos a modificar

- `src/routes/galeria.tsx` — reemplazar el bloque `tiles.map(...)` por la nueva grid con las 8 imágenes importadas desde `@/assets/galeria/*.asset.json`. Se mantiene intacta la sección de YouTube (aftermovie + carrusel) ya existente.

No se tocan otras páginas, ni el footer, ni la lógica de datos.
