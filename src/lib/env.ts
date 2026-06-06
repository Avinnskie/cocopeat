/**
 * Environment variable validation.
 *
 * Fails fast at module load with a clear, grouped error listing ALL missing
 * required vars at once (instead of one-at-a-time runtime surprises).
 *
 * Contract source of truth: `.env.example` at the project root.
 *
 * Usage:
 *   import { env } from '@/lib/env';
 *   const url = env.DATABASE_URL; // typed as string, guaranteed non-empty
 */

type RequiredKey = 'DATABASE_URL' | 'NEXT_PUBLIC_SUPABASE_URL' | 'NEXT_PUBLIC_SUPABASE_ANON_KEY';

const REQUIRED: readonly RequiredKey[] = [
  'DATABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const;

function readRequired(): Record<RequiredKey, string> {
  const missing: string[] = [];
  const values = {} as Record<RequiredKey, string>;

  for (const key of REQUIRED) {
    const raw = process.env[key];
    if (raw === undefined || raw === '') {
      missing.push(key);
    } else {
      values[key] = raw;
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(', ')}.\n` +
        `See .env.example for the full contract and copy it to .env:\n` +
        `  cp .env.example .env   # (or Copy-Item on Windows)`,
    );
  }

  return values;
}

const required = readRequired();

export const env: Record<RequiredKey, string> & {
  PORT: number;
  FRONTEND_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';
} = {
  // Required
  DATABASE_URL: required.DATABASE_URL,
  NEXT_PUBLIC_SUPABASE_URL: required.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: required.NEXT_PUBLIC_SUPABASE_ANON_KEY,

  // Optional with defaults (keep in sync with .env.example)
  PORT: Number(process.env.PORT) || 4000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  NODE_ENV:
    (process.env.NODE_ENV as 'development' | 'production' | 'test') ||
    'development',
};

// Sanity: PORT must be a valid number if explicitly set
if (process.env.PORT !== undefined && Number.isNaN(Number(process.env.PORT))) {
  throw new Error(
    `Invalid PORT environment variable: "${process.env.PORT}" is not a number.`,
  );
}

// Internal type export for advanced typing needs
export type Env = typeof env;
