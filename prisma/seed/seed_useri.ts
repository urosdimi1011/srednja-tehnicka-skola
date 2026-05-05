import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST ?? "localhost",
  port: Number(process.env.DATABASE_PORT ?? 3307),
  user: process.env.DATABASE_USER ?? "root",
  password: process.env.DATABASE_PASSWORD ?? "4278TgeV?",
  database: process.env.DATABASE_NAME ?? "dositej_db",
  allowPublicKeyRetrieval: true,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

const korisnici = [
  {
    name: "Administrator",
    email: "admin@skola.rs",
    password: "Admin123!",
    role: "ADMIN" as const,
  }
];

async function main() {
  console.log("🌱 Seeding users...\n");

  for (const korisnik of korisnici) {
    const hash = await bcrypt.hash(korisnik.password, 12);

    await prisma.user.upsert({
      where: { email: korisnik.email },
      update: { password: hash, name: korisnik.name, role: korisnik.role },
      create: {
        name: korisnik.name,
        email: korisnik.email,
        password: hash,
        role: korisnik.role,
      },
    });

    console.log(`  ✅ ${korisnik.role} – ${korisnik.email} (lozinka: ${korisnik.password})`);
  }

  console.log("\n✅ Seed završen!");
  console.log("\n⚠️  Promeni lozinke nakon prvog logovanja!");
}

main()
  .catch((e) => {
    console.error("❌ Greška:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());