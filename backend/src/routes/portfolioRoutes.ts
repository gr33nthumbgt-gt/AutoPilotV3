import { Router } from "express";
import * as portfolioController from "../controllers/portfolioController";

const router = Router();

router.post("/:telegramId/copy", portfolioController.copy);
router.get("/:telegramId", portfolioController.get);

export default router;