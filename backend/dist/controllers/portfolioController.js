"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = copy;
exports.get = get;
const portfolioService_1 = require("../services/portfolioService");
async function copy(req, res) {
    try {
        const telegramId = String(req.params.telegramId);
        const result = await (0, portfolioService_1.copyStrategy)(telegramId, Number(req.body.managerId), Number(req.body.amount));
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message || "Failed to copy strategy" });
    }
}
async function get(req, res) {
    try {
        const telegramId = String(req.params.telegramId);
        const portfolio = await (0, portfolioService_1.getPortfolio)(telegramId);
        res.json(portfolio);
    }
    catch (error) {
        res.status(500).json({ message: error.message || "Failed to fetch portfolio" });
    }
}
