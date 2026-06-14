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
  shopeeUrl: string;
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

export const PRODUCT_RELATIONS_SELECT = `
  *,
  specs:ProductSpec(label, value),
  technicalSpecs:TechnicalSpec(label, value),
  batchInfo:BatchInfo(batchNumber, processingDate, sourceLocation, certifications),
  sustainability:SustainabilityMetric(label, value, icon),
  applications:UsageApplication(name, icon, description),
  comparison:ComparisonItem(metric, cocopeatPlus, regularSoil, peatMoss, importedCocopeat),
  storage:StorageInfo(instructions, shelfLife, rehydrationTime, waterRatio),
  farmerPartnership:FarmerPartnership(farmerCount, region, description)
`.trim();

function firstOrNull<T>(value: T | T[] | null | undefined): T | null {
  if (value == null) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

export type ProductRowWithRelations = {
  id: string;
  slug: string;
  name: string;
  price: string | number;
  originalPrice?: string | number | null;
  description: string;
  longDescription?: string | null;
  image: string;
  gallery?: string[] | null;
  badge?: string | null;
  badgeColor?: string | null;
  stock?: number | null;
  rating?: number | null;
  reviewCount?: number | null;
  highlights?: string[] | null;
  shopeeUrl?: string | null;
  specs?: ProductSpec[] | null;
  technicalSpecs?: TechnicalSpec[] | null;
  sustainability?: SustainabilityMetric[] | null;
  applications?: UsageApplication[] | null;
  comparison?: ComparisonItem[] | null;
  batchInfo?: BatchInfo | BatchInfo[] | null;
  storage?: StorageInfo | StorageInfo[] | null;
  farmerPartnership?: FarmerPartnership | FarmerPartnership[] | null;
};

export function mapProduct(p: ProductRowWithRelations): Product {
  const batchInfo = firstOrNull(p.batchInfo);
  const storage = firstOrNull(p.storage);
  const farmerPartnership = firstOrNull(p.farmerPartnership);

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: Number(p.price),
    originalPrice: p.originalPrice != null ? Number(p.originalPrice) : undefined,
    description: p.description,
    longDescription: p.longDescription ?? undefined,
    image: p.image,
    gallery: p.gallery || [],
    badge: p.badge ?? undefined,
    badgeColor: p.badgeColor ?? undefined,
    stock: p.stock ?? undefined,
    rating: p.rating ?? undefined,
    reviewCount: p.reviewCount ?? undefined,
    shopeeUrl: p.shopeeUrl ?? "",
    specs: p.specs ?? undefined,
    highlights: p.highlights || [],
    batchInfo: batchInfo
      ? {
          batchNumber: batchInfo.batchNumber,
          processingDate: batchInfo.processingDate,
          sourceLocation: batchInfo.sourceLocation,
          certifications: batchInfo.certifications || [],
        }
      : undefined,
    sustainability: p.sustainability ?? undefined,
    technicalSpecs: p.technicalSpecs ?? undefined,
    applications: p.applications ?? undefined,
    comparison: p.comparison ?? undefined,
    storage: storage
      ? {
          instructions: storage.instructions || [],
          shelfLife: storage.shelfLife,
          rehydrationTime: storage.rehydrationTime,
          waterRatio: storage.waterRatio,
        }
      : undefined,
    farmerPartnership: farmerPartnership
      ? {
          farmerCount: farmerPartnership.farmerCount,
          region: farmerPartnership.region,
          description: farmerPartnership.description,
        }
      : undefined,
  };
}
