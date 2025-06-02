import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof Colors.dark & {
    primary: typeof Colors.primary;
    secondary: typeof Colors.secondary;
    status: typeof Colors.status;
    functional: typeof Colors.functional;
    gradients: typeof Colors.gradients;
    text: typeof Colors.text;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const deviceTheme = useColorScheme();
  const [isDark, setIsDark] = useState(deviceTheme === 'dark' || true); // Default to dark mode

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const colors = {
    ...(isDark ? Colors.dark : Colors.light),
    primary: Colors.primary,
    secondary: Colors.secondary,
    status: Colors.status,
    functional: Colors.functional,
    gradients: Colors.gradients,
    text: isDark ? Colors.text : { ...Colors.text, primary: Colors.text.dark, secondary: '#555555', muted: '#999999' },
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};