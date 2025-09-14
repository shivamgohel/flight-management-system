function ErrorResponse({
  success = false,
  message = "Something went wrong",
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

module.exports = ErrorResponse;
