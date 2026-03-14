---
name: dms-tech-lab
description: Use when building corporate/engineering showcase websites with Next.js, TypeScript, MDX documentation, and modern geometric 3D animations
---

# DMS Tech Lab Skill - Corporate Website with Next.js

## Purpose

This skill provides a reference for building modern corporate websites using Next.js with TypeScript, MDX documentation, geometric 3D animations, and responsive layouts for showcasing engineering solutions.

## When to Use

Use this skill when:
- Building corporate/business websites
- Creating engineering solution showcases
- Implementing MDX-based documentation
- Using Next.js App Router architecture
- Adding geometric 3D animations
- Building responsive corporate layouts

## Key Features

### Technical Stack

| Technology | Usage |
|------------|-------|
| **Next.js** | Main React framework |
| **TypeScript** | Primary language (51.9%) |
| **MDX** | Content/documentation (46.8%) |
| **Prisma** | Database ORM |
| **Vercel** | Deployment platform |

### Design Elements

- **Modern UI/UX** - Clean, professional design
- **Geometric 3D Animations** - Visual engagement
- **Responsive Layout** - Mobile-first approach
- **Documentation System** - MDX-based content
- **API Integration** - Backend connectivity

## Project Structure

```
dms-tech-lab/
├── app/              # Next.js App Router
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── prisma/           # Database schema
├── content/          # MDX documentation
├── public/           # Static assets
└── lib/              # Utility functions
```

## Implementation Guide

### 1. Next.js App Router Setup

```typescript
// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <SolutionsShowcase />
    </main>
  );
}
```

### 2. MDX Content Integration

```typescript
// content/page.mdx
import { Callout } from '@/components';

# Engineering Solutions

<Callout type="info">
  Our innovative approach to engineering challenges.
</Callout>
```

### 3. Prisma Database Schema

```prisma
model Project {
  id          String   @id @default(cuid())
  name        String
  description String
  category    String
  createdAt   DateTime @default(now())
}
```

## For AI Assistants

When helping build corporate websites:

1. **Understand the business** - What solutions do they offer?
2. **Plan the structure** - Services, about, contact, documentation
3. **Implement components** - Reusable, accessible, performant
4. **Add animations** - Subtle, professional geometric animations
5. **Setup documentation** - MDX for easy content management

## Best Practices

- **Type Safety** - Use TypeScript throughout
- **Component Reusability** - DRY principle
- **Performance** - Optimize images, code splitting
- **SEO** - Meta tags, structured data
- **Accessibility** - WCAG compliance

## Related Skills

- `portfolio-tejas1996p` - For personal portfolio reference
- `enegix-template` - For business template alternatives
- `gsap-animations-website` - For advanced animations

## Repository Location

`C:\Users\user\.qwen\skills\dms-tech-lab`

## Live Demo

`dms-tech-lab.vercel.app`

## Source

https://github.com/MetachainArt/dms-tech-lab

---

**Note:** This project demonstrates modern Next.js development with TypeScript and MDX for content-driven corporate websites.
