# 🔄 Advanced State Management

## Purpose

Advanced patterns untuk manage complex state di React applications - dari Zustand, Redux Toolkit, React Query, hingga atomic state dengan Jotai/Recoil.

## Level: ⭐⭐⭐ Expert

---

## 1. **Zustand Advanced Patterns** 🐻

### A. Middleware & Persistence

```typescript
// Expert pattern: Zustand with middleware
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppState {
  // State
  user: User | null;
  theme: 'light' | 'dark';
  notifications: Array<{ id: string; message: string }>;
  
  // Actions
  setUser: (user: User) => void;
  logout: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (message: string) => void;
  removeNotification: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        user: null,
        theme: 'light',
        notifications: [],
        
        // Actions
        setUser: (user) => {
          set((state) => {
            state.user = user;
          });
        },
        
        logout: () => {
          set((state) => {
            state.user = null;
            state.notifications = [];
          });
        },
        
        setTheme: (theme) => {
          set((state) => {
            state.theme = theme;
          });
          // Update document class
          document.documentElement.classList.toggle('dark', theme === 'dark');
        },
        
        addNotification: (message) => {
          set((state) => {
            const notification = {
              id: Date.now().toString(),
              message,
            };
            state.notifications.push(notification);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
              get().removeNotification(notification.id);
            }, 5000);
          });
        },
        
        removeNotification: (id) => {
          set((state) => {
            state.notifications = state.notifications.filter(n => n.id !== id);
          });
        },
      })),
      {
        name: 'app-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          // Only persist these
          theme: state.theme,
          user: state.user,
        }),
        version: 1,
        migrate: (persistedState: any, version) => {
          if (version === 0) {
            // Migration from v0 to v1
            persistedState.notifications = [];
          }
          return persistedState as any;
        },
      }
    ),
    { name: 'AppStore' }
  )
);

// Usage
function Component() {
  const { user, theme, setTheme, addNotification } = useAppStore();
  
  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

---

### B. Selectors & Performance

```typescript
// Expert pattern: Optimized selectors
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  filters: {
    category: string | null;
    minPrice: number;
    maxPrice: number;
  };
  
  // Actions
  addProduct: (product: Product) => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  setFilters: (filters: Partial<StoreState['filters']>) => void;
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  cart: [],
  filters: {
    category: null,
    minPrice: 0,
    maxPrice: 10000,
  },
  
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  
  addToCart: (productId) =>
    set((state) => {
      const existing = state.cart.find(item => item.productId === productId);
      if (existing) {
        return {
          cart: state.cart.map(item =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        cart: [...state.cart, { productId, quantity: 1 }],
      };
    }),
  
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter(item => item.productId !== productId),
    })),
  
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
}));

// Optimized selectors
export const useProducts = () =>
  useStore((state) => state.products);

export const useFilteredProducts = () =>
  useStore((state) => {
    // Expensive computation, memoized by Zustand
    return state.products.filter(product => {
      if (state.filters.category && product.category !== state.filters.category) {
        return false;
      }
      if (product.price < state.filters.minPrice || product.price > state.filters.maxPrice) {
        return false;
      }
      return true;
    });
  });

export const useCartTotal = () =>
  useStore((state) => {
    return state.cart.reduce((total, item) => {
      const product = state.products.find(p => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  });

// Shallow comparison for multiple values
export const useCartItems = () =>
  useStore(
    (state) => ({
      items: state.cart,
      total: state.cart.reduce((sum, item) => sum + item.quantity, 0),
    }),
    shallow // Only re-render if values change
  );

// Usage
function ProductList() {
  const products = useFilteredProducts(); // Only re-renders when filtered products change
  const cartTotal = useCartTotal(); // Only re-renders when total changes
  
  return (
    <div>
      <p>Cart Total: ${cartTotal}</p>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## 2. **React Query Advanced** ⚛️

### A. Custom Hooks & Optimistic Updates

```typescript
// Expert pattern: React Query with custom hooks
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
}

interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  pageSize: number;
}

// Query keys factory
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: { page: number; limit: number }) =>
    [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};

// Custom hook for fetching posts
export function usePosts(filters: { page: number; limit: number }) {
  return useQuery({
    queryKey: postKeys.list(filters),
    queryFn: async () => {
      const response = await fetch(`/api/posts?page=${filters.page}&limit=${filters.limit}`);
      return response.json() as Promise<PostsResponse>;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
  });
}

// Custom hook for single post
export function usePost(id: string) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: async () => {
      const response = await fetch(`/api/posts/${id}`);
      return response.json() as Promise<Post>;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}

// Custom hook for mutations
export function useCreatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { title: string; content: string }) => {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    
    // Optimistic update
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      
      const previousPosts = queryClient.getQueryData(postKeys.list({ page: 1, limit: 10 }));
      
      // Optimistically add new post
      queryClient.setQueryData(
        postKeys.list({ page: 1, limit: 10 }),
        (old: any) => ({
          ...old,
          posts: [
            {
              id: 'temp-id',
              ...newPost,
              author: { id: 'current-user', name: 'You' },
            },
            ...(old?.posts || []),
          ],
        })
      );
      
      return { previousPosts };
    },
    
    // If mutation fails, rollback
    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(
          postKeys.list({ page: 1, limit: 10 }),
          context.previousPosts
        );
      }
    },
    
    // Refetch after success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

// Usage
function PostsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = usePosts({ page, limit: 10 });
  const createPost = useCreatePost();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;
  
  return (
    <div>
      {data.posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}
```

---

### B. Infinite Queries & Prefetching

```typescript
// Expert pattern: Infinite scroll with prefetching
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`/api/posts?page=${pageParam}&limit=20`);
      return response.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Prefetching
export function PostList() {
  const queryClient = useQueryClient();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts();
  
  // Prefetch next page when user scrolls near bottom
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    if (scrollHeight - scrollTop - clientHeight < 200 && hasNextPage) {
      fetchNextPage();
    }
  };
  
  // Prefetch post details on hover
  const prefetchPost = (postId: string) => {
    queryClient.prefetchQuery({
      queryKey: postKeys.detail(postId),
      queryFn: async () => {
        const response = await fetch(`/api/posts/${postId}`);
        return response.json();
      },
      staleTime: 5 * 60 * 1000,
    });
  };
  
  return (
    <div onScroll={handleScroll} style={{ height: '100vh', overflow: 'auto' }}>
      {data.pages.map((page) =>
        page.posts.map((post: Post) => (
          <div
            key={post.id}
            onMouseEnter={() => prefetchPost(post.id)}
          >
            <PostCard post={post} />
          </div>
        ))
      )}
      
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
}
```

---

## 3. **Atomic State (Jotai)** ⚛️

### A. Atoms & Derived Values

```typescript
// Expert pattern: Jotai for atomic state
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage, atomWithReducer } from 'jotai/utils';

// Basic atoms
const countAtom = atom(0);
const nameAtom = atomWithStorage('name', '');

// Derived atom (computed value)
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Async atom
const userDataAtom = atom(async (get) => {
  const userId = get(userIdAtom);
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

// Reducer atom
interface Todo {
  id: string;
  text: string;
  done: boolean;
}

type TodoAction =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: string }
  | { type: 'delete'; id: string };

const todosAtom = atomWithReducer<Todo[], TodoAction>([], (state, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        { id: Date.now().toString(), text: action.text, done: false },
      ];
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'delete':
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
});

// Filtered todos (derived)
const filterAtom = atom<'all' | 'active' | 'completed'>('all');

const filteredTodosAtom = atom((get) => {
  const todos = get(todosAtom);
  const filter = get(filterAtom);
  
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.done);
    case 'completed':
      return todos.filter((todo) => todo.done);
    default:
      return todos;
  }
});

// Components
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const doubleCount = useAtomValue(doubleCountAtom);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

function TodoList() {
  const todos = useAtomValue(filteredTodosAtom);
  const dispatch = useSetAtom(todosAtom);
  const [filter, setFilter] = useAtom(filterAtom);
  
  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => dispatch({ type: 'toggle', id: todo.id })}
          />
          {todo.text}
          <button onClick={() => dispatch({ type: 'delete', id: todo.id })}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## Response Template

```markdown
🔄 **Advanced State Management - Expert Level**

Features:
- Zustand with middleware (persist, immer, devtools)
- React Query (caching, optimistic updates, infinite queries)
- Jotai/Recoil (atomic state)
- Selectors & performance optimization
- Custom hooks patterns

Use Cases:
- Complex global state
- Server state caching
- Real-time updates
- Optimistic UI
- Atomic computations

Tools:
- Zustand
- @tanstack/react-query
- Jotai / Recoil
- Immer

Integration Time: 2-3 weeks
Complexity: ⭐⭐⭐ Expert
```

---

**Last Updated:** Maret 2026
**Level:** Expert
**Integration Time:** 2-3 weeks
