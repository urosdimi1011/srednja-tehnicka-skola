import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/api/prisma";
import fs from "fs";
import path from "path";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const album = await prisma.galerijaAlbum.findUnique({
    where: { id },
    include: { slike: { orderBy: { redosled: "asc" } } },
  });
  if (!album) return NextResponse.json({ error: "Није пронађено" }, { status: 404 });
  return NextResponse.json(album);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { naziv, opis, kategorija, coverSlika, vidljiv, redosled } = await req.json();
  const album = await prisma.galerijaAlbum.update({
    where: { id },
    data: {
      ...(naziv !== undefined && { naziv }),
      ...(opis !== undefined && { opis }),
      ...(kategorija !== undefined && { kategorija }),
      ...(coverSlika !== undefined && { coverSlika }),
      ...(vidljiv !== undefined && { vidljiv }),
      ...(redosled !== undefined && { redosled }),
    },
  });
  return NextResponse.json(album);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Dohvati sve slike pre brisanja
  const slike = await prisma.galerijaSlika.findMany({
    where: { albumId: id },
  });

  // Obriši fizičke fajlove
  for (const slika of slike) {
    try {
      // slika.url je npr. /uploads/galerija/slika.jpg
      const filePath = path.join(process.cwd(), "public", slika.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error("Greška pri brisanju fajla:", slika.url, err);
    }
  }

  // Obriši iz baze (Cascade briše slike automatski)
  await prisma.galerijaAlbum.delete({ where: { id } });

  return NextResponse.json({ success: true });
}