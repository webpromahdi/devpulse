import type { Request, Response } from "express";
import { authServices } from "./auth.service.js";
import sendResponse from "../../utility/sendResponse.js";
import catchAsync from "../../utility/catchAsync.js";

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.registerUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result.rows[0],
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const authController = {
  signup,
  login,
};
