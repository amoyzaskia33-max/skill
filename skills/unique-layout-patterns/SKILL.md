---
name: unique-layout-patterns
description: Kumpulan layout patterns yang unik, experimental, dan jarang dipakai - untuk design yang benar-benar berbeda dari yang lain
---

# 🎨 Unique Layout Patterns

## Purpose

Skill ini menyediakan **layout patterns yang unconventional** dan **experimental** yang jarang ditemukan di website mainstream. Untuk membuat design yang **benar-benar berbeda** dan **memorable**.

## Layout Categories

### 1. **Asymmetric Grid Layouts** ⚡

#### A. Broken Grid (Intentional Misalignment)

```tsx
export const BrokenGrid = () => {
  return (
    <div className="relative">
      {/* Main grid dengan intentional breaks */}
      <div className="grid grid-cols-12 gap-8">
        {/* Item yang span tidak biasa */}
        <div className="col-span-12 md:col-span-8 md:col-start-2">
          <Hero />
        </div>
        
        {/* Item yang overlap */}
        <div className="col-span-6 md:col-span-4 md:-mt-20 md:ml-auto">
          <OverlapCard />
        </div>
        
        {/* Item yang rotate */}
        <div className="col-span-4 md:col-span-3 md:rotate-6">
          <RotatedElement />
        </div>
        
        {/* Full width break */}
        <div className="col-span-12">
          <FullBleedImage />
        </div>
        
        {/* Offset columns */}
        <div className="col-span-6 md:col-span-5 md:col-start-3">
          <OffsetContent />
        </div>
        <div className="col-span-6 md:col-span-4 md:col-start-9">
          <OffsetSidebar />
        </div>
      </div>
      
      {/* Decorative elements outside grid */}
      <div className="absolute -left-20 top-40 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20" />
      <div className="absolute -right-20 bottom-40 w-60 h-60 bg-pink-500 rounded-full blur-3xl opacity-20" />
    </div>
  );
};
```

---

#### B. Modular Grid (Swiss Design)

```tsx
export const SwissModularGrid = () => {
  // Based on 8px grid system
  const modules = [
    { col: 4, row: 2, content: <LargeHero /> },
    { col: 2, row: 1, content: <SmallCard /> },
    { col: 2, row: 1, content: <SmallCard /> },
    { col: 3, row: 2, content: <TallCard /> },
    { col: 3, row: 1, content: <WideCard /> },
    { col: 2, row: 1, content: <SquareCard /> },
  ];
  
  return (
    <div className="grid grid-cols-12 auto-rows-[200px] gap-4 p-8">
      {modules.map((module, i) => (
        <div
          key={i}
          className={`
            col-span-${module.col} 
            row-span-${module.row}
            bg-gradient-to-br from-gray-50 to-gray-100
            rounded-lg
            overflow-hidden
            hover:shadow-xl
            transition-shadow
            duration-300
          `}
        >
          {module.content}
        </div>
      ))}
    </div>
  );
};
```

---

#### C. Diagonal Layout (Dynamic Angles)

```tsx
export const DiagonalLayout = () => {
  return (
    <div className="relative">
      {/* Diagonal divider */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600" />
      </div>
      
      {/* Content following diagonal */}
      <div className="relative z-10">
        <div 
          className="py-32"
          style={{
            transform: 'skewY(-3deg)',
            marginBottom: '-100px'
          }}
        >
          <div style={{ transform: 'skewY(3deg)' }}>
            <h1 className="text-6xl font-bold text-white">
              Diagonal Design
            </h1>
          </div>
        </div>
      </div>
      
      {/* Next section */}
      <div className="relative z-10 bg-white pt-40">
        <div className="grid grid-cols-2 gap-8">
          {/* Items arranged diagonally */}
          <div className="space-y-8">
            <Card />
            <Card />
          </div>
          <div className="space-y-8 pt-20">
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

### 2. **Non-Linear Navigation** 🧭

#### A. Circular Navigation

```tsx
export const CircularNav = () => {
  const items = ['Home', 'About', 'Work', 'Blog', 'Contact'];
  const radius = 200;
  
  return (
    <div className="relative w-[500px] h-[500px]">
      {/* Center logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">LOGO</span>
        </div>
      </div>
      
      {/* Circular menu items */}
      {items.map((item, i) => {
        const angle = (i / items.length) * 360;
        const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
        const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
        
        return (
          <motion.button
            key={item}
            className="absolute w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            style={{
              left: `calc(50% + ${x}px - 40px)`,
              top: `calc(50% + ${y}px - 40px)`,
            }}
            whileHover={{ rotate: angle }}
          >
            {item}
          </motion.button>
        );
      })}
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {items.map((_, i) => {
          const angle = (i / items.length) * 360;
          const x1 = Math.cos((angle - 90) * Math.PI / 180) * (radius - 60);
          const y1 = Math.sin((angle - 90) * Math.PI / 180) * (radius - 60);
          
          return (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x1}px)`}
              y2={`calc(50% + ${y1}px)`}
              stroke="rgba(99, 102, 241, 0.2)"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    </div>
  );
};
```

---

#### B. Horizontal Scroll (Story-like)

```tsx
export const HorizontalScroll = () => {
  const sections = [
    { bg: 'from-purple-600 to-pink-600', title: 'Section 1' },
    { bg: 'from-blue-600 to-cyan-600', title: 'Section 2' },
    { bg: 'from-green-600 to-emerald-600', title: 'Section 3' },
    { bg: 'from-orange-600 to-red-600', title: 'Section 4' },
  ];
  
  return (
    <div className="overflow-x-auto snap-x snap-mandatory h-screen">
      <div className="flex h-full">
        {sections.map((section, i) => (
          <div
            key={i}
            className={`snap-center shrink-0 w-screen h-screen bg-gradient-to-br ${section.bg} flex items-center justify-center`}
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-8xl font-bold text-white"
            >
              {section.title}
            </motion.h1>
          </div>
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex space-x-4">
        {sections.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/50 scroll-progress-indicator"
            data-index={i}
          />
        ))}
      </div>
    </div>
  );
};
```

---

#### C. Spatial Navigation (2D Grid)

```tsx
export const SpatialNav = () => {
  const [activeSection, setActiveSection] = useState({ x: 0, y: 0 });
  
  // Navigate with arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp') setActiveSection(s => ({ ...s, y: Math.max(0, s.y - 1) }));
      if (e.key === 'ArrowDown') setActiveSection(s => ({ ...s, y: Math.min(3, s.y + 1) }));
      if (e.key === 'ArrowLeft') setActiveSection(s => ({ ...s, x: Math.max(0, s.x - 1) }));
      if (e.key === 'ArrowRight') setActiveSection(s => ({ ...s, x: Math.min(3, s.x + 1) }));
    };
    
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);
  
  return (
    <div className="grid grid-cols-4 grid-rows-4 h-screen">
      {Array.from({ length: 16 }).map((_, i) => {
        const x = i % 4;
        const y = Math.floor(i / 4);
        const isActive = activeSection.x === x && activeSection.y === y;
        
        return (
          <motion.div
            key={i}
            animate={{
              scale: isActive ? 1 : 0.95,
              opacity: isActive ? 1 : 0.7,
              zIndex: isActive ? 10 : 1,
            }}
            className={`
              border border-gray-200
              ${isActive ? 'bg-white shadow-2xl' : 'bg-gray-50'}
              transition-all duration-300
            `}
          >
            <div className="p-8">
              <h3 className="text-xl font-bold">Section {x},{y}</h3>
              {isActive && <p className="mt-4 text-gray-600">Content here...</p>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
```

---

### 3. **Content Reveals Unusual** 🎭

#### A. Curtain Reveal

```tsx
export const CurtainReveal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Left curtain */}
      <motion.div
        animate={{ x: isOpen ? '-100%' : '0%' }}
        transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-purple-900 to-purple-700 z-20"
      >
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 text-9xl font-bold writing-vertical">
          LEFT
        </div>
      </motion.div>
      
      {/* Right curtain */}
      <motion.div
        animate={{ x: isOpen ? '100%' : '0%' }}
        transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.1 }}
        className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-pink-900 to-pink-700 z-20"
      >
        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 text-9xl font-bold writing-vertical">
          RIGHT
        </div>
      </motion.div>
      
      {/* Content behind */}
      <div className="h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <motion.div
          animate={{ opacity: isOpen ? 1 : 0.5 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h1 className="text-8xl font-bold text-white">Revealed!</h1>
        </motion.div>
      </div>
      
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-30 px-8 py-4 bg-white text-gray-900 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  );
};
```

---

#### B. Puzzle Reveal

```tsx
export const PuzzleReveal = () => {
  const [revealed, setRevealed] = useState(Array(9).fill(false));
  
  const revealPiece = (i) => {
    const newRevealed = [...revealed];
    newRevealed[i] = true;
    setRevealed(newRevealed);
  };
  
  return (
    <div className="grid grid-cols-3 gap-1">
      {revealed.map((isRevealed, i) => (
        <motion.div
          key={i}
          onClick={() => revealPiece(i)}
          className="aspect-square cursor-pointer overflow-hidden"
          initial={false}
          animate={{
            opacity: isRevealed ? 0 : 1,
            scale: isRevealed ? 0.9 : 1,
          }}
        >
          {!isRevealed ? (
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">?</span>
            </div>
          ) : (
            <div className="w-full h-full bg-white" />
          )}
        </motion.div>
      ))}
    </div>
  );
};
```

---

#### C. Layered Parallax Reveal

```tsx
export const LayeredReveal = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.5, 0.8, 1], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.7, 1], [0, 1, 1]);
  
  return (
    <div ref={ref} className="h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layer 1 - Background */}
        <motion.div style={{ y: y1, opacity: opacity1 }} className="absolute inset-0">
          <div className="h-screen bg-gradient-to-b from-purple-900 to-indigo-900 flex items-center justify-center">
            <h2 className="text-6xl font-bold text-white">Layer 1</h2>
          </div>
        </motion.div>
        
        {/* Layer 2 - Mid */}
        <motion.div style={{ y: y2, opacity: opacity2 }} className="absolute inset-0">
          <div className="h-screen bg-gradient-to-b from-indigo-800 to-blue-800 flex items-center justify-center">
            <h2 className="text-6xl font-bold text-white">Layer 2</h2>
          </div>
        </motion.div>
        
        {/* Layer 3 - Foreground */}
        <motion.div style={{ y: y3, opacity: opacity3 }} className="absolute inset-0">
          <div className="h-screen bg-gradient-to-b from-blue-700 to-cyan-700 flex items-center justify-center">
            <h2 className="text-6xl font-bold text-white">Layer 3</h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
```

---

### 4. **Card Layouts Experimental** 🃏

#### A. Stack Cards (Tinder-style)

```tsx
export const StackCards = () => {
  const [cards, setCards] = useState([1, 2, 3, 4, 5]);
  
  const swipe = (direction) => {
    setCards(prev => prev.slice(1));
  };
  
  return (
    <div className="relative w-96 h-[500px]">
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1 - index * 0.05, 
              opacity: 1,
              y: index * 10,
              rotate: index === 0 ? 0 : (index % 2 === 0 ? 5 : -5)
            }}
            exit={{ 
              x: direction === 'right' ? 500 : -500,
              opacity: 0,
              rotate: direction === 'right' ? 30 : -30
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x > 100) swipe('right');
              else if (offset.x < -100) swipe('left');
            }}
            className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <div className="h-3/5 bg-gradient-to-br from-purple-400 to-pink-400" />
            <div className="p-6">
              <h3 className="text-2xl font-bold">Card {card}</h3>
              <p className="mt-2 text-gray-600">Drag to swipe</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {cards.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <button
            onClick={() => setCards([1, 2, 3, 4, 5])}
            className="px-8 py-4 bg-purple-600 text-white rounded-full font-bold"
          >
            Reset Cards
          </button>
        </div>
      )}
    </div>
  );
};
```

---

#### B. Masonry dengan Hover Expand

```tsx
export const ExpandableMasonry = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const items = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    height: i % 3 === 0 ? 'h-64' : i % 3 === 1 ? 'h-48' : 'h-80',
  }));
  
  return (
    <div className="columns-2 md:columns-4 gap-4 space-y-4">
      {items.map((item) => (
        <motion.div
          key={item.id}
          layout
          onClick={() => setExpanded(expanded === item.id ? null : item.id)}
          className={`
            ${item.height}
            ${expanded === item.id ? 'fixed inset-0 z-50 h-screen w-screen m-0' : ''}
            bg-gradient-to-br from-purple-400 to-pink-400
            rounded-xl
            cursor-pointer
            overflow-hidden
          `}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold text-white">Item {item.id}</h3>
            {expanded === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-white"
              >
                <p>Expanded content...</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
```

---

#### C. 3D Card Stack (Perspective)

```tsx
export const ThreeDCardStack = () => {
  const [flipped, setFlipped] = useState(false);
  
  return (
    <div 
      className="w-80 h-96 perspective-1000 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="relative w-full h-full preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 flex items-center justify-center">
          <h3 className="text-3xl font-bold text-white">Front Side</h3>
        </div>
        
        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 flex items-center justify-center"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-3xl font-bold text-white">Back Side</h3>
        </div>
      </motion.div>
    </div>
  );
};
```

---

### 5. **Hero Sections Unconventional** 🦸

#### A. Split Screen Interactive

```tsx
export const InteractiveSplitHero = () => {
  const [split, setSplit] = useState(50);
  const containerRef = useRef(null);
  
  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSplit(Math.max(20, Math.min(80, percentage)));
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative h-screen overflow-hidden cursor-ew-resize"
      onMouseMove={handleMove}
      onTouchMove={(e) => handleMove(e.touches[0])}
    >
      {/* Left side */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900"
        style={{ clipPath: `polygon(0 0, ${split}% 0, ${split}% 100%, 0 100%)` }}
      >
        <div className="h-full flex items-center justify-center p-20">
          <h1 className="text-6xl font-bold text-white text-right">
            Left Content
            <br />
            <span className="text-2xl text-white/60">Drag divider</span>
          </h1>
        </div>
      </div>
      
      {/* Right side */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-pink-900 to-rose-900"
        style={{ clipPath: `polygon(${split}% 0, 100% 0, 100% 100%, ${split}% 100%)` }}
      >
        <div className="h-full flex items-center justify-center p-20">
          <h1 className="text-6xl font-bold text-white text-left">
            Right Content
          </h1>
        </div>
      </div>
      
      {/* Divider */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${split}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
};
```

---

#### B. Fullscreen Video dengan Overlay Content

```tsx
export const VideoHeroOverlay = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl font-bold text-white mb-8"
          >
            Cinematic Hero
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl text-white/80 mb-12"
          >
            With fullscreen video background
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="px-12 py-6 bg-white text-gray-900 rounded-full font-bold text-lg hover:scale-105 transition-transform">
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </div>
  );
};
```

---

## Layout Principles

```
1. Break the Grid (Intentionally):
   - Use asymmetric spans
   - Overlap elements
   - Rotate some items
   - Add decorative outside elements

2. Think in Layers:
   - Background layer
   - Mid-ground layer
   - Foreground layer
   - Overlay layer
   - Each moves at different speed

3. Unusual Navigation:
   - Circular menus
   - Horizontal scroll
   - Spatial (2D grid)
   - Gesture-based

4. Content Reveals:
   - Curtain effects
   - Puzzle pieces
   - Progressive disclosure
   - Mask animations

5. Interactive Elements:
   - Draggable dividers
   - Swipeable cards
   - Expandable items
   - Flip animations
```

---

## Response Template

```markdown
🎨 **Unique Layout Patterns Ready!**

Saya sudah siapkan layouts yang unconventional:

### 📐 Layout Categories:

1. **Asymmetric Grids**
   - Broken grid (intentional misalignment)
   - Swiss modular grid
   - Diagonal layouts

2. **Non-Linear Navigation**
   - Circular menu
   - Horizontal scroll (story-like)
   - Spatial 2D navigation

3. **Content Reveals**
   - Curtain effect
   - Puzzle pieces
   - Layered parallax

4. **Experimental Cards**
   - Stack swipe (Tinder-style)
   - Expandable masonry
   - 3D flip stack

5. **Unconventional Heroes**
   - Interactive split screen
   - Fullscreen video overlay
   - Immersive experiences

### 🚀 Features:
- Fully responsive
- Touch-friendly
- Accessible (keyboard nav)
- Performance optimized
- Browser compatible

Mau implement yang mana?
```

---

## Inspiration Sources

- Awwwards (experimental category)
- Behance (UI experiments)
- Dribbble (conceptual designs)
- Pinterest (layout inspiration)
- Museum websites
- Art gallery sites
- Fashion brand sites
- Creative agency portfolios
