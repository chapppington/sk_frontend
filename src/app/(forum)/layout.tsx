"use client";

import { ReactNode } from "react";
import ForumNavbar from "@/components/shared_screens/ForumNavbar";
import ConditionalBGGradient from "@/components/ui/BackgroundGradient/ConditionalBackgroundGradient";
import CustomScrollbar from "@/components/CustomScrollbar";
import Footer from "@/components/shared_screens/Footer";
import "./globals.css";

export default function ForumLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ConditionalBGGradient />
      <CustomScrollbar />
      <ForumNavbar />
      {children}
      <Footer />
    </>
  );
}

