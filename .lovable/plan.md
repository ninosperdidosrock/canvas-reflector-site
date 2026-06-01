## Cambios de fondos

1. **`src/routes/banda.tsx`**: cambiar `import bgBanda from "@/assets/bg-banda.png"` por `import bgBanda from "@/assets/bg-contacto.png"` (mantener el nombre de variable `bgBanda` para no tocar el JSX).

2. **`src/routes/contacto.tsx`**: cambiar `import bgContacto from "@/assets/bg-contacto.png"` por `import bgContacto from "@/assets/bg-banda.png"`.

3. **Fondo de magia**: subir la imagen adjunta (sirenas) como asset CDN con `lovable-assets create --file /mnt/user-uploads/Gemini_Generated_Image_jrbplsjrbplsjrbp.png --filename bg-magia.png > src/assets/bg-magia.png.asset.json`, eliminar el `src/assets/bg-magia.png` actual, y en `src/routes/magia.tsx` reemplazar `import bgMagia from "@/assets/bg-magia.png"` por `import bgMagiaAsset from "@/assets/bg-magia.png.asset.json"` usando `bgMagiaAsset.url` en `backgroundImage`.

No se tocan estilos ni overlays — solo las fuentes de imagen.