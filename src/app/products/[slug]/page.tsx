import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { mapProduct } from "@/data/products";

import { ProductDetail } from "@/components/organisms/product-detail";
import { ProductTabs } from "@/components/organisms/product-tabs";
import { ComparisonTable } from "@/components/organisms/comparison-table";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });
  if (!product) return { title: "Produk tidak ditemukan" };
  return {
    title: `${product.name} – Agropunggur`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const dbProduct = await prisma.product.findUnique({
    where: { slug },
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

  if (!dbProduct) notFound();

  const product = mapProduct(dbProduct);
  const dbRelated = await prisma.product.findMany({
    where: {
      NOT: { slug },
    },
    take: 3,
  });

  const related = dbRelated.map(mapProduct);

  return (
    <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-5 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 md:space-y-16">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-1.5 text-sm text-muted-foreground"
        >
          <Link href="/" className="hover:text-foreground">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium truncate max-w-[60vw]">
            {product.name}
          </span>
        </nav>

        <ProductDetail product={product} />

        <ProductTabs product={product} />

        {product.comparison && product.comparison.length > 0 && (
          <ComparisonTable comparison={product.comparison} />
        )}
      </div>
    </section>
  );
}
