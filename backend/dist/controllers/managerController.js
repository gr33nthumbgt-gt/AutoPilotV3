"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.single = single;
exports.create = create;
exports.update = update;
exports.remove = remove;
const managerService_1 = require("../services/managerService");
async function list(_, res) {
    try {
        res.json(await (0, managerService_1.getManagers)());
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function single(req, res) {
    try {
        const manager = await (0, managerService_1.getManager)(Number(req.params.id));
        if (!manager)
            return res.status(404).json({ message: "Manager not found" });
        res.json(manager);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function create(req, res) {
    try {
        res.json(await (0, managerService_1.createManager)(req.body));
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        res.json(await (0, managerService_1.updateManager)(Number(req.params.id), req.body));
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        res.json(await (0, managerService_1.deleteManager)(Number(req.params.id)));
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
