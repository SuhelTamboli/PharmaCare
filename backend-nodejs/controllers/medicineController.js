import * as MedicineModel from "../models/medicineModel.js";
import ApiResponse from "../utils/apiResponse.js";

export const addMedicine = async (req, res) => {
  const { name, category, stock, price, expiry_date } = req.body;

  try {
    // Create the table if it doesn't exist
    await MedicineModel.ensureTableExists();

    // Call the createMedicine function from the model to add the medicine
    const addedMedicine = await MedicineModel.createMedicine(
      name,
      category,
      stock,
      price,
      expiry_date,
    );

    if (addedMedicine) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, addedMedicine, "Medicine added successfully"),
        );
    }
  } catch (error) {
    return ApiResponse.error(res, "Failed to add medicine", 500, error);
  }
};

export const fetchAllMedicinesInInventory = async (req, res) => {
  try {
    const medicines = await MedicineModel.getAllMedicinesInInventory();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          medicines,
          "Fetched all medicines from inventory successfully",
        ),
      );
  } catch (error) {
    return ApiResponse.error(
      res,
      "Failed to fetch medicines from inventory",
      500,
      error,
    );
  }
};

export const purchaseMedicine = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    // Optional: Basic validation to prevent negative or zero purchases
    if (!quantity || quantity <= 0) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, null, "Quantity must be greater than zero."),
        );
    }

    const result = await MedicineModel.purchaseAvailableMedicine(
      name,
      quantity,
    );
    // If rowCount is 0, it means the WHERE name = $1 AND stock >= $2 failed.
    if (!result || result.rowCount === 0) {
      return res.status(400).json(
        // Removed the undefined 'error' variable from here
        new ApiResponse(
          400,
          null,
          "Purchase failed. Medicine not found or insufficient stock.",
        ),
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { updatedMedicine: result.rows[0] },
          "Medicine purchased successfully.",
        ),
      );
  } catch (error) {
    return ApiResponse.error(res, "Failed to purchase medicine", 500, error);
  }
};
