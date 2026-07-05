import { Request, Response } from "express";
import { getManagers, getManager } from "../services/managerService";

export async function list(req: Request, res: Response) {
  try {
    const managers = await getManagers();
    res.json(managers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch managers" });
  }
}

export async function single(req: Request, res: Response) {
  try {
    const manager = await getManager(Number(req.params.id));

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.json(manager);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch manager" });
  }
}