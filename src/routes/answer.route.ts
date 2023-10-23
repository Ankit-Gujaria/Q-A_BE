import { Router } from "express";
import { celebrate } from "celebrate";
import multer from "multer";
import { answerController } from "../controllers";
import { answerValidation } from "../validations";
import { adminRole, auth } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/answers",
  auth,
  adminRole,
  multer().single("answerImage"),
  celebrate(answerValidation.addAnswerValidationSchema),
  answerController.addAnswer
);

router.put(
    "/answers/:id",
    auth,
    adminRole,
    multer().single("answerImage"),
    celebrate(answerValidation.editAnswerValidationSchema),
    answerController.editAnswer
  );
  
router.get(
    "/answers/:id",
    auth,
    answerController.answerDetails
  );
export default router;
