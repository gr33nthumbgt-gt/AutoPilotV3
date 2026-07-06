import { Router } from "express";
import * as adminController from "../controllers/adminController";

const router = Router();

router.get("/overview", adminController.overview);
router.get("/investors", adminController.investors);

router.patch("/investors/:id", adminController.editInvestor);
router.patch("/investors/:id/wallet", adminController.editInvestorWallet);
router.patch("/investors/:id/vault", adminController.editInvestorVault);

router.patch("/managers/:id", adminController.editManager);

export default router;