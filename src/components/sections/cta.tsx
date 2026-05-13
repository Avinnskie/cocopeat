import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section id="contact" className="px-5 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16">
      <div className="relative bg-[#1A1A1A] rounded-3xl overflow-hidden px-6 sm:px-12 md:px-20 py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#1A1A1A] to-[#2D2D2D]" />

        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Siap untuk Hasil yang Lebih Besar?
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Temukan rangkaian lengkap campuran cocopeat khusus kami, mulai dari solusi pertanian skala besar hingga kit berkebun untuk hobis. Temukan tepat apa yang dibutuhkan tanaman Anda untuk tumbuh subur.
          </p>
          <Button className="bg-[#46EC13] hover:bg-[#3BD410] text-black font-bold h-12 px-8 text-sm sm:text-base">
            Hubungi Kami <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
