import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/api/prisma";

// GET /api/smerovi/[id]/galerija
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const slike = await prisma.slika.findMany({
    where: { smerId: id },
    orderBy: { redosled: "asc" },
  });

  return NextResponse.json(slike);
}

// POST /api/smerovi/[id]/galerija – dodaj sliku
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { url, naziv } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL je obavezan" }, { status: 400 });
  }

  // Pronađi trenutni max redosled
  const maxRedosled = await prisma.slika.aggregate({
    where: { smerId: id },
    _max: { redosled: true },
  });

  const slika = await prisma.slika.create({
    data: {
      smerId: id,
      url,
      naziv: naziv || null,
      redosled: (maxRedosled._max.redosled ?? -1) + 1,
    },
  });

  return NextResponse.json(slika);
}