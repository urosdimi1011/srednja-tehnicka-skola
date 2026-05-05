export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  FileText,
  Target,
  Briefcase,
  GraduationCap,
  Download,
  ChevronRight,
  ImageIcon,
  ArrowRight,
  Phone,
} from "lucide-react";
import { prisma } from "@/api/prisma";
import { ikonePoProfilu } from "@/data/profiliIkone";
import PageHeader from "@/app/(site)/components/Pageheader";
import SmerGalerijaLightbox from "@/app/components/SmerGalerijaLightbox";

export const dynamicParams = true;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; smerSlug: string }>;
}) {
  const { smerSlug } = await params;
  const smer = await prisma.smer.findUnique({ where: { slug: smerSlug } });
  if (!smer) return { title: "Смер није пронађен" };
  return { title: smer.naziv };
}

export default async function SmerPage({
  params,
}: {
  params: Promise<{ slug: string; smerSlug: string }>;
}) {
  const { slug, smerSlug } = await params;

  const smer = await prisma.smer.findUnique({
    where: { slug: smerSlug },
    include: {
      galerija: { orderBy: { redosled: "asc" } },
      obrazovniProfil: true,
    },
  });
  if (!smer || smer.obrazovniProfil.slug !== slug) notFound();

  const ostali = await prisma.smer.findMany({
    where: {
      obrazovniProfilId: smer.obrazovniProfilId,
      NOT: { id: smer.id },
    },
    orderBy: { naziv: "asc" },
    take: 5,
  });

  const ProfilIcon = ikonePoProfilu[slug] ?? GraduationCap;

  const imaDetalje =
    smer.opsteInformacije ||
    smer.ciljevi ||
    smer.poslovnaProhodnost ||
    smer.obrazovnaProhodnost;

  return (
    <>
      <PageHeader
        title={smer.naziv}
        subtitle={smer.obrazovniProfil.naziv}
        breadcrumbs={[
          { label: "Образовни профили", href: "/obrazovni-profili" },
          {
            label: smer.obrazovniProfil.naziv,
            href: `/obrazovni-profili/${slug}`,
          },
          { label: smer.naziv },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Info kartice */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-crimson-50 border border-crimson-100 p-5">
                  <Clock size={18} className="text-crimson-700 mb-2" />
                  <p className="text-stone-400 text-xs mb-1 uppercase tracking-wide font-semibold">
                    Трајање
                  </p>
                  <p className="font-bold text-stone-900 text-lg">
                    {smer.trajanje} {smer.trajanje === 1 ? "година" : "године"}
                  </p>
                </div>
                <div className="bg-stone-50 border border-stone-100 p-5">
                  <ProfilIcon size={18} className="text-stone-500 mb-2" />
                  <p className="text-stone-400 text-xs mb-1 uppercase tracking-wide font-semibold">
                    Образовни профил
                  </p>
                  <p className="font-bold text-stone-900 text-sm leading-snug">
                    {smer.obrazovniProfil.naziv}
                  </p>
                </div>
              </div>

              {!imaDetalje && (
                <div className="bg-stone-50 border border-stone-200 p-8 text-center text-stone-400">
                  <FileText size={36} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">
                    Садржај за овај смер ће бити додат ускоро
                  </p>
                </div>
              )}

              {smer.opsteInformacije && (
                <SekcijaSadrzaja
                  icon={<FileText size={20} />}
                  title="Опште информације"
                  html={smer.opsteInformacije}
                />
              )}

              {smer.ciljevi && (
                <SekcijaSadrzaja
                  icon={<Target size={20} />}
                  title="Циљеви смера"
                  html={smer.ciljevi}
                />
              )}

              {smer.poslovnaProhodnost && (
                <SekcijaSadrzaja
                  icon={<Briefcase size={20} />}
                  title="Пословна проходност"
                  html={smer.poslovnaProhodnost}
                />
              )}

              {smer.obrazovnaProhodnost && (
                <SekcijaSadrzaja
                  icon={<GraduationCap size={20} />}
                  title="Образовна проходност"
                  html={smer.obrazovnaProhodnost}
                />
              )}

              {smer.nastavniPlanProgram && (
                <div className="flex items-center justify-between gap-4 bg-stone-50 border border-stone-200 p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-crimson-700 flex items-center justify-center shrink-0">
                      <FileText size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 text-sm">
                        Наставни план и програм
                      </p>
                      <p className="text-stone-400 text-xs mt-0.5">
                        PDF документ
                      </p>
                    </div>
                  </div>
                  <a
                    href={smer.nastavniPlanProgram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-crimson-700 hover:bg-crimson-800 text-white text-sm font-bold px-5 py-2.5 transition-colors shrink-0"
                  >
                    <Download size={15} />
                    Преузми PDF
                  </a>
                </div>
              )}

              {/* Galerija sa lightbox-om */}
              {smer.galerija.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <ImageIcon size={20} className="text-crimson-700" />
                    <h2 className="text-xl font-bold text-stone-900">
                      Галерија
                    </h2>
                  </div>
                  <div className="w-12 h-0.5 bg-crimson-700 mb-6" />
                  <SmerGalerijaLightbox
                    slike={smer.galerija}
                    naziv={smer.naziv}
                  />
                </div>
              )}
            </div>

            <div className="space-y-5">
              <div className="bg-stone-900 text-white p-7 sticky top-24">
                <div className="w-11 h-11 bg-crimson-700 flex items-center justify-center mb-4">
                  <ProfilIcon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-base mb-1 leading-snug">
                  {smer.naziv}
                </h3>
                <p className="text-stone-400 text-xs mb-1 mt-2">
                  Трајање образовања
                </p>
                <p className="text-crimson-400 font-bold text-sm mb-5">
                  {smer.trajanje} {smer.trajanje === 1 ? "година" : "године"}
                </p>
                <Link
                  href="/upis"
                  className="flex items-center justify-center gap-2 bg-crimson-700 hover:bg-crimson-800 text-white px-5 py-3 font-bold text-sm transition-colors w-full mb-3 group"
                >
                  <GraduationCap size={15} />
                  Упис 2026/2027
                  <ArrowRight
                    size={13}
                    className="ml-auto group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <a
                  href="tel:0113235500"
                  className="flex items-center gap-3 border border-stone-700 hover:border-crimson-600 px-5 py-3 transition-colors w-full"
                >
                  <Phone size={15} className="text-crimson-400 shrink-0" />
                  <div>
                    <p className="text-stone-500 text-xs leading-none mb-0.5">
                      Централа
                    </p>
                    <p className="text-white text-sm font-semibold">
                      011/323-55-00
                    </p>
                  </div>
                </a>
              </div>

              {ostali.length > 0 && (
                <div className="border border-stone-200 overflow-hidden">
                  <div className="bg-stone-50 px-5 py-3 border-b border-stone-200">
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                      Остали смерови
                    </p>
                  </div>
                  <div className="divide-y divide-stone-100">
                    {ostali.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/obrazovni-profili/${slug}/${s.slug}`}
                        className="flex items-center gap-3 px-5 py-3.5 hover:bg-crimson-50 transition-colors group"
                      >
                        <span className="text-stone-700 text-sm group-hover:text-crimson-800 transition-colors flex-1 leading-snug">
                          {s.naziv}
                        </span>
                        <ChevronRight
                          size={13}
                          className="text-stone-300 group-hover:text-crimson-700 shrink-0 transition-colors"
                        />
                      </Link>
                    ))}
                    <Link
                      href={`/obrazovni-profili/${slug}`}
                      className="flex items-center justify-center gap-2 px-5 py-3.5 text-crimson-700 hover:bg-crimson-700 hover:text-white text-xs font-bold uppercase tracking-wide transition-colors group"
                    >
                      Сви смерови профила
                      <ArrowRight
                        size={13}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              )}

              <Link
                href={`/obrazovni-profili/${slug}`}
                className="flex items-center gap-2 text-stone-400 text-sm hover:text-crimson-700 transition-colors group"
              >
                <ArrowLeft
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Назад на профил
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SekcijaSadrzaja({
  icon,
  title,
  html,
}: {
  icon: React.ReactNode;
  title: string;
  html: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-crimson-700">{icon}</span>
        <h2 className="text-xl font-bold text-stone-900">{title}</h2>
      </div>
      <div className="w-12 h-0.5 bg-crimson-700 mb-5" />
      <div
        className="prose prose-stone max-w-none prose-headings:font-bold prose-headings:text-stone-900 prose-a:text-crimson-700 prose-strong:text-stone-900"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
