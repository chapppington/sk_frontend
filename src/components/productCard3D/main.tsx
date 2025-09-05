"use client";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { UPLOADS_URL } from "@/constants";

const TempScene = dynamic(() => import("./features/Scene"), { ssr: false });

interface ProductSceneProps {
  modelUrl?: string;
  previewImageUrl?: string;
}

function ProductScene({ modelUrl, previewImageUrl }: ProductSceneProps) {
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Если нет 3D модели, показываем PNG изображение
  if (!modelUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="relative w-full h-[600px] flex items-center justify-center"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          {previewImageUrl ? (
            <Image
              src={`${UPLOADS_URL}${previewImageUrl}`}
              alt="Product preview"
              fill
              className="object-contain"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
              <span className="text-gray-500 text-lg">
                Изображение недоступно
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas
        ref={canvasRef}
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
        <TempScene isHovered={isHovered} modelUrl={modelUrl} />
      </Canvas>
    </div>
  );
}
export default ProductScene;
