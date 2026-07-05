"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyStrategy = copyStrategy;
exports.getPortfolio = getPortfolio;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function copyStrategy(telegramId, managerId, amount) {
    const investor = await prisma_1.default.investor.findUnique({
        where: { telegramId },
        include: { vault: true },
    });
    if (!investor)
        throw new Error("Investor not found");
    if (!investor.vault)
        throw new Error("Vault not active");
    if (investor.vault.available < amount)
        throw new Error("Insufficient vault balance");
    const allocation = await prisma_1.default.allocation.create({
        data: {
            investorId: investor.id,
            managerId,
            amount,
            currency: investor.vault.currency,
            status: "ACTIVE",
        },
    });
    const vault = await prisma_1.default.vault.update({
        where: { investorId: investor.id },
        data: {
            allocated: investor.vault.allocated + amount,
            available: investor.vault.available - amount,
        },
    });
    return { allocation, vault };
}
async function getPortfolio(telegramId) {
    const investor = await prisma_1.default.investor.findUnique({
        where: { telegramId },
        include: {
            wallet: true,
            vault: true,
            allocations: {
                include: { manager: true },
            },
        },
    });
    if (!investor)
        throw new Error("Investor not found");
    const wallet = investor.wallet?.balance || 0;
    const vault = investor.vault?.balance || 0;
    const allocated = investor.vault?.allocated || 0;
    const available = investor.vault?.available || 0;
    return {
        wallet,
        vault,
        allocated,
        available,
        todayReturn: 18,
        totalReturn: 42,
        currency: investor.wallet?.currency || "USDT",
        allocations: investor.allocations,
    };
}
