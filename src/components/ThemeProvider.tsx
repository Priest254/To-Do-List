import React, { createContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../styles/themes';
import { Appearance, Animated } from 'react-native';

const THEME_KEY = 'app_theme_v1';

export const ThemeContext = createContext({
  theme: lightTheme,
  mode: 'light' as 'light'|'dark',
  toggle: async () => {}
});

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [mode, setMode] = useState<'light'|'dark'>('light');
  const animatedValue = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);
        if (saved === 'light' || saved === 'dark') {
          setMode(saved);
          Animated.timing(animatedValue, { toValue: saved === 'light' ? 0 : 1, duration: 250, useNativeDriver: false }).start();
        } else {
          const sys = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
          setMode(sys);
          Animated.timing(animatedValue, { toValue: sys === 'light' ? 0 : 1, duration: 250, useNativeDriver: false }).start();
        }
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(THEME_KEY, mode);
    Animated.timing(animatedValue, { toValue: mode === 'light' ? 0 : 1, duration: 250, useNativeDriver: false }).start();
  }, [mode]);

  const theme = mode === 'light' ? lightTheme : darkTheme;
  const toggle = async () => setMode(m => m === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, mode, toggle }}>
      <SCThemeProvider theme={theme}>
        {children}
      </SCThemeProvider>
    </ThemeContext.Provider>
  );
};
