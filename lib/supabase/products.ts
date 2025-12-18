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

/**
 * Update an existing product
 * @param id - Product ID
 * @param updates - Product data to update
 * @returns Updated product or null on error
 */
export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, "id" | "created_at">>
): Promise<Product | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error updating product:", error);
    return null;
  }
}

/**
 * Delete a product by ID
 * @param id - Product ID
 * @returns true if successful, false otherwise
 */
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Unexpected error deleting product:", error);
    return false;
  }
}
