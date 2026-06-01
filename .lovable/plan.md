## Cambio en página Setlist

Reemplazar el `<aside>` actual de "Se busca / Niños perdidos del rock" en `src/routes/setlist.tsx` por el cartel adjunto del Capitán Garfio.

### Pasos

1. Subir la imagen a CDN:
   ```
   lovable-assets create --file /mnt/user-uploads/5fda9c3e9cce862ea46c3090cd7fc35c.jpg --filename se-busca-garfio.jpg > src/assets/se-busca-garfio.jpg.asset.json
   ```

2. En `src/routes/setlist.tsx`:
   - Importar `import carteAsset from "@/assets/se-busca-garfio.jpg.asset.json"`.
   - Sustituir todo el `<aside>` por un `<img src={carteAsset.url} alt="Cartel Se busca: Capitán Garfio" />` envuelto en un contenedor que mantenga el ancho de la columna derecha del grid, con un ligero shadow/borde sutil para integrarlo con el resto del diseño. Sin overlays ni texto adicional, ya que el cartel ya contiene toda la info.

No se modifica el setlist ni el layout general de la página.