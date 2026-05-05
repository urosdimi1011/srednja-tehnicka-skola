import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const MAX_SIZE = 5 * 1024 * 1024;
const DOZVOLJENI_TIPOVI = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "smerovi";

    if (!file) {
      return NextResponse.json({ error: "Фајл није послат" }, { status: 400 });
    }

    if (!DOZVOLJENI_TIPOVI.includes(file.type)) {
      return NextResponse.json(
        { error: "Дозвољени формати: JPG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Фајл је превелик (макс. 5MB)" },
        { status: 400 }
      );
    }

    // Generiši jedinstveno ime fajla
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const fileName = `${timestamp}-${random}.${ext}`;

    // Putanja na disku: public/uploads/{folder}/
    const uploadDir = join(process.cwd(), "public", "uploads", folder);

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = join(uploadDir, fileName);
    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    // Putanja koja se čuva u bazi i koristi u <img src>
    const url = `/uploads/${folder}/${fileName}`;

    return NextResponse.json({ url });
  } catch (err) {
    console.error("Upload greška:", err);
    return NextResponse.json(
      { error: "Грешка приликом учитавања фајла" },
      { status: 500 }
    );
  }
}