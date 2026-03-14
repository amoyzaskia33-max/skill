---
name: express-boilerplate
description: Use when building Node.js APIs quickly - Express.js boilerplate with best practices, authentication, database integration, and common patterns
---

# Express Boilerplate Skill - Node.js API Starter

## Purpose

This skill provides a production-ready Express.js boilerplate for building RESTful APIs and backend services with best practices, authentication, database integration, and common patterns.

## When to Use

Use this skill when:
- Building REST APIs with Node.js
- Need quick backend starter template
- Implementing JWT authentication
- Setting up database connections
- Creating microservices
- Building backend for mobile/web apps

## Typical Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Authentication** | JWT, passport.js, sessions |
| **Authorization** | Role-based access control |
| **Database** | MongoDB/Mongoose or PostgreSQL |
| **Validation** | Joi or express-validator |
| **Error Handling** | Centralized error handling |
| **Logging** | Winston, Morgan |
| **Testing** | Jest, Supertest |
| **Documentation** | Swagger/OpenAPI |

### Project Structure

```
express-boilerplate/
├── src/
│   ├── controllers/    # Route handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── services/       # Business logic
│   ├── utils/          # Helpers
│   └── config/         # Configuration
├── tests/
├── .env.example
└── package.json
```

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development
npm run dev

# Run tests
npm test
```

## For AI Assistants

When helping with Express projects:

1. **Understand requirements** - REST API, GraphQL, or both?
2. **Setup structure** - MVC pattern
3. **Implement auth** - JWT or sessions
4. **Add validation** - Input validation
5. **Error handling** - Consistent error responses

## Best Practices

- **Middleware chain** - Order matters
- **Async handling** - Use async/await with try-catch
- **Environment variables** - Never hardcode secrets
- **Rate limiting** - Protect against abuse
- **CORS** - Configure properly

## Related Skills

- `awesome-python` - Python API alternatives
- `sst` - Serverless API deployment
- `security-guide` - API security practices

## Repository Location

`C:\Users\user\.qwen\skills\express-boilerplate`

---

**Note:** A well-structured Express boilerplate saves time and ensures consistency across projects. Focus on business logic, not boilerplate code.
