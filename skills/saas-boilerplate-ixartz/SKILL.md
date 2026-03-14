---
name: saas-boilerplate-ixartz
description: Use when building enterprise SaaS applications - premium Next.js boilerplate with TypeScript, Tailwind CSS, Shadcn UI, authentication, and multi-tenancy
---

# SaaS Boilerplate (Ixartz) - Enterprise Next.js Starter

## Purpose

This skill provides expertise in using the premium SaaS Boilerplate by Ixartz, a production-ready Next.js starter template with TypeScript, Tailwind CSS, Shadcn UI, authentication, multi-tenancy, and essential SaaS features.

## When to Use

Use this skill when:
- Building enterprise SaaS applications
- Need production-ready Next.js template
- Implementing multi-tenancy architecture
- Using TypeScript for type safety
- Creating modern UI with Shadcn UI
- Setting up authentication with Clerk

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | Shadcn UI |
| **Auth** | Clerk Authentication |
| **Database** | PostgreSQL, Prisma ORM |
| **Payments** | Stripe |
| **Email** | Resend, React Email |
| **Deployment** | Vercel |
| **Testing** | Vitest, Playwright |

## Key Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Authentication** | Clerk with SSO, MFA support |
| **Multi-tenancy** | Organization/team management |
| **Database** | Prisma with PostgreSQL |
| **Payments** | Stripe subscriptions |
| **Email** | Transactional emails with Resend |
| **SEO** | Sitemap, robots.txt, meta tags |
| **Analytics** | Google Analytics, Vercel Analytics |
| **i18n** | Internationalization ready |

### Premium Features

- ✅ **TypeScript** - Full type safety
- ✅ **App Router** - Next.js 14+ patterns
- ✅ **Server Components** - RSC best practices
- ✅ **API Routes** - RESTful API structure
- ✅ **Dark Mode** - Theme toggle
- ✅ **Responsive** - Mobile-first design
- ✅ **SEO Optimized** - Meta tags, Open Graph
- ✅ **Performance** - 100 Lighthouse score

## Quick Start

```bash
# Clone and install
cd saas-boilerplate-ixartz
npm install

# Setup environment
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Start development
npm run dev

# Build for production
npm run build
```

## Project Structure

```
saas-boilerplate/
├── app/
│   ├── (auth)/         # Auth pages
│   ├── (dashboard)/    # Dashboard pages
│   ├── api/            # API routes
│   └── layout.tsx      # Root layout
├── components/
│   ├── ui/             # Shadcn components
│   ├── dashboard/      # Dashboard components
│   └── forms/          # Form components
├── lib/
│   ├── db/             # Database config
│   ├── auth/           # Auth utilities
│   └── utils.ts        # Helpers
├── prisma/
│   └── schema.prisma   # Database schema
├── emails/             # Email templates
└── public/             # Static assets
```

## For AI Assistants

When helping with SaaS projects:

1. **Understand requirements** - B2B, B2C, or marketplace?
2. **Setup auth** - Configure Clerk
3. **Database design** - Multi-tenancy patterns
4. **Payment flow** - Stripe integration
5. **Deploy** - Vercel setup

## Best Practices

- **Type safety** - Strict TypeScript
- **Server Components** - Use RSC where possible
- **Validation** - Zod schemas
- **Error handling** - Error boundaries
- **Testing** - Unit + E2E tests

## Related Skills

- `t3-app-boilerplate` - T3 Stack alternative
- `sst` - Serverless deployment
- `awesome-python` - Python backend alternative

## Repository Location

`C:\Users\user\.qwen\skills\saas-boilerplate-ixartz`

## Source

https://github.com/ixartz/SaaS-Boilerplate

## Documentation

https://github.com/ixartz/SaaS-Boilerplate#readme

---

**Note:** This is a premium, production-ready SaaS boilerplate with modern Next.js patterns. Perfect for launching SaaS products quickly with enterprise-grade features.
