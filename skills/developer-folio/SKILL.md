---
name: developer-folio
description: Use when building developer portfolio websites - React-based portfolio template with blog, social links, and customizable sections for showcasing software engineering skills
---

# DeveloperFolio Skill - Developer Portfolio Template

## Purpose

This skill provides a ready-to-use, customizable portfolio template specifically designed for software developers, built with React. It includes sections for showcasing skills, projects, experience, and a blog integration.

## When to Use

Use this skill when:
- Building a software developer portfolio
- Creating a personal branding website
- Showcasing programming projects and skills
- Setting up a developer blog
- Needing a quick, professional portfolio template
- Customizing sections for tech industry roles

## Key Features

### Portfolio Sections

| Section | Description |
|---------|-------------|
| **Hero** | Introduction with profile image and social links |
| **Skills** | Technical skills categorized by domain |
| **Experience** | Work history with company logos |
| **Projects** | Portfolio projects with links and tech stack |
| **Blog** | Integrated blog posts from Dev.to/Medium |
| **Contact** | Contact form and social media links |

### Technical Features

- **React** - Modern component-based architecture
- **Responsive Design** - Mobile, tablet, desktop optimized
- **Dark/Light Mode** - Theme toggle support
- **SEO Optimized** - Meta tags and structured data
- **Fast Performance** - Optimized loading
- **Easy Customization** - Centralized configuration

## Project Structure

```
developerFolio/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header/       # Navigation header
│   │   ├── Hero/         # Hero section
│   │   ├── Skills/       # Skills showcase
│   │   ├── Experience/   # Work history
│   │   ├── Projects/     # Project portfolio
│   │   ├── Blog/         # Blog section
│   │   └── Contact/      # Contact section
│   ├── containers/       # Page containers
│   ├── assets/           # Images, fonts, icons
│   ├── theme/            # Theme configuration
│   ├── portfolio.js      # Personal data configuration
│   └── App.js
├── public/               # Static assets
└── package.json
```

## Quick Start

### 1. Installation

```bash
# Clone or download the template
cd developerFolio

# Install dependencies
npm install

# Start development server
npm start
```

### 2. Configuration

Edit `src/portfolio.js` with your information:

```javascript
const portfolio = {
  greeting: "Hi, I'm",
  name: "Your Name",
  role: "Software Developer",
  description: "Passionate about building amazing software...",
  avatar_image: "path/to/your/photo.jpg",
  
  // Social Links
  socialLinks: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "your.email@example.com"
  },
  
  // Skills
  skills: [
    {
      title: "Frontend Development",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
    },
    {
      title: "Backend Development",
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB"]
    }
  ],
  
  // Experience
  experience: [
    {
      company: "Company Name",
      role: "Software Engineer",
      duration: "2023 - Present",
      description: "Built scalable web applications..."
    }
  ],
  
  // Projects
  projects: [
    {
      title: "Project Name",
      description: "A brief description of your project",
      techStack: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/...",
      live: "https://..."
    }
  ]
};

export default portfolio;
```

### 3. Theme Customization

Edit `src/theme/theme.js` for colors and styling:

```javascript
const theme = {
  colors: {
    primary: "#3498db",
    secondary: "#2ecc71",
    background: "#ffffff",
    text: "#333333",
    // ... more colors
  },
  fonts: {
    primary: "'Inter', sans-serif",
  }
};
```

### 4. Build for Production

```bash
# Create production build
npm run build

# Deploy to Vercel, Netlify, or GitHub Pages
```

## For AI Assistants

When helping build developer portfolios:

1. **Understand the specialty** - Frontend, backend, full-stack, or other?
2. **Gather information** - Skills, experience, projects, blog
3. **Configure portfolio.js** - Centralize all personal data
4. **Customize theme** - Match personal branding
5. **Setup deployment** - Vercel, Netlify, or GitHub Pages

## Customization Guide

### Adding New Sections

```jsx
// Create new component
// src/components/NewSection/NewSection.js
import React from 'react';

function NewSection() {
  return (
    <section className="new-section">
      <h2>New Section</h2>
      {/* Content */}
    </section>
  );
}

export default NewSection;
```

### Integrating Blog

```javascript
// In portfolio.js
const blog = {
  enabled: true,
  platform: "dev.to", // or "medium"
  username: "yourusername"
};
```

### Social Media Icons

```javascript
// Add more social links
socialLinks: {
  github: "...",
  linkedin: "...",
  twitter: "...",
  instagram: "...",
  dribbble: "...",
  behance: "..."
}
```

## Deployment Options

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Drag and drop dist folder to Netlify
```

### GitHub Pages

```json
// package.json
{
  "homepage": "https://yourusername.github.io/developerFolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

## Best Practices

- **Keep it updated** - Regular portfolio updates
- **Quality over quantity** - Showcase best work only
- **Clear contact info** - Make it easy to reach you
- **Mobile responsive** - Test on all devices
- **Fast loading** - Optimize images and assets
- **SEO friendly** - Use proper meta tags

## Related Skills

- `portfolio-tejas1996p` - Alternative portfolio with vanilla JS
- `gsap-animations-website` - Add advanced animations
- `ux-resource` - UI/UX design principles

## Repository Location

`C:\Users\user\.qwen\skills\developer-folio`

## Source

https://github.com/saadpasta/developerFolio

## Live Demo

Check the original repository for demo links and examples.

---

**Note:** DeveloperFolio is specifically designed for software developers with pre-built sections for skills, experience, and projects. Faster setup than building from scratch!
