import { prisma } from "@/api/prisma";
import { notFound } from "next/navigation";
import AlbumForm from "./AlbumForm";

export default async function AdminAlbumPage({
  params,
}: {
  params: { id: string };
}) {
  const isNovi = params.id === "novi";
  const album = isNovi
    ? null
    : await prisma.galerijaAlbum.findUnique({
        where: { id: params.id },
        include: { slike: { orderBy: { redosled: "asc" } } },
      });

  if (!isNovi && !album) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-stone-900">
          {isNovi ? "Нови албум" : "Уреди албум"}
        </h1>
        {album && <p className="text-stone-400 text-sm mt-1">{album.naziv}</p>}
      </div>
      <AlbumForm album={album} />
    </div>
  );
}