"use client";

import { usePathname } from "next/navigation";
import BGGradient from "./BGGradient";

export default function ConditionalBGGradient() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (isHomePage) return null;

  return <BGGradient />;
}
