import { prisma } from "@/api/prisma";
import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff, Images } from "lucide-react";

export default async function AdminGalerijaPage() {
  const albumi = await prisma.galerijaAlbum.findMany({
    orderBy: [{ redosled: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { slike: true } } },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900">Галерија</h1>
          <p className="text-stone-400 text-sm mt-1">{albumi.length} албума укупно</p>
        </div>
        <Link
          href="/admin/galerija/novi"
          className="flex items-center gap-2 bg-crimson-700 hover:bg-crimson-800 text-white px-5 py-2.5 font-bold text-sm transition-colors"
        >
          <Plus size={16} />
          Нови албум
        </Link>
      </div>

      <div className="bg-white border border-stone-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest">Назив</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest hidden md:table-cell">Категорија</th>
              <th className="text-center px-5 py-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest">Слике</th>
              <th className="text-center px-5 py-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest">Статус</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {albumi.map((album) => (
              <tr key={album.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-semibold text-stone-900">{album.naziv}</p>
                  {album.opis && <p className="text-stone-400 text-xs mt-0.5 line-clamp-1">{album.opis}</p>}
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 font-medium">{album.kategorija}</span>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="flex items-center justify-center gap-1 text-stone-500 text-sm">
                    <Images size={14} />
                    {album._count.slike}
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  {album.vidljiv ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 border border-green-100 px-2 py-1">
                      <Eye size={11} /> Видљиво
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-stone-400 bg-stone-100 px-2 py-1">
                      <EyeOff size={11} /> Скривено
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/admin/galerija/${album.id}`}
                    className="flex items-center gap-1.5 text-xs font-bold text-crimson-700 hover:text-crimson-800 transition-colors ml-auto w-fit"
                  >
                    <Pencil size={13} />
                    Уреди
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {albumi.length === 0 && (
          <div className="text-center py-16 text-stone-400">
            <p className="font-medium">Нема албума</p>
            <Link href="/admin/galerija/novi" className="inline-flex items-center gap-1 text-crimson-700 text-sm font-bold mt-2">
              <Plus size={14} /> Додај први албум
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}