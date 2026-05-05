import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/api/prisma";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const samoVidljivi = searchParams.get("samo_vidljivi") === "true";

  const albumi = await prisma.galerijaAlbum.findMany({
    where: samoVidljivi ? { vidljiv: true } : undefined,
    orderBy: [{ redosled: "asc" }, { createdAt: "desc" }],
    include: {
      slike: { orderBy: { redosled: "asc" }, take: 1 },
      _count: { select: { slike: true } },
    },
  });

  return NextResponse.json(albumi);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const naziv = formData.get("naziv") as string;
  const opis = formData.get("opis") as string | null;
  const kategorija = formData.get("kategorija") as string | null;
  const vidljiv = formData.get("vidljiv") !== "false";
  const fajlovi = formData.getAll("slike") as File[];

  if (!naziv) {
    return NextResponse.json({ error: "Назив је обавезан" }, { status: 400 });
  }

  // Kreiraj album
  const album = await prisma.galerijaAlbum.create({
    data: {
      naziv,
      opis,
      kategorija: kategorija ?? "Остало",
      vidljiv,
    },
  });

  // Upload slika
  const uploadDir = path.join(process.cwd(), "public", "uploads", "galerija");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  let redosled = 0;
  let coverSlika: string | null = null;

  for (const fajl of fajlovi) {
    const buffer = Buffer.from(await fajl.arrayBuffer());
    const ext = fajl.name.split(".").pop();
    const ime = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filePath = path.join(uploadDir, ime);
    fs.writeFileSync(filePath, buffer);

    const url = `/uploads/galerija/${ime}`;

    if (!coverSlika) coverSlika = url;

    await prisma.galerijaSlika.create({
      data: { albumId: album.id, url, redosled },
    });

    redosled++;
  }

  // Postavi cover sliku
  if (coverSlika) {
    await prisma.galerijaAlbum.update({
      where: { id: album.id },
      data: { coverSlika },
    });
  }

  return NextResponse.json(album, { status: 201 });
}