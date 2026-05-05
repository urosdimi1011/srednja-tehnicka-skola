import Link from "next/link";
import {
  Mail,
  ArrowRight,
  Heart,
  Target,
  Users,
  Award,
  Shield,
  Sparkles,
  BookOpen,
  GraduationCap,
  Globe,
  Compass,
  CheckCircle2,
  Lightbulb,
  Handshake,
  Gem,
} from "lucide-react";
import PageHeader from "../components/Pageheader";
import Button from "../components/Button";
import InfoCardGrid from "../components/InfoCardGrid";

export const metadata = {
  title: "Misija i vizija",
  description:
    "Misija i vizija Srednje Tehničke Škole - kvalitetno tehničko obrazovanje, razvoj potencijala učenika i priprema za uspešnu karijeru u Beogradu.",
  keywords: [
    "misija škole",
    "vizija škole",
    "tehnička škola beograd",
    "vrednosti škole",
    "ciljevi obrazovanja",
  ],
  openGraph: {
    title: "Misija i vizija | Srednja Tehnička Škola",
    description: "Upoznajte misiju, viziju i vrednosti naše škole",
    type: "website",
  },
};
const vrednosti = [
  {
    icon: Target,
    title: "Стручна заступљеност",
    desc: "Негујемо квалитет наставе и стручно усавршавање наставника и ученика.",
  },
  {
    icon: Heart,
    title: "Толеранција и сарадња",
    desc: "Изграђујемо односе засноване на међусобном поштовању, разумевању и тимском раду.",
  },
  {
    icon: Users,
    title: "Индивидуални приступ",
    desc: "Сваки ученик је јединствен — прилагођавамо методе рада његовим потребама.",
  },
  {
    icon: Gem,
    title: "Развој потенцијала",
    desc: "Омогућавамо максималан развој способности, како у професији тако и у животу.",
  },
  {
    icon: Globe,
    title: "Светски стандарди",
    desc: "Тежимо школи примереној највишим образовним стандардима и праксама.",
  },
  {
    icon: Handshake,
    title: "Демократски односи",
    desc: "Негујемо толерантне и демократске односе између свих актера школског живота.",
  },
];

const principiVizije = [
  {
    icon: Sparkles,
    title: "Савремене технологије",
    desc: "Школа мора да буде место сусрета са најсавременијим технологијама и интерактивним методама учења.",
  },
  {
    icon: Lightbulb,
    title: "Креативна настава",
    desc: "Усмерени смо ка стицању знања на занимљив и креативан начин.",
  },
  {
    icon: Compass,
    title: "Припрема за живот",
    desc: "Припремамо ученике за квалитетнији и садржајно богатији живот.",
  },
  {
    icon: Shield,
    title: "Мултидисциплинарност",
    desc: "Заједничким радом кроз мултидисциплинарне тимове примењујемо најбоље методе.",
  },
];

const ciljevi = [
  {
    title: "Професионални развој",
    items: [
      "Стицање квалитетног знања у струци",
      "Припрема за запослење након школовања",
      "Основа за наставак школовања на високошколским установама",
    ],
  },
  {
    title: "Лични развој",
    items: [
      "Развијање самопоуздања и одговорности",
      "Подстицање креативности и критичког мишљења",
      "Неговање културе дијалога и сарадње",
    ],
  },
];

export default async function MisijaIVizijaPage() {
  return (
    <>
      <PageHeader
        title="Мисија и визија"
        subtitle="Мисија и визија Средње техничке школе - квалитетно техничко образовање, развој потенцијала ученика и припрема за успешну каријеру у Београду."
        breadcrumbs={[{ label: "Мисија и визија" }]}
      />

      <section className="py-20 bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-40" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <InfoCardGrid
                title={{
                  tag: "НАША ВИЗИЈА",
                  main: "Школа примерена светским стандардима",
                  subtitle:
                    "Тежимо да постанемо школа која припрема ученике за квалитетнији и садржајно богатији живот...",
                }}
                items={[]}
              />
              <ul className="space-y-3 mb-8">
                {[
                  "Обезбеђујемо услове да сваки ученик максимално развије сопствене потенцијале",
                  "Припремамо ученике како за професију, тако и за живот",
                  "Поштујемо индивидуалне способности и различитости",
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
                  href="/obrazovni-profili"
                  variant="outline"
                  size="md"
                  iconLeft={GraduationCap}
                  iconRight={ArrowRight}
                >
                  Наши профили
                </Button>
                <Button
                  href="/kontakt"
                  variant="outline"
                  size="md"
                  iconLeft={Mail}
                >
                  Контактирајте нас
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {vrednosti.slice(0, 4).map((vrednost, index) => {
                const Icon = vrednost.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-6 shadow-sm border border-stone-100 hover:shadow-lg hover:border-crimson-100 transition-all duration-300 group"
                  >
                    <div className="mb-4">
                      <Icon
                        size={32}
                        className="text-crimson-600 group-hover:text-crimson-700 transition-colors"
                      />
                    </div>
                    <h3 className="font-bold text-stone-900 mb-2 text-base">
                      {vrednost.title}
                    </h3>
                    <p className="text-stone-500 text-xs leading-relaxed">
                      {vrednost.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-crimson-400 mb-3">
              НАША ВИЗИЈА
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Школа примерена светским стандардима
            </h2>
            <p className="mt-4 text-center text-stone-500 text-sm max-w-2xl mx-auto">
              Тежимо да постанемо школа која припрема ученике за квалитетнији и
              садржајно богатији живот, у којој се поштују индивидуалне
              способности и различитости.
            </p>
            <div className="w-12 h-1 bg-crimson-700 mx-auto mt-5" />
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-16">
            {principiVizije.map((princip) => {
              const Icon = princip.icon;
              return (
                <div
                  key={princip.title}
                  className="group flex gap-5 p-6 border border-stone-200 hover:border-crimson-200 hover:shadow-lg transition-all duration-300 bg-white hover:bg-crimson-50/30"
                >
                  <div className="w-14 h-14 bg-stone-100 group-hover:bg-crimson-700 flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Icon
                      size={28}
                      className="text-crimson-700 group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base mb-2 group-hover:text-crimson-800 transition-colors">
                      {princip.title}
                    </h3>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      {princip.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {ciljevi.map((cilj, index) => (
              <div
                key={index}
                className="bg-stone-50 p-8 border border-stone-200 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-crimson-100/30 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-2xl font-bold text-stone-900 mb-6 relative z-10">
                  {cilj.title}
                </h3>
                <ul className="space-y-4 relative z-10">
                  {cilj.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-stone-700"
                    >
                      <CheckCircle2
                        size={20}
                        className="text-crimson-600 shrink-0 mt-0.5"
                      />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#114880] relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-crimson-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-crimson-300 mb-3">
            ЗАЈЕДНИЧКА ОДГОВОРНОСТ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Визија постаје стварност само када одговорност једнако преузму сви
          </h2>
          <div className="w-12 h-1 bg-crimson-500 mx-auto mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { role: "Професори", icon: Users },
              { role: "Директор", icon: Award },
              { role: "Стручни сарадници", icon: GraduationCap },
              { role: "Ученици и родитељи", icon: Heart },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.role} className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/20">
                    <Icon size={28} className="text-crimson-300" />
                  </div>
                  <p className="text-white/90 font-medium text-sm">
                    {item.role}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="text-white/70 text-sm mt-10 max-w-2xl mx-auto">
            Само кроз заједнички рад и посвећеност можемо обезбедити квалитетну
            и интересантну наставу која делује мотивишуће и инспиративно.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <span className="section-tag">НАКОН ШКОЛОВАЊА</span>
              <h2 className="text-2xl font-bold text-stone-900">
                Шта стичу наши ученици
              </h2>
              <div className="divider-crimson" />
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: GraduationCap,
                  title: "Квалитетно знање у струци",
                  desc: "Свеобухватна знања која омогућавају бољу проходност за рад",
                },
                {
                  icon: Award,
                  title: "Припрема за запослење",
                  desc: "Спремност за тржиште рада и конкурентност",
                },
                {
                  icon: BookOpen,
                  title: "Наставак школовања",
                  desc: "Припремљеност за успешно школовање на високошколским установама",
                },
                {
                  icon: Shield,
                  title: "Званично призната диплома",
                  desc: "Решење Министарства просвете, науке и технолошког развоја",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-5 border border-stone-100 hover:border-crimson-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-crimson-50 group-hover:bg-crimson-700 flex items-center justify-center transition-colors shrink-0 mt-1">
                      <Icon
                        size={18}
                        className="text-crimson-700 group-hover:text-white transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-stone-900 font-bold text-sm mb-1">
                        {item.title}
                      </p>
                      <p className="text-stone-500 text-xs">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-crimson-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-10 w-48 h-48 rounded-full border border-white" />
          <div className="absolute -bottom-10 left-20 w-72 h-72 rounded-full border border-white" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-black mb-3">
            Образовни профили
          </h2>
          <p className="text-crimson-200 mb-8 text-base max-w-2xl mx-auto">
            Техничка школа пружа могућност похађања великог броја образовних
            профила свима који желе квалитетно знање у струци.
          </p>
          <Link
            href="/obrazovni-profili"
            className="inline-flex items-center gap-3 bg-white text-crimson-700 px-10 py-4 font-black text-lg hover:bg-stone-100 transition-colors shadow-lg group"
          >
            Погледајте све профиле
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </section>

      {/* Informacije o rešenju ministarstva - kao brze informacije na početnoj */}
      {/* <section className="py-16 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-stone-50 border border-stone-200 p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-16 h-16 bg-crimson-100 flex items-center justify-center shrink-0">
                <Shield size={32} className="text-crimson-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-stone-900 text-lg mb-2">
                  Решење Министарства просвете, науке и технолошког развоја
                </h3>
                <p className="text-stone-600 text-sm">
                  Под бројем 022-05-00202/2017-03 утврђено је да Техничка школа испуњава прописане услове 
                  за спровођење наставног плана и програма за једногодишње, трогодишње и четворогодишње 
                  образовне профиле.
                </p>
              </div>
              <Link
                href="/dokumenta"
                className="btn-outline text-nowrap shrink-0"
              >
                <ClipboardList size={16} />
                Више информација
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
