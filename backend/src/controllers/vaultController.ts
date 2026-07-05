import { Request, Response } from "express";
import { activateVault, getVault } from "../services/vaultService";

export async function activate(req: Request, res: Response) {
  try {
    const telegramId = String(req.params.telegramId);

    const result = await activateVault(
      telegramId,
      Number(req.body.amount)
    );

    res.json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to activate vault",
    });
  }
}

export async function get(req: Request, res: Response) {
  try {
    const telegramId = String(req.params.telegramId);
    const vault = await getVault(telegramId);
    res.json(vault);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch vault",
    });
  }
}