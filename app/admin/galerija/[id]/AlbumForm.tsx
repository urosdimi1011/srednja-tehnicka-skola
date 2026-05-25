"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Save, Trash2, ArrowLeft, Plus, X, Eye, EyeOff } from "lucide-react";

const KATEGORIJE = [
  "Екскурзије",
  "Школске активности",
  "Такмичења",
  "Матуре",
  "Остало",
];

interface Slika {
  id: string;
  url: string;
  naziv: string | null;
  redosled: number;
}
interface Album {
  id: string;
  naziv: string;
  opis: string | null;
  kategorija: string;
  coverSlika: string | null;
  vidljiv: boolean;
  slike: Slika[];
}

export default function AlbumForm({ album }: { album: Album | null }) {
  const router = useRouter();
  const isNovi = !album;

  const [naziv, setNaziv] = useState(album?.naziv ?? "");
  const [opis, setOpis] = useState(album?.opis ?? "");
  const [kategorija, setKategorija] = useState(album?.kategorija ?? "Остало");
  const [vidljiv, setVidljiv] = useState(album?.vidljiv ?? true);
  const [slike, setSlike] = useState<Slika[]>(album?.slike ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [greska, setGreska] = useState<string | null>(null);
  const [noviFajlovi, setNoviFajlovi] = useState<File[]>([]);

  function handleFajlovi(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setNoviFajlovi((prev) => [...prev, ...files]);
    for (const file of files) {
      const previewUrl = URL.createObjectURL(file);
      setSlike((prev) => [
        ...prev,
        { id: previewUrl, url: previewUrl, naziv: null, redosled: prev.length },
      ]);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", "galerija");
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (data.url && album) {
          const r = await fetch(`/api/galerija/${album.id}/slike`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: data.url }),
          });
          const nova = await r.json();
          setSlike((prev) => [...prev, nova]);
        }
      }
    } finally {
      setUploading(false);
    }
  }

  async function handleObrisiSliku(slikaId: string) {
    // Za novi album – samo ukloni iz preview i iz liste fajlova
    if (!album) {
      const index = slike.findIndex((s) => s.id === slikaId);
      setSlike((prev) => prev.filter((s) => s.id !== slikaId));
      setNoviFajlovi((prev) => prev.filter((_, i) => i !== index));
      return;
    }
    await fetch(`/api/galerija/${album.id}/slike/${slikaId}`, {
      method: "DELETE",
    });
    setSlike((prev) => prev.filter((s) => s.id !== slikaId));
  }

  async function handleSave() {
    setSaving(true);
    setGreska(null);

    try {
      if (isNovi) {
        const fd = new FormData();
        fd.append("naziv", naziv);
        fd.append("opis", opis);
        fd.append("kategorija", kategorija);
        fd.append("vidljiv", String(vidljiv));
        for (const file of noviFajlovi) {
          fd.append("slike", file);
        }

        const res = await fetch("/api/galerija", { method: "POST", body: fd });
        if (res.ok) {
          router.push("/admin/galerija");
          router.refresh();
        } else {
          const d = await res.json();
          setGreska(d.error ?? "Грешка");
        }
      } else {
        const res = await fetch(`/api/galerija/${album!.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ naziv, opis, kategorija, vidljiv }),
        });
        if (res.ok) {
          router.push("/admin/galerija");
          router.refresh();
        } else {
          const d = await res.json();
          setGreska(d.error ?? "Грешка");
        }
      }
    } catch {
      setGreska("Грешка у вези са сервером");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!album || !confirm(`Обришите "${album.naziv}"?`)) return;
    await fetch(`/api/galerija/${album.id}`, { method: "DELETE" });
    router.push("/admin/galerija");
  }

  return (
    <div className="space-y-6">
      {greska && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {greska}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Polje label="Назив *">
          <input
            type="text"
            value={naziv}
            onChange={(e) => setNaziv(e.target.value)}
            className={inp}
            placeholder="нпр. Екскурзија Будва 2025"
          />
        </Polje>
        <Polje label="Категорија">
          <select
            value={kategorija}
            onChange={(e) => setKategorija(e.target.value)}
            className={inp}
          >
            {KATEGORIJE.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </Polje>
      </div>

      <Polje label="Опис">
        <textarea
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
          rows={3}
          className={inp}
          placeholder="Кратак опис албума..."
        />
      </Polje>

      <Polje label="Статус">
        <button
          type="button"
          onClick={() => setVidljiv(!vidljiv)}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border transition-colors ${
            vidljiv
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-stone-200 bg-stone-50 text-stone-500"
          }`}
        >
          {vidljiv ? (
            <>
              <Eye size={15} /> Видљиво на сајту
            </>
          ) : (
            <>
              <EyeOff size={15} /> Скривено
            </>
          )}
        </button>
      </Polje>

      {/* Slike */}
      <div>
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-3">
          Фотографије
          {isNovi && slike.length > 0 && (
            <span className="ml-2 text-stone-400 font-normal normal-case">
              ({slike.length} одабрано – биће сачувано при креирању)
            </span>
          )}
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
          {slike.map((slika) => (
            <div key={slika.id} className="relative aspect-square group">
              <Image
                src={slika.url}
                alt={slika.naziv ?? ""}
                fill
                className="object-cover"
                unoptimized
              />
              <button
                onClick={() => handleObrisiSliku(slika.id)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {/* Upload dugme */}
          <label
            className={`aspect-square border-2 border-dashed border-stone-300 hover:border-crimson-400 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              uploading ? "opacity-50" : ""
            }`}
          >
            <Plus size={20} className="text-stone-400" />
            <span className="text-xs text-stone-400 mt-1">
              {uploading ? "..." : "Додај"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={isNovi ? handleFajlovi : handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Dugmad */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <Link
          href="/admin/galerija"
          className="flex items-center gap-2 text-stone-400 hover:text-stone-700 text-sm font-semibold transition-colors"
        >
          <ArrowLeft size={15} /> Назад
        </Link>
        <div className="flex gap-3">
          {!isNovi && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 border border-red-200 hover:bg-red-50 text-red-600 px-4 py-2.5 text-sm font-bold transition-colors"
            >
              <Trash2 size={14} /> Обриши
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !naziv}
            className="flex items-center gap-2 bg-crimson-700 hover:bg-crimson-800 text-white px-6 py-2.5 text-sm font-bold transition-colors disabled:opacity-50"
          >
            <Save size={14} />
            {saving ? "Чување..." : isNovi ? "Креирај" : "Сачувај"}
          </button>
        </div>
      </div>
    </div>
  );
}

const inp =
  "w-full border border-stone-200 focus:border-crimson-400 bg-white text-stone-900 text-sm px-4 py-2.5 outline-none transition-colors";

function Polje({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
