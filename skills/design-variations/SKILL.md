---
name: design-variations
description: Generator variasi design UI/UX dengan multiple style options, layouts, dan animations untuk setiap component
---

# 🎨 Design Variations Generator

## Purpose

Skill ini fokus pada **generating multiple design variations** untuk setiap component/halaman yang dibuat. Setiap element HARUS punya minimal 3 variasi design yang bisa user pilih.

## Core Principles

### 1. **Rule of 3 Variations**
Setiap component/page HARUS punya minimal 3 variasi:
```
Variation 1: Conservative/Safe
- Clean, minimal, professional
- Suitable for corporate/enterprise
- Subtle animations

Variation 2: Modern/Trendy
- Current design trends
- Bold colors & gradients
- Smooth animations

Variation 3: Creative/Unique
- Experimental design
- Unconventional layouts
- Eye-catching animations
```

### 2. **Variation Dimensions**

Setiap variasi berbeda dalam aspek:

```
📐 Layout Variations:
- Grid vs Flexbox
- Symmetric vs Asymmetric
- Single column vs Multi-column
- Centered vs Offset

🎨 Style Variations:
- Flat vs Skeuomorphic
- Light vs Dark vs Glassmorphism
- Minimal vs Maximal
- Rounded vs Sharp corners

🎬 Animation Variations:
- None/Subtle vs Moderate vs Heavy
- CSS transitions vs GSAP vs Framer Motion
- Fade vs Slide vs Scale vs Rotate

🌈 Color Variations:
- Monochrome vs Colorful
- Warm vs Cool tones
- Muted vs Vibrant
- Single accent vs Multi-color
```

## Component Variations Library

### Buttons - 9 Variations

```
📱 Variation 1: Solid Modern
- Background: Primary color
- Border-radius: 8px
- Padding: 12px 24px
- Hover: Darken 10%
- Animation: Scale 0.98 on click

📱 Variation 2: Outline
- Border: 2px solid primary
- Background: Transparent
- Hover: Fill primary color
- Animation: Border-color sweep

📱 Variation 3: Gradient
- Background: Linear gradient 135deg
- Hover: Gradient angle shift
- Shadow: Colored glow
- Animation: Shimmer effect

📱 Variation 4: Glass
- Background: rgba(255,255,255,0.1)
- Backdrop-filter: blur(10px)
- Border: 1px rgba(255,255,255,0.2)
- Hover: Increase opacity

📱 Variation 5: Neumorphism
- Background: Surface color
- Shadow: Double (light + dark)
- Hover: Shadow inset
- Animation: Press effect

📱 Variation 6: Floating
- Shadow: Large blur
- Hover: Lift up 4px
- Animation: Float idle

📱 Variation 7: Icon + Text
- Icon left/right
- Icon animate on hover
- Text slide animation

📱 Variation 8: Loading State
- Spinner integrated
- Disable click
- Width maintain

📱 Variation 9: Magnetic
- Follow cursor slightly
- Snap on hover
- Elastic animation
```

### Cards - 6 Variations

```
📦 Variation 1: Clean White
- Background: #FFF
- Shadow: Subtle
- Border-radius: 12px
- Hover: Shadow increase

📦 Variation 2: Glassmorphism
- Background: rgba blur
- Border: Transparent
- Backdrop-filter
- Hover: Blur increase

📦 Variation 3: Image Hero
- Image top 60%
- Content bottom overlay
- Gradient fade
- Hover: Image zoom

📦 Variation 4: Border Accent
- Border: 2px transparent
- Hover: Border gradient
- Background: Dark
- Animation: Border draw

📦 Variation 5: 3D Tilt
- Perspective transform
- Hover: Tilt effect
- Shadow: Dynamic
- Parallax content

📦 Variation 6: Minimal Line
- No shadow
- Border-bottom only
- Hover: Line expand
- Very flat design
```

### Navigation Bars - 5 Variations

```
🧭 Variation 1: Fixed Top
- Position: Fixed
- Blur background
- Shrink on scroll
- Logo + Links + CTA

🧭 Variation 2: Floating
- Margin from top
- Rounded corners
- Centered
- Glass effect

🧭 Variation 3: Side Navigation
- Vertical layout
- Icons + Labels
- Collapsible
- Full height

🧭 Variation 4: Bottom Bar (Mobile)
- Fixed bottom
- Icons only
- Active indicator
- Safe area padding

🧭 Variation 5: Mega Menu
- Full width dropdown
- Multi-column
- Images included
- Animated reveal
```

### Hero Sections - 7 Variations

```
🦸 Variation 1: Centered Classic
- Headline center
- Subheadline below
- CTA buttons center
- Image/illustration bottom

🦸 Variation 2: Split Screen
- Text left 50%
- Image/3D right 50%
- Vertical center align
- Fade in animation

🦸 Variation 3: Fullscreen Video
- Background video
- Overlay gradient
- Text center
- Minimal UI

🦸 Variation 4: Asymmetric Grid
- Text offset
- Image overlap
- Geometric shapes
- Dynamic layout

🦸 Variation 5: Typographic
- Huge headline
- Text as hero
- Minimal imagery
- Bold fonts

🦸 Variation 6: Interactive 3D
- Three.js background
- Mouse follow effect
- Particle system
- Immersive

🦸 Variation 7: Carousel Slider
- Multiple slides
- Auto-rotate
- Full width
- Smooth transitions
```

### Forms - 4 Variations

```
📝 Variation 1: Floating Labels
- Label on top initially
- Float up on focus
- Border-bottom style
- Minimal design

📝 Variation 2: Card Form
- Form in card container
- All borders visible
- Grouped fields
- Shadow elevated

📝 Variation 3: Inline Form
- Labels inline
- Compact design
- Horizontal layout
- Space efficient

📝 Variation 4: Multi-step
- Wizard style
- Progress indicator
- One section at time
- Smooth transitions
```

## Layout Variations Generator

### Landing Page Layouts

```
📄 Layout 1: Classic SaaS
├─ Hero (centered)
├─ Logo Cloud
├─ Features (3-col grid)
├─ How It Works (steps)
├─ Testimonials (carousel)
├─ Pricing (3 cards)
├─ FAQ (accordion)
└─ CTA + Footer

📄 Layout 2: Storytelling
├─ Hero (split screen)
├─ Problem Statement
├─ Solution Reveal
├─ Features (alternating)
├─ Social Proof
├─ Team/About
└─ Contact + Footer

📄 Layout 3: One-Page App
├─ Fullscreen Hero
├─ Feature Tabs
├─ Interactive Demo
├─ Integration Logos
├─ Pricing Toggle
└─ Modal Contact

📄 Layout 4: Portfolio Style
├─ Hero (minimal text)
├─ Work Grid (masonry)
├─ Case Studies
├─ Process Section
├─ Testimonials
└─ Contact CTA

📄 Layout 5: E-commerce
├─ Hero (product focus)
├─ Categories Grid
├─ Featured Products
├─ Benefits Icons
├─ Reviews
└─ Newsletter + Footer
```

## Animation Variations

### Entry Animations

```
🎬 Fade Family:
- Fade In (opacity 0→1)
- Fade In Up ( + translateY)
- Fade In Down ( + translateY)
- Fade In Left ( + translateX)
- Fade In Right ( + translateX)
- Fade In Scale ( + scale 0.9→1)

🎬 Slide Family:
- Slide Up (y: 100% → 0%)
- Slide Down (y: -100% → 0%)
- Slide Left (x: 100% → 0%)
- Slide Right (x: -100% → 0%)

🎬 Scale Family:
- Scale In (scale: 0 → 1)
- Scale In Center (transform-origin: center)
- Scale In Top (transform-origin: top)
- Spring Scale (elastic overshoot)

🎬 Rotate Family:
- Rotate In (rotate: -180deg → 0)
- Rotate In Clockwise
- Rotate In Counter-clockwise
- Flip In X (rotateX)
- Flip In Y (rotateY)

🎬 Special:
- Blur In (blur: 10px → 0)
- Unfold (height: 0 → auto)
- Expand (width/height scale)
- Stagger Children (delay each child)
```

### Hover Animations

```
🎯 Transform:
- Lift Up (translateY -4px)
- Scale Up (scale 1.05)
- Rotate Slight (rotate 2deg)
- Skew (skewX -5deg)

🎯 Shadow:
- Shadow Grow (blur increase)
- Shadow Color (colored shadow)
- Shadow Lift (y-offset increase)

🎯 Border:
- Border Draw (stroke animation)
- Border Color (gradient shift)
- Border Radius (rounding change)

🎯 Background:
- Gradient Shift (angle change)
- Opacity Change
- Pattern Reveal
- Image Zoom (background-size)

🎯 Content:
- Text Color Change
- Icon Rotate
- Icon Slide
- Underline Draw
```

### Scroll Animations

```
📜 Reveal Effects:
- Fade Up Reveal
- Clip Reveal (clip-path)
- Mask Reveal
- Stagger Reveal (children delay)

📜 Parallax:
- Background Parallax (slower scroll)
- Foreground Parallax (faster scroll)
- Horizontal Parallax (x movement)
- Rotate Parallax (rotation on scroll)

📜 Progress:
- Progress Bar (scroll indicator)
- Sticky Progress (fixed header)
- Circular Progress
- Step Indicator

📜 Pin Effects:
- Pin Section (hold while scrolling)
- Pin + Scale (zoom while pinned)
- Pin + Fade (fade while pinned)
- Pin + Rotate (rotate while pinned)
```

## Color Palette Generator

### Auto-Generate Palette Options

```
🎨 Palette Structure:
For each project, generate 3 palettes:

Palette 1: Safe/Professional
- Primary: Blue/Navy family
- Secondary: Gray/Slate
- Accent: Green/Teal
- Neutral: White/Gray/Black

Palette 2: Modern/Trendy
- Primary: Purple/Violet
- Secondary: Pink/Rose
- Accent: Cyan/Blue
- Neutral: Dark with warm tint

Palette 3: Bold/Unique
- Primary: Orange/Coral
- Secondary: Yellow/Amber
- Accent: Magenta/Purple
- Neutral: High contrast B/W

🎨 Each Palette Includes:
- Primary (main brand color)
- Secondary (supporting color)
- Accent (CTA, highlights)
- Background (page bg)
- Surface (cards, elevated)
- Text Primary (headings)
- Text Secondary (body)
- Success (positive feedback)
- Error (negative feedback)
- Warning (caution)
```

## Typography Variations

### Font Pairing Options

```
📝 Pairing 1: Modern Clean
- Headings: Inter (sans-serif)
- Body: Inter (sans-serif)
- Use: Corporate, SaaS, Dashboard

📝 Pairing 2: Editorial
- Headings: Playfair Display (serif)
- Body: Source Sans Pro (sans-serif)
- Use: Blog, Magazine, Portfolio

📝 Pairing 3: Tech/Code
- Headings: Space Grotesk (sans-serif)
- Body: IBM Plex Mono (monospace)
- Use: Dev tools, Documentation, Tech

📝 Pairing 4: Friendly/Casual
- Headings: Poppins (sans-serif)
- Body: Open Sans (sans-serif)
- Use: Startup, App, Marketing

📝 Pairing 5: Luxury/Elegant
- Headings: Cormorant Garamond (serif)
- Body: Lato (sans-serif)
- Use: Fashion, Jewelry, High-end

📝 Pairing 6: Bold/Impact
- Headings: Clash Display (display)
- Body: Satoshi (sans-serif)
- Use: Landing page, Campaign, Event
```

## Quick Response Template

Agent HARUS respond dengan format ini:

```markdown
🎨 **Design Variations untuk [Component/Page]:**

Saya sudah siapkan **[X] variasi** untuk Anda pilih:

---

### 🎯 Variation 1: [Name]
**Style:** [Description]
**Best for:** [Use case]
**Vibe:** [Professional/Modern/Creative/etc]

**Preview:**
```
[ASCII/Text representation atau description]
```

**Key Features:**
- ✨ [Feature 1]
- ✨ [Feature 2]
- ✨ [Feature 3]

**Code:**
```tsx
[Code implementation]
```

---

### 🎯 Variation 2: [Name]
[Same structure]

---

### 🎯 Variation 3: [Name]
[Same structure]

---

### 🎨 Color Options:
Saya juga siapkan **[X] color palettes** yang cocok:

**Palette 1:** [Name]
- Primary: #XXXXXX
- Secondary: #XXXXXX
- Accent: #XXXXXX

**Palette 2:** [Name]
[Same structure]

---

### 🎬 Animation Suggestions:
- Entry: [Animation name]
- Hover: [Animation name]
- Scroll: [Animation name]

---

### 💡 Recommendation:
Untuk [use case Anda], saya recommend **Variation [X]** dengan **Palette [Y]** karena [alasan].

Mau saya implementasikan yang mana? Atau mau mix & match elements?
```

## Trigger Keywords

Skill ini aktif ketika:

- "Buat [component]"
- "Design [page]"
- "Create [UI element]"
- "I need a [button/card/etc]"
- "Show me variations"
- "Give me options"
- "Multiple designs"

## Success Criteria

✅ Minimal 3 variations provided
✅ Each variation distinct (bukan cuma warna beda)
✅ Code ready untuk setiap variation
✅ Visual description jelas
✅ Use case explained
✅ Recommendation given
✅ User excited to choose
