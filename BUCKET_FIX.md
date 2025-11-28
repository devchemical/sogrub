# Solución: Bucket Not Found

## El Problema

El error "bucket not found" ocurre porque el bucket `product-images` no existe en tu proyecto de Supabase.

## Solución Rápida

### Opción 1: Crear el Bucket Manualmente (Recomendado)

1. Ve al **Dashboard de Supabase**: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. En el menú lateral, ve a **Storage**
4. Click en **"New bucket"** o **"Create a new bucket"**
5. Configura el bucket:
   - **Name**: `product-images`
   - **Public bucket**: ✅ **Activado** (muy importante)
   - **File size limit**: 5MB (opcional)
   - **Allowed MIME types**: `image/*` (opcional)
6. Click en **"Create bucket"**

### Opción 2: Crear via SQL (Alternativa)

Si prefieres SQL, ve al **SQL Editor** en Supabase y ejecuta:

```sql
-- Crear el bucket
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true);

-- Políticas de acceso
create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Authenticated users can upload product images"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images'
    and auth.role() = 'authenticated'
  );

create policy "Authenticated users can update product images"
  on storage.objects for update
  using (
    bucket_id = 'product-images'
    and auth.role() = 'authenticated'
  );

create policy "Authenticated users can delete product images"
  on storage.objects for delete
  using (
    bucket_id = 'product-images'
    and auth.role() = 'authenticated'
  );
```

## Verificación

Después de crear el bucket:

1. Ve a **Storage** en el dashboard
2. Deberías ver `product-images` en la lista
3. Verifica que tenga el icono de "público" (🌐)
4. Intenta subir una imagen de prueba manualmente
5. Vuelve a intentar añadir un producto desde `/admin`

## Credenciales Confirmadas

- Email: `sogrubremake@gmail.com`
- Contraseña: `burgos2025`

Una vez creado el bucket, la subida de imágenes debería funcionar correctamente.
