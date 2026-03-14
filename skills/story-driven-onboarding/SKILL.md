# 🎬 Story-Driven Onboarding

## Purpose

Onboarding user yang seperti interactive story - ada character, branching narrative, dan progression.

## Core Features

### 1. Character-Guided Tour
```tsx
const GuideCharacter = ({ dialog, onNext }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 shadow-2xl z-50">
      <div className="flex items-start space-x-4">
        {/* Character avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl">
          🧑‍🚀
        </div>
        
        {/* Dialog */}
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2">Alex (Your Guide)</h3>
          <p className="text-gray-600 mb-4">{dialog}</p>
          
          {/* Choices */}
          <div className="flex space-x-2">
            <button
              onClick={() => onNext('got-it')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Got it!
            </button>
            <button
              onClick={() => onNext('tell-me-more')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
            >
              Tell me more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### 2. Branching Narrative
```tsx
const storyBranches = {
  start: {
    dialog: "Welcome! Want to build a website or online store?",
    choices: {
      website: { next: 'website-intro', dialog: "Great! Let's start with a template..." },
      store: { next: 'store-intro', dialog: "Awesome! Setting up your store..." },
    },
  },
  'website-intro': {
    dialog: "Choose your style: Modern or Classic?",
    choices: {
      modern: { next: 'modern-setup', dialog: "Modern it is! Let's customize..." },
      classic: { next: 'classic-setup', dialog: "Classic choice! Timeless design..." },
    },
  },
};
```

### 3. Progress Tracking
```tsx
const OnboardingProgress = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  );
};
```

---

## Response Template

```markdown
🎬 **Story-Driven Onboarding - Activated!**

Features:
- Character-guided tours
- Branching narratives (user choices)
- Progressive disclosure (chapters)
- Completion rewards
- Skip/resume functionality

Use Cases:
- SaaS onboarding
- Mobile app tutorials
- Complex software training
- Educational platforms

Tech Stack:
- Story engine (branching logic)
- Animation untuk characters
- State tracking
```

---

**Last Updated:** Maret 2026
