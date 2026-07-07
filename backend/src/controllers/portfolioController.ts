import { Request, Response } from "express";
import { copyStrategy, getPortfolio } from "../services/portfolioService";

export async function copy(req: Request, res: Response) {
  try {
    const telegramId = String(req.params.telegramId);
    const managerId = Number(req.body.managerId);
    const amount = Number(req.body.amount);

    if (!managerId || managerId <= 0) {
      return res.status(400).json({ message: "Invalid manager" });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid allocation amount" });
    }

    const result = await copyStrategy(telegramId, managerId, amount);
    res.json(result);
  } catch (error: any) {
    const message = error.message || "Failed to copy strategy";

    res.status(
      ["Vault not active", "Insufficient vault balance", "Invalid allocation amount"].includes(message)
        ? 400
        : 500
    ).json({ message });
  }
}

export async function get(req: Request, res: Response) {
  try {
    const telegramId = String(req.params.telegramId);
    const portfolio = await getPortfolio(telegramId);
    res.json(portfolio);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch portfolio",
    });
  }
}