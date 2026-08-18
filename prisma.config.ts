import "dotenv/config";

import { defineConfig, env } from "prisma/config";

/**
 * Prisma CLI configuration (Prisma 7 no longer reads `package.json#prisma`,
 * and no longer auto-loads `.env` — hence the import above).
 *
 * `datasource.url` is only used by CLI commands (`db pull`, `studio`,
 * `validate`). It must be the DIRECT connection on port 5432: Supabase's
 * transaction pooler (port 6543) cannot run the introspection and advisory-lock
 * queries these commands issue.
 *
 * Runtime queries do NOT come through here — `src/lib/prisma.ts` opens its own
 * pooled connection via the `@prisma/adapter-pg` driver adapter.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",

  experimental: {
    // Required to declare Supabase-owned tables as `external` below.
    externalTables: true,
  },

  datasource: {
    url: env("DIRECT_URL"),
  },

  tables: {
    // Supabase owns the DDL for these tables (supabase_schema.sql +
    // supabase_migrations/). Marking them external keeps Prisma from ever
    // generating migrations that would fight the SQL source of truth.
    external: [
      "public.Product",
      "public.ProductSpec",
      "public.TechnicalSpec",
      "public.BatchInfo",
      "public.SustainabilityMetric",
      "public.UsageApplication",
      "public.ComparisonItem",
      "public.StorageInfo",
      "public.FarmerPartnership",
    ],
  },
});
