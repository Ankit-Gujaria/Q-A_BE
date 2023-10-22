import { Router } from "express";
import { celebrate } from "celebrate";
import multer from "multer";
import { questionController } from "../controllers";
import { questionValidation } from "../validations";
import { auth, customerRole } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/questions",
  auth,
  customerRole,
  multer().single("questionImage"),
  celebrate(questionValidation.addQuestionValidationSchema),
  questionController.addQuestion
);

router.get("/questions", auth, customerRole, questionController.listQuestions);

export default router;
