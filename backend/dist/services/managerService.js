"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManagers = getManagers;
exports.getManager = getManager;
exports.createManager = createManager;
exports.updateManager = updateManager;
exports.deleteManager = deleteManager;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function getManagers() {
    return prisma_1.default.strategyManager.findMany({
        orderBy: { return6m: "desc" },
    });
}
async function getManager(id) {
    return prisma_1.default.strategyManager.findUnique({
        where: { id },
    });
}
async function createManager(data) {
    return prisma_1.default.strategyManager.create({
        data: {
            name: data.name,
            category: data.category,
            bio: data.bio,
            markets: data.markets,
            return6m: Number(data.return6m),
            winRate: Number(data.winRate),
            maxDrawdown: Number(data.maxDrawdown),
            riskLevel: data.riskLevel,
            trackerUrl: data.trackerUrl,
            status: data.status || "ACTIVE",
        },
    });
}
async function updateManager(id, data) {
    return prisma_1.default.strategyManager.update({
        where: { id },
        data: {
            ...data,
            return6m: data.return6m !== undefined ? Number(data.return6m) : undefined,
            winRate: data.winRate !== undefined ? Number(data.winRate) : undefined,
            maxDrawdown: data.maxDrawdown !== undefined ? Number(data.maxDrawdown) : undefined,
        },
    });
}
async function deleteManager(id) {
    return prisma_1.default.strategyManager.delete({
        where: { id },
    });
}
