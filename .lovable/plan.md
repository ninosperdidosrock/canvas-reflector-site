
## Cambios

**1. Header (`src/components/site-chrome.tsx` → `SiteHeader`)**
- Eliminar por completo el isotipo del header en todas las rutas (quitar la lógica `useMatchRoute`/`isHome` y el `<img src={logoIso}>`). Solo se muestra el logo de texto.
- Aumentar tamaños:
  - Logo de texto: `h-7` → `h-10` (md: `h-12`).
  - Padding vertical del header: `py-5` → `py-7`.
  - Nav: `text-xs` → `text-sm`, `gap-7` → `gap-9`, tracking ligeramente más amplio.

**2. Hero de Inicio (`src/routes/index.tsx`)**
- Imagotipo (`logoFull`): `max-w-[200px] md:max-w-[240px]` → `max-w-[300px] md:max-w-[380px]`.
- Título "BIENVENIDO A / NUNCA JAMÁS": `text-6xl md:text-8xl lg:text-9xl` → `text-7xl md:text-9xl lg:text-[10rem]`, ajustando `leading` para evitar solapes.

**3. Color de acento crema (`src/styles.css`)**
- Sustituir el marrón actual (`--primary: oklch(0.56 0.07 45)`) por el tono crema de la cara del personaje del isotipo adjunto (~`#f5dcb4`, aprox. `oklch(0.9 0.05 80)`).
- Actualizar también `--accent`, `--ring`, `--text-glow-orange` y `--primary-foreground` (este último a un marrón oscuro para mantener contraste sobre botones crema).
- El cambio se aplica automáticamente a:
  - "NUNCA JAMÁS" del hero (`text-primary`).
  - Todos los títulos secundarios y eyebrows que usan `text-primary`.
  - Botones primarios (`bg-primary`, `border-primary`).

**4. Footer (`src/components/site-chrome.tsx` → `SiteFooter`)**
- Convertir el botón "Habla con nosotros →" en `<Link to="/contacto">` (ya lo es, verificar que apunta a `/contacto` correctamente — confirmado en el código actual; sin cambios funcionales, solo verificar).

**5. Actualizar memoria de marca (`mem://design/brand-accent` y `mem://index.md`)**
- Reflejar que el color de acento ahora es el crema del isotipo, no el marrón.

## Notas técnicas

- El logo de texto en el header ya no necesita lógica condicional por ruta, simplificando `SiteHeader`.
- Los componentes `PageHero` (`src/components/page-shell.tsx`) siguen mostrando el isotipo dentro del contenido de cada página interna — esto NO se toca, solo se quita del **header superior**.
- El cambio de `--primary` se propaga vía tokens semánticos sin tocar componentes individuales.
- `--primary-foreground` pasa a un marrón profundo (`oklch(0.25 0.04 40)`) para que el texto sobre botones crema sea legible.
