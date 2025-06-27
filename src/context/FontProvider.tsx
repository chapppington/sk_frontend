"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import siteConfigService from "@/services/site-config.service";
import { API_URL } from "@/constants";

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
    // Fetch font from backend
    siteConfigService.fetchConfig().then((res) => {
      const font = res.data.fontFamily;
      setFontFamilyState(font);
      updateFont(font);
    });

    // SSE подписка на обновления шрифта
    const sse = new EventSource(`${API_URL}/site-config/stream`);
    sse.onopen = () => {
      console.debug("[SSE] Connection opened");
    };
    sse.onmessage = (event) => {
      console.debug("[SSE] Message received:", event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.fontFamily) {
          setFontFamilyState(data.fontFamily);
          updateFont(data.fontFamily);
        }
      } catch (e) {
        console.debug("[SSE] JSON parse error", e);
      }
    };
    sse.onerror = (err) => {
      console.debug("[SSE] Error", err);
      // SSE может иногда падать, браузер переподключит автоматически
    };
    return () => {
      sse.close();
    };
  }, []);

  const setFontFamily = async (font: string) => {
    setFontFamilyState(font);
    updateFont(font);
    // Update backend
    await siteConfigService.updateFontFamily(font);
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
