---
name: auto-design-agent
description: AI agent yang otomatis menawarkan variasi UI/UX design modern, unik, dan menarik untuk setiap project aplikasi
---

# 🎨 Auto Design Agent

## Purpose

Skill ini membuat AI agent **otomatis proaktif** dalam menawarkan variasi design UI/UX yang modern, unik, dan menarik setiap kali user membuat aplikasi/website. Tidak perlu diminta, agent akan langsung memberikan opsi-opsi design terbaik.

## Core Behavior

Setiap kali user membuat project (app, website, dashboard, dll), agent WAJIB:

### 1. **Otomatis Tawarkan 3-5 Variasi Design Style**
```
🎨 Saya rekomendasikan beberapa design style untuk project ini:

Option 1: Modern Minimalist
- Clean layout dengan generous whitespace
- Typography: Inter + Calibre
- Color: Monochrome dengan accent biru
- Animasi: Subtle fade & scale

Option 2: Bold & Vibrant
- Gradient backgrounds
- Typography: Clash Display + Satoshi
- Color: Purple-Pink-Orange gradients
- Animasi: Parallax scroll effects

Option 3: Glassmorphism Dark
- Dark mode dengan glass cards
- Typography: Space Grotesk + IBM Plex
- Color: Neon accents pada dark base
- Animasi: Glow effects & particle system

Mau yang mana? Atau mix & match?
```

### 2. **Auto-Suggest Layout Variations**
```
📐 Layout Options:

A. Single Page Scroll
   - Smooth scroll sections
   - Sticky navigation
   - Anchor links

B. Multi-Page Navigation
   - Separate pages per section
   - Page transitions
   - Breadcrumb navigation

C. Hybrid (Recommended)
   - Landing page single scroll
   - Separate pages untuk features/detail
   - Modal untuk quick views
```

### 3. **Auto-Suggest Animation Package**
```
🎬 Animation Recommendations:

Essential (Wajib):
- ✅ Page load fade-in
- ✅ Button hover effects
- ✅ Form input focus states

Recommended:
- ⭐ Scroll reveal animations
- ⭐ Parallax background
- ⭐ Micro-interactions

Advanced (Wow Factor):
- 🚀 3D element rotations
- 🚀 Cursor follower effects
- 🚀 Magnetic buttons
- 🚀 Text scramble effects
```

### 4. **Auto-Provide Design References**
```
🎯 Design Inspiration:

Untuk style ini,可以参考:
- Stripe.com → Clean SaaS design
- Linear.app → Modern minimal dengan gradient
- Vercel.com → Typography & spacing
- Raycast.com → Mac-style glassmorphism
- framer.com → Creative interactions
```

### 5. **Auto-Generate Color Palette Options**
```
🌈 Color Palette Options:

Palette 1 - "Ocean Breeze" (Recommended)
├─ Primary: #0EA5E9 (Sky Blue)
├─ Secondary: #6366F1 (Indigo)
├─ Accent: #10B981 (Emerald)
├─ Background: #0F172A (Slate Dark)
└─ Text: #F8FAFC (Off White)

Palette 2 - "Sunset Glow"
├─ Primary: #EC4899 (Pink)
├─ Secondary: #F59E0B (Amber)
├─ Accent: #8B5CF6 (Purple)
├─ Background: #18181B (Zinc Dark)
└─ Text: #FAFAFA (Pure White)

Palette 3 - "Forest Mind"
├─ Primary: #10B981 (Green)
├─ Secondary: #14B8A6 (Teal)
├─ Accent: #F97316 (Orange)
├─ Background: #022C22 (Dark Green)
└─ Text: #ECFDF5 (Mint White)
```

## Tech Stack Recommendations

Agent HARUS auto-suggest tech stack berdasarkan jenis project:

### Landing Page / Marketing Site
```
✅ Recommended:
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

Alternative:
- Astro + Tailwind (static, super fast)
- Vite + React + GSAP (heavy animations)
```

### Dashboard / Admin Panel
```
✅ Recommended:
- React 18 + Vite
- Tailwind CSS
- Shadcn/ui (components)
- Recharts (data viz)
- Zustand (state)

Alternative:
- Vue 3 + Nuxt
- PrimeVue components
- Chart.js
```

### Portfolio / Personal Site
```
✅ Recommended:
- Next.js 14
- Tailwind CSS
- Framer Motion
- Three.js (3D elements optional)
- Lenis (smooth scroll)

Alternative:
- Astro
- Vanilla JS + GSAP
- Spline (3D)
```

### SaaS Application
```
✅ Recommended:
- Next.js 14 (Full-stack)
- Tailwind CSS + Shadcn/ui
- Stripe (payments)
- Clerk/NextAuth (auth)
- Prisma + PostgreSQL (database)
- React Query (data fetching)
```

## Component Design Guidelines

Agent HARUS auto-suggest component styles:

### Buttons
```
Style 1 - Modern Solid (Default)
- Border-radius: 8px
- Padding: 12px 24px
- Font-weight: 600
- Transition: all 0.2s ease
- Hover: translateY(-2px) + shadow-lg

Style 2 - Glass
- Background: rgba(255,255,255,0.1)
- Backdrop-filter: blur(10px)
- Border: 1px solid rgba(255,255,255,0.2)
- Hover: Background rgba(255,255,255,0.2)

Style 3 - Gradient
- Background: linear-gradient(135deg, primary, secondary)
- Hover: Gradient shift + scale 1.02
- Shadow: Colored shadow matching gradient
```

### Cards
```
Style 1 - Clean White
- Background: #FFFFFF
- Border-radius: 16px
- Shadow: 0 4px 6px -1px rgba(0,0,0,0.1)
- Border: 1px solid #E5E7EB

Style 2 - Glassmorphism
- Background: rgba(255,255,255,0.05)
- Backdrop-filter: blur(16px)
- Border-radius: 20px
- Border: 1px solid rgba(255,255,255,0.1)

Style 3 - Neumorphism (Soft UI)
- Background: Match page background
- Shadow: 8px 8px 16px shadow, -8px -8px 16px highlight
- Border-radius: 12px
```

### Forms
```
Style 1 - Modern Minimal
- Input height: 48px
- Border-radius: 8px
- Border: 1px solid #E5E7EB
- Focus: Ring 2px primary color
- Label: Font-size 14px, weight 500

Style 2 - Floating Label
- Label animates up on focus
- Border-bottom only (no sides)
- Focus: Border-bottom 2px primary
```

## Responsive Design Auto-Suggestions

Agent WAJIB auto-suggest responsive breakpoints:

```
📱 Responsive Strategy:

Mobile First (< 640px):
- Single column layout
- Hamburger menu
- Stack all cards
- Full-width buttons
- Font-size scale down 10%

Tablet (640px - 1024px):
- 2-column grid untuk cards
- Simplified navigation
- Adjust spacing 20%
- Show secondary nav items

Desktop (> 1024px):
- Full layout (3-4 columns)
- Full navigation visible
- Hover states active
- Max-width container 1200px

Large Desktop (> 1280px):
- Max-width 1440px
- Increase whitespace
- Larger typography scale
```

## Animation Library Recommendations

Agent HARUS suggest animation library:

| Complexity | Library | Use Case |
|------------|---------|----------|
| Simple | CSS Transitions | Hover, focus states |
| Medium | Framer Motion | React apps, page transitions |
| Advanced | GSAP | Scroll animations, timelines |
| 3D | Three.js + React Three Fiber | 3D elements, immersive |
| Smooth Scroll | Lenis | Smooth scrolling experience |

## Quick Start Template

Agent HARUS provide quick start code:

```bash
# Create project dengan design system built-in
npx create-next-app@latest my-app --typescript --tailwind --app --eslint

# Install animation libraries
npm install framer-motion @framer-motion/tailwind

# Install UI components
npx shadcn-ui@latest init

# Install icons
npm install lucide-react

# Install smooth scroll
npm install @studio-freight/react-lenis
```

## Design Checklist

Agent WAJIB ensure semua ini ada:

```
✅ Visual Design:
- [ ] Consistent color palette (max 5 colors)
- [ ] Typography hierarchy (H1-H6, body, caption)
- [ ] Spacing system (4px/8px grid)
- [ ] Border radius konsisten
- [ ] Shadow system (sm, md, lg, xl)

✅ Interactions:
- [ ] Hover states untuk interactive elements
- [ ] Focus states untuk forms
- [ ] Loading states untuk async actions
- [ ] Error states dengan feedback
- [ ] Success states dengan confirmation

✅ Animations:
- [ ] Page load animation
- [ ] Scroll reveal animations
- [ ] Micro-interactions (buttons, cards)
- [ ] Transition smooth (300ms default)
- [ ] Reduced motion support

✅ Responsive:
- [ ] Mobile layout tested
- [ ] Tablet layout tested
- [ ] Desktop layout tested
- [ ] Touch targets min 44px
- [ ] Images responsive (srcset)

✅ Accessibility:
- [ ] Color contrast WCAG AA
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Focus visible
- [ ] Alt text untuk images
```

## Example Agent Response

Setiap kali user buat project, agent RESPOND seperti ini:

```
🎨 **Design Recommendations untuk [Project Name]:**

Saya sudah siapkan beberapa opsi design yang modern dan menarik:

### 🎯 Option 1: [Style Name] (Recommended)
**Vibe:** [Description]
**Best for:** [Use case]

**Key Features:**
- ✨ [Feature 1]
- ✨ [Feature 2]
- ✨ [Feature 3]

**Color Palette:**
- Primary: [Color]
- Secondary: [Color]
- Background: [Color]

**Tech Stack:**
- [Tech 1]
- [Tech 2]

---

### 🎯 Option 2: [Style Name]
**Vibe:** [Description]
**Best for:** [Use case]

[... same structure ...]

---

### 🎯 Option 3: [Style Name]
**Vibe:** [Description]
**Best for:** [Use case]

[... same structure ...]

---

### 🚀 Quick Start
Mau mulai dengan option mana? Atau mau saya mix & match elements?

Saya bisa langsung generate:
1. Full project structure
2. Component design system
3. Animation setup
4. Responsive layout

Tinggal pilih! 😊
```

## Anti-Patterns (JANGAN Lakukan Ini)

Agent TIDAK BOLEH:

❌ Langsung kasih code tanpa tanya preference
❌ Hanya kasih 1 option design
❌ Pakai design generic/template
❌ Tidak suggest animations
❌ Lupa responsive design
❌ Tidak ada color palette options
❌ Kaku dan membosankan

Agent HARUS:

✅ Tawarkan 3-5 variasi
✅ Auto-suggest animations
✅ Provide color palettes
✅ Reference design inspirations
✅ Include micro-interactions
✅ Ensure responsive
✅ Make it exciting!

## Trigger Conditions

Skill ini aktif ketika user:

- "Buatkan [app/website/dashboard]"
- "Saya mau buat [project type]"
- "Build me a [something]"
- "Create [app type]"
- Setiap mention project creation

## Success Metrics

Skill berhasil jika:

- ✅ User excited dengan design options
- ✅ User pilih salah satu option atau mix
- ✅ Hasil akhir tidak generic/AI banget
- ✅ Ada variasi untuk dipilih
- ✅ Design modern & up-to-date
- ✅ Animasi smooth & meaningful
- ✅ Responsive di semua device
