import { prisma } from "@/api/prisma";

export async function getSviAlbumi(samoVidljivi = false) {
  return prisma.galerijaAlbum.findMany({
    where: samoVidljivi ? { vidljiv: true } : undefined,
    orderBy: [{ redosled: "asc" }, { createdAt: "desc" }],
    include: {
      slike: {
        orderBy: { redosled: "asc" },
        take: 1, // samo prva slika za cover preview
      },
      _count: { select: { slike: true } },
    },
  });
}

// Jedan album sa svim slikama
export async function getAlbumById(id: string) {
  return prisma.galerijaAlbum.findUnique({
    where: { id },
    include: {
      slike: { orderBy: { redosled: "asc" } },
    },
  });
}

// Kreiraj album
export async function kreirajAlbum(data: {
  naziv: string;
  opis?: string;
  kategorija?: string;
  coverSlika?: string;
  vidljiv?: boolean;
}) {
  return prisma.galerijaAlbum.create({ data });
}

// Ažuriraj album
export async function azurirajAlbum(id: string, data: Partial<{
  naziv: string;
  opis: string;
  kategorija: string;
  coverSlika: string;
  vidljiv: boolean;
  redosled: number;
}>) {
  return prisma.galerijaAlbum.update({ where: { id }, data });
}

// Obriši album
export async function obrisiAlbum(id: string) {
  return prisma.galerijaAlbum.delete({ where: { id } });
}

// Dodaj sliku u album
export async function dodajSlikuUAlbum(albumId: string, url: string, naziv?: string) {
  const max = await prisma.galerijaSlika.aggregate({
    where: { albumId },
    _max: { redosled: true },
  });
  return prisma.galerijaSlika.create({
    data: { albumId, url, naziv, redosled: (max._max.redosled ?? 0) + 1 },
  });
}

// Obriši sliku iz albuma
export async function obrisiSlikuIzAlbuma(slikaId: string) {
  return prisma.galerijaSlika.delete({ where: { id: slikaId } });
}