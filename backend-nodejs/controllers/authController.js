import bcrypt from "bcrypt";
import * as UserModel from "../models/userModel.js";
import ApiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { VALID_ROLES } from "../utils/constants.js";

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    // 1. Validation
    if (!fullname || !email || !password) {
      return ApiResponse.error(res, "All fields are required", 400);
    }

    // Optional: Validate that the provided role is valid
    if (!VALID_ROLES.includes(role)) {
      return ApiResponse.error(
        res,
        "Incorrect role, The valid roles are Pharmacist and Customer",
        400,
      );
    }

    // 2. Check existence
    const existingUser = await UserModel.findUserByEmail(email);
    if (existingUser) {
      return ApiResponse.error(res, "User already exists", 409);
    }

    // 3. Logic
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.createUser(
      fullname,
      email,
      hashedPassword,
      role,
    );

    // 4. Standardized Success Response
    return ApiResponse.success(
      res,
      newUser,
      "User registered successfully",
      201,
    );
  } catch (error) {
    // 5. Standardized Error Response
    return ApiResponse.error(res, "Registration failed", 500, error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return ApiResponse.error(res, "Email and password are required", 400);
    }

    // 2. Find User
    const user = await UserModel.findUserByEmail(email);
    if (!user) {
      return ApiResponse.error(res, "Invalid credentials", 401);
    }

    // 3. Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return ApiResponse.error(res, "Invalid credentials", 401);
    }

    // 4. Generate JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role, // Include role here
      },
      process.env.JWT_SECRET, // Secret Key
      { expiresIn: process.env.JWT_EXPIRES_IN }, // Options
    );

    // Define Cookie Options
    const cookieOptions = {
      httpOnly: true, // Secure: non-accessible by JS
      secure: process.env.NODE_ENV === "production", // Only over HTTPS in production
      sameSite: "strict", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    const { password: _, ...userWithoutPassword } = user;

    // --- KEY CHANGE HERE ---
    // Set the cookie on the 'res' object first, then call your success helper
    return res
      .cookie("accessToken", token, cookieOptions)
      .status(200)
      .json(
        new ApiResponse(200, { user: userWithoutPassword }, "Login successful"),
      );
  } catch (error) {
    return ApiResponse.error(res, "Login failed", 500, error);
  }
};
