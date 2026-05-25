export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Users,
  FileText,
} from "lucide-react";
import { prisma } from "@/api/prisma";
import { ikonePoProfilu } from "@/data/profiliIkone";
import PageHeader from "@/app/(site)/components/Pageheader";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profil = await prisma.obrazovniProfil.findUnique({ where: { slug } });
  if (!profil) return { title: "Профил није пронађен" };

  const description = profil.opis.slice(0, 160);
  return {
    title: profil.naziv,
    description,
    openGraph: {
      title: `${profil.naziv} | STS Dositej Beograd`,
      description,
      type: "website",
      url: `https://sts.edu.rs/obrazovni-profili/${slug}`,
    },
    alternates: { canonical: `https://sts.edu.rs/obrazovni-profili/${slug}` },
  };
}

export default async function ObrazovniProfilPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const profil = await prisma.obrazovniProfil.findUnique({
    where: { slug },
    include: {
      smerovi: {
        orderBy: { naziv: "asc" },
        include: {
          galerija: { take: 1, orderBy: { redosled: "asc" } },
        },
      },
    },
  });
  if (!profil) notFound();

  const Icon = ikonePoProfilu[slug] ?? GraduationCap;
  const tags = profil.tags as string[];

  const grupe = Object.entries(
    profil.smerovi.reduce(
      (acc, smer) => {
        if (!acc[smer.trajanje]) acc[smer.trajanje] = [];
        acc[smer.trajanje].push(smer);
        return acc;
      },
      {} as Record<number, typeof profil.smerovi>,
    ),
  ).sort(([a], [b]) => Number(b) - Number(a));

  const labelTrajanja = (g: number) => {
    if (g === 1) return "Специјалистичко образовање · 1 година";
    if (g === 3) return "Трогодишње образовање · 3 године";
    if (g === 4) return "Четворогодишње образовање · 4 године";
    return `${g} године`;
  };

  return (
    <>
      <PageHeader
        title={profil.naziv}
        subtitle={profil.opis}
        breadcrumbs={[
          { label: "Образовни профили", href: "/obrazovni-profili" },
          { label: profil.naziv },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <div className="flex items-center gap-2 bg-crimson-50 border border-crimson-100 px-4 py-2.5">
              <Icon size={15} className="text-crimson-700" />
              <span className="text-crimson-800 text-xs font-bold uppercase tracking-wide">
                {profil.vrsta}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-[#114880] border border-white/20 px-4 py-2.5">
              <Users size={15} className="text-white/80" />
              <span className="text-white text-xs font-bold uppercase tracking-wide">
                {profil.smerovi.length}{" "}
                {profil.smerovi.length === 1 ? "смер" : "смерова"}
              </span>
            </div>
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#114880] text-white text-xs font-semibold px-3 py-2.5 tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {profil.smerovi.length === 0 ? (
            <div className="text-center py-24 text-white/70 bg-[#114880]/10 rounded-md">
              <BookOpen
                size={44}
                className="mx-auto mb-4 opacity-20 text-white"
              />
              <p className="text-lg font-medium text-white">
                Тренутно нема уписаних смерова
              </p>
              <p className="text-sm mt-1 text-white/60">
                Садржај ће бити додат ускоро
              </p>
            </div>
          ) : (
            <div className="space-y-14">
              {grupe.map(([trajanje, smerovi]) => (
                <div key={trajanje}>
                  <div className="flex items-center gap-4 mb-7">
                    <div className="flex items-center gap-2 shrink-0">
                      <Clock size={14} className="text-crimson-700" />
                      <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                        {labelTrajanja(Number(trajanje))}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-stone-100" />
                    <span className="text-xs text-stone-300 font-semibold shrink-0">
                      {smerovi.length}{" "}
                      {smerovi.length === 1 ? "смер" : "смерова"}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {smerovi.map((smer) => {
                      const slika =
                        smer.glavnaSlika ?? smer.galerija[0]?.url ?? null;
                      const imaDetalje =
                        smer.opsteInformacije ||
                        smer.ciljevi ||
                        smer.poslovnaProhodnost;

                      return (
                        <Link
                          key={smer.id}
                          href={`/obrazovni-profili/${slug}/${smer.slug}`}
                          className="group flex flex-col border border-stone-200 hover:border-crimson-300 hover:shadow-md transition-all duration-300 overflow-hidden bg-white"
                        >
                          <div className="relative h-40 overflow-hidden bg-[#114880]/10">
                            {slika ? (
                              <Image
                                src={slika}
                                alt={smer.naziv}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#114880]/20 to-[#114880]/5">
                                <Icon
                                  size={36}
                                  className="text-[#114880]/40 group-hover:text-crimson-200 transition-colors duration-300"
                                />
                              </div>
                            )}

                            <span className="absolute top-2.5 left-2.5 bg-crimson-700 text-white text-xs font-bold px-2 py-0.5">
                              {smer.trajanje} год.
                            </span>

                            {smer.nastavniPlanProgram && (
                              <span className="absolute top-2.5 right-2.5 bg-[#114880]/80 text-white text-xs font-semibold px-2 py-0.5 flex items-center gap-1">
                                <FileText size={10} />
                                PDF
                              </span>
                            )}

                            <div className="absolute inset-0 bg-crimson-900/0 group-hover:bg-crimson-900/15 transition-all duration-300" />
                          </div>

                          <div className="flex flex-col flex-1 p-4">
                            <h3 className="font-bold text-stone-900 text-sm leading-snug mb-4 group-hover:text-crimson-800 transition-colors line-clamp-2">
                              {smer.naziv}
                            </h3>

                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex gap-1">
                                {[
                                  smer.opsteInformacije,
                                  smer.ciljevi,
                                  smer.poslovnaProhodnost,
                                  smer.obrazovnaProhodnost,
                                ].map((val, i) =>
                                  val ? (
                                    <span
                                      key={i}
                                      className="w-1.5 h-1.5 rounded-full bg-crimson-400"
                                    />
                                  ) : (
                                    <span
                                      key={i}
                                      className="w-1.5 h-1.5 rounded-full bg-stone-200"
                                    />
                                  ),
                                )}
                              </div>

                              <span className="flex items-center gap-0.5 text-xs font-bold text-crimson-700 group-hover:gap-1.5 transition-all">
                                {imaDetalje ? "Детаљи" : "Погледај"}
                                <ChevronRight size={12} />
                              </span>
                            </div>
                          </div>

                          <div className="h-0.5 bg-crimson-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
