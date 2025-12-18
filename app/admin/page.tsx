"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut, Plus, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AdminProductCard } from "@/components/features/AdminProductCard";
import { ProductFormModal } from "@/components/features/ProductFormModal";
import { ResponsiveAlert } from "@/components/ui/responsive-alert";

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // Load products
  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error);
        toast.error("Error al cerrar sesión");
        setLoggingOut(false);
        return;
      }
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error al cerrar sesión");
      setLoggingOut(false);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setFormModalOpen(true);
  };

  const handleDelete = (productId: string) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productToDelete);

      if (error) throw error;

      // Refresh products list
      await loadProducts();
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error eliminando producto:", error);
      toast.error(
        `Error al eliminar: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    }
  };

  const handleSuccess = async (isEdit: boolean) => {
    // Refresh products list after add/edit
    await loadProducts();
    toast.success(
      isEdit
        ? "Producto actualizado correctamente"
        : "Producto añadido correctamente"
    );
  };

  return (
    <>
      {loggingOut && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-medium text-foreground">
              Cerrando sesión...
            </p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-background">
        {/* Header Bar */}
        <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
          <div className="flex h-16 items-center justify-between px-4 md:px-6 mx-auto max-w-7xl">
            <h1 className="text-2xl font-bold tracking-tight text-primary">
              Panel de administración
            </h1>
            <Button
              onClick={handleLogout}
              size="sm"
              variant="outline"
              className="gap-2 text-sm shrink-0"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
              <span className="sm:hidden">Salir</span>
            </Button>
          </div>
        </header>

        <div className="container mx-auto py-6 sm:py-10 px-4 md:px-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Gestión de Productos
              </h2>
              <p className="text-muted-foreground">
                {products.length} producto{products.length !== 1 ? "s" : ""} en
                el catálogo
              </p>
            </div>
            <Button onClick={handleAddNew} className="gap-2 shrink-0">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Añadir Producto</span>
              <span className="sm:hidden">Añadir</span>
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">
                No hay productos en el catálogo
              </p>
              <Button onClick={handleAddNew} className="gap-2">
                <Plus className="h-4 w-4" />
                Añadir Primer Producto
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <AdminProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        <ProductFormModal
          open={formModalOpen}
          onOpenChange={setFormModalOpen}
          product={selectedProduct}
          onSuccess={handleSuccess}
        />

        <ResponsiveAlert
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title="¿Estás seguro?"
          description="Esta acción no se puede deshacer. El producto será eliminado permanentemente del catálogo."
          onConfirm={confirmDelete}
          confirmText="Eliminar"
          cancelText="Cancelar"
        />
      </div>
    </>
  );
}
