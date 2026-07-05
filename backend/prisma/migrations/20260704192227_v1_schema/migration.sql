/*
  Warnings:

  - You are about to drop the column `vaultStatus` on the `Investor` table. All the data in the column will be lost.
  - You are about to drop the column `walletBalance` on the `Investor` table. All the data in the column will be lost.
  - You are about to drop the column `walletConnected` on the `Investor` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Vault" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "investorId" INTEGER NOT NULL,
    "balance" REAL NOT NULL DEFAULT 0,
    "allocated" REAL NOT NULL DEFAULT 0,
    "available" REAL NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USDT',
    "status" TEXT NOT NULL DEFAULT 'INACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Vault_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StrategyManager" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "markets" TEXT NOT NULL,
    "return6m" REAL NOT NULL,
    "winRate" REAL NOT NULL,
    "maxDrawdown" REAL NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "trackerUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Allocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "investorId" INTEGER NOT NULL,
    "managerId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USDT',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Allocation_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Allocation_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "StrategyManager" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PortfolioSnapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "investorId" INTEGER NOT NULL,
    "wallet" REAL NOT NULL,
    "vault" REAL NOT NULL,
    "allocated" REAL NOT NULL,
    "available" REAL NOT NULL,
    "todayReturn" REAL NOT NULL,
    "totalReturn" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USDT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PortfolioSnapshot_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AdminSetting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Investor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telegramId" TEXT NOT NULL,
    "username" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "city" TEXT,
    "gender" TEXT,
    "country" TEXT,
    "onboardingState" TEXT NOT NULL DEFAULT 'NEW_USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Investor" ("city", "country", "createdAt", "email", "firstName", "gender", "id", "lastName", "onboardingState", "phone", "telegramId", "updatedAt", "username") SELECT "city", "country", "createdAt", "email", "firstName", "gender", "id", "lastName", "onboardingState", "phone", "telegramId", "updatedAt", "username" FROM "Investor";
DROP TABLE "Investor";
ALTER TABLE "new_Investor" RENAME TO "Investor";
CREATE UNIQUE INDEX "Investor_telegramId_key" ON "Investor"("telegramId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Vault_investorId_key" ON "Vault"("investorId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminSetting_key_key" ON "AdminSetting"("key");
