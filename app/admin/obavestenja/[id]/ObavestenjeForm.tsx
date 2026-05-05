"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, Trash2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import dynamic from "next/dynamic";

const QuillEditor = dynamic(() => import("@/app/admin/components/QuillEditor"), {
  ssr: false,
  loading: () => (
    <div className="border border-stone-200 bg-stone-50 h-40 flex items-center justify-center text-stone-400 text-sm">
      Учитавање едитора...
    </div>
  ),
});

interface Obavestenje {
  id: number;
  title: string;
  content: string;
  publishedAt: Date;
  isActive: boolean;
}

export default function ObavestenjeForm({
  obavestenje,
}: {
  obavestenje: Obavestenje | null;
}) {
  const router = useRouter();
  const isNovo = !obavestenje;

  const [title, setTitle] = useState(obavestenje?.title ?? "");
  const [content, setContent] = useState(obavestenje?.content ?? "");
  const [isActive, setIsActive] = useState(obavestenje?.isActive ?? true);
  const [publishedAt, setPublishedAt] = useState(
    obavestenje
      ? new Date(obavestenje.publishedAt).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  );

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [greska, setGreska] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setGreska(null);

    const url = isNovo ? "/api/obavestenja" : `/api/obavestenja/${obavestenje!.id}`;
    const method = isNovo ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, publishedAt, isActive }),
      });

      if (res.ok) {
        router.push("/admin/obavestenja");
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
    if (!obavestenje) return;
    if (!confirm(`Обришите обавештење "${obavestenje.title}"?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/obavestenja/${obavestenje.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/obavestenja");
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

      {/* Naslov */}
      <Polje label="Наслов *">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="нпр. Обавештење о упису 2026/2027"
          className={inp}
        />
      </Polje>

      {/* Datum + Status u redu */}
      <div className="grid grid-cols-2 gap-4">
        <Polje label="Датум објаве">
          <input
            type="datetime-local"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className={inp}
          />
        </Polje>

        <Polje label="Статус">
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm font-bold border transition-colors ${
              isActive
                ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                : "border-stone-200 bg-stone-50 text-stone-500 hover:bg-stone-100"
            }`}
          >
            {isActive ? (
              <>
                <Eye size={15} /> Активно (видљиво на сајту)
              </>
            ) : (
              <>
                <EyeOff size={15} /> Скривено
              </>
            )}
          </button>
        </Polje>
      </div>

      {/* Sadrzaj */}
      <Polje label="Садржај *">
        <QuillEditor
          value={content}
          onChange={setContent}
          placeholder="Унесите текст обавештења..."
          minHeight={300}
        />
      </Polje>

      {/* Dugmad */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <Link
          href="/admin/obavestenja"
          className="flex items-center gap-2 text-stone-400 hover:text-stone-700 text-sm font-semibold transition-colors"
        >
          <ArrowLeft size={15} />
          Назад
        </Link>

        <div className="flex gap-3">
          {!isNovo && (
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
            disabled={saving || !title || !content}
            className="flex items-center gap-2 bg-crimson-700 hover:bg-crimson-800 text-white px-6 py-2.5 text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={14} />
            {saving ? "Чување..." : isNovo ? "Објави" : "Сачувај"}
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