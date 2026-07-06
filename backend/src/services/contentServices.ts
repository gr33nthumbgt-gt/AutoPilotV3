import prisma from "../lib/prisma";

export async function getContentSettings() {
  return prisma.adminSetting.findMany({
    orderBy: { key: "asc" },
  });
}

export async function upsertContentSetting(key: string, value: string) {
  return prisma.adminSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function bulkUpdateContentSettings(settings: Record<string, string>) {
  const updates = Object.entries(settings).map(([key, value]) =>
    upsertContentSetting(key, value)
  );

  return Promise.all(updates);
}