---
name: argon-dashboard-premium
description: Use when building admin dashboards - premium Argon Design System React dashboard with modern UI components and layouts
---

# Argon Dashboard Premium - React Admin Template

## Purpose

This skill provides expertise in using Argon Dashboard, a premium React admin template based on the Argon Design System, featuring beautiful UI components, responsive layouts, and essential dashboard features.

## When to Use

Use this skill when:
- Building admin dashboards
- Creating admin panels
- Need modern UI components
- Building SaaS admin interfaces
- Creating analytics dashboards
- Developing CRM/ERP systems

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 18+ |
| **UI Library** | Argon Design System |
| **Styling** | SCSS, CSS Modules |
| **Charts** | Chart.js |
| **Icons** | Font Awesome, Nucleo |
| **Routing** | React Router |
| **State** | React Context, Redux |

## Key Features

### Dashboard Features

| Feature | Description |
|---------|-------------|
| **Dashboard Views** | Multiple dashboard layouts |
| **Components** | 100+ UI components |
| **Charts** | Chart.js integration |
| **Maps** | Vector maps support |
| **Tables** | Data tables, sorting |
| **Forms** | Form validation |
| **Auth Pages** | Login, register, lock |
| **Responsive** | Mobile-friendly |

### UI Components

- 📊 **Analytics** - Charts, graphs, statistics
- 📋 **Tables** - Sortable, filterable tables
- 📝 **Forms** - Validation, inputs, selects
- 🔔 **Notifications** - Alerts, toasts
- 🗂️ **Navigation** - Sidebars, breadcrumbs
- 🎨 **Cards** - Stats cards, info cards
- 📅 **Calendar** - Event calendar
- 👥 **Users** - User management UI

## Quick Start

```bash
# Clone and install
cd argon-dashboard-premium
npm install

# Start development
npm start

# Build for production
npm run build
```

## Component Examples

### Stats Card

```jsx
import { Card, CardHeader, CardBody } from "@mui/material";

function StatsCard({ title, value, icon, trend }) {
  return (
    <Card>
      <CardBody>
        <div className="icon">{icon}</div>
        <h3>{title}</h3>
        <h2>{value}</h2>
        <span className={trend > 0 ? 'up' : 'down'}>
          {trend}% from last month
        </span>
      </CardBody>
    </Card>
  );
}
```

### Chart Component

```jsx
import { Line } from 'react-chartjs-2';

function RevenueChart({ data }) {
  return (
    <Line
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }}
    />
  );
}
```

## For AI Assistants

When helping with dashboard projects:

1. **Understand requirements** - What metrics to display?
2. **Choose layout** - Sidebar, top nav, or mixed?
3. **Data visualization** - Charts, tables, maps
4. **Real-time updates** - WebSocket integration
5. **Responsive design** - Mobile dashboard

## Best Practices

- **Performance** - Lazy load components
- **Data fetching** - React Query, SWR
- **State management** - Context or Redux
- **Accessibility** - ARIA labels, keyboard nav
- **Theming** - Dark/light mode support

## Related Skills

- `material-kit-devias` - Material-UI alternative
- `now-ui-dashboard-premium` - Another premium dashboard
- `saas-boilerplate-ixartz` - Full-stack SaaS with dashboard

## Repository Location

`C:\Users\user\.qwen\skills\argon-dashboard-premium`

## Source

https://github.com/creativetimofficial/argon-dashboard-react

## Demo

https://demos.creative-tim.com/argon-dashboard-react/

---

**Note:** Argon Dashboard provides a beautiful, modern admin interface with 100+ components. Perfect for SaaS admin panels, CRM systems, and analytics dashboards.
