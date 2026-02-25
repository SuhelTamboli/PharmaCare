export const getUserProfile = async (req, res) => {
  // If verifyToken passes, req.user will contain the decoded ID and Email
  res.send(`Welcome user ${req.user.email}`);
};

export const logoutUser = async (req, res) => {
  try {
    return res
      .clearCookie("accessToken") // Removes the cookie
      .status(200)
      .json(new ApiResponse(200, null, "Logged out successfully"));
  } catch (error) {
    return ApiResponse.error(res, "Logout failed", 500, error);
  }
};