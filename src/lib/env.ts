type RequiredKey =
  | "NEXT_PUBLIC_SUPABASE_URL"
  | "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  | "SUPABASE_SERVICE_ROLE_KEY"
  | "ADMIN_EMAIL"
  | "ADMIN_PASSWORD";

const REQUIRED: readonly RequiredKey[] = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
] as const;

function readRequired(): Record<RequiredKey, string> {
  const missing: string[] = [];
  const values = {} as Record<RequiredKey, string>;

  for (const key of REQUIRED) {
    const raw = process.env[key];
    if (raw === undefined || raw === "") {
      missing.push(key);
    } else {
      values[key] = raw;
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(", ")}.\n` +
        `See .env.example for the full contract and copy it to .env:\n` +
        `  cp .env.example .env   # (or Copy-Item on Windows)`,
    );
  }

  return values;
}

const required = readRequired();

export const env: Record<RequiredKey, string> & {
  NODE_ENV: "development" | "production" | "test";
} = {
  NEXT_PUBLIC_SUPABASE_URL: required.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: required.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: required.SUPABASE_SERVICE_ROLE_KEY,
  ADMIN_EMAIL: required.ADMIN_EMAIL,
  ADMIN_PASSWORD: required.ADMIN_PASSWORD,

  NODE_ENV:
    (process.env.NODE_ENV as "development" | "production" | "test") ||
    "development",
};

export type Env = typeof env;
