import prisma from "../lib/prisma";

export async function copyStrategy(
  telegramId: string,
  managerId: number,
  amount: number
) {
  if (!amount || amount <= 0) {
    throw new Error("Invalid allocation amount");
  }

  const investor = await prisma.investor.findUnique({
    where: { telegramId },
    include: { vault: true },
  });

  if (!investor) throw new Error("Investor not found");
  if (!investor.vault) throw new Error("Vault not active");
  if (investor.vault.available < amount) {
    throw new Error("Insufficient vault balance");
  }

  return prisma.$transaction(async (tx) => {
    const allocation = await tx.allocation.create({
      data: {
        investorId: investor.id,
        managerId,
        amount,
        currency: investor.vault!.currency,
        status: "ACTIVE",
      },
      include: {
        manager: true,
      },
    });

    const vault = await tx.vault.update({
      where: { investorId: investor.id },
      data: {
        allocated: investor.vault!.allocated + amount,
        available: investor.vault!.available - amount,
      },
    });

    return { allocation, vault };
  });
}

export async function getPortfolio(telegramId: string) {
  const investor = await prisma.investor.findUnique({
    where: { telegramId },
    include: {
      wallet: true,
      vault: true,
      allocations: {
        include: { manager: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!investor) throw new Error("Investor not found");

  const wallet = investor.wallet?.balance ?? 0;
  const vault = investor.vault?.balance ?? 0;
  const allocated = investor.vault?.allocated ?? 0;
  const available = investor.vault?.available ?? 0;

  return {
    wallet,
    vault,
    allocated,
    available,
    todayReturn: 0,
    totalReturn: 0,
    currency: investor.wallet?.currency || investor.vault?.currency || "USDT",
    allocations: investor.allocations,
  };
}