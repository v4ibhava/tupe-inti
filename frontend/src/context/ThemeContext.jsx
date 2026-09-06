// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isNightMode, setIsNightMode] = useState(() => {
    const saved = localStorage.getItem('elevatura_theme');
    if (saved) return saved === 'dark';
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isNightMode) {
      root.classList.add('dark');
      localStorage.setItem('elevatura_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('elevatura_theme', 'light');
    }
  }, [isNightMode]);

  const toggleTheme = () => {
    setIsNightMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isNightMode, toggleTheme, setIsNightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
