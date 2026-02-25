class ApiResponse {
  /**
   * @param {number} statusCode - HTTP Status Code
   * @param {any} data - The payload (user, list, etc.)
   * @param {string} message - Human-readable message
   * @param {boolean} success - Quick flag for frontend
   */
  constructor(statusCode, data, message = "Success", success = true) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = success;
  }

  static success(res, data, message = "Operation successful", code = 200) {
    return res.status(code).json(new ApiResponse(code, data, message, true));
  }

  static error(
    res,
    message = "Something went wrong",
    code = 500,
    error = null,
  ) {
    return res.status(code).json({
      statusCode: code,
      success: false,
      message,
      error: error?.message || error,
    });
  }
}

export default ApiResponse;
