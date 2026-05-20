import express from "express";
import { authRouter } from "./module/auth/auth.route.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

app.use(globalErrorHandler);

export default app;
