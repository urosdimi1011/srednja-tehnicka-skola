export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/api/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const album = await prisma.galerijaAlbum.findUnique({
    where: { id },
    select: { naziv: true, opis: true, coverSlika: true },
  });
  if (!album) return { title: "Album nije pronađen" };

  const description = album.opis ?? `Pogledajte fotografije iz albuma ${album.naziv}.`;
  const images = album.coverSlika
    ? [{ url: album.coverSlika, alt: album.naziv }]
    : undefined;

  return {
    title: album.naziv,
    description,
    openGraph: {
      title: album.naziv,
      description,
      type: "website",
      url: `https://sts.edu.rs/galerija/${id}`,
      ...(images && { images }),
    },
    alternates: { canonical: `https://sts.edu.rs/galerija/${id}` },
  };
}
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