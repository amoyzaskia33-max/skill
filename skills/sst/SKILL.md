---
name: sst
description: Use when building serverless applications with SST - Infrastructure as Code framework for deploying Full-stack Apps on AWS with Zero Config
---

# SST (Serverless Stack) Skill - Full-Stack Apps on AWS

## Purpose

This skill provides expertise in using SST (Serverless Stack), an open-source Infrastructure as Code framework that enables developers to deploy full-stack applications on AWS with zero configuration.

## When to Use

Use this skill when:
- Building serverless applications on AWS
- Deploying full-stack apps with Next.js, Remix, SvelteKit, Astro
- Managing AWS infrastructure with IaC
- Setting up development environments for serverless
- Implementing CI/CD for AWS deployments
- Working with Lambda, DynamoDB, API Gateway, etc.

## Key Features

### Core Capabilities

| Feature | Description |
|---------|-------------|
| **Zero Config** | Pre-configured for popular frameworks |
| **Live Lambda Development** | Real-time local testing |
| **Multi-Stage Deployments** | Dev, staging, production environments |
| **AWS CDK Based** | Full power of AWS CDK |
| **Framework Agnostic** | Next.js, Remix, SvelteKit, Astro, Nuxt |
| **Local Development** | Run serverless apps locally |

### Supported Frameworks

- **Next.js** - Full-stack React applications
- **Remix** - Web framework built on React
- **SvelteKit** - Svelte-based applications
- **Astro** - Content-focused websites
- **Nuxt** - Vue.js applications
- **SolidStart** - SolidJS applications
- **Custom** - Any backend/frontend combination

## Project Structure

```
my-sst-app/
├── stacks/
│   ├── Database.ts       # Database stack
│   ├── Api.ts            # API stack
│   └── Web.ts            # Frontend stack
├── packages/
│   ├── core/             # Shared code
│   └── functions/        # Lambda functions
├── sst.config.ts         # SST configuration
└── package.json
```

## Quick Start

### 1. Create New SST App

```bash
# Create from template
npx create-sst@latest

# Choose your stack
# - Next.js + Lambda
# - Remix + Lambda
# - SvelteKit + Lambda
# - Astro + Lambda
```

### 2. Configure SST

```typescript
// sst.config.ts
import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "my-app",
      region: "us-east-1",
      main: "src/**/*.ts",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      stack.addResource("site", {
        type: NextjsSite,
        path: "packages/web",
      });
    });
  },
} satisfies SSTConfig;
```

### 3. Define Infrastructure

```typescript
// stacks/Api.ts
import { StackContext, Api, Function } from "sst/constructs";

export function ApiStack({ stack }: StackContext) {
  // Create Lambda function
  const api = new Api(stack, "api", {
    routes: {
      "GET /notes": "packages/functions/src/notes.list",
      "POST /notes": "packages/functions/src/notes.create",
      "GET /notes/{id}": "packages/functions/src/notes.get",
    },
  });

  // Add DynamoDB table
  const table = new Table(stack, "notes-table", {
    fields: {
      pk: "string",
      sk: "string",
    },
    primaryIndex: { pk: "pk", sk: "sk" },
  });

  // Grant permissions
  table.attachPermissions([api]);

  return { api, table };
}
```

### 4. Deploy

```bash
# Install dependencies
npm install

# Deploy to AWS
npx sst deploy

# Start local development
npx sst dev

# Remove deployment
npx sst remove
```

## For AI Assistants

When helping with SST projects:

1. **Understand the stack** - Which framework? (Next.js, Remix, etc.)
2. **Plan infrastructure** - What AWS resources needed?
3. **Configure SST** - Set up stacks and resources
4. **Setup CI/CD** - GitHub Actions, AWS CodePipeline
5. **Optimize costs** - Right-size Lambda, use caching

## Common Patterns

### Database Integration

```typescript
// stacks/Database.ts
import { RDS, Secret } from "sst/constructs";

const db = new RDS(stack, "database", {
  engine: "postgresql",
  migrations: "packages/functions/src/drizzle",
  permissions: [api],
});
```

### Authentication

```typescript
// stacks/Auth.ts
import { Auth } from "sst/constructs";

const auth = new Auth(stack, "auth", {
  login: ["email"],
});
```

### File Storage

```typescript
// stacks/Storage.ts
import { Bucket } from "sst/constructs";

const bucket = new Bucket(stack, "uploads", {
  permissions: [api],
  cors: true,
});
```

### Queue & Events

```typescript
// stacks/Events.ts
import { Queue, Topic } from "sst/constructs";

const queue = new Queue(stack, "queue", {
  consumers: {
    processor: "packages/functions/src/processor.main",
  },
});
```

## AWS Resources

| Resource | SST Construct | Use Case |
|----------|--------------|----------|
| **Lambda** | Function | Serverless compute |
| **API Gateway** | Api | REST/HTTP APIs |
| **DynamoDB** | Table | NoSQL database |
| **RDS** | RDS | Relational database |
| **S3** | Bucket | File storage |
| **Cognito** | Auth | Authentication |
| **SQS** | Queue | Message queue |
| **EventBridge** | Topic | Event bus |

## Best Practices

### Development

- Use `sst dev` for local development
- Enable Live Lambda for real-time testing
- Use TypeScript for type safety
- Organize code in packages

### Deployment

- Use multiple stages (dev, staging, prod)
- Enable CloudWatch logging
- Set up monitoring and alerts
- Use environment variables properly

### Cost Optimization

- Right-size Lambda memory
- Use provisioned concurrency wisely
- Enable DynamoDB auto-scaling
- Clean up unused resources

## Related Skills

- `awesome-python` - Python Lambda functions
- `browser-use` - Testing automation
- `security-guide` - AWS security best practices
- `fullstack-roadmap` - Full-stack development concepts

## Repository Location

`C:\Users\user\.qwen\skills\sst`

## Source

https://github.com/anomalyco/sst

## Documentation

- **Official Docs:** https://sst.dev/docs
- **GitHub:** https://github.com/anomalyco/sst
- **Discord:** SST Community Discord

---

**Note:** SST simplifies serverless development on AWS. With Live Lambda development, you can test and debug Lambda functions locally in real-time, making serverless development feel like traditional app development.
