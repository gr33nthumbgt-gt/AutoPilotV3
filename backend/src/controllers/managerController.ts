import { Request, Response } from "express";
import {
  getManagers,
  getManager,
  createManager,
  updateManager,
  deleteManager,
} from "../services/managerService";

export async function list(_: Request, res: Response) {
  try {
    res.json(await getManagers());
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function single(req: Request, res: Response) {
  try {
    const manager = await getManager(Number(req.params.id));
    if (!manager) return res.status(404).json({ message: "Manager not found" });
    res.json(manager);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function create(req: Request, res: Response) {
  try {
    res.json(await createManager(req.body));
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function update(req: Request, res: Response) {
  try {
    res.json(await updateManager(Number(req.params.id), req.body));
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    res.json(await deleteManager(Number(req.params.id)));
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}