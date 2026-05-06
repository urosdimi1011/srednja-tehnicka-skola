import { prisma } from "@/api/prisma";

export async function getUpis() {
  return prisma.upis.findUnique({ where: { id: 1 } });
}
