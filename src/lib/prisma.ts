import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from './env';

const connectionString = env.DATABASE_URL;

const prismaClientSingleton = () => {
  // 1. Buat kolam koneksi (pool) ke database PostgreSQL
  const pool = new Pool({ connectionString });

  // 2. Pasang pool tersebut ke dalam Adapter Prisma
  const adapter = new PrismaPg(pool);

  // 3. Masukkan adapter ke dalam Prisma Client
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

export default prisma;

if (env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;