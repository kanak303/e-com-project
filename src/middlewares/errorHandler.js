export function errorHandler(err, req, res,next) {
  console.error(" Internal Error:", err.stack || err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
