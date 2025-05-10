
import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeColor = 'red' | 'green' | 'purple' | 'blue' | 'custom';
type ThemeMode = 'light' | 'dark';

interface ThemeConfig {
  mode: ThemeMode;
  color: ThemeColor;
  customColor?: string;
}

interface ThemeContextType {
  theme: ThemeConfig;
  toggleMode: () => void;
  setThemeColor: (color: ThemeColor, customColor?: string) => void;
}

const defaultTheme: ThemeConfig = {
  mode: 'light',
  color: 'red', // Default theme color (bengali-red)
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);

  useEffect(() => {
    // Load theme from localStorage or default to system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme) as ThemeConfig;
        setTheme(parsedTheme);
        applyTheme(parsedTheme);
      } catch (e) {
        // If JSON parsing fails, use system preference for mode
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const newTheme = { 
          ...defaultTheme, 
          mode: prefersDark ? 'dark' as ThemeMode : 'light' as ThemeMode 
        };
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    } else {
      // No saved theme, use system preference for mode
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const newTheme = { 
        ...defaultTheme, 
        mode: prefersDark ? 'dark' as ThemeMode : 'light' as ThemeMode 
      };
      setTheme(newTheme);
      applyTheme(newTheme);
    }
  }, []);

  const applyTheme = (themeConfig: ThemeConfig) => {
    // Apply dark/light mode
    document.documentElement.classList.toggle('dark', themeConfig.mode === 'dark');
    
    // Apply theme color
    document.documentElement.setAttribute('data-theme-color', themeConfig.color);
    
    // Apply custom color if it exists
    if (themeConfig.color === 'custom' && themeConfig.customColor) {
      document.documentElement.style.setProperty('--theme-custom-color', themeConfig.customColor);
    }
  };

  const toggleMode = () => {
    const newTheme = { 
      ...theme, 
      mode: theme.mode === 'light' ? 'dark' as ThemeMode : 'light' as ThemeMode 
    };
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  const setThemeColor = (color: ThemeColor, customColor?: string) => {
    // Important: Preserve the current mode when changing color
    const newTheme = { 
      ...theme, 
      color, 
      customColor: color === 'custom' ? customColor : undefined 
    };
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleMode, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
