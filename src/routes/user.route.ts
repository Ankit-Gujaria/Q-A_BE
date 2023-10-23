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

router.put(
  "/users/:id",
  auth,
  adminRole,
  celebrate(userValidation.editUserSchema),
  userController.editUser
);

router.delete("/users/:id", auth, adminRole, userController.deleteUser);

export default router;
