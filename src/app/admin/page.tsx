import Link from "next/link";
import { Package, Plus } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("Product")
    .select("*", { count: "exact", head: true });

  return (
    <div className="px-8 py-10 max-w-4xl">
      <h1 className="font-extrabold text-3xl mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Kelola produk yang akan diarahkan ke Shopee.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/products"
          className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#46EC13] hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Produk
            </span>
            <Package className="w-5 h-5 text-[#16A34A]" />
          </div>
          <div className="text-3xl font-extrabold">{count ?? 0}</div>
        </Link>

        <Link
          href="/admin/products/new"
          className="bg-white border border-dashed border-gray-300 rounded-xl p-5 hover:border-[#46EC13] hover:bg-[#46EC13]/5 transition-all flex flex-col justify-center items-center text-center"
        >
          <Plus className="w-6 h-6 text-[#16A34A] mb-2" />
          <span className="font-bold">Tambah Produk Baru</span>
          <span className="text-xs text-gray-500 mt-1">
            Buat kartu produk dengan link Shopee
          </span>
        </Link>
      </div>
    </div>
  );
}
