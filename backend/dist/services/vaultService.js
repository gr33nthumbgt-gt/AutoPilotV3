"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateVault = activateVault;
exports.getVault = getVault;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function activateVault(telegramId, amount) {
    const investor = await prisma_1.default.investor.findUnique({
        where: { telegramId },
        include: { wallet: true, vault: true },
    });
    if (!investor)
        throw new Error("Investor not found");
    const wallet = investor.wallet ||
        (await prisma_1.default.wallet.create({
            data: { investorId: investor.id, balance: 5840, currency: "USDT" },
        }));
    if (wallet.balance < amount) {
        throw new Error("Insufficient wallet balance");
    }
    const updatedWallet = await prisma_1.default.wallet.update({
        where: { investorId: investor.id },
        data: { balance: wallet.balance - amount },
    });
    const vault = investor.vault
        ? await prisma_1.default.vault.update({
            where: { investorId: investor.id },
            data: {
                balance: investor.vault.balance + amount,
                available: investor.vault.available + amount,
                status: "ACTIVE",
            },
        })
        : await prisma_1.default.vault.create({
            data: {
                investorId: investor.id,
                balance: amount,
                available: amount,
                allocated: 0,
                currency: "USDT",
                status: "ACTIVE",
            },
        });
    return { wallet: updatedWallet, vault };
}
async function getVault(telegramId) {
    const investor = await prisma_1.default.investor.findUnique({
        where: { telegramId },
        include: { vault: true },
    });
    if (!investor)
        throw new Error("Investor not found");
    return investor.vault;
}
