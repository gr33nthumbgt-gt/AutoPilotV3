import { Request, Response } from "express";
import { copyStrategy, getPortfolio } from "../services/portfolioService";

export async function copy(req: Request, res: Response) {
  try {
    const telegramId = String(req.params.telegramId);

    const result = await copyStrategy(
      telegramId,
      Number(req.body.managerId),
      Number(req.body.amount)
    );

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to copy strategy" });
  }
}

export async function get(req: Request, res: Response) {
  try {
    const telegramId = String(req.params.telegramId);
    const portfolio = await getPortfolio(telegramId);
    res.json(portfolio);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch portfolio" });
  }
}