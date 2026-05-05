import { prisma } from "@/api/prisma";

export interface KreirajObavestenjeData {
  title: string;
  content: string;
  publishedAt?: Date | string;
  isActive?: boolean;
}

export interface AzurirajObavestenjeData extends Partial<KreirajObavestenjeData> {}

// Sva obaveštenja – opciono samo aktivna
export async function getSvaObavestenja(samoAktivna = false) {
  return prisma.obavestenje.findMany({
    where: samoAktivna ? { isActive: true } : undefined,
    orderBy: { publishedAt: "desc" },
  });
}

// Poslednja N aktivna obaveštenja (za homepage)
export async function getAktivnaObavestenja(limit = 3) {
  return prisma.obavestenje.findMany({
    where: { isActive: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

// Jedno obaveštenje po ID-u
export async function getObavestenjeById(id: number) {
  return prisma.obavestenje.findUnique({
    where: { id },
  });
}

// Kreiraj obaveštenje
export async function kreirajObavestenje(data: KreirajObavestenjeData) {
  return prisma.obavestenje.create({
    data: {
      title:       data.title,
      content:     data.content,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      isActive:    data.isActive ?? true,
    },
  });
}

// Ažuriraj obaveštenje
export async function azurirajObavestenje(id: number, data: AzurirajObavestenjeData) {
  return prisma.obavestenje.update({
    where: { id },
    data: {
      ...(data.title       !== undefined && { title:       data.title }),
      ...(data.content     !== undefined && { content:     data.content }),
      ...(data.publishedAt !== undefined && { publishedAt: new Date(data.publishedAt) }),
      ...(data.isActive    !== undefined && { isActive:    data.isActive }),
    },
  });
}

// Obriši obaveštenje
export async function obrisiObavestenje(id: number) {
  return prisma.obavestenje.delete({ where: { id } });
}