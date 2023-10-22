import { Router } from "express";
import { celebrate } from "celebrate";
import { authController } from "../controllers/index";
import { authValidation } from "../validations";
import { auth } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/signup",
  celebrate(authValidation.registrationSchema),
  authController.registration
);

router.post(
  "/login",
  celebrate(authValidation.loginSchema),
  authController.login
);

router.get("/me", auth, authController.me);

export default router;
