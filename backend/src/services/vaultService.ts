import prisma from "../lib/prisma";

export async function activateVault(telegramId: string, amount: number) {
  const investor = await prisma.investor.findUnique({
    where: { telegramId },
    include: { wallet: true, vault: true },
  });

  if (!investor) throw new Error("Investor not found");

  const wallet =
    investor.wallet ||
    (await prisma.wallet.create({
      data: { investorId: investor.id, balance: 5840, currency: "USDT" },
    }));

  if (wallet.balance < amount) {
    throw new Error("Insufficient wallet balance");
  }

  const updatedWallet = await prisma.wallet.update({
    where: { investorId: investor.id },
    data: { balance: wallet.balance - amount },
  });

  const vault = investor.vault
    ? await prisma.vault.update({
        where: { investorId: investor.id },
        data: {
          balance: investor.vault.balance + amount,
          available: investor.vault.available + amount,
          status: "ACTIVE",
        },
      })
    : await prisma.vault.create({
        data: {
          investorId: investor.id,
          balance: amount,
          available: amount,
          allocated: 0,
          currency: "USDT",
          status: "ACTIVE",
        },
      });

  return { wallet: updatedWallet, vault };
}

export async function getVault(telegramId: string) {
  const investor = await prisma.investor.findUnique({
    where: { telegramId },
    include: { vault: true },
  });

  if (!investor) throw new Error("Investor not found");

  return investor.vault;
}