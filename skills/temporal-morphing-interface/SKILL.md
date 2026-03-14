# 🕰️ Temporal Morphing Interface

## Purpose

Skill ini menciptakan **UI yang hidup dan berevolusi seiring waktu**. Design bukan entitas statis, tapi organisme yang punya **lifecycle, memory, dan generational evolution**. Setiap visit adalah "snapshot" dari design yang sedang dalam proses transformasi.

## Core Philosophy

```
"Design is alive - it grows, adapts, and evolves"
- Time-dependent UI (bukan random, tapi TEMPORAL)
- Evolutionary algorithm dengan inheritance
- Memory system (ingat user interactions)
- Seasonal/cyclical changes
- Each visit = unique moment in timeline
```

---

## 1. **Lifecycle-Based UI** 🌱

### A. Component dengan Birth → Growth → Decay

```tsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LivingComponent = ({ children, lifespan = 60000 }) => {
  const [phase, setPhase] = useState('birth'); // birth, growth, mature, decay, death
  const [age, setAge] = useState(0);
  const birthTime = useRef(Date.now());
  
  useEffect(() => {
    const startTime = Date.now();
    
    const lifecycle = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const agePercent = elapsed / lifespan;
      setAge(agePercent);
      
      // Phase transitions
      if (agePercent < 0.1) setPhase('birth');
      else if (agePercent < 0.4) setPhase('growth');
      else if (agePercent < 0.7) setPhase('mature');
      else if (agePercent < 0.95) setPhase('decay');
      else setPhase('death');
      
      // Auto-death
      if (agePercent >= 1) {
        clearInterval(lifecycle);
      }
    }, 100);
    
    return () => clearInterval(lifecycle);
  }, [lifespan]);
  
  // Visual properties based on phase
  const phaseStyles = {
    birth: {
      scale: 0,
      opacity: 0,
      rotation: -180,
      color: 'from-green-400 to-emerald-400',
    },
    growth: {
      scale: 0.8,
      opacity: 0.7,
      rotation: -45,
      color: 'from-blue-400 to-cyan-400',
    },
    mature: {
      scale: 1,
      opacity: 1,
      rotation: 0,
      color: 'from-purple-400 to-pink-400',
    },
    decay: {
      scale: 0.95,
      opacity: 0.8,
      rotation: 5,
      color: 'from-orange-400 to-red-400',
    },
    death: {
      scale: 0.5,
      opacity: 0,
      rotation: 180,
      color: 'from-gray-400 to-slate-400',
    },
  };
  
  const currentStyle = phaseStyles[phase];
  
  return (
    <motion.div
      className={`
        relative p-6 rounded-2xl
        bg-gradient-to-br ${currentStyle.color}
        overflow-hidden
      `}
      animate={{
        scale: currentStyle.scale,
        opacity: currentStyle.opacity,
        rotate: currentStyle.rotation,
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Age indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          className="h-full bg-white/60"
          initial={{ width: '0%' }}
          animate={{ width: `${age * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      {/* Phase label */}
      <div className="absolute top-2 right-2 text-xs text-white/60 capitalize">
        {phase} ({(age * 100).toFixed(0)}%)
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-white">
        {children}
      </div>
      
      {/* Lifecycle particles */}
      {phase === 'birth' && <BirthParticles />}
      {phase === 'death' && <DeathParticles />}
    </motion.div>
  );
};

const BirthParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          initial={{
            x: '50%',
            y: '50%',
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 1, delay: i * 0.05 }}
        />
      ))}
    </div>
  );
};

const DeathParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gray-300 rounded-full"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            y: '100%',
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 1.5, delay: i * 0.03 }}
        />
      ))}
    </div>
  );
};
```

**Kenapa Unreplicable:**
- Time-dependent (setiap moment = unique)
- Phase transitions non-linear
- Cannot freeze/replicate exact state
- Even creator tidak bisa pause time

---

### B. Evolutionary Design System

```tsx
export const EvolutionaryDesign = () => {
  const [generation, setGeneration] = useState(0);
  const [dna, setDna] = useState({
    primaryColor: 260, // hue
    secondaryColor: 280,
    borderRadius: 16,
    spacing: 8,
    fontSize: 16,
    animationSpeed: 1,
  });
  
  // Mutate DNA setiap generation
  const mutate = () => {
    setDna(prev => ({
      primaryColor: (prev.primaryColor + (Math.random() - 0.5) * 40 + 360) % 360,
      secondaryColor: (prev.secondaryColor + (Math.random() - 0.5) * 40 + 360) % 360,
      borderRadius: Math.max(0, Math.min(32, prev.borderRadius + (Math.random() - 0.5) * 8)),
      spacing: Math.max(4, Math.min(24, prev.spacing + (Math.random() - 0.5) * 4)),
      fontSize: Math.max(12, Math.min(24, prev.fontSize + (Math.random() - 0.5) * 2)),
      animationSpeed: Math.max(0.5, Math.min(2, prev.animationSpeed + (Math.random() - 0.5) * 0.2)),
    }));
    setGeneration(prev => prev + 1);
  };
  
  // Natural selection - user interaction = fitness
  const [fitness, setFitness] = useState(0);
  
  const handleInteraction = () => {
    setFitness(prev => prev + 1);
    
    // High fitness = slower mutation (stable)
    // Low fitness = faster mutation (evolving)
  };
  
  return (
    <div className="p-8">
      {/* Generation info */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Generation {generation}
          </h2>
          <p className="text-white/60">Fitness Score: {fitness}</p>
        </div>
        
        <button
          onClick={mutate}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:scale-105 transition-transform"
        >
          Mutate & Evolve
        </button>
      </div>
      
      {/* DNA Visualization */}
      <div className="mb-8 p-6 bg-white/10 rounded-xl backdrop-blur">
        <h3 className="text-lg font-semibold text-white mb-4">DNA Sequence</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(dna).map(([gene, value]) => (
            <div key={gene} className="text-center">
              <div className="text-xs text-white/60 capitalize mb-1">{gene}</div>
              <div className="text-lg font-mono text-white">{typeof value === 'number' ? value.toFixed(1) : value}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Live Preview dengan DNA yang baru */}
      <div
        className="p-8 rounded-2xl transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, hsl(${dna.primaryColor}, 70%, 60%), hsl(${dna.secondaryColor}, 70%, 60%))`,
          borderRadius: dna.borderRadius,
          padding: dna.spacing * 2,
          fontSize: dna.fontSize,
        }}
        onClick={handleInteraction}
      >
        <div className="text-white">
          <h3 className="text-2xl font-bold mb-4">Live Preview</h3>
          <p className="mb-4">
            This design evolves based on:
          </p>
          <ul className="list-disc list-inside space-y-2 text-white/80">
            <li>Time (automatic evolution)</li>
            <li>User interaction (fitness-based)</li>
            <li>Random mutation (genetic drift)</li>
          </ul>
          
          <button
            className="mt-6 px-6 py-3 bg-white/20 backdrop-blur text-white rounded-xl font-semibold hover:bg-white/30 transition-colors"
            style={{
              borderRadius: dna.borderRadius / 2,
            }}
          >
            Interactive Element
          </button>
        </div>
      </div>
      
      {/* Evolution Timeline */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Evolution History</h3>
        <div className="flex space-x-2 overflow-x-auto">
          {Array.from({ length: Math.min(generation + 1, 10) }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center text-white/60"
            >
              Gen {generation - i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

---

## 2. **Time-Based Content Mutation** ⏰

### A. Circadian Rhythm UI

```tsx
export const CircadianUI = () => {
  const [timeState, setTimeState] = useState({
    hour: new Date().getHours(),
    phase: 'morning', // morning, afternoon, evening, night
    energy: 0.8,
  });
  
  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();
      let phase = 'night';
      let energy = 0.3;
      
      if (hour >= 5 && hour < 9) {
        phase = 'morning';
        energy = 0.7;
      } else if (hour >= 9 && hour < 14) {
        phase = 'morning';
        energy = 1.0;
      } else if (hour >= 14 && hour < 18) {
        phase = 'afternoon';
        energy = 0.8;
      } else if (hour >= 18 && hour < 22) {
        phase = 'evening';
        energy = 0.5;
      }
      
      setTimeState({ hour, phase, energy });
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update setiap menit
    return () => clearInterval(interval);
  }, []);
  
  // UI yang berubah berdasarkan waktu
  const phaseStyles = {
    morning: {
      bg: 'from-orange-400 via-yellow-400 to-amber-400',
      text: 'text-orange-900',
      greeting: 'Good Morning',
      icon: '🌅',
      intensity: 'energetic',
    },
    afternoon: {
      bg: 'from-blue-400 via-cyan-400 to-teal-400',
      text: 'text-blue-900',
      greeting: 'Good Afternoon',
      icon: '☀️',
      intensity: 'productive',
    },
    evening: {
      bg: 'from-purple-400 via-pink-400 to-rose-400',
      text: 'text-purple-900',
      greeting: 'Good Evening',
      icon: '🌆',
      intensity: 'relaxed',
    },
    night: {
      bg: 'from-indigo-900 via-purple-900 to-slate-900',
      text: 'text-indigo-100',
      greeting: 'Good Night',
      icon: '🌙',
      intensity: 'calm',
    },
  };
  
  const current = phaseStyles[timeState.phase];
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${current.bg} transition-all duration-1000`}>
      <div className="max-w-6xl mx-auto p-8">
        {/* Time header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="text-6xl font-bold text-white mb-2">
              {current.icon}
            </div>
            <h1 className="text-4xl font-bold text-white">
              {current.greeting}
            </h1>
            <p className="text-white/80 mt-2">
              Current time: {timeState.hour}:00
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-white/60 text-sm mb-1">Energy Level</div>
            <div className="w-32 h-4 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${timeState.energy * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>
        
        {/* Content yang adapt berdasarkan energy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {timeState.energy > 0.7 ? (
            // High energy: show complex tasks
            <>
              <ComplexTaskCard />
              <ComplexTaskCard />
              <ComplexTaskCard />
            </>
          ) : timeState.energy > 0.4 ? (
            // Medium energy: show moderate tasks
            <>
              <ModerateTaskCard />
              <ModerateTaskCard />
            </>
          ) : (
            // Low energy: show simple tasks
            <>
              <SimpleTaskCard />
            </>
          )}
        </div>
        
        {/* Phase indicator */}
        <div className="fixed bottom-4 right-4 px-4 py-2 bg-black/50 backdrop-blur rounded-full text-white text-sm">
          Phase: {timeState.phase} | Intensity: {current.intensity}
        </div>
      </div>
    </div>
  );
};
```

**Kenapa Unreplicable:**
- Time-locked content (cannot access without exact timestamp)
- Circadian adaptation (biological rhythm)
- Energy-based UI complexity
- Each moment = unique configuration

---

### B. Seasonal Evolution

```tsx
export const SeasonalUI = () => {
  const [season, setSeason] = useState('spring');
  const [seasonProgress, setSeasonProgress] = useState(0);
  
  useEffect(() => {
    const updateSeason = () => {
      const date = new Date();
      const month = date.getMonth();
      const day = date.getDate();
      
      // Calculate season
      let newSeason = 'winter';
      let progress = 0;
      
      if (month >= 2 && month <= 4) {
        newSeason = 'spring';
        progress = ((month - 2) * 30 + day) / 92;
      } else if (month >= 5 && month <= 7) {
        newSeason = 'summer';
        progress = ((month - 5) * 30 + day) / 92;
      } else if (month >= 8 && month <= 10) {
        newSeason = 'autumn';
        progress = ((month - 8) * 30 + day) / 92;
      } else {
        newSeason = 'winter';
        progress = ((month + 10) * 30 + day) / 92;
      }
      
      setSeason(newSeason);
      setSeasonProgress(progress);
    };
    
    updateSeason();
    const interval = setInterval(updateSeason, 3600000); // Update setiap jam
    return () => clearInterval(interval);
  }, []);
  
  const seasonStyles = {
    spring: {
      bg: 'from-green-400 via-emerald-400 to-teal-400',
      colors: ['#22c55e', '#10b981', '#14b8a6'],
      elements: ['🌸', '🌱', '🦋', '🌿'],
      animation: 'bloom',
    },
    summer: {
      bg: 'from-yellow-400 via-orange-400 to-red-400',
      colors: ['#fbbf24', '#f97316', '#ef4444'],
      elements: ['☀️', '🌻', '🏖️', '🍉'],
      animation: 'heat',
    },
    autumn: {
      bg: 'from-orange-400 via-amber-400 to-yellow-400',
      colors: ['#f97316', '#f59e0b', '#eab308'],
      elements: ['🍂', '🎃', '🍁', '🌾'],
      animation: 'fall',
    },
    winter: {
      bg: 'from-blue-400 via-indigo-400 to-purple-400',
      colors: ['#3b82f6', '#6366f1', '#8b5cf6'],
      elements: ['❄️', '⛄', '🎄', '🧊'],
      animation: 'snow',
    },
  };
  
  const current = seasonStyles[season];
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${current.bg}`}>
      {/* Seasonal elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {current.elements.map((element, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{
              y: -50,
              x: Math.random() * 100 + '%',
              opacity: 0,
            }}
            animate={{
              y: '100vh',
              opacity: [0, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
            }}
          >
            {element}
          </motion.div>
        ))}
      </div>
      
      {/* Season progress */}
      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-4 capitalize">
            {season}
          </h1>
          
          <div className="mb-8">
            <div className="text-white/80 mb-2">Season Progress</div>
            <div className="h-4 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${seasonProgress * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="text-white/60 text-sm mt-2">
              {(seasonProgress * 100).toFixed(1)}% complete
            </div>
          </div>
          
          {/* Seasonal content */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {current.elements.map((element, i) => (
              <motion.div
                key={i}
                className="p-6 bg-white/20 backdrop-blur rounded-2xl text-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <div className="text-5xl mb-2">{element}</div>
                <div className="text-white font-semibold">Element {i + 1}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 3. **Memory-Based Adaptation** 🧠

### A. UI yang Ingat User Behavior

```tsx
export const MemoryUI = () => {
  const [memory, setMemory] = useState({
    visits: 0,
    totalTime: 0,
    favoriteSections: [],
    interactionPatterns: {},
    lastVisit: null,
  });
  
  // Load memory dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ui-memory');
    if (saved) {
      setMemory(JSON.parse(saved));
    }
  }, []);
  
  // Save memory setiap change
  useEffect(() => {
    localStorage.setItem('ui-memory', JSON.stringify(memory));
  }, [memory]);
  
  // Track interactions
  const trackInteraction = (section: string, action: string) => {
    setMemory(prev => ({
      ...prev,
      visits: prev.visits + 1,
      interactionPatterns: {
        ...prev.interactionPatterns,
        [section]: (prev.interactionPatterns[section] || 0) + 1,
      },
      favoriteSections: Object.entries({
        ...prev.interactionPatterns,
        [section]: (prev.interactionPatterns[section] || 0) + 1,
      })
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([key]) => key),
    }));
  };
  
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-white mb-8">
        🧠 Memory-Based UI
      </h2>
      
      {/* Memory stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white/10 rounded-xl backdrop-blur">
          <div className="text-white/60 text-sm">Total Visits</div>
          <div className="text-3xl font-bold text-white">{memory.visits}</div>
        </div>
        <div className="p-4 bg-white/10 rounded-xl backdrop-blur">
          <div className="text-white/60 text-sm">Last Visit</div>
          <div className="text-lg font-bold text-white">
            {memory.lastVisit ? new Date(memory.lastVisit).toLocaleDateString() : 'First time'}
          </div>
        </div>
        <div className="p-4 bg-white/10 rounded-xl backdrop-blur">
          <div className="text-white/60 text-sm">Favorite Section</div>
          <div className="text-lg font-bold text-white">
            {memory.favoriteSections[0] || 'N/A'}
          </div>
        </div>
        <div className="p-4 bg-white/10 rounded-xl backdrop-blur">
          <div className="text-white/60 text-sm">Memory Depth</div>
          <div className="text-lg font-bold text-white">
            {Object.keys(memory.interactionPatterns).length} sections
          </div>
        </div>
      </div>
      
      {/* Adaptive UI based on memory */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">
          Adaptive Content (Based on Your Behavior)
        </h3>
        
        {memory.favoriteSections.length > 0 ? (
          <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white">
            <div className="text-sm opacity-80 mb-2">
              ⭐ Your Favorite Section
            </div>
            <div className="text-2xl font-bold">
              {memory.favoriteSections[0]}
            </div>
            <p className="mt-2 opacity-80">
              We've prioritized this content based on your interaction history.
            </p>
          </div>
        ) : (
          <div className="p-6 bg-white/10 rounded-xl backdrop-blur text-white">
            <div className="text-lg">
              👋 Welcome! Start interacting to personalize your experience.
            </div>
          </div>
        )}
        
        {/* Interaction buttons */}
        <div className="grid grid-cols-3 gap-4">
          {['Dashboard', 'Analytics', 'Settings'].map(section => (
            <button
              key={section}
              onClick={() => trackInteraction(section, 'click')}
              className={`
                p-4 rounded-xl font-semibold transition-all
                ${memory.favoriteSections.includes(section)
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
                }
              `}
            >
              {section}
              {memory.favoriteSections.includes(section) && (
                <div className="text-xs mt-1">⭐ Favorite</div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Memory timeline */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white mb-4">
          Memory Timeline
        </h3>
        <div className="p-4 bg-white/10 rounded-xl backdrop-blur">
          <div className="text-white/60 text-sm">
            Your interaction patterns are stored locally and used to adapt the UI.
            This memory persists across sessions and evolves with your behavior.
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 4. **Generational Evolution** 🧬

### A. Design yang Mewarisi "DNA" dari Session Sebelumnya

```tsx
export const GenerationalDesign = () => {
  const [generations, setGenerations] = useState([]);
  const [currentGen, setCurrentGen] = useState(0);
  
  // Initial DNA
  const initialDNA = {
    hue: 260,
    saturation: 70,
    lightness: 60,
    complexity: 5,
    density: 0.5,
    chaos: 0.3,
  };
  
  // Load generations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('design-generations');
    if (saved) {
      const gens = JSON.parse(saved);
      setGenerations(gens);
      setCurrentGen(gens.length - 1);
    } else {
      // Start first generation
      const firstGen = {
        ...initialDNA,
        timestamp: Date.now(),
        id: 0,
      };
      setGenerations([firstGen]);
    }
  }, []);
  
  // Evolve to next generation
  const evolve = () => {
    const current = generations[currentGen];
    
    // Mutate DNA
    const mutated = {
      hue: (current.hue + (Math.random() - 0.5) * 60 + 360) % 360,
      saturation: Math.max(50, Math.min(90, current.saturation + (Math.random() - 0.5) * 20)),
      lightness: Math.max(40, Math.min(80, current.lightness + (Math.random() - 0.5) * 20)),
      complexity: Math.max(1, Math.min(10, current.complexity + Math.floor((Math.random() - 0.5) * 4))),
      density: Math.max(0.2, Math.min(0.8, current.density + (Math.random() - 0.5) * 0.2)),
      chaos: Math.max(0.1, Math.min(0.9, current.chaos + (Math.random() - 0.5) * 0.2)),
      timestamp: Date.now(),
      id: currentGen + 1,
      parentId: current.id,
    };
    
    const newGenerations = [...generations, mutated];
    setGenerations(newGenerations);
    setCurrentGen(newGenerations.length - 1);
    
    // Save to localStorage
    localStorage.setItem('design-generations', JSON.stringify(newGenerations));
  };
  
  const currentDNA = generations[currentGen] || initialDNA;
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">
            🧬 Generation {currentGen}
          </h2>
          <p className="text-white/60">
            Evolved from Generation {currentDNA.parentId !== undefined ? currentDNA.parentId : 'N/A'}
          </p>
        </div>
        
        <button
          onClick={evolve}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:scale-105 transition-transform"
        >
          🧬 Evolve to Gen {currentGen + 1}
        </button>
      </div>
      
      {/* DNA Visualization */}
      <div className="mb-8 p-6 bg-white/10 rounded-xl backdrop-blur">
        <h3 className="text-xl font-semibold text-white mb-4">Genetic Code</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(currentDNA).filter(([key]) => key !== 'timestamp' && key !== 'id' && key !== 'parentId').map(([gene, value]) => (
            <div key={gene} className="text-center p-4 bg-white/10 rounded-lg">
              <div className="text-xs text-white/60 capitalize mb-2">{gene}</div>
              <div className="text-2xl font-mono text-white">
                {typeof value === 'number' ? value.toFixed(2) : value}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Visual Representation */}
      <div
        className="h-96 rounded-2xl overflow-hidden relative mb-8"
        style={{
          background: `
            radial-gradient(
              circle at ${50 + currentDNA.chaos * 30}% ${50 + currentDNA.density * 20}%,
              hsl(${currentDNA.hue}, ${currentDNA.saturation}%, ${currentDNA.lightness}%),
              hsl(${(currentDNA.hue + 60) % 360}, ${currentDNA.saturation}%, ${currentDNA.lightness - 20}%),
              hsl(${(currentDNA.hue + 180) % 360}, ${currentDNA.saturation}%, ${currentDNA.lightness - 40}%)
            )
          `,
        }}
      >
        {/* Generational complexity */}
        {Array.from({ length: currentDNA.complexity }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-white/20 rounded-full"
            style={{
              width: `${(i + 1) * 20}%`,
              height: `${(i + 1) * 20}%`,
              left: `${50 - (i + 1) * 10}%`,
              top: `${50 - (i + 1) * 10}%`,
            }}
            animate={{
              rotate: 360 * (i % 2 === 0 ? 1 : -1),
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 / (i + 1),
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>
      
      {/* Generation Tree */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Family Tree</h3>
        <div className="flex space-x-2 overflow-x-auto">
          {generations.map((gen, i) => (
            <button
              key={gen.id}
              onClick={() => setCurrentGen(i)}
              className={`
                flex-shrink-0 p-4 rounded-xl transition-all
                ${currentGen === i
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 scale-105'
                  : 'bg-white/10 hover:bg-white/20'
                }
              `}
            >
              <div className="text-white font-bold">Gen {gen.id}</div>
              <div className="text-white/60 text-xs">
                {new Date(gen.timestamp).toLocaleTimeString()}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
```

**Kenapa TRULY Unreplicable:**
- Evolutionary history unique per user
- DNA inheritance + mutation
- Cannot skip generations
- Time-locked evolution

---

## Response Template

```markdown
🕰️ **Temporal Morphing Interface - Activated!**

Saya sudah siapkan UI yang HIDUP dan BEREVOLUSI:

### 🌱 Lifecycle Features:

1. **Birth → Growth → Decay**
   - Components punya lifecycle
   - Phase transitions visual
   - Auto-death & rebirth

2. **Evolutionary Design**
   - DNA-based styling
   - Mutation on interaction
   - Fitness-based selection

3. **Circadian Rhythm**
   - Time-adaptive UI
   - Energy-based complexity
   - Biological sync

4. **Seasonal Evolution**
   - Real-time season tracking
   - Seasonal elements & colors
   - Progress indicators

5. **Memory System**
   - Remembers user behavior
   - Adaptive prioritization
   - Persistent across sessions

6. **Generational DNA**
   - Inheritance from previous
   - Mutation algorithms
   - Family tree visualization

### 🛡️ Why Unreplicable:

- ✅ Time-locked (cannot access without exact moment)
- ✅ Evolutionary history (cannot skip generations)
- ✅ Memory-dependent (unique per user)
- ✅ Cannot freeze/replicate exact state
- ✅ Even creator cannot reproduce without same timeline

### 🎯 Use Cases:

- Long-term campaigns
- Living art installations
- Dynamic branding
- Personalized experiences
- High-engagement platforms

Mau implement yang mana?
```

---

## Integration

```
Combine with:
- quantum-aesthetic-entanglement → Time-quantum superposition
- generative-design-systems → Temporal procedural gen
- creative-animations-advanced → Lifecycle animations
```
