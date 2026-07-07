import prisma from "../lib/prisma";

export async function getOrCreateWallet(telegramId: string) {
  const investor = await prisma.investor.findUnique({
    where: { telegramId },
    include: { wallet: true },
  });

  if (!investor) {
    throw new Error("Investor not found");
  }

  if (investor.wallet) return investor.wallet;

  return prisma.wallet.create({
    data: {
      investorId: investor.id,
      balance: 0,
      currency: "USDT",
      connected: true,
    },
  });
}