"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import MainScene from "./main";
import useIsAppleDevice from "@/hooks/useIsAppleDevice";
import useIsMobile from "@/hooks/useIsMobile";
import { SimpleBackgroundGradient } from '@/components/ui/SimpleBackgroundGradient';
import { useGPUContext } from "@/context/GpuDetectProvider";

export default function ConditionalMainScene() {
  const pathname = usePathname();
  const context = useGPUContext();
  const isHomePage = pathname === "/";
  const isAppleDevice = useIsAppleDevice();
  const isSmallScreen = useIsMobile(1248); // Check for screens smaller than 1248px

  // Memoize the MainScene instance
  const memoizedScene = useMemo(() => <MainScene />, []);
  const simpleGradient = useMemo(() => <SimpleBackgroundGradient />, []);

  // Only show MainScene on home page for non-Apple devices with large screens
  if (isHomePage && context.webglSupport.isHardwareAccelerated && !isAppleDevice && !isSmallScreen) {
    return memoizedScene;
  }
  if (isHomePage && !context.webglSupport.isHardwareAccelerated) return simpleGradient;

  return null;
}
