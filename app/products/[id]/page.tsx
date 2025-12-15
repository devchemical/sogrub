import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getProductById } from "@/lib/supabase/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Ruler, Calendar, Share2, Mail } from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: `${product.title} - Sogrub`,
    description:
      product.description ||
      `${product.title} - Mueble restaurado disponible en Sogrub`,
    openGraph: {
      title: product.title,
      description: product.description || undefined,
      images: product.image_url ? [product.image_url] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps): Promise<React.ReactElement> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Imagen del producto */}
        <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <p>Sin imagen disponible</p>
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {product.title}
              </h1>
              <Badge variant="secondary" className="text-sm">
                Restaurado
              </Badge>
            </div>
            <p className="mt-2 text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>

          {product.description && (
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          )}

          {product.materials && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Materiales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{product.materials}</p>
              </CardContent>
            </Card>
          )}

          {(product.width || product.height || product.depth) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="h-5 w-5" />
                  Dimensiones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {product.width && (
                    <div>
                      <p className="text-sm text-muted-foreground">Ancho</p>
                      <p className="text-lg font-semibold">
                        {product.width} cm
                      </p>
                    </div>
                  )}
                  {product.height && (
                    <div>
                      <p className="text-sm text-muted-foreground">Alto</p>
                      <p className="text-lg font-semibold">
                        {product.height} cm
                      </p>
                    </div>
                  )}
                  {product.depth && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Profundidad
                      </p>
                      <p className="text-lg font-semibold">
                        {product.depth} cm
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Información adicional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center items-start gap-1">
                  <span className="text-sm text-muted-foreground">
                    Publicado:
                  </span>
                  <span className="text-sm font-medium">
                    {formatDate(product.created_at)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="flex-1 gap-2 py-2">
              <Mail className="h-4 w-4" />
              Contactar para comprar
            </Button>
            <Button size="lg" variant="outline" className="flex-1 gap-2 py-2">
              <Share2 className="h-4 w-4" />
              Compartir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
