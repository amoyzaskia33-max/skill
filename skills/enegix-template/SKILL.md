---
name: enegix-template
description: Use when building multipurpose business/finance/consulting agency websites with modern HTML templates, responsive layouts, and professional corporate designs
---

# Enegix Template Skill - Multipurpose Business Website Template

## Purpose

This skill provides a comprehensive HTML template for building professional multipurpose websites for business, finance, consulting agencies, and corporate entities with modern design patterns and responsive layouts.

## When to Use

Use this skill when:
- Building corporate/business websites
- Creating finance or consulting agency sites
- Needing professional HTML templates
- Implementing responsive business layouts
- Designing service showcase pages
- Building multi-page corporate sites

## Template Features

### Pages Included

| Page | Description |
|------|-------------|
| **Home Pages** | 4 different homepage variations |
| **About** | Company information, team, alumni |
| **Services** | Service listings and details |
| **Blog** | Two-column and three-column layouts |
| **Blog Detail** | Single post template |
| **Contact** | Contact form and information |
| **News** | News listing pages |
| **Registration** | User registration page |
| **Login** | User login page |
| **Blank Page** | Template for custom pages |

### Technical Features

- **HTML5 & CSS3** - Modern semantic markup
- **Responsive Design** - Mobile, tablet, desktop optimized
- **JavaScript** - Interactive functionality
- **Web Fonts** - Custom typography
- **Image Gallery** - Responsive image handling
- **Contact Forms** - Ready-to-use forms

## Project Structure

```
enegix-template/
├── enegix/
│   ├── css/           # Stylesheets
│   ├── js/            # JavaScript files
│   ├── images/        # Image assets
│   ├── webfonts/      # Custom fonts
│   ├── index.html     # Main homepage
│   ├── index_2.html   # Homepage variant 2
│   ├── index_3.html   # Homepage variant 3
│   ├── index_4.html   # Homepage variant 4
│   ├── about.html     # About page
│   ├── services.html  # Services page
│   ├── blog_page.html # Blog listing
│   ├── blog_detail.html # Single blog post
│   ├── contact.html   # Contact page
│   ├── alumni.html    # Alumni page
│   ├── news_*.html    # News pages
│   ├── login_page.html    # Login
│   ├── registration_page.html # Registration
│   └── blankpage.html # Template page
└── documentation/     # Template documentation
```

## Implementation Guide

### 1. Basic Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Business Page</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">...</header>
    
    <!-- Main Content -->
    <main class="main">...</main>
    
    <!-- Footer -->
    <footer class="footer">...</footer>
    
    <script src="js/main.js"></script>
</body>
</html>
```

### 2. Responsive Grid

```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
}

.col {
    flex: 1;
    padding: 0 15px;
}
```

### 3. Navigation

```html
<nav class="navbar">
    <div class="logo">Enegix</div>
    <ul class="nav-menu">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="blog_page.html">Blog</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

## For AI Assistants

When helping build business websites:

1. **Understand the business** - Finance, consulting, agency?
2. **Choose homepage variant** - Select from 4 options
3. **Customize branding** - Logo, colors, fonts
4. **Configure pages** - Select needed pages
5. **Setup contact forms** - Configure form handlers

## Customization Guide

### Colors

```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #333333;
    --accent-color: #ff6600;
    --text-color: #333333;
    --bg-color: #ffffff;
}
```

### Typography

```css
body {
    font-family: 'Custom Font', sans-serif;
    font-size: 16px;
    line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    margin-bottom: 1rem;
}
```

## Best Practices

- **Professional Design** - Clean, corporate aesthetic
- **Mobile First** - Responsive on all devices
- **Fast Loading** - Optimized images and assets
- **SEO Ready** - Semantic HTML structure
- **Accessible** - WCAG compliance

## Related Skills

- `dms-tech-lab` - For Next.js corporate sites
- `portfolio-tejas1996p` - For creative portfolios
- `ux-resource` - For UI/UX principles

## Repository Location

`C:\Users\user\.qwen\skills\enegix-template`

## Documentation

See `documentation/` folder for detailed template documentation.

## Source

ThemeForest - Enegix Multipurpose Business Finance Consulting Agency Web Template

---

**Note:** This template provides a solid foundation for professional business websites with multiple page layouts and responsive design out of the box.
