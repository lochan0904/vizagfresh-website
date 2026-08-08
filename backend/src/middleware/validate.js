const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

// Run after express-validator check(...) chains; turns failures into a structured 422
function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const fields = {};
  result.array().forEach((e) => {
    if (!fields[e.path]) fields[e.path] = e.msg;
  });

  return next(new ApiError(422, 'Please fix the highlighted fields.', fields));
}

module.exports = validate;
