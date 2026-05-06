export const dynamic = "force-dynamic";
import Link from "next/link";
import {
  Phone,
  Mail,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Users,
  Award,
  ClipboardList,
  Wrench,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import HeroSlider from "./components/HeroSlider";
import { getSviProfili } from "@/services/profiliService";
import { ikonePoProfilu } from "@/data/profiliIkone";
import ObavestenjaSlider from "./components/ObavestenjaSlider";
import { getAktivnaObavestenja } from "@/services/obavestenjaService";
import Button from "./components/Button";
import { getUpis } from "@/services/upisService";

const upisKoraci = [
  {
    step: "01",
    title: "Конкурс",
    desc: "Пратите рокове јунског и августовског уписног рока.",
  },
  {
    step: "02",
    title: "Пријава",
    desc: "Предајте документацију у секретаријату школе.",
  },
  {
    step: "03",
    title: "Рангирање",
    desc: "Листа жеља и ранг листа се формирају на основу успеха.",
  },
  {
    step: "04",
    title: "Упис",
    desc: "Потврда уписа и почетак школске године.",
  },
];
export default async function Home() {
  const [profili, obavestenja, upis] = await Promise.all([
    getSviProfili(),
    getAktivnaObavestenja(3),
    getUpis(),
  ]);
  return (
    <>
      <HeroSlider />

      {obavestenja.length > 0 && (
        <ObavestenjaSlider obavestenja={obavestenja} />
      )}

      <section className="py-20 bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-40" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-tag">Конкурс</span>
              <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
                Упис{" "}
                <span className="text-crimson-700">
                  {upis?.title ?? "2026/2027"}
                </span>
              </h2>
              <div className="divider-crimson" />
              <p className="text-stone-600 text-base leading-relaxed mb-8">
                {upis?.description ??
                  "Пријавите се за нову школску годину. Конкурс је отворен за све заинтересоване кандидате. Упишите занимање будућности и осигурајте себи квалификацију коју тржиште рада тражи."}
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Без пријемног испита",
                  "Редовно и ванредно школовање",
                  "Стручна пракса у фирмама",
                  "Модерно опремљене лабораторије",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-stone-700 text-sm"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-crimson-700 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 flex-wrap">
                <Button
                  href="/upis"
                  variant="primary"
                  size="md"
                  iconLeft={CalendarDays}
                  iconRight={ArrowRight}
                >
                  Детаљи уписа
                </Button>
                <Button
                  href="tel:0113235500"
                  variant="outline"
                  size="md"
                  iconLeft={Phone}
                >
                  Позовите нас
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {upisKoraci.map((korak) => (
                <div
                  key={korak.step}
                  className="bg-white p-6 shadow-sm border border-stone-100 hover:shadow-lg hover:border-crimson-100 transition-all duration-300 group"
                >
                  <div className="text-4xl font-black text-crimson-100 group-hover:text-crimson-200 transition-colors mb-3">
                    {korak.step}
                  </div>
                  <h3 className="font-bold text-stone-900 mb-2">
                    {korak.title}
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    {korak.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white obrazovni-profili-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-crimson-400 mb-3">
              Образовање
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Образовни профили
            </h2>
            <p className="mt-4 text-center text-stone-500 text-sm">
              Бирај међу {profili.length}+ стручних занимања прилагођених
              потребама савременог тржишта рада.
            </p>
            <div className="w-12 h-1 bg-crimson-700 mx-auto mt-5" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <Button
              href="/obrazovni-profili"
              variant="ghost"
              size="sm"
              iconRight={ArrowRight}
            >
              Сви профили
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {profili.map((profil) => {
              const Icon = ikonePoProfilu[profil.slug] ?? GraduationCap;
              return (
                <Link
                  key={profil.id}
                  href={`/obrazovni-profili/${profil.slug}`}
                  className="group flex items-start gap-5 p-6 border border-stone-200 hover:border-crimson-200 hover:shadow-lg transition-all duration-300 bg-white hover:bg-crimson-50/30"
                >
                  <div className="w-12 h-12 bg-stone-100 group-hover:bg-crimson-700 flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Icon
                      size={22}
                      className="text-crimson-700 group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm leading-snug mb-1 group-hover:text-crimson-800 transition-colors">
                      {profil.naziv}
                    </h3>
                    <span className="text-xs text-stone-400 font-medium">
                      Стручно образовање
                    </span>
                  </div>
                  <ChevronRight
                    size={16}
                    className="ml-auto text-stone-300 group-hover:text-crimson-700 group-hover:translate-x-1 transition-all shrink-0 mt-0.5"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#114880] relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-crimson-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-crimson-300 mb-3">
              Зашто Доситеј
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Наше предности
            </h2>
            <div className="w-12 h-1 bg-crimson-500 mx-auto mt-5" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: GraduationCap,
                title: "Стручни наставници",
                desc: "Предавачи са вишегодишњим практичним искуством у струци.",
              },
              {
                icon: BookOpen,
                title: "Савремени програми",
                desc: "Наставни планови усклађени са потребама тржишта рада.",
              },
              {
                icon: Users,
                title: "Мале групе",
                desc: "Индивидуалан приступ сваком ученику и студенту.",
              },
              {
                icon: Award,
                title: "Признате квалификације",
                desc: "Дипломе признате у земљи и иностранству.",
              },
              {
                icon: ClipboardList,
                title: "Стручна пракса",
                desc: "Сарадња са водећим фирмама за практичну наставу.",
              },
              {
                icon: Wrench,
                title: "Модерна опрема",
                desc: "Савремено опремљене лабораторије и радионице.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group p-6 border border-white/10 hover:border-crimson-400/50 hover:bg-white/5 transition-all duration-300 rounded-sm"
                >
                  <Icon
                    size={28}
                    className="text-crimson-400 mb-4 group-hover:text-crimson-300 transition-colors"
                  />
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Phone Banner */}
      <section className="py-16 bg-crimson-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-10 w-48 h-48 rounded-full border border-white animate-float-slow" />
          <div className="absolute -bottom-10 left-20 w-72 h-72 rounded-full border border-white animate-float-medium" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">
            Имате питање?
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-black mb-3">
            Позовите нас данас
          </h2>
          <p className="text-crimson-200 mb-8 text-base">
            Стручно особље је ту да одговори на сва ваша питања у вези са
            уписом, школовањем и образовним профилима.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              href="tel:0113235500"
              variant="primary"
              size="lg"
              iconLeft={Phone}
            >
              011/323-55-00
            </Button>
            <Button
              href="mailto:srednjatehnickaskola@gmail.com"
              variant="light"
              size="lg"
              iconLeft={Mail}
            >
              srednjatehnickaskola@gmail.com
            </Button>
          </div>
          <p className="text-crimson-300 text-xs mt-5">
            Ванредно: 064/812-96-95 &nbsp;|&nbsp; Редовно: 064/812-96-95
          </p>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <span className="section-tag">Брзе информације</span>
              <h2 className="text-2xl font-bold text-stone-900">
                Све на једном месту
              </h2>
              <div className="divider-crimson" />
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Phone,
                  title: "Централа",
                  value: "011/323-55-00",
                  href: "tel:0113235500",
                },
                {
                  icon: Phone,
                  title: "Ванредно школовање",
                  value: "064/812-96-95",
                  href: "tel:0648129695",
                },
                {
                  icon: Mail,
                  title: "Е-пошта",
                  value: "srednjatehnickaskola@gmail.com",
                  href: "mailto:srednjatehnickaskola@gmail.com",
                },
                {
                  icon: CalendarDays,
                  title: "Упис 2026/2027",
                  value: "Пријаве у току",
                  href: "/upis",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-4 p-5 border border-stone-100 hover:border-crimson-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-crimson-50 group-hover:bg-crimson-700 flex items-center justify-center transition-colors shrink-0">
                      <Icon
                        size={18}
                        className="text-crimson-700 group-hover:text-white transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-stone-400 text-xs font-medium">
                        {item.title}
                      </p>
                      <p className="text-stone-900 font-bold text-sm">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
