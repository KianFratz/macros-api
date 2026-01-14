import pool from "../../../config/db.js";
import type { User } from "../interfaces/types/user.js";

export const getAllUsersService = async () => {
  const users = await pool.query("SELECT * FROM users");
  return users.rows;
};

export const getUserByIdService = async (id: number) => {
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return user.rows[0];
};

export const createUserService = async (
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<User> => {
  // RETURNING * will return name and email columns
  const user = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, password, role]
  );
  return user.rows[0];
};

export const updateUserService = async (
  id: number,
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<User> => {
  const updatedUser = await pool.query(
    "UPDATE users SET name=$1, email=$2, role=$3 WHERE id=$4 RETURNING *",
    [name, email, password, role, id] // id is in the last because id is equals to $3
  );
  return updatedUser.rows[0];
};

export const deleteUserService = async (id: number) => {
  const deletedUser = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return deletedUser.rows[0];
};
