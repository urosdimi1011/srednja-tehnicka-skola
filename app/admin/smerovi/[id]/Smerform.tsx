"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import ImageUpload from "@/app/admin/components/ImageUpload";
import GalerijaUpload from "@/app/admin/components/GalerijaUpload";

// Dynamički import – Quill ne radi na serveru
const QuillEditor = dynamic(() => import("@/app/admin/components/QuillEditor"), {
  ssr: false,
  loading: () => (
    <div className="border border-stone-200 bg-stone-50 h-40 flex items-center justify-center text-stone-400 text-sm">
      Учитавање едитора...
    </div>
  ),
});

interface Profil {
  id: string;
  naziv: string;
}

interface Smer {
  id: string;
  naziv: string;
  slug: string;
  obrazovniProfilId: string;
  trajanje: number;
  opsteInformacije: string | null;
  ciljevi: string | null;
  poslovnaProhodnost: string | null;
  obrazovnaProhodnost: string | null;
  glavnaSlika: string | null;
  nastavniPlanProgram: string | null;
  galerija?: { id: string; url: string; naziv: string | null; redosled: number }[];
}

export default function SmerForm({
  smer,
  profili,
}: {
  smer: Smer | null;
  profili: Profil[];
}) {
  const router = useRouter();
  const isNovi = !smer;

  const [naziv, setNaziv] = useState(smer?.naziv ?? "");
  const [slug, setSlug] = useState(smer?.slug ?? "");
  const [profilId, setProfilId] = useState(smer?.obrazovniProfilId ?? profili[0]?.id ?? "");
  const [trajanje, setTrajanje] = useState(smer?.trajanje ?? 4);
  const [opsteInformacije, setOpsteInformacije] = useState(smer?.opsteInformacije ?? "");
  const [ciljevi, setCiljevi] = useState(smer?.ciljevi ?? "");
  const [poslovnaProhodnost, setPoslovnaProhodnost] = useState(smer?.poslovnaProhodnost ?? "");
  const [obrazovnaProhodnost, setObrazovnaProhodnost] = useState(smer?.obrazovnaProhodnost ?? "");
  const [glavnaSlika, setGlavnaSlika] = useState(smer?.glavnaSlika ?? "");
  const [nastavniPlanProgram, setNastavniPlanProgram] = useState(smer?.nastavniPlanProgram ?? "");

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [greska, setGreska] = useState<string | null>(null);

  function genSlug(v: string) {
    return v
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

  async function handleSave() {
    setSaving(true);
    setGreska(null);

    const url = isNovi ? "/api/smerovi" : `/api/smerovi/${smer!.id}`;
    const method = isNovi ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naziv,
          slug,
          obrazovniProfilId: profilId,
          trajanje: Number(trajanje),
          opsteInformacije:    opsteInformacije    || null,
          ciljevi:             ciljevi             || null,
          poslovnaProhodnost:  poslovnaProhodnost  || null,
          obrazovnaProhodnost: obrazovnaProhodnost || null,
          glavnaSlika:         glavnaSlika         || null,
          nastavniPlanProgram: nastavniPlanProgram || null,
        }),
      });

      if (res.ok) {
        router.push("/admin/smerovi");
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
    if (!smer) return;
    if (!confirm(`Обришите смер "${smer.naziv}"?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/smerovi/${smer.id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/smerovi");
        router.refresh();
      }
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-5">

      {greska && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {greska}
        </div>
      )}

      {/* Naziv */}
      <Polje label="Назив смера *">
        <input
          type="text"
          value={naziv}
          onChange={(e) => handleNaziv(e.target.value)}
          placeholder="нпр. ИТ техничар"
          className={inp}
        />
      </Polje>

      {/* Slug */}
      <Polje label="Slug (URL)">
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className={`${inp} font-mono text-sm`}
        />
      </Polje>

      {/* Profil + Trajanje */}
      <div className="grid grid-cols-2 gap-4">
        <Polje label="Образовни профил *">
          <select
            value={profilId}
            onChange={(e) => setProfilId(e.target.value)}
            className={inp}
          >
            {profili.map((p) => (
              <option key={p.id} value={p.id}>
                {p.naziv}
              </option>
            ))}
          </select>
        </Polje>
        <Polje label="Трајање (године) *">
          <select
            value={trajanje}
            onChange={(e) => setTrajanje(Number(e.target.value))}
            className={inp}
          >
            <option value={1}>1 година (специјалиста)</option>
            <option value={3}>3 године</option>
            <option value={4}>4 године</option>
          </select>
        </Polje>
      </div>

      {/* ── Rich text sekcije ─────────────────────────────────────────── */}
      <div className="pt-2 pb-1 border-t border-stone-100">
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
          Садржај
        </p>
      </div>

      <Polje label="Опште информације">
        <QuillEditor
          value={opsteInformacije}
          onChange={setOpsteInformacije}
          placeholder="Унесите опште информације о смеру..."
          minHeight={220}
        />
      </Polje>

      <Polje label="Циљеви смера">
        <QuillEditor
          value={ciljevi}
          onChange={setCiljevi}
          placeholder="Унесите циљеве смера..."
          minHeight={220}
        />
      </Polje>

      <Polje label="Пословна проходност">
        <QuillEditor
          value={poslovnaProhodnost}
          onChange={setPoslovnaProhodnost}
          placeholder="Унесите информације о пословној проходности..."
          minHeight={180}
        />
      </Polje>

      <Polje label="Образовна проходност (opciono)">
        <QuillEditor
          value={obrazovnaProhodnost}
          onChange={setObrazovnaProhodnost}
          placeholder="Унесите информације о образовној проходности..."
          minHeight={180}
        />
      </Polje>

      {/* ── Fajlovi ───────────────────────────────────────────────────── */}
      <div className="pt-2 pb-1 border-t border-stone-100">
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
          Фајлови
        </p>
      </div>

      <ImageUpload
        value={glavnaSlika}
        onChange={setGlavnaSlika}
        folder="smerovi"
        label="Главна слика"
      />

      <Polje label="Наставни план и програм (PDF путања)" opis="нпр. /files/nastavni-plan-it.pdf">
        <input
          type="text"
          value={nastavniPlanProgram}
          onChange={(e) => setNastavniPlanProgram(e.target.value)}
          placeholder="/files/nastavni-plan.pdf"
          className={inp}
        />
      </Polje>

      {/* Galerija – samo za postojeći smer */}
      {!isNovi && smer && (
        <div>
          <div className="pt-2 pb-3 border-t border-stone-100">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
              Галерија
            </p>
          </div>
          <GalerijaUpload
            smerId={smer.id}
            inicijalneSlike={smer.galerija ?? []}
          />
        </div>
      )}

      {isNovi && (
        <div className="bg-stone-50 border border-stone-200 px-4 py-3 text-xs text-stone-500">
          💡 Галерија ће бити доступна након креирања смера.
        </div>
      )}

      {/* Dugmad */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <Link
          href="/admin/smerovi"
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
            disabled={saving || !naziv || !slug || !profilId}
            className="flex items-center gap-2 bg-crimson-700 hover:bg-crimson-800 text-white px-6 py-2.5 text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={14} />
            {saving ? "Чување..." : isNovi ? "Креирај смер" : "Сачувај"}
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