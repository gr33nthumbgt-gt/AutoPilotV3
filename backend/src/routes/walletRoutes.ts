import { Router } from "express";
import * as walletController from "../controllers/walletController";

const router = Router();

router.get("/:telegramId", walletController.getWallet);

export default router;