import { pool } from "../../db/index.js";
import { USER_ROLES, type IUser } from "./auth.interface.js";
import bcrypt from "bcryptjs";

const registerUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;

  if (role && !Object.values(USER_ROLES).includes(role)) {
    throw new Error("Invalid role");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users(name, email, password, role)
    VALUES($1, $2, $3, $4)
    RETURNING *;
   `,
    [name, email, hashPassword, role],
  );
  delete result.rows[0].password;
  return result;
};

export const authServices = {
  registerUserIntoDB,
};
