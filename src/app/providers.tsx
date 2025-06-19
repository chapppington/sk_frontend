"use client"

import { ReactNode, useState } from "react";
import ReactLenis from "lenis/react";
import { ViewTransitions } from "next-view-transitions";
import { PageTransitionProvider } from "@/context/PageTransitionProvider";
import { CameraProvider } from "@/components/3DScene/features/CameraContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
