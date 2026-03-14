---
name: now-ui-dashboard-premium
description: Use when building colorful admin dashboards - premium Now UI Design React dashboard with vibrant components and modern layouts
---

# Now UI Dashboard Premium - Colorful React Admin Template

## Purpose

This skill provides expertise in using Now UI Dashboard, a premium React admin template based on Now UI Design System, featuring colorful UI components, modern layouts, and essential dashboard functionality.

## When to Use

Use this skill when:
- Building colorful admin dashboards
- Creating modern admin panels
- Need vibrant UI design
- Building analytics dashboards
- Developing management systems
- Creating reporting interfaces

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 18+ |
| **UI Library** | Now UI Design System |
| **Styling** | SCSS, CSS |
| **Charts** | Chart.js |
| **Icons** | Font Awesome |
| **Routing** | React Router |
| **State** | React Context |

## Key Features

### Dashboard Features

| Feature | Description |
|---------|-------------|
| **Dashboard Views** | Multiple colorful layouts |
| **Components** | 60+ UI components |
| **Charts** | Interactive charts |
| **Maps** | Google Maps integration |
| **Tables** | Responsive tables |
| **Forms** | Form elements |
| **Pages** | User, pricing, lock pages |
| **Responsive** | Mobile-optimized |

### UI Components

- 📊 **Dashboard** - Stats, metrics, KPIs
- 📈 **Charts** - Line, bar, pie charts
- 📋 **Tables** - Data tables with sorting
- 🎨 **Buttons** - Colored button styles
- 📝 **Forms** - Inputs, selects, validation
- 🔔 **Notifications** - Alert styles
- 🗂️ **Navigation** - Sidebar, navbar
- 📄 **Pages** - Login, register, pricing

## Quick Start

```bash
# Clone and install
cd now-ui-dashboard-premium
npm install

# Start development
npm start

# Build for production
npm run build
```

## Component Examples

### Colorful Stats Card

```jsx
function StatsCard({ color, title, value, icon }) {
  return (
    <div className={`card card-stats ${color}`}>
      <div className="icon">
        <i className={icon} />
      </div>
      <div className="content">
        <p className="category">{title}</p>
        <h3 className="title">{value}</h3>
      </div>
    </div>
  );
}

// Usage
<StatsCard 
  color="bg-gradient-blue"
  title="Users"
  value="1,234"
  icon="fas fa-users"
/>
```

### Interactive Chart

```jsx
import { Line } from 'react-chartjs-2';

function DashboardChart({ data, options }) {
  const gradient = ctx => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    return gradient;
  };

  return (
    <Line
      data={{
        ...data,
        datasets: [{
          ...data.datasets[0],
          backgroundColor: gradient,
          borderColor: '#ff0000',
          fill: true
        }]
      }}
      options={options}
    />
  );
}
```

## For AI Assistants

When helping with dashboard projects:

1. **Choose color scheme** - Vibrant or subtle?
2. **Layout planning** - Grid structure
3. **Data visualization** - Chart types
4. **Interactivity** - Filters, date ranges
5. **Export features** - PDF, Excel export

## Best Practices

- **Color consistency** - Use design system colors
- **Performance** - Optimize chart rendering
- **Responsive** - Test on all devices
- **Accessibility** - Color contrast ratios
- **Loading states** - Skeleton screens

## Related Skills

- `argon-dashboard-premium` - Alternative premium dashboard
- `material-kit-devias` - Material-UI dashboard
- `saas-boilerplate-ixartz` - Full-stack with dashboard

## Repository Location

`C:\Users\user\.qwen\skills\now-ui-dashboard-premium`

## Source

https://github.com/creativetimofficial/now-ui-dashboard-react

## Demo

https://demos.creative-tim.com/now-ui-dashboard-react/

---

**Note:** Now UI Dashboard offers a vibrant, colorful alternative to traditional admin templates. Perfect for modern dashboards that need visual impact.
