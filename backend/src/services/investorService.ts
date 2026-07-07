import prisma from "../lib/prisma";

export async function loginInvestor(data: {
  telegramId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}) {
  const investor = await prisma.investor.upsert({
    where: { telegramId: data.telegramId },
    update: {
      username: data.username || null,
      firstName: data.firstName || null,
      lastName: data.lastName || null,
    },
    create: {
      telegramId: data.telegramId,
      username: data.username || null,
      firstName: data.firstName || null,
      lastName: data.lastName || null,
    },
  });

  await prisma.wallet.upsert({
    where: { investorId: investor.id },
    update: {},
    create: {
      investorId: investor.id,
      balance: 0,
      currency: "USDT",
      connected: true,
    },
  });

  return prisma.investor.findUnique({
    where: { telegramId: data.telegramId },
    include: {
      wallet: true,
      vault: true,
      allocations: true,
    },
  });
}

export async function getInvestor(telegramId: string) {
  return prisma.investor.findUnique({
    where: { telegramId },
    include: {
      wallet: true,
      vault: true,
      allocations: true,
    },
  });
}

export async function updateInvestorProfile(
  telegramId: string,
  data: {
    firstName?: string;
    phone?: string;
    email?: string;
    city?: string;
    gender?: string;
  }
) {
  return prisma.investor.update({
    where: { telegramId },
    data: {
      ...data,
      onboardingState: "PROFILE_CREATED",
    },
    include: {
      wallet: true,
      vault: true,
      allocations: true,
    },
  });
}