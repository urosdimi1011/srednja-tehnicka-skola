import { prisma } from "@/api/prisma";
import { notFound } from "next/navigation";
import ObavestenjeForm from "./ObavestenjeForm";

export default async function EditObavestenjePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNovo = id === "novo";

  const obavestenje = isNovo
    ? null
    : await prisma.obavestenje.findUnique({ where: { id: Number(id) } });

  if (!isNovo && !obavestenje) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-stone-900">
          {isNovo ? "Ново обавештење" : "Уреди обавештење"}
        </h1>
        {obavestenje && (
          <p className="text-stone-400 text-sm mt-1">{obavestenje.title}</p>
        )}
      </div>
      <ObavestenjeForm obavestenje={obavestenje} />
    </div>
  );
}