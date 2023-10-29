import { Router } from "express";
import auth from "./auth.route";
import question from "./question.route";
import user from "./user.route";
import answer from "./answer.route";
import me from "./me.route";
import dashboard from "./dashboard.route";
import report from "./report.route";

const router = Router();

router.use(auth);
router.use(question);
router.use(user);
router.use(answer);
router.use(me);
router.use(dashboard);
router.use(report);

export default router;
