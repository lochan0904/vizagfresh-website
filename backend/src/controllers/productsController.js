const db = require('../db');
const ApiError = require('../utils/ApiError');

async function listProducts(req, res) {
  const rows = await db('products')
    .join('categories', 'categories.id', 'products.category_id')
    .select(
      'products.id',
      'products.name',
      'products.slug',
      'products.description',
      'products.ingredients',
      'products.price',
      'products.image_emoji',
      'products.benefit_tag',
      'products.sort_order',
      'categories.name as category_name',
      'categories.slug as category_slug'
    )
    .where('products.is_active', true)
    .orderBy(['categories.sort_order', 'products.sort_order']);

  res.json({ products: rows });
}

async function getProduct(req, res) {
  const row = await db('products')
    .join('categories', 'categories.id', 'products.category_id')
    .select(
      'products.id',
      'products.name',
      'products.slug',
      'products.description',
      'products.ingredients',
      'products.price',
      'products.image_emoji',
      'products.benefit_tag',
      'categories.name as category_name',
      'categories.slug as category_slug'
    )
    .where({ 'products.slug': req.params.slug, 'products.is_active': true })
    .first();

  if (!row) throw new ApiError(404, 'Product not found.');
  res.json({ product: row });
}

module.exports = { listProducts, getProduct };
