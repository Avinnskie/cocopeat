import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/organisms/product-card";

const filters = [
  { label: "Semua Product", active: true },
  { label: "Sacks (50kg)", active: false },
  { label: "Paketan", active: false },
];

export default function ProductsPage() {
  return (
    <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-5 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <div className="space-y-3 sm:space-y-4">
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Media Tanam Berkualitas Tinggi
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Dihasilkan langsung oleh Kelompok Agropunggur. Cocopeat kami telah dicuci,
            dibuffer, dan siap untuk meningkatkan hasil panen Anda.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {filters.map((filter) => (
              <Button
                key={filter.label}
                className={`rounded-full px-4 sm:px-5 h-9 sm:h-10 text-sm font-medium ${
                  filter.active
                    ? "bg-[#46EC13] hover:bg-[#3BD410] text-black"
                    : "bg-[#F1F4F0] hover:bg-[#E5EAE3] text-black"
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari barang pada katalog kami"
              className="h-10 sm:h-11 pl-10 text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 pt-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
