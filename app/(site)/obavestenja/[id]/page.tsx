export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { prisma } from "@/api/prisma";
import Link from "next/link";
import { ArrowLeft, Calendar, Bell } from "lucide-react";
import PageHeader from "@/app/(site)/components/Pageheader";

export default async function ObavestenjePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const obavestenje = await prisma.obavestenje.findUnique({
    where: { id: Number(id) },
  });

  if (!obavestenje || !obavestenje.isActive) notFound();

  return (
    <>
      <PageHeader
        title={obavestenje.title}
        breadcrumbs={[
          { label: "Обавештења", href: "/obavestenja" },
          { label: obavestenje.title },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">

          {/* Meta */}
          <div className="flex items-center gap-2 text-stone-400 text-sm mb-8">
            <Calendar size={14} className="text-crimson-700" />
            {new Date(obavestenje.publishedAt).toLocaleDateString("sr-RS", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          {/* Sadrzaj */}
          <div
            className="prose prose-stone max-w-none prose-headings:font-bold prose-headings:text-stone-900 prose-a:text-crimson-700 prose-strong:text-stone-900"
            dangerouslySetInnerHTML={{ __html: obavestenje.content }}
          />

          {/* Nazad */}
          <div className="mt-12 pt-6 border-t border-stone-100">
            <Link
              href="/obavestenja"
              className="flex items-center gap-2 text-stone-400 hover:text-crimson-700 text-sm font-semibold transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Сва обавештења
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}