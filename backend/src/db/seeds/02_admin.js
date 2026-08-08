const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  const email = (process.env.ADMIN_EMAIL || 'admin@vizagfresh.in').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const existing = await knex('admin_users').where({ email }).first();
  if (existing) return;

  const password_hash = await bcrypt.hash(password, 10);
  await knex('admin_users').insert({ email, password_hash, name: 'Anil & Srija' });
};
