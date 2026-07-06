import { Router } from "express";
import * as managerController from "../controllers/managerController";

const router = Router();

router.get("/", managerController.list);
router.get("/:id", managerController.single);
router.post("/", managerController.create);
router.patch("/:id", managerController.update);
router.delete("/:id", managerController.remove);

export default router;