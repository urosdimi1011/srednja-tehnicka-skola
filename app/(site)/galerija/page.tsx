export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { Images, Camera } from "lucide-react";
import PageHeader from "../components/Pageheader";
import { getSviAlbumi } from "@/services/galerijaService";


export const metadata = {
  title: "Галерија",
  description: "Фото галерија Средње Школе Доситеј – екскурзије, школске активности и догађаји.",
};

export default async function GalerijaPage() {
  const albumi = await getSviAlbumi(true);

  // Grupisanje po kategoriji
  const poKategoriji = albumi.reduce((acc, album) => {
    const kat = album.kategorija || "Остало";
    if (!acc[kat]) acc[kat] = [];
    acc[kat].push(album);
    return acc;
  }, {} as Record<string, typeof albumi>);

  return (
    <>
      <PageHeader
        title="Галерија"
        subtitle="Фотографије са школских активности, екскурзија и eventos."
        breadcrumbs={[{ label: "Галерија" }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {albumi.length === 0 ? (
            <div className="text-center py-20 text-stone-400">
              <Camera size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-medium">Нема фотографија</p>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(poKategoriji).map(([kategorija, albumiGrupa]) => (
                <div key={kategorija}>
                  {/* Kategorija header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div>
                      <span className="section-tag">{kategorija}</span>
                    </div>
                    <div className="flex-1 h-px bg-stone-100" />
                  </div>

                  {/* Albumi grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {albumiGrupa.map((album) => {
                      const coverUrl = album.coverSlika || album.slike[0]?.url;
                      return (
                        <Link
                          key={album.id}
                          href={`/galerija/${album.id}`}
                          className="group block overflow-hidden border border-stone-200 hover:border-crimson-300 hover:shadow-xl transition-all duration-300"
                        >
                          {/* Cover slika */}
                          <div className="relative aspect-video bg-stone-100 overflow-hidden">
                            {coverUrl ? (
                              <Image
                                src={coverUrl}
                                alt={album.naziv}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <Images size={40} className="text-stone-300" />
                              </div>
                            )}
                            {/* Overlay sa brojem slika */}
                            <div className="absolute bottom-0 right-0 bg-crimson-700 text-white text-xs font-bold px-3 py-1.5 flex items-center gap-1">
                              <Camera size={11} />
                              {album._count.slike} фото
                            </div>
                          </div>

                          {/* Info */}
                          <div className="p-5">
                            <h3 className="font-bold text-stone-900 group-hover:text-crimson-800 transition-colors mb-1">
                              {album.naziv}
                            </h3>
                            {album.opis && (
                              <p className="text-stone-400 text-sm line-clamp-2">{album.opis}</p>
                            )}
                            <p className="text-crimson-600 text-xs font-semibold mt-3 group-hover:gap-2 transition-all">
                              Погледај галерију →
                            </p>
                          </div>
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