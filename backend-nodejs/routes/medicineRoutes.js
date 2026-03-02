import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { addMedicine, fetchAllMedicinesInInventory, fetchMedicineByName, purchaseMedicine, removeMedicine } from "../controllers/medicineController.js";

const router = express.Router();

//only Pharmacist can add medicines
router.post(
  "/add-medicine",
  verifyToken,
  authorizeRoles("Pharmacist"),
  addMedicine,
);

// Customer and Pharmacist can fetch all medicines
router.get(
  "/all-medicines",
  verifyToken,
  authorizeRoles("Pharmacist", "Customer"),
  fetchAllMedicinesInInventory,
);

// only Customer can purchase medicines
router.post(
  "/purchase-medicine",
  verifyToken,
  authorizeRoles("Customer"),
  purchaseMedicine
);

// Customer and Pharmacist can fetch medicines by name
router.get(
  "/get-medicine/:name",
  verifyToken,
  authorizeRoles("Pharmacist", "Customer"),
  fetchMedicineByName,
);

// only Pharmacist can delete medicines
router.delete(
  "/delete-medicine/:id",
  verifyToken,
  authorizeRoles("Pharmacist"),
  removeMedicine,
);

export default router;