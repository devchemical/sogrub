"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut, Upload, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
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

export default function AdminPage() {
  const router = useRouter();
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setUploading(true);
    try {
      let imageUrl = null;

      // Upload image to Supabase Storage if provided
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

      // Here you would save to the database
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

      const { error } = await supabase.from("products").insert(productData);

      if (error) throw error;

      alert("Producto guardado exitosamente!");

      // Reset form and preview
      form.reset();
      setImagePreview(null);
    } catch (error: unknown) {
      console.error("Error uploading:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      alert("Error al guardar el producto: " + errorMessage);
    } finally {
      setUploading(false);
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
      alert("Error al cerrar sesión: " + error.message);
      return;
    }
    router.replace("/");
    router.refresh();
  };

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
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Bar */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground truncate">
            Sogrub Admin
          </h1>
          <Button
            onClick={handleLogout}
            size="sm"
            className="gap-1 sm:gap-2 bg-[#3D4531] text-[#F7F9F3] hover:bg-[#90A374] text-xs sm:text-sm shrink-0"
          >
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
            <span className="sm:hidden">Salir</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto max-w-3xl py-6 sm:py-10 px-4">
        <div className="bg-card border rounded-xl p-4 sm:p-6 md:p-8 shadow-sm">
          <div className="mb-6 sm:mb-8 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
              Añadir Nuevo Producto
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Completa los detalles para publicar un nuevo mueble en el
              catálogo.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 sm:space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Left Column: Basic Info */}
                <div className="space-y-4 sm:space-y-6">
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
                              <div className="relative w-full h-full min-h-[180px] sm:min-h-[200px] rounded-lg overflow-hidden border">
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
                                  className="absolute top-2 right-2 h-8 w-8 sm:h-10 sm:w-10"
                                  onClick={removeImage}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <label
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center w-full h-full min-h-[180px] sm:min-h-[200px] border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                              >
                                <div className="flex flex-col items-center justify-center py-4 sm:pt-5 sm:pb-6 text-center px-4">
                                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 text-muted-foreground" />
                                  <p className="mb-1 sm:mb-2 text-sm text-muted-foreground">
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
                        className="resize-none min-h-[80px] sm:min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dimensions Section */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Dimensiones (cm)
                </h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm">
                          Ancho
                        </FormLabel>
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
                        <FormLabel className="text-xs sm:text-sm">
                          Alto
                        </FormLabel>
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
                        <FormLabel className="text-xs sm:text-sm">
                          Fondo
                        </FormLabel>
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

              <div className="pt-2 sm:pt-4">
                <Button
                  type="submit"
                  className="w-full text-base sm:text-lg h-10 sm:h-12"
                  disabled={uploading}
                >
                  {uploading ? "Guardando..." : "Guardar Producto"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
