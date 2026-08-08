const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

// Protects admin-only routes. Expects "Authorization: Bearer <token>".
function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new ApiError(401, 'Missing or invalid authorization header.'));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin') throw new Error('not admin');
    req.admin = payload;
    return next();
  } catch (e) {
    return next(new ApiError(401, 'Your session has expired. Please log in again.'));
  }
}

module.exports = { requireAdmin };
