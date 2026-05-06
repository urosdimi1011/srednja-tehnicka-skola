import Link from "next/link";
import {
  Phone,
  Mail,
  ArrowRight,
  Info,
  ClipboardList,
  FileText,
} from "lucide-react";
import PageHeader from "../components/Pageheader";
import Button from "../components/Button";
import { getUpis } from "@/services/upisService";

export async function generateMetadata() {
  const upis = await getUpis();
  const godina = upis?.title ?? "2026/2027";
  return {
    title: `Upis ${godina} | Srednja Tehnička Škola Beograd`,
    description:
      upis?.description ??
      `Informacije o upisu u Srednju Tehničku Školu za školsku ${godina}. godinu.`,
  };
}

export default async function UpisPage() {
  const upis = await getUpis();
  const godina = upis?.title ?? "2026/2027";

  return (
    <>
      <PageHeader
        title={
          <>
            Упис <span className="text-crimson-500">{godina}</span>
          </>
        }
        subtitle={
          upis?.description ??
          "Пријавите се за нову школску годину. Конкурс је отворен за све заинтересоване кандидате – редовно и ванредно школовање."
        }
        breadcrumbs={[{ label: `Упис ${godina}` }]}
      />

      {/* Banner */}
      <div className="bg-crimson-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <Info size={18} className="shrink-0" />
          <p className="text-sm">
            <strong>Конкурс је у току!</strong> За тачне датуме контактирајте
            секретаријат на{" "}
            <a
              href="tel:0648129695"
              className="underline hover:no-underline font-bold"
            >
              064/812-96-95
            </a>{" "}
            или{" "}
            <a
              href="mailto:srednjatehnickaskola@gmail.com"
              className="underline hover:no-underline"
            >
              srednjatehnickaskola@gmail.com
            </a>
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {upis?.content ? (
                <div
                  className="prose prose-stone prose-sm max-w-none
                    prose-headings:font-bold prose-headings:text-stone-900
                    prose-h2:text-xl prose-h3:text-base
                    prose-p:text-stone-600 prose-p:leading-relaxed
                    prose-li:text-stone-600
                    prose-strong:text-stone-900
                    prose-a:text-crimson-700 prose-a:no-underline hover:prose-a:underline
                    prose-ul:space-y-1 prose-ol:space-y-1
                    [&_table]:w-full [&_table]:border-collapse
                    [&_th]:bg-crimson-700 [&_th]:text-white [&_th]:px-4 [&_th]:py-2 [&_th]:text-sm [&_th]:font-bold [&_th]:text-left
                    [&_td]:border [&_td]:border-stone-200 [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-sm [&_td]:text-stone-700
                    [&_tr:hover_td]:bg-stone-50"
                  dangerouslySetInnerHTML={{ __html: upis.content }}
                />
              ) : (
                <p className="text-stone-400 text-sm">
                  Садржај о упису тренутно није доступан. Контактирајте
                  секретаријат за информације.
                </p>
              )}

              {/* Dugme za profile — uvek statičko */}
              <div className="pt-4 border-t border-stone-100">
                <span className="section-tag">Профили</span>
                <h2 className="section-title">Доступни образовни профили</h2>
                <div className="divider-crimson" />
                <p className="text-stone-500 text-sm mt-2 mb-6">
                  Погледајте комплетну листу профила и изаберите занимање које
                  вам одговара.
                </p>
                <Button
                  href="/obrazovni-profili"
                  variant="primary"
                  size="md"
                  iconLeft={ClipboardList}
                  iconRight={ArrowRight}
                >
                  Погледај образовне профиле
                </Button>
              </div>
            </div>

            {/* Desna kolona — uvek statička */}
            <div className="space-y-6">
              <div className="bg-[#114880] p-8 text-white sticky top-24">
                <h3 className="font-bold text-lg mb-1">Информишите се</h3>
                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                  За све информације у вези са уписом, документацијом и роковима
                  контактирајте нас директно.
                </p>

                <div className="space-y-4">
                  <a
                    href="tel:0113235500"
                    className="flex items-center gap-3 bg-crimson-700 hover:bg-crimson-800 text-white px-5 py-3.5 transition-colors w-full font-bold"
                  >
                    <Phone size={18} />
                    <div>
                      <p className="text-xs text-crimson-300 leading-none mb-0.5">
                        Централа
                      </p>
                      <p>011/323-55-00</p>
                    </div>
                  </a>
                  <a
                    href="tel:0648129695"
                    className="flex items-center gap-3 border border-white/20 hover:border-crimson-400 text-white px-5 py-3.5 transition-colors w-full"
                  >
                    <Phone size={18} className="text-crimson-400" />
                    <div>
                      <p className="text-xs text-white/50 leading-none mb-0.5">
                        Ванредно / Редовно
                      </p>
                      <p className="text-sm">064/812-96-95</p>
                    </div>
                  </a>
                  <a
                    href="mailto:srednjatehnickaskola@gmail.com"
                    className="flex items-center gap-3 border border-white/20 hover:border-crimson-400 text-white px-5 py-3.5 transition-colors w-full"
                  >
                    <Mail size={18} className="text-crimson-400" />
                    <div>
                      <p className="text-xs text-white/50 leading-none mb-0.5">
                        Е-пошта
                      </p>
                      <p className="text-sm">srednjatehnickaskola@gmail.com</p>
                    </div>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-white/15">
                  <Link
                    href="/kontakt"
                    className="text-crimson-300 text-sm font-semibold hover:text-crimson-200 flex items-center gap-2 group"
                  >
                    Контакт страна
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>

              <div className="bg-crimson-50 border border-crimson-100 p-6">
                <FileText size={24} className="text-crimson-700 mb-3" />
                <h4 className="font-bold text-stone-900 mb-2 text-sm">
                  Важна напомена
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Сва документа предају се лично у секретаријату школе.
                  Фотокопије морају бити читке. За ванредне ученике постоје
                  посебни услови – контактирајте нас.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
