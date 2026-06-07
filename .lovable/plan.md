## Objetivo
Conectar tu cuenta de Google Search Console al proyecto para poder verificar el estado de indexación real del sitio publicado (https://canvas-reflector-site.lovable.app) y cerrar los hallazgos de SEO pendientes que requieren datos de Google.

## Pasos

1. **Vincular el conector de Google Search Console**
   - Lanzar el flujo de conexión para que autorices tu cuenta de Google con los permisos de Search Console y Site Verification.
   - Una vez vinculado, las credenciales quedan disponibles para el agente vía gateway (no se exponen al cliente).

2. **Verificar la propiedad del sitio publicado**
   - Pedir a Google un token de verificación tipo META para `https://canvas-reflector-site.lovable.app/`.
   - Añadir la etiqueta `<meta name="google-site-verification" content="...">` en el `<head>` global (en `src/routes/__root.tsx`).
   - Publicar el cambio (necesario porque Google fetchea la URL pública, no la preview).
   - Llamar al endpoint de verificación y, al confirmarse, registrar el sitio en tu Search Console.

3. **Comprobar estado de indexación y SEO**
   - Listar sitemaps registrados y enviar `https://canvas-reflector-site.lovable.app/sitemap.xml` si no está.
   - Consultar cobertura: páginas indexadas, errores de rastreo, exclusiones.
   - Revisar Core Web Vitals y rendimiento reportado por Google.

4. **Resolver hallazgos pendientes**
   - Revisar la lista actual de findings de SEO.
   - Aplicar fixes en código para los que sigan fallando (metadatos, structured data, accesibilidad, performance) y marcarlos como corregidos.
   - Dejar pendientes solo los que dependen de tiempo de re-rastreo de Google.

## Requisitos por tu parte
- Confirmar que quieres proceder (te aparecerá una tarjeta de autorización de Google).
- **Publicar el sitio** después de añadir el meta tag de verificación: Google necesita ver la etiqueta en la URL pública, no en la preview.

## Notas técnicas
- Conector: `google_search_console` (gateway-backed, no se guardan claves en código).
- Verificación: método META en `src/routes/__root.tsx` dentro del array `meta` del `head()` root.
- APIs usadas: `siteVerification/v1/token`, `siteVerification/v1/webResource`, `webmasters/v3/sites`, `webmasters/v3/sitemaps`, `searchanalytics/query`.

¿Procedemos?