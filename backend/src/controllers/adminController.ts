import { Request, Response } from "express";
import {
  getAdminOverview,
  getInvestors,
  updateManager,
} from "../services/adminService";

export async function overview(_: Request, res: Response) {
  try {
    res.json(await getAdminOverview());
  } catch (error: any) {
    console.error("ADMIN OVERVIEW ERROR:", error);
    res.status(500).json({
      message: "Failed to load overview",
      error: error.message,
    });
  }
}

export async function investors(_: Request, res: Response) {
  try {
    res.json(await getInvestors());
  } catch (error: any) {
    console.error("ADMIN INVESTORS ERROR:", error);
    res.status(500).json({
      message: "Failed to load investors",
      error: error.message,
    });
  }
}

export async function editManager(req: Request, res: Response) {
  try {
    const manager = await updateManager(Number(req.params.id), req.body);
    res.json(manager);
  } catch (error: any) {
    console.error("ADMIN MANAGER UPDATE ERROR:", error);
    res.status(500).json({
      message: "Failed to update manager",
      error: error.message,
    });
  }
}