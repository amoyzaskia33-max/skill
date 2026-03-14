---
name: developer-portfolio-said
description: Use when building modern developer portfolios - full-stack portfolio template with dark mode, animations, and professional sections
---

# Developer Portfolio (Said7388) Skill

## Purpose

This skill provides a modern, feature-rich developer portfolio template built with Next.js, featuring dark mode, smooth animations, and comprehensive sections for showcasing skills and projects.

## When to Use

Use this skill when:
- Building a professional developer portfolio
- Needing a modern Next.js template
- Wanting dark/light mode toggle
- Creating animated portfolio experiences
- Showcasing full-stack development skills
- Deploying quickly to Vercel

## Key Features

### Design Features

| Feature | Description |
|---------|-------------|
| **Dark/Light Mode** | Theme toggle with persistence |
| **Smooth Animations** | Framer Motion transitions |
| **Responsive Design** | Mobile, tablet, desktop optimized |
| **Modern UI** | Clean, professional aesthetic |
| **Interactive Elements** | Hover effects, transitions |

### Portfolio Sections

- **Hero** - Introduction with CTA buttons
- **Experience** - Work history timeline
- **Skills** - Technical skills with icons
- **Projects** - Portfolio with filters
- **Blog** - Integrated blog section
- **Contact** - Contact form and social links

## Technical Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14+ |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | React Icons |
| **Deployment** | Vercel |

## Project Structure

```
developer-portfolio/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Hero.tsx        # Hero section
│   ├── Experience.tsx  # Work timeline
│   ├── Skills.tsx      # Skills grid
│   ├── Projects.tsx    # Project showcase
│   ├── Blog.tsx        # Blog integration
│   └── Contact.tsx     # Contact form
├── data/
│   └── portfolio.ts    # Personal data
├── public/             # Static assets
└── tailwind.config.ts  # Tailwind configuration
```

## Quick Start

### 1. Setup

```bash
# Clone the repository
cd developer-portfolio-said

# Install dependencies
npm install

# Run development server
npm run dev
```

### 2. Configuration

Edit `data/portfolio.ts` with your information:

```typescript
export const portfolio = {
  name: "Your Name",
  role: "Full Stack Developer",
  description: "Passionate about building amazing software...",
  avatar: "/profile.png",
  
  experience: [
    {
      company: "Company Name",
      position: "Software Engineer",
      duration: "2023 - Present",
      description: "Built scalable applications..."
    }
  ],
  
  skills: [
    { name: "React", icon: <FaReact /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Node.js", icon: <SiNodedotjs /> }
  ],
  
  projects: [
    {
      title: "Project Name",
      description: "Project description",
      techStack: ["React", "Next.js", "Tailwind"],
      github: "https://github.com/...",
      live: "https://..."
    }
  ],
  
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername"
  }
};
```

### 3. Customization

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#your-color',
          dark: '#your-dark-color'
        }
      }
    }
  }
}
```

### 4. Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel
```

## For AI Assistants

When helping build portfolios:

1. **Gather information** - Experience, skills, projects
2. **Configure data file** - Centralize all content
3. **Customize styling** - Match personal brand
4. **Optimize images** - Compress profile photos
5. **Deploy** - Vercel for easiest setup

## Best Practices

- **Keep it updated** - Regular content updates
- **Optimize images** - Use WebP format
- **SEO friendly** - Meta tags, Open Graph
- **Accessible** - ARIA labels, keyboard nav
- **Fast loading** - Code splitting, lazy loading

## Related Skills

- `developer-folio` - Alternative React portfolio
- `portfolio-tejas1996p` - Vanilla JS portfolio
- `gsap-animations-website` - Advanced animations

## Repository Location

`C:\Users\user\.qwen\skills\developer-portfolio-said`

## Source

https://github.com/said7388/developer-portfolio

---

**Note:** This is a modern, production-ready portfolio template with Next.js 14, perfect for showcasing full-stack development skills.
