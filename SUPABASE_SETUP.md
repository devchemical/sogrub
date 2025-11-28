# Configuración de Supabase para Sogrub

## Pasos para configurar la autenticación

1. **Crear proyecto en Supabase**

   - Ve a [supabase.com](https://supabase.com)
   - Crea un nuevo proyecto
   - Guarda la URL y la Anon Key

2. **Configurar variables de entorno**

   - Crea un archivo `.env.local` en la raíz del proyecto
   - Añade las siguientes variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
   ```

3. **Ejecutar el schema SQL**

   - En el dashboard de Supabase, ve a SQL Editor
   - Ejecuta el contenido de `supabase/schema.sql`

4. **Crear usuario administrador**
   - En el dashboard de Supabase, ve a Authentication > Users
   - Crea un nuevo usuario con email y contraseña
   - Este usuario podrá acceder a `/admin`

## Rutas protegidas

- `/admin` - Requiere autenticación
- `/login` - Página de inicio de sesión
- El middleware redirige automáticamente a `/login` si intentas acceder a `/admin` sin estar autenticado

## Funcionalidades implementadas

- ✅ Middleware de Next.js para proteger rutas
- ✅ Página de login con validación
- ✅ Botón de logout en la página de admin
- ✅ Enlace de admin removido del header público
- ✅ Gestión de sesiones con cookies
