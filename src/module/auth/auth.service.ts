import config from "../../config/index.js";
import { pool } from "../../db/index.js";
import { USER_ROLES, type IUser } from "./auth.interface.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (userData.rowCount === 0) {
    throw new Error("Invalid email or password");
  }

  const user = userData.rows[0];
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwtSecret, {
    expiresIn: "1d",
  });

  delete user.password;
  return { token, user };
};

export const authServices = {
  registerUserIntoDB,
  loginUser,
};
