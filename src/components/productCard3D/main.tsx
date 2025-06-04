"use client";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { useState, useCallback } from "react";

const TempScene = dynamic(() => import("./features/Scene"), { ssr: false });

function ProductScene() {
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          width: "100%",
          height: "600px", // Высоту можно настроить под ваши нужды
          background: "transparent",
        }}
        camera={{
          position: [5, 5, 5], // Изменили позицию камеры
          fov: 45, // Уменьшили поле зрения
          near: 0.1,
          far: 1000,
        }}
      >
        <TempScene isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
export default ProductScene;
