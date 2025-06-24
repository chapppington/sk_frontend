"use client";

import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "@/components/3DScene/features/3dScene/Scene";
import Camera3D from "@/components/3DScene/features/3dScene/Camera3D";

function MainScene() {
  return (
    <div className="app-container fixed z-[-10]">
      <div className="canvas-container pointer-events-auto">
        <Canvas
          style={{
            height: "100vh",
            width: "100vw",
            position: "absolute",
            top: 0,
          }}
          camera={{ position: [0, 0, 10], fov: 70, near: 10.1, far: 5000 }}
          scene={{ background: new THREE.Color("#0f0d1f") }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
            outputColorSpace: THREE.SRGBColorSpace,
            alpha: true, // Enable alpha for transparency
            logarithmicDepthBuffer: true, // Enable logarithmic depth buffer for better depth precision
          }}
          dpr={[1, 2]}
        >
          <Scene />
          <Camera3D />
        </Canvas>
      </div>
    </div>
  );
}

export default MainScene;
