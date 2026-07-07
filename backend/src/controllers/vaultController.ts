import { Request, Response } from "express";
import { activateVault, getVault } from "../services/vaultService";

export async function activate(req: Request, res: Response) {
  try {
    const telegramId = String(req.params.telegramId);
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid vault amount" });
    }

    const result = await activateVault(telegramId, amount);
    res.json(result);
  } catch (error: any) {
    const message = error.message || "Failed to activate vault";

    res.status(message === "Insufficient wallet balance" ? 400 : 500).json({
      message,
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