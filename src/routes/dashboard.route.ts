import { Router } from "express";
import { celebrate } from "celebrate";
import { dashboardController } from "../controllers/index";
import { auth, adminRole } from "../middleware/auth.middleware";
import { meValidation } from "../validations";

const router = Router();

router.get("/dashboard", auth, adminRole, dashboardController.dashboardCount);

export default router;
