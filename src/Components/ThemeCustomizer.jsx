import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeCustomizer = () => {
  const { selectedTheme, setSelectedTheme, themesList } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-xl p-4 rounded-xl border border-gray-200 z-50">
      <h2 className="text-lg font-bold mb-2">🎨 Theme Customizer</h2>

      <div className="flex gap-2">
        {themesList.map((themeKey) => (
          <button
            key={themeKey}
            onClick={() => setSelectedTheme(themeKey)}
            className={`px-3 py-1 rounded-full border transition-all text-sm ${
              selectedTheme === themeKey
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeCustomizer;
