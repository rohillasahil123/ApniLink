import React, { createContext, useContext, useState, useEffect } from "react";

const themes = {
  light: {
    background: "#ffffff",
    text: "#000000",
    button: "#4f46e5", // indigo
  },
  dark: {
    background: "#000000",
    text: "#ffffff",
    button: "#10b981", // green
  },
  custom: {
    background: "#fef3c7", // light yellow
    text: "#1f2937",       // gray-800
    button: "#e11d48",     // rose
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState("light");

  // Save to localStorage (optional)
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setSelectedTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", selectedTheme);
  }, [selectedTheme]);

  const value = {
    theme: themes[selectedTheme],
    selectedTheme,
    setSelectedTheme,
    themesList: Object.keys(themes),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook
export const useTheme = () => useContext(ThemeContext);
