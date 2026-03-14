---
name: material-kit-devias
description: Use when building Material-UI dashboards - premium Devias Kit React dashboard with modern components and professional layouts
---

# Material Kit Devias Premium - Professional React Dashboard

## Purpose

This skill provides expertise in using Devias Material Kit, a premium React dashboard template built with Material-UI, featuring professional components, modern layouts, and enterprise-grade features.

## When to Use

Use this skill when:
- Building professional dashboards
- Creating enterprise admin panels
- Using Material-UI components
- Developing SaaS applications
- Building analytics platforms
- Creating reporting systems

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 18+ |
| **UI Library** | Material-UI (MUI) v5 |
| **Styling** | Emotion, styled-components |
| **Charts** | ApexCharts |
| **Icons** | Material Icons, Phosphor |
| **Routing** | React Router v6 |
| **State** | React Context, Zustand |
| **Forms** | React Hook Form, Yup |

## Key Features

### Dashboard Features

| Feature | Description |
|---------|-------------|
| **Dashboard Views** | Multiple professional layouts |
| **Components** | 100+ MUI components |
| **Charts** | ApexCharts integration |
| **Tables** | Advanced data tables |
| **Forms** | Form validation |
| **Auth** | Authentication flows |
| **Themes** | Light/dark mode |
| **Responsive** | Mobile-first design |

### Professional Features

- 📊 **Analytics** - Revenue, users, orders
- 📈 **Charts** - Line, bar, area, pie
- 📋 **Data Grid** - Sorting, filtering, pagination
- 🎨 **Theming** - Custom themes, dark mode
- 🔐 **Auth** - JWT, OAuth support
- 📱 **Responsive** - All devices
- 🌐 **i18n** - Internationalization
- ♿ **Accessibility** - WCAG compliant

## Quick Start

```bash
# Clone and install
cd material-kit-devias
npm install

# Start development
npm run dev

# Build for production
npm run build
```

## Project Structure

```
material-kit-devias/
├── src/
│   ├── components/     # Reusable components
│   ├── layouts/        # Dashboard layouts
│   ├── pages/          # Page components
│   ├── theme/          # MUI theme config
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utilities
│   └── assets/         # Images, icons
└── package.json
```

## Component Examples

### Dashboard Stats

```jsx
import { Card, CardContent, Box, Typography } from '@mui/material';

function StatsCard({ title, value, change, icon }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h3">{value}</Typography>
            <Typography 
              color={change > 0 ? 'success.main' : 'error.main'}
            >
              {change > 0 ? '+' : ''}{change}%
            </Typography>
          </Box>
          <Box>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );
}
```

### Data Table

```jsx
import { DataGrid } from '@mui/x-data-grid';

function UsersTable({ rows, columns }) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pagination
      pageSize={10}
      rowsPerPageOptions={[10, 25, 50]}
      sortingOrder={['desc', 'asc']}
      disableSelectionOnClick
    />
  );
}
```

## For AI Assistants

When helping with Material-UI projects:

1. **Understand MUI** - Component API patterns
2. **Theme customization** - Create theme object
3. **Responsive design** - Use sx prop breakpoints
4. **Accessibility** - ARIA labels, focus management
5. **Performance** - Memo components, virtualization

## Best Practices

- **MUI System** - Use sx prop for styling
- **Theme provider** - Centralize theme config
- **Component composition** - Small, reusable components
- **TypeScript** - Full type support
- **Testing** - React Testing Library

## Related Skills

- `argon-dashboard-premium` - Alternative dashboard
- `now-ui-dashboard-premium` - Colorful dashboard
- `saas-boilerplate-ixartz` - Full-stack SaaS

## Repository Location

`C:\Users\user\.qwen\skills\material-kit-devias`

## Source

https://github.com/devias-io/material-kit-react

## Demo

https://material-kit-react.devias.io/

---

**Note:** Devias Material Kit is a professional, enterprise-grade dashboard template. Built with Material-UI v5, it provides everything needed for modern admin applications.
