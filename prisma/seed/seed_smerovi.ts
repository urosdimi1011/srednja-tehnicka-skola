import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
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

const prisma = new PrismaClient({ adapter });

const smeroviPoProfilima: Record<
  string,
  { naziv: string; slug: string; trajanje: number }[]
> = {
  "elektrotehnika-racunarstvo": [
    { naziv: "ИТ техничар", slug: "it-tehnicar", trajanje: 4 },
    {
      naziv: "Електротехничар рачунара",
      slug: "elektrotehnicar-racunara",
      trajanje: 4,
    },
    {
      naziv: "Администратор рачунарских мрежа",
      slug: "administrator-racunarskih-mreza",
      trajanje: 4,
    },
    {
      naziv: "Електротехничар рачунара -специјалиста-",
      slug: "elektrotehnicar-racunara-specijalista",
      trajanje: 1,
    },
  ],

  "turizam-ugostiteljstvo": [
    {
      naziv: "Туристички организатор -специјалиста-",
      slug: "turisticki-organizator-specijalista",
      trajanje: 1,
    },
    {
      naziv: "Угоститељски техничар",
      slug: "ugostiteljski-tehnicar",
      trajanje: 4,
    },
    { naziv: "Кулинарски техничар", slug: "kulinarski-tehnicar", trajanje: 4 },
    { naziv: "Конобар", slug: "konobar", trajanje: 3 },
    { naziv: "Кувар", slug: "kuvar", trajanje: 3 },
  ],

  "gradjevinska-skola": [
    {
      naziv: "Архитектонски техничар",
      slug: "arhitektonski-tehnicar",
      trajanje: 4,
    },
    {
      naziv: "Руковалац грађевинском механизацијом",
      slug: "rukovalac-gradjevinskom-mehanizacijom",
      trajanje: 3,
    },
    {
      naziv: "Мајстор за грађевинску механизацију -специјалиста-",
      slug: "majstor-gradjevinska-mehanizacija-specijalista",
      trajanje: 1,
    },
    {
      naziv: "Грађевински техничар за нискоградњу",
      slug: "gradjevinski-tehnicar-niskogradnja",
      trajanje: 4,
    },
    {
      naziv: "Декоратер зидних површина -молер-",
      slug: "dekorater-zidnih-povrsina-moler",
      trajanje: 3,
    },
    {
      naziv:
        "Мајстор за кућне водоводне и канализационе инсталације -специјалиста-",
      slug: "majstor-vodovodne-kanalizacione-instalacije-specijalista",
      trajanje: 1,
    },
    { naziv: "Керамичар", slug: "keramicar", trajanje: 3 },
    {
      naziv: "Хидрограђевинар (водоинсталатер)",
      slug: "hidrogradjevinar-vodoinstalater",
      trajanje: 3,
    },
    { naziv: "Зидар", slug: "zidar", trajanje: 3 },
    { naziv: "Армирач - бетонирац", slug: "armirac-betonirec", trajanje: 3 },
    { naziv: "Тесар", slug: "tesar", trajanje: 3 },
  ],

  saobracaj: [
    {
      naziv: "Возач моторних возила",
      slug: "vozac-motornih-vozila",
      trajanje: 3,
    },
    {
      naziv: "Возач моторних возила -специјалиста-",
      slug: "vozac-motornih-vozila-specijalista",
      trajanje: 1,
    },
    {
      naziv: "Техничар друмског саобраћаја",
      slug: "tehnicar-drumskog-saobracaja",
      trajanje: 4,
    },
    {
      naziv: "Инструктор вожње -специјалиста-",
      slug: "instruktor-voznje-specijalista",
      trajanje: 1,
    },
  ],

  "masinstvo-obrada-metala": [
    { naziv: "Аутомеханичар", slug: "automehanicar", trajanje: 3 },
    { naziv: "Аутолимар", slug: "autolimar", trajanje: 3 },
    {
      naziv: "Аутомеханичар -специјалиста-",
      slug: "automehanicar-specijalista",
      trajanje: 1,
    },
    { naziv: "Лимар", slug: "limar", trajanje: 3 },
    { naziv: "Заваривач", slug: "zavarivac", trajanje: 3 },
  ],
};

async function main() {
  console.log("🌱 Seeding smerovi...\n");

  for (const [profilSlug, smerovi] of Object.entries(smeroviPoProfilima)) {
    const profil = await prisma.obrazovniProfil.findUnique({
      where: { slug: profilSlug },
    });

    if (!profil) {
      console.log(`  ⚠️  Profil "${profilSlug}" nije pronađen – preskačem`);
      continue;
    }

    console.log(`📚 ${profil.naziv}`);

    for (const smer of smerovi) {
      await prisma.smer.upsert({
        where: { slug: smer.slug },
        update: { naziv: smer.naziv, trajanje: smer.trajanje },
        create: {
          naziv: smer.naziv,
          slug: smer.slug,
          trajanje: smer.trajanje,
          obrazovniProfilId: profil.id,
        },
      });
      console.log(
        `  ✅ ${smer.naziv} (${smer.trajanje} ${smer.trajanje === 1 ? "godina" : "godine"})`,
      );
    }

    console.log("");
  }

  console.log("✅ Seed završen!");
}

main()
  .catch((e) => {
    console.error("❌ Greška:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
