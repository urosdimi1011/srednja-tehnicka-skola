import { prisma } from "@/api/prisma";
import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";

export default async function AdminObavestenjaPage() {
  const obavestenja = await prisma.obavestenje.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900">Обавештења</h1>
          <p className="text-stone-400 text-sm mt-1">
            {obavestenja.length} обавештења укупно
          </p>
        </div>
        <Link
          href="/admin/obavestenja/novo"
          className="flex items-center gap-2 bg-crimson-700 hover:bg-crimson-800 text-white px-5 py-2.5 font-bold text-sm transition-colors"
        >
          <Plus size={16} />
          Ново обавештење
        </Link>
      </div>

      <div className="bg-white border border-stone-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest">
                Наслов
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest hidden md:table-cell">
                Датум
              </th>
              <th className="text-center px-5 py-3.5 text-xs font-bold text-stone-400 uppercase tracking-widest">
                Статус
              </th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {obavestenja.map((o) => (
              <tr key={o.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-semibold text-stone-900">{o.title}</p>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-stone-400 text-xs">
                    {new Date(o.publishedAt).toLocaleDateString("sr-RS")}
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  {o.isActive ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 border border-green-100 px-2 py-1">
                      <Eye size={11} /> Активно
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-stone-400 bg-stone-100 px-2 py-1">
                      <EyeOff size={11} /> Скривено
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/admin/obavestenja/${o.id}`}
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

        {obavestenja.length === 0 && (
          <div className="text-center py-16 text-stone-400">
            <p className="font-medium">Нема обавештења</p>
            <Link
              href="/admin/obavestenja/novo"
              className="inline-flex items-center gap-1 text-crimson-700 text-sm font-bold mt-2"
            >
              <Plus size={14} /> Додај прво обавештење
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}