"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginInvestor = loginInvestor;
exports.getInvestor = getInvestor;
exports.updateInvestorProfile = updateInvestorProfile;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function loginInvestor(data) {
    return prisma_1.default.investor.upsert({
        where: { telegramId: data.telegramId },
        update: {
            username: data.username || null,
            firstName: data.firstName || null,
            lastName: data.lastName || null,
        },
        create: {
            telegramId: data.telegramId,
            username: data.username || null,
            firstName: data.firstName || null,
            lastName: data.lastName || null,
        },
    });
}
async function getInvestor(telegramId) {
    return prisma_1.default.investor.findUnique({
        where: { telegramId },
    });
}
async function updateInvestorProfile(telegramId, data) {
    return prisma_1.default.investor.update({
        where: { telegramId },
        data: {
            ...data,
            onboardingState: "PROFILE_CREATED",
        },
    });
}
