import { ReactNode } from "react";
import ReactLenis from "lenis/react";
import { ViewTransitions } from "next-view-transitions";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import { CameraProvider } from "@/components/3DScene/features/CameraContext";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
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
            {children}
          </ReactLenis>
        </CameraProvider>
      </PageTransitionProvider>
    </ViewTransitions>
  );
}
