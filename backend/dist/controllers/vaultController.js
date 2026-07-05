"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.get = get;
const vaultService_1 = require("../services/vaultService");
async function activate(req, res) {
    try {
        const telegramId = String(req.params.telegramId);
        const result = await (0, vaultService_1.activateVault)(telegramId, Number(req.body.amount));
        res.json(result);
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to activate vault",
        });
    }
}
async function get(req, res) {
    try {
        const telegramId = String(req.params.telegramId);
        const vault = await (0, vaultService_1.getVault)(telegramId);
        res.json(vault);
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch vault",
        });
    }
}
