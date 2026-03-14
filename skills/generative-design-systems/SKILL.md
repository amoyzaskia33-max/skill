---
name: generative-design-systems
description: Design systems yang generate unique patterns setiap kali - tidak ada dua output yang sama, menggunakan procedural generation dan algorithms proprietary
---

# 🌀 Generative Design Systems

## Purpose

Skill ini menghasilkan **design yang BENAR-BENAR UNIQUE** setiap kali di-generate. Menggunakan **procedural generation**, **algorithms proprietary**, dan **randomness controlled** untuk menciptakan design yang **tidak bisa direplikasi** bahkan oleh AI lain.

## Core Philosophy

```
"Setiap execution menghasilkan output yang UNIQUE"
- Tidak ada dua website yang sama
- Setiap user mendapat experience berbeda
- Pattern yang di-generate tidak akan terulang
- Bahkan creator sendiri tidak bisa replicate exact result
```

---

## 1. **Procedural Pattern Generation** 🎨

### A. Voronoi Diagram Generator (Unique Every Time)

```tsx
import { useMemo } from 'react';

export const VoronoiBackground = ({ seed = Math.random() }) => {
  // Generate random points - different every render
  const points = useMemo(() => {
    const pts = [];
    const count = 20 + Math.floor(Math.random() * 30); // 20-50 points
    
    for (let i = 0; i < count; i++) {
      pts.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        speed: 0.5 + Math.random() * 2
      });
    }
    return pts;
  }, [seed]);
  
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      <defs>
        {points.map((point, i) => (
          <radialGradient key={i} id={`grad-${i}`}>
            <stop offset="0%" stopColor={point.color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={point.color} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>
      
      {points.map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r={10 + Math.random() * 20}
          fill={`url(#grad-${i})`}
          animate={{
            cx: point.x + Math.sin(Date.now() / 1000 * point.speed) * 5,
            cy: point.y + Math.cos(Date.now() / 1000 * point.speed) * 5,
          }}
          transition={{ duration: 2 * point.speed }}
        />
      ))}
    </svg>
  );
};
```

**Kenapa Unreplicable:**
- Random seed setiap render
- 20-50 points dengan posisi acak
- Warna HSL random
- Animation speed berbeda per point
- **Triliunan kemungkinan kombinasi**

---

### B. Flow Field Generator (Particle System)

```tsx
export const FlowFieldBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Generate unique flow field
    const cols = 40;
    const rows = 40;
    const scale = Math.min(canvas.width, canvas.height) / Math.max(cols, rows);
    
    // Perlin noise dengan random offset (unique setiap kali)
    const zOffset = Math.random() * 1000;
    const flowField = [];
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const angle = (noise.perlin2(x * 0.1, y * 0.1 + zOffset)) * Math.PI * 4;
        flowField.push({ x: Math.cos(angle), y: Math.sin(angle) });
      }
    }
    
    // Particles dengan unique properties
    const particles = [];
    const particleCount = 500 + Math.floor(Math.random() * 500);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * cols,
        y: Math.random() * rows,
        vx: 0,
        vy: 0,
        speed: 0.5 + Math.random() * 2,
        size: 1 + Math.random() * 2,
        color: `hsla(${Math.random() * 360}, 80%, 60%, ${0.3 + Math.random() * 0.5})`,
        history: []
      });
    }
    
    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        // Get flow at particle position
        const index = Math.floor(p.y) * cols + Math.floor(p.x);
        const flow = flowField[index];
        
        // Apply force
        p.vx += flow.x * 0.1;
        p.vy += flow.y * 0.1;
        p.vx *= 0.95;
        p.vy *= 0.95;
        
        // Update position
        p.x += p.vx * p.speed;
        p.y += p.vy * p.speed;
        
        // Wrap around
        if (p.x < 0) p.x = cols;
        if (p.x >= cols) p.x = 0;
        if (p.y < 0) p.y = rows;
        if (p.y >= rows) p.y = 0;
        
        // Store history for trail
        p.history.push({ x: p.x * scale, y: p.y * scale });
        if (p.history.length > 20) p.history.shift();
        
        // Draw trail
        ctx.beginPath();
        ctx.moveTo(p.history[0]?.x || p.x * scale, p.history[0]?.y || p.y * scale);
        for (let i = 1; i < p.history.length; i++) {
          ctx.lineTo(p.history[i].x, p.history[i].y);
        }
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.size;
        ctx.stroke();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0" />;
};
```

**Kenapa Unreplicable:**
- Perlin noise dengan random z-offset
- 500-1000 particles dengan properties unik
- Setiap partikel punya history trail
- Flow field berbeda setiap generate
- **Infinite combinations**

---

### C. Fractal Tree Generator (Recursive Unique)

```tsx
export const FractalTree = () => {
  const generateTree = (x, y, len, angle, depth, maxDepth) => {
    if (depth > maxDepth) return [];
    
    const endX = x + len * Math.cos(angle);
    const endY = y + len * Math.sin(angle);
    
    const branch = [{ x, y }, { x: endX, y: endY }];
    
    // Random angles untuk branches berikutnya (unique!)
    const leftAngle = angle - (0.3 + Math.random() * 0.4);
    const rightAngle = angle + (0.3 + Math.random() * 0.4);
    
    // Random length reduction (unique!)
    const newLen = len * (0.6 + Math.random() * 0.2);
    
    const leftBranches = generateTree(endX, endY, newLen, leftAngle, depth + 1, maxDepth);
    const rightBranches = generateTree(endX, endY, newLen, rightAngle, depth + 1, maxDepth);
    
    return [branch, ...leftBranches, ...rightBranches];
  };
  
  const tree = useMemo(() => {
    return generateTree(
      window.innerWidth / 2,
      window.innerHeight,
      150,
      -Math.PI / 2,
      0,
      10 + Math.floor(Math.random() * 5)
    );
  }, []);
  
  return (
    <svg className="w-full h-full">
      {tree.map((branch, i) => (
        <motion.line
          key={i}
          x1={branch[0].x}
          y1={branch[0].y}
          x2={branch[1].x}
          y2={branch[1].y}
          stroke={`hsl(${280 + i * 2}, 70%, ${50 + i * 3}%)`}
          strokeWidth={Math.max(1, 12 - i * 0.5)}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        />
      ))}
    </svg>
  );
};
```

**Kenapa Unreplicable:**
- Recursive dengan random di setiap level
- Angle berbeda per branch
- Length reduction random
- Depth bervariasi
- **Setiap tree unik di dunia**

---

## 2. **Generative Typography** 🔤

### A. Variable Font Morphing

```tsx
export const MorphingText = ({ text }) => {
  const [axes, setAxes] = useState({
    wght: 400,
    wdth: 100,
    slnt: 0,
    opsZ: 16
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAxes({
        wght: 100 + Math.random() * 800,
        wdth: 50 + Math.random() * 100,
        slnt: -20 + Math.random() * 40,
        opsZ: 12 + Math.random() * 48
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <h1
      style={{
        fontFamily: "'Inter var', sans-serif",
        fontVariationSettings: `
          'wght' ${axes.wght},
          'wdth' ${axes.wdth},
          'slnt' ${axes.slnt},
          'opsz' ${axes.opsZ}
        `,
        transition: 'font-variation-settings 2s ease'
      }}
      className="text-9xl"
    >
      {text}
    </h1>
  );
};
```

---

### B. Kinetic Typography (Physics-based)

```tsx
import { useSpring } from '@react-spring/core';

export const KineticText = ({ text }) => {
  const letters = text.split('');
  
  return (
    <div className="flex">
      {letters.map((letter, i) => (
        <Letter key={i} letter={letter} index={i} />
      ))}
    </div>
  );
};

const Letter = ({ letter, index }) => {
  const ref = useRef(null);
  
  const [springProps, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    x: 0,
    y: 0,
    config: { tension: 200, friction: 20 }
  }));
  
  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateY = (e.clientX - centerX) / 10;
    const rotateX = -(e.clientY - centerY) / 10;
    
    api.start({
      rotateX,
      rotateY,
      scale: 1.2,
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20
    });
  };
  
  const handleMouseLeave = () => {
    api.start({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      x: 0,
      y: 0
    });
  };
  
  return (
    <motion.span
      ref={ref}
      style={springProps}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block text-8xl font-bold cursor-pointer"
    >
      {letter}
    </motion.span>
  );
};
```

---

## 3. **Generative Color Systems** 🌈

### A. Algorithm Color Palette (Unique Every Time)

```tsx
export const generateUniquePalette = () => {
  // Golden ratio untuk distribusi warna yang harmonis
  const goldenRatio = 0.618033988749895;
  
  // Random starting hue (ini yang bikin unique!)
  let hue = Math.random() * 360;
  
  const palette = {
    primary: `hsl(${hue}, 70%, 60%)`,
    secondary: `hsl(${(hue + goldenRatio * 360) % 360}, 70%, 60%)`,
    accent: `hsl(${(hue + goldenRatio * 2 * 360) % 360}, 80%, 65%)`,
    background: `hsl(${hue}, 30%, ${95 + Math.random() * 5}%)`,
    surface: `hsl(${hue}, 20%, ${85 + Math.random() * 10}%)`,
    text: `hsl(${hue}, 20%, ${15 + Math.random() * 10}%)`,
  };
  
  return palette;
};

// Usage - setiap kali call, dapat palette berbeda!
const palette = generateUniquePalette();
```

---

### B. Gradient Generator (Infinite Variations)

```tsx
export const UniqueGradient = () => {
  const gradient = useMemo(() => {
    const angle = Math.floor(Math.random() * 360);
    const stops = 3 + Math.floor(Math.random() * 5); // 3-7 color stops
    
    const colors = Array.from({ length: stops }, () => ({
      hue: Math.random() * 360,
      saturation: 60 + Math.random() * 40,
      lightness: 50 + Math.random() * 30,
      position: Math.random() * 100
    })).sort((a, b) => a.position - b.position);
    
    return `linear-gradient(
      ${angle}deg,
      ${colors.map(c => 
        `hsl(${c.hue}, ${c.saturation}%, ${c.lightness}%) ${c.position}%`
      ).join(', ')}
    )`;
  }, []);
  
  return <div style={{ background: gradient }} className="w-full h-full" />;
};
```

---

## 4. **Generative Layout Engine** 📐

### A. Constraint-based Layout (Auto-generate Unique)

```tsx
export const GenerativeLayout = ({ children }) => {
  const layout = useMemo(() => {
    // Generate unique layout constraints
    const columns = 8 + Math.floor(Math.random() * 8); // 8-15 columns
    const rows = 4 + Math.floor(Math.random() * 8); // 4-11 rows
    const gap = 8 + Math.floor(Math.random() * 24); // 8-32px gap
    
    // Distribute items dengan algorithm unik
    const items = React.Children.map(children, (child, i) => {
      const colSpan = 1 + Math.floor(Math.random() * 3);
      const rowSpan = 1 + Math.floor(Math.random() * 2);
      const colStart = 1 + Math.floor(Math.random() * (columns - colSpan));
      const rowStart = 1 + Math.floor(Math.random() * (rows - rowSpan));
      
      return {
        child,
        style: {
          gridColumn: `${colStart} / span ${colSpan}`,
          gridRow: `${rowStart} / span ${rowSpan}`,
        }
      };
    });
    
    return { columns, rows, gap, items };
  }, []);
  
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
        gridTemplateRows: `repeat(${layout.rows}, minmax(100px, auto))`,
        gap: `${layout.gap}px`
      }}
    >
      {layout.items.map((item, i) => (
        <div key={i} style={item.style}>
          {item.child}
        </div>
      ))}
    </div>
  );
};
```

---

### B. Organic Spacing System

```tsx
export const OrganicSpacing = ({ children }) => {
  const spacing = useMemo(() => {
    // Generate spacing berdasarkan Fibonacci dengan randomization
    const fib = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    const base = 4 + Math.floor(Math.random() * 4); // 4-8px base unit
    
    return {
      xs: fib[Math.floor(Math.random() * 3)] * base,
      sm: fib[2 + Math.floor(Math.random() * 2)] * base,
      md: fib[4 + Math.floor(Math.random() * 2)] * base,
      lg: fib[6 + Math.floor(Math.random() * 2)] * base,
      xl: fib[8] * base
    };
  }, []);
  
  return (
    <div style={{
      padding: spacing.md,
      gap: spacing.sm
    }}>
      {children}
    </div>
  );
};
```

---

## 5. **Interactive Generative Art** 🎨

### A. Mouse-Responsive Particle System

```tsx
export const InteractiveParticles = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  
  // Initialize particles (unique!)
  useEffect(() => {
    particlesRef.current = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: 2 + Math.random() * 6,
      color: `hsla(${Math.random() * 360}, 70%, 60%, 0.6)`,
      connectionDistance: 100 + Math.random() * 100
    }));
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Particles react to mouse
      particlesRef.current.forEach(p => {
        const dx = e.clientX - p.x;
        const dy = e.clientY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          p.vx -= dx / dist * 0.5;
          p.vy -= dy / dist * 0.5;
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return <canvas className="fixed inset-0 pointer-events-none" />;
};
```

---

### B. Sound-Reactive Visualization

```tsx
export const SoundReactiveVisual = () => {
  const [audioData, setAudioData] = useState(new Uint8Array(0));
  
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      
      source.connect(analyser);
      analyser.fftSize = 256;
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const update = () => {
        analyser.getByteFrequencyData(dataArray);
        setAudioData(new Uint8Array(dataArray));
        requestAnimationFrame(update);
      };
      
      update();
    });
  }, []);
  
  return (
    <div className="flex items-end justify-center h-64 gap-1">
      {Array.from(audioData).map((value, i) => (
        <div
          key={i}
          style={{
            height: `${value * 2}px`,
            background: `hsl(${i * 2 + value}, 80%, 60%)`,
            width: `${4 + value / 30}px`
          }}
          className="rounded-t"
        />
      ))}
    </div>
  );
};
```

---

## 6. **AI-Resistant Features** 🛡️

### A. Time-based Content Mutation

```tsx
export const TimeMutatingContent = () => {
  const [content, setContent] = useState('');
  
  useEffect(() => {
    const generateUniqueContent = () => {
      const now = Date.now();
      const seed = now % 1000000;
      
      // Content yang berubah berdasarkan waktu
      // Tidak bisa di-replicate karena butuh exact timestamp
      const templates = [
        `Welcome, traveler #${seed}`,
        `Session: ${seed.toString(16)}`,
        `Moment: ${now}`,
        `Unique ID: ${btoa(now.toString())}`
      ];
      
      return templates[Math.floor(Math.random() * templates.length)];
    };
    
    setContent(generateUniqueContent());
    
    const interval = setInterval(() => {
      setContent(generateUniqueContent());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return <div className="text-2xl font-mono">{content}</div>;
};
```

---

### B. User-Behavior Adaptive UI

```tsx
export const AdaptiveUI = () => {
  const [userPattern, setUserPattern] = useState({
    clicks: 0,
    scrollDepth: 0,
    dwellTime: 0,
    preferredSection: null
  });
  
  useEffect(() => {
    // Track user behavior (unique per user!)
    const trackClick = () => setUserPattern(p => ({ ...p, clicks: p.clicks + 1 }));
    const trackScroll = () => {
      const depth = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      setUserPattern(p => ({ ...p, scrollDepth: Math.max(p.scrollDepth, depth) }));
    };
    
    window.addEventListener('click', trackClick);
    window.addEventListener('scroll', trackScroll);
    
    return () => {
      window.removeEventListener('click', trackClick);
      window.removeEventListener('scroll', trackScroll);
    };
  }, []);
  
  // UI yang adapt berdasarkan behavior
  const layoutStyle = userPattern.clicks > 10 ? 'compact' : 'spacious';
  const colorIntensity = userPattern.scrollDepth > 0.8 ? 'vibrant' : 'muted';
  
  return (
    <div className={`${layoutStyle} ${colorIntensity}`}>
      {/* UI yang berbeda untuk setiap user */}
    </div>
  );
};
```

---

## Response Template

```markdown
🌀 **Generative Design System - Truly Unique**

Saya sudah siapkan system yang menghasilkan design UNREPLICABLE:

### ✨ Generative Features:

1. **Procedural Patterns**
   - Voronoi diagrams (random every render)
   - Flow fields (Perlin noise + particles)
   - Fractal trees (recursive randomness)

2. **Generative Typography**
   - Variable font morphing
   - Kinetic text (physics-based)
   - Reactive to mouse/touch

3. **Algorithm Colors**
   - Golden ratio palette generation
   - Infinite gradient variations
   - Time-based color shifts

4. **Generative Layouts**
   - Constraint-based auto-layout
   - Organic spacing (Fibonacci)
   - Responsive grid generation

5. **Interactive Art**
   - Mouse-responsive particles
   - Sound-reactive visuals
   - User-behavior adaptive UI

### 🛡️ AI-Resistant:
- ✅ Different output every render
- ✅ Cannot replicate exact result
- ✅ Time-based mutations
- ✅ User-specific adaptations
- ✅ Infinite combinations

### 🔢 Uniqueness Math:
- Voronoi: 20-50 points × 360° hue = ∞ combinations
- Flow Field: 500-1000 particles × unique paths = ∞
- Fractal: Recursive random × depth = ∞
- Colors: Golden ratio × random seed = ∞

**Setiap execution = UNIQUE di dunia**

Mau generate yang mana?
```

---

## Why This is UNREPLICABLE:

```
1. Randomness Embedded:
   - Math.random() di setiap render
   - Seed berbeda setiap kali
   - Time-based mutations

2. Procedural Generation:
   - Algorithms, bukan templates
   - Output computed, bukan stored
   - Infinite variations

3. User-Specific:
   - Behavior tracking
   - Adaptive UI
   - Personal experience

4. Real-time:
   - Mouse/touch reactive
   - Sound reactive
   - Time-based changes

5. Complexity:
   - Triliunan combinations
   - Cannot brute-force
   - Even creator can't replicate
```

---

## Inspiration:

- Generative design artists (Casey Reas, Marius Watz)
- Creative coding (Processing, p5.js)
- Algorithm art (Manfred Mohr, Vera Molnár)
- Interactive installations (teamLab, Random International)
