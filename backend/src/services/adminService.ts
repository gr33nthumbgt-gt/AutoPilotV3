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

export async function getInvestors() {
  return prisma.investor.findMany({
    include: {
      wallet: true,
      vault: true,
      allocations: { include: { manager: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateInvestor(
  id: number,
  data: {
    firstName?: string;
    phone?: string;
    email?: string;
    city?: string;
    gender?: string;
    country?: string;
    onboardingState?: string;
  }
) {
  return prisma.investor.update({
    where: { id },
    data,
    include: {
      wallet: true,
      vault: true,
      allocations: { include: { manager: true } },
    },
  });
}

export async function updateInvestorWallet(id: number, balance: number) {
  const investor = await prisma.investor.findUnique({ where: { id } });

  if (!investor) throw new Error("Investor not found");

  return prisma.wallet.upsert({
    where: { investorId: id },
    update: { balance: Number(balance) },
    create: {
      investorId: id,
      balance: Number(balance),
      currency: "USDT",
      connected: true,
    },
  });
}

export async function updateInvestorVault(
  id: number,
  data: {
    balance?: number;
    allocated?: number;
    available?: number;
    status?: string;
  }
) {
  return prisma.vault.upsert({
    where: { investorId: id },
    update: {
      balance: data.balance !== undefined ? Number(data.balance) : undefined,
      allocated: data.allocated !== undefined ? Number(data.allocated) : undefined,
      available: data.available !== undefined ? Number(data.available) : undefined,
      status: data.status,
    },
    create: {
      investorId: id,
      balance: Number(data.balance ?? 0),
      allocated: Number(data.allocated ?? 0),
      available: Number(data.available ?? 0),
      status: data.status || "INACTIVE",
      currency: "USDT",
    },
  });
}

export async function updateManager(id: number, data: any) {
  return prisma.strategyManager.update({
    where: { id },
    data,
  });
}