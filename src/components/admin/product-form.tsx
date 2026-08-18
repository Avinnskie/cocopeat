"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploadInput } from "@/components/admin/image-upload-input";
import { ImageGalleryInput } from "@/components/admin/image-gallery-input";
import {
  StringListInput,
  LabelValueListInput,
  SustainabilityListInput,
  ApplicationsListInput,
  ComparisonListInput,
  type LabelValueItem,
  type SustainabilityItem,
  type ApplicationItem,
  type ComparisonItem,
} from "@/components/admin/list-inputs";
import { createClient } from "@/lib/supabase/browser";
import {
  PRODUCT_IMAGES_BUCKET,
  extractStoragePath,
} from "@/lib/supabase/storage";
import { slugify } from "@/lib/utils";

export type ProductFormValues = {
  slug: string;
  name: string;
  image: string;
  shopeeUrl: string;
  description: string;
  badge: string;
  highlights: string[];
  gallery: string[];
  specs: LabelValueItem[];
  technicalSpecs: LabelValueItem[];
  sustainability: SustainabilityItem[];
  applications: ApplicationItem[];
  comparison: ComparisonItem[];
};

const EMPTY: ProductFormValues = {
  slug: "",
  name: "",
  image: "",
  shopeeUrl: "",
  description: "",
  badge: "",
  highlights: [],
  gallery: [],
  specs: [],
  technicalSpecs: [],
  sustainability: [],
  applications: [],
  comparison: [],
};

type ProductFormProps = {
  mode: "create" | "edit";
  initial?: ProductFormValues;
  originalSlug?: string;
};

function Section({
  title,
  description,
  children,
  defaultOpen = false,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="rounded-xl border border-gray-200 bg-white overflow-hidden group"
      open={defaultOpen}
    >
      <summary className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer list-none hover:bg-gray-50">
        <div>
          <div className="font-semibold text-sm">{title}</div>
          {description && (
            <div className="text-xs text-gray-500 mt-0.5">{description}</div>
          )}
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
      </summary>
      <div className="px-4 py-4 border-t border-gray-100">{children}</div>
    </details>
  );
}

export function ProductForm({ mode, initial, originalSlug }: ProductFormProps) {
  const router = useRouter();
  const [values, setValues] = React.useState<ProductFormValues>(
    initial ?? EMPTY,
  );
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const originalImageRef = React.useRef<string>(initial?.image ?? "");
  const slugManuallyEditedRef = React.useRef<boolean>(mode === "edit");

  const setField = <K extends keyof ProductFormValues>(
    field: K,
    value: ProductFormValues[K],
  ) => setValues((prev) => ({ ...prev, [field]: value }));

  const updateString = (field: keyof ProductFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setField(
        field,
        e.target.value as ProductFormValues[typeof field] & string,
      );

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nextName = e.target.value;
    setValues((prev) => ({
      ...prev,
      name: nextName,
      slug: slugManuallyEditedRef.current ? prev.slug : slugify(nextName),
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    slugManuallyEditedRef.current = true;
    setField("slug", slugify(e.target.value));
  };

  const cleanupReplacedImage = async () => {
    const previous = originalImageRef.current;
    if (!previous || previous === values.image) return;
    const path = extractStoragePath(previous);
    if (!path) return;
    try {
      const supabase = createClient();
      await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([path]);
    } catch {
      /* best-effort */
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !values.slug ||
      !values.name ||
      !values.image ||
      !values.shopeeUrl
    ) {
      setError("Nama, gambar, dan Shopee URL wajib diisi.");
      return;
    }

    setPending(true);
    try {
      const url =
        mode === "create"
          ? "/api/admin/products"
          : `/api/admin/products/${encodeURIComponent(
              originalSlug ?? values.slug,
            )}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const payload = {
        ...(mode === "create" ? { id: values.slug } : {}),
        slug: values.slug,
        name: values.name,
        image: values.image,
        shopeeUrl: values.shopeeUrl,
        description: values.description,
        badge: values.badge || null,
        highlights: values.highlights.filter((h) => h.trim()),
        gallery: values.gallery,
        specs: values.specs.filter((s) => s.label.trim() || s.value.trim()),
        technicalSpecs: values.technicalSpecs.filter(
          (s) => s.label.trim() || s.value.trim(),
        ),
        sustainability: values.sustainability.filter(
          (s) => s.label.trim() || s.value.trim() || s.icon.trim(),
        ),
        applications: values.applications.filter((a) => a.name.trim()),
        comparison: values.comparison.filter((c) => c.metric.trim()),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.message ?? "Gagal menyimpan produk.");
        return;
      }

      if (mode === "edit") {
        await cleanupReplacedImage();
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
      {error && (
        <div className="p-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Nama Produk</Label>
        <Input
          id="name"
          value={values.name}
          onChange={handleNameChange}
          placeholder="Cocopeat Premium 50kg"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={values.slug}
          onChange={handleSlugChange}
          placeholder="cocopeat-premium-50kg"
        />
        <p className="text-xs text-gray-500">
          Otomatis terbentuk dari nama produk. Edit jika ingin URL yang berbeda.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Gambar Utama</Label>
        <ImageUploadInput
          value={values.image}
          onChange={(v) => setField("image", v)}
          disabled={pending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="shopeeUrl">Shopee URL</Label>
        <Input
          id="shopeeUrl"
          type="url"
          value={values.shopeeUrl}
          onChange={updateString("shopeeUrl")}
          placeholder="https://shopee.co.id/..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi Singkat</Label>
        <textarea
          id="description"
          value={values.description}
          onChange={updateString("description")}
          rows={3}
          placeholder="Media tanam organik premium..."
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white outline-none focus:border-[#46EC13] focus:ring-2 focus:ring-[#46EC13]/15"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="badge">Badge (opsional)</Label>
        <Input
          id="badge"
          value={values.badge}
          onChange={updateString("badge")}
          placeholder="Best Seller"
        />
      </div>

      <Section
        title="Galeri Gambar"
        description={`${values.gallery.length} gambar tambahan`}
      >
        <ImageGalleryInput
          values={values.gallery}
          onChange={(v) => setField("gallery", v)}
          disabled={pending}
        />
      </Section>

      <Section
        title="Highlights"
        description={`${values.highlights.length} poin`}
      >
        <StringListInput
          values={values.highlights}
          onChange={(v) => setField("highlights", v)}
          placeholder="Mis. 100% organik"
          addLabel="Tambah highlight"
          disabled={pending}
        />
      </Section>

      <Section
        title="Spesifikasi Produk"
        description={`${values.specs.length} baris`}
      >
        <LabelValueListInput
          items={values.specs}
          onChange={(v) => setField("specs", v)}
          labelPlaceholder="Berat"
          valuePlaceholder="50 kg"
          addLabel="Tambah spec"
          disabled={pending}
        />
      </Section>

      <Section
        title="Spesifikasi Teknis"
        description={`${values.technicalSpecs.length} baris`}
      >
        <LabelValueListInput
          items={values.technicalSpecs}
          onChange={(v) => setField("technicalSpecs", v)}
          labelPlaceholder="EC Level"
          valuePlaceholder="< 1.0 mS/cm"
          addLabel="Tambah technical spec"
          disabled={pending}
        />
      </Section>

      <Section
        title="Sustainability Metrics"
        description={`${values.sustainability.length} metric`}
      >
        <SustainabilityListInput
          items={values.sustainability}
          onChange={(v) => setField("sustainability", v)}
          disabled={pending}
        />
      </Section>

      <Section
        title="Aplikasi Penggunaan"
        description={`${values.applications.length} aplikasi`}
      >
        <ApplicationsListInput
          items={values.applications}
          onChange={(v) => setField("applications", v)}
          disabled={pending}
        />
      </Section>

      <Section
        title="Tabel Perbandingan"
        description={`${values.comparison.length} baris`}
      >
        <ComparisonListInput
          items={values.comparison}
          onChange={(v) => setField("comparison", v)}
          disabled={pending}
        />
      </Section>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={pending}
          className="bg-[#46EC13] hover:bg-[#3BD410] text-black font-bold h-11 px-6"
        >
          {pending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Menyimpan...
            </>
          ) : mode === "create" ? (
            "Buat Produk"
          ) : (
            "Simpan Perubahan"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
          disabled={pending}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
