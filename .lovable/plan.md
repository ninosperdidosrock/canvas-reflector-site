## Objetivo
Que el bloque "Próximo concierto" del footer muestre siempre el siguiente evento real de la página Gira (no el texto fijo "06 Abr 2026 · Madrid · Sala Caelius Solitaria") y que sea un enlace a `/gira`.

## Cambios

1. **`src/components/site-chrome.tsx` (`SiteFooter`)**
   - Convertir el footer en consumidor de los mismos datos que usa `/gira`.
   - Usar `useQuery` con las mismas `queryOptions` (`queryKey: ["tour-events"]`, `queryFn: getTourEvents`) que ya definimos en `src/routes/gira.tsx`. Como el footer se monta en todas las páginas, usamos `useQuery` (no `useSuspenseQuery`) para no bloquear renders en páginas que no precargan los datos.
   - Tomar `data.upcoming[0]` como próximo concierto.
   - Formatear fecha con el mismo helper `DD MES AAAA` (extraer la ubicación / ciudad del campo `location`, mostrando la primera parte antes de la coma como "ciudad" y la línea siguiente como nombre del sitio si hay segunda parte; si solo hay un valor, mostrarlo tal cual).
   - Envolver el bloque entero en un `<Link to="/gira">` con estilo hover sutil (color primary al pasar).
   - Estados:
     - Cargando o sin datos aún → ocultar el bloque (o mostrar un placeholder discreto "Próximamente").
     - `upcoming.length === 0` → mostrar "Sin fechas anunciadas" enlazado igualmente a `/gira`.

2. **Extracción de `queryOptions` compartido**
   - Mover `tourQueryOptions` de `src/routes/gira.tsx` a `src/lib/calendar.functions.ts` (o a un nuevo `src/lib/tour-query.ts`) y reexportarlo, para que tanto `gira.tsx` como `site-chrome.tsx` lo importen sin duplicar la definición.

## Notas técnicas
- No se modifica el server function `getTourEvents`.
- `useQuery` en el footer comparte cache con el loader de `/gira`, así que no hay fetch extra cuando el usuario ya visitó esa página.
- El footer es SSR-safe: `useQuery` sin datos devuelve `data === undefined` y renderiza el fallback.
