import prisma from "../lib/prisma";

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

export async function updateInvestor(id: number, data: any) {
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

export async function updateInvestorVault(id: number, data: any) {
  return prisma.vault.upsert({
    where: { investorId: id },
    update: {
      balance: Number(data.balance ?? 0),
      allocated: Number(data.allocated ?? 0),
      available: Number(data.available ?? 0),
      status: data.status ?? "INACTIVE",
    },
    create: {
      investorId: id,
      balance: Number(data.balance ?? 0),
      allocated: Number(data.allocated ?? 0),
      available: Number(data.available ?? 0),
      currency: "USDT",
      status: data.status ?? "INACTIVE",
    },
  });
}