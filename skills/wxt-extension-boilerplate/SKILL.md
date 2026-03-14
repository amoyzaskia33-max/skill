---
name: wxt-extension-boilerplate
description: Use when building browser extensions - next-generation web extension framework with Vite, TypeScript, and multi-browser support
---

# WXT Extension Boilerplate - Modern Browser Extension Framework

## Purpose

This skill provides expertise in using WXT, a next-generation web extension framework that simplifies browser extension development with Vite, TypeScript, and support for Chrome, Firefox, Safari, and Edge.

## When to Use

Use this skill when:
- Building browser extensions
- Creating Chrome extensions
- Developing Firefox add-ons
- Need multi-browser support
- Using modern tooling (Vite)
- Building content scripts

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | WXT (Web Extension Tools) |
| **Build Tool** | Vite |
| **Language** | TypeScript |
| **Frontend** | React/Vue/Svelte/Vanilla |
| **Styling** | CSS, SCSS, Tailwind |
| **Testing** | Vitest, Playwright |
| **Publishing** | Chrome Web Store, AMO |

## Key Features

### Extension Features

| Feature | Description |
|---------|-------------|
| **Multi-Browser** | Chrome, Firefox, Safari, Edge |
| **TypeScript** | Full type safety |
| **Vite** | Fast HMR, optimized builds |
| **Auto-imports** | Automatic imports |
| **Content Scripts** | Easy content script setup |
| **Background** | Service worker support |
| **Popup** | Popup UI templates |
| **Options** | Options page support |

### Development Features

- ⚡ **Fast HMR** - Instant reloads
- 📦 **Auto-imports** - No manual imports
- 🔧 **TypeScript** - Type-safe development
- 🎨 **CSS Support** - Multiple CSS options
- 🧪 **Testing** - Built-in testing support
- 📱 **Multi-browser** - Build for all browsers
- 🚀 **Production builds** - Optimized bundles

## Quick Start

```bash
# Create new extension
npm create wxt@latest my-extension

# Or use existing boilerplate
cd wxt-extension-boilerplate
npm install

# Start development
npm run dev

# Build for production
npm run build

# Build for specific browser
npm run build:firefox
npm run build:chrome
```

## Project Structure

```
extension/
├── src/
│   ├── background/       # Background service worker
│   ├── content/          # Content scripts
│   ├── popup/            # Popup UI
│   ├── options/          # Options page
│   ├── public/           # Static assets
│   └── entrypoints/      # Custom entrypoints
├── wxt.config.ts         # WXT configuration
└── package.json
```

## Usage Examples

### Background Script

```typescript
// src/background/index.ts
export default defineBackground(() => {
  console.log('Background script loaded');
  
  browser.runtime.onMessage.addListener((message, sender) => {
    console.log('Message received:', message);
    return { response: 'Hello from background!' };
  });
});
```

### Content Script

```typescript
// src/content/index.ts
export default defineContentScript({
  matches: ['*://*.google.com/*'],
  
  main(ctx) {
    console.log('Content script loaded');
    
    const element = document.querySelector('#search');
    if (element) {
      element.style.border = '2px solid red';
    }
  }
});
```

### Popup

```tsx
// src/popup/index.tsx
export default function Popup() {
  return (
    <div className="popup">
      <h1>My Extension</h1>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}
```

### WXT Config

```typescript
// wxt.config.ts
import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    name: 'My Extension',
    description: 'Amazing browser extension',
    permissions: ['storage', 'tabs'],
  },
  browsers: ['chrome', 'firefox'],
});
```

## For AI Assistants

When helping with extension projects:

1. **Understand requirements** - What should extension do?
2. **Choose browsers** - Chrome only or multi-browser?
3. **Permissions** - Minimum required permissions
4. **Content scripts** - Which sites to inject?
5. **Storage** - Local vs sync storage

## Best Practices

- **Minimal permissions** - Request only what's needed
- **Performance** - Efficient content scripts
- **Security** - CSP, input validation
- **User privacy** - Respect user user data
- **Testing** - Test on all target browsers

## Related Skills

- `browser-use` - Browser automation
- `awesome-python` - Python extension modules
- `react-native-boilerplate` - Mobile alternative

## Repository Location

`C:\Users\user\.qwen\skills\wxt-extension-boilerplate`

## Source

https://github.com/wxt-dev/wxt

## Documentation

https://wxt.dev

---

**Note:** WXT is the modern way to build browser extensions. With Vite-powered development and TypeScript support, it makes extension development fast and type-safe.
