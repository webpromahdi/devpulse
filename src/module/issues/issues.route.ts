import { Router } from "express";
import { issueController } from "./issues.controller.js";

const router = Router();

router.post("/", issueController.createIssue);

export const issuesRouter = router;
