import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/api/prisma";

export async function GET() {
  const upis = await prisma.upis.findUnique({ where: { id: 1 } });

  if (!upis) {
    return NextResponse.json({ error: "Упис није пронађен" }, { status: 404 });
  }

  return NextResponse.json(upis);
}

export async function PUT(req: NextRequest) {
  const { title, description, content } = await req.json();

  if (!title || !description) {
    return NextResponse.json(
      { error: "Школска година и садржај су обавезни" },
      { status: 400 },
    );
  }

  const upis = await prisma.upis.upsert({
    where: { id: 1 },
    update: { title, description, content },
    create: { id: 1, title, description, content, deadline: new Date() },
  });

  return NextResponse.json(upis);
}
