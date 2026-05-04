import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CirclePlay, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
              Explore Products <ArrowRight className="w-4 h-4" />
            </Button>
            <Button className="h-12 px-6 sm:h-13 bg-white hover:bg-white/90 text-black font-bold text-sm sm:text-base w-full sm:w-auto rounded-lg">
              <CirclePlay className="w-4 h-4" /> Why Us?
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 pt-1">
            <Badge className="px-4 sm:px-5 py-3 gap-2 bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs sm:text-sm whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5" />
              High Retention
            </Badge>
            <Badge className="px-4 sm:px-5 py-3 gap-2 bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs sm:text-sm whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Organic
            </Badge>
            <Badge className="px-4 sm:px-5 py-3 gap-2 bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs sm:text-sm whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Nationwide Ship
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
