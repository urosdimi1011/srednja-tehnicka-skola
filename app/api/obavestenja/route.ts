import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/api/prisma";

// GET /api/obavestenja?samo_aktivna=true&limit=3
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const samoAktivna = searchParams.get("samo_aktivna") === "true";
  const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined;

  const obavestenja = await prisma.obavestenje.findMany({
    where: samoAktivna ? { isActive: true } : undefined,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  return NextResponse.json(obavestenja);
}

// POST /api/obavestenja
export async function POST(req: NextRequest) {
  const { title, content, publishedAt, isActive } = await req.json();

  if (!title || !content) {
    return NextResponse.json(
      { error: "Наслов и садржај су обавезни" },
      { status: 400 }
    );
  }

  const obavestenje = await prisma.obavestenje.create({
    data: {
      title,
      content,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      isActive: isActive ?? true,
    },
  });

  return NextResponse.json(obavestenje, { status: 201 });
}