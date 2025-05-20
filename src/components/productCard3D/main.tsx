"use client";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

const TempScene = dynamic(() => import("./features/Scene"), { ssr: false });

function ProductScene() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas
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
        <TempScene />
      </Canvas>
    </div>
  );
}
export default ProductScene;
