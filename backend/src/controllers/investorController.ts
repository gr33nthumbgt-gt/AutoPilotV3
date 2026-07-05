import { Request, Response } from "express";
import {
  loginInvestor,
  getInvestor,
  updateInvestorProfile,
} from "../services/investorService";

export async function login(req: Request, res: Response) {
  try {
    const investor = await loginInvestor(req.body);
    res.json(investor);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to login investor",
    });
  }
}

export async function get(req: Request, res: Response) {
  try {
    const telegramId = Array.isArray(req.params.telegramId)
      ? req.params.telegramId[0]
      : req.params.telegramId;

    const investor = await getInvestor(telegramId);

    if (!investor) {
      return res.status(404).json({
        success: false,
        message: "Investor not found",
      });
    }

    res.json(investor);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch investor",
    });
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const telegramId = Array.isArray(req.params.telegramId)
      ? req.params.telegramId[0]
      : req.params.telegramId;

    const investor = await updateInvestorProfile(
      telegramId,
      req.body
    );

    res.json(investor);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
}
