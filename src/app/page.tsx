import HeroSection from "../components/sections/hero";
import AboutSection from "../components/sections/about";
import ProductCatalog from "../components/sections/product-catalog";
import CTASection from "../components/sections/cta";
import FundingSection from "../components/sections/funding";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductCatalog />
      <CTASection />
      <FundingSection />
    </>
  );
}
