import express from "express";
import { getUserProfile, logoutUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/profile",
  verifyToken,
  authorizeRoles("Pharmacist", "Customer"),
  getUserProfile,
);

router.post(
  "/logout",
  verifyToken,
  authorizeRoles("Pharmacist", "Customer"),
  logoutUser,
);

export default router;
