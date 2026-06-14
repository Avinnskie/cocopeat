-- Run once in Supabase Studio → SQL Editor.
--
-- Backfills RLS policies on the 8 product-relation tables for projects whose
-- live DB was created before sections 11-12 of supabase_schema.sql existed.
-- Idempotent: every CREATE POLICY is preceded by a DROP IF EXISTS, and the
-- ENABLE ROW LEVEL SECURITY statements are no-ops if already enabled.
--
-- Required pre-condition: public.is_admin() must already exist. Run the
-- bootstrap first if not (see supabase_storage_bootstrap.sql).

ALTER TABLE "ProductSpec"           ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TechnicalSpec"         ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BatchInfo"             ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SustainabilityMetric"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UsageApplication"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ComparisonItem"        ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StorageInfo"           ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FarmerPartnership"     ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "product_spec_public_read"   ON "ProductSpec";
CREATE POLICY "product_spec_public_read" ON "ProductSpec"
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "product_spec_admin_write"   ON "ProductSpec";
CREATE POLICY "product_spec_admin_write" ON "ProductSpec"
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "technical_spec_public_read" ON "TechnicalSpec";
CREATE POLICY "technical_spec_public_read" ON "TechnicalSpec"
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "technical_spec_admin_write" ON "TechnicalSpec";
CREATE POLICY "technical_spec_admin_write" ON "TechnicalSpec"
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "batch_info_public_read"     ON "BatchInfo";
CREATE POLICY "batch_info_public_read" ON "BatchInfo"
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "batch_info_admin_write"     ON "BatchInfo";
CREATE POLICY "batch_info_admin_write" ON "BatchInfo"
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "sustainability_public_read" ON "SustainabilityMetric";
CREATE POLICY "sustainability_public_read" ON "SustainabilityMetric"
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "sustainability_admin_write" ON "SustainabilityMetric";
CREATE POLICY "sustainability_admin_write" ON "SustainabilityMetric"
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "usage_application_public_read" ON "UsageApplication";
CREATE POLICY "usage_application_public_read" ON "UsageApplication"
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "usage_application_admin_write" ON "UsageApplication";
CREATE POLICY "usage_application_admin_write" ON "UsageApplication"
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "comparison_public_read"     ON "ComparisonItem";
CREATE POLICY "comparison_public_read" ON "ComparisonItem"
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "comparison_admin_write"     ON "ComparisonItem";
CREATE POLICY "comparison_admin_write" ON "ComparisonItem"
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "storage_public_read"        ON "StorageInfo";
CREATE POLICY "storage_public_read" ON "StorageInfo"
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "storage_admin_write"        ON "StorageInfo";
CREATE POLICY "storage_admin_write" ON "StorageInfo"
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "farmer_public_read"         ON "FarmerPartnership";
CREATE POLICY "farmer_public_read" ON "FarmerPartnership"
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "farmer_admin_write"         ON "FarmerPartnership";
CREATE POLICY "farmer_admin_write" ON "FarmerPartnership"
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

NOTIFY pgrst, 'reload schema';

-- Verification query — should return 18 rows total (2 per table):
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN (
    'ProductSpec', 'TechnicalSpec', 'BatchInfo', 'SustainabilityMetric',
    'UsageApplication', 'ComparisonItem', 'StorageInfo', 'FarmerPartnership'
  )
ORDER BY tablename, cmd;
