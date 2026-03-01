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
        new ApiResponse(200, medicines, "Fetched all medicines from inventory successfully"),
      );
  } catch (error) {
    return ApiResponse.error(res, "Failed to fetch medicines from inventory", 500, error);
  }
};
