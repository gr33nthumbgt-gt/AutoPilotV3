"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.single = single;
const managerService_1 = require("../services/managerService");
async function list(req, res) {
    try {
        const managers = await (0, managerService_1.getManagers)();
        res.json(managers);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch managers" });
    }
}
async function single(req, res) {
    try {
        const manager = await (0, managerService_1.getManager)(Number(req.params.id));
        if (!manager) {
            return res.status(404).json({ message: "Manager not found" });
        }
        res.json(manager);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch manager" });
    }
}
