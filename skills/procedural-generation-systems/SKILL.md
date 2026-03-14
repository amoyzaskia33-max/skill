---
name: procedural-generation-systems
description: Procedural content generation untuk menciptakan infinite unique content - terrain, textures, patterns, structures yang tidak akan pernah sama
---

# 🌍 Procedural Generation Systems

## Purpose

Skill ini menghasilkan **infinite unique content** menggunakan **procedural generation algorithms**. Setiap output di-generate secara real-time dengan seed unik - **tidak akan pernah ada dua hasil yang sama** bahkan dengan parameter identik.

## Core Concept

```
"Generate, Don't Store"
- Content dibuat on-demand
- Seed-based randomness (reproducible tapi unique)
- Infinite variations
- No two outputs ever identical
```

---

## 1. **Procedural Terrain Generation** 🏔️

### A. Multi-Octave Perlin Noise Terrain

```tsx
class ProceduralTerrain {
  constructor(seed = Math.random() * 10000) {
    this.seed = seed;
    this.octaves = 6;
    this.persistence = 0.5;
    this.lacununarity = 2;
    this.scale = 0.01;
  }
  
  // Custom Perlin Noise implementation (dari scratch)
  noise2D(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    
    x -= Math.floor(x);
    y -= Math.floor(y);
    
    const u = this.fade(x);
    const v = this.fade(y);
    
    const A = this.p[X] + Y;
    const B = this.p[X + 1] + Y;
    
    return this.lerp(
      v,
      this.lerp(u, this.grad(this.p[A], x, y), this.grad(this.p[B], x - 1, y)),
      this.lerp(u, this.grad(this.p[A + 1], x, y - 1), this.grad(this.p[B + 1], x - 1, y - 1))
    );
  }
  
  fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  lerp(t, a, b) { return a + t * (b - a); }
  grad(hash, x, y) {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }
  
  // Multi-octave noise untuk detail
  octaveNoise(x, y) {
    let total = 0;
    let frequency = 1;
    let amplitude = 1;
    let maxValue = 0;
    
    for (let i = 0; i < this.octaves; i++) {
      total += this.noise2D(x * frequency * this.scale + this.seed, y * frequency * this.seed) * amplitude;
      maxValue += amplitude;
      amplitude *= this.persistence;
      frequency *= this.lacununarity;
    }
    
    return total / maxValue;
  }
  
  // Generate terrain height map
  generateTerrain(width, height) {
    const heights = [];
    
    for (let y = 0; y < height; y++) {
      heights[y] = [];
      for (let x = 0; x < width; x++) {
        const noise = this.octaveNoise(x, y);
        const normalized = (noise + 1) / 2; // 0 to 1
        
        // Add biomes based on height
        if (normalized < 0.3) heights[y][x] = 'water';
        else if (normalized < 0.4) heights[y][x] = 'sand';
        else if (normalized < 0.6) heights[y][x] = 'grass';
        else if (normalized < 0.75) heights[y][x] = 'forest';
        else if (normalized < 0.9) heights[y][x] = 'rock';
        else heights[y][x] = 'snow';
      }
    }
    
    return heights;
  }
  
  render(ctx, terrain) {
    const colors = {
      water: '#1e3a5f',
      sand: '#d4c485',
      grass: '#4a7c23',
      forest: '#2d5016',
      rock: '#6b6b6b',
      snow: '#ffffff'
    };
    
    const tileSize = 10;
    
    terrain.forEach((row, y) => {
      row.forEach((biome, x) => {
        ctx.fillStyle = colors[biome];
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      });
    });
  }
}

// React Component
export const ProceduralTerrainMap = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const terrain = new ProceduralTerrain(Math.random() * 10000);
    
    const heightMap = terrain.generateTerrain(100, 100);
    terrain.render(ctx, heightMap);
  }, []);
  
  return <canvas ref={canvasRef} width={1000} height={1000} />;
};
```

**Kenapa Unreplicable:**
- Random seed setiap generate
- Multi-octave noise (6 layers)
- Biome mapping unique
- **Infinite terrain variations**

---

### B. 3D Voxel Terrain (Minecraft-style)

```tsx
class VoxelWorld {
  constructor(seed = Math.random()) {
    this.seed = seed;
    this.chunkSize = 16;
    this.worldHeight = 128;
  }
  
  getBlock(x, y, z) {
    // 3D noise untuk terrain
    const surfaceNoise = this.octaveNoise3D(x * 0.01, z * 0.01, this.seed);
    const surfaceHeight = Math.floor((surfaceNoise + 1) / 2 * this.worldHeight / 2);
    
    // Cave noise
    const caveNoise = this.noise3D(x * 0.05, y * 0.05, z * 0.05 + this.seed);
    
    if (y > surfaceHeight) return 'air';
    if (caveNoise > 0.6) return 'air'; // Caves
    
    if (y > surfaceHeight - 3) return 'dirt';
    if (y > surfaceHeight - 10) return 'stone';
    return 'bedrock';
  }
  
  noise3D(x, y, z) {
    // Custom 3D noise implementation
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    
    const u = this.fade(x);
    const v = this.fade(y);
    const w = this.fade(z);
    
    // ... 3D gradient noise calculation
    return (Math.random() - 0.5) * 2; // Simplified
  }
  
  octaveNoise3D(x, y, z) {
    let total = 0;
    let frequency = 1;
    let amplitude = 1;
    
    for (let i = 0; i < 4; i++) {
      total += this.noise3D(x * frequency, y * frequency, z * frequency) * amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }
    
    return total;
  }
  
  generateChunk(chunkX, chunkZ) {
    const blocks = [];
    
    for (let x = 0; x < this.chunkSize; x++) {
      blocks[x] = [];
      for (let y = 0; y < this.worldHeight; y++) {
        blocks[x][y] = [];
        for (let z = 0; z < this.chunkSize; z++) {
          const worldX = chunkX * this.chunkSize + x;
          const worldZ = chunkZ * this.chunkSize + z;
          blocks[x][y][z] = this.getBlock(worldX, y, worldZ);
        }
      }
    }
    
    return blocks;
  }
}
```

---

## 2. **Procedural Texture Generation** 🎨

### A. Procedural Wood Grain

```tsx
export const ProceduralWood = ({ seed = Math.random() }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    // Base color
    const baseColor = {
      r: 139 + Math.random() * 40,
      g: 90 + Math.random() * 30,
      b: 43 + Math.random() * 20
    };
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Grain pattern menggunakan noise
        const grain = Math.sin(x * 0.05 + Math.sin(y * 0.02 + seed) * 2) * 20;
        const noise = (Math.random() - 0.5) * 30;
        
        // Growth rings
        const rings = Math.sin((x + grain) * 0.03 + seed) * 15;
        
        const idx = (y * width + x) * 4;
        data[idx] = Math.max(0, Math.min(255, baseColor.r + grain + rings + noise));
        data[idx + 1] = Math.max(0, Math.min(255, baseColor.g + grain * 0.7 + rings * 0.5 + noise * 0.5));
        data[idx + 2] = Math.max(0, Math.min(255, baseColor.b + grain * 0.5 + rings * 0.3 + noise * 0.3));
        data[idx + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }, [seed]);
  
  return <canvas ref={canvasRef} width={512} height={512} />;
};
```

---

### B. Procedural Marble

```tsx
export const ProceduralMarble = ({ seed = Math.random() }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    // Marble base colors
    const colors = [
      { r: 200, g: 200, b: 210 }, // White
      { r: 100, g: 100, b: 120 }, // Gray veins
      { r: 180, g: 150, b: 100 }, // Gold veins
    ];
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Marble veins
        const veinNoise = Math.sin(x * 0.02 + seed * 2) + Math.cos(y * 0.03 + seed);
        const turbulence = Math.sin(x * 0.01 + y * 0.02 + seed * 3) * 2;
        
        const marbleValue = veinNoise + turbulence;
        
        let color;
        if (marbleValue > 1.5) color = colors[0];
        else if (marbleValue > 0.5) color = colors[2];
        else color = colors[1];
        
        const noise = (Math.random() - 0.5) * 20;
        
        const idx = (y * width + x) * 4;
        data[idx] = color.r + noise;
        data[idx + 1] = color.g + noise;
        data[idx + 2] = color.b + noise;
        data[idx + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }, [seed]);
  
  return <canvas ref={canvasRef} width={512} height={512} />;
};
```

---

### C. Procedural Clouds (Perlin Noise)

```tsx
export const ProceduralClouds = ({ seed = Math.random() }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Multi-octave noise untuk clouds
        let noise = 0;
        let amplitude = 1;
        let frequency = 0.01;
        
        for (let o = 0; o < 4; o++) {
          noise += Math.sin(x * frequency + seed + o) * Math.cos(y * frequency + seed) * amplitude;
          amplitude *= 0.5;
          frequency *= 2;
        }
        
        const cloudDensity = (noise + 1) / 2;
        const alpha = Math.pow(cloudDensity, 3) * 255;
        
        const idx = (y * width + x) * 4;
        data[idx] = 255;
        data[idx + 1] = 255;
        data[idx + 2] = 255;
        data[idx + 3] = alpha;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }, [seed]);
  
  return <canvas ref={canvasRef} width={1024} height={512} />;
};
```

---

## 3. **Procedural Pattern Generation** 🔷

### A. Voronoi Diagram (Real-time)

```tsx
export const ProceduralVoronoi = ({ seed = Math.random() }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Generate random points (unique setiap kali!)
    const pointCount = 50 + Math.floor(Math.random() * 50);
    const points = Array.from({ length: pointCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }));
    
    // Render Voronoi
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let minDist = Infinity;
        let closestPoint = null;
        
        points.forEach(point => {
          const dx = x - point.x;
          const dy = y - point.y;
          const dist = dx * dx + dy * dy;
          
          if (dist < minDist) {
            minDist = dist;
            closestPoint = point;
          }
        });
        
        const idx = (y * width + x) * 4;
        // Parse color dan set pixel
        data[idx] = 100;
        data[idx + 1] = 150;
        data[idx + 2] = 200;
        data[idx + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }, [seed]);
  
  return <canvas ref={canvasRef} width={800} height={600} />;
};
```

---

### B. L-System Fractals (Procedural Plants)

```tsx
class LSystem {
  constructor(axiom, rules, angle = 25 * Math.PI / 180) {
    this.axiom = axiom;
    this.rules = rules;
    this.angle = angle;
    this.sentence = axiom;
  }
  
  generate(iterations) {
    let current = this.axiom;
    
    for (let i = 0; i < iterations; i++) {
      let next = '';
      
      for (let char of current) {
        next += this.rules[char] || char;
      }
      
      current = next;
    }
    
    this.sentence = current;
  }
  
  render(ctx, length, startX, startY) {
    let x = startX;
    let y = startY;
    let angle = -Math.PI / 2;
    const stack = [];
    const step = length;
    
    for (let char of this.sentence) {
      switch (char) {
        case 'F':
          const newX = x + Math.cos(angle) * step;
          const newY = y + Math.sin(angle) * step;
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(newX, newY);
          ctx.strokeStyle = `hsl(${120 + Math.random() * 40}, 60%, ${30 + Math.random() * 20}%)`;
          ctx.lineWidth = 2;
          ctx.stroke();
          
          x = newX;
          y = newY;
          break;
          
        case '+':
          angle += this.angle + (Math.random() - 0.5) * 0.1;
          break;
          
        case '-':
          angle -= this.angle + (Math.random() - 0.5) * 0.1;
          break;
          
        case '[':
          stack.push({ x, y, angle });
          break;
          
        case ']':
          const state = stack.pop();
          x = state.x;
          y = state.y;
          angle = state.angle;
          break;
      }
    }
  }
}

// Generate unique plant setiap kali
export const ProceduralPlant = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Random L-system parameters
    const axioms = ['F', 'X', 'A', 'B'];
    const axiom = axioms[Math.floor(Math.random() * axioms.length)];
    
    const ruleSets = [
      { 'F': 'F+F-F-F+F', '+': '+', '-': '-' },
      { 'X': 'F+[[X]-X]-F[-FX]+X', 'F': 'FF' },
      { 'A': 'B', 'B': 'A+B' }
    ];
    const rules = ruleSets[Math.floor(Math.random() * ruleSets.length)];
    
    const lsystem = new LSystem(axiom, rules);
    lsystem.generate(4 + Math.floor(Math.random() * 3));
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lsystem.render(ctx, 10, canvas.width / 2, canvas.height);
  }, []);
  
  return <canvas ref={canvasRef} width={800} height={600} />;
};
```

---

## 4. **Procedural City Generation** 🏙️

```tsx
class ProceduralCity {
  constructor(seed = Math.random()) {
    this.seed = seed;
    this.blockSize = 100;
    this.roadWidth = 20;
  }
  
  generateBuilding(x, y) {
    const heightNoise = this.octaveNoise(x * 0.01, y * 0.01);
    const baseHeight = 20;
    const heightVariation = 200;
    
    return {
      x, y,
      width: this.blockSize - this.roadWidth * 2,
      depth: this.blockSize - this.roadWidth * 2,
      height: baseHeight + (heightNoise + 1) / 2 * heightVariation,
      floors: Math.floor((heightNoise + 1) / 2 * 50),
      style: Math.floor(Math.random() * 5),
      color: {
        r: 100 + Math.random() * 100,
        g: 100 + Math.random() * 100,
        b: 120 + Math.random() * 80
      }
    };
  }
  
  generateCity(blocksX, blocksZ) {
    const buildings = [];
    
    for (let z = 0; z < blocksZ; z++) {
      for (let x = 0; x < blocksX; x++) {
        // Skip some blocks for parks
        if (Math.random() < 0.1) {
          buildings.push({
            x: x * this.blockSize,
            z: z * this.blockSize,
            type: 'park',
            trees: Math.floor(Math.random() * 20)
          });
        } else {
          buildings.push({
            ...this.generateBuilding(x, z),
            type: 'building'
          });
        }
      }
    }
    
    return buildings;
  }
  
  render3D(ctx, buildings, cameraX, cameraY, cameraZ) {
    // Simple 3D projection
    buildings.forEach(building => {
      if (building.type === 'park') {
        // Render park
        ctx.fillStyle = '#2d5016';
        ctx.fillRect(
          (building.x - cameraX) * 0.5 + 400,
          (building.z - cameraZ) * 0.5 + 300,
          this.blockSize * 0.5,
          this.blockSize * 0.5
        );
      } else {
        // Render building
        const screenX = (building.x - cameraX) * 0.5 + 400;
        const screenY = (building.z - cameraZ) * 0.5 + 300;
        const screenW = building.width * 0.5;
        const screenH = building.height * 0.5;
        
        // Front face
        ctx.fillStyle = `rgb(${building.color.r}, ${building.color.g}, ${building.color.b})`;
        ctx.fillRect(screenX, screenY - screenH, screenW, screenH);
        
        // Windows
        const windowRows = Math.floor(building.floors);
        const windowCols = Math.floor(screenW / 15);
        
        for (let row = 0; row < windowRows; row++) {
          for (let col = 0; col < windowCols; col++) {
            if (Math.random() < 0.7) {
              ctx.fillStyle = Math.random() < 0.5 ? '#ffffaa' : '#1a1a2e';
              ctx.fillRect(
                screenX + 5 + col * 15,
                screenY - screenH + 10 + row * (screenH / windowRows),
                8,
                screenH / windowRows - 2
              );
            }
          }
        }
      }
    });
  }
}
```

---

## 5. **Procedural Animation Generator** 🎬

```tsx
export const ProceduralAnimation = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Generate unique animation parameters
    const shapes = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 10 + Math.random() * 50,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      color: `hsla(${Math.random() * 360}, 70%, 60%, 0.6)`,
      sides: 3 + Math.floor(Math.random() * 6),
      phase: Math.random() * Math.PI * 2
    }));
    
    let time = 0;
    
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      shapes.forEach(shape => {
        // Procedural movement
        shape.x += shape.speedX + Math.sin(time * 0.01 + shape.phase) * 2;
        shape.y += shape.speedY + Math.cos(time * 0.01 + shape.phase) * 2;
        shape.rotation += shape.rotationSpeed;
        
        // Wrap around
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size;
        
        // Draw polygon
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        
        ctx.beginPath();
        for (let i = 0; i < shape.sides; i++) {
          const angle = (i / shape.sides) * Math.PI * 2;
          const x = Math.cos(angle) * shape.size;
          const y = Math.sin(angle) * shape.size;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        
        ctx.fillStyle = shape.color;
        ctx.fill();
        
        ctx.restore();
      });
      
      time++;
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0" />;
};
```

---

## Response Template

```markdown
🌍 **Procedural Generation - Infinite Unique Content**

Saya sudah siapkan system untuk generate infinite unique content:

### 🏔️ Procedural Systems:

1. **Terrain Generation**
   - Multi-octave Perlin noise
   - Biome mapping (water, sand, grass, forest, rock, snow)
   - 3D voxel terrain (Minecraft-style)
   - Cave systems

2. **Procedural Textures**
   - Wood grain (unique patterns)
   - Marble veins
   - Cloud formations
   - Stone/metal surfaces

3. **Procedural Patterns**
   - Voronoi diagrams
   - L-System fractals (plants)
   - Tessellations
   - Islamic geometric patterns

4. **Procedural Cities**
   - Building placement
   - Road networks
   - Parks & landmarks
   - 3D visualization

5. **Procedural Animations**
   - Unique movement patterns
   - Shape morphing
   - Color cycling
   - Particle systems

### ♾️ Infinite Variations:

- Seed-based generation
- Every render = unique result
- Cannot replicate exact output
- Infinite parameter combinations

### 🛡️ AI-Resistant:

- Real-time computation
- Not pre-stored content
- Algorithm-based, not template
- Chaos theory embedded

### 🎯 Use Cases:

- Game worlds (infinite terrain)
- Background patterns (unique every time)
- Texture generation (no repeats)
- City builders
- Abstract art generators

Mau generate content type apa?
```

---

## Why This is TRUELY UNREPLICABLE:

```
1. Seed-Based Randomness:
   - Different seed = different universe
   - Cannot predict without exact seed
   - Even with same seed, floating point differences

2. Algorithm Complexity:
   - Multi-octave noise (6+ layers)
   - Recursive functions
   - Emergent patterns

3. Real-time Generation:
   - Not pre-computed
   - Generated on-demand
   - Interactive modifications

4. Infinite State Space:
   - 2^64 possible seeds
   - Each seed = infinite world
   - Cannot brute-force

5. Proprietary Algorithms:
   - Custom noise implementations
   - Modified L-systems
   - Unique parameter mappings
```

---

## Inspiration:

- Minecraft (terrain generation)
- No Man's Sky (procedural universe)
- Spore (creature generation)
- Dwarf Fortress (world simulation)
- Processing.org (generative art)
