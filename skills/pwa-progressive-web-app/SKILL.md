# 📱 Progressive Web App (PWA)

## Purpose

Membuat web application yang bisa di-install seperti native app, bekerja offline, dan memberikan app-like experience.

## Level: ⭐⭐⭐ Expert

---

## 1. **Service Worker Advanced** 🔧

### A. Custom Service Worker dengan Strategies

```typescript
// Expert pattern: Advanced service worker with multiple strategies
const CACHE_NAME = 'app-cache-v3';
const OFFLINE_URL = '/offline.html';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/static/css/main.css',
  '/static/js/main.js',
  '/static/fonts/main.woff2',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting(); // Activate immediately
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim(); // Take control immediately
});

// Fetch event - apply different strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http(s)
  if (!url.protocol.startsWith('http')) return;
  
  // Apply strategies based on request type
  if (url.pathname.startsWith('/api/')) {
    // Network First for API calls
    event.respondWith(networkFirst(request));
  } else if (request.destination === 'image') {
    // Cache First for images
    event.respondWith(cacheFirst(request, 'images'));
  } else if (request.destination === 'font') {
    // Cache First for fonts
    event.respondWith(cacheFirst(request, 'fonts'));
  } else if (request.destination === 'script' || request.destination === 'style') {
    // Stale While Revalidate for JS/CSS
    event.respondWith(staleWhileRevalidate(request));
  } else {
    // Network First for HTML pages
    event.respondWith(networkFirst(request));
  }
});

// Cache First strategy
async function cacheFirst(request: Request, cacheName = '') {
  const cache = await caches.open(`${CACHE_NAME}-${cacheName}`);
  const cached = await cache.match(request);
  
  if (cached) {
    console.log('Cache hit:', request.url);
    return cached;
  }
  
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    return caches.match(OFFLINE_URL);
  }
}

// Network First strategy
async function networkFirst(request: Request) {
  try {
    // Try network first
    const response = await fetch(request, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    // Cache successful responses
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Network failed, try cache
    console.log('Network failed, trying cache:', request.url);
    const cached = await caches.match(request);
    
    if (cached) {
      return cached;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_URL);
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Stale While Revalidate strategy
async function staleWhileRevalidate(request: Request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  const networkFetch = fetch(request).then(async (response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);
  
  // Return cached immediately, update in background
  return cached || networkFetch;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Get pending actions from IndexedDB
  // Retry failed requests
  console.log('Background sync completed');
}

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'New Notification', {
      body: data.body || 'You have a new update',
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      data: data.url || '/',
      actions: [
        { action: 'open', title: 'Open' },
        { action: 'dismiss', title: 'Dismiss' },
      ],
    })
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  }
});
```

---

### B. Register Service Worker dengan Updates

```tsx
// Expert pattern: Service worker registration with update detection
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });
      
      console.log('Service Worker registered:', registration.scope);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        if (!newWorker) return;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available, prompt user to refresh
            showUpdatePrompt();
          }
        });
      });
      
      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service Worker activated, reloading page');
        // Optional: Auto-reload
        // window.location.reload();
      });
      
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

// Show update prompt
const showUpdatePrompt = () => {
  const event = new CustomEvent('sw-update-available');
  window.dispatchEvent(event);
  
  // Or show UI
  if (confirm('New version available! Refresh to update?')) {
    window.location.reload();
  }
};

// Usage in React
export const useServiceWorker = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  
  useEffect(() => {
    registerServiceWorker().then(setRegistration);
    
    const handleUpdate = () => setUpdateAvailable(true);
    window.addEventListener('sw-update-available', handleUpdate);
    
    return () => {
      window.removeEventListener('sw-update-available', handleUpdate);
    };
  }, []);
  
  const updateServiceWorker = async () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };
  
  return { updateAvailable, registration, updateServiceWorker };
};

// Usage
function App() {
  const { updateAvailable, updateServiceWorker } = useServiceWorker();
  
  return (
    <>
      {updateAvailable && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
          <p>New version available!</p>
          <button
            onClick={updateServiceWorker}
            className="mt-2 px-4 py-2 bg-white text-blue-600 rounded"
          >
            Refresh
          </button>
        </div>
      )}
      {/* Rest of app */}
    </>
  );
}
```

---

## 2. **Offline Support** 📴

### A. Offline Detection & Queue

```tsx
// Expert pattern: Queue actions for offline sync
export const useOfflineQueue = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState<any[]>([]);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Sync pending actions
      syncPendingActions();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Add action to queue
  const queueAction = async (action: {
    type: string;
    payload: any;
    endpoint: string;
    method: string;
  }) => {
    if (isOnline) {
      // Execute immediately
      return executeAction(action);
    } else {
      // Queue for later
      setPendingActions(prev => [...prev, { ...action, queuedAt: Date.now() }]);
      
      // Save to IndexedDB for persistence
      await saveToIndexedDB(action);
      
      return { queued: true };
    }
  };
  
  const syncPendingActions = async () => {
    const actions = await loadFromIndexedDB();
    
    for (const action of actions) {
      try {
        await executeAction(action);
        await removeFromIndexedDB(action.id);
      } catch (error) {
        console.error('Failed to sync action:', error);
      }
    }
    
    setPendingActions([]);
  };
  
  const executeAction = async (action: any) => {
    const response = await fetch(action.endpoint, {
      method: action.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.payload),
    });
    
    return response.json();
  };
  
  return { isOnline, pendingActions, queueAction };
};

// Usage
const SubmitForm = () => {
  const { isOnline, queueAction } = useOfflineQueue();
  
  const handleSubmit = async (data: any) => {
    const result = await queueAction({
      type: 'CREATE_POST',
      payload: data,
      endpoint: '/api/posts',
      method: 'POST',
    });
    
    if (result.queued) {
      alert('Saved offline, will sync when online');
    } else {
      alert('Post created successfully');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {!isOnline && (
        <div className="bg-yellow-100 text-yellow-800 p-2 mb-4">
          You're offline. Changes will sync when online.
        </div>
      )}
      {/* Form fields */}
    </form>
  );
};
```

---

### B. Offline Page

```tsx
// Expert pattern: Useful offline page
export const OfflinePage = () => {
  const [cachedPages, setCachedPages] = useState<string[]>([]);
  
  useEffect(() => {
    // Get list of cached pages
    const getCachedPages = async () => {
      const cache = await caches.open('app-cache-v3');
      const keys = await cache.keys();
      const pages = keys
        .map(r => r.url)
        .filter(url => url.includes('/'));
      setCachedPages(pages);
    };
    
    getCachedPages();
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="text-6xl mb-4">📴</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            You're Offline
          </h1>
          <p className="text-gray-600 mb-6">
            Don't worry! You can still access these pages:
          </p>
          
          {/* Cached pages */}
          <div className="space-y-2">
            {cachedPages.map((url, i) => (
              <a
                key={i}
                href={url}
                className="block p-3 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
              >
                {url}
              </a>
            ))}
          </div>
          
          {/* Retry button */}
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## 3. **Install Prompt** 📲

### A. Custom Install Prompt

```tsx
// Expert pattern: Custom install prompt UI
export const useInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  
  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }
    
    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Listen for install success
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    });
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
  
  const promptInstall = async () => {
    if (!deferredPrompt) return;
    
    // Show install prompt
    deferredPrompt.prompt();
    
    // Wait for user choice
    const { outcome } = await deferredPrompt.userChoice;
    console.log('User choice:', outcome);
    
    setDeferredPrompt(null);
    setIsInstallable(false);
  };
  
  return { isInstallable, isInstalled, promptInstall };
};

// Install Prompt UI Component
export const InstallPrompt = () => {
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(false);
  
  if (!isInstallable || isInstalled || dismissed) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">📲</div>
          <div>
            <h3 className="font-bold text-gray-800">Install App</h3>
            <p className="text-sm text-gray-600">
              Install our app for a better experience
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setDismissed(true)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Later
          </button>
          <button
            onClick={promptInstall}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

### B. Web App Manifest

```json
{
  "name": "My Awesome App",
  "short_name": "AwesomeApp",
  "description": "An awesome progressive web app",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3B82F6",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["productivity", "utilities"],
  "screenshots": [
    {
      "src": "/screenshots/home.png",
      "sizes": "1280x720",
      "type": "image/png",
      "label": "Home Screen"
    },
    {
      "src": "/screenshots/dashboard.png",
      "sizes": "1280x720",
      "type": "image/png",
      "label": "Dashboard"
    }
  ],
  "shortcuts": [
    {
      "name": "New Post",
      "short_name": "New Post",
      "description": "Create a new post",
      "url": "/posts/new",
      "icons": [{ "src": "/icons/new-post.png", "sizes": "96x96" }]
    },
    {
      "name": "Settings",
      "short_name": "Settings",
      "description": "App settings",
      "url": "/settings",
      "icons": [{ "src": "/icons/settings.png", "sizes": "96x96" }]
    }
  ],
  "share_target": {
    "action": "/share",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url"
    }
  }
}
```

---

## 4. **Push Notifications** 🔔

### A. Request Permission & Subscribe

```tsx
// Expert pattern: Push notification subscription
export const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
      
      // Get existing subscription
      getExistingSubscription();
    }
  }, []);
  
  const getExistingSubscription = async () => {
    const registration = await navigator.serviceWorker.ready;
    const existingSub = await registration.pushManager.getSubscription();
    setSubscription(existingSub);
  };
  
  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    setPermission(permission);
    
    if (permission === 'granted') {
      subscribeToPush();
    }
  };
  
  const subscribeToPush = async () => {
    const registration = await navigator.serviceWorker.ready;
    
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    
    setSubscription(sub);
    
    // Send subscription to server
    await fetch('/api/notifications/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub.toJSON()),
    });
  };
  
  const unsubscribeFromPush = async () => {
    if (subscription) {
      await subscription.unsubscribe();
      setSubscription(null);
      
      // Remove from server
      await fetch('/api/notifications/unsubscribe', {
        method: 'POST',
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });
    }
  };
  
  return {
    isSupported,
    subscription,
    permission,
    requestPermission,
    subscribeToPush,
    unsubscribeFromPush,
  };
};

// Helper function
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Usage
const NotificationSettings = () => {
  const { isSupported, permission, subscription, requestPermission, unsubscribeFromPush } = 
    usePushNotifications();
  
  if (!isSupported) {
    return <p>Push notifications not supported</p>;
  }
  
  return (
    <div>
      <h3>Push Notifications</h3>
      <p>Status: {permission}</p>
      
      {!subscription ? (
        <button
          onClick={requestPermission}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Enable Notifications
        </button>
      ) : (
        <button
          onClick={unsubscribeFromPush}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Disable Notifications
        </button>
      )}
    </div>
  );
};
```

---

## Response Template

```markdown
📱 **Progressive Web App - Expert Level**

Features:
- Advanced Service Worker strategies
- Offline support dengan queue
- Custom install prompt
- Push notifications
- Web app manifest
- Background sync

Benefits:
- Works offline
- Installable like native app
- Push notifications
- Fast loading (cached)
- App-like experience

Tools:
- Workbox
- web-push
- IndexedDB

Integration Time: 2-3 weeks
Complexity: ⭐⭐⭐ Expert
```

---

**Last Updated:** Maret 2026
**Level:** Expert
**Integration Time:** 2-3 weeks
