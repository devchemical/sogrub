"use client";

import { CheckCircle2, XCircle, Plus, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProductSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  success: boolean;
  errorMessage?: string;
  onAddAnother: () => void;
}

export function ProductSuccessDialog({
  open,
  onOpenChange,
  success,
  errorMessage,
  onAddAnother,
}: ProductSuccessDialogProps) {
  const router = useRouter();

  const handleViewProducts = () => {
    onOpenChange(false);
    router.push("/products");
  };

  const handleAddAnother = () => {
    onOpenChange(false);
    onAddAnother();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex flex-col items-center text-center space-y-4 py-4">
            {success ? (
              <>
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <DialogTitle className="text-2xl">
                  ¡Producto Añadido!
                </DialogTitle>
                <DialogDescription className="text-base">
                  El producto se ha guardado correctamente en el catálogo.
                </DialogDescription>
              </>
            ) : (
              <>
                <div className="rounded-full bg-red-100 p-3">
                  <XCircle className="h-12 w-12 text-red-600" />
                </div>
                <DialogTitle className="text-2xl">Error al Guardar</DialogTitle>
                <DialogDescription className="text-base">
                  {errorMessage ||
                    "Ha ocurrido un error al intentar guardar el producto. Por favor, inténtalo de nuevo."}
                </DialogDescription>
              </>
            )}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {success ? (
            <>
              <Button
                variant="outline"
                onClick={handleAddAnother}
                className="w-full sm:w-auto gap-2"
              >
                <Plus className="h-4 w-4" />
                Añadir Otro
              </Button>
              <Button
                onClick={handleViewProducts}
                className="w-full sm:w-auto gap-2 bg-[#3D4531] text-[#F7F9F3] hover:bg-[#90A374]"
              >
                <Package className="h-4 w-4" />
                Ver Productos
              </Button>
            </>
          ) : (
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full bg-[#3D4531] text-[#F7F9F3] hover:bg-[#90A374]"
            >
              Cerrar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
