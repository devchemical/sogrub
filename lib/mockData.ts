
import { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Silla Mid-Century Restaurada",
    description: "Silla de comedor estilo mid-century, restaurada con madera de teca y tapizado nuevo en tela resistente.",
    materials: "Madera de Teca, Tela",
    price: 250,
    image_url: "/images/product-chair.png",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Mesa de Centro Vintage",
    description: "Mesa de centro de roble macizo, lijada y barnizada para resaltar la veta natural de la madera.",
    materials: "Roble Macizo",
    price: 450,
    image_url: "/images/product-table.png",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Aparador Modernizado",
    description: "Antiguo aparador renovado con un acabado mate y tiradores modernos de latón.",
    materials: "Madera de Pino, Latón",
    price: 890,
    image_url: "/images/product-cabinet.png",
    created_at: new Date().toISOString(),
  },
];
