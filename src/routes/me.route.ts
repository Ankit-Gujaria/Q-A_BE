import { Router } from "express";
import { celebrate } from "celebrate";
import { meController } from "../controllers/index";
import { auth } from "../middleware/auth.middleware";
import { meValidation } from "../validations";

const router = Router();

router.get("/me", auth, meController.getLoginUser);

router.put(
  "/me",
  auth,
  celebrate(meValidation.editLoginUserSchema),
  meController.editLoginUser
);

export default router;
