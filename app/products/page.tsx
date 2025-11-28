import { ProductCard } from "@/components/features/ProductCard";
import { getAllProducts } from "@/lib/supabase/products";

export const metadata = {
  title: "Catálogo de Productos - Sogrub",
  description: "Descubre nuestros muebles restaurados únicos.",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="container py-10 md:py-20 px-4 md:px-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Nuestros Productos
          </h1>
          <p className="text-muted-foreground">
            Piezas únicas restauradas con pasión y dedicación.
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No hay productos disponibles en este momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
