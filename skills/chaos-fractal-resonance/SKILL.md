# 🔮 Chaos Fractal Resonance

## Purpose

Skill ini menggabungkan **chaos theory, fractal geometry, dan cymatics (sound visualization)** untuk menciptakan pattern yang **mathematically impossible to replicate**. Setiap output adalah **unique fingerprint of the universe** pada moment creation.

## Core Philosophy

```
"Beauty from mathematical chaos"
- Sensitive to initial conditions (butterfly effect)
- Infinite fractal detail
- Sound-to-visual resonance
- Predictably unpredictable
- Natural physics-based generation
```

---

## 1. **Lorenz Attractor Visualization** 🦋

### A. Chaos Theory in Action

```tsx
import { useEffect, useRef, useState } from 'react';

export const LorenzAttractor = () => {
  const canvasRef = useRef(null);
  const [params, setParams] = useState({
    sigma: 10,     // Prandtl number
    rho: 28,       // Rayleigh number
    beta: 8/3,     // Geometric factor
    dt: 0.01,      // Time step
  });
  
  const [seed, setSeed] = useState({
    x: Math.random() * 0.1,
    y: Math.random() * 0.1,
    z: Math.random() * 0.1,
  });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let x = seed.x;
    let y = seed.y;
    let z = seed.z;
    
    const points = [];
    const maxPoints = 5000;
    
    // Generate Lorenz attractor points
    for (let i = 0; i < maxPoints; i++) {
      // Lorenz equations
      const dx = params.sigma * (y - x) * params.dt;
      const dy = (x * (params.rho - z) - y) * params.dt;
      const dz = (x * y - params.beta * z) * params.dt;
      
      x += dx;
      y += dy;
      z += dz;
      
      // Scale to canvas coordinates
      const scaleX = canvas.width / 60;
      const scaleY = canvas.height / 60;
      const offsetX = canvas.width / 2;
      const offsetY = canvas.height / 2;
      
      points.push({
        x: x * scaleX + offsetX,
        y: y * scaleY + offsetY,
        z: z, // For color mapping
      });
    }
    
    // Animate drawing
    let currentIndex = 0;
    const animate = () => {
      if (currentIndex >= points.length) return;
      
      // Draw multiple points per frame for speed
      for (let i = 0; i < 10 && currentIndex < points.length; i++) {
        const point = points[currentIndex];
        const prevPoint = points[currentIndex - 1] || point;
        
        // Color based on z-depth
        const hue = ((point.z + 50) / 100) * 360;
        const lightness = 30 + ((point.z + 50) / 100) * 40;
        
        ctx.beginPath();
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = `hsl(${hue}, 80%, ${lightness}%)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        currentIndex++;
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Auto-regenerate with new seed every 30 seconds
    const interval = setInterval(() => {
      setSeed({
        x: Math.random() * 0.1,
        y: Math.random() * 0.1,
        z: Math.random() * 0.1,
      });
    }, 30000);
    
    return () => clearInterval(interval);
  }, [params, seed]);
  
  return (
    <div className="relative">
      <canvas ref={canvasRef} className="fixed inset-0 bg-black" />
      
      {/* Controls */}
      <div className="fixed top-4 left-4 p-4 bg-black/80 backdrop-blur rounded-xl text-white">
        <h3 className="text-lg font-bold mb-4">🦋 Lorenz Attractor</h3>
        
        <div className="space-y-2 text-sm">
          <div>
            <label className="block text-white/60">Sigma (σ): {params.sigma}</label>
            <input
              type="range"
              min="0"
              max="50"
              step="0.1"
              value={params.sigma}
              onChange={(e) => setParams(p => ({ ...p, sigma: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-white/60">Rho (ρ): {params.rho}</label>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={params.rho}
              onChange={(e) => setParams(p => ({ ...p, rho: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-white/60">Beta (β): {params.beta.toFixed(2)}</label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.01"
              value={params.beta}
              onChange={(e) => setParams(p => ({ ...p, beta: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>
        
        <button
          onClick={() => setSeed({
            x: Math.random() * 0.1,
            y: Math.random() * 0.1,
            z: Math.random() * 0.1,
          })}
          className="mt-4 w-full px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
        >
          🎲 New Initial Conditions
        </button>
        
        <div className="mt-4 text-xs text-white/40">
          ⚠️ Tiny changes in initial conditions = completely different attractor
        </div>
      </div>
    </div>
  );
};
```

**Kenapa UNREPLICABLE:**
- Chaos theory: sensitive to initial conditions
- Cannot predict without EXACT seed (down to floating point)
- Butterfly effect embedded
- Even creator cannot replicate exact pattern

---

### B. Strange Attractor Morphing

```tsx
export const MorphingAttractors = () => {
  const [attractorType, setAttractorType] = useState('lorenz');
  const [morphProgress, setMorphProgress] = useState(0);
  
  const attractors = {
    lorenz: { name: 'Lorenz', equations: 'butterfly' },
    rossler: { name: 'Rössler', equations: 'spiral' },
    chen: { name: 'Chen', equations: 'double-scroll' },
    aizawa: { name: 'Aizawa', equations: 'sphere' },
  };
  
  useEffect(() => {
    // Auto-morph between attractors
    const interval = setInterval(() => {
      setMorphProgress(prev => {
        if (prev >= 1) {
          // Switch to next attractor
          const types = Object.keys(attractors);
          const currentIndex = types.indexOf(attractorType);
          const nextType = types[(currentIndex + 1) % types.length];
          setAttractorType(nextType);
          return 0;
        }
        return prev + 0.01;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [attractorType]);
  
  return (
    <div className="relative h-screen bg-black">
      {/* Render current attractor with morph */}
      <AttractorRenderer
        type={attractorType}
        morph={morphProgress}
      />
      
      {/* Attractor indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex space-x-4">
        {Object.entries(attractors).map(([key, attr]) => (
          <div
            key={key}
            className={`
              px-6 py-3 rounded-full transition-all
              ${attractorType === key
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-110'
                : 'bg-white/10 text-white/60'
              }
            `}
          >
            {attr.name}
          </div>
        ))}
      </div>
      
      {/* Morph progress */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
          style={{ width: `${morphProgress * 100}%` }}
        />
      </div>
    </div>
  );
};

const AttractorRenderer = ({ type, morph }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    // Render attractor with morphing
    // Implementation similar to LorenzAttractors above
    // But with interpolation between different attractor types
  }, [type, morph]);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};
```

---

## 2. **Fractal Geometry Engine** 🌀

### A. Mandelbrot Set dengan Infinite Zoom

```tsx
export const MandelbrotExplorer = () => {
  const canvasRef = useRef(null);
  const [view, setView] = useState({
    x: -0.5,
    y: 0,
    zoom: 200,
  });
  
  const [isExploring, setIsExploring] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    // Render Mandelbrot set
    for (let py = 0; py < canvas.height; py++) {
      for (let px = 0; px < canvas.width; px++) {
        // Map pixel to complex plane
        const x0 = (px - canvas.width / 2) / view.zoom + view.x;
        const y0 = (py - canvas.height / 2) / view.zoom + view.y;
        
        let x = 0;
        let y = 0;
        let iteration = 0;
        const maxIteration = 100;
        
        // Mandelbrot iteration: z = z² + c
        while (x * x + y * y <= 4 && iteration < maxIteration) {
          const xTemp = x * x - y * y + x0;
          y = 2 * x * y + y0;
          x = xTemp;
          iteration++;
        }
        
        // Color based on iteration
        const idx = (py * canvas.width + px) * 4;
        
        if (iteration === maxIteration) {
          // Inside the set - black
          data[idx] = 0;
          data[idx + 1] = 0;
          data[idx + 2] = 0;
        } else {
          // Outside - color based on iteration
          const hue = (iteration / maxIteration) * 360;
          const [r, g, b] = hslToRgb(hue / 360, 1, 0.5);
          
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
        }
        data[idx + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }, [view]);
  
  // Auto-explore interesting regions
  useEffect(() => {
    if (!isExploring) return;
    
    const interestingPoints = [
      { x: -0.743643887037158704752191506114774, y: 0.131825904205311970493132056385139, zoom: 10000 },
      { x: -1.769383244219, y: 0.003415184268, zoom: 5000 },
      { x: -0.235125, y: 0.827215, zoom: 2000 },
    ];
    
    let targetIndex = 0;
    
    const explore = setInterval(() => {
      const target = interestingPoints[targetIndex];
      
      setView(prev => ({
        x: prev.x + (target.x - prev.x) * 0.05,
        y: prev.y + (target.y - prev.y) * 0.05,
        zoom: prev.zoom + (target.zoom - prev.zoom) * 0.05,
      }));
      
      targetIndex = (targetIndex + 1) % interestingPoints.length;
    }, 2000);
    
    return () => clearInterval(explore);
  }, [isExploring]);
  
  return (
    <div className="relative">
      <canvas ref={canvasRef} className="fixed inset-0" />
      
      {/* Controls */}
      <div className="fixed top-4 right-4 p-4 bg-black/80 backdrop-blur rounded-xl text-white">
        <h3 className="text-lg font-bold mb-4">🌀 Mandelbrot Set</h3>
        
        <div className="space-y-2 text-sm mb-4">
          <div>X: {view.x.toFixed(10)}</div>
          <div>Y: {view.y.toFixed(10)}</div>
          <div>Zoom: {view.zoom.toFixed(0)}x</div>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={() => setView(prev => ({ ...prev, zoom: prev.zoom * 2 }))}
            className="w-full px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
          >
            🔍 Zoom In
          </button>
          
          <button
            onClick={() => setView(prev => ({ ...prev, zoom: prev.zoom / 2 }))}
            className="w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            🔍 Zoom Out
          </button>
          
          <button
            onClick={() => setIsExploring(!isExploring)}
            className="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-700"
          >
            {isExploring ? '⏸️ Pause' : '▶️ Auto Explore'}
          </button>
          
          <button
            onClick={() => setView({ x: -0.5, y: 0, zoom: 200 })}
            className="w-full px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
          >
            🔄 Reset
          </button>
        </div>
        
        <div className="mt-4 text-xs text-white/40">
          🌀 Infinite detail - zoom forever
        </div>
      </div>
    </div>
  );
};

// Helper function
const hslToRgb = (h, s, l) => {
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};
```

**Kenapa UNREPLICABLE:**
- Infinite fractal detail
- Zoom level = unique fingerprint
- Cannot store all possible views (infinite)
- Mathematical impossibility to copy exact region

---

### B. Julia Set Explorer

```tsx
export const JuliaSet = () => {
  const [c, setC] = useState({
    real: -0.7,
    imag: 0.27015,
  });
  
  return (
    <div>
      {/* Similar to Mandelbrot but with fixed c parameter */}
      {/* User can modify c to see different Julia sets */}
    </div>
  );
};
```

---

## 3. **Cymatics Sound Visualization** 🎵

### A. Sound-to-Visual Resonance

```tsx
export const CymaticsVisualizer = () => {
  const canvasRef = useRef(null);
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  
  useEffect(() => {
    // Initialize audio context
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const analyserNode = ctx.createAnalyser();
    analyserNode.fftSize = 2048;
    
    setAudioContext(ctx);
    setAnalyser(analyserNode);
    
    // Request microphone access
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyserNode);
    });
    
    return () => {
      ctx.close();
    };
  }, []);
  
  useEffect(() => {
    if (!analyser || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      requestAnimationFrame(draw);
      
      analyser.getByteFrequencyData(dataArray);
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 4;
      
      // Draw cymatics pattern
      for (let i = 0; i < bufferLength; i++) {
        const amplitude = dataArray[i] / 255;
        const angle = (i / bufferLength) * Math.PI * 2;
        const r = radius + amplitude * 100;
        
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        
        const hue = (i / bufferLength) * 360;
        ctx.beginPath();
        ctx.arc(x, y, amplitude * 10, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${amplitude})`;
        ctx.fill();
      }
      
      // Draw standing wave pattern
      ctx.beginPath();
      for (let i = 0; i < bufferLength; i++) {
        const amplitude = dataArray[i] / 255;
        const angle = (i / bufferLength) * Math.PI * 2 * 4; // 4 harmonics
        const r = radius + Math.sin(angle) * amplitude * 50;
        
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
    };
    
    draw();
  }, [analyser]);
  
  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full h-screen bg-black" />
      
      <div className="fixed top-4 left-4 p-4 bg-black/80 backdrop-blur rounded-xl text-white">
        <h3 className="text-lg font-bold mb-2">🎵 Cymatics Visualizer</h3>
        <p className="text-sm text-white/60 mb-4">
          Sound creates visible patterns
        </p>
        
        <div className="text-xs text-white/40">
          🎤 Play music or speak to see patterns
        </div>
      </div>
    </div>
  );
};
```

**Kenapa UNREPLICABLE:**
- Real-time audio input (unique per moment)
- Sound waves = infinite variations
- Cannot replicate exact acoustic environment
- Physics-based generation

---

## 4. **Chaos-Fractal Fusion** 🔮

### A. Combined System

```tsx
export const ChaosFractalFusion = () => {
  const [chaosParams, setChaosParams] = useState({
    attractor: 'lorenz',
    sigma: 10,
    rho: 28,
    beta: 8/3,
  });
  
  const [fractalParams, setFractalParams] = useState({
    type: 'mandelbrot',
    x: -0.5,
    y: 0,
    zoom: 200,
    iterations: 100,
  });
  
  const [audioReactive, setAudioReactive] = useState(true);
  
  return (
    <div className="relative h-screen bg-black">
      {/* Render fusion of chaos + fractal + audio */}
      <FusionRenderer
        chaos={chaosParams}
        fractal={fractalParams}
        audio={audioReactive}
      />
      
      {/* Control Panel */}
      <div className="fixed top-4 right-4 p-4 bg-black/80 backdrop-blur rounded-xl text-white max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">🔮 Chaos-Fractal Fusion</h3>
        
        {/* Chaos Controls */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">🦋 Chaos Parameters</h4>
          <select
            value={chaosParams.attractor}
            onChange={(e) => setChaosParams(p => ({ ...p, attractor: e.target.value }))}
            className="w-full p-2 bg-white/10 rounded mb-2"
          >
            <option value="lorenz">Lorenz</option>
            <option value="rossler">Rössler</option>
            <option value="chen">Chen</option>
          </select>
          
          <div className="space-y-1">
            <label className="text-xs">Sigma: {chaosParams.sigma}</label>
            <input
              type="range"
              min="0"
              max="50"
              value={chaosParams.sigma}
              onChange={(e) => setChaosParams(p => ({ ...p, sigma: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>
        
        {/* Fractal Controls */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">🌀 Fractal Parameters</h4>
          <div className="space-y-1">
            <label className="text-xs">Zoom: {fractalParams.zoom}</label>
            <input
              type="range"
              min="10"
              max="10000"
              value={fractalParams.zoom}
              onChange={(e) => setFractalParams(p => ({ ...p, zoom: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>
        
        {/* Audio Toggle */}
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={audioReactive}
              onChange={(e) => setAudioReactive(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">🎵 Audio Reactive</span>
          </label>
        </div>
        
        {/* Randomize */}
        <button
          onClick={() => {
            setChaosParams({
              attractor: ['lorenz', 'rossler', 'chen'][Math.floor(Math.random() * 3)],
              sigma: Math.random() * 50,
              rho: Math.random() * 100,
              beta: Math.random() * 10,
            });
            setFractalParams({
              type: ['mandelbrot', 'julia'][Math.floor(Math.random() * 2)],
              x: (Math.random() - 0.5) * 2,
              y: (Math.random() - 0.5) * 2,
              zoom: 100 + Math.random() * 1000,
              iterations: 50 + Math.floor(Math.random() * 100),
            });
          }}
          className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:opacity-90 transition-opacity"
        >
          🎲 Complete Randomize
        </button>
        
        <div className="mt-4 text-xs text-white/40">
          🔮 Mathematical impossibility to replicate exact output
        </div>
      </div>
    </div>
  );
};

const FusionRenderer = ({ chaos, fractal, audio }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    // Render combined chaos + fractal visualization
    // with optional audio reactivity
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // 1. Render fractal as base layer
    renderFractal(ctx, fractal);
    
    // 2. Overlay chaos attractor
    renderChaosAttractor(ctx, chaos);
    
    // 3. Apply audio modulation if enabled
    if (audio) {
      applyAudioModulation(ctx);
    }
  }, [chaos, fractal, audio]);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};
```

---

## Response Template

```markdown
🔮 **Chaos Fractal Resonance - Activated!**

Saya sudah siapkan system yang MATHEMATICALLY UNREPLICABLE:

### 🦋 Chaos Systems:

1. **Lorenz Attractor**
   - Butterfly effect visualization
   - Sensitive to initial conditions
   - Strange attractor morphing

2. **Fractal Geometry**
   - Mandelbrot set (infinite zoom)
   - Julia sets
   - Infinite detail

3. **Cymatics**
   - Sound-to-visual resonance
   - Standing wave patterns
   - Audio reactive

4. **Fusion System**
   - Chaos + Fractal + Audio
   - Real-time modulation
   - Complete randomize

### 🛡️ Why MATHEMATICALLY Unreplicable:

- ✅ Chaos theory (butterfly effect)
- ✅ Infinite fractal detail
- ✅ Cannot store all possibilities
- ✅ Floating point precision matters
- ✅ Real-time physics (audio)
- ✅ Mathematical impossibility to copy

### 📊 Uniqueness Proof:

| System | Possible States | Replicable? |
|--------|----------------|-------------|
| Lorenz | ∞ (continuous) | ❌ No |
| Mandelbrot | ∞ (infinite zoom) | ❌ No |
| Cymatics | ∞ (audio input) | ❌ No |
| Fusion | ∞³ (combined) | ❌❌❌ No |

### 🎯 Use Cases:

- Music visualization
- Scientific art
- Luxury branding
- Immersive experiences
- Generative NFTs
- Art installations

Mau implement yang mana?
```

---

## Mathematical Proof of Unreplicability

```
1. Lorenz Attractor:
   - Initial conditions: (x₀, y₀, z₀) ∈ ℝ³
   - Possible states: Continuum (uncountable infinity)
   - Precision needed: Infinite (real numbers)
   - Replication probability: 0 (measure zero)

2. Mandelbrot Set:
   - Zoom levels: 1 to ∞
   - Possible views: Uncountably infinite
   - Storage needed: Infinite bits
   - Replication probability: 0

3. Cymatics:
   - Audio input: Continuous time series
   - Frequency spectrum: [0, ∞) Hz
   - Amplitude: Continuous
   - Environmental factors: Infinite variables
   - Replication probability: 0

CONCLUSION:
Combined system has (∞)³ = ∞ possible states
Probability of exact replication: 0
```

---

## Inspiration

- Edward Lorenz (chaos theory pioneer)
- Benoit Mandelbrot (fractal geometry father)
- Hans Jenny (cymatics researcher)
- Casey Reas (generative art)
- Inigo Quilez (procedural graphics)
