"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWallet = getWallet;
const walletService_1 = require("../services/walletService");
async function getWallet(req, res) {
    try {
        const telegramId = String(req.params.telegramId);
        const wallet = await (0, walletService_1.getOrCreateWallet)(telegramId);
        res.json(wallet);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch wallet",
        });
    }
}
