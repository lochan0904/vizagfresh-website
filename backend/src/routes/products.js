const { Router } = require('express');
const { listProducts, getProduct } = require('../controllers/productsController');

const router = Router();

router.get('/', listProducts);
router.get('/:slug', getProduct);

module.exports = router;
