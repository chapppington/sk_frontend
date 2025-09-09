"use client"
import { ReactNode, useEffect } from "react";
import Navbar from "@/components/shared_screens/Navbar";
import Footer from "@/components/shared_screens/Footer";
import ConditionalBGGradient from "@/components/ui/BackgroundGradient/ConditionalBackgroundGradient";
import ConditionalMainScene from "@/components/3DScene/ConditionalMainScene";
import CustomScrollbar from "@/components/CustomScrollbar";
import "./globals.css";
import { useNotification } from "@/components/NotificationSection/NotificationProvider";
import { useGPUContext } from "@/context/GpuDetectProvider";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { addNotification, upsertNotification } = useNotification();
  const { webglSupport } = useGPUContext();
  useEffect(() => {
    if (webglSupport.isSupported && !webglSupport.isHardwareAccelerated) {
      upsertNotification({ id: "webgl", message: "WebGL работает, но без аппаратного ускорения. Производительность может быть снижена.", variant: "warning", sticky: true });
    }
  }, [addNotification, upsertNotification, webglSupport]);

  return (
    <>
      <ConditionalBGGradient />
      <CustomScrollbar />
      <ConditionalMainScene />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
