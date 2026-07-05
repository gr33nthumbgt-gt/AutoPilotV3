import prisma from "../lib/prisma";

export async function loginInvestor(data: {
  telegramId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}) {
  return prisma.investor.upsert({
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
}

export async function getInvestor(telegramId: string) {
  return prisma.investor.findUnique({
    where: { telegramId },
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
  });
}