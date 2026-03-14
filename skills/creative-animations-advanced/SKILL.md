---
name: creative-animations-advanced
description: Kumpulan animasi creative tingkat tinggi yang jarang dipakai, cinematic, dan memberikan wow factor ekstrem
---

# 🎬 Creative Animations Advanced

## Purpose

Skill ini menyediakan **animasi tingkat cinematic** yang jarang ditemukan di website biasa. Setiap animasi dirancang untuk memberikan **emotional impact** dan **memorable experience**.

## Animation Categories

### 1. **Text Animations yang Mind-Blowing** 📝

#### A. Split Text Reveal (Character by Character)

```tsx
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export const SplitTextReveal = ({ children, delay = 0 }) => {
  const text = children;
  const letters = text.split('');
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className="inline-flex overflow-hidden"
      initial="hidden"
      animate={controls}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { 
              y: 100, 
              opacity: 0,
              rotateX: -90
            },
            visible: {
              y: 0,
              opacity: 1,
              rotateX: 0,
              transition: {
                delay: delay + (i * 0.03),
                duration: 0.4,
                ease: [0.33, 1, 0.68, 1]
              }
            }
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Usage:
// <SplitTextReveal delay={0.5}>Amazing Headline</SplitTextReveal>
```

---

#### B. Gradient Text Scramble (Cyberpunk Style)

```tsx
export const ScrambleText = ({ text, speed = 50 }) => {
  const [display, setDisplay] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  
  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;
    
    interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed]);
  
  return (
    <motion.span
      className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
      style={{ fontFamily: 'monospace' }}
    >
      {display}
    </motion.span>
  );
};
```

---

#### C. Wave Text (Fluid Motion)

```tsx
export const WaveText = ({ children }) => {
  const letters = children.split('');
  
  return (
    <div className="flex">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          className="inline-block text-6xl font-bold"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
};
```

---

#### D. Typewriter dengan Cursor Blink + Delete

```tsx
export const TypewriterAdvanced = ({ words, deleteSpeed = 50, typeSpeed = 100 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Word complete, pause then delete
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);
    
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);
  
  return (
    <div className="inline-flex items-center">
      <span className="text-xl font-mono">{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="w-0.5 h-6 bg-purple-500 ml-1 inline-block"
      />
    </div>
  );
};

// Usage:
// <TypewriterAdvanced words={['Designer', 'Developer', 'Creator']} />
```

---

### 2. **Scroll Animations Cinematic** 📜

#### A. Parallax Multi-Layer (5+ Layers)

```tsx
import { useScroll, useTransform, motion } from 'framer-motion';

export const ParallaxHero = () => {
  const { scrollY } = useScroll();
  
  // Different speeds for each layer
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);   // Background (slowest)
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]);   // Mid-ground
  const y3 = useTransform(scrollY, [0, 1000], [0, -600]);   // Foreground
  const y4 = useTransform(scrollY, [0, 1000], [0, -800]);   // Content
  const y5 = useTransform(scrollY, [0, 1000], [0, -1000]);  // Overlay (fastest)
  
  const opacity1 = useTransform(scrollY, [0, 500], [1, 0]);
  const opacity2 = useTransform(scrollY, [0, 600], [0, 1]);
  
  return (
    <div className="relative h-[200vh] overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        {/* Background layer - gradient/sky */}
        <div className="h-screen bg-gradient-to-b from-purple-900 to-indigo-900" />
      </motion.div>
      
      <motion.div style={{ y: y2, opacity: opacity1 }} className="absolute inset-0 z-10">
        {/* Mid-ground - mountains/shapes */}
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320">
          <path fill="#6366f1" fillOpacity="0.3" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </motion.div>
      
      <motion.div style={{ y: y3 }} className="absolute inset-0 z-20">
        {/* Foreground - main content */}
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-8xl font-bold text-white">Parallax</h1>
        </div>
      </motion.div>
      
      <motion.div style={{ y: y4, opacity: opacity2 }} className="absolute inset-0 z-30">
        {/* Next section reveal */}
        <div className="h-screen bg-white flex items-center justify-center">
          <p className="text-4xl text-gray-900">Scroll to explore</p>
        </div>
      </motion.div>
      
      <motion.div style={{ y: y5 }} className="absolute inset-0 z-40 pointer-events-none">
        {/* Overlay effects - particles, fog */}
        <div className="h-screen bg-gradient-to-t from-black/50 to-transparent" />
      </motion.div>
    </div>
  );
};
```

---

#### B. Scrub Animation (Progress-based)

```tsx
export const ScrollScrubAnimation = () => {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const color = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#ff00ff']
  );
  
  return (
    <div className="h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* Progress bar */}
        <motion.div
          style={{ scaleX }}
          className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500 origin-left"
        />
        
        {/* Animated shape */}
        <motion.div
          style={{ rotate, scale, borderRadius, backgroundColor: color }}
          className="w-64 h-64 shadow-2xl"
        />
        
        {/* Counter */}
        <motion.div
          className="absolute bottom-20 text-9xl font-bold text-gray-200"
        >
          <MotionValueComponent value={scrollYProgress} />
        </motion.div>
      </div>
    </div>
  );
};
```

---

#### C. Section Reveals dengan Mask

```tsx
export const MaskReveal = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        initial={{ scaleY: 1 }}
        animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 z-10"
        style={{ transformOrigin: 'bottom' }}
      />
      
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
```

---

### 3. **Page Transitions yang Smooth** 🔄

#### A. Shared Layout Animation (FLIP)

```tsx
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';

export const SharedLayoutTransition = () => {
  const [selectedId, setSelectedId] = useState(null);
  const items = [1, 2, 3, 4, 5, 6];
  
  return (
    <LayoutGroup>
      <div className="grid grid-cols-3 gap-4">
        <AnimatePresence>
          {selectedId === null ? (
            items.map((item) => (
              <motion.div
                key={item}
                layoutId={`card-${item}`}
                onClick={() => setSelectedId(item)}
                className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            ))
          ) : (
            <motion.div
              layoutId={`card-${selectedId}`}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-gradient-to-br from-purple-400 to-pink-400 z-50 m-16 rounded-3xl cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center h-full"
              >
                <h2 className="text-6xl font-bold text-white">
                  Expanded Card {selectedId}
                </h2>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
};
```

---

#### B. Route Transition dengan Stagger

```tsx
import { useLocation } from 'react-router-dom';

export const RouteTransition = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {/* Stagger children */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
```

---

#### C. Morphing Shape Transition

```tsx
export const MorphTransition = () => {
  const [isMorphed, setIsMorphed] = useState(false);
  
  return (
    <div onClick={() => setIsMorphed(!isMorphed)} className="cursor-pointer">
      <motion.div
        animate={{
          borderRadius: isMorphed
            ? ['50% 50% 50% 50% / 60% 60% 40% 40%']
            : ['50%'],
          scale: isMorphed ? 1.2 : 1,
          rotate: isMorphed ? 180 : 0,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500"
      />
    </div>
  );
};
```

---

### 4. **Hover Effects yang Unusual** 🎯

#### A. Liquid Hover (Water Ripple)

```tsx
export const LiquidHover = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="relative overflow-hidden rounded-xl"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Liquid effect */}
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.5, 2] : 1,
          opacity: isHovered ? [0.5, 0.3, 0] : 0,
        }}
        transition={{ duration: 1 }}
        style={{
          left: position.x,
          top: position.y,
          x: '-50%',
          y: '-50%',
        }}
        className="absolute w-32 h-32 bg-purple-500/30 rounded-full blur-xl pointer-events-none"
      />
      
      {/* Content */}
      <div className="relative z-10 p-8">
        {children}
      </div>
      
      {/* Border glow */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        className="absolute inset-0 rounded-xl border-2 border-purple-500 pointer-events-none"
      />
    </div>
  );
};
```

---

#### B. Magnetic Pull Effect

```tsx
export const MagneticButton = ({ children, strength = 0.5 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    setPosition({
      x: middleX * strength,
      y: middleY * strength
    });
  };
  
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative px-8 py-4 bg-purple-600 text-white rounded-full overflow-hidden"
    >
      {/* Particle trail */}
      <ParticleTrail isActive={position.x !== 0 || position.y !== 0} />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: '-100%' }}
        animate={{ x: position.x > 0 ? '100%' : '-100%' }}
        transition={{ duration: 0.3 }}
      />
      
      {children}
    </motion.button>
  );
};
```

---

#### C. Holographic Hover

```tsx
export const HolographicCard = ({ children }) => {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  
  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const rotateX = (0.5 - y) * 20;
    const rotateY = (x - 0.5) * 20;
    
    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.5 });
  };
  
  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      className="relative w-96 h-64 rounded-2xl overflow-hidden"
    >
      {/* Holographic gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at ${glare.x}% ${glare.y}%,
              rgba(255,255,255,${glare.opacity}) 0%,
              transparent 50%
            )
          `,
        }}
      />
      
      {/* Rainbow sheen */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            linear-gradient(
              ${rotate.y + 45}deg,
              transparent 0%,
              rgba(255,0,0,0.3) 20%,
              rgba(255,255,0,0.3) 40%,
              rgba(0,255,0,0.3) 60%,
              rgba(0,0,255,0.3) 80%,
              transparent 100%
            )
          `,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-8">
        {children}
      </div>
    </motion.div>
  );
};
```

---

### 5. **Loading Animations Creative** ⏳

#### A. Skeleton dengan Shimmer Wave

```tsx
export const WaveSkeleton = ({ className }) => {
  return (
    <div className={`relative overflow-hidden ${className}`} role="status">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-wave" />
      <div className="h-full bg-gray-200 dark:bg-gray-700 rounded" />
      <style jsx>{`
        @keyframes shimmer-wave {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
        .animate-shimmer-wave {
          animation: shimmer-wave 1.5s infinite;
        }
      `}</style>
    </div>
  );
};
```

---

#### B. Progress Ring dengan Countdown

```tsx
export const ProgressRing = ({ progress, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        
        {/* Progress circle */}
        <motion.circle
          className="text-purple-600"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          key={progress}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-bold"
        >
          {progress}%
        </motion.span>
      </div>
    </div>
  );
};
```

---

#### C. Dot Wave Loading

```tsx
export const DotWave = () => {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          className="w-4 h-4 bg-gradient-to-t from-purple-600 to-pink-600 rounded-full"
        />
      ))}
    </div>
  );
};
```

---

## Animation Principles Advanced

```
1. Timing & Easing:
   - Default: [0.6, -0.05, 0.01, 0.99] (smooth deceleration)
   - Bounce: { type: "spring", stiffness: 400, damping: 10 }
   - Elastic: { type: "spring", stiffness: 200, damping: 15 }

2. Stagger Strategy:
   - Parent: AnimatePresence
   - Children: delay: index * 0.1
   - Total duration: children.length * 0.1 + base

3. Performance:
   - Use transform & opacity only (GPU)
   - Avoid: width, height, top, left
   - will-change: transform, opacity
   - Reduce motion: @media (prefers-reduced-motion)

4. Accessibility:
   - Respect prefers-reduced-motion
   - Provide skip animation button
   - No auto-play videos/animations
   - Pause on hover/focus
```

---

## Response Template

```markdown
🎬 **Creative Animations Ready!**

Saya sudah siapkan animasi tingkat cinematic:

### ✨ Animation Types Included:

1. **Text Animations**
   - Split character reveal
   - Gradient scramble (cyberpunk)
   - Wave motion
   - Advanced typewriter

2. **Scroll Animations**
   - Multi-layer parallax (5+ layers)
   - Progress-based scrub
   - Mask reveals
   - Sticky sections

3. **Page Transitions**
   - Shared layout (FLIP)
   - Route transitions
   - Morphing shapes

4. **Hover Effects**
   - Liquid ripple
   - Magnetic pull
   - Holographic cards

5. **Loading States**
   - Wave skeleton
   - Progress ring
   - Dot wave

### 🚀 Implementation:
- Library: Framer Motion + GSAP
- Performance: GPU-accelerated
- Accessibility: Reduced motion support
- Browser: All modern browsers

Mau saya implementasikan yang mana dulu?
```

---

## Inspiration Sources

- Awwwards.com (winning animations)
- Codepen.io (creative experiments)
- Framer Motion docs
- GSAP showcase
- Three.js examples
- React Spring demos
