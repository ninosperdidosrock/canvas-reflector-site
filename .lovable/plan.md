## Cambios

### 1. Página Gira (`src/routes/gira.tsx` y `src/lib/calendar.functions.ts`)
- **Isotipo "Rumbo a Nunca Jamás" más grande**: ampliar el `<img>` del `PageHero` (actualmente `h-20 w-20`) — ver punto 4 sobre estandarización. Para esta página concreta aumentar a un tamaño hero (`h-32 md:h-40`) o quitar el `PageHero` genérico y construir un hero propio más rotundo con isotipo grande + eyebrow "RUMBO A NUNCA JAMÁS" debajo del título "GIRA".
- **Ubicación visible**: hoy se muestra solo la ciudad (extraída del location). Mostrar también la dirección/lugar completo en una segunda línea bajo el título del evento usando `event.location` íntegro.
- **Botón "Comprar entradas" por concierto**: extender `GigEvent` con `ticketUrl?: string` y `description?: string`. En `calendar.functions.ts`, leer `e.description` del raw event y extraer la primera URL `http(s)://...` que encuentre en la descripción → asignarla a `ticketUrl`. Si existe, mostrar un botón `Comprar entradas →` (estilo `bg-primary text-primary-foreground` pequeño) a la derecha del evento; si no, mostrar la hora actual.
- Mantener compatibilidad: la query devuelve el campo nuevo y la UI solo lo usa cuando está presente.

### 2. Página Banda (`src/routes/banda.tsx`)
- **Botón "Contrátanos para tu evento →"**: convertir `<a href="#ninos-perdidos">` en `<Link to="/contacto">` de TanStack Router.
- **Apodos y nombres**: actualizar el array `members`:
  - Gaia Bravo "Gato" — Voz principal
  - Ricardo Galán "Rick" — Guitarra rítmica y voz (ya está)
  - Manuel Alejo "Manu" — Batería (cambiar "Manu Alejo" por "Manuel Alejo \"Manu\"")
  - Javier Ridruejo "Ridru" — Bajo (ya está)
  - Héctor Alonso "Mike" — Guitarra principal
- **Imagen de Gaia**: copiar `user-uploads://DSC09235.jpg` → `src/assets/banda-gaia.jpg` (sobrescribir) para que la importación existente la recoja sin tocar imports.
- **Centrar Ridru y Manu**: el grid es `sm:grid-cols-2 md:grid-cols-3` con 5 miembros → en la fila inferior quedan 2 sueltos. Forzar que la segunda fila (Ridru + Manu, o las 2 últimas tarjetas) quede centrada usando un wrapper con `justify-items-center` en la segunda fila, o renderizar las 3 primeras en un grid de 3 y las 2 últimas en un grid de 2 centrado (`md:max-w-2xl mx-auto`).
- **Tipografía de las tarjetas más grande**: rol `text-[10px]` → `text-xs md:text-sm`, nombre `text-xl` → `text-2xl md:text-3xl`.

### 3. Estandarización de títulos/subtítulos en páginas internas (`src/components/page-shell.tsx`)
Definir tamaños canónicos en `PageHero` y aplicarlos en todas las páginas internas (banda, gira, galería, magia, setlist, contacto). Inicio queda fuera.
- **H1 (título de página)**: `text-6xl md:text-8xl` (unificado, ya es el estándar de PageHero).
- **Eyebrow**: `text-xs uppercase tracking-[0.4em]` (ya está).
- **Subtítulo / lead**: `text-base md:text-lg text-muted-foreground` (ya razonable).
- **H2 (secciones internas)**: `text-3xl md:text-5xl` (hoy hay mezcla: `text-4xl md:text-6xl` en banda, `text-6xl md:text-8xl` en contacto sin PageHero, etc.). Unificar.
- Refactor: `contacto.tsx` actualmente NO usa `PageHero` (tiene su propio `<h1 text-6xl md:text-8xl>`). Migrarlo a `<PageHero title="CONTACTO" eyebrow="Contrataciones & Prensa" />` para que use los tamaños estándar.
- Verificar `galeria`, `magia`, `setlist` y aplicar el mismo `PageHero` si no lo hacen ya (revisar al implementar; sin cambios si ya son consistentes).

## Notas técnicas

- El extractor de URL de descripción debe ser tolerante: regex simple `/(https?:\/\/[^\s<>"]+)/i`. Si el calendario inserta HTML, también captura.
- El campo `description` se solicita por defecto en Google Calendar v3; no hace falta cambiar params.
- Para centrar las 2 últimas tarjetas, opción más limpia: dividir `members` en dos arrays (`[0..2]` y `[3..4]`) y renderizar dos grids; el segundo con `sm:grid-cols-2 md:max-w-[66%] mx-auto`.
- La imagen nueva de Gaia es vertical (1280x1920) — encaja con el aspect `3/4` de las tarjetas.
- No tocar la página de inicio en este cambio.
