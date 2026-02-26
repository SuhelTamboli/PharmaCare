import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
  // Note: 'logging' is not a valid property for the Pool config object in pg.
  // If you want to log queries, you'd usually wrap the query method.
});

const initDB = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `;
  try {
    // We use pool.query here which briefly checks out a client and returns it
    await pool.query(queryText);
    console.log("✅ Users table is ready or already exists.");
  } catch (err) {
    console.error("❌ Error initializing database:", err);
    // You might want to throw the error here to stop the server from starting
    throw err;
  }
};

// Event listeners for debugging/monitoring
pool.on("connect", () => {
  console.log("New client connected to the pool");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Export both the pool and the init function
export { pool as default, initDB };
