import { Router } from "express";
import { celebrate } from "celebrate";
import { userController } from "../controllers";
import { userValidation } from "../validations";
import { auth, adminRole } from "../middleware/auth.middleware";

const router = Router();

router.get("/users", auth, adminRole, userController.listUsers);

router.put(
  "/users/:id/status",
  celebrate(userValidation.userUpdateStatus),
  userController.updateUserStatus
);

export default router;
