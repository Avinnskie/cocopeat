-- Run once in Supabase Studio → SQL Editor on existing projects.
-- Adds the missing shopeeUrl column to Product and forces PostgREST to
-- reload its schema cache so the column is queryable immediately.

ALTER TABLE "Product"
  ADD COLUMN IF NOT EXISTS "shopeeUrl" VARCHAR NOT NULL DEFAULT '';

NOTIFY pgrst, 'reload schema';
