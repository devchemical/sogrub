import { ProductCard } from "@/components/features/ProductCard";
import { getAllProducts } from "@/lib/supabase/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Muebles Restaurados",
  description:
    "Explora nuestra colección de muebles restaurados artesanalmente. Piezas únicas con historia, diseño moderno y materiales sostenibles.",
  openGraph: {
    title: "Catálogo de Muebles Restaurados - Sogrub",
    description:
      "Explora nuestra colección de muebles restaurados artesanalmente. Piezas únicas con historia.",
    type: "website",
    url: "/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo de Muebles Restaurados - Sogrub",
    description:
      "Explora nuestra colección de muebles restaurados artesanalmente.",
  },
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="container py-4 sm:py-6 md:py-8 px-4 md:px-6">
      {products.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <p className="text-muted-foreground text-base sm:text-lg">
            No hay productos disponibles en este momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
