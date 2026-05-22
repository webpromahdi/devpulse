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

const getIssuesFromDB = async ({
  sort,
  type,
  status,
}: {
  sort?: string;
  type?: string;
  status?: string;
}) => {
  const orderDir = sort === "oldest" ? "ASC" : "DESC";
  const conditions: string[] = [];
  const values: unknown[] = [];

  if (type) {
    conditions.push(`type = $${values.length + 1}`);
    values.push(type);
  }
  if (status) {
    conditions.push(`status = $${values.length + 1}`);
    values.push(status);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await pool.query(
    `SELECT * FROM issues ${whereClause} ORDER BY created_at ${orderDir}`,
    values,
  );

  const issues = result.rows;
  for (const issue of issues) {
    const reporterResult = await pool.query(
      `SELECT id, name, role FROM users WHERE id = $1`,
      [issue.reporter_id],
    );
    issue.reporter = reporterResult.rows[0] || null;
    delete issue.reporter_id;
  }

  return issues;
};

const getSingleIssueFromDB = async (id: string) => {
  const result = await pool.query(`SELECT * FROM issues WHERE id = $1`, [id]);
  const issue = result.rows[0];
  if (!issue) return null;
  const reporterResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = $1`,
    [issue.reporter_id],
  );
  issue.reporter = reporterResult.rows[0] || null;
  delete issue.reporter_id;
  return issue;
};

export const issuesService = {
  createIssueIntoDB,
  getIssuesFromDB,
  getSingleIssueFromDB,
};
