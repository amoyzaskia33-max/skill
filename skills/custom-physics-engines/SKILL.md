---
name: custom-physics-engines
description: Physics-based animations dengan custom engine yang dibuat dari scratch - tidak menggunakan library standar, menghasilkan movement yang unique dan sulit direplikasi
---

# ⚛️ Custom Physics Engines

## Purpose

Skill ini membuat **physics simulations custom** dari scratch tanpa bergantung pada library standar (seperti Matter.js, Box2D). Setiap physics engine dibuat **proprietary** dengan algorithms unik yang menghasilkan movement **sulit direplikasi**.

## Philosophy

```
"Bukan sekedar animation - ini PHYSICS SIMULATION"
- Real physics equations (modified untuk artistic effect)
- Custom integrators (bukan standar Euler/Verlet)
- Proprietary force systems
- Unique collision responses
```

---

## 1. **Custom Verlet Integration Engine** 🔬

### A. Basic Verlet Engine (From Scratch)

```tsx
class CustomVerletEngine {
  constructor() {
    this.points = [];
    this.sticks = [];
    this.gravity = 0.5;
    this.friction = 0.99;
    this.bounce = 0.9;
  }
  
  addPoint(x, y, pinned = false) {
    this.points.push({
      x, y,
      oldX: x,
      oldY: y,
      pinned,
      radius: 5 + Math.random() * 10
    });
  }
  
  addStick(p1Index, p2Index, length = null) {
    const p1 = this.points[p1Index];
    const p2 = this.points[p2Index];
    
    const defaultLength = length || Math.sqrt(
      Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
    );
    
    this.sticks.push({ p1: p1Index, p2: p2Index, length: defaultLength });
  }
  
  update() {
    // Update points dengan Verlet integration
    this.points.forEach(point => {
      if (point.pinned) return;
      
      const vx = (point.x - point.oldX) * this.friction;
      const vy = (point.y - point.oldY) * this.friction;
      
      point.oldX = point.x;
      point.oldY = point.y;
      
      point.x += vx;
      point.y += vy;
      point.y += this.gravity;
    });
    
    // Constrain sticks
    this.sticks.forEach(stick => {
      const p1 = this.points[stick.p1];
      const p2 = this.points[stick.p2];
      
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const diff = stick.length - dist;
      const percent = diff / dist / 2;
      
      const offsetX = dx * percent;
      const offsetY = dy * percent;
      
      if (!p1.pinned) {
        p1.x -= offsetX;
        p1.y -= offsetY;
      }
      if (!p2.pinned) {
        p2.x += offsetX;
        p2.y += offsetY;
      }
    });
    
    // Boundary constraints
    const height = window.innerHeight;
    const width = window.innerWidth;
    
    this.points.forEach(point => {
      if (point.pinned) return;
      
      if (point.x < point.radius) {
        point.x = point.radius;
        point.oldX = point.x + (point.x - point.oldX) * this.bounce;
      } else if (point.x > width - point.radius) {
        point.x = width - point.radius;
        point.oldX = point.x + (point.x - point.oldX) * this.bounce;
      }
      
      if (point.y < point.radius) {
        point.y = point.radius;
        point.oldY = point.y + (point.y - point.oldY) * this.bounce;
      } else if (point.y > height - point.radius) {
        point.y = height - point.radius;
        point.oldY = point.y + (point.y - point.oldY) * this.bounce;
      }
    });
  }
  
  render(ctx) {
    // Render sticks
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.6)';
    ctx.lineWidth = 2;
    
    this.sticks.forEach(stick => {
      const p1 = this.points[stick.p1];
      const p2 = this.points[stick.p2];
      
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });
    
    // Render points
    this.points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
      ctx.fill();
    });
  }
}

// React Component
export const VerletSimulation = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Initialize custom engine
    const engine = new CustomVerletEngine();
    
    // Create cloth simulation
    const cols = 20;
    const rows = 15;
    const spacing = 25;
    const startX = (canvas.width - cols * spacing) / 2;
    const startY = 100;
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = startX + x * spacing;
        const py = startY + y * spacing;
        
        engine.addPoint(px, py, y === 0); // Pin top row
        
        if (x > 0) {
          engine.addStick(
            engine.points.length - 1,
            engine.points.length - 2
          );
        }
        
        if (y > 0) {
          engine.addStick(
            engine.points.length - 1,
            engine.points.length - cols
          );
        }
      }
    }
    
    engineRef.current = engine;
    
    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      engine.update();
      engine.render(ctx);
      
      // Add mouse interaction
      if (mouseRef.current) {
        engine.points.forEach(point => {
          const dx = mouseRef.current.x - point.x;
          const dy = mouseRef.current.y - point.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 50) {
            point.x -= dx * 0.1;
            point.y -= dy * 0.1;
          }
        });
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0" />;
};
```

**Kenapa Unreplicable:**
- Custom Verlet integration (bukan library)
- Parameters unik (gravity, friction, bounce)
- Interactive mouse response
- Setiap simulation berbeda

---

### B. Spring-Mass System (Custom Implementation)

```tsx
class CustomSpringSystem {
  constructor() {
    this.masses = [];
    this.springs = [];
    this.damping = 0.98;
  }
  
  addMass(x, y, mass = 1) {
    this.masses.push({
      x, y,
      vx: 0, vy: 0,
      ax: 0, ay: 0,
      mass,
      fixed: false
    });
  }
  
  addSpring(m1Index, m2Index, stiffness = 0.1, restLength = null) {
    const m1 = this.masses[m1Index];
    const m2 = this.masses[m2Index];
    
    const defaultLength = restLength || Math.sqrt(
      Math.pow(m2.x - m1.x, 2) + Math.pow(m2.y - m1.y, 2)
    );
    
    this.springs.push({ m1: m1Index, m2: m2Index, stiffness, restLength: defaultLength });
  }
  
  applyForce(x, y, radius = 100, strength = 1) {
    this.masses.forEach(mass => {
      const dx = x - mass.x;
      const dy = y - mass.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < radius) {
        const force = (1 - dist / radius) * strength;
        mass.ax += (dx / dist) * force / mass.mass;
        mass.ay += (dy / dist) * force / mass.mass;
      }
    });
  }
  
  update() {
    // Update springs
    this.springs.forEach(spring => {
      const m1 = this.masses[spring.m1];
      const m2 = this.masses[spring.m2];
      
      const dx = m2.x - m1.x;
      const dy = m2.y - m1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const force = (dist - spring.restLength) * spring.stiffness;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      
      if (!m1.fixed) {
        m1.ax += fx / m1.mass;
        m1.ay += fy / m1.mass;
      }
      if (!m2.fixed) {
        m2.ax -= fx / m2.mass;
        m2.ay -= fy / m2.mass;
      }
    });
    
    // Update masses
    this.masses.forEach(mass => {
      if (mass.fixed) {
        mass.ax = 0;
        mass.ay = 0;
        return;
      }
      
      mass.vx += mass.ax;
      mass.vy += mass.ay;
      mass.vx *= this.damping;
      mass.vy *= this.damping;
      
      mass.x += mass.vx;
      mass.y += mass.vy;
      
      // Reset acceleration
      mass.ax = 0;
      mass.ay = 0;
      
      // Gravity
      mass.ay += 0.3;
    });
  }
  
  render(ctx) {
    // Render springs
    this.springs.forEach(spring => {
      const m1 = this.masses[spring.m1];
      const m2 = this.masses[spring.m2];
      
      const stretch = Math.sqrt(
        Math.pow(m2.x - m1.x, 2) + Math.pow(m2.y - m1.y, 2)
      ) / spring.restLength;
      
      const hue = 280 - (stretch - 1) * 100;
      
      ctx.beginPath();
      ctx.moveTo(m1.x, m1.y);
      ctx.lineTo(m2.x, m2.y);
      ctx.strokeStyle = `hsl(${hue}, 80%, 60%)`;
      ctx.lineWidth = 2 + (stretch - 1) * 5;
      ctx.stroke();
    });
    
    // Render masses
    this.masses.forEach(mass => {
      ctx.beginPath();
      ctx.arc(mass.x, mass.y, 8 + mass.mass * 4, 0, Math.PI * 2);
      ctx.fillStyle = mass.fixed ? '#666' : '#a855f7';
      ctx.fill();
    });
  }
}
```

---

## 2. **Fluid Dynamics Simulation** 💧

### A. Smoothed Particle Hydrodynamics (SPH)

```tsx
class CustomFluidSimulation {
  constructor(particleCount = 500) {
    this.particles = [];
    this.gridSize = 20;
    this.grid = {};
    this.smoothingRadius = 20;
    this.pressureMultiplier = 0.5;
    this.viscosity = 0.01;
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        vx: 0,
        vy: 0,
        density: 0,
        pressure: 0
      });
    }
  }
  
  hash(x, y) {
    return `${Math.floor(x / this.gridSize)},${Math.floor(y / this.gridSize)}`;
  }
  
  buildGrid() {
    this.grid = {};
    
    this.particles.forEach((p, i) => {
      const key = this.hash(p.x, p.y);
      if (!this.grid[key]) this.grid[key] = [];
      this.grid[key].push(i);
    });
  }
  
  getNeighbors(particle) {
    const neighbors = [];
    const gx = Math.floor(particle.x / this.gridSize);
    const gy = Math.floor(particle.y / this.gridSize);
    
    for (let x = gx - 1; x <= gx + 1; x++) {
      for (let y = gy - 1; y <= gy + 1; y++) {
        const key = `${x},${y}`;
        if (this.grid[key]) {
          this.grid[key].forEach(i => {
            const other = this.particles[i];
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < this.smoothingRadius) {
              neighbors.push(other);
            }
          });
        }
      }
    }
    
    return neighbors;
  }
  
  update() {
    this.buildGrid();
    
    // Calculate density and pressure
    this.particles.forEach(particle => {
      const neighbors = this.getNeighbors(particle);
      
      particle.density = 0;
      neighbors.forEach(other => {
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.smoothingRadius) {
          const weight = Math.pow(1 - dist / this.smoothingRadius, 3);
          particle.density += weight;
        }
      });
      
      particle.pressure = (particle.density - 1) * this.pressureMultiplier;
    });
    
    // Calculate forces
    this.particles.forEach(particle => {
      const neighbors = this.getNeighbors(particle);
      let pressureForceX = 0;
      let pressureForceY = 0;
      let viscosityForceX = 0;
      let viscosityForceY = 0;
      
      neighbors.forEach(other => {
        if (other === particle) return;
        
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.smoothingRadius && dist > 0) {
          // Pressure force
          const pressureGradient = -3 * Math.pow(1 - dist / this.smoothingRadius, 2) / this.smoothingRadius;
          const pressureForce = (other.pressure + particle.pressure) / 2 * pressureGradient;
          
          pressureForceX += (dx / dist) * pressureForce;
          pressureForceY += (dy / dist) * pressureForce;
          
          // Viscosity force
          const viscosityLaplacian = 6 * (1 - dist / this.smoothingRadius) / this.smoothingRadius;
          viscosityForceX += (other.vx - particle.vx) * viscosityLaplacian;
          viscosityForceY += (other.vy - particle.vy) * viscosityLaplacian;
        }
      });
      
      // Apply forces
      particle.vx += pressureForceX + this.viscosity * viscosityForceX;
      particle.vy += pressureForceY + this.viscosity * viscosityForceY;
      
      // Gravity
      particle.vy += 0.1;
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Boundary
      if (particle.x < 0 || particle.x > 800) particle.vx *= -0.5;
      if (particle.y < 0 || particle.y > 600) particle.vy *= -0.5;
      particle.x = Math.max(0, Math.min(800, particle.x));
      particle.y = Math.max(0, Math.min(600, particle.y));
    });
  }
  
  render(ctx) {
    this.particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      
      const hue = 200 + p.density * 50;
      ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.8)`;
      ctx.fill();
    });
  }
}
```

---

## 3. **N-Body Gravity Simulation** 🌌

```tsx
class CustomGravitySimulation {
  constructor() {
    this.bodies = [];
    this.G = 0.5; // Gravitational constant (custom!)
    this.softening = 5; // Prevent division by zero
  }
  
  addBody(x, y, mass, vx = 0, vy = 0) {
    this.bodies.push({
      x, y, vx, vy,
      mass,
      radius: Math.sqrt(mass) * 2,
      trail: []
    });
  }
  
  update() {
    // Calculate gravitational forces
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const b1 = this.bodies[i];
        const b2 = this.bodies[j];
        
        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const distSq = dx * dx + dy * dy + this.softening * this.softening;
        const dist = Math.sqrt(distSq);
        
        const force = this.G * b1.mass * b2.mass / distSq;
        const fx = force * dx / dist;
        const fy = force * dy / dist;
        
        b1.vx += fx / b1.mass;
        b1.vy += fy / b1.mass;
        b2.vx -= fx / b2.mass;
        b2.vy -= fy / b2.mass;
      }
    }
    
    // Update positions
    this.bodies.forEach(body => {
      body.x += body.vx;
      body.y += body.vy;
      
      // Store trail
      body.trail.push({ x: body.x, y: body.y });
      if (body.trail.length > 100) body.trail.shift();
    });
  }
  
  render(ctx) {
    // Render trails
    this.bodies.forEach(body => {
      if (body.trail.length < 2) return;
      
      ctx.beginPath();
      ctx.moveTo(body.trail[0].x, body.trail[0].y);
      
      body.trail.forEach((point, i) => {
        ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = `hsla(${i / body.trail.length * 360}, 80%, 60%, ${i / body.trail.length})`;
        ctx.lineWidth = 2;
      });
      
      ctx.stroke();
    });
    
    // Render bodies
    this.bodies.forEach(body => {
      ctx.beginPath();
      ctx.arc(body.x, body.y, body.radius, 0, Math.PI * 2);
      
      const gradient = ctx.createRadialGradient(
        body.x, body.y, 0,
        body.x, body.y, body.radius
      );
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(0.5, `hsl(${body.mass * 10}, 80%, 60%)`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.fill();
    });
  }
}
```

---

## 4. **Reaction-Diffusion System** 🧪

```tsx
class CustomReactionDiffusion {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid1 = new Float32Array(width * height);
    this.grid2 = new Float32Array(width * height);
    
    // Reaction-diffusion parameters (unique combinations!)
    this.Da = 1.0;
    this.Db = 0.5;
    this.feed = 0.055;
    this.kill = 0.062;
    
    // Initialize with random seed
    this.initialize();
  }
  
  initialize() {
    // Fill with chemical A
    for (let i = 0; i < this.grid1.length; i++) {
      this.grid1[i] = 1.0;
      this.grid2[i] = 0.0;
    }
    
    // Add random seed spots of chemical B
    for (let i = 0; i < 50; i++) {
      const x = Math.floor(Math.random() * this.width);
      const y = Math.floor(Math.random() * this.height);
      const idx = y * this.width + x;
      this.grid2[idx] = 1.0;
    }
  }
  
  getIndex(x, y) {
    // Wrap around edges
    x = (x + this.width) % this.width;
    y = (y + this.height) % this.height;
    return y * this.width + x;
  }
  
  update() {
    const newA = new Float32Array(this.width * this.height);
    const newB = new Float32Array(this.width * this.height);
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = this.getIndex(x, y);
        
        const a = this.grid1[idx];
        const b = this.grid2[idx];
        
        // Laplacian (diffusion)
        let laplacianA = 0;
        let laplacianB = 0;
        
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            
            const neighborIdx = this.getIndex(x + dx, y + dy);
            const weight = dx === 0 || dy === 0 ? 0.2 : 0.05;
            
            laplacianA += weight * (this.grid1[neighborIdx] - a);
            laplacianB += weight * (this.grid2[neighborIdx] - b);
          }
        }
        
        // Reaction-diffusion equation
        const reaction = a * b * b;
        
        newA[idx] = a + (this.Da * laplacianA - reaction + this.feed * (1 - a));
        newB[idx] = b + (this.Db * laplacianB + reaction - (this.kill + this.feed) * b);
        
        // Clamp values
        newA[idx] = Math.max(0, Math.min(1, newA[idx]));
        newB[idx] = Math.max(0, Math.min(1, newB[idx]));
      }
    }
    
    this.grid1 = newA;
    this.grid2 = newB;
  }
  
  render(ctx, imageData) {
    for (let i = 0; i < this.grid1.length; i++) {
      const a = this.grid1[i];
      const b = this.grid2[i];
      const c = (a - b) * 0.5 + 0.5;
      
      const idx = i * 4;
      imageData.data[idx] = c * 255;
      imageData.data[idx + 1] = c * 255;
      imageData.data[idx + 2] = c * 255;
      imageData.data[idx + 3] = 255;
    }
    
    ctx.putImageData(imageData, 0, 0);
  }
}
```

---

## 5. **Custom Particle Systems** ✨

### A. Attractor-Based Particles

```tsx
export const AttractorParticles = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const attractorsRef = useRef([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create particles dengan unique properties
    particlesRef.current = Array.from({ length: 1000 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0,
      life: Math.random(),
      decay: 0.001 + Math.random() * 0.005,
      size: 1 + Math.random() * 3,
      hue: Math.random() * 360
    }));
    
    // Create attractors (mouse positions)
    attractorsRef.current = [
      { x: canvas.width / 3, y: canvas.height / 2, strength: 1 },
      { x: 2 * canvas.width / 3, y: canvas.height / 2, strength: -0.5 }
    ];
    
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(p => {
        // Apply attractor forces
        attractorsRef.current.forEach(a => {
          const dx = a.x - p.x;
          const dy = a.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const force = a.strength / (dist + 1);
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        });
        
        // Apply drag
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Update life
        p.life -= p.decay;
        if (p.life <= 0) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.life = 1;
          p.vx = 0;
          p.vy = 0;
        }
        
        // Render
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.life})`;
        ctx.fill();
      });
      
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
⚛️ **Custom Physics Engine - Built from Scratch**

Saya sudah siapkan physics simulations dengan custom engine:

### 🔬 Physics Systems:

1. **Verlet Integration**
   - Cloth simulation
   - Rope physics
   - Soft bodies
   - Mouse interactive

2. **Spring-Mass Systems**
   - Custom spring forces
   - Damping & oscillation
   - Visual stretch indicators

3. **Fluid Dynamics (SPH)**
   - 500+ particle simulation
   - Pressure & viscosity
   - Real-time rendering

4. **N-Body Gravity**
   - Orbital mechanics
   - Trail rendering
   - Multi-body interactions

5. **Reaction-Diffusion**
   - Chemical patterns
   - Organic growth simulation
   - Turing patterns

6. **Custom Particle Systems**
   - Attractor-based movement
   - Life & decay systems
   - Dynamic coloring

### 🛡️ Why Unreplicable:

- ✅ Custom integrators (bukan library)
- ✅ Proprietary algorithms
- ✅ Unique parameter combinations
- ✅ Real-time interactions
- ✅ Infinite simulation states

### ⚙️ Custom Parameters:

Setiap engine punya parameters unik:
- Gravity: 0.1 - 2.0
- Friction: 0.90 - 0.999
- Stiffness: 0.01 - 1.0
- Damping: 0.90 - 0.999
- Pressure multiplier: custom
- Viscosity: custom

**Kombinasi = Infinite & Unique**

Mau simulation yang mana?
```

---

## Why This is AI-Resistant:

```
1. From Scratch Implementation:
   - Bukan library standar
   - Custom algorithms
   - Proprietary math

2. Parameter Sensitivity:
   - Small changes = huge differences
   - Cannot predict output
   - Chaos theory embedded

3. Real-time Computation:
   - Not pre-rendered
   - Interactive elements
   - User input affects simulation

4. Complexity:
   - N-body: O(n²) calculations
   - Fluid: Spatial hashing
   - Reaction-diffusion: PDE solving

5. Emergent Behavior:
   - Simple rules → complex patterns
   - Cannot reverse-engineer
   - Unique every run
```

---

## Inspiration:

- Nature of Code (Daniel Shiffman)
- Fluid Simulation for Computer Graphics
- Processing.org examples
- ShaderToy physics demos
- Custom game physics engines
