-- SECURITY: Row Level Security is DISABLED on every public table.
-- The product-images storage bucket has a fully-permissive policy that lets
-- the anon API key read/write/delete any file in that bucket. Other storage
-- buckets keep Supabase's default-deny RLS.
-- The anon API key (NEXT_PUBLIC_SUPABASE_ANON_KEY) ships to every browser
-- and grants:
--   - full read/write/delete on every row in every public table via PostgREST
--   - full read/write/delete on the product-images bucket via Storage API
-- The only authorization layer is the application-side requireAdmin() guard
-- in /api/admin/** route handlers. Direct REST/Storage calls bypass it.
-- Do not store sensitive data in this database or in product-images.

-- ⚠️  NEVER run `prisma migrate dev` / `migrate deploy` / `migrate reset`
-- against this database. Prisma has no migration history for a schema this
-- file owns, so it reports drift and offers to reset — which DROPS the whole
-- `public` schema and every row in it. This file is the only way to apply DDL.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 0. Schema grants.
-- Supabase provisions these when the project is created, but anything that
-- drops and recreates the `public` schema wipes them, and PostgREST then fails
-- every request with `42501 permission denied for schema public`. Re-stating
-- them here keeps this file sufficient to rebuild from nothing.
-- Note this grants the anon role full table access — see the SECURITY note at
-- the top of this file; it is the existing (RLS-disabled) design, not new.
ALTER SCHEMA public OWNER TO pg_database_owner;
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON ROUTINES TO postgres, anon, authenticated, service_role;

-- 1. Table Product
CREATE TABLE "Product" (
  id VARCHAR PRIMARY KEY,
  slug VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  price NUMERIC NOT NULL,
  "originalPrice" NUMERIC,
  description TEXT NOT NULL,
  "longDescription" TEXT,
  image VARCHAR NOT NULL,
  gallery VARCHAR[] DEFAULT '{}',
  badge VARCHAR,
  "badgeColor" VARCHAR,
  stock INTEGER DEFAULT 0,
  rating DOUBLE PRECISION DEFAULT 0.0,
  "reviewCount" INTEGER DEFAULT 0,
  highlights VARCHAR[] DEFAULT '{}',
  "shopeeUrl" VARCHAR NOT NULL DEFAULT ''
);

-- 2. Table ProductSpec (Many-to-One)
CREATE TABLE "ProductSpec" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  label VARCHAR NOT NULL,
  value VARCHAR NOT NULL
);

-- 3. Table TechnicalSpec (Many-to-One)
CREATE TABLE "TechnicalSpec" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  label VARCHAR NOT NULL,
  value VARCHAR NOT NULL
);

-- 4. Table BatchInfo (One-to-One)
CREATE TABLE "BatchInfo" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR UNIQUE NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  "batchNumber" VARCHAR NOT NULL,
  "processingDate" VARCHAR NOT NULL,
  "sourceLocation" VARCHAR NOT NULL,
  certifications VARCHAR[] DEFAULT '{}'
);

-- 5. Table SustainabilityMetric (Many-to-One)
CREATE TABLE "SustainabilityMetric" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  label VARCHAR NOT NULL,
  value VARCHAR NOT NULL,
  icon VARCHAR NOT NULL
);

-- 6. Table UsageApplication (Many-to-One)
CREATE TABLE "UsageApplication" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  icon VARCHAR NOT NULL,
  description TEXT
);

-- 7. Table ComparisonItem (Many-to-One)
CREATE TABLE "ComparisonItem" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  metric VARCHAR NOT NULL,
  "cocopeatPlus" VARCHAR NOT NULL,
  "regularSoil" VARCHAR NOT NULL,
  "peatMoss" VARCHAR NOT NULL,
  "importedCocopeat" VARCHAR NOT NULL
);

-- 8. Table StorageInfo (One-to-One)
CREATE TABLE "StorageInfo" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR UNIQUE NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  instructions VARCHAR[] DEFAULT '{}',
  "shelfLife" VARCHAR NOT NULL,
  "rehydrationTime" VARCHAR NOT NULL,
  "waterRatio" VARCHAR NOT NULL
);

-- 9. Table FarmerPartnership (One-to-One)
CREATE TABLE "FarmerPartnership" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR UNIQUE NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  "farmerCount" INTEGER NOT NULL,
  region VARCHAR NOT NULL,
  description TEXT NOT NULL
);

-- 10. Indices
CREATE INDEX IF NOT EXISTS "idx_product_slug" ON "Product"(slug);
CREATE INDEX IF NOT EXISTS "idx_product_spec_product_id" ON "ProductSpec"("productId");
CREATE INDEX IF NOT EXISTS "idx_technical_spec_product_id" ON "TechnicalSpec"("productId");
CREATE INDEX IF NOT EXISTS "idx_sustainability_metric_product_id" ON "SustainabilityMetric"("productId");
CREATE INDEX IF NOT EXISTS "idx_usage_application_product_id" ON "UsageApplication"("productId");
CREATE INDEX IF NOT EXISTS "idx_comparison_item_product_id" ON "ComparisonItem"("productId");

-- 11. Storage bucket: product-images
-- Public bucket for admin-uploaded product photos. RLS on storage.objects
-- is intentionally NOT configured here — see SECURITY note at the top of
-- this file. Bucket-level constraints (size limit, allowed mime types) still
-- apply.
--
-- ⚠️  REQUIRED FOLLOW-UP: creating the bucket is not enough to make uploads
-- work. Supabase keeps RLS permanently enabled on storage.objects, and a
-- bucket with zero matching policies rejects every write with
-- `new row violates row-level security policy`. After running this file you
-- MUST also run:
--
--     supabase_migrations/004_open_storage_bucket.sql
--
-- Migrations 001-003 are already folded into the table definitions above and
-- do not need re-running on a fresh install; 004 is the only one that does.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 12. Migration helpers (for projects that already have the old schema applied).
-- Run these once if the project was deployed before shopeeUrl + the order purge.
-- Safe to skip on a fresh install (the table create above already includes shopeeUrl).
--
--   ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "shopeeUrl" VARCHAR NOT NULL DEFAULT '';
--   DROP TABLE IF EXISTS "OrderItem" CASCADE;
--   DROP TABLE IF EXISTS "Order" CASCADE;
--   DROP TYPE IF EXISTS "OrderStatus";
--   DROP FUNCTION IF EXISTS create_order(VARCHAR, VARCHAR, VARCHAR, JSONB);
--
-- If a previous deploy applied RLS policies + is_admin() and you want to
-- match this fresh-install schema, run supabase_migrations/003_disable_rls.sql.
