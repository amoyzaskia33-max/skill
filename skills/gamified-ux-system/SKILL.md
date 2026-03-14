# 🎪 Gamified UX System

## Purpose

Skill ini menambahkan **game elements ke dalam UI** untuk meningkatkan engagement user melalui XP, achievements, leaderboards, dan reward systems.

## Core Philosophy

```
"Make every interaction rewarding"
- Progress tracking yang meaningful
- Achievements yang motivate
- Rewards yang valuable
- Competition yang healthy
```

---

## 1. **XP & Leveling System** 📈

### A. Basic XP Tracker

```tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const XPTracker = () => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const xpToNextLevel = level * 1000;
  
  const addXP = (amount) => {
    const newXp = xp + amount;
    setXp(newXp);
    
    // Level up check
    if (newXp >= xpToNextLevel) {
      setLevel(prev => prev + 1);
      setXp(newXp - xpToNextLevel);
      showLevelUpNotification();
    }
  };
  
  const showLevelUpNotification = () => {
    // Show celebration animation
    console.log('🎉 Level Up!');
  };
  
  return (
    <div className="xp-tracker bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-4 text-white">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Level {level}</span>
        <span className="text-xs opacity-80">{xp} / {xpToNextLevel} XP</span>
      </div>
      
      <div className="w-full bg-white/20 rounded-full h-3">
        <motion.div
          className="bg-white h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(xp / xpToNextLevel) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* Test buttons (remove in production) */}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => addXP(100)}
          className="px-3 py-1 bg-white/20 rounded text-xs hover:bg-white/30"
        >
          +100 XP
        </button>
        <button
          onClick={() => addXP(500)}
          className="px-3 py-1 bg-white/20 rounded text-xs hover:bg-white/30"
        >
          +500 XP
        </button>
      </div>
    </div>
  );
};
```

---

### B. XP Event System

```tsx
export const useXPSystem = () => {
  const xpEvents = {
    login: 50,
    completeProfile: 200,
    firstPurchase: 500,
    referFriend: 300,
    dailyStreak: 100,
    weeklyChallenge: 1000,
    contentCreation: 150,
    helpfulAction: 75,
  };
  
  const triggerXPEvent = async (eventType, userId) => {
    const xpAmount = xpEvents[eventType];
    
    if (!xpAmount) {
      console.warn(`Unknown XP event: ${eventType}`);
      return;
    }
    
    // Send to backend
    await fetch('/api/xp/add', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        eventType,
        xp: xpAmount,
        timestamp: new Date().toISOString(),
      }),
    });
    
    // Show notification
    showXPNotification(eventType, xpAmount);
  };
  
  const showXPNotification = (eventType, amount) => {
    const messages = {
      login: 'Daily login bonus!',
      completeProfile: 'Profile completed!',
      firstPurchase: 'First purchase!',
      referFriend: 'Friend referred!',
      dailyStreak: 'Daily streak!',
      weeklyChallenge: 'Weekly challenge completed!',
      contentCreation: 'Content created!',
      helpfulAction: 'Helpful action!',
    };
    
    console.log(`+${amount} XP - ${messages[eventType]}`);
  };
  
  return { triggerXPEvent };
};
```

---

## 2. **Achievement Badges** 🏆

### A. Badge Collection

```tsx
export const BadgeCollection = () => {
  const badges = [
    {
      id: 'early-adopter',
      name: 'Early Adopter',
      description: 'Signed up in the first week',
      icon: '🚀',
      rarity: 'legendary',
      unlocked: true,
      unlockedAt: '2024-01-15',
    },
    {
      id: 'goal-getter',
      name: 'Goal Getter',
      description: 'Complete 10 tasks',
      icon: '🎯',
      rarity: 'rare',
      unlocked: true,
      unlockedAt: '2024-01-20',
    },
    {
      id: 'big-spender',
      name: 'Big Spender',
      description: 'Reach $1000 total purchase',
      icon: '💰',
      rarity: 'epic',
      unlocked: false,
      progress: 650 / 1000,
    },
    {
      id: 'knowledge-seeker',
      name: 'Knowledge Seeker',
      description: 'Read 50 articles',
      icon: '📚',
      rarity: 'uncommon',
      unlocked: false,
      progress: 32 / 50,
    },
    {
      id: 'social-butterfly',
      name: 'Social Butterfly',
      description: 'Refer 10 friends',
      icon: '🦋',
      rarity: 'rare',
      unlocked: false,
      progress: 3 / 10,
    },
  ];
  
  const rarityColors = {
    common: 'bg-gray-400',
    uncommon: 'bg-green-400',
    rare: 'bg-blue-400',
    epic: 'bg-purple-400',
    legendary: 'bg-yellow-400',
  };
  
  return (
    <div className="badge-collection p-4">
      <h3 className="font-bold text-lg mb-4">Achievement Badges</h3>
      
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {badges.map(badge => (
          <div
            key={badge.id}
            className={`
              relative p-3 rounded-lg text-center
              ${badge.unlocked ? 'cursor-pointer hover:scale-105' : 'opacity-50'}
              transition-transform
            `}
          >
            {/* Badge icon */}
            <div className={`
              w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl
              ${rarityColors[badge.rarity]}
              ${badge.unlocked ? '' : 'grayscale'}
            `}>
              {badge.icon}
            </div>
            
            {/* Badge name */}
            <div className="text-xs font-medium mt-2 truncate">
              {badge.name}
            </div>
            
            {/* Progress for locked badges */}
            {!badge.unlocked && badge.progress && (
              <div className="mt-1">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-blue-600 h-1 rounded-full"
                    style={{ width: `${badge.progress * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {Math.round(badge.progress * 100)}%
                </div>
              </div>
            )}
            
            {/* Tooltip on hover */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-black text-white text-xs rounded-lg p-2 z-50">
                <div className="font-bold">{badge.name}</div>
                <div className="text-gray-300">{badge.description}</div>
                <div className="text-gray-400 capitalize mt-1">{badge.rarity}</div>
                {badge.unlockedAt && (
                  <div className="text-gray-500 text-xs mt-1">
                    Unlocked: {new Date(badge.unlockedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

### B. Achievement Unlock Animation

```tsx
export const AchievementUnlock = ({ achievement, onClose }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center space-x-4">
          {/* Badge icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-5xl"
          >
            {achievement.icon}
          </motion.div>
          
          {/* Achievement info */}
          <div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white font-bold text-lg"
            >
              Achievement Unlocked!
            </motion.div>
            
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/90 font-medium"
            >
              {achievement.name}
            </motion.div>
            
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/70 text-sm mt-1"
            >
              {achievement.description}
            </motion.p>
          </div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        {/* Confetti effect */}
        <ConfettiEffect />
      </div>
    </motion.div>
  );
};

const ConfettiEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: ['#FFD700', '#FF69B4', '#00BFFF', '#32CD32'][i % 4],
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: 200,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 1 + Math.random(),
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
};
```

---

## 3. **Progress Tracking** 📊

### A. Daily Streak Tracker

```tsx
export const StreakTracker = () => {
  const [streak, setStreak] = useState(7);
  const [longestStreak, setLongestStreak] = useState(14);
  const [todayCompleted, setTodayCompleted] = useState(false);
  
  return (
    <div className="streak-tracker bg-white rounded-xl shadow-lg p-4">
      <h3 className="font-bold text-lg mb-4 flex items-center">
        <span className="text-2xl mr-2">🔥</span>
        Daily Streak
      </h3>
      
      {/* Current streak */}
      <div className="text-center mb-4">
        <div className="text-5xl font-bold text-orange-500 mb-2">
          {streak}
        </div>
        <div className="text-sm text-gray-600">
          Day streak
        </div>
      </div>
      
      {/* Week view */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
          <div
            key={i}
            className={`
              aspect-square rounded-full flex items-center justify-center text-xs font-medium
              ${i < streak % 7 
                ? 'bg-green-500 text-white' 
                : i === streak % 7 && !todayCompleted
                  ? 'bg-orange-500 text-white animate-pulse'
                  : 'bg-gray-200 text-gray-400'
              }
            `}
          >
            {i < streak % 7 ? '✓' : day}
          </div>
        ))}
      </div>
      
      {/* Stats */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Longest: {longestStreak} days</span>
        <span>{todayCompleted ? 'Completed today ✓' : 'Complete an action!'}</span>
      </div>
    </div>
  );
};
```

---

### B. Goal Progress Cards

```tsx
export const GoalCards = () => {
  const goals = [
    {
      id: 1,
      title: 'Complete Profile',
      progress: 1,
      total: 1,
      reward: '100 XP',
      completed: true,
    },
    {
      id: 2,
      title: 'Weekly Challenge',
      progress: 3,
      total: 7,
      reward: '1000 XP',
      completed: false,
    },
    {
      id: 3,
      title: 'Read Articles',
      progress: 32,
      total: 50,
      reward: 'Badge: Knowledge Seeker',
      completed: false,
    },
  ];
  
  return (
    <div className="space-y-4">
      {goals.map(goal => (
        <div
          key={goal.id}
          className={`
            p-4 rounded-xl border-2
            ${goal.completed 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 bg-white'
            }
          `}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold">{goal.title}</h4>
            {goal.completed && (
              <span className="text-green-600 text-xl">✓</span>
            )}
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className={`h-3 rounded-full transition-all ${
                goal.completed ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${(goal.progress / goal.total) * 100}%` }}
            />
          </div>
          
          {/* Progress text */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {goal.progress} / {goal.total}
            </span>
            <span className="text-blue-600 font-medium">
              Reward: {goal.reward}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
```

---

## 4. **Leaderboards** 🏅

### A. Real-Time Leaderboard

```tsx
export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'Alex', xp: 15000, avatar: '🦁' },
    { rank: 2, name: 'Jordan', xp: 14200, avatar: '🐯' },
    { rank: 3, name: 'Sam', xp: 13800, avatar: '🐻' },
    { rank: 4, name: 'You', xp: 12500, avatar: '🦊', isUser: true },
    { rank: 5, name: 'Taylor', xp: 11900, avatar: '🐼' },
  ]);
  
  const getRankStyle = (rank) => {
    if (rank === 1) return 'bg-yellow-400 text-yellow-900';
    if (rank === 2) return 'bg-gray-300 text-gray-700';
    if (rank === 3) return 'bg-orange-400 text-orange-900';
    return 'bg-gray-100 text-gray-600';
  };
  
  return (
    <div className="leaderboard bg-white rounded-xl shadow-lg p-4">
      <h3 className="font-bold text-lg mb-4 flex items-center">
        <span className="text-2xl mr-2">🏆</span>
        Leaderboard
      </h3>
      
      <div className="space-y-2">
        {leaderboard.map(user => (
          <div
            key={user.rank}
            className={`
              flex items-center p-3 rounded-lg
              ${user.isUser ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50'}
            `}
          >
            {/* Rank */}
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
              ${getRankStyle(user.rank)}
            `}>
              {user.rank}
            </div>
            
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl mx-3">
              {user.avatar}
            </div>
            
            {/* Name & XP */}
            <div className="flex-1">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500">{user.xp.toLocaleString()} XP</div>
            </div>
            
            {/* Trend indicator */}
            {user.rank <= 3 && (
              <span className="text-green-500">↑</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 5. **Reward System** 🎁

### A. Reward Store

```tsx
export const RewardStore = () => {
  const [balance, setBalance] = useState(5000);
  
  const rewards = [
    {
      id: 1,
      name: 'Premium Trial (7 days)',
      cost: 1000,
      icon: '⭐',
      available: true,
    },
    {
      id: 2,
      name: 'Custom Avatar Frame',
      cost: 500,
      icon: '🖼️',
      available: true,
    },
    {
      id: 3,
      name: 'Exclusive Badge',
      cost: 2000,
      icon: '🏅',
      available: true,
    },
    {
      id: 4,
      name: '20% Discount Coupon',
      cost: 3000,
      icon: '🎫',
      available: true,
    },
    {
      id: 5,
      name: 'VIP Status (30 days)',
      cost: 5000,
      icon: '👑',
      available: false,
    },
  ];
  
  const purchaseReward = (reward) => {
    if (balance >= reward.cost) {
      setBalance(prev => prev - reward.cost);
      console.log(`Purchased: ${reward.name}`);
    } else {
      console.log('Not enough points!');
    }
  };
  
  return (
    <div className="reward-store p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Reward Store</h3>
        <div className="bg-purple-100 px-4 py-2 rounded-full">
          <span className="text-purple-600 font-bold">
            {balance.toLocaleString()} Points
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map(reward => (
          <div
            key={reward.id}
            className={`
              p-4 rounded-xl border-2
              ${reward.available 
                ? 'border-purple-200 bg-white hover:border-purple-400' 
                : 'border-gray-200 bg-gray-50 opacity-50'
              }
              transition-colors
            `}
          >
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{reward.icon}</div>
              
              <div className="flex-1">
                <h4 className="font-bold">{reward.name}</h4>
                <div className="text-purple-600 font-bold mt-1">
                  {reward.cost.toLocaleString()} Points
                </div>
              </div>
              
              <button
                onClick={() => purchaseReward(reward)}
                disabled={!reward.available || balance < reward.cost}
                className={`
                  px-4 py-2 rounded-lg font-medium
                  ${reward.available && balance >= reward.cost
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {reward.available ? 'Claim' : 'Locked'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## Response Template

```markdown
🎪 **Gamified UX System - Activated!**

Saya sudah siapkan gamification elements:

### 🎯 Features:

1. **XP & Leveling**
   - Experience points tracking
   - Level progression
   - XP event system

2. **Achievement Badges**
   - Rarity system (common → legendary)
   - Unlock animations
   - Progress tracking

3. **Progress Tracking**
   - Daily streaks
   - Goal cards
   - Weekly challenges

4. **Leaderboards**
   - Real-time rankings
   - Friend comparisons
   - Trend indicators

5. **Reward System**
   - Point-based store
   - Exclusive rewards
   - Redeemable perks

### 🛡️ Why Gamified:

- ✅ Dopamine-driven loops
- ✅ Healthy competition
- ✅ Meaningful progress
- ✅ User retention
- ✅ Engagement boost

### 🎯 Use Cases:

- E-learning platforms
- Fitness apps
- Productivity tools
- E-commerce loyalty
- Social media

Mau implement yang mana?
```

---

**Last Updated:** Maret 2026
**Philosophy:** Ethical Gamification, Not Addiction
