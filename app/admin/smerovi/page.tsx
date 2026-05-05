import { prisma } from "@/api/prisma";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

export default async function AdminSmeroviPage({
  searchParams,
}: {
  searchParams: Promise<{ profilId?: string }>;
}) {
  const { profilId } = await searchParams;

  const [smerovi, profili] = await Promise.all([
    prisma.smer.findMany({
      where: profilId ? { obrazovniProfilId: profilId } : undefined,
      orderBy: [{ obrazovniProfil: { naziv: "asc" } }, { naziv: "asc" }],
      include: {
        obrazovniProfil: { select: { naziv: true, id: true } },
        _count: { select: { galerija: true } },
      },
    }),
    prisma.obrazovniProfil.findMany({ orderBy: { naziv: "asc" } }),
  ]);

  const aktivniProfil = profili.find((p) => p.id === profilId);

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900">Смерови</h1>
          <p className="text-stone-400 text-sm mt-1">
            {aktivniProfil
              ? `Профил: ${aktivniProfil.naziv}`
              : `${smerovi.length} смерова укупно`}
          </p>
        </div>
        <Link
          href="/admin/smerovi/novi"
          className="flex items-center gap-2 bg-crimson-700 hover:bg-crimson-800 text-white px-5 py-2.5 font-bold text-sm transition-colors"
        >
          <Plus size={16} />
          Нови смер
        </Link>
      </div>

      {/* Filter po profilu */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Link
          href="/admin/smerovi"
          className={`text-xs font-bold px-3 py-2 transition-colors ${
            !profilId
              ? "bg-stone-900 text-white"
              : "bg-white border border-stone-200 text-stone-500 hover:border-stone-400"
          }`}
        >
          Сви
        </Link>
        {profili.map((p) => (
          <Link
            key={p.id}
            href={`/admin/smerovi?profilId=${p.id}`}
            className={`text-xs font-bold px-3 py-2 transition-colors ${
              profilId === p.id
                ? "bg-crimson-700 text-white"
                : "bg-white border border-stone-200 text-stone-500 hover:border-stone-400"
            }`}
          >
            {p.naziv}
          </Link>
        ))}
      </div>

      {/* Tabela */}
      <div className="bg-white border border-stone-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest">
                Назив
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest hidden md:table-cell">
                Образовни профил
              </th>
              <th className="text-center px-5 py-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest">
                Трај.
              </th>
              <th className="text-center px-5 py-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest hidden lg:table-cell">
                Садржај
              </th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {smerovi.map((smer) => {
              const popunjenost = [
                smer.opsteInformacije,
                smer.ciljevi,
                smer.poslovnaProhodnost,
                smer.obrazovnaProhodnost,
              ].filter(Boolean).length;

              return (
                <tr
                  key={smer.id}
                  className="hover:bg-stone-50 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-stone-900 leading-snug">
                      {smer.naziv}
                    </p>
                    <p className="text-stone-400 text-xs mt-0.5 font-mono">
                      {smer.slug}
                    </p>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <span className="text-xs text-stone-500 font-medium">
                      {smer.obrazovniProfil.naziv}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span className="text-xs font-bold bg-stone-100 text-stone-600 px-2 py-1">
                      {smer.trajanje} год.
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <div className="flex items-center justify-center gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <span
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < popunjenost
                              ? "bg-crimson-400"
                              : "bg-stone-200"
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/admin/smerovi/${smer.id}`}
                      className="flex items-center gap-1.5 text-xs font-bold text-crimson-700 hover:text-crimson-800 transition-colors ml-auto w-fit"
                    >
                      <Pencil size={13} />
                      Уреди
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {smerovi.length === 0 && (
          <div className="text-center py-16 text-stone-400">
            <p className="font-medium">Нема смерова</p>
            <Link
              href="/admin/smerovi/novi"
              className="inline-flex items-center gap-1 text-crimson-700 text-sm font-bold mt-2"
            >
              <Plus size={14} /> Додај смер
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}