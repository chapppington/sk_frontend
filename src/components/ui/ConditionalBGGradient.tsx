"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";

import BackgroundGradient from "@/components/ui/BackgroundGradient";

const ConditionalBackgroundGradient: FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (isHomePage) return null;

  return <BackgroundGradient />;
};

export default ConditionalBackgroundGradient;
