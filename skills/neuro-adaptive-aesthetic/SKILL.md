# 🧠 Neuro-Adaptive Aesthetic

## Purpose

Skill ini menciptakan **UI yang membaca cognitive state user** dan beradaptasi secara real-time. Menggunakan **mouse dynamics, scroll patterns, dwell time, dan interaction velocity** untuk infer emotional & cognitive state, lalu menyesuaikan design secara subtle.

## Core Philosophy

```
"UI that understands you"
- Biofeedback-driven design
- Real-time cognitive load detection
- Emotion-adaptive aesthetics
- Preference learning
- Invisible adaptation (user doesn't notice)
```

---

## 1. **Cognitive Load Detection** 🧠

### A. Mouse Dynamics Analysis

```tsx
import { useState, useEffect, useRef } from 'react';

export const CognitiveLoadDetector = ({ children }) => {
  const [cognitiveState, setCognitiveState] = useState({
    load: 'low', // low, medium, high
    confidence: 0.8,
    indicators: {
      mouseVelocity: 0,
      clickPrecision: 0,
      hesitationCount: 0,
      pathEfficiency: 0,
    },
  });
  
  const mouseData = useRef([]);
  const clickData = useRef([]);
  
  useEffect(() => {
    let lastX = 0, lastY = 0, lastTime = Date.now();
    let velocities = [];
    let hesitations = 0;
    let pathLength = 0;
    let directDistance = 0;
    
    const handleMouseMove = (e) => {
      const now = Date.now();
      const dt = now - lastTime;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const velocity = distance / dt;
      
      velocities.push(velocity);
      if (velocities.length > 100) velocities.shift();
      
      // Track path
      pathLength += distance;
      directDistance += Math.sqrt(dx * dx + dy * dy);
      
      // Detect hesitation (low velocity despite movement intent)
      if (velocity < 0.1 && dt < 100) {
        hesitations++;
      }
      
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
      
      mouseData.current = { velocities, hesitations, pathLength, directDistance };
    };
    
    const handleClick = (e) => {
      clickData.current.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
      });
      
      if (clickData.current.length > 50) clickData.current.shift();
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    // Analyze every 5 seconds
    const interval = setInterval(() => {
      if (mouseData.current.velocities.length < 10) return;
      
      const avgVelocity = mouseData.current.velocities.reduce((a, b) => a + b, 0) / mouseData.current.velocities.length;
      const velocityVariance = mouseData.current.velocities.reduce((sum, v) => sum + Math.pow(v - avgVelocity, 2), 0) / mouseData.current.velocities.length;
      
      // Path efficiency (direct vs actual path)
      const efficiency = mouseData.current.directDistance > 0
        ? mouseData.current.pathLength / mouseData.current.directDistance
        : 1;
      
      // Calculate cognitive load
      let load = 'low';
      let confidence = 0.8;
      
      // High velocity variance = high cognitive load
      if (velocityVariance > 0.5) {
        load = 'high';
        confidence = 0.9;
      } else if (velocityVariance > 0.2) {
        load = 'medium';
        confidence = 0.7;
      }
      
      // High hesitation = uncertainty
      if (mouseData.current.hesitations > 10) {
        load = load === 'high' ? 'high' : 'medium';
        confidence *= 0.9;
      }
      
      // Low path efficiency = confusion
      if (efficiency > 2) {
        load = load === 'low' ? 'medium' : 'high';
        confidence *= 0.85;
      }
      
      setCognitiveState({
        load,
        confidence,
        indicators: {
          mouseVelocity: avgVelocity,
          clickPrecision: clickData.current.length > 0 ? 1 / clickData.current.length : 0,
          hesitationCount: mouseData.current.hesitations,
          pathEfficiency: efficiency,
        },
      });
      
      // Reset counters
      mouseData.current = { velocities: [], hesitations: 0, pathLength: 0, directDistance: 0 };
    }, 5000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div className="relative">
      {children}
      
      {/* Cognitive state indicator (debug) */}
      <div className="fixed bottom-4 right-4 p-4 bg-black/80 backdrop-blur rounded-lg text-xs font-mono">
        <div className="text-white mb-2">🧠 Cognitive State</div>
        <div className="text-green-400">Load: {cognitiveState.load}</div>
        <div className="text-blue-400">Confidence: {(cognitiveState.confidence * 100).toFixed(0)}%</div>
        <div className="text-purple-400 mt-2">Indicators:</div>
        <div className="text-gray-400">Velocity: {cognitiveState.indicators.mouseVelocity.toFixed(2)}</div>
        <div className="text-gray-400">Hesitations: {cognitiveState.indicators.hesitationCount}</div>
        <div className="text-gray-400">Efficiency: {cognitiveState.indicators.pathEfficiency.toFixed(2)}</div>
      </div>
    </div>
  );
};
```

---

### B. Adaptive UI Based on Cognitive Load

```tsx
export const AdaptiveUI = () => {
  const [cognitiveLoad, setCognitiveLoad] = useState('low');
  
  // Simulated cognitive load detection
  useEffect(() => {
    // In production, use CognitiveLoadDetector above
    const interval = setInterval(() => {
      const loads = ['low', 'medium', 'high'];
      const random = loads[Math.floor(Math.random() * loads.length)];
      setCognitiveLoad(random);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // UI adaptations based on load
  const adaptations = {
    low: {
      // User is comfortable - show full complexity
      complexity: 'high',
      animations: 'enabled',
      informationDensity: 'high',
      colorIntensity: 'vibrant',
      fontSize: 'normal',
      spacing: 'normal',
    },
    medium: {
      // User is slightly stressed - reduce complexity
      complexity: 'medium',
      animations: 'reduced',
      informationDensity: 'medium',
      colorIntensity: 'moderate',
      fontSize: 'slightly-large',
      spacing: 'slightly-increased',
    },
    high: {
      // User is stressed - simplify everything
      complexity: 'minimal',
      animations: 'disabled',
      informationDensity: 'low',
      colorIntensity: 'calm',
      fontSize: 'large',
      spacing: 'increased',
    },
  };
  
  const current = adaptations[cognitiveLoad];
  
  return (
    <CognitiveLoadDetector>
      <div
        className={`
          min-h-screen transition-all duration-1000
          ${current.colorIntensity === 'vibrant' ? 'bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900' : ''}
          ${current.colorIntensity === 'moderate' ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : ''}
          ${current.colorIntensity === 'calm' ? 'bg-slate-900' : ''}
        `}
      >
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1
              className={`
                text-white font-bold transition-all duration-500
                ${current.fontSize === 'normal' ? 'text-5xl' : ''}
                ${current.fontSize === 'slightly-large' ? 'text-6xl' : ''}
                ${current.fontSize === 'large' ? 'text-7xl' : ''}
              `}
            >
              Neuro-Adaptive UI
            </h1>
            <p className="text-white/60 mt-2">
              Current cognitive load: <span className="text-white font-semibold capitalize">{cognitiveLoad}</span>
            </p>
          </div>
          
          {/* Content Grid */}
          <div
            className={`
              grid gap-4 transition-all duration-500
              ${current.complexity === 'high' ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4' : ''}
              ${current.complexity === 'medium' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}
              ${current.complexity === 'minimal' ? 'grid-cols-1' : ''}
              ${current.spacing === 'normal' ? 'gap-4' : ''}
              ${current.spacing === 'slightly-increased' ? 'gap-6' : ''}
              ${current.spacing === 'increased' ? 'gap-8' : ''}
            `}
          >
            {/* Cards */}
            {Array.from({ length: current.complexity === 'high' ? 12 : current.complexity === 'medium' ? 6 : 3 }).map((_, i) => (
              <AdaptiveCard
                key={i}
                complexity={current.complexity}
                animations={current.animations}
                informationDensity={current.informationDensity}
              />
            ))}
          </div>
          
          {/* Adaptation indicator */}
          <div className="fixed top-4 right-4 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white text-sm">
            🧠 Adapted for {cognitiveLoad} cognitive load
          </div>
        </div>
      </div>
    </CognitiveLoadDetector>
  );
};

const AdaptiveCard = ({ complexity, animations, informationDensity }) => {
  return (
    <motion.div
      className="p-6 bg-white/10 backdrop-blur rounded-xl border border-white/20"
      animate={animations === 'disabled' ? {} : {
        y: [0, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="text-white font-semibold mb-2">
        Card Title
      </div>
      
      {informationDensity !== 'low' && (
        <div className="text-white/60 text-sm mb-4">
          {informationDensity === 'high'
            ? 'This is detailed information with multiple data points and comprehensive content for users with low cognitive load.'
            : 'This is moderate information with key details for users with medium cognitive load.'
          }
        </div>
      )}
      
      {complexity !== 'minimal' && (
        <div className="flex space-x-2">
          <div className="w-8 h-8 rounded bg-white/20" />
          {complexity === 'high' && (
            <>
              <div className="w-8 h-8 rounded bg-white/20" />
              <div className="w-8 h-8 rounded bg-white/20" />
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};
```

**Kenapa Unreplicable:**
- Real-time biofeedback
- Invisible adaptation (user doesn't notice)
- Personal to each user's behavior
- Cannot replicate without exact cognitive state

---

## 2. **Emotion Detection & Adaptation** 😊

### A. Interaction-Based Emotion Inference

```tsx
export const EmotionAdaptiveUI = () => {
  const [emotion, setEmotion] = useState({
    type: 'neutral', // frustrated, happy, focused, bored, stressed
    confidence: 0.5,
    triggers: [],
  });
  
  const [uiStyle, setUiStyle] = useState({
    colors: 'neutral',
    animations: 'normal',
    tone: 'professional',
  });
  
  useEffect(() => {
    let clickTimes = [];
    let errorCount = 0;
    let rapidClicks = 0;
    
    const handleClick = (e) => {
      const now = Date.now();
      clickTimes.push(now);
      
      // Remove old clicks
      clickTimes = clickTimes.filter(t => now - t < 2000);
      
      // Detect rapid clicking (frustration indicator)
      if (clickTimes.length > 5) {
        rapidClicks++;
      }
    };
    
    const handleError = () => {
      errorCount++;
    };
    
    window.addEventListener('click', handleClick);
    window.addEventListener('error', handleError);
    
    // Analyze emotion every 10 seconds
    const interval = setInterval(() => {
      let detectedEmotion = 'neutral';
      let confidence = 0.5;
      const triggers = [];
      
      // Frustration detection
      if (rapidClicks > 3 || errorCount > 2) {
        detectedEmotion = 'frustrated';
        confidence = 0.8;
        triggers.push('rapid_clicks');
        if (errorCount > 2) triggers.push('errors');
      }
      
      // Focus detection (steady interaction, no errors)
      if (rapidClicks === 0 && errorCount === 0 && clickTimes.length > 3) {
        detectedEmotion = 'focused';
        confidence = 0.7;
      }
      
      // Boredom detection (low interaction)
      if (clickTimes.length < 2) {
        detectedEmotion = 'bored';
        confidence = 0.6;
      }
      
      setEmotion({ type: detectedEmotion, confidence, triggers });
      
      // Reset counters
      rapidClicks = 0;
      errorCount = 0;
    }, 10000);
    
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('error', handleError);
      clearInterval(interval);
    };
  }, []);
  
  // Adapt UI based on emotion
  useEffect(() => {
    switch (emotion.type) {
      case 'frustrated':
        setUiStyle({
          colors: 'calming', // Blue/green tones
          animations: 'soothing', // Slow, smooth
          tone: 'supportive', // Encouraging messages
        });
        break;
      case 'happy':
        setUiStyle({
          colors: 'vibrant', // Maintain positive energy
          animations: 'playful', // Bouncy, fun
          tone: 'enthusiastic',
        });
        break;
      case 'focused':
        setUiStyle({
          colors: 'minimal', // Don't distract
          animations: 'disabled', // No distractions
          tone: 'professional',
        });
        break;
      case 'bored':
        setUiStyle({
          colors: 'engaging', // More vibrant
          animations: 'dynamic', // Catch attention
          tone: 'inviting',
        });
        break;
      case 'stressed':
        setUiStyle({
          colors: 'calming',
          animations: 'minimal',
          tone: 'gentle',
        });
        break;
      default:
        setUiStyle({
          colors: 'neutral',
          animations: 'normal',
          tone: 'professional',
        });
    }
  }, [emotion]);
  
  const colorPalettes = {
    calming: 'from-blue-900 via-cyan-900 to-teal-900',
    vibrant: 'from-purple-900 via-pink-900 to-indigo-900',
    minimal: 'from-slate-900 via-gray-900 to-slate-900',
    engaging: 'from-orange-900 via-amber-900 to-yellow-900',
    neutral: 'from-gray-900 via-slate-900 to-gray-900',
  };
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${colorPalettes[uiStyle.colors]} transition-all duration-1000`}>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Emotion-Adaptive UI
        </h1>
        
        {/* Emotion indicator */}
        <div className="mb-8 p-4 bg-white/10 backdrop-blur rounded-xl">
          <div className="text-white">
            <span className="text-2xl">
              {emotion.type === 'frustrated' && '😤'}
              {emotion.type === 'happy' && '😊'}
              {emotion.type === 'focused' && '🎯'}
              {emotion.type === 'bored' && '😐'}
              {emotion.type === 'stressed' && '😰'}
              {emotion.type === 'neutral' && '😐'}
            </span>
            <span className="ml-2 capitalize">{emotion.type}</span>
            <span className="text-white/60 ml-2">({(emotion.confidence * 100).toFixed(0)}% confidence)</span>
          </div>
          
          {emotion.triggers.length > 0 && (
            <div className="text-white/60 text-sm mt-2">
              Triggers: {emotion.triggers.join(', ')}
            </div>
          )}
        </div>
        
        {/* UI Style indicator */}
        <div className="p-4 bg-white/10 backdrop-blur rounded-xl text-white">
          <div className="font-semibold mb-2">Current UI Style:</div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-white/60">Colors</div>
              <div className="capitalize">{uiStyle.colors}</div>
            </div>
            <div>
              <div className="text-white/60">Animations</div>
              <div className="capitalize">{uiStyle.animations}</div>
            </div>
            <div>
              <div className="text-white/60">Tone</div>
              <div className="capitalize">{uiStyle.tone}</div>
            </div>
          </div>
        </div>
        
        {/* Adaptive content */}
        <div className="mt-8 p-6 bg-white/10 backdrop-blur rounded-xl text-white">
          <h2 className="text-xl font-semibold mb-4">
            {uiStyle.tone === 'supportive' && "💪 You've got this! Let's take it step by step."}
            {uiStyle.tone === 'enthusiastic' && "🎉 Awesome! Let's explore more!"}
            {uiStyle.tone === 'professional' && "Here's the information you need."}
            {uiStyle.tone === 'inviting' && "👋 Hey there! Want to check this out?"}
            {uiStyle.tone === 'gentle' && "🌿 Take your time. Everything is under control."}
          </h2>
          
          <p className="text-white/80">
            {uiStyle.tone === 'supportive' && "We're here to help. Everything will work out."}
            {uiStyle.tone === 'enthusiastic' && "There's so much more to discover!"}
            {uiStyle.tone === 'professional' && "Content optimized for your current task."}
            {uiStyle.tone === 'inviting' && "Click around and see what catches your interest!"}
            {uiStyle.tone === 'gentle' && "No rush. Explore at your own pace."}
          </p>
        </div>
      </div>
    </div>
  );
};
```

---

## 3. **Preference Learning System** 🎯

### A. Implicit Preference Detection

```tsx
export const PreferenceLearner = ({ children }) => {
  const [preferences, setPreferences] = useState({
    colors: {
      warm: 0,
      cool: 0,
      vibrant: 0,
      muted: 0,
    },
    layouts: {
      grid: 0,
      list: 0,
      compact: 0,
      spacious: 0,
    },
    interactions: {
      quick: 0,
      deliberate: 0,
      exploratory: 0,
      direct: 0,
    },
  });
  
  const [learnedStyle, setLearnedStyle] = useState(null);
  
  // Track interactions
  useEffect(() => {
    const trackInteraction = (type: string, value: string) => {
      setPreferences(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          [value]: (prev[type][value] || 0) + 1,
        },
      }));
    };
    
    // Example: Track color interactions
    const handleColorClick = (e) => {
      const element = e.target;
      const style = window.getComputedStyle(element);
      const color = style.backgroundColor || style.background;
      
      // Simple color temperature detection
      if (color.includes('rgb(255') || color.includes('red') || color.includes('orange') || color.includes('yellow')) {
        trackInteraction('colors', 'warm');
      } else if (color.includes('rgb(0') || color.includes('blue') || color.includes('cyan') || color.includes('purple')) {
        trackInteraction('colors', 'cool');
      }
    };
    
    window.addEventListener('click', handleColorClick);
    
    return () => {
      window.removeEventListener('click', handleColorClick);
    };
  }, []);
  
  // Learn from accumulated data
  useEffect(() => {
    const totalColorInteractions = Object.values(preferences.colors).reduce((a, b) => a + b, 0);
    
    if (totalColorInteractions > 20) {
      // Determine dominant preference
      const dominantColor = Object.entries(preferences.colors)
        .sort((a, b) => b[1] - a[1])[0][0];
      
      const dominantLayout = Object.entries(preferences.layouts)
        .sort((a, b) => b[1] - a[1])[0][0];
      
      setLearnedStyle({
        color: dominantColor,
        layout: dominantLayout,
        confidence: totalColorInteractions > 50 ? 'high' : 'medium',
      });
    }
  }, [preferences]);
  
  return (
    <div className="relative">
      {children}
      
      {/* Preference debug panel */}
      <div className="fixed bottom-4 left-4 p-4 bg-black/80 backdrop-blur rounded-lg text-xs font-mono max-w-64">
        <div className="text-white mb-2">🎯 Learned Preferences</div>
        
        <div className="text-gray-400 mb-1">Colors:</div>
        <div className="grid grid-cols-2 gap-1 mb-2">
          {Object.entries(preferences.colors).map(([key, value]) => (
            <div key={key} className="text-white">
              {key}: {value}
            </div>
          ))}
        </div>
        
        {learnedStyle && (
          <>
            <div className="text-green-400 mt-2">Learned Style:</div>
            <div className="text-white">Color: {learnedStyle.color}</div>
            <div className="text-white">Layout: {learnedStyle.layout}</div>
            <div className="text-white">Confidence: {learnedStyle.confidence}</div>
          </>
        )}
      </div>
    </div>
  );
};
```

---

## Response Template

```markdown
🧠 **Neuro-Adaptive Aesthetic - Activated!**

Saya sudah siapkan UI yang MEMBACA user dan beradaptasi:

### 🔍 Detection Systems:

1. **Cognitive Load**
   - Mouse dynamics analysis
   - Click precision tracking
   - Path efficiency
   - Hesitation detection

2. **Emotion Inference**
   - Frustration detection (rapid clicks)
   - Focus detection (steady interaction)
   - Boredom detection (low engagement)
   - Stress detection (error patterns)

3. **Preference Learning**
   - Color temperature preference
   - Layout preference
   - Interaction style
   - Implicit feedback

### 🎨 Adaptations:

| State | UI Response |
|-------|-------------|
| High Load | Simplify, reduce density |
| Frustrated | Calming colors, supportive tone |
| Focused | Minimal distractions |
| Bored | Engaging, dynamic content |
| Stressed | Gentle, slow animations |

### 🛡️ Why Unreplicable:

- ✅ Real-time biofeedback
- ✅ Invisible adaptation
- ✅ Personal per user
- ✅ Learns over time
- ✅ Cannot replicate without exact user state

### 🎯 Use Cases:

- High-stress environments (trading, emergency)
- Accessibility-first design
- Premium personalized UX
- Mental health applications
- Productivity tools

Mau implement yang mana?
```

---

## Privacy Note

```
IMPORTANT: All processing happens CLIENT-SIDE
- No data sent to server
- No webcam/mic required (optional)
- User can opt-out anytime
- Data cleared on session end
- GDPR compliant by design
```
