---
name: saas-boilerplate
description: Use when building SaaS applications quickly - production-ready boilerplate with authentication, payments, dashboard, and essential features
---

# SaaS Boilerplate Skill - Production-Ready SaaS Starter

## Purpose

This skill provides a production-ready SaaS boilerplate with essential features like authentication, payments, dashboard, user management, and common SaaS functionality to accelerate development.

## When to Use

Use this skill when:
- Building a SaaS application from scratch
- Need quick starter template with best practices
- Implementing subscription billing
- Setting up user authentication
- Creating admin dashboards
- Launching MVP quickly

## Typical Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Authentication** | Email/password, OAuth (Google, GitHub) |
| **User Management** | Profiles, roles, permissions |
| **Payments** | Stripe integration, subscriptions |
| **Dashboard** | Admin panel, analytics |
| **Email** | Transactional emails, templates |
| **Database** | ORM setup, migrations |

### Tech Stack (Common)

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js, React, Tailwind CSS |
| **Backend** | Node.js, Express, or Next.js API |
| **Database** | PostgreSQL, Prisma ORM |
| **Auth** | NextAuth, Clerk, or custom JWT |
| **Payments** | Stripe |
| **Email** | Resend, SendGrid, or Postmark |
| **Deployment** | Vercel, Railway, or Fly.io |

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

## For AI Assistants

When helping with SaaS projects:

1. **Identify requirements** - What type of SaaS?
2. **Choose stack** - Next.js, Django, Rails, etc.
3. **Setup auth** - User registration/login
4. **Configure payments** - Stripe setup
5. **Build features** - Core functionality

## Best Practices

- **Security first** - Validate inputs, protect routes
- **Scalability** - Design for growth
- **Monitoring** - Error tracking, analytics
- **Documentation** - API docs, user guides

## Related Skills

- `sst` - Serverless deployment on AWS
- `awesome-python` - Python backend options
- `shopnest-ecommerce` - E-commerce features

## Repository Location

`C:\Users\user\.qwen\skills\saas-boilerplate`

---

**Note:** SaaS boilerplates save weeks of development time. Start with proven patterns and focus on your unique value proposition.
