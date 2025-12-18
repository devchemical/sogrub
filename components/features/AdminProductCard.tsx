"use client";

import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";

interface AdminProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export function AdminProductCard({
  product,
  onEdit,
  onDelete,
}: AdminProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="relative h-48 w-full bg-muted">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Sin imagen
          </div>
        )}
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-lg truncate mb-2">{product.title}</h3>
        <p className="text-2xl font-bold text-primary mb-2">
          {formatPrice(product.price)}
        </p>
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="px-4 pt-0 gap-2 mt-auto">
        <Button
          onClick={() => onEdit(product)}
          variant="outline"
          className="flex-1 gap-2"
        >
          <Edit className="h-4 w-4" />
          Editar
        </Button>
        <Button
          onClick={() => onDelete(product.id)}
          variant="destructive"
          className="flex-1 gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}
