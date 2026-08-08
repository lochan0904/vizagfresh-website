const ApiError = require('../utils/ApiError');

// 404 for any unmatched API route
function notFoundHandler(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

// Centralized error handler -> always returns { error: { message, fields? } }
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: { message: err.message, ...(err.fields ? { fields: err.fields } : {}) },
    });
  }

  // Unexpected/unknown errors -> generic 500, never leak internals
  return res.status(500).json({
    error: { message: 'Something went wrong on our end. Please try again shortly.' },
  });
}

module.exports = { notFoundHandler, errorHandler };
