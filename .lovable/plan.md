# Actualizar enlaces de TikTok a @ninosperdidos.rock

## Objetivo
Cambiar todos los enlaces de TikTok que aparecen en la parte superior del sitio (cabecera compartida en todas las páginas) a la nueva dirección `https://www.tiktok.com/@ninosperdidos.rock`.

## Cambios propuestos
1. **Cabecera móvil** — `src/components/site-chrome.tsx` (línea 88): actualizar el enlace de TikTok dentro del menú hamburguesa del `SiteHeader`, que es el que se muestra en la parte superior de todas las páginas en móvil.
2. **Metadatos globales** — `src/routes/__root.tsx` (línea 112): actualizar el enlace de TikTok en el array `sameAs` del JSON-LD (`Organization`), que se inyecta en el `<head>` de todas las páginas.

## Nota
El pie de página (`SiteFooter`) también contiene un enlace de TikTok con la URL antigua. Si quieres que sea consistente en todo el sitio, puedo actualizar ese también en el mismo cambio; dime si lo prefieres.

## Validación
- Revisión del diff y búsqueda de `@ninosperdidosrock` para confirmar que no queda ninguna URL antigua en la cabecera ni en los metadatos globales.