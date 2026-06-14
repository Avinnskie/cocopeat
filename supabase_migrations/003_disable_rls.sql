-- Run once in Supabase Studio → SQL Editor.
--
-- WARNING: This script disables Row Level Security on every product table and
-- removes storage object policies. After running, ANY caller with the anon
-- API key (which is shipped to every browser via NEXT_PUBLIC_SUPABASE_ANON_KEY)
-- can read, insert, update, and delete every row, and upload/delete files in
-- the product-images bucket.
--
-- The only remaining protection is the application-layer guard in
-- /api/admin/** route handlers. Bypassing the Next.js app and hitting PostgREST
-- directly is unauthenticated.
--
-- Idempotent. Safe to re-run.

-- 1. Drop all admin-write + public-read policies on product tables.
DROP POLICY IF EXISTS "product_public_read"           ON "Product";
DROP POLICY IF EXISTS "product_admin_write"           ON "Product";
DROP POLICY IF EXISTS "product_spec_public_read"      ON "ProductSpec";
DROP POLICY IF EXISTS "product_spec_admin_write"      ON "ProductSpec";
DROP POLICY IF EXISTS "technical_spec_public_read"    ON "TechnicalSpec";
DROP POLICY IF EXISTS "technical_spec_admin_write"    ON "TechnicalSpec";
DROP POLICY IF EXISTS "batch_info_public_read"        ON "BatchInfo";
DROP POLICY IF EXISTS "batch_info_admin_write"        ON "BatchInfo";
DROP POLICY IF EXISTS "sustainability_public_read"    ON "SustainabilityMetric";
DROP POLICY IF EXISTS "sustainability_admin_write"    ON "SustainabilityMetric";
DROP POLICY IF EXISTS "usage_application_public_read" ON "UsageApplication";
DROP POLICY IF EXISTS "usage_application_admin_write" ON "UsageApplication";
DROP POLICY IF EXISTS "comparison_public_read"        ON "ComparisonItem";
DROP POLICY IF EXISTS "comparison_admin_write"        ON "ComparisonItem";
DROP POLICY IF EXISTS "storage_public_read"           ON "StorageInfo";
DROP POLICY IF EXISTS "storage_admin_write"           ON "StorageInfo";
DROP POLICY IF EXISTS "farmer_public_read"            ON "FarmerPartnership";
DROP POLICY IF EXISTS "farmer_admin_write"            ON "FarmerPartnership";

-- 2. Disable RLS on every product table.
ALTER TABLE "Product"               DISABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductSpec"           DISABLE ROW LEVEL SECURITY;
ALTER TABLE "TechnicalSpec"         DISABLE ROW LEVEL SECURITY;
ALTER TABLE "BatchInfo"             DISABLE ROW LEVEL SECURITY;
ALTER TABLE "SustainabilityMetric"  DISABLE ROW LEVEL SECURITY;
ALTER TABLE "UsageApplication"      DISABLE ROW LEVEL SECURITY;
ALTER TABLE "ComparisonItem"        DISABLE ROW LEVEL SECURITY;
ALTER TABLE "StorageInfo"           DISABLE ROW LEVEL SECURITY;
ALTER TABLE "FarmerPartnership"     DISABLE ROW LEVEL SECURITY;

-- 3. Drop storage policies on the product-images bucket.
DROP POLICY IF EXISTS "product_images_public_read"  ON storage.objects;
DROP POLICY IF EXISTS "product_images_admin_write"  ON storage.objects;

-- 4. Drop the now-unused is_admin() helper.
DROP FUNCTION IF EXISTS public.is_admin();

-- 5. Force PostgREST to refresh its policy cache.
NOTIFY pgrst, 'reload schema';

-- Verification — both queries should return zero rows for these tables.
-- SELECT tablename FROM pg_tables
--   WHERE schemaname = 'public' AND rowsecurity = true
--     AND tablename IN ('Product', 'ProductSpec', 'TechnicalSpec', 'BatchInfo',
--                       'SustainabilityMetric', 'UsageApplication',
--                       'ComparisonItem', 'StorageInfo', 'FarmerPartnership');
--
-- SELECT policyname FROM pg_policies
--   WHERE schemaname = 'public'
--     AND tablename IN ('Product', 'ProductSpec', 'TechnicalSpec', 'BatchInfo',
--                       'SustainabilityMetric', 'UsageApplication',
--                       'ComparisonItem', 'StorageInfo', 'FarmerPartnership');
