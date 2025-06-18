import { ReactNode } from "react";
import Navbar from "@/components/shared_screens/Navbar";
import Footer from "@/components/shared_screens/Footer";
import ConditionalBGGradient from "@/components/ui/BackgroundGradient/ConditionalBackgroundGradient";
import ConditionalMainScene from "@/components/3DScene/ConditionalMainScene";
import CustomScrollbar from "@/components/CustomScrollbar";
import "./globals.css";

export default function MainLayout({ children }: { children: ReactNode }) {
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
