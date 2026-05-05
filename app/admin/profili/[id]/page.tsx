import { prisma } from "@/api/prisma";
import { notFound, redirect } from "next/navigation";
import ProfilForm from "./ProfilForm";

export default async function EditProfilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNovi = id === "novi";

  const profil = isNovi
    ? null
    : await prisma.obrazovniProfil.findUnique({
        where: { id },
        include: { smerovi: { orderBy: { naziv: "asc" } } },
      });

  if (!isNovi && !profil) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-stone-900">
          {isNovi ? "Нови образовни профил" : "Уреди профил"}
        </h1>
        {profil && (
          <p className="text-stone-400 text-sm mt-1">{profil.naziv}</p>
        )}
      </div>

      <ProfilForm profil={profil} />
    </div>
  );
}