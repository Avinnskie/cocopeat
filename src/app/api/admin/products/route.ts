import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type LabelValue = { label: string; value: string };
type SustainabilityRel = LabelValue & { icon: string };
type ApplicationRel = { name: string; icon: string; description?: string | null };
type ComparisonRel = {
  metric: string;
  cocopeatPlus: string;
  regularSoil: string;
  peatMoss: string;
  importedCocopeat: string;
};

type ProductPayload = {
  id?: string;
  slug: string;
  name: string;
  image: string;
  shopeeUrl: string;
  description?: string | null;
  longDescription?: string | null;
  price?: number | null;
  originalPrice?: number | null;
  badge?: string | null;
  badgeColor?: string | null;
  stock?: number | null;
  rating?: number | null;
  reviewCount?: number | null;
  gallery?: string[];
  highlights?: string[];
  specs?: LabelValue[];
  technicalSpecs?: LabelValue[];
  sustainability?: SustainabilityRel[];
  applications?: ApplicationRel[];
  comparison?: ComparisonRel[];
};

export async function POST(req: Request) {
  let body: ProductPayload;
  try {
    body = (await req.json()) as ProductPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!body.slug || !body.name || !body.image || !body.shopeeUrl) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing required fields: slug, name, image, shopeeUrl",
      },
      { status: 400 },
    );
  }

  const productId = body.id?.trim() || body.slug;

  const supabase = await createClient();
  const guard = await requireAdmin(supabase);
  if (guard instanceof NextResponse) return guard;
  const { data, error } = await supabase
    .from("Product")
    .insert({
      id: productId,
      slug: body.slug,
      name: body.name,
      image: body.image,
      shopeeUrl: body.shopeeUrl,
      description: body.description ?? "",
      longDescription: body.longDescription ?? null,
      price: body.price ?? 0,
      originalPrice: body.originalPrice ?? null,
      badge: body.badge ?? null,
      badgeColor: body.badgeColor ?? null,
      stock: body.stock ?? 0,
      rating: body.rating ?? 0,
      reviewCount: body.reviewCount ?? 0,
      gallery: body.gallery ?? [],
      highlights: body.highlights ?? [],
    })
    .select()
    .single();

  if (error) {
    console.error("POST /api/admin/products:", error);
    const status = error.code === "23505" ? 409 : 500;
    return NextResponse.json(
      { success: false, message: error.message },
      { status },
    );
  }

  const relationError = await replaceRelations(supabase, productId, body);
  if (relationError) {
    await supabase.from("Product").delete().eq("id", productId);
    return NextResponse.json(
      { success: false, message: relationError },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, data }, { status: 201 });
}

export async function replaceRelations(
  supabase: SupabaseClient<Database>,
  productId: string,
  body: Pick<
    ProductPayload,
    | "specs"
    | "technicalSpecs"
    | "sustainability"
    | "applications"
    | "comparison"
  >,
): Promise<string | null> {
  const tasks: Array<Promise<{ error: string | null }>> = [];

  if (body.specs) {
    tasks.push(
      replaceArrayRelation(supabase, "ProductSpec", productId, body.specs),
    );
  }
  if (body.technicalSpecs) {
    tasks.push(
      replaceArrayRelation(
        supabase,
        "TechnicalSpec",
        productId,
        body.technicalSpecs,
      ),
    );
  }
  if (body.sustainability) {
    tasks.push(
      replaceArrayRelation(
        supabase,
        "SustainabilityMetric",
        productId,
        body.sustainability,
      ),
    );
  }
  if (body.applications) {
    tasks.push(
      replaceArrayRelation(
        supabase,
        "UsageApplication",
        productId,
        body.applications.map((a) => ({
          name: a.name,
          icon: a.icon,
          description: a.description ?? null,
        })),
      ),
    );
  }
  if (body.comparison) {
    tasks.push(
      replaceArrayRelation(
        supabase,
        "ComparisonItem",
        productId,
        body.comparison,
      ),
    );
  }

  const results = await Promise.all(tasks);
  const firstError = results.find((r) => r.error);
  return firstError?.error ?? null;
}

async function replaceArrayRelation(
  supabase: SupabaseClient<Database>,
  table:
    | "ProductSpec"
    | "TechnicalSpec"
    | "SustainabilityMetric"
    | "UsageApplication"
    | "ComparisonItem",
  productId: string,
  rows: Record<string, unknown>[],
): Promise<{ error: string | null }> {
  const { error: deleteError } = await supabase
    .from(table)
    .delete()
    .eq("productId", productId);
  if (deleteError) {
    console.error(`replaceArrayRelation delete ${table}:`, deleteError);
    return { error: explainRlsError(`clearing ${table}`, deleteError) };
  }

  if (rows.length === 0) return { error: null };

  const payload = rows.map((row) => ({ ...row, productId }));

  const { error: insertError } = await supabase
    .from(table)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert(payload as any);
  if (insertError) {
    console.error(`replaceArrayRelation insert ${table}:`, insertError);
    return { error: explainRlsError(`inserting ${table}`, insertError) };
  }

  return { error: null };
}

function explainRlsError(
  context: string,
  error: { code?: string; message: string },
): string {
  if (error.code === "42501" || /row-level security/i.test(error.message)) {
    return `RLS rejected ${context}. Run supabase_migrations/002_relation_table_policies.sql to backfill admin write policies.`;
  }
  return `Failed ${context}: ${error.message}`;
}
