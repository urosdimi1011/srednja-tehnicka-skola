import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST ?? "localhost",
  port: Number(process.env.DATABASE_PORT ?? 3306),
  user: process.env.DATABASE_USER ?? "stsedu_uros",
  password: process.env.DATABASE_PASSWORD ?? "n;0S#dIe&TV1",
  database: process.env.DATABASE_NAME ?? "stsedu_dositej_db",
  allowPublicKeyRetrieval: true,
  connectionLimit: 5,
});
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
