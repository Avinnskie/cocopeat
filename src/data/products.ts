export interface ProductSpec {
  label: string;
  value: string;
}

export interface BatchInfo {
  batchNumber: string;
  processingDate: string;
  sourceLocation: string;
  certifications: string[];
}

export interface SustainabilityMetric {
  label: string;
  value: string;
  icon: string;
}

export interface UsageApplication {
  name: string;
  icon: string;
  description?: string;
}

export interface ComparisonItem {
  metric: string;
  cocopeatPlus: string;
  regularSoil: string;
  peatMoss: string;
  importedCocopeat: string;
}

export interface StorageInfo {
  instructions: string[];
  shelfLife: string;
  rehydrationTime: string;
  waterRatio: string;
}

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription?: string;
  image: string;
  gallery?: string[];
  badge?: string;
  badgeColor?: string;
  stock?: number;
  rating?: number;
  reviewCount?: number;
  specs?: ProductSpec[];
  highlights?: string[];
  batchInfo?: BatchInfo;
  sustainability?: SustainabilityMetric[];
  technicalSpecs?: TechnicalSpec[];
  applications?: UsageApplication[];
  comparison?: ComparisonItem[];
  storage?: StorageInfo;
}

export const products: Product[] = [
  {
    id: "cocopeat-block-5kg",
    slug: "cocopeat-block-5kg",
    name: "Cocopeat Plus Premium",
    price: 85000,
    originalPrice: 100000,
    description:
      "100% Organic Coconut Coir Growing Medium dengan mikroba menguntungkan. Media tanam premium untuk hasil maksimal.",
    longDescription:
      "Cocopeat Plus Premium adalah media tanam organik berkualitas tinggi yang diolah dari serat kelapa pilihan. Diperkaya dengan mikroba Trichoderma yang melindungi akar dari penyakit. Sudah melalui proses pencucian dan buffering EC rendah sehingga aman untuk semua jenis tanaman.",
    image: "/images/product-block.svg",
    gallery: [
      "/images/product-block.svg",
      "/images/product-bag.svg",
      "/images/product-chips.svg",
    ],
    badge: "VERIFIED AUTHENTIC",
    badgeColor: "bg-[#46EC13]",
    stock: 124,
    rating: 4.9,
    reviewCount: 128,
    highlights: [
      "Retensi air tinggi (800%)",
      "100% organik & biodegradable",
      "pH netral (5.5 - 6.8)",
      "Tahan terhadap pertumbuhan bakteri & jamur",
    ],
    specs: [
      { label: "Berat", value: "50 kg" },
      { label: "Volume Mengembang", value: "± 75 liter" },
      { label: "EC Level", value: "< 0.5 mS/cm" },
      { label: "pH", value: "5.5 – 6.8" },
      { label: "Kemasan", value: "Karung 50kg" },
      { label: "Asal", value: "Kelompok Petani Muda Jaya, Pontianak" },
    ],
    batchInfo: {
      batchNumber: "AG-2024-0517",
      processingDate: "17 Mei 2024",
      sourceLocation: "Kelompok Petani Muda Jaya, Pontianak",
      certifications: ["ISO Certified", "Organic"],
    },
    sustainability: [
      { label: "Carbon Footprint", value: "-2.5kg CO₂/bag", icon: "eco" },
      { label: "Water Saved", value: "60%", icon: "water_drop" },
      { label: "Biodegradable", value: "100% dalam 2 tahun", icon: "recycling" },
      { label: "Local Sourcing", value: "<50km", icon: "local_shipping" },
    ],
    technicalSpecs: [
      { label: "Moisture Content", value: "15-20%" },
      { label: "EC Level", value: "<0.5 mS/cm" },
      { label: "Fiber Length", value: "2-6mm" },
      { label: "Expansion Ratio", value: "1:7" },
      { label: "Bulk Density", value: "80-100 kg/m³" },
      { label: "pH Level", value: "5.5 - 6.8" },
    ],
    applications: [
      { name: "Sistem Hidroponik", icon: "water_drop", description: "Ideal untuk NFT, DWC, dan sistem wick" },
      { name: "Media Semai", icon: "spa", description: "Sempurna untuk perkecambahan benih" },
      { name: "Campuran Tanah", icon: "landscape", description: "Campurkan 30-50% dengan tanah" },
      { name: "Budidaya Jamur", icon: "nature", description: "Media tumbuh jamur tiram & shiitake" },
      { name: "Tanaman Anggrek", icon: "local_florist", description: "Drainase sempurna untuk epifit" },
      { name: "Vertical Garden", icon: "park", description: "Ringan untuk sistem vertikal" },
    ],
    comparison: [
      {
        metric: "Retensi Air",
        cocopeatPlus: "800% (Sangat Tinggi)",
        regularSoil: "200% (Rendah)",
        peatMoss: "600% (Tinggi)",
        importedCocopeat: "700% (Tinggi)",
      },
      {
        metric: "Stabilitas pH",
        cocopeatPlus: "5.5-6.8 (Stabil)",
        regularSoil: "Bervariasi",
        peatMoss: "3.5-4.5 (Asam)",
        importedCocopeat: "5.0-6.5",
      },
      {
        metric: "Keberlanjutan",
        cocopeatPlus: "Carbon Negative",
        regularSoil: "Netral",
        peatMoss: "Tidak Berkelanjutan",
        importedCocopeat: "Carbon Positive",
      },
      {
        metric: "Harga/Liter",
        cocopeatPlus: "Rp 1.133",
        regularSoil: "Rp 500",
        peatMoss: "Rp 2.000",
        importedCocopeat: "Rp 1.800",
      },
      {
        metric: "Sumber Lokal",
        cocopeatPlus: "<50km",
        regularSoil: "Lokal",
        peatMoss: "Import",
        importedCocopeat: "Import",
      },
    ],
    storage: {
      instructions: [
        "Simpan di tempat sejuk dan kering",
        "Hindari paparan sinar matahari langsung",
        "Tutup rapat setelah dibuka",
        "Jauhkan dari bahan kimia",
      ],
      shelfLife: "24 bulan (terkompresi)",
      rehydrationTime: "15-20 menit",
      waterRatio: "4-5L air per kg",
    },
  },
  {
    id: "cocopeat-bag-50l",
    slug: "cocopeat-bag-50l",
    name: "Cocopeat Bag (50L)",
    price: 45000,
    description:
      "Serbuk kelapa siap pakai dalam kemasan praktis 50L. Sudah dibuffer dan seimbang pH untuk kesuksesan penanaman langsung.",
    longDescription:
      "Cocopeat Bag 50L hadir dalam kemasan plastik praktis yang siap dituangkan langsung ke pot atau bedengan. Sudah dibuffer dengan kalsium nitrat untuk menetralkan kandungan natrium, sehingga aman untuk tanaman sensitif sekalipun.",
    image: "/images/product-bag.svg",
    gallery: ["/images/product-bag.svg", "/images/product-block.svg"],
    stock: 78,
    rating: 4.7,
    reviewCount: 142,
    highlights: [
      "Siap pakai tanpa perlu direndam",
      "Volume 50 liter per kantong",
      "pH stabil 5.8 – 6.5",
      "Kemasan tahan air",
    ],
    specs: [
      { label: "Volume", value: "50 liter" },
      { label: "Berat", value: "± 4 kg" },
      { label: "EC Level", value: "< 0.5 mS/cm" },
      { label: "pH", value: "5.8 – 6.5" },
      { label: "Kemasan", value: "Kantong Plastik" },
      { label: "Asal", value: "Kelompok Agropunggur" },
    ],
  },
  {
    id: "coco-husk-chips",
    slug: "coco-husk-chips",
    name: "Coco Husk Chips",
    price: 40000,
    description:
      "Chip kelapa premium ideal untuk tanaman yang menyukai aerasi seperti anggrek dan anthurium. Memberikan sifat drainase yang sangat baik.",
    longDescription:
      "Coco Husk Chips adalah potongan sabut kelapa berukuran 1–3 cm yang ideal sebagai media tanam epifit. Drainase superior dan retensi air seimbang membuatnya pilihan utama untuk anggrek, anthurium, dan tanaman hias eksotis lainnya.",
    image: "/images/product-chips.svg",
    gallery: ["/images/product-chips.svg", "/images/product-block.svg"],
    badge: "PREMIUM",
    badgeColor: "bg-[#46EC13]",
    stock: 52,
    rating: 4.9,
    reviewCount: 89,
    highlights: [
      "Ukuran chip 1–3 cm seragam",
      "Drainase dan aerasi superior",
      "Ideal untuk anggrek dan anthurium",
      "Tahan lama hingga 3 tahun",
    ],
    specs: [
      { label: "Ukuran Chip", value: "1 – 3 cm" },
      { label: "Berat", value: "± 3 kg" },
      { label: "EC Level", value: "< 0.5 mS/cm" },
      { label: "pH", value: "5.5 – 6.2" },
      { label: "Kemasan", value: "Karung 30 liter" },
      { label: "Asal", value: "Kelompok Agropunggur" },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit: number = 3): Product[] {
  return products.filter((product) => product.slug !== currentSlug).slice(0, limit);
}
