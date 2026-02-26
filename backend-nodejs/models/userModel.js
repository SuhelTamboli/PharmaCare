import pool from "../config/db.js";

export const createUser = async (username, email, password, role) => {
  const query = `
    INSERT INTO users (username, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, username, email, role, created_at;
  `;
  const { rows } = await pool.query(query, [username, email, password, role]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};
