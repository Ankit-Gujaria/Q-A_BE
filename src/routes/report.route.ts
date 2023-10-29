import { Router } from "express";
import { reportController } from "../controllers/index";
import { auth } from "../middleware/auth.middleware";

const router = Router();

router.get("/reports", auth, reportController.questionReport);

export default router;
