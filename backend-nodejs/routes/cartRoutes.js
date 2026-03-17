import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  addMedicineToCart /* removeFromCart*/,
  fetchCartItems,
  decreaseCartItem,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

// only Customer can add to cart
router.post(
  "/add-to-cart",
  verifyToken,
  authorizeRoles("Customer"),
  addMedicineToCart,
);

router.get(
    "/fetch-cart",
    verifyToken,
    authorizeRoles("Customer"),
    fetchCartItems,
);

// Decrease quantity (minus button)
router.patch(
  "/decrease-quantity-from-cart",
  verifyToken,
  authorizeRoles("Customer"),
  decreaseCartItem
);

// Remove entire item
router.delete(
  "/remove-from-cart",
  verifyToken,
  authorizeRoles("Customer"),
  removeFromCart
);

export default router;