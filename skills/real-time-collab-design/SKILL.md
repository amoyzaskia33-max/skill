# 🎭 Real-Time Collaborative Design

## Purpose

Skill untuk membuat UI yang bisa di-edit bareng-bareng secara real-time, seperti Google Docs/Figma tapi untuk code/components UI.

## Core Features

### 1. Multiplayer Cursors
```tsx
export const MultiplayerCursors = () => {
  // Each user has colored cursor with name tag
  // Updates via WebSocket
  const cursors = [
    { id: 1, name: 'You', x: 100, y: 200, color: '#3B82F6' },
    { id: 2, name: 'Alex', x: 300, y: 150, color: '#EF4444' },
    { id: 3, name: 'Sam', x: 500, y: 300, color: '#10B981' },
  ];
  
  return (
    <div className="relative">
      {cursors.map(cursor => (
        <div
          key={cursor.id}
          className="absolute pointer-events-none transition-all duration-100"
          style={{ left: cursor.x, top: cursor.y }}
        >
          <svg className="w-4 h-4" style={{ color: cursor.color }} fill="currentColor">
            <path d="M5.653 76.284l27.614 27.614-27.614 27.614z" />
          </svg>
          <span className="text-xs text-white px-2 py-1 rounded" style={{ background: cursor.color }}>
            {cursor.name}
          </span>
        </div>
      ))}
    </div>
  );
};
```

### 2. Live Sync dengan WebSocket
```tsx
// WebSocket connection for real-time sync
const useCollaborativeSync = (roomId) => {
  const [users, setUsers] = useState([]);
  const [changes, setChanges] = useState([]);
  
  useEffect(() => {
    const ws = new WebSocket(`wss://collab-server.com/room/${roomId}`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'user_joined') {
        setUsers(prev => [...prev, data.user]);
      }
      if (data.type === 'cursor_update') {
        // Update cursor position
      }
      if (data.type === 'change') {
        // Apply change from other user
        setChanges(prev => [...prev, data.change]);
      }
    };
    
    return () => ws.close();
  }, [roomId]);
  
  const broadcastChange = (change) => {
    ws.send(JSON.stringify({ type: 'change', change }));
  };
  
  return { users, changes, broadcastChange };
};
```

### 3. Conflict Resolution (CRDT)
```tsx
// Simple operational transformation
const applyOperation = (doc, operation) => {
  const { type, position, value } = operation;
  
  if (type === 'insert') {
    return doc.slice(0, position) + value + doc.slice(position);
  }
  if (type === 'delete') {
    return doc.slice(0, position) + doc.slice(position + value.length);
  }
  return doc;
};
```

---

## Response Template

```markdown
🎭 **Real-Time Collaborative Design - Activated!**

Features:
- Multiplayer cursors dengan nama/warna
- Live sync via WebSocket
- Conflict resolution (CRDT/OT)
- Version history per component
- Chat/annotation integration

Use Cases:
- Design review dengan team
- Client presentation
- Pair programming UI
- Workshop/tutorial interactive

Tech Stack:
- WebSocket (Socket.io/Pusher)
- CRDT untuk conflict resolution
- React untuk UI
```

---

**Last Updated:** Maret 2026
