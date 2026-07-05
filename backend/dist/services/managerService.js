"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManagers = getManagers;
exports.getManager = getManager;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function getManagers() {
    return prisma_1.default.strategyManager.findMany({
        where: { status: "ACTIVE" },
        orderBy: { return6m: "desc" },
    });
}
async function getManager(id) {
    return prisma_1.default.strategyManager.findUnique({
        where: { id },
    });
}
