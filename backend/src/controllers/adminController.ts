import { Request, Response } from "express";
import {
  getAdminOverview,
  getInvestors,
  updateInvestor,
  updateInvestorWallet,
  updateInvestorVault,
  updateManager,
} from "../services/adminService";

export async function overview(_: Request, res: Response) {
  try {
    res.json(await getAdminOverview());
  } catch (error: any) {
    res.status(500).json({ message: "Failed to load overview", error: error.message });
  }
}

export async function investors(_: Request, res: Response) {
  try {
    res.json(await getInvestors());
  } catch (error: any) {
    res.status(500).json({ message: "Failed to load investors", error: error.message });
  }
}

export async function editInvestor(req: Request, res: Response) {
  try {
    res.json(await updateInvestor(Number(req.params.id), req.body));
  } catch (error: any) {
    res.status(500).json({ message: "Failed to update investor", error: error.message });
  }
}

export async function editInvestorWallet(req: Request, res: Response) {
  try {
    res.json(await updateInvestorWallet(Number(req.params.id), Number(req.body.balance)));
  } catch (error: any) {
    res.status(500).json({ message: "Failed to update wallet", error: error.message });
  }
}

export async function editInvestorVault(req: Request, res: Response) {
  try {
    res.json(await updateInvestorVault(Number(req.params.id), req.body));
  } catch (error: any) {
    res.status(500).json({ message: "Failed to update vault", error: error.message });
  }
}

export async function editManager(req: Request, res: Response) {
  try {
    res.json(await updateManager(Number(req.params.id), req.body));
  } catch (error: any) {
    res.status(500).json({ message: "Failed to update manager", error: error.message });
  }
}