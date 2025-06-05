import { useLoader } from "@react-three/fiber";
import { WfMid2 } from "../../3DScene/features/3dScene/materials/WfMid2";
import * as THREE from "three";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import { use, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { Power4 } from "gsap/all";

import React from "react";

export default function TempScene({ isHovered }) {
  const cameraRef = useRef();
  const timelineRef = useRef(null);
  const customShader = WfMid2();
  const modelRef = useRef();
  const scene = new THREE.Scene();
  const isFirstRender = useRef(true);

  const gltf22 = useLoader(GLTFLoader, "/Scene/parn.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: "js" });
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);
  });
  
  useEffect(() => {
    if (gltf22) {
      // Центрируем камеру на модели
      const box = new THREE.Box3().setFromObject(gltf22.scene);
      const center = box.getCenter(new THREE.Vector3());
      gltf22.scene.position.sub(center); // Центрируем модель
      // gltf22.scene.rotation.y = Math.PI; // Поворачиваем модель на 180 градусов
      // gltf22.scene.rotation.x = -Math.PI / 2;
      gltf22.scene.traverse((node) => {
        node.material = customShader;
      });
      console.log(gltf22);
    }
  }, [gltf22, customShader]);


  useFrame(({ clock }) => {
    // const progress = Math.min(1, clock.getElapsedTime()/5)
    // customShader.uniforms.uProgress.value = progress;
    // console.log(cameraRef.current.position);
    customShader.uniforms.uTime.value = clock.getElapsedTime() * 1.2;
    
  });
  useEffect(() => {
    if (isFirstRender.current) {
      const tl = gsap.timeline();
      const cycle = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: {
          ease: Power4.easeInOut,
          duration: 5,
        },
      });
      timelineRef.current = cycle;
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
      // Анимация вращения модели
      cycle.to(gltf22.scene.children[0].rotation, {
        y: Math.PI / 12,
      });
      isFirstRender.current = false;
    }
  }, [customShader]);

  useEffect(() => {
    let timeoutId;
    if (timelineRef.current) {
      if (isHovered) {
        timelineRef.current.pause();
        if (timeoutId) clearTimeout(timeoutId);
      } else {
        timeoutId = setTimeout(() => {
          timelineRef.current.resume();
        }, 500);
      }
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isHovered]);
  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[6.581, -2.249, -18.752]}
      />
      <OrbitControls
        enabled={true}
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        maxDistance={20}
        minDistance={2}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <primitive
        object={gltf22.scene}
        ref={modelRef}
        
        
      ></primitive>
    </>
  );
}
