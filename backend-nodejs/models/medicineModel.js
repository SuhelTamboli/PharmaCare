import pool from "../config/db.js";

// Function to create table if not already exists
export const ensureTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS medicines (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL, -- Unique constraint is required for UPSERT
      category VARCHAR(100),
      stock INTEGER DEFAULT 0,
      price DECIMAL(10, 2),
      expiry_date DATE,
      status VARCHAR(20)
    );
  `;
  await pool.query(createTableQuery);
};

// Function to add a new medicine 
export const createMedicine = async (
  name,
  category,
  stock,
  price,
  expiry_date,
) => {
  // The SQL logic:
  // 1. Try to Insert the new record.
  // 2. If the 'name' exists (Conflict), update the existing row.
  // 3. Increment the stock: medicines.stock + excluded.stock
  // 4. Recalculate status: if new stock > 0 then 'In Stock' else 'Out Of Stock'
  const query = `
  INSERT INTO medicines (name, category, stock, price, expiry_date, status)
      VALUES ($1, $2, $3, $4, $5, CASE WHEN $3 > 0 THEN 'In Stock' ELSE 'Out Of Stock' END)
      ON CONFLICT (name) 
      DO UPDATE SET 
        stock = medicines.stock + EXCLUDED.stock,
        price = EXCLUDED.price, -- Update to the latest price
        expiry_date = EXCLUDED.expiry_date,
        status = CASE WHEN (medicines.stock + EXCLUDED.stock) > 0 THEN 'In Stock' ELSE 'Out Of Stock' END
      RETURNING *;
  `;
  const { rows } = await pool.query(query, [
    name,
    category,
    stock,
    price,
    expiry_date,
  ]);
  return rows[0];
};

// Function to get all medicines
export const getAllMedicinesInInventory = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM medicines ORDER BY name ASC;",
  );
  return rows;
};

export const purchaseAvailableMedicine = async (name, quantity) => {
  // 1. Update the stock only if (current stock - quantity) >= 0
  // 2. Recalculate status immediately
  const result = await pool.query(
    `
      UPDATE medicines 
      SET 
        stock = stock - $2,
        status = CASE 
          WHEN (stock - $2) > 0 THEN 'In Stock' 
          ELSE 'Out Of Stock' 
        END
      WHERE name = $1 AND stock >= $2
      RETURNING *;
    `,
    [name, quantity],
  );
  return result;
};
