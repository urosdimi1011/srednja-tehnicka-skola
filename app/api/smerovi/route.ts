import { prisma } from "@/api/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/smerovi?obrazovniProfilId=xxx
export async function GET(req: NextRequest) {
  const obrazovniProfilId = req.nextUrl.searchParams.get("obrazovniProfilId");

  const smerovi = await prisma.smer.findMany({
    where: {
      ...(obrazovniProfilId ? { obrazovniProfilId } : {}),
    },
    include: {
      galerija: { orderBy: { redosled: "asc" } },
      obrazovniProfil: { select: { naziv: true, slug: true } },
    },
    orderBy: { naziv: "asc" },
  });

  return NextResponse.json(smerovi);
}

// POST /api/smerovi
export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    obrazovniProfilId,
    naziv,
    slug,
    trajanje,
    opsteInformacije,
    ciljevi,
    poslovnaProhodnost,
    obrazovnaProhodnost,
    nastavniPlanProgram,
    glavnaSlika,
  } = body;

  if (!obrazovniProfilId || !naziv || !slug || !trajanje) {
    return NextResponse.json(
      { error: "Polja obrazovniProfilId, naziv, slug i trajanje su obavezna" },
      { status: 400 }
    );
  }

  const smer = await prisma.smer.create({
    data: {
      obrazovniProfilId,
      naziv,
      slug,
      trajanje:            Number(trajanje),
      opsteInformacije:    opsteInformacije    ?? null,
      ciljevi:             ciljevi             ?? null,
      poslovnaProhodnost:  poslovnaProhodnost  ?? null,
      obrazovnaProhodnost: obrazovnaProhodnost ?? null,
      nastavniPlanProgram: nastavniPlanProgram ?? null,
      glavnaSlika:         glavnaSlika         ?? null,
    },
  });

  return NextResponse.json(smer, { status: 201 });
}