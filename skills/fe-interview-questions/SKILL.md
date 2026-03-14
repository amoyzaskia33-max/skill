---
name: fe-interview-questions
description: Use when preparing for front-end developer interviews - comprehensive collection of interview questions covering HTML, CSS, JavaScript, and web development
---

# Front-End Developer Interview Questions Skill

## Purpose

This skill provides a comprehensive collection of front-end developer interview questions and answers covering HTML, CSS, JavaScript, and modern web development topics.

## When to Use

Use this skill when:
- Preparing for front-end developer interviews
- Reviewing web development fundamentals
- Creating interview question banks
- Studying HTML, CSS, JavaScript concepts
- Understanding browser behavior
- Learning best practices

## Topic Categories

### HTML & Markup

- Semantic HTML
- Forms and validation
- Accessibility (a11y)
- SEO fundamentals
- DOM structure

### CSS & Styling

- Selectors and specificity
- Box model
- Flexbox and Grid
- Responsive design
- CSS architecture (BEM, OOCSS)
- CSS preprocessors (Sass, Less)
- CSS-in-JS

### JavaScript

| Topic | Concepts |
|-------|----------|
| **Fundamentals** | Variables, scope, hoisting, closures |
| **Functions** | Arrow functions, IIFE, higher-order functions |
| **Objects & Arrays** | Methods, destructuring, spread/rest |
| **Async** | Callbacks, Promises, async/await |
| **DOM** | Manipulation, events, traversal |
| **ES6+** | Modules, classes, template literals |

### Browser & Performance

- Rendering pipeline
- Critical rendering path
- Lazy loading
- Caching strategies
- Service workers
- Web Vitals

### Security

- XSS prevention
- CSRF protection
- CORS
- Content Security Policy
- HTTPS

### Tools & Workflow

- Git version control
- Package managers (npm, yarn)
- Build tools (Webpack, Vite)
- Testing (Jest, RTL, Cypress)
- Linting (ESLint, Prettier)

## For AI Assistants

When helping with interview prep:

1. **Assess level** - Junior, mid-level, or senior?
2. **Focus areas** - Technical, behavioral, or coding challenges?
3. **Practice questions** - Provide explanations, not just answers
4. **Code examples** - Show practical implementations

## Sample Questions

### HTML
```
Q: What is semantic HTML and why is it important?
A: Semantic HTML uses tags that convey meaning (e.g., <article>, <nav>)
   rather than just presentation (<div>). Benefits include:
   - Better accessibility
   - Improved SEO
   - Easier code maintenance
```

### CSS
```
Q: Explain CSS specificity.
A: Specificity determines which CSS rule applies when multiple rules match.
   Hierarchy: inline > ID > class/attribute > element
   Use specific values: 1000 (inline), 100 (ID), 10 (class), 1 (element)
```

### JavaScript
```
Q: What is a closure?
A: A closure is a function that remembers its outer scope even when
   executed outside that scope.

   function outer() {
     let count = 0;
     return function inner() {
       count++;
       return count;
     };
   }
```

## Best Practices

- **Understand concepts** - Don't just memorize
- **Practice coding** - Hands-on implementation
- **Explain thinking** - Show problem-solving process
- **Ask clarifying questions** - Understand requirements

## Related Skills

- `awesome-python` - For full-stack interview prep
- `security-guide` - Security interview questions
- `developer-handbook` - Career guidance

## Repository Location

`C:\Users\user\.qwen\skills\fe-interview-questions`

## Source

https://github.com/h5bp/Front-end-Developer-Interview-Questions

---

**Note:** This is one of the most popular interview prep resources on GitHub. Updated regularly by the community.
