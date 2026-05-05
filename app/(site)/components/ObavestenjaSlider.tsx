"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Bell, Calendar, ArrowRight } from "lucide-react";

interface Obavestenje {
  id: number;
  title: string;
  content: string;
  publishedAt: Date | string;
}

const PER_PAGE = 3;

export default function ObavestenjaSlider({
  obavestenja,
}: {
  obavestenja: Obavestenje[];
}) {
  const [current, setCurrent] = useState(0);

  if (obavestenja.length === 0) return null;

  const totalPages = Math.ceil(obavestenja.length / PER_PAGE);
  const visible = obavestenja.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE);

  const prev = () => setCurrent((c) => (c - 1 + totalPages) % totalPages);
  const next = () => setCurrent((c) => (c + 1) % totalPages);

  return (
    <section className="py-16 bg-stone-100 relative overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-crimson-700 mb-2">
              Актуелно
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 flex items-center gap-3">
              <Bell size={24} className="text-crimson-700" />
              Обавештења
            </h2>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-3">
              <span className="text-stone-400 text-sm">
                {current + 1} / {totalPages}
              </span>
              <button
                onClick={prev}
                className="w-9 h-9 bg-white border border-stone-200 hover:bg-crimson-700 hover:border-crimson-700 hover:text-white text-stone-600 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 bg-white border border-stone-200 hover:bg-crimson-700 hover:border-crimson-700 hover:text-white text-stone-600 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          )}
        </div>

        {/* 3 kartice */}
        <div className="grid md:grid-cols-3 gap-5">
          {visible.map((o) => (
            <Link
              key={o.id}
              href={`/obavestenja/${o.id}`}
              className="group bg-white border border-stone-200 hover:border-crimson-300 hover:shadow-md p-6 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-2 text-stone-400 text-xs font-semibold mb-3">
                <Calendar size={12} />
                {new Date(o.publishedAt).toLocaleDateString("sr-RS", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>

              <h3 className="text-stone-900 group-hover:text-crimson-700 font-extrabold text-base mb-3 leading-snug transition-colors">
                {o.title}
              </h3>

              <div
                className="prose prose-sm max-w-none text-stone-500 prose-headings:text-stone-900 prose-a:text-crimson-700 prose-strong:text-stone-900 line-clamp-3 flex-1"
                dangerouslySetInnerHTML={{ __html: o.content }}
              />

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="w-8 h-0.5 bg-crimson-700 block group-hover:w-12 transition-all duration-300" />
                <span className="text-crimson-700 text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Прочитај <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Dots */}
        {totalPages > 1 && (
          <div className="flex gap-2 mt-6 justify-center">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-6 h-2 bg-crimson-700"
                    : "w-2 h-2 bg-stone-300 hover:bg-stone-400"
                }`}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/obavestenja"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-crimson-700 text-sm font-semibold transition-colors group"
          >
            Сва обавештења
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}