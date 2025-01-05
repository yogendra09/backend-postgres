export const generatedErrors = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
  
    // Handle MongoDB duplicate key error
    if (err.name === "MongoServerError" && err.message.includes("E11000 duplicate key")) {
      err.message = "User with this email address already exists";
    }
  
    res.status(statusCode).json({
      status: false,
      message: err.message || "Internal Server Error",
      errName: err.name || "UnknownError",
      stack:  err.stack
    });
  };
  