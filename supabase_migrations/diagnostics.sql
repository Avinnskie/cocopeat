-- Diagnostic queries for the "new row violates row-level security policy"
-- error on the Product table (and its relations).
--
-- Run these in Supabase Studio → SQL Editor in order. The first one that
-- returns an unexpected result is your problem. Each block is independent
-- and read-only unless explicitly noted.
--
-- Pair this file with the browser-side check at /api/admin/whoami
-- which returns a JSON diagnosis from the running app's perspective.

-- =============================================================================
-- 1. Does the admin user exist and have role=admin in app_metadata?
-- =============================================================================
-- Replace the email if your ADMIN_EMAIL is different.
SELECT
  id,
  email,
  raw_app_meta_data,
  raw_user_meta_data,
  raw_app_meta_data ? 'role'                AS has_role_key,
  raw_app_meta_data ->> 'role'              AS role_value,
  (raw_app_meta_data ->> 'role') = 'admin'  AS is_admin_in_metadata
FROM auth.users
WHERE email = 'admin@agropunggur.id';

-- Expected: 1 row, role_value = 'admin', is_admin_in_metadata = true.
-- If row missing → user was never created. Hit POST /api/admin/seed.
-- If is_admin_in_metadata = false → run fix block A below.


-- =============================================================================
-- 2. Does the is_admin() function exist with correct definition?
-- =============================================================================
SELECT
  n.nspname            AS schema,
  p.proname            AS function_name,
  pg_get_function_result(p.oid) AS returns,
  p.prosecdef          AS security_definer,
  pg_get_functiondef(p.oid) AS definition
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE p.proname = 'is_admin' AND n.nspname = 'public';

-- Expected: 1 row, returns=boolean, security_definer=true,
-- definition contains "auth.jwt() -> 'app_metadata' ->> 'role'".
-- If 0 rows → run fix block B below.


-- =============================================================================
-- 3. Does is_admin() have EXECUTE granted to authenticated role?
-- =============================================================================
SELECT
  grantee,
  privilege_type
FROM information_schema.routine_privileges
WHERE routine_schema = 'public'
  AND routine_name = 'is_admin'
ORDER BY grantee;

-- Expected: rows for both 'anon' and 'authenticated' with EXECUTE.
-- If 'authenticated' is missing → run fix block B below.


-- =============================================================================
-- 4. Are RLS policies present on every public table?
-- =============================================================================
SELECT
  tablename,
  policyname,
  cmd,
  qual::text   AS using_expression,
  with_check::text AS with_check_expression
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN (
    'Product', 'ProductSpec', 'TechnicalSpec', 'BatchInfo',
    'SustainabilityMetric', 'UsageApplication', 'ComparisonItem',
    'StorageInfo', 'FarmerPartnership'
  )
ORDER BY tablename, cmd;

-- Expected: 18 rows total (2 per table: *_public_read SELECT + *_admin_write ALL).
-- If any *_admin_write row is missing → re-run sections 11-12 of supabase_schema.sql.


-- =============================================================================
-- 5. Is RLS actually enabled on those tables?
-- =============================================================================
SELECT
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'Product', 'ProductSpec', 'TechnicalSpec', 'BatchInfo',
    'SustainabilityMetric', 'UsageApplication', 'ComparisonItem',
    'StorageInfo', 'FarmerPartnership'
  )
ORDER BY tablename;

-- Expected: rls_enabled = true for all 9 tables.
-- If any false → ALTER TABLE "<name>" ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 6. Are storage policies on the product-images bucket present?
-- =============================================================================
SELECT
  policyname,
  cmd,
  qual::text   AS using_expression,
  with_check::text AS with_check_expression
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
  AND policyname LIKE 'product_images%'
ORDER BY policyname;

-- Expected: 2 rows (product_images_public_read SELECT, product_images_admin_write ALL).
-- If 0 rows → run supabase_storage_bootstrap.sql.


-- =============================================================================
-- 7. Does the product-images bucket exist with the right config?
-- =============================================================================
SELECT
  id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE id = 'product-images';

-- Expected: 1 row, public=true, file_size_limit=5242880,
-- allowed_mime_types contains image/jpeg, image/png, image/webp.


-- =============================================================================
-- FIX BLOCK A — Promote existing user to admin
-- =============================================================================
-- Run if query 1 showed the user exists but is_admin_in_metadata=false.
-- After running, SIGN OUT AND SIGN IN AGAIN in the browser to refresh the JWT.

-- UPDATE auth.users
-- SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb)
--                         || '{"role":"admin"}'::jsonb
-- WHERE email = 'admin@agropunggur.id';


-- =============================================================================
-- FIX BLOCK B — Recreate is_admin() with correct grants
-- =============================================================================
-- Run if query 2 returned 0 rows or query 3 showed missing grants.

-- CREATE OR REPLACE FUNCTION public.is_admin() RETURNS BOOLEAN
-- LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
-- AS $$
--   SELECT COALESCE(
--     (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
--     false
--   );
-- $$;
--
-- GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;
-- NOTIFY pgrst, 'reload schema';
