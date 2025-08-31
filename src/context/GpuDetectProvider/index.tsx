"use client";

import React, { ReactNode, useState, createContext, useContext } from "react";
import { GPUInfoData,WebGLSupport } from "./types";
import { useWebGLSupport } from "./hooks/useWebGLSupport";
import { useGPUInfo } from "./hooks/useGPUInfo";

interface GPUContextType {
  // gpuInfo: GPUInfoData | undefined;
  webglSupport: WebGLSupport;
}

const GPUContext = createContext<GPUContextType | undefined>(undefined);

export const GpuDetectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const webglSupport = useWebGLSupport();
  // const gpuInfo = useGPUInfo();

  return (
    <GPUContext.Provider
      value={{
        // gpuInfo,
        webglSupport,
      }}
    >
      {children}
    </GPUContext.Provider>
  );
};



// Компонент для отображения предупреждения внутри 3D сцены

// Компонент для получения только информации о GPU (без предупреждения)
export const GPUInfo: React.FC = () => {
  useGPUInfo(); // Просто получаем и выводим информацию в консоль
  return null;
};
export const useGPUContext = () => {
  const context = useContext(GPUContext);
  if (context === undefined) {
    throw new Error("useGPUContext must be used within a GPUProvider");
  }
  return context;
};
