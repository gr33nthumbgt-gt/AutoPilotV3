"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.get = get;
exports.updateProfile = updateProfile;
const investorService_1 = require("../services/investorService");
async function login(req, res) {
    try {
        const investor = await (0, investorService_1.loginInvestor)(req.body);
        res.json(investor);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to login investor",
        });
    }
}
async function get(req, res) {
    try {
        const telegramId = Array.isArray(req.params.telegramId)
            ? req.params.telegramId[0]
            : req.params.telegramId;
        const investor = await (0, investorService_1.getInvestor)(telegramId);
        if (!investor) {
            return res.status(404).json({
                success: false,
                message: "Investor not found",
            });
        }
        res.json(investor);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch investor",
        });
    }
}
async function updateProfile(req, res) {
    try {
        const telegramId = Array.isArray(req.params.telegramId)
            ? req.params.telegramId[0]
            : req.params.telegramId;
        const investor = await (0, investorService_1.updateInvestorProfile)(telegramId, req.body);
        res.json(investor);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
}
