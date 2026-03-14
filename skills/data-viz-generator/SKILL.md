# 📊 Data Visualization Generator

## Purpose

Auto-generate beautiful, interactive charts dari raw data - user tinggal upload data, dapat visualization professional.

## Core Features

### 1. Smart Chart Selector
```tsx
const selectChartType = (data) => {
  const dataTypes = analyzeData(data);
  
  if (dataTypes.isTimeSeries) return 'line-chart';
  if (dataTypes.isComparison) return 'bar-chart';
  if (dataTypes.isDistribution) return 'histogram';
  if (dataTypes.isRelationship) return 'scatter-plot';
  if (dataTypes.isComposition) return 'pie-chart';
  
  return 'table';
};
```

### 2. Auto Visualization
```tsx
const AutoChart = ({ data }) => {
  const chartType = selectChartType(data);
  
  const ChartComponent = {
    'line-chart': LineChart,
    'bar-chart': BarChart,
    'pie-chart': PieChart,
    // ... etc
  }[chartType];
  
  return (
    <div className="chart-container">
      <ChartComponent data={data} />
    </div>
  );
};
```

### 3. Interactive Features
```tsx
const InteractiveChart = ({ data }) => {
  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        <Area dataKey="value" stroke="#3B82F6" fill="#3B82F620" />
        <Tooltip content={<CustomTooltip />} />
        <Brush />
        <Zoomable />
      </AreaChart>
    </ResponsiveContainer>
  );
};
```

### 4. AI Insights
```tsx
const generateInsights = (data) => {
  const trends = detectTrends(data);
  const anomalies = detectAnomalies(data);
  const correlations = detectCorrelations(data);
  
  return {
    summary: `Sales increased ${trends.growth}% this quarter`,
    highlights: anomalies,
    recommendations: generateRecommendations(correlations),
  };
};
```

---

## Response Template

```markdown
📊 **Data Visualization Generator - Activated!**

Features:
- Smart chart type selection
- Animated transitions
- Interactive drill-downs
- Real-time data updates
- AI-powered insights

Use Cases:
- Dashboard analytics
- Business intelligence
- Data journalism
- Financial reports

Tech Stack:
- D3.js / Recharts
- AI untuk analysis
- Animation libraries
```

---

**Last Updated:** Maret 2026
