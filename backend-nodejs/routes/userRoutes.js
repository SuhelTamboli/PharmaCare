import express from "express";
import { getUserProfile, logoutUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyToken, getUserProfile);
router.post("/logout", verifyToken, logoutUser);

export default router;