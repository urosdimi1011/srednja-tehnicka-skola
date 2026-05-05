import { prisma } from "@/api/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /obrazovni-profili  →  svi profili sa smerovima
export async function GET(req: NextRequest) {
  const saSmerovima = req.nextUrl.searchParams.get("saSmerovima") === "true";

  const profili = await prisma.obrazovniProfil.findMany({
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

  return NextResponse.json(profili);
}

// POST /api/obrazovni-profili  →  kreiraj novi profil
export async function POST(req: NextRequest) {
  const body = await req.json();

  const { naziv, slug, vrsta, opis, tags } = body;

  if (!naziv || !slug || !vrsta || !opis) {
    return NextResponse.json(
      { error: "Polja naziv, slug, vrsta i opis su obavezna" },
      { status: 400 }
    );
  }

  const profil = await prisma.obrazovniProfil.create({
    data: {
      naziv,
      slug,
      vrsta,
      opis,
      tags: tags ?? [],
    },
  });

  return NextResponse.json(profil, { status: 201 });
}