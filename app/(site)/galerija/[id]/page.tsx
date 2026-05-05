export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { prisma } from "@/api/prisma";
import PageHeader from "@/app/(site)/components/Pageheader";
import AlbumLightbox from "@/app/components/Albumlightbox ";

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const album = await prisma.galerijaAlbum.findUnique({
    where: { id },
    include: { slike: { orderBy: { redosled: "asc" } } },
  });

  if (!album || !album.vidljiv) notFound();

  return (
    <>
      <PageHeader
        title={album.naziv}
        subtitle={album.opis ?? undefined}
        breadcrumbs={[
          { label: "Галерија", href: "/galerija" },
          { label: album.naziv },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AlbumLightbox slike={album.slike} naziv={album.naziv} />
        </div>
      </section>
    </>
  );
}