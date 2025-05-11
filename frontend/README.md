# Inspiration Frontend

A modern SaaS UI built with Next.js App Router and Tailwind CSS.

## 🚀 Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

## 🌐 Environment Variables

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

## 🗂 Structure

```
app/
  admin/              # Admin pages: login, register, dashboard, websites
  inspirations/       # Public gallery detail pages
  page.tsx            # Homepage listing cards
components/            # Reusable UI components
utils/                 # API helper (optional)
styles/                # Tailwind global CSS
```

## ✨ Features

- Admin UI (Login, Register, Dashboard, Website Table)
- Public gallery of SaaS inspirations
- Cloudinary integration for screenshots
- Protected admin routes using JWT

## 🧠 Tip

Use `localStorage.setItem('token', <jwt>)` after login to access protected APIs.
