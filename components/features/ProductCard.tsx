import Image from "next/image";
import { Product } from "@/types/product";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps): React.ReactElement {
  return (
    <Card className="group overflow-hidden flex flex-col h-full transition-all hover:shadow-xl border-border/50">
      <Link
        href={`/products/${product.id}`}
        className="block relative aspect-square w-full overflow-hidden bg-secondary/20"
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            // IMPORTANTE: Definir tamaños para optimización
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
            Sin imagen
          </div>
        )}
      </Link>
      <CardHeader className="p-3 sm:p-4 md:p-6">
        <CardTitle className="line-clamp-1 text-base sm:text-lg">
          {product.title}
        </CardTitle>
        <div className="text-xs sm:text-sm text-muted-foreground">
          {product.materials}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-3 sm:p-4 md:p-6 pt-0">
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-3 sm:p-4 bg-muted/20 gap-2">
        <span className="text-base sm:text-lg font-bold text-primary">
          {new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR",
          }).format(product.price)}
        </span>
        <Button size="sm" className="text-xs sm:text-sm" asChild>
          <Link href={`/products/${product.id}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
