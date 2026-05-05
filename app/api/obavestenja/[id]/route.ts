import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/api/prisma";

// GET /api/obavestenja/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const obavestenje = await prisma.obavestenje.findUnique({
    where: { id: Number(id) },
  });

  if (!obavestenje) {
    return NextResponse.json({ error: "Није пронађено" }, { status: 404 });
  }

  return NextResponse.json(obavestenje);
}

// PUT /api/obavestenja/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { title, content, publishedAt, isActive } = await req.json();

  const obavestenje = await prisma.obavestenje.update({
    where: { id: Number(id) },
    data: {
      title,
      content,
      publishedAt: publishedAt ? new Date(publishedAt) : undefined,
      isActive,
    },
  });

  return NextResponse.json(obavestenje);
}

// DELETE /api/obavestenja/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.obavestenje.delete({ where: { id: Number(id) } });

  return NextResponse.json({ success: true });
}