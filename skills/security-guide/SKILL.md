---
name: security-guide
description: Use when implementing security best practices - comprehensive security guide for developers covering common vulnerabilities and secure coding practices
---

# Security Guide for Developers Skill

## Purpose

This skill provides essential security knowledge and best practices for developers, covering common vulnerabilities, secure coding patterns, and security implementation guidelines.

## When to Use

Use this skill when:
- Implementing authentication systems
- Building secure APIs
- Handling sensitive user data
- Reviewing code for vulnerabilities
- Setting up security policies
- Preparing security documentation

## Security Categories

### Authentication & Authorization

| Topic | Best Practices |
|-------|---------------|
| **Passwords** | Hash with bcrypt/argon2, enforce strength requirements |
| **Sessions** | Use secure cookies, implement expiration, rotate tokens |
| **MFA** | Offer two-factor authentication |
| **OAuth** | Use established providers, validate tokens |
| **JWT** | Sign properly, set short expiration, validate claims |

### Input Validation

```javascript
// Always validate and sanitize input
const validator = require('validator');

// Validate email
if (!validator.isEmail(email)) {
  throw new Error('Invalid email');
}

// Sanitize string
const clean = validator.escape(userInput);
```

### Common Vulnerabilities (OWASP Top 10)

| Vulnerability | Prevention |
|--------------|------------|
| **Injection** | Use parameterized queries, ORM |
| **XSS** | Escape output, CSP headers |
| **CSRF** | CSRF tokens, SameSite cookies |
| **Broken Auth** | Strong password policies, MFA |
| **Sensitive Data** | Encryption at rest and transit |
| **XXE** | Disable XML external entities |
| **Broken Access Control** | Implement proper authorization |
| **Security Misconfiguration** | Harden servers, remove defaults |
| **Known Vulnerabilities** | Update dependencies regularly |
| **Insufficient Logging** | Log security events, monitor |

### API Security

```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// CORS configuration
app.use(cors({
  origin: 'https://trusted-domain.com',
  credentials: true
}));

// Security headers
app.use(helmet());
```

### Database Security

- Use parameterized queries (prevent SQL injection)
- Implement least privilege access
- Encrypt sensitive data
- Regular backups
- Audit logs

### Frontend Security

```html
<!-- Content Security Policy -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'">

<!-- HTTPS enforcement -->
<meta http-equiv="Strict-Transport-Security" 
      content="max-age=31536000; includeSubDomains">
```

## For AI Assistants

When helping with security implementation:

1. **Identify the threat model** - What are you protecting?
2. **Apply defense in depth** - Multiple security layers
3. **Use established libraries** - Don't roll your own crypto
4. **Validate all inputs** - Trust no one
5. **Log and monitor** - Detect anomalies

## Security Checklist

### Before Deployment

- [ ] All dependencies updated
- [ ] Security headers configured
- [ ] HTTPS enabled
- [ ] Error messages don't leak info
- [ ] Rate limiting implemented
- [ ] Authentication tested
- [ ] Authorization verified
- [ ] Input validation in place
- [ ] Logging configured
- [ ] Backup strategy ready

## Related Skills

- `fe-interview-questions` - Security interview questions
- `awesome-python` - Python security libraries
- `browser-use` - Security testing automation

## Repository Location

`C:\Users\user\.qwen\skills\security-guide`

## Source

https://github.com/FallibleInc/security-guide-for-developers

---

**Note:** Security is not a feature—it's a fundamental requirement. Build it in from the start, don't bolt it on at the end.
