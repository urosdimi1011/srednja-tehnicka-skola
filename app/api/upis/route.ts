import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/api/prisma";

export async function GET() {
  try {
    const upis = await prisma.upis.findUnique({ where: { id: 1 } });

    if (!upis) {
      return NextResponse.json({ error: "Упис није пронађен" }, { status: 404 });
    }

    return NextResponse.json(upis);
  } catch (err) {
    console.error("GET /api/upis greška:", err);
    return NextResponse.json(
      { error: "Greška pri čitanju baze podataka" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, content } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Школска година и опис су обавезни" },
        { status: 400 },
      );
    }

    const upis = await prisma.upis.upsert({
      where: { id: 1 },
      update: { title, description, content: content ?? "" },
      create: { id: 1, title, description, content: content ?? "", deadline: new Date() },
    });

    return NextResponse.json(upis);
  } catch (err) {
    console.error("PUT /api/upis greška:", err);
    return NextResponse.json(
      { error: "Greška pri čuvanju u bazu podataka" },
      { status: 500 },
    );
  }
}
