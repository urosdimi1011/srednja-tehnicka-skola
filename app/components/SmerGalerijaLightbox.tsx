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

interface Slika {
  id: string;
  url: string;
  naziv: string | null;
}

export default function SmerGalerijaLightbox({
  slike,
  naziv,
}: {
  slike: Slika[];
  naziv: string;
}) {
  const [otvoren, setOtvoren] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = slike.map((s) => ({
    src: s.url,
    title: s.naziv ?? naziv,
  }));

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {slike.map((slika, i) => (
          <button
            key={slika.id}
            onClick={() => { setIndex(i); setOtvoren(true); }}
            className="group relative aspect-video bg-stone-100 overflow-hidden focus:outline-none"
          >
            <Image
              src={slika.url}
              alt={slika.naziv ?? naziv}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-crimson-900/0 group-hover:bg-crimson-900/30 transition-colors duration-300" />
          </button>
        ))}
      </div>

      <Lightbox
        open={otvoren}
        close={() => setOtvoren(false)}
        index={index}
        slides={slides}
        plugins={[Captions, Counter, Zoom]}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
      />
    </>
  );
}