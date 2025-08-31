import { GPUInfoData } from "../types";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useState } from "react";


export const useGPUInfo = (): GPUInfoData | undefined => {
  const { gl } = useThree();
  const [gpuInfo, setGpuInfo] = useState<GPUInfoData | undefined>(undefined);

  useEffect(() => {
    try {
      // Получаем WebGL контекст
      const canvas = gl.domElement;
      const glContext = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      if (glContext) {
        // Получаем информацию о GPU
        const debugInfo = glContext.getExtension('WEBGL_debug_renderer_info');
        
        let vendor = "Unknown";
        let renderer = "Unknown";
        let isHardwareAccelerated = true;
        
        if (debugInfo) {
          vendor = glContext.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          renderer = glContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          
          // Проверяем, не является ли рендерер программным
          isHardwareAccelerated = !renderer.toLowerCase().includes('software') && 
                                 !renderer.toLowerCase().includes('llvmpipe') &&
                                 !renderer.toLowerCase().includes('swiftshader');
        } 

        const info: GPUInfoData = {
          vendor,
          renderer,
          webglVersion: glContext.getParameter(glContext.VERSION),
          shadingLanguageVersion: glContext.getParameter(glContext.SHADING_LANGUAGE_VERSION),
          maxTextureSize: glContext.getParameter(glContext.MAX_TEXTURE_SIZE),
          maxViewportDims: glContext.getParameter(glContext.MAX_VIEWPORT_DIMS),
          isHardwareAccelerated
        };

        setGpuInfo(info);
        
        
        console.log('=== GPU Information ===');
        console.log('Vendor:', info.vendor);
        console.log('Renderer:', info.renderer);
        console.log('WebGL Version:', info.webglVersion);
        console.log('Shading Language Version:', info.shadingLanguageVersion);
        console.log('Max Texture Size:', info.maxTextureSize);
        console.log('Max Viewport Dimensions:', info.maxViewportDims);
        console.log('Hardware Accelerated:', info.isHardwareAccelerated);
        console.log('========================');
        
        
        console.log('=== Three.js Renderer Info ===');
        console.log('Capabilities:', gl.capabilities);
        console.log('Info:', gl.info);
        console.log('=============================');
        
        
        if (!info.isHardwareAccelerated) {
          console.warn('WARNING: Hardware acceleration is disabled or not available!');
          console.warn('This may significantly impact 3D performance.');
        }
      }
    } catch (error) {
      console.error('Error getting GPU info:', error);
      setGpuInfo(undefined);
    }
  }, [gl]);

  return gpuInfo || undefined;
};