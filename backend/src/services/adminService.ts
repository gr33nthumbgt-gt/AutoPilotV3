import prisma from "../lib/prisma";

export async function getAdminOverview() {
  const investors = await prisma.investor.count();
  const managers = await prisma.strategyManager.count();
  const activeVaults = await prisma.vault.count({
    where: { status: "ACTIVE" },
  });

  const vaults = await prisma.vault.findMany();

  const totalAum = vaults.reduce((sum, vault) => sum + vault.balance, 0);

  return {
    investors,
    managers,
    activeVaults,
    totalAum,
  };
}

export async function getInvestors() {
  return prisma.investor.findMany({
    include: {
      wallet: true,
      vault: true,
      allocations: {
        include: { manager: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateManager(
  id: number,
  data: {
    name?: string;
    category?: string;
    bio?: string;
    markets?: string;
    return6m?: number;
    winRate?: number;
    maxDrawdown?: number;
    riskLevel?: string;
    trackerUrl?: string;
    status?: string;
  }
) {
  return prisma.strategyManager.update({
    where: { id },
    data,
  });
}