import { prisma } from "@/api/prisma";
import Link from "next/link";
import { Plus, Pencil, ChevronRight } from "lucide-react";

export default async function AdminProfiliPage() {
  const profili = await prisma.obrazovniProfil.findMany({
    orderBy: { naziv: "asc" },
    include: { _count: { select: { smerovi: true } } },
  });

  const vrstaLabela: Record<string, string> = {
    STRUCNO:    "Стручно",
    GIMNAZIJA:  "Гимназија",
    UMETNICKO:  "Уметничко",
    SPORTSKO:   "Спортско",
    JEZICKO:    "Језичко",
  };

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900">
            Образовни профили
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            {profili.length} профила у систему
          </p>
        </div>
        <Link
          href="/admin/profili/novi"
          className="flex items-center gap-2 bg-crimson-700 hover:bg-crimson-800 text-white px-5 py-2.5 font-bold text-sm transition-colors"
        >
          <Plus size={16} />
          Нови профил
        </Link>
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
                Врста
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest hidden lg:table-cell">
                Slug
              </th>
              <th className="text-center px-5 py-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest">
                Смерови
              </th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {profili.map((profil) => {
              const tags = profil.tags as string[];
              return (
                <tr
                  key={profil.id}
                  className="hover:bg-stone-50 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-stone-900 leading-snug">
                      {profil.naziv}
                    </p>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-stone-100 text-stone-500 px-1.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs font-semibold bg-crimson-50 text-crimson-700 border border-crimson-100 px-2 py-1">
                      {vrstaLabela[profil.vrsta] ?? profil.vrsta}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <code className="text-xs text-stone-400 font-mono">
                      {profil.slug}
                    </code>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Link
                      href={`/admin/smerovi?profilId=${profil.id}`}
                      className="inline-block bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold px-3 py-1.5 transition-colors"
                    >
                      {profil._count.smerovi}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/profili/${profil.id}`}
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

        {profili.length === 0 && (
          <div className="text-center py-16 text-stone-400">
            <p className="font-medium">Нема образовних профила</p>
            <Link
              href="/admin/profili/novi"
              className="inline-flex items-center gap-1 text-crimson-700 text-sm font-bold mt-2"
            >
              <Plus size={14} /> Додај први профил
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}