import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/product-form";

const EDIT_SELECT = `
  slug, name, image, shopeeUrl, description, badge, highlights, gallery,
  specs:ProductSpec(label, value),
  technicalSpecs:TechnicalSpec(label, value),
  sustainability:SustainabilityMetric(label, value, icon),
  applications:UsageApplication(name, icon, description),
  comparison:ComparisonItem(metric, cocopeatPlus, regularSoil, peatMoss, importedCocopeat)
`.trim();

type EditRow = {
  slug: string;
  name: string;
  image: string;
  shopeeUrl: string | null;
  description: string | null;
  badge: string | null;
  highlights: string[] | null;
  gallery: string[] | null;
  specs: { label: string; value: string }[] | null;
  technicalSpecs: { label: string; value: string }[] | null;
  sustainability: { label: string; value: string; icon: string }[] | null;
  applications:
    | { name: string; icon: string; description: string | null }[]
    | null;
  comparison:
    | {
        metric: string;
        cocopeatPlus: string;
        regularSoil: string;
        peatMoss: string;
        importedCocopeat: string;
      }[]
    | null;
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Product")
    .select(EDIT_SELECT)
    .eq("slug", slug)
    .maybeSingle()
    .overrideTypes<EditRow, { merge: false }>();

  if (error) {
    console.error("EditProductPage:", error);
  }
  if (!data) notFound();

  return (
    <div className="px-8 py-10 max-w-3xl">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke daftar produk
      </Link>

      <h1 className="font-extrabold text-3xl mb-2">Edit Produk</h1>
      <p className="text-gray-600 mb-8">{data.name}</p>

      <ProductForm
        mode="edit"
        originalSlug={data.slug}
        initial={{
          slug: data.slug,
          name: data.name,
          image: data.image,
          shopeeUrl: data.shopeeUrl ?? "",
          description: data.description ?? "",
          badge: data.badge ?? "",
          highlights: data.highlights ?? [],
          gallery: data.gallery ?? [],
          specs: data.specs ?? [],
          technicalSpecs: data.technicalSpecs ?? [],
          sustainability: data.sustainability ?? [],
          applications: (data.applications ?? []).map((a) => ({
            name: a.name,
            icon: a.icon,
            description: a.description ?? "",
          })),
          comparison: data.comparison ?? [],
        }}
      />
    </div>
  );
}
