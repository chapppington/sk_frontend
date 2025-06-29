"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { AdaptiveDpr } from "@react-three/drei";
import Scene from "@/components/3DScene/features/3dScene/Scene";
import Camera3D from "@/components/3DScene/features/3dScene/Camera3D";

const MainScene = React.memo(() => {
  // Мемоизируем настройки Canvas
  const canvasSettings = useMemo(() => ({
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
      far: 5000 
    },
    gl: {
      antialias: true,
      powerPreference: "high-performance" as const,
      stencil: false,
      depth: false,
      outputColorSpace: THREE.SRGBColorSpace,
      alpha: true,
      logarithmicDepthBuffer: true,
    },
    dpr: [1, 2] as [number, number],
    scene: { 
      background: new THREE.Color("#0f0d1f") 
    }
  }), []);

  return (
    <div className="app-container fixed z-[-10]">
      <div className="canvas-container pointer-events-auto">
        <Canvas
          style={canvasSettings.style}
          camera={canvasSettings.camera}
          scene={canvasSettings.scene}
          gl={canvasSettings.gl}
          dpr={canvasSettings.dpr}
        >
          {/* <AdaptiveDpr pixelated /> */}
          <Scene />
          <Camera3D />
        </Canvas>
      </div>
    </div>
  );
});

export default MainScene;
