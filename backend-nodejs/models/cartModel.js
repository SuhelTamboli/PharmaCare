import pool from "../config/db.js";

// Function to create cart_items table if not already exists
export const ensureCartItemsTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    medicine_id INTEGER REFERENCES medicines(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Prevent duplicate rows for the same medicine in one cart
    UNIQUE(user_id, medicine_id) 
);
  `;
  await pool.query(createTableQuery);
};

export const addCartItem = async (user_id, medicine_id, quantity) => {
  // 2. UPSERT Logic: Insert new item OR update quantity if it exists
  // This relies on the UNIQUE(user_id, medicine_id) constraint we defined earlier
  const upsertQuery = `
            INSERT INTO cart_items (user_id, medicine_id, quantity)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, medicine_id) 
            DO UPDATE SET 
                quantity = cart_items.quantity + EXCLUDED.quantity,
                created_at = CURRENT_TIMESTAMP
            RETURNING *;
        `;
  const { rows } = await pool.query(upsertQuery, [
    user_id,
    medicine_id,
    quantity,
  ]);
  return rows[0];
};

export const getCartItems = async (user_id) => {
  const getCartQuery = `
            SELECT 
                c.id AS cart_item_id,
                m.id AS medicine_id,
                m.name,
                m.price,
                c.quantity,
                (m.price * c.quantity) AS subtotal,
                m.stock AS available_stock
            FROM cart_items c
            JOIN medicines m ON c.medicine_id = m.id
            WHERE c.user_id = $1
            ORDER BY c.created_at DESC;
        `;
  const result = await pool.query(getCartQuery, [user_id]);
  return result;
};


// Decrease quantity OR remove if quantity becomes 0
export const decreaseCartItemQuantity = async (user_id, medicine_id) => {
  const query = `
    UPDATE cart_items
    SET quantity = quantity - 1
    WHERE user_id = $1 AND medicine_id = $2 AND quantity > 1
    RETURNING *;
  `;

  const result = await pool.query(query, [user_id, medicine_id]);

  // If no row updated → quantity was 1 → delete item
  if (result.rows.length === 0) {
    await pool.query(
      `DELETE FROM cart_items WHERE user_id = $1 AND medicine_id = $2`,
      [user_id, medicine_id]
    );

    return { removed: true };
  }

  return result.rows[0];
};

// Remove item completely
export const removeCartItem = async (user_id, medicine_id) => {
  const query = `
    DELETE FROM cart_items
    WHERE user_id = $1 AND medicine_id = $2
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [user_id, medicine_id]);
  return rows[0];
};