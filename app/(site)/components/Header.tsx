"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone, GraduationCap } from "lucide-react";

const oNamaLinks = [
  { name: "Мисија и визија", href: "/misija-i-vizija" },
  { name: "Редовно и ванредно школовање", href: "/skolovanje" },
  { name: "Документација", href: "/dokumentacija" },
];

interface HeaderProps {
  obrazovniProfili: { naziv: string; slug: string }[];
}

export default function Header({ obrazovniProfili }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleDropdown = (name: any) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-crimson-700 text-white text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <span className="opacity-80">Средња Техничка Школа – Београд</span>
          <div className="flex items-center gap-6">
            <a
              href="tel:0648129695"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity font-semibold"
            >
              <Phone size={12} />
              064/812-96-95
            </a>
            <a
              href="mailto:srednjatehnickaskola@gmail.com"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              srednjatehnickaskola@gmail.com
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md border-b border-[#114880]/50"
            : "bg-white border-b border-stone-200"
        }`}
        ref={dropdownRef}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group h-full">
              <img
                src={"/files/img/favicon.png"}
                alt="Logo Srednje Tehničke Škole Dositej Obradović Beograd"
                className="w-full h-full"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={`nav-link px-4 py-2 ${
                  pathname === "/" ? "text-crimson-700 font-semibold" : ""
                }`}
              >
                Почетна
              </Link>

              {/* O nama dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("onama")}
                  className={`nav-link px-4 py-2 flex items-center gap-1 ${
                    pathname.startsWith("/o-nama")
                      ? "text-crimson-700 font-semibold"
                      : ""
                  }`}
                >
                  О нама
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      activeDropdown === "onama" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "onama" && (
                  <div className="dropdown-enter absolute top-full left-0 mt-1 w-64 bg-white shadow-xl border border-stone-100 z-50">
                    <div className="py-1">
                      {oNamaLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-5 py-3 text-sm text-stone-700 hover:bg-crimson-50 hover:text-crimson-700 transition-colors border-b border-stone-50 last:border-0"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Obrazovni profili dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("profili")}
                  className={`nav-link px-4 py-2 flex items-center gap-1 ${
                    pathname.startsWith("/obrazovni-profili")
                      ? "text-crimson-700 font-semibold"
                      : ""
                  }`}
                >
                  Образовни профили
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      activeDropdown === "profili" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "profili" && (
                  <div className="dropdown-enter absolute top-full left-0 mt-1 w-72 bg-white shadow-xl border border-stone-100 z-50">
                    <div className="py-1 max-h-80 overflow-y-auto">
                      {obrazovniProfili.map((profil) => (
                        <Link
                          key={profil.slug}
                          href={`/obrazovni-profili/${profil.slug}`}
                          className="block px-5 py-2.5 text-sm text-stone-700 hover:bg-crimson-50 hover:text-crimson-700 transition-colors border-b border-stone-50 last:border-0"
                        >
                          {profil.naziv}
                        </Link>
                      ))}
                      <Link
                        href="/obrazovni-profili"
                        className="block px-5 py-3 text-sm font-semibold text-crimson-700 hover:bg-crimson-700 hover:text-white transition-colors bg-stone-50"
                      >
                        → Сви образовни профили
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/upis"
                className={`nav-link px-4 py-2 ${
                  pathname === "/upis" ? "text-crimson-700 font-semibold" : ""
                }`}
              >
                Упис
              </Link>

              <Link
                href="/kontakt"
                className={`nav-link px-4 py-2 ${
                  pathname === "/kontakt"
                    ? "text-crimson-700 font-semibold"
                    : ""
                }`}
              >
                Контакт
              </Link>
              <Link
                href="/galerija"
                className={`nav-link px-4 py-2 ${
                  pathname === "/galerija"
                    ? "text-crimson-700 font-semibold"
                    : ""
                }`}
              >
                Галерија
              </Link>
              <a
                href="tel:0113235500"
                className="flex gap-2 ml-4 btn-primary text-xs px-5 py-2.5"
              >
                <Phone size={14} />
                Позовите нас
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-stone-700 hover:text-crimson-700 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white shadow-xl">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
              <Link
                href="/"
                className="block py-3 text-sm font-medium text-stone-800 border-b border-stone-100"
              >
                Почетна
              </Link>

              {/* O nama mobile */}
              <div>
                <button
                  onClick={() =>
                    setMobileExpanded((p: any) =>
                      p === "onama" ? null : "onama",
                    )
                  }
                  className="w-full flex items-center justify-between py-3 text-sm font-medium text-stone-800 border-b border-stone-100"
                >
                  О нама
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      mobileExpanded === "onama" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpanded === "onama" && (
                  <div className="pl-4 space-y-1 py-2 bg-stone-50">
                    {oNamaLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block py-2 text-sm text-stone-600 hover:text-crimson-700"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Profili mobile */}
              <div>
                <button
                  onClick={() =>
                    setMobileExpanded((p) =>
                      p === "profili" ? null : "profili",
                    )
                  }
                  className="w-full flex items-center justify-between py-3 text-sm font-medium text-stone-800 border-b border-stone-100"
                >
                  Образовни профили
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      mobileExpanded === "profili" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpanded === "profili" && (
                  <div className="pl-4 space-y-1 py-2 bg-stone-50 max-h-48 overflow-y-auto">
                    {obrazovniProfili.map((profil) => (
                      <Link
                        key={profil.slug}
                        href={`/obrazovni-profili/${profil.slug}`}
                        className="block py-2 text-sm text-stone-600 hover:text-crimson-700"
                      >
                        {profil.naziv}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/upis"
                className="block py-3 text-sm font-medium text-stone-800 border-b border-stone-100"
              >
                Упис
              </Link>
              <Link
                href="/kontakt"
                className="block py-3 text-sm font-medium text-stone-800 border-b border-stone-100"
              >
                Контакт
              </Link>
              <Link
                href="/galerija"
                className="block py-3 text-sm font-medium text-stone-800 border-b border-stone-100"
              >
                Галерија
              </Link>
              <a
                href="tel:0113235500"
                className="flex items-center gap-2 justify-start btn-primary w-full justify-center mt-4"
              >
                <Phone size={16} />
                011/323-55-00
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
