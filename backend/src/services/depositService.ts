import prisma from "../lib/prisma";

type CreateDepositInput = {
  amount: number;
  currency?: string;
  method?: string;
  externalRef?: string;
  note?: string;
};

export async function createDepositRequest(
  telegramId: string,
  data: CreateDepositInput
) {
  if (!Number.isFinite(data.amount) || data.amount <= 0) {
    throw new Error("Invalid deposit amount");
  }

  const investor = await prisma.investor.findUnique({
    where: { telegramId },
  });

  if (!investor) {
    throw new Error("Investor not found");
  }

  return prisma.depositRequest.create({
    data: {
      investorId: investor.id,
      amount: data.amount,
      currency: data.currency?.trim().toUpperCase() || "USDT",
      method: data.method?.trim().toUpperCase() || "MANUAL",
      externalRef: data.externalRef?.trim() || null,
      note: data.note?.trim() || null,
      status: "PENDING",
    },
  });
}

export async function getInvestorDeposits(telegramId: string) {
  const investor = await prisma.investor.findUnique({
    where: { telegramId },
  });

  if (!investor) {
    throw new Error("Investor not found");
  }

  return prisma.depositRequest.findMany({
    where: { investorId: investor.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllDeposits(status?: string) {
  return prisma.depositRequest.findMany({
    where: status
      ? {
          status: status.toUpperCase(),
        }
      : undefined,
    include: {
      investor: {
        select: {
          id: true,
          telegramId: true,
          username: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function approveDeposit(
  depositId: number,
  reviewedBy?: string,
  note?: string
) {
  return prisma.$transaction(async (tx) => {
    const deposit = await tx.depositRequest.findUnique({
      where: { id: depositId },
      include: {
        investor: {
          include: {
            wallet: true,
          },
        },
      },
    });

    if (!deposit) {
      throw new Error("Deposit not found");
    }

    if (deposit.status !== "PENDING") {
      throw new Error(`Deposit is already ${deposit.status.toLowerCase()}`);
    }

    const claimed = await tx.depositRequest.updateMany({
      where: {
        id: depositId,
        status: "PENDING",
      },
      data: {
        status: "APPROVED",
        reviewedBy: reviewedBy?.trim() || null,
        note: note?.trim() || deposit.note,
        reviewedAt: new Date(),
        creditedAt: new Date(),
      },
    });

    if (claimed.count !== 1) {
      throw new Error("Deposit has already been processed");
    }

    const wallet = await tx.wallet.upsert({
      where: {
        investorId: deposit.investorId,
      },
      update: {
        balance: {
          increment: deposit.amount,
        },
      },
      create: {
        investorId: deposit.investorId,
        balance: deposit.amount,
        currency: deposit.currency,
        connected: true,
      },
    });

    const approvedDeposit = await tx.depositRequest.findUnique({
      where: { id: depositId },
      include: {
        investor: {
          select: {
            id: true,
            telegramId: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return {
      deposit: approvedDeposit,
      wallet,
    };
  });
}

export async function rejectDeposit(
  depositId: number,
  reviewedBy?: string,
  note?: string
) {
  const deposit = await prisma.depositRequest.findUnique({
    where: { id: depositId },
  });

  if (!deposit) {
    throw new Error("Deposit not found");
  }

  if (deposit.status !== "PENDING") {
    throw new Error(`Deposit is already ${deposit.status.toLowerCase()}`);
  }

  return prisma.depositRequest.update({
    where: { id: depositId },
    data: {
      status: "REJECTED",
      reviewedBy: reviewedBy?.trim() || null,
      note: note?.trim() || deposit.note,
      reviewedAt: new Date(),
    },
  });
}