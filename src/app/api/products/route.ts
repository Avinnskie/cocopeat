import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  PRODUCT_RELATIONS_SELECT,
  mapProduct,
  type ProductRowWithRelations,
} from "@/data/products";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Product")
    .select(PRODUCT_RELATIONS_SELECT)
    .overrideTypes<ProductRowWithRelations[], { merge: false }>();

  if (error) {
    console.error("GET /api/products:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 },
    );
  }

  const products = (data ?? []).map(mapProduct);

  return NextResponse.json({
    success: true,
    data: products,
    count: products.length,
  });
}
