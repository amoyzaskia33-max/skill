---
name: awesome-python
description: Use when working with Python projects - curated list of Python frameworks, libraries, tools, and resources for development
---

# Awesome Python Skill - Python Ecosystem Reference

## Purpose

This skill provides access to a comprehensive, curated list of the best Python frameworks, libraries, tools, and resources for Python development across all domains.

## When to Use

Use this skill when:
- Starting a new Python project
- Looking for Python libraries for specific tasks
- Exploring Python frameworks for web, data, or automation
- Finding Python development tools and resources
- Learning about Python ecosystem
- Comparing Python packages and alternatives

## Repository Categories

### 🌐 Web Frameworks

| Category | Libraries |
|----------|-----------|
| **Full-Stack** | Django, Flask, FastAPI, Pyramid, Tornado |
| **Micro Frameworks** | Flask, Bottle, Falcon, Hug |
| **Async** | FastAPI, Sanic, Starlette, Quart |
| **CMS** | Wagtail, Mezzanine, django-cms |

### 📊 Data Science & AI

| Category | Libraries |
|----------|-----------|
| **Data Analysis** | pandas, NumPy, Dask, Vaex |
| **Visualization** | matplotlib, seaborn, plotly, bokeh, altair |
| **Machine Learning** | scikit-learn, XGBoost, LightGBM, catboost |
| **Deep Learning** | TensorFlow, PyTorch, Keras, MXNet |
| **NLP** | spaCy, NLTK, Gensim, transformers |

### 🤖 Automation & Scripting

| Category | Libraries |
|----------|-----------|
| **Task Automation** | invoke, fabric, luigi, airflow |
| **Web Scraping** | BeautifulSoup, Scrapy, selenium, playwright |
| **Browser Automation** | selenium, playwright, pyppeteer |

### 🛠️ Development Tools

| Category | Tools |
|----------|-------|
| **Package Management** | pip, poetry, pipenv, conda |
| **Linting** | pylint, flake8, black, ruff |
| **Testing** | pytest, unittest, hypothesis, tox |
| **Debugging** | pdb, ipdb, pudb |
| **IDE/Editors** | PyCharm, VS Code, Jupyter, Spyder |
| **Type Checking** | mypy, pyright, pytype |

### 🗄️ Database

| Category | Libraries |
|----------|-----------|
| **ORM** | SQLAlchemy, Django ORM, Peewee, Tortoise ORM |
| **NoSQL** | pymongo, redis-py, elasticsearch-py |
| **Migrations** | Alembic, Django Migrations |

### 🔐 Security

| Category | Libraries |
|----------|-----------|
| **Authentication** | PyJWT, python-jose, authlib |
| **Cryptography** | cryptography, pycryptodome, PyNaCl |
| **Security Tools** | bandit, safety, pip-audit |

### 📦 Code Quality

| Tool | Purpose |
|------|---------|
| **black** | Code formatting |
| **isort** | Import sorting |
| **flake8** | Linting |
| **pylint** | Static analysis |
| **mypy** | Type checking |
| **pytest** | Testing framework |
| **coverage** | Code coverage |

### 🚀 Performance

| Category | Libraries |
|----------|-----------|
| **Optimization** | Cython, Numba, PyPy |
| **Parallel Computing** | multiprocessing, concurrent.futures, ray, joblib |
| **Caching** | functools.lru_cache, cachetools, redis |

### 📱 GUI & Desktop Apps

| Library | Description |
|---------|-------------|
| **tkinter** | Standard Python GUI |
| **PyQt/PySide** | Qt bindings |
| **Kivy** | Multi-touch applications |
| **Flet** | Flutter-based apps |
| **CustomTkinter** | Modern tkinter |

### 🌐 API & Networking

| Category | Libraries |
|----------|-----------|
| **HTTP Clients** | requests, httpx, aiohttp, urllib3 |
| **API Clients** | stripe, twilio, slack-sdk, discord.py |
| **WebSocket** | websockets, websocket-client |

### 📝 File & Data Formats

| Format | Libraries |
|--------|-----------|
| **JSON** | json, orjson, ujson |
| **YAML** | PyYAML, ruamel.yaml |
| **XML** | lxml, xmltodict |
| **CSV** | csv, pandas |
| **Excel** | openpyxl, xlsxwriter, pandas |
| **PDF** | PyPDF2, reportlab, pdfplumber |

## For AI Assistants

When helping with Python projects:

1. **Understand the use case** - Web, data, automation, or other?
2. **Recommend libraries** - Suggest best-in-class packages
3. **Consider compatibility** - Python version, dependencies
4. **Check maintenance** - Active projects with good support
5. **Suggest alternatives** - Multiple options for comparison

## Best Practices

- **Use Virtual Environments** - venv, poetry, conda
- **Pin Dependencies** - requirements.txt, pyproject.toml
- **Write Tests** - pytest with good coverage
- **Type Hints** - Use mypy for type checking
- **Code Quality** - black, flake8, pylint
- **Documentation** - docstrings, Sphinx, mkdocs

## Quick Reference

### Project Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Or use Poetry
poetry new my-project
cd my-project
poetry add requests fastapi
```

### Common Patterns

```python
# Type hints
from typing import Optional, List

def greet(name: str, items: Optional[List[str]] = None) -> str:
    return f"Hello, {name}!"

# Context managers
with open('file.txt', 'r') as f:
    content = f.read()

# Decorators
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Elapsed: {time.time() - start:.2f}s")
        return result
    return wrapper
```

## Related Skills

- `gsap-animations-website` - For Python backend with animated frontend
- `shopnest-ecommerce` - For Python e-commerce alternatives
- `ux-resource` - For UI/UX when building Python web apps

## Repository Location

`C:\Users\user\.qwen\skills\awesome-python`

## Source

https://github.com/vinta/awesome-python

---

**Note:** This is a curated reference skill. Browse the repository for the complete list of Python resources organized by category. Updated regularly by the Python community.
