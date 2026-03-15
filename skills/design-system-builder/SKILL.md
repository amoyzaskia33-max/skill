# 🎨 Design System Builder

## Purpose

Membangun scalable design system dengan component library, design tokens, documentation, dan version control untuk consistency across products.

## Level: ⭐⭐⭐ Expert

---

## 1. **Design Tokens** 🎯

### A. Token Configuration

```typescript
// Expert pattern: Multi-platform design tokens
// tokens.config.ts

export const tokens = {
  // Colors
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Primary
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    
    semantic: {
      background: {
        primary: '{colors.white}',
        secondary: '{colors.gray.50}',
        tertiary: '{colors.gray.100}',
        inverse: '{colors.gray.900}',
      },
      foreground: {
        primary: '{colors.gray.900}',
        secondary: '{colors.gray.600}',
        tertiary: '{colors.gray.500}',
        inverse: '{colors.white}',
      },
      interactive: {
        primary: '{colors.primary.500}',
        primaryHover: '{colors.primary.600}',
        primaryActive: '{colors.primary.700}',
      },
      status: {
        success: '{colors.green.500}',
        warning: '{colors.yellow.500}',
        error: '{colors.red.500}',
        info: '{colors.blue.500}',
      },
    },
  },
  
  // Typography
  typography: {
    fontFamily: {
      base: 'Inter, system-ui, sans-serif',
      mono: 'Fira Code, monospace',
      heading: 'Inter, system-ui, sans-serif',
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Animation
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};

export type Tokens = typeof tokens;
```

---

### B. Token Provider

```tsx
// Expert pattern: CSS Variables from tokens
import { tokens } from './tokens.config';

export const TokenProvider = ({ children }) => {
  return (
    <div className="token-provider">
      <style jsx global>{`
        :root {
          // Colors
          --color-primary-50: ${tokens.colors.primary[50]};
          --color-primary-500: ${tokens.colors.primary[500]};
          --color-primary-600: ${tokens.colors.primary[600]};
          
          // Semantic colors
          --background-primary: ${tokens.colors.semantic.background.primary};
          --background-secondary: ${tokens.colors.semantic.background.secondary};
          --foreground-primary: ${tokens.colors.semantic.foreground.primary};
          --interactive-primary: ${tokens.colors.semantic.interactive.primary};
          
          // Typography
          --font-family-base: ${tokens.typography.fontFamily.base};
          --font-size-xs: ${tokens.typography.fontSize.xs};
          --font-size-sm: ${tokens.typography.fontSize.sm};
          --font-size-base: ${tokens.typography.fontSize.base};
          --font-size-lg: ${tokens.typography.fontSize.lg};
          
          // Spacing
          --spacing-xs: ${tokens.spacing.xs};
          --spacing-sm: ${tokens.spacing.sm};
          --spacing-md: ${tokens.spacing.md};
          --spacing-lg: ${tokens.spacing.lg};
          
          // Border radius
          --radius-sm: ${tokens.borderRadius.sm};
          --radius-md: ${tokens.borderRadius.md};
          --radius-lg: ${tokens.borderRadius.lg};
          
          // Shadows
          --shadow-sm: ${tokens.shadows.sm};
          --shadow-md: ${tokens.shadows.md};
          --shadow-lg: ${tokens.shadows.lg};
          
          // Animation
          --duration-fast: ${tokens.animation.duration.fast};
          --duration-normal: ${tokens.animation.duration.normal};
          --ease-in-out: ${tokens.animation.easing.easeInOut};
        }
        
        // Dark mode
        .dark {
          --background-primary: ${tokens.colors.gray[900]};
          --background-secondary: ${tokens.colors.gray[800]};
          --foreground-primary: ${tokens.colors.gray[100]};
        }
      `}</style>
      {children}
    </div>
  );
};

// Usage with CSS variables
export const Button = ({ variant = 'primary', children }) => {
  const variants = {
    primary: `
      background-color: var(--interactive-primary);
      color: white;
    `,
    secondary: `
      background-color: var(--background-secondary);
      color: var(--foreground-primary);
    `,
  };
  
  return (
    <button
      className={`
        px-4 py-2 rounded-md
        font-medium
        transition-all
        duration-[var(--duration-normal)]
        ease-[var(--ease-in-out)]
        hover:shadow-[var(--shadow-md)]
        ${variants[variant]}
      `}
    >
      {children}
    </button>
  );
};
```

---

## 2. **Component Library** 🧩

### A. Base Component with Variants

```tsx
// Expert pattern: Polymorphic components with variants
import { forwardRef, ElementType, ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

// Button variants
const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      },
      size: {
        xs: 'px-2 py-1 text-xs rounded',
        sm: 'px-3 py-1.5 text-sm rounded-md',
        md: 'px-4 py-2 text-base rounded-md',
        lg: 'px-6 py-3 text-lg rounded-lg',
        xl: 'px-8 py-4 text-xl rounded-xl',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
      loading: {
        true: 'opacity-70 cursor-wait',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      disabled: false,
      loading: false,
    },
  }
);

interface ButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  as?: ElementType;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      disabled,
      loading,
      as: Component = 'button',
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={twMerge(buttonVariants({ variant, size, disabled, loading, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Component>
    );
  }
);

Button.displayName = 'Button';

// Usage
<Button variant="primary" size="lg" leftIcon={<PlusIcon />}>
  Add Item
</Button>

<Button variant="outline" size="md" loading>
  Loading...
</Button>
```

---

### B. Compound Components

```tsx
// Expert pattern: Compound component pattern
import { createContext, useContext, forwardRef, ReactNode } from 'react';

// Card Context
interface CardContext {
  variant: 'elevated' | 'outlined' | 'filled';
  size: 'sm' | 'md' | 'lg';
}

const CardContext = createContext<CardContext | undefined>(undefined);

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevated', size = 'md', className, children, ...props }, ref) => {
    return (
      <CardContext.Provider value={{ variant, size }}>
        <div
          ref={ref}
          className={twMerge(
            'rounded-lg transition-shadow',
            variants[variant],
            sizes[size],
            className
          )}
          {...props}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  }
);

const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(CardContext);
    
    return (
      <div
        ref={ref}
        className={twMerge(
          'px-6 py-4 border-b',
          context?.variant === 'outlined' ? 'border-gray-200' : 'border-gray-100',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const CardBody = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge('px-6 py-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(CardContext);
    
    return (
      <div
        ref={ref}
        className={twMerge(
          'px-6 py-4 border-t bg-gray-50',
          context?.variant === 'outlined' ? 'border-gray-200' : 'border-gray-100',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Compound component export
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

// Usage
<Card variant="elevated" size="md">
  <Card.Header>
    <h3 className="text-lg font-semibold">Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here...</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

---

## 3. **Documentation System** 📚

### A. Storybook Setup

```typescript
// Expert pattern: Comprehensive Storybook configuration
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-storysource',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: true,
      },
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;

// Component story
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Buttons are used to trigger actions or navigate to new pages.
They come in different variants and sizes to match different contexts.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'The visual style of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
      table: {
        defaultValue: { summary: false },
      },
    },
    onClick: { action: 'clicked' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  args: {
    children: 'Add Item',
    variant: 'primary',
    leftIcon: <PlusIcon />,
    rightIcon: <ArrowRightIcon />,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    children: 'Loading...',
    variant: 'primary',
    loading: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'primary',
    disabled: true,
  },
};

// Accessibility story
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button variant="primary">Button 1</Button>
      <Button variant="secondary">Button 2</Button>
      <Button variant="outline">Button 3</Button>
      <p className="text-sm text-gray-500">
        Press Tab to navigate between buttons. Press Enter or Space to activate.
      </p>
    </div>
  ),
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
};
```

---

### B. MDX Documentation

```mdx
{/* Button.mdx */}
import { Canvas, Meta, Story, ArgTypes } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

Buttons are interactive elements used to trigger actions or navigate to new pages.

## Usage

```tsx
import { Button } from '@myorg/ui';

<Button variant="primary">Click me</Button>
```

## Variants

<Canvas of={ButtonStories.AllVariants} />

## Sizes

<Canvas of={ButtonStories.AllSizes} />

## States

### Default
<Canvas of={ButtonStories.Primary} />

### Loading
<Canvas of={ButtonStories.Loading} />

### Disabled
<Canvas of={ButtonStories.Disabled} />

## With Icons

<Canvas of={ButtonStories.WithIcons} />

## Props

<ArgTypes />

## Accessibility

### Keyboard Navigation
- `Tab` - Focus next button
- `Enter` or `Space` - Activate button
- `Escape` - Cancel action (if applicable)

### Screen Readers
- Buttons announce their label
- Loading state announced as "Loading"
- Disabled state announced as "Disabled"

### Best Practices
- Use descriptive labels
- Don't use "Click here"
- Include icons with `aria-label` when text is not descriptive

## Design Tokens

| Token | Value | Description |
|-------|-------|-------------|
| `--interactive-primary` | `#3B82F6` | Primary button background |
| `--duration-normal` | `300ms` | Hover transition duration |
| `--radius-md` | `0.375rem` | Default border radius |

## Related Components
- [Link](/docs/components-link)
- [IconButton](/docs/components-icon-button)
- [ButtonGroup](/docs/components-button-group)
```

---

## 4. **Version Control & Distribution** 📦

### A. Package Configuration

```json
{
  "name": "@myorg/ui",
  "version": "1.0.0",
  "description": "MyOrg Design System Component Library",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles.css": "./dist/styles.css",
    "./tokens": "./dist/tokens.js"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "test": "vitest",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "release": "changeset publish"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "devDependencies": {
    "@changesets/cli": "^2.26.0",
    "tsup": "^7.0.0",
    "vitest": "^0.34.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

---

### B. Changesets for Versioning

```markdown
<!-- .changeset/happy-dogs-jump.md -->
---
'@myorg/ui': minor
---

Added new `Button` component with variants and sizes support.

### Features
- 5 variants (primary, secondary, outline, ghost, danger)
- 5 sizes (xs, sm, md, lg, xl)
- Loading state with spinner
- Icon support (left and right)
- Full accessibility support

### Breaking Changes
None

### Migration Guide
No migration needed. This is a new component.
```

---

## Response Template

```markdown
🎨 **Design System Builder - Expert Level**

Features:
- Design tokens (colors, typography, spacing)
- Component library with variants
- Compound components
- Storybook documentation
- MDX docs
- Version control with Changesets
- Multi-platform support

Benefits:
- Consistency across products
- Faster development
- Better collaboration
- Single source of truth
- Easy maintenance

Tools:
- Storybook
- Tailwind CSS
- class-variance-authority
- Changesets
- tsup
- Vitest

Integration Time: 4-6 weeks
Complexity: ⭐⭐⭐ Expert
```

---

**Last Updated:** Maret 2026
**Level:** Expert
**Integration Time:** 4-6 weeks
