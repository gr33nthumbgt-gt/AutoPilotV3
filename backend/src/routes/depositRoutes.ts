import { Router } from "express";
import * as depositController from "../controllers/depositController";

const router = Router();

router.get("/admin/all", depositController.listAll);
router.patch("/admin/:id/approve", depositController.approve);
router.patch("/admin/:id/reject", depositController.reject);

router.post("/:telegramId", depositController.create);
router.get("/:telegramId", depositController.listForInvestor);

export default router;