import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

type StockPayload = { stock?: number; delta?: number };

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  let body: StockPayload;
  try {
    body = (await req.json()) as StockPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const hasStock = typeof body.stock === "number";
  const hasDelta = typeof body.delta === "number";

  if (hasStock === hasDelta) {
    return NextResponse.json(
      {
        success: false,
        message: "Provide exactly one of: stock (absolute) or delta (relative).",
      },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const guard = await requireAdmin(supabase);
  if (guard instanceof NextResponse) return guard;

  let nextStock: number;

  if (hasStock) {
    if (body.stock! < 0 || !Number.isInteger(body.stock!)) {
      return NextResponse.json(
        { success: false, message: "stock must be a non-negative integer" },
        { status: 400 },
      );
    }
    nextStock = body.stock!;
  } else {
    if (!Number.isInteger(body.delta!)) {
      return NextResponse.json(
        { success: false, message: "delta must be an integer" },
        { status: 400 },
      );
    }
    const { data: current, error: readError } = await supabase
      .from("Product")
      .select("stock")
      .eq("slug", slug)
      .maybeSingle();

    if (readError) {
      console.error("PATCH stock read:", readError);
      return NextResponse.json(
        { success: false, message: readError.message },
        { status: 500 },
      );
    }
    if (!current) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    nextStock = (current.stock ?? 0) + body.delta!;
    if (nextStock < 0) {
      return NextResponse.json(
        { success: false, message: "Resulting stock would be negative" },
        { status: 409 },
      );
    }
  }

  const { data, error } = await supabase
    .from("Product")
    .update({ stock: nextStock })
    .eq("slug", slug)
    .select("slug, stock")
    .maybeSingle();

  if (error) {
    console.error("PATCH stock write:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
  if (!data) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data });
}
