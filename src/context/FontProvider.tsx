"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface FontContextType {
  fontFamily: string;
  setFontFamily: (font: string) => void;
}

const FontContext = createContext<FontContextType>({
  fontFamily: "",
  setFontFamily: () => {},
});

export function FontProvider({ children }: { children: ReactNode }) {
  const [fontFamily, setFontFamilyState] = useState("");

  useEffect(() => {
    // Инициализация из localStorage
    const savedFont = localStorage.getItem("global-font-family") || "";
    if (savedFont) {
      setFontFamilyState(savedFont);
      updateFont(savedFont);
    }
    // Подписка на кастомное событие и storage
    const handler = () => {
      const font = localStorage.getItem("global-font-family") || "";
      setFontFamilyState(font);
      updateFont(font);
    };
    window.addEventListener("font-family-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("font-family-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const setFontFamily = (font: string) => {
    setFontFamilyState(font);
    localStorage.setItem("global-font-family", font);
    updateFont(font);
    window.dispatchEvent(new Event("font-family-changed"));
  };

  function updateFont(font: string) {
    // Google Fonts link
    const id = "dynamic-google-font";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (link) link.remove();
    link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css?family=${font.replace(
      / /g,
      "+"
    )}:300,400,500,600,700,800,900&display=swap`;
    document.head.appendChild(link);
    // Set font family
    document.documentElement.style.fontFamily = `'${font}', system-ui, sans-serif`;
  }

  return (
    <FontContext.Provider value={{ fontFamily, setFontFamily }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  return useContext(FontContext);
}
