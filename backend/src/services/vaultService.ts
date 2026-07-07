import prisma from "../lib/prisma";

export async function activateVault(telegramId: string, amount: number) {
  const investor = await prisma.investor.findUnique({
    where: { telegramId },
    include: { wallet: true, vault: true },
  });

  if (!investor) throw new Error("Investor not found");
  if (!investor.wallet) throw new Error("Wallet not found");

  if (investor.wallet.balance < amount) {
    throw new Error("Insufficient wallet balance");
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedWallet = await tx.wallet.update({
      where: { investorId: investor.id },
      data: {
        balance: investor.wallet!.balance - amount,
      },
    });

    const vault = investor.vault
      ? await tx.vault.update({
          where: { investorId: investor.id },
          data: {
            balance: investor.vault.balance + amount,
            available: investor.vault.available + amount,
            status: "ACTIVE",
          },
        })
      : await tx.vault.create({
          data: {
            investorId: investor.id,
            balance: amount,
            available: amount,
            allocated: 0,
            currency: investor.wallet!.currency,
            status: "ACTIVE",
          },
        });

    return { wallet: updatedWallet, vault };
  });

  return result;
}

export async function getVault(telegramId: string) {
  const investor = await prisma.investor.findUnique({
    where: { telegramId },
    include: { vault: true },
  });

  if (!investor) throw new Error("Investor not found");

  return investor.vault;
}