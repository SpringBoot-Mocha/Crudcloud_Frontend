import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Recuperar preferencia guardada o detectar preferencia del sistema
    const saved = localStorage.getItem('theme-mode');
    if (saved) {
      return saved === 'dark';
    }
    // Detectar preferencia del sistema operativo
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Guardar preferencia en localStorage
    localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');

    // Agregar clase de transición suave
    setIsTransitioning(true);

    // Aplicar clase al documento para Tailwind dark mode
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Actualizar meta theme-color para navegadores móviles
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', isDark ? '#0f172a' : '#ffffff');
    }

    // Remover clase de transición después de completarse
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [isDark]);

  // Escuchar cambios de preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Solo cambiar si no hay preferencia guardada
      if (!localStorage.getItem('theme-mode')) {
        setIsDark(e.matches);
      }
    };

    // Soporte para navegadores antiguos y nuevos
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const value = {
    isDark,
    toggleTheme,
    isTransitioning,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  }
  return context;
};
