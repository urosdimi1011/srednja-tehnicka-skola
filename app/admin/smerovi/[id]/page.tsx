import { prisma } from "@/api/prisma";
import { notFound } from "next/navigation";
import SmerForm from "./Smerform";

export default async function EditSmerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNovi = id === "novi";

  const [smer, profili] = await Promise.all([
    isNovi
      ? Promise.resolve(null)
      : prisma.smer.findUnique({
          where: { id },
          include: { obrazovniProfil: { select: { naziv: true } } },
        }),
    prisma.obrazovniProfil.findMany({ orderBy: { naziv: "asc" } }),
  ]);

  if (!isNovi && !smer) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-stone-900">
          {isNovi ? "Нови смер" : "Уреди смер"}
        </h1>
        {smer && (
          <p className="text-stone-400 text-sm mt-1">
            {smer.naziv} · {smer.obrazovniProfil.naziv}
          </p>
        )}
      </div>
      <SmerForm smer={smer} profili={profili} />
    </div>
  );
}