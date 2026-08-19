import type { MetadataRoute } from "next";
import { createStaticClient } from "@/lib/supabase/static";

const BASE_URL = "https://www.cocopeat-plus.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = createStaticClient();

    const { data: products, error } = await supabase
        .from("Product")
        .select("slug")
        .order("name", { ascending: true });

    if (error) {
        console.error("Sitemap: gagal mengambil produk:", error);
    }

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
        },
        {
            url: `${BASE_URL}/products`,
        },
    ];

    const productPages: MetadataRoute.Sitemap = (products ?? []).map(
        (product) => ({
            url: `${BASE_URL}/products/${product.slug}`,
        }),
    );

    return [...staticPages, ...productPages];
}
