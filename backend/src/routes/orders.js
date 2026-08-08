const { Router } = require('express');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth');
const { createOrder, listOrders, updateOrderStatus } = require('../controllers/ordersController');

const router = Router();

const createOrderValidators = [
  body('customer_name').trim().isLength({ min: 2, max: 120 }).withMessage('Enter your full name.'),
  body('customer_phone')
    .trim()
    .matches(/^[0-9+][0-9 ]{7,15}$/)
    .withMessage('Enter a valid phone number.'),
  body('delivery_address').trim().isLength({ min: 6, max: 500 }).withMessage('Enter a delivery address.'),
  body('notes').optional({ checkFalsy: true }).trim().isLength({ max: 300 }),
  body('items').isArray({ min: 1 }).withMessage('Your cart is empty.'),
  body('items.*.product_id').isInt({ min: 1 }).withMessage('Invalid item in cart.'),
  body('items.*.quantity').isInt({ min: 1, max: 20 }).withMessage('Quantity must be between 1 and 20.'),
];

router.post('/', createOrderValidators, validate, createOrder);

// --- admin-only ---
router.get('/', requireAdmin, listOrders);

router.patch(
  '/:id/status',
  requireAdmin,
  [
    param('id').isInt(),
    body('status').isIn(['new', 'contacted', 'confirmed', 'fulfilled', 'cancelled']),
  ],
  validate,
  updateOrderStatus
);

module.exports = router;
