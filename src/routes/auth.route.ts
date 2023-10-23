import { Router } from "express";
import { celebrate } from "celebrate";
import { authController } from "../controllers/index";
import { authValidation } from "../validations";

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

export default router;
