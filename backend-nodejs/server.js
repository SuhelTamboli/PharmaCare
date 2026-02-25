import express from "express";
import "dotenv/config";
import pool from "./config/db.js"; // Ensure the path is correct

const app = express();
const port = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  try {
    // pool.query is shorthand for connecting, querying, and releasing
    const data = await pool.query("SELECT NOW() AS thetime");
    res.send(`Hello World! called at ${data.rows[0].thetime}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
});

app.listen(port, () => {
  console.log(`Pharmacare Node Backend app listening on port ${port}`);
});
