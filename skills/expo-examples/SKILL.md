---
name: expo-examples
description: Use when learning React Native with Expo - collection of example projects showcasing Expo features and React Native patterns
---

# Expo Examples Skill - React Native Learning Resources

## Purpose

This skill provides access to a collection of Expo example projects that showcase various React Native features, patterns, and best practices for mobile app development.

## When to Use

Use this skill when:
- Learning React Native with Expo
- Need example code for specific features
- Exploring Expo capabilities
- Finding React Native patterns
- Building proof of concepts
- Quick prototyping

## Example Categories

### App Features

| Category | Examples |
|----------|----------|
| **Navigation** | Stack, Tab, Drawer navigation |
| **UI Components** | Lists, Forms, Animations |
| **API Integration** | REST, GraphQL, Firebase |
| **Authentication** | OAuth, JWT, Biometric |
| **Media** | Camera, Images, Video, Audio |
| **Storage** | SQLite, AsyncStorage, Cloud |
| **Notifications** | Push notifications, local |
| **Maps** | Location, Maps, Geofencing |
| **Sensors** | Accelerometer, Gyroscope |
| **Payments** | In-app purchases, Stripe |

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React Native |
| **Development** | Expo SDK |
| **Language** | JavaScript/TypeScript |
| **Navigation** | React Navigation |
| **State** | Context API, Zustand, Redux |
| **Backend** | Various (Firebase, Supabase, custom) |

## Quick Start

```bash
# Browse examples
cd expo-examples

# Run specific example
cd examples/with-navigation
npm install
npx expo start

# Scan QR code with Expo Go app
# Or run on simulator
npx expo run:ios
npx expo run:android
```

## Common Examples

### 1. Navigation Example

```javascript
// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### 2. API Integration

```javascript
// Fetch data
const fetchUsers = async () => {
  const response = await fetch('https://api.example.com/users');
  const data = await response.json();
  return data;
};

// With React Query
const { data, isLoading } = useQuery(['users'], fetchUsers);
```

### 3. Camera Example

```javascript
import { Camera } from 'expo-camera';

const [hasPermission, setHasPermission] = useState(null);
const cameraRef = useRef(null);

useEffect(() => {
  (async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  })();
}, []);
```

## For AI Assistants

When helping with Expo projects:

1. **Check Expo compatibility** - Not all native modules supported
2. **Use managed workflow** - Easier development
3. **Leverage Expo SDK** - Built-in APIs
4. **EAS Build** - For custom native code
5. **Testing** - Use Expo Go for quick testing

## Best Practices

- **Start with managed** - Eject only if needed
- **Use TypeScript** - Type safety
- **Follow examples** - Proven patterns
- **Optimize bundles** - Code splitting
- **Test on device** - Expo Go app

## Related Skills

- `react-native-boilerplate` - React Native starter
- `ignite-boilerplate` - Production React Native
- `flutter-sdk` - Alternative mobile framework

## Repository Location

`C:\Users\user\.qwen\skills\expo-examples`

## Source

https://github.com/expo/examples

## Expo Documentation

https://docs.expo.dev

---

**Note:** Expo simplifies React Native development with pre-built modules and streamlined workflow. Perfect for learning and rapid prototyping.
