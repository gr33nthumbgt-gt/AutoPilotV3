-- CreateTable
CREATE TABLE "Investor" (
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
    "walletConnected" BOOLEAN NOT NULL DEFAULT false,
    "walletBalance" REAL NOT NULL DEFAULT 0,
    "vaultStatus" TEXT NOT NULL DEFAULT 'INACTIVE',
    "onboardingState" TEXT NOT NULL DEFAULT 'NEW_USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Investor_telegramId_key" ON "Investor"("telegramId");
