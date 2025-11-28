# Solución: Row-Level Security Policy Error

## El Problema

El error "new row violates row-level security policy" ocurre porque las políticas de Storage no permiten la subida de archivos.

## Solución

Ve al **SQL Editor** de Supabase y ejecuta estos comandos:

```sql
-- Primero, elimina las políticas existentes si las hay
drop policy if exists "Public can view product images" on storage.objects;
drop policy if exists "Authenticated users can upload product images" on storage.objects;
drop policy if exists "Authenticated users can update product images" on storage.objects;
drop policy if exists "Authenticated users can delete product images" on storage.objects;

-- Crea las políticas correctamente
create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Authenticated users can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Authenticated users can update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

create policy "Authenticated users can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
```

## Verificación Alternativa: Desactivar RLS Temporalmente

Si las políticas siguen dando problemas, puedes **temporalmente** desactivar RLS en el bucket:

1. Ve a **Storage** → `product-images`
2. Click en **"Settings"** o **"Policies"**
3. Busca la opción **"RLS enabled"** y desactívala temporalmente

⚠️ **Nota**: Esto permite que cualquiera suba archivos. Solo para pruebas.

## Solución Permanente Recomendada

Ejecuta el SQL de arriba. Las políticas usan `to authenticated` que es la forma correcta de especificar que solo usuarios autenticados pueden subir archivos.

Después de ejecutar el SQL, intenta subir una imagen nuevamente desde `/admin`.
