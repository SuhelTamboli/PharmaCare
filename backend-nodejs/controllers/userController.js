import ApiResponse from "../utils/apiResponse.js";

export const getUserProfile = async (req, res) => {
  // If verifyToken passes, req.user will contain the decoded ID and Email and Role
  // Standardized Success Response
  const user = { id: req.user.id, email: req.user.email, role: req.user.role };
  return ApiResponse.success(res, user, `Welcome user ${req.user.email}`, 201);
};

export const logoutUser = async (req, res) => {
  try {
    // We clear the cookie by setting its expiration date to the past
    return res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json(new ApiResponse(200, null, "Logged out successfully"));
  } catch (error) {
    return ApiResponse.error(res, "Logout failed", 500, error);
  }
};
