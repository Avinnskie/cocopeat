-- Run once in Supabase Studio → SQL Editor.
--
-- Adds a single permissive RLS policy that fully opens the product-images
-- bucket to anyone with the anon API key. Supabase does not allow
-- disabling RLS on storage.objects (the table is owned by an internal role),
-- so the equivalent effect must be expressed as a policy.
--
-- WARNING: After this runs, ANY caller holding the anon API key (which
-- ships to every browser via NEXT_PUBLIC_SUPABASE_ANON_KEY) can read,
-- upload, modify, or delete any file inside the product-images bucket.
-- Other buckets in this Supabase project are unaffected and keep their
-- default policies.
--
-- The bucket's allowed_mime_types and file_size_limit constraints still
-- apply at the storage layer.
--
-- Idempotent. Safe to re-run.

DROP POLICY IF EXISTS "product_images_public_read" ON storage.objects;
DROP POLICY IF EXISTS "product_images_admin_write" ON storage.objects;
DROP POLICY IF EXISTS "product_images_open"        ON storage.objects;

CREATE POLICY "product_images_open" ON storage.objects
  FOR ALL
  TO anon, authenticated
  USING (bucket_id = 'product-images')
  WITH CHECK (bucket_id = 'product-images');

-- Verification: should return one row with cmd='ALL'.
--   SELECT policyname, cmd, roles
--   FROM pg_policies
--   WHERE schemaname = 'storage'
--     AND tablename = 'objects'
--     AND policyname = 'product_images_open';
