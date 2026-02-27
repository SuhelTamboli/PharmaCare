import pool from "../config/db.js";

export const createUser = async (fullname, email, password, role) => {
  const query = `
    INSERT INTO users (fullname, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, fullname, email, role, created_at;
  `;
  const { rows } = await pool.query(query, [fullname, email, password, role]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};
