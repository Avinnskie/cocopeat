export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  price: string | number;
  originalPrice: string | number | null;
  description: string;
  longDescription: string | null;
  image: string;
  gallery: string[];
  badge: string | null;
  badgeColor: string | null;
  stock: number | null;
  rating: number | null;
  reviewCount: number | null;
  highlights: string[];
  shopeeUrl: string;
};

export type ProductSpecRow = {
  id: string;
  productId: string;
  label: string;
  value: string;
};

export type TechnicalSpecRow = ProductSpecRow;

export type BatchInfoRow = {
  id: string;
  productId: string;
  batchNumber: string;
  processingDate: string;
  sourceLocation: string;
  certifications: string[];
};

export type SustainabilityMetricRow = {
  id: string;
  productId: string;
  label: string;
  value: string;
  icon: string;
};

export type UsageApplicationRow = {
  id: string;
  productId: string;
  name: string;
  icon: string;
  description: string | null;
};

export type ComparisonItemRow = {
  id: string;
  productId: string;
  metric: string;
  cocopeatPlus: string;
  regularSoil: string;
  peatMoss: string;
  importedCocopeat: string;
};

export type StorageInfoRow = {
  id: string;
  productId: string;
  instructions: string[];
  shelfLife: string;
  rehydrationTime: string;
  waterRatio: string;
};

export type FarmerPartnershipRow = {
  id: string;
  productId: string;
  farmerCount: number;
  region: string;
  description: string;
};

type Insertable<T extends { id: string }> = Omit<T, "id"> & { id?: string };

type TableShape<Row extends { id: string }> = {
  Row: Row;
  Insert: Insertable<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      Product: TableShape<ProductRow>;
      ProductSpec: TableShape<ProductSpecRow>;
      TechnicalSpec: TableShape<TechnicalSpecRow>;
      BatchInfo: TableShape<BatchInfoRow>;
      SustainabilityMetric: TableShape<SustainabilityMetricRow>;
      UsageApplication: TableShape<UsageApplicationRow>;
      ComparisonItem: TableShape<ComparisonItemRow>;
      StorageInfo: TableShape<StorageInfoRow>;
      FarmerPartnership: TableShape<FarmerPartnershipRow>;
    };
    Views: Record<string, never>;
    Enums: Record<string, never>;
    Functions: Record<string, never>;
  };
};

export type ProductWithRelations = ProductRow & {
  specs: ProductSpecRow[];
  technicalSpecs: TechnicalSpecRow[];
  batchInfo: BatchInfoRow | null;
  sustainability: SustainabilityMetricRow[];
  applications: UsageApplicationRow[];
  comparison: ComparisonItemRow[];
  storage: StorageInfoRow | null;
  farmerPartnership: FarmerPartnershipRow | null;
};
