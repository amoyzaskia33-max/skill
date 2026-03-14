---
name: gsap-animations-website
description: Use when creating scroll-triggered animations, geometric transitions, video storytelling, and engaging UI/UX with GSAP and React + Vite + Tailwind CSS
---

# GSAP Animations Website Skill - Scroll-Triggered Animation Expert

## Purpose

This skill provides expertise in creating stunning, visually engaging websites using GSAP (GreenSock Animation Platform) with React, Vite, and Tailwind CSS for scroll-triggered animations, geometric transitions, and video storytelling.

## When to Use

Use this skill when:
- Creating scroll-triggered animations
- Implementing geometric transitions
- Building video storytelling experiences
- Developing luxury/premium website designs
- Adding engaging UI/UX animations
- Building responsive animation-heavy websites

## Key Features

### Technical Stack

| Technology | Purpose |
|------------|---------|
| **React** | UI framework |
| **Vite** | Build tool with HMR |
| **Tailwind CSS** | Utility-first styling |
| **GSAP** | Professional animation library |
| **ScrollTrigger** | Scroll-based animations |

### Animation Capabilities

- **Scroll-Triggered Animations** - Animate on scroll position
- **Geometric Transitions** - Shape morphing and transformations
- **Video Storytelling** - Synchronized video with animations
- **Smooth Transitions** - 60fps performance
- **Responsive Animations** - Works on all devices

## Project Structure

```
gsap-animations-website/
├── src/
│   ├── components/    # React components
│   ├── styles/        # Tailwind CSS
│   ├── animations/    # GSAP animation configs
│   └── App.jsx        # Main application
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Implementation Guide

### 1. GSAP Setup with React

```jsx
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimatedSection() {
  const ref = useRef(null);
  
  useEffect(() => {
    gsap.from(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top center',
        scrub: true
      },
      opacity: 0,
      y: 100
    });
  }, []);
  
  return <div ref={ref}>Animated Content</div>;
}
```

### 2. ScrollTrigger Examples

```jsx
// Parallax effect
gsap.to('.parallax', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1
  },
  y: -150
});

// Pin section
gsap.to('.pinned', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top top',
    end: '+=100%',
    pin: true
  }
});
```

### 3. Geometric Transitions

```jsx
// Shape morphing
gsap.to('.shape', {
  scrollTrigger: {
    trigger: '.transition',
    scrub: 1
  },
  borderRadius: '50%',
  rotation: 360,
  scale: 1.5
});
```

## For AI Assistants

When helping with animation projects:

1. **Understand the vision** - What feeling should animations convey?
2. **Plan animation timeline** - Map out scroll positions and triggers
3. **Implement GSAP** - Use Timeline for complex sequences
4. **Optimize performance** - Use transforms, avoid layout thrashing
5. **Test responsiveness** - Ensure animations work on mobile

## Animation Best Practices

- **Performance First** - Use `transform` and `opacity` for 60fps
- **Meaningful Motion** - Animations should serve purpose
- **Timing** - Appropriate duration and easing
- **Accessibility** - Respect `prefers-reduced-motion`
- **Progressive Enhancement** - Site works without animations

## Common Animation Patterns

```jsx
// Fade up on scroll
gsap.from('.fade-up', {
  scrollTrigger: { trigger: '.fade-up', start: 'top 80%' },
  opacity: 0,
  y: 50,
  duration: 1
});

// Stagger children
gsap.from('.stagger > *', {
  scrollTrigger: { trigger: '.stagger', start: 'top center' },
  opacity: 0,
  y: 30,
  stagger: 0.1,
  duration: 0.8
});

// Horizontal scroll
gsap.to('.horizontal', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top top',
    end: '+=300%',
    pin: true,
    scrub: 1
  },
  x: '-200%'
});
```

## Related Skills

- `portfolio-tejas1996p` - For vanilla JS animations
- `ux-resource` - For UI/UX design principles
- `enegix-template` - For corporate website templates

## Repository Location

`C:\Users\user\.qwen\skills\gsap-animations-website`

## Live Demo

`gsap-animations-website.vercel.app`

## Source

https://github.com/aswin-c123/GSAP-Animations-website

---

**Note:** GSAP is the industry standard for professional web animations. Master ScrollTrigger for powerful scroll-based experiences inspired by sites like Zentry.
