import { Router } from "express";
import * as investorController from "../controllers/investorController";

const router = Router();

router.post("/login", investorController.login);
router.get("/:telegramId", investorController.get);
router.patch("/:telegramId/profile", investorController.updateProfile);

export default router;