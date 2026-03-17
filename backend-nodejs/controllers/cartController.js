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

// Fetch cart items
export const fetchCartItems = async (req, res) => {
  // Get id as user_id from req.user
  const { id : user_id } = req.user;
  try {
    // Create the table if it doesn't exist
    await CartModel.ensureCartItemsTableExists();

    // Fetch cart items for the user
    const cart_items = await CartModel.getCartItems(user_id);

    // Check if the cart is empty
    if (cart_items.rows.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, cart_items, "Cart is empty"));
    }

    // Calculate grand total on the server side for convenience
    const grandTotal = cart_items.rows.reduce(
      (sum, item) => sum + parseFloat(item.subtotal),
      0,
    );

    // Return cart items and grand total
    res.status(200).json(
      new ApiResponse(
        200,
        {
          user_id,
          cart_items: cart_items.rows,
          grand_total: grandTotal.toFixed(2),
          total_items: cart_items.rows.length,
        },
        "Cart items fetched successfully",
      ),
    );
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json(ApiResponse.error(res, "Server error occurred", 500, err));
  }
};

// Decrease cart item quantity
export const decreaseCartItem = async (req, res) => {
  const { user_id, medicine_id } = req.body;

  if (!user_id || !medicine_id) {

    return res
      .status(400)
      .json(ApiResponse.error(res, "Missing required fields", 500, err));
  }

  try {
    const result = await CartModel.decreaseCartItemQuantity(
      user_id,
      medicine_id,
    );

    if (result.removed) {
      return res
        .status(200)
        .json(new ApiResponse(200, null, "Item removed from cart"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, result, "Cart item quantity updated"));
  } catch (err) {
    console.error(err.message);
    res.status(500).json(ApiResponse.error(res, "Server error", 500, err));
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { user_id, medicine_id } = req.body;

  if (!user_id || !medicine_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const deletedItem = await CartModel.removeCartItem(user_id, medicine_id);

    if (!deletedItem) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Item not found in cart"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, deletedItem, "Item removed from cart"));
  } catch (err) {
    console.error(err.message);
    res.status(500).json(ApiResponse.error(res, "Server error", 500, err));
  }
};
