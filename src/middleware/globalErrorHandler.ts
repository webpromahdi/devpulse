import type { Request, Response, NextFunction } from "express";
import sendResponse from "../utility/sendResponse.js";

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  if (err.message === "Issue not found") statusCode = 404;
  if (err.message === "Forbidden") statusCode = 403;
  if (err.message === "Conflict") statusCode = 409;
  if (err.message === "Unauthorized access") statusCode = 401;
  if (err.message === "Invalid email or password") statusCode = 401;
  if (err.message === "Invalid role") statusCode = 400;
  sendResponse(res, {
    statusCode: statusCode,
    success: false,
    message: err.message || "Something went wrong",
  });
};
export default globalErrorHandler;
