"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const filters = ["Semua Product", "Sacks (50kg)", "Paketan"];

export function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Membaca status URL saat ini agar tombol/input tidak reset saat halaman dimuat
  const currentFilter = searchParams.get("filter") || "Semua Product";
  const currentSearch = searchParams.get("q") || "";
  const currentSort = searchParams.get("sort") || "default";

  // Fungsi utama untuk memanipulasi URL parameter
  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== "Semua Product" && value !== "default") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Mendorong perubahan ke URL tanpa me-refresh seluruh halaman web
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      
      {/* 1. Barisan Tombol Kategori */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {filters.map((label) => (
          <Button
            key={label}
            onClick={() => updateParams("filter", label)}
            className={`rounded-full px-4 sm:px-5 h-9 sm:h-10 text-sm font-medium ${
              currentFilter === label
                ? "bg-[#46EC13] hover:bg-[#3BD410] text-black"
                : "bg-[#F1F4F0] hover:bg-[#E5EAE3] text-black"
            }`}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* 2. Kolom Pencarian dan Dropdown Sortir */}
      <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
        <div className="relative w-full lg:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari barang..."
            defaultValue={currentSearch}
            onChange={(e) => updateParams("q", e.target.value)}
            className="h-10 sm:h-11 pl-10 text-sm sm:text-base"
          />
        </div>
        <select
          onChange={(e) => updateParams("sort", e.target.value)}
          defaultValue={currentSort}
          className="h-10 sm:h-11 px-3 border border-input rounded-md text-sm bg-background"
        >
          <option value="default">Urutkan</option>
          <option value="termurah">Termurah</option>
          <option value="termahal">Termahal</option>
        </select>
      </div>
      
    </div>
  );
}