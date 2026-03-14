# 🧘 Mindful UX Patterns

## Purpose

Skill ini menciptakan **design yang promote mental wellness** - mengurangi stress, anxiety, dan burnout dari technology use. Fokus pada ethical design yang prioritize user wellbeing, bukan engagement at all costs.

## Core Philosophy

```
"Technology should enhance life, not consume it"
- Mindful interactions (bukan mindless scrolling)
- Stress-reducing design
- Healthy usage patterns
- Digital wellbeing first
- Ethical engagement (bukan addictive)
```

---

## 1. **Breathing Exercise Micro-Interactions** 🌬️

### A. Loading Screen Breathing

```tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const BreathingLoader = ({ isLoading }) => {
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale
  const [cycle, setCycle] = useState(0);
  
  useEffect(() => {
    if (!isLoading) return;
    
    // 4-4-4 breathing pattern (box breathing)
    const breathingCycle = async () => {
      // Inhale (4 seconds)
      setPhase('inhale');
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Hold (4 seconds)
      setPhase('hold');
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Exhale (4 seconds)
      setPhase('exhale');
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Hold after exhale (4 seconds)
      setPhase('hold-exhale');
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      setCycle(c => c + 1);
    };
    
    breathingCycle();
    const interval = setInterval(breathingCycle, 16000); // 16 seconds per cycle
    
    return () => clearInterval(interval);
  }, [isLoading]);
  
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
      <div className="text-center">
        {/* Breathing circle animation */}
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mx-auto mb-4"
          animate={{
            scale: phase === 'inhale' ? 1.5 : phase === 'exhale' ? 0.8 : 1,
            opacity: phase === 'inhale' ? 1 : phase === 'exhale' ? 0.6 : 1,
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
          }}
        />
        
        {/* Breathing instruction */}
        <motion.p
          className="text-white text-lg font-medium"
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {phase === 'inhale' && '🌬️ Inhale slowly...'}
          {phase === 'hold' && '⏸️ Hold your breath...'}
          {phase === 'exhale' && '💨 Exhale gently...'}
          {phase === 'hold-exhale' && '😌 Hold...'}
        </motion.p>
        
        {/* Cycle counter */}
        <p className="text-white/60 text-sm mt-4">
          Cycle {cycle + 1}
        </p>
        
        {/* Skip button (for users who don't want this) */}
        <button
          onClick={() => {
            // Skip loading animation
            console.log('Skip breathing exercise');
          }}
          className="mt-6 text-white/60 hover:text-white text-sm underline"
        >
          Skip to content
        </button>
      </div>
    </div>
  );
};
```

---

### B. Stress-Relief Interaction

```tsx
export const StressReliefButton = () => {
  const [pressed, setPressed] = useState(false);
  const [count, setCount] = useState(0);
  
  return (
    <button
      onMouseDown={() => {
        setPressed(true);
        setCount(c => c + 1);
      }}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-500 shadow-lg overflow-hidden"
    >
      {/* Expanding circle on press */}
      <motion.div
        className="absolute inset-0 bg-white/30 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: pressed ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl">
          {pressed ? '😌' : '🌿'}
        </span>
      </div>
      
      {/* Count display */}
      {count > 0 && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white text-sm font-medium">
          {count}
        </div>
      )}
      
      {/* Hint text */}
      <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs whitespace-nowrap">
        Press & hold to breathe
      </p>
    </button>
  );
};
```

---

## 2. **Break Reminders** ⏰

### A. Smart Break Reminder

```tsx
export const BreakReminder = ({ interval = 30 }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showReminder, setShowReminder] = useState(false);
  const [breakTaken, setBreakTaken] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 1;
        
        // Show reminder after interval minutes
        if (newTime >= interval * 60 && !breakTaken) {
          setShowReminder(true);
        }
        
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [interval, breakTaken]);
  
  const takeBreak = () => {
    setShowReminder(false);
    setBreakTaken(true);
    
    // Reset after break
    setTimeout(() => {
      setTimeElapsed(0);
      setBreakTaken(false);
    }, 300000); // 5 minutes break
  };
  
  const dismissReminder = () => {
    setShowReminder(false);
    // Remind again in 10 minutes
    setTimeout(() => {
      setShowReminder(true);
    }, 600000);
  };
  
  if (!showReminder) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
      >
        <div className="text-center">
          {/* Icon */}
          <div className="text-6xl mb-4">
            🌿
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Time for a Break!
          </h2>
          
          <p className="text-gray-600 mb-6">
            You've been working for {interval} minutes. 
            Your body and mind deserve a rest.
          </p>
          
          {/* Break suggestions */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">
              Quick Break Ideas:
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Stand up and stretch</li>
              <li>• Look at something 20 feet away (20-20-20 rule)</li>
              <li>• Take 5 deep breaths</li>
              <li>• Walk around for 2 minutes</li>
            </ul>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-4">
            <button
              onClick={takeBreak}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Take 5-min Break
            </button>
            
            <button
              onClick={dismissReminder}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Remind Later
            </button>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-6">
            <div className="text-xs text-gray-500 mb-1">
              Session time: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(100, (timeElapsed / (interval * 60)) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
```

---

### B. 20-20-20 Eye Care Rule

```tsx
export const EyeCareReminder = () => {
  const [seconds, setSeconds] = useState(0);
  const [showReminder, setShowReminder] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        // 20 minutes = 1200 seconds
        if (prev >= 1200) {
          setShowReminder(true);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const completeExercise = () => {
    setShowReminder(false);
    setSeconds(0);
  };
  
  if (!showReminder) return null;
  
  return (
    <div className="fixed top-4 right-4 w-80 bg-white rounded-xl shadow-2xl p-6 z-50 animate-slide-in-right">
      <div className="flex items-start space-x-4">
        <div className="text-4xl">👁️</div>
        
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 mb-1">
            20-20-20 Eye Exercise
          </h3>
          
          <p className="text-sm text-gray-600 mb-3">
            Every 20 minutes, look at something 20 feet away for 20 seconds.
          </p>
          
          {/* 20-second countdown */}
          <EyeCareCountdown onComplete={completeExercise} />
        </div>
      </div>
    </div>
  );
};

const EyeCareCountdown = ({ onComplete }) => {
  const [remaining, setRemaining] = useState(20);
  
  useEffect(() => {
    if (remaining <= 0) {
      onComplete();
      return;
    }
    
    const timer = setInterval(() => {
      setRemaining(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [remaining, onComplete]);
  
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Look away from screen</span>
        <span>{remaining}s</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <motion.div
          className="bg-blue-600 h-3 rounded-full"
          initial={{ width: '100%' }}
          animate={{ width: `${(remaining / 20) * 100}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </div>
      
      <button
        onClick={onComplete}
        className="mt-3 text-xs text-blue-600 hover:underline"
      >
        Skip
      </button>
    </div>
  );
};
```

---

## 3. **Focus Mode** 🎯

### A. Distraction-Free Mode

```tsx
export const FocusMode = () => {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(25); // Pomodoro default
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  
  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isActive, timeRemaining]);
  
  const toggleFocusMode = () => {
    if (isActive) {
      setIsActive(false);
      document.documentElement.classList.remove('focus-mode');
    } else {
      setIsActive(true);
      document.documentElement.classList.add('focus-mode');
      setTimeRemaining(duration * 60);
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <>
      {/* Focus mode styles */}
      <style jsx global>{`
        .focus-mode {
          // Hide non-essential elements
          --hidden-elements: '.advertisement, .sidebar, .related-content, .comments, .non-essential';
        }
        
        .focus-mode .advertisement,
        .focus-mode .sidebar,
        .focus-mode .related-content,
        .focus-mode .comments,
        .focus-mode .non-essential {
          display: none !important;
        }
        
        // Reduce animations
        .focus-mode * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        
        // Simplify colors
        .focus-mode {
          filter: grayscale(0.2);
        }
        
        // Maximize main content
        .focus-mode main,
        .focus-mode .main-content {
          max-width: 100% !important;
          margin: 0 auto !important;
        }
        
        // Hide notifications
        .focus-mode .notification,
        .focus-mode .toast,
        .focus-mode [role="alert"] {
          display: none !important;
        }
      `}</style>
      
      {/* Focus mode toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        {isActive ? (
          <div className="bg-white rounded-xl shadow-2xl p-4 w-64">
            {/* Timer display */}
            <div className="text-center mb-4">
              <div className="text-4xl font-mono font-bold text-gray-800 mb-2">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm text-gray-600">
                Focus Mode Active
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${(timeRemaining / (duration * 60)) * 100}%` }}
              />
            </div>
            
            {/* Controls */}
            <div className="flex space-x-2">
              <button
                onClick={toggleFocusMode}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                End Session
              </button>
              
              <button
                onClick={() => {
                  setTimeRemaining(duration * 60);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Restart
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={toggleFocusMode}
            className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
          >
            <span>🎯</span>
            <span>Focus Mode</span>
          </button>
        )}
      </div>
    </>
  );
};
```

---

### B. Notification Batching

```tsx
export const NotificationBatcher = () => {
  const [notifications, setNotifications] = useState([]);
  const [batchMode, setBatchMode] = useState(true);
  const [nextDelivery, setNextDelivery] = useState(null);
  
  useEffect(() => {
    if (!batchMode) return;
    
    // Batch notifications, deliver every 30 minutes
    const deliveryTime = new Date();
    deliveryTime.setMinutes(Math.ceil(deliveryTime.getMinutes() / 30) * 30);
    setNextDelivery(deliveryTime);
    
    const interval = setInterval(() => {
      const now = new Date();
      if (now >= deliveryTime && notifications.length > 0) {
        // Deliver batched notifications
        deliverBatch();
        
        // Set next delivery
        const next = new Date();
        next.setMinutes(Math.ceil(next.getMinutes() / 30) * 30);
        setNextDelivery(next);
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [batchMode, notifications]);
  
  const deliverBatch = () => {
    // Show all batched notifications at once
    console.log('Delivering batch:', notifications);
    setNotifications([]);
  };
  
  const addNotification = (notification) => {
    if (batchMode) {
      setNotifications(prev => [...prev, notification]);
    } else {
      // Show immediately
      console.log('Immediate notification:', notification);
    }
  };
  
  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Batch mode indicator */}
      {batchMode && notifications.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-3 mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📬</span>
            <div>
              <div className="font-medium text-sm">
                {notifications.length} notification{notifications.length > 1 ? 's' : ''} batched
              </div>
              <div className="text-xs text-gray-500">
                Next delivery: {nextDelivery?.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Toggle button */}
      <button
        onClick={() => setBatchMode(!batchMode)}
        className={`
          px-4 py-2 rounded-full shadow-lg font-medium transition-colors
          ${batchMode 
            ? 'bg-green-600 text-white' 
            : 'bg-gray-200 text-gray-800'
          }
        `}
      >
        {batchMode ? '📦 Batch Mode ON' : '🔔 Batch Mode OFF'}
      </button>
    </div>
  );
};
```

---

## 4. **Digital Wellbeing Dashboard** 📊

### A. Screen Time Tracker

```tsx
export const ScreenTimeTracker = () => {
  const [screenTime, setScreenTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  
  useEffect(() => {
    if (!isActive) return;
    
    const timer = setInterval(() => {
      setScreenTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isActive]);
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };
  
  const getWellbeingMessage = () => {
    const hours = screenTime / 3600;
    
    if (hours < 2) {
      return { message: 'Great balance! 🌟', color: 'green' };
    } else if (hours < 4) {
      return { message: 'Moderate usage 👍', color: 'yellow' };
    } else if (hours < 6) {
      return { message: 'Consider a break 🧘', color: 'orange' };
    } else {
      return { message: 'Time to disconnect! 🌿', color: 'red' };
    }
  };
  
  const wellbeing = getWellbeingMessage();
  
  return (
    <div className="fixed bottom-4 left-4 bg-white rounded-xl shadow-lg p-4 z-50 w-72">
      <h3 className="font-bold text-gray-800 mb-3 flex items-center">
        <span className="text-2xl mr-2">📱</span>
        Screen Time
      </h3>
      
      {/* Time display */}
      <div className="text-3xl font-mono font-bold text-gray-800 mb-2">
        {formatTime(screenTime)}
      </div>
      
      {/* Wellbeing message */}
      <div className={`text-sm text-${wellbeing.color}-600 font-medium mb-3`}>
        {wellbeing.message}
      </div>
      
      {/* Progress to goal */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Daily goal: 4h</span>
          <span>{Math.round((screenTime / 14400) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              screenTime > 14400 ? 'bg-red-600' : 'bg-green-600'
            }`}
            style={{ width: `${Math.min(100, (screenTime / 14400) * 100)}%` }}
          />
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex space-x-2">
        <button
          onClick={() => setScreenTime(0)}
          className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-800 rounded text-xs font-medium hover:bg-gray-300"
        >
          Reset
        </button>
        
        <button
          onClick={() => setIsActive(!isActive)}
          className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700"
        >
          {isActive ? 'Pause' : 'Resume'}
        </button>
      </div>
    </div>
  );
};
```

---

### B. Usage Insights

```tsx
export const UsageInsights = () => {
  const [insights, setInsights] = useState({
    dailyAverage: 4.5,
    weeklyTotal: 31.5,
    mostUsedFeature: 'Dashboard',
    peakHour: '2:00 PM',
    breakCount: 3,
  });
  
  const recommendations = [
    {
      type: 'positive',
      message: 'You took 3 breaks today! Great job maintaining balance.',
      icon: '✅',
    },
    {
      type: 'warning',
      message: 'Screen time is 20% higher than last week.',
      icon: '⚠️',
    },
    {
      type: 'suggestion',
      message: 'Try using Focus Mode during work hours.',
      icon: '💡',
    },
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
      <h3 className="font-bold text-lg mb-4 flex items-center">
        <span className="text-2xl mr-2">📊</span>
        Usage Insights
      </h3>
      
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-600">
            {insights.dailyAverage}h
          </div>
          <div className="text-xs text-blue-700">Daily Average</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-600">
            {insights.weeklyTotal}h
          </div>
          <div className="text-xs text-green-700">This Week</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-purple-600">
            {insights.mostUsedFeature}
          </div>
          <div className="text-xs text-purple-700">Most Used</div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-orange-600">
            {insights.breakCount}
          </div>
          <div className="text-xs text-orange-700">Breaks Today</div>
        </div>
      </div>
      
      {/* Recommendations */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3">Recommendations</h4>
        
        <div className="space-y-2">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className={`
                p-3 rounded-lg flex items-start space-x-3
                ${rec.type === 'positive' ? 'bg-green-50' : ''}
                ${rec.type === 'warning' ? 'bg-yellow-50' : ''}
                ${rec.type === 'suggestion' ? 'bg-blue-50' : ''}
              `}
            >
              <span className="text-xl">{rec.icon}</span>
              <p className="text-sm text-gray-700 flex-1">
                {rec.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

---

## 5. **Gentle Animations** 🌊

### A. Reduced Motion Detection

```tsx
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
};

// Animation component yang respect user preference
export const MindfulAnimation = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={
        prefersReducedMotion
          ? { opacity: 1 }
          : {
              opacity: [0, 1],
              y: [20, 0],
            }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: 0.6,
              ease: 'easeOut',
            }
      }
    >
      {children}
    </motion.div>
  );
};
```

---

### B. Calming Color Transitions

```tsx
export const CalmingTheme = () => {
  const [theme, setTheme] = useState('light'); // light, dark, calm
  
  const themes = {
    light: {
      background: '#F8FAFC',
      primary: '#3B82F6',
      text: '#1E293B',
      name: 'Bright & Clear',
    },
    dark: {
      background: '#0F172A',
      primary: '#60A5FA',
      text: '#F1F5F9',
      name: 'Dark Mode',
    },
    calm: {
      background: '#ECFDF5',
      primary: '#10B981',
      text: '#064E3B',
      name: 'Calming Green',
    },
  };
  
  return (
    <div
      className="min-h-screen transition-colors duration-1000"
      style={{
        background: themes[theme].background,
        color: themes[theme].text,
      }}
    >
      {/* Theme switcher */}
      <div className="fixed bottom-4 right-4 flex space-x-2">
        {Object.entries(themes).map(([key, t]) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            className={`
              px-4 py-2 rounded-full shadow-lg font-medium transition-all
              ${theme === key ? 'ring-2 ring-offset-2 ring-blue-600 scale-105' : ''}
            `}
            style={{
              background: t.background,
              color: t.text,
              border: `2px solid ${t.primary}`,
            }}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
};
```

---

## Response Template

```markdown
🧘 **Mindful UX Patterns - Activated!**

Saya sudah siapkan design yang promote mental wellness:

### 🎯 Features:

1. **Breathing Exercises**
   - Loading screen breathing (4-4-4 technique)
   - Stress-relief interactions
   - Micro-moments of calm

2. **Break Reminders**
   - Smart work/break intervals
   - 20-20-20 eye care rule
   - Stretching suggestions

3. **Focus Mode**
   - Distraction-free interface
   - Notification batching
   - Pomodoro timer built-in

4. **Digital Wellbeing**
   - Screen time tracking
   - Usage insights
   - Healthy usage recommendations

5. **Gentle Animations**
   - Reduced motion support
   - Calming color transitions
   - Slow, smooth interactions

### 🛡️ Why Mindful:

- ✅ Wellness-first design
- ✅ Ethical engagement (bukan addictive)
- ✅ Mental health focus
- ✅ User appreciation
- ✅ Sustainable usage

### 🎯 Use Cases:

- Productivity apps
- Social media platforms
- Work tools
- Mental health apps
- Any app dengan high engagement

Mau implement yang mana?
```

---

## Integration Example

```tsx
import {
  MindfulProvider,
  BreathingLoader,
  BreakReminder,
  FocusMode,
  ScreenTimeTracker,
  CalmingTheme,
} from 'mindful-ux-patterns';

function App() {
  return (
    <MindfulProvider>
      <CalmingTheme />
      <BreathingLoader isLoading={loading} />
      <BreakReminder interval={30} />
      <FocusMode />
      <ScreenTimeTracker />
      
      <MainApp />
    </MindfulProvider>
  );
}
```

---

**Last Updated:** Maret 2026
**Philosophy:** Ethical Design, Digital Wellbeing First
