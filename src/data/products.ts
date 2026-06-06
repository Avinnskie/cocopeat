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

export interface FarmerPartnership {
  farmerCount: number;
  region: string;
  description: string;
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
  farmerPartnership?: FarmerPartnership;
}

export const products: Product[] = [
  // Masukkan data produk asli di sini jika ingin melakukan bulk insert via command `prisma db seed`.
  // Format objek harus mengikuti interface `Product` di bawah ini.
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit: number = 3): Product[] {
  return products.filter((product) => product.slug !== currentSlug).slice(0, limit);
}

export function mapProduct(p: any): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: Number(p.price),
    originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
    description: p.description,
    longDescription: p.longDescription ?? undefined,
    image: p.image,
    gallery: p.gallery || [],
    badge: p.badge ?? undefined,
    badgeColor: p.badgeColor ?? undefined,
    stock: p.stock ?? undefined,
    rating: p.rating ?? undefined,
    reviewCount: p.reviewCount ?? undefined,
    specs: p.specs ?? undefined,
    highlights: p.highlights || [],
    batchInfo: p.batchInfo ? {
      batchNumber: p.batchInfo.batchNumber,
      processingDate: p.batchInfo.processingDate,
      sourceLocation: p.batchInfo.sourceLocation,
      certifications: p.batchInfo.certifications || [],
    } : undefined,
    sustainability: p.sustainability ?? undefined,
    technicalSpecs: p.technicalSpecs ?? undefined,
    applications: p.applications ?? undefined,
    comparison: p.comparison ?? undefined,
    storage: p.storage ? {
      instructions: p.storage.instructions || [],
      shelfLife: p.storage.shelfLife,
      rehydrationTime: p.storage.rehydrationTime,
      waterRatio: p.storage.waterRatio,
    } : undefined,
    farmerPartnership: p.farmerPartnership ? {
      farmerCount: p.farmerPartnership.farmerCount,
      region: p.farmerPartnership.region,
      description: p.farmerPartnership.description,
    } : undefined,
  };
}
