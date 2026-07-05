import { Request, Response } from "express";
import {
  getAdminOverview,
  getInvestors,
  updateManager,
} from "../services/adminService";

export async function overview(_: Request, res: Response) {
  try {
    res.json(await getAdminOverview());
  } catch (error) {
    res.status(500).json({ message: "Failed to load overview" });
  }
}

export async function investors(_: Request, res: Response) {
  try {
    res.json(await getInvestors());
  } catch (error) {
    res.status(500).json({ message: "Failed to load investors" });
  }
}

export async function editManager(req: Request, res: Response) {
  try {
    const manager = await updateManager(Number(req.params.id), req.body);
    res.json(manager);
  } catch (error) {
    res.status(500).json({ message: "Failed to update manager" });
  }
}