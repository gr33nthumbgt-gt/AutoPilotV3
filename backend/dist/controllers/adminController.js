"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overview = overview;
exports.investors = investors;
exports.editManager = editManager;
const adminService_1 = require("../services/adminService");
async function overview(_, res) {
    try {
        res.json(await (0, adminService_1.getAdminOverview)());
    }
    catch (error) {
        res.status(500).json({ message: "Failed to load overview" });
    }
}
async function investors(_, res) {
    try {
        res.json(await (0, adminService_1.getInvestors)());
    }
    catch (error) {
        res.status(500).json({ message: "Failed to load investors" });
    }
}
async function editManager(req, res) {
    try {
        const manager = await (0, adminService_1.updateManager)(Number(req.params.id), req.body);
        res.json(manager);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update manager" });
    }
}
