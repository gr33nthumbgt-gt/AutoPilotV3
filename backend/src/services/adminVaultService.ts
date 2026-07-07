import prisma from "../lib/prisma";

export async function getVaults() {
  return prisma.vault.findMany({
    include: {
      investor: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateVault(id: number, data: any) {
  return prisma.vault.update({
    where: { id },
    data: {
      balance: data.balance !== undefined ? Number(data.balance) : undefined,
      allocated: data.allocated !== undefined ? Number(data.allocated) : undefined,
      available: data.available !== undefined ? Number(data.available) : undefined,
      status: data.status,
    },
    include: {
      investor: true,
    },
  });
}

export async function deleteVault(id: number) {
  return prisma.vault.delete({
    where: { id },
  });
}