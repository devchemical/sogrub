"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    // Log del error para debugging
    console.error("Error en página de producto:", error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-md">
        <Card className="border-destructive">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8 text-destructive"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl">Algo salió mal</CardTitle>
            <CardDescription>
              Ha ocurrido un error al cargar este producto. Por favor, inténtalo
              de nuevo.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {process.env.NODE_ENV === "development" && (
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs font-mono text-muted-foreground break-all">
                  {error.message}
                </p>
              </div>
            )}
            <Button onClick={reset} className="w-full">
              Intentar de nuevo
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/products")}
            >
              Volver a productos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
