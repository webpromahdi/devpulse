import type { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync.js";
import sendResponse from "../../utility/sendResponse.js";
import { issuesService } from "./issues.service.js";

const createIssue = catchAsync(async (req: Request, res: Response) => {
  const result = await issuesService.createIssueIntoDB(req.body, req.user!.id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Issue created successfully",
    data: result.rows[0],
  });
});

const getIssues = catchAsync(async (req: Request, res: Response) => {
  const { sort, type, status } = req.query;
  const result = await issuesService.getIssuesFromDB({ sort, type, status } as {
    sort?: string;
    type?: string;
    status?: string;
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Issues retrieved successfully",
    data: result.rows,
  });
});

export const issueController = {
  createIssue,
  getIssues,
};
