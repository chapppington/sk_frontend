"use client";

import { ReactNode, useState } from "react";
import ReactLenis from "lenis/react";
import { ViewTransitions } from "next-view-transitions";
import { PageTransitionProvider } from "@/context/PageTransitionProvider";
import { CameraProvider } from "@/components/3DScene/features/CameraContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FontProvider } from "@/context/FontProvider";
import { GpuDetectProvider } from "@/context/GpuDetectProvider";
import NotificationBar from "@/components/NotificationSection/Ui/NotificationBar";
import { NotificationProvider } from "@/components/NotificationSection/NotificationProvider";
import NotificationList from "@/components/NotificationSection/NotificationList";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [client] = useState(new QueryClient());
  

  return (
    <QueryClientProvider client={client}>
      <FontProvider>
        <ViewTransitions>
          <PageTransitionProvider>
            <GpuDetectProvider>
              <CameraProvider>
                <NotificationProvider>
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
                    <NotificationList/>
                  </ReactLenis>
                </NotificationProvider>
              </CameraProvider>
            </GpuDetectProvider>
          </PageTransitionProvider>
        </ViewTransitions>
      </FontProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
