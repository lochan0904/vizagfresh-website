require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/auth');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',') : '*',
  })
);
app.use(express.json({ limit: '100kb' }));
if (process.env.NODE_ENV !== 'test') app.use(morgan('tiny'));

// Basic abuse protection on write endpoints (order creation, login)
const writeLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false });
app.use('/api/orders', (req, res, next) => (req.method === 'POST' ? writeLimiter(req, res, next) : next()));
app.use('/api/auth/login', writeLimiter);

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'vizagfresh-backend' }));

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/auth', authRouter);

app.use('/api', notFoundHandler);
// Fallback for any non-API path hitting the API server directly
app.use((req, res) => res.status(404).json({ error: { message: 'Not found.' } }));

app.use(errorHandler);

module.exports = app;
