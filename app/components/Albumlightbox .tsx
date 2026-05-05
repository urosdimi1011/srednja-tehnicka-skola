"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Camera } from "lucide-react";

interface Slika {
  id: string;
  url: string;
  naziv: string | null;
}

export default function AlbumLightbox({
  slike,
  naziv,
}: {
  slike: Slika[];
  naziv: string;
}) {
  const [otvoren, setOtvoren] = useState(false);
  const [index, setIndex] = useState(0);

  if (slike.length === 0) {
    return (
      <div className="text-center py-20 text-stone-400">
        <Camera size={48} className="mx-auto mb-4 opacity-30" />
        <p>Нема фотографија у овом албуму.</p>
      </div>
    );
  }

  const slides = slike.map((s) => ({
    src: s.url,
    title: s.naziv ?? naziv,
  }));

  return (
    <>
      {/* Info */}
      <div className="flex items-center gap-2 text-stone-400 text-sm mb-8">
        <Camera size={15} className="text-crimson-700" />
        <span>{slike.length} фотографија</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {slike.map((slika, i) => (
          <button
            key={slika.id}
            onClick={() => { setIndex(i); setOtvoren(true); }}
            className="group relative aspect-square bg-stone-100 overflow-hidden focus:outline-none focus:ring-2 focus:ring-crimson-700"
          >
            <Image
              src={slika.url}
              alt={slika.naziv ?? naziv}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-crimson-900/0 group-hover:bg-crimson-900/30 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                🔍
              </span>
            </div>
            {/* Naziv */}
            {slika.naziv && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs truncate">{slika.naziv}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={otvoren}
        close={() => setOtvoren(false)}
        index={index}
        slides={slides}
        plugins={[Captions, Counter, Zoom]}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
        }}
        captions={{ showToggle: true, descriptionTextAlign: "center" }}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
      />
    </>
  );
}