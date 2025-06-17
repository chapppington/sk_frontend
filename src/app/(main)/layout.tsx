import { ReactNode } from "react";
import ReactLenis from "lenis/react";
import { ViewTransitions } from "next-view-transitions";

import Navbar from "@/components/shared_screens/Navbar";
import Footer from "@/components/shared_screens/Footer";

import ConditionalBGGradient from "@/components/ui/BackgroundGradient/ConditionalBackgroundGradient";
import ConditionalMainScene from "@/components/3DScene/ConditionalMainScene";

import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import CustomScrollbar from "@/components/CustomScrollbar";
import { CameraProvider } from "@/components/3DScene/features/CameraContext";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <PageTransitionProvider>
        <CameraProvider>
          <ReactLenis
            root
            options={{
              lerp: 0.16,
              wheelMultiplier: 1,
              smoothWheel: true,
              orientation: "vertical",
              gestureOrientation: "vertical",
              infinite: false,
              syncTouch: true,
            }}
          >
            <ConditionalBGGradient />
            <CustomScrollbar />
            <ConditionalMainScene />
            <Navbar />
            {children}
            <Footer />
          </ReactLenis>
        </CameraProvider>
      </PageTransitionProvider>
    </ViewTransitions>
  );
}
