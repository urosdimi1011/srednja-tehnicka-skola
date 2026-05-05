import {
  FileText,
  Download,
  ExternalLink,
  Phone,
  Mail,
  AlertCircle,
} from "lucide-react";
import PageHeader from "../components/Pageheader";

export const metadata = {
  title: "Документација",
  description: "Школска документа, акти, правилници и обрасци доступни за преузимање.",
};
const dokumenta = [
  {
    id: "1",
    naziv: "Решење о верификацији техничке школе",
    kategorija: "Школска документа",
    fajl: "/files/Resenje-o-verifikaciji-tehnicke-skole.pdf",
    tipFajla: "PDF",
    opis: "Основни акт школе",
    godina: "2024",
    redosled: 1,
  },
  {
    id: "2",
    naziv: "Решење о проширењу делатности",
    kategorija: "Школска документа",
    fajl: "/files/resenje-o-prosirenju-delatnosti.pdf",
    tipFajla: "PDF",
    opis: null,
    godina: "2025/2026",
    redosled: 2,
  }
];

// ─── TipBadge ─────────────────────────────────────────────────────────────────
function TipBadge({ tip }: { tip: string }) {
  const boje: Record<string, string> = {
    PDF:  "bg-red-50 text-red-600 border-red-100",
    DOCX: "bg-blue-50 text-blue-600 border-blue-100",
    DOC:  "bg-blue-50 text-blue-600 border-blue-100",
    XLS:  "bg-green-50 text-green-700 border-green-100",
    XLSX: "bg-green-50 text-green-700 border-green-100",
    PPT:  "bg-orange-50 text-orange-600 border-orange-100",
    PPTX: "bg-orange-50 text-orange-600 border-orange-100",
  };
  const klasa =
    boje[tip.toUpperCase()] ?? "bg-stone-100 text-stone-500 border-stone-200";

  return (
    <span className={`text-xs font-mono font-bold px-2 py-0.5 border ${klasa}`}>
      {tip.toUpperCase()}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DokumentacijaStrana() {
  // Grupiši po kategoriji, sortirano po redosledu
  const kategorije = [...dokumenta]
    .sort((a, b) => a.redosled - b.redosled)
    .reduce(
      (acc, dok) => {
        if (!acc[dok.kategorija]) acc[dok.kategorija] = [];
        acc[dok.kategorija].push(dok);
        return acc;
      },
      {} as Record<string, typeof dokumenta>
    );

  return (
    <>
      <PageHeader
        title="Документација"
        subtitle="Школска документа, акти, правилници и обрасци доступни за преузимање."
        breadcrumbs={[{ label: "О нама" }, { label: "Документација" }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="space-y-12">
            {Object.entries(kategorije).map(([kategorija, stavke]) => (
              <div key={kategorija}>

                {/* Naslov kategorije */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-crimson-700 flex items-center justify-center shrink-0">
                    <FileText size={15} className="text-white" />
                  </div>
                  <h2 className="font-bold text-stone-900 text-lg">{kategorija}</h2>
                  <div className="flex-1 h-px bg-stone-100" />
                  <span className="text-xs text-stone-400 font-semibold shrink-0">
                    {stavke.length}{" "}
                    {stavke.length === 1 ? "документ" : "докумената"}
                  </span>
                </div>

                {/* Lista */}
                <div className="space-y-2">
                  {stavke.map((dok) => (
                    <div
                      key={dok.id}
                      className="flex items-center justify-between gap-4 p-4 border border-stone-200 hover:border-crimson-200 hover:shadow-sm transition-all group"
                    >
                      {/* Leva strana */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 bg-stone-50 group-hover:bg-crimson-700 border border-stone-200 group-hover:border-crimson-700 flex items-center justify-center transition-all shrink-0">
                          <FileText
                            size={17}
                            className="text-stone-400 group-hover:text-white transition-colors"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-stone-900 text-sm leading-snug truncate">
                            {dok.naziv}
                          </p>
                          <div className="flex items-center gap-3 mt-0.5">
                            {dok.opis && (
                              <p className="text-stone-400 text-xs truncate">{dok.opis}</p>
                            )}
                            {dok.godina && (
                              <span className="text-stone-400 text-xs font-medium shrink-0">
                                {dok.godina}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Desna strana */}
                      <div className="flex items-center gap-3 shrink-0">
                        <TipBadge tip={dok.tipFajla} />

                        <a
                          href={dok.fajl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-stone-400 hover:text-stone-700 text-xs font-semibold transition-colors"
                          title="Отвори"
                        >
                          <ExternalLink size={14} />
                          <span className="hidden sm:inline">Отвори</span>
                        </a>

                        <a
                          href={dok.fajl}
                          download
                          className="flex items-center gap-1.5 bg-crimson-700 hover:bg-crimson-800 text-white text-xs font-bold px-3 py-2 transition-colors"
                          title="Преузми"
                        >
                          <Download size={13} />
                          <span className="hidden sm:inline">Преузми</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Napomena */}
          <div className="mt-12 flex items-start gap-4 bg-stone-50 border border-stone-200 p-6">
            <AlertCircle size={18} className="text-crimson-700 shrink-0 mt-0.5" />
            <p className="text-stone-600 text-sm leading-relaxed">
              Уколико не можете пронаћи одређено документо или вам је потребан оригинал
              са печатом, обратите се секретаријату школе на број{" "}
              <a
                href="tel:0113235500"
                className="font-bold text-crimson-700 hover:underline inline-flex items-center gap-1"
              >
                <Phone size={12} />
                011/323-55-00
              </a>{" "}
              или путем е-поште{" "}
              <a
                href="mailto:office@sts.edu.rs"
                className="font-bold text-crimson-700 hover:underline inline-flex items-center gap-1"
              >
                <Mail size={12} />
                office@sts.edu.rs
              </a>
              .
            </p>
          </div>

        </div>
      </section>
    </>
  );
}