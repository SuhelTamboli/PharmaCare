import ApiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Look for token in cookies
  const token = req.cookies.accessToken;

  if (!token) {
    return ApiResponse.error(res, "Access denied. Please login.", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return ApiResponse.error(res, "Invalid session", 403);
  }
};
