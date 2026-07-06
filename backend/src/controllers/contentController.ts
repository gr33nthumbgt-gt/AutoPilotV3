import { Request, Response } from "express";
import {
  getContentSettings,
  upsertContentSetting,
  bulkUpdateContentSettings,
} from "../services/contentServices";

export async function list(_: Request, res: Response) {
  try {
    res.json(await getContentSettings());
  } catch (error: any) {
    res.status(500).json({ message: "Failed to load content", error: error.message });
  }
}

export async function save(req: Request, res: Response) {
  try {
    res.json(await upsertContentSetting(req.body.key, req.body.value));
  } catch (error: any) {
    res.status(500).json({ message: "Failed to save content", error: error.message });
  }
}

export async function bulkSave(req: Request, res: Response) {
  try {
    res.json(await bulkUpdateContentSettings(req.body));
  } catch (error: any) {
    res.status(500).json({ message: "Failed to save content", error: error.message });
  }
}