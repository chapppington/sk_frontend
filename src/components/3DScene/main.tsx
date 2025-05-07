"use client";

import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "@/components/3DScene/features/3dScene/Scene";
import { SMAAPass, SSAOPass } from "three/examples/jsm/Addons.js";
// import { OrbitControls } from "@react-three/drei";
import Camera3D from "@/components/3DScene/features/3dScene/Camera3D";

function MainScene() {
  extend({ SMAAPass });

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
          camera={{ position: [0, 0, 10], fov: 70, near: 0.1, far: 10000 }}
          scene={{ background: new THREE.Color("#0f0d1f") }}
          gl={{ antialias: true }}
        >

          <Scene />
          <Camera3D/>

            
          {/* <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
          /> */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          {/*<CameraAnimation />*/}
        </Canvas>
      </div>
    </div>
  );
}

export default MainScene;
