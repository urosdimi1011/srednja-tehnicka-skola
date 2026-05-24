"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon, Loader2, GripVertical } from "lucide-react";
import { compressImage } from "../utils/compressImage";

interface Slika {
  id: string;
  url: string;
  naziv: string | null;
  redosled: number;
}

interface GalerijaUploadProps {
  smerId: string;           // potrebno za API pozive
  inicijalneSlike: Slika[]; // slike učitane iz baze
}

export default function GalerijaUpload({
  smerId,
  inicijalneSlike,
}: GalerijaUploadProps) {
  const [slike, setSlike] = useState<Slika[]>(inicijalneSlike);
  const [uploading, setUploading] = useState(false);
  const [greska, setGreska] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Upload jednog fajla
  async function uploadFajl(file: File): Promise<string | null> {
    const compressed = await compressImage(file);
    const formData = new FormData();
    formData.append("file", compressed);
    formData.append("folder", "galerija");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error ?? "Грешка приликом учитавања");
    }
    return data.url;
  }

  // Sačuvaj sliku u bazi
  async function sacuvajSliku(url: string): Promise<Slika> {
    const res = await fetch(`/api/smerovi/${smerId}/galerija`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    return res.json();
  }

  // Upload više fajlova
  async function handleFiles(files: FileList) {
    setUploading(true);
    setGreska(null);

    try {
      for (const file of Array.from(files)) {
        const url = await uploadFajl(file);
        if (url) {
          const slika = await sacuvajSliku(url);
          setSlike((prev) => [...prev, slika]);
        }
      }
    } catch (err: any) {
      setGreska(err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  // Obriši sliku
  async function obrisiSliku(slikaId: string) {
    if (!confirm("Обриши ову слику?")) return;

    try {
      await fetch(`/api/smerovi/${smerId}/galerija/${slikaId}`, {
        method: "DELETE",
      });
      setSlike((prev) => prev.filter((s) => s.id !== slikaId));
    } catch {
      setGreska("Грешка приликом брисања");
    }
  }

  // Ažuriraj naziv slike
  async function azurirajNaziv(slikaId: string, naziv: string) {
    setSlike((prev) =>
      prev.map((s) => (s.id === slikaId ? { ...s, naziv } : s))
    );

    await fetch(`/api/smerovi/${smerId}/galerija/${slikaId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ naziv: naziv || null }),
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-bold text-stone-700 uppercase tracking-widest">
          Галерија слика
        </label>
        <span className="text-xs text-stone-400">{slike.length} слика</span>
      </div>

      {/* Grid sa slikama */}
      {slike.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          {slike.map((slika) => (
            <div
              key={slika.id}
              className="relative group border border-stone-200 overflow-hidden bg-stone-50"
            >
              {/* Slika */}
              <div className="relative h-32">
                <Image
                  src={slika.url}
                  alt={slika.naziv ?? "Slika"}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Naziv input */}
              <input
                type="text"
                value={slika.naziv ?? ""}
                onChange={(e) => azurirajNaziv(slika.id, e.target.value)}
                placeholder="Назив (opciono)"
                className="w-full text-xs px-2 py-1.5 border-t border-stone-200 bg-white text-stone-700 outline-none focus:bg-crimson-50 transition-colors"
              />

              {/* Dugme za brisanje */}
              <button
                type="button"
                onClick={() => obrisiSliku(slika.id)}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={11} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zona */}
      <div
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-stone-200 hover:border-crimson-400 bg-stone-50 hover:bg-crimson-50/30 transition-colors cursor-pointer flex flex-col items-center justify-center py-8 gap-2"
      >
        {uploading ? (
          <>
            <Loader2 size={24} className="text-crimson-500 animate-spin" />
            <p className="text-stone-500 text-sm">Учитавање слика...</p>
          </>
        ) : (
          <>
            <Upload size={22} className="text-stone-300" />
            <div className="text-center">
              <p className="text-stone-600 text-sm font-semibold">
                Додај слике у галерију
              </p>
              <p className="text-stone-400 text-xs mt-0.5">
                Можете одабрати више слика одједном
              </p>
            </div>
          </>
        )}
      </div>

      {greska && (
        <p className="text-red-600 text-xs mt-1.5 font-medium">{greska}</p>
      )}

      {/* Hidden file input – multiple */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
        multiple
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        className="hidden"
      />
    </div>
  );
}