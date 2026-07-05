import { Router } from "express";
import * as vaultController from "../controllers/vaultController";

const router = Router();

router.post("/:telegramId/activate", vaultController.activate);
router.get("/:telegramId", vaultController.get);

export default router;