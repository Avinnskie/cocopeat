import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="px-8 py-10 max-w-3xl">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke daftar produk
      </Link>

      <h1 className="font-extrabold text-3xl mb-2">Produk Baru</h1>
      <p className="text-gray-600 mb-8">
        Tambahkan produk yang akan mengarahkan pengunjung ke halaman Shopee.
      </p>

      <ProductForm mode="create" />
    </div>
  );
}
