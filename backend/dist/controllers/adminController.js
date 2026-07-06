"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overview = overview;
exports.investors = investors;
exports.editInvestor = editInvestor;
exports.editInvestorWallet = editInvestorWallet;
exports.editInvestorVault = editInvestorVault;
const adminService_1 = require("../services/adminService");
const adminInvestorService_1 = require("../services/adminInvestorService");
async function overview(_, res) {
    try {
        res.json(await (0, adminService_1.getAdminOverview)());
    }
    catch (error) {
        res.status(500).json({ message: "Failed to load overview", error: error.message });
    }
}
async function investors(_, res) {
    try {
        res.json(await (0, adminInvestorService_1.getInvestors)());
    }
    catch (error) {
        res.status(500).json({ message: "Failed to load investors", error: error.message });
    }
}
async function editInvestor(req, res) {
    try {
        res.json(await (0, adminInvestorService_1.updateInvestor)(Number(req.params.id), req.body));
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update investor", error: error.message });
    }
}
async function editInvestorWallet(req, res) {
    try {
        res.json(await (0, adminInvestorService_1.updateInvestorWallet)(Number(req.params.id), Number(req.body.balance)));
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update wallet", error: error.message });
    }
}
async function editInvestorVault(req, res) {
    try {
        res.json(await (0, adminInvestorService_1.updateInvestorVault)(Number(req.params.id), req.body));
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update vault", error: error.message });
    }
}
