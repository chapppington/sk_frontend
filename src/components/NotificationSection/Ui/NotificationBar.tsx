"use client";

import { useEffect, useMemo, useState } from "react";
import { useGPUContext } from "@/context/GpuDetectProvider";

export default function NotificationBar() {
  const { webglSupport } = useGPUContext();
  const [isVisible, setIsVisible] = useState(true);

  const { bgClass, text, autoHideMs } = useMemo(() => {
    if (webglSupport.isLoading) {
      return {
        bgClass: "bg-blue-600",
        text: "Проверка поддержки WebGL и аппаратного ускорения...",
        autoHideMs: undefined,
      } as const;
    }

    if (!webglSupport.isSupported) {
      return {
        bgClass: "bg-red-600",
        text: "WebGL не поддерживается. 3D-контент будет недоступен.",
        autoHideMs: undefined,
      } as const;
    }

    if (webglSupport.isSupported && !webglSupport.isHardwareAccelerated) {
      return {
        bgClass: "bg-amber-600",
        text:
          "Аппаратное ускорение отключено. Возможна низкая производительность 3D.",
        autoHideMs: undefined,
      } as const;
    }

    return {
      bgClass: "bg-emerald-600",
      text: `WebGL: ${webglSupport.webglVersion}. GPU: ${webglSupport.vendor} • ${webglSupport.renderer}`,
      autoHideMs: 4000,
    } as const;
  }, [webglSupport]);

  useEffect(() => {
    if (!autoHideMs) return;
    setIsVisible(true);
    const id = setTimeout(() => setIsVisible(false), autoHideMs);
    return () => clearTimeout(id);
  }, [autoHideMs, text]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-12 right-4 ${bgClass} text-white px-4 py-3 rounded-md shadow-lg z-[1000] max-w-[92vw] sm:max-w-md`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <span className="text-sm leading-5">{text}</span>
        <button
          aria-label="Закрыть уведомление"
          className="ml-auto shrink-0 opacity-80 hover:opacity-100 transition-opacity"
          onClick={() => setIsVisible(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}