---
name: t3-app-boilerplate
description: Use when building full-stack TypeScript applications - Create T3 App with Next.js, tRPC, Prisma, Tailwind CSS, and NextAuth
---

# Create T3 App Boilerplate - Full-Stack TypeScript Starter

## Purpose

This skill provides expertise in using Create T3 App, a full-stack TypeScript boilerplate featuring Next.js, tRPC, Prisma, Tailwind CSS, and NextAuth.js for building type-safe web applications.

## When to Use

Use this skill when:
- Building full-stack TypeScript apps
- Need type-safe API with tRPC
- Using Prisma for database
- Creating modern UI with Tailwind
- Implementing authentication with NextAuth
- Fast prototyping with best practices

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **API** | tRPC (end-to-end typesafe) |
| **Database** | PostgreSQL/MySQL, Prisma |
| **Auth** | NextAuth.js |
| **Styling** | Tailwind CSS |
| **Validation** | Zod |
| **Deployment** | Vercel, Railway |

## Key Features

### Core Features

| Feature | Description |
|---------|-------------|
| **TypeScript** | Full type safety throughout |
| **tRPC** | End-to-end typesafe API |
| **Prisma** | Type-safe database ORM |
| **NextAuth** | Multi-provider authentication |
| **Tailwind** | Utility-first CSS |
| **Zod** | Runtime validation |
| **App Router** | Next.js 14+ patterns |

### tRPC Benefits

- ✅ **No code generation** - Types inferred automatically
- ✅ **Auto-complete** - Full IDE support
- ✅ **Type safety** - Catch errors at compile time
- ✅ **No GraphQL** - Simple RPC-style API

## Quick Start

```bash
# Create new T3 app
npx create-t3-app@latest

# Or use existing boilerplate
cd t3-app-boilerplate
npm install

# Setup environment
cp .env.example .env

# Run migrations
npx prisma migrate dev

# Start development
npm run dev
```

## Project Structure

```
t3-app/
├── src/
│   ├── app/              # Next.js App Router
│   ├── server/
│   │   ├── api/          # tRPC routers
│   │   ├── db/           # Prisma client
│   │   └── auth/         # NextAuth config
│   ├── components/       # React components
│   ├── styles/           # Global styles
│   └── utils/            # Utilities
├── prisma/
│   └── schema.prisma     # Database schema
└── package.json
```

## Usage Examples

### tRPC Router

```typescript
// server/api/routers/posts.ts
import { router, publicProcedure } from '../trpc';

export const postsRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany();
  }),
  
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: { id: input.id }
      });
    }),
});
```

### React Component

```typescript
// Using tRPC hook
const { data: posts } = api.posts.all.useQuery();

// Mutation
const createPost = api.posts.create.useMutation({
  onSuccess: () => {
    utils.posts.all.invalidate();
  }
});
```

### Prisma Schema

```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
}
```

## For AI Assistants

When helping with T3 projects:

1. **Understand tRPC** - It's not REST or GraphQL
2. **Type inference** - No manual type definitions needed
3. **Prisma patterns** - Know common queries
4. **NextAuth setup** - Configure providers
5. **Deployment** - Environment variables

## Best Practices

- **Type everything** - Let TypeScript infer
- **Server components** - Use where possible
- **Validate input** - Always use Zod
- **Error handling** - tRPC error types
- **Testing** - Vitest for tRPC routers

## Related Skills

- `saas-boilerplate-ixartz` - Alternative SaaS starter
- `awesome-python` - Python backend alternative
- `sst` - Serverless deployment

## Repository Location

`C:\Users\user\.qwen\skills\t3-app-boilerplate`

## Source

https://github.com/t3-oss/create-t3-app

## Documentation

https://create.t3.gg

---

**Note:** T3 Stack is perfect for full-stack TypeScript development. tRPC provides end-to-end type safety without code generation or GraphQL complexity.
