import { Request, Response } from "express";
import { getOrCreateWallet } from "../services/walletService";

export async function getWallet(req: Request, res: Response) {
  try {
    const telegramId = String(req.params.telegramId);
    const wallet = await getOrCreateWallet(telegramId);
    res.json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch wallet",
    });
  }
}