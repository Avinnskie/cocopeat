import HeroSection from "../components/sections/hero";
import AboutSection from "../components/sections/about";
import ProductCatalog from "../components/sections/product-catalog";
import CTASection from "../components/sections/cta";
import FundingSection from "../components/sections/funding";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cocopeat Plus | Media Tanam Cocopeat Premium Indonesia",
    description:
        "Cocopeat Plus menyediakan media tanam cocopeat premium dari serabut kelapa Indonesia untuk pertanian, hidroponik, pembibitan, dan hortikultura.",
    alternates: {
        canonical: "/",
    },
};

const BASE_URL = "https://www.cocopeat-plus.com";

const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Cocopeat Plus",
    url: BASE_URL,
    description:
        "Cocopeat Plus menyediakan media tanam cocopeat premium dari serabut kelapa Indonesia untuk pertanian, hidroponik, pembibitan, dan hortikultura.",
};

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationJsonLd).replace(
                        /</g,
                        "\\u003c",
                    ),
                }}
            />
            <HeroSection />
            <AboutSection />
            <ProductCatalog />
            <CTASection />
            <FundingSection />
        </>
    );
}
