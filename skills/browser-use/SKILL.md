---
name: browser-use
description: Use when automating browser tasks with AI - LLM-controlled browser automation for web interactions, form filling, navigation, and data extraction
---

# Browser Use Skill - AI-Controlled Browser Automation

## Purpose

This skill provides expertise in using Browser Use, an open-source library that enables Large Language Models (LLMs) to control web browsers autonomously for completing various web-based tasks.

## When to Use

Use this skill when:
- Automating complex web workflows
- Building AI agents that interact with websites
- Implementing browser automation with natural language
- Creating autonomous web navigation systems
- Extracting data from dynamic websites
- Automating form filling and submissions
- Testing web applications with AI

## Key Features

### Core Capabilities

| Feature | Description |
|---------|-------------|
| **LLM-Controlled** | GPT-4, Claude, or other models control browser actions |
| **Natural Language** | Describe tasks in plain English |
| **Autonomous Navigation** | AI decides which elements to click/fill |
| **Multi-Page Support** | Handle tabs, popups, redirects |
| **Screenshot Analysis** | Vision models can analyze page layouts |
| **Error Recovery** | Self-correcting when actions fail |

### Supported Browsers

- **Chrome/Chromium** - Full support via Playwright
- **Firefox** - Supported via Playwright
- **Safari** - Limited support
- **Headless** - For automated environments

### Supported LLMs

| Provider | Models |
|----------|--------|
| **OpenAI** | GPT-4o, GPT-4 Turbo, GPT-3.5 |
| **Anthropic** | Claude 3.5, Claude 3 |
| **Google** | Gemini Pro, Gemini Flash |
| **Local** | Ollama, LM Studio |

## Installation

```bash
# Install from PyPI
pip install browser-use

# Or from source
git clone https://github.com/browser-use/browser-use.git
cd browser-use
pip install -e .

# Install Playwright browsers
playwright install
```

## Quick Start

### Basic Example

```python
import asyncio
from browser_use import Agent, Browser

async def main():
    browser = Browser()
    agent = Agent(
        task="Go to google.com and search for 'python programming'",
        browser=browser
    )
    result = await agent.run()
    print(result)

asyncio.run(main())
```

### Advanced Example with Configuration

```python
import asyncio
from browser_use import Agent, Browser, BrowserConfig
from langchain_openai import ChatOpenAI

async def main():
    # Configure browser
    browser_config = BrowserConfig(
        headless=False,
        chrome_instance_path=None,
    )
    browser = Browser(config=browser_config)
    
    # Configure LLM
    llm = ChatOpenAI(model='gpt-4o')
    
    # Create agent with specific task
    agent = Agent(
        task="Navigate to github.com, search for 'browser-use', and extract the top 5 repository results",
        browser=browser,
        llm=llm,
        max_actions_per_step=3,
    )
    
    result = await agent.run()
    print(f"Result: {result}")
    
    await browser.close()

asyncio.run(main())
```

### Multi-Step Workflow

```python
from browser_use import Agent

agent = Agent(
    task="""
    1. Go to amazon.com
    2. Search for 'mechanical keyboard'
    3. Filter by 4 stars & up
    4. Find the first result under $100
    5. Add to cart
    6. Report the product name and price
    """,
    browser=browser
)
result = await agent.run()
```

## For AI Assistants

When helping with browser automation:

1. **Understand the goal** - What website? What action?
2. **Check authentication needs** - Login required?
3. **Handle dynamic content** - Wait for elements to load
4. **Error handling** - Retry failed actions
5. **Respect rate limits** - Add delays between actions

## Best Practices

### Reliability

```python
# Add waits for dynamic content
agent = Agent(
    task="Wait for page to load, then click the login button",
    browser=browser,
    delay=2,  # seconds between actions
)
```

### Security

```python
# Never hardcode credentials
import os
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
```

### Performance

```python
# Run headless in production
browser = Browser(
    config=BrowserConfig(
        headless=True,
        disable_security=True,
    )
)
```

## Common Use Cases

### 1. Web Scraping

```python
agent = Agent(
    task="Extract all product names and prices from this e-commerce page",
    browser=browser
)
```

### 2. Form Automation

```python
agent = Agent(
    task="Fill out the contact form: name='John', email='john@example.com', message='Hello'",
    browser=browser
)
```

### 3. Testing

```python
agent = Agent(
    task="Test the login flow: go to /login, enter credentials, verify redirect to dashboard",
    browser=browser
)
```

### 4. Data Entry

```python
agent = Agent(
    task="Copy data from this spreadsheet and enter it into the CRM form",
    browser=browser
)
```

## Configuration Options

### BrowserConfig

```python
BrowserConfig(
    headless=True,              # Run without UI
    chrome_instance_path=None,  # Use existing Chrome
    extra_chromium_args=[],     # Additional Chrome flags
    save_recording_path=None,   # Record browser actions
)
```

### AgentConfig

```python
Agent(
    task="Your task here",
    llm=None,                   # LLM model
    browser=None,               # Browser instance
    max_actions_per_step=1,     # Actions per iteration
    delay=0,                    # Delay between actions
    validate_output=False,      # Validate LLM output
)
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Element not found | Increase wait time, check selector |
| LLM makes wrong clicks | Use more specific task description |
| Browser crashes | Reduce concurrent agents |
| Actions timeout | Check network, increase timeout |

## Integration Examples

### With LangChain

```python
from langchain_openai import ChatOpenAI
from browser_use import Agent

llm = ChatOpenAI(model='gpt-4o', temperature=0)
agent = Agent(task="...", llm=llm)
```

### With Custom Prompts

```python
agent = Agent(
    task="...",
    system_prompt="You are a helpful web automation assistant..."
)
```

## Related Skills

- `awesome-python` - Python libraries for automation
- `ux-resource` - Understanding web UI patterns
- `superpowers` - AI agent development workflow

## Repository Location

`C:\Users\user\.qwen\skills\browser-use`

## Source

https://github.com/browser-use/browser-use

## Documentation

- **GitHub:** https://github.com/browser-use/browser-use
- **PyPI:** https://pypi.org/project/browser-use/
- **Docs:** Check repository for detailed documentation

---

**Note:** Browser Use transforms how AI agents interact with the web. Combine with LLM capabilities for powerful autonomous automation. Always use responsibly and respect website terms of service.
