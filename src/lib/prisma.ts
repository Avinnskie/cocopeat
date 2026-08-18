import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";
import { env } from "@/lib/env";

/**
 * Prisma client, backed by the `pg` driver adapter (required in Prisma 7 —
 * there is no bundled query engine binary anymore).
 *
 * Connects through DATABASE_URL, which points at Supabase's transaction pooler
 * (port 6543). The adapter opens its own pool, so `connection_limit=1` in that
 * URL is what keeps a serverless deploy from exhausting pooler slots. CLI
 * commands use DIRECT_URL instead — see prisma.config.ts.
 *
 * Note this is a secondary access path: the app's primary data layer is the
 * Supabase client in src/lib/supabase/. Prisma is here for typed relational
 * queries that PostgREST expresses awkwardly.
 */
const prismaClientSingleton = () =>
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: env.DATABASE_URL }),
  });

const globalForPrisma = globalThis as unknown as {
  prismaGlobal?: ReturnType<typeof prismaClientSingleton>;
};

export const prisma = globalForPrisma.prismaGlobal ?? prismaClientSingleton();

// Cache across dev hot-reloads so Turbopack does not open a new pool per edit.
if (env.NODE_ENV !== "production") {
  globalForPrisma.prismaGlobal = prisma;
}

export const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

export default prisma;
