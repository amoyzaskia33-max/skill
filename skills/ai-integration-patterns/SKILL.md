# 🤖 AI Integration Patterns

## Purpose

Kumpulan patterns untuk integrasi AI capabilities ke dalam web applications - dari chatbots, content generation, recommendations, hingga voice interfaces.

## Level: ⭐⭐⭐ Expert

---

## 1. **AI Chatbot dengan Personality** 🎭

### A. Multi-Persona Chatbot System

```tsx
// Expert pattern: Chatbot dengan multiple personalities
import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  personality?: string;
}

interface Personality {
  id: string;
  name: string;
  tone: 'professional' | 'friendly' | 'humorous' | 'empathetic';
  systemPrompt: string;
  avatar: string;
}

export const AIPersonalityChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activePersonality, setActivePersonality] = useState<string>('assistant');
  const [isLoading, setIsLoading] = useState(false);
  
  // Multiple personalities
  const personalities: Personality[] = [
    {
      id: 'professional',
      name: 'Alex Pro',
      tone: 'professional',
      systemPrompt: 'You are a professional, concise assistant. Be direct, accurate, and business-like.',
      avatar: '👔',
    },
    {
      id: 'friendly',
      name: 'Buddy',
      tone: 'friendly',
      systemPrompt: 'You are a friendly, warm assistant. Use emojis, be encouraging, and conversational.',
      avatar: '😊',
    },
    {
      id: 'humorous',
      name: 'Jokes',
      tone: 'humorous',
      systemPrompt: 'You are a witty, humorous assistant. Make jokes, use wordplay, keep it light.',
      avatar: '😄',
    },
    {
      id: 'empathetic',
      name: 'Care',
      tone: 'empathetic',
      systemPrompt: 'You are an empathetic, supportive assistant. Show understanding, validate feelings.',
      avatar: '🤗',
    },
  ];
  
  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Get active personality
      const personality = personalities.find(p => p.id === activePersonality);
      
      // Call AI API dengan personality context
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: personality?.systemPrompt || '' },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content },
          ],
          personality: activePersonality,
          temperature: getTemperatureForPersonality(activePersonality),
        }),
      });
      
      const data = await response.json();
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        personality: activePersonality,
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getTemperatureForPersonality = (personalityId: string) => {
    const temps = {
      professional: 0.3, // More focused
      friendly: 0.7,
      humorous: 0.9, // More creative
      empathetic: 0.5,
    };
    return temps[personalityId as keyof typeof temps];
  };
  
  return (
    <div className="chatbot-container">
      {/* Personality Selector */}
      <div className="flex space-x-2 mb-4">
        {personalities.map(personality => (
          <button
            key={personality.id}
            onClick={() => setActivePersonality(personality.id)}
            className={`
              px-4 py-2 rounded-full transition-all
              ${activePersonality === personality.id
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-gray-200 hover:bg-gray-300'
              }
            `}
          >
            {personality.avatar} {personality.name}
          </button>
        ))}
      </div>
      
      {/* Messages */}
      <div className="messages space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`message ${message.role} ${message.personality}`}
          >
            <div className="avatar">
              {message.role === 'assistant'
                ? personalities.find(p => p.id === message.personality)?.avatar
                : '👤'}
            </div>
            <div className="content">{message.content}</div>
          </div>
        ))}
        {isLoading && <div className="typing-indicator">AI is thinking...</div>}
      </div>
      
      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
};
```

---

### B. Context-Aware AI Responses

```tsx
// Expert pattern: AI yang ingat context & history
export const ContextAwareAI = () => {
  const [context, setContext] = useState({
    userPreferences: {},
    conversationHistory: [],
    currentTask: null,
    userMood: 'neutral',
  });
  
  const analyzeContext = async (messages: Message[]) => {
    // Extract user preferences dari conversation
    const preferences = extractPreferences(messages);
    
    // Detect user mood dari typing patterns
    const mood = detectMood(messages[messages.length - 1]?.content);
    
    // Identify current task
    const task = identifyTask(messages);
    
    return { preferences, mood, task };
  };
  
  const extractPreferences = (messages: Message[]) => {
    // NLP untuk extract preferences
    // "I prefer dark mode" → { theme: 'dark' }
    // "Show me concise answers" → { responseLength: 'short' }
    
    const preferences: any = {};
    
    messages.forEach(msg => {
      if (msg.content.includes('dark mode')) preferences.theme = 'dark';
      if (msg.content.includes('light mode')) preferences.theme = 'light';
      if (msg.content.includes('short') || msg.content.includes('brief')) {
        preferences.responseLength = 'short';
      }
      if (msg.content.includes('detailed')) {
        preferences.responseLength = 'long';
      }
    });
    
    return preferences;
  };
  
  const detectMood = (text: string) => {
    // Simple sentiment analysis
    const positiveWords = ['great', 'awesome', 'love', 'happy', 'thanks'];
    const negativeWords = ['hate', 'angry', 'frustrated', 'bad', 'terrible'];
    
    const lowerText = text.toLowerCase();
    
    if (positiveWords.some(word => lowerText.includes(word))) return 'positive';
    if (negativeWords.some(word => lowerText.includes(word))) return 'negative';
    return 'neutral';
  };
  
  const identifyTask = (messages: Message[]) => {
    // Identify what user is trying to accomplish
    const lastMessage = messages[messages.length - 1]?.content.toLowerCase();
    
    if (lastMessage?.includes('code') || lastMessage?.includes('function')) {
      return 'coding';
    }
    if (lastMessage?.includes('write') || lastMessage?.includes('content')) {
      return 'writing';
    }
    if (lastMessage?.includes('design') || lastMessage?.includes('ui')) {
      return 'design';
    }
    
    return 'general';
  };
  
  return { context, analyzeContext };
};
```

---

## 2. **Auto Content Generation** ✍️

### A. AI Copywriter Engine

```tsx
// Expert pattern: Generate multiple copy variations
export const AICopywriter = () => {
  const [variations, setVariations] = useState<string[]>([]);
  
  const generateCopy = async ({
    type,
    topic,
    tone,
    length,
    keywords,
  }: {
    type: 'headline' | 'cta' | 'product-description' | 'email-subject' | 'social-post';
    topic: string;
    tone: 'professional' | 'casual' | 'urgent' | 'friendly';
    length: 'short' | 'medium' | 'long';
    keywords: string[];
  }) => {
    const prompt = buildCopyPrompt(type, topic, tone, length, keywords);
    
    const response = await fetch('/api/ai/copy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        numVariations: 5,
        temperature: 0.7,
      }),
    });
    
    const data = await response.json();
    setVariations(data.variations);
    
    return data.variations;
  };
  
  const buildCopyPrompt = (
    type: string,
    topic: string,
    tone: string,
    length: string,
    keywords: string[]
  ) => {
    const lengthMap = {
      short: 'under 10 words',
      medium: '10-25 words',
      long: '25-50 words',
    };
    
    return `Generate 5 variations of ${type} with:
    - Topic: ${topic}
    - Tone: ${tone}
    - Length: ${lengthMap[length]}
    - Include keywords: ${keywords.join(', ')}
    - Make it compelling and conversion-focused`;
  };
  
  return { generateCopy, variations };
};

// Usage
const copywriter = AICopywriter();

// Generate headlines
copywriter.generateCopy({
  type: 'headline',
  topic: 'New coffee shop opening',
  tone: 'friendly',
  length: 'short',
  keywords: ['coffee', 'fresh', 'local'],
});

// Returns:
// [
//   "Fresh Local Coffee, Brewed Just for You ☕",
//   "Your New Favorite Coffee Spot is Here!",
//   "Locally Roasted, Perfectly Brewed, Waiting for You",
//   ...
// ]
```

---

### B. Multi-Language Content Generator

```tsx
export const MultiLanguageAI = () => {
  const supportedLanguages = [
    'en', 'id', 'es', 'fr', 'de', 'ja', 'zh', 'ko', 'ar', 'pt',
  ];
  
  const generateAndTranslate = async (
    content: string,
    sourceLang: string,
    targetLangs: string[]
  ) => {
    const translations: Record<string, string> = {};
    
    // Generate translations in parallel
    await Promise.all(
      targetLangs.map(async lang => {
        const response = await fetch('/api/ai/translate', {
          method: 'POST',
          body: JSON.stringify({
            text: content,
            sourceLang,
            targetLang: lang,
            preserveTone: true,
            adaptCulture: true, // Cultural adaptation
          }),
        });
        
        const data = await response.json();
        translations[lang] = data.translated;
      })
    );
    
    return translations;
  };
  
  // Cultural adaptation examples
  const culturalAdaptations = {
    'en-US': { currency: 'USD', date: 'MM/DD/YYYY', tone: 'direct' },
    'id-ID': { currency: 'IDR', date: 'DD/MM/YYYY', tone: 'polite' },
    'ja-JP': { currency: 'JPY', date: 'YYYY/MM/DD', tone: 'formal' },
    'de-DE': { currency: 'EUR', date: 'DD.MM.YYYY', tone: 'precise' },
  };
  
  return { generateAndTranslate, supportedLanguages };
};
```

---

## 3. **Smart Recommendations Engine** 🎯

### A. Collaborative Filtering + AI

```tsx
// Expert pattern: Hybrid recommendation system
export const SmartRecommendations = () => {
  const [userProfile, setUserProfile] = useState({
    views: [],
    purchases: [],
    ratings: [],
    searchHistory: [],
    dwellTime: {},
  });
  
  const trackUserBehavior = (action: {
    type: 'view' | 'purchase' | 'rating' | 'search';
    itemId: string;
    value?: number;
    timestamp: Date;
  }) => {
    setUserProfile(prev => ({
      ...prev,
      [action.type + 's']: [...prev[action.type + 's'], action],
    }));
    
    // Track dwell time
    if (action.type === 'view') {
      setTimeout(() => {
        setUserProfile(prev => ({
          ...prev,
          dwellTime: {
            ...prev.dwellTime,
            [action.itemId]: (prev.dwellTime[action.itemId] || 0) + 1,
          },
        }));
      }, 5000); // After 5 seconds
    }
  };
  
  const getRecommendations = async (userId: string, limit = 10) => {
    // Hybrid approach:
    // 1. Collaborative filtering (users like you)
    // 2. Content-based (items like what you viewed)
    // 3. AI ranking (predict what you'll love)
    
    const response = await fetch('/api/ai/recommend', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        userProfile,
        limit,
        algorithm: 'hybrid',
        includeDiversity: true, // Don't show only same category
        freshness: 0.2, // 20% new discoveries
      }),
    });
    
    const data = await response.json();
    return data.recommendations;
  };
  
  // Explain why item is recommended
  const getRecommendationReason = (item: any, userProfile: any) => {
    const reasons = [];
    
    if (item.category === userProfile.mostViewedCategory) {
      reasons.push('Because you viewed similar items');
    }
    
    if (item.price < userProfile.averagePurchasePrice) {
      reasons.push('Great value based on your budget');
    }
    
    if (item.rating > 4.5) {
      reasons.push('Highly rated by similar users');
    }
    
    if (item.trending) {
      reasons.push('Trending now');
    }
    
    return reasons;
  };
  
  return { trackUserBehavior, getRecommendations, getRecommendationReason };
};
```

---

### B. Real-Time Personalization

```tsx
export const RealTimePersonalization = () => {
  const [sessionData, setSessionData] = useState({
    currentPage: '',
    timeOnPage: 0,
    scrollDepth: 0,
    clicks: [],
    mouseMovement: [],
  });
  
  useEffect(() => {
    // Track real-time behavior
    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      setSessionData(prev => ({ ...prev, scrollDepth: scrollPercent }));
    };
    
    const trackClicks = (e: MouseEvent) => {
      setSessionData(prev => ({
        ...prev,
        clicks: [...prev.clicks, { x: e.clientX, y: e.clientY, time: Date.now() }],
      }));
    };
    
    window.addEventListener('scroll', trackScroll);
    window.addEventListener('click', trackClicks);
    
    return () => {
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('click', trackClicks);
    };
  }, []);
  
  // Adjust UI in real-time based on behavior
  const adaptUI = () => {
    const adaptations = [];
    
    // User scrolling fast → Show more concise content
    if (sessionData.scrollDepth > 80 && sessionData.timeOnPage < 30) {
      adaptations.push({ type: 'layout', value: 'concise' });
    }
    
    // User clicking a lot → Show more interactive elements
    if (sessionData.clicks.length > 20) {
      adaptations.push({ type: 'interactivity', value: 'high' });
    }
    
    // User reading deeply → Show long-form content
    if (sessionData.timeOnPage > 180 && sessionData.scrollDepth > 50) {
      adaptations.push({ type: 'content-length', value: 'long-form' });
    }
    
    return adaptations;
  };
  
  return { sessionData, adaptUI };
};
```

---

## 4. **Voice AI Commands** 🎤

### A. Voice Navigation System

```tsx
// Expert pattern: Voice-controlled navigation
export const VoiceNavigation = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [commands, setCommands] = useState<Record<string, () => void>>({});
  
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }
    
    const SpeechRecognition = (window as any).SpeechRecognition || 
                             (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript;
      setTranscript(result);
      
      // Process commands in real-time
      if (event.results[current].isFinal) {
        processVoiceCommand(result);
      }
    };
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    // Store for manual trigger
    (window as any).voiceRecognition = recognition;
    
    return () => {
      if ((window as any).voiceRecognition) {
        (window as any).voiceRecognition.stop();
      }
    };
  }, []);
  
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Navigation commands
    if (lowerCommand.includes('go to') || lowerCommand.includes('open')) {
      const page = extractPageName(command);
      navigateTo(page);
    }
    
    // Search commands
    if (lowerCommand.includes('search for') || lowerCommand.includes('find')) {
      const query = extractSearchQuery(command);
      performSearch(query);
    }
    
    // Action commands
    if (lowerCommand.includes('scroll down')) {
      window.scrollBy({ top: 500, behavior: 'smooth' });
    }
    
    if (lowerCommand.includes('scroll up')) {
      window.scrollBy({ top: -500, behavior: 'smooth' });
    }
    
    if (lowerCommand.includes('go back')) {
      history.back();
    }
    
    // Form commands
    if (lowerCommand.includes('fill')) {
      const { field, value } = extractFormField(command);
      fillFormField(field, value);
    }
  };
  
  const startListening = () => {
    if ((window as any).voiceRecognition) {
      (window as any).voiceRecognition.start();
    }
  };
  
  const stopListening = () => {
    if ((window as any).voiceRecognition) {
      (window as any).voiceRecognition.stop();
    }
  };
  
  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    registerCommand: (command: string, handler: () => void) => {
      setCommands(prev => ({ ...prev, [command]: handler }));
    },
  };
};

// Usage
const voiceNav = VoiceNavigation();

// Custom commands
voiceNav.registerCommand('show dark mode', () => {
  document.documentElement.classList.add('dark');
});

voiceNav.registerCommand('increase text size', () => {
  document.documentElement.style.setProperty('--text-scale', '1.2');
});
```

---

## 5. **AI Image Generation** 🎨

### A. Text-to-Image Integration

```tsx
// Expert pattern: Generate images from text prompts
export const AIImageGenerator = () => {
  const [generating, setGenerating] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  
  const generateImage = async (prompt: string, options = {}) => {
    setGenerating(true);
    
    const response = await fetch('/api/ai/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        ...options,
        // Advanced options
        negativePrompt: 'blurry, low quality, distorted',
        style: 'photorealistic', // or 'artistic', 'anime', '3d'
        aspectRatio: '16:9',
        numOutputs: 4,
      }),
    });
    
    const data = await response.json();
    setImages(data.images);
    setGenerating(false);
    
    return data.images;
  };
  
  // Generate variations
  const generateVariations = async (baseImage: string) => {
    const response = await fetch('/api/ai/image-variations', {
      method: 'POST',
      body: JSON.stringify({
        image: baseImage,
        numVariations: 4,
        strength: 0.7, // How much to vary
      }),
    });
    
    return response.json();
  };
  
  // Image to image transformation
  const imageToImage = async (
    image: string,
    prompt: string,
    strength: number
  ) => {
    const response = await fetch('/api/ai/img2img', {
      method: 'POST',
      body: JSON.stringify({
        image,
        prompt,
        strength, // 0-1, how much to transform
      }),
    });
    
    return response.json();
  };
  
  return {
    generateImage,
    generateVariations,
    imageToImage,
    images,
    generating,
  };
};

// Usage examples
const imageGen = AIImageGenerator();

// Generate hero image
imageGen.generateImage(
  'Modern minimalist website hero section, gradient background, professional',
  { style: 'digital-art', aspectRatio: '16:9' }
);

// Generate product photo
imageGen.generateImage(
  'Professional product photography of coffee mug on wooden table, natural lighting',
  { style: 'photorealistic' }
);

// Generate avatar
imageGen.generateImage(
  'Friendly cartoon avatar of software developer, colorful background',
  { style: '3d-render', aspectRatio: '1:1' }
);
```

---

## Response Template

```markdown
🤖 **AI Integration Patterns - Expert Level**

Features:
- Multi-personality chatbot
- Context-aware responses
- Auto content generation
- Smart recommendations
- Voice navigation
- Image generation

Use Cases:
- Customer support automation
- Content creation at scale
- Personalized experiences
- Hands-free interaction
- Creative asset generation

Tech Stack:
- OpenAI API / Anthropic
- Speech recognition API
- Stable Diffusion / DALL-E
- Custom ML models
- Vector databases

Integration Time: 2-4 weeks
Complexity: ⭐⭐⭐ Expert
```

---

## Best Practices

```
1. Always provide fallback for AI failures
2. Show loading states clearly
3. Let users edit AI-generated content
4. Track AI usage & costs
5. Implement rate limiting
6. Cache common responses
7. A/B test AI vs human content
8. Monitor for biases
9. Provide opt-out options
10. Be transparent about AI usage
```

---

**Last Updated:** Maret 2026
**Level:** Expert
**Integration Time:** 2-4 weeks per pattern
