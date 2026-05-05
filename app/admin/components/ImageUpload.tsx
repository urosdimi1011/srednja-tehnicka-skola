"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value: string;           // trenutna putanja iz baze
  onChange: (url: string) => void;
  folder?: string;         // subfolder u uploads/ (default: "smerovi")
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  folder = "smerovi",
  label = "Главна слика",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [greska, setGreska] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setGreska(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setGreska(data.error ?? "Грешка приликом учитавања");
        return;
      }

      onChange(data.url);
    } catch {
      setGreska("Грешка у вези са сервером");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  return (
    <div>
      <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-1.5">
        {label}
      </label>

      {/* Preview ako postoji slika */}
      {value ? (
        <div className="relative border border-stone-200 overflow-hidden group">
          <div className="relative h-48 w-full">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>

          {/* Overlay dugmad */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 bg-white text-stone-900 text-xs font-bold px-4 py-2 hover:bg-stone-100 transition-colors"
            >
              <Upload size={13} />
              Замени
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-4 py-2 hover:bg-red-700 transition-colors"
            >
              <X size={13} />
              Уклони
            </button>
          </div>

          {/* Putanja */}
          <div className="px-3 py-2 bg-stone-50 border-t border-stone-200">
            <p className="text-xs text-stone-400 font-mono truncate">{value}</p>
          </div>
        </div>
      ) : (
        /* Drop zona */
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-stone-200 hover:border-crimson-400 bg-stone-50 hover:bg-crimson-50/30 transition-colors cursor-pointer flex flex-col items-center justify-center py-10 gap-3"
        >
          {uploading ? (
            <>
              <Loader2 size={28} className="text-crimson-500 animate-spin" />
              <p className="text-stone-500 text-sm font-medium">Учитавање...</p>
            </>
          ) : (
            <>
              <ImageIcon size={28} className="text-stone-300" />
              <div className="text-center">
                <p className="text-stone-600 text-sm font-semibold">
                  Превуците слику или кликните
                </p>
                <p className="text-stone-400 text-xs mt-1">
                  JPG, PNG, WebP · макс. 5MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Greška */}
      {greska && (
        <p className="text-red-600 text-xs mt-1.5 font-medium">{greska}</p>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleInput}
        className="hidden"
      />
    </div>
  );
}