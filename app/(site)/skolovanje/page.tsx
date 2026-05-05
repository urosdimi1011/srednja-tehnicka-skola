import Link from "next/link";
import {
  Phone,
  CheckCircle2,
  ArrowRight,
  Users,
  Clock,
  BookOpen,
  GraduationCap,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import PageHeader from "../components/Pageheader";

export const metadata = {
  title: "Редовно и ванредно школовање",
  description: "Информације о редовном и ванредном школовању у Средњој школи Доситеј.",
};

const redovnoKarakteristike = [
  "Нема више бриге около приватних часова",
  "Рад у малим групама – менторски рад",
  "Посета школама у иностранству и размена ученика",
  "Коришћење бежичног интернета и видео-бим у настави",
  "Спортске активности и екскурзије у земљи и иностранству",
  "Безбедност ученика у првом плану – видео надзор",
  "Доступност професора, психолога и педагога",
  "Професионална оријентација ученика",
  "Додатни програми за стицање посебних знања и вештина",
  "Припрема за стицање међународно признатих сертификата",
  "Формирање спортских одељења",
  "Активним спортистима и уметницима – доступност наставног материјала и консултације",
];

export default function SkolovanjeStrana() {
  return (
    <>
      <PageHeader
        title="Редовно и ванредно школовање"
        subtitle="Нудимо флексибилне облике школовања прилагођене вашим потребама и могућностима."
        breadcrumbs={[
          { label: "О нама" },
          { label: "Редовно и ванредно школовање" },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-16">

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-crimson-700 flex items-center justify-center shrink-0">
                  <BookOpen size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  Редовно школовање
                </h2>
              </div>
              <div className="w-12 h-1 bg-crimson-700 mb-6 ml-13" />

              <p className="text-stone-600 leading-relaxed mb-8">
                Редовно школовање намењено је ученицима који завршавају основну школу и
                желе да наставе образовање у некој од техничких струка. Настава се одвија
                свакодневно по утврђеном распореду у савременим учионицама и лабораторијама.
              </p>

              <h3 className="font-bold text-stone-900 mb-4 uppercase tracking-widest text-xs text-stone-400">
                Шта нудимо
              </h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {redovnoKarakteristike.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 p-3 border border-stone-100 hover:border-crimson-100 hover:bg-crimson-50/40 transition-all"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-crimson-700 shrink-0 mt-0.5"
                    />
                    <span className="text-stone-700 text-sm leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="bg-stone-900 text-white p-7">
                <p className="text-stone-400 text-xs uppercase tracking-widest mb-4 font-semibold">
                  Редовно школовање
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    ["Узраст", "До 17 година"],
                    ["Трајање", "3 или 4 године"],
                    ["Настава", "Свакодневно"],
                    ["Диплома", "Пуноправна"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center border-b border-stone-800 pb-3 last:border-0 last:pb-0">
                      <span className="text-stone-400 text-sm">{k}</span>
                      <span className="text-white font-bold text-sm">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-stone-800 pt-5">
                  <p className="text-stone-500 text-xs mb-2">
                    За информације о редовном школовању:
                  </p>
                  <a
                    href="tel:0648129695"
                    className="flex items-center gap-2 text-crimson-400 font-bold hover:text-crimson-300 transition-colors"
                  >
                    <Phone size={15} />
                    064/812-96-95
                  </a>
                </div>
              </div>

              <Link
                href="/upis"
                className="flex items-center justify-center gap-2 bg-crimson-700 hover:bg-crimson-800 text-white px-6 py-4 font-bold text-sm transition-colors w-full group"
              >
                <GraduationCap size={16} />
                Упис 2026/2027
                <ArrowRight size={14} className="ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-stone-100" />

          {/* ── Vanredno ─────────────────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-stone-900 flex items-center justify-center shrink-0">
                <Users size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-stone-900">
                Ванредно школовање
              </h2>
            </div>
            <div className="w-12 h-1 bg-stone-900 mb-8" />

            {/* Uvod */}
            <div className="bg-stone-50 border-l-4 border-stone-900 p-6 mb-10">
              <p className="text-stone-700 leading-relaxed text-sm">
                Ванредан полазник првог разреда школе је лице уписано у први разред
                средњег образовања и васпитања или образовања за рад и{" "}
                <strong>старије је од 17 година</strong>. Редован ученик који жели да
                пређе на ванредно школовање може то урадити у току школске године уз
                сагласност родитеља и одобрење директора школе.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">

              {/* Upis */}
              <div className="border border-stone-200 p-6 hover:border-stone-400 transition-colors">
                <div className="w-10 h-10 bg-stone-100 flex items-center justify-center mb-4">
                  <Clock size={20} className="text-stone-700" />
                </div>
                <h3 className="font-bold text-stone-900 mb-3">Упис и услови</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Ванредни ученици уписују се у први разред у{" "}
                  <strong>јунском року</strong> на основу конкурса Министарства
                  просвете. Особе које су прекинуле образовање имају право да
                  наставе школовање у истом трајању.
                </p>
              </div>

              {/* Признавање */}
              <div className="border border-stone-200 p-6 hover:border-stone-400 transition-colors">
                <div className="w-10 h-10 bg-stone-100 flex items-center justify-center mb-4">
                  <CheckCircle2 size={20} className="text-stone-700" />
                </div>
                <h3 className="font-bold text-stone-900 mb-3">Признавање разреда</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Ученику ће бити признати сви раније завршени разреди и положени
                  испити. Решењем директора биће одређени допунски испити. Након
                  полагања свих испита стиче право уписа следећег разреда.
                </p>
              </div>

              {/* Prekvalifikacija */}
              <div className="border border-stone-200 p-6 hover:border-stone-400 transition-colors">
                <div className="w-10 h-10 bg-stone-100 flex items-center justify-center mb-4">
                  <RefreshCw size={20} className="text-stone-700" />
                </div>
                <h3 className="font-bold text-stone-900 mb-3">Преквалификација</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Одрасли са завршеним средњим образовањем могу се уписати ради
                  <strong> преквалификације</strong> или{" "}
                  <strong>доквалификације</strong>. Полажу испите из стручних
                  предмета или додатних предмета – разлику у односу на претходни програм.
                </p>
              </div>
            </div>

            {/* Poređenje */}
            <div className="bg-stone-50 p-8">
              <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
                <TrendingUp size={18} className="text-crimson-700" />
                Поређење облика школовања
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="text-left py-3 px-4 text-stone-400 font-semibold text-xs uppercase tracking-wide">
                        Карактеристика
                      </th>
                      <th className="py-3 px-4 text-crimson-700 font-bold text-center">
                        Редовно
                      </th>
                      <th className="py-3 px-4 text-stone-900 font-bold text-center">
                        Ванредно
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {[
                      ["Узраст", "До 17 година", "17+ година"],
                      ["Трајање", "3–4 године", "Флексибилно"],
                      ["Термини", "Свакодневно", "По договору"],
                      ["Предуслов", "Завршена основна школа", "Завршена основна школа"],
                      ["Диплома", "Да – пуноправна", "Да – пуноправна"],
                      ["Преквалификација", "Не", "Да"],
                      ["Признавање испита", "Не примењује се", "Да – претходно положени"],
                    ].map(([k, v1, v2]) => (
                      <tr key={k} className="hover:bg-white transition-colors">
                        <td className="py-3.5 px-4 text-stone-600 font-medium">{k}</td>
                        <td className="py-3.5 px-4 text-center text-crimson-700 font-semibold">
                          {v1}
                        </td>
                        <td className="py-3.5 px-4 text-center text-stone-700">{v2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Kontakt vanredno */}
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-900 text-white p-6">
              <div>
                <p className="font-bold mb-0.5">Информације о ванредном школовању</p>
                <p className="text-stone-400 text-sm">
                  Контактирајте нас за све информације о уписним условима и програмима.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a
                  href="tel:0648129695"
                  className="flex items-center gap-2 bg-white text-stone-900 px-5 py-2.5 font-bold text-sm hover:bg-stone-100 transition-colors"
                >
                  <Phone size={15} />
                  064/812-96-95
                </a>
                <Link
                  href="/kontakt"
                  className="flex items-center gap-2 border border-stone-600 hover:border-stone-400 text-white px-5 py-2.5 text-sm font-semibold transition-colors"
                >
                  Контакт
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}