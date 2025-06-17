"use client";
import { useScroll,ScrollControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef,useEffect } from "react";
import { easing } from "maath";
import * as THREE from 'three'
import { gsap } from "gsap";
import { useScrollOffset } from "./features/ScrollProviderOffset";
import { ISectionHeaderProps } from "../ui/SliderSelectButtons/types";
import { Power4 } from "gsap/all";


function ProductsSlider3D({currentSlide,setCurrentSlide}: ISectionHeaderProps) {
  const {scrollOffset, setScrollOffset} = useScrollOffset();

  function Rig(props: any) {
    const ref = useRef<any>(null);
    const scroll = useScroll();
     const autoScrollRef = useRef(0);
    useFrame((state: any, delta) => {
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
    return (
      <group ref={ref} {...props}/>
    );
  }
  function Carousel({ radius = 2.4, count = 7 }) {
    const targetIndex = 2;
    
    return Array.from({ length: count }, (_, i) => (
      
      <Model
        model={null}
        key={i}
        index={i}
        position={[
          Math.sin((i / count) * Math.PI * 2) * radius,
          0,
          Math.cos((i / count) * Math.PI * 2) * radius,
        ]}
        // scale={i === currentSlide-1 ? 1.5 : 1}
        rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}

      />
    ));
  }
  function Model({ model, ...props }: any) {
    const ref = useRef<THREE.Mesh>(null);
    const targetScaleRef = useRef(1);
    const scaleRef = useRef(new THREE.Vector3(1, 1, 1));

    useEffect(() => {
        targetScaleRef.current = props.index === currentSlide - 1 ? 1.5 : 1;
    }, [currentSlide, props.index]);
    useFrame((state,delta) => {
        if (!ref.current) return;

        easing.damp(
            scaleRef.current,
            'x',
            targetScaleRef.current,
            0.9,
            delta
        );
        easing.damp(
            scaleRef.current,
            'y',
            targetScaleRef.current,
            0.9,
            delta
        );
        easing.damp(
            scaleRef.current,
            'z',
            targetScaleRef.current,
            0.9,
            delta
        );

        ref.current.scale.copy(scaleRef.current);
    });

    const PrimitiveGeometry = ({ index }: { index: number }) => {
    switch (index % 4) {
      case 0:
        return <boxGeometry args={[1, 1, 1]} />;
      case 1:
        return <sphereGeometry args={[0.6, 32, 32]} />;
      case 2:
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      case 3:
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
      default:
        return <planeGeometry args={[1, 1]} />;
    }
  };

    return(
      <mesh ref={ref} {...props}>
        <PrimitiveGeometry index={props.index} />
        <meshStandardMaterial color={`hsl(${props.index * 45}, 100%, 50%)`} />
      </mesh>
    )

  }
  return (
    <div className="ml-8 hidden md:block">
      <Canvas
        style={{
          width: "1000px",
          height: "600px",
          
        }}
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
        
      </Canvas>
    </div>
  );
}

export default ProductsSlider3D;
