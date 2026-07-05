import { Router } from "express";
import * as managerController from "../controllers/managerController";

const router = Router();

router.get("/", managerController.list);
router.get("/:id", managerController.single);

export default router;