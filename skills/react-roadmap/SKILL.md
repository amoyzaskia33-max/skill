---
name: react-roadmap
description: Use when learning React development - comprehensive roadmap and resources for becoming a React developer
---

# React Developer Roadmap Skill

## Purpose

This skill provides a structured learning path for becoming a proficient React developer, covering fundamentals, advanced concepts, and the React ecosystem.

## When to Use

Use this skill when:
- Starting to learn React
- Planning React learning path
- Identifying React skill gaps
- Finding React learning resources
- Understanding React ecosystem
- Preparing for React interviews

## Learning Path

### Phase 1: React Fundamentals (2-3 weeks)

| Topic | Concepts |
|-------|----------|
| **JSX** | Syntax, expressions, rendering |
| **Components** | Functional components, props |
| **State** | useState, state updates |
| **Events** | Event handling, synthetic events |
| **Conditional Rendering** | Ternary, &&, switch |
| **Lists & Keys** | Mapping, unique keys |

### Phase 2: Core React (3-4 weeks)

| Topic | Concepts |
|-------|----------|
| **Hooks** | useEffect, useContext, useReducer |
| **Custom Hooks** | Reusable logic extraction |
| **Forms** | Controlled/uncontrolled, validation |
| **Refs** | useRef, DOM access |
| **Context API** | Global state, providers |
| **Performance** | useMemo, useCallback, React.memo |

### Phase 3: Advanced React (4-6 weeks)

| Topic | Concepts |
|-------|----------|
| **Advanced Hooks** | useLayoutEffect, useImperativeHandle |
| **Error Boundaries** | Error handling, fallbacks |
| **Portals** | Rendering outside DOM hierarchy |
| **Suspense & Lazy** | Code splitting, loading states |
| **Higher-Order Components** | Component composition |
| **Render Props** | Component logic sharing |

### Phase 4: React Ecosystem (4-6 weeks)

| Topic | Technologies |
|-------|-------------|
| **Routing** | React Router v6+ |
| **State Management** | Redux Toolkit, Zustand, Jotai |
| **Data Fetching** | React Query, SWR, Axios |
| **Styling** | Tailwind, Styled-components, CSS Modules |
| **Testing** | Jest, React Testing Library, Cypress |
| **TypeScript** | Types for props, hooks, events |

### Phase 5: Next.js & SSR (4-6 weeks)

| Topic | Concepts |
|-------|----------|
| **Next.js Basics** | Pages, routing, layouts |
| **Data Fetching** | getStaticProps, getServerSideProps |
| **API Routes** | Backend in Next.js |
| **App Router** | Server components, streaming |
| **Deployment** | Vercel, optimization |

## For AI Assistants

When helping with React learning:

1. **Assess level** - Beginner or experienced with other frameworks?
2. **Start with fundamentals** - Components, props, state
3. **Practice with projects** - Build real applications
4. **Explain concepts** - Why, not just how
5. **Debug together** - Common React patterns and pitfalls

## Project Ideas

### Beginner
- Todo list app
- Weather dashboard
- Recipe finder
- Movie search app

### Intermediate
- E-commerce cart
- Social media feed
- Dashboard with charts
- Real-time chat

### Advanced
- Full-stack marketplace
- Collaborative whiteboard
- Video streaming app
- SaaS application

## Common Patterns

```jsx
// Custom Hook
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}

// Component Pattern
function Component({ data, isLoading, error }) {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  return <DataDisplay data={data} />;
}
```

## Best Practices

- **Keep components small** - Single responsibility
- **Use TypeScript** - Type safety
- **Test components** - Unit and integration tests
- **Optimize wisely** - Profile before optimizing
- **Follow conventions** - React community standards

## Related Skills

- `developer-folio` - React portfolio template
- `gsap-animations-website` - React animations
- `awesome-python` - Full-stack with Python backend

## Repository Location

`C:\Users\user\.qwen\skills\react-roadmap`

## Source

https://github.com/adam-golab/react-developer-roadmap

---

**Note:** React is constantly evolving. Stay updated with the official React documentation and community resources.
