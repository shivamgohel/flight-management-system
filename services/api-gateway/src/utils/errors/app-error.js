class AppError extends Error {
  constructor(message, statusCode) {
    const formattedMessage = Array.isArray(message)
      ? message.join(", ")
      : message;
    super(formattedMessage);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.explanation = message;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
