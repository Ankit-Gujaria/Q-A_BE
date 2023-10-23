import { Router } from "express";
import { celebrate } from "celebrate";
import multer from "multer";
import { questionController } from "../controllers";
import { questionValidation } from "../validations";
import { adminRole, auth, customerRole } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/questions",
  auth,
  customerRole,
  multer().single("questionImage"),
  celebrate(questionValidation.addQuestionValidationSchema),
  questionController.addQuestion
);

router.get("/questions", auth, questionController.listQuestions);

router.get("/questions/:id", auth, questionController.questionDetails);

router.put(
  "/questions/:id",
  auth,
  customerRole,
  multer().single("questionImage"),
  celebrate(questionValidation.editQuestionValidationSchema),
  questionController.editQuestion
);

router.put(
  "/questions/:id/status",
  auth,
  adminRole,
  questionController.updateQuestionStatus
);

export default router;
