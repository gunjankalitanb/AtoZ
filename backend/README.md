# Inspiration Backend

Node.js + Express + Prisma + MongoDB + Cloudinary backend for SaaS inspiration gallery.

## ⚙️ Setup

```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
node index.js
```

## 🗂 Structure

```
index.js                 # Server entry point
routes/authRoutes.js     # /auth routes
routes/inspirationRoutes.js # /inspirations routes
controllers/             # Controller functions
services/                # Puppeteer screenshots
utils/                   # Prisma + Auth middleware
```

## 🔐 Auth

Uses bcrypt + JWT for login/register.

```
POST /auth/register
POST /auth/login
Authorization: Bearer <token>
```

## 🧪 API Docs

Import `inspiration.postman_collection.json` into Postman for ready-to-test routes.
