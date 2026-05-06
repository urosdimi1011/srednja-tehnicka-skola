import { prisma } from "@/api/prisma";
import UpisForm from "./UpisForm";

export default async function AdminUpisPage() {
  const upis = await prisma.upis.findUnique({ where: { id: 1 } });

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-stone-900">Упис</h1>
        <p className="text-stone-400 text-sm mt-1">
          Управљајте садржајем странице о упису
        </p>
      </div>

      <div className="bg-white border border-stone-200 p-8">
        <UpisForm upis={upis} />
      </div>
    </div>
  );
}
