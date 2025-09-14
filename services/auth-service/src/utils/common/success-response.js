function SuccessResponse({
  success = true,
  message = "Successfully completed the request",
  data = {},
  error = {},
} = {}) {
  return {
    success,
    message,
    data,
    error,
  };
}

module.exports = SuccessResponse;
