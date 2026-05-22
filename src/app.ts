import express from "express";
import { authRouter } from "./module/auth/auth.route.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import { issuesRouter } from "./module/issues/issues.route.js";
const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/issues", issuesRouter);

app.use(globalErrorHandler);

export default app;
