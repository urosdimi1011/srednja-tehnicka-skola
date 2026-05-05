import { prisma } from "@/api/prisma";
import { VrstaProfila } from "@prisma/client";

export interface KreirajProfilData {
  naziv: string;
  slug: string;
  vrsta: VrstaProfila;
  opis: string;
  tags?: string[];
}

export interface AzurirajProfilData extends Partial<KreirajProfilData> {}

// Svi profili – opciono sa smerovima
export async function getSviProfili(saSmerovima = false) {
  return prisma.obrazovniProfil.findMany({
    include: saSmerovima
      ? {
          smerovi: {
            orderBy: { naziv: "asc" },
            select: { id: true, naziv: true, slug: true, trajanje: true },
          },
        }
      : undefined,
    orderBy: { naziv: "asc" },
  });
}

// Jedan profil po ID-u ili slugu – sa svim smerovima i galerijom
export async function getProfilByIdOrSlug(idOrSlug: string) {
  return prisma.obrazovniProfil.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
    include: {
      smerovi: {
        orderBy: { naziv: "asc" },
        include: {
          galerija: { orderBy: { redosled: "asc" } },
        },
      },
    },
  });
}

// Jedan profil po slugu – samo smerovi (za stranicu profila)
export async function getProfilBySLug(slug: string) {
  return prisma.obrazovniProfil.findUnique({
    where: { slug },
    include: {
      smerovi: {
        orderBy: { naziv: "asc" },
        select: { id: true, naziv: true, slug: true, trajanje: true, glavnaSlika: true },
      },
    },
  });
}

// Kreiraj profil
export async function kreirajProfil(data: KreirajProfilData) {
  return prisma.obrazovniProfil.create({
    data: {
      naziv: data.naziv,
      slug:  data.slug,
      vrsta: data.vrsta,
      opis:  data.opis,
      tags:  data.tags ?? [],
    },
  });
}

// Ažuriraj profil
export async function azurirajProfil(id: string, data: AzurirajProfilData) {
  return prisma.obrazovniProfil.update({
    where: { id },
    data: {
      ...(data.naziv !== undefined && { naziv: data.naziv }),
      ...(data.slug  !== undefined && { slug:  data.slug  }),
      ...(data.vrsta !== undefined && { vrsta: data.vrsta }),
      ...(data.opis  !== undefined && { opis:  data.opis  }),
      ...(data.tags  !== undefined && { tags:  data.tags  }),
    },
  });
}

// Obriši profil (kaskadno briše smerove zbog onDelete: Cascade)
export async function obrisiProfil(id: string) {
  return prisma.obrazovniProfil.delete({ where: { id } });
}