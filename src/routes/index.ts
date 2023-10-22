import { Router } from "express";
import auth from "./auth.route";
import question from "./question.route";
import user from "./user.route";

const router = Router();

router.use(auth);
router.use(question);
router.use(user);

export default router;
