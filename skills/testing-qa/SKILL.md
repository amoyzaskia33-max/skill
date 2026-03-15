# 🧪 Testing & QA

## Purpose

Comprehensive testing strategies untuk ensure code quality - unit tests, integration tests, E2E tests, visual regression, dan accessibility testing.

## Level: ⭐⭐⭐ Expert

---

## 1. **Unit Testing dengan Jest & React Testing Library** 🧪

### A. Testing Components

```tsx
// Expert pattern: Test React components properly
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  const mockOnSubmit = vi.fn();
  
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });
  
  it('renders correctly', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
  
  it('calls onSubmit with correct data', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
  
  it('shows validation errors', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
  
  it('disables button while loading', async () => {
    const user = userEvent.setup();
    render(
      <LoginForm onSubmit={async () => await new Promise(resolve => setTimeout(resolve, 1000))} />
    );
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
  });
});
```

---

### B. Testing Custom Hooks

```tsx
// Expert pattern: Test custom hooks in isolation
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useFetch } from './useFetch';

// Mock fetch
global.fetch = vi.fn();

describe('useFetch', () => {
  it('fetches data successfully', async () => {
    const mockData = { name: 'Test' };
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });
    
    const { result } = renderHook(() => useFetch('/api/test'));
    
    // Initial state
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    
    // Wait for fetch to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Final state
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });
  
  it('handles errors', async () => {
    (fetch as any).mockRejectedValueOnce(new Error('Network error'));
    
    const { result } = renderHook(() => useFetch('/api/test'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(new Error('Network error'));
  });
  
  it('refetches when URL changes', async () => {
    const mockData1 = { id: 1 };
    const mockData2 = { id: 2 };
    
    (fetch as any)
      .mockResolvedValueOnce({ ok: true, json: async () => mockData1 })
      .mockResolvedValueOnce({ ok: true, json: async () => mockData2 });
    
    const { result, rerender } = renderHook(
      ({ url }) => useFetch(url),
      { initialProps: { url: '/api/test1' } }
    );
    
    await waitFor(() => {
      expect(result.current.data).toEqual(mockData1);
    });
    
    // Change URL
    rerender({ url: '/api/test2' });
    
    await waitFor(() => {
      expect(result.current.data).toEqual(mockData2);
    });
  });
});
```

---

## 2. **Integration Testing** 🔗

### A. Testing API Integration

```tsx
// Expert pattern: Test with MSW (Mock Service Worker)
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { UserList } from './UserList';

// Mock server
const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ])
    );
  }),
  
  rest.post('/api/users', async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.json({ id: 3, ...body }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserList Integration', () => {
  it('fetches and displays users', async () => {
    render(<UserList />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });
  });
  
  it('adds new user', async () => {
    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });
    
    // Add user
    fireEvent.click(screen.getByRole('button', { name: /add user/i }));
    
    await waitFor(() => {
      expect(screen.getByText('New User')).toBeInTheDocument();
    });
  });
  
  it('handles API errors gracefully', async () => {
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Server error' }));
      })
    );
    
    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading users/i)).toBeInTheDocument();
    });
  });
});
```

---

### B. Testing with Real Database

```typescript
// Expert pattern: Integration tests with test database
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { createUser, getUser, deleteUser } from '../user.service';

const prisma = new PrismaClient();

describe('User Service Integration', () => {
  const testEmail = 'test@example.com';
  
  beforeAll(async () => {
    // Clean up test database
    await prisma.user.deleteMany({ where: { email: testEmail } });
  });
  
  afterAll(async () => {
    // Cleanup
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.$disconnect();
  });
  
  it('creates a user', async () => {
    const user = await createUser({
      email: testEmail,
      name: 'Test User',
      password: 'password123',
    });
    
    expect(user.email).toBe(testEmail);
    expect(user.name).toBe('Test User');
    expect(user.id).toBeDefined();
  });
  
  it('gets a user by ID', async () => {
    const created = await createUser({
      email: testEmail,
      name: 'Test User',
      password: 'password123',
    });
    
    const user = await getUser(created.id);
    
    expect(user?.email).toBe(testEmail);
    expect(user?.name).toBe('Test User');
  });
  
  it('deletes a user', async () => {
    const created = await createUser({
      email: testEmail,
      name: 'Test User',
      password: 'password123',
    });
    
    await deleteUser(created.id);
    
    const user = await getUser(created.id);
    expect(user).toBeNull();
  });
});
```

---

## 3. **E2E Testing dengan Playwright** 🎭

### A. Basic E2E Tests

```typescript
// Expert pattern: Playwright E2E tests
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('user can register and login', async ({ page }) => {
    // Go to homepage
    await page.goto('/');
    
    // Navigate to register
    await page.click('text=Sign Up');
    await expect(page).toHaveURL('/register');
    
    // Fill registration form
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.fill('[name="confirmPassword"]', 'password123');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Wait for redirect
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');
    
    // Logout
    await page.click('text=Logout');
    await expect(page).toHaveURL('/');
  });
  
  test('login with invalid credentials shows error', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[name="email"]', 'wrong@example.com');
    await page.fill('[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('.error')).toBeVisible();
    await expect(page.locator('.error')).toContainText('Invalid credentials');
  });
});
```

---

### B. Visual Regression Testing

```typescript
// Expert pattern: Screenshot comparison
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('homepage looks correct', async ({ page }) => {
    await page.goto('/');
    
    // Take screenshot
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixels: 100, // Allow small differences
    });
  });
  
  test('dashboard looks correct', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Wait for animations to complete
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('dashboard.png');
  });
  
  test('component states', async ({ page }) => {
    await page.goto('/components');
    
    // Default state
    await expect(page.locator('.button')).toHaveScreenshot('button-default.png');
    
    // Hover state
    await page.locator('.button').hover();
    await expect(page.locator('.button')).toHaveScreenshot('button-hover.png');
    
    // Disabled state
    await page.locator('.button').evaluate(el => el.setAttribute('disabled', 'true'));
    await expect(page.locator('.button')).toHaveScreenshot('button-disabled.png');
  });
});
```

---

### C. Mobile Testing

```typescript
// Expert pattern: Test on multiple devices
import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Responsiveness', () => {
  test('works on iPhone', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 13 Pro'],
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Check mobile menu
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    
    await context.close();
  });
  
  test('works on Android', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['Pixel 5'],
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Check touch interactions
    await page.tap('[data-testid="cta-button"]');
    await expect(page).toHaveURL('/signup');
    
    await context.close();
  });
  
  test('works on iPad', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPad Pro'],
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Tablet should show desktop layout
    await expect(page.locator('[data-testid="desktop-nav"]')).toBeVisible();
    
    await context.close();
  });
});
```

---

## 4. **Accessibility Testing** ♿

### A. Automated A11y Tests

```typescript
// Expert pattern: Accessibility testing with axe-core
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
  
  test('dashboard should meet WCAG AA', async ({ page }) => {
    await page.goto('/dashboard');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
  
  test('forms should be accessible', async ({ page }) => {
    await page.goto('/register');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('form')
      .analyze();
    
    // Check for specific rules
    const violations = accessibilityScanResults.violations.filter(
      v => !['color-contrast'].includes(v.id) // Exclude if needed
    );
    
    expect(violations).toEqual([]);
  });
});
```

---

### B. Keyboard Navigation Testing

```typescript
// Expert pattern: Test keyboard navigation
import { test, expect } from '@playwright/test';

test.describe('Keyboard Navigation', () => {
  test('can navigate with Tab', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('data-testid', 'nav-home');
    
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('data-testid', 'nav-about');
    
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('data-testid', 'nav-contact');
  });
  
  test('can open menu with Enter', async ({ page }) => {
    await page.goto('/');
    
    await page.keyboard.press('Tab'); // Focus menu button
    await page.keyboard.press('Enter');
    
    await expect(page.locator('[data-testid="dropdown-menu"]')).toBeVisible();
  });
  
  test('can close modal with Escape', async ({ page }) => {
    await page.goto('/');
    
    await page.click('[data-testid="open-modal"]');
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
  });
  
  test('skip link works', async ({ page }) => {
    await page.goto('/');
    
    // Press Tab to show skip link
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="skip-link"]')).toBeFocused();
    
    // Press Enter to skip
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-testid="main-content"]')).toBeFocused();
  });
});
```

---

## 5. **Performance Testing** ⚡

### A. Lighthouse CI Integration

```typescript
// Expert pattern: Lighthouse performance tests
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('homepage meets performance budget', async ({ page }) => {
    const response = await page.goto('/');
    
    // Get performance metrics
    const metrics = await response?.request().response()?.headers();
    const timing = response?.request().timing();
    
    // Time to First Byte
    expect(timing?.waitForResponse).toBeLessThan(500);
    
    // First Contentful Paint (via Performance API)
    const fcp = await page.evaluate(() => {
      const entries = performance.getEntriesByType('paint');
      const fcp = entries.find(e => e.name === 'first-contentful-paint');
      return fcp?.startTime;
    });
    
    expect(fcp).toBeLessThan(1500);
  });
});
```

---

## Response Template

```markdown
🧪 **Testing & QA - Expert Level**

Features:
- Unit tests (Jest/Vitest)
- Integration tests (MSW)
- E2E tests (Playwright)
- Visual regression testing
- Accessibility testing (axe-core)
- Performance testing (Lighthouse)

Coverage:
- Components: 90%+
- Hooks: 100%
- Services: 80%+
- E2E critical paths: 100%

Tools:
- Vitest/Jest
- React Testing Library
- Playwright
- MSW (Mock Service Worker)
- axe-core
- Lighthouse CI

Integration Time: 2-3 weeks
Complexity: ⭐⭐⭐ Expert
```

---

## Testing Checklist

```
✅ Unit tests for all components
✅ Unit tests for all hooks
✅ Integration tests for API calls
✅ E2E tests for critical user flows
✅ Visual regression tests for key pages
✅ Accessibility tests (WCAG AA)
✅ Performance tests (Core Web Vitals)
✅ Mobile responsiveness tests
✅ Cross-browser tests
✅ Keyboard navigation tests
```

---

**Last Updated:** Maret 2026
**Level:** Expert
**Integration Time:** 2-3 weeks
