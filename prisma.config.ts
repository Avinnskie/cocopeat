import "dotenv/config";

import { defineConfig } from "prisma/config";

/**
 * Prisma CLI configuration (Prisma 7 no longer reads `package.json#prisma`,
 * and no longer auto-loads `.env` — hence the import above).
 *
 * `datasource.url` is only used by CLI commands that talk to the database
 * (`db pull`, `studio`). It must be the DIRECT connection on port 5432:
 * Supabase's transaction pooler (port 6543) cannot run the introspection and
 * advisory-lock queries these commands issue.
 *
 * Read via `process.env` rather than Prisma's `env()` helper on purpose:
 * `env()` throws at config-load time when the variable is missing, which would
 * break `prisma generate` — a purely offline codegen step that needs no
 * database. CI and deploy targets run `generate` during install without any
 * DIRECT_URL set, so this must stay lazy. Commands that genuinely need a
 * connection still fail with Prisma's own missing-datasource error.
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
    url: process.env.DIRECT_URL || undefined,
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
