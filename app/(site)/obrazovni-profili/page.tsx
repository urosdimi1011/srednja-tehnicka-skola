export const dynamic = "force-dynamic";

import Link from "next/link";
import { Clock, ChevronRight, GraduationCap } from "lucide-react";
import PageHeader from "../components/Pageheader";
import { getSviProfili } from "@/services/profiliService";
import { ikonePoProfilu } from "@/data/profiliIkone";

export const metadata = {
  title: "Образовни профили",
  description:
    "Сви образовни профили Средње Школе Доситеј – 4-годишњи и 3-годишњи програми.",
};

export default async function ObrazovniProfiliPage() {
  const profili = await getSviProfili();
  const tags_map = (tags: unknown): string[] =>
    Array.isArray(tags) ? (tags as string[]) : [];

  return (
    <>
      <PageHeader
        title="Образовни профили"
        subtitle="Бирај међу стручних занимања. Нудимо програме прилагођене потребама савременог тржишта рада."
        breadcrumbs={[{ label: "Образовни профили" }]}
      />

      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap size={18} className="text-crimson-700" />
            <span className="text-stone-500">Укупно:</span>
            <span className="font-bold text-stone-900">
              {profili.length} профила
            </span>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {profili.map((profil) => {
              const Icon = ikonePoProfilu[profil.slug] ?? GraduationCap;
              const tags = tags_map(profil.tags);
              return (
                <Link
                  key={profil.id}
                  href={`/obrazovni-profili/${profil.slug}`}
                  className="group bg-white border border-stone-200 hover:border-crimson-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="h-1 bg-stone-100 group-hover:bg-crimson-700 transition-colors" />
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-stone-100 group-hover:bg-crimson-700 flex items-center justify-center transition-colors duration-300 shrink-0">
                        <Icon
                          size={22}
                          className="text-crimson-700 group-hover:text-white transition-colors"
                        />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 bg-crimson-50 text-crimson-700">
                        {profil.vrsta}
                      </span>
                    </div>
                    <h3 className="font-bold text-stone-900 text-base leading-snug mb-2 group-hover:text-crimson-800 transition-colors">
                      {profil.naziv}
                    </h3>
                    <p className="text-stone-500 text-xs leading-relaxed mb-4">
                      {profil.opis}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-stone-50 text-stone-500 px-2 py-0.5 border border-stone-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 pb-5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-stone-400 text-xs">
                      <Clock size={12} />
                      Стручно образовање
                    </div>
                    <div className="flex items-center gap-1 text-crimson-700 text-xs font-semibold group-hover:gap-2 transition-all">
                      Детаљи
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
