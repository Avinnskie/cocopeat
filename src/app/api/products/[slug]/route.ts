import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  PRODUCT_RELATIONS_SELECT,
  mapProduct,
  type ProductRowWithRelations,
} from "@/data/products";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Product")
    .select(PRODUCT_RELATIONS_SELECT)
    .eq("slug", slug)
    .maybeSingle()
    .overrideTypes<ProductRowWithRelations, { merge: false }>();

  if (error) {
    console.error("GET /api/products/[slug]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch product" },
      { status: 500 },
    );
  }

  if (!data) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data: mapProduct(data) });
}
