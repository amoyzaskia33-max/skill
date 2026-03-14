# 🌍 Geo-Adaptive Content

## Purpose

Skill ini menciptakan **UI yang otomatis berubah berdasarkan lokasi user** - bukan cuma bahasa, tapi entire experience (theme, content, layout, colors) berdasarkan timezone, weather, culture, dan local context.

## Core Philosophy

```
"Satu website, infinite experiences"
- Context-aware berdasarkan real-world data
- Personalization tanpa creepy
- Cultural sensitivity built-in
- Privacy-first location detection
```

---

## 1. **Location Detection System** 📍

### A. GeoIP-Based Detection

```tsx
import { useEffect, useState } from 'react';

export const useGeoLocation = () => {
  const [location, setLocation] = useState({
    country: null,
    region: null,
    city: null,
    timezone: null,
    latitude: null,
    longitude: null,
    loading: true,
    error: null,
  });
  
  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Option 1: Browser Geolocation API (more accurate, requires permission)
        if ('geolocation' in navigator) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: false,
              timeout: 5000,
              maximumAge: 300000, // 5 minutes cache
            });
          });
          
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding (optional, use API like OpenCage, Google Maps)
          const geoData = await fetch(`/api/geo-lookup?lat=${latitude}&lng=${longitude}`);
          const data = await geoData.json();
          
          setLocation({
            country: data.country,
            region: data.region,
            city: data.city,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            latitude,
            longitude,
            loading: false,
          });
          
          return;
        }
        
        // Option 2: IP-based geolocation (no permission needed, less accurate)
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();
        
        setLocation({
          country: ipData.country_name,
          region: ipData.region,
          city: ipData.city,
          timezone: ipData.timezone,
          latitude: ipData.latitude,
          longitude: ipData.longitude,
          loading: false,
        });
        
      } catch (error) {
        console.error('Location detection failed:', error);
        
        // Fallback: timezone only
        setLocation({
          country: null,
          region: null,
          city: null,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          latitude: null,
          longitude: null,
          loading: false,
          error: 'Location detection failed, using timezone only',
        });
      }
    };
    
    detectLocation();
  }, []);
  
  return location;
};

// Usage example
export const LocationAwareComponent = () => {
  const { country, city, timezone, loading } = useGeoLocation();
  
  if (loading) return <div>Detecting location...</div>;
  
  return (
    <div>
      <h2>Welcome! 🌍</h2>
      {city && <p>You're browsing from {city}</p>}
      {country && <p>Country: {country}</p>}
      {timezone && <p>Timezone: {timezone}</p>}
    </div>
  );
};
```

---

### B. Privacy-First Location (No Tracking)

```tsx
export const usePrivacyLocation = () => {
  const [region, setRegion] = useState('global');
  
  useEffect(() => {
    // Hanya detect region besar, bukan lokasi spesifik
    const detectRegion = () => {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Map timezone ke region
      const regionMap = {
        // Asia
        'Asia/Jakarta': 'southeast-asia',
        'Asia/Bangkok': 'southeast-asia',
        'Asia/Singapore': 'southeast-asia',
        'Asia/Manila': 'southeast-asia',
        'Asia/Tokyo': 'east-asia',
        'Asia/Seoul': 'east-asia',
        'Asia/Shanghai': 'east-asia',
        'Asia/Dubai': 'middle-east',
        'Asia/Kolkata': 'south-asia',
        
        // Europe
        'Europe/London': 'western-europe',
        'Europe/Paris': 'western-europe',
        'Europe/Berlin': 'western-europe',
        'Europe/Moscow': 'eastern-europe',
        
        // Americas
        'America/New_York': 'north-america-east',
        'America/Los_Angeles': 'north-america-west',
        'America/Chicago': 'north-america-central',
        'America/Sao_Paulo': 'south-america',
        'America/Mexico_City': 'latin-america',
        
        // Oceania
        'Australia/Sydney': 'oceania',
        'Pacific/Auckland': 'oceania',
        
        // Africa
        'Africa/Cairo': 'north-africa',
        'Africa/Johannesburg': 'southern-africa',
        'Africa/Lagos': 'west-africa',
      };
      
      const detectedRegion = regionMap[timezone] || 'global';
      setRegion(detectedRegion);
      
      // Store di localStorage untuk caching
      localStorage.setItem('user-region', detectedRegion);
    };
    
    // Check cache dulu
    const cached = localStorage.getItem('user-region');
    if (cached) {
      setRegion(cached);
    } else {
      detectRegion();
    }
  }, []);
  
  return region;
};
```

---

## 2. **Weather-Based Theming** 🌦️

### A. Weather API Integration

```tsx
export const useWeatherTheme = (location) => {
  const [weather, setWeather] = useState(null);
  const [theme, setTheme] = useState('default');
  
  useEffect(() => {
    if (!location.latitude || !location.longitude) return;
    
    const fetchWeather = async () => {
      try {
        // OpenWeatherMap API (free tier available)
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        
        setWeather({
          temp: data.main.temp,
          condition: data.weather[0].main.toLowerCase(),
          description: data.weather[0].description,
          humidity: data.main.humidity,
          icon: data.weather[0].icon,
        });
        
        // Map weather ke theme
        const weatherThemes = {
          // Clear weather
          clear: 'sunny',
          
          // Cloudy
          clouds: 'cloudy',
          
          // Rain
          rain: 'rainy',
          drizzle: 'rainy',
          
          // Storm
          thunderstorm: 'stormy',
          
          // Snow
          snow: 'wintry',
          
          // Fog
          mist: 'foggy',
          fog: 'foggy',
          haze: 'foggy',
        };
        
        const weatherTheme = weatherThemes[data.weather[0].main.toLowerCase()] || 'default';
        setTheme(weatherTheme);
        
      } catch (error) {
        console.error('Weather fetch failed:', error);
        setTheme('default');
      }
    };
    
    fetchWeather();
    
    // Update weather setiap 30 menit
    const interval = setInterval(fetchWeather, 1800000);
    return () => clearInterval(interval);
  }, [location]);
  
  return { weather, theme };
};

// Theme definitions
export const weatherThemes = {
  sunny: {
    name: 'Sunny Day',
    colors: {
      primary: '#FDB813', // Sun yellow
      secondary: '#87CEEB', // Sky blue
      background: 'linear-gradient(135deg, #FFF9E6 0%, #FFE5B4 100%)',
      text: '#2C3E50',
      accent: '#FF6B35',
    },
    animations: 'bright-fade',
    borderRadius: '12px',
    shadows: 'warm-glow',
  },
  
  cloudy: {
    name: 'Cloudy Day',
    colors: {
      primary: '#B0B8C5', // Cloud gray
      secondary: '#E8ECEF',
      background: 'linear-gradient(135deg, #E8ECEF 0%, #D0D5DD 100%)',
      text: '#34495E',
      accent: '#5D6D7E',
    },
    animations: 'soft-fade',
    borderRadius: '8px',
    shadows: 'soft',
  },
  
  rainy: {
    name: 'Rainy Day',
    colors: {
      primary: '#4A6FA5', // Rain blue
      secondary: '#6B8E9F',
      background: 'linear-gradient(135deg, #5D6D7E 0%, #34495E 100%)',
      text: '#ECF0F1',
      accent: '#7FB3D5',
    },
    animations: 'rain-drop',
    borderRadius: '6px',
    shadows: 'subtle',
  },
  
  stormy: {
    name: 'Stormy Night',
    colors: {
      primary: '#2C3E50', // Storm dark
      secondary: '#4A5568',
      background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
      text: '#F7FAFC',
      accent: '#F6E05E', // Lightning yellow
    },
    animations: 'lightning-flash',
    borderRadius: '4px',
    shadows: 'dramatic',
  },
  
  wintry: {
    name: 'Winter Wonderland',
    colors: {
      primary: '#A5D8DD', // Ice blue
      secondary: '#E8F4F8',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #E8F4F8 50%, #A5D8DD 100%)',
      text: '#2C5F6F',
      accent: '#FF6B6B', // Warm contrast
    },
    animations: 'snowflake',
    borderRadius: '16px',
    shadows: 'icy',
  },
  
  foggy: {
    name: 'Foggy Morning',
    colors: {
      primary: '#95A5A6', // Fog gray
      secondary: '#BDC3C7',
      background: 'linear-gradient(135deg, #ECF0F1 0%, #BDC3C7 100%)',
      text: '#34495E',
      accent: '#7F8C8D',
    },
    animations: 'mist-fade',
    borderRadius: '8px',
    shadows: 'diffused',
  },
  
  default: {
    name: 'Default',
    colors: {
      primary: '#3B82F6',
      secondary: '#93C5FD',
      background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
      text: '#1E3A8A',
      accent: '#2563EB',
    },
    animations: 'standard',
    borderRadius: '8px',
    shadows: 'normal',
  },
};
```

---

### B. Weather-Adaptive UI Component

```tsx
export const WeatherAdaptiveLayout = ({ children }) => {
  const location = useGeoLocation();
  const { weather, theme } = useWeatherTheme(location);
  const themeStyles = weatherThemes[theme] || weatherThemes.default;
  
  return (
    <div
      className="weather-adaptive"
      style={{
        background: themeStyles.colors.background,
        color: themeStyles.colors.text,
        '--primary-color': themeStyles.colors.primary,
        '--secondary-color': themeStyles.colors.secondary,
        '--accent-color': themeStyles.colors.accent,
        '--border-radius': themeStyles.borderRadius,
      }}
    >
      {/* Weather indicator */}
      {weather && (
        <div className="weather-indicator fixed top-4 right-4 z-50">
          <div className="bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-lg flex items-center space-x-2">
            <span className="text-2xl">
              {weather.condition === 'clear' && '☀️'}
              {weather.condition === 'clouds' && '☁️'}
              {weather.condition === 'rain' && '🌧️'}
              {weather.condition === 'thunderstorm' && '⛈️'}
              {weather.condition === 'snow' && '❄️'}
              {weather.condition === 'mist' && '🌫️'}
            </span>
            <span className="text-sm font-medium">
              {Math.round(weather.temp)}°C
            </span>
          </div>
        </div>
      )}
      
      {/* Animated background elements */}
      <WeatherBackgroundEffects theme={theme} />
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Theme CSS */}
      <style jsx global>{`
        .weather-adaptive {
          min-height: 100vh;
          transition: all 0.5s ease;
        }
        
        .weather-adaptive button {
          border-radius: var(--border-radius);
          background: var(--primary-color);
          color: white;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .weather-adaptive button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px var(--primary-color);
        }
        
        .weather-adaptive a {
          color: var(--accent-color);
        }
        
        .weather-adaptive card {
          border-radius: var(--border-radius);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
};

const WeatherBackgroundEffects = ({ theme }) => {
  if (theme === 'rainy') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-blue-400/30 animate-rain"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-20px',
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    );
  }
  
  if (theme === 'wintry') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10px',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    );
  }
  
  return null;
};
```

---

## 3. **Timezone-Aware Content** ⏰

### A. Time-Based Greetings & Themes

```tsx
export const useTimezoneContent = (location) => {
  const [timeData, setTimeData] = useState({
    hour: null,
    timeOfDay: 'day', // morning, afternoon, evening, night
    localTime: null,
    userTimezone: null,
  });
  
  useEffect(() => {
    const updateTime = () => {
      const timezone = location.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
      const now = new Date();
      
      // Get hour in user's timezone
      const options = {
        hour: 'numeric',
        hour12: false,
        timeZone: timezone,
      };
      const localHour = parseInt(new Intl.DateTimeFormat('en-US', options).format(now));
      
      // Determine time of day
      let timeOfDay = 'day';
      if (localHour >= 5 && localHour < 12) {
        timeOfDay = 'morning';
      } else if (localHour >= 12 && localHour < 18) {
        timeOfDay = 'afternoon';
      } else if (localHour >= 18 && localHour < 22) {
        timeOfDay = 'evening';
      } else {
        timeOfDay = 'night';
      }
      
      setTimeData({
        hour: localHour,
        timeOfDay,
        localTime: now.toLocaleTimeString('en-US', { timeZone: timezone }),
        userTimezone: timezone,
      });
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [location]);
  
  return timeData;
};

// Time-aware greeting component
export const TimezoneGreeting = ({ userName }) => {
  const location = useGeoLocation();
  const { timeOfDay, localTime } = useTimezoneContent(location);
  
  const greetings = {
    morning: {
      text: 'Good Morning',
      emoji: '🌅',
      theme: 'warm-energetic',
    },
    afternoon: {
      text: 'Good Afternoon',
      emoji: '☀️',
      theme: 'bright-productive',
    },
    evening: {
      text: 'Good Evening',
      emoji: '🌆',
      theme: 'calm-relaxed',
    },
    night: {
      text: 'Good Night',
      emoji: '🌙',
      theme: 'dark-quiet',
    },
  };
  
  const greeting = greetings[timeOfDay];
  
  return (
    <div className={`greeting greeting-${greeting.theme}`}>
      <span className="text-4xl">{greeting.emoji}</span>
      <h1 className="text-3xl font-bold mt-2">
        {greeting.text}{userName ? `, ${userName}` : ''}!
      </h1>
      <p className="text-sm opacity-70 mt-1">
        Local time: {localTime}
      </p>
    </div>
  );
};
```

---

### B. Time-Based Content Adaptation

```tsx
export const TimeAdaptiveContent = () => {
  const location = useGeoLocation();
  const { timeOfDay, hour } = useTimezoneContent(location);
  
  // Content yang berubah berdasarkan waktu
  const contentByTime = {
    morning: {
      cta: 'Start Your Day',
      message: 'Fresh start, new opportunities!',
      featuredSection: 'Morning Briefing',
      colorScheme: 'energetic',
      complexity: 'high', // User lebih alert di pagi hari
    },
    afternoon: {
      cta: 'Keep Going',
      message: "You're doing great!",
      featuredSection: 'Popular Now',
      colorScheme: 'productive',
      complexity: 'medium',
    },
    evening: {
      cta: 'Wind Down',
      message: 'Time to relax and reflect',
      featuredSection: 'Light Reading',
      colorScheme: 'relaxed',
      complexity: 'low',
    },
    night: {
      cta: 'Rest Well',
      message: 'See you tomorrow!',
      featuredSection: 'Quiet Mode',
      colorScheme: 'minimal',
      complexity: 'minimal',
    },
  };
  
  const content = contentByTime[timeOfDay];
  
  return (
    <div className={`time-adaptive time-${content.colorScheme}`}>
      {/* Complex content di pagi hari */}
      {timeOfDay === 'morning' && (
        <div className="morning-content">
          <h2>Morning Briefing</h2>
          <p>Detailed analytics, comprehensive data, complex features</p>
          <Dashboard fullFeatures />
        </div>
      )}
      
      {/* Simplified content di malam hari */}
      {(timeOfDay === 'evening' || timeOfDay === 'night') && (
        <div className="evening-content">
          <h2>Evening Mode</h2>
          <p>Simple, calming interface with minimal distractions</p>
          <Dashboard reducedFeatures darkMode />
        </div>
      )}
      
      {/* Normal content untuk siang */}
      {timeOfDay === 'afternoon' && (
        <div className="afternoon-content">
          <h2>Afternoon Productivity</h2>
          <p>Balanced interface for peak work hours</p>
          <Dashboard />
        </div>
      )}
    </div>
  );
};
```

---

## 4. **Cultural Adaptation** 🎌

### A. Culture-Aware Design

```tsx
export const useCulturalPreferences = (location) => {
  const [culture, setCulture] = useState({
    region: 'global',
    colorPreferences: {},
    layoutPreference: 'default',
    iconStyle: 'universal',
    readingDirection: 'ltr',
  });
  
  useEffect(() => {
    if (!location.country) return;
    
    // Cultural preferences database
    const culturalDB = {
      // East Asia
      'Japan': {
        colors: {
          primary: '#BC002D', // Japan red
          accent: '#FF6B6B',
          avoid: ['#4C566A'], // Avoid dark colors
        },
        layout: 'minimal',
        iconStyle: 'cute',
        typography: 'clean',
      },
      'China': {
        colors: {
          primary: '#DE2910', // China red
          accent: '#FFDE00', // Yellow
          lucky: ['#DE2910', '#FFDE00'],
        },
        layout: 'dense',
        iconStyle: 'detailed',
      },
      'South Korea': {
        colors: {
          primary: '#0047A0', // Korea blue
          accent: '#CD2E3A',
        },
        layout: 'modern',
        iconStyle: 'trendy',
      },
      
      // Middle East
      'United Arab Emirates': {
        colors: {
          primary: '#00732F', // UAE green
          accent: '#FFFFFF',
        },
        layout: 'ornate',
        readingDirection: 'rtl',
        iconStyle: 'geometric',
      },
      'Saudi Arabia': {
        colors: {
          primary: '#165D31', // Saudi green
        },
        layout: 'conservative',
        readingDirection: 'rtl',
      },
      
      // Europe
      'Germany': {
        colors: {
          primary: '#000000',
          secondary: '#DD0000',
          accent: '#FFCE00',
        },
        layout: 'structured',
        iconStyle: 'functional',
      },
      'France': {
        colors: {
          primary: '#002395',
          accent: '#ED2939',
        },
        layout: 'elegant',
        iconStyle: 'artistic',
      },
      
      // Americas
      'United States': {
        colors: {
          primary: '#B22234',
          accent: '#3C3B6E',
        },
        layout: 'bold',
        iconStyle: 'direct',
      },
      'Brazil': {
        colors: {
          primary: '#009C3B',
          secondary: '#FFDF00',
          accent: '#002776',
        },
        layout: 'vibrant',
        iconStyle: 'expressive',
      },
      
      // Southeast Asia
      'Indonesia': {
        colors: {
          primary: '#FF0000',
          secondary: '#FFFFFF',
        },
        layout: 'friendly',
        iconStyle: 'warm',
      },
      'Thailand': {
        colors: {
          primary: '#A51931',
          accent: '#F4F5FF',
        },
        layout: 'colorful',
        iconStyle: 'traditional',
      },
    };
    
    const userCulture = culturalDB[location.country] || culturalDB['global'];
    
    setCulture({
      region: location.country,
      ...userCulture,
    });
  }, [location]);
  
  return culture;
};

// Cultural adapter component
export const CulturalAdapter = ({ children }) => {
  const location = useGeoLocation();
  const culture = useCulturalPreferences(location);
  
  return (
    <div
      className={`cultural-adapter cultural-${culture.region}`}
      dir={culture.readingDirection || 'ltr'}
      style={{
        '--cultural-primary': culture.colors?.primary,
        '--cultural-accent': culture.colors?.accent,
      }}
    >
      {/* Cultural-specific styles */}
      <style jsx global>{`
        .cultural-japan {
          font-family: 'Hiragino Sans', sans-serif;
        }
        
        .cultural-japan .card {
          border-radius: 4px;
          padding: 1.5rem;
          background: white;
        }
        
        .cultural-middle-east {
          direction: rtl;
          text-align: right;
        }
        
        .cultural-middle-east .card {
          border: 2px solid var(--cultural-primary);
          border-radius: 12px;
          pattern: geometric;
        }
        
        .cultural-brazil {
          background: linear-gradient(135deg, #009C3B, #FFDF00);
        }
        
        .cultural-brazil button {
          border-radius: 24px;
          padding: 1rem 2rem;
          font-weight: bold;
        }
      `}</style>
      
      {children}
    </div>
  );
};
```

---

### B. Local Events Integration

```tsx
export const LocalEvents = () => {
  const location = useGeoLocation();
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    if (!location.country) return;
    
    // Events database by country
    const eventsDB = {
      'Indonesia': [
        { name: 'Lebaran', date: 'variable', theme: 'celebration' },
        { name: 'Independence Day', date: 'August 17', theme: 'patriotic' },
        { name: 'Nyepi', date: 'variable', theme: 'quiet' },
      ],
      'United States': [
        { name: 'Thanksgiving', date: 'November 4th Thursday', theme: 'gratitude' },
        { name: 'Independence Day', date: 'July 4', theme: 'patriotic' },
        { name: 'Halloween', date: 'October 31', theme: 'spooky' },
      ],
      'Japan': [
        { name: 'Cherry Blossom', date: 'March-April', theme: 'spring' },
        { name: 'Golden Week', date: 'Late April-Early May', theme: 'celebration' },
      ],
    };
    
    const userEvents = eventsDB[location.country] || [];
    setEvents(userEvents);
  }, [location]);
  
  return (
    <div className="local-events p-4 bg-white/10 rounded-lg">
      <h3 className="font-bold mb-2">📅 Local Events</h3>
      {events.length > 0 ? (
        <ul className="space-y-2">
          {events.map((event, i) => (
            <li key={i} className={`event event-${event.theme}`}>
              <span className="font-medium">{event.name}</span>
              <span className="text-sm opacity-70"> - {event.date}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm opacity-70">No local events detected</p>
      )}
    </div>
  );
};
```

---

## 5. **Regional Compliance** ⚖️

### A. GDPR/Privacy Compliance

```tsx
export const useRegionalCompliance = (location) => {
  const [compliance, setCompliance] = useState({
    gdpr: false, // EU
    ccpa: false, // California
    pdpa: false, // Thailand
    other: null,
  });
  
  useEffect(() => {
    if (!location.country) return;
    
    const complianceRules = {
      // GDPR countries (EU)
      'Germany': { gdpr: true },
      'France': { gdpr: true },
      'Italy': { gdpr: true },
      'Spain': { gdpr: true },
      'Netherlands': { gdpr: true },
      
      // CCPA (California, USA)
      'United States': { ccpa: true }, // Check if California
      
      // PDPA (Thailand)
      'Thailand': { pdpa: true },
      
      // PIPEDA (Canada)
      'Canada': { pipeda: true },
      
      // APP (Australia)
      'Australia': { app: true },
    };
    
    const userCompliance = complianceRules[location.country] || {};
    setCompliance(userCompliance);
  }, [location]);
  
  return compliance;
};

// Compliance banner component
export const ComplianceBanner = () => {
  const location = useGeoLocation();
  const compliance = useRegionalCompliance(location);
  const [accepted, setAccepted] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem('cookie-consent');
    if (saved) {
      setAccepted(true);
    }
  }, []);
  
  if (accepted) return null;
  if (!compliance.gdpr && !compliance.ccpa && !compliance.pdpa) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-6 z-50">
      <div className="max-w-4xl mx-auto">
        <h3 className="font-bold text-lg mb-2">
          {compliance.gdpr && '🇪🇺 '}
          {compliance.ccpa && '🇺🇸 '}
          {compliance.pdpa && '🇹🇭 '}
          Your Privacy Rights
        </h3>
        
        <p className="text-sm mb-4">
          {compliance.gdpr && 'We use cookies to provide you with the best experience. By continuing, you agree to our use of cookies as per GDPR.'}
          {compliance.ccpa && 'We do not sell your personal information. You have the right to opt-out of data collection.'}
          {compliance.pdpa && 'Your personal data is protected under PDPA. We collect only necessary information.'}
        </p>
        
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setAccepted(true);
              localStorage.setItem('cookie-consent', 'true');
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Accept
          </button>
          
          <button
            onClick={() => {
              // Show detailed settings
              console.log('Show cookie settings');
            }}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Settings
          </button>
          
          {compliance.ccpa && (
            <button
              onClick={() => {
                // Opt-out of data sale
                console.log('Opt-out of data sale');
              }}
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Do Not Sell My Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
```

---

## Response Template

```markdown
🌍 **Geo-Adaptive Content - Activated!**

Saya sudah siapkan UI yang adapt berdasarkan lokasi user:

### 📍 Location Features:

1. **GeoIP Detection**
   - Country, region, city detection
   - Timezone auto-detect
   - Privacy-first (no tracking)
   - Cached for performance

2. **Weather-Based Theming**
   - Sunny, cloudy, rainy, stormy themes
   - Real-time weather API integration
   - Animated background effects
   - Color psychology per weather

3. **Timezone Awareness**
   - Time-based greetings
   - Content complexity adjustment
   - Local time display
   - Day/night mode auto

4. **Cultural Adaptation**
   - Region-specific colors
   - Layout preferences
   - Icon styles
   - Reading direction (LTR/RTL)
   - Local events integration

5. **Regional Compliance**
   - GDPR (Europe)
   - CCPA (California)
   - PDPA (Thailand)
   - Auto-compliance banner

### 🛡️ Why Context-Aware:

- ✅ Real-world data integration
- ✅ Personal tanpa creepy
- ✅ Cultural sensitivity
- ✅ Privacy-first approach
- ✅ Every user = unique experience

### 🎯 Use Cases:

- Global e-commerce
- Travel platforms
- Multi-national websites
- Content platforms
- SaaS dengan users global

Mau implement yang mana?
```

---

## Integration Example

```tsx
import {
  GeoAdaptiveProvider,
  WeatherAdaptiveLayout,
  TimezoneGreeting,
  CulturalAdapter,
  ComplianceBanner,
} from 'geo-adaptive-content';

function App() {
  return (
    <GeoAdaptiveProvider>
      <WeatherAdaptiveLayout>
        <CulturalAdapter>
          <TimezoneGreeting userName="User" />
          <MainContent />
          <ComplianceBanner />
        </CulturalAdapter>
      </WeatherAdaptiveLayout>
    </GeoAdaptiveProvider>
  );
}
```

---

**Last Updated:** Maret 2026
**APIs Used:** OpenWeatherMap, ipapi.co, Browser Geolocation API
