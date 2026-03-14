---
name: devagent-ai-workspace
description: Use when building AI agent development environments - workspace setup for autonomous agents, multi-agent systems, and AI automation
---

# DevAgent AI Workspace Skill - AI Agent Development

## Purpose

This skill provides expertise in setting up AI agent development workspaces for building autonomous agents, multi-agent systems, and AI-powered automation tools.

## When to Use

Use this skill when:
- Building AI coding agents
- Creating autonomous development workflows
- Setting up multi-agent systems
- Implementing AI automation
- Developing agent collaboration tools
- Creating AI-powered dev tools

## Key Features

### Agent Capabilities

| Capability | Description |
|------------|-------------|
| **Code Generation** | Write code from specifications |
| **Code Review** | Analyze and suggest improvements |
| **Debugging** | Find and fix bugs autonomously |
| **Testing** | Write and run tests |
| **Documentation** | Generate docs from code |
| **Refactoring** | Improve code structure |

### Multi-Agent Patterns

| Pattern | Use Case |
|---------|----------|
| **Collaborative** | Multiple agents work together |
| **Hierarchical** | Manager-agent relationships |
| **Specialized** | Domain-specific agents |
| **Competitive** | Agents compete for best solution |

## Typical Architecture

```
┌─────────────────────────────────────┐
│         Orchestrator/Manager        │
├─────────────────────────────────────┤
│  Agent 1  │  Agent 2  │  Agent 3   │
│  (Code)   │  (Test)   │  (Review)  │
├─────────────────────────────────────┤
│         Shared Context/Memory       │
├─────────────────────────────────────┤
│    Tools: Git, Terminal, Browser    │
└─────────────────────────────────────┘
```

## For AI Assistants

When helping with AI agent projects:

1. **Define agent roles** - What does each agent do?
2. **Setup communication** - How do agents interact?
3. **Implement tools** - What can agents use?
4. **Manage context** - Shared memory and state
5. **Handle errors** - Recovery and fallback strategies

## Common Patterns

### Single Agent

```python
class CodingAgent:
    def __init__(self, llm):
        self.llm = llm
    
    async def execute(self, task):
        response = await self.llm.generate(task)
        return response
```

### Multi-Agent Collaboration

```python
class AgentTeam:
    def __init__(self):
        self.planner = PlannerAgent()
        self.coder = CoderAgent()
        self.reviewer = ReviewerAgent()
    
    async def solve(self, problem):
        plan = await self.planner.plan(problem)
        code = await self.coder.write(plan)
        review = await self.reviewer.review(code)
        return review
```

## Best Practices

- **Clear responsibilities** - Each agent has specific role
- **Communication protocol** - Standard message format
- **Error handling** - Graceful failure recovery
- **Logging** - Track agent actions and decisions
- **Human oversight** - Review critical decisions

## Related Skills

- `browser-use` - Browser automation for agents
- `superpowers` - AI agent workflow patterns
- `awesome-python` - Python agent libraries

## Repository Location

`C:\Users\user\.qwen\skills\devagent-ai-workspace`

---

**Note:** AI agents are transforming software development. Build systems that augment human developers with autonomous capabilities while maintaining control and oversight.
