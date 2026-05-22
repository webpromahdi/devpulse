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
    data: result,
  });
});

const getSingleIssue = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await issuesService.getSingleIssueFromDB(id as string);
  if (!result) {
    return res.status(404).json({ success: false, message: "Issue not found" });
  }
  sendResponse(res, { statusCode: 200, success: true, data: result });
});

const updateIssue = catchAsync(async (req: Request, res: Response) => {
  const result = await issuesService.updateIssueInDB(
    req.params.id as string,
    req.body,
    req.user!.id,
    req.user!.role,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Issue updated successfully",
    data: result,
  });
});

const deleteIssue = catchAsync(async (req: Request, res: Response) => {
  await issuesService.deleteIssueFromDB(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Issue deleted successfully",
  });
});

export const issueController = {
  createIssue,
  getIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
