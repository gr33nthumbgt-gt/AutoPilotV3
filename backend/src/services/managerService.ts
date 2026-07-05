import prisma from "../lib/prisma";

export async function getManagers() {
  return prisma.strategyManager.findMany({
    where: { status: "ACTIVE" },
    orderBy: { return6m: "desc" },
  });
}

export async function getManager(id: number) {
  return prisma.strategyManager.findUnique({
    where: { id },
  });
}