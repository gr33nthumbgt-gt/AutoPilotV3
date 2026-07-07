import { Request, Response } from "express";
import {
  getVaults,
  updateVault,
  deleteVault,
} from "../services/adminVaultService";

export async function list(_: Request, res: Response) {
  try {
    res.json(await getVaults());
  } catch (error: any) {
    res.status(500).json({ message: "Failed to load vaults", error: error.message });
  }
}

export async function update(req: Request, res: Response) {
  try {
    res.json(await updateVault(Number(req.params.id), req.body));
  } catch (error: any) {
    res.status(500).json({ message: "Failed to update vault", error: error.message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    res.json(await deleteVault(Number(req.params.id)));
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete vault", error: error.message });
  }
}