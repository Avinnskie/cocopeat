/**
 * Environment contract.
 *
 * Public vars are needed by every rendered page, so they are validated eagerly
 * at module load. Admin vars are only needed by the service-role client and the
 * admin seeder, so they are validated lazily on first access — a missing admin
 * secret must not break rendering of the public catalog.
 */

type PublicKey = "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY";

type AdminKey =
  | "SUPABASE_SERVICE_ROLE_KEY"
  | "ADMIN_EMAIL"
  | "ADMIN_PASSWORD";

/** Only read by the Prisma client in src/lib/prisma.ts. */
type DatabaseKey = "DATABASE_URL";

const PUBLIC_KEYS: readonly PublicKey[] = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

const ADMIN_KEYS: readonly AdminKey[] = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
] as const;

const DATABASE_KEYS: readonly DatabaseKey[] = ["DATABASE_URL"] as const;

function missingEnvError(missing: readonly string[]): Error {
  return new Error(
    `Missing required environment variable(s): ${missing.join(", ")}.\n` +
      `See .env.example for the full contract and copy it to .env:\n` +
      `  cp .env.example .env   # (or Copy-Item on Windows)`,
  );
}

function readGroup<K extends string>(keys: readonly K[]): Record<K, string> {
  const missing: string[] = [];
  const values = {} as Record<K, string>;

  for (const key of keys) {
    const raw = process.env[key];
    if (raw === undefined || raw === "") {
      missing.push(key);
    } else {
      values[key] = raw;
    }
  }

  if (missing.length > 0) {
    throw missingEnvError(missing);
  }

  return values;
}

const publicEnv = readGroup(PUBLIC_KEYS);

let adminEnv: Record<AdminKey, string> | null = null;

/**
 * Validates the whole admin group on first access so a single failure reports
 * every missing key at once instead of one per request.
 */
function readAdmin(): Record<AdminKey, string> {
  adminEnv ??= readGroup(ADMIN_KEYS);
  return adminEnv;
}

let databaseEnv: Record<DatabaseKey, string> | null = null;

function readDatabase(): Record<DatabaseKey, string> {
  databaseEnv ??= readGroup(DATABASE_KEYS);
  return databaseEnv;
}

export const env: Record<PublicKey | AdminKey | DatabaseKey, string> & {
  NODE_ENV: "development" | "production" | "test";
} = {
  NEXT_PUBLIC_SUPABASE_URL: publicEnv.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,

  get SUPABASE_SERVICE_ROLE_KEY() {
    return readAdmin().SUPABASE_SERVICE_ROLE_KEY;
  },
  get ADMIN_EMAIL() {
    return readAdmin().ADMIN_EMAIL;
  },
  get ADMIN_PASSWORD() {
    return readAdmin().ADMIN_PASSWORD;
  },

  get DATABASE_URL() {
    return readDatabase().DATABASE_URL;
  },

  NODE_ENV:
    (process.env.NODE_ENV as "development" | "production" | "test") ||
    "development",
};

export type Env = typeof env;
