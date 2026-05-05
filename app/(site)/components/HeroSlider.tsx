"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Phone, ArrowRight } from "lucide-react";

const VIDEO_BG = "/videos/banner_video.mp4";

const slides = [
  {
    id: 1,
    tag: "Добродошли",
    title: "Градите своју\nбудућност са нама",
    subtitle:
      "Средња техничка школа Доситеј – место где знање срећа праксу. Упишите се и постаните стручњак у свом занимању.",
    cta: { label: "Сазнај о упису", href: "/upis" },
    ctaSecondary: { label: "Образовни профили", href: "/obrazovni-profili" },
    bg: "from-stone-900/80 via-stone-800/70 to-crimson-900/80",
    accent: "Упис 2026/2027",
    pattern: "dots",
  },
  {
    id: 2,
    tag: "Образовни профили",
    title: "10+ стручних\nзанимања",
    subtitle:
      "Електротехника, мехатроника, рачунарство, аутомеханичар и многа друга занимања. Пронађи своје позвање.",
    cta: { label: "Погледај профиле", href: "/obrazovni-profili" },
    ctaSecondary: { label: "Контактирај нас", href: "/kontakt" },
    bg: "from-crimson-900/80 via-crimson-800/70 to-stone-900/80",
    accent: "Стручно образовање",
    pattern: "grid",
  },
  {
    id: 3,
    tag: "Редовно и Ванредно",
    title: "Школовање по\nвашем темпу",
    subtitle:
      "Нудимо и редовно и ванредно школовање. Флексибилни смо и прилагодљиви вашим потребама и обавезама.",
    cta: { label: "Ванредно школовање", href: "/skolovanje" },
    ctaSecondary: { label: "Позовите: 064/812-96-95", href: "tel:0648129695" },
    bg: "from-stone-900/80 via-crimson-900/70 to-stone-800/80",
    accent: "Флексибилност",
    pattern: "dots",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const goTo = useCallback(
    (index: number, dir = "next") => {
      if (animating) return;
      setAnimating(true);
      setDirection(dir);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 700);
    },
    [animating],
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "prev");
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <div className="relative overflow-hidden h-[85vh] min-h-[600px] max-h-[820px]">
      <video
        src={VIDEO_BG}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ minHeight: "100%" }}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-opacity duration-700`}
      >
        {/* Pattern overlay */}
        {slide.pattern === "dots" && (
          <div className="absolute inset-0 opacity-20 pattern-dots" />
        )}
        {slide.pattern === "grid" && (
          <div className="absolute inset-0 opacity-20 pattern-grid" />
        )}

        <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-white/5 z-100 animate-float-fast" />
        <div className="absolute top-32 right-32 w-40 h-40 rounded-full border border-white/5 z-100 animate-float-fast" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-crimson-700/10 z-100 animate-float-fast" />

        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-crimson-500 via-crimson-700 to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            animating
              ? direction === "next"
                ? "opacity-0 translate-x-8"
                : "opacity-0 -translate-x-8"
              : "opacity-100 translate-x-0"
          }`}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-crimson-500" />
            <span className="text-crimson-400 text-xs font-bold uppercase tracking-[0.25em]">
              {slide.tag}
            </span>
          </div>

          <div className="inline-block bg-crimson-700 text-white text-xs font-bold px-3 py-1.5 mb-5 tracking-wide">
            {slide.accent}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 whitespace-pre-line">
            {slide.title}
          </h1>

          <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={slide.cta.href}
              className="inline-flex items-center gap-2 bg-crimson-700 text-white px-8 py-4 font-bold text-sm tracking-wide hover:bg-crimson-800 transition-all duration-200 group"
            >
              {slide.cta.label}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            {slide.ctaSecondary.href.startsWith("tel") ? (
              <a
                href={slide.ctaSecondary.href}
                className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 font-semibold text-sm tracking-wide hover:bg-white/10 transition-all duration-200"
              >
                <Phone size={15} />
                {slide.ctaSecondary.label}
              </a>
            ) : (
              <Link
                href={slide.ctaSecondary.href}
                className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 font-semibold text-sm tracking-wide hover:bg-white/10 transition-all duration-200"
              >
                {slide.ctaSecondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-crimson-700 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
        aria-label="Prethodni slajd"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-crimson-700 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
        aria-label="Sledeći slajd"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-2 bg-crimson-500"
                : "w-2 h-2 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Slajd ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
