"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, Trash2, ArrowLeft, Plus, X } from "lucide-react";

type VrstaProfila = "STRUCNO" | "GIMNAZIJA" | "UMETNICKO" | "SPORTSKO" | "JEZICKO";

interface Profil {
  id: string;
  naziv: string;
  slug: string;
  vrsta: VrstaProfila;
  opis: string;
  tags: unknown;
  smerovi?: { id: string; naziv: string; slug: string; trajanje: number }[];
}

export default function ProfilForm({ profil }: { profil: Profil | null }) {
  const router = useRouter();
  const isNovi = !profil;

  const [naziv, setNaziv] = useState(profil?.naziv ?? "");
  const [slug, setSlug] = useState(profil?.slug ?? "");
  const [vrsta, setVrsta] = useState<VrstaProfila>(profil?.vrsta ?? "STRUCNO");
  const [opis, setOpis] = useState(profil?.opis ?? "");
  const [tags, setTags] = useState<string[]>((profil?.tags as string[]) ?? []);
  const [noviTag, setNoviTag] = useState("");

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [greska, setGreska] = useState<string | null>(null);

  // Auto-generiši slug iz naziva
  function genSlug(vrednost: string) {
    return vrednost
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[čć]/g, "c")
      .replace(/[šđ]/g, (c) => (c === "š" ? "s" : "dj"))
      .replace(/ž/g, "z")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");
  }

  function handleNaziv(v: string) {
    setNaziv(v);
    if (isNovi) setSlug(genSlug(v));
  }

  function dodajTag() {
    const t = noviTag.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setNoviTag("");
    }
  }

  async function handleSave() {
    setSaving(true);
    setGreska(null);

    const url = isNovi
      ? "/api/obrazovni-profili"
      : `/api/obrazovni-profili/${profil!.id}`;
    const method = isNovi ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naziv, slug, vrsta, opis, tags }),
      });

      if (res.ok) {
        router.push("/admin/profili");
        router.refresh();
      } else {
        const data = await res.json();
        setGreska(data.error ?? "Грешка приликом чувања");
      }
    } catch {
      setGreska("Грешка у вези са сервером");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!profil) return;
    if (!confirm(`Обришите профил "${profil.naziv}"? Ово ће обрисати и све смерове!`)) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/obrazovni-profili/${profil.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/profili");
        router.refresh();
      }
    } finally {
      setDeleting(false);
    }
  }

  const vrsteOptions: { value: VrstaProfila; label: string }[] = [
    { value: "STRUCNO",   label: "Стручно" },
    { value: "GIMNAZIJA", label: "Гимназија" },
    { value: "UMETNICKO", label: "Уметничко" },
    { value: "SPORTSKO",  label: "Спортско" },
    { value: "JEZICKO",   label: "Језичко" },
  ];

  return (
    <div className="space-y-6">

      {greska && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {greska}
        </div>
      )}

      {/* Naziv */}
      <Polje label="Назив профила *">
        <input
          type="text"
          value={naziv}
          onChange={(e) => handleNaziv(e.target.value)}
          placeholder="нпр. Електротехника и рачунарство"
          className={input}
        />
      </Polje>

      {/* Slug */}
      <Polje label="Slug (URL)" opis="Аутоматски се генерише из назива">
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="elektrotehnika-racunarstvo"
          className={`${input} font-mono text-sm`}
        />
      </Polje>

      {/* Vrsta */}
      <Polje label="Врста профила *">
        <select
          value={vrsta}
          onChange={(e) => setVrsta(e.target.value as VrstaProfila)}
          className={input}
        >
          {vrsteOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Polje>

      {/* Opis */}
      <Polje label="Опис *">
        <textarea
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
          rows={3}
          placeholder="Кратак опис образовног профила..."
          className={`${input} resize-none`}
        />
      </Polje>

      {/* Tags */}
      <Polje label="Тагови">
        <div className="flex gap-2 mb-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1.5"
            >
              {tag}
              <button
                onClick={() => setTags(tags.filter((t) => t !== tag))}
                className="text-stone-400 hover:text-red-500 transition-colors"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={noviTag}
            onChange={(e) => setNoviTag(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), dodajTag())}
            placeholder="Додај таг..."
            className={`${input} flex-1`}
          />
          <button
            onClick={dodajTag}
            className="flex items-center gap-1 bg-stone-900 hover:bg-stone-700 text-white px-3 py-2 text-xs font-bold transition-colors"
          >
            <Plus size={13} />
            Додај
          </button>
        </div>
      </Polje>

      {/* Smerovi lista (samo za edit) */}
      {profil?.smerovi && profil.smerovi.length > 0 && (
        <div className="border border-stone-200 overflow-hidden">
          <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">
              Смерови профила ({profil.smerovi.length})
            </p>
            <Link
              href={`/admin/smerovi?profilId=${profil.id}`}
              className="text-xs font-bold text-crimson-700 hover:text-crimson-800"
            >
              Управљај смеровима
            </Link>
          </div>
          <div className="divide-y divide-stone-100">
            {profil.smerovi.map((s) => (
              <div key={s.id} className="flex items-center justify-between px-4 py-2.5">
                <div>
                  <p className="text-sm text-stone-900 font-medium">{s.naziv}</p>
                  <p className="text-xs text-stone-400">{s.trajanje} год.</p>
                </div>
                <Link
                  href={`/admin/smerovi/${s.id}`}
                  className="text-xs font-bold text-crimson-700 hover:text-crimson-800"
                >
                  Уреди
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dugmad */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <Link
          href="/admin/profili"
          className="flex items-center gap-2 text-stone-400 hover:text-stone-700 text-sm font-semibold transition-colors"
        >
          <ArrowLeft size={15} />
          Назад
        </Link>

        <div className="flex gap-3">
          {!isNovi && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 border border-red-200 hover:bg-red-50 text-red-600 px-4 py-2.5 text-sm font-bold transition-colors disabled:opacity-50"
            >
              <Trash2 size={14} />
              {deleting ? "Брисање..." : "Обриши"}
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={saving || !naziv || !slug}
            className="flex items-center gap-2 bg-crimson-700 hover:bg-crimson-800 text-white px-6 py-2.5 text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={14} />
            {saving ? "Чување..." : isNovi ? "Креирај профил" : "Сачувај"}
          </button>
        </div>
      </div>
    </div>
  );
}

const input =
  "w-full border border-stone-200 focus:border-crimson-400 bg-white text-stone-900 text-sm px-4 py-2.5 outline-none transition-colors";

function Polje({
  label,
  opis,
  children,
}: {
  label: string;
  opis?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      {opis && <p className="text-xs text-stone-400 mb-2">{opis}</p>}
      {children}
    </div>
  );
}