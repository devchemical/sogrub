# Subida de Imágenes desde Dispositivo - Guía

## Cambios Implementados

### 1. Actualización del Schema SQL

Se añadió un **bucket de almacenamiento** en Supabase para las imágenes de productos:

```sql
-- Bucket público para imágenes
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true);
```

Con políticas de acceso:

- ✅ Lectura pública (cualquiera puede ver las imágenes)
- ✅ Escritura solo para usuarios autenticados (admin)

### 2. Nuevo Formulario de Admin

El formulario ahora incluye:

- **Zona de Drag & Drop**: Arrastra imágenes directamente
- **Selector de Archivos**: Click para elegir desde el dispositivo
- **Vista Previa**: Muestra la imagen antes de subir
- **Botón de Eliminar**: Quita la imagen seleccionada
- **Validación**: Solo acepta imágenes (PNG, JPG, WEBP)

### 3. Flujo de Subida

1. Usuario selecciona imagen desde su dispositivo
2. Se muestra una vista previa
3. Al enviar el formulario:
   - La imagen se sube a Supabase Storage
   - Se genera un nombre único para evitar conflictos
   - Se obtiene la URL pública
   - Se guarda en la base de datos junto con los datos del producto

## Configuración Requerida

### Paso 1: Ejecutar el Schema Actualizado

En el dashboard de Supabase (SQL Editor):

```sql
-- Ejecuta el contenido completo de supabase/schema.sql
```

### Paso 2: Verificar el Bucket

1. Ve a **Storage** en el dashboard de Supabase
2. Deberías ver el bucket `product-images`
3. Verifica que esté configurado como público

### Paso 3: Probar la Funcionalidad

1. Inicia sesión en `/login` con tus credenciales de admin
2. Ve a `/admin`
3. Completa el formulario:
   - Título del producto
   - Descripción
   - Materiales
   - Precio
   - **Selecciona una imagen** (click o drag & drop)
4. Envía el formulario
5. La imagen se subirá a Supabase Storage

## Características de la Interfaz

### Vista Previa de Imagen

- Muestra la imagen seleccionada antes de subir
- Tamaño: aspecto cuadrado, máximo 384px
- Botón X para eliminar y seleccionar otra

### Zona de Drag & Drop

- Área visual con icono de subida
- Texto indicativo: "Click para subir o arrastra y suelta"
- Hover effect para mejor UX
- Acepta: PNG, JPG, WEBP (máx. 5MB)

### Estados del Formulario

- **Normal**: Formulario listo para usar
- **Subiendo**: Botón deshabilitado con texto "Subiendo..."
- **Error**: Alert con mensaje de error si falla la subida

## Código Relevante

### Subida a Supabase Storage

```typescript
const { error, data } = await supabase.storage
  .from("product-images")
  .upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

// Obtener URL pública
const {
  data: { publicUrl },
} = supabase.storage.from("product-images").getPublicUrl(filePath);
```

### Validación con Zod

```typescript
const formSchema = z.object({
  // ... otros campos
  image: z.instanceof(File).optional(),
});
```

## Próximos Pasos

Para guardar realmente en la base de datos, necesitarás:

1. Crear una función API o Server Action
2. Insertar el producto con la URL de la imagen
3. Manejar errores y mostrar confirmación

Por ahora, el código muestra un alert con los datos que se guardarían.
