import { ProductCard } from "@/components/features/ProductCard";
import { getAllProducts } from "@/lib/supabase/products";

export const metadata = {
  title: "Catálogo de Productos - Sogrub",
  description: "Descubre nuestros muebles restaurados únicos.",
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
