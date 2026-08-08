const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const ApiError = require('../utils/ApiError');

async function login(req, res) {
  const { email, password } = req.body;

  const admin = await db('admin_users').where({ email: email.toLowerCase() }).first();
  if (!admin) throw new ApiError(401, 'Invalid email or password.');

  const ok = await bcrypt.compare(password, admin.password_hash);
  if (!ok) throw new ApiError(401, 'Invalid email or password.');

  const token = jwt.sign(
    { sub: admin.id, email: admin.email, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '12h' }
  );

  res.json({ token, admin: { id: admin.id, email: admin.email, name: admin.name } });
}

async function me(req, res) {
  res.json({ admin: req.admin });
}

module.exports = { login, me };
