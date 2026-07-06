import { Router } from "express";
import * as contentController from "../controllers/contentController";

const router = Router();

router.get("/", contentController.list);
router.post("/", contentController.save);
router.post("/bulk", contentController.bulkSave);

export default router;