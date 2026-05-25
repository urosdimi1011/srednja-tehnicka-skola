export const dynamic = "force-dynamic";

import { prisma } from "@/api/prisma";
import Link from "next/link";
import { Calendar, Bell, ArrowRight } from "lucide-react";
import PageHeader from "@/app/(site)/components/Pageheader";

export const metadata = {
  title: "Обавештења",
  description: "Aktuelna obavestenja Srednje Tehnicke Skole Dositej Obradovic - raspored ispita, vazni datumi, novosti iz skole.",
  alternates: { canonical: "https://sts.edu.rs/obavestenja" },
};

export default async function ObavestenjaPage() {
  const obavestenja = await prisma.obavestenje.findMany({
    where: { isActive: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <PageHeader
        title="Обавештења"
        subtitle="Актуелна обавештења за ученике и родитеље."
        breadcrumbs={[{ label: "Обавештења" }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {obavestenja.length === 0 ? (
            <div className="text-center py-20 text-stone-400">
              <Bell size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-medium">Нема активних обавештења</p>
            </div>
          ) : (
            <div className="space-y-4">
              {obavestenja.map((o) => (
                <Link
                  key={o.id}
                  href={`/obavestenja/${o.id}`}
                  className="group block border border-stone-200 hover:border-crimson-300 hover:shadow-md p-6 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-stone-400 text-xs font-semibold mb-2">
                        <Calendar size={12} />
                        {new Date(o.publishedAt).toLocaleDateString("sr-RS", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <h2 className="font-bold text-stone-900 group-hover:text-crimson-700 transition-colors mb-2">
                        {o.title}
                      </h2>
                      <div
                        className="text-stone-400 text-sm line-clamp-2 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: o.content }}
                      />
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-stone-300 group-hover:text-crimson-700 shrink-0 mt-1 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <div className="mt-4 w-8 h-0.5 bg-crimson-700 group-hover:w-16 transition-all duration-300" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}