"use client";
import { useScroll,ScrollControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef,useEffect } from "react";
import { easing } from "maath";
import * as THREE from 'three'
import { gsap } from "gsap";
import { useScrollOffset } from "./features/ScrollProviderOffset";
import { ISectionHeaderProps } from "@/components/ui/SliderSelectButtons/types";
import { Power4 } from "gsap/all";
import { GLTFLoader, DRACOLoader } from "three/examples/jsm/Addons.js";
import { mockup } from "./features/mockup";
import { GLTF } from 'three/examples/jsm/Addons.js';
import { WfMid2 } from "../3DScene/features/3dScene/materials/WfMid2";

function ProductsSlider3D({currentSlide,setCurrentSlide}: ISectionHeaderProps) {
  const {scrollOffset, setScrollOffset} = useScrollOffset();
  const customShader = WfMid2();
    
  function Rig(props: any) {
    const ref = useRef<any>(null);
    const scroll = useScroll();
    const autoScrollRef = useRef(0);
    const isFirstRender = useRef(true);
    useFrame((state: any, delta) => {
      customShader.uniforms.uTime.value = state.clock.getElapsedTime() * 1.2;
      autoScrollRef.current += delta * 0.05;
      scroll.offset = (autoScrollRef.current % 1);
      ref.current.rotation.y = -scrollOffset * (Math.PI * 2);
      state.events.update();
      easing.damp3(state.camera.position, [
        -state.pointer.x * 2,
        state.pointer.y + 1.5,
        10,
      ]);
      state.camera.lookAt(0, 0, 0);
    })
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
      <group ref={ref} {...props}/>
    );
  }

  function Carousel({ radius = 2.4, count = mockup.length }) {
    return Array.from({ length: count }, (_, i) => (
      <Model
        key={i}
        index={i}
        modelPath={mockup[i].modelPath}
        position={[
          Math.sin((i / count) * Math.PI * 2) * radius,
          0,
          Math.cos((i / count) * Math.PI * 2) * radius,
        ]}
        rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
      />
    ));
  }

  function Model({ modelPath, index, ...props }: any) {
    const ref = useRef<THREE.Group>(null);
    const targetScaleRef = useRef(1);
    const scaleRef = useRef(new THREE.Vector3(1, 1, 1));

    const gltf = useLoader(
      GLTFLoader,
      modelPath,
      (loader: GLTFLoader) =>{
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderConfig({type: "js"});
        dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
        loader.setDRACOLoader(dracoLoader);
      }
    ) as GLTF;

    useEffect(() => {
      if (gltf) {
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center);
        
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1 / maxDim;
        gltf.scene.scale.multiplyScalar(scale);
        gltf.scene.traverse((node: any) => {
          node.material = customShader;
        });
      }
    }, [gltf]);

    useEffect(() => {
      targetScaleRef.current = index === currentSlide - 1 ? 1.5 : 1;
    }, [currentSlide, index]);

    useFrame((state,delta) => {
      if (!ref.current) return;

      easing.damp(scaleRef.current, 'x', targetScaleRef.current, 0.9, delta);
      easing.damp(scaleRef.current, 'y', targetScaleRef.current, 0.9, delta);
      easing.damp(scaleRef.current, 'z', targetScaleRef.current, 0.9, delta);

      ref.current.scale.copy(scaleRef.current);
    });

    return(
      <group ref={ref} {...props}>
        <primitive object={gltf.scene}/>
      </group>
    )
  }

  return (
    <div className="relative flex items-center">
      <div className="ml-8 hidden md:block w-[1000px] h-[600px]">
        <Canvas
          camera={{
            position: [0, 0, 100],
            fov: 20,
          }}
        >
          <ScrollControls pages={4} infinite>
            <Rig rotation={[0, 0, 0]}>
              <Carousel/>
            </Rig>
          </ScrollControls>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
        </Canvas>
      </div>
      <div className="absolute left-8 bottom-0 bg-black/50 backdrop-blur-md p-6 rounded-t-lg w-[400px] text-white">
        <h2 className="text-2xl font-bold mb-4">{mockup[currentSlide - 1].name}</h2>
        <p className="text-gray-300">{mockup[currentSlide - 1].description}</p>
      </div>
    </div>
  );
}

export default ProductsSlider3D;
