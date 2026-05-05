import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  FileText,
  Phone,
  Mail,
  ArrowRight,
  Info,
  ClipboardList,
  UserPlus,
  Clock,
} from "lucide-react";
import PageHeader from "../components/Pageheader";
import InfoCardGrid from "../components/InfoCardGrid";
import Button from "../components/Button";

export const metadata = {
  title: "Upis 2026/2027 | Srednja Tehnička Škola Beograd",
  description:
    "Informacije o upisu u Srednju Tehničku Školu za školsku 2026/2027. godinu. Rokovi, dokumentacija, obrazovni profili i kontakt.",
  keywords: [
    "upis 2026",
    "upis u srednju školu",
    "tehnička škola upis",
    "dokumentacija za upis",
    "rok za upis",
  ],
  openGraph: {
    title: "Upis 2026/2027 | Srednja Tehnička Škola",
    description: "Sve informacije o upisu – rokovi, dokumenta i kontakt",
    type: "website",
  },
};

const upisKartice = [
  {
    icon: CalendarDays,
    label: "Rokovi za prijavu",
    value: "Jun i avgust 2026",
    href: "#rokovi",
    desc: "Dva upisna roka – pogledajte tačne datume",
  },
  {
    icon: FileText,
    label: "Potrebna dokumenta",
    value: "Spisak od 6 dokumenata",
    href: "#dokumentacija",
    desc: "Šta sve treba da priložite",
  },
  {
    icon: UserPlus,
    label: "Način prijave",
    value: "Lično ili onlajn",
    href: "/kontakt",
    desc: "Prijava preko sekretarijata ili mejlom",
  },
  {
    icon: ClipboardList,
    label: "Obrazovni profili",
    value: "Više od 10 smerova",
    href: "/obrazovni-profili",
    desc: "Pogledajte sve tehničke profile",
  },
  {
    icon: Clock,
    label: "Trajanje školovanja",
    value: "3 ili 4 godine",
    href: "/o-nama/skolovanje",
    desc: "Zavisno od profila – redovno ili vanredno",
  },
  {
    icon: CheckCircle2,
    label: "Uslovi upisa",
    value: "Završena osnovna škola",
    href: "#",
    desc: "Položen završni ispit i ispunjenost kriterijuma",
  },
];

const dokumenta = [
  "Пријавни лист (добија се у школи или онлајн)",
  "Фотокопија сведочанстава свих разреда основне школе",
  "Диплома о завршеној основној школи",
  "Извод из матичне књиге рођених",
  "Две фотографије (3,5 × 4,5 цм)",
  "Здравствена књижица на увид",
];

const rokovi = [
  {
    phase: "Јунски рок",
    items: [
      { label: "Пријава кандидата", date: "Јун 2026" },
      { label: "Објава прелиминарне листе", date: "Јун 2026" },
      { label: "Коначна ранг листа", date: "Јун 2026" },
      { label: "Упис примљених ученика", date: "Јун/Јул 2026" },
    ],
  },
  {
    phase: "Августовски рок",
    items: [
      { label: "Пријава кандидата", date: "Август 2026" },
      { label: "Објава ранг листе", date: "Август 2026" },
      { label: "Упис примљених ученика", date: "Август 2026" },
    ],
  },
];

export default function UpisPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Упис <span className="text-crimson-500">2026/2027</span>
          </>
        }
        subtitle="Пријавите се за нову школску годину. Конкурс је отворен за све заинтересоване кандидате – редовно и ванредно школовање."
        breadcrumbs={[{ label: "Упис 2026/2027" }]}
      />

      <div className="bg-crimson-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <Info size={18} className="shrink-0" />
          <p className="text-sm">
            <strong>Конкурс је у току!</strong> За тачне датуме контактирајте
            секретаријат на
            <a
              href="tel:0648129695"
              className="underline hover:no-underline font-bold mx-1"
            >
              064/812-96-95
            </a>
            или
            <a
              href="mailto:srednjatehnickaskola@gmail.com"
              className="underline hover:no-underline mx-1"
            >
              srednjatehnickaskola@gmail.com
            </a>
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-14">
              <div>
                <InfoCardGrid
                  title={{
                    tag: "UPIS 2026/2027",
                    main: "Како се уписати?",
                    subtitle:
                      "Све што вам треба за успешну пријаву – рокови, документација и кораци.",
                  }}
                  items={null}
                  variant="default"
                  showArrow
                />
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {rokovi.map((rok) => (
                    <div
                      key={rok.phase}
                      className="border border-stone-200 overflow-hidden"
                    >
                      <div className="bg-crimson-700 text-white px-6 py-4">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={16} />
                          <h3 className="font-bold text-sm">{rok.phase}</h3>
                        </div>
                      </div>
                      <div className="divide-y divide-stone-100">
                        {rok.items.map((item) => (
                          <div
                            key={item.label}
                            className="px-6 py-3.5 flex justify-between items-center"
                          >
                            <span className="text-stone-600 text-sm">
                              {item.label}
                            </span>
                            <span className="text-crimson-700 font-semibold text-sm">
                              {item.date}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dokumenta */}
              <div>
                <span className="section-tag">Документација</span>
                <h2 className="section-title">Потребна документа</h2>
                <div className="divider-crimson" />
                <p className="text-stone-500 text-sm mb-6 mt-2">
                  Следећа документа потребно је доставити приликом пријаве:
                </p>
                <ul className="space-y-3">
                  {dokumenta.map((doc, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-crimson-700 shrink-0 mt-0.5"
                      />
                      <span className="text-stone-700 text-sm">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Obrazovni profili */}
              <div>
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
