# Tejas Patel - Portfolio Website

A modern, aesthetic personal portfolio website showcasing my work as a Senior UI/UX Designer & Front-End Developer.

## Overview

This portfolio showcases my expertise in UI/UX design and front-end development, featuring a distinctive aesthetic theme with smooth animations, 3D objects, glassmorphism effects, and a soft pastel color palette (pink, yellow, blue).

## About Me

- **Name**: Tejas Patel
- **Location**: Brampton, ON
- **Education**: MSc Computing, Northumbria University
- **Title**: Senior UI/UX Designer & Front-End Developer

## Skills

### Design & UI/UX
- Figma
- Adobe XD
- Design Systems
- Wireframing
- Prototyping
- User Research
- Accessibility (WCAG)
- Responsive Design

### Programming Languages
- JavaScript (ES6+)
- TypeScript
- HTML5
- CSS3
- C
- C++
- Java

### Frameworks & Tools
- Angular (v14–18)
- React
- Bootstrap
- Tailwind CSS
- Angular Material
- REST APIs
- Redux / Context API
- NgRx
- PostgreSQL
- Git / GitHub
- VS Code
- JIRA
- Agile / Scrum

### Testing & Performance
- Jasmine / Karma
- Jest / React Testing Library
- A/B Testing
- Performance Optimization
- Chrome DevTools

## Featured Projects

### 1. Wine-Beer
E-commerce platform showcasing modern UI design and responsive development.
- **Tech**: React, Responsive Design, E-commerce, Modern UI
- **Features**: Responsive product catalog with advanced filtering, smooth checkout experience, lazy loading and image optimization

### 2. Employee Management System
Enterprise dashboard for managing employee data with real-time updates.
- **Tech**: Angular, Dashboard, Data Management, Enterprise, Accessibility
- **Features**: Data tables with pagination/sorting/filtering, CRUD operations with form validation, WCAG accessibility standards

### 3. Bank Payment Interface - Modern Design UI
Premium financial UI showcasing modern design principles and usability.
- **Tech**: Figma Design, UI/UX, FinTech, Mobile-First, Modern Design
- **Features**: Pixel-perfect payment interface with micro-interactions, secure form validation, financial UX best practices

### 4. E-commerce Dashboard
Comprehensive analytics and management dashboard for online stores.
- **Tech**: Angular, Dashboard, Data Visualization, Performance, Analytics
- **Features**: Data visualization with charts, real-time data updates, responsive CSS Grid/Flexbox layout

### 5. Restaurant Website
Modern restaurant site with menu showcase and reservation system.
- **Tech**: React, Web Design, Responsive, UX Design, Performance
- **Features**: Elegant mobile-responsive layout, interactive menu with filtering, reservation booking system

## Work Experience

### Senior UI/UX Designer — Glorywebs
**Sep 2024 – Present**
- Led end-to-end UX design for responsive web applications using Figma and Adobe XD
- Designed scalable design systems and reusable UI components, reducing design-to-development time by 30%
- Conducted user interviews and usability testing, improving product usability
- Improved conversion rates by 15% through optimized user flows and onboarding design
- Applied WCAG 2.1 accessibility standards
- Collaborated in Agile/Scrum sprints with Angular and React frontend teams

### Front-End Developer & UI Engineer — Ibrainers Ltd
**Mar 2020 – May 2024**
- Designed and developed responsive web applications with Angular and React
- Translated Figma and Adobe XD wireframes into pixel-perfect UI components
- Implemented component-based architecture
- Optimized performance with lazy loading, code splitting, and OnPush change detection
- Developed reusable UI libraries using Angular shared modules and React component patterns
- Integrated REST APIs via Angular HttpClient and Axios
- Ensured cross-browser compatibility across Chrome, Firefox, Safari, and Edge

### UI/UX Designer — Glorywebs
**Sep 2018 – Jan 2020**
- Designed responsive web and mobile interfaces with Figma, Adobe XD, and Sketch
- Conducted user research, surveys, and usability testing
- Created wireframes, prototypes, and high-fidelity mockups
- Developed reusable design systems and component libraries
- Improved user engagement by redesigning dashboards
- Applied Material Design and Human Interface Guidelines

## Contact

- **Email**: tejaspatell1009@gmail.com
- **Phone**: (437) 937-7156
- **LinkedIn**: linkedin.com/in/tejas1996p
- **GitHub**: github.com/tejas1996p

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS variables, 3D transforms
- **Vanilla JavaScript** - For scroll animations (lightweight, no dependencies)

## Design Features

### Color Palette
- **Primary Background**: Deep purple (#1a1625)
- **Accent Pink**: #ff9ff3
- **Accent Yellow**: #feca57
- **Accent Blue**: #54a0ff

### Visual Effects
- **Floating Gradient Orbs**: Animated background orbs in pink, blue, and yellow
- **3D Objects**: Rotating cubes, rings, icosahedron, and sphere with parallax scroll
- **Glassmorphism Navbar**: Frosted glass effect with backdrop blur
- **Glowing Logo**: 3D "TP" initials with pulsing glow animation
- **Gradient Text**: Hero heading with white-to-pink gradient
- **Smooth Animations**: Fade-up entrance animations on all sections

### Interactive Elements
- **Buttons**: Blue gradient accent buttons with glow hover effects
- **Cards**: Lift animation with colored border glow on hover
- **Project Cards**: Staggered reveal animations with gradient top border
- **Skill Chips**: Scale animation on hover
- **Meta Pills**: Background color change on hover

### 3D Background Objects
- Pink cube (top-left) - rotates and floats
- Blue cube (right side) - smaller rotating cube
- Yellow ring (center-left) - spinning torus
- Pink ring (top-right) - spinning ring
- Blue icosahedron (bottom-left) - geometric shape
- Gradient sphere (bottom-right) - glowing dot sphere

All 3D objects rotate and move with scroll position for parallax depth effect.

## Customization

### Changing Profile Image
Replace `avatar.jpg` with your own photo (recommended: square aspect ratio, 400x400px or larger).

### Updating Personal Information
Edit the `index.html` file to update:
- Name and title
- Summary text
- Projects and descriptions
- Experience details
- Skills
- Contact information

### Theme Colors
CSS variables in `:root` can be modified:
```css
:root {
  --bg: #1a1625;        /* Background color */
  --bg2: #0f0c14;       /* Secondary background */
  --accent: #ff9ff3;    /* Primary accent (pink) */
  --accent2: #feca57;   /* Secondary accent (yellow) */
  --accent3: #54a0ff;   /* Tertiary accent (blue) */
}
```

### Button Styles
Three button styles available:
- `.btn.solid` - Primary gradient (pink to yellow)
- `.btn.accent` - Secondary gradient (blue to pink)
- `.btn.ghost` - Transparent with border

### 3D Objects
Each object has a `data-scroll-speed` attribute controlling parallax speed:
```html
<div class="obj3d" data-scroll-speed="0.05">...</div>
```

## File Structure

```
Portfolio/
├── index.html           # Main portfolio website
├── avatar.jpg          # Profile photo
├── Resume - Tejas Patel.pdf  # Resume/CV
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lightweight: No external frameworks or libraries
- CSS-only animations where possible
- requestAnimationFrame for smooth scroll effects
- Passive scroll event listeners
- Optimized for fast load times

## License

MIT License - Feel free to use this portfolio as a template for your own.

---

Built with ❤️ by Tejas Patel
