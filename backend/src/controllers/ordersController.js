const db = require('../db');
const ApiError = require('../utils/ApiError');
const { generateOrderCode } = require('../utils/orderCode');

// Builds the wa.me deep link with the order pre-filled, so the founder receives
// a ready-to-read message and the customer completes the "checkout" on WhatsApp.
function buildWhatsAppLink(order) {
  const number = process.env.WHATSAPP_NUMBER || '910000000000';
  const lines = [
    `Hi VizagFresh! I'd like to place an order (${order.order_code}).`,
    '',
    ...order.items.map((i) => `• ${i.name} x${i.quantity} — ₹${(i.price * i.quantity).toFixed(0)}`),
    '',
    `Subtotal: ₹${Number(order.subtotal).toFixed(0)}`,
    `Name: ${order.customer_name}`,
    `Phone: ${order.customer_phone}`,
    `Delivery address: ${order.delivery_address}`,
    order.notes ? `Notes: ${order.notes}` : null,
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${number}?text=${text}`;
}

async function createOrder(req, res) {
  const { customer_name, customer_phone, delivery_address, notes, items } = req.body;

  const productIds = items.map((i) => i.product_id);
  const dbProducts = await db('products').whereIn('id', productIds).andWhere('is_active', true);

  if (dbProducts.length !== new Set(productIds).size) {
    throw new ApiError(422, 'One or more items in your cart are no longer available.', {
      items: 'Please refresh the menu and try again.',
    });
  }

  // Prices are always taken from the DB, never trusted from the client.
  const priceMap = new Map(dbProducts.map((p) => [p.id, p]));
  const resolvedItems = items.map((i) => {
    const product = priceMap.get(i.product_id);
    return {
      product_id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: i.quantity,
    };
  });
  const subtotal = resolvedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const order_code = generateOrderCode();

  const [order] = await db('orders')
    .insert({
      order_code,
      customer_name,
      customer_phone,
      delivery_address,
      notes: notes || '',
      items: JSON.stringify(resolvedItems),
      subtotal,
      status: 'new',
      fulfillment_channel: 'whatsapp',
    })
    .returning('*');

  const whatsapp_link = buildWhatsAppLink({ ...order, items: resolvedItems });

  res.status(201).json({
    order: {
      id: order.id,
      order_code: order.order_code,
      subtotal: Number(order.subtotal),
      status: order.status,
      created_at: order.created_at,
    },
    whatsapp_link,
  });
}

async function listOrders(req, res) {
  const { status } = req.query;
  const query = db('orders').orderBy('created_at', 'desc');
  if (status) query.where({ status });
  const rows = await query;
  res.json({ orders: rows });
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const [updated] = await db('orders')
    .where({ id })
    .update({ status, updated_at: db.fn.now() })
    .returning('*');

  if (!updated) throw new ApiError(404, 'Order not found.');
  res.json({ order: updated });
}

module.exports = { createOrder, listOrders, updateOrderStatus };
