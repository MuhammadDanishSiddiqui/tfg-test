const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  } else if (err.message === "Product not found") {
    statusCode = 404;
    message = "Product not found";
  } else if (err.message.includes("External API error")) {
    statusCode = 502;
    message = "External service unavailable";
  } else if (err.message.includes("Invalid product ID")) {
    statusCode = 400;
    message = err.message;
  }

  res.status(statusCode).json({
    error: message,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
