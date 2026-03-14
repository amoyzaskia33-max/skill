---
name: shopnest-ecommerce
description: Use when building multi-vendor e-commerce marketplaces with Next.js 15, React 19, TypeScript, Stripe payments, Firebase auth, and PostgreSQL database
---

# ShopNest E-Commerce Skill - Multi-Vendor Marketplace Platform

## Purpose

This skill provides expertise in building complete multi-vendor e-commerce marketplaces using Next.js 15, React 19, TypeScript, Tailwind CSS, Firebase Authentication, Stripe payments, and PostgreSQL database.

## When to Use

Use this skill when:
- Building e-commerce marketplaces
- Implementing multi-vendor systems
- Adding Stripe payment integration
- Setting up Firebase authentication
- Creating admin/seller/customer dashboards
- Building product catalog systems
- Implementing shopping cart functionality

## Key Features

### User Roles

| Role | Capabilities |
|------|-------------|
| **Customer** | Browse, search, cart, checkout, reviews, wishlist |
| **Seller** | Shop management, product listings, order tracking, analytics |
| **Admin** | User management, platform oversight, content management |

### Technical Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Next.js 15, TypeScript |
| **Styling** | Tailwind CSS 4, Framer Motion, Swiper |
| **Backend** | Next.js App Router, Node.js |
| **Database** | PostgreSQL (Neon/Vercel) |
| **Auth** | Firebase Auth + Admin SDK |
| **Payments** | Stripe API |
| **State** | Zustand, React Context |
| **UI** | Radix UI, Lucide Icons |
| **Deployment** | Vercel |

### Core Features

- **Multi-role access control** - Customer/Seller/Admin
- **Real-time cart sync** - Persistent shopping cart
- **Smooth animations** - Framer Motion + Lenis
- **Secure payments** - Stripe integration
- **Product search & filter** - Advanced filtering
- **Reviews & ratings** - User feedback system
- **Order tracking** - Status management
- **Wishlist** - Save favorite products

## Database Schema

### Main Entities

```
USERS
├── firebase_uid (PK)
├── email
├── role (customer/seller/admin)
├── created_at
└── updated_at

SHOPS
├── id (PK)
├── owner_id (FK → USERS)
├── name
├── description
├── logo
└── created_at

PRODUCTS
├── id (PK)
├── shop_id (FK → SHOPS)
├── name
├── description
├── price
├── stock
├── category_id (FK)
└── images

ORDERS
├── id (PK)
├── customer_id (FK → USERS)
├── total
├── status
├── created_at
└── updated_at

CART
├── id (PK)
├── user_id (FK → USERS)
└── items (JSON)

REVIEWS
├── id (PK)
├── product_id (FK → PRODUCTS)
├── user_id (FK → USERS)
├── rating
└── comment

CATEGORIES
├── id (PK)
├── name
└── parent_id (FK → CATEGORIES)

BANNERS
├── id (PK)
├── title
├── image
└── link
```

## Project Structure

```
shopnest-ecommerce/
├── app/
│   ├── (auth)/           # Authentication pages
│   ├── (dashboard)/      # Dashboard layouts
│   ├── (shop)/           # Shopping pages
│   ├── api/              # API routes
│   └── layout.tsx
├── components/
│   ├── ui/               # UI components
│   ├── forms/            # Form components
│   ├── dashboard/        # Dashboard components
│   └── products/         # Product components
├── lib/
│   ├── firebase/         # Firebase config
│   ├── stripe/           # Stripe utilities
│   ├── db/               # Database utilities
│   └── utils.ts
├── hooks/                # Custom hooks
├── stores/               # Zustand stores
├── types/                # TypeScript types
└── public/               # Static assets
```

## Implementation Guide

### 1. Firebase Authentication Setup

```typescript
// lib/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### 2. Stripe Payment Integration

```typescript
// lib/stripe/server.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function createPaymentIntent(amount: number) {
  return await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
  });
}
```

### 3. Database Connection (PostgreSQL)

```typescript
// lib/db/index.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}
```

### 4. Cart State Management (Zustand)

```typescript
// stores/cart-store.ts
import { create } from 'zustand';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.productId !== id)
  })),
  clearCart: () => set({ items: [] }),
}));
```

## For AI Assistants

When helping build e-commerce platforms:

1. **Understand requirements** - Multi-vendor or single store?
2. **Setup authentication** - Firebase with role management
3. **Design database** - Products, orders, users, shops
4. **Implement cart** - Persistent cart with Zustand
5. **Add payments** - Stripe integration
6. **Build dashboards** - Customer, seller, admin views

## Best Practices

- **Security** - Validate all inputs, protect routes
- **Performance** - Image optimization, caching
- **SEO** - Product schema, meta tags
- **Accessibility** - WCAG compliance
- **Mobile First** - Responsive design

## Environment Variables

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Database
DATABASE_URL=

# App
NEXT_PUBLIC_APP_URL=
```

## Related Skills

- `gsap-animations-website` - For product animations
- `ux-resource` - For e-commerce UX best practices
- `fs-poster-wordpress` - For social media product sharing

## Repository Location

`C:\Users\user\.qwen\skills\shopnest-ecommerce`

## Live Demo

`shopnest-virid.vercel.app`

## Source

https://github.com/sazid-zero/ShopNest-E-Commerce-Web-App

---

**Note:** ShopNest is a production-ready marketplace platform combining modern React, secure payments, and multi-role access in a scalable architecture.
