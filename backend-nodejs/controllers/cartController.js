import ApiResponse from "../utils/apiResponse.js";
import * as CartModel from "../models/cartModel.js";
import pool from "../config/db.js";

// Add medicine to cart
export const addMedicineToCart = async (req, res) => {
  const { user_id, medicine_id, quantity } = req.body;

  // Basic Validation
  if (!user_id || !medicine_id || !quantity) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // 1. Check if the medicine exists and has enough stock
    const medicineCheck = await pool.query(
      "SELECT stock, name FROM medicines WHERE id = $1",
      [medicine_id],
    );

    if (medicineCheck.rows.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Medicine not found"));
    }

    if (medicineCheck.rows[0].stock < quantity) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            `Only ${medicineCheck.rows[0].stock} units of ${medicineCheck.rows[0].name} available.`,
          ),
        );
    }

    // Create the table if it doesn't exist
    await CartModel.ensureCartItemsTableExists();

    // 2. UPSERT Logic: Insert new item OR update quantity if it exists
    // This relies on the UNIQUE(user_id, medicine_id) constraint we defined earlier
    const cart_items = await CartModel.addCartItem(
      user_id,
      medicine_id,
      quantity,
    );

    res
      .status(200)
      .json(
        new ApiResponse(200, cart_items, "Item added to cart successfully"),
      );
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json(
        ApiResponse.error(
          res,
          "Server error occurred while adding to cart",
          500,
          err,
        ),
      );
  }
};
