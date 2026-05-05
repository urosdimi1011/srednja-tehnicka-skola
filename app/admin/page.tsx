import { prisma } from "@/api/prisma";
import { GraduationCap, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [brProfila, brSmerova] = await Promise.all([
    prisma.obrazovniProfil.count(),
    prisma.smer.count(),
  ]);

  const poslednjiProfili = await prisma.obrazovniProfil.findMany({
    orderBy: { updatedAt: "desc" },
    take: 5,
    include: { _count: { select: { smerovi: true } } },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-stone-900">
          Контролна табла
        </h1>
        <p className="text-stone-400 text-sm mt-1">
          Преглед садржаја и брзи приступ
        </p>
      </div>

      {/* Stat kartice */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatKartica
          href="/admin/profili"
          icon={<GraduationCap size={22} className="text-crimson-700" />}
          broj={brProfila}
          label="Образовних профила"
        />
        <StatKartica
          href="/admin/smerovi"
          icon={<BookOpen size={22} className="text-crimson-700" />}
          broj={brSmerova}
          label="Смерова"
        />
      </div>

      {/* Poslednji profili */}
      <div className="bg-white border border-stone-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="font-bold text-stone-900 text-sm">
            Недавно ажурирани профили
          </h2>
          <Link
            href="/admin/profili"
            className="flex items-center gap-1 text-crimson-700 text-xs font-bold hover:gap-2 transition-all"
          >
            Сви профили <ArrowRight size={12} />
          </Link>
        </div>
        <div className="divide-y divide-stone-50">
          {poslednjiProfili.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between px-6 py-3.5 hover:bg-stone-50 transition-colors"
            >
              <div>
                <p className="text-stone-900 text-sm font-semibold">{p.naziv}</p>
                <p className="text-stone-400 text-xs mt-0.5">
                  {p._count.smerovi} смерова · {p.vrsta}
                </p>
              </div>
              <Link
                href={`/admin/profili/${p.id}`}
                className="text-xs font-bold text-crimson-700 hover:text-crimson-800 transition-colors"
              >
                Уреди
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatKartica({
  href,
  icon,
  broj,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  broj: number;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white border border-stone-200 p-5 hover:border-crimson-200 hover:shadow-sm transition-all group"
    >
      <div className="mb-3">{icon}</div>
      <p className="text-3xl font-extrabold text-stone-900">{broj}</p>
      <p className="text-stone-500 text-xs mt-1 group-hover:text-crimson-700 transition-colors">
        {label}
      </p>
    </Link>
  );
}