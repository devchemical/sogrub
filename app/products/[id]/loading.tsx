import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading(): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Skeleton de imagen */}
        <Skeleton className="aspect-square w-full rounded-xl" />

        {/* Skeleton de información del producto */}
        <div className="flex flex-col gap-6">
          {/* Título y precio */}
          <div>
            <Skeleton className="h-10 w-3/4 md:h-12" />
            <Skeleton className="mt-2 h-10 w-32" />
          </div>

          {/* Descripción */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>

          {/* Materiales */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-28" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>

          {/* Dimensiones */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Skeleton className="mx-auto h-4 w-16" />
                  <Skeleton className="mx-auto mt-2 h-6 w-20" />
                </div>
                <div>
                  <Skeleton className="mx-auto h-4 w-16" />
                  <Skeleton className="mx-auto mt-2 h-6 w-20" />
                </div>
                <div>
                  <Skeleton className="mx-auto h-4 w-20" />
                  <Skeleton className="mx-auto mt-2 h-6 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información adicional */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
