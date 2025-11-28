export interface Product {
  id: string;
  title: string;
  description: string | null;
  materials: string | null;
  price: number;
  width: number | null;
  height: number | null;
  depth: number | null;
  image_url: string | null;
  created_at: string;
}
