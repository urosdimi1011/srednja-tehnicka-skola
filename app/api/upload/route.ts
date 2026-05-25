import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import Jimp from "jimp";

const MAX_SIZE = 20 * 1024 * 1024;
const MAX_DIMENSION = 1920;

const EXT_NA_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

function resolveMime(file: File): string | null {
  if (Object.values(EXT_NA_MIME).includes(file.type)) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return EXT_NA_MIME[ext] ?? null;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "smerovi";

    if (!file) {
      return NextResponse.json({ error: "Фајл није послат" }, { status: 400 });
    }

    const mime = resolveMime(file);
    if (!mime) {
      return NextResponse.json(
        { error: "Дозвољени формати: JPG, PNG, WebP, GIF" },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Фајл је превелик (макс. 20MB)" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const inputBuffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);

    const uploadDir = join(process.cwd(), "public", "uploads", folder);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    let fileName: string;
    let outputBuffer: Buffer;

    if (mime === "image/gif") {
      fileName = `${timestamp}-${random}.gif`;
      outputBuffer = inputBuffer;
    } else {
      const image = await Jimp.read(inputBuffer);

      if (
        image.getWidth() > MAX_DIMENSION ||
        image.getHeight() > MAX_DIMENSION
      ) {
        image.scaleToFit(MAX_DIMENSION, MAX_DIMENSION);
      }

      image.quality(82);
      outputBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
      fileName = `${timestamp}-${random}.jpg`;
    }

    await writeFile(join(uploadDir, fileName), outputBuffer);

    const url = `/uploads/${folder}/${fileName}`;
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Upload greška:", err);
    return NextResponse.json(
      { error: "Грешка приликом учитавања фајла" },
      { status: 500 },
    );
  }
}
