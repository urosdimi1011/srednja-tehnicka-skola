import { prisma } from "@/api/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/obrazovni-profili/:id  →  jedan profil po ID-u ili slugu
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Traži po ID-u ili slugu
  const profil = await prisma.obrazovniProfil.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
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

  if (!profil) {
    return NextResponse.json({ error: "Profil nije pronađen" }, { status: 404 });
  }

  return NextResponse.json(profil);
}

// PUT /api/obrazovni-profili/:id  →  ažuriraj profil
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const profil = await prisma.obrazovniProfil.update({
    where: { id },
    data: {
      naziv: body.naziv,
      slug:  body.slug,
      vrsta: body.vrsta,
      opis:  body.opis,
      tags:  body.tags ?? [],
    },
  });

  return NextResponse.json(profil);
}

// DELETE /api/obrazovni-profili/:id  →  obriši profil (kaskadno briše smerove)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.obrazovniProfil.delete({ where: { id } });

  return NextResponse.json({ success: true });
}