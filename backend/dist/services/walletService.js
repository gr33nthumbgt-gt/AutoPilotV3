"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateWallet = getOrCreateWallet;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function getOrCreateWallet(telegramId) {
    const investor = await prisma_1.default.investor.findUnique({
        where: { telegramId },
        include: { wallet: true },
    });
    if (!investor) {
        throw new Error("Investor not found");
    }
    if (investor.wallet)
        return investor.wallet;
    return prisma_1.default.wallet.create({
        data: {
            investorId: investor.id,
            balance: 5840,
            currency: "USDT",
            connected: true,
        },
    });
}
