import prisma from "../lib/prisma";

export async function getManagers() {
  return prisma.strategyManager.findMany({
    orderBy: { return6m: "desc" },
  });
}

export async function getManager(id: number) {
  return prisma.strategyManager.findUnique({
    where: { id },
  });
}

export async function createManager(data: any) {
  return prisma.strategyManager.create({
    data: {
      name: data.name,
      category: data.category,
      bio: data.bio,
      markets: data.markets,
      return6m: Number(data.return6m),
      winRate: Number(data.winRate),
      maxDrawdown: Number(data.maxDrawdown),
      riskLevel: data.riskLevel,
      trackerUrl: data.trackerUrl,
      status: data.status || "ACTIVE",
    },
  });
}

export async function updateManager(id: number, data: any) {
  return prisma.strategyManager.update({
    where: { id },
    data: {
      ...data,
      return6m: data.return6m !== undefined ? Number(data.return6m) : undefined,
      winRate: data.winRate !== undefined ? Number(data.winRate) : undefined,
      maxDrawdown: data.maxDrawdown !== undefined ? Number(data.maxDrawdown) : undefined,
    },
  });
}

export async function deleteManager(id: number) {
  return prisma.strategyManager.delete({
    where: { id },
  });
}