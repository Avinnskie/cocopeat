import Link from "next/link";
import { Plus, Pencil, ExternalLink } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { ProductDeleteButton } from "@/components/admin/product-delete-button";
import { StockInput } from "@/components/admin/stock-input";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Product")
    .select("id, slug, name, image, shopeeUrl, badge, stock")
    .order("name");

  if (error) {
    console.error("AdminProductsPage:", error);
  }

  const products = data ?? [];

  return (
    <div className="px-8 py-10 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-extrabold text-3xl mb-2">Products</h1>
          <p className="text-gray-600">{products.length} produk terdaftar.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#46EC13] hover:bg-[#3BD410] text-black font-bold h-11 px-5 rounded-lg text-sm"
        >
          <Plus className="w-4 h-4" />
          Produk Baru
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left font-semibold px-4 py-3">Name</th>
              <th className="text-left font-semibold px-4 py-3">Slug</th>
              <th className="text-left font-semibold px-4 py-3">Shopee</th>
              <th className="text-left font-semibold px-4 py-3">Badge</th>
              <th className="text-left font-semibold px-4 py-3">Stock</th>
              <th className="px-4 py-3 w-32"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                  {p.slug}
                </td>
                <td className="px-4 py-3">
                  {p.shopeeUrl ? (
                    <a
                      href={p.shopeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#16A34A] hover:underline text-xs"
                    >
                      Buka <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-xs text-red-500">Belum diisi</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-500">{p.badge ?? "—"}</td>
                <td className="px-4 py-3">
                  <StockInput slug={p.slug} initialStock={p.stock ?? 0} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/products/${encodeURIComponent(p.slug)}/edit`}
                      aria-label={`Edit ${p.name}`}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <ProductDeleteButton slug={p.slug} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  Belum ada produk.{" "}
                  <Link
                    href="/admin/products/new"
                    className="text-[#16A34A] hover:underline font-medium"
                  >
                    Tambah sekarang
                  </Link>
                  .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
