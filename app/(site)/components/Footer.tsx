import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Clock,
  ExternalLink,
} from "lucide-react";

const navLinks = [
  { label: "Почетна", href: "/" },
  { label: "Мисија и визија", href: "/o-nama/misija-i-vizija" },
  { label: "Школовање", href: "/skolovanje" },
  { label: "Документација", href: "/o-nama/dokumentacija" },
  { label: "Образовни профили", href: "/obrazovni-profili" },
  { label: "Упис 2026/2027", href: "/upis" },
  { label: "Контакт", href: "/kontakt" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#114880] text-white/80">
      <div className="bg-crimson-800">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-lg">
              Заинтересовани за упис?
            </p>
            <p className="text-white/80 text-sm">
              Позовите нас или пошаљите е-пошту – радо ћемо одговорити на сва
              питања.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a
              href="tel:0113235500"
              className="flex items-center gap-2 bg-white text-[#114880] px-6 py-3 font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              <Phone size={16} />
              011/323-55-00
            </a>
            <Link
              href="/kontakt"
              className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Контакт страна
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <Link href="/" className="inline-block mb-5">
            <img
              src={"/files/img/favicon.png"}
              alt="Logo Srednje Tehničke Škole"
              className="w-16 h-16 object-contain"
            />
          </Link>
          <p className="text-white/70 text-sm leading-relaxed mb-5">
            Образујемо стручне кадрове у техничким занимањима, спремне за
            изазове савременог тржишта рада.
          </p>
          <div className="flex gap-3">
            {[
              {
                href: "https://www.facebook.com/AkademijaDositej/?locale=sr_RS",
                icon: Facebook,
                label: "Facebook",
              },
              {
                href: "https://www.instagram.com/ss_dositej/",
                icon: Instagram,
                label: "Instagram",
              },
              {
                href: "https://www.youtube.com/@ss_dositej",
                icon: Youtube,
                label: "YouTube",
              },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-crimson-600 text-white/80 hover:text-white flex items-center justify-center transition-colors rounded-md"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
            Навигација
          </h3>
          <ul className="space-y-3">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/70 text-sm hover:text-crimson-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-3 h-px bg-white/40 group-hover:bg-crimson-400 group-hover:w-5 transition-all duration-200" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
            Радно Време
          </h3>
          <div className="space-y-4">
            {[
              { title: "Секретаријат", hours: "Пон – Пет: 08:00 – 15:00" },
              { title: "Редовно школовање", hours: "По распореду" },
              { title: "Ванредно школовање", hours: "По договору" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <Clock size={15} className="text-crimson-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/90 text-sm font-medium">
                    {item.title}
                  </p>
                  <p className="text-white/50 text-xs mt-0.5">{item.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
            Контакт
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Phone size={15} className="text-crimson-400 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <div>
                  <p className="text-white/50 text-xs">Централа</p>
                  <a
                    href="tel:0113235500"
                    className="text-white/90 text-sm font-medium hover:text-crimson-300 transition-colors"
                  >
                    011/323-55-00
                  </a>
                </div>
                <div>
                  <p className="text-white/50 text-xs">Ванредно школовање</p>
                  <a
                    href="tel:0648129695"
                    className="text-white/90 text-sm font-medium hover:text-crimson-300 transition-colors"
                  >
                    064/812-96-95
                  </a>
                </div>
                <div>
                  <p className="text-white/50 text-xs">Редовно школовање</p>
                  <a
                    href="tel:0648129695"
                    className="text-white/90 text-sm font-medium hover:text-crimson-300 transition-colors"
                  >
                    064/812-96-95
                  </a>
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={15} className="text-crimson-400 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <a
                  href="mailto:srednjatehnickaskola@gmail.com"
                  className="block text-white/90 text-sm hover:text-crimson-300 transition-colors"
                >
                  srednjatehnickaskola@gmail.com
                </a>
                <a
                  href="mailto:srednjatehnickaskola@gmail.com"
                  className="block text-white/60 text-xs hover:text-crimson-300 transition-colors"
                >
                  srednjatehnickaskola@gmail.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={15} className="text-crimson-400 mt-0.5 shrink-0" />
              <p className="text-white/80 text-sm">Београд, Србија</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">
            © {year} Средња Техничка Школа. Сва права задржана.
          </p>
          <p className="text-white/40 text-xs">
            Образовање | Квалитет | Будућност
          </p>
        </div>
      </div>
    </footer>
  );
}
