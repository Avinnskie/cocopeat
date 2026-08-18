import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Image
        src="/images/bg.png"
        alt="Background"
        width={1500}
        height={1000}
        className="absolute w-full h-full object-cover -z-10"
        priority
      />

      <div className="px-5 sm:px-8 md:px-12 lg:px-20 pt-28 sm:pt-32 md:pt-36 pb-12 min-h-screen flex items-start">
        <div className="w-full max-w-3xl space-y-5 sm:space-y-6">
          <h1 className="text-white leading-tight font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Revolusi Panen <br /> Anda dengan <br />
            <span className="bg-gradient-to-r from-[#16A34A] to-[#46EC13] bg-clip-text text-transparent">
              Cocopeat Plus
            </span>
          </h1>

          <p className="text-white/90 text-base leading-7 sm:text-lg md:text-xl max-w-2xl">
            Raih kesehatan tanaman yang optimal dengan media tanam organik premium kami. Dibuat dari kelapa terbaik, Cocopeat Plus memastikan sirkulasi udara yang lebih baik dan daya serap air yang optimal untuk pertanian di seluruh Indonesia.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Button className="h-12 px-6 sm:h-13 bg-[#46EC13] hover:bg-[#3BD410] text-black font-bold text-sm sm:text-base w-full sm:w-auto rounded-lg">
              Jelajahi Produk <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
