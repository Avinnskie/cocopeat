export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  badge?: string;
  badgeColor?: string;
}

export const products: Product[] = [
  {
    id: "cocopeat-block-5kg",
    name: "Cocopeat Block (5kg)",
    price: 35000,
    originalPrice: 50000,
    description:
      "Blok serat kelapa organik berkualitas tinggi. Mengembang hingga 75 liter saat direndam air. Ide...",
    image: "/images/product-block.svg",
    badge: "BEST SELLER",
    badgeColor: "bg-[#46EC13]",
  },
  {
    id: "cocopeat-bag-50l",
    name: "Cocopeat Bag (50L)",
    price: 45000,
    description:
      "Serbuk kelapa siap pakai dalam kemasan praktis 50L. Sudah dibuffer dan seimbang pH untuk kesuksesan penanaman langsung.",
    image: "/images/product-bag.svg",
  },
  {
    id: "coco-husk-chips",
    name: "Coco Husk Chips",
    price: 40000,
    description:
      "Chip kelapa premium ideal untuk tanaman yang menyukai aerasi seperti anggrek dan anthurium. Memberikan sifat drainase yang sangat baik.",
    image: "/images/product-chips.svg",
    badge: "PREMIUM",
    badgeColor: "bg-[#46EC13]",
  },
];
