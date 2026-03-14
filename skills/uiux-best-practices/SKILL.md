---
name: uiux-best-practices
description: Panduan lengkap UI/UX best practices untuk memastikan design yang dibuat professional, accessible, dan user-friendly
---

# 🎨 UI/UX Best Practices

## Purpose

Skill ini memastikan setiap design yang dihasilkan mengikuti **industry best practices** untuk UI/UX yang professional, accessible, dan user-friendly.

## Design Principles

### 1. Visual Hierarchy

```
📐 Hierarchy Rules:

Size:
- H1: 2.5rem - 4rem (40px - 64px)
- H2: 2rem - 2.5rem (32px - 40px)
- H3: 1.5rem - 2rem (24px - 32px)
- H4: 1.25rem - 1.5rem (20px - 24px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)
- Tiny: 0.75rem (12px)

Weight:
- Headings: 600 - 700
- Subheadings: 500 - 600
- Body: 400
- Emphasis: 600

Color:
- Primary text: #1A1A1A (90% contrast)
- Secondary text: #666666 (60% contrast)
- Tertiary text: #999999 (40% contrast)
- Disabled: #CCCCCC (25% contrast)
```

### 2. Spacing System

```
📏 8px Grid System:

Base unit: 8px

Spacing scale:
- 0: 0px
- 1: 4px (half unit)
- 2: 8px (1 unit)
- 3: 12px
- 4: 16px (2 units)
- 5: 20px
- 6: 24px (3 units)
- 7: 28px
- 8: 32px (4 units)
- 9: 40px
- 10: 48px (6 units)
- 11: 56px
- 12: 64px (8 units)
- 13: 80px
- 14: 96px (12 units)
- 15: 128px (16 units)

Usage:
- Component padding: 16px - 24px
- Section padding: 64px - 128px
- Gap between elements: 8px - 32px
- Container max-width: 1200px - 1440px
```

### 3. Color System

```
🌈 Color Guidelines:

60-30-10 Rule:
- 60%: Dominant color (background, large areas)
- 30%: Secondary color (cards, sections)
- 10%: Accent color (CTAs, highlights)

Contrast Requirements (WCAG):
- Normal text: Min 4.5:1 (AA), 7:1 (AAA)
- Large text: Min 3:1 (AA), 4.5:1 (AAA)
- UI components: Min 3:1

Color Semantics:
- Primary: Brand, main actions
- Secondary: Supporting actions
- Success: Positive feedback, completion
- Warning: Caution, attention needed
- Error: Errors, destructive actions
- Info: Informational messages

Never Use Color Alone:
- Always pair with icon/text
- Example: Error = Red + X icon + message
```

### 4. Typography Best Practices

```
📝 Typography Rules:

Line Height:
- Headings: 1.1 - 1.3
- Body: 1.5 - 1.7
- Large text: 1.3 - 1.5

Line Length:
- Optimal: 50-75 characters
- Max: 80 characters
- Min: 30 characters

Letter Spacing:
- Headings: -0.02em to -0.05em
- Body: 0
- Uppercase: 0.05em - 0.1em

Paragraph Spacing:
- Between paragraphs: 1.5x line-height
- After heading: 0.75em - 1em

Responsive Type Scale:
Mobile (multiply by 0.875):
- H1: 2rem (32px)
- H2: 1.5rem (24px)
- Body: 0.875rem (14px)

Desktop:
- H1: 3rem (48px)
- H2: 2.25rem (36px)
- Body: 1rem (16px)
```

### 5. Component Design Standards

```
🔘 Buttons:

Minimum Sizes:
- Desktop: Height 40px, Padding 16px 24px
- Mobile: Height 44px, Padding 12px 24px
- Touch target: Min 44x44px

States Required:
- Default
- Hover (scale/color change)
- Active/Pressed (scale down 0.98)
- Focus (visible ring 2-3px)
- Disabled (opacity 50%, no pointer)

Loading State:
- Show spinner
- Disable interaction
- Maintain width
- Text: "Loading..." or keep original

📥 Input Fields:

Minimum Sizes:
- Height: 44px (mobile), 40px (desktop)
- Padding: 12px 16px
- Font-size: 16px (prevent zoom on iOS)

States Required:
- Default
- Hover
- Focus (ring + border color)
- Error (red border + message)
- Success (green border + checkmark)
- Disabled (gray background)

Labels:
- Always visible (no placeholder-only)
- Font-size 14px, weight 500
- Required indicator: * or "(required)"
- Error message below input, 12px, red

📦 Cards:

Padding: 24px minimum
Border-radius: 12px - 16px
Shadow: Subtle, multiple layers
Max-width: 400px - 600px

Content Hierarchy:
1. Image/Media (top)
2. Title (bold, 18-20px)
3. Subtitle/Description (regular, 14-16px)
4. Meta info (small, 12-14px, gray)
5. Actions/Buttons (bottom)

🧭 Navigation:

Desktop:
- Logo left, links center/right, CTA right
- Height: 64px - 80px
- Padding: 16px 24px
- Links: 16px, weight 500

Mobile:
- Hamburger menu
- Full-screen overlay or slide-in
- Touch targets: 44px minimum
- Safe area padding

Active State:
- Underline or color change
- Font-weight 600
- Clear visual difference
```

### 6. Accessibility (A11y)

```
♿ Accessibility Checklist:

Keyboard Navigation:
✅ Tab order logical
✅ Focus visible (3px outline)
✅ Skip to content link
✅ No keyboard traps
✅ All interactive elements accessible

Screen Readers:
✅ Semantic HTML (h1-h6, nav, main, footer)
✅ Alt text for images
✅ ARIA labels where needed
✅ Form labels associated with inputs
✅ Error messages linked to inputs

Color & Contrast:
✅ Text contrast min 4.5:1
✅ Large text min 3:1
✅ Color not only indicator
✅ Focus indicators visible

Motion:
✅ Reduce motion support
✅ No auto-playing animations
✅ Pause/stop controls

Forms:
✅ Labels visible
✅ Error messages clear
✅ Success feedback
✅ Required fields indicated
✅ Input type correct (email, tel, etc.)

Images:
✅ Alt text descriptive
✅ Decorative images: alt=""
✅ Complex images: long description
✅ SVG: title + desc elements
```

### 7. Responsive Design

```
📱 Responsive Breakpoints:

Mobile First Approach:

Base styles: Mobile (< 640px)

Breakpoints:
- sm: 640px (large phones)
- md: 768px (tablets)
- lg: 1024px (laptops)
- xl: 1280px (desktops)
- 2xl: 1536px (large screens)

Mobile Considerations:
✅ Touch targets: 44px minimum
✅ Thumb zone: Important actions bottom
✅ No hover-only interactions
✅ Font-size: Min 16px for inputs
✅ Images: srcset for resolution
✅ Videos: Max-width 100%
✅ Tables: Horizontal scroll or stack

Tablet Adjustments:
✅ 2-column layouts
✅ Adjusted spacing (80-90% of desktop)
✅ Navigation: Hamburger or simplified

Desktop Features:
✅ Hover states
✅ Multi-column layouts
✅ Larger images
✅ More whitespace
```

### 8. Performance

```
⚡ Performance Guidelines:

Images:
✅ Format: WebP/AVIF with fallback
✅ Sizes: Multiple resolutions (srcset)
✅ Compression: 80-85% quality
✅ Lazy loading: Below fold images
✅ Dimensions: Explicit width/height

Fonts:
✅ Format: WOFF2
✅ Subset: Only needed characters
✅ Preload: Critical fonts
✅ Display: swap or optional
✅ Limit: Max 2-3 font families

CSS:
✅ Critical CSS inline
✅ Rest async/defer
✅ Minified production
✅ Purge unused
✅ CSS-in-JS: Extract critical

JavaScript:
✅ Code splitting
✅ Lazy load routes/components
✅ Defer non-critical
✅ Tree shaking
✅ Minify + compress

Animations:
✅ Use transform + opacity (GPU)
✅ Avoid: width, height, top, left
✅ Duration: 200-500ms
✅ Easing: ease-out or custom
✅ Reduce motion option
```

### 9. Micro-interactions

```
✨ Micro-interaction Guidelines:

Button Feedback:
- Hover: 150-200ms transition
- Click: Scale 0.95-0.98
- Release: Spring back

Form Feedback:
- Focus: Ring appears 200ms
- Valid: Checkmark fade in
- Invalid: Shake animation 300ms
- Submit: Loading spinner

Loading States:
- Skeleton screens preferred
- Progress for > 1 second
- Spinner for indeterminate
- Max wait: 3 seconds then timeout

Success Feedback:
- Toast notification 3-5 seconds
- Checkmark animation
- Color: Green
- Position: Top-right or bottom

Error Feedback:
- Immediate, inline if possible
- Clear message what went wrong
- Action to fix
- Color: Red
- Don't auto-dismiss critical errors

Scroll Feedback:
- Smooth scroll behavior
- Scroll progress indicator
- Back to top button (after scroll)
- Sticky headers shrink on scroll
```

### 10. Content Guidelines

```
📝 Content Best Practices:

Headlines:
✅ Clear value proposition
✅ 6-12 words optimal
✅ Benefit-focused
✅ Action-oriented

Body Text:
✅ Short paragraphs (2-4 sentences)
✅ Bullet points for lists
✅ Bold key phrases
✅ Active voice

CTAs:
✅ Action verbs (Get, Start, Join)
✅ Specific (not "Submit")
✅ Urgency without pressure
✅ 2-5 words

Error Messages:
✅ Human-readable (no codes)
✅ What went wrong
✅ How to fix
✅ Polite tone

Empty States:
✅ Explain why empty
✅ What to do next
✅ CTA to action
✅ Friendly illustration

Tooltips:
✅ Brief (1 sentence)
✅ Helpful, not obvious
✅ Dismiss on click/scroll
✅ Accessible (keyboard, screen reader)
```

## Design Review Checklist

Agent HARUS check setiap design:

```
✅ VISUAL DESIGN:
- [ ] Clear visual hierarchy
- [ ] Consistent spacing (8px grid)
- [ ] Color contrast WCAG AA
- [ ] Typography scale logical
- [ ] White space balanced

✅ INTERACTIONS:
- [ ] Hover states defined
- [ ] Focus states visible
- [ ] Loading states included
- [ ] Error states handled
- [ ] Success feedback present

✅ RESPONSIVE:
- [ ] Mobile layout works
- [ ] Touch targets 44px
- [ ] Images responsive
- [ ] Breakpoints tested
- [ ] Content readable

✅ ACCESSIBILITY:
- [ ] Semantic HTML
- [ ] Alt text present
- [ ] Keyboard navigable
- [ ] Screen reader friendly
- [ ] Reduced motion support

✅ PERFORMANCE:
- [ ] Images optimized
- [ ] Fonts limited
- [ ] Code split
- [ ] Lazy loading
- [ ] Animations GPU-friendly

✅ CONTENT:
- [ ] Clear headlines
- [ ] Scannable text
- [ ] Action-oriented CTAs
- [ ] Helpful error messages
- [ ] Consistent tone
```

## Quick Reference

### Do's ✅

```
✅ Use 8px grid system
✅ Maintain 4.5:1 contrast ratio
✅ 44px minimum touch targets
✅ Visible focus states
✅ Semantic HTML
✅ Alt text for images
✅ Loading states
✅ Error messages helpful
✅ Mobile-first approach
✅ Consistent spacing
```

### Don'ts ❌

```
❌ Color-only indicators
❌ Placeholder-only labels
❌ Hover-only interactions
❌ Auto-playing animations
❌ Text smaller than 14px
❌ Contrast below 4.5:1
❌ Generic error messages
❌ Missing focus states
❌ Inconsistent spacing
❌ Ignoring mobile users
```

## Implementation Template

```markdown
🎨 **Design dengan Best Practices:**

### Visual Hierarchy
- Headings: [Font, size, weight]
- Body: [Font, size, line-height]
- Spacing: 8px grid system

### Color System
- Primary: [Color + hex]
- Secondary: [Color + hex]
- Accent: [Color + hex]
- Contrast checked: ✅

### Accessibility
- Keyboard nav: ✅
- Screen reader: ✅
- Color contrast: ✅
- Focus states: ✅

### Responsive
- Mobile: ✅ (44px targets)
- Tablet: ✅ (2-col layout)
- Desktop: ✅ (full layout)

### Performance
- Images: WebP + lazy
- Fonts: WOFF2 + subset
- Code: Split + lazy
- Animations: GPU-accelerated

### Micro-interactions
- Hover: [Description]
- Focus: [Description]
- Loading: [Description]
- Success: [Description]
```
