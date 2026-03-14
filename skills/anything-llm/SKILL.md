---
name: anything-llm
description: Use when setting up local LLM infrastructure - all-in-one AI workspace with RAG, document chat, and multiple model support
---

# AnythingLLM Skill - Local LLM Workspace

## Purpose

This skill provides expertise in setting up and using AnythingLLM, an all-in-one AI workspace that enables running large language models locally with RAG (Retrieval Augmented Generation), document chat, and support for multiple model providers.

## When to Use

Use this skill when:
- Setting up local LLM infrastructure
- Building document chat applications
- Implementing RAG systems
- Running AI models offline
- Creating private AI workspaces
- Managing multiple AI models

## Key Features

### Core Capabilities

| Feature | Description |
|---------|-------------|
| **Local LLM** | Run models locally (Ollama, LM Studio) |
| **Cloud LLM** | OpenAI, Anthropic, Google, Azure support |
| **RAG** | Document embedding and retrieval |
| **Multi-Model** | Switch between different providers |
| **Workspaces** | Separate contexts for different projects |
| **Document Chat** | Chat with PDFs, TXT, MD files |
| **Vector DB** | Built-in vector storage |

### Supported Models

| Provider | Models |
|----------|--------|
| **Local** | Ollama, LM Studio, LocalAI |
| **OpenAI** | GPT-4, GPT-3.5, GPT-4 Turbo |
| **Anthropic** | Claude 3, Claude 2 |
| **Google** | Gemini Pro, Gemini Flash |
| **Azure** | Azure OpenAI Service |
| **Open Source** | Llama, Mistral, etc. |

## Installation

### Docker (Recommended)

```bash
# Pull and run
docker pull mintplexlabs/anythingllm
docker run -d -p 3001:3001 \
  -v ./storage:/app/server/storage \
  mintplexlabs/anythingllm
```

### Desktop App

```bash
# Download from releases
# Available for Windows, macOS, Linux
```

### Source

```bash
git clone https://github.com/Mintplex-Labs/anything-llm
cd anything-llm
npm install
npm run build
```

## Quick Start

### 1. Initial Setup

```
1. Open http://localhost:3001
2. Create admin account
3. Choose LLM provider
4. Configure API keys or local model
5. Create first workspace
```

### 2. Document Upload

```
1. Create new workspace
2. Upload documents (PDF, TXT, MD, etc.)
3. Wait for embedding
4. Start chatting
```

### 3. API Usage

```javascript
// Chat with workspace
const response = await fetch('http://localhost:3001/api/v1/workspace/:id/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello!' })
});
```

## For AI Assistants

When helping with AnythingLLM:

1. **Understand use case** - Document chat, codebase Q&A, or general assistant?
2. **Choose deployment** - Docker, desktop, or source?
3. **Select models** - Local or cloud providers?
4. **Configure RAG** - Vector database settings
5. **Setup workspaces** - Separate contexts

## Use Cases

| Use Case | Description |
|----------|-------------|
| **Codebase Q&A** | Chat with your code repository |
| **Documentation** | Internal docs search and chat |
| **Research** | Analyze papers and articles |
| **Customer Support** | Knowledge base assistant |
| **Personal AI** | Private AI assistant |

## Best Practices

- **Document organization** - Keep workspaces focused
- **Model selection** - Match model to task complexity
- **Privacy** - Use local models for sensitive data
- **Embedding quality** - Chunk documents appropriately
- **Resource management** - Monitor RAM/VRAM usage

## Related Skills

- `browser-use` - AI automation integration
- `awesome-python` - Python LLM libraries
- `sst` - Deploy AI apps on AWS

## Repository Location

`C:\Users\user\.qwen\skills\anything-llm`

## Source

https://github.com/Mintplex-Labs/anything-llm

---

**Note:** AnythingLLM brings AI capabilities in-house with full control over data and models. Perfect for privacy-conscious teams and offline deployments.
