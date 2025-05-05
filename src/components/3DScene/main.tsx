"use client";

import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "@/components/3DScene/features/3dScene/Scene";
import { SMAAPass, SSAOPass } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "@react-three/drei";

function MainScene() {
  extend({ SMAAPass });

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Canvas
          style={{ height: "100vh", width: "100vw", position: "fixed" }}
          camera={{ position: [0, 0, 10], fov: 70, near: 0.1, far: 10000 }}
          scene={{ background: new THREE.Color("#0f0d1f") }}
          gl={{ antialias: true }}
        >
          {/* <Effects multisamping={6}>
            <sMAAPass />
          </Effects> */}

          <Scene />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          {/*<CameraAnimation />*/}
        </Canvas>
      </div>
    </div>
  );
}

export default MainScene;
