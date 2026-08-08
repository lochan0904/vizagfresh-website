# VizagFresh — Full-Stack Website

A full-stack ordering website for VizagFresh Cold Press Juice Center — **no payment gateway**. Customers
build a cart on the site, submit their details, and the order is handed off to WhatsApp to confirm and pay
(cash/UPI). Every order is also saved to the database so it shows up in the admin dashboard.

## Stack

- **Frontend:** React + Vite, React Router, React Hook Form + Yup validation
- **Backend:** Node.js + Express, PostgreSQL, Knex (migrations + query builder), JWT admin auth,
  express-validator, helmet, CORS, rate limiting
- **Database:** PostgreSQL
- **No Stripe / no card storage anywhere** — orders are informational records for you, not payment transactions

## Project layout

```
vizagfresh-app/
├── backend/         Express API (products, orders, admin auth)
├── frontend/         React + Vite site (menu, cart, checkout, About, admin)
├── docker-compose.yml   Local dev: Postgres + backend + frontend in one command
└── render.yaml         One-click Render Blueprint (backend + Postgres + static frontend)
```

## Running locally with Docker (recommended)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

```bash
cd vizagfresh-app
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000/api/health
- Postgres: localhost:5432 (user/pass/db: `vizagfresh`)

The backend container automatically runs migrations and seeds sample products + the admin account on
startup. Default admin login: `admin@vizagfresh.in` / `ChangeMe123!` (change `ADMIN_PASSWORD` before
using this for real).

## Running locally without Docker

You'll need Node.js 20+ and a local PostgreSQL 16 instance.

```bash
# 1. Backend
cd backend
cp .env.example .env      # edit DATABASE_URL, JWT_SECRET, WHATSAPP_NUMBER, etc.
npm install
npm run migrate
npm run seed
npm run dev                # http://localhost:4000

# 2. Frontend (separate terminal)
cd frontend
cp .env.example .env
npm install
npm run dev                # http://localhost:5173
```

## Environment variables

**Backend (`backend/.env`)** — see `backend/.env.example` for the full list:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `JWT_SECRET` | Long random string used to sign admin login tokens |
| `CLIENT_ORIGIN` | Frontend URL, for CORS |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded admin login (change before going live) |
| `WHATSAPP_NUMBER` | Your WhatsApp Business number (E.164, no `+`), used to build order handoff links |

**Frontend (`frontend/.env`)**:

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API, e.g. `https://your-backend.onrender.com/api` |

## Deploying live (Render)

This repo includes a `render.yaml` Blueprint that provisions everything in one step:

1. Push this repository to GitHub.
2. In the [Render Dashboard](https://dashboard.render.com/), choose **New → Blueprint** and point it at
   your repo. Render will read `render.yaml` and create:
   - A free PostgreSQL database (`vizagfresh-db`)
   - The backend web service (auto-runs migrations + seed on deploy)
   - The frontend static site
3. After the first deploy, set `CLIENT_ORIGIN` on the backend service and `VITE_API_BASE_URL` on the
   frontend service to each other's real Render URLs, then redeploy both (the blueprint marks these as
   "set manually" so they don't get overwritten on the next blueprint sync).
4. Change `ADMIN_PASSWORD` and `WHATSAPP_NUMBER` in the backend service's environment settings.

You can also deploy the backend/frontend to any other Node + static hosting provider (Railway, Fly.io,
Vercel + a managed Postgres like Neon/Supabase) using the same `Dockerfile`s or `npm run build` output.

## What "no payment gateway" means here

- There is no cart total ever charged online, no card fields, no Stripe/Razorpay integration.
- `POST /api/orders` stores the order (customer info + items) with status `new` and returns a `wa.me` link
  pre-filled with the order details.
- The frontend opens that WhatsApp link automatically after checkout — you confirm the order and collect
  payment (cash/UPI) directly with the customer.
- The admin dashboard (`/admin`) lets you see every order and move it through `new → contacted →
  confirmed → fulfilled` (or `cancelled`), independent of WhatsApp.

## Admin dashboard

- URL: `/admin` (redirects to `/admin/login` if not signed in)
- Default seeded login: `admin@vizagfresh.in` / `ChangeMe123!` — **change this immediately** by updating
  `ADMIN_EMAIL`/`ADMIN_PASSWORD` before seeding, or by adding a new row to `admin_users` and removing the
  old one.

## Validation & error handling

- **Client-side:** React Hook Form + Yup schemas on the checkout and admin login forms, with inline field
  errors.
- **Server-side:** `express-validator` on every write endpoint; failures return `422` with a structured
  `{ error: { message, fields } }` body that the frontend maps back onto form fields.
- **404/500:** the backend returns JSON 404s for unknown API routes; the frontend has a dedicated `404`
  page for unknown site routes and a React error boundary that renders a `500`-style page if a component
  crashes.

## Updating the menu

Menu items live in the `products` and `categories` tables, seeded from
`backend/src/db/seeds/01_categories_products.js`. Edit that file and re-run `npm run seed` (or edit rows
directly in the database) to change prices, descriptions, or add new items — no code changes needed on the
frontend.
