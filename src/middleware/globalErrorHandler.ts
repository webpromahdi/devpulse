import type { Request, Response, NextFunction } from "express";
import sendResponse from "../utility/sendResponse.js";

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  sendResponse(res, {
    statusCode: 500,
    success: false,
    message: err.message || "Something went wrong",
  });
};
export default globalErrorHandler;
