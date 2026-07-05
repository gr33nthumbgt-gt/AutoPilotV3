"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminOverview = getAdminOverview;
exports.getInvestors = getInvestors;
exports.updateManager = updateManager;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function getAdminOverview() {
    const investors = await prisma_1.default.investor.count();
    const managers = await prisma_1.default.strategyManager.count();
    const activeVaults = await prisma_1.default.vault.count({
        where: { status: "ACTIVE" },
    });
    const vaults = await prisma_1.default.vault.findMany();
    const totalAum = vaults.reduce((sum, vault) => sum + vault.balance, 0);
    return {
        investors,
        managers,
        activeVaults,
        totalAum,
    };
}
async function getInvestors() {
    return prisma_1.default.investor.findMany({
        include: {
            wallet: true,
            vault: true,
            allocations: {
                include: { manager: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
}
async function updateManager(id, data) {
    return prisma_1.default.strategyManager.update({
        where: { id },
        data,
    });
}
