import prisma from "../lib/prisma";

export async function getAdminOverview() {
  const investors = await prisma.investor.count();
  const managers = await prisma.strategyManager.count();

  const activeVaults = await prisma.vault.count({
    where: { status: "ACTIVE" },
  });

  const vaults = await prisma.vault.findMany();
  const totalAum = vaults.reduce((sum, vault) => sum + vault.balance, 0);

  return { investors, managers, activeVaults, totalAum };
}