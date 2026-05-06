"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import dynamic from "next/dynamic";

const QuillEditor = dynamic(
  () => import("@/app/admin/components/QuillEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="border border-stone-200 bg-stone-50 h-40 flex items-center justify-center text-stone-400 text-sm">
        Учитавање едитора...
      </div>
    ),
  },
);

interface Upis {
  id: number;
  title: string;
  description: string;
  content: string;
  updatedAt: Date;
}

export default function UpisForm({ upis }: { upis: Upis | null }) {
  const router = useRouter();

  const [skolskaGodina, setSkolskaGodina] = useState(upis?.title ?? "");
  const [opis, setOpis] = useState(upis?.description ?? "");
  const [sadrzaj, setSadrzaj] = useState(upis?.content ?? "");
  const [saving, setSaving] = useState(false);
  const [greska, setGreska] = useState<string | null>(null);
  const [uspeh, setUspeh] = useState(false);

  async function handleSave() {
    setSaving(true);
    setGreska(null);
    setUspeh(false);

    try {
      const res = await fetch("/api/upis", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: skolskaGodina,
          description: opis,
          content: sadrzaj,
        }),
      });

      if (res.ok) {
        setUspeh(true);
        router.refresh();
        setTimeout(() => setUspeh(false), 3000);
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

  return (
    <div className="space-y-6">
      {greska && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {greska}
        </div>
      )}

      {uspeh && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3">
          Успешно сачувано!
        </div>
      )}

      <Polje
        label="Школска година *"
        hint='Приказује се у наслову, нпр. "2026/2027"'
      >
        <input
          type="text"
          value={skolskaGodina}
          onChange={(e) => setSkolskaGodina(e.target.value)}
          placeholder="нпр. 2026/2027"
          className={inp}
        />
      </Polje>

      <Polje
        label="Кратак опис"
        hint="Приказује се испод наслова на почетној и на страници о упису"
      >
        <textarea
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
          placeholder="нпр. Пријавите се за нову школску годину. Конкурс је отворен за све заинтересоване кандидате..."
          rows={3}
          className={`${inp} resize-none`}
        />
      </Polje>

      <Polje
        label="Садржај странице *"
        hint="Детаљни садржај — рокови, документација, напомене и сл."
      >
        <QuillEditor
          value={sadrzaj}
          onChange={setSadrzaj}
          placeholder="Унесите садржај странице о упису..."
          minHeight={400}
        />
      </Polje>

      {upis?.updatedAt && (
        <p className="text-xs text-stone-400">
          Последња измена:{" "}
          {new Date(upis.updatedAt).toLocaleString("sr-Latn-RS", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      )}

      <div className="flex justify-end pt-4 border-t border-stone-100">
        <button
          onClick={handleSave}
          disabled={saving || !skolskaGodina || !sadrzaj}
          className="flex items-center gap-2 bg-crimson-700 hover:bg-crimson-800 text-white px-6 py-2.5 text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={14} />
          {saving ? "Чување..." : "Сачувај"}
        </button>
      </div>
    </div>
  );
}

const inp =
  "w-full border border-stone-200 focus:border-crimson-400 bg-white text-stone-900 text-sm px-4 py-2.5 outline-none transition-colors";

function Polje({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-1">
        {label}
      </label>
      {hint && <p className="text-xs text-stone-400 mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}
