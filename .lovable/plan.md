## Objetivo
Añadir política de lectura para `contact_messages` restringida a administradores, usando el patrón estándar de roles. Sin UI de administración.

## Cambios en base de datos (una sola migración)

1. **Enum `app_role`** con valor `admin` (extensible a `moderator`/`user` si hace falta).
2. **Tabla `public.user_roles`** (`user_id` → `auth.users`, `role app_role`, único por par).
   - GRANT SELECT a `authenticated`, ALL a `service_role`.
   - RLS activo. Política SELECT: cada usuario puede ver sus propios roles.
3. **Función `public.has_role(_user_id uuid, _role app_role)`** `SECURITY DEFINER`, `STABLE`, `search_path = public`.
4. **Política SELECT en `contact_messages`**: `USING (public.has_role(auth.uid(), 'admin'))` para el rol `authenticated`.
   - Se mantiene la política INSERT existente para anon/authenticated.
   - No se añade UI ni endpoint; los admins consultarán por DB directa cuando haga falta.

## Cómo se otorgará el rol admin
Manualmente vía `INSERT INTO public.user_roles` tras crear el usuario. No se expone en la app.

## Fuera de alcance
- Ninguna página `/admin`, ni componentes, ni server functions.
- Sin cambios en el formulario público de contacto.
