"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import useIsAppleDevice from "@/hooks/useIsAppleDevice";
import useIsMobile from "@/hooks/useIsMobile";

import BackgroundGradient from "@/components/ui/BackgroundGradient";

const ConditionalBackgroundGradient: FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isAppleDevice = useIsAppleDevice();
  const isSmallScreen = useIsMobile(1248);

  // Show BackgroundGradient on non-home pages, or on home page for Apple devices/small screens
  const shouldShowGradient = !isHomePage || isAppleDevice || isSmallScreen;

  if (!shouldShowGradient) return null;

  return <BackgroundGradient />;
};

export default ConditionalBackgroundGradient;
