import { ProductFilter } from "@/components/organisms/product-filter";
import { ProductCard } from "@/components/organisms/product-card";
import { createClient } from "@/lib/supabase/server";
import {
  PRODUCT_RELATIONS_SELECT,
  mapProduct,
  type ProductRowWithRelations,
} from "@/data/products";

export default async function ProductsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const filter = typeof searchParams?.filter === "string" ? searchParams.filter : "";
  const sort = typeof searchParams?.sort === "string" ? searchParams.sort : "";

  const supabase = await createClient();

  // 1. Inisiasi Query Database
  let query = supabase.from("Product").select(PRODUCT_RELATIONS_SELECT);

  // 2. Eksekusi Pencarian Nama
  if (q) {
    query = query.ilike("name", `%${q}%`);
  }

  // 3. Eksekusi Kategori
  if (filter && filter !== "Semua Product") {
    const keyword = filter.split(" ")[0]; // Mengambil "Sacks" atau "Paketan"
    query = query.ilike("name", `%${keyword}%`);
  }

  // 4. Eksekusi Sortir Harga
  if (sort === "termurah") {
    query = query.order("price", { ascending: true });
  } else if (sort === "termahal") {
    query = query.order("price", { ascending: false });
  } else {
    query = query.order("name", { ascending: true }); // Default
  }

  const { data, error } = await query.overrideTypes<ProductRowWithRelations[], { merge: false }>();

  if (error) {
    console.error("ProductsPage:", error);
  }

  const products = (data ?? []).map(mapProduct);

  return (
    <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-5 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <div className="space-y-3 sm:space-y-4">
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Media Tanam Berkualitas Tinggi
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Dihasilkan langsung oleh Kelompok Agropunggur. Cocopeat kami telah dicuci,
            dibuffer, dan siap untuk meningkatkan hasil panen Anda.
          </p>
        </div>

        {/* Pemanggilan komponen interaktif yang baru dibuat */}
        <ProductFilter />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 pt-2">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-muted-foreground">
              Produk tidak ditemukan.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}