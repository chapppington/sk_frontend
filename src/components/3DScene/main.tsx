"use client";

import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
// import Scene from "@/components/3DScene/features/3dScene/Scene";
import Camera3D from "@/components/3DScene/features/3dScene/Camera3D";
import { AdaptiveDpr, AdaptiveEvents, Preload, PerformanceMonitor, Html } from "@react-three/drei";
import { CameraProvider } from "./features/CameraContext";
import { Suspense } from "react";
import dynamic from "next/dynamic";


const TempScene = dynamic(() => import("./features/3dScene/Scene"), { ssr: false });

const MainScene = React.memo(() => {
  const [dpr, setDpr] = useState(2)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Мемоизируем настройки Canvas
  const canvasSettings = useMemo(
    () => ({
      style: {
        height: "100vh",
        width: "100vw",
        position: "absolute" as const,
        top: 0,
      },
      camera: {
        position: [0, 0, 10] as [number, number, number],
        fov: 70,
        near: 10.1,
        far: 5000,
      },
      gl: {
        antialias: true,
        powerPreference: "high-performance" as const,
        stencil: false,
        depth: false,
        outputColorSpace: THREE.SRGBColorSpace,
        alpha: true,
      },
      dpr: [1, 2] as [number, number],
      scene: {
        background: new THREE.Color("#121f54"),
      },
    }),
    []
  );
  

  // Cleanup function to properly dispose of WebGL context
  // const cleanupWebGL = useCallback(() => {
  //   if (canvasRef.current) {
  //     // Directly cleanup WebGL context
  //     const context = canvasRef.current.getContext('webgl2') || canvasRef.current.getContext('webgl');
  //     if (context) {
  //       // Clear all buffers
  //       context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT | context.STENCIL_BUFFER_BIT);
        
  //       // Get all WebGL extensions and lose context
  //       const loseContext = context.getExtension('WEBGL_lose_context');
  //       if (loseContext) {
  //         loseContext.loseContext();
  //       }

  //       // Clear canvas
  //       canvasRef.current.width = 1;
  //       canvasRef.current.height = 1;
  //     }
  //   }
  // }, []);

  // Component to handle Three.js cleanup
  // const CleanupHandler = () => {
  //   const { gl } = useThree();
    
  //   useEffect(() => {
  //     return () => {
  //       // Cleanup Three.js renderer
  //       gl.dispose();
  //       // gl.forceContextLoss();
  //       const originalDomElement = gl.domElement;
  //       gl.setAnimationLoop(null);
  //       if (originalDomElement && originalDomElement.parentNode) {
  //         originalDomElement.parentNode.removeChild(originalDomElement);
  //       }
  //     };
  //   }, [gl]);
    
  //   return null;
  // };

  // useEffect(() => {
  //   // Cleanup on unmount
  //   return () => {
  //     cleanupWebGL();
  //   };
  // }, [cleanupWebGL]);

  return (
    <div className="app-container fixed z-[-10]">
      <div className="canvas-container pointer-events-auto">
        <Canvas
          ref={canvasRef}
          style={canvasSettings.style}
          camera={canvasSettings.camera}
          scene={canvasSettings.scene}
          gl={canvasSettings.gl}
          dpr={dpr}
        >
         
              {/* <CleanupHandler /> */}
              {/* Монитор производительности для адаптивного качества */}
              {/* <PerformanceMonitor factor={1} onChange={({ factor }) => setDpr(Math.floor(0.5 + 1.5 * factor))} /> */}
              {/* Адаптивное качество рендеринга */}
              {/* Оптимизация событий при низком FPS */}
              {/* <AdaptiveEvents /> */}
              
              {/* Предзагрузка ресурсов */}
              {/* <Preload all /> */}
              
              <CameraProvider>
                <Suspense fallback={null}>
                  <TempScene />
                </Suspense>
              </CameraProvider>
              <Camera3D />
         
          
        </Canvas>
        
      </div>
    </div>
  );
});

MainScene.displayName = 'MainScene';

export default MainScene;
