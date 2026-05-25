import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import PageHeader from "../components/Pageheader";
import InfoCardGrid from "../components/InfoCardGrid";

export const metadata = {
  title: "Kontakt",
  description:
    "Kontaktirajte Srednju Tehničku Školu u Beogradu. Telefon: 011/323-55-00, email: srednjatehnickaskola@gmail.com. Radno vreme i adresa škole.",
  keywords: [
    "kontakt škola",
    "telefon škola",
    "tehnička škola beograd kontakt",
    "email škola",
    "adresa škole",
  ],
  openGraph: {
    title: "Kontakt | Srednja Tehnička Škola",
    description: "Kako do nas? Telefon, email, radno vreme i mapa.",
    type: "website",
  },
};

const contactInfo = [
  {
    icon: Phone,
    label: "Телефон централа",
    value: "011/323-55-00",
    href: "tel:0113235500",
    desc: "Главна линија за све упите",
  },
  {
    icon: Phone,
    label: "Ванредно школовање",
    value: "064/812-96-95",
    href: "tel:0648129695",
    desc: "За питања о ванредном школовању",
  },
  {
    icon: Phone,
    label: "Редовно школовање",
    value: "064/812-96-95",
    href: "tel:0648129695",
    desc: "За питања о редовном школовању",
  },
  {
    icon: Mail,
    label: "Е-пошта (службена)",
    value: "srednjatehnickaskola@gmail.com",
    href: "mailto:srednjatehnickaskola@gmail.com",
    desc: "За службену преписку",
  },
  {
    icon: Mail,
    label: "Е-пошта (Gmail)",
    value: "srednjatehnickaskola@gmail.com",
    href: "mailto:srednjatehnickaskola@gmail.com",
    desc: "Алтернативна адреса",
  },
  {
    icon: MapPin,
    label: "Адреса",
    value: "Булевар војводе Путника 7, Београд",
    href: "https://maps.google.com/?q=Булевар+војводе+Путника+7,+Београд",
    desc: "Погледајте на мапи",
  },
];

const workingHours = [
  { day: "Понедељак – Петак", hours: "08:00 – 15:00" },
  { day: "Субота", hours: "По договору" },
  { day: "Недеља", hours: "Затворено" },
];

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        title="Контакт"
        subtitle="Стоји нам на располагању тим стручних сарадника. Пишите нам или нас позовите – одговорићемо вам у најкраћем могућем року."
        breadcrumbs={[{ label: "Контакт" }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <InfoCardGrid
                title={{
                  tag: "ИНФОРМАЦИЈЕ",
                  main: "Начин контакта",
                  subtitle: "Све информације на једном месту",
                }}
                variant="default"
                items={null}
              />
              <div className="grid sm:grid-cols-2 gap-5 mt-8">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.value}
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group p-6 border border-stone-200 hover:border-crimson-300 hover:shadow-lg transition-all duration-300 bg-white"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 bg-crimson-50 group-hover:bg-crimson-700 flex items-center justify-center shrink-0 transition-colors duration-300">
                          <Icon
                            size={20}
                            className="text-crimson-700 group-hover:text-white transition-colors"
                          />
                        </div>
                        <div>
                          <p className="text-stone-400 text-xs font-semibold uppercase tracking-wide mb-1">
                            {item.label}
                          </p>
                          <p className="text-stone-900 font-bold text-sm break-all">
                            {item.value}
                          </p>
                          <p className="text-stone-400 text-xs mt-1 flex items-center gap-1">
                            {item.desc}
                            <ArrowRight
                              size={10}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#114880] p-8 text-white">
                <div className="flex items-center gap-2 mb-6">
                  <Clock size={18} className="text-crimson-400" />
                  <h3 className="font-bold tracking-wide">Радно Време</h3>
                </div>
                <div className="space-y-4">
                  {workingHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex justify-between items-center border-b border-white/15 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-white/70 text-sm">{item.day}</span>
                      <span
                        className={`text-sm font-semibold ${
                          item.hours === "Затворено"
                            ? "text-white/40"
                            : "text-crimson-300"
                        }`}
                      >
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-crimson-700 p-8 text-white">
                <h3 className="font-bold text-lg mb-2">Позовите директно</h3>
                <p className="text-crimson-200 text-sm mb-5 leading-relaxed">
                  Наш тим је доступан за сва питања у вези са уписом и
                  школовањем.
                </p>
                <a
                  href="tel:0113235500"
                  className="flex items-center gap-3 bg-white text-crimson-700 px-6 py-3 font-bold text-sm hover:bg-stone-100 transition-colors w-full justify-center"
                >
                  <Phone size={18} />
                  011/323-55-00
                </a>
                <p className="text-crimson-300 text-xs text-center mt-3">
                  Пон – Пет, 08:00 – 15:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.123456789!2d20.47890!3d44.80060!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7aa3c0000001%3A0x0!2z0JHRg9C70LXQstCw0YAg0LLQvtGY0LLQvtC00LUg0J_Rg9GC0L3QuNC60LAgNywg0JHQtdC-0LPRgNCw0LQgMTEwMDA!5e0!3m2!1ssr!2srs!4v1"
          width="100%"
          height="420"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Средња Техничка Школа – локација"
        />

        {/* Info overlay */}
        <div className="absolute bottom-6 left-6 bg-[#114880] text-white px-5 py-4 flex items-center gap-3 shadow-xl">
          <MapPin size={18} className="text-crimson-500 shrink-0" />
          <div>
            <p className="font-bold text-sm">Средња Техничка Школа</p>
            <p className="text-stone-400 text-xs">
              Булевар војводе Путника 7, Београд 11000
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Булевар+војводе+Путника+7,+Београд"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 text-xs text-crimson-400 hover:text-crimson-300 font-semibold whitespace-nowrap transition-colors"
          >
            Отвори у Maps →
          </a>
        </div>
      </section>
    </>
  );
}
