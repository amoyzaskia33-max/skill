---
name: andromeda-premium-template
description: Use when building modern Next.js websites - premium Andromeda template with beautiful design, animations, and professional layouts
---

# Andromeda Premium Template - Modern Next.js Website

## Purpose

This skill provides expertise in using Andromeda, a premium Next.js template featuring modern design, smooth animations, and professional layouts for building stunning websites.

## When to Use

Use this skill when:
- Building modern business websites
- Creating agency portfolios
- Need professional landing pages
- Developing SaaS websites
- Building startup websites
- Creating product showcases

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14+ |
| **Language** | JavaScript/TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | Lucide, Heroicons |
| **Forms** | React Hook Form |
| **Deployment** | Vercel, Netlify |

## Key Features

### Website Features

| Feature | Description |
|---------|-------------|
| **Landing Pages** | Multiple homepage variants |
| **Pages** | About, Services, Contact, Blog |
| **Components** | 50+ reusable components |
| **Animations** | Scroll animations, transitions |
| **Responsive** | Mobile-first design |
| **SEO** | Optimized meta tags |
| **Performance** | Fast loading, optimized |
| **Dark Mode** | Theme toggle support |

### Design Features

- 🎨 **Modern UI** - Clean, professional design
- ✨ **Animations** - Smooth transitions
- 📱 **Responsive** - All devices
- 🌙 **Dark Mode** - Light/dark themes
- 🎯 **CTA Sections** - Conversion optimized
- 📊 **Pricing** - Pricing tables
- 👥 **Team** - Team member sections
- 📝 **Testimonials** - Social proof

## Quick Start

```bash
# Clone and install
cd andromeda-premium-template
npm install

# Start development
npm run dev

# Build for production
npm run build
```

## Project Structure

```
andromeda/
├── app/
│   ├── page.tsx        # Homepage
│   ├── about/          # About page
│   ├── services/       # Services page
│   ├── contact/        # Contact page
│   └── blog/           # Blog pages
├── components/
│   ├── ui/             # UI components
│   ├── sections/       # Page sections
│   └── layout/         # Layout components
├── public/             # Static assets
└── tailwind.config.js  # Tailwind config
```

## Component Examples

### Hero Section

```jsx
import { motion } from 'framer-motion';

function HeroSection() {
  return (
    <section className="hero">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Build Something Amazing</h1>
        <p>Modern template for modern websites</p>
        <Button>Get Started</Button>
      </motion.div>
    </section>
  );
}
```

### Feature Cards

```jsx
function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

## For AI Assistants

When helping with website projects:

1. **Understand brand** - Colors, tone, audience
2. **Choose layout** - Single page or multi-page?
3. **Content strategy** - What to highlight?
4. **CTA placement** - Conversion optimization
5. **SEO setup** - Meta tags, structured data

## Best Practices

- **Performance** - Optimize images, lazy load
- **SEO** - Semantic HTML, meta tags
- **Accessibility** - ARIA labels, keyboard nav
- **Mobile-first** - Responsive design
- **Analytics** - Google Analytics setup

## Related Skills

- `saas-boilerplate-ixartz` - SaaS-focused template
- `enegix-template` - Business HTML template
- `gsap-animations-website` - Advanced animations

## Repository Location

`C:\Users\user\.qwen\skills\andromeda-premium-template`

## Source

https://github.com/themefisher/andromeda-light-nextjs

## Demo

https://andromeda-light.vercel.app/

---

**Note:** Andromeda is a premium Next.js template perfect for modern business websites, agencies, and SaaS products. Clean design with smooth animations.
