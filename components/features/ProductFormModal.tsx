"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Upload, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types/product";

import { Button } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "El título debe tener al menos 2 caracteres.",
  }),
  description: z.string().optional(),
  materials: z.string().optional(),
  price: z.number().min(0, {
    message: "El precio debe ser mayor o igual a 0.",
  }),
  width: z.number().optional(),
  height: z.number().optional(),
  depth: z.number().optional(),
  image: z.instanceof(File).optional(),
});

interface ProductFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSuccess: (isEdit: boolean) => void;
}

export function ProductFormModal({
  open,
  onOpenChange,
  product,
  onSuccess,
}: ProductFormModalProps) {
  const supabase = createClient();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      materials: "",
      price: 0,
      width: 0,
      height: 0,
      depth: 0,
    },
  });

  // Update form when product changes
  useEffect(() => {
    if (product) {
      form.reset({
        title: product.title,
        description: product.description || "",
        materials: product.materials || "",
        price: product.price,
        width: product.width || 0,
        height: product.height || 0,
        depth: product.depth || 0,
      });
      setImagePreview(product.image_url || null);
    } else {
      form.reset({
        title: "",
        description: "",
        materials: "",
        price: 0,
        width: 0,
        height: 0,
        depth: 0,
      });
      setImagePreview(null);
    }
  }, [product, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setUploading(true);
    try {
      let imageUrl = product?.image_url || null;

      // Upload new image if provided
      if (values.image) {
        const fileExt = values.image.name.split(".").pop();
        const fileName = `${Math.random()
          .toString(36)
          .substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, values.image, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const productData = {
        title: values.title,
        description: values.description,
        materials: values.materials,
        price: values.price,
        width: values.width || null,
        height: values.height || null,
        depth: values.depth || null,
        image_url: imageUrl,
      };

      const isEdit = !!product;

      if (product) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);

        if (error) throw error;
      } else {
        // Create new product
        const { error } = await supabase.from("products").insert(productData);

        if (error) throw error;
      }

      // Reset form and close modal
      form.reset();
      setImagePreview(null);
      onOpenChange(false);
      onSuccess(isEdit);
    } catch (error: unknown) {
      console.error("Error guardando producto:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Error desconocido"}`
      );
    } finally {
      setUploading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    form.setValue("image", undefined);
    setImagePreview(product?.image_url || null);
  };

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={onOpenChange}
      title={product ? "Editar Producto" : "Añadir Nuevo Producto"}
      description={
        product
          ? "Modifica los detalles del producto."
          : "Completa los detalles para publicar un nuevo mueble en el catálogo."
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Basic Info */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Silla Vintage..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio (€)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="materials"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Materiales</FormLabel>
                    <FormControl>
                      <Input placeholder="Madera, Tela..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Right Column: Image */}
            <div>
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="h-full">
                    <FormLabel>Imagen</FormLabel>
                    <FormControl>
                      <div className="h-[calc(100%-2rem)]">
                        {imagePreview ? (
                          <div className="relative w-full h-full min-h-[200px] rounded-lg overflow-hidden border">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-10 w-10"
                              onClick={removeImage}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-full min-h-[200px] border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex flex-col items-center justify-center py-6 text-center px-4">
                              <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">
                                  Click para subir
                                </span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PNG, JPG (MAX. 5MB)
                              </p>
                            </div>
                            <Input
                              id="image-upload"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageChange}
                              {...field}
                            />
                          </label>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Detalles sobre la restauración..."
                    className="resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dimensions Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Dimensiones (cm)
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ancho</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alto</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="depth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fondo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={uploading}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={uploading}>
              {uploading
                ? "Guardando..."
                : product
                ? "Actualizar Producto"
                : "Guardar Producto"}
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveModal>
  );
}
