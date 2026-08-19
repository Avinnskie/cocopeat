import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import {
    PRODUCT_RELATIONS_SELECT,
    mapProduct,
    type ProductRowWithRelations,
} from "@/data/products";

import { ProductDetail } from "@/components/organisms/product-detail";
import { ProductTabs } from "@/components/organisms/product-tabs";
import { ComparisonTable } from "@/components/organisms/comparison-table";
import type { Metadata } from "next";

export async function generateStaticParams() {
    const supabase = createStaticClient();
    const { data, error } = await supabase.from("Product").select("slug");
    if (error || !data) return [];
    return data.map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();
    const { data } = await supabase
        .from("Product")
        .select("name, description")
        .eq("slug", slug)
        .maybeSingle();

    if (!data) return { title: "Produk tidak ditemukan" };
    return {
        title: `${data.name} - Media Tanam Cocopeat`,
        description:
            data.description ||
            `${data.name} merupakan media tanam cocopeat berkualitas untuk pertanian, hidroponik, pembibitan, dan hortikultura.`,
        alternates: {
            canonical: `/products/${slug}`,
        },
    };
}

const BASE_URL = "https://www.cocopeat-plus.com";

function absoluteUrl(url: string) {
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    return `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: dbProduct, error } = await supabase
        .from("Product")
        .select(PRODUCT_RELATIONS_SELECT)
        .eq("slug", slug)
        .maybeSingle()
        .overrideTypes<ProductRowWithRelations, { merge: false }>();

    if (error) {
        console.error("ProductDetailPage:", error);
    }

    if (!dbProduct) notFound();

    const product = mapProduct(dbProduct);

    const productUrl = `${BASE_URL}/products/${product.slug}`;

    const productImages = [product.image, ...(product.gallery ?? [])]
        .filter(Boolean)
        .map(absoluteUrl);

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Product",
                "@id": `${productUrl}#product`,

                name: product.name,

                description: product.longDescription ?? product.description,

                image: productImages,

                url: productUrl,

                brand: {
                    "@type": "Brand",
                    name: "Cocopeat Plus",
                },

                ...(product.price > 0 && {
                    offers: {
                        "@type": "Offer",
                        priceCurrency: "IDR",
                        price: product.price.toString(),
                        url: product.shopeeUrl || productUrl,
                    },
                }),
            },

            {
                "@type": "BreadcrumbList",

                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Beranda",
                        item: BASE_URL,
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Produk",
                        item: `${BASE_URL}/products`,
                    },
                    {
                        "@type": "ListItem",
                        position: 3,
                        name: product.name,
                        item: productUrl,
                    },
                ],
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData).replace(
                        /</g,
                        "\\u003c",
                    ),
                }}
            />
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
                        <Link
                            href="/products"
                            className="hover:text-foreground"
                        >
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
        </>
    );
}
