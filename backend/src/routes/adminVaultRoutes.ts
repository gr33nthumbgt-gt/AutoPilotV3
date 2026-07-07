import { Router } from "express";
import * as vaultController from "../controllers/adminVaultController";

const router = Router();

router.get("/", vaultController.list);
router.patch("/:id", vaultController.update);
router.delete("/:id", vaultController.remove);

export default router;