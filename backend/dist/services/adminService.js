"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminOverview = getAdminOverview;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function getAdminOverview() {
    const investors = await prisma_1.default.investor.count();
    const managers = await prisma_1.default.strategyManager.count();
    const activeVaults = await prisma_1.default.vault.count({
        where: { status: "ACTIVE" },
    });
    const vaults = await prisma_1.default.vault.findMany();
    const totalAum = vaults.reduce((sum, vault) => sum + vault.balance, 0);
    return { investors, managers, activeVaults, totalAum };
}
