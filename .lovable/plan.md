## Actualizar enlaces de redes sociales en el footer

Corregir las 3 URLs de RRSS en `src/components/site-chrome.tsx` para que apunten a las cuentas reales de la banda.

| Red | URL actual (errónea) | URL correcta |
|-----|----------------------|--------------|
| Instagram | `instagram.com/ninosperdidosband` | `instagram.com/ninosperdidos.rock` |
| TikTok | `tiktok.com/@ninosperdidosband` | `tiktok.com/@ninosperdidosrock` |
| YouTube | `youtube.com/@ninosperdidosband` | `youtube.com/@niñosperdidos-rock` |

Solo se modifica el componente `SiteFooter` en `site-chrome.tsx`, actualizando los atributos `href` de los 3 enlaces. No hay cambios de diseño ni de estructura.