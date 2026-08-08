const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth');
const { login, me } = require('../controllers/authController');

const router = Router();

router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Enter a valid email.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  ],
  validate,
  login
);

router.get('/me', requireAdmin, me);

module.exports = router;
