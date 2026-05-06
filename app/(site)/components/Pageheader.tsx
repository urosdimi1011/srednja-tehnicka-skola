import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Home } from "lucide-react";
import { ReactNode } from "react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  image?: string;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  image = "/files/img/banner1.jpg",
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-30">
      <Image
        src={image}
        alt="Ekskurzija srednje tehničke škole"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-br from-stone-900/20 via-stone-800/20 to-crimson-900/80" />

      <div className="absolute inset-0 pattern-dots opacity-10" />

      <div className="absolute left-0 top-0 w-1 h-full bg-crimson-700" />

      <div className="absolute top-6 right-16 w-48 h-48 rounded-full border-2 border-white/30 animate-float-slow pointer-events-none" />
      <div className="absolute top-14 right-28 w-28 h-28 rounded-full border-2 border-white/20 animate-float-medium pointer-events-none" />
      <div className="absolute bottom-4 left-10 w-64 h-64 rounded-full bg-crimson-700/25 blur-2xl animate-float-medium pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-crimson-700/25 rounded-full blur-3xl animate-float-slow pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <nav className="flex items-center gap-2 text-xs text-white/60 mb-6">
          <Link
            href="/"
            className="hover:text-crimson-300 transition-colors flex items-center gap-1"
          >
            <Home size={12} />
            Почетна
          </Link>

          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              <ChevronRight size={12} />
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-crimson-300 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white/40">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-px bg-crimson-500" />
          <span className="text-crimson-300 text-xs font-bold uppercase tracking-[0.2em]">
            Средња Техничка Школа
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
          {title}
        </h1>

        {subtitle && (
          <p className="text-white/80 text-base max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
