import { pool } from "../../db/index.js";
import type { IIssue } from "./issues.interface.js";

const createIssueIntoDB = async (payload: IIssue, reporterId: number) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `
      INSERT INTO issues(title, description, type, reporter_id)
      VALUES($1, $2, $3, $4)
      RETURNING *;
     `,
    [title, description, type, reporterId],
  );
  return result;
};

export const issuesService = {
  createIssueIntoDB,
};
