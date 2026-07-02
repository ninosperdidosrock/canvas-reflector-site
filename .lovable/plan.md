## Cambios en `src/components/site-chrome.tsx`

### 1. Header desktop (≥ md)
- Mantener el logo a la izquierda y la navegación justificada a la derecha (`ml-auto` ya está; lo refuerzo con `justify-between`).
- Aumentar tamaño del logo: `h-14 md:h-16` → `h-16 md:h-20 lg:h-24`.
- Aumentar tamaño de los links: `text-sm` → `text-base lg:text-lg`, con `tracking-[0.18em]` y `gap-10 lg:gap-12`.
- El breakpoint de navegación pasa de `md` a `lg` para que en tablet también aparezca el menú desplegable (evita apretujar 7 links).

### 2. Menú desplegable (móvil + tablet, < lg)
- Botón hamburguesa visible en `< lg`, alineado a la derecha del header.
- Usar el componente `Sheet` de shadcn (ya disponible en `@/components/ui/sheet`) que se abre desde la derecha y muestra la lista de enlaces verticalmente con tipografía grande.
- Cada enlace cierra el sheet al pulsarse (estado `open` controlado con `useState`).
- Marca la ruta activa con el mismo estilo dorado/crema (`activeProps`).
- Incluye los iconos sociales (Instagram, YouTube, TikTok) al final del panel.

### 3. Responsive del logo
- En móvil pequeño (`< 380px`) el logo se reduce a `h-12` para no chocar con el botón hamburguesa.
- El header mantiene padding `py-5 md:py-7` para dar aire.

### 4. Sin cambios en footer
- El footer ya tiene su propia navegación en grid responsive; no se toca.

### Aplica a todas las páginas
`SiteHeader` se renderiza en todas las rutas, así que el desplegable funciona automáticamente en toda la web.

## Archivos tocados
- `src/components/site-chrome.tsx` (único cambio)

## Notas técnicas
- Reutilizo `Sheet`, `SheetContent`, `SheetTrigger` de shadcn — sin nuevas dependencias.
- Icono hamburguesa: `Menu` de `lucide-react` (ya instalado).
- Sin cambios de tokens de color: respeto el cream brand existente.