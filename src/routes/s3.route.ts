import { Router } from "express";
import multer from "multer";
import { s3Controller } from "../controllers";
import { auth } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/upload-file",
  auth,
  multer().single("questionImage"),
  s3Controller.uploadFile
);

router.delete("/delete-file", auth, s3Controller.deleteFileFromS3);

export default router;
