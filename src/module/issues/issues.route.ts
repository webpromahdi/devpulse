import { Router } from "express";
import { issueController } from "./issues.controller.js";
import auth from "../../middleware/auth.js";

const router = Router();

router.post("/", auth(), issueController.createIssue);
router.get("/", issueController.getIssues);

export const issuesRouter = router;
