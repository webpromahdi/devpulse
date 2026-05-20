import { Pool } from "pg";
import config from "../config/index.js";
import { issueSchema, userSchema } from "./schema.js";

export const pool = new Pool({
  connectionString: config.connectionString,
});

export const initDB = async () => {
  try {
    await pool.query(userSchema);
    await pool.query(issueSchema);
  } catch (err) {
    console.log(err);
  }
};
