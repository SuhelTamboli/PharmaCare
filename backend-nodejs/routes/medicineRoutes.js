import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { addMedicine } from "../controllers/medicineController.js";

const router = express.Router();

//only Pharmacist can add medicines
router.post(
  "/add-medicine",
  verifyToken,
  authorizeRoles("Pharmacist"),
  addMedicine,
);

export default router;