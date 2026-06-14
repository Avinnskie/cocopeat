import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { createServiceClient } from "@/lib/supabase/admin";
import {
  PRODUCT_IMAGES_BUCKET,
  extractStoragePath,
} from "@/lib/supabase/storage";
import { replaceRelations } from "@/app/api/admin/products/route";

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

type ProductUpdate = Partial<{
  slug: string;
  name: string;
  price: number;
  originalPrice: number | null;
  description: string;
  longDescription: string | null;
  image: string;
  shopeeUrl: string;
  gallery: string[];
  badge: string | null;
  badgeColor: string | null;
  stock: number | null;
  rating: number | null;
  reviewCount: number | null;
  highlights: string[];
  specs: LabelValue[];
  technicalSpecs: LabelValue[];
  sustainability: SustainabilityRel[];
  applications: ApplicationRel[];
  comparison: ComparisonRel[];
}>;

const RELATION_KEYS = [
  "specs",
  "technicalSpecs",
  "sustainability",
  "applications",
  "comparison",
] as const;

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  let body: ProductUpdate;
  try {
    body = (await req.json()) as ProductUpdate;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (Object.keys(body).length === 0) {
    return NextResponse.json(
      { success: false, message: "No fields to update" },
      { status: 400 },
    );
  }

  const productPatch: Record<string, unknown> = { ...body };
  for (const key of RELATION_KEYS) {
    delete productPatch[key];
  }

  const supabase = await createClient();
  const guard = await requireAdmin(supabase);
  if (guard instanceof NextResponse) return guard;
  const { data, error } = await supabase
    .from("Product")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .update(productPatch as any)
    .eq("slug", slug)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("PATCH /api/admin/products/[slug]:", error);
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

  const relationPayload: Parameters<typeof replaceRelations>[2] = {};
  if (body.specs !== undefined) relationPayload.specs = body.specs;
  if (body.technicalSpecs !== undefined)
    relationPayload.technicalSpecs = body.technicalSpecs;
  if (body.sustainability !== undefined)
    relationPayload.sustainability = body.sustainability;
  if (body.applications !== undefined)
    relationPayload.applications = body.applications;
  if (body.comparison !== undefined)
    relationPayload.comparison = body.comparison;

  if (Object.keys(relationPayload).length > 0) {
    const relationError = await replaceRelations(
      supabase,
      data.id,
      relationPayload,
    );
    if (relationError) {
      return NextResponse.json(
        { success: false, message: relationError },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const supabase = await createClient();
  const guard = await requireAdmin(supabase);
  if (guard instanceof NextResponse) return guard;

  const { data, error } = await supabase
    .from("Product")
    .delete()
    .eq("slug", slug)
    .select("id, image")
    .maybeSingle();

  if (error) {
    console.error("DELETE /api/admin/products/[slug]:", error);
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

  const storagePath = extractStoragePath(data.image);
  if (storagePath) {
    try {
      await createServiceClient()
        .storage.from(PRODUCT_IMAGES_BUCKET)
        .remove([storagePath]);
    } catch (cleanupError) {
      console.warn(
        "DELETE /api/admin/products/[slug]: storage cleanup failed",
        cleanupError,
      );
    }
  }

  return NextResponse.json({ success: true });
}
