import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowUpRight, ArrowRight } from "lucide-react";
import { products } from "@/data/products";

function formatPrice(price: number): string {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

export default function ProductCatalog() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 lg:px-20">
      <div className="text-center space-y-4 mb-12">
        <p className="text-sm font-semibold text-[#16A34A] uppercase tracking-widest">
          KATALOG KAMI
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Pilih variant cocopeat anda
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          Dari blok kompres untuk penyimpanan efisien hingga kantong siap pakai untuk penanaman segera,
          kami memiliki media organik yang sempurna untuk kebutuhan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="relative bg-[#F3F4F6] p-6 flex items-center justify-center h-64">
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 ${product.badgeColor} text-black text-xs font-bold px-3 py-1 rounded-full`}
                >
                  {product.badge}
                </span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                width={240}
                height={240}
                className="object-contain h-full w-auto"
              />
            </div>

            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-bold text-base">{product.name}</h3>
                <span className="text-[#16A34A] font-bold text-base">
                  {formatPrice(product.price)}
                </span>
              </div>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through mb-2">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {product.description}
              </p>
              <div className="flex items-center gap-3">
                <Button className="flex-1 bg-[#46EC13] hover:bg-[#3BD410] text-black font-bold h-11 text-sm">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 shrink-0"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-[#16A34A] font-semibold text-sm hover:underline"
        >
          Lihat semua katalog <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
