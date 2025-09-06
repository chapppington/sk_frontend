"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import { useGPUContext } from "@/context/GpuDetectProvider";
import BackgroundGradient from "@/components/ui/BackgroundGradient";
import { SimpleBackgroundGradient } from '@/components/ui/SimpleBackgroundGradient';

const ConditionalBackgroundGradient: FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const context = useGPUContext();

  if (isHomePage) return null;

  if (!context.webglSupport.isHardwareAccelerated) return <SimpleBackgroundGradient />;
  if (context.webglSupport.isHardwareAccelerated) return <BackgroundGradient />;
};

export default ConditionalBackgroundGradient;
