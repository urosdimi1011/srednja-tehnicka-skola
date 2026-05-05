import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/api/prisma";
import { unlink } from "fs/promises";
import { join } from "path";

// DELETE /api/smerovi/[id]/galerija/[slikaId]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; slikaId: string }> }
) {
  const { slikaId } = await params;

  const slika = await prisma.slika.findUnique({ where: { id: slikaId } });
  if (!slika) {
    return NextResponse.json({ error: "Слика не постоји" }, { status: 404 });
  }

  // Obriši fajl sa diska ako je lokalno uploadovan
  if (slika.url.startsWith("/uploads/")) {
    try {
      const filePath = join(process.cwd(), "public", slika.url);
      await unlink(filePath);
    } catch {
      // Fajl možda ne postoji, nastavi dalje
    }
  }

  await prisma.slika.delete({ where: { id: slikaId } });

  return NextResponse.json({ success: true });
}

// PATCH /api/smerovi/[id]/galerija/[slikaId] – ažuriraj naziv ili redosled
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; slikaId: string }> }
) {
  const { slikaId } = await params;
  const data = await req.json();

  const slika = await prisma.slika.update({
    where: { id: slikaId },
    data: {
      naziv: data.naziv !== undefined ? data.naziv : undefined,
      redosled: data.redosled !== undefined ? data.redosled : undefined,
    },
  });

  return NextResponse.json(slika);
}