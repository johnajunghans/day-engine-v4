'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react"

export type Mode = "light" | "dark"
export type Color = "default" | "blue" | "green" | "purple"
export type Theme = `${Mode} ${Color}`

type ThemeContextType = {
    theme: Theme,
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    // Define state for theme and set theme
    // Included function as initial value which searches localStorage for potential value

    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== undefined) {
            return (localStorage.getItem('theme') as Theme) || "dark default"
        } else return "dark default"
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme])
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };