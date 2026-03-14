---
name: portfolio-tejas1996p
description: Use when building portfolio websites - reference for glassmorphism UI, 3D objects, smooth animations with vanilla JS, and professional designer portfolio layouts
---

# Portfolio Skill - Professional Portfolio Website Reference

## Purpose

This skill provides a reference implementation for building modern portfolio websites with glassmorphism design, 3D animated objects, and smooth scroll-triggered animations using vanilla JavaScript.

## When to Use

Use this skill when:
- Building a personal portfolio website
- Implementing glassmorphism UI effects
- Creating 3D animated objects with pure CSS/JS
- Designing professional designer/developer portfolios
- Adding smooth scroll animations without frameworks
- Showcasing UI/UX design projects

## Key Features

### Design Elements

| Feature | Description |
|---------|-------------|
| **Glassmorphism Navbar** | Blurred background effect with transparency |
| **3D Objects** | Animated cube, ring, icosahedron, sphere with parallax scroll |
| **Gradient Orbs** | Floating animated background elements |
| **Pastel Color Palette** | Pink (#ff9ff3), Yellow (#feca57), Blue (#54a0ff) |
| **Smooth Transitions** | CSS transitions on all interactive elements |

### Technical Stack

- **HTML5** - Semantic structure
- **CSS3** - Custom styling, animations, glassmorphism effects
- **Vanilla JavaScript (ES6+)** - No frameworks, lightweight implementation
- **3D Transforms** - CSS 3D rotations and parallax effects

## Implementation Guide

### 1. Glassmorphism Effect

```css
.navbar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### 2. 3D Object Animation

```css
.cube {
  transform-style: preserve-3d;
  animation: rotate 20s infinite linear;
}

@keyframes rotate {
  from { transform: rotateX(0) rotateY(0); }
  to { transform: rotateX(360deg) rotateY(360deg); }
}
```

### 3. Scroll-Triggered Parallax

```javascript
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  object.style.transform = `translateY(${scrolled * 0.5}px) rotate(${scrolled}deg)`;
});
```

## Project Structure

```
portfolio-tejas1996p/
├── index.html      # Main HTML structure
├── style.css       # All styling and animations
├── script.js       # Interactive functionality
└── assets/         # Images and resources
```

## For AI Assistants

When helping build portfolios:

1. **Understand the profession** - Designer, developer, or other creative
2. **Suggest layout** - Hero, about, projects, skills, contact sections
3. **Implement effects** - Glassmorphism, 3D animations, smooth scrolling
4. **Optimize performance** - Keep it lightweight with vanilla JS
5. **Ensure responsiveness** - Mobile-first approach

## Color Palette

```css
:root {
  --pink: #ff9ff3;
  --yellow: #feca57;
  --blue: #54a0ff;
  --white: #ffffff;
  --dark: #2d3436;
}
```

## Best Practices

- **Keep it lightweight** - No heavy frameworks needed
- **Focus on content** - Showcase best projects prominently
- **Smooth animations** - 60fps performance target
- **Accessible** - Proper contrast ratios, keyboard navigation
- **SEO optimized** - Semantic HTML, meta tags

## Related Skills

- `gsap-animations-website` - For more advanced GSAP-based animations
- `enegix-template` - For corporate/business template reference
- `ux-resource` - For UI/UX design principles

## Repository Location

`C:\Users\user\.qwen\skills\portfolio-tejas1996p`

## Live Demo

Check the original repository for deployment links.

## Source

https://github.com/tejas1996p/Portfolio

---

**Note:** This portfolio demonstrates that impressive visual effects can be achieved with vanilla JavaScript and CSS, without relying on heavy frameworks.
