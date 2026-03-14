# 🎨 Style Transfer UI

## Purpose

Apply art styles ke UI components - satu click bisa ubah entire app jadi Van Gogh style, anime style, dll.

## Core Features

### 1. Pre-Made Styles
```tsx
const artStyles = {
  'van-gogh': {
    name: 'Van Gogh',
    colors: { primary: '#FDB813', secondary: '#1E3A8A' },
    borderRadius: '0px',
    patterns: 'swirling',
    css: {
      filter: 'contrast(1.2) saturate(1.5)',
      backgroundImage: 'url(/patterns/swirls.svg)',
    },
  },
  'anime': {
    name: 'Anime',
    colors: { primary: '#FF6B9D', secondary: '#00BFFF' },
    borderRadius: '16px',
    patterns: 'speed-lines',
  },
  'cyberpunk': {
    name: 'Cyberpunk',
    colors: { primary: '#FF00FF', secondary: '#00FFFF' },
    borderRadius: '4px',
    patterns: 'neon-grid',
  },
  'minimalist': {
    name: 'Minimalist',
    colors: { primary: '#000000', secondary: '#FFFFFF' },
    borderRadius: '0px',
    patterns: 'none',
  },
};
```

### 2. Style Applier
```tsx
const useStyleTransfer = (styleName) => {
  const style = artStyles[styleName];
  
  useEffect(() => {
    // Apply CSS variables
    document.documentElement.style.setProperty('--primary', style.colors.primary);
    document.documentElement.style.setProperty('--secondary', style.colors.secondary);
    document.documentElement.style.setProperty('--border-radius', style.borderRadius);
    
    // Apply filters
    document.body.style.filter = style.css?.filter || '';
  }, [styleName]);
  
  return style;
};
```

### 3. Style Intensity Slider
```tsx
const StyleIntensity = ({ value, onChange }) => {
  return (
    <div>
      <label>Style Intensity: {value}%</label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </div>
  );
};
```

---

## Response Template

```markdown
🎨 **Style Transfer UI - Activated!**

Features:
- Pre-made styles (Van Gogh, Anime, Cyberpunk)
- Custom style training
- Component-level control
- Style intensity slider
- Export style presets

Use Cases:
- Themed campaigns
- Brand refreshes
- A/B testing aesthetics
- Personalization

Tech Stack:
- Neural style transfer
- CSS variable manipulation
- AI image processing
```

---

**Last Updated:** Maret 2026
