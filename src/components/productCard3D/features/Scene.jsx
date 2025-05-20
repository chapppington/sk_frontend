import { useLoader } from "@react-three/fiber";
import { WfMid2 } from "../../3DScene/features/3dScene/materials/WfMid2";
import * as THREE from "three";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { Power4 } from "gsap/all";
import Stats from 'three/examples/jsm/libs/stats.module.js';

export default function TempScene() {
  const customShader = WfMid2();
  const modelRef = useRef();
  const scene = new THREE.Scene();
  const isFirstRender = useRef(true);
  const stats = new Stats();
  document.body.appendChild(stats.dom);

  const gltf22 = useLoader(GLTFLoader, "/Scene/parn.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: "js" });
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);
  });
  console.log(gltf22);
  useEffect(() => {
    if (gltf22) {
      // Центрируем камеру на модели
      const box = new THREE.Box3().setFromObject(gltf22.scene);
      const center = box.getCenter(new THREE.Vector3());
      gltf22.scene.position.sub(center); // Центрируем модель

      gltf22.scene.traverse((node) => {
        node.material = customShader;
      });
    }
  }, [gltf22, customShader]);

  console.log(scene);

  useFrame(({ clock }) => {
    // const progress = Math.min(1, clock.getElapsedTime()/5)
    // customShader.uniforms.uProgress.value = progress;
    customShader.uniforms.uTime.value = clock.getElapsedTime() * 1.2;
    stats.update();
  });
  useEffect(() => {
    if (isFirstRender.current) {
      const tl = gsap.timeline();
      tl.to(
        customShader.uniforms.uRevealDistance,
        {
          value: 1,
          duration: 1.5,
          delay: 0,
          ease: Power4.easeOut,
        },
        0
      )
        .to(
          customShader.uniforms.uAlpha,
          {
            value: 0.4,
            duration: 1.5,
            delay: 0,
            ease: Power4.easeOut,
          },
          0
        )
        .to(
          customShader.uniforms.uFluctuationFrequency,
          {
            value: 1,
            duration: 0,
            delay: 0,
          },
          2
        )
        .to(
          customShader.uniforms.uFluctuationAmplitude,
          {
            value: 1,
            duration: 0,
            delay: 0,
          },
          2
        );
      isFirstRender.current = false;
    }
  }, [customShader]);
  return (
    <>
      <PerspectiveCamera makeDefault position={[5, 25, 5]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        target={[0, 0, 0]} // Смотрим в центр сцены
        maxDistance={20}
        minDistance={2}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <primitive object={gltf22.scene} ref={modelRef} />
    </>
  );
}
