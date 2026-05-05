import { prisma } from "@/api/prisma";

export async function getSviSmerovi(obrazovniProfilId?: string) {
  return prisma.smer.findMany({
    where: { ...(obrazovniProfilId ? { obrazovniProfilId } : {}) },
    include: {
      galerija: { orderBy: { redosled: "asc" } },
      obrazovniProfil: { select: { naziv: true, slug: true } },
    },
    orderBy: { naziv: "asc" },
  });
}

export async function getSmerBySlug(slug: string) {
  return prisma.smer.findUnique({
    where: { slug },
    include: {
      galerija: { orderBy: { redosled: "asc" } },
      obrazovniProfil: { select: { naziv: true, slug: true } },
    },
  });
}

export async function kreirajSmer(data: {
  obrazovniProfilId: string;
  naziv: string;
  slug: string;
  trajanje: number;
  opsteInformacije?: string;
  ciljevi?: string;
  poslovnaProhodnost?: string;
  obrazovnaProhodnost?: string;
  nastavniPlanProgram?: string;
  glavnaSlika?: string;
}) {
  return prisma.smer.create({ data });
}

export async function azurirajSmer(id: string, data: Partial<any>) {
  return prisma.smer.update({ where: { id }, data });
}

export async function obrisiSmer(id: string) {
  return prisma.smer.delete({ where: { id } });
}