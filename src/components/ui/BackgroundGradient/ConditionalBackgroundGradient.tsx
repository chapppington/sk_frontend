"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import useIsAppleDevice from "@/hooks/useIsAppleDevice";
import useIsMobile from "@/hooks/useIsMobile";
import { useGPUContext } from "@/context/GpuDetectProvider";
import BackgroundGradient from "@/components/ui/BackgroundGradient";
import { SimpleBackgroundGradient } from '@/components/ui/SimpleBackgroundGradient';

const ConditionalBackgroundGradient: FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isAppleDevice = useIsAppleDevice();
  const isSmallScreen = useIsMobile(1248);

  // Show BackgroundGradient on non-home pages, or on home page for Apple devices/small screens
  const shouldShowGradient = !isHomePage || isAppleDevice || isSmallScreen;
  const context = useGPUContext();

  if (!shouldShowGradient) return null;

  if (!context.webglSupport.isHardwareAccelerated) return <SimpleBackgroundGradient />;
  if (context.webglSupport.isHardwareAccelerated) return <BackgroundGradient />;
};

export default ConditionalBackgroundGradient;
