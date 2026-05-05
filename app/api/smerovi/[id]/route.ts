import { prisma } from "@/api/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/smerovi/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const smer = await prisma.smer.findUnique({
    where: { id },
    include: {
      galerija: { orderBy: { redosled: "asc" } },
      obrazovniProfil: { select: { naziv: true, slug: true } },
    },
  });

  if (!smer) {
    return NextResponse.json({ error: "Smer nije pronađen" }, { status: 404 });
  }

  return NextResponse.json(smer);
}

// PUT /api/smerovi/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const smer = await prisma.smer.update({
    where: { id },
    data: {
      naziv:               body.naziv,
      slug:                body.slug,
      trajanje:            body.trajanje ? Number(body.trajanje) : undefined,
      opsteInformacije:    body.opsteInformacije    ?? null,
      ciljevi:             body.ciljevi             ?? null,
      poslovnaProhodnost:  body.poslovnaProhodnost  ?? null,
      obrazovnaProhodnost: body.obrazovnaProhodnost ?? null,
      nastavniPlanProgram: body.nastavniPlanProgram ?? null,
      glavnaSlika:         body.glavnaSlika         ?? null,
    },
  });

  return NextResponse.json(smer);
}

// DELETE /api/smerovi/:id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.smer.delete({ where: { id } });

  return NextResponse.json({ success: true });
}