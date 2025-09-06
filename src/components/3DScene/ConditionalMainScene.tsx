"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import MainScene from "./main";
import { SimpleBackgroundGradient } from '@/components/ui/SimpleBackgroundGradient';
import { useGPUContext } from "@/context/GpuDetectProvider";

export default function ConditionalMainScene() {
  const pathname = usePathname();
  const context = useGPUContext();
  const isHomePage = pathname === "/";

  // Memoize the MainScene instance
  const memoizedScene = useMemo(() => <MainScene />, []);
  const simpleGradient = useMemo(() => <SimpleBackgroundGradient />, []);

  if (isHomePage && context.webglSupport.isHardwareAccelerated) return memoizedScene;
  if (isHomePage && !context.webglSupport.isHardwareAccelerated) return simpleGradient;

  return null;
}
