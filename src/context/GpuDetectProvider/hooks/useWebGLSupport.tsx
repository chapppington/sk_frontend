import React, { useEffect, useState } from "react";
import { WebGLSupport } from "../types";
export const useWebGLSupport = (): WebGLSupport => {
  const [webglSupport, setWebglSupport] = useState<WebGLSupport>({
    isSupported: false,
    isHardwareAccelerated: false,
    vendor: "Unknown",
    renderer: "Unknown",
    webglVersion: "Unknown",
    isLoading: true
  });

  useEffect(() => {
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        
        if (!gl) {
          setWebglSupport({
            isSupported: false,
            isHardwareAccelerated: false,
            vendor: "Not Supported",
            renderer: "Not Supported",
            webglVersion: "Not Supported",
            isLoading: false
          });
          return;
        }

        // Получаем информацию о GPU
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        
        let vendor = "Unknown";
        let renderer = "Unknown";
        let isHardwareAccelerated = true;
        
        if (debugInfo) {
          vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          
          // Проверяем, не является ли рендерер программным
          isHardwareAccelerated = !renderer.toLowerCase().includes('software') && 
                                 !renderer.toLowerCase().includes('llvmpipe') &&
                                 !renderer.toLowerCase().includes('swiftshader') &&
                                 !renderer.toLowerCase().includes('mesa') &&
                                 !renderer.toLowerCase().includes('virgl');
        }

        setWebglSupport({
          isSupported: true,
          isHardwareAccelerated,
          vendor,
          renderer,
          webglVersion: gl.getParameter(gl.VERSION),
          isLoading: false
        });

        // Выводим информацию в консоль
        console.log('=== WebGL Support Check ===');
        console.log('WebGL Supported:', true);
        console.log('Hardware Accelerated:', isHardwareAccelerated);
        console.log('Vendor:', vendor);
        console.log('Renderer:', renderer);
        console.log('WebGL Version:', gl.getParameter(gl.VERSION));
        console.log('==========================');

        if (!isHardwareAccelerated) {
          console.warn('⚠️ WARNING: Hardware acceleration is disabled or not available!');
          console.warn('This may significantly impact 3D performance.');
        }

      } catch (error) {
        console.error('Error checking WebGL support:', error);
        setWebglSupport({
          isSupported: false,
          isHardwareAccelerated: false,
          vendor: "Error",
          renderer: "Error",
          webglVersion: "Error",
          isLoading: false
        });
      }
    };

    checkWebGLSupport();
  }, []);

  return webglSupport;
};