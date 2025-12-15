import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container py-4 sm:py-6 md:py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {/* Crear 6 skeletons de tarjetas de productos */}
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            className="group overflow-hidden transition-all hover:shadow-lg"
          >
            {/* Skeleton de imagen */}
            <Skeleton className="aspect-square w-full" />

            {/* Skeleton de contenido */}
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3">
                {/* Título */}
                <Skeleton className="h-6 w-3/4" />

                {/* Precio */}
                <Skeleton className="h-8 w-24" />

                {/* Descripción */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Botón */}
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
