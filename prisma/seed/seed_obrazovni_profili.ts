import { PrismaClient, VrstaProfila } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST ?? "localhost",
  port: Number(process.env.DATABASE_PORT ?? 3307),
  user: process.env.DATABASE_USER ?? "root",
  password: process.env.DATABASE_PASSWORD ?? "4278TgeV?",
  database: process.env.DATABASE_NAME ?? "dositej_db",
  allowPublicKeyRetrieval: true,
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });

const profili = [
  {
    naziv: "Електротехника и рачунарство",
    slug: "elektrotehnika-racunarstvo",
    trajanje: 4,
    vrsta: VrstaProfila.STRUCNO,
    opis: "Пројектовање, одржавање и дијагностика рачунарских система, мрежа и електронских уређаја.",
    tags: ["Рачунари", "Електроника", "Мреже"],
  },
  {
    naziv:
      "Одељење ученика са посебним способностима за рачунарство и информатику",
    slug: "posebne-sposobnosti-racunarstvo",
    trajanje: 4,
    vrsta: VrstaProfila.STRUCNO,
    opis: "Програмирање, базе података, веб технологије и информациони системи за надарене ученике.",
    tags: ["Програмирање", "Базе података", "Веб"],
  },
  {
    naziv: "Туризам и угоститељство",
    slug: "turizam-ugostiteljstvo",
    trajanje: 4,
    vrsta: VrstaProfila.STRUCNO,
    opis: "Организација туристичких путовања, рецепција, угоститељске услуге и менаџмент у хотелијерству.",
    tags: ["Туризам", "Хотелијерство", "Угоститељство"],
  },
  {
    naziv: "Грађевинска школа",
    slug: "gradjevinska-skola",
    trajanje: 4,
    vrsta: VrstaProfila.STRUCNO,
    opis: "Пројектовање, извођење и надзор грађевинских радова, инсталација и конструкција.",
    tags: ["Грађевина", "Конструкције", "Пројектовање"],
  },
  {
    naziv: "Саобраћај",
    slug: "saobracaj",
    trajanje: 3,
    vrsta: VrstaProfila.STRUCNO,
    opis: "Организација и безбедност саобраћаја, логистика и управљање транспортним процесима.",
    tags: ["Саобраћај", "Логистика", "Транспорт"],
  },
  {
    naziv: "Машинство и обрада метала",
    slug: "masinstvo-obrada-metala",
    trajanje: 3,
    vrsta: VrstaProfila.STRUCNO,
    opis: "Рад на машинама за обраду метала, заваривање, CNC технологије и одржавање механичких система.",
    tags: ["Машинство", "Метал", "CNC"],
  },
];

async function main() {
  console.log("🌱 Seeding obrazovni profili...");

  for (const profil of profili) {
    await prisma.obrazovniProfil.upsert({
      where: { slug: profil.slug },
      update: profil,
      create: profil,
    });
    console.log(`  ✅ ${profil.naziv}`);
  }

  console.log("✅ Seed završen!");
}

main()
  .catch((e) => {
    console.error("❌ Greška:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
