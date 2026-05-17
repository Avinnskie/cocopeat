import HeroSection from "../components/sections/hero";
import AboutSection from "../components/sections/about";
import ProductCatalog from "../components/sections/product-catalog";
import CTASection from "../components/sections/cta";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductCatalog />
      <CTASection />
    </>
  );
}
