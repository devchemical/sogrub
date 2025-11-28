import { createClient } from "./server";
import { Product } from "@/types/product";

/**
 * Fetch all products from Supabase
 * @returns Array of products or empty array on error
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Unexpected error fetching products:", error);
    return [];
  }
}

/**
 * Fetch a single product by ID
 * @param id - Product ID
 * @returns Product or null if not found
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error fetching product:", error);
    return null;
  }
}
