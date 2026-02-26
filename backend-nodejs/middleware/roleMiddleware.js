import ApiResponse from "../utils/apiResponse.js";

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Check if user exists (verifyToken must run before this)
    if (!req.user) {
      return ApiResponse.error(res, "Unauthorized: No user found", 401);
    }

    // 2. Check if user's role is in the allowed list
    if (!allowedRoles.includes(req.user.role)) {
      return ApiResponse.error(
        res,
        `Access Denied: ${req.user.role} role does not have permission`,
        403,
      );
    }

    next();
  };
};
