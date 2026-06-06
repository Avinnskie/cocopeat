import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProductCard } from "@/components/organisms/product-card";
import prisma from "@/lib/prisma";
import { mapProduct } from "@/data/products";

export default async function ProductCatalog() {
  const dbProducts = await prisma.product.findMany({
    take: 3,
    include: {
      specs: true,
      technicalSpecs: true,
      batchInfo: true,
      sustainability: true,
      applications: true,
      comparison: true,
      storage: true,
      farmerPartnership: true,
    },
  });

  const products = dbProducts.map(mapProduct);

  return (
    <section
      id="product"
      className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 lg:px-20"
    >
      <div className="text-center space-y-4 mb-12">
        <p className="text-sm font-semibold text-[#16A34A] uppercase tracking-widest">
          KATALOG KAMI
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Pilih variant cocopeat anda
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          Dari blok kompres untuk penyimpanan efisien hingga kantong siap pakai untuk penanaman segera,
          kami memiliki media organik yang sempurna untuk kebutuhan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[#16A34A] font-semibold text-sm hover:underline"
        >
          Lihat semua katalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
