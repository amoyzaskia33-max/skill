# AI Skills Collection 🚀

> **Universal AI Agent Skills Repository** - A curated collection of skills, templates, and boilerplates compatible with any AI coding agent (Claude Code, Cursor, Codex, OpenCode, Gemini CLI, etc.)

## 📖 About

This repository contains **45+ skills** organized by category, designed to enhance AI agent capabilities across different domains:

- 🎨 **Design & Creative** - UI/UX resources, design templates
- 💻 **Web Development** - Frontend templates, boilerplates
- 📱 **Mobile Development** - React Native, Flutter resources
- 🔧 **Automation & Tools** - Browser automation, testing tools
- 📚 **Learning Resources** - Roadmaps, interview prep, guides
- 🏗️ **Boilerplates** - Production-ready starters for various stacks

## 🎯 Compatible AI Agents

These skills work with:

| Agent | Installation |
|-------|-------------|
| **Claude Code** | `/plugin install` or manual |
| **Cursor** | `/add-plugin` or manual |
| **Codex** | Fetch and follow instructions |
| **OpenCode** | Fetch and follow instructions |
| **Gemini CLI** | `gemini extensions install` |
| **Qwen Code** | Manual install to skills folder |
| **Any Agent** | Manual folder copy |

## 📦 Installation

### Option 1: Clone Directly (Recommended)

```bash
# Clone to your AI agent's skills folder
git clone https://github.com/YOUR_USERNAME/ai-skills-collection.git

# Or copy specific skills you need
cp -r ai-skills-collection/skills/* /path/to/your/agent/skills/
```

### Option 2: Download Specific Skills

```bash
# Download individual skills
git sparse-checkout init --cone
git sparse-checkout set skills/adminlte-template skills/react-roadmap
git checkout
```

### Option 3: Agent-Specific

See [INSTALL.md](./INSTALL.md) for agent-specific installation guides.

## 📚 Skills Catalog

### 🎨 Design & Creative (4 skills)

| Skill | Description | Size |
|-------|-------------|------|
| `ba-effe` | Effervescence festival design (70s-80s Bollywood) | 391 MB |
| `ux-resource` | UI/UX design references and resources | ~50 MB |
| `design-resources` | Design tools, tutorials, inspiration | ~30 MB |
| `awesome-portfolio-templates` | GitHub Pages portfolio collection | ~100 MB |

### 💻 Web Development (10 skills)

| Skill | Description | Framework |
|-------|-------------|-----------|
| `dms-tech-lab` | Corporate website with Next.js + TypeScript | Next.js |
| `gsap-animations-website` | Scroll-triggered GSAP animations | React + Vite |
| `enegix-template` | Business HTML template | HTML/Bootstrap |
| `shopnest-ecommerce` | Multi-vendor e-commerce marketplace | Next.js 15 |
| `developer-folio` | React developer portfolio | React |
| `developer-portfolio-said` | Modern Next.js portfolio | Next.js |
| `open-react-template` | SaaS landing page template | React |
| `startbootstrap-landing` | Bootstrap landing pages | Bootstrap |
| `andromeda-premium-template` | Modern Next.js website | Next.js |
| `shadcn-ui-components` | React UI components | Radix + Tailwind |

### 📱 Mobile Development (4 skills)

| Skill | Description | Platform |
|-------|-------------|----------|
| `react-native-boilerplate` | React Native + Expo + Supabase | iOS/Android |
| `ignite-boilerplate` | Production React Native (Infinite Red) | iOS/Android |
| `expo-examples` | Expo example projects | iOS/Android |
| `appium-automation` | Mobile UI automation | iOS/Android |

### 🔧 Automation & Tools (7 skills)

| Skill | Description | Type |
|-------|-------------|------|
| `browser-use` | AI-controlled browser automation | Tool |
| `appium-automation` | Mobile app testing automation | Tool |
| `ios-repair-tool` | iOS firmware restore (idevicerestore) | Tool |
| `libimobiledevice` | iOS device communication library | Library |
| `magisk-root` | Android Magisk root guide | Guide |
| `android-root-guide` | Complete Android rooting guide | Guide |
| `fs-poster-wordpress` | WordPress social auto-posting | Plugin |

### 📚 Learning Resources (8 skills)

| Skill | Description | Type |
|-------|-------------|------|
| `fe-interview-questions` | Front-end interview prep | Guide |
| `fullstack-roadmap` | Full-stack development curriculum | Guide |
| `react-roadmap` | React development roadmap | Guide |
| `build-your-own-x` | Learn by building clones | Tutorials |
| `developer-handbook` | Software engineer career guide | Guide |
| `security-guide` | Security best practices | Guide |
| `awesome-python` | Python frameworks & libraries | Reference |
| `best-admin-dashboard-collection` | Admin dashboard templates | Collection |

### 🏗️ Boilerplates (8 skills)

| Skill | Description | Stack |
|-------|-------------|-------|
| `saas-boilerplate` | Basic SaaS starter | Node.js |
| `express-boilerplate` | Express.js API boilerplate | Express |
| `saas-boilerplate-ixartz` | Premium Next.js SaaS | Next.js + TS |
| `t3-app-boilerplate` | T3 Stack (tRPC, Prisma) | Next.js |
| `argon-dashboard-premium` | Premium React admin | React + MUI |
| `now-ui-dashboard-premium` | Colorful React admin | React |
| `material-kit-devias` | Professional Material-UI | MUI |
| `adminlte-template` | Most popular admin template | Bootstrap |
| `tabler-dashboard` | Modern HTML dashboard | Bootstrap |
| `coreui-react-admin` | Enterprise React admin | React |
| `material-dashboard-free` | Free Material dashboard | Material-UI |
| `wxt-extension-boilerplate` | Browser extension framework | Vite + TS |

### 🚀 Development Workflow (1 collection)

| Skill | Description | Sub-skills |
|-------|-------------|------------|
| `superpowers` | AI agent workflow framework | 14 skills |

## 📊 Statistics

```
Total Skills: 45+
Total Size: ~1.6 GB (after cleanup)
Categories: 7
Compatible Agents: 7+
```

## 🗂️ Repository Structure

```
ai-skills-collection/
├── README.md                 # This file
├── INSTALL.md                # Installation guides
├── SKILL_INDEX.md            # Complete skill index
├── skills/                   # All skills
│   ├── SKILL.md              # Main index
│   ├── adminlte-template/
│   ├── awesome-python/
│   ├── browser-use/
│   └── ... (45+ skills)
├── docs/                     # Documentation
│   ├── agent-guides/         # Agent-specific guides
│   ├── skill-guides/         # Skill-specific guides
│   └── tutorials/            # Tutorials
└── scripts/                  # Utility scripts
    ├── install.sh            # Linux/Mac install
    └── install.ps1           # Windows install
```

## 🚀 Quick Start

### For AI Agents

1. **Clone this repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-skills-collection.git
   ```

2. **Link to your agent**
   ```bash
   # Example for Claude Code
   ln -s /path/to/ai-skills-collection/skills ~/.claude/skills
   
   # Example for Cursor
   ln -s /path/to/ai-skills-collection/skills ~/.cursor/skills
   ```

3. **Start using skills**
   - Reference skill by name in conversations
   - Agent will automatically load relevant skills

### For Developers

1. **Browse skills** in `skills/` folder
2. **Copy what you need** to your project
3. **Follow SKILL.md** in each folder for usage

## 📝 License

This collection aggregates open-source projects. Each skill maintains its original license. Check individual skill folders for specific licenses.

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📞 Support

- **Issues**: GitHub Issues
- **Discord**: [Link]
- **Documentation**: [docs/](./docs/)

---

**Made with ❤️ for the AI community**

*Last Updated: March 2026*
